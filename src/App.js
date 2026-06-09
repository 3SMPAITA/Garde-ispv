
Claude a terminé la réponse.
Bonjour, est-ce que tu es capable de créer une application

5 juin
Bonjour ! Oui, tout à fait — je peux créer des applications web, des interfaces interactives, des outils, des jeux, des dashboards, et bien plus encore.

Qu'est-ce que vous souhaitez créer ?

Je t’explique alors, j’aurais besoin d’une application ou logiciel pour poser des gardes Pompiers
Nous sommes plusieurs infirmiers et j’aimerais qu’on puisse poser des Gardes sur ce logiciel

5 juin
Super idée ! Pour bien concevoir l'application, j'ai quelques questions :

Q: Combien d'infirmiers utilisent l'application ?
A: 6-15 personnes

Q: Comment souhaitez-vous gérer les gardes ?
A: Les deux

Q: Quel type d'affichage souhaitez-vous ?
A: Calendrier mensuel

5 juin
Parfait ! Je vais créer une application complète avec :

Vue calendrier mensuel pour visualiser toutes les gardes
Espace personnel pour que chaque infirmier pose ses disponibilités
Espace admin pour valider/modifier les gardes
Gestion des membres (jusqu'à 15 personnes)
Je lis d'abord le skill de design pour vous faire quelque chose de soigné...


Consulté un fichier, fichier créé, lu un fichier
Consulté un fichier, fichier créé, lu un fichier
Voici votre application GardeFeu ! Voici ce qu'elle contient :

Pour tous les infirmiers :

Connexion avec sélection de profil (7 membres de démo)
Calendrier mensuel avec toutes les gardes colorées
"Mes gardes" — voir et filtrer ses propres gardes, annuler une demande en attente
Poser une garde — choisir la date et le type (journée, nuit, 24h, week-end)
Pour l'administrateur (Sophie Martin) :

Tableau de bord des demandes avec validation / refus en 1 clic
Gestion de l'équipe — ajouter ou retirer des membres
Badge rouge indiquant le nombre de demandes en attente
Souhaitez-vous des ajustements — changer les noms, ajouter des types de garde, ou modifier quelque chose ?


Gardes pompiers
Code · HTML 
Oui, peux-tu mettre à la place des prénoms et des noms des profils que l’administrateur peut renommer quand il veut. En effet, nous avons un gros tourneur d’infirmier.

Peux-tu également changer le nom de l’application et l’appeler Garde ISPV.

Peux-tu également me donner la possibilité d’ajouter une autre personne en tant qu’administrateur.

5 juin

Reading the current app file
Reading the current app file
Parfait, j'ai tout le code. Je vais maintenant appliquer les 3 modifications :


4 fichiers modifiés, a exécuté une commande
4 fichiers modifiés, a exécuté une commande
Now update the équipe table to add rename + role-change buttons, and add the rename modal:


2 fichiers modifiés
2 fichiers modifiés
Now add the rename modal HTML, and update the add member modal to include role choice with admin option:


Add rename modal and update add member modal to allow admin role
Add rename modal and update add member modal to allow admin role
Now update the "Ajouter un membre" modal to include admin role option and update the function:


2 fichiers modifiés, a consulté 2 fichiers
2 fichiers modifiés, a consulté 2 fichiers
Now update the login subtitle and demo gardes to remove names:


2 fichiers modifiés
2 fichiers modifiés
Finally update the initiales function to handle single-word names gracefully:


Fichier modifié, a exécuté une commande, lu un fichier
Fichier modifié, a exécuté une commande, lu un fichier
Voici les 3 modifications apportées à Garde ISPV :

1. Profils renommables — Les profils s'appellent désormais "Poste 1", "Poste 2"… En tant qu'admin, dans l'onglet Équipe, le bouton ✏️ permet de renommer n'importe quel profil avec le prénom et nom de l'infirmier en poste. Parfait pour gérer un fort roulement !

2. Nouveau nom — L'application s'appelle maintenant Garde ISPV partout (header, onglet, écran de connexion).

3. Promotion administrateur — Dans l'onglet Équipe, le bouton ⭐/👤 permet de basculer le rôle de n'importe quel membre entre Infirmier et Administrateur. Vous pouvez aussi choisir le rôle Administrateur directement à l'ajout d'un nouveau membre.


Gardes ispv
Code · HTML 
Merci
Comment je fais maintenant pour extraire l’application et la mettre sur mon téléphone et l’envoyer à mes collègues pour la tester?

5 juin
Bonne question ! Voici vos options selon ce que vous voulez faire :

📱 Sur votre téléphone (sans installation)

L'application est un fichier HTML autonome — il suffit de l'ouvrir dans un navigateur mobile :

Téléchargez le fichier gardes-ispv.html depuis cette conversation
Envoyez-le par email ou WhatsApp à vos collègues
Sur le téléphone, ouvrez le fichier avec Chrome ou Safari
Pour l'avoir "comme une appli" : dans Chrome/Safari, faites "Ajouter à l'écran d'accueil" — ça crée une icône comme une vraie app
⚠️ Limitation importante à connaître

Actuellement, chaque personne a sa propre version locale du fichier. Les gardes posées par un collègue ne s'affichent pas chez les autres — les données ne sont pas partagées.

✅ Pour un vrai usage collectif, il faut l'héberger en ligne

La solution la plus simple et gratuite :

Netlify Drop — vous glissez-déposez le fichier HTML, et en 30 secondes vous avez un lien URL à partager (ex: gardes-ispv.netlify.app)
Tout le monde accède à la même adresse depuis leur téléphone
Cependant, même hébergé ainsi, les données ne seront pas encore partagées entre utilisateurs (chacun voit son propre planning local).

💡 Ma recommandation

Si vous voulez tester avec vos collègues rapidement → Netlify Drop pour partager le lien. Pour un usage réel avec données partagées, il faudrait que je modifie l'application pour utiliser une base de données en ligne (solution plus avancée).

Voulez-vous que j'ajoute une base de données partagée pour que tout le monde voie les mêmes gardes en temps réel ?

Oui s’il te plaît, le but est que ce soit une application partagée avec chacun son accès mais que tout le monde puisse voir le planning avec les Gardes validéEs et qui s’est positionné sur La garde une fois qu’elle est validée

5 juin
Bonne nouvelle — je peux faire ça avec une base de données intégrée directement dans l'application, sans serveur à gérer de votre côté !

Je vais utiliser le stockage partagé des Artifacts de Claude pour que toutes les données soient communes à tous les utilisateurs. Voici ce que je vais construire :


Read the current gardes-ispv file to base the React version on it
Read the current gardes-ispv file to base the React version on it
Je vais reconstruire l'application en React avec le stockage partagé. Toutes les données (membres, gardes) seront communes à tous les utilisateurs.


Fichier créé, lu un fichier
Fichier créé, lu un fichier
L'application est maintenant entièrement partagée ! Voici ce qui change :

🔄 Données communes en temps réel

Toutes les gardes posées, validées ou refusées sont visibles par tout le monde immédiatement
Les membres et leur nommage sont aussi partagés
Rafraîchissement automatique toutes les 30 secondes, ou manuellement avec le bouton 🔄
Comment ça fonctionne maintenant :

Chaque infirmier choisit son profil à la connexion
Il pose sa garde → elle apparaît en attente sur le calendrier de tout le monde
L'admin valide → tout le monde voit la garde en vert avec le nom de l'infirmier
L'admin peut renommer les profils au fur et à mesure du roulement
⚠️ Important à savoir : Cette version fonctionne directement ici dans Claude. Pour un déploiement indépendant sur votre téléphone et partageable à vos collègues via un lien, il faudrait héberger l'application sur un service externe (Netlify, Vercel) avec une vraie base de données. Souhaitez-vous que je vous guide pour cette étape ?


Garde ispv
Code · JSX 
Oui stp

5 juin
Pour héberger l'application de façon permanente et partageable, voici la solution la plus simple — gratuite et sans compétences techniques :

🗂️ Ce dont vous aurez besoin
Un compte GitHub (gratuit) → github.com
Un compte Firebase (gratuit) → firebase.google.com
Un compte Netlify (gratuit) → netlify.com
🔥 Pourquoi Firebase ?
Firebase est la base de données de Google. Elle permet à tous vos collègues de voir les mêmes données en temps réel, gratuitement jusqu'à 1 Go de stockage — largement suffisant pour votre usage.

📋 Les grandes étapes
Étape 1 — Créer la base de données Firebase

Créez un projet sur console.firebase.google.com
Activez Firestore Database (mode test pour commencer)
Récupérez vos clés de configuration
Étape 2 — Adapter l'application

Je modifie le code pour brancher Firebase à la place du stockage actuel
Vous mettez le code sur GitHub
Étape 3 — Déployer sur Netlify

Netlify lit votre GitHub et génère un lien URL public
Ex : garde-ispv.netlify.app
Vous partagez ce lien à vos collègues
💬 Ma question
Avez-vous déjà un compte GitHub ou Firebase, ou est-ce que tout est à créer de zéro ?

Selon votre réponse, je vous guide pas à pas et je prépare le code adapté à Firebase.

Je n’y connais absolument rien, je dois tout faire

5 juin
Pas de panique, je vais vous guider étape par étape, très simplement. Commençons par le début.

Étape 1 — Créer un compte GitHub
GitHub est juste un endroit pour stocker votre code en ligne.

Allez sur github.com
Cliquez sur "Sign up"
Entrez une adresse email, un mot de passe, un nom d'utilisateur
Validez votre email
✅ Une fois fait, dites-le moi et je vous donne l'étape 2.

Étape 2 — Créer un compte Firebase
Firebase est la base de données de Google qui va synchroniser les gardes entre tous vos collègues.

Allez sur firebase.google.com
Cliquez sur "Commencer" ou "Get started"
Connectez-vous avec un compte Google (Gmail) — si vous en avez un, c'est suffisant
✅ Une fois fait, dites-le moi et je vous donne l'étape 3.

Étape 3 — Créer un compte Netlify
Netlify va publier votre application sur internet avec un lien à partager.

Allez sur netlify.com
Cliquez sur "Sign up"
Choisissez "Sign up with GitHub" — ça les lie directement, c'est plus simple
Prenez votre temps, il n'y a pas d'urgence. Dites-moi quand les 3 comptes sont créés et on passe à la suite 🙂

C’est bon j’ai fini les trois étapes

6 juin
Parfait, on attaque maintenant Firebase pour créer votre base de données !

Étape 4 — Créer le projet Firebase
Allez sur console.firebase.google.com
Cliquez sur "Créer un projet"
Nom du projet : tapez garde-ispv
Cliquez Continuer
Sur l'écran Google Analytics → désactivez-le (pas besoin), puis Créer le projet
Attendez 10-20 secondes, puis cliquez Continuer
✅ Vous êtes maintenant dans votre projet Firebase.

Étape 5 — Créer la base de données Firestore
Dans le menu à gauche, cliquez sur "Firestore Database"
Cliquez "Créer une base de données"
Choisissez "Commencer en mode test"
Cliquez Suivant puis Activer
Attendez 20-30 secondes que ça se crée
✅ La base de données est prête.

Étape 6 — Récupérer les clés de configuration
C'est la partie la plus importante — ces clés permettront à l'application de se connecter à votre base de données.

Cliquez sur l'icône ⚙️ roue dentée en haut à gauche → "Paramètres du projet"
Descendez jusqu'à la section "Vos applications"
Cliquez sur l'icône </> (Web)
Nom de l'appli : tapez garde-ispv
Cliquez "Enregistrer l'application"
Vous verrez apparaître un bloc de code avec des informations — copiez-collez moi tout ce bloc ici
Il ressemble à ça :

apiKey: "AIzaSy...",
authDomain: "garde-ispv.firebaseapp.com",
projectId: "garde-ispv",
...
Envoyez-moi ces informations et je prépare immédiatement le code complet de l'application ! 🙂

photo.jpeg
Je suis au numéro deux de l’étape cinq. J’ai appuyé sur créer une base de données et j’obtiens ça…
Je n’ai pas marqué commencer en mode test. Que dois-je faire ?

6 juin
Pas de souci, vous êtes sur le bon écran ! Suivez ces étapes :

Édition Standard est déjà sélectionnée (le bouton bleu) → c'est parfait, ne changez rien
Cliquez sur "Suivant"
Sur l'écran suivant (étape 2 — ID et emplacement) :

Laissez l'ID tel quel
Pour l'emplacement, choisissez eur3 (europe-west) — c'est le serveur le plus proche de vous
Cliquez "Suivant"
Sur l'écran suivant (étape 3 — Configurer) :

Vous verrez les règles de sécurité
Choisissez "Démarrer en mode test"
Cliquez "Créer"
Dites-moi quand c'est fait ! 🙂

Sachant que j’habite en Nouvelle-Calédonie, est-ce que je l’ai euro 3

6 juin
Bonne question ! La Nouvelle-Calédonie est dans le Pacifique, donc le serveur Europe n'est pas idéal pour vous.

Choisissez plutôt asia-southeast1 (Singapore) — c'est le serveur Google le plus proche de la Nouvelle-Calédonie, la connexion sera bien plus rapide pour vous et vos collègues.

Donc sur l'écran "ID et emplacement" :

Dans la liste déroulante, sélectionnez asia-southeast1
Cliquez Suivant
Choisissez "Démarrer en mode test"
Cliquez Créer
Dites-moi quand c'est bon ! 🙂

C’est bon

6 juin
Parfait ! Maintenant on récupère vos clés de configuration.

Étape 6 — Récupérer les clés Firebase
Dans le menu à gauche, cliquez sur l'icône ⚙️ roue dentée (en haut à gauche, à côté de "Vue d'ensemble du projet")
Cliquez sur "Paramètres du projet"
Descendez vers le bas jusqu'à la section "Vos applications"
Cliquez sur l'icône </> (c'est le symbole Web)
Dans le champ "Nom de l'application" tapez garde-ispv
Cliquez "Enregistrer l'application"
Vous verrez apparaître un bloc avec des informations
Envoyez-moi une photo de cet écran (comme vous venez de faire) ou copiez-collez le texte ici.

⚠️ Pas d'inquiétude, ces clés ne donnent accès qu'à votre base de données Firebase, elles sont faites pour être partagées dans une application.

photo.jpeg
6 juin
Parfait, j'ai toutes vos clés ! Je prépare maintenant le code complet de l'application avec Firebase intégré.


Read the current React app to base the Firebase version on it
Read the current React app to base the Firebase version on it
J'ai bien lu vos clés sur la photo. Je génère maintenant le projet complet prêt à déployer.


7 fichiers créés, exécuté 2 commandes, lu un fichier
7 fichiers créés, exécuté 2 commandes, lu un fichier
Le code est prêt ! Voici la suite étape par étape :

Étape 7 — Mettre le code sur GitHub
Allez sur github.com et connectez-vous
Cliquez sur "New" (bouton vert) pour créer un dépôt
Nom du dépôt : garde-ispv
Laissez tout le reste par défaut, cliquez "Create repository"
Sur la page qui s'ouvre, cliquez "uploading an existing file"
Téléchargez le fichier ZIP ci-dessus, dézippez-le sur votre ordinateur
Glissez-déposez tous les fichiers et dossiers du dossier garde-ispv dans la page GitHub
Cliquez "Commit changes"
Étape 8 — Déployer sur Netlify
Allez sur netlify.com et connectez-vous
Cliquez "Add new site" → "Import from Git"
Choisissez GitHub → sélectionnez votre dépôt garde-ispv
Netlify détecte tout automatiquement → cliquez "Deploy site"
Attendez 2-3 minutes ☕
Vous obtenez un lien du type garde-ispv-xyz.netlify.app — partagez-le à vos collègues !
Dites-moi quand vous êtes à l'étape 7 et envoyez-moi une photo si vous êtes bloqué 🙂


Garde ispv complet
ZIP 
photo.jpeg
Je ne vois pas où j’en suis. Peux-tu me guider plus précisément

6 juin
Parfait, votre dépôt GitHub est bien créé ! Je vois que vous êtes sur la bonne page. Maintenant il faut uploader les fichiers.

Étape 7 — Uploader les fichiers
D'abord sur votre ordinateur :

Trouvez le fichier ZIP garde-ispv-complet.zip que vous avez téléchargé
Faites un clic droit dessus → "Extraire tout" (ou "Décompresser")
Un dossier garde-ispv apparaît — ouvrez-le
Vous devez voir à l'intérieur : un dossier src, un dossier public, et des fichiers package.json, netlify.toml, README.md
Ensuite sur GitHub :

Sur votre écran, je vois le lien "uploading an existing file" en bleu — cliquez dessus.

Vous arrivez sur une page avec une zone de glisser-déposer. Faites ceci :

Ouvrez le dossier garde-ispv dézippé sur votre ordinateur
Sélectionnez tout (Ctrl+A)
Glissez-déposez tout dans la zone GitHub
Attendez que tous les fichiers s'uploadent (quelques secondes)
En bas de page, cliquez le bouton vert "Commit changes"
Envoyez-moi une photo quand vous êtes sur la page d'upload ou si vous êtes bloqué 🙂

Le format que j’ai téléchargé est au format TSX comme tu me l’as préparé, est-ce que c’est bon pour toi ?

6 juin
Bonne question ! Non, il y a un léger problème — le fichier ZIP contient des fichiers .js, pas .tsx. Mais ce que vous avez téléchargé depuis l'artifact Claude est au format .jsx ou .tsx, ce qui est différent.

Ignorez le fichier téléchargé depuis l'artifact — utilisez uniquement le fichier ZIP garde-ispv-complet.zip que je vous ai préparé juste au-dessus, celui avec le bouton de téléchargement.

Pour vérifier que vous avez le bon fichier :

Cherchez sur votre ordinateur le fichier qui s'appelle exactement garde-ispv-complet.zip
Dézippez-le
À l'intérieur vous devez voir :
📁 src
📁 public
📄 package.json
📄 netlify.toml
📄 README.md
Si vous voyez bien ces fichiers, c'est le bon — uploadez tout ça sur GitHub comme expliqué.

Si vous ne trouvez pas ce ZIP, dites-le moi et je vous le régénère 🙂

photo.jpeg
Le fichier SRC. Zip est bloqué

6 juin
Pas de panique, c'est normal ! Gmail bloque les fichiers ZIP contenant du code car il les considère suspects par précaution — votre fichier n'a pas de virus.

Ne passez pas par Gmail pour transférer le ZIP.

Solution simple — Utiliser Google Drive
Allez sur drive.google.com
Cliquez "+ Nouveau" → "Importer un fichier"
Sélectionnez le fichier garde-ispv-complet.zip depuis votre ordinateur
Une fois uploadé, double-cliquez dessus pour l'ouvrir
Cliquez "Ouvrir avec Google Drive" — il va dézipper le contenu
Téléchargez les fichiers depuis Drive sur votre ordinateur
Ou encore plus simple — téléchargez directement depuis Claude

Le ZIP est disponible juste au-dessus dans notre conversation (le fichier garde-ispv-complet). Téléchargez-le directement depuis ici sur votre ordinateur, sans passer par Gmail.

Vous l'avez bien téléchargé depuis Claude ou vous l'avez envoyé par email à vous-même ?

C’est bon j’ai réussi à le dezipper , on peut continuer

6 juin
Super ! Maintenant uploadez les fichiers sur GitHub.

Étape 7 — Uploader sur GitHub
Retournez sur github.com → votre dépôt Garde-ispv
Cliquez sur "uploading an existing file" (le lien bleu)
Ouvrez le dossier garde-ispv dézippé sur votre ordinateur
Sélectionnez tout avec Ctrl+A
Glissez-déposez tout dans la zone GitHub
Attendez que les fichiers s'uploadent
En bas de page cliquez le bouton vert "Commit changes"
Envoyez-moi une photo quand c'est fait ou si vous êtes bloqué 🙂

photo.jpeg
J’en suis là et je n’arrive pas à avancer

6 juin
Parfait, c'est exactement ce qu'il fallait ! Tous vos fichiers sont bien sur GitHub — je vois public, src, README.md, netlify.toml et package.json. C'est parfait ! 🎉

Passons maintenant à Netlify.

Étape 8 — Déployer sur Netlify
Allez sur l'onglet "Start | Sign up | Netlify" que vous avez déjà ouvert
Connectez-vous avec votre compte GitHub
Une fois connecté, cliquez sur "Add new site"
Cliquez "Import from Git"
Cliquez "GitHub"
Autorisez Netlify à accéder à GitHub si demandé
Vous verrez apparaître votre dépôt "Garde-ispv" — cliquez dessus
Sur l'écran suivant, laissez tout par défaut et cliquez "Deploy Garde-ispv"
Attendez 2-3 minutes ☕ et envoyez-moi une photo du résultat — vous devriez voir un lien URL apparaître !

photo.jpeg
Voilà, j’en suis là

6 juin
🎉 C'est déployé avec succès ! Tout est au vert !

Je vois "Initializing ✅, Building ✅, Deploying ✅, Cleanup ✅, Post-processing ✅"

Dernière étape — Ouvrir votre application !
Cliquez sur le bouton "Open production deploy" (le bouton turquoise en haut à gauche de votre écran).

Votre application va s'ouvrir dans un nouvel onglet avec une adresse du type preeminent-gumption-xxxxx.netlify.app.

Copiez cette adresse URL et partagez-la à vos collègues par WhatsApp ou SMS — ils pourront l'ouvrir directement sur leur téléphone sans rien installer !

Dites-moi si l'application s'ouvre correctement 🙂

J’ai réussi à faire tout ce que tu m’as demandé du coup, j’ai pu tester l’application, il y aurait des choses à modifier Comment peut-on procéder il faut recommencer tout le process ?

6 juin
Bonne nouvelle — non, vous n'avez pas à recommencer ! C'est l'avantage d'avoir tout configuré correctement.

Le processus de mise à jour est beaucoup plus simple :

Pour modifier l'application
Vous me dites ce que vous voulez changer ici dans Claude
Je modifie le code et vous prépare un nouveau fichier
Vous allez sur GitHub → votre dépôt Garde-ispv → cliquez sur le fichier à remplacer → cliquez l'icône ✏️ pour éditer, ou uploadez le nouveau fichier
Netlify se met à jour automatiquement en 1-2 minutes — pas besoin de retoucher Netlify !
GitHub et Netlify sont maintenant liés — chaque fois que vous modifiez un fichier sur GitHub, Netlify redéploie automatiquement.

Alors dites-moi : qu'est-ce que vous souhaitez modifier ? 😊

OK, je vais t’énumérer tout ce qu’on doit changer alors

Dans un premier temps, j’aimerais que chaque personne ait accès à son profil de manière sécurisée avec un mot de passe par exemple
Le but étant que l’infirmier numéro un ne puisse pas aller voir les Gardes du numéro deux ect…

J’aimerais aussi que tu modifies les horaires des Garde. En effet, la journée, les Garde s’effectue de 6h30 à 18h30 et la nuit de 18h30 à 6h30 du matin.

Le reste des fonctionnalités me paraît plutôt bien

6 juin
Très bonnes modifications ! Avant de coder, laissez-moi clarifier un point important sur la confidentialité :

Q: Sur la confidentialité des gardes : que doit voir chaque infirmier ?
A: Ses gardes + le calendrier global avec les noms visibles

Q: Pour les types de gardes, on garde lesquels ?
A: Journée 6h30-18h30 and Nuit 18h30-6h30

6 juin
Parfait, c'est très clair ! Voici ce que je vais faire :

Connexion sécurisée par mot de passe pour chaque profil
Calendrier global visible par tous avec les noms
Ses propres gardes accessibles uniquement à soi
Types de gardes : Journée 6h30-18h30 et Nuit 18h30-6h30 uniquement
Je code tout ça maintenant !


Read current App.js
Read current App.js
Je vois que le fichier contient déjà les horaires et une ébauche de mot de passe. Je vais réécrire le fichier complet proprement avec tout bien intégré.


Exécuté 2 commandes, lu un fichier
Exécuté 2 commandes, lu un fichier
Le fichier est prêt ! Cette fois vous n'avez qu'un seul fichier à remplacer sur GitHub. Voici comment faire :

Mise à jour sur GitHub
Allez sur github.com → votre dépôt Garde-ispv
Cliquez sur le dossier src
Cliquez sur le fichier App.js
Cliquez sur l'icône ✏️ crayon en haut à droite du fichier
Sélectionnez tout le texte (Ctrl+A) et supprimez-le
Ouvrez le fichier App.js que vous venez de télécharger, copiez tout son contenu (Ctrl+A puis Ctrl+C)
Collez-le dans GitHub (Ctrl+V)
Cliquez "Commit changes" en haut à droite
Netlify se met à jour automatiquement en 1-2 minutes ☕
Ce qui change dans cette version :

🔒 Chaque profil a son propre mot de passe — par défaut admin123 pour le Poste 1 (admin) et 1234 pour tous les autres
L'admin voit les mots de passe dans l'onglet Équipe et peut les modifier via ✏️
Les horaires sont Journée 6h30-18h30 et Nuit 18h30-6h30
Le calendrier reste visible par tous avec les noms

App
JS 

Souhaitez-vous être averti lorsque Claude répond ?




Claude est une IA et peut faire des erreurs. Veuillez vérifier les réponses.
App · JS
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
 
const COLORS = ["#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63","#00bcd4","#8bc34a","#ff5722","#795548","#607d8b","#ff9800","#26c6da"];
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const TYPES_GARDE = ["Journée 6h30-18h30","Nuit 18h30-6h30"];
const DEFAULT_MEMBRES = [
  { id:"m1", label:"Poste 1", prenom:"", nom:"", role:"admin",     color:COLORS[0],  password:"admin123" },
  { id:"m2", label:"Poste 2", prenom:"", nom:"", role:"infirmier", color:COLORS[1],  password:"1234" },
  { id:"m3", label:"Poste 3", prenom:"", nom:"", role:"infirmier", color:COLORS[2],  password:"1234" },
  { id:"m4", label:"Poste 4", prenom:"", nom:"", role:"infirmier", color:COLORS[3],  password:"1234" },
  { id:"m5", label:"Poste 5", prenom:"", nom:"", role:"infirmier", color:COLORS[4],  password:"1234" },
  { id:"m6", label:"Poste 6", prenom:"", nom:"", role:"infirmier", color:COLORS[5],  password:"1234" },
  { id:"m7", label:"Poste 7", prenom:"", nom:"", role:"infirmier", color:COLORS[6],  password:"1234" },
];
 
function displayName(m) { return (m.prenom||m.nom) ? `${m.prenom} ${m.nom}`.trim() : m.label; }
function initiales(m) {
  if (m.prenom && m.nom) return (m.prenom[0]+m.nom[0]).toUpperCase();
  if (m.prenom) return m.prenom[0].toUpperCase();
  const n = m.label.replace(/\D/g,""); return n?n[0]:"?";
}
function todayISO() { return new Date().toISOString().slice(0,10); }
function formatDateLong(str) { if(!str) return ""; return new Date(str+"T00:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }
function formatDateShort(str) { if(!str) return ""; return new Date(str+"T00:00:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}); }
 
const S = {
  body: { fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#0d0d0d", color:"#f0ece4", minHeight:"100vh", margin:0 },
  header: { background:"#1a1a1a", borderBottom:"2px solid #c0392b", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100 },
  logoText: { fontSize:22, fontWeight:800, letterSpacing:2, color:"#f0ece4" },
  logoSub: { fontSize:10, color:"#b0a89a", letterSpacing:1, textTransform:"uppercase" },
  layout: { display:"flex", height:"calc(100vh - 60px)" },
  sidebar: { width:220, background:"#1a1a1a", borderRight:"1px solid #2c2c2c", display:"flex", flexDirection:"column", padding:"16px 0", flexShrink:0, overflowY:"auto" },
  navItem: (active) => ({ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", margin:"1px 8px", borderRadius:8, cursor:"pointer", fontSize:13, color:active?"#fff":"#b0a89a", background:active?"#c0392b":"transparent", border:"none", width:"calc(100% - 16px)", textAlign:"left" }),
  main: { flex:1, overflowY:"auto", padding:"24px 28px" },
  pageTitle: { fontSize:28, fontWeight:800, letterSpacing:1, marginBottom:4 },
  pageSub: { fontSize:13, color:"#b0a89a", marginBottom:20 },
  row: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 },
  card: { background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:12, padding:20 },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:14, marginBottom:22 },
  statCard: { background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:10, padding:16 },
  statLabel: { fontSize:11, color:"#b0a89a", textTransform:"uppercase", letterSpacing:1, marginBottom:6 },
  statVal: (color) => ({ fontSize:36, fontWeight:800, color:color||"#f0ece4", lineHeight:1 }),
  btn: (v) => {
    const b = { padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", display:"inline-flex", alignItems:"center", gap:6 };
    if(v==="primary")   return {...b, background:"#c0392b", color:"#fff"};
    if(v==="secondary") return {...b, background:"#2c2c2c", color:"#f0ece4", border:"1px solid #3d3d3d"};
    if(v==="ghost")     return {...b, background:"transparent", color:"#b0a89a"};
    if(v==="green")     return {...b, background:"#0d2a0d", color:"#6fcf97", border:"1px solid #1a4a1a"};
    if(v==="red")       return {...b, background:"#2a0d0d", color:"#eb5757", border:"1px solid #4a1a1a"};
    return b;
  },
  input: { width:"100%", background:"#2c2c2c", border:"1px solid #3d3d3d", borderRadius:8, padding:"9px 13px", color:"#f0ece4", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
  label: { display:"block", fontSize:12, fontWeight:600, color:"#b0a89a", textTransform:"uppercase", letterSpacing:.5, marginBottom:6 },
  avatar: (color,size) => ({ width:size||32, height:size||32, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size?size*0.38:13, fontWeight:700, color:"#fff", flexShrink:0 }),
  badge: (role) => ({ padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:500, background:role==="admin"?"#2a1500":"#0a1a2a", color:role==="admin"?"#f8c471":"#5dade2", border:`1px solid ${role==="admin"?"#4a2a00":"#1a3a4a"}` }),
  pill: (status) => {
    const map={validee:{bg:"#0d2a0d",color:"#6fcf97",border:"1px solid #1a4a1a"},"en-attente":{bg:"#2a2200",color:"#f8c471",border:"1px solid #4a3a00"},refusee:{bg:"#2a0d0d",color:"#eb5757",border:"1px solid #4a1a1a"}};
    const s=map[status]||map["en-attente"];
    return {display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:500,background:s.bg,color:s.color,border:s.border,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"};
  },
  dot: (status) => ({ width:6, height:6, borderRadius:"50%", flexShrink:0, background:status==="validee"?"#6fcf97":status==="refusee"?"#eb5757":"#f8c471" }),
  modal: { position:"fixed", inset:0, background:"rgba(0,0,0,.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" },
  modalBox: { background:"#1a1a1a", border:"1px solid #2c2c2c", borderRadius:16, padding:32, width:460, maxWidth:"95vw", maxHeight:"90vh", overflowY:"auto" },
  toast: (show,type) => ({ position:"fixed", bottom:24, right:24, background:"#2c2c2c", borderLeft:`4px solid ${type==="success"?"#6fcf97":type==="warning"?"#f8c471":"#c0392b"}`, borderRadius:8, padding:"13px 20px", fontSize:14, zIndex:300, opacity:show?1:0, transform:show?"none":"translateY(12px)", transition:"all .3s", pointerEvents:"none" }),
  calCell: (isToday,isEmpty) => ({ minHeight:100, borderRight:"1px solid #2c2c2c", borderBottom:"1px solid #2c2c2c", padding:7, position:"relative", background:isEmpty?"#111":isToday?"#1f1410":"transparent", boxSizing:"border-box" }),
  calNum: (isToday) => ({ fontFamily:"monospace", fontSize:12, color:isToday?"#f8c471":"#b0a89a", marginBottom:4, fontWeight:isToday?700:400 }),
};
 
function Toast({msg,type}) { return <div style={S.toast(!!msg,type)}>{msg}</div>; }
 
function Modal({open,onClose,title,subtitle,children}) {
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
 
// ============================================================
// ÉCRAN DE CONNEXION AVEC MOT DE PASSE
// ============================================================
function LoginScreen({membres, onLogin}) {
  const [selected, setSelected] = useState(null);
  const [password, setPassword]= useState("");
  const [error, setError]      = useState("");
 
  const choisir = (m) => { setSelected(m); setPassword(""); setError(""); };
 
  const valider = () => {
    if (!selected) return;
    if (password === selected.password) {
      onLogin(selected);
    } else {
      setError("Mot de passe incorrect. Réessayez.");
    }
  };
 
  return (
    <div style={{position:"fixed",inset:0,background:"#0d0d0d",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:400,background:"#1a1a1a",border:"1px solid #2c2c2c",borderRadius:16,padding:36,textAlign:"center"}}>
        <div style={{fontSize:44,marginBottom:14}}>🚒</div>
        <div style={{fontSize:28,fontWeight:800,letterSpacing:3,marginBottom:4}}>Garde ISPV</div>
        <div style={{fontSize:13,color:"#b0a89a",marginBottom:28}}>Planning des gardes<br/>Choisissez votre profil</div>
 
        {!selected ? (
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
        ) : (
          <div style={{textAlign:"left"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:"#2c2c2c",borderRadius:10,marginBottom:20}}>
              <div style={S.avatar(selected.color,40)}>{initiales(selected)}</div>
              <div>
                <div style={{fontWeight:700,fontSize:16}}>{displayName(selected)}</div>
                <div style={{fontSize:12,color:"#b0a89a"}}>{selected.role==="admin"?"⭐ Administrateur":"🏥 Infirmier"}</div>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={S.label}>🔒 Mot de passe</label>
              <input
                type="password"
                style={{...S.input, borderColor: error?"#eb5757":"#3d3d3d"}}
                value={password}
                onChange={e=>{setPassword(e.target.value);setError("");}}
                onKeyDown={e=>e.key==="Enter"&&valider()}
                placeholder="Votre mot de passe"
                autoFocus
              />
              {error && <div style={{fontSize:12,color:"#eb5757",marginTop:6}}>⚠️ {error}</div>}
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
 
// ============================================================
// CALENDRIER — visible par tous, noms affichés
// ============================================================
function CalendarView({membres, gardes, onAddGarde}) {
  const [month, setMonth] = useState(()=>{ const d=new Date(); d.setDate(1); return d; });
  const y=month.getFullYear(), m=month.getMonth(), today=todayISO();
  const monthGardes = gardes.filter(g=>{ const d=new Date(g.date+"T00:00:00"); return d.getFullYear()===y&&d.getMonth()===m; });
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
        <div style={S.statCard}><div style={S.statLabel}>Ce mois</div><div style={S.statVal("#e74c3c")}>{monthGardes.length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>Validées</div><div style={S.statVal("#6fcf97")}>{monthGardes.filter(g=>g.status==="validee").length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>En attente</div><div style={S.statVal("#f8c471")}>{monthGardes.filter(g=>g.status==="en-attente").length}</div></div>
        <div style={S.statCard}><div style={S.statLabel}>Membres</div><div style={S.statVal()}>{membres.length}</div></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <button style={S.btn("secondary")} onClick={()=>setMonth(p=>{const n=new Date(p);n.setMonth(n.getMonth()-1);return n;})}>← Préc.</button>
        <div style={{fontWeight:800,fontSize:20,minWidth:200,textAlign:"center"}}>{MOIS[m]} {y}</div>
        <button style={S.btn("secondary")} onClick={()=>setMonth(p=>{const n=new Date(p);n.setMonth(n.getMonth()+1);return n;})}>Suiv. →</button>
        <div style={{marginLeft:"auto",display:"flex",gap:14,fontSize:12,color:"#b0a89a",flexWrap:"wrap"}}>
          <span>🟡 En attente</span><span>🟢 Validée</span><span>🔴 Refusée</span>
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
            if(cell.empty) return <div key={`e${i}`} style={{...S.calCell(false,true),borderRight:(i+1)%7===0?"none":"1px solid #2c2c2c"}} />;
            return (
              <div key={cell.dateStr} style={{...S.calCell(cell.isToday,false),borderRight:(i+1)%7===0?"none":"1px solid #2c2c2c"}}>
                <div style={S.calNum(cell.isToday)}>{cell.d}</div>
                {cell.dayGardes.slice(0,3).map(g=>{
                  const mem=getMem(g.membreId); if(!mem) return null;
                  return (
                    <div key={g.id} style={{...S.pill(g.status),marginBottom:3}}>
                      <div style={S.dot(g.status)}/><span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{displayName(mem)}</span>
                    </div>
                  );
                })}
                {cell.dayGardes.length>3&&<div style={{fontSize:10,color:"#b0a89a"}}>+{cell.dayGardes.length-3}</div>}
                <div onClick={()=>onAddGarde(cell.dateStr)}
                  style={{position:"absolute",bottom:5,right:5,width:20,height:20,borderRadius:"50%",background:"#2c2c2c",border:"1px solid #3d3d3d",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14,color:"#b0a89a",lineHeight:1}}
                  title="Poser une garde">+</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
// ============================================================
// MES GARDES — uniquement les siennes
// ============================================================
function MesGardes({gardes,currentUser,onAnnuler,onPose}) {
  const [filter,setFilter]=useState("all");
  let myGardes=gardes.filter(g=>g.membreId===currentUser.id).sort((a,b)=>b.date.localeCompare(a.date));
  const total=myGardes.length;
  if(filter!=="all") myGardes=myGardes.filter(g=>g.status===filter);
  const labels={validee:"✅ Validée","en-attente":"⏳ En attente",refusee:"❌ Refusée"};
  return (
    <div>
      <div style={S.row}>
        <div><div style={S.pageTitle}>Mes Gardes</div><div style={S.pageSub}>{total} garde(s) au total</div></div>
        <button style={S.btn("primary")} onClick={onPose}>➕ Nouvelle garde</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[["all","Toutes"],["validee","Validées"],["en-attente","En attente"],["refusee","Refusées"]].map(([f,l])=>(
          <button key={f} style={{...S.btn(filter===f?"primary":"secondary"),borderRadius:20}} onClick={()=>setFilter(f)}>{l}</button>
        ))}
      </div>
      {myGardes.length===0
        ? <div style={{textAlign:"center",padding:"60px 20px",color:"#b0a89a"}}><div style={{fontSize:40,opacity:.4,marginBottom:12}}>📭</div><div>Aucune garde trouvée</div></div>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
            {myGardes.map(g=>(
              <div key={g.id} style={{...S.card,borderLeft:`4px solid ${g.status==="validee"?"#6fcf97":g.status==="refusee"?"#eb5757":"#f8c471"}`}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{formatDateLong(g.date)}</div>
                <div style={{fontSize:13,color:"#b0a89a",marginBottom:10}}>🕐 {g.type}{g.note?" · "+g.note:""}</div>
                <div style={{fontSize:12,fontWeight:500,color:g.status==="validee"?"#6fcf97":g.status==="refusee"?"#eb5757":"#f8c471"}}>{labels[g.status]}</div>
                {g.status==="en-attente"&&<button style={{...S.btn("red"),marginTop:10,fontSize:12,padding:"5px 12px"}} onClick={()=>onAnnuler(g.id)}>Annuler</button>}
              </div>
            ))}
          </div>
      }
    </div>
  );
}
 
// ============================================================
// POSER UNE GARDE
// ============================================================
function PoserGarde({currentUser,gardes,onSubmit,onCancel}) {
  const [date,setDate]=useState(()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); });
  const [type,setType]=useState(TYPES_GARDE[0]);
  const [note,setNote]=useState("");
  const submit=()=>{
    if(!date) return;
    if(gardes.find(g=>g.membreId===currentUser.id&&g.date===date)){alert("Vous avez déjà une garde ce jour.");return;}
    onSubmit({date,type,note}); setNote("");
  };
  return (
    <div>
      <div style={S.row}><div><div style={S.pageTitle}>Poser une garde</div><div style={S.pageSub}>Soumettez votre demande</div></div></div>
      <div style={{...S.card,maxWidth:500}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div><label style={S.label}>Date</label><input type="date" style={S.input} value={date} onChange={e=>setDate(e.target.value)}/></div>
          <div><label style={S.label}>Type de garde</label>
            <select style={S.input} value={type} onChange={e=>setType(e.target.value)}>
              {TYPES_GARDE.map(t=><option key={t}>{t}</option>)}
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
 
// ============================================================
// DEMANDES (ADMIN)
// ============================================================
function Demandes({gardes,membres,onValider,onRefuser}) {
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
        ? <div style={{textAlign:"center",padding:"60px 20px",color:"#b0a89a"}}><div style={{fontSize:40,opacity:.4,marginBottom:12}}>✅</div><div>Aucune demande</div></div>
        : <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map(g=>{
              const mem=getMem(g.membreId); if(!mem) return null;
              return (
                <div key={g.id} style={{...S.card,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                  <div style={{background:"#2c2c2c",borderRadius:8,padding:"8px 12px",textAlign:"center",minWidth:52}}>
                    <div style={{fontSize:24,fontWeight:800,color:"#e74c3c",lineHeight:1}}>{new Date(g.date+"T00:00:00").getDate()}</div>
                    <div style={{fontSize:10,color:"#b0a89a",textTransform:"uppercase"}}>{MOIS[new Date(g.date+"T00:00:00").getMonth()].slice(0,3)}</div>
                  </div>
                  <div style={S.avatar(mem.color,40)}>{initiales(mem)}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{displayName(mem)}</div>
                    <div style={{fontSize:12,color:"#b0a89a"}}>🕐 {g.type}{g.note?" · "+g.note:""} · {formatDateShort(g.date)}</div>
                  </div>
                  {g.status==="en-attente"
                    ? <div style={{display:"flex",gap:8}}>
                        <button style={S.btn("green")} onClick={()=>onValider(g.id)}>✅ Valider</button>
                        <button style={S.btn("red")} onClick={()=>onRefuser(g.id)}>❌ Refuser</button>
                      </div>
                    : <div style={{fontSize:13,color:g.status==="validee"?"#6fcf97":"#eb5757"}}>{g.status==="validee"?"✅ Validée":"❌ Refusée"}</div>
                  }
                </div>
              );
            })}
          </div>
      }
    </div>
  );
}
 
// ============================================================
// ÉQUIPE (ADMIN) — avec gestion mot de passe
// ============================================================
function Equipe({membres,gardes,currentUser,onRenommer,onToggleRole,onSupprimer,onAjouter}) {
  const today=new Date();
  return (
    <div>
      <div style={S.row}>
        <div><div style={S.pageTitle}>Équipe</div><div style={S.pageSub}>{membres.length} membres</div></div>
        <button style={S.btn("primary")} onClick={onAjouter}>➕ Ajouter</button>
      </div>
      <div style={{...S.card,padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"36px 1fr 110px 80px 70px 140px",padding:"10px 16px",background:"#2c2c2c",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"#b0a89a",gap:12,alignItems:"center"}}>
          <div/><div>Nom</div><div>Rôle</div><div>Ce mois</div><div>Total</div><div>Actions</div>
        </div>
        {membres.map(m=>{
          const mG=gardes.filter(g=>{const d=new Date(g.date+"T00:00:00");return g.membreId===m.id&&d.getFullYear()===today.getFullYear()&&d.getMonth()===today.getMonth();}).length;
          const total=gardes.filter(g=>g.membreId===m.id).length;
          const isMe=m.id===currentUser.id;
          return (
            <div key={m.id} style={{display:"grid",gridTemplateColumns:"36px 1fr 110px 80px 70px 140px",padding:"12px 16px",borderBottom:"1px solid #2c2c2c",gap:12,alignItems:"center",fontSize:13}}>
              <div style={S.avatar(m.color,32)}>{initiales(m)}</div>
              <div>
                <div style={{fontWeight:500}}>{displayName(m)}</div>
                <div style={{fontSize:11,color:"#b0a89a"}}>🔒 Mdp : {m.password||"—"}</div>
              </div>
              <div><span style={S.badge(m.role)}>{m.role==="admin"?"Admin":"Infirmier"}</span></div>
              <div style={{fontFamily:"monospace"}}>{mG}</div>
              <div style={{fontFamily:"monospace"}}>{total}</div>
              <div style={{display:"flex",gap:4}}>
                <button style={{...S.btn("ghost"),padding:"4px 8px",fontSize:15}} onClick={()=>onRenommer(m)} title="Modifier">✏️</button>
                {!isMe&&<button style={{...S.btn("ghost"),padding:"4px 8px",fontSize:15}} onClick={()=>onToggleRole(m.id)} title={m.role==="admin"?"Retirer admin":"Passer admin"}>{m.role==="admin"?"⭐":"👤"}</button>}
                {!isMe&&<button style={{...S.btn("ghost"),padding:"4px 8px",fontSize:15,color:"#eb5757"}} onClick={()=>onSupprimer(m.id)} title="Supprimer">🗑</button>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{fontSize:12,color:"#b0a89a",marginTop:12,padding:"10px 14px",background:"#1a1a1a",border:"1px solid #2c2c2c",borderRadius:8}}>
        ℹ️ Les mots de passe sont visibles ici pour vous permettre de les communiquer aux infirmiers. Pensez à les changer régulièrement via ✏️.
      </div>
    </div>
  );
}
 
// ============================================================
// APP PRINCIPALE
// ============================================================
export default function App() {
  const [membres,setMembres]=useState([]);
  const [gardes,setGardes]  =useState([]);
  const [loading,setLoading]=useState(true);
  const [currentUser,setCurrentUser]=useState(null);
  const [view,setView]=useState("calendrier");
  const [toast,setToast]=useState({msg:"",type:""});
 
  const [modalGarde,setModalGarde]      =useState(null);
  const [modalRenommer,setModalRenommer]=useState(null);
  const [modalAjouter,setModalAjouter]  =useState(false);
  const [renommerP,setRenommerP]=useState("");
  const [renommerN,setRenommerN]=useState("");
  const [renommerMdp,setRenommerMdp]=useState("");
  const [ajouterP,setAjouterP]  =useState("");
  const [ajouterN,setAjouterN]  =useState("");
  const [ajouterRole,setAjouterRole]=useState("infirmier");
  const [ajouterMdp,setAjouterMdp]  =useState("");
  const [mgType,setMgType]=useState(TYPES_GARDE[0]);
  const [mgNote,setMgNote]=useState("");
 
  const showToast=(msg,type="")=>{ setToast({msg,type}); setTimeout(()=>setToast({msg:"",type:""}),3000); };
 
  useEffect(()=>{
    const unsubM=onSnapshot(collection(db,"membres"),snap=>{
      if(snap.empty){
        DEFAULT_MEMBRES.forEach(m=>setDoc(doc(db,"membres",m.id),m));
        setMembres(DEFAULT_MEMBRES);
      } else {
        const data=snap.docs.map(d=>({id:d.id,...d.data()}));
        data.sort((a,b)=>a.id.localeCompare(b.id));
        setMembres(data);
      }
      setLoading(false);
    });
    const unsubG=onSnapshot(collection(db,"gardes"),snap=>{
      setGardes(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>{ unsubM(); unsubG(); };
  },[]);
 
  const ajouterGarde=async({date,type,note,membreId})=>{
    const mid=membreId||currentUser.id;
    if(gardes.find(g=>g.membreId===mid&&g.date===date)){showToast("Déjà une garde ce jour.","");return false;}
    const id=`g${Date.now()}`;
    await setDoc(doc(db,"gardes",id),{id,membreId:mid,date,type,status:"en-attente",note:note||""});
    showToast("Demande soumise !","success"); return true;
  };
  const annulerGarde=async(id)=>{ await deleteDoc(doc(db,"gardes",id)); showToast("Annulée.","warning"); };
  const validerGarde=async(id)=>{ await updateDoc(doc(db,"gardes",id),{status:"validee"}); showToast("Garde validée !","success"); };
  const refuserGarde=async(id)=>{ await updateDoc(doc(db,"gardes",id),{status:"refusee"}); showToast("Garde refusée.","warning"); };
 
  const confirmerRenommer=async()=>{
    if(!renommerP||!renommerN){showToast("Prénom et nom requis.");return;}
    if(!renommerMdp||renommerMdp.length<3){showToast("Mot de passe trop court (min 3 caractères).");return;}
    await updateDoc(doc(db,"membres",modalRenommer.id),{prenom:renommerP,nom:renommerN,password:renommerMdp});
    if(currentUser.id===modalRenommer.id) setCurrentUser(prev=>({...prev,prenom:renommerP,nom:renommerN,password:renommerMdp}));
    setModalRenommer(null); showToast(`Profil mis à jour : ${renommerP} ${renommerN}`,"success");
  };
  const toggleRole=async(id)=>{
    const m=membres.find(x=>x.id===id); if(!m) return;
    await updateDoc(doc(db,"membres",id),{role:m.role==="admin"?"infirmier":"admin"});
    showToast("Rôle mis à jour.","success");
  };
  const supprimerMembre=async(id)=>{
    if(id===currentUser.id){showToast("Impossible de vous supprimer.");return;}
    await deleteDoc(doc(db,"membres",id));
    await Promise.all(gardes.filter(g=>g.membreId===id).map(g=>deleteDoc(doc(db,"gardes",g.id))));
    showToast("Membre supprimé.","warning");
  };
  const ajouterMembre=async()=>{
    if(!ajouterP||!ajouterN){showToast("Prénom et nom requis.");return;}
    if(!ajouterMdp||ajouterMdp.length<3){showToast("Mot de passe trop court (min 3 caractères).");return;}
    const id=`m${Date.now()}`;
    await setDoc(doc(db,"membres",id),{id,label:`Poste ${membres.length+1}`,prenom:ajouterP,nom:ajouterN,role:ajouterRole,color:COLORS[membres.length%COLORS.length],password:ajouterMdp});
    setAjouterP("");setAjouterN("");setAjouterRole("infirmier");setAjouterMdp("");
    setModalAjouter(false); showToast(`${ajouterP} ${ajouterN} ajouté(e) !`,"success");
  };
 
  if(loading) return (
    <div style={{...S.body,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>🚒</div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Garde ISPV</div>
        <div style={{color:"#b0a89a"}}>Connexion…</div>
      </div>
    </div>
  );
 
  if(!currentUser) return (
    <div style={S.body}>
      <LoginScreen membres={membres} onLogin={m=>{setCurrentUser(m);setView("calendrier");}}/>
    </div>
  );
 
  const pending=gardes.filter(g=>g.status==="en-attente").length;
  const navItems=[
    {id:"calendrier",icon:"📅",label:"Calendrier"},
    {id:"mes-gardes",icon:"🛡️",label:"Mes gardes"},
    {id:"poser-garde",icon:"➕",label:"Poser une garde"},
    ...(currentUser.role==="admin"?[
      {id:"demandes",icon:"📋",label:"Demandes",badge:pending},
      {id:"equipe",icon:"👥",label:"Équipe"},
    ]:[])
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
            <div>
              <div style={{fontSize:13,fontWeight:500}}>{displayName(currentUser)}</div>
              <div style={{fontSize:11,color:"#b0a89a"}}>{currentUser.role==="admin"?"Administrateur":"Infirmier"}</div>
            </div>
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
          {view==="calendrier"&&(
            <div>
              <div style={S.row}><div><div style={S.pageTitle}>Calendrier</div><div style={S.pageSub}>Planning partagé — tous les noms sont visibles</div></div></div>
              <CalendarView membres={membres} gardes={gardes} onAddGarde={date=>{setModalGarde({date});setMgNote("");setMgType(TYPES_GARDE[0]);}}/>
            </div>
          )}
          {view==="mes-gardes"&&<MesGardes gardes={gardes} currentUser={currentUser} onAnnuler={annulerGarde} onPose={()=>setView("poser-garde")}/>}
          {view==="poser-garde"&&<PoserGarde currentUser={currentUser} gardes={gardes} onSubmit={async d=>{const ok=await ajouterGarde(d);if(ok)setView("mes-gardes");}} onCancel={()=>setView("calendrier")}/>}
          {view==="demandes"&&currentUser.role==="admin"&&<Demandes gardes={gardes} membres={membres} onValider={validerGarde} onRefuser={refuserGarde}/>}
          {view==="equipe"&&currentUser.role==="admin"&&<Equipe membres={membres} gardes={gardes} currentUser={currentUser} onRenommer={m=>{setModalRenommer(m);setRenommerP(m.prenom);setRenommerN(m.nom);setRenommerMdp(m.password||"");}} onToggleRole={toggleRole} onSupprimer={supprimerMembre} onAjouter={()=>setModalAjouter(true)}/>}
        </main>
      </div>
 
      <Modal open={!!modalGarde} onClose={()=>setModalGarde(null)} title="Poser une garde" subtitle={modalGarde?formatDateLong(modalGarde.date):""}>
        <div style={{marginBottom:14}}><label style={S.label}>Type de garde</label>
          <select style={S.input} value={mgType} onChange={e=>setMgType(e.target.value)}>{TYPES_GARDE.map(t=><option key={t}>{t}</option>)}</select>
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
          <div style={{fontSize:11,color:"#b0a89a",marginTop:4}}>⚠️ Communiquez ce mot de passe à l'infirmier concerné</div>
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
            <option value="infirmier">🏥 Infirmier</option>
            <option value="admin">⭐ Administrateur</option>
          </select>
        </div>
        <div style={{marginBottom:20}}>
          <label style={S.label}>🔒 Mot de passe</label>
          <input type="text" style={S.input} value={ajouterMdp} onChange={e=>setAjouterMdp(e.target.value)} placeholder="Minimum 3 caractères"/>
          <div style={{fontSize:11,color:"#b0a89a",marginTop:4}}>⚠️ Communiquez ce mot de passe à l'infirmier</div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button style={S.btn("secondary")} onClick={()=>setModalAjouter(false)}>Annuler</button>
          <button style={S.btn("primary")} onClick={ajouterMembre}>Ajouter</button>
        </div>
      </Modal>
 
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}
 
