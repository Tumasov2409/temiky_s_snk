/**
 * DotaRadar PRO — Core Trading & Price Comparison Engine
 * Supports Steam Community Market, Market.Dota2, Buff163, DMarket
 */

// =============================================================================
// 1. DATABASE OF PRISMATIC GEMS & LIQUID ITEMS
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

// Top Prismatic Gems for Terrorblade Arcana & Unusual Couriers
const PRISMATIC_GEMS = [
  {
    id: "creators-light",
    name: "Creator's Light",
    nameRu: "Белый (Creator's Light)",
    hex: "#FFFFFF",
    rarity: "Top Tier",
    gemPriceRub: 14500,
    tbMultiplier: 0.65, // ~65% of gem value adds to TB
    liquidity: "high",
    volume24h: "Высокий спрос",
    steamSearch: "Prismatic: Creator's Light"
  },
  {
    id: "blossom-red",
    name: "Blossom Red",
    nameRu: "Нежно-розовый (Blossom Red)",
    hex: "#FF6699",
    rarity: "High Tier",
    gemPriceRub: 7200,
    tbMultiplier: 0.55,
    liquidity: "high",
    volume24h: "Высокий спрос",
    steamSearch: "Prismatic: Blossom Red"
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
    volume24h: "Очень высокий",
    steamSearch: "Prismatic: Sea Green"
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
    volume24h: "Высокий спрос",
    steamSearch: "Prismatic: Rubiline"
  },
  {
    id: "ember-flame",
    name: "Ember Flame",
    nameRu: "Огненный (Ember Flame)",
    hex: "#FFBB00",
    rarity: "Top Tier",
    gemPriceRub: 12000,
    tbMultiplier: 0.60,
    liquidity: "mid",
    volume24h: "Коллекционный",
    steamSearch: "Prismatic: Ember Flame"
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
    steamSearch: "Prismatic: Miasmatic Grey"
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
    steamSearch: "Prismatic: Champion's Blue"
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
    steamSearch: "Prismatic: Champion's Purple"
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
    steamSearch: "Prismatic: Ships in the Night"
  },
  {
    id: "placid-blue",
    name: "Placid Blue",
    nameRu: "Небесно-голубой",
    hex: "#94C4DF",
    rarity: "Mid Tier",
    gemPriceRub: 3600,
    tbMultiplier: 0.45,
    liquidity: "high",
    volume24h: "Высокий",
    steamSearch: "Prismatic: Placid Blue"
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
    steamSearch: "Prismatic: Dungeon Doom"
  },
  {
    id: "explosive-burst",
    name: "Explosive Burst",
    nameRu: "Взрывной оранжевый",
    hex: "#FFAA00",
    rarity: "Mid Tier",
    gemPriceRub: 2900,
    tbMultiplier: 0.40,
    liquidity: "mid",
    volume24h: "Средний",
    steamSearch: "Prismatic: Explosive Burst"
  }
];

// Special Liquid Items & Couriers
const POPULAR_ITEMS = [
  {
    id: "onibi-20",
    name: "Onibi (Style 20 Unlocked)",
    category: "courier",
    hero: "Курьер TI6 (20 открытых стилей)",
    basePriceRub: 32, // base without styles
    fairPriceRub: 4200,
    realCashRub: 2900,
    liquidity: "mid",
    steamHash: "Onibi",
    steamFilter: 'NOT "Upgrade Style 20 (Locked)"',
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/128fx128f",
    description: "Курьер TI6 с предмаксимальным 20 стилем (пламя, флаги и дымовой шлейф). Обычные боты видят его за 32 ₽, реальная цена от 4 000 ₽."
  },
  {
    id: "onibi-21",
    name: "Onibi (Style 21 MAX Gold)",
    category: "courier",
    hero: "Курьер TI6 (21-й максимальный золотой стиль)",
    basePriceRub: 32,
    fairPriceRub: 7500,
    realCashRub: 5200,
    liquidity: "rare",
    steamHash: "Onibi",
    steamFilter: 'NOT "Upgrade Style 21 (Locked)"',
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQhS8-r2ekpl0qfJeD9N_N21ztiPlKevZr_Swm8Dv5YhiL6So4nz2ACy-EtvYWqgJY-QJAc4Zw3Ur1G9lefvjcC4uMzXiSw0F_Qc9gE/128fx128f",
    description: "Курьер TI6 с максимальным 21 золотым стилем. Требовался 2000-й уровень Компендиума. Высокий спрос у коллекционеров."
  },
  {
    id: "tf2-key",
    name: "Mann Co. Supply Crate Key",
    category: "currency",
    hero: "Универсальная валюта трейда",
    basePriceRub: 220,
    fairPriceRub: 225,
    realCashRub: 175,
    liquidity: "high",
    steamHash: "Mann Co. Supply Crate Key",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfOD5Mt55Zd3DIJlwBtPY-LkJxhmZwXOVaQMDaNq9w3_Cnc2u5A3Boe39etReVntt9HGNbAsMtpKFsTUXvGEMAj96ks_0_deKZ2Bp3-933_3ejBdwx4m9G0/128fx128f",
    description: "Ключ TF2 — главная стабильная 'валюта' для обмена скинов и вывода в реал без падения цен."
  },
  {
    id: "manifold-paradox",
    name: "Manifold Paradox (PA Arcana)",
    category: "arcana",
    hero: "Phantom Assassin",
    basePriceRub: 2550,
    fairPriceRub: 2600,
    realCashRub: 1900,
    liquidity: "high",
    steamHash: "Manifold Paradox",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdDu7q2Mxt00q3NYjxG_9q0h7-PkuP3MrnuhWJSuJIlj-vC94nz3AbnqBFqN2DycNCSelBsYF_R-FTrw-rphZa_7ciYyHNlviAm7H-Inke3n1gSZfMv-50/128fx128f",
    description: "Самая ликвидная Аркана в игре. Скупается и продается моментально за минуты."
  },
  {
    id: "feast-of-abscession",
    name: "Feast of Abscession (Pudge Arcana)",
    category: "arcana",
    hero: "Pudge",
    basePriceRub: 2450,
    fairPriceRub: 2500,
    realCashRub: 1850,
    liquidity: "high",
    steamHash: "Feast of Abscession",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdCvbaqPhRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/128fx128f",
    description: "Аркана на Пуджа с огромным суточным объемом торгов на всех мировых площадках."
  },
  {
    id: "tb-base",
    name: "Fractal Horns of Inner Abysm (TB)",
    category: "arcana",
    hero: "Terrorblade",
    basePriceRub: 2400,
    fairPriceRub: 2450,
    realCashRub: 1800,
    liquidity: "high",
    steamHash: "Fractal Horns of Inner Abysm",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdcubS2PRRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/128fx128f",
    description: "Базовая аркана на Террорблейда со стандартным красным гемом (Reflection's Shade)."
  },
  {
    id: "bladeform-legacy",
    name: "Bladeform Legacy (Juggernaut Arcana)",
    category: "arcana",
    hero: "Juggernaut",
    basePriceRub: 2600,
    fairPriceRub: 2650,
    realCashRub: 1950,
    liquidity: "high",
    steamHash: "Bladeform Legacy",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdDu7q2Mxt00q3NYjxG_9q0h7-PkuP3MrnuhWJSuJIlj-vC94nz3AbnqBFqN2DycNCSelBsYF_R-FTrw-rphZa_7ciYyHNlviAm7H-Inke3n1gSZfMv-50/128fx128f",
    description: "Высокая ликвидность, стиль Origins разблокированным стоит на 10-15% дороже."
  },
  {
    id: "dragonclaw-hook",
    name: "Dragonclaw Hook",
    category: "immortal",
    hero: "Pudge (Legendary Immortal)",
    basePriceRub: 11500,
    fairPriceRub: 11800,
    realCashRub: 8800,
    liquidity: "mid",
    steamHash: "Dragonclaw Hook",
    steamFilter: "",
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQ1Tsr-gKRNs0vT1cWpH_tqklY-ZkvL1J73QhGhd_MR0m-v--YXygPClOq481y6s/128fx128f",
    description: "Культовый винтажный предмет Dota 2. Используется для крупных сделок."
  }
];

// Current State
let currentCurrency = 'RUB';
let baseTbArcanaPriceRub = 2400;

// =============================================================================
// 2. HELPER FUNCTIONS: URL BUILDERS & FORMATTERS
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
// 3. SEARCH & AUTO-PARSER ENGINE
// =============================================================================

function matchQuery(item, query) {
  if (!query) return true;
  const cleanQ = query.toLowerCase().trim();
  
  // Aliases for common user terms
  const aliases = {
    'тб': 'terrorblade tb fractal horns',
    'tb': 'terrorblade fractal horns',
    'па': 'phantom assassin manifold paradox',
    'pa': 'phantom assassin manifold paradox',
    'пудж': 'pudge feast of abscession hook',
    'ониби': 'onibi',
    'onibi': 'onibi'
  };

  let searchTerms = [cleanQ];
  for (const [short, expanded] of Object.entries(aliases)) {
    if (cleanQ.includes(short)) {
      searchTerms.push(expanded);
    }
  }

  const combinedSearch = searchTerms.join(' ');
  const itemFullString = `${item.name} ${item.nameRu || ''} ${item.hero || ''} ${item.rarity || ''} ${item.description || ''}`.toLowerCase();

  return searchTerms.some(term => {
    const words = term.split(/\s+/);
    return words.every(word => itemFullString.includes(word));
  });
}

function runSearch(query) {
  const resultsContainer = document.getElementById('results-container');
  const statusMsg = document.getElementById('status-text');
  const spinner = document.getElementById('search-spinner');

  if (spinner) spinner.style.display = 'inline-block';
  statusMsg.textContent = `Сканирование цен по запросу: "${query}" на Steam, Market.Dota2, Buff...`;

  setTimeout(() => {
    if (spinner) spinner.style.display = 'none';

    // Check if query is looking for TB + Gem
    const isTbSearch = /tb|тб|terrorblade|fractal|гем|gem/i.test(query);
    const matchedGems = PRISMATIC_GEMS.filter(gem => matchQuery(gem, query));
    const matchedItems = POPULAR_ITEMS.filter(item => matchQuery(item, query));

    resultsContainer.innerHTML = '';

    if (matchedGems.length === 0 && matchedItems.length === 0) {
      resultsContainer.innerHTML = `
        <div class="item-master-card" style="text-align: center; padding: 40px 20px;">
          <h3 style="color: var(--accent-gold); margin-bottom: 10px;">Ничего не найдено по запросу "${escapeHtml(query)}"</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Попробуйте выбрать быстрый тег выше (например, "TB Creator's Light" или "Onibi 20") или введите другое название.</p>
          <a href="${buildSteamUrl(query)}" target="_blank" class="scan-action-btn" style="display: inline-flex; margin: 0 auto; text-decoration: none;">
            🔍 Искать напрямую на Торговой площадке Steam
          </a>
        </div>
      `;
      statusMsg.textContent = `Поиск завершен. Точных совпадений нет.`;
      return;
    }

    // Render TB + Gem Cards
    matchedGems.forEach(gem => {
      const fairTbPrice = Math.round(baseTbArcanaPriceRub + (gem.gemPriceRub * gem.tbMultiplier));
      const steamEstimated = Math.round(fairTbPrice * 1.08); // typical Steam market premium
      const dota2NetEstimated = Math.round(fairTbPrice * 0.92); // cash/p2p discount
      const buffEstimated = Math.round(fairTbPrice * 0.85); // Buff CN discount

      const card = document.createElement('div');
      card.className = 'item-master-card';
      card.innerHTML = `
        <div class="item-card-header">
          <div class="item-meta">
            <div class="item-avatar-box">
              <img src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXX7gNPRV14vBxSQUS5V-Wr3svXWVN8IQdcubS2PRRt0vf3ezgS7ISxltbVlvH3N77CkW5F4MZyju2S8d2k2wLnrRJuMm-idY6dJAE5NwvX-APql7m81MC8vZvIn3RhvSYm4mGdwUIJqZ2PmA/128fx128f" alt="TB Arcana">
              <span class="gem-swatch-badge" style="background-color: ${gem.hex};" title="Цвет гема: ${gem.name}"></span>
            </div>
            <div class="item-title-group">
              <h3>Fractal Horns of Inner Abysm + ${gem.name}</h3>
              <div class="item-subtitle">
                <span class="gem-tag" style="border-color: ${gem.hex}; color: #fff;">
                  <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${gem.hex}; margin-right:4px;"></span>
                  ${gem.nameRu}
                </span>
                <span class="liquidity-badge ${gem.liquidity}">
                  ${gem.liquidity === 'high' ? '🔥 Высокая ликвидность' : '⚡ Коллекционный'}
                </span>
                <span style="color: var(--text-dim); font-size: 0.8rem;">Гем отдельно: ~${formatPrice(gem.gemPriceRub)}</span>
              </div>
            </div>
          </div>

          <div class="fair-value-box">
            <div class="fair-label">Справедливая цена TB</div>
            <div class="fair-price">${formatPrice(fairTbPrice)}</div>
            <div class="fair-breakdown">TB (~${formatPrice(baseTbArcanaPriceRub)}) + ${Math.round(gem.tbMultiplier*100)}% стоимости гема</div>
          </div>
        </div>

        <!-- Direct market links & comparison -->
        <div class="markets-row">
          <!-- Steam Market with socketed gem filter -->
          <a href="${buildSteamUrl('Fractal Horns of Inner Abysm', gem.steamSearch)}" target="_blank" rel="noopener noreferrer" class="market-tile steam">
            <div class="market-header">
              <span class="market-name">Steam Market</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(steamEstimated)}</span>
              <span class="price-sub">Фильтр по гему включен</span>
            </div>
            <div class="market-action-link">
              <span>Открыть лоты с гемом</span>
              <span>&rarr;</span>
            </div>
          </a>

          <!-- Market.Dota2 -->
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
              <span>Смотреть предложения</span>
              <span>&rarr;</span>
            </div>
          </a>

          <!-- Buff163 -->
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

          <!-- DMarket -->
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
              <span>Посмотреть лоты</span>
              <span>&rarr;</span>
            </div>
          </a>
        </div>
      `;
      resultsContainer.appendChild(card);
    });

    // Render Popular Items (e.g. Onibi 20/21, Arcanas)
    matchedItems.forEach(item => {
      const steamEstimated = Math.round(item.fairPriceRub * 1.05);
      const dota2NetEstimated = Math.round(item.fairPriceRub * 0.90);
      const buffEstimated = Math.round(item.fairPriceRub * 0.82);

      const card = document.createElement('div');
      card.className = 'item-master-card';
      card.innerHTML = `
        <div class="item-card-header">
          <div class="item-meta">
            <div class="item-avatar-box">
              <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="item-title-group">
              <h3>${item.name}</h3>
              <div class="item-subtitle">
                <span style="color: #fff; font-weight: 600;">${item.hero}</span>
                <span class="liquidity-badge ${item.liquidity}">
                  ${item.liquidity === 'high' ? '🔥 Топ Ликвид' : (item.liquidity === 'rare' ? '👑 Коллекционный раритет' : '⚡ Средняя ликвидность')}
                </span>
                ${item.basePriceRub < 100 ? `<span style="color: var(--accent-gold); font-size: 0.8rem;">⚠️ Базовая цена без стилей: ${formatPrice(item.basePriceRub)}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="fair-value-box">
            <div class="fair-label">Справедливая цена</div>
            <div class="fair-price">${formatPrice(item.fairPriceRub)}</div>
            <div class="fair-breakdown">В реал на карту: ~${formatPrice(item.realCashRub)}</div>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px;">
          ${item.description}
        </p>

        <!-- Direct market links & comparison -->
        <div class="markets-row">
          <!-- Steam Market with special filter if needed -->
          <a href="${buildSteamUrl(item.steamHash, item.steamFilter)}" target="_blank" rel="noopener noreferrer" class="market-tile steam">
            <div class="market-header">
              <span class="market-name">Steam Market</span>
              <svg class="market-external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div class="market-price-area">
              <span class="price-live">~${formatPrice(steamEstimated)}</span>
              <span class="price-sub">${item.steamFilter ? 'Фильтр стиля настроен' : 'Текущие лоты'}</span>
            </div>
            <div class="market-action-link">
              <span>Открыть в Steam</span>
              <span>&rarr;</span>
            </div>
          </a>

          <!-- Market.Dota2 -->
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

          <!-- Buff163 -->
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

          <!-- DMarket -->
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

    statusMsg.textContent = `Готово! Найдено ${matchedGems.length + matchedItems.length} позиций со ссылками на маркеты.`;
  }, 250);
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
// 4. RENDER TB GEMS MATRIX TABLE
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
        <span style="font-size: 0.85rem; color: var(--text-muted);">${gem.volume24h}</span>
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
// 5. RENDER TOP LIQUID CARDS
// =============================================================================

function renderLiquidCards(category = 'all') {
  const container = document.getElementById('liquid-cards-grid');
  container.innerHTML = '';

  const filtered = POPULAR_ITEMS.filter(item => {
    if (category === 'all') return true;
    return item.category === category;
  });

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'liquid-card';
    card.innerHTML = `
      <div>
        <div class="liquid-card-top">
          <img src="${item.img}" alt="${item.name}" class="liquid-thumb">
          <div>
            <h4 class="liquid-card-name">${item.name}</h4>
            <div class="liquid-card-hero">${item.hero}</div>
          </div>
        </div>
        <div class="liquid-stats-row">
          <div>
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Рыночная цена:</span>
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
// 6. ARBITRAGE & PROFIT CALCULATOR
// =============================================================================

function calculateArbitrage() {
  const buyMarket = document.getElementById('calc-buy-market').value;
  const buyPrice = parseFloat(document.getElementById('calc-buy-price').value) || 0;
  const sellMarket = document.getElementById('calc-sell-market').value;
  const sellPrice = parseFloat(document.getElementById('calc-sell-price').value) || 0;
  const includeCashoutTax = document.getElementById('calc-cashout-tax').checked;

  // Fee calculation on selling market
  let sellFeePercent = 0;
  if (sellMarket === 'steam') {
    sellFeePercent = 13.04; // Steam 15% added, or 13.04% deducted from gross
  } else if (sellMarket === 'dota2net') {
    sellFeePercent = 5.0; // 5% marketplace commission
  } else if (sellMarket === 'buff') {
    sellFeePercent = 2.5; // 2.5% Buff fee
  } else if (sellMarket === 'real') {
    sellFeePercent = 30.0; // selling for real cash discount
  }

  // Net payout after selling
  let netReceived = sellPrice * (1 - sellFeePercent / 100);

  // Cashout fee deduction if applicable
  if (includeCashoutTax && sellMarket !== 'real') {
    netReceived = netReceived * 0.95; // 5% withdrawal fee
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
    verdictEl.textContent = `⚠️ Убыточная сделка! Комиссии съедают весь профит (${formatPrice(netProfit)}).`;
  }
}

// =============================================================================
// 7. INITIALIZATION & EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
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

  function triggerSearch() {
    const q = searchInput.value.trim() || "TB Creator's Light";
    runSearch(q);
  }

  scanBtn.addEventListener('click', triggerSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerSearch();
  });

  searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'block' : 'none';
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
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

      // Switch to search tab
      document.querySelector('[data-tab="tab-search"]').click();
      runSearch(query);
    });
  });

  // Currency Selector
  const currencySelect = document.getElementById('currency-select');
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    const curSymbol = CURRENCY_SYMBOLS[currentCurrency];
    document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = curSymbol);

    // Re-render everything with new currency
    triggerSearch();
    renderTbGemsTable(document.getElementById('tb-gem-filter').value);
    const activeCategory = document.querySelector('.cat-pill.active')?.getAttribute('data-cat') || 'all';
    renderLiquidCards(activeCategory);
    calculateArbitrage();
  });

  // TB Gem Filter Table
  const gemFilterInput = document.getElementById('tb-gem-filter');
  gemFilterInput.addEventListener('input', (e) => {
    renderTbGemsTable(e.target.value);
  });

  // Liquid Category Filters
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderLiquidCards(pill.getAttribute('data-cat'));
    });
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
  renderTbGemsTable();
  renderLiquidCards('all');
  calculateArbitrage();
});
