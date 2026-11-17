export interface WeddingEventVenue {
  id: 'nikah' | 'valima';
  title: string;
  day: string;
  date: string;
  hijriDate?: string;
  schedule: string[];
  venueTitle: string;
  addressLines: string[];
  mapsQuery: string;
  buttonLabel: string;
}

export const weddingData = {
  assets: {
    palaceArch: '/src/assets/images/palace_arch_frame_1794931153303.jpg',
    palaceDoor: '/src/assets/images/palace_door_panel_1794931154418.jpg',
    weddingStage: '/src/assets/images/mughal_wedding_stage_1794931154430.jpg',
    floralCrest: '/src/assets/images/floral_crest_ornament_1794931154851.jpg',
  },

  entrance: {
    bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    inTheName: 'IN THE NAME OF ALLAH',
    blessingLead: 'With the blessings of Allah,',
    cordiallyInvited: 'YOU ARE CORDIALLY INVITED TO CELEBRATE',
    theWeddingOf: 'THE WEDDING OF',
    groomName: 'Syed Salman Ali',
    openButtonLabel: 'OPEN THE INVITATION',
    skipLabel: 'Skip Intro',
  },

  islamicWelcome: {
    bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    bismillahTranslation: '“In the name of Allah, the Most Gracious, the Most Merciful.”',
    quranArabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا',
    quranTranslation: '“And We created you in pairs.”',
    quranReference: 'Quran 78:8',
  },

  hosts: {
    heading: 'WITH THE BLESSINGS OF',
    blessingsElder: 'Late Mrs. & Mr. Syed Yousuf Ali Sahab',
    parents: 'Mrs. & Mr. Syed Ghouse Ali',
    requestLine:
      'Request the honour of your gracious presence on the auspicious occasion of the wedding of their son.',
  },

  couple: {
    groomLabel: 'THE GROOM',
    groomName: 'SYED SALMAN ALI',
    connector: 'WITH',
    brideRelationLabel: 'DAUGHTER OF',
    brideParents: 'MRS. & MR. SYED MEERA HUSSAIN',
  },

  events: {
    nikah: {
      id: 'nikah',
      title: 'NIKAH MUBARAK',
      day: 'THURSDAY',
      date: '26 NOVEMBER 2026',
      schedule: ['Nikah: After Isha', 'Dinner: Follows the ceremony'],
      venueTitle: 'I.S.D. A.1 CLASSIC CONVENTION',
      addressLines: ['Opp. Learners Land School,', 'L.B. Nagar, Warangal.'],
      mapsQuery:
        'I.S.D. A.1 Classic Convention, Opp. Learners Land School, L.B. Nagar, Warangal, Telangana, India',
      buttonLabel: 'VIEW NIKAH LOCATION',
    } satisfies WeddingEventVenue,
    valima: {
      id: 'valima',
      title: 'VALIMA CELEBRATION',
      day: 'SATURDAY',
      date: '28 NOVEMBER 2026',
      hijriDate: '17th Jamadi-us-Sani 1448 Hijri',
      schedule: ['Dinner: 9:00 PM'],
      venueTitle: 'S.R. GARDENS',
      addressLines: [
        'Karimuguda Road,',
        'Ghatkesar,',
        'Medchal–Malkajgiri District.',
      ],
      mapsQuery:
        'S.R. Gardens, Karimuguda Road, Ghatkesar, Medchal-Malkajgiri District, Telangana, India',
      buttonLabel: 'VIEW VALIMA LOCATION',
    } satisfies WeddingEventVenue,
  },

  countdown: {
    targetIso: '2026-11-28T21:00:00+05:30',
    timezone: 'Asia/Kolkata',
    heading: 'COUNTDOWN TO THE VALIMA',
    subheading: '28 November 2026 · 9:00 PM IST',
    completedTitle: 'Valima Mubarak',
    completedMessage:
      'The blessed Valima celebration has begun. We warmly welcome you to share in our joy.',
  },

  familyGreetings: {
    heading: 'WITH BEST COMPLIMENTS FROM',
    names: [
      'Syed Samdan Ali',
      'Syed Shanoor Ali',
      'Syed Nabi',
      'Mohammad Saleem Pasha',
      'Syed Shareef Ali',
      'Syed Ashraf Ali',
      'Syed Sahil Ali',
      'Syed Amaan Ali',
      'Syed Arman',
      'Syed Amaan',
      'Mohammad Nabeel Hussain',
      'NEAR & DEAR',
    ],
  },

  finalGreeting: {
    heading: 'JAZAKALLAHU KHAIRAN',
    line1: 'Your presence and blessings mean the world to us.',
    line2:
      'May Allah bless the couple with everlasting love, happiness, peace and barakah.',
    ameenArabic: 'آمِين',
  },

  sharing: {
    whatsappMessage:
      'Assalamu Alaikum! You are cordially invited to celebrate the wedding of Syed Salman Ali. Please open our royal wedding invitation and join us for the celebrations. JazakAllah Khair.',
  },

  studioCredit: {
    madeBy: 'Made by The Digital Invitations',
    brandName: 'The Digital Invitations',
    subtitle: 'Bespoke digital wedding invitations crafted with timeless elegance',
    instagramHandle: '@the_digital_invitations',
    instagramUrl:
      'https://www.instagram.com/the_digital_invitations?xtok=MWUya2I0bHc5cDVnbQ%3D%3D&utm_source=qr',
  },
} as const;
