export type PositionType = 
  | 'MCA' 
  | 'MP' 
  | 'Woman Rep' 
  | 'Senator' 
  | 'Governor' 
  | 'President' 
  | 'Deputy President'
  | 'Opposition Leader';

export type PartyAffiliation = 
  | 'UDA' 
  | 'ODM' 
  | 'Wiper' 
  | 'Jubilee'
  | 'ANC'
  | 'Ford Kenya'
  | 'Independent' 
  | 'Other';

export const PARTY_METADATA: Record<string, { color: string, photo: string }> = {
    'UDA': { color: 'bg-yellow-400', photo: '/images/candidates/william_ruto.png' },
    'ODM': { color: 'bg-orange-500', photo: '/images/candidates/raila_odinga.png' },
    'Wiper': { color: 'bg-blue-400', photo: '/images/candidates/kalonzo.jpg' },
    'ROOTS': { color: 'bg-green-600', photo: '/images/candidates/george_wajackoyah.png' },
    'AGANO': { color: 'bg-gray-500', photo: '/images/candidates/david_mwaure.png' },
    'Jubilee': { color: 'bg-red-600', photo: '/placeholder-avatar.jpg' },
    'ANC': { color: 'bg-green-400', photo: '/placeholder-avatar.jpg' },
    'Ford Kenya': { color: 'bg-green-700', photo: '/placeholder-avatar.jpg' },
    'Independent': { color: 'bg-sky-500', photo: '/placeholder-avatar.jpg' },
    'Other': { color: 'bg-gray-400', photo: '/placeholder-avatar.jpg' },
};

export interface County {
  id: string;
  name: string;
  code: string;
  constituencies: Constituency[];
  capital: string;
}

export interface Constituency {
  id: string;
  name: string;
  countyId: string;
  wards: string[];
}

export interface PoliticianProfile {
  id: string;
  name: string;
  position: PositionType;
  county?: string; // For county-level and below
  constituency?: string; // For constituency-level (MP)
  ward?: string; // For MCA
  party: PartyAffiliation;
  isIncumbent: boolean;
  photo?: string;
  bio: string;
  education: string[];
  
  // Campaign info
  slogan: string;
  manifesto: string;
  keyAgenda: string[];
  whyRunning: string;
  
  // Contact
  phone?: string;
  email?: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  
  // Track record (if incumbent)
  trackRecord?: {
    billsSponsored: number;
    projectsCompleted: number;
    attendanceRate: number;
    committeeMemberships: string[];
  };
  
  // Meta
  dateJoined: string;
  verified: boolean;
  followers?: number;
  familyBackground?: string;
}

// All 47 Counties (basic structure - constituencies can be expanded as needed)
export const KENYA_COUNTIES: County[] = [
  { id: 'mombasa', name: 'Mombasa', code: '001', capital: 'Mombasa City', constituencies: [{ id: 'changamwe', name: 'Changamwe', countyId: 'mombasa', wards: [] }, { id: 'jomvu', name: 'Jomvu', countyId: 'mombasa', wards: [] }, { id: 'kisauni', name: 'Kisauni', countyId: 'mombasa', wards: [] }, { id: 'nyali', name: 'Nyali', countyId: 'mombasa', wards: [] }, { id: 'likoni', name: 'Likoni', countyId: 'mombasa', wards: [] }, { id: 'mvita', name: 'Mvita', countyId: 'mombasa', wards: [] }] },
  { id: 'kwale', name: 'Kwale', code: '002', capital: 'Kwale', constituencies: [{ id: 'msambweni', name: 'Msambweni', countyId: 'kwale', wards: [] }, { id: 'lunga-lunga', name: 'Lunga Lunga', countyId: 'kwale', wards: [] }, { id: 'matuga', name: 'Matuga', countyId: 'kwale', wards: [] }, { id: 'kinango', name: 'Kinango', countyId: 'kwale', wards: [] }] },
  { id: 'kilifi', name: 'Kilifi', code: '003', capital: 'Kilifi', constituencies: [{ id: 'kilifi-north', name: 'Kilifi North', countyId: 'kilifi', wards: [] }, { id: 'kilifi-south', name: 'Kilifi South', countyId: 'kilifi', wards: [] }, { id: 'kaloleni', name: 'Kaloleni', countyId: 'kilifi', wards: [] }, { id: 'rabai', name: 'Rabai', countyId: 'kilifi', wards: [] }, { id: 'ganze', name: 'Ganze', countyId: 'kilifi', wards: [] }, { id: 'malindi', name: 'Malindi', countyId: 'kilifi', wards: [] }, { id: 'magarini', name: 'Magarini', countyId: 'kilifi', wards: [] }] },
  { id: 'tana-river', name: 'Tana River', code: '004', capital: 'Hola', constituencies: [{ id: 'garsen', name: 'Garsen', countyId: 'tana-river', wards: [] }, { id: 'galole', name: 'Galole', countyId: 'tana-river', wards: [] }, { id: 'bura', name: 'Bura', countyId: 'tana-river', wards: [] }] },
  { id: 'lamu', name: 'Lamu', code: '005', capital: 'Lamu', constituencies: [{ id: 'lamu-east', name: 'Lamu East', countyId: 'lamu', wards: [] }, { id: 'lamu-west', name: 'Lamu West', countyId: 'lamu', wards: [] }] },
  { id: 'taita-taveta', name: 'Taita Taveta', code: '006', capital: 'Voi', constituencies: [{ id: 'taveta', name: 'Taveta', countyId: 'taita-taveta', wards: [] }, { id: 'wundanyi', name: 'Wundanyi', countyId: 'taita-taveta', wards: [] }, { id: 'mwatate', name: 'Mwatate', countyId: 'taita-taveta', wards: [] }, { id: 'voi', name: 'Voi', countyId: 'taita-taveta', wards: [] }] },
  { id: 'garissa', name: 'Garissa', code: '007', capital: 'Garissa', constituencies: [{ id: 'garissa-township', name: 'Garissa Township', countyId: 'garissa', wards: [] }, { id: 'balambala', name: 'Balambala', countyId: 'garissa', wards: [] }, { id: 'lagdera', name: 'Lagdera', countyId: 'garissa', wards: [] }, { id: 'dadaab', name: 'Dadaab', countyId: 'garissa', wards: [] }, { id: 'fafi', name: 'Fafi', countyId: 'garissa', wards: [] }, { id: 'ijara', name: 'Ijara', countyId: 'garissa', wards: [] }] },
  { id: 'wajir', name: 'Wajir', code: '008', capital: 'Wajir', constituencies: [{ id: 'wajir-north', name: 'Wajir North', countyId: 'wajir', wards: [] }, { id: 'wajir-east', name: 'Wajir East', countyId: 'wajir', wards: [] }, { id: 'tarbaj', name: 'Tarbaj', countyId: 'wajir', wards: [] }, { id: 'wajir-west', name: 'Wajir West', countyId: 'wajir', wards: [] }, { id: 'eldas', name: 'Eldas', countyId: 'wajir', wards: [] }, { id: 'wajir-south', name: 'Wajir South', countyId: 'wajir', wards: [] }] },
  { id: 'mandera', name: 'Mandera', code: '009', capital: 'Mandera', constituencies: [{ id: 'mandera-west', name: 'Mandera West', countyId: 'mandera', wards: [] }, { id: 'banissa', name: 'Banissa', countyId: 'mandera', wards: [] }, { id: 'mandera-north', name: 'Mandera North', countyId: 'mandera', wards: [] }, { id: 'mandera-south', name: 'Mandera South', countyId: 'mandera', wards: [] }, { id: 'mandera-east', name: 'Mandera East', countyId: 'mandera', wards: [] }, { id: 'lafey', name: 'Lafey', countyId: 'mandera', wards: [] }] },
  { id: 'marsabit', name: 'Marsabit', code: '010', capital: 'Marsabit', constituencies: [{ id: 'moyale', name: 'Moyale', countyId: 'marsabit', wards: [] }, { id: 'north-horr', name: 'North Horr', countyId: 'marsabit', wards: [] }, { id: 'saku', name: 'Saku', countyId: 'marsabit', wards: [] }, { id: 'laisamis', name: 'Laisamis', countyId: 'marsabit', wards: [] }] },
  { id: 'isiolo', name: 'Isiolo', code: '011', capital: 'Isiolo', constituencies: [{ id: 'isiolo-north', name: 'Isiolo North', countyId: 'isiolo', wards: [] }, { id: 'isiolo-south', name: 'Isiolo South', countyId: 'isiolo', wards: [] }] },
  { id: 'meru', name: 'Meru', code: '012', capital: 'Meru', constituencies: [{ id: 'igembe-south', name: 'Igembe South', countyId: 'meru', wards: [] }, { id: 'igembe-central', name: 'Igembe Central', countyId: 'meru', wards: [] }, { id: 'igembe-north', name: 'Igembe North', countyId: 'meru', wards: [] }, { id: 'tigania-west', name: 'Tigania West', countyId: 'meru', wards: [] }, { id: 'tigania-east', name: 'Tigania East', countyId: 'meru', wards: [] }, { id: 'north-imenti', name: 'North Imenti', countyId: 'meru', wards: [] }, { id: 'buuri', name: 'Buuri', countyId: 'meru', wards: [] }, { id: 'central-imenti', name: 'Central Imenti', countyId: 'meru', wards: [] }, { id: 'south-imenti', name: 'South Imenti', countyId: 'meru', wards: [] }] },
  { id: 'tharaka-nithi', name: 'Tharaka Nithi', code: '013', capital: 'Chuka', constituencies: [{ id: 'tharaka', name: 'Tharaka', countyId: 'tharaka-nithi', wards: [] }, { id: 'chuka-igambang-ombe', name: 'Chuka Igambang ombe', countyId: 'tharaka-nithi', wards: [] }, { id: 'maara', name: 'Maara', countyId: 'tharaka-nithi', wards: [] }] },
  { id: 'embu', name: 'Embu', code: '014', capital: 'Embu', constituencies: [{ id: 'manyatta', name: 'Manyatta', countyId: 'embu', wards: [] }, { id: 'runyenjes', name: 'Runyenjes', countyId: 'embu', wards: [] }, { id: 'mbeere-south', name: 'Mbeere South', countyId: 'embu', wards: [] }, { id: 'mbeere-north', name: 'Mbeere North', countyId: 'embu', wards: [] }] },
  { id: 'kitui', name: 'Kitui', code: '015', capital: 'Kitui', constituencies: [{ id: 'mwingi-north', name: 'Mwingi North', countyId: 'kitui', wards: [] }, { id: 'mwingi-west', name: 'Mwingi West', countyId: 'kitui', wards: [] }, { id: 'mwingi-central', name: 'Mwingi Central', countyId: 'kitui', wards: [] }, { id: 'kitui-west', name: 'Kitui West', countyId: 'kitui', wards: [] }, { id: 'kitui-rural', name: 'Kitui Rural', countyId: 'kitui', wards: [] }, { id: 'kitui-central', name: 'Kitui Central', countyId: 'kitui', wards: [] }, { id: 'kitui-east', name: 'Kitui East', countyId: 'kitui', wards: [] }, { id: 'kitui-south', name: 'Kitui South', countyId: 'kitui', wards: [] }] },
  { id: 'machakos', name: 'Machakos', code: '016', capital: 'Machakos', constituencies: [{ id: 'masinga', name: 'Masinga', countyId: 'machakos', wards: [] }, { id: 'yatta', name: 'Yatta', countyId: 'machakos', wards: [] }, { id: 'kangundo', name: 'Kangundo', countyId: 'machakos', wards: [] }, { id: 'matungulu', name: 'Matungulu', countyId: 'machakos', wards: [] }, { id: 'kathiani', name: 'Kathiani', countyId: 'machakos', wards: [] }, { id: 'mavoko', name: 'Mavoko', countyId: 'machakos', wards: [] }, { id: 'machakos-town', name: 'Machakos Town', countyId: 'machakos', wards: [] }, { id: 'mwala', name: 'Mwala', countyId: 'machakos', wards: [] }] },
  { id: 'makueni', name: 'Makueni', code: '017', capital: 'Wote', constituencies: [{ id: 'makueni', name: 'Makueni', countyId: 'makueni', wards: [] }, { id: 'kilome', name: 'Kilome', countyId: 'makueni', wards: [] }, { id: 'kaiti', name: 'Kaiti', countyId: 'makueni', wards: [] }, { id: 'kibwezi-west', name: 'Kibwezi West', countyId: 'makueni', wards: [] }, { id: 'kibwezi-east', name: 'Kibwezi East', countyId: 'makueni', wards: [] }, { id: 'mbooni', name: 'Mbooni', countyId: 'makueni', wards: [] }] },
  { id: 'nyandarua', name: 'Nyandarua', code: '018', capital: 'Ol Kalou', constituencies: [{ id: 'kinangop', name: 'Kinangop', countyId: 'nyandarua', wards: [] }, { id: 'kipipiri', name: 'Kipipiri', countyId: 'nyandarua', wards: [] }, { id: 'ol-kalou', name: 'Ol Kalou', countyId: 'nyandarua', wards: [] }, { id: 'ol-jorok', name: 'Ol Jorok', countyId: 'nyandarua', wards: [] }, { id: 'ndaragwa', name: 'Ndaragwa', countyId: 'nyandarua', wards: [] }] },
  { id: 'nyeri', name: 'Nyeri', code: '019', capital: 'Nyeri', constituencies: [{ id: 'tetu', name: 'Tetu', countyId: 'nyeri', wards: [] }, { id: 'kieni', name: 'Kieni', countyId: 'nyeri', wards: [] }, { id: 'mathira', name: 'Mathira', countyId: 'nyeri', wards: [] }, { id: 'othaya', name: 'Othaya', countyId: 'nyeri', wards: [] }, { id: 'mukurweini', name: 'Mukurweini', countyId: 'nyeri', wards: [] }, { id: 'nyeri-town', name: 'Nyeri Town', countyId: 'nyeri', wards: [] }] },
  { id: 'kirinyaga', name: 'Kirinyaga', code: '020', capital: 'Kerugoya', constituencies: [{ id: 'mwea', name: 'Mwea', countyId: 'kirinyaga', wards: [] }, { id: 'gichugu', name: 'Gichugu', countyId: 'kirinyaga', wards: [] }, { id: 'ndia', name: 'Ndia', countyId: 'kirinyaga', wards: [] }, { id: 'kirinyaga-central', name: 'Kirinyaga Central', countyId: 'kirinyaga', wards: [] }] },
  { id: 'muranga', name: "Murang'a", code: '021', capital: "Murang'a", constituencies: [{ id: 'kangema', name: 'Kangema', countyId: 'muranga', wards: [] }, { id: 'mathioya', name: 'Mathioya', countyId: 'muranga', wards: [] }, { id: 'kiharu', name: 'Kiharu', countyId: 'muranga', wards: [] }, { id: 'kigumo', name: 'Kigumo', countyId: 'muranga', wards: [] }, { id: 'maragwa', name: 'Maragwa', countyId: 'muranga', wards: [] }, { id: 'kandara', name: 'Kandara', countyId: 'muranga', wards: [] }, { id: 'gatanga', name: 'Gatanga', countyId: 'muranga', wards: [] }] },
  {
    id: 'kiambu',
    name: 'Kiambu',
    code: '022',
    capital: 'Kiambu Town',
    constituencies: [
      { id: 'gatundu-south', name: 'Gatundu South', countyId: 'kiambu', wards: [] },
      { id: 'gatundu-north', name: 'Gatundu North', countyId: 'kiambu', wards: [] },
      { id: 'juja', name: 'Juja', countyId: 'kiambu', wards: [] },
      { id: 'thika-town', name: 'Thika Town', countyId: 'kiambu', wards: [] },
      { id: 'ruiru', name: 'Ruiru', countyId: 'kiambu', wards: [] },
      { id: 'githunguri', name: 'Githunguri', countyId: 'kiambu', wards: [] },
      { id: 'kiambaa', name: 'Kiambaa', countyId: 'kiambu', wards: [] },
      { id: 'kiambu', name: 'Kiambu', countyId: 'kiambu', wards: [] },
      { id: 'kabete', name: 'Kabete', countyId: 'kiambu', wards: [] },
      { id: 'kikuyu', name: 'Kikuyu', countyId: 'kiambu', wards: [] },
      { id: 'limuru', name: 'Limuru', countyId: 'kiambu', wards: [] },
      { id: 'lari', name: 'Lari', countyId: 'kiambu', wards: [] },
    ],
  },
  { id: 'turkana', name: 'Turkana', code: '023', capital: 'Lodwar', constituencies: [{ id: 'turkana-north', name: 'Turkana North', countyId: 'turkana', wards: [] }, { id: 'turkana-west', name: 'Turkana West', countyId: 'turkana', wards: [] }, { id: 'turkana-central', name: 'Turkana Central', countyId: 'turkana', wards: [] }, { id: 'loima', name: 'Loima', countyId: 'turkana', wards: [] }, { id: 'turkana-south', name: 'Turkana South', countyId: 'turkana', wards: [] }, { id: 'turkana-east', name: 'Turkana East', countyId: 'turkana', wards: [] }] },
  { id: 'west-pokot', name: 'West Pokot', code: '024', capital: 'Kapenguria', constituencies: [{ id: 'kapenguria', name: 'Kapenguria', countyId: 'west-pokot', wards: [] }, { id: 'sigor', name: 'Sigor', countyId: 'west-pokot', wards: [] }, { id: 'kacheliba', name: 'Kacheliba', countyId: 'west-pokot', wards: [] }, { id: 'pokot-south', name: 'Pokot South', countyId: 'west-pokot', wards: [] }] },
  { id: 'samburu', name: 'Samburu', code: '025', capital: 'Maralal', constituencies: [{ id: 'samburu-west', name: 'Samburu West', countyId: 'samburu', wards: [] }, { id: 'samburu-north', name: 'Samburu North', countyId: 'samburu', wards: [] }, { id: 'samburu-east', name: 'Samburu East', countyId: 'samburu', wards: [] }] },
  { id: 'trans-nzoia', name: 'Trans Nzoia', code: '026', capital: 'Kitale', constituencies: [{ id: 'kwanza', name: 'Kwanza', countyId: 'trans-nzoia', wards: [] }, { id: 'endebess', name: 'Endebess', countyId: 'trans-nzoia', wards: [] }, { id: 'saboti', name: 'Saboti', countyId: 'trans-nzoia', wards: [] }, { id: 'kiminini', name: 'Kiminini', countyId: 'trans-nzoia', wards: [] }, { id: 'cherangany', name: 'Cherangany', countyId: 'trans-nzoia', wards: [] }] },
  { id: 'uasin-gishu', name: 'Uasin Gishu', code: '027', capital: 'Eldoret', constituencies: [{ id: 'soy', name: 'Soy', countyId: 'uasin-gishu', wards: [] }, { id: 'turbo', name: 'Turbo', countyId: 'uasin-gishu', wards: [] }, { id: 'moiben', name: 'Moiben', countyId: 'uasin-gishu', wards: [] }, { id: 'ainabkoi', name: 'Ainabkoi', countyId: 'uasin-gishu', wards: [] }, { id: 'kapseret', name: 'Kapseret', countyId: 'uasin-gishu', wards: [] }, { id: 'kesses', name: 'Kesses', countyId: 'uasin-gishu', wards: [] }] },
  { id: 'elgeyo-marakwet', name: 'Elgeyo Marakwet', code: '028', capital: 'Iten', constituencies: [{ id: 'marakwet-east', name: 'Marakwet East', countyId: 'elgeyo-marakwet', wards: [] }, { id: 'marakwet-west', name: 'Marakwet West', countyId: 'elgeyo-marakwet', wards: [] }, { id: 'keiyo-north', name: 'Keiyo North', countyId: 'elgeyo-marakwet', wards: [] }, { id: 'keiyo-south', name: 'Keiyo South', countyId: 'elgeyo-marakwet', wards: [] }] },
  { id: 'nandi', name: 'Nandi', code: '029', capital: 'Kapsabet', constituencies: [{ id: 'tinderet', name: 'Tinderet', countyId: 'nandi', wards: [] }, { id: 'aldai', name: 'Aldai', countyId: 'nandi', wards: [] }, { id: 'nandi-hills', name: 'Nandi Hills', countyId: 'nandi', wards: [] }, { id: 'chesumei', name: 'Chesumei', countyId: 'nandi', wards: [] }, { id: 'emgwen', name: 'Emgwen', countyId: 'nandi', wards: [] }, { id: 'mosop', name: 'Mosop', countyId: 'nandi', wards: [] }] },
  { id: 'baringo', name: 'Baringo', code: '030', capital: 'Kabarnet', constituencies: [{ id: 'baringo-north', name: 'Baringo North', countyId: 'baringo', wards: [] }, { id: 'baringo-central', name: 'Baringo Central', countyId: 'baringo', wards: [] }, { id: 'baringo-south', name: 'Baringo South', countyId: 'baringo', wards: [] }, { id: 'mogotio', name: 'Mogotio', countyId: 'baringo', wards: [] }, { id: 'eldama-ravine', name: 'Eldama Ravine', countyId: 'baringo', wards: [] }, { id: 'tiaty', name: 'Tiaty', countyId: 'baringo', wards: [] }] },
  { id: 'laikipia', name: 'Laikipia', code: '031', capital: 'Rumuruti', constituencies: [{ id: 'laikipia-west', name: 'Laikipia West', countyId: 'laikipia', wards: [] }, { id: 'laikipia-east', name: 'Laikipia East', countyId: 'laikipia', wards: [] }, { id: 'laikipia-north', name: 'Laikipia North', countyId: 'laikipia', wards: [] }] },
  {
    id: 'nakuru',
    name: 'Nakuru',
    code: '032',
    capital: 'Nakuru City',
    constituencies: [
      { id: 'molo', name: 'Molo', countyId: 'nakuru', wards: [] },
      { id: 'njoro', name: 'Njoro', countyId: 'nakuru', wards: [] },
      { id: 'naivasha', name: 'Naivasha', countyId: 'nakuru', wards: [] },
      { id: 'gilgil', name: 'Gilgil', countyId: 'nakuru', wards: [] },
      { id: 'kuresoi-south', name: 'Kuresoi South', countyId: 'nakuru', wards: [] },
      { id: 'kuresoi-north', name: 'Kuresoi North', countyId: 'nakuru', wards: [] },
      { id: 'subukia', name: 'Subukia', countyId: 'nakuru', wards: [] },
      { id: 'rongai', name: 'Rongai', countyId: 'nakuru', wards: [] },
      { id: 'bahati', name: 'Bahati', countyId: 'nakuru', wards: [] },
      { id: 'nakuru-town-west', name: 'Nakuru Town West', countyId: 'nakuru', wards: [] },
      { id: 'nakuru-town-east', name: 'Nakuru Town East', countyId: 'nakuru', wards: [] },
    ],
  },
  { id: 'narok', name: 'Narok', code: '033', capital: 'Narok', constituencies: [{ id: 'kilgoris', name: 'Kilgoris', countyId: 'narok', wards: [] }, { id: 'emurua-dikirr', name: 'Emurua Dikirr', countyId: 'narok', wards: [] }, { id: 'narok-north', name: 'Narok North', countyId: 'narok', wards: [] }, { id: 'narok-east', name: 'Narok East', countyId: 'narok', wards: [] }, { id: 'narok-south', name: 'Narok South', countyId: 'narok', wards: [] }, { id: 'narok-west', name: 'Narok West', countyId: 'narok', wards: [] }] },
  { id: 'kajiado', name: 'Kajiado', code: '034', capital: 'Kajiado', constituencies: [{ id: 'kajiado-north', name: 'Kajiado North', countyId: 'kajiado', wards: [] }, { id: 'kajiado-central', name: 'Kajiado Central', countyId: 'kajiado', wards: [] }, { id: 'kajiado-east', name: 'Kajiado East', countyId: 'kajiado', wards: [] }, { id: 'kajiado-west', name: 'Kajiado West', countyId: 'kajiado', wards: [] }, { id: 'kajiado-south', name: 'Kajiado South', countyId: 'kajiado', wards: [] }] },
  { id: 'kericho', name: 'Kericho', code: '035', capital: 'Kericho', constituencies: [{ id: 'kipkelion-east', name: 'Kipkelion East', countyId: 'kericho', wards: [] }, { id: 'kipkelion-west', name: 'Kipkelion West', countyId: 'kericho', wards: [] }, { id: 'ainemoi', name: 'Ainemoi', countyId: 'kericho', wards: [] }, { id: 'bureti', name: 'Bureti', countyId: 'kericho', wards: [] }, { id: 'belgut', name: 'Belgut', countyId: 'kericho', wards: [] }, { id: 'sigowet-soin', name: 'Sigowet Soin', countyId: 'kericho', wards: [] }] },
  { id: 'bomet', name: 'Bomet', code: '036', capital: 'Bomet', constituencies: [{ id: 'sotik', name: 'Sotik', countyId: 'bomet', wards: [] }, { id: 'chepalungu', name: 'Chepalungu', countyId: 'bomet', wards: [] }, { id: 'bomet-east', name: 'Bomet East', countyId: 'bomet', wards: [] }, { id: 'bomet-central', name: 'Bomet Central', countyId: 'bomet', wards: [] }, { id: 'konoin', name: 'Konoin', countyId: 'bomet', wards: [] }] },
  { id: 'kakamega', name: 'Kakamega', code: '037', capital: 'Kakamega', constituencies: [{ id: 'lugari', name: 'Lugari', countyId: 'kakamega', wards: [] }, { id: 'likuyani', name: 'Likuyani', countyId: 'kakamega', wards: [] }, { id: 'malava', name: 'Malava', countyId: 'kakamega', wards: [] }, { id: 'lurambi', name: 'Lurambi', countyId: 'kakamega', wards: [] }, { id: 'navakholo', name: 'Navakholo', countyId: 'kakamega', wards: [] }, { id: 'mumias-west', name: 'Mumias West', countyId: 'kakamega', wards: [] }, { id: 'mumias-east', name: 'Mumias East', countyId: 'kakamega', wards: [] }, { id: 'matungu', name: 'Matungu', countyId: 'kakamega', wards: [] }, { id: 'butere', name: 'Butere', countyId: 'kakamega', wards: [] }, { id: 'khwisero', name: 'Khwisero', countyId: 'kakamega', wards: [] }, { id: 'shinyalu', name: 'Shinyalu', countyId: 'kakamega', wards: [] }, { id: 'ikolomani', name: 'Ikolomani', countyId: 'kakamega', wards: [] }] },
  { id: 'vihiga', name: 'Vihiga', code: '038', capital: 'Vihiga', constituencies: [{ id: 'vihiga', name: 'Vihiga', countyId: 'vihiga', wards: [] }, { id: 'sabatia', name: 'Sabatia', countyId: 'vihiga', wards: [] }, { id: 'hamisi', name: 'Hamisi', countyId: 'vihiga', wards: [] }, { id: 'luanda', name: 'Luanda', countyId: 'vihiga', wards: [] }, { id: 'emuhaya', name: 'Emuhaya', countyId: 'vihiga', wards: [] }] },
  { id: 'bungoma', name: 'Bungoma', code: '039', capital: 'Bungoma', constituencies: [{ id: 'mt-elgon', name: 'Mt Elgon', countyId: 'bungoma', wards: [] }, { id: 'sirisia', name: 'Sirisia', countyId: 'bungoma', wards: [] }, { id: 'kabuchai', name: 'Kabuchai', countyId: 'bungoma', wards: [] }, { id: 'bumula', name: 'Bumula', countyId: 'bungoma', wards: [] }, { id: 'kanduyi', name: 'Kanduyi', countyId: 'bungoma', wards: [] }, { id: 'webuye-east', name: 'Webuye East', countyId: 'bungoma', wards: [] }, { id: 'webuye-west', name: 'Webuye West', countyId: 'bungoma', wards: [] }, { id: 'kimilili', name: 'Kimilili', countyId: 'bungoma', wards: [] }, { id: 'tongaren', name: 'Tongaren', countyId: 'bungoma', wards: [] }] },
  { id: 'busia', name: 'Busia', code: '040', capital: 'Busia', constituencies: [{ id: 'teso-north', name: 'Teso North', countyId: 'busia', wards: [] }, { id: 'teso-south', name: 'Teso South', countyId: 'busia', wards: [] }, { id: 'nambale', name: 'Nambale', countyId: 'busia', wards: [] }, { id: 'matayos', name: 'Matayos', countyId: 'busia', wards: [] }, { id: 'butula', name: 'Butula', countyId: 'busia', wards: [] }, { id: 'funyula', name: 'Funyula', countyId: 'busia', wards: [] }, { id: 'budalangi', name: 'Budalangi', countyId: 'busia', wards: [] }] },
  { id: 'siaya', name: 'Siaya', code: '041', capital: 'Siaya', constituencies: [{ id: 'ugenya', name: 'Ugenya', countyId: 'siaya', wards: [] }, { id: 'ugunja', name: 'Ugunja', countyId: 'siaya', wards: [] }, { id: 'alego-usonga', name: 'Alego Usonga', countyId: 'siaya', wards: [] }, { id: 'gem', name: 'Gem', countyId: 'siaya', wards: [] }, { id: 'bondo', name: 'Bondo', countyId: 'siaya', wards: [] }, { id: 'rarieda', name: 'Rarieda', countyId: 'siaya', wards: [] }] },
  {
    id: 'kisumu',
    name: 'Kisumu',
    code: '042',
    capital: 'Kisumu City',
    constituencies: [
      { id: 'kisumu-east', name: 'Kisumu East', countyId: 'kisumu', wards: [] },
      { id: 'kisumu-west', name: 'Kisumu West', countyId: 'kisumu', wards: [] },
      { id: 'kisumu-central', name: 'Kisumu Central', countyId: 'kisumu', wards: [] },
      { id: 'seme', name: 'Seme', countyId: 'kisumu', wards: [] },
      { id: 'nyando', name: 'Nyando', countyId: 'kisumu', wards: [] },
      { id: 'muhoroni', name: 'Muhoroni', countyId: 'kisumu', wards: [] },
      { id: 'nyakach', name: 'Nyakach', countyId: 'kisumu', wards: [] },
    ],
  },
  { id: 'homa-bay', name: 'Homa Bay', code: '043', capital: 'Homa Bay', constituencies: [{ id: 'kasipul', name: 'Kasipul', countyId: 'homa-bay', wards: [] }, { id: 'kabondo-kasipul', name: 'Kabondo Kasipul', countyId: 'homa-bay', wards: [] }, { id: 'karachuonyo', name: 'Karachuonyo', countyId: 'homa-bay', wards: [] }, { id: 'rangwe', name: 'Rangwe', countyId: 'homa-bay', wards: [] }, { id: 'homa-bay-town', name: 'Homa Bay Town', countyId: 'homa-bay', wards: [] }, { id: 'ndhiwa', name: 'Ndhiwa', countyId: 'homa-bay', wards: [] }, { id: 'suba-north', name: 'Suba North', countyId: 'homa-bay', wards: [] }, { id: 'suba-south', name: 'Suba South', countyId: 'homa-bay', wards: [] }] },
  { id: 'migori', name: 'Migori', code: '044', capital: 'Migori', constituencies: [{ id: 'rongo', name: 'Rongo', countyId: 'migori', wards: [] }, { id: 'awendo', name: 'Awendo', countyId: 'migori', wards: [] }, { id: 'suna-east', name: 'Suna East', countyId: 'migori', wards: [] }, { id: 'suna-west', name: 'Suna West', countyId: 'migori', wards: [] }, { id: 'uriri', name: 'Uriri', countyId: 'migori', wards: [] }, { id: 'nyatike', name: 'Nyatike', countyId: 'migori', wards: [] }, { id: 'kuria-west', name: 'Kuria West', countyId: 'migori', wards: [] }, { id: 'kuria-east', name: 'Kuria East', countyId: 'migori', wards: [] }] },
  { id: 'kisii', name: 'Kisii', code: '045', capital: 'Kisii', constituencies: [{ id: 'bonchari', name: 'Bonchari', countyId: 'kisii', wards: [] }, { id: 'south-mugirango', name: 'South Mugirango', countyId: 'kisii', wards: [] }, { id: 'bomachoge-borabu', name: 'Bomachoge Borabu', countyId: 'kisii', wards: [] }, { id: 'bobasi', name: 'Bobasi', countyId: 'kisii', wards: [] }, { id: 'bomachoge-chache', name: 'Bomachoge Chache', countyId: 'kisii', wards: [] }, { id: 'nyaribari-masaba', name: 'Nyaribari Masaba', countyId: 'kisii', wards: [] }, { id: 'nyaribari-chache', name: 'Nyaribari Chache', countyId: 'kisii', wards: [] }, { id: 'kitutu-chache-north', name: 'Kitutu Chache North', countyId: 'kisii', wards: [] }, { id: 'kitutu-chache-south', name: 'Kitutu Chache South', countyId: 'kisii', wards: [] }] },
  { id: 'nyamira', name: 'Nyamira', code: '046', capital: 'Nyamira', constituencies: [{ id: 'kitutu-masaba', name: 'Kitutu Masaba', countyId: 'nyamira', wards: [] }, { id: 'west-mugirango', name: 'West Mugirango', countyId: 'nyamira', wards: [] }, { id: 'north-mugirango', name: 'North Mugirango', countyId: 'nyamira', wards: [] }, { id: 'borabu', name: 'Borabu', countyId: 'nyamira', wards: [] }] },
  {
    id: 'nairobi',
    name: 'Nairobi',
    code: '047',
    capital: 'Nairobi City',
    constituencies: [
      { id: 'westlands', name: 'Westlands', countyId: 'nairobi', wards: [] },
      { id: 'dagoretti-north', name: 'Dagoretti North', countyId: 'nairobi', wards: [] },
      { id: 'dagoretti-south', name: 'Dagoretti South', countyId: 'nairobi', wards: [] },
      { id: 'langata', name: 'Langata', countyId: 'nairobi', wards: [] },
      { id: 'kibra', name: 'Kibra', countyId: 'nairobi', wards: [] },
      { id: 'roysambu', name: 'Roysambu', countyId: 'nairobi', wards: [] },
      { id: 'kasarani', name: 'Kasarani', countyId: 'nairobi', wards: [] },
      { id: 'ruaraka', name: 'Ruaraka', countyId: 'nairobi', wards: [] },
      { id: 'embakasi-south', name: 'Embakasi South', countyId: 'nairobi', wards: [] },
      { id: 'embakasi-north', name: 'Embakasi North', countyId: 'nairobi', wards: [] },
      { id: 'embakasi-central', name: 'Embakasi Central', countyId: 'nairobi', wards: [] },
      { id: 'embakasi-east', name: 'Embakasi East', countyId: 'nairobi', wards: [] },
      { id: 'embakasi-west', name: 'Embakasi West', countyId: 'nairobi', wards: [] },
      { id: 'makadara', name: 'Makadara', countyId: 'nairobi', wards: [] },
      { id: 'kamukunji', name: 'Kamukunji', countyId: 'nairobi', wards: [] },
      { id: 'starehe', name: 'Starehe', countyId: 'nairobi', wards: [] },
      { id: 'mathare', name: 'Mathare', countyId: 'nairobi', wards: [] },
    ],
  },
];

// Sample Politicians
export const SAMPLE_POLITICIANS: PoliticianProfile[] = [
  {
    id: 'pol-1',
    name: 'Johnson Sakaja',
    position: 'Governor',
    county: 'nairobi',
    party: 'UDA',
    isIncumbent: true,
    bio: 'Governor of Nairobi County, focused on transforming the city through improved service delivery and youth empowerment.',
    education: ['University of Nairobi - Bachelor of Actuarial Science'],
    slogan: 'Nairobi Haiwezi',
    manifesto: 'A 5-point plan to transform Nairobi into a world-class city focusing on health, education, infrastructure, economic empowerment, and governance.',
    keyAgenda: [
      'Fix healthcare with new facilities and equipment',
      'Improve water supply across all estates',
      'Modernize public transport system',
      'Create 200,000 jobs for youth',
      'Digital transformation of county services',
    ],
    whyRunning: 'To ensure every Nairobian has access to quality services and opportunities for prosperity.',
    phone: '+254 xxx xxx xxx',
    email: 'governor@nairobi.go.ke',
    socialMedia: {
      twitter: '@SakajaJohnson',
      facebook: 'johnson.sakaja',
    },
    trackRecord: {
      billsSponsored: 15,
      projectsCompleted: 45,
      attendanceRate: 87,
      committeeMemberships: ['Finance', 'Health', 'Education'],
    },
    dateJoined: '2022-08-25',
    verified: true,
  },
  {
    id: 'pol-2',
    name: 'Edwin Sifuna',
    position: 'Senator',
    county: 'nairobi',
    party: 'ODM',
    isIncumbent: true,
    bio: 'Senator for Nairobi County and ODM Secretary General. Vocal advocate for good governance and accountability.',
    education: ['University of Nairobi - LLB'],
    slogan: 'Haki Yetu',
    manifesto: 'Fighting for Nairobi residents through oversight, legislation, and championing youth issues.',
    keyAgenda: [
      'Strengthen county oversight',
      'Push for better revenue allocation to Nairobi',
      'Champion youth employment programs',
      'Fight corruption at all levels',
      'Improve access to justice',
    ],
    whyRunning: 'To be the voice of ordinary Nairobians in the Senate and ensure accountability.',
    socialMedia: {
      twitter: '@edwinsifuna',
    },
    trackRecord: {
      billsSponsored: 22,
      projectsCompleted: 0,
      attendanceRate: 92,
      committeeMemberships: ['Justice & Legal Affairs', 'County Public Accounts'],
    },
    dateJoined: '2017-08-31',
    verified: true,
  },
  {
    id: 'pol-3',
    name: 'Gladys Wanga',
    position: 'Governor',
    county: 'homa-bay',
    party: 'ODM',
    isIncumbent: true,
    bio: 'First female Governor of Homa Bay County. Former MP and champion of women empowerment.',
    education: ['University of Nairobi - Economics'],
    slogan: 'Tich Makare',
    manifesto: 'Economic transformation through agriculture, fishing, and empowering women and youth.',
    keyAgenda: [
      'Modernize fishing industry',
      'Improve agricultural productivity',
      'Expand access to clean water',
      'Build more health facilities',
      'Create opportunities for women and youth',
    ],
    whyRunning: 'To transform Homa Bay into an economic powerhouse and improve livelihoods.',
    socialMedia: {
      twitter: '@GladysWanga',
    },
    trackRecord: {
      billsSponsored: 18,
      projectsCompleted: 32,
      attendanceRate: 89,
      committeeMemberships: ['Budget & Appropriations', 'Finance & Planning'],
    },
    dateJoined: '2022-08-25',
    verified: true,
  },
  {
    id: 'pol-4',
    name: 'Tim Wanyonyi',
    position: 'MP',
    constituency: 'westlands',
    county: 'nairobi',
    party: 'ODM',
    isIncumbent: true,
    bio: 'Member of Parliament for Westlands Constituency. Focused on infrastructure development and job creation.',
    education: ['Kenyatta University - Business Administration'],
    slogan: 'Maendeleo Ya Westlands',
    manifesto: 'Building a modern Westlands through infrastructure, security, and economic opportunities.',
    keyAgenda: [
      'Improve road infrastructure',
      'Enhance security in estates',
      'Support SMEs and startups',
      'Expand bursary program',
      'Upgrade sports facilities',
    ],
    whyRunning: 'To ensure Westlands residents get quality representation and development.',
    socialMedia: {
      twitter: '@tim_wanyonyi',
    },
    trackRecord: {
      billsSponsored: 8,
      projectsCompleted: 25,
      attendanceRate: 85,
      committeeMemberships: ['Transport', 'ICT'],
    },
    dateJoined: '2017-08-31',
    verified: true,
  },
  {
    id: 'pres-1',
    name: 'Dr. Mukhisa Kituyi',
    position: 'President',
    party: 'Independent',
    isIncumbent: false,
    bio: 'Former UNCTAD Secretary-General and Minister for Trade. Champion of economic diplomacy and global trade.',
    education: ['University of Nairobi', 'Makerere University (PhD)'],
    slogan: 'Economic Liberation',
    manifesto: 'Restoring Kenya\'s economy through industrialization, trade, and debt restructuring.',
    keyAgenda: [
      'Revitalize manufacturing sector',
      'Renegotiate national debt',
      'Zero tolerance on corruption',
      'Universal healthcare reform',
      'Digital economy expansion'
    ],
    whyRunning: 'To bring global experience and integrity to national leadership.',
    socialMedia: { twitter: '@DrMukhisaKituyi' },
    dateJoined: '2026-01-01',
    verified: true,
    photo: '/avatars/kituyi.jpg'
  },
  {
    id: 'pres-2',
    name: 'Prof. Kivutha Kibwana',
    position: 'President',
    party: 'Other',
    isIncumbent: false,
    bio: 'Former Governor of Makueni County and constitutional law expert. Known for public participation model.',
    education: ['University of Nairobi', 'Harvard University (SJD)'],
    slogan: 'Wanjiku First',
    manifesto: 'Empowering citizens through direct resource allocation and strict constitutional adherence.',
    keyAgenda: [
      'Full devolution of resources (45%)',
      'Youth employment guarantee',
      'Agrarian revolution',
      'Protecting the constitution',
      'Judicial independence'
    ],
    whyRunning: 'To protect the 2010 Constitution and empower the ordinary citizen.',
    socialMedia: { twitter: '@gobKibwana' },
    dateJoined: '2026-01-10',
    verified: true,
    photo: '/avatars/kibwana.jpg'
  },
  {
      id: 'pol-ruto',
      name: 'H.E. William Samoei Ruto',
      position: 'President',
      party: 'UDA',
      isIncumbent: true,
      bio: 'The 5th President of the Republic of Kenya. A self-made politician who rose from a chicken seller to the highest office in the land, championing the "Hustler Nation".',
      education: ['University of Nairobi - PhD in Plant Ecology', 'University of Nairobi - MSc', 'University of Nairobi - BSc'],
      slogan: 'Kazi ni Kazi',
      manifesto: 'The Bottom-Up Economic Transformation Agenda (BETA) focuses on Agriculture, MSMEs, Housing and Healthcare, and the Digital Superhighway.',
      keyAgenda: [
          'Affordable Housing Programme',
          'Universal Health Coverage (SHIF)',
          'Digital Superhighway',
          'Bottom-up Economics',
          'Fertilizer Subsidy'
      ],
      whyRunning: 'To transform the economic fortunes of the ordinary Kenyan.',
      socialMedia: { twitter: '@WilliamsRuto', facebook: 'WilliamsRuto' },
      trackRecord: {
          projectsCompleted: 150,
          billsSponsored: 0,
          attendanceRate: 100,
          committeeMemberships: []
      },
      dateJoined: '2013-04-09',
      verified: true,
      photo: '/avatars/ruto.jpg',
      familyBackground: 'Born in Sambut village, Kamagut, Uasin Gishu County to Daniel Cheruiyot and Sarah Cheruiyot. Married to Rachel Ruto with children.'
  },
  {
      id: 'pol-raila',
      name: 'Rt. Hon. Raila Amolo Odinga',
      position: 'Opposition Leader',
      party: 'ODM',
      isIncumbent: false,
      bio: 'Former Prime Minister of Kenya and long-serving opposition leader. A veteran champion of democracy and multi-party politics in Kenya.',
      education: ['Magdeburg - MSc in Mechanical Engineering'],
      slogan: 'Azimio la Umoja',
      manifesto: 'Social Protection, Universal Healthcare (BabaCare), and Manufacturing.',
      keyAgenda: [
          'Social Protection Fund (KES 6,000)',
          'Manufacturing & Industrialization',
          'Universal Health Coverage',
          'Education for All',
          'Fighting Corruption'
      ],
      whyRunning: 'To ensure the "Third Liberation" of economic empowerment is achieved.',
      socialMedia: { twitter: '@RailaOdinga', facebook: 'RailaOdingaKE' },
      dateJoined: '1992-01-01',
      verified: true,
      photo: '/avatars/raila.jpg',
      familyBackground: 'Son of the first Vice President of Kenya, Jaramogi Oginga Odinga. Married to Ida Odinga.'
  },
  {
      id: 'pol-kalonzo',
      name: 'Dr. Stephen Kalonzo Musyoka',
      position: 'Opposition Leader',
      party: 'Wiper',
      isIncumbent: false,
      bio: 'Former Vice President of Kenya and long-serving diplomat. Known for his peace mediation efforts in the region.',
      education: ['University of Nairobi - LLB', 'Mediterranean Institute of Management - Business Admin'],
      slogan: 'Kazi Kwanza',
      manifesto: 'A 24-hour economy and free secondary education for all.',
      keyAgenda: [
          'Free Secondary Education',
          '24-Hour Economy',
          'Diplomacy & Peace',
          'Integrity in Leadership',
          'Tax Reduction'
      ],
      whyRunning: 'To restore integrity and lower the cost of living.',
      socialMedia: { twitter: '@skmusyoka' },
      dateJoined: '1985-01-01',
      verified: true,
      photo: '/avatars/kalonzo.jpg',
      familyBackground: 'Born in Tseikuru, Kitui County. Married to the late Pauline Musyoka.'
  }
];

// Utility function to get politicians by county
export function getPoliticiansByCounty(countyId: string): PoliticianProfile[] {
  return SAMPLE_POLITICIANS.filter(p => p.county === countyId);
}

// Utility function to get politicians by position
export function getPoliticiansByPosition(position: PositionType): PoliticianProfile[] {
  return SAMPLE_POLITICIANS.filter(p => p.position === position);
}

// Utility function to get county by ID
export function getCountyById(countyId: string): County | undefined {
  return KENYA_COUNTIES.find(c => c.id === countyId);
}
