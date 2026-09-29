export interface LocalizedString {
  ja: string;
  en: string;
  fr?: string;
  es?: string;
  de?: string;
  [key: string]: string | undefined;
}

export interface NewsItem {
  id: string;
  date: string;
  category: "LIVE" | "RELEASE" | "MEDIA" | "GOODS";
  title: LocalizedString;
  summary: LocalizedString;
  image: string;
  linkText?: LocalizedString;
  featured?: boolean;
}

export interface Track {
  number: string;
  title: string;
  duration: string;
}

export interface ReleaseItem {
  id: string;
  type: "ALBUM" | "SINGLE" | "EP";
  title: string;
  japaneseTitle?: string;
  releaseDate: string;
  catalogNumber: string;
  coverImage: string;
  description: LocalizedString;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  linkcoreUrl: string;
  tracks: Track[];
}

export interface VideoItem {
  id: string;
  title: LocalizedString;
  subtitle: string;
  category: "OFFICIAL MV" | "LIVE PERFORMANCE" | "TEASER";
  duration: string;
  thumbnail: string;
  youtubeId: string;
  releaseDate: string;
}

export interface MerchItem {
  id: string;
  name: LocalizedString;
  priceJPY: number;
  priceEUR: number;
  badge?: "NEW" | "SOLD OUT" | "LIMITED";
  image: string;
  description: LocalizedString;
}

export interface Milestone {
  year: string;
  title: LocalizedString;
  detail: LocalizedString;
}

export const siteData = {
  artist: {
    name: "SENNA",
    japaneseName: "千奈",
    role: {
      ja: "シンガー / ソングライター / パフォーマー",
      en: "Singer / Songwriter / Live Performer",
      fr: "Chanteuse / Auteure-Compositrice / Performeuse Live",
      es: "Cantante / Compositora / Intérprete en Vivo",
      de: "Sängerin / Songwriterin / Live-Performerin",
    },
    tagline: {
      ja: "闇と光が交差する、エモーショナルな歌声と音響美学。",
      en: "Where obsidian dark meets crimson soul — an unforgettable cinematic sonic journey.",
      fr: "Là où l'obsidienne rencontre l'âme pourpre — une odyssée sonore et cinématographique.",
      es: "Donde la oscuridad de obsidiana se funde con el alma carmesí — un viaje sonoro inolvidable.",
      de: "Wo tiefschwarze Schatten auf karmesinrote Seelen treffen – eine unvergessliche cinematische Klangreise.",
    },
    latestAnnouncement: {
      ja: "NEW ALBUM 「ECLIPSE」 全世界ストリーミング配信スタート",
      en: "NEW ALBUM 'ECLIPSE' STREAMING NOW WORLDWIDE",
      fr: "NOUVEL ALBUM « ECLIPSE » DISPONIBLE EN STREAMING MONDIAL",
      es: "NUEVO ÁLBUM 'ECLIPSE' DISPONIBLE EN STREAMING GLOBAL",
      de: "NEUES ALBUM 'ECLIPSE' AB SOFORT WELTWEIT IM STREAMING",
    },
  },

  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@senna_official" },
    { name: "TikTok", url: "https://tiktok.com", handle: "@senna_live" },
    { name: "Spotify", url: "https://spotify.com", handle: "Senna" },
    { name: "YouTube", url: "https://youtube.com", handle: "Senna Official Channel" },
    { name: "X", url: "https://x.com", handle: "@senna_jp" },
    { name: "Apple Music", url: "https://music.apple.com", handle: "Senna" },
  ],

  hero: {
    badge: {
      ja: "最新作 ストリーミング配信中",
      en: "LATEST RELEASE STREAMING NOW",
      fr: "DERNIÈRE SORTIE EN STREAMING MONDIAL",
      es: "ÚLTIMO LANZAMIENTO EN STREAMING GLOBAL",
      de: "NEUER RELEASE JETZT IM STREAMING",
    },
    headline: {
      ja: "息を呑む、夜の響き。",
      en: "THE SOUND OF CRIMSON SHADOWS.",
      fr: "LE RETENTISSEMENT DES OMBRES POURPRES.",
      es: "EL SONIDO DE LAS SOMBRAS CARMESÍ.",
      de: "DER KLANG KARMESINROTER SCHATTEN.",
    },
    subheadline: {
      ja: "東京から世界へ。静寂と轟音を紡ぐ圧倒的ヴォーカルパフォーマンス。",
      en: "From Tokyo underground to world stages. Raw emotional vocals meets avant-garde production.",
      fr: "De l'underground tokyoïte aux scènes internationales. Des envolées vocales brutes alliées à une production d'avant-garde.",
      es: "Del underground tokiota a los grandes escenarios del mundo. Voces puras unidas a una producción vanguardista.",
      de: "Vom Tokioter Underground auf die Weltbühnen. Emotionale Vocals treffen auf avantgardistische Klangwelten.",
    },
    ctaPrimary: {
      ja: "ECLIPSE を聴く",
      en: "LISTEN TO ECLIPSE",
      fr: "ÉCOUTER ECLIPSE",
      es: "ESCUCHAR ECLIPSE",
      de: "ECLIPSE ANHÖREN",
    },
    ctaSecondary: {
      ja: "ツアー日程を見る",
      en: "VIEW TOUR DATES",
      fr: "VOIR LES DATES DE TOURNÉE",
      es: "VER FECHAS DE GIRA",
      de: "TOURDATEN ANSEHEN",
    },
    heroImage: "/images/senna-home.jpeg",
  },

  news: [
    {
      id: "news-01",
      date: "2026.11.08 SAT",
      category: "LIVE",
      featured: true,
      title: {
        ja: "SENNA 『ECLIPSE』 リリース記念スペシャルライブ開催決定！チケット先行受付スタート",
        en: "SENNA 'ECLIPSE' SPECIAL RELEASE LIVE ANNOUNCED! TICKET PRESALE OPEN",
        fr: "CONCERT ÉVÉNEMENT SENNA « ECLIPSE » AU NIPPON BUDOKAN ! PRÉVENTES OUVERTES",
        es: "¡CONCIERTO ESPECIAL DE LANZAMIENTO 'ECLIPSE' EN TOKIO! PREVENTA ABIERTA",
        de: "SENNA 'ECLIPSE' SPEZIAL-RELEASE-LIVE IM NIPPON BUDOKAN ANGEKÜNDIGT! VORVERKAUF GESTARTET",
      },
      summary: {
        ja: "待望のニューアルバム発売を記念したワンマンライブが決定。東京・日本武道館にて開催。",
        en: "Special one-man release showcase celebrating the launch of 'ECLIPSE' at Nippon Budokan Tokyo.",
        fr: "Concert exceptionnel célébrant la sortie de l'album 'ECLIPSE' sur la scène mythique du Nippon Budokan à Tokyo.",
        es: "Show exclusivo de lanzamiento conmemorando el álbum 'ECLIPSE' en el legendario Nippon Budokan de Tokio.",
        de: "Exklusives Release-Konzert zur Veröffentlichung des Meisterwerks 'ECLIPSE' im traditionsreichen Nippon Budokan in Tokio.",
      },
      image: "/images/senna-home.jpeg",
    },
    {
      id: "news-02",
      date: "2026.10.24 FRI",
      category: "RELEASE",
      title: {
        ja: "新曲「CRIMSON RAIN」 オフィシャルミュージックビデオ公開",
        en: "NEW SINGLE 'CRIMSON RAIN' OFFICIAL MUSIC VIDEO PREMIERE",
        fr: "NOUVEAU CLIP OFFICIEL « CRIMSON RAIN » EN LIGNE SUR YOUTUBE",
        es: "ESTRENO DEL VIDEOCLIP OFICIAL DEL SENCILLO 'CRIMSON RAIN'",
        de: "NEUE SINGLE 'CRIMSON RAIN' OFFIZIELLES MUSIKVIDEO PREMIERE",
      },
      summary: {
        ja: "アルバム『ECLIPSE』より、先行リードシングル「CRIMSON RAIN」の映像作品がYouTube公式チャンネルにて全世界同時公開。",
        en: "The cinematic lead single from the album 'ECLIPSE' is now streaming worldwide on YouTube.",
        fr: "Le single cinématographique extrait de l'album 'ECLIPSE' est désormais disponible en exclusivité sur YouTube.",
        es: "El cinematográfico tema principal del álbum 'ECLIPSE' ya está disponible a nivel mundial en YouTube.",
        de: "Die cinematische Lead-Single aus dem Album 'ECLIPSE' feiert weltweite Premiere auf dem offiziellen YouTube-Kanal.",
      },
      image: "/images/mv-crimson-rain.jpg",
    },
    {
      id: "news-03",
      date: "2026.10.10 SAT",
      category: "GOODS",
      title: {
        ja: "「SENNA CAPSULE COLLECTION」 オフィシャルグッズ第1弾ラインナップ解禁",
        en: "SENNA CAPSULE COLLECTION OFFICIAL MERCHANDISE FIRST DROP REVEALED",
        fr: "CAPSULE COLLECTION SENNA : DÉVOILEMENT DE LA PREMIÈRE SÉRIE MERCHANDISE",
        es: "COLECCIÓN CÁPSULA SENNA: PRIMER LANZAMIENTO EXCLUSIVO DE MERCHANDISE",
        de: "SENNA KAPSELKOLLEKTION: ERSTE OFFIZIELLE MERCHANDISE-SERIE ENTHÜLLT",
      },
      summary: {
        ja: "数量限定のヘビーオンス・ウォッシュド・ブラックフーディーや限定アナログ盤など、こだわりのツアー限定アイテムが登場。",
        en: "Limited edition washed black tour hoodies, heavyweight apparel and exclusive collector vinyl pressings.",
        fr: "Sweats à capuche lourds lavés au vintage, prêt-à-porter exclusif et pressages vinyles numérotés pour la tournée.",
        es: "Sudaderas con lavado vintage de alto gramaje, ropa exclusiva y prensados en vinilo de colección limitada.",
        de: "Streng limitierte Heavyweight-Tour-Hoodies im Vintage-Wasch-Look, exklusive Bekleidung und nummerierte Sammler-Vinyl-Editionen.",
      },
      image: "/images/merch-hoodie.jpg",
    },
    {
      id: "news-04",
      date: "2026.09.28 SUN",
      category: "MEDIA",
      title: {
        ja: "音楽誌『VOGUE JAPAN & ROLLING STONE』 特集インタビュー掲載",
        en: "COVER FEATURE & IN-DEPTH INTERVIEW IN VOGUE & ROLLING STONE",
        fr: "COUVERTURE & GRAND ENTRETIEN EXCLUSIF DANS VOGUE ET ROLLING STONE",
        es: "PORTADA Y ENTREVISTA EN PROFUNDIDAD EN VOGUE Y ROLLING STONE",
        de: "TITELSTORY & GROSSES INTERVIEW IN VOGUE UND ROLLING STONE",
      },
      summary: {
        ja: "楽曲制作のバックグラウンド、美意識、そしてニューアルバム『ECLIPSE』に込めた魂を語るロングインタビューが掲載。",
        en: "Senna opens up about sonic aesthetics, songwriting philosophy, and the birth of her defining opus 'ECLIPSE'.",
        fr: "SENNA se confie sur son esthétique sonore, sa quête vocale et la genèse passionnée de l'album 'ECLIPSE'.",
        es: "SENNA profundiza sobre su estética sonora, filosofía compositiva y la creación de su obra magna 'ECLIPSE'.",
        de: "SENNA spricht über Klangästhetik, Kompositionsphilosophie und die leidenschaftliche Entstehung ihres Meilensteins 'ECLIPSE'.",
      },
      image: "/images/album-eclipse.jpg",
    },
  ] as NewsItem[],

  profile: {
    statement: {
      ja: "「闇があるからこそ、一筋の赤い光は誰よりも強く輝く。」",
      en: "\"It is only in complete obsidian darkness that a single crimson flare shines with unyielding power.\"",
      fr: "« C'est au cœur de l'obscurité absolue qu'une seule flamme pourpre resplendit de toute sa puissance. »",
      es: "\"Es en la más profunda oscuridad donde una llama carmesí resplandece con fuerza inquebrantable.\"",
      de: "„Nur in vollkommener Finsternis erstrahlt ein einzelner Funke Karmesinrot mit unbezwingbarer Kraft.“",
    },
    bioParagraph1: {
      ja: "東京都出身。幼少期よりクラシックピアノとゴスペルヴォーカルに触れ、10代より作詞作曲およびプログラミングを開始。ダークポップ、オルタナティブロック、そして日本の伝統的旋律を融合した独自のサウンドスケープで瞬く間に注目を集める。",
      en: "Born in Tokyo, Senna developed a fascination for classical piano and deep gospel vocal harmonies in early childhood. By her teenage years, she was producing avant-garde electronic and alternative rock compositions that blend Japanese melodic poetry with raw international energy.",
      fr: "Originaire de Tokyo, SENNA s'initie dès l'enfance au piano classique et aux harmonies vocales. Adolescente, elle compose et produit des architectures sonores avant-gardistes mêlant la poésie mélodique japonaise aux textures électroniques ténébreuses.",
      es: "Nacida en Tokio, SENNA descubrió desde su niñez el piano clásico y la fuerza vocal. Ya en su juventud componía obras que entrelazan la lírica melódica japonesa con la potencia vanguardista del rock alternativo y la electrónica oscura.",
      de: "Geboren in Tokio, entdeckte SENNA früh das klassische Klavier und vokale Klangwelten. Als Jugendliche kreierte sie avantgardistische Produktionen, die japanische Melodieästhetik mit dunklem Dark-Pop und packender Dynamik verschmelzen.",
    },
    bioParagraph2: {
      ja: "魂を震わせる圧倒的な歌唱力と、シアトリカルなステージング、細部にまで美学が貫かれたビジュアル表現が高く評価され、国内外の音楽フェスティバルに出演。2026年、待望のフルアルバム『ECLIPSE』を発表。",
      en: "Renowned for her piercing vocal range, cinematic theatrical staging, and uncompromising dark haute-couture aesthetic, Senna has captivated audiences across major festivals worldwide. In 2026, she unveils her most ambitious studio album yet: 'ECLIPSE'.",
      fr: "Reconnue pour son amplitude vocale vertigineuse, sa scénographie théâtrale et son esthétique haute-couture nocturne, SENNA subjugue les foules des plus grands festivals. En 2026, elle dévoile son chef-d'œuvre discographique : 'ECLIPSE'.",
      es: "Reconocida por su impresionante tesitura vocal, puestas en escena teatrales y una estética refinada de alta costura, SENNA cautiva audiencias internacionales. En 2026 presenta su obra maestra: 'ECLIPSE'.",
      de: "Gefeiert für ihren atemberaubenden Stimmumfang, theatralische Bühneninszenierungen und kompromisslose Ästhetik, begeistert SENNA ein internationales Millionenpublikum. 2026 präsentiert sie ihr Hauptwerk: 'ECLIPSE'.",
    },
    milestones: [
      {
        year: "2023",
        title: {
          ja: "インディーズデビュー & 初ワンマン即完",
          en: "Indie Debut & Sold-out Showcase",
          fr: "Débuts Indépendants & Concert Sold-Out",
          es: "Debut Independiente y Entradas Agotadas",
          de: "Indie-Debüt & Ausverkaufter Premieren-Showcase",
        },
        detail: {
          ja: "Shibuya WWW Xにて初ワンマンライブ開催。チケットは3分で完売。",
          en: "First headline show sold out in under 3 minutes in Tokyo.",
          fr: "Premier concert à guichets fermés en moins de 3 minutes au Shibuya WWW X à Tokyo.",
          es: "Primer concierto en solitario agotado en menos de 3 minutos en Tokio.",
          de: "Erstes Headliner-Konzert im Shibuya WWW X Tokio innerhalb von 3 Minuten restlos ausverkauft.",
        },
      },
      {
        year: "2024",
        title: {
          ja: "シングル「MIDNIGHT VEIL」バイラルヒット",
          en: "Breakthrough Single 'MIDNIGHT VEIL'",
          fr: "Succès Viral Mondial « MIDNIGHT VEIL »",
          es: "Éxito Viral con 'MIDNIGHT VEIL'",
          de: "Internationaler Durchbruch mit 'MIDNIGHT VEIL'",
        },
        detail: {
          ja: "Spotify Viral 50チャート国内外で1位獲得。ストリーミング5000万回再生突破。",
          en: "Reached #1 on Viral 50 charts across Asia with over 50M streams.",
          fr: "N°1 des classements Spotify Viral 50 et plus de 50 millions d'écoutes mondiales.",
          es: "Número 1 en Spotify Viral 50 con más de 50 millones de reproducciones.",
          de: "Platz 1 der Spotify Viral Charts weltweit mit über 50 Millionen Streams.",
        },
      },
      {
        year: "2025",
        title: {
          ja: "SUMMER SONIC & 海外フェス出演",
          en: "Major International Festival Appearances",
          fr: "Tête d'affiche SUMMER SONIC & Festivals Mondiaux",
          es: "Actuaciones en Festivales Internacionales y SUMMER SONIC",
          de: "Headliner beim SUMMER SONIC & Internationale Festivals",
        },
        detail: {
          ja: "国内外の大型フェスにて圧巻のヘッドライナーパフォーマンスを披露。",
          en: "Acclaimed live stage performances, earning critical praise.",
          fr: "Prestations scéniques ovationnées par la critique musicale internationale.",
          es: "Elogiadas presentaciones en directo aclamadas por la crítica especializada.",
          de: "Umjubelte Festivalauftritte und begeisterte Kritiken führender Musikmagazine weltweit.",
        },
      },
      {
        year: "2026",
        title: {
          ja: "メジャーフルアルバム『ECLIPSE』発売",
          en: "Definitive Studio Album 'ECLIPSE'",
          fr: "Sortie de l'Album Magistral « ECLIPSE »",
          es: "Lanzamiento del Álbum Definitivo 'ECLIPSE'",
          de: "Veröffentlichung des Meilenstein-Albums 'ECLIPSE'",
        },
        detail: {
          ja: "自身初となる全国アリーナツアーを開催。",
          en: "Launching the nationwide 'Shadow & Light' arena tour.",
          fr: "Lancement de la grande tournée des arénas 'Shadow & Light'.",
          es: "Inicio de la gira nacional de arenas 'Shadow & Light'.",
          de: "Auftakt der monumentalen 'Shadow & Light' Arena-Tournee.",
        },
      },
    ] as Milestone[],
  },

  discography: [
    {
      id: "eclipse",
      type: "ALBUM",
      title: "ECLIPSE",
      japaneseTitle: "エクリプス / 蝕",
      releaseDate: "2026.10.15",
      catalogNumber: "SNA-001LP",
      coverImage: "/images/album-eclipse.jpg",
      description: {
        ja: "光と闇の二面性をテーマに紡がれた渾身のフルアルバム。全12曲収録。",
        en: "The landmark studio album exploring the duality between shadow and light. 12 cinematic tracks.",
        fr: "L'album studio monumental explorant la dualité entre l'ombre et la lumière. 12 pistes cinématographiques.",
        es: "El álbum cumbre que explora la dualidad entre sombra y luz. 12 pistas cinematográficas.",
        de: "Das richtungsweisende Konzeptalbum über die Dualität von Licht und Finsternis. 12 cineastische Titel.",
      },
      spotifyUrl: "https://spotify.com",
      appleMusicUrl: "https://music.apple.com",
      youtubeUrl: "https://youtube.com",
      linkcoreUrl: "https://linkco.re/senna-eclipse",
      tracks: [
        { number: "01", title: "PROLOGUE : OBSIDIAN", duration: "01:42" },
        { number: "02", title: "CRIMSON RAIN (Leading Single)", duration: "03:54" },
        { number: "03", title: "MIDNIGHT VEIL (Remastered)", duration: "04:12" },
        { number: "04", title: "TOKYO NOCTURNE", duration: "03:38" },
        { number: "05", title: "RED EMBERS", duration: "04:05" },
        { number: "06", title: "ECLIPSE (Title Track)", duration: "05:18" },
        { number: "07", title: "EPILOGUE : DAWN", duration: "02:15" },
      ],
    },
    {
      id: "crimson-rain",
      type: "SINGLE",
      title: "CRIMSON RAIN",
      japaneseTitle: "クリムゾン・レイン",
      releaseDate: "2026.09.01",
      catalogNumber: "SNA-002S",
      coverImage: "/images/mv-crimson-rain.jpg",
      description: {
        ja: "激情と静けさが交錯する、アルバム『ECLIPSE』先行リードトラック。",
        en: "Lead single capturing raw emotion against heavy drums and soaring strings.",
        fr: "Single phare conjuguant tension brute, percussions percutantes et cordes cinématiques.",
        es: "Sencillo principal que captura emoción pura con percusiones potentes y cuerdas emotivas.",
        de: "Leitsingle voller emotionaler Intensität mit wuchtigen Rhythmen und dramatischen Streichern.",
      },
      spotifyUrl: "https://spotify.com",
      appleMusicUrl: "https://music.apple.com",
      youtubeUrl: "https://youtube.com",
      linkcoreUrl: "https://linkco.re/senna-crimson",
      tracks: [
        { number: "01", title: "CRIMSON RAIN", duration: "03:54" },
        { number: "02", title: "CRIMSON RAIN (Instrumental)", duration: "03:54" },
      ],
    },
    {
      id: "midnight-veil",
      type: "EP",
      title: "MIDNIGHT VEIL",
      japaneseTitle: "ミッドナイト・ヴェール",
      releaseDate: "2025.04.20",
      catalogNumber: "SNA-001EP",
      coverImage: "/images/senna-home.jpeg",
      description: {
        ja: "バイラルヒットを記録したセンナの原点とも言える名盤EP。",
        en: "The viral breakthrough EP that established Senna's signature dark sound.",
        fr: "L'EP fondateur ayant propulsé l'identité sonore obscure de SENNA au premier plan.",
        es: "El EP de consagración que forjó el sonido oscuro y personal de SENNA.",
        de: "Die bahnbrechende EP, die SENNAs unverwechselbaren Sound weltweit etablierte.",
      },
      spotifyUrl: "https://spotify.com",
      appleMusicUrl: "https://music.apple.com",
      youtubeUrl: "https://youtube.com",
      linkcoreUrl: "https://linkco.re/senna-midnight",
      tracks: [
        { number: "01", title: "MIDNIGHT VEIL", duration: "04:12" },
        { number: "02", title: "SHADOW DANCE", duration: "03:22" },
        { number: "03", title: "NEON GHOSTS", duration: "03:45" },
      ],
    },
  ] as ReleaseItem[],

  video: {
    featured: {
      id: "mv-crimson-rain",
      title: {
        ja: "「CRIMSON RAIN」 Official Music Video",
        en: "'CRIMSON RAIN' Official Music Video",
        fr: "« CRIMSON RAIN » Clip Vidéo Officiel",
        es: "'CRIMSON RAIN' Video Musical Oficial",
        de: "'CRIMSON RAIN' Offizielles Musikvideo",
      },
      subtitle: "Directed by K. Shimizu (Tokyo Visuals)",
      category: "OFFICIAL MV",
      duration: "04:15",
      thumbnail: "/images/mv-crimson-rain.jpg",
      youtubeId: "dQw4w9WgXcQ",
      releaseDate: "2026.09.01",
    } as VideoItem,
    playlist: [
      {
        id: "mv-eclipse",
        title: {
          ja: "「ECLIPSE」 Live at Nippon Budokan (Teaser)",
          en: "'ECLIPSE' Live at Nippon Budokan",
          fr: "« ECLIPSE » Live au Nippon Budokan (Teaser)",
          es: "'ECLIPSE' En Vivo en Nippon Budokan",
          de: "'ECLIPSE' Live im Nippon Budokan (Teaser)",
        },
        subtitle: "Special Arena Preview",
        category: "LIVE PERFORMANCE",
        duration: "03:20",
        thumbnail: "/images/senna-home.jpeg",
        youtubeId: "dQw4w9WgXcQ",
        releaseDate: "2026.08.14",
      },
      {
        id: "mv-midnight",
        title: {
          ja: "「MIDNIGHT VEIL」 Official Music Video",
          en: "'MIDNIGHT VEIL' Music Video",
          fr: "« MIDNIGHT VEIL » Clip Vidéo Officiel",
          es: "'MIDNIGHT VEIL' Video Musical Oficial",
          de: "'MIDNIGHT VEIL' Musikvideo",
        },
        subtitle: "Over 50M Views on YouTube",
        category: "OFFICIAL MV",
        duration: "04:22",
        thumbnail: "/images/album-eclipse.jpg",
        youtubeId: "dQw4w9WgXcQ",
        releaseDate: "2025.05.01",
      },
    ] as VideoItem[],
  },

  linkcore: {
    headline: {
      ja: "ストリーミング＆ダウンロード",
      en: "STREAM & DOWNLOAD EVERYWHERE",
      fr: "STREAMING & TÉLÉCHARGEMENT MONDIAL",
      es: "STREAMING Y DESCARGA EN TODAS PARTES",
      de: "STREAMING & DOWNLOAD WELTWEIT",
    },
    subheadline: {
      ja: "Linkcore / TuneCore Japan 公式ハブ。お好みの配信サービスで即時再生いただけます。",
      en: "Official TuneCore Linkcore Hub. Stream Senna on your favorite music platform.",
      fr: "Portail officiel Linkcore / TuneCore Japan. Écoutez SENNA sur votre plateforme favorite.",
      es: "Portal oficial Linkcore / TuneCore Japón. Reproduce a SENNA en tu plataforma preferida.",
      de: "Offizieller TuneCore Linkcore Hub. Erleben Sie SENNA auf Ihrem bevorzugten Streamingdienst.",
    },
    linkcoreUrl: "https://linkco.re/senna-official",
    platforms: [
      { name: "Apple Music", icon: "apple", available: true },
      { name: "Spotify", icon: "spotify", available: true },
      { name: "YouTube Music", icon: "youtube", available: true },
      { name: "LINE MUSIC", icon: "line", available: true },
      { name: "Amazon Music", icon: "amazon", available: true },
      { name: "AWA", icon: "awa", available: true },
      { name: "iTunes Store", icon: "itunes", available: true },
      { name: "OTOTOY (Hi-Res)", icon: "ototoy", available: true },
    ],
  },

  goods: [
    {
      id: "hoodie-tour-2026",
      name: {
        ja: "SENNA TOUR 2026 ヴィンテージウォッシュド フーディー",
        en: "SENNA TOUR 2026 VINTAGE WASHED HOODIE",
        fr: "HOODIE VINTAGE WASHED TOURNÉE SENNA 2026",
        es: "SUDADERA VINTAGE WASHED GIRA SENNA 2026",
        de: "SENNA TOUR 2026 VINTAGE WASHED HOODIE",
      },
      priceJPY: 12800,
      priceEUR: 85,
      badge: "LIMITED",
      image: "/images/merch-hoodie.jpg",
      description: {
        ja: "ヘビーウェイト450gsmフレンチテリーコットン。胸元に高密度クリムゾン刺繍、バックにツアー日程をプリント。",
        en: "Heavyweight 450gsm washed French terry. High-density crimson chest embroidery with tour schedule on back.",
        fr: "Coton French Terry lourd 450 gsm délavé. Broderie rouge carmin haute densité sur la poitrine et dates de tournée au dos.",
        es: "Algodón French Terry pesado de 450 gsm. Bordado carmesí de alta definición y fechas de gira estampadas en la espalda.",
        de: "Schwere 450-g/m²-French-Terry-Baumwolle im Vintage-Wasch-Finish. Karmesinrote Stickerei auf der Brust und Tourdaten auf dem Rücken.",
      },
    },
    {
      id: "vinyl-eclipse-lp",
      name: {
        ja: "アルバム『ECLIPSE』 180g重量盤 限定カラーアナログレコード",
        en: "ALBUM 'ECLIPSE' 180G HEAVYWEIGHT COLOR VINYL LP",
        fr: "ALBUM « ECLIPSE » VINYLE 180G ÉDITION LIMITÉE COULEUR",
        es: "ÁLBUM 'ECLIPSE' VINILO 180G EDICIÓN LIMITADA EN COLOR",
        de: "ALBUM 'ECLIPSE' 180G SAMMLER-VINYL LP IN FARBE",
      },
      priceJPY: 5500,
      priceEUR: 38,
      badge: "NEW",
      image: "/images/album-eclipse.jpg",
      description: {
        ja: "深紅と漆黒のスプラッターカラー盤。豪華見開きゲートフォールド仕様、歌詞ブックレット封入。",
        en: "Blood crimson & obsidian splatter vinyl. Luxury gatefold packaging with art booklet.",
        fr: "Vinyle splatter carmin et obsidienne. Pochette gatefold deluxe avec livret artistique complet.",
        es: "Vinilo splatter carmesí y obsidiana. Empaque gatefold de lujo con folleto de arte exclusivo.",
        de: "Karmesinrotes und tiefschwarzes Splatter-Vinyl im edlen Gatefold-Cover mit exklusivem Artwork-Booklet.",
      },
    },
    {
      id: "tour-tshirt",
      name: {
        ja: "「SHADOW & LIGHT」 ツアーグラフィック Tシャツ (Black)",
        en: "'SHADOW & LIGHT' TOUR GRAPHIC T-SHIRT (BLACK)",
        fr: "T-SHIRT GRAPHIQUE DE TOURNÉE « SHADOW & LIGHT » (NOIR)",
        es: "CAMISETA GRÁFICA DE GIRA 'SHADOW & LIGHT' (NEGRO)",
        de: "'SHADOW & LIGHT' TOUR-GRAFIK-T-SHIRT (SCHWARZ)",
      },
      priceJPY: 5800,
      priceEUR: 40,
      badge: "NEW",
      image: "/images/merch-hoodie.jpg",
      description: {
        ja: "ボックスシルエット。フロントにアーティストグラフィック、首元に特製タグ仕様。",
        en: "Boxy luxury fit with custom screenprint graphic and woven neck label.",
        fr: "Coupe boxy contemporaine avec sérigraphie artistique exclusive et étiquette tissée sur mesure.",
        es: "Corte boxy premium con serigrafía artística exclusiva y etiqueta tejida personalizada.",
        de: "Moderner Boxy-Schnitt mit exklusivem Siebdruck-Artwork und maßgefertigtem Weblabel im Nacken.",
      },
    },
  ] as MerchItem[],

  contact: {
    headline: {
      ja: "お問い合わせ・出演依頼",
      en: "CONTACT & INQUIRIES",
      fr: "CONTACT & RÉSERVATIONS",
      es: "CONTACTO Y CONTRATACIONES",
      de: "KONTAKT & BOOKING",
    },
    subheadline: {
      ja: "ライブ出演、メディア取材、タイアップ等のご依頼は下記フォームよりご連絡ください。",
      en: "For live booking, brand collaborations, press inquiries, and management.",
      fr: "Pour les réservations de concerts, collaborations, relations presse et le management.",
      es: "Para contrataciones en vivo, colaboraciones de marca, prensa y representación artística.",
      de: "Für Konzertanfragen, Markenkooperationen, Presseinterviews und Management.",
    },
    management: "SENNA MUSIC ENTERTAINMENT / TOKYO",
    email: "management@senna-official.com",
    pressEmail: "press@senna-official.com",
  },
};
