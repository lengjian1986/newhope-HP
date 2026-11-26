export const school = {
  name: 'ニューホープ日本語学校',
  company: '株式会社創智百聯',
  representative: '黄沛議（コウハイギ）',
  established: '2025年8月27日',
  receptionHours: '午前9:30～17:30',
  closedDays: '土日祝',
  englishName: 'New Hope language school',
  address: '大阪府大阪市西成区天神ノ森1丁目12-15',
  phone: '06-7502-6106',
  phoneHref: 'tel:0675026106',
  email: 'newhope.toukatsu@gmail.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('大阪府大阪市西成区天神ノ森1丁目12-15'),
  stations: [
    { line: '阪堺線（路面電車）', station: '聖天坂駅', walk: '徒歩1分' },
    { line: 'Osaka Metro 四ツ橋線', station: '岸里駅', walk: '徒歩約6分' },
    { line: '堺筋線 / 南海本線', station: '天下茶屋駅', walk: '徒歩約10分' },
  ],
}

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`

export const assets = {
  logo: asset('logo.png'), logoFull: asset('logo 01.jpg'),
  hero: asset('YoF81.png'), heroMobile: asset('YoF81.png'), art: asset('xKjRp.png'),
  skyline: asset('skyline-clean.png'), classroom: asset('JXO2A.png'),
  teachers: ['RDxAf.png', 'vgCOz.png', 'o3n0jR.png'].map(asset),
  route: ['t8SrF.png', 'MzKnx.png', 'b8ouMO.png'].map(asset),
}

export const lifeGallery = [
  ['classroom 01.jpg', '本に囲まれた学習スペース', 1381, 1080],
  ['classroom 02.jpg', '明るく開放的な教室', 2176, 969],
  ['classroom 03.jpg', '学びと交流が生まれる教室', 1789, 1080],
  ['classroom 04.png', '自然光が差し込む教室', 1132, 1389],
  ['front 01.jpg', '受付・ラウンジ', 1980, 1080],
  ['entrans 01.png', '校舎の外観', 1448, 1086],
  ['entrans 02.png', '学校のエントランス', 1448, 1086],
].map(([file, caption, width, height]) => ({ src: asset(file), caption, width, height }))

export const communicationGallery = [
  ['01', '仲間と一緒に日本語を学ぶ', 1448, 1086, 'activities', 'center'],
  ['02', '対話を通して、理解を深める', 1448, 1086, 'activities', 'center'],
  ['03', 'それぞれの課題に向き合う時間', 1073, 1465, 'atmosphere', 'center 72%'],
  ['04', '教室の外で、日本の文化に触れる', 1086, 1448, 'activities', 'center 68%'],
  ['05', '自分のペースで学びを深める', 1679, 937, 'atmosphere', 'center'],
  ['06', '言葉を交わしながら学ぶ', 1086, 1448, 'activities', 'center 62%'],
].map(([number, caption, width, height, category, position]) => ({ src: asset(`communication ${number}.png`), caption, width, height, category, position }))

export const navigation = [
  { to: '/about/', label: '学校案内' },
  { to: '/courses/', label: '学習コース' },
  { to: '/admissions/', label: '入学案内' },
  { to: '/life/', label: '学校生活', children: [
    { to: '/life/art/', label: 'アート・文化体験' },
    { to: '/life/atmosphere/', label: '校内の雰囲気' },
    { to: '/life/activities/', label: '交流活動' },
  ] },
  { to: '/news/', label: 'お知らせ' },
]

export const teachers = [
  { role: '日本語担当', focus: '基礎日本語・会話', message: '間違いを恐れず、たくさん話してみましょう。一つひとつの挑戦を応援します。' },
  { role: '進学指導担当', focus: '読解・作文・進路相談', message: '目標を一緒に整理して、あなたらしい進路へ。学習から出願準備まで支えます。' },
  { role: '文化体験担当', focus: '日本文化・コミュニケーション', message: '言葉と文化を、体験を通して楽しく。教室の外にも学びは広がっています。' },
]

export const courses = [
  { slug: 'academic', title: '進学コース', description: '大学・専門学校への進学を目指す方へ。日本語力と進学に必要な力を育てます。', tagline: '日本語を磨き、憧れの進学先へ。', intro: '日本で学びたい。その夢を、具体的な一歩に。', body: '日本語の基礎力から受験に必要な表現力まで。学習と進路指導を組み合わせて、進学をサポートします。', topics: [['学習内容', '総合日本語\n読解・聴解・作文・会話'], ['試験対策', 'JLPT対策\n進学に向けた学習'], ['進路指導', '志望理由書・面接練習\n個別の進路相談']] },
  { slug: 'general', title: '日本語総合コース', description: '基礎から実践まで、読む・書く・聞く・話すをバランスよく。', tagline: '日本語で広がる、日々の可能性。', intro: '基礎から、一歩ずつ。使える日本語へ。', body: '読む・書く・聞く・話すをバランスよく学び、日常のさまざまな場面で使えるコミュニケーション力を育てます。', topics: [['基礎力', '語彙・文法\n読む・書くの基礎'], ['実践力', '会話・聴解\n暮らしのコミュニケーション'], ['学習支援', 'レベルに合わせた学習\n個別の学習相談']] },
  { slug: 'culture', title: '短期・文化体験コース', description: '日本の暮らしや文化に触れながら、楽しく学ぶ。', tagline: '体験から出会う、日本語と日本文化。', intro: '言葉と文化を、楽しみながら。', body: '日本語の学習と文化体験を通して、教室の中でも外でも、日本の暮らしや表現に触れます。', topics: [['日本語', '日常会話\n伝え合う日本語'], ['文化体験', 'アート・書道\n体験からの学び'], ['交流', '仲間との活動\n地域とのふれあい']] },
]

export const news = [
  { slug: 'spring-ceremony', date: '2026.04.08', category: '学校行事', title: '春の入学式を行いました', lead: '新しい仲間を迎えて、新学期が始まりました。\n皆さん、ご入学おめでとうございます。', image: assets.hero, heading: 'ここから始まる、新しい一歩。', body: 'さまざまな国や地域から集まった学生たちが、ニューホープ日本語学校での学びをスタートしました。\n\nこれから日本語の学習や学校生活を通して、一緒にたくさんの経験を重ねていきましょう。\n教職員一同、皆さんの新しい挑戦を応援しています。' },
  { slug: 'admissions-consultation', date: '2026.03.20', category: '入学情報', title: '新年度の入学相談を受け付けています', lead: 'あなたの新しい一歩について、お話ししませんか。', heading: '入学に関するご相談', body: 'コースや学習内容、出願についてのご相談を受け付けています。\n入学時期や必要書類については、お問い合わせページよりご相談ください。' },
  { slug: 'calligraphy', date: '2026.03.10', category: '学校行事', title: '日本文化体験・書道の授業', lead: '文字を書く楽しさから、日本の文化に触れる。', image: assets.art, heading: '言葉を、かたちに。', body: '書道の授業では、一文字ずつ、思いを込めて書く時間を楽しみました。\n創作を通して、日本語の新しい表現に出会います。' },
  { slug: 'student-art', date: '2026.02.25', category: '学校からのお知らせ', title: '学生の作品をご紹介します', lead: 'アートと日本語の学びから生まれた作品。', image: assets.art, heading: '一人ひとりの表現を、大切に。', body: '学生たちが取り組んだアート活動の作品をご紹介します。\n言葉と創作を通じて、伝える喜びを育てます。' },
  { slug: 'school-visit', date: '2026.02.12', category: '学校からのお知らせ', title: '学校見学についてのご案内', lead: '学校の雰囲気を、実際に感じてみませんか。', heading: '見学をご希望の方へ', body: '学校見学は事前のご予約をお願いいたします。\nお問い合わせページから、ご希望やご質問をお知らせください。' },
]
