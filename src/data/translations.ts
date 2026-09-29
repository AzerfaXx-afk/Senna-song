export type SupportedLanguage = "ja" | "en" | "fr" | "es";

export interface TranslationDictionary {
  nav: {
    menu: string;
    close: string;
    langLabel: string;
    sennaHome: string;
  };
  hero: {
    badge: string;
    tagline: string;
    contents: string;
  };
  menu: {
    index: string;
    news: string;
    newsSub: string;
    profile: string;
    profileSub: string;
    discography: string;
    discographySub: string;
    video: string;
    videoSub: string;
    dlcStream: string;
    dlcStreamSub: string;
    goods: string;
    goodsSub: string;
    contact: string;
    contactSub: string;
  };
  news: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterLive: string;
    filterRelease: string;
    filterMedia: string;
    filterGoods: string;
    readStory: string;
    modalClose: string;
    modalShare: string;
  };
  profile: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    role: string;
    quote: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    milestonesTitle: string;
    statsListeners: string;
    statsViews: string;
    statsVinyl: string;
  };
  discography: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    dragHint: string;
    tracks: string;
    catalog: string;
    releaseDate: string;
    listenOn: string;
    streamAlbum: string;
  };
  video: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    watchNow: string;
    closeVideo: string;
  };
  linkcore: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    openHub: string;
    platformsNote: string;
  };
  goods: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    limited: string;
    newBadge: string;
    soldOut: string;
    orderNow: string;
    modalTitle: string;
    modalSubtitle: string;
    modalNotice: string;
    close: string;
  };
  contact: {
    sectionNum: string;
    badge: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formCategory: string;
    formCategoryBooking: string;
    formCategoryPress: string;
    formCategoryGeneral: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    managementTitle: string;
    pressTitle: string;
    locationTitle: string;
  };
  footer: {
    navTitle: string;
    navSubtitle: string;
    socialsTitle: string;
    socialsSubtitle: string;
    rights: string;
    privacy: string;
    terms: string;
    backToTop: string;
  };
  sound: {
    soundLabel: string;
    mute: string;
    play: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  ja: {
    nav: {
      menu: "MENU",
      close: "CLOSE",
      langLabel: "言語を選択",
      sennaHome: "千奈 ホーム",
    },
    hero: {
      badge: "オフィシャルサイト",
      tagline: "漆黒の静寂と、深紅の情熱。圧倒的なヴォーカルが紡ぐ、極上の音響体験。",
      contents: "目次",
    },
    menu: {
      index: "メニューインデックス",
      news: "ニュース",
      newsSub: "新着情報",
      profile: "プロフィール",
      profileSub: "略歴",
      discography: "ディスコグラフィ",
      discographySub: "音楽作品",
      video: "ビデオ",
      videoSub: "映像作品",
      dlcStream: "ストリーミング",
      dlcStreamSub: "配信リンク",
      goods: "グッズ",
      goodsSub: "オフィシャルグッズ",
      contact: "コンタクト",
      contactSub: "お問い合わせ",
    },
    news: {
      sectionNum: "01 / 最新情報",
      badge: "NEW ARRIVALS",
      title: "新着情報",
      subtitle: "LATEST NEWS",
      filterAll: "すべて",
      filterLive: "ライブ",
      filterRelease: "リリース",
      filterMedia: "メディア",
      filterGoods: "グッズ",
      readStory: "記事を読む →",
      modalClose: "閉じる ✕",
      modalShare: "シェアする",
    },
    profile: {
      sectionNum: "02 / アーティスト紹介",
      badge: "PROFILE",
      title: "アーティスト紹介",
      subtitle: "BIOGRAPHY",
      role: "ヴォーカリスト / シンガーソングライター",
      quote: "「静寂の中でしか聴こえない、真実の聲がある。」",
      bioParagraph1: "東京都出身。類まれな歌唱力と、シネマティックな音響設計で独自の世界観を築くシンガーソングライター。クラシック声楽をルーツに持ちながら、先鋭的なエレクトロニック・サウンドと融合させた唯一無二のスタイルを確立。",
      bioParagraph2: "2023年にリリースした自主制作シングルが国内外のキュレーターから絶大な支持を集め、Spotifyグローバルプレイリストに多数選出。漆黒の深淵と深紅の情熱を象徴とする美学は、音楽のみならずヴィジュアルアートシーンでも熱狂的な支持を集めている。",
      bioParagraph3: "現在は国内外のフェスティバル出演や大型コラボレーションを精力的に展開し、日本から世界へ次世代のオルタナティブ・ポップを発信し続けている。",
      milestonesTitle: "主な活動履歴",
      statsListeners: "月間リスナー",
      statsViews: "総再生回数",
      statsVinyl: "限定盤完売",
    },
    discography: {
      sectionNum: "03 / 音楽カタログ",
      badge: "DISCOGRAPHY",
      title: "ディスコグラフィ",
      subtitle: "RELEASES",
      dragHint: "レコードスリーブをドラッグして3D鑑賞",
      tracks: "収録曲リスト",
      catalog: "品番",
      releaseDate: "発売日",
      listenOn: "配信サービスで聴く",
      streamAlbum: "今すぐストリーミング再生",
    },
    video: {
      sectionNum: "04 / 映像ギャラリー",
      badge: "VIDEO",
      title: "映像作品",
      subtitle: "VISUALS",
      watchNow: "MVを再生する",
      closeVideo: "プレイヤーを閉じる ✕",
    },
    linkcore: {
      sectionNum: "05 / 配信リンクハブ",
      badge: "STREAMING HUB",
      title: "ストリーミング配信",
      subtitle: "LINKCORE / TUNECORE JAPAN",
      description: "Apple Music, Spotify, YouTube Music, Amazon Music, LINE MUSICなど、世界中の主要ストリーミングサービスでSENNAの全楽曲を即座にストリーミング＆ダウンロード可能。",
      openHub: "公式Linkcoreハブを開く ↗",
      platformsNote: "100以上のデジタル音楽プラットフォームに対応",
    },
    goods: {
      sectionNum: "06 / 公式グッズ",
      badge: "OFFICIAL MERCHANDISE",
      title: "オフィシャルグッズ",
      subtitle: "MERCHANDISE",
      limited: "数量限定",
      newBadge: "新商品",
      soldOut: "完売",
      orderNow: "ストアで購入する",
      modalTitle: "公式オンラインストア",
      modalSubtitle: "国内・海外発送に対応しております。",
      modalNotice: "限定グッズは数に限りがございます。売り切れの際はご容赦ください。",
      close: "閉じる ✕",
    },
    contact: {
      sectionNum: "07 / お問い合わせ",
      badge: "CONTACT",
      title: "お問い合わせ",
      subtitle: "INQUIRIES",
      formName: "お名前",
      formEmail: "メールアドレス",
      formCategory: "お問い合わせ種別",
      formCategoryBooking: "出演・公演依頼 (Booking)",
      formCategoryPress: "取材・メディア掲載 (Press)",
      formCategoryGeneral: "その他のお問い合わせ (General)",
      formMessage: "お問い合わせ内容",
      formSubmit: "メッセージを送信する",
      formSuccess: "お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。",
      managementTitle: "マネジメント",
      pressTitle: "プレス・広報",
      locationTitle: "所在地",
    },
    footer: {
      navTitle: "メニュー",
      navSubtitle: "ページ内リンク",
      socialsTitle: "オフィシャルSNS",
      socialsSubtitle: "公式アカウントをフォロー",
      rights: "© 2026 SENNA MUSIC ENTERTAINMENT. ALL RIGHTS RESERVED.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      backToTop: "トップへ戻る ↑",
    },
    sound: {
      soundLabel: "音響",
      mute: "音声をミュート",
      play: "アンビエント音を再生",
    },
  },
  en: {
    nav: {
      menu: "MENU",
      close: "CLOSE",
      langLabel: "Select Language",
      sennaHome: "SENNA Home",
    },
    hero: {
      badge: "OFFICIAL ARTIST PORTAL",
      tagline: "The sound of obsidian shadows and raw crimson soul. Avant-garde Japanese production meets soaring cinematic vocals.",
      contents: "CONTENTS",
    },
    menu: {
      index: "ARCHIVE INDEX",
      news: "NEWS",
      newsSub: "NEW ARRIVALS",
      profile: "PROFILE",
      profileSub: "BIOGRAPHY",
      discography: "DISCOGRAPHY",
      discographySub: "RELEASES",
      video: "VIDEO",
      videoSub: "VISUALS",
      dlcStream: "DLC & STREAM",
      dlcStreamSub: "LINKCORE HUB",
      goods: "GOODS",
      goodsSub: "MERCHANDISE",
      contact: "CONTACT",
      contactSub: "INQUIRIES",
    },
    news: {
      sectionNum: "01 / LATEST UPDATES",
      badge: "NEW ARRIVALS",
      title: "NEWS & RELEASES",
      subtitle: "ANNOUNCEMENTS",
      filterAll: "ALL",
      filterLive: "LIVE",
      filterRelease: "RELEASE",
      filterMedia: "MEDIA",
      filterGoods: "GOODS",
      readStory: "READ STORY →",
      modalClose: "CLOSE ✕",
      modalShare: "SHARE STORY",
    },
    profile: {
      sectionNum: "02 / ARTISTIC IDENTITY",
      badge: "BIOGRAPHY",
      title: "PROFILE & STATEMENT",
      subtitle: "IDENTITY",
      role: "Vocalist / Avant-Garde Songwriter",
      quote: "\"There is a sacred voice that can only be heard in absolute silence.\"",
      bioParagraph1: "Born in Tokyo, SENNA crafts an enigmatic musical universe intertwining soaring classical vocal training with shadowy, cutting-edge electronic soundscapes. Her artistic architecture bridges nocturnal silence with fierce crimson resonance.",
      bioParagraph2: "Since her viral breakthrough releases in 2023, SENNA has commanded worldwide acclaim from curators, securing recurring highlights across Spotify Global editorial collections. Her distinctive dark aesthetic has drawn a cult following across both contemporary music and high-fashion arts.",
      bioParagraph3: "Currently headlining leading international music venues and curating visionary collaborative projects, SENNA represents the vanguard of modern Japanese alternative pop on the world stage.",
      milestonesTitle: "CAREER TIMELINE",
      statsListeners: "Monthly Listeners",
      statsViews: "Global Streams",
      statsVinyl: "Vinyl Pressings Sold",
    },
    discography: {
      sectionNum: "03 / SOUND CATALOG",
      badge: "DISCOGRAPHY",
      title: "DISCOGRAPHY",
      subtitle: "RECORDINGS",
      dragHint: "Drag or swipe vinyl sleeve for 3D exploration",
      tracks: "TRACKLIST",
      catalog: "CATALOG",
      releaseDate: "RELEASE DATE",
      listenOn: "LISTEN ON DIGITAL PLATFORMS",
      streamAlbum: "STREAM ALBUM NOW",
    },
    video: {
      sectionNum: "04 / CINEMATOGRAPHY",
      badge: "VIDEO",
      title: "OFFICIAL VISUALS",
      subtitle: "CINEMA",
      watchNow: "WATCH VISUAL",
      closeVideo: "CLOSE PLAYER ✕",
    },
    linkcore: {
      sectionNum: "05 / STREAMING PORTAL",
      badge: "STREAMING HUB",
      title: "DLC & STREAMING",
      subtitle: "LINKCORE / TUNECORE JAPAN",
      description: "Direct instant access to SENNA's complete digital catalog across Spotify, Apple Music, YouTube Music, Amazon Music, and all global streaming networks.",
      openHub: "OPEN OFFICIAL LINKCORE HUB ↗",
      platformsNote: "Synchronized across 100+ global digital music platforms",
    },
    goods: {
      sectionNum: "06 / OFFICIAL COLLECTION",
      badge: "MERCHANDISE",
      title: "OFFICIAL MERCHANDISE",
      subtitle: "COLLECTION",
      limited: "LIMITED EDITION",
      newBadge: "NEW",
      soldOut: "SOLD OUT",
      orderNow: "PURCHASE ITEM",
      modalTitle: "OFFICIAL ONLINE BOUTIQUE",
      modalSubtitle: "Worldwide international shipping available.",
      modalNotice: "Limited tour editions are pressed in restricted quantities. While stocks last.",
      close: "CLOSE ✕",
    },
    contact: {
      sectionNum: "07 / INQUIRIES",
      badge: "CONTACT",
      title: "PRESS & BOOKING",
      subtitle: "INQUIRIES",
      formName: "Full Name",
      formEmail: "Email Address",
      formCategory: "Inquiry Type",
      formCategoryBooking: "Live Booking & Festival Inquiries",
      formCategoryPress: "Press & Media Inquiries",
      formCategoryGeneral: "General Inquiries & Collaboration",
      formMessage: "Your Message",
      formSubmit: "SUBMIT INQUIRY",
      formSuccess: "Thank you for reaching out. Our management team will respond shortly.",
      managementTitle: "Management",
      pressTitle: "Press & Media",
      locationTitle: "Headquarters",
    },
    footer: {
      navTitle: "MAIN NAVIGATION",
      navSubtitle: "PAGE INDEX",
      socialsTitle: "OFFICIAL SOCIALS",
      socialsSubtitle: "CONNECT WITH SENNA",
      rights: "© 2026 SENNA MUSIC ENTERTAINMENT. ALL RIGHTS RESERVED.",
      privacy: "PRIVACY POLICY",
      terms: "TERMS OF USE",
      backToTop: "BACK TO TOP ↑",
    },
    sound: {
      soundLabel: "SOUND",
      mute: "Mute Atmosphere",
      play: "Play Atmosphere",
    },
  },
  fr: {
    nav: {
      menu: "MENU",
      close: "FERMER",
      langLabel: "Choisir la langue",
      sennaHome: "SENNA Accueil",
    },
    hero: {
      badge: "PORTAIL OFFICIEL DE L'ARTISTE",
      tagline: "Le son du silence obsidienne et de l'âme pourpre. Une production avant-gardiste japonaise portée par des envolées vocales cinématographiques.",
      contents: "SECTIONS",
    },
    menu: {
      index: "SOMMAIRE ARCHIVE",
      news: "ACTUALITÉS",
      newsSub: "NOUVEAUTÉS",
      profile: "PROFIL",
      profileSub: "BIOGRAPHIE",
      discography: "DISCOGRAPHIE",
      discographySub: "SORTIES",
      video: "VIDÉOS",
      videoSub: "VISUELS",
      dlcStream: "DLC & STREAM",
      dlcStreamSub: "LINKCORE HUB",
      goods: "BOUTIQUE",
      goodsSub: "MERCHANDISE",
      contact: "CONTACT",
      contactSub: "RÉSERVATIONS",
    },
    news: {
      sectionNum: "01 / DERNIÈRES NOUVELLES",
      badge: "NOUVEAUTÉS",
      title: "ACTUALITÉS & SORTIES",
      subtitle: "ANNONCES",
      filterAll: "TOUS",
      filterLive: "CONCERTS",
      filterRelease: "SORTIES",
      filterMedia: "MÉDIAS",
      filterGoods: "MERCHANDISE",
      readStory: "LIRE L'ARTICLE →",
      modalClose: "FERMER ✕",
      modalShare: "PARTAGER L'ARTICLE",
    },
    profile: {
      sectionNum: "02 / IDENTITÉ ARTISTIQUE",
      badge: "BIOGRAPHIE",
      title: "PROFIL & DÉCLARATION",
      subtitle: "BIOGRAPHIE",
      role: "Vocaliste / Auteure-Compositrice Avant-Garde",
      quote: "« Il y a une voix sacrée qui ne peut être entendue que dans le silence absolu. »",
      bioParagraph1: "Originaire de Tokyo, SENNA sculpte un univers sonore cinématographique singulier alliant formation vocale classique et paysages électroniques d'avant-garde. Son esthétique tisse un dialogue saisissant entre le noir obsidienne et le rouge carmin.",
      bioParagraph2: "Depuis ses premières parutions remarquées en 2023, elle suscite l'engouement unanime des curateurs internationaux et se distingue sur les sélections mondiales de Spotify. Son identité visuelle ténébreuse captive autant les mélomanes que le milieu de la haute couture.",
      bioParagraph3: "Invitée sur les scènes des festivals majeurs et multipliant les collaborations d'envergure, SENNA incarne aujourd'hui la fine fleur de la pop alternative japonaise sur la scène mondiale.",
      milestonesTitle: "CHRONOLOGIE DU PARCOURS",
      statsListeners: "Auditeurs Mensuels",
      statsViews: "Écoutes Mondiales",
      statsVinyl: "Vinyles Collector Épuisés",
    },
    discography: {
      sectionNum: "03 / CATALOGUE SONORE",
      badge: "DISCOGRAPHIE",
      title: "DISCOGRAPHIE",
      subtitle: "DISCOGRAPHIE",
      dragHint: "Glissez ou touchez la pochette pour l'explorer en 3D",
      tracks: "LISTE DES PISTES",
      catalog: "RÉFÉRENCE",
      releaseDate: "DATE DE SORTIE",
      listenOn: "ÉCOUTER SUR LES PLATEFORMES",
      streamAlbum: "ÉCOUTER L'ALBUM MAINTENANT",
    },
    video: {
      sectionNum: "04 / CINÉMATOGRAPHIE",
      badge: "VIDÉOS",
      title: "VISUELS OFFICIELS",
      subtitle: "CLIPS VIDÉO",
      watchNow: "VOIR LE CLIP",
      closeVideo: "FERMER LE LECTEUR ✕",
    },
    linkcore: {
      sectionNum: "05 / HUB STREAMING",
      badge: "PORTAIL STREAMING",
      title: "DLC & STREAMING",
      subtitle: "LINKCORE / TUNECORE JAPAN",
      description: "Accès instantané à l'intégralité du catalogue discographique de SENNA sur Apple Music, Spotify, YouTube Music, Amazon Music et l'ensemble des réseaux de diffusion mondiaux.",
      openHub: "OUVRIR LE HUB OFFICIEL LINKCORE ↗",
      platformsNote: "Disponible sur plus de 100 plateformes de musique numérique",
    },
    goods: {
      sectionNum: "06 / BOUTIQUE OFFICIELLE",
      badge: "MERCHANDISE",
      title: "BOUTIQUE OFFICIELLE",
      subtitle: "ARTICLES OFFICIELS",
      limited: "ÉDITION LIMITÉE",
      newBadge: "NOUVEAU",
      soldOut: "ÉPUISÉ",
      orderNow: "COMMANDER L'ARTICLE",
      modalTitle: "BOUTIQUE EN LIGNE OFFICIELLE",
      modalSubtitle: "Expédition internationale dans le monde entier.",
      modalNotice: "Les éditions limitées sont pressées en quantités restreintes, jusqu'à épuisement des stocks.",
      close: "FERMER ✕",
    },
    contact: {
      sectionNum: "07 / CONTACT & RÉSERVATIONS",
      badge: "CONTACT",
      title: "PRESSE & BOOKING",
      subtitle: "CONTACT",
      formName: "Nom complet",
      formEmail: "Adresse e-mail",
      formCategory: "Type de demande",
      formCategoryBooking: "Concerts & Réservations Festivals",
      formCategoryPress: "Presse & Demandes Médias",
      formCategoryGeneral: "Demandes générales & Collaborations",
      formMessage: "Votre message",
      formSubmit: "ENVOYER LA DEMANDE",
      formSuccess: "Merci pour votre message. Notre équipe de management vous répondra dans les plus brefs délais.",
      managementTitle: "Management",
      pressTitle: "Relations Presse",
      locationTitle: "Siège & Bureaux",
    },
    footer: {
      navTitle: "NAVIGATION",
      navSubtitle: "INDEX DES SECTIONS",
      socialsTitle: "RÉSEAUX SOCIAUX",
      socialsSubtitle: "SUIVRE SENNA",
      rights: "© 2026 SENNA MUSIC ENTERTAINMENT. TOUS DROITS RÉSERVÉS.",
      privacy: "POLITIQUE DE CONFIDENTIALITÉ",
      terms: "CONDITIONS D'UTILISATION",
      backToTop: "HAUT DE PAGE ↑",
    },
    sound: {
      soundLabel: "SON",
      mute: "Couper l'ambiance sonore",
      play: "Activer l'ambiance sonore",
    },
  },
  es: {
    nav: {
      menu: "MENÚ",
      close: "CERRAR",
      langLabel: "Seleccionar Idioma",
      sennaHome: "SENNA Inicio",
    },
    hero: {
      badge: "PORTAL OFICIAL DE LA ARTISTA",
      tagline: "El sonido de las sombras de obsidiana y el alma carmesí. Producción japonesa de vanguardia con deslumbrantes voces cinematográficas.",
      contents: "CONTENIDO",
    },
    menu: {
      index: "ÍNDICE ARCHIVO",
      news: "NOTICIAS",
      newsSub: "NOVEDADES",
      profile: "PERFIL",
      profileSub: "BIOGRAFÍA",
      discography: "DISCOGRAFÍA",
      discographySub: "LANZAMIENTOS",
      video: "VIDEOS",
      videoSub: "VISUALES",
      dlcStream: "DLC & STREAM",
      dlcStreamSub: "LINKCORE HUB",
      goods: "TIENDA",
      goodsSub: "MERCHANDISE",
      contact: "CONTACTO",
      contactSub: "RESERVAS",
    },
    news: {
      sectionNum: "01 / ÚLTIMAS NOTICIAS",
      badge: "NOVEDADES",
      title: "NOTICIAS Y LANZAMIENTOS",
      subtitle: "ANUNCIOS",
      filterAll: "TODOS",
      filterLive: "CONCIERTOS",
      filterRelease: "LANZAMIENTOS",
      filterMedia: "MEDIOS",
      filterGoods: "MERCHANDISE",
      readStory: "LEER NOTICIA →",
      modalClose: "CERRAR ✕",
      modalShare: "COMPARTIR NOTICIA",
    },
    profile: {
      sectionNum: "02 / IDENTIDAD ARTÍSTICA",
      badge: "BIOGRAFÍA",
      title: "PERFIL & BIOGRAFÍA",
      subtitle: "IDENTIDAD",
      role: "Vocalista / Compositora de Vanguardia",
      quote: "\"Hay una voz sagrada que solo puede escucharse en el silencio absoluto.\"",
      bioParagraph1: "Nacida en Tokio, SENNA crea un universo musical enigmático que une el entrenamiento vocal clásico con atmósferas electrónicas de vanguardia. Su arquitectura estética vincula el silencio nocturno con una feroz resonancia carmesí.",
      bioParagraph2: "Desde su irrupción viral en 2023, ha cosechado elogios unánimes de comisarios internacionales y una presencia constante en las listas globales de Spotify. Su estética oscura cautiva tanto a la música contemporánea como a la alta costura.",
      bioParagraph3: "Actualmente se presenta en los principales escenarios internacionales, consolidando el sonido alternativo japonés de vanguardia en todo el mundo.",
      milestonesTitle: "TRAYECTORIA ARTÍSTICA",
      statsListeners: "Oyentes Mensuales",
      statsViews: "Reproducciones Globales",
      statsVinyl: "Vinilos Exclusivos Agotados",
    },
    discography: {
      sectionNum: "03 / CATÁLOGO MUSICAL",
      badge: "DISCOGRAFÍA",
      title: "DISCOGRAFÍA",
      subtitle: "DISCOGRAFÍA",
      dragHint: "Arrastra la funda de vinilo para exploración 3D",
      tracks: "LISTA DE CANCIONES",
      catalog: "REFERENCIA",
      releaseDate: "FECHA DE LANZAMIENTO",
      listenOn: "ESCUCHAR EN PLATAFORMAS",
      streamAlbum: "REPRODUCIR ÁLBUM AHORA",
    },
    video: {
      sectionNum: "04 / CINEMATOGRAFÍA",
      badge: "VIDEOS",
      title: "VISUALES OFICIALES",
      subtitle: "VIDEOS",
      watchNow: "VER VIDEO",
      closeVideo: "CERRAR REPRODUCTOR ✕",
    },
    linkcore: {
      sectionNum: "05 / PORTAL DE STREAMING",
      badge: "PORTAL STREAMING",
      title: "DLC & STREAMING",
      subtitle: "LINKCORE / TUNECORE JAPAN",
      description: "Acceso instantáneo al catálogo completo de SENNA en Spotify, Apple Music, YouTube Music, Amazon Music y todas las plataformas de streaming del mundo.",
      openHub: "ABRIR LINKCORE HUB OFICIAL ↗",
      platformsNote: "Disponible en más de 100 plataformas musicales digitales",
    },
    goods: {
      sectionNum: "06 / COLECCIÓN OFICIAL",
      badge: "MERCHANDISE",
      title: "PRODUCTOS OFICIALES",
      subtitle: "COLECCIÓN",
      limited: "EDICIÓN LIMITADA",
      newBadge: "NUEVO",
      soldOut: "AGOTADO",
      orderNow: "COMPRAR PRODUCTO",
      modalTitle: "TIENDA ONLINE OFICIAL",
      modalSubtitle: "Envíos internacionales a todo el mundo.",
      modalNotice: "Las ediciones limitadas de gira se fabrican en cantidades restringidas.",
      close: "CERRAR ✕",
    },
    contact: {
      sectionNum: "07 / CONTACTO",
      badge: "CONTACTO",
      title: "PRENSA & CONTRATACIONES",
      subtitle: "CONTACTO",
      formName: "Nombre completo",
      formEmail: "Correo electrónico",
      formCategory: "Tipo de consulta",
      formCategoryBooking: "Conciertos y Festivales (Booking)",
      formCategoryPress: "Prensa y Medios de Comunicación",
      formCategoryGeneral: "Consultas Generales y Colaboración",
      formMessage: "Su mensaje",
      formSubmit: "ENVIAR CONSULTA",
      formSuccess: "Gracias por comunicarse. Nuestro equipo de management le responderá a la brevedad.",
      managementTitle: "Management",
      pressTitle: "Prensa y Comunicación",
      locationTitle: "Sede Tokio",
    },
    footer: {
      navTitle: "NAVEGACIÓN",
      navSubtitle: "ÍNDICE DE SECCIONES",
      socialsTitle: "REDES SOCIALES",
      socialsSubtitle: "CONECTAR CON SENNA",
      rights: "© 2026 SENNA MUSIC ENTERTAINMENT. TODOS LOS DERECHOS RESERVADOS.",
      privacy: "POLÍTICA DE PRIVACIDAD",
      terms: "TÉRMINOS DE USO",
      backToTop: "SUBIR AL INICIO ↑",
    },
    sound: {
      soundLabel: "SONIDO",
      mute: "Silenciar audio",
      play: "Reproducir audio ambiental",
    },
  },
};
