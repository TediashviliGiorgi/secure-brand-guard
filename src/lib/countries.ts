// Comprehensive country list with phone codes and regions
export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
  regions?: string[];
}

export const COUNTRIES: Country[] = [
  {
    code: 'GE',
    name: 'Georgia',
    phoneCode: '+995',
    flag: '🇬🇪',
    regions: ['Kakheti', 'Kartli', 'Imereti', 'Racha-Lechkhumi', 'Adjara', 'Samegrelo-Zemo Svaneti', 'Guria', 'Mtskheta-Mtianeti', 'Kvemo Kartli', 'Shida Kartli', 'Samtskhe-Javakheti', 'Tbilisi']
  },
  {
    code: 'US',
    name: 'United States',
    phoneCode: '+1',
    flag: '🇺🇸',
    regions: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    phoneCode: '+44',
    flag: '🇬🇧',
    regions: ['England', 'Scotland', 'Wales', 'Northern Ireland']
  },
  {
    code: 'DE',
    name: 'Germany',
    phoneCode: '+49',
    flag: '🇩🇪',
    regions: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia']
  },
  {
    code: 'FR',
    name: 'France',
    phoneCode: '+33',
    flag: '🇫🇷',
    regions: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie', 'Hauts-de-France', 'Grand Est', 'Brittany', 'Normandy', 'Pays de la Loire', 'Centre-Val de Loire', 'Burgundy-Franche-Comté', 'Corsica']
  },
  {
    code: 'IT',
    name: 'Italy',
    phoneCode: '+39',
    flag: '🇮🇹',
    regions: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Apulia', 'Sardinia', 'Sicily', 'Tuscany', 'Trentino-Alto Adige', 'Umbria', 'Aosta Valley', 'Veneto']
  },
  {
    code: 'ES',
    name: 'Spain',
    phoneCode: '+34',
    flag: '🇪🇸',
    regions: ['Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Canary Islands', 'Cantabria', 'Castile and León', 'Castile-La Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 'Navarre', 'Valencia']
  },
  {
    code: 'PT',
    name: 'Portugal',
    phoneCode: '+351',
    flag: '🇵🇹',
    regions: ['Lisbon', 'Porto', 'Algarve', 'Alentejo', 'Centro', 'Norte', 'Madeira', 'Azores']
  },
  {
    code: 'RU',
    name: 'Russia',
    phoneCode: '+7',
    flag: '🇷🇺',
    regions: ['Moscow', 'Saint Petersburg', 'Krasnodar Krai', 'Rostov Oblast', 'Tatarstan', 'Chelyabinsk Oblast', 'Sverdlovsk Oblast', 'Novosibirsk Oblast']
  },
  {
    code: 'UA',
    name: 'Ukraine',
    phoneCode: '+380',
    flag: '🇺🇦',
    regions: ['Kyiv', 'Lviv', 'Odessa', 'Kharkiv', 'Dnipro', 'Zakarpattia']
  },
  {
    code: 'AM',
    name: 'Armenia',
    phoneCode: '+374',
    flag: '🇦🇲',
    regions: ['Yerevan', 'Aragatsotn', 'Ararat', 'Armavir', 'Gegharkunik', 'Kotayk', 'Lori', 'Shirak', 'Syunik', 'Tavush', 'Vayots Dzor']
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    phoneCode: '+994',
    flag: '🇦🇿',
    regions: ['Baku', 'Ganja', 'Sumgait', 'Lankaran', 'Mingachevir', 'Nakhchivan']
  },
  {
    code: 'TR',
    name: 'Turkey',
    phoneCode: '+90',
    flag: '🇹🇷',
    regions: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep']
  },
  {
    code: 'GR',
    name: 'Greece',
    phoneCode: '+30',
    flag: '🇬🇷',
    regions: ['Attica', 'Central Macedonia', 'Thessaly', 'Crete', 'Peloponnese', 'Western Greece', 'Central Greece', 'Epirus', 'Eastern Macedonia and Thrace', 'North Aegean', 'South Aegean', 'Ionian Islands', 'Western Macedonia']
  },
  {
    code: 'AT',
    name: 'Austria',
    phoneCode: '+43',
    flag: '🇦🇹',
    regions: ['Vienna', 'Lower Austria', 'Upper Austria', 'Styria', 'Tyrol', 'Carinthia', 'Salzburg', 'Vorarlberg', 'Burgenland']
  },
  {
    code: 'CH',
    name: 'Switzerland',
    phoneCode: '+41',
    flag: '🇨🇭',
    regions: ['Zürich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne', 'Ticino', 'Vaud', 'Valais']
  },
  {
    code: 'NL',
    name: 'Netherlands',
    phoneCode: '+31',
    flag: '🇳🇱',
    regions: ['North Holland', 'South Holland', 'Utrecht', 'North Brabant', 'Gelderland', 'Overijssel', 'Limburg', 'Friesland', 'Groningen', 'Drenthe', 'Zeeland', 'Flevoland']
  },
  {
    code: 'BE',
    name: 'Belgium',
    phoneCode: '+32',
    flag: '🇧🇪',
    regions: ['Brussels', 'Flanders', 'Wallonia']
  },
  {
    code: 'PL',
    name: 'Poland',
    phoneCode: '+48',
    flag: '🇵🇱',
    regions: ['Masovia', 'Lesser Poland', 'Silesia', 'Greater Poland', 'Lower Silesia', 'Pomerania', 'Łódź', 'West Pomerania']
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    phoneCode: '+420',
    flag: '🇨🇿',
    regions: ['Prague', 'Central Bohemia', 'South Bohemia', 'Moravia-Silesia', 'South Moravia']
  },
  {
    code: 'HU',
    name: 'Hungary',
    phoneCode: '+36',
    flag: '🇭🇺',
    regions: ['Budapest', 'Pest', 'Borsod-Abaúj-Zemplén', 'Hajdú-Bihar', 'Bács-Kiskun', 'Szabolcs-Szatmár-Bereg']
  },
  {
    code: 'RO',
    name: 'Romania',
    phoneCode: '+40',
    flag: '🇷🇴',
    regions: ['Bucharest', 'Cluj', 'Timișoara', 'Iași', 'Constanța', 'Brașov', 'Sibiu']
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    phoneCode: '+359',
    flag: '🇧🇬',
    regions: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora']
  },
  {
    code: 'RS',
    name: 'Serbia',
    phoneCode: '+381',
    flag: '🇷🇸',
    regions: ['Belgrade', 'Vojvodina', 'Šumadija', 'Southern and Eastern Serbia']
  },
  {
    code: 'HR',
    name: 'Croatia',
    phoneCode: '+385',
    flag: '🇭🇷',
    regions: ['Zagreb', 'Split-Dalmatia', 'Istria', 'Primorje-Gorski Kotar', 'Dubrovnik-Neretva']
  },
  {
    code: 'SI',
    name: 'Slovenia',
    phoneCode: '+386',
    flag: '🇸🇮',
    regions: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper']
  },
  {
    code: 'SK',
    name: 'Slovakia',
    phoneCode: '+421',
    flag: '🇸🇰',
    regions: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica']
  },
  {
    code: 'MD',
    name: 'Moldova',
    phoneCode: '+373',
    flag: '🇲🇩',
    regions: ['Chișinău', 'Bălți', 'Cahul', 'Ungheni', 'Soroca']
  },
  {
    code: 'BY',
    name: 'Belarus',
    phoneCode: '+375',
    flag: '🇧🇾',
    regions: ['Minsk', 'Brest', 'Gomel', 'Grodno', 'Mogilev', 'Vitebsk']
  },
  {
    code: 'AU',
    name: 'Australia',
    phoneCode: '+61',
    flag: '🇦🇺',
    regions: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory']
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    phoneCode: '+64',
    flag: '🇳🇿',
    regions: ['Auckland', 'Wellington', 'Canterbury', 'Waikato', 'Bay of Plenty', 'Otago']
  },
  {
    code: 'CA',
    name: 'Canada',
    phoneCode: '+1',
    flag: '🇨🇦',
    regions: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island']
  },
  {
    code: 'MX',
    name: 'Mexico',
    phoneCode: '+52',
    flag: '🇲🇽',
    regions: ['Mexico City', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato', 'Chihuahua', 'Baja California']
  },
  {
    code: 'AR',
    name: 'Argentina',
    phoneCode: '+54',
    flag: '🇦🇷',
    regions: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Salta']
  },
  {
    code: 'CL',
    name: 'Chile',
    phoneCode: '+56',
    flag: '🇨🇱',
    regions: ['Santiago Metropolitan', 'Valparaíso', 'Biobío', 'Maule', 'La Araucanía', 'O\'Higgins']
  },
  {
    code: 'BR',
    name: 'Brazil',
    phoneCode: '+55',
    flag: '🇧🇷',
    regions: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Rio Grande do Sul', 'Paraná', 'Pernambuco']
  },
  {
    code: 'ZA',
    name: 'South Africa',
    phoneCode: '+27',
    flag: '🇿🇦',
    regions: ['Gauteng', 'KwaZulu-Natal', 'Western Cape', 'Eastern Cape', 'Free State', 'Mpumalanga', 'Limpopo', 'North West', 'Northern Cape']
  },
  {
    code: 'JP',
    name: 'Japan',
    phoneCode: '+81',
    flag: '🇯🇵',
    regions: ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba', 'Hyogo', 'Hokkaido', 'Fukuoka']
  },
  {
    code: 'CN',
    name: 'China',
    phoneCode: '+86',
    flag: '🇨🇳',
    regions: ['Beijing', 'Shanghai', 'Guangdong', 'Zhejiang', 'Jiangsu', 'Shandong', 'Sichuan', 'Hubei', 'Henan']
  },
  {
    code: 'KR',
    name: 'South Korea',
    phoneCode: '+82',
    flag: '🇰🇷',
    regions: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Gyeonggi']
  },
  {
    code: 'IN',
    name: 'India',
    phoneCode: '+91',
    flag: '🇮🇳',
    regions: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Telangana', 'Rajasthan', 'Kerala']
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    phoneCode: '+971',
    flag: '🇦🇪',
    regions: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    phoneCode: '+966',
    flag: '🇸🇦',
    regions: ['Riyadh', 'Makkah', 'Madinah', 'Eastern Province', 'Asir', 'Jizan']
  },
  {
    code: 'IL',
    name: 'Israel',
    phoneCode: '+972',
    flag: '🇮🇱',
    regions: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Northern', 'Central', 'Southern']
  },
  {
    code: 'SG',
    name: 'Singapore',
    phoneCode: '+65',
    flag: '🇸🇬',
    regions: ['Central', 'North', 'North-East', 'East', 'West']
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    phoneCode: '+852',
    flag: '🇭🇰',
    regions: ['Hong Kong Island', 'Kowloon', 'New Territories']
  }
];

// Get country by code
export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(c => c.code === code);
};

// Get regions for a country
export const getRegionsByCountryCode = (code: string): string[] => {
  const country = getCountryByCode(code);
  return country?.regions || [];
};

// Format phone number with country code
export const formatPhoneWithCode = (phoneCode: string, phone: string): string => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return `${phoneCode} ${cleanPhone}`;
};
