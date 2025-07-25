import { EventDetails, UserProfile } from '@/interface';

export const user: UserProfile = {
  name: '小帥',
  email: 'xiaoshuai@example.com',
  phone: '+886 913 666 777',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  eventsAttended: 12,
  memberSince: '2025年7月',
};

export const mockEventDetails: EventDetails[] = [
  {
    id: '1',
    title: '台北國際音樂節 2025',
    description:
      '一年一度的台北國際音樂節即將盛大開幕！這次活動將邀請來自世界各地的知名音樂家和樂團，為您帶來一場視聽盛宴。活動包括古典音樂、爵士樂、流行音樂等多種風格，適合所有年齡層的音樂愛好者參與。\n\n現場將設有多個舞台，同時進行不同類型的演出，讓您可以根據個人喜好選擇觀賞。此外，還有音樂工作坊、樂器體驗區等互動活動，讓您更深入了解音樂的魅力。',
    date: '2025-02-15',
    time: '19:00',
    endTime: '23:00',
    location: '台北市信義區',
    address: '台北市信義區信義路五段7號',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    organizer: '台北市文化局',
    category: '音樂',
    attendees: 1250,
    maxAttendees: 2000,
    rating: 4.8,
    price: 'NT$ 1,200',
    tags: ['音樂節', '國際', '多元風格', '互動體驗'],
    highlights: [
      '國際知名音樂家演出',
      '多個舞台同時演出',
      '音樂工作坊體驗',
      '專業音響設備',
      '美食攤位',
    ],
    status: 'upcoming',
    qrCode: 'MUSIC2025-USER123-EVENT001',
    reminderSet: true,
    featured: true,
  },
  {
    id: '2',
    title: 'AI 科技展覽會',
    description:
      '探索人工智慧的無限可能！本次展覽會將展示最新的 AI 技術發展，包括機器學習、深度學習、自然語言處理等領域的創新應用。\n\n展覽分為多個主題區域，包括 AI 在醫療、教育、交通、娛樂等各個領域的應用展示。參觀者可以親身體驗各種 AI 產品和服務，了解 AI 如何改變我們的生活。',
    date: '2025-02-20',
    time: '10:00',
    endTime: '18:00',
    location: '南港展覽館',
    address: '台北市南港區經貿二路1號',
    image:
      'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    organizer: '台灣科技協會',
    category: '科技',
    attendees: 850,
    maxAttendees: 1500,
    rating: 4.6,
    price: '免費',
    tags: ['人工智慧', '科技展', '創新', '免費參觀'],
    highlights: [
      'AI 技術現場展示',
      '互動體驗區',
      '專家講座',
      '新創公司展示',
      '網絡交流機會',
    ],
    status: 'completed',
    qrCode: 'TECH2025-USER123-EVENT002',
    reminderSet: false,
  },
  {
    id: '3',
    title: '當代藝術特展',
    description:
      '探索當代藝術的多樣性！本次特展將展示來自世界各地的當代藝術作品，包括繪畫、雕塑、裝置藝術等多種形式。\n\n展覽將邀請知名藝術家和新興藝術家共同參與，並設有互動體驗區，讓參觀者可以親身感受藝術的魅力。活動期間還將舉辦藝術家講座和現場表演，讓您更深入了解當代藝術的發展趨勢。',
    date: '2025-02-25',
    endTime: '17:00',
    time: '14:00',
    location: '台北當代藝術館',
    address: '台北市大同區民權西路181號',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    organizer: '當代藝術協會',
    category: '展覽',
    attendees: 320,
    maxAttendees: 500,
    rating: 4.9,
    price: 'NT$ 350',
    tags: ['藝術', '展覽', '當代藝術'],
    highlights: [
      '當代藝術展覽',
      '多元藝術表演',
      '互動體驗區',
      '美食攤位',
      '專業音響設備',
    ],
    status: 'upcoming',
    qrCode: 'ART2025-USER123-EVENT003',
    reminderSet: true,
  },
  {
    id: '4',
    title: '台灣街頭小吃嘉年華',
    description:
      '一場專屬於吃貨的盛會！台灣街頭小吃嘉年華匯聚了全台各地的經典美味，從蚵仔煎、鹽酥雞到珍珠奶茶，讓您一次吃遍台灣。\n\n活動現場還設有傳統技藝表演、在地文創市集，以及小朋友最愛的親子互動區，是全家出遊的最佳選擇。',
    date: '2025-03-10',
    time: '12:00',
    endTime: '21:00',
    location: '台中市草悟道',
    address: '台中市西區公益路68號',
    image: 'https://images.pexels.com/photos/8845338/pexels-photo-8845338.jpeg',
    organizer: '台中市觀光局',
    category: '美食',
    attendees: 2200,
    maxAttendees: 3000,
    rating: 4.7,
    price: '免費入場',
    tags: ['美食', '在地小吃', '親子活動', '文創市集'],
    highlights: [
      '全台人氣小吃齊聚',
      '傳統技藝表演',
      '文創市集',
      '親子互動遊戲',
      '街頭音樂演出',
    ],
    status: 'upcoming',
    qrCode: 'FOOD2025-USER456-EVENT004',
    reminderSet: true,
    featured: true,
  },
  {
    id: '5',
    title: '春季植栽市集',
    description:
      '春天來了，讓綠意走進生活！植栽市集提供各式各樣的室內外植物、園藝用品與手作花藝。\n\n活動期間將邀請園藝達人進行講座與示範，並提供植栽 DIY 工作坊，適合各年齡層參與。現場也有咖啡餐車與音樂表演，營造出悠閒愜意的逛市集體驗。',
    date: '2025-03-22',
    time: '10:00',
    endTime: '17:00',
    location: '花博公園爭艷館',
    address: '台北市中山區玉門街1號',
    image:
      'https://images.unsplash.com/photo-1654653493120-92e31e6215df?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    organizer: '綠手指工作坊',
    category: '生活',
    attendees: 980,
    maxAttendees: 1200,
    rating: 4.5,
    price: 'NT$ 100',
    tags: ['植栽', '市集', 'DIY', '親子', '綠生活'],
    highlights: [
      '園藝達人講座',
      '植物與花藝展示',
      '手作植栽 DIY',
      '戶外音樂表演',
      '咖啡甜點餐車',
    ],
    status: 'upcoming',
    qrCode: 'PLANT2025-USER789-EVENT005',
    reminderSet: false,
    featured: false,
  },
  {
    id: '6',
    title: '2025 台北動漫博覽會',
    description:
      '動漫迷的年度盛事！本次博覽會將展出來自日本、韓國及本地原創的動漫作品，並邀請知名聲優與繪師現場互動。\n\n會場內設有角色扮演區、商品販售專區、手遊體驗區，以及限量周邊抽獎活動，是熱愛 ACG 的你不能錯過的一場盛會！',
    date: '2025-04-05',
    time: '09:00',
    endTime: '18:00',
    location: '台北世貿一館',
    address: '台北市信義區信義路五段5號',
    image:
      'https://www.ccpa.org.tw/tica/images/ckfinder/2/files/%E3%80%8CROF-MAO%E3%80%8D%E6%96%B0%E8%81%9E%E7%A8%BFKV.jpg',
    organizer: 'ACG動漫協會',
    category: '動漫',
    attendees: 4000,
    maxAttendees: 5000,
    rating: 4.9,
    price: 'NT$ 300',
    tags: ['動漫', '角色扮演', '手遊體驗', '聲優', '限量周邊'],
    highlights: [
      '國際動漫展區',
      '角色扮演大賽',
      '聲優見面會',
      '限量週邊販售',
      '原創漫畫展示',
    ],
    status: 'upcoming',
    qrCode: 'ANIME2025-USER321-EVENT006',
    reminderSet: true,
    featured: true,
  },
  {
    id: '7',
    title: '露天星空電影院：經典重映夜',
    description:
      '在夜晚的草地上與親朋好友共度浪漫時光，本次露天星空電影院將播映多部經典好片，包括《天外奇蹟》、《阿甘正傳》等，並邀請現場樂團演奏電影配樂。\n\n活動設有地墊出租、飲食攤販及拍照打卡區，適合情侶、家庭與朋友一同參加。',
    date: '2025-04-20',
    time: '18:30',
    endTime: '22:30',
    location: '大安森林公園',
    address: '台北市大安區新生南路二段1號',
    image: 'https://images.pexels.com/photos/7991362/pexels-photo-7991362.jpeg',
    organizer: '星空影展協會',
    category: '電影',
    attendees: 950,
    maxAttendees: 1200,
    rating: 4.8,
    price: 'NT$ 150',
    tags: ['戶外電影', '親子活動', '經典影片', '音樂演出'],
    highlights: [
      '經典電影露天播放',
      '星光下的音樂表演',
      '美食與飲品攤販',
      '浪漫拍照區',
      '地墊租借服務',
    ],
    status: 'upcoming',
    qrCode: 'MOVIE2025-USER888-EVENT006',
    reminderSet: true,
    featured: false,
  },
  {
    id: '8',
    title: '陽明山登山健行挑戰日',
    description:
      '喜愛大自然與挑戰自我的你絕對不能錯過！陽明山健行活動將分為初階、中階與高階三條路線，適合不同體能者參加。\n\n活動提供補給站、保險與醫療支援，完賽者可獲得紀念獎牌與證書，並設有摸彩與在地農產品市集。',
    date: '2025-04-28',
    time: '07:00',
    endTime: '13:00',
    location: '陽明山國家公園',
    address: '台北市北投區竹子湖路',
    image: 'https://images.pexels.com/photos/693230/pexels-photo-693230.jpeg',
    organizer: '山林探索協會',
    category: '戶外',
    attendees: 680,
    maxAttendees: 1000,
    rating: 4.7,
    price: 'NT$ 200',
    tags: ['登山', '健行', '自然', '挑戰', '運動健康'],
    highlights: [
      '三段健行路線',
      '完賽獎牌與證書',
      '補給與急救支援',
      '農產品市集',
      '健身推廣講座',
    ],
    status: 'upcoming',
    qrCode: 'HIKING2025-USER777-EVENT007',
    reminderSet: true,
    featured: false,
  },
  {
    id: '9',
    title: '2025 羽球愛好者交流賽',
    description:
      '由社群自發舉辦的羽球友誼賽，歡迎各等級選手報名參加，採分組賽制進行，強調友誼與技術交流。\n\n比賽場地配備完善，設有裁判、計分系統與醫護人員，活動最後將頒發獎盃與紀念品。',
    date: '2025-05-03',
    time: '09:00',
    endTime: '17:00',
    location: '新北市體育館',
    address: '新北市板橋區中山路一段123號',
    image: 'https://images.pexels.com/photos/6311629/pexels-photo-6311629.jpeg',
    organizer: '台灣羽球社群聯盟',
    category: '運動',
    attendees: 150,
    maxAttendees: 200,
    rating: 4.4,
    price: 'NT$ 100',
    tags: ['羽球', '比賽', '交流', '體育活動'],
    highlights: [
      '業餘友誼競賽',
      '獎品與獎盃頒發',
      '完整裁判與計分',
      '技術分享交流',
      '運動飲品補給區',
    ],
    status: 'upcoming',
    qrCode: 'BADMINTON2025-USER123-EVENT008',
    reminderSet: false,
    featured: false,
  },
  {
    id: '10',
    title: '日式陶藝手作體驗工作坊',
    description:
      '透過雙手與陶土對話，體驗日式陶藝的細膩與溫度。本次工作坊將由專業陶藝老師帶領，從拉坏、塑型到釉燒，完整學習傳統技法。\n\n每位學員將製作一件個人專屬陶器，活動包含所有材料與茶點，適合想放鬆心情、體驗慢生活的你。',
    date: '2025-05-10',
    time: '13:00',
    endTime: '16:30',
    location: '台北市文創中心',
    address: '台北市中正區八德路一段20號',
    image: 'https://images.pexels.com/photos/6683539/pexels-photo-6683539.jpeg',
    organizer: '陶心藝坊',
    category: '工作坊',
    attendees: 25,
    maxAttendees: 30,
    rating: 4.9,
    price: 'NT$ 1,500',
    tags: ['手作體驗', '陶藝', '慢生活', '藝術創作'],
    highlights: [
      '專業陶藝師教學',
      '親手完成作品',
      '日式茶點輕食',
      '適合初學者',
      '藝術空間沉浸體驗',
    ],
    status: 'upcoming',
    qrCode: 'POTTERY2025-USER555-EVENT009',
    reminderSet: true,
    featured: true,
  },
  {
    id: '11',
    title: '端午龍舟嘉年華',
    description:
      '每年一度的端午盛事──龍舟嘉年華熱血登場！除了精彩的龍舟競賽，現場還有粽子DIY、民俗表演與文化市集，讓你一次感受節慶氣氛。\n\n活動邀請各地龍舟隊同場競技，並安排親子互動遊戲與傳統舞獅演出，歡迎全家大小一同參與！',
    date: '2025-06-07',
    time: '08:00',
    endTime: '15:30',
    location: '新店碧潭風景區',
    address: '新北市新店區碧潭路55號',
    image:
      'https://www.peoplenews.tw/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBck90IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b4e94eadae1989923601d2dc4bb54b60fa6f8093/51awFCqCYetV5KgehVz2h9qVh77q.jpeg',
    organizer: '新北市政府',
    category: '節慶',
    attendees: 3000,
    maxAttendees: 5000,
    rating: 4.8,
    price: '免費',
    tags: ['節慶活動', '龍舟賽', '端午節', '文化體驗'],
    highlights: [
      '傳統龍舟競賽',
      '粽子製作體驗',
      '民俗藝陣表演',
      '文化市集',
      '舞獅開場秀',
    ],
    status: 'upcoming',
    qrCode: 'DRAGONBOAT2025-USER333-EVENT010',
    reminderSet: true,
    featured: true,
  },
];
