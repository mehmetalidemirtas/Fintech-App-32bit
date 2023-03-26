const data = [
    {
      key: '1',
      value: '1 - Galata/IST'
    },
    {
      key: '2',
      value: '2 - Kadıköy/IST'
    },
    {
      key: '3',
      value: '3 - Beşiktaş/IST'
    },
    {
      key: '4',
      value: '4 - Etiler/IST'
    },
    {
      key: '5',
      value: '5 - Levent/IST'
    },
    {
      key: '6',
      value: '6 - Şişli/IST'
    },
    {
      key: '7',
      value: '7 - Üsküdar/IST'
    },
    {
      key: '8',
      value: '8 - Ataşehir/IST'
    },
    {
      key: '9',
      value: '9 - Kartal/IST'
    },
    {
      key: '10',
      value: '10 - Bahçeşehir/IST'
    },
    {
      key: '11',
      value: '11 - Akyazı/SAK'
    },
    {
      key: '12',
      value: '12 - Arifiye/SAK'
    },
    {
      key: '13',
      value: '13 - Erenler/SAK'
    },
    {
      key: '14',
      value: '14 - Ferizli/SAK'
    },
    {
      key: '15',
      value: '15 - Geyve/SAK'
    },
    {
      key: '16',
      value: '16 - Hendek/SAK'
    },
    {
      key: '17',
      value: '17 - Karapürçek/SAK'
    },
    {
      key: '18',
      value: '18 - Karasu/SAK'
    },
    {
      key: '19',
      value: '19 - Kaynarca/SAK'
    },
    {
      key: '20',
      value: '20 - Kocaali/SAK'
    },
    {
      key: '21',
      value: '10 - Adapazarı/SAK'
    },
    {
      key: '22',
      value: '22 - Konak/IZM'
    },
    {
      key: '23',
      value: '23 - Alsancak/IZM'
    },
    {
      key: '24',
      value: '24 - Buca/IZM'
    },
    {
      key: '25',
      value: '25 - Bornova/IZM'
    },
    {
      key: '26',
      value: '26 - Çiğli/IZM'
    },
    {
      key: '27',
      value: '27 - Karşıyaka/IZM'
    },
    {
      key: '28',
      value: '28 - Bayraklı/IZM'
    },
    {
      key: '29',
      value: '29 - Gaziemir/IZM'
    },
    {
      key: '30',
      value: '30 - Balçova/IZM'
    },
    {
      key: '31',
      value: '31 - Karabağlar/IZM'
    },
    {
      key: '32',
      value: '32 - Kızılay/ANK'
    },
    {
      key: '33',
      value: '33 - Çankaya/ANK'
    },
    {
      key: '34',
      value: '34 - Keçiören/ANK'
    },
    {
      key: '35',
      value: '35 - Bahçelievler/ANK'
    },
    {
      key: '36',
      value: '36 - Etimesgut/ANK'
    },
    {
      key: '37',
      value: '37 - Sincan/ANK'
    },
    {
      key: '38',
      value: '38 - Mamak/ANK'
    },
    {
      key: '39',
      value: '39 - Altındağ/ANK'
    },
    {
      key: '40',
      value: '40 - Yenimahalle/ANK'
    },
    {
      key: '41',
      value: '41 - Pursaklar/ANK'
    },
    {
      key: '42',
      value: '42 - Nilüfer/BRS'
    },
    {
      key: '43',
      value: '43 - Osmangazi/BRS'
    },
    {
      key: '44',
      value: '44 - Yıldırım/BRS'
    },
    {
      key: '45',
      value: '45 - Gürsu/BRS'
    },
    {
      key: '46',
      value: '46 - İnegöl/BRS'
    },
    {
      key: '47',
      value: '47 - Karacabey/BRS'
    },
    {
      key: '48',
      value: '48 - Mustafakemalpaşa/BRS'
    },
    {
      key: '49',
      value: '49 - Gemlik/BRS'
    },
    {
      key: '50',
      value: '50 - Mudanya/BRS'
    },
    {
      key: '51',
      value: '51 - Orhangazi/BRS'
    },
    {
      key: '52',
      value: '52 - Düzce Merkez/DZC'
    },
    {
      key: '53',
      value: '53 - Akçakoca/DZC'
    },
    {
      key: '54',
      value: '54 - Çilimli/DZC'
    },
    {
      key: '55',
      value: '55 - Gölyaka/DZC'
    },
    {
      key: '56',
      value: '56 - Cumayeri/DZC'
    },
    {
      key: '57',
      value: '57 - Kaynaşlı/DZC'
    },
    {
      key: '58',
      value: '58 - Yığılca/DZC'
    },
    {
      key: '59',
      value: '59 - Çukurova/ADN'
    },
    {
      key: '60',
      value: '60 - Seyhan/ADN'
    },
    {
      key: '61',
      value: '61 - Yüreğir/ADN'
    },
    {
      key: '62',
      value: '62 - Sarıçam/ADN'
    },
    {
      key: '63',
      value: '63 - Aladağ/ADN'
    },
    {
      key: '64',
      value: '64 - Karaisalı/ADN'
    },
    {
      key: '65',
      value: '65 - Pozantı/ADN'
    },
    {
      key: '66',
      value: '66 - Ceyhan/ADN'
    },
    {
      key: '67',
      value: '67 - Feke/ADN'
    },
    {
      key: '68',
      value: '68 - İmamoğlu/ADN'
    },
    {
      key: '69',
      value: '69 - İskenderun/HTY'
    },
    {
      key: '70',
      value: '70 - Akhisar/MNS'
    },
    {
      key: '71',
      value: '71 - Manavgat/ANTLY'
    },
    {
      key: '72',
      value: '72 - Milas/MĞL'
    },
    {
      key: '73',
      value: '73 - Gerede/BOLU'
    },
    {
      key: '74',
      value: '74 - Çankırı/ÇNKR'
    },
    {
      key: '75',
      value: '75 - Bilecik/BLCK'
    },
    {
      key: '76',
      value: '76 - Kütahya/KTHY'
    },
    {
      key: '77',
      value: '77 - Elbistan/KMRŞ'
    },
    {
      key: '78',
      value: '78 - Keşan/EDRN'
    },
    {
      key: '79',
      value: '79 - Siverek/ŞNLURF'
    },
    {
      key: '80',
      value: '80 - Çumra/KNY'
    }
  ];
  export default data;