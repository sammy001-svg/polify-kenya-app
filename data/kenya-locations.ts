export interface Constituency {
  name: string;
  wards: string[];
}

export interface County {
  name: string;
  constituencies: Constituency[];
}

export const kenyaLocations: County[] = [
  {
    name: "Mombasa",
    constituencies: [
      { name: "Changamwe", wards: ["Port Reitz", "Kipevu", "Airport", "Miritini", "Chaani"] },
      { name: "Jomvu", wards: ["Jomvu Kuu", "Magongo", "Mikindani"] },
      { name: "Kisauni", wards: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"] },
      { name: "Likoni", wards: ["Mtongwe", "Shika adabu", "Bofu", "Likoni", "Timbwani"] },
      { name: "Mvita", wards: ["Mji wa Kale/Makadara", "Tudor", "Tononoka", "Ganjoni/Shimanzi", "Majengo"] },
      { name: "Nyali", wards: ["Frere Town", "Ziwa la Ng'ombe", "Mkomani", "Kongowea", "Ziwani/Kadzandani"] }
    ]
  },
  {
    name: "Kwale",
    constituencies: [
      { name: "Kinango", wards: ["Ndavaya", "Puma", "Kinango", "Chengoni/Samburu", "Mackinon Road", "Mwavumbo", "Kasemeni"] },
      { name: "Lunga Lunga", wards: ["Pongwe/Kikoneni", "Dzombo", "Vanga", "Mwereni"] },
      { name: "Msambweni", wards: ["Gombato Bongwe", "Ukunda", "Kinondo", "Ramisi"] },
      { name: "Matuga", wards: ["Tsimba Golini", "Waa", "Tiwi", "Kubo South", "Mkongani"] }
    ]
  },
  {
    name: "Kilifi",
    constituencies: [
      { name: "Kilifi North", wards: ["Tezo", "Sokoni", "Kibarani", "Dabaso", "Matsangoni", "Watamu", "Mnarani"] },
      { name: "Kilifi South", wards: ["Junju", "Mwarakaya", "Shimo la Tewa", "Chasimba", "Mtepeni"] },
      { name: "Kaloleni", wards: ["Mariakani", "Kayafungo", "Kaloleni", "Mwanamwinga"] },
      { name: "Ganze", wards: ["Dungicha", "Bamba", "Jaribuni", "Sokoke"] },
      { name: "Magarini", wards: ["Maarafa", "Magarini", "Gongoni", "Adu", "Garashi", "Sabaki"] },
      { name: "Rabai", wards: ["Mwawesa", "Ruruma", "Jibana", "Rabai/Kisurutuni"] },
      { name: "Malindi", wards: ["Jilore", "Kakuyuni", "Ganda", "Malindi Town", "Shella"] }
    ]
  },
  {
    name: "Tana River",
    constituencies: [
      { name: "Garsen", wards: ["Garsen Central", "Garsen East", "Garsen North", "Garsen South", "Kipini East", "Kipini West"] },
      { name: "Galole", wards: ["Kinakomba", "Mikinduni", "Chewani", "Wayu"] },
      { name: "Bura", wards: ["Chewele", "Hirimani", "Bangale", "Madogo", "Sala"] }
    ]
  },
  {
    name: "Lamu",
    constituencies: [
      { name: "Lamu East", wards: ["Faza", "Kiunga", "Basuba"] },
      { name: "Lamu West", wards: ["Shella", "Mkomani", "Hindi", "Mkunumbi", "Hongwe", "Witu", "Bahari"] }
    ]
  },
  {
    name: "Taita Taveta",
    constituencies: [
      { name: "Taveta", wards: ["Chala", "Mahoo", "Bomani", "Mboghoni", "Mata"] },
      { name: "Wundanyi", wards: ["Wundanyi/Mbale", "Werugha", "Wumingu/Kishushe", "Mwanda/Mgange"] },
      { name: "Mwatate", wards: ["Ronge", "Mwatate", "Bura", "Chawia", "Wusi/Kishamba"] },
      { name: "Voi", wards: ["Mbololo", "Saghala", "Kaloleni", "Marungu", "Kasigau", "Ngolia"] }
    ]
  },
  {
    name: "Garissa",
    constituencies: [
      { name: "Garissa Township", wards: ["Waberi", "Galbet", "Township", "Iftin"] },
      { name: "Balambala", wards: ["Balambala", "Danyere", "Jarajara", "Saka", "Sankuri"] },
      { name: "Lagdera", wards: ["Modogashe", "Benane", "Goreale", "Maalamin", "Sabena", "Baraki"] },
      { name: "Dadaab", wards: ["Dertu", "Dadaab", "Labasig", "Damajale", "Liboi", "Abakaile"] },
      { name: "Fafi", wards: ["Bura", "Dekaharia", "Jarajila", "Fafi", "Nanighi"] },
      { name: "Ijara", wards: ["Hulugho", "Sangailu", "Ijara", "Masalani"] }
    ]
  },
  {
    name: "Wajir",
    constituencies: [
      { name: "Wajir North", wards: ["Gurre", "Bute", "Korondile", "Malkagufu", "Batalu", "Danaba", "Godoma"] },
      { name: "Wajir East", wards: ["WagallaGanyure", "Township", "Barwaqo", "Khorof/Harar"] },
      { name: "Wajir South", wards: ["Benane", "Burder", "Dadajabula", "Habaswein", "Lagbogol South", "Ibrahim Ure", "Diff"] },
      { name: "Wajir West", wards: ["Arbajahan", "Hadado/Athibohol", "Ademasajide", "Ganyure/Wagalla"] },
      { name: "Eldas", wards: ["Eldas", "Della", "Lakoley South/Basir", "El-Nur/TulaTula"] },
      { name: "Tarbaj", wards: ["Elben", "Sarman", "Tarbaj", "Wargadud"] }
    ]
  },
  {
    name: "Mandera",
    constituencies: [
      { name: "Mandera West", wards: ["Takaba South", "Takaba", "Lagsure", "Dandu", "Gither"] },
      { name: "Mandera South", wards: ["Wargadud", "Kutulo", "Elwak South", "Elwak North", "Shimbir Fatuma"] },
      { name: "Mandera East", wards: ["Arabia", "Township", "Neboi", "Khalalio", "Libehia"] },
      { name: "Lafey", wards: ["Fino", "Lafey", "Wareran", "Alango Gof", "Kulan"] },
      { name: "Mandera North", wards: ["Ashabito", "Guticha", "Marothile", "Rhamu", "Rhamu-Dimtu"] },
      { name: "Banissa", wards: ["Banissa", "Derkhale", "Guba", "Malkamari", "Kiliwehiri"] }
    ]
  },
  {
    name: "Marsabit",
    constituencies: [
      { name: "Moyale", wards: ["Butiye", "Sololo", "Heillu/Manyatta", "Golbo", "Moyale Township", "Uran", "Obbu"] },
      { name: "North Horr", wards: ["Dukana", "Maikona", "Turbi", "North Horr", "Illeret"] },
      { name: "Saku", wards: ["Sagate/Jaldesa", "Karare", "Marsabit Central"] },
      { name: "Laisamis", wards: ["Loiyangalani", "Kargi/South Horr", "Koran", "Loglogo", "Laisamis"] }
    ]
  },
  {
    name: "Isiolo",
    constituencies: [
      { name: "Isiolo North", wards: ["Wabera", "Bulla Pesa", "Chari", "Cherab", "Ngare Mara", "Burat", "Oldo/Nyiro"] },
      { name: "Isiolo South", wards: ["Garba Tulla", "Kinnna", "Sericho"] }
    ]
  },
  {
    name: "Meru",
    constituencies: [
      { name: "Igembe South", wards: ["Maua", "Kiegoi/Antubochiu", "Athiru Gaiti", "Akachiu", "Kanuni"] },
      { name: "Igembe Central", wards: ["Akirang'ondu", "Athiru Ruujine", "Igembe East", "Njia", "Kangeta"] },
      { name: "Igembe North", wards: ["Antuambui", "Ntunene", "Antubetwe Kiongo", "Naathu", "Amwathi"] },
      { name: "Tigania West", wards: ["Athwana", "Akithi", "Kianjai", "Nkomo", "Mbeu"] },
      { name: "Tigania East", wards: ["Thangatha", "Mikinduri", "Kiguchwa", "Muthara", "Karama"] },
      { name: "North Imenti", wards: ["Municipality", "Ntima East", "Ntima West", "Nyaki West", "Nyaki East"] },
      { name: "Buuri", wards: ["Timau", "Kisima", "Kiirua/Naari", "Ruiri/Rwarera"] },
      { name: "Central Imenti", wards: ["Mwanganthia", "Abothuguchi Central", "Abothuguchi West", "Kiagu", "Kibirichia"] },
      { name: "South Imenti", wards: ["Mitunguu", "Igoji East", "Igoji West", "Abogeta East", "Abogeta West", "Nkuene"] }
    ]
  },
  {
    name: "Tharaka-Nithi",
    constituencies: [
      { name: "Maara", wards: ["Mitheru", "Muthambi", "Mwimbi", "Ganga", "Chogoria"] },
      { name: "Chuka/Igambang'ombe", wards: ["Mariani", "Karingani", "Magumoni", "Mugwe", "Igambang'ombe"] },
      { name: "Tharaka", wards: ["Gatunga", "Mukothogo", "Chiakariga", "Marimanti", "Nkondi"] }
    ]
  },
  {
    name: "Embu",
    constituencies: [
      { name: "Manyatta", wards: ["Ruguru/Ngandori", "Kithimu", "Nginda", "Mbeti North", "Kirimari", "Gaturi South"] },
      { name: "Runyenjes", wards: ["Gaturi North", "Kagaari South", "Kagaari North", "Central Ward", "Kyeni North", "Kyeni South"] },
      { name: "Mbeere South", wards: ["Mwea", "Makima", "Mbeti South", "Mavuria", "Kiambere"] },
      { name: "Mbeere North", wards: ["Nthawa", "Muminji", "Evurore"] }
    ]
  },
  {
    name: "Kitui",
    constituencies: [
      { name: "Mwingi North", wards: ["Ngomeni", "Kyuso", "Mumoni", "Tseikuru", "Tharaka"] },
      { name: "Mwingi West", wards: ["Kyome/Thaana", "Nguutani", "Migwani", "Kiomo/Kyethani"] },
      { name: "Mwingi Central", wards: ["Kivou", "Nguni", "Nuu", "Mui", "Waita", "Mwingi Central"] },
      { name: "Kitui West", wards: ["Mutonguni", "Kauwi", "Matinyani", "Kwa Mutonga/Kithumula"] },
      { name: "Kitui Rural", wards: ["Kisasi", "Mbitini", "Kwa Vonza/Yatta", "Kanyangi"] },
      { name: "Kitui Central", wards: ["Miambani", "Township", "Kyangwithya West", "Mulango", "Kyangwithya East"] },
      { name: "Kitui South", wards: ["Ikutha", "Mutomo", "Mutha", "Kaniko/Ikana", "Kanziko", "Athi"] },
      { name: "Kitui East", wards: ["Zombe/Mwitika", "Nzambani", "Chuluni", "Voo/Kyamatu", "Endau/Malalani", "Mutitu/Kaliku"] }
    ]
  },
  {
    name: "Machakos",
    constituencies: [
      { name: "Masinga", wards: ["Kivaa", "Masinga Central", "Ekalakala", "Muthesya", "Ndithini"] },
      { name: "Yatta", wards: ["Ndalani", "Matuu", "Kithimani", "Ikombe", "Katangi"] },
      { name: "Kangundo", wards: ["Kangundo North", "Kangundo Central", "Kangundo East", "Kangundo West"] },
      { name: "Matungulu", wards: ["Matungulu North", "Matungulu South", "Matungulu East", "Matungulu West", "Kyeleni"] },
      { name: "Kathiani", wards: ["Mitaboni", "Kathiani Central", "Upper Kaewa/Iveti", "Lower Kaewa/Kaani"] },
      { name: "Mavoko", wards: ["Athi River", "Syokimau/Mlolongo", "Upper Lukenya", "Muthwani"] },
      { name: "Machakos Town", wards: ["Kalama", "Muputi", "Machakos Central", "Mumbuni North", "Muvuti/Kiima-Kimwe", "Kua"] },
      { name: "Mwala", wards: ["Mbiuni", "Makutano/Mwala", "Masii", "Muthetheni", "Wamunyu", "Kibauni"] }
    ]
  },
  {
    name: "Makueni",
    constituencies: [
      { name: "Mbooni", wards: ["Tulimani", "Mbooni", "Kithungo/Kitundu", "Kiteta/Kisau", "Kako/Waia", "Kalawa"] },
      { name: "Kilome", wards: ["Kasikeu", "Mukaa", "Kiima Kiu/Kalanzoni"] },
      { name: "Kaiti", wards: ["Ukia", "Kee", "Kilala/Gaiteai", "Ilima"] },
      { name: "Makueni", wards: ["Wote", "Muvau/Kikumini", "Mavindini", "Kitise/Kithuki", "Kathonzweni", "Nzaui/Kilili/Kalamba", "Mbitini"] },
      { name: "Kibwezi West", wards: ["Makindu", "Nguu/Masumba", "Emali/Mulala", "Wote", "Kikumbulyu North", "Kikumbulyu South"] },
      { name: "Kibwezi East", wards: ["Masongaleni", "Mtito Andei", "Thange", "Ivingoni/Nzambani"] }
    ]
  },
  {
    name: "Nyandarua",
    constituencies: [
      { name: "Kinangop", wards: ["Engineer", "Gathara", "North Kinangop", "Murungaru", "Njabini/Kiburu", "Nyakio", "Githabai", "Magumu"] },
      { name: "Kipipiri", wards: ["Wanjohi", "Kipipiri", "Geta", "Githioro"] },
      { name: "Ol Kalou", wards: ["Karau", "Kanjuiri Ridge", "Central", "Milangine", "Kaimbaga"] },
      { name: "Ol Joro Orok", wards: ["Gathanji", "Gatimu", "Weru", "Charagita"] },
      { name: "Ndaragwa", wards: ["Leshau/Pondo", "Kiriita", "Central", "Shamata"] }
    ]
  },
  {
    name: "Nyeri",
    constituencies: [
      { name: "Tetu", wards: ["Dedan Kimathi", "Wamagana", "Aguthi-Gaaki"] },
      { name: "Kieni", wards: ["Mweiga", "Naromoru Kiamathaga", "Mwiyogo/Endarasha", "Mugunda", "Gatarakwa", "Theuri", "Gakawa", "Kabaru"] },
      { name: "Mathira", wards: ["Ruguru", "Magutu", "Iria-ini", "Konyu", "Kirimukuyu", "Karatina Town"] },
      { name: "Othaya", wards: ["Mahiga", "Iria-ini", "Chinga", "Karima"] },
      { name: "Mukurweini", wards: ["Gikondi", "Rugi", "Mukurwe-ini West", "Mukurwe-ini Central"] },
      { name: "Nyeri Town", wards: ["Kiganjo/Mathari", "Rware", "Gatitu/Muruguru", "Ruring'u", "Kamakwa/Mukaro"] }
    ]
  },
  {
    name: "Kirinyaga",
    constituencies: [
      { name: "Mwea", wards: ["Mutithi", "Kangai", "Thiba", "Wamumu", "Nyangati", "Murinduko", "Gathigiriri", "Teere"] },
      { name: "Gichugu", wards: ["Kabare", "Baragwi", "Njukiini", "Ngariama", "Karumandi"] },
      { name: "Ndia", wards: ["Mukure", "Kariti", "Kiine"] },
      { name: "Kirinyaga Central", wards: ["Mutira", "Kanyekini", "Kerugoya", "Inoi"] }
    ]
  },
  {
    name: "Murang'a",
    constituencies: [
      { name: "Kangema", wards: ["Kanyenya-ini", "Muguru", "Rwathia"] },
      { name: "Mathioya", wards: ["Kiru", "Gitugi", "Kamacharia"] },
      { name: "Kiharu", wards: ["Wangu", "Mugoiri", "Mbiri", "Township", "Murarandia", "Gaturi"] },
      { name: "Kigumo", wards: ["Kahumbu", "Muthithi", "Kigumo", "Kangari", "Kinyona"] },
      { name: "Maragua", wards: ["Kimorori/Wempa", "Makuyu", "Kambiti", "Kamahuha", "Ichagaki", "Nginda"] },
      { name: "Kandara", wards: ["Ng'araria", "Muruka", "Kagundu-ini", "Gaichanjiru", "Ithiru", "Ruchu"] },
      { name: "Gatanga", wards: ["Ithanga", "Kakuzi/Mitubiri", "Mugumo-ini", "Gatanga", "Kariara"] }
    ]
  },
  {
    name: "Kiambu",
    constituencies: [
      { name: "Gatundu South", wards: ["Kiamwangi", "Kiganjo", "Ndudaru", "Ngenda"] },
      { name: "Gatundu North", wards: ["Gituamba", "Githobokoni", "Chania", "Mang'u"] },
      { name: "Juja", wards: ["Murera", "Theta", "Juja", "Kalimoni", "Witeithie"] },
      { name: "Thika Town", wards: ["Township", "Kamenu", "Hospital", "Gatuanyaga", "Ngoliba"] },
      { name: "Ruiru", wards: ["Gitothua", "Biashara", "Gatongora", "Kahawa Sukari", "Kahawa Wendani", "Kiuu", "Mwiki", "Mwihoko"] },
      { name: "Githunguri", wards: ["Githunguri", "Githiga", "Ikinu", "Ngemwa", "Komothai"] },
      { name: "Kiambu", wards: ["Ndumberi", "Riabai", "Township", "Ting'ang'a"] },
      { name: "Kiambaa", wards: ["Cianda", "Karuri", "Ndenderu", "Muchatha", "Kihara"] },
      { name: "Kabete", wards: ["Gitaru", "Muguga", "Nyadhuna", "Kabete", "Uthiru"] },
      { name: "Kikuyu", wards: ["Karai", "Nachu", "Sigona", "Kikuyu", "Kinoo"] },
      { name: "Limuru", wards: ["Bibi-ini", "Limuru Central", "Ndeiya", "Limuru East", "Ngecha Tigoni"] },
      { name: "Lari", wards: ["Kijabe", "Nyanduma", "Kamburu", "Lari/Kirenga", "Kinale"] }
    ]
  },
  {
    name: "Turkana",
    constituencies: [
      { name: "Turkana North", wards: ["Kaeris", "Lake Zone", "Lapur", "Kaaleng/Maikona", "Kibish", "Nanakpur"] },
      { name: "Turkana West", wards: ["Kakuma", "Lopur", "Letea", "Songot", "Kalobeyei", "Lokichoggio", "Nanaam"] },
      { name: "Turkana Central", wards: ["Kerio Delta", "Kangatotha", "Kalokol", "Lodwar Township", "Kanamkemer"] },
      { name: "Loima", wards: ["Lobei/Kotaruk", "Turkwel", "Loima", "Lokiriama/Lorengippi"] },
      { name: "Turkana South", wards: ["Kaputir", "Katilu", "Lobokat", "Kalapata", "Lokichar"] },
      { name: "Turkana East", wards: ["Kapedo/Napeitom", "Katir", "Lokori/Kochodin"] }
    ]
  },
  {
    name: "West Pokot",
    constituencies: [
      { name: "Kapenguria", wards: ["Riwo", "Kapenguria", "Mnagei", "Siyoi", "Endugh", "Sook"] },
      { name: "Sigor", wards: ["Sekerr", "Masol", "Lomut", "Wei Wei"] },
      { name: "Pokot South", wards: ["Chepareria", "Batei", "Lelan", "Tapach"] },
      { name: "Kacheliba", wards: ["Suam", "Kodich", "Kasei", "Kapchok", "Kiwawa", "Alale"] }
    ]
  },
  {
    name: "Samburu",
    constituencies: [
      { name: "Samburu North", wards: ["El-Barta", "Nachola", "Ndoto", "Nyiro", "Angata Nanyokie", "Baawa"] },
      { name: "Samburu East", wards: ["Waso", "Wamba West", "Wamba East", "Wamba North"] },
      { name: "Samburu West", wards: ["Lodokejek", "Suguta Marmar", "Maralal", "Loosuk", "Poro"] }
    ]
  },
  {
    name: "Trans Nzoia",
    constituencies: [
      { name: "Kwanza", wards: ["Kapomboi", "Kwanza", "Keiyo", "Bidii"] },
      { name: "Endebess", wards: ["Chepchoina", "Endebess", "Matumbei"] },
      { name: "Saboti", wards: ["Kinyoro", "Matisi", "Tuwani", "Saboti", "Machewa"] },
      { name: "Kiminini", wards: ["Kiminini", "Waitaluk", "Sirende", "Hospital", "Sikhendu", "Nabwiswa"] },
      { name: "Cherangany", wards: ["Sinyerere", "Makutano", "Kaplamai", "Motosiet", "Cherangany/Suwerwa", "Chepsiro/Kiptoror", "Sitatunga"] }
    ]
  },
  {
    name: "Uasin Gishu",
    constituencies: [
      { name: "Soy", wards: ["Moi's Bridge", "Kapkures", "Ziwa", "Segero/Barsombe", "Kipsomba", "Soy", "Kuinet/Kapsuswa"] },
      { name: "Turbo", wards: ["Ngenyilel", "Tapsagoi", "Kamagut", "Kiplombe", "Kapsaos", "Huruma"] },
      { name: "Moiben", wards: ["Tembelio", "Sergoit", "Karuna/Meibeki", "Moiben", "Kimumu"] },
      { name: "Ainabkoi", wards: ["Kapsoya", "Kaptagat", "Ainabkoi/Olare"] },
      { name: "Kapseret", wards: ["Simat/Kapseret", "Kipkenyo", "Ngechek", "Megun", "Langas"] },
      { name: "Kesses", wards: ["Racecourse", "Cheptiret/Kipchamo", "Tulwet/Chuiyat", "Tarakwa"] }
    ]
  },
  {
    name: "Elgeyo-Marakwet",
    constituencies: [
      { name: "Marakwet East", wards: ["Kapyego", "Sambirir", "Endo", "Embobut / Embulot"] },
      { name: "Marakwet West", wards: ["Lelan", "Sengwer", "Cherang'any/Chebororwa", "Moiben/Kuserwo", "Kapsowar", "Arror"] },
      { name: "Keiyo North", wards: ["Emsoo", "Kamariny", "Kapchemutwa", "Tambach"] },
      { name: "Keiyo South", wards: ["Kaptarakwa", "Chepkorio", "Soy South", "Soy North", "Metkei", "Kabiemit"] }
    ]
  },
  {
    name: "Nandi",
    constituencies: [
      { name: "Tinderet", wards: ["Songhor/Soba", "Tindiret", "Chemelil/Chemase", "Kapsimotwo"] },
      { name: "Aldai", wards: ["Kabwareng", "Terik", "Kemeloi-Maraba", "Kobujoi", "Kaptumo-Kaboi", "Koyo-Ndurio"] },
      { name: "Nandi Hills", wards: ["Nandi Hills", "Chepkunyuk", "Ol'Lessos", "Kapchorua"] },
      { name: "Chesumei", wards: ["Chemundu/Kapngetuny", "Kosirai", "Lelmokwo/Ngechek", "Kaptel/Kamoiywo", "Kiptuya"] },
      { name: "Emgwen", wards: ["Kapkangani", "Kapsabet", "Kilibwoni", "Chepkumia"] },
      { name: "Mosop", wards: ["Chepterwai", "Kipkaren", "Kurgung/Surungai", "Kabiyet", "Ndolat", "Terbobot", "Sangalo/Kebulonik"] }
    ]
  },
  {
    name: "Baringo",
    constituencies: [
      { name: "Tiaty", wards: ["Tirioko", "Kolowa", "Ribkwo", "Silale", "Loiyamorock", "Tangulbei/Korossi", "Churo/Amaya"] },
      { name: "Baringo North", wards: ["Barwessa", "Kabartonjo", "Saimo/Kipsaraman", "Saimo/Soi", "Bartabwa"] },
      { name: "Baringo Central", wards: ["Kabarnet", "Sacho", "Tenges", "Ewalel/Chapchap", "Kapropita"] },
      { name: "Baringo South", wards: ["Marigat", "Ilchamus", "Mochongoi", "Mukutani"] },
      { name: "Mogotio", wards: ["Mogotio", "Emining", "Kishan"] },
      { name: "Eldama Ravine", wards: ["Lembus", "Lembus Kwen", "Ravine", "Mumberes/Maji Mazuri", "Lembus/Perkerra", "Koibatek"] }
    ]
  },
  {
    name: "Laikipia",
    constituencies: [
      { name: "Laikipia West", wards: ["Ol-Moran", "Rumuruti Township", "Githiga", "Marmanet", "Igwamiti", "Salama"] },
      { name: "Laikipia East", wards: ["Ngabit", "Tigithi", "Thingithu", "Nanyuki", "Umande"] },
      { name: "Laikipia North", wards: ["Sosian", "Segera", "Mugogodo West", "Mugogodo East"] }
    ]
  },
  {
    name: "Nakuru",
    constituencies: [
      { name: "Molo", wards: ["Mariashoni", "Elburgon", "Turi", "Molo"] },
      { name: "Njoro", wards: ["Mau Narok", "Mauche", "Kihingo", "Nessuit", "Lare", "Njoro"] },
      { name: "Naivasha", wards: ["Biashara", "Hells Gate", "Lake View", "Mai Mahiu", "Maeilla", "Olkaria", "Naivasha East", "Viwandani"] },
      { name: "Gilgil", wards: ["Gilgil", "Elementaita", "Mbaruk/Eburu", "Malewa West", "Murindat"] },
      { name: "Kuresoi South", wards: ["Amalo", "Keringet", "Kiptagich", "Tinet"] },
      { name: "Kuresoi North", wards: ["Kiptororo", "Nyota", "Sirikwa", "Kamara"] },
      { name: "Subukia", wards: ["Subukia", "Waseges", "Kabazi"] },
      { name: "Rongai", wards: ["Menengai West", "Soin", "Visoi", "Mosop", "Soliata"] },
      { name: "Bahati", wards: ["Dundori", "Kabatini", "Kiamaina", "Lanet/Umoja", "Bahati"] },
      { name: "Nakuru Town West", wards: ["Barut", "London", "Kaptembwo", "Kapkures", "Rhoda", "Shaabab"] },
      { name: "Nakuru Town East", wards: ["Biashara", "Kivumbini", "Flamingo", "Menengai", "Nakuru East"] }
    ]
  },
  {
    name: "Narok",
    constituencies: [
      { name: "Narok North", wards: ["Olpusimoru", "Olokurto", "Narok Town", "Nkareta", "Olorropil", "Melili"] },
      { name: "Narok South", wards: ["Majimoto/Naroosura", "Ololulung'a", "Melelo", "Loita", "Sogoo", "Sagamian"] },
      { name: "Narok East", wards: ["Mosiro", "Ildamat", "Keekonyokie", "Suswa"] },
      { name: "Narok West", wards: ["Ilmotiook", "Mara", "Siana", "Naikarra"] },
      { name: "Emurua Dikirr", wards: ["Ilkerin", "Ololmasani", "Mogondo", "Kapsasian"] },
      { name: "Kilgoris", wards: ["Kilgoris Central", "Keyian", "Angata Barikoi", "Shankoe", "Lolgorian", "Sikuani"] }
    ]
  },
  {
    name: "Kajiado",
    constituencies: [
      { name: "Kajiado Central", wards: ["Purko", "Ildamat", "Dalalekutuk", "Matapato North", "Matapato South"] },
      { name: "Kajiado North", wards: ["Olkeri", "Ongata Rongai", "Nkaimurunya", "Oloolua", "Ngong"] },
      { name: "Kajiado West", wards: ["Keekonyokie", "Iloodokilani", "Magadi", "Ewuaso Oonkidong'i", "Mosiro"] },
      { name: "Kajiado East", wards: ["Kaputiei North", "Kitengela", "Oloosirkon/Sholinke", "Kenyewa-Poka", "Imaroro"] },
      { name: "Kajiado South", wards: ["Oltiasika", "Rombo", "Kuku", "Imbirikani/Eselekei", "Entonet/Lenkisim"] }
    ]
  },
  {
    name: "Kericho",
    constituencies: [
      { name: "Kipkelion East", wards: ["Londiani", "Kedowa/Soin", "Chepseon", "Tendeno/Sorget"] },
      { name: "Kipkelion West", wards: ["Kipkelion", "Chilchila", "Seretut/Cheptororiet", "Kamasian"] },
      { name: "Ainamoi", wards: ["Kapsoit", "Ainamoi", "Kapkugerwet", "Kipchimchim", "Kipchebor", "Kapsaos"] },
      { name: "Bureti", wards: ["Kisiara", "Tebesoniet", "Cheboin", "Chemosot", "Litein", "Cheplanget", "Kapkatet"] },
      { name: "Belgut", wards: ["Waldai", "Kabianga", "Cheitoriet", "Chaik", "Kapsuser"] },
      { name: "Sigowet/Soin", wards: ["Sigowet", "Kaplelartet", "Soliat", "Soin"] }
    ]
  },
  {
    name: "Bomet",
    constituencies: [
      { name: "Sotik", wards: ["Ndanai/Abosi", "Kipsonoi", "Kapletundo", "Chemampul", "Manaret/Rongena"] },
      { name: "Chepalungu", wards: ["Kong'asis", "Nyangores", "Sigor", "Chebunyo", "Siongiroi"] },
      { name: "Bomet East", wards: ["Merigi", "Kembu", "Longisa", "Kipreres", "Chemaner"] },
      { name: "Bomet Central", wards: ["Silibwet Township", "Ndudaru", "Singorwet", "Chesoen", "Mutarakwa"] },
      { name: "Konoin", wards: ["Kimulot", "Mogogosiek", "Boito", "Embomos", "Chepchabas"] }
    ]
  },
  {
    name: "Kakamega",
    constituencies: [
      { name: "Lugari", wards: ["Mautuma", "Lugari", "Lumakanda", "Chekalini", "Chevaywa", "Lwandeti"] },
      { name: "Likuyani", wards: ["Likuyani", "Sango", "Kongoni", "Nzoia", "Sinoko"] },
      { name: "Malava", wards: ["West Kabras", "Chemuche", "East Kabras", "Butali/Chegulo", "Manda-Shivanga", "Shirugu-Shalusi", "South Kabras"] },
      { name: "Lurambi", wards: ["Butsotso South", "Butsotso Central", "Butsotso East", "Sheywe", "Mahiakalo", "Shirere"] },
      { name: "Navakholo", wards: ["Ingotsi-Ititi", "Shinoyi-Shikomari-Esumeyia", "Bunyala West", "Bunyala Central", "Bunyala East"] },
      { name: "Mumias West", wards: ["Mumias Central", "Mumias North", "Etenje", "Musanda"] },
      { name: "Mumias East", wards: ["Lusheya/Lubinu", "Malaha/Isongo/Makunga", "East Wanga"] },
      { name: "Matungu", wards: ["Koyonzo", "Mayoni", "Kholera", "Khalaba", "Namamali"] },
      { name: "Butere", wards: ["Marama West", "Marama Central", "Marama South", "Marenyo-Shianda", "Manyala"] },
      { name: "Khwisero", wards: ["Kisa North", "Kisa West", "Kisa Central", "Kisa South"] },
      { name: "Shinyalu", wards: ["Isukha North", "Isukha Central", "Isukha South", "Isukha East", "Isukha West", "Murhanda"] },
      { name: "Ikolomani", wards: ["Idakho South", "Idakho Central", "Idakho East", "Idakho North"] }
    ]
  },
  {
    name: "Vihiga",
    constituencies: [
      { name: "Sabatia", wards: ["Lyaduywa/Izava", "West Sabatia", "Chavakali", "Wodanga", "Busali", "Wodanga"] },
      { name: "Vihiga", wards: ["Lugaga-Wamuluma", "South Maragoli", "Central Maragoli", "Mungoma"] },
      { name: "Hamisi", wards: ["Shiru", "Gisambai", "Shamakhokho", "Banja", "Muhudu", "Tambua", "Jepkoyai"] },
      { name: "Luanda", wards: ["Luanda Township", "Wemilabi", "Mwibona", "Luanda South", "Emabungo"] },
      { name: "Emuhaya", wards: ["North East Bunyore", "Central Bunyore", "West Bunyore"] }
    ]
  },
  {
    name: "Bungoma",
    constituencies: [
      { name: "Mt. Elgon", wards: ["Cheptais", "Chesikaki", "Chepyuk", "Kapkateny", "Kaptama", "Nomorio"] },
      { name: "Sirisia", wards: ["Namwela", "Malakisi/South Kulisiru", "Lwandanyi"] },
      { name: "Kabuchai", wards: ["Kabuchai/Chwele", "West Nalondo", "Bwake/Luuya", "Mukuyuni"] },
      { name: "Bumula", wards: ["Bumula", "Khasoko", "Kabula", "Kimaeti", "South Bukusu", "Siboti", "West Bukusu"] },
      { name: "Kanduyi", wards: ["Bukusu South", "Bukusu West", "Bukusu East", "Township", "Khalaba", "Musikari", "Tuuti/Marakaru", "Sang'alo"] },
      { name: "Webuye East", wards: ["Mihuu", "Ndivisi", "Maraka"] },
      { name: "Webuye West", wards: ["Sitikho", "Matulo", "Bokoli"] },
      { name: "Kimilili", wards: ["Kibingei", "Kimilili", "Maeni", "Kamukuywa"] },
      { name: "Tongaren", wards: ["Mbakalo", "Naitiri/Kabuyefwe", "Milima", "Ndalu", "Tongaren", "Soysambu/Mitua"] }
    ]
  },
  {
    name: "Busia",
    constituencies: [
      { name: "Teso North", wards: ["Malaba Central", "Malaba North", "Malaba South", "Ang'urai South", "Ang'urai North", "Ang'urai East"] },
      { name: "Teso South", wards: ["Ang'orom", "Chakol South", "Chakol North", "Amukura West", "Amukura Central", "Amukura East"] },
      { name: "Nambale", wards: ["Nambale Township", "Bukhayo North/Walatsi", "Bukhayo East", "Bukhayo Central"] },
      { name: "Matayos", wards: ["Bukhayo West", "Mayenje", "Matayos South", "Busibwabo"] },
      { name: "Butula", wards: ["Marachi West", "Marachi Central", "Marachi East", "Elugulu"] },
      { name: "Funyula", wards: ["Namboboto Nambuku", "Nangina", "Ageng'a Nanguba", "Bwiri"] },
      { name: "Budalangi", wards: ["Bunyala Central", "Bunyala North", "Bunyala West", "Bunyala South"] }
    ]
  },
  {
    name: "Siaya",
    constituencies: [
      { name: "Ugenya", wards: ["West Ugenya", "Ukwala", "North Ugenya", "East Ugenya"] },
      { name: "Ugunja", wards: ["Sidindi", "Sigomere", "Ugunja"] },
      { name: "Alego Usonga", wards: ["Usonga", "West Alego", "Central Alego", "Siaya Township", "North Alego", "South Alego"] },
      { name: "Gem", wards: ["North Gem", "West Gem", "Central Gem", "Yala Urban", "East Gem", "South Gem"] },
      { name: "Bondo", wards: ["West Yimbo", "Central Sakwa", "South Sakwa", "Yimbo East", "West Sakwa", "North Sakwa"] },
      { name: "Rarieda", wards: ["North Asembo", "South Asembo", "East Asembo", "West Rarieda", "Uyoma West", "Uyoma East"] }
    ]
  },
  {
    name: "Kisumu",
    constituencies: [
      { name: "Kisumu East", wards: ["Kajulu", "Manyatta B", "Nyalenda A", "Kolwa East", "Kolwa Central"] },
      { name: "Kisumu West", wards: ["South West Kisumu", "Central Kisumu", "Kisumu North", "West Kisumu", "North West Kisumu"] },
      { name: "Kisumu Central", wards: ["Railways", "Migosi", "Shaurimoyo Kaloleni", "Market Milimani", "Kondele", "Nyalenda B"] },
      { name: "Seme", wards: ["West Seme", "Central Seme", "East Seme", "North Seme"] },
      { name: "Nyando", wards: ["East Kano/Wawidhi", "Ahero", "Kabonyo/Kanyagwal", "Kobura", "Onjiko"] },
      { name: "Muhoroni", wards: ["Miwani", "Ombeyi", "Masogo/Nyang'oma", "Chemelil", "Muhoroni/Koru"] },
      { name: "Nyakach", wards: ["South East Nyakach", "West Nyakach", "North Nyakach", "Central Nyakach", "South West Nyakach"] }
    ]
  },
  {
    name: "Homa Bay",
    constituencies: [
      { name: "Kasipul", wards: ["West Kasipul", "South Kasipul", "Central Kasipul", "East Kasipul", "West Kamagak"] },
      { name: "Kabondo Kasipul", wards: ["Kabondo East", "Kabondo West", "Kokwanyo/Kakelo", "Kojwach"] },
      { name: "Karachuonyo", wards: ["West Karachuonyo", "North Karachuonyo", "Central", "Kanyaluo", "Kibiri", "Wang'chieng", "Kendu Bay Town"] },
      { name: "Rangwe", wards: ["West Gem", "East Gem", "Kagan", "Kochia"] },
      { name: "Homa Bay Town", wards: ["Homa Bay Central", "Homa Bay Arujo", "Homa Bay West", "Homa Bay East"] },
      { name: "Ndhiwa", wards: ["Kanyamwa Kologi", "Kanyamwa Kosewe", "North Kabuoch", "South Kabuoch", "Kanyadoto", "Kwabwai", "Kanyikela"] },
      { name: "Mbita", wards: ["Mfangano Island", "Rusinga Island", "Kasgunga", "Gembe"] },
      { name: "Suba North", wards: ["Lambwe", "Mbita", "Gembe", "Kasgunga", "Mfangano"] },
      { name: "Suba South", wards: ["Gwassi South", "Gwassi North", "Kaksingri West", "Ruma Kaksingri"] }
    ]
  },
  {
    name: "Migori",
    constituencies: [
      { name: "Rongo", wards: ["North Kamagambo", "Central Kamagambo", "East Kamagambo", "South Kamagambo"] },
      { name: "Awendo", wards: ["North Sakwa", "South Sakwa", "West Sakwa", "Central Sakwa"] },
      { name: "Suna East", wards: ["God Jope", "Suna Central", "Kakrao", "Kwa"] },
      { name: "Suna West", wards: ["Wiga", "Wasimbete", "Ragana-Oruba", "Wasweta II"] },
      { name: "Uriri", wards: ["West Kanyamkago", "North Kanyamkago", "Central Kanyamkago", "South Kanyamkago", "East Kanyamkago"] },
      { name: "Nyatike", wards: ["Kachien'g", "Kanyasa", "North Kadem", "Macalder/Kanyarwanda", "Kaler", "Got Kachola", "Muhuru"] },
      { name: "Kuria West", wards: ["Bukira East", "Bukira Central/Ikerege", "Isibania", "Makerero", "Masaba", "Tagare", "Nyamosense/Komosoko"] },
      { name: "Kuria East", wards: ["Gokeharaka/Getanyatira", "Ntimaru West", "Ntimaru East", "Nyabasi West", "Nyabasi East"] }
    ]
  },
  {
    name: "Kisii",
    constituencies: [
      { name: "Bonchari", wards: ["Bomariba", "Bogiakumu", "Bomorenda", "Riana"] },
      { name: "South Mugirango", wards: ["Bogetenga", "Borabu / Chitago", "Moticho", "Getenga", "Paai / Masige", "Boikanga / Borabu"] },
      { name: "Bomachoge Borabu", wards: ["Bombaba - Borabu", "Boitang'are", "Bokimonge", "Magenche"] },
      { name: "Bobasi", wards: ["Masige West", "Masige East", "Bassie Central", "Nyacheki", "Bassi Bogetaorio", "Bobasi Chache", "Bobasi Masige"] },
      { name: "Bomachoge Chache", wards: ["Majoge Bassie", "Sengera", "Boochi / Tendere"] },
      { name: "Nyaribari Masaba", wards: ["Ichuni", "Nyamasibi", "Masimba", "Gesusu", "Kiamokama"] },
      { name: "Nyaribari Chache", wards: ["Birongo", "Keumbu", "Kiogoro", "Ibeno", "Central"] },
      { name: "Kitutu Chache North", wards: ["Momoniat", "Marani", "Sensi", "Kegogi"] },
      { name: "Kitutu Chache South", wards: ["Bogeka", "Nyatieko", "Nyagechere", "Benedict/Mosocho", "Mwamonari"] }
    ]
  },
  {
    name: "Nyamira",
    constituencies: [
      { name: "Kitutu Masaba", wards: ["Rigoma", "Gachuba", "Kemera", "Magombo", "Manga", "Gesima"] },
      { name: "West Mugirango", wards: ["Nyamaiya", "Bogichora", "Bosamaro", "Bonyamatuta", "Township"] },
      { name: "North Mugirango", wards: ["Itibo", "Bomwagamo", "Bokeira", "Magwagwa", "Ekerenyo"] },
      { name: "Borabu", wards: ["Mekene", "Monyerero", "Esise", "Nyansiongo"] }
    ]
  },
  {
    name: "Nairobi",
    constituencies: [
      { name: "Westlands", wards: ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"] },
      { name: "Dagoretti North", wards: ["Kileleshwa", "Kawangware", "Gatwaya", "Mountain View", "Kaba", "Kabiro"] },
      { name: "Dagoretti South", wards: ["Mutu-ini", "Ngando", "Riruta", "Uthiru/Ruthimitu", "Waithaka"] },
      { name: "Lang'ata", wards: ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"] },
      { name: "Kibra", wards: ["Laini Saba", "Lindi", "Makina", "Woodley/Kenyatta Golf Course", "Sarang'ombe"] },
      { name: "Roysambu", wards: ["Roysambu", "Garden Estate", "Ridgeways", "Githurai", "Kahawa West", "Zimmerman", "Kahawa"] },
      { name: "Kasarani", wards: ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"] },
      { name: "Ruaraka", wards: ["Babadogo", "Utalii", "Mathare North", "Lucky Summer", "Korogocho"] },
      { name: "Embakasi South", wards: ["Imara Daima", "Kwa Njenga", "Kwa Reuben", "Pipelines", "Kware"] },
      { name: "Embakasi North", wards: ["Kariobangi North", "Dandora Area I", "Dandora Area II", "Dandora Area III", "Dandora Area IV"] },
      { name: "Embakasi Central", wards: ["Kayole North", "Kayole Central", "Kayole South", "Komarock", "Matopeni/Spring Valley"] },
      { name: "Embakasi East", wards: ["Upper Savannah", "Lower Savannah", "Embakasi", "Utawala", "Mihango"] },
      { name: "Embakasi West", wards: ["Umoja I", "Umoja II", "Mowlem", "Kariobangi South"] },
      { name: "Makadara", wards: ["Maringo/Hamza", "Viwandani", "Harambee", "Makongeni"] },
      { name: "Kamkunji", wards: ["Pumwani", "Eastleigh North", "Eastleigh South", "Airbase", "California"] },
      { name: "Starehe", wards: ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landimawe", "Nairobi South"] },
      { name: "Mathare", wards: ["Hospital", "Mabatini", "Huruma", "Ngei", "Mlango Kubwa", "Kiamaiko"] }
    ]
  }
];
