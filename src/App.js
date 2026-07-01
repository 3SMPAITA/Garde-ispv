import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

const COLORS = ["#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63","#00bcd4","#8bc34a","#ff5722","#795548","#607d8b","#ff9800","#26c6da"];
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const TYPES_GARDE = [
  { value:"Journée 6h30-18h30", label:"☀️ Journée 6h30-18h30", color:"#f8c471" },
  { value:"Nuit 18h30-6h30",    label:"🌙 Nuit 18h30-6h30",    color:"#5dade2" },
  { value:"VMA",                label:"🏃 VMA",                 color:"#a29bfe" },
  { value:"Indisponible",       label:"🚫 Indisponible",        color:"#eb5757" },
];

function typeInfo(val) { return TYPES_GARDE.find(t=>t.value===val)||TYPES_GARDE[0]; }

const DEFAULT_MEMBRES = [
  { id:"m1", label:"Poste 1", prenom:"", nom:"", role:"admin",     color:COLORS[0], password:"admin123", vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m2", label:"Poste 2", prenom:"", nom:"", role:"infirmier", color:COLORS[1], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m3", label:"Poste 3", prenom:"", nom:"", role:"infirmier", color:COLORS[2], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m4", label:"Poste 4", prenom:"", nom:"", role:"infirmier", color:COLORS[3], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m5", label:"Poste 5", prenom:"", nom:"", role:"infirmier", color:COLORS[4], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m6", label:"Poste 6", prenom:"", nom:"", role:"infirmier", color:COLORS[5], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
  { id:"m7", label:"Poste 7", prenom:"", nom:"", role:"infirmier", color:COLORS[6], password:"1234",     vma_ajour:false, vma_date:"", icp_ajour:false, icp_date:"" },
];

function displayName(m) { return (m.prenom||m.nom)?`${m.prenom} ${m.nom}`.trim():m.label; }
function initiales(m) {
  if(m.prenom&&m.nom) return (m.prenom[0]+m.nom[0]).toUpperCase();
  if(m.prenom) return m.prenom[0].toUpperCase();
  const n=m.label.replace(/\D/g,""); return n?n[0]:"?";
}
function todayISO() { return new Date().toISOString().slice(0,10); }
function formatDateLong(str) { if(!str) return ""; return new Date(str+"T00:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }
function formatDateShort(str) { if(!str) return ""; return new Date(str+"T00:00:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}); }
function isExpired(dateStr) { return dateStr&&new Date(dateStr+"T00:00:00")<new Date(); }

const S = {
  body:{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#0d0d0d", color:"#f0ece4", minHeight:"100vh", margin:0 },
  header:{ background:"#1a1a1a", borderBottom:"2px solid #c0392b", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100 },
  logoText:{ fontSize:22, fontWeight:800, letterSpacing:2, color:"#f0ece4" },
  logoSub:{ fontSize:10, color:"#b0a89a", letterSpacing:1, textTransform:"uppercase" },
  layout:{ display:"flex", height:"calc(100vh - 60px)" },
  sidebar:{ width:220, background:"#1a1a1a", borderRight:"1px solid #2c2c2c", display:"flex", flexDirection:"column", padding:"16px 0", flexShrink:0, overflowY:"auto" },
  navItem:(active)=>({ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", margin:"1px 8px", borderRadius:8, cursor:"pointer", fontSize:13, color:active?"#fff":"#b0a89a", background:active?"#c0392b":"transparent", border:"none", width:"calc(100% - 16px)", textAlign:"left" }),
  main:{ flex:1, overflowY:"auto", padding:"24px 28px" },
  pageTitle:{ fontSize:28, fontWeight:800, letterSpacing:1, marginBottom:4 },
  pageSub:{ fontSize:13, color:"#b0a89a", marginBottom:20 },
  row:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 },
  card:{ background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:12, padding:20 },
  statsGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:14, marginBottom:22 },
  statCard:{ background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:10, padding:16 },
  statLabel:{ fontSize:11, color:"#b0a89a", textTransform:"uppercase", letterSpacing:1, marginBottom:6 },
  statVal:(color)=>({ fontSize:36, fontWeight:800, color:color||"#f0ece4", lineHeight:1 }),
  btn:(v)=>{
    const b={padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",border:"none",display:"inline-flex",alignItems:"center",gap:6};
    if(v==="primary")   return {...b,background:"#c0392b",color:"#fff"};
    if(v==="secondary") return {...b,background:"#2c2c2c",color:"#f0ece4",border:"1px solid #3d3d3d"};
    if(v==="ghost")     return {...b,background:"transparent",color:"#b0a89a"};
    if(v==="green")     return {...b,background:"#0d2a0d",color:"#6fcf97",border:"1px solid #1a4a1a"};
    if(v==="red")       return {...b,background:"#2a0d0d",color:"#eb5757",border:"1px solid #4a1a1a"};
    return b;
  },
  input:{ width:"100%", background:"#2c2c2c", border:"1px solid #3d3d3d", borderRadius:8, padding:"9px 13px", color:"#f0ece4", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
  label:{ display:"block", fontSize:12, fontWeight:600, color:"#b0a89a", textTransform:"uppercase", letterSpacing:.5, marginBottom:6 },
  avatar:(color,size)=>({ width:size||32, height:size||32, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size?size*0.38:13, fontWeight:700, color:"#fff", flexShrink:0 }),
  badge:(role)=>({ padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:500, background:role==="admin"?"#2a1500":"#0a1a2a", color:role==="admin"?"#f8c471":"#5dade2", border:`1px solid ${role==="admin"?"#4a2a00":"#1a3a4a"}` }),
  badgeOk:(ok)=>({ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:ok?"#0d2a0d":"#2a0d0d", color:ok?"#6fcf97":"#eb5757", border:`1px solid ${ok?"#1a4a1a":"#4a1a1a"}` }),
  pill:(type)=>{ const t=typeInfo(type); return {display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:"#1a1a1a",color:t.color,border:`1px solid ${t.color}60`,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}; },
  dot:(type)=>({ width:6, height:6, borderRadius:"50%", flexShrink:0, background:typeInfo(type).color }),
  modal:{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" },
  modalBox:{ background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:16, padding:32, width:500, maxWidth:"95vw", maxHeight:"90vh", overflowY:"auto" },
  toast:(show,type)=>({ position:"fixed", bottom:24, right:24, background:"#2c2c2c", borderLeft:`4px solid ${type==="success"?"#6fcf97":type==="warning"?"#f8c471":"#c0392b"}`, borderRadius:8, padding:"13px 20px", fontSize:14, zIndex:300, opacity:show?1:0, transform:show?"none":"translateY(12px)", transition:"all .3s", pointerEvents:"none" }),
  calCell:(isToday,isEmpty)=>({ minHeight:110, borderRight:"1px solid #2c2c2c", borderBottom:"1px solid #2c2c2c", padding:7, position:"relative", background:isEmpty?"#111":isToday?"#1f1410":"transparent", boxSizing:"border-box" }),
  calNum:(isToday)=>({ fontFamily:"monospace", fontSize:12, color:isToday?"#f8c471":"#b0a89a", marginBottom:4, fontWeight:isToday?700:400 }),
};

function Toast({msg,type}){ return <div style={S.toast(!!msg,type)}>{msg}</div>; }
function Modal({open,onClose,title,subtitle,children}){
  if(!open) return null;
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={S.modalBox}>
        <div style={{fontSize:22,fontWeight:800,marginBottom:4}}>{title}</div>
        {subtitle&&<div style={{fontSize:13,color:"#b0a89a",marginBottom:20}}>{subtitle}</div>}
        {children}
      </div>
    </div>
  );
}

function LoginScreen({membres,onLogin}){
  const [selected,setSelected]=useState(null);
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const choisir=(m)=>{ setSelected(m); setPassword(""); setError(""); };
  const valider=()=>{
    if(!selected) return;
    if(password===selected.password) onLogin(selected);
    else setError("Mot de passe incorrect.");
  };
  return (
    <div style={{position:"fixed",inset:0,background:"#0d0d0d",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:400,background:"#1a1a1a",border:"1px solid #2c2c2c",borderRadius:16,padding:36,textAlign:"center"}}>
        <div style={{fontSize:44,marginBottom:14}}>🚒</div>
        <div style={{fontSize:28,fontWeight:800,letterSpacing:3,marginBottom:4}}>Garde ISPV</div>
        <div style={{fontSize:13,color:"#b0a89a",marginBottom:28}}>Planning des gardes<br/>Choisissez votre profil</div>
        {!selected?(
          <div style={{display:"flex",flexDirection:"column",gap:8,textAlign:"left"}}>
            {membres.map(m=>(
              <div key={m.id} onClick={()=>choisir(m)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:"#2c2c2c",border:"1px solid #3d3d3d",borderRadius:10,cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#c0392b"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="#3d3d3d"}>
                <div style={S.avatar(m.color,36)}>{initiales(m)}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{displayName(m)}</div>
                  <div style={{fontSize:12,color:"#b0a89a"}}>{m.role==="admin"?"⭐ Administrateur":"🏥 Infirmier"}</div>
                </div>
                <div style={{color:"#b0a89a"}}>›</div>
              </div>
            ))}
          </div>
        ):(
          <div style={{textAlign:"left"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"#2c2c2c",borderRadius:10,marginBottom:20}}>
              <div style={S.avatar(selected.color,40)}>{initiales(selected)}</div>
              <div><div style={{fontWeight:700,fontSize:16}}>{displayName(selected)}</div><div style={{fontSize:12,color:"#b0a89a"}}>{selected.role==="admin"?"⭐ Admin":"🏥 Infirmier"}</div></div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={S.label}>🔒 Mot de passe</label>
              <input type="password" style={{...S.input,borderColor:error?"#eb5757":"#3d3d3d"}} value={password}
                onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&valider()}
                placeholder="Votre mot de passe" autoFocus/>
              {error&&<div style={{fontSize:12,color:"#eb5757",marginTop:6}}>⚠️ {error}</div>}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button style={{...S.btn("secondary"),flex:1,justifyContent:"center"}} onClick={()=>{setSelected(null);setError("");}}>← Retour</button>
              <button style={{...S.btn("primary"),flex:1,justifyContent:"center"}} onClick={valider}>Se connecter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarView({membres,gardes,onAddGarde}){
  const [month,setMonth]=useState(()=>{ const d=new Date(); d.setDate(1); return d; });
  const y=month.getFullYear(),m=month.getMonth(),today=todayISO();
  const monthGardes=gardes.filter(g=>{ const d=new Date(g.date+"T00:00:00"); return d.getFullYear()===y&&d.getMonth()===m; });
  let startDow=new Date(y,m,1).getDay(); startDow=startDow===0?6:startDow-1;
  const daysInMonth=new Date(y,m+1,0).getDate();
  const getMem=id=>membres.find(x=>x.id===id);
  const cells=[];
  for(let i=0;i<startDow;i++) cells.push({empty:true});
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    cells.push({d,dateStr,dayGardes:gardes.filter(g=>g.date===dateStr),isToday:dateStr===today});
  }
  return (
    <div>
      <div style={S.statsGrid}>
        <div style={S.statCard}><div style={S.statLabel}>Gardes validées</div><div style={S.statVal("#6fcf97")}>{monthGardes.filter(g=>g.status==="validee"&&g.type!=="Indisponible"&&g.type!=="VMA").length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>En attente</div><div style={S.statVal("#f8c471")}>{monthGardes.filter(g=>g.status==="en-attente").length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>VMA</div><div style={S.statVal("#a29bfe")}>{monthGardes.filter(g=>g.type==="VMA").length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>Indisponibles</div><div style={S.statVal("#eb5757")}>{monthGardes.filter(g=>g.type==="Indisponible").length}</div></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <button style={S.btn("secondary")} onClick={()=>setMonth(p=>{const n=new Date(p);n.setMonth(n.getMonth()-1);return n;})}>← Préc.</button>
        <div style={{fontWeight:800,fontSize:20,minWidth:200,textAlign:"center"}}>{MOIS[m]} {y}</div>
        <button style={S.btn("secondary")} onClick={()=>setMonth(p=>{const n=new Date(p);n.setMonth(n.getMonth()+1);return n;})}>Suiv. →</button>
        <div style={{marginLeft:"auto",display:"flex",gap:12,fontSize:11,color:"#b0a89a",flexWrap:"wrap"}}>
          <span style={{color:"#f8c471"}}>● Att.</span><span style={{color:"#6fcf97"}}>● Validée</span><span style={{color:"#a29bfe"}}>● VMA</span><span style={{color:"#eb5757"}}>● Indispo</span>
        </div>
      </div>
      <div style={{background:"#1a1a1a",border:"1px solid #2c2c2c",borderRadius:12,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",background:"#2c2c2c"}}>
          {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(d=>(
            <div key={d} style={{padding:10,textAlign:"center",fontSize:11,fontWeight:600,textTransform:"uppercase",color:"#b0a89a"}}>{d}</div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
          {cells.map((cell,i)=>{
            if(cell.empty) return <div key={`e${i}`} style={{...S.calCell(false,true),borderRight:(i+1)%7===0?"none":"1px solid #2c2c2c"}}/>;
            return (
              <div key={cell.dateStr} style={{...S.calCell(cell.isToday,false),borderRight:(i+1)%7===0?"none":"1px solid #2c2c2c"}}>
                <div style={S.calNum(cell.isToday)}>{cell.d}</div>
                {cell.dayGardes.slice(0,3).map(g=>{
                  const mem=getMem(g.membreId); if(!mem) return null;
                  return (
                    <div key={g.id} style={{...S.pill(g.type),marginBottom:3,opacity:g.status==="en-attente"?0.6:1}}>
                      <div style={S.dot(g.type)}/><span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{displayName(mem)}</span>
                    </div>
                  );
                })}
                {cell.dayGardes.length>3&&<div style={{fontSize:10,color:"#b0a89a"}}>+{cell.dayGardes.length-3}</div>}
                <div onClick={()=>onAddGarde(cell.dateStr)}
                  style={{position:"absolute",bottom:5,right:5,width:20,height:20,borderRadius:"50%",background:"#2c2c2c",border:"1px solid #3d3d3d",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:"#b0a89a",lineHeight:1}}>+</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MesGardes({gardes,currentUser,onAnnuler,onPose}){
  const [filter,setFilter]=useState("all");
  let myGardes=gardes.filter(g=>g.membreId===currentUser.id).sort((a,b)=>b.date.localeCompare(a.date));
  const total=myGardes.length;
  if(filter==="validee") myGardes=myGardes.filter(g=>g.status==="validee");
  else if(filter==="en-attente") myGardes=myGardes.filter(g=>g.status==="en-attente");
  else if(filter==="vma") myGardes=myGardes.filter(g=>g.type==="VMA");
  else if(filter==="indispo") myGardes=myGardes.filter(g=>g.type==="Indisponible");
  const statusLabel={validee:"✅ Validée","en-attente":"⏳ En attente",refusee:"❌ Refusée"};
  return (
    <div>
      <div style={S.row}>
        <div><div style={S.pageTitle}>Mes Gardes</div><div style={S.pageSub}>{total} entrée(s) au total</div></div>
        <button style={S.btn("primary")} onClick={onPose}>➕ Nouveau</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[["all","Toutes"],["validee","Validées"],["en-attente","En attente"],["vma","VMA"],["indispo","Indispo"]].map(([f,l])=>(
          <button key={f} style={{...S.btn(filter===f?"primary":"secondary"),borderRadius:20,padding:"6px 14px"}} onClick={()=>setFilter(f)}>{l}</button>
        ))}
      </div>
      {myGardes.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",color:"#b0a89a"}}><div style={{fontSize:40,opacity:.4,marginBottom:12}}>📭</div><div>Aucune entrée</div></div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
          {myGardes.map(g=>{
            const t=typeInfo(g.type);
            return (
              <div key={g.id} style={{...S.card,borderLeft:`4px solid ${t.color}`}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{formatDateLong(g.date)}</div>
                <div style={{fontSize:13,color:t.color,fontWeight:600,marginBottom:6}}>{t.label}</div>
                {g.note&&<div style={{fontSize:12,color:"#b0a89a",marginBottom:8}}>{g.note}</div>}
                <div style={{fontSize:12,fontWeight:500,color:g.status==="validee"?"#6fcf97":g.status==="refusee"?"#eb5757":"#f8c471"}}>{statusLabel[g.status]}</div>
                {g.status==="en-attente"&&<button style={{...S.btn("red"),marginTop:10,fontSize:12,padding:"5px 12px"}} onClick={()=>onAnnuler(g.id)}>Annuler</button>}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

function PoserGarde({currentUser,gardes,onSubmit,onCancel}){
  const [date,setDate]=useState(()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); });
  const [type,setType]=useState(TYPES_GARDE[0].value);
  const [note,setNote]=useState("");
  const submit=()=>{
    if(!date) return;
    if(gardes.find(g=>g.membreId===currentUser.id&&g.date===date)){alert("Vous avez déjà une entrée ce jour.");return;}
    onSubmit({date,type,note}); setNote("");
  };
  return (
    <div>
      <div style={S.row}><div><div style={S.pageTitle}>Poser une garde</div><div style={S.pageSub}>Soumettez votre demande</div></div></div>
      <div style={{...S.card,maxWidth:500}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div><label style={S.label}>Date</label><input type="date" style={S.input} value={date} onChange={e=>setDate(e.target.value)}/></div>
          <div><label style={S.label}>Type</label>
            <select style={S.input} value={type} onChange={e=>setType(e.target.value)}>
              {TYPES_GARDE.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{marginBottom:20}}><label style={S.label}>Note (optionnel)</label>
          <textarea style={{...S.input,minHeight:70,resize:"vertical"}} value={note} onChange={e=>setNote(e.target.value)} placeholder="Précision..."/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={S.btn("primary")} onClick={submit}>🛡️ Soumettre</button>
          <button style={S.btn("secondary")} onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

function Demandes({gardes,membres,onValider,onRefuser}){
  const [filter,setFilter]=useState("en-attente");
  let filtered=[...gardes];
  if(filter!=="all") filtered=filtered.filter(g=>g.status===filter);
  filtered.sort((a,b)=>a.date.localeCompare(b.date));
  const getMem=id=>membres.find(x=>x.id===id);
  const pending=gardes.filter(g=>g.status==="en-attente").length;
  return (
    <div>
      <div style={S.row}><div><div style={S.pageTitle}>Demandes</div><div style={S.pageSub}>{pending} en attente</div></div></div>
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[["en-attente",`En attente${pending>0?` (${pending})`:""}`],["validee","Validées"],["refusee","Refusées"],["all","Toutes"]].map(([f,l])=>(
          <button key={f} style={{...S.btn(filter===f?"primary":"secondary"),borderRadius:20}} onClick={()=>setFilter(f)}>{l}</button>
        ))}
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",color:"#b0a89a"}}><div style={{fontSize:40,opacity:.4,marginBottom:12}}>✅</div><div>Aucune demande</div></div>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(g=>{
            const mem=getMem(g.membreId); if(!mem) return null;
            const t=typeInfo(g.type);
            return (
              <div key={g.id} style={{...S.card,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                <div style={{background:"#2c2c2c",borderRadius:8,padding:"8px 12px",textAlign:"center",minWidth:52}}>
                  <div style={{fontSize:24,fontWeight:800,color:"#e74c3c",lineHeight:1}}>{new Date(g.date+"T00:00:00").getDate()}</div>
                  <div style={{fontSize:10,color:"#b0a89a",textTransform:"uppercase"}}>{MOIS[new Date(g.date+"T00:00:00").getMonth()].slice(0,3)}</div>
                </div>
                <div style={S.avatar(mem.color,40)}>{initiales(mem)}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{displayName(mem)}</div>
                  <div style={{fontSize:12,color:t.color,fontWeight:500}}>{t.label}</div>
                  <div style={{fontSize:12,color:"#b0a89a"}}>{formatDateShort(g.date)}{g.note?" · "+g.note:""}</div>
                </div>
                {g.status==="en-attente"
                  ?<div style={{display:"flex",gap:8}}>
                    <button style={S.btn("green")} onClick={()=>onValider(g.id)}>✅ Valider</button>
                    <button style={S.btn("red")} onClick={()=>onRefuser(g.id)}>❌ Refuser</button>
                  </div>
                  :<div style={{fontSize:13,color:g.status==="validee"?"#6fcf97":"#eb5757"}}>{g.status==="validee"?"✅ Validée":"❌ Refusée"}</div>
                }
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

function FicheAgent({membre,gardes,onClose,onSave}){
  const [vmaAjour,setVmaAjour]=useState(membre.vma_ajour||false);
  const [vmaDate,setVmaDate]  =useState(membre.vma_date||"");
  const [icpAjour,setIcpAjour]=useState(membre.icp_ajour||false);
  const [icpDate,setIcpDate]  =useState(membre.icp_date||"");
  const today=new Date();
  const myGardes=gardes.filter(g=>g.membreId===membre.id&&g.status==="validee");
  const thisMonth=myGardes.filter(g=>{ const d=new Date(g.date+"T00:00:00"); return d.getFullYear()===today.getFullYear()&&d.getMonth()===today.getMonth(); });
  const vmaOk=vmaAjour&&!isExpired(vmaDate);
  const icpOk=icpAjour&&!isExpired(icpDate);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24,padding:16,background:"#2c2c2c",borderRadius:10}}>
        <div style={S.avatar(membre.color,52)}>{initiales(membre)}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:18}}>{displayName(membre)}</div>
          <span style={S.badge(membre.role)}>{membre.role==="admin"?"Admin":"Infirmier"}</span>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:"#b0a89a"}}>Gardes ce mois</div>
          <div style={{fontSize:28,fontWeight:800,color:"#6fcf97"}}>{thisMonth.length}</div>
        </div>
      </div>

      <div style={{...S.card,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:15}}>🏥 Visite Médicale (VMA)</div>
          <span style={S.badgeOk(vmaOk)}>{vmaOk?"✅ À jour":"❌ Non à jour"}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div><label style={S.label}>Statut</label>
            <select style={S.input} value={vmaAjour?"oui":"non"} onChange={e=>setVmaAjour(e.target.value==="oui")}>
              <option value="oui">✅ À jour</option><option value="non">❌ Non à jour</option>
            </select>
          </div>
          <div><label style={S.label}>Date d'échéance</label>
            <input type="date" style={{...S.input,borderColor:isExpired(vmaDate)?"#eb5757":"#3d3d3d"}} value={vmaDate} onChange={e=>setVmaDate(e.target.value)}/>
            {isExpired(vmaDate)&&vmaDate&&<div style={{fontSize:11,color:"#eb5757",marginTop:4}}>⚠️ Date dépassée</div>}
          </div>
        </div>
      </div>

      <div style={{...S.card,marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:15}}>🏃 Test sportif (ICP)</div>
          <span style={S.badgeOk(icpOk)}>{icpOk?"✅ À jour":"❌ Non à jour"}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div><label style={S.label}>Statut</label>
            <select style={S.input} value={icpAjour?"oui":"non"} onChange={e=>setIcpAjour(e.target.value==="oui")}>
              <option value="oui">✅ À jour</option><option value="non">❌ Non à jour</option>
            </select>
          </div>
          <div><label style={S.label}>Date d'échéance</label>
            <input type="date" style={{...S.input,borderColor:isExpired(icpDate)?"#eb5757":"#3d3d3d"}} value={icpDate} onChange={e=>setIcpDate(e.target.value)}/>
            {isExpired(icpDate)&&icpDate&&<div style={{fontSize:11,color:"#eb5757",marginTop:4}}>⚠️ Date dépassée</div>}
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button style={S.btn("secondary")} onClick={onClose}>Annuler</button>
        <button style={S.btn("primary")} onClick={()=>onSave({vma_ajour:vmaAjour,vma_date:vmaDate,icp_ajour:icpAjour,icp_date:icpDate})}>💾 Enregistrer</button>
      </div>
    </div>
  );
}

function Equipe({membres,gardes,currentUser,onRenommer,onToggleRole,onSupprimer,onAjouter,onFiche}){
  const today=new Date();
  return (
    <div>
      <div style={S.row}>
        <div><div style={S.pageTitle}>Équipe</div><div style={S.pageSub}>{membres.length} membres</div></div>
        <button style={S.btn("primary")} onClick={onAjouter}>➕ Ajouter</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {membres.map(m=>{
          const mG=gardes.filter(g=>{ const d=new Date(g.date+"T00:00:00"); return g.membreId===m.id&&d.getFullYear()===today.getFullYear()&&d.getMonth()===today.getMonth(); }).length;
          const total=gardes.filter(g=>g.membreId===m.id).length;
          const isMe=m.id===currentUser.id;
          const vmaOk=m.vma_ajour&&!isExpired(m.vma_date);
          const icpOk=m.icp_ajour&&!isExpired(m.icp_date);
          return (
            <div key={m.id} style={{...S.card,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <div style={S.avatar(m.color,42)}>{initiales(m)}</div>
              <div style={{flex:1,minWidth:100}}>
                <div style={{fontWeight:600,fontSize:14}}>{displayName(m)}</div>
                <div style={{fontSize:11,color:"#b0a89a"}}>🔒 {m.password||"—"}</div>
              </div>
              <span style={S.badge(m.role)}>{m.role==="admin"?"Admin":"Infirmier"}</span>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <span style={{...S.badgeOk(vmaOk),fontSize:10}}>VMA {vmaOk?"✅":"❌"}{m.vma_date?" · "+formatDateShort(m.vma_date):""}</span>
                <span style={{...S.badgeOk(icpOk),fontSize:10}}>ICP {icpOk?"✅":"❌"}{m.icp_date?" · "+formatDateShort(m.icp_date):""}</span>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:10,color:"#b0a89a"}}>Mois / Total</div>
                <div style={{fontFamily:"monospace",fontWeight:700,fontSize:13}}>{mG} / {total}</div>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button style={{...S.btn("ghost"),padding:"5px 8px",fontSize:16}} onClick={()=>onFiche(m)} title="Fiche VMA/ICP">📋</button>
                <button style={{...S.btn("ghost"),padding:"5px 8px",fontSize:16}} onClick={()=>onRenommer(m)} title="Modifier">✏️</button>
                {!isMe&&<button style={{...S.btn("ghost"),padding:"5px 8px",fontSize:16}} onClick={()=>onToggleRole(m.id)}>{m.role==="admin"?"⭐":"👤"}</button>}
                {!isMe&&<button style={{...S.btn("ghost"),padding:"5px 8px",fontSize:16,color:"#eb5757"}} onClick={()=>onSupprimer(m.id)}>🗑</button>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{fontSize:12,color:"#b0a89a",marginTop:12,padding:"10px 14px",background:"#1a1a1a",border:"1px solid #2c2c2c",borderRadius:8}}>
        ℹ️ Cliquez sur 📋 pour modifier la fiche VMA/ICP d'un agent.
      </div>
    </div>
  );
}

export default function App(){
  const [membres,setMembres]=useState([]);
  const [gardes,setGardes]  =useState([]);
  const [loading,setLoading]=useState(true);
  const [currentUser,setCurrentUser]=useState(null);
  const [view,setView]=useState("calendrier");
  const [toast,setToast]=useState({msg:"",type:""});
  const [modalGarde,setModalGarde]      =useState(null);
  const [modalRenommer,setModalRenommer]=useState(null);
  const [modalAjouter,setModalAjouter]  =useState(false);
  const [modalFiche,setModalFiche]      =useState(null);
  const [renommerP,setRenommerP]=useState("");
  const [renommerN,setRenommerN]=useState("");
  const [renommerMdp,setRenommerMdp]=useState("");
  const [ajouterP,setAjouterP]  =useState("");
  const [ajouterN,setAjouterN]  =useState("");
  const [ajouterRole,setAjouterRole]=useState("infirmier");
  const [ajouterMdp,setAjouterMdp]  =useState("");
  const [mgType,setMgType]=useState(TYPES_GARDE[0].value);
  const [mgNote,setMgNote]=useState("");

  const showToast=(msg,type="")=>{ setToast({msg,type}); setTimeout(()=>setToast({msg:"",type:""}),3000); };

  useEffect(()=>{
    const unsubM=onSnapshot(collection(db,"membres"),snap=>{
      if(snap.empty){ DEFAULT_MEMBRES.forEach(m=>setDoc(doc(db,"membres",m.id),m)); setMembres(DEFAULT_MEMBRES); }
      else { const data=snap.docs.map(d=>({id:d.id,...d.data()})); data.sort((a,b)=>a.id.localeCompare(b.id)); setMembres(data); }
      setLoading(false);
    });
    const unsubG=onSnapshot(collection(db,"gardes"),snap=>{ setGardes(snap.docs.map(d=>({id:d.id,...d.data()}))); });
    return ()=>{ unsubM(); unsubG(); };
  },[]);

  const ajouterGarde=async({date,type,note,membreId})=>{
    const mid=membreId||currentUser.id;
    if(gardes.find(g=>g.membreId===mid&&g.date===date)){showToast("Déjà une entrée ce jour.","");return false;}
    const id=`g${Date.now()}`;
    await setDoc(doc(db,"gardes",id),{id,membreId:mid,date,type,status:"en-attente",note:note||""});
    showToast("Demande soumise !","success"); return true;
  };
  const annulerGarde=async(id)=>{ await deleteDoc(doc(db,"gardes",id)); showToast("Annulée.","warning"); };
  const validerGarde=async(id)=>{ await updateDoc(doc(db,"gardes",id),{status:"validee"}); showToast("Validée !","success"); };
  const refuserGarde=async(id)=>{ await updateDoc(doc(db,"gardes",id),{status:"refusee"}); showToast("Refusée.","warning"); };
  const confirmerRenommer=async()=>{
    if(!renommerP||!renommerN){showToast("Prénom et nom requis.");return;}
    if(!renommerMdp||renommerMdp.length<3){showToast("Mot de passe trop court.");return;}
    await updateDoc(doc(db,"membres",modalRenommer.id),{prenom:renommerP,nom:renommerN,password:renommerMdp});
    if(currentUser.id===modalRenommer.id) setCurrentUser(prev=>({...prev,prenom:renommerP,nom:renommerN,password:renommerMdp}));
    setModalRenommer(null); showToast("Profil mis à jour.","success");
  };
  const toggleRole=async(id)=>{ const m=membres.find(x=>x.id===id); if(!m) return; await updateDoc(doc(db,"membres",id),{role:m.role==="admin"?"infirmier":"admin"}); showToast("Rôle mis à jour.","success"); };
  const supprimerMembre=async(id)=>{
    if(id===currentUser.id){showToast("Impossible de vous supprimer.");return;}
    await deleteDoc(doc(db,"membres",id));
    await Promise.all(gardes.filter(g=>g.membreId===id).map(g=>deleteDoc(doc(db,"gardes",g.id))));
    showToast("Membre supprimé.","warning");
  };
  const ajouterMembre=async()=>{
    if(!ajouterP||!ajouterN){showToast("Prénom et nom requis.");return;}
    if(!ajouterMdp||ajouterMdp.length<3){showToast("Mot de passe trop court.");return;}
    const id=`m${Date.now()}`;
    await setDoc(doc(db,"membres",id),{id,label:`Poste ${membres.length+1}`,prenom:ajouterP,nom:ajouterN,role:ajouterRole,color:COLORS[membres.length%COLORS.length],password:ajouterMdp,vma_ajour:false,vma_date:"",icp_ajour:false,icp_date:""});
    setAjouterP("");setAjouterN("");setAjouterRole("infirmier");setAjouterMdp("");
    setModalAjouter(false); showToast("Membre ajouté !","success");
  };
  const saveFiche=async(data)=>{ await updateDoc(doc(db,"membres",modalFiche.id),data); setModalFiche(null); showToast("Fiche mise à jour !","success"); };

  if(loading) return (
    <div style={{...S.body,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>🚒</div><div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Garde ISPV</div><div style={{color:"#b0a89a"}}>Connexion…</div></div>
    </div>
  );

  if(!currentUser) return <div style={S.body}><LoginScreen membres={membres} onLogin={m=>{setCurrentUser(m);setView("calendrier");}}/></div>;

  const pending=gardes.filter(g=>g.status==="en-attente").length;
  const navItems=[
    {id:"calendrier",icon:"📅",label:"Calendrier"},
    {id:"mes-gardes",icon:"🛡️",label:"Mes gardes"},
    {id:"poser-garde",icon:"➕",label:"Poser une garde"},
    ...(currentUser.role==="admin"?[{id:"demandes",icon:"📋",label:"Demandes",badge:pending},{id:"equipe",icon:"👥",label:"Équipe"}]:[])
  ];

  return (
    <div style={S.body}>
      <header style={S.header}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"#c0392b",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔥</div>
          <div><div style={S.logoText}>Garde ISPV</div><div style={S.logoSub}>Planning en temps réel 🟢</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#2c2c2c",border:"1px solid #3d3d3d",borderRadius:32,padding:"5px 14px 5px 7px"}}>
            <div style={S.avatar(currentUser.color,28)}>{initiales(currentUser)}</div>
            <div><div style={{fontSize:13,fontWeight:500}}>{displayName(currentUser)}</div><div style={{fontSize:11,color:"#b0a89a"}}>{currentUser.role==="admin"?"Administrateur":"Infirmier"}</div></div>
          </div>
          <button style={S.btn("ghost")} onClick={()=>setCurrentUser(null)}>⎋ Déco</button>
        </div>
      </header>
      <div style={S.layout}>
        <nav style={S.sidebar}>
          <div style={{padding:"0 8px",display:"flex",flexDirection:"column",gap:2}}>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1.5,color:"#b0a89a",margin:"0 0 6px 12px"}}>Navigation</div>
            {navItems.map(item=>(
              <button key={item.id} style={S.navItem(view===item.id)} onClick={()=>setView(item.id)}>
                <span>{item.icon}</span><span>{item.label}</span>
                {item.badge>0&&<span style={{marginLeft:"auto",background:"#c0392b",color:"#fff",borderRadius:20,padding:"1px 7px",fontSize:11}}>{item.badge}</span>}
              </button>
            ))}
          </div>
          <div style={{marginTop:"auto",padding:"12px 16px",borderTop:"1px solid #2c2c2c"}}>
            <button style={{...S.btn("secondary"),width:"100%",justifyContent:"center"}} onClick={()=>setView("poser-garde")}>➕ Nouvelle garde</button>
          </div>
        </nav>
        <main style={S.main}>
          {view==="calendrier"&&<div><div style={S.row}><div><div style={S.pageTitle}>Calendrier</div><div style={S.pageSub}>Planning partagé en temps réel</div></div></div><CalendarView membres={membres} gardes={gardes} onAddGarde={date=>{setModalGarde({date});setMgNote("");setMgType(TYPES_GARDE[0].value);}}/></div>}
          {view==="mes-gardes"&&<MesGardes gardes={gardes} currentUser={currentUser} onAnnuler={annulerGarde} onPose={()=>setView("poser-garde")}/>}
          {view==="poser-garde"&&<PoserGarde currentUser={currentUser} gardes={gardes} onSubmit={async d=>{const ok=await ajouterGarde(d);if(ok)setView("mes-gardes");}} onCancel={()=>setView("calendrier")}/>}
          {view==="demandes"&&currentUser.role==="admin"&&<Demandes gardes={gardes} membres={membres} onValider={validerGarde} onRefuser={refuserGarde}/>}
          {view==="equipe"&&currentUser.role==="admin"&&<Equipe membres={membres} gardes={gardes} currentUser={currentUser} onRenommer={m=>{setModalRenommer(m);setRenommerP(m.prenom);setRenommerN(m.nom);setRenommerMdp(m.password||"");}} onToggleRole={toggleRole} onSupprimer={supprimerMembre} onAjouter={()=>setModalAjouter(true)} onFiche={m=>setModalFiche(membres.find(x=>x.id===m.id))}/>}
        </main>
      </div>

      <Modal open={!!modalGarde} onClose={()=>setModalGarde(null)} title="Poser une garde" subtitle={modalGarde?formatDateLong(modalGarde.date):""}>
        <div style={{marginBottom:14}}><label style={S.label}>Type</label>
          <select style={S.input} value={mgType} onChange={e=>setMgType(e.target.value)}>{TYPES_GARDE.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}</select>
        </div>
        <div style={{marginBottom:20}}><label style={S.label}>Note (optionnel)</label>
          <textarea style={{...S.input,minHeight:65,resize:"vertical"}} value={mgNote} onChange={e=>setMgNote(e.target.value)} placeholder="Précision..."/>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button style={S.btn("secondary")} onClick={()=>setModalGarde(null)}>Annuler</button>
          <button style={S.btn("primary")} onClick={async()=>{const ok=await ajouterGarde({date:modalGarde.date,type:mgType,note:mgNote});if(ok)setModalGarde(null);}}>Soumettre</button>
        </div>
      </Modal>

      <Modal open={!!modalRenommer} onClose={()=>setModalRenommer(null)} title="✏️ Modifier le profil" subtitle={modalRenommer?`Profil : ${displayName(modalRenommer)}`:""}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div><label style={S.label}>Prénom</label><input style={S.input} value={renommerP} onChange={e=>setRenommerP(e.target.value)} placeholder="Jean"/></div>
          <div><label style={S.label}>Nom</label><input style={S.input} value={renommerN} onChange={e=>setRenommerN(e.target.value)} placeholder="Dupont"/></div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={S.label}>🔒 Mot de passe</label>
          <input type="text" style={S.input} value={renommerMdp} onChange={e=>setRenommerMdp(e.target.value)} placeholder="Minimum 3 caractères"/>
          <div style={{fontSize:11,color:"#b0a89a",marginTop:4}}>⚠️ Communiquez ce mot de passe à l'infirmier</div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button style={S.btn("secondary")} onClick={()=>setModalRenommer(null)}>Annuler</button>
          <button style={S.btn("primary")} onClick={confirmerRenommer}>✅ Confirmer</button>
        </div>
      </Modal>

      <Modal open={modalAjouter} onClose={()=>setModalAjouter(false)} title="Nouveau Membre">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div><label style={S.label}>Prénom</label><input style={S.input} value={ajouterP} onChange={e=>setAjouterP(e.target.value)} placeholder="Jean"/></div>
          <div><label style={S.label}>Nom</label><input style={S.input} value={ajouterN} onChange={e=>setAjouterN(e.target.value)} placeholder="Dupont"/></div>
        </div>
        <div style={{marginBottom:14}}><label style={S.label}>Rôle</label>
          <select style={S.input} value={ajouterRole} onChange={e=>setAjouterRole(e.target.value)}>
            <option value="infirmier">🏥 Infirmier</option><option value="admin">⭐ Administrateur</option>
          </select>
        </div>
        <div style={{marginBottom:20}}>
          <label style={S.label}>🔒 Mot de passe</label>
          <input type="text" style={S.input} value={ajouterMdp} onChange={e=>setAjouterMdp(e.target.value)} placeholder="Minimum 3 caractères"/>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button style={S.btn("secondary")} onClick={()=>setModalAjouter(false)}>Annuler</button>
          <button style={S.btn("primary")} onClick={ajouterMembre}>Ajouter</button>
        </div>
      </Modal>

      <Modal open={!!modalFiche} onClose={()=>setModalFiche(null)} title="📋 Fiche Agent" subtitle="Suivi VMA et ICP">
        {modalFiche&&<FicheAgent membre={modalFiche} gardes={gardes} onClose={()=>setModalFiche(null)} onSave={saveFiche}/>}
      </Modal>

      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}
