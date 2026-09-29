# BIBLE TECHNIQUE & ARTISTIQUE : SENNA OFFICIAL WEB APP (Awwwards Grade)
> **Statut :** Document Maître de Conception & Architecture  
> **Client Cible :** Artiste Chanteuse / Performance Live & Son Équipe  
> **Objectif :** Web App Responsive PWA ultra-fluide (style Awwwards), Dark & Crimson Red, bilingue JP/EN, facilement administrable sans couture visible.

---

## 1. VISION ARTISTIQUE & INSPIRATIONS (Awwwards Standard)

Le projet fusionne les identités fortes des 3 références imposées :
1. **Lady Gaga (`ladygaga.com`)** : Impact monumental, typographie éditoriale haute couture, mise en avant immédiate des tournées/releases et merchandising premium.
2. **Sacha Karpavicius (`sachakarpavicius.vercel.app`)** : Atmosphère sombre feutrée, grain pellicule analogique, **lecteur audio minimaliste avec égaliseur 4 barres animé**, curseur réactif et fluidité d'orfèvre.
3. **Sekai No Owari (`sekainoowari.jp`)** : Ordre des sections japonais, bilinguisme naturel (日本語 / English), hiérarchie claire (News, Live, Discography, Profile, Video, Linkcore, Goods).

### 1.1 Charte Graphique & Tokens Visuels
* **Fond Principal :** `#050505` (OLED Obsidian Black) avec texture de grain de film subtile (CSS noise à 2% d'opacité).
* **Fonds Secondaires / Cards :** `#0e0e10` et `#141416` avec bordures ultra-fines `rgba(255, 255, 255, 0.08)`.
* **Accent Rouge Carmin :** `#E50914` (Primaire) et `#800A13` (Rouge sang profond dégradé).
* **Typographie Contraste :** Blanc soyeux `#F5F5F7` et Gris titane `#8E8E93`.
* **Règle Zéro-Emoji :** Strictement aucun émoji. 100% icônes vectorielles SVG minimalistes (lignes de 1.5px, design sur-mesure pour audio, flèches, streaming).

### 1.2 Typographie Tri-Linguale & Pairing
* **Titres Occidentaux & Impact :** `Syne` (Weights: 700, 800) + `Cinzel` (pour les dates, numéros de release et titres d'albums).
* **Titres & Textes Japonais :** `Noto Serif JP` (pour l'élégance poétique des bios et annonces) et `Noto Sans JP` (pour les menus et textes techniques).
* **Corps de texte & UI Système :** `Inter` (tracking large pour les labels en capitales, haute lisibilité sur mobile).

### 1.3 Sound Design & Motion Physics
* **Smooth Scroll :** Moteur **Lenis Scroll** avec inertie douce (`lerp: 0.08`), aucun à-coup.
* **Lecteur Audio Signature :**
  * Widget discret en bas à droite (mix-blend difference).
  * 4 barres d'égaliseur animées en temps réel (`scaleY` CSS keyframes).
  * Bouton tactile ON / OFF mémorisant l'état dans la session.
* **Animations au Scroll :** Reveal en masque (`clip-path: inset()`), effet parallaxe délicat sur la photo de l'artiste.

---

## 2. ARCHITECTURE "INVISIBLE CMS" : COMMENT ELLE MODIFIE TOUT FACILEMENT

Le mot d'ordre : **Côté visiteur, on ne voit RIEN. Pas de boutons d'édition qui dépassent, pas de balises techniques.** C'est un site d'artiste 5 étoiles.

### Système en 2 Niveaux :

#### Niveau 1 : Le "Contrat de Données" Centralisé (Pour la maquette & validation)
Tous les contenus du site sont isolés dans un fichier unique de structure propre :  
`src/data/siteContent.json` (ou `.ts`).
* Chaque texte a sa version bilingue directe :
  ```json
  {
    "news": [
      {
        "id": "news-01",
        "date": "2026.10.15",
        "category": "LIVE",
        "title": { "ja": "ワンマンライブ開催決定", "en": "Solo Live Concert Announced" },
        "image": "/images/news/live-tokyo.jpg",
        "link": "/news/solo-live-2026"
      }
    ]
  }
  ```
* Remplacement d'image instantané : elle glisse son image dans le dossier `public/uploads/` avec le même nom, ou change simplement le lien dans le fichier.

#### Niveau 2 : Le Portail d'Édition Secret `/admin` (Sécurisé & Invisible)
* **Accès :** Une URL non indexée (ex: `/secret-portal` ou raccourci clavier secret `Shift + A` avec mot de passe).
* **Interface sur-mesure :** Une interface sombre et intuitive (style dashboard Spotify for Artists) :
  * Formulaire simple : "Ajouter une News", "Modifier le Profil (JP & EN)", "Changer la photo Hero", "Mettre à jour les liens Linkcore".
  * Sélecteur de fichiers par simple Glisser-Déposer (Drag & Drop) depuis son iPhone ou PC.
  * Synchronisation soit directe avec Supabase Storage (si configuré), soit avec génération de fichiers médias optimisés.

---

## 3. LA NAVBAR & LE MENU "HAUTE COUTURE"

### 3.1 La Navbar Flottante (Compacte & Invisible)
* **Positionnement :** Capsule flottante en haut de page (`fixed top-6`), centrée ou alignée avec padding généreux.
* **Dimensions :** Hauteur de 52px maximum (ne bouffe pas l'écran, laisse respirer la photo de l'artiste).
* **Finition :** Verre dépoli sombre (`backdrop-blur-md bg-black/60 border border-white/10 rounded-full`).
* **Composants intégrés :**
  1. **Logo / Monogramme :** Typographie stylisée "SENNA" (hover : soulignement crimson en expansion).
  2. **Boutons Rapides :**
     * **Sélecteur de Langue :** Bouton minimaliste `[ 日本 / ENG ]` avec bascule immédiate sans reload.
     * **Égaliseur Audio :** 4 barres animées indiquant l'état musical.
     * **Bouton Menu (Burger Luxe) :** Deux traits fins qui se croisent en croix au clic avec micro-animation fluide.

### 3.2 L'Overlay Menu Déroulant (Cinématique)
Au clic sur le menu :
* Un volet noir profond se déploie depuis le haut ou le côté avec un effet de rideau fluide.
* **Effet Stagger :** Les 7 liens du menu apparaissent un à un avec un décalage de 40ms.
* **Image Hover Preview :** Lorsque la souris survole "DISCOGRAPHY", la pochette du dernier album apparaît en filigrane sombre. Au survol de "LIVE", une photo de scène apparaît doucement en arrière-plan.
* **Liens du menu :**
  * `01. NEWS` (New arrivals & dates)
  * `02. PROFILE` (Biography & Philosophy)
  * `03. DISCOGRAPHY` (Singles, EPs, Albums)
  * `04. VIDEO` (Official Music Videos & Live clips)
  * `05. DLC & STREAM` (Linkcore / TuneCore hub)
  * `06. GOODS` (Official Merch & Apparel)
  * `07. CONTACT` (Booking, Management & Press)

---

## 4. DÉCOMPOSITION COMPLÈTE DES SECTIONS (L'ACCUEIL & INTERFACES)

### Section 1 : Hero / Top Visual (L'Entrée Triomphale)
* **Design :**
  * Plein écran (`100vh`) avec la photo de l'artiste en découpe haute définition.
  * Dégradé radial noir subtil sur les bords pour fondre la photo dans l'arrière-plan sombre.
  * Typographie colossale en arrière-plan ou en surimpression : "SENNA" avec masque de découpe.
  * Badge interactif flottant : `[ ● LATEST RELEASE : STREAM NOW ]` avec point rouge pulsant.
* **Animations :**
  * À l'arrivée sur le site : fondu au noir progressif (comme l'intro de Sekai No Owari), le nom de l'artiste s'éclaire doucement.
  * Au scroll : Parallaxe vertical doux (la photo descend légèrement plus lentement que le texte).

---

### Section 2 : NEWS (New Arrivals & Live Dates)
* **Design :**
  * Onglets de filtrage élégants : `[ ALL ] [ LIVE ] [ RELEASE ] [ MEDIA ] [ GOODS ]`.
  * Grille asymétrique (1 grande card pour la dernière actu majeure, 2 ou 3 cards plus petites pour les actualités secondaires).
  * Chaque card contient :
    * Date au format japonais précis (ex: `2026.11.08 SAT`).
    * Tag rouge carmin (`LIVE`, `SINGLE`).
    * Titre bilingue en gras.
    * Photo avec effet de zoom intérieur au survol (1.05x smooth transition).
* **Interaction :** Clic sur une card = ouverture d'un tiroir latéral ou d'une modale sombre plein écran sans quitter la page principale.

---

### Section 3 : PROFILE (Biography)
* **Design :**
  * Structure en double colonne asymétrique (Ratio 45% image / 55% texte).
  * Gauche : Portrait artistique noir & blanc de l'artiste avec grain, s'éclaircissant subtilement au hover.
  * Droite :
    * Titre calligraphié ou typographique : *Profile & Artist Statement*.
    * Bouton bascule dédié ou synchronisé avec le header : texte en 日本語 ou en English.
    * Citations marquantes de l'artiste en grande taille.
    * Liste des temps forts (Débuts, prix, concerts majeurs, collaborations).

---

### Section 4 : DISCOGRAPHY (Musique & Releases)
* **Design :**
  * Présentoir de disques interactif.
  * Chaque release (Single, EP, Album) est présentée avec sa jaquette carrée haute résolution.
  * **Easter Egg Visuel :** Au survol de la pochette, un disque vinyle noir avec sillon brillant glisse doucement hors de la pochette.
  * Liste des pistes (Tracklist) déroulante au clic.
  * Barre d'action directe : Boutons SVG clairs vers **Spotify**, **Apple Music**, **YouTube Music**, **Line Music**.

---

### Section 5 : VIDEO (Music Videos & Live Sessions)
* **Design :**
  * **Lecteur Featured :** Le clip principal (Dernier MV) affiché en très grand format cinématique (ratio 21:9).
  * Carrousel horizontal fluide pour les autres clips et captations de concerts.
  * Curseur sur-mesure au survol : un rond blanc ou rouge marqué "PLAY" qui suit la souris.
  * Clic sur une vidéo = Lecteur vidéo immersif plein écran sans distractions.

---

### Section 6 : DLC & STREAM (Linkcore Integration)
* **Rôle spécifique :** Les artistes japonais utilisent massivement **Linkcore** (TuneCore Japan) pour centraliser leurs flux de streaming et téléchargements légaux (DLC).
* **Design :**
  * Card centrale façon "Ticket VIP" ou "Passeport Musical" avec code-barres esthétique et typographie de précision.
  * Liens directs d'écoute en un clic, prêts pour mobile.

---

### Section 7 : GOODS (Official Merch)
* **Design :**
  * Showcase minimaliste façon boutique de mode de luxe (T-shirts de tournée, Vinyles collectors, Casquettes, Goodies).
  * Badge rouge sang : `[ SOLD OUT ]` ou `[ LIMITED EDITION ]`.
  * Prix affiché en Yen (`¥`) et devise secondaire (`€` / `$`).
  * Bouton d'achat ou redirection vers sa plateforme de boutique officielle (Shopify, Base.in, ou formulaire de précommande).

---

### Section 8 : CONTACT & BOOKING
* **Design :**
  * Formulaire minimaliste sombre (fond transparent, lignes de soulignement blanches fines qui s'illuminent en rouge carmin au focus).
  * Sélecteur d'objet : `Live & Booking`, `Media & Press`, `Fan Mail`, `Other`.
  * Sécurité anti-spam invisible (Cloudflare Turnstile ou Honeypot discret, aucun captcha moche).

---

### Section 9 : FOOTER & SOCIALS
* **Design :**
  * Typographie monumentale "SENNA" qui s'étend sur toute la largeur de l'écran.
  * Ligne d'icônes sociales vectorielles avec effet magnétique :
    * **Instagram**
    * **TikTok**
    * **Spotify**
    * **YouTube**
    * **X (Twitter)**
    * **Apple Music**
  * Mentions de copyright, crédits de production et bouton de retour immédiat en haut de page (`BACK TO TOP ↑`).

---

## 5. FONCTIONNALITÉS PWA & MOBILE-FIRST

1. **Installation sur smartphone :** Possibilité pour les fans d'ajouter le site sur leur écran d'accueil iOS/Android comme une vraie application native (sans les barres d'adresse Safari/Chrome).
2. **Offline Mode :** La biographie, les dates de concerts et la discographie restent consultables même en cas de mauvaise connexion dans les salles de concert.
3. **Optimisation tactile :** Cibles de toucher d'au moins 48px, gestes de balayage (swipe) naturels pour la discographie et les vidéos.

---

## 6. EASTER EGGS & DÉTAILS INTERACTIFS (L'Esprit Sacha Karpavicius)

1. **Le Lecteur Audio Discret :** Une boucle musicale ou le dernier refrain qui démarre en fondu doux au clic sur le bouton equalizer.
2. **Le Curseur Réactif (Desktop) :** Un petit point qui s'élargit en cercle transparent au survol des liens, et affiche du texte ("LISTEN", "DISCOVER", "WATCH") au-dessus des médias.
3. **Le Secret Tap :** Taper 3 fois de suite sur le logo déclenche un message manuscrit exclusif de l'artiste ou une photo des coulisses inédite.

---

## 7. STACK TECHNIQUE RECOMMANDÉE

* **Framework :** **Next.js 15 (App Router)** pour des performances d'indexation SEO et une vitesse instantanée.
* **Langage :** **TypeScript** (sécurité totale du typage des données).
* **Styles & Tokens :** **Tailwind CSS v4** + variables CSS custom pour le dark mode OLED et les effets de verre.
* **Moteur d'animation :** **Lenis Scroll** (smooth scrolling) + **Framer Motion** (transitions d'état, rideaux de menu, gestes tactiles).
* **Audio Engine :** Web Audio API HTML5 avec fondu d'entrée/sortie (`fade in / fade out`) pour ne pas agresser l'oreille de l'auditeur.
* **PWA :** `@ducanh2912/next-pwa` ou Serwist avec service worker optimisé.
