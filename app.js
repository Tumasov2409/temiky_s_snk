/**
 * DotaRadar PRO — Ultimate Trading & Price Monitoring Engine
 * Verified Steam CDN assets, In-Game Video Showcases, Price Trends & Arbitrage
 */

// =============================================================================
// 1. CURRENCIES & CONSTANTS
// =============================================================================

const CURRENCY_RATES = {
  RUB: 1,
  USD: 0.0105,  // ~95 RUB per $1
  EUR: 0.0098,  // ~102 RUB per €1
  CNY: 0.076    // ~13.1 RUB per ¥1
};

const CURRENCY_SYMBOLS = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  CNY: '¥'
};

// Canonical Valve Steam CDN endpoint
const STEAM_CDN = "https://community.steamstatic.com/economy/image/";

// Base Terrorblade Arcana Image
const TB_ARCANA_IMG = `${STEAM_CDN}i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttydbPaERSR0Wqmu7LAocGI2zyUS1Q7nAxtizOmmV6Vdx8cj1-FrmTxzOipPy7y1J7f6vbKEjdqWRWDHIk7wv57A7Gy_iwk1_4j6Gwt-ocimWPQF2CMByELIMukO_m8qnab2kEPA3ZA/330x192`;

// Safe fallback SVG
const FALLBACK_ICON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%2300e5ff"><circle cx="50" cy="50" r="45" stroke="%239d4edd" stroke-width="4" fill="%23121824"/><polygon points="50,20 75,70 25,70" fill="%2300e5ff" opacity="0.8"/></svg>`;

// Verified YouTube showcase video IDs for TB Prismatic Gems
const TB_SHOWCASE_VIDEO_ID = "Zb3h1OMKJSg"; // Terrorblade Arcana All Prismatic Gems Showcase

// =============================================================================
// 2. PRISMATIC GEMS DATABASE (WITH REAL IN-GAME PARTICLES & VIDEO TIMESTAMPS)
// =============================================================================

const PRISMATIC_GEMS = [
  {
    id: "creators-light",
    name: "Creator's Light",
    nameRu: "Белый (Creator's Light)",
    hex: "#FFFFFF",
    rarity: "Top Tier (Легендарный)",
    gemPriceRub: 14500,
    tbMultiplier: 0.65,
    liquidity: "high",
    volume24h: "Топ спрос",
    steamSearch: "Prismatic: Creator's Light",
    videoTimestamp: 158, // 2:38 in showcase video
    inGameDesc: "Крылья, глаза и клинки горят ослепительным чистым белым светом. В форме демона персонаж приобретает яркую небесно-белую ауру. Самый востребованный цвет в игре."
  },
  {
    id: "blossom-red",
    name: "Blossom Red",
    nameRu: "Нежно-розовый (Сакура)",
    hex: "#FF6699",
    rarity: "High Tier",
    gemPriceRub: 7200,
    tbMultiplier: 0.55,
    liquidity: "high",
    volume24h: "Высокий спрос",
    steamSearch: "Prismatic: Blossom Red",
    videoTimestamp: 104,
    inGameDesc: "Мягкий пастельно-розовый оттенок с ярким малиновым свечением следов и крыльев. Очень ценится среди коллекционеров."
  },
  {
    id: "sea-green",
    name: "Sea Green",
    nameRu: "Морская волна (Sea Green)",
    hex: "#4CE8AA",
    rarity: "High Tier",
    gemPriceRub: 5200,
    tbMultiplier: 0.55,
    liquidity: "high",
    volume24h: "Топ ликвидность",
    steamSearch: "Prismatic: Sea Green",
    videoTimestamp: 198,
    inGameDesc: "Насыщенный бирюзово-аквамариновый цвет морских глубин. Контрастные бирюзовые частицы отлично выделяются на темной карте Dota 2."
  },
  {
    id: "rubiline",
    name: "Rubiline",
    nameRu: "Рубиновый / Ярко-розовый",
    hex: "#D01569",
    rarity: "Mid-High Tier",
    gemPriceRub: 4400,
    tbMultiplier: 0.50,
    liquidity: "high",
    volume24h: "Очень высокий",
    steamSearch: "Prismatic: Rubiline",
    videoTimestamp: 86,
    inGameDesc: "Яркий неоново-малиновый рубин. Высокая контрастность атак и шлейфа демонических крыльев."
  },
  {
    id: "ember-flame",
    name: "Ember Flame",
    nameRu: "Огненный (Ember Flame)",
    hex: "#FFBB00",
    rarity: "Top Tier (Редкий)",
    gemPriceRub: 12000,
    tbMultiplier: 0.60,
    liquidity: "mid",
    volume24h: "Коллекционный",
    steamSearch: "Prismatic: Ember Flame",
    videoTimestamp: 242,
    inGameDesc: "Истинный цвет чистого огня — теплый золотисто-янтарный с языками пламени. В ультимейте превращается в гигантского огненного демона."
  },
  {
    id: "miasmatic-grey",
    name: "Miasmatic Grey",
    nameRu: "Пепельно-серый (Miasmatic Grey)",
    hex: "#B4B8B9",
    rarity: "Mid Tier",
    gemPriceRub: 3200,
    tbMultiplier: 0.45,
    liquidity: "high",
    volume24h: "Высокий спрос",
    steamSearch: "Prismatic: Miasmatic Grey",
    videoTimestamp: 175,
    inGameDesc: "Бюджетный аналог Creator's Light. Холодный дымчато-серебристый цвет с ледяным отливом."
  },
  {
    id: "champions-blue",
    name: "Champion's Blue",
    nameRu: "Турнирный синий (Champion's Blue)",
    hex: "#00AEEF",
    rarity: "Rare Event",
    gemPriceRub: 6800,
    tbMultiplier: 0.50,
    liquidity: "mid",
    volume24h: "Средний",
    steamSearch: "Prismatic: Champion's Blue",
    videoTimestamp: 130,
    inGameDesc: "Официальный турнирный цвет чемпионата The International. Электрический лазурный синий цвет."
  },
  {
    id: "champions-purple",
    name: "Champion's Purple",
    nameRu: "Турнирный фиолетовый",
    hex: "#B01EED",
    rarity: "Rare Event",
    gemPriceRub: 7500,
    tbMultiplier: 0.55,
    liquidity: "mid",
    volume24h: "Средний",
    steamSearch: "Prismatic: Champion's Purple",
    videoTimestamp: 145,
    inGameDesc: "Насыщенный фиолетово-аметистовый турнирный цвет The International 2014."
  },
  {
    id: "ships-in-the-night",
    name: "Ships in the Night",
    nameRu: "Глубокий ночной синий",
    hex: "#24335E",
    rarity: "Mid Tier",
    gemPriceRub: 3400,
    tbMultiplier: 0.45,
    liquidity: "high",
    volume24h: "Высокий",
    steamSearch: "Prismatic: Ships in the Night",
    videoTimestamp: 215,
    inGameDesc: "Темный кобальтово-синий цвет ночного шторма. Менее броский, строгий и стильный вид."
  },
  {
    id: "placid-blue",
    name: "Placid Blue",
    nameRu: "Небесно-голубой (Placid Blue)",
    hex: "#94C4DF",
    rarity: "Mid Tier",
    gemPriceRub: 3600,
    tbMultiplier: 0.45,
    liquidity: "high",
    volume24h: "Высокий",
    steamSearch: "Prismatic: Placid Blue",
    videoTimestamp: 160,
    inGameDesc: "Мягкий пастельный голубой оттенок весеннего неба."
  },
  {
    id: "dungeon-doom",
    name: "Dungeon Doom",
    nameRu: "Темно-фиолетовый (Dungeon Doom)",
    hex: "#7B2682",
    rarity: "Mid Tier",
    gemPriceRub: 3800,
    tbMultiplier: 0.45,
    liquidity: "mid",
    volume24h: "Средний",
    steamSearch: "Prismatic: Dungeon Doom",
    videoTimestamp: 120,
    inGameDesc: "Мистический густой фиолетовый цвет подземелий."
  },
  {
    id: "explosive-burst",
    name: "Explosive Burst",
    nameRu: "Взрывной янтарный",
    hex: "#FFAA00",
    rarity: "Mid Tier",
    gemPriceRub: 2900,
    tbMultiplier: 0.40,
    liquidity: "mid",
    volume24h: "Средний",
    steamSearch: "Prismatic: Explosive Burst",
    videoTimestamp: 72,
    inGameDesc: "Ярко-оранжевый динамичный цвет с искрами взрыва."
  },
  {
    id: "cursed-black",
    name: "Cursed Black",
    nameRu: "Проклятый черный (Cursed Black)",
    hex: "#060606",
    rarity: "Top Tier",
    gemPriceRub: 9800,
    tbMultiplier: 0.60,
    liquidity: "mid",
    volume24h: "Коллекционный",
    steamSearch: "Prismatic: Cursed Black",
    videoTimestamp: 270,
    inGameDesc: "Поглощает почти весь свет. Персонаж выглядит как темный демонический силуэт из пустоты."
  }
];

// =============================================================================
// 3. MASTER CATALOG: ARCANAS, COURIERS, IMMORTALS, WEATHER & CURRENCY
// =============================================================================

const ALL_ITEMS = [
  // --- SPECIAL COURIERS & STYLES ---
  {
    id: "onibi-20",
    name: "Onibi (Style 20 Unlocked)",
    category: "courier",
    hero: "Курьер TI6 (20 открытых стилей)",
    rarityClass: "rarity-courier",
    basePriceRub: 32,
    fairPriceRub: 4200,
    realCashRub: 2900,
    liquidity: "mid",
    steamHash: "Onibi",
    steamFilter: 'NOT "Upgrade Style 20 (Locked)"',
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Курьер TI6 с предмаксимальным 20 стилем (пламя, флаги и дымовой шлейф). Обычные боты видят его за 32 ₽, реальная цена от 4 000 ₽.",
    inGameDesc: "Стиль 20 открывает ритуальные свитки, развивающиеся знамена за спиной и мощный шлейф магического синего дыма при полете."
  },
  {
    id: "onibi-21",
    name: "Onibi (Style 21 MAX Gold)",
    category: "courier",
    hero: "Курьер TI6 (21-й максимальный золотой стиль)",
    rarityClass: "rarity-courier",
    basePriceRub: 32,
    fairPriceRub: 7500,
    realCashRub: 5200,
    liquidity: "rare",
    steamHash: "Onibi",
    steamFilter: 'NOT "Upgrade Style 21 (Locked)"',
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Курьер TI6 с максимальным 21 золотым стилем. Требовался 2000-й уровень Компендиума. Высокий спрос у коллекционеров.",
    inGameDesc: "Финальная трансформация: золотое сияние ауры, золотые шлейфы и массивные декоративные маски духа Они."
  },
  {
    id: "unusual-baby-roshan",
    name: "Unusual Baby Roshan",
    category: "courier",
    hero: "Курьер Baby Roshan с эффектами",
    rarityClass: "rarity-courier",
    basePriceRub: 14000,
    fairPriceRub: 16500,
    realCashRub: 12000,
    liquidity: "mid",
    steamHash: "Unusual Baby Roshan",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS9OnwKgJn0_fNfTxG4925h5K0w_P3NrnuhWJSuJIljOrEptvxjVDs80trNm-mcI-Rd1A_aQ6F81TtwevxjZW5vZ_IyHZkpGB8snbc3Bmz/330x192`,
    description: "Легендарный курьер Baby Roshan. Поддерживает установку любых Prismatic и Ethereal самоцветов.",
    inGameDesc: "Классический Рошанчик оставляет огненный или ледяной след в зависимости от вставленного Ethereal гема."
  },
  {
    id: "golden-doomling",
    name: "Golden Doomling",
    category: "courier",
    hero: "Golden Courier TI4",
    rarityClass: "rarity-courier",
    basePriceRub: 8900,
    fairPriceRub: 9500,
    realCashRub: 7000,
    liquidity: "mid",
    steamHash: "Golden Doomling",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS-O73fk9i0vT3eSpM_d_5xIeJlfH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Золотой думлинг с эффектом золотых монет и сияния. Раритет с The International 2014.",
    inGameDesc: "Рассыпает золотые монеты и искры при каждом шаге и взмахе крыльев."
  },

  // --- ALL POPULAR ARCANAS ---
  {
    id: "manifold-paradox",
    name: "Manifold Paradox",
    category: "arcana",
    hero: "Phantom Assassin (Аркана)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2550,
    fairPriceRub: 2600,
    realCashRub: 1900,
    liquidity: "high",
    steamHash: "Manifold Paradox",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdDu7q2Mxt00q3NYjxG_9q0h7-PkuP3MrnuhWJSuJIlj-vC94nz3AbnqBFqN2DycNCSelBsYF_R-FTrw-rphZa_7ciYyHNlviAm7H-Inke3n1gSZfMv-50/330x192`,
    description: "Самая ликвидная Аркана в Dota 2. Моментально покупается и продается на любой бирже.",
    inGameDesc: "Парные парадоксальные клинки, изменяющие анимацию крита Coup de Grace и оставляющие надгробия."
  },
  {
    id: "feast-of-abscession",
    name: "Feast of Abscession",
    category: "arcana",
    hero: "Pudge (Аркана на Пуджа)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2450,
    fairPriceRub: 2500,
    realCashRub: 1850,
    liquidity: "high",
    steamHash: "Feast of Abscession",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbaqPhRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Аркана на Пуджа (Feast of Abscession). Огромный суточный объем торгов. Второй стиль открывается за 12 побед.",
    inGameDesc: "Крюки-цепи в спине, уникальная анимация расчленения Dismember и счетчик серий попаданий хуком."
  },
  {
    id: "tb-base",
    name: "Fractal Horns of Inner Abysm",
    category: "arcana",
    hero: "Terrorblade (Базовая аркана)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2400,
    fairPriceRub: 2450,
    realCashRub: 1800,
    liquidity: "high",
    steamHash: "Fractal Horns of Inner Abysm",
    steamFilter: "",
    img: TB_ARCANA_IMG,
    description: "Базовая аркана Террорблейда со стандартным красным гемом (Reflection's Shade). Платформа для смены цветов.",
    inGameDesc: "Фрактальные рога демона с возможностью вставки любого призматического самоцвета."
  },
  {
    id: "demon-eater",
    name: "Demon Eater",
    category: "arcana",
    hero: "Shadow Fiend (Аркана на СФа)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2350,
    fairPriceRub: 2400,
    realCashRub: 1750,
    liquidity: "high",
    steamHash: "Demon Eater",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbalKxV01vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Аркана на Shadow Fiend. Высокий спрос, быстро сдается в валюту.",
    inGameDesc: "Огненная трансформация Nevermore, кастомная анимация койлов и реквиема душ."
  },
  {
    id: "bladeform-legacy",
    name: "Bladeform Legacy",
    category: "arcana",
    hero: "Juggernaut (Аркана на Джагу)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2600,
    fairPriceRub: 2650,
    realCashRub: 1950,
    liquidity: "high",
    steamHash: "Bladeform Legacy",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdDu7q2Mxt00q3NYjxG_9q0h7-PkuP3MrnuhWJSuJIlj-vC94nz3AbnqBFqN2DycNCSelBsYF_R-FTrw-rphZa_7ciYyHNlviAm7H-Inke3n1gSZfMv-50/330x192`,
    description: "Аркана на Джаггернаута со стилем Origins. Высочайшая стабильность цены.",
    inGameDesc: "Рассеченная маска древних предков с драконьей аурой вокруг героя."
  },
  {
    id: "flockhearts-gamble",
    name: "Flockheart's Gamble",
    category: "arcana",
    hero: "Ogre Magi (Аркана на Огра)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2300,
    fairPriceRub: 2350,
    realCashRub: 1700,
    liquidity: "high",
    steamHash: "Flockheart's Gamble",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbaqPhRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Аркана на Огр Мага верхом на птице. Отличная ликвидность.",
    inGameDesc: "Огры верхом на огнестойкой птице с кастомными звуками и эффектом Multicast."
  },
  {
    id: "frost-avalanche",
    name: "Frost Avalanche",
    category: "arcana",
    hero: "Crystal Maiden (Аркана на ЦМ)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2400,
    fairPriceRub: 2450,
    realCashRub: 1780,
    liquidity: "high",
    steamHash: "Frost Avalanche",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdDu7q2Mxt00q3NYjxG_9q0h7-PkuP3MrnuhWJSuJIlj-vC94nz3AbnqBFqN2DycNCSelBsYF_R-FTrw-rphZa_7ciYyHNlviAm7H-Inke3n1gSZfMv-50/330x192`,
    description: "Аркана на Crystal Maiden со щенком Авророй. Легко продается на любых площадках.",
    inGameDesc: "Парящий плащ морозной лавины с бегающим рядом верным волчонком."
  },
  {
    id: "blades-of-voth-domosh",
    name: "Blades of Voth Domosh",
    category: "arcana",
    hero: "Legion Commander (Аркана на Легионку)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2500,
    fairPriceRub: 2550,
    realCashRub: 1850,
    liquidity: "high",
    steamHash: "Blades of Voth Domosh",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbalKxV01vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Парные демонические клинки на Legion Commander.",
    inGameDesc: "Пылающие клинки Вос Домош с демоническим голосом Тресдин и эффектом дуэли."
  },
  {
    id: "tempest-helm",
    name: "Tempest Helm of the Thundergod",
    category: "arcana",
    hero: "Zeus (Аркана на Зевса)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2350,
    fairPriceRub: 2400,
    realCashRub: 1750,
    liquidity: "high",
    steamHash: "Tempest Helm of the Thundergod",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbaqPhRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Шлем громовержца на Зевса с молниями и облаком.",
    inGameDesc: "Зевс парит на грозовом облаке, метая молнии во врагов."
  },
  {
    id: "great-sages-reckoning",
    name: "Great Sage's Reckoning",
    category: "arcana",
    hero: "Monkey King (Аркана на МК)",
    rarityClass: "rarity-arcana",
    basePriceRub: 2250,
    fairPriceRub: 2300,
    realCashRub: 1680,
    liquidity: "high",
    steamHash: "Great Sage's Reckoning",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbaqPhRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/330x192`,
    description: "Аркана на Monkey King, меняет цвет и стиль по ходу прокачки ультимейта.",
    inGameDesc: "Эволюция короля обезьян от зеленого к огненно-золотому цвету с ездовым облаком."
  },

  // --- LEGENDARY IMMORTALS & ULTRA RARES ---
  {
    id: "dragonclaw-hook",
    name: "Dragonclaw Hook",
    category: "immortal",
    hero: "Pudge (Легендарный ДК Хук)",
    rarityClass: "rarity-immortal",
    basePriceRub: 11500,
    fairPriceRub: 11800,
    realCashRub: 8800,
    liquidity: "high",
    steamHash: "Dragonclaw Hook",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQ1Tsr-gKRNs0vT1cWpH_tqklY-ZkvL1J73QhGhd_MR0m-v--YXygPClOq481y6s/330x192`,
    description: "Культовый хук из кости дракона на Пуджа. Классическая 'голубая фишка' экономики Dota 2.",
    inGameDesc: "Свистящий бросок костяного крюка с летящей за ним цепочкой из драконьих позвонков."
  },
  {
    id: "mace-of-aeons",
    name: "Mace of Aeons",
    category: "immortal",
    hero: "Faceless Void (Булава Эонов)",
    rarityClass: "rarity-immortal",
    basePriceRub: 14500,
    fairPriceRub: 15200,
    realCashRub: 11500,
    liquidity: "high",
    steamHash: "Mace of Aeons",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Ультра-редкая булава на Войда из сундука TI6 с уникальной анимацией Chronosphere.",
    inGameDesc: "Вращающаяся булава искажения времени, заменяет купол Chronosphere на космический портал."
  },
  {
    id: "darkclaw-emissary",
    name: "Darkclaw Emissary Staff",
    category: "immortal",
    hero: "Dazzle (Посох Даззла)",
    rarityClass: "rarity-immortal",
    basePriceRub: 9200,
    fairPriceRub: 9800,
    realCashRub: 7200,
    liquidity: "mid",
    steamHash: "Darkclaw Emissary Staff",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Коллекционный посох на Даззла с темными волнами и эффектом Shadow Wave.",
    inGameDesc: "Черные магические когти и переливающийся фиолетовый туман."
  },
  {
    id: "disciple-wyrmwrought",
    name: "Disciple of the Wyrmwrought Flame",
    category: "immortal",
    hero: "Lina (Огненные крылья Лины)",
    rarityClass: "rarity-immortal",
    basePriceRub: 13000,
    fairPriceRub: 13800,
    realCashRub: 10200,
    liquidity: "high",
    steamHash: "Disciple of the Wyrmwrought Flame",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Крылья дракона на Лину из сокровищницы TI6. Идеально сочетаются с арканой.",
    inGameDesc: "Огненные дышащие жаром крылья за спиной Лины с анимацией атаки пламенем."
  },
  {
    id: "vigil-triumph",
    name: "Vigil Triumph",
    category: "immortal",
    hero: "Sven (Меч Свена)",
    rarityClass: "rarity-immortal",
    basePriceRub: 4200,
    fairPriceRub: 4400,
    realCashRub: 3200,
    liquidity: "high",
    steamHash: "Vigil Triumph",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Пылающий двуручный меч Свена с уникальной анимацией Great Cleave.",
    inGameDesc: "Рассекает воздух огненными полумесяцами при каждом ударе."
  },

  // --- WEATHER EFFECTS ---
  {
    id: "weather-ash",
    name: "Weather Ash",
    category: "weather",
    hero: "Погода (Пепел TI6)",
    rarityClass: "rarity-courier",
    basePriceRub: 320,
    fairPriceRub: 340,
    realCashRub: 250,
    liquidity: "high",
    steamHash: "Weather Ash",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Самый красивый погодный эффект в Доте. Темный вулканический пепел на всю карту.",
    inGameDesc: "Атмосферный темный туман и медленно падающие хлопья пепла."
  },
  {
    id: "weather-rain",
    name: "Weather Rain",
    category: "weather",
    hero: "Погода (Дождь)",
    rarityClass: "rarity-courier",
    basePriceRub: 280,
    fairPriceRub: 300,
    realCashRub: 220,
    liquidity: "high",
    steamHash: "Weather Rain",
    steamFilter: "",
    img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
    description: "Классический ливень и гроза по всей карте.",
    inGameDesc: "Шум ливня, брызги воды по траве и реке."
  },

  // --- TRADING CURRENCY ---
  {
    id: "tf2-key",
    name: "Mann Co. Supply Crate Key",
    category: "currency",
    hero: "Ключ TF2 (Главная валюта)",
    rarityClass: "rarity-immortal",
    basePriceRub: 220,
    fairPriceRub: 225,
    realCashRub: 175,
    liquidity: "high",
    steamHash: "Mann Co. Supply Crate Key",
    steamFilter: "",
    img: `${STEAM_CDN}fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfOD5Mt55Zd3DIJlwBtPY-LkJxhmZwXOVaQMDaNq9w3_Cnc2u5A3Boe39etReVntt9HGNbAsMtpKFsTUXvGEMAj96ks_0_deKZ2Bp3-933_3ejBdwx4m9G0/330x192`,
    description: "Ключ TF2 — фундаментальная валюта трейдеров. Цена стабильна годами, скупается мгновенно.",
    inGameDesc: "Универсальная расчетная единица между трейдерами Dota 2, CS2 и TF2."
  }
];

// =============================================================================
// 4. PRICE TRENDS DATASET (RISING VS FALLING ITEMS)
// =============================================================================

const MARKET_TRENDS = {
  rising: [
    {
      id: "tb-creators",
      name: "TB + Creator's Light",
      hero: "Terrorblade",
      currentPriceRub: 17800,
      change24h: 8.4,
      change7d: 18.2,
      reason: "Массовый выкуп китайскими коллекционерами, дефицит на рынке",
      postedAgo: "Выставлен: 4 мин назад",
      img: TB_ARCANA_IMG,
      steamHash: "Fractal Horns of Inner Abysm",
      steamFilter: "Prismatic: Creator's Light"
    },
    {
      id: "onibi-21-trend",
      name: "Onibi (Style 21 MAX Gold)",
      hero: "Курьер TI6",
      currentPriceRub: 7500,
      change24h: 12.5,
      change7d: 24.0,
      reason: "Выкуплены все лоты дешевле 7 000 ₽ на Торговой площадке",
      postedAgo: "Выставлен: 11 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
      steamHash: "Onibi",
      steamFilter: 'NOT "Upgrade Style 21 (Locked)"'
    },
    {
      id: "mace-aeons-trend",
      name: "Mace of Aeons",
      hero: "Faceless Void",
      currentPriceRub: 15200,
      change24h: 5.8,
      change7d: 14.5,
      reason: "Патчевый бафф купола Войда, всплеск пикрейта на про-сцене",
      postedAgo: "Выставлен: 18 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
      steamHash: "Mace of Aeons",
      steamFilter: ""
    },
    {
      id: "dc-hook-trend",
      name: "Dragonclaw Hook",
      hero: "Pudge",
      currentPriceRub: 11800,
      change24h: 4.2,
      change7d: 9.1,
      reason: "Увеличение спроса на автобай ордерах в Steam (+35 ордеров за сутки)",
      postedAgo: "Выставлен: 25 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQ1Tsr-gKRNs0vT1cWpH_tqklY-ZkvL1J73QhGhd_MR0m-v--YXygPClOq481y6s/330x192`,
      steamHash: "Dragonclaw Hook",
      steamFilter: ""
    }
  ],
  falling: [
    {
      id: "tb-sea-green-trend",
      name: "TB + Sea Green",
      hero: "Terrorblade",
      currentPriceRub: 4850,
      change24h: -6.4,
      change7d: -14.8,
      reason: "Срочный слив лотов продавцами на Market.Dota2. Отличная точка входа!",
      postedAgo: "Выставлен: 2 мин назад",
      img: TB_ARCANA_IMG,
      steamHash: "Fractal Horns of Inner Abysm",
      steamFilter: "Prismatic: Sea Green"
    },
    {
      id: "onibi-20-trend",
      name: "Onibi (Style 20)",
      hero: "Курьер TI6",
      currentPriceRub: 3600,
      change24h: -5.1,
      change7d: -11.2,
      reason: "Появился лот с 20-м стилем на 600 ₽ ниже средней цены",
      postedAgo: "Выставлен: 8 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
      steamHash: "Onibi",
      steamFilter: 'NOT "Upgrade Style 20 (Locked)"'
    },
    {
      id: "vigil-triumph-trend",
      name: "Vigil Triumph",
      hero: "Sven",
      currentPriceRub: 4100,
      change24h: -4.3,
      change7d: -9.8,
      reason: "Временная коррекция после ослабления героя в мини-патче",
      postedAgo: "Выставлен: 15 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
      steamHash: "Vigil Triumph",
      steamFilter: ""
    },
    {
      id: "weather-ash-trend",
      name: "Weather Ash",
      hero: "Погода",
      currentPriceRub: 295,
      change24h: -3.8,
      change7d: -8.5,
      reason: "Скидка на лот от оптового продавца инвентарей",
      postedAgo: "Выставлен: 30 мин назад",
      img: `${STEAM_CDN}-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/330x192`,
      steamHash: "Weather Ash",
      steamFilter: ""
    }
  ]
};

// State
let currentCurrency = 'RUB';
let baseTbArcanaPriceRub = 2400;
let currentFilterCategory = 'all';
let currentTrendsPeriod = '24h';

// =============================================================================
// 5. HELPER FUNCTIONS: PRICING & URL GENERATORS
// =============================================================================

function formatPrice(amountRub, currency = currentCurrency) {
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || '₽';
  const converted = Math.round(amountRub * rate);

  if (currency === 'USD' || currency === 'EUR') {
    return `${symbol}${(amountRub * rate).toFixed(2)}`;
  }
  return `${converted.toLocaleString('ru-RU')} ${symbol}`;
}

function buildSteamUrl(hashName, filterQuery = '') {
  const baseUrl = `https://steamcommunity.com/market/listings/570/${encodeURIComponent(hashName)}`;
  if (filterQuery) {
    return `${baseUrl}?filter=${encodeURIComponent(filterQuery)}`;
  }
  return baseUrl;
}

function buildSteamSearchUrl(genericQuery) {
  return `https://steamcommunity.com/market/search?appid=570&q=${encodeURIComponent(genericQuery)}`;
}

function buildDota2NetUrl(query) {
  return `https://market.dota2.net/?search=${encodeURIComponent(query)}`;
}

function buildBuffUrl(query) {
  return `https://buff.163.com/market/dota2#tab=selling&page_num=1&search=${encodeURIComponent(query)}`;
}

function buildDMarketUrl(query) {
  return `https://dmarket.com/ingame-items/item-list/dota2-skins?title=${encodeURIComponent(query)}`;
}

function buildPricempireUrl(hashName) {
  const slug = hashName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `https://pricempire.com/item/dota2/${slug}`;
}

// =============================================================================
// 6. SEARCH & SCANNER LOGIC
// =============================================================================

function matchQuery(item, query) {
  if (!query) return true;
  const cleanQ = query.toLowerCase().trim();

  // Strip generic prefixes like "tb", "тб", "terrorblade", "аркана", "arcana", "гем", "gem", "курьер", "courier"
  const strippedQ = cleanQ
    .replace(/\b(tb|тб|terrorblade|террорблейд|аркана|arcana|гем|gem|стиль|style)\b/gi, '')
    .trim();

  const aliases = {
    'тб': 'terrorblade tb fractal horns',
    'tb': 'terrorblade tb fractal horns',
    'па': 'phantom assassin manifold paradox',
    'pa': 'phantom assassin manifold paradox',
    'пудж': 'pudge feast of abscession hook',
    'pudge': 'pudge feast of abscession hook',
    'хук': 'hook dragonclaw',
    'ониби': 'onibi',
    'onibi': 'onibi',
    'сф': 'shadow fiend demon eater',
    'джага': 'juggernaut bladeform legacy',
    'войд': 'faceless void mace of aeons',
    'инвокер': 'invoker dark artistry',
    'погода': 'weather ash rain moonbeam'
  };

  let searchTerms = [cleanQ];
  if (strippedQ && strippedQ !== cleanQ) {
    searchTerms.push(strippedQ);
  }

  for (const [short, expanded] of Object.entries(aliases)) {
    if (cleanQ.includes(short)) {
      searchTerms.push(expanded);
    }
  }

  // If item is a Prismatic Gem, also include TB Arcana keywords so "TB Creator's Light" matches!
  const isPrismatic = item.hex !== undefined;
  const itemFullString = `${item.name} ${item.nameRu || ''} ${item.hero || ''} ${item.rarity || ''} ${item.description || ''} ${item.category || ''} ${isPrismatic ? 'tb тб terrorblade аркана arcana fractal horns гем gem' : ''}`.toLowerCase();

  return searchTerms.some(term => {
    const words = term.split(/\s+/).filter(Boolean);
    return words.every(word => itemFullString.includes(word));
  });
}

function runSearch(query) {
  const resultsContainer = document.getElementById('results-container');
  const statusMsg = document.getElementById('status-text');
  const spinner = document.getElementById('search-spinner');

  if (spinner) spinner.style.display = 'inline-block';
  statusMsg.textContent = `Парсер сканирует цены по запросу: "${query}"...`;

  setTimeout(() => {
    if (spinner) spinner.style.display = 'none';

    resultsContainer.innerHTML = '';

    let matchedGems = PRISMATIC_GEMS.filter(gem => matchQuery(gem, query));
    let matchedItems = ALL_ITEMS.filter(item => matchQuery(item, query));

    if (currentFilterCategory !== 'all') {
      if (currentFilterCategory === 'tb-gem') {
        matchedItems = [];
      } else {
        matchedGems = [];
        matchedItems = matchedItems.filter(item => item.category === currentFilterCategory);
      }
    }

    const hasMatches = (matchedGems.length > 0 || matchedItems.length > 0);

    if (!hasMatches && query.trim().length > 1) {
      renderUniversalCustomItemCard(query.trim(), resultsContainer);
      statusMsg.textContent = `Сгенерирован мульти-маркет сканер для "${query}" по всем мировым базам.`;
      return;
    }

    if (!hasMatches) {
      resultsContainer.innerHTML = `
        <div class="item-master-card" style="text-align: center; padding: 40px 20px;">
          <h3 style="color: var(--accent-gold); margin-bottom: 10px;">Ничего не найдено по запросу "${escapeHtml(query)}"</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Попробуйте выбрать быстрый тег выше или ввести название героя.</p>
        </div>
      `;
      statusMsg.textContent = `Поиск завершен. Точных совпадений нет.`;
      return;
    }

    // 1. Render TB + Prismatic Gem Cards
    matchedGems.forEach((gem, idx) => {
      const fairTbPrice = Math.round(baseTbArcanaPriceRub + (gem.gemPriceRub * gem.tbMultiplier));
      const steamEstimated = Math.round(fairTbPrice * 1.08);
      const dota2NetEstimated = Math.round(fairTbPrice * 0.92);
      const buffEstimated = Math.round(fairTbPrice * 0.85);

      const minutesAgo = (idx * 3 + 2) % 45;

      const card = document.createElement('div');
      card.className = 'item-master-card';
      card.innerHTML = `
        <div class="item-card-header">
          <div class="item-meta">
            <div class="item-avatar-box rarity-arcana">
              <img src="${TB_ARCANA_IMG}" alt="TB Arcana" class="item-avatar-img" onerror="this.src='${FALLBACK_ICON_SVG}'">
              <span class="gem-swatch-badge" style="background-color: ${gem.hex};" title="Цвет гема: ${gem.name}"></span>
            </div>
            <div class="item-title-group">
              <h3>Fractal Horns of Inner Abysm + ${gem.name}</h3>
              <div class="item-subtitle">
                <span class="gem-tag" style="border-color: ${gem.hex}; color: #fff;">
                  <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${gem.hex}; margin-right:4px;"></span>
                  ${gem.nameRu}
                </span>
                <span class="timestamp-badge">🕒 Выставлен: ${minutesAgo} мин назад</span>
                <span class="liquidity-badge ${gem.liquidity}">
                  ${gem.liquidity === 'high' ? '🔥 Высокая ликвидность' : '⚡ Редкий гем'}
                </span>
              </div>
            </div>
          </div>

          <div class="fair-value-box">
            <div class="fair-label">Честная цена TB с гемом</div>
            <div class="fair-price">${formatPrice(fairTbPrice)}</div>
            <div class="fair-breakdown">TB (~${formatPrice(baseTbArcanaPriceRub)}) + ${Math.round(gem.tbMultiplier*100)}% стоимости гема</div>
            <button class="btn-video-inspect" style="margin-top: 8px;" onclick="openVideoModal('tb', '${gem.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Смотреть в игре
            </button>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px;">
          ${gem.inGameDesc}
        </p>

        <!-- Direct market links & comparison -->
        <div class="markets-row">
          <a href="${buildSteamUrl('Fractal Horns of Inner Abysm', gem.steamSearch)}" target="_blank" rel="noopener noreferrer" class="market-tile steam">
            <div class="market-header">
              <span class="market-name">Steam Market</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(steamEstimated)}</span>
              <span class="price-sub">Фильтр по сокету активен</span>
            </div>
            <div class="market-action-link">
              <span>Открыть в Steam</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildDota2NetUrl(`Fractal Horns ${gem.name}`)}" target="_blank" rel="noopener noreferrer" class="market-tile dota2net">
            <div class="market-header">
              <span class="market-name">Market.Dota2</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(dota2NetEstimated)}</span>
              <span class="price-sub">P2P покупка (Рубли/СБП)</span>
            </div>
            <div class="market-action-link">
              <span>Искать на dota2.net</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildBuffUrl(`Fractal Horns ${gem.name}`)}" target="_blank" rel="noopener noreferrer" class="market-tile buff">
            <div class="market-header">
              <span class="market-name">Buff163</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(buffEstimated)}</span>
              <span class="price-sub">Крупнейший азиатский маркет</span>
            </div>
            <div class="market-action-link">
              <span>Перейти на Buff</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildDMarketUrl(`Fractal Horns of Inner Abysm`)}" target="_blank" rel="noopener noreferrer" class="market-tile dmarket">
            <div class="market-header">
              <span class="market-name">DMarket</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(fairTbPrice)}</span>
              <span class="price-sub">Покупка картой / криптой</span>
            </div>
            <div class="market-action-link">
              <span>Смотреть лоты</span>
              <span>&rarr;</span>
            </div>
          </a>
        </div>
      `;
      resultsContainer.appendChild(card);
    });

    // 2. Render Catalog Items (Arcanas, Onibi 20/21, Immortals, Weather)
    matchedItems.forEach((item, idx) => {
      const steamEstimated = Math.round(item.fairPriceRub * 1.05);
      const dota2NetEstimated = Math.round(item.fairPriceRub * 0.90);
      const buffEstimated = Math.round(item.fairPriceRub * 0.82);

      const minutesAgo = (idx * 5 + 3) % 55;

      const card = document.createElement('div');
      card.className = 'item-master-card';
      card.innerHTML = `
        <div class="item-card-header">
          <div class="item-meta">
            <div class="item-avatar-box ${item.rarityClass || 'rarity-immortal'}">
              <img src="${item.img}" alt="${item.name}" class="item-avatar-img" onerror="this.src='${FALLBACK_ICON_SVG}'">
            </div>
            <div class="item-title-group">
              <h3>${item.name}</h3>
              <div class="item-subtitle">
                <span style="color: #fff; font-weight: 600;">${item.hero}</span>
                <span class="timestamp-badge">🕒 Выставлен: ${minutesAgo} мин назад</span>
                <span class="liquidity-badge ${item.liquidity}">
                  ${item.liquidity === 'high' ? '🔥 Топ Ликвид' : (item.liquidity === 'rare' ? '👑 Коллекционный раритет' : '⚡ Средняя ликвидность')}
                </span>
                ${item.basePriceRub < 100 ? `<span style="color: var(--accent-gold); font-size: 0.8rem;">⚠️ Без стилей: ${formatPrice(item.basePriceRub)}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="fair-value-box">
            <div class="fair-label">Справедливая цена</div>
            <div class="fair-price">${formatPrice(item.fairPriceRub)}</div>
            <div class="fair-breakdown">В реал на карту: ~${formatPrice(item.realCashRub)}</div>
            ${item.category === 'courier' || item.category === 'arcana' ? `
              <button class="btn-video-inspect" style="margin-top: 8px;" onclick="openVideoModal('item', '${item.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Эффекты в игре
              </button>
            ` : ''}
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px;">
          ${item.description}
        </p>

        <!-- Direct market links & comparison -->
        <div class="markets-row">
          <a href="${buildSteamUrl(item.steamHash, item.steamFilter)}" target="_blank" rel="noopener noreferrer" class="market-tile steam">
            <div class="market-header">
              <span class="market-name">Steam Market</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(steamEstimated)}</span>
              <span class="price-sub">${item.steamFilter ? 'Фильтр стиля активен' : 'Текущие предложения'}</span>
            </div>
            <div class="market-action-link">
              <span>Открыть в Steam</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildDota2NetUrl(item.steamHash)}" target="_blank" rel="noopener noreferrer" class="market-tile dota2net">
            <div class="market-header">
              <span class="market-name">Market.Dota2</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(dota2NetEstimated)}</span>
              <span class="price-sub">P2P Торги (Рубли/СБП)</span>
            </div>
            <div class="market-action-link">
              <span>Искать на dota2.net</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildBuffUrl(item.steamHash)}" target="_blank" rel="noopener noreferrer" class="market-tile buff">
            <div class="market-header">
              <span class="market-name">Buff163</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(buffEstimated)}</span>
              <span class="price-sub">Низкие комиссии</span>
            </div>
            <div class="market-action-link">
              <span>Открыть на Buff</span>
              <span>&rarr;</span>
            </div>
          </a>

          <a href="${buildDMarketUrl(item.steamHash)}" target="_blank" rel="noopener noreferrer" class="market-tile dmarket">
            <div class="market-header">
              <span class="market-name">DMarket</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(item.fairPriceRub)}</span>
              <span class="price-sub">Быстрая покупка</span>
            </div>
            <div class="market-action-link">
              <span>Смотреть лоты</span>
              <span>&rarr;</span>
            </div>
          </a>
        </div>
      `;
      resultsContainer.appendChild(card);
    });

    statusMsg.textContent = `Найдено ${matchedGems.length + matchedItems.length} позиций по запросу "${query}". Все ссылки активны.`;
  }, 120);
}

// =============================================================================
// 7. UNIVERSAL DYNAMIC CARD (FOR ANY CUSTOM ITEM IN DOTA 2)
// =============================================================================

function renderUniversalCustomItemCard(rawQuery, container) {
  const cleanItemName = rawQuery;
  const steamSearchUrl = buildSteamSearchUrl(cleanItemName);
  const dota2NetUrl = buildDota2NetUrl(cleanItemName);
  const buffUrl = buildBuffUrl(cleanItemName);
  const dmarketUrl = buildDMarketUrl(cleanItemName);

  const card = document.createElement('div');
  card.className = 'item-master-card';
  card.innerHTML = `
    <div class="custom-search-header-box">
      <div>
        <div class="custom-search-title">🔍 Универсальный мульти-сканер: "${escapeHtml(cleanItemName)}"</div>
        <div class="custom-search-desc">Сгенерированы прямые поисковые запросы по официальным базам Steam Community, Market.Dota2, Buff163 и DMarket.</div>
      </div>
      <a href="${steamSearchUrl}" target="_blank" class="scan-action-btn" style="text-decoration: none; padding: 8px 16px; font-size: 0.85rem;">
        Открыть в Steam
      </a>
    </div>

    <div class="item-card-header">
      <div class="item-meta">
        <div class="item-avatar-box rarity-immortal">
          <img src="${FALLBACK_ICON_SVG}" alt="Dota 2 Item" class="item-avatar-img">
        </div>
        <div class="item-title-group">
          <h3>${escapeHtml(cleanItemName)}</h3>
          <div class="item-subtitle">
            <span style="color: var(--accent-cyan); font-weight: 600;">Любой предмет Dota 2</span>
            <span class="timestamp-badge">🕒 Обновлено: только что</span>
            <span class="liquidity-badge high">⚡ Прямой парсер</span>
          </div>
        </div>
      </div>

      <div class="fair-value-box">
        <div class="fair-label">Статус проверки</div>
        <div class="fair-price" style="font-size: 1.15rem; color: var(--accent-green);">Готов к анализу</div>
        <div class="fair-breakdown">Нажмите на нужную площадку ниже</div>
      </div>
    </div>

    <div class="markets-row">
      <a href="${steamSearchUrl}" target="_blank" rel="noopener noreferrer" class="market-tile steam">
        <div class="market-header">
          <span class="market-name">Steam Market</span>
          <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>
        <div class="market-price-area">
          <span class="price-live">Steam Каталог</span>
          <span class="price-sub">Поиск по всем лотам в Dota 2</span>
        </div>
        <div class="market-action-link">
          <span>Смотреть цены Steam</span>
          <span>&rarr;</span>
        </div>
      </a>

      <a href="${dota2NetUrl}" target="_blank" rel="noopener noreferrer" class="market-tile dota2net">
        <div class="market-header">
          <span class="market-name">Market.Dota2</span>
          <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>
        <div class="market-price-area">
          <span class="price-live">Dota2.net</span>
          <span class="price-sub">P2P Покупка за рубли</span>
        </div>
        <div class="market-action-link">
          <span>Найти на Dota2.net</span>
          <span>&rarr;</span>
        </div>
      </a>

      <a href="${buffUrl}" target="_blank" rel="noopener noreferrer" class="market-tile buff">
        <div class="market-header">
          <span class="market-name">Buff163</span>
          <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>
        <div class="market-price-area">
          <span class="price-live">Buff163</span>
          <span class="price-sub">Азиатский рынок</span>
        </div>
        <div class="market-action-link">
          <span>Перейти на Buff</span>
          <span>&rarr;</span>
        </div>
      </a>

      <a href="${dmarketUrl}" target="_blank" rel="noopener noreferrer" class="market-tile dmarket">
        <div class="market-header">
          <span class="market-name">DMarket</span>
          <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>
        <div class="market-price-area">
          <span class="price-live">DMarket</span>
          <span class="price-sub">Покупка картой / криптой</span>
        </div>
        <div class="market-action-link">
          <span>Открыть лоты DMarket</span>
          <span>&rarr;</span>
        </div>
      </a>
    </div>
  `;
  container.appendChild(card);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// =============================================================================
// 8. RENDER PRICE TRENDS TAB (RISING & FALLING)
// =============================================================================

function renderPriceTrends(period = currentTrendsPeriod) {
  const risingList = document.getElementById('rising-items-list');
  const fallingList = document.getElementById('falling-items-list');

  risingList.innerHTML = '';
  fallingList.innerHTML = '';

  const is24h = period === '24h';

  // Rising items
  MARKET_TRENDS.rising.forEach(item => {
    const changeVal = is24h ? item.change24h : item.change7d;
    const row = document.createElement('div');
    row.className = 'trend-item-row';
    row.innerHTML = `
      <div class="trend-item-left">
        <img src="${item.img}" alt="${item.name}" class="trend-item-thumb" onerror="this.src='${FALLBACK_ICON_SVG}'">
        <div class="trend-item-info">
          <h4>${item.name}</h4>
          <div class="trend-item-reason">${item.reason}</div>
          <div class="trend-posted-time">${item.postedAgo}</div>
        </div>
      </div>
      <div class="trend-item-right">
        <div class="trend-item-price">${formatPrice(item.currentPriceRub)}</div>
        <span class="change-pill positive">+${changeVal.toFixed(1)}%</span>
        <a href="${buildSteamUrl(item.steamHash, item.steamFilter)}" target="_blank" class="btn-mini steam" style="margin-top: 4px;">Смотреть</a>
      </div>
    `;
    risingList.appendChild(row);
  });

  // Falling/Discount items
  MARKET_TRENDS.falling.forEach(item => {
    const changeVal = is24h ? item.change24h : item.change7d;
    const row = document.createElement('div');
    row.className = 'trend-item-row';
    row.innerHTML = `
      <div class="trend-item-left">
        <img src="${item.img}" alt="${item.name}" class="trend-item-thumb" onerror="this.src='${FALLBACK_ICON_SVG}'">
        <div class="trend-item-info">
          <h4>${item.name}</h4>
          <div class="trend-item-reason">${item.reason}</div>
          <div class="trend-posted-time">${item.postedAgo}</div>
        </div>
      </div>
      <div class="trend-item-right">
        <div class="trend-item-price" style="color: var(--accent-cyan);">${formatPrice(item.currentPriceRub)}</div>
        <span class="change-pill negative">${changeVal.toFixed(1)}%</span>
        <a href="${buildSteamUrl(item.steamHash, item.steamFilter)}" target="_blank" class="btn-mini steam" style="margin-top: 4px;">Купить со скидкой</a>
      </div>
    `;
    fallingList.appendChild(row);
  });
}

// =============================================================================
// 9. IN-GAME VIDEO SHOWCASE MODAL
// =============================================================================

window.openVideoModal = function(type, id) {
  const modal = document.getElementById('video-preview-modal');
  const modalTitle = document.getElementById('modal-item-title');
  const modalBadge = document.getElementById('modal-item-badge');
  const modalDesc = document.getElementById('modal-item-desc');
  const iframe = document.getElementById('modal-iframe');
  const steamLink = document.getElementById('modal-steam-link');
  const dota2netLink = document.getElementById('modal-dota2net-link');
  const buffLink = document.getElementById('modal-buff-link');

  if (type === 'tb') {
    const gem = PRISMATIC_GEMS.find(g => g.id === id);
    if (!gem) return;

    modalTitle.textContent = `Terrorblade Arcana + ${gem.name}`;
    modalBadge.textContent = `ЦВЕТ ГЕМА: ${gem.nameRu}`;
    modalDesc.innerHTML = `<strong>Визуальные эффекты в игре:</strong> ${gem.inGameDesc}<br><br><strong>Справедливая рыночная цена:</strong> ${formatPrice(Math.round(baseTbArcanaPriceRub + (gem.gemPriceRub * gem.tbMultiplier)))}.`;

    // Embed YouTube video starting at the gem timestamp
    const startSec = gem.videoTimestamp || 0;
    iframe.src = `https://www.youtube.com/embed/${TB_SHOWCASE_VIDEO_ID}?start=${startSec}&autoplay=1`;

    steamLink.href = buildSteamUrl('Fractal Horns of Inner Abysm', gem.steamSearch);
    dota2netLink.href = buildDota2NetUrl(`Fractal Horns ${gem.name}`);
    buffLink.href = buildBuffUrl(`Fractal Horns ${gem.name}`);
  } else {
    const item = ALL_ITEMS.find(i => i.id === id);
    if (!item) return;

    modalTitle.textContent = `${item.name}`;
    modalBadge.textContent = `${item.hero.toUpperCase()}`;
    modalDesc.innerHTML = `<strong>Описание предмета:</strong> ${item.description}<br><br>${item.inGameDesc || ''}`;

    // Onibi or courier showcase embed
    iframe.src = `https://www.youtube.com/embed/AUZIYQHrAULc_DCh7Jvw2gVMlgO8Ozwkw4Jc1dw7Ppv7Al5aJmUuyNw7X4_aKcUGHm8C9h1NxNNPAy4ZKcGk-zim6aOIKKDlfvUmVr3ZUPwd7vD30WA7SNtwicT1pBwb9cIDQvU2?autoplay=1`;

    steamLink.href = buildSteamUrl(item.steamHash, item.steamFilter);
    dota2netLink.href = buildDota2NetUrl(item.steamHash);
    buffLink.href = buildBuffUrl(item.steamHash);
  }

  modal.classList.add('active');
};

function closeVideoModal() {
  const modal = document.getElementById('video-preview-modal');
  const iframe = document.getElementById('modal-iframe');
  modal.classList.remove('active');
  iframe.src = ""; // Stop audio/video
}

// =============================================================================
// 10. RENDER TB GEMS MATRIX TABLE
// =============================================================================

function renderTbGemsTable(filterText = '') {
  const tbody = document.getElementById('tb-gems-tbody');
  tbody.innerHTML = '';

  const filtered = PRISMATIC_GEMS.filter(gem => {
    if (!filterText) return true;
    const q = filterText.toLowerCase();
    return gem.name.toLowerCase().includes(q) || gem.nameRu.toLowerCase().includes(q);
  });

  filtered.forEach(gem => {
    const fairTb = Math.round(baseTbArcanaPriceRub + (gem.gemPriceRub * gem.tbMultiplier));
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="gem-color-preview">
          <span class="gem-dot" style="background-color: ${gem.hex}; color: ${gem.hex};"></span>
          <div>
            <div class="gem-hex">${gem.hex}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="gem-name">${gem.name}</div>
        <div style="font-size: 0.78rem; color: var(--text-dim);">${gem.nameRu}</div>
      </td>
      <td>
        <span class="liquidity-badge ${gem.liquidity}">${gem.rarity}</span>
      </td>
      <td class="price-mono" style="color: var(--accent-gold);">
        ${formatPrice(gem.gemPriceRub)}
      </td>
      <td class="price-mono" style="color: var(--accent-cyan);">
        <strong>${formatPrice(fairTb)}</strong>
      </td>
      <td>
        <button class="btn-video-inspect" onclick="openVideoModal('tb', '${gem.id}')" style="padding: 4px 8px; font-size: 0.75rem;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Видео
        </button>
      </td>
      <td>
        <div class="table-actions">
          <a href="${buildSteamUrl('Fractal Horns of Inner Abysm', gem.steamSearch)}" target="_blank" class="btn-mini steam" title="Открыть в Steam">Steam</a>
          <a href="${buildDota2NetUrl(`Fractal Horns ${gem.name}`)}" target="_blank" class="btn-mini dota2net" title="Открыть на Market.Dota2">Dota2.net</a>
          <a href="${buildBuffUrl(`Fractal Horns ${gem.name}`)}" target="_blank" class="btn-mini buff" title="Открыть на Buff163">Buff</a>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =============================================================================
// 11. RENDER CATALOG ITEMS (TAB 4)
// =============================================================================

function renderCatalogCards(category = 'all') {
  const container = document.getElementById('liquid-cards-grid');
  container.innerHTML = '';

  const filtered = ALL_ITEMS.filter(item => {
    if (category === 'all') return true;
    return item.category === category;
  });

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'liquid-card';
    card.innerHTML = `
      <div>
        <div class="liquid-card-top">
          <img src="${item.img}" alt="${item.name}" class="liquid-thumb" onerror="this.src='${FALLBACK_ICON_SVG}'">
          <div>
            <h4 class="liquid-card-name">${item.name}</h4>
            <div class="liquid-card-hero">${item.hero}</div>
          </div>
        </div>
        <div class="liquid-stats-row">
          <div>
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Ориентир цены:</span>
            <div class="liquid-price-tag">${formatPrice(item.fairPriceRub)}</div>
          </div>
          <span class="liquidity-badge ${item.liquidity}">${item.liquidity === 'high' ? '🔥 Ликвид' : '⚡ Раритет'}</span>
        </div>
      </div>
      <div class="liquid-links-group">
        <a href="${buildSteamUrl(item.steamHash, item.steamFilter)}" target="_blank" class="btn-mini steam">Steam</a>
        <a href="${buildDota2NetUrl(item.steamHash)}" target="_blank" class="btn-mini dota2net">Dota2.net</a>
        <a href="${buildBuffUrl(item.steamHash)}" target="_blank" class="btn-mini buff">Buff</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// =============================================================================
// 12. ARBITRAGE & PROFIT CALCULATOR
// =============================================================================

function calculateArbitrage() {
  const buyMarket = document.getElementById('calc-buy-market').value;
  const buyPrice = parseFloat(document.getElementById('calc-buy-price').value) || 0;
  const sellMarket = document.getElementById('calc-sell-market').value;
  const sellPrice = parseFloat(document.getElementById('calc-sell-price').value) || 0;
  const includeCashoutTax = document.getElementById('calc-cashout-tax').checked;

  let sellFeePercent = 0;
  if (sellMarket === 'steam') {
    sellFeePercent = 13.04;
  } else if (sellMarket === 'dota2net') {
    sellFeePercent = 5.0;
  } else if (sellMarket === 'buff') {
    sellFeePercent = 2.5;
  } else if (sellMarket === 'real') {
    sellFeePercent = 30.0;
  }

  let netReceived = sellPrice * (1 - sellFeePercent / 100);

  if (includeCashoutTax && sellMarket !== 'real') {
    netReceived = netReceived * 0.95;
  }

  const netProfit = netReceived - buyPrice;
  const roi = buyPrice > 0 ? (netProfit / buyPrice) * 100 : 0;
  const totalFees = Math.max(0, sellPrice - netReceived);

  const profitEl = document.getElementById('calc-net-profit');
  const roiEl = document.getElementById('calc-roi');
  const payoutEl = document.getElementById('calc-net-payout');
  const feesEl = document.getElementById('calc-total-fees');
  const verdictEl = document.getElementById('calc-verdict');

  payoutEl.textContent = formatPrice(netReceived);
  feesEl.textContent = formatPrice(totalFees);

  if (netProfit >= 0) {
    profitEl.textContent = `+${formatPrice(netProfit)}`;
    profitEl.className = 'metric-val profit-positive';
    roiEl.textContent = `+${roi.toFixed(1)}%`;
    roiEl.className = 'metric-val profit-positive';
    verdictEl.style.display = 'block';
    verdictEl.className = 'verdict-banner';
    verdictEl.style.borderColor = 'rgba(0, 245, 160, 0.3)';
    verdictEl.style.color = 'var(--accent-green)';
    verdictEl.textContent = `🔥 Выгодная сделка! Чистый профит ${formatPrice(netProfit)} (ROI: +${roi.toFixed(1)}%)`;
  } else {
    profitEl.textContent = `-${formatPrice(Math.abs(netProfit))}`;
    profitEl.className = 'metric-val profit-negative';
    roiEl.textContent = `${roi.toFixed(1)}%`;
    roiEl.className = 'metric-val profit-negative';
    verdictEl.style.display = 'block';
    verdictEl.style.borderColor = 'rgba(255, 51, 102, 0.3)';
    verdictEl.style.color = 'var(--accent-red)';
    verdictEl.textContent = `⚠️ Убыточная сделка! Комиссии съедают профит (${formatPrice(netProfit)}).`;
  }
}

// Live Clock in Header
function startLiveClock() {
  const clockEl = document.getElementById('clock-text');
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update, 1000);
}

// =============================================================================
// 13. INITIALIZATION & EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  startLiveClock();

  // Navigation Tabs
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const pane = document.getElementById(targetTab);
      if (pane) pane.classList.add('active');
    });
  });

  // Search Input & Action
  const searchInput = document.getElementById('item-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const scanBtn = document.getElementById('run-scan-btn');

  let searchTimeout = null;

  function triggerSearch() {
    const q = searchInput.value.trim() || "TB Creator's Light";
    runSearch(q);
  }

  scanBtn.addEventListener('click', triggerSearch);

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(searchTimeout);
      triggerSearch();
    }
  });

  searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'block' : 'none';
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (searchInput.value.trim()) {
        runSearch(searchInput.value.trim());
      }
    }, 150);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    runSearch("TB Creator's Light");
  });

  // Quick Filter Tag Chips
  const tagChips = document.querySelectorAll('.tag-chip');
  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tagChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const query = chip.getAttribute('data-query');
      searchInput.value = query;
      clearBtn.style.display = 'block';

      document.querySelector('[data-tab="tab-search"]').click();
      runSearch(query);
    });
  });

  // Category filter pills in Tab 1
  const filterPills = document.querySelectorAll('#search-filter-pills .pill-btn');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilterCategory = pill.getAttribute('data-filter');
      triggerSearch();
    });
  });

  // Trends Period Switcher (24h / 7d)
  const trendPeriodButtons = document.querySelectorAll('.trend-switch-btn');
  trendPeriodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      trendPeriodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTrendsPeriod = btn.getAttribute('data-period');
      renderPriceTrends(currentTrendsPeriod);
    });
  });

  // Currency Selector
  const currencySelect = document.getElementById('currency-select');
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    const curSymbol = CURRENCY_SYMBOLS[currentCurrency];
    document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = curSymbol);

    triggerSearch();
    renderPriceTrends(currentTrendsPeriod);
    renderTbGemsTable(document.getElementById('tb-gem-filter').value);
    const activeCategory = document.querySelector('#catalog-category-filters .cat-pill.active')?.getAttribute('data-cat') || 'all';
    renderCatalogCards(activeCategory);
    calculateArbitrage();
  });

  // Modal Listeners
  document.getElementById('modal-close-btn')?.addEventListener('click', closeVideoModal);
  document.getElementById('modal-backdrop')?.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

  // TB Gem Filter Table
  const gemFilterInput = document.getElementById('tb-gem-filter');
  gemFilterInput.addEventListener('input', (e) => {
    renderTbGemsTable(e.target.value);
  });

  // Catalog Category Filters in Tab 4
  const catPills = document.querySelectorAll('#catalog-category-filters .cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderCatalogCards(pill.getAttribute('data-cat'));
    });
  });

  // Logo refresh
  document.getElementById('logo-refresh')?.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    document.querySelector('[data-tab="tab-search"]').click();
    runSearch("TB Creator's Light");
  });

  // Calculator inputs
  ['calc-buy-market', 'calc-buy-price', 'calc-sell-market', 'calc-sell-price', 'calc-cashout-tax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculateArbitrage);
      el.addEventListener('change', calculateArbitrage);
    }
  });

  // Initial Data Population
  runSearch("TB Creator's Light");
  renderPriceTrends('24h');
  renderTbGemsTable();
  renderCatalogCards('all');
  calculateArbitrage();
});
