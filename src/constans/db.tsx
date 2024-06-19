const workListData = [
  {
    title: "사상구청",
    tech: "html5,css3,js,jquery",
    info: "(구) 사상구청 홈페이지, (현) 사상구 패밀리 사이트",
    url: "https://www.sasang.go.kr/health/index.sasang",
    image: "sasang",
    date: 2016,
    work: "디자인,퍼블리싱,웹접근성",
    platform: "반응형",
    note: "패밀리사이트 디자인 참여",
    sideproject: 0,
  },
  {
    title: "어방축제",
    tech: "html5,css3,js,jquery",
    info: "(구) 수영 어방축제 홈페이지",
    url: "http://portfolio-html.sooyadev.com/eobang/main.html",
    image: "eobang",
    date: 2017,
    work: "디자인,퍼블리싱,웹접근성",
    platform: "pc",
    note: "전체 디자인, 퍼블리싱 작업",
    sideproject: 0,
  },
  {
    title: "금정문화재단",
    tech: "html5,css3,js,jquery",
    info: "(구) 금정문화재단 홈페이지",
    url: "http://portfolio-html.sooyadev.com/gfestival/main.html",
    image: "gfestival",
    date: 2017,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "캐처스",
    tech: "html5,css3,js,jquery",
    info: "(구) 캐처스 홈페이지",
    url: "http://portfolio-html.sooyadev.com/catchers/main.html",
    image: "catchers",
    date: 2017,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "부산 청소년활동진흥센터",
    tech: "html5,css3,js,jquery",
    info: "(현) 부산 청소년활동진흥센터 홈페이지",
    url: "http://www.busanyouth.net/main.php",
    image: "busanyouth",
    date: 2018,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "금정구청",
    tech: "html5,css3,js,jquery",
    info: "(현) 금정구청 및 패밀리 사이트",
    url: "https://www.geumjeong.go.kr/index.geumj",
    image: "geumjeong",
    date: 2019,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "수영구청",
    tech: "html5,css3,js,jquery",
    info: "(현) 수영구청 및 패밀리 사이트",
    url: "https://www.suyeong.go.kr/index.suyeong",
    image: "suyeong",
    date: 2019,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "부산영어방송",
    tech: "html5,css3,js,jquery",
    info: "(현) 부산영어방송 홈페이지",
    url: "https://befm.or.kr/main.php",
    image: "befm",
    date: 2019,
    work: "퍼블리싱,웹접근성",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "헬로비전",
    tech: "html5,css3,sass,js,jquery",
    info: "헬로비전 대리점 홈페이지",
    url: "https://portfolio-html.sooyadev.com/hellovision/",
    image: "hellovision",
    date: 2020,
    work: "퍼블리싱",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "나도영업왕",
    tech: "html5,css3,js,jquery",
    info: "나도영업왕 모바일",
    url: "https://portfolio-html.sooyadev.com/iliving/main.html",
    image: "iliving",
    date: 2020,
    work: "퍼블리싱",
    platform: "mobile",
    note: "",
    sideproject: 0,
  },
  {
    title: "미트리",
    tech: "html5,css3,js,jquery,php,mysql",
    info: "(현) 미트리 홈페이지 및 마이오피스",
    url: "https://metree.co.kr",
    image: "metree",
    date: 2020,
    work: "프론트개발",
    platform: "pc,mobile",
    note: "php와 mysql의 경우 유지보수로 참여",
    sideproject: 0,
  },
  {
    title: "마이닭",
    tech: "html5,css3,js,jquery",
    info: "(현) 마이닭 홈페이지",
    url: "https://mydak.co.kr/",
    image: "mydak",
    date: 2021,
    work: "프론트개발",
    platform: "pc,mobile",
    note: "카페24 기반 쇼핑몰",
    sideproject: 0,
  },
  {
    title: "e-book",
    tech: "html5,css3,js",
    info: "(구) 미에르 ebook",
    url: "https://portfolio-html.sooyadev.com/ebook/ebook.html",
    image: "ebook",
    date: 2022,
    work: "프론트개발",
    platform: "반응형",
    note: "",
    sideproject: 0,
  },
  {
    title: "사진 노출 시뮬레이터",
    tech: "html5,css3,js,reactjs,styledcomponents,sass",
    info: "사진 노출 3요소를 시뮬레이션 해 볼 수 있는 웹사이트",
    url: "https://camerasimul.sooyadev.com/",
    image: "camerasimul",
    date: 2024,
    work: "전체개발",
    platform: "모바일우선(반응형)",
    note: "",
    sideproject: 1,
  },
  {
    title: "드라마 시청률 모아보기",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,nodejs,cloudtype,nextjs",
    info: "방송사별 드라마 시청률 순위와 추이를 볼 수 있는 웹사이트",
    url: "https://k-drama-rate.sooyadev.com/",
    image: "drama",
    date: 2023,
    work: "전체개발",
    platform: "모바일우선(반응형)",
    note: "cheerio를 사용해 필요한 데이터를 크롤링하여 구축",
    sideproject: 1,
  },
  {
    title: "실시간 사내복지시스템",
    tech: "html5,css3,js,reactjs,styledcomponents,antd,firebase,redux,sass",
    info: "실시간 데이터베이스를 활용한 사내 복지시스템",
    url: "https://sy-order.web.app/",
    image: "order",
    date: 2021,
    work: "전체개발",
    platform: "반응형",
    note: "현재 미트리 사내 복지 시스템으로 이용중(링크는 샘플사이트)",
    sideproject: 1,
  },
  {
    title: "마이리셀장부",
    tech: "html5,css3,js,reactjs,styledcomponents,antd,firebase,redux,sass,nextjs,pwa",
    info: "리셀러를 위한 장부 웹애플리케이션",
    url: "https://my-resell-3d3fb.web.app/",
    image: "resell",
    date: 2022,
    work: "전체개발",
    platform: "모바일",
    note: "",
    sideproject: 1,
  },
  {
    title: "특수문자 이모티콘",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,pwa,nextjs,redux",
    info: "특수문자 이모티콘을 쉽고 편리하게 사용할 수 있는 웹애플리케이션",
    url: "https://emoticon.sooyadev.com/",
    image: "emoticon",
    date: 2022,
    work: "전체개발",
    platform: "반응형",
    note: "",
    sideproject: 1,
  },
  {
    title: "탄생수계산기",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,pwa,nextjs",
    info: "탄생수 계산을 쉽게 도와주고 그에 따른 특성을 알아 볼 수 있는 웹애플리케이션",
    url: "https://soul-number.sooyadev.com/",
    image: "soul",
    date: 2023,
    work: "전체개발",
    platform: "모바일",
    note: "",
    sideproject: 1,
  },
  {
    title: "투표를합시다",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,antd,firebase,pwa,nextjs,redux",
    info: "실시간 의견 제안과 투표를 할 수 있는 웹애플리케이션",
    url: "https://vote.sooyadev.com/",
    image: "vote",
    date: 2022,
    work: "전체개발",
    platform: "모바일",
    note: "",
    sideproject: 1,
  },
  {
    title: "nback",
    tech: "html5,css3,js,reactjs,sass,antd,firebase,redux",
    info: "두뇌개발에 도움되는 n-back 게임",
    url: "https://n-back-c8156.web.app/",
    image: "nback",
    date: 2022,
    work: "전체개발",
    platform: "모바일",
    note: "",
    sideproject: 1,
  },
  {
    title: "시로 알아보는 ai운세",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,pwa,nextjs,openai,redux",
    info: "오늘의 운세를 ai를 통해서 시로 만들어주는 웹서비스",
    url: "https://poem.sooyadev.com/",
    image: "aipoem",
    date: 2023,
    work: "전체개발",
    platform: "모바일",
    note: "",
    sideproject: 1,
  },
  {
    title: "실시간 타이핑 게임",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,nextjs,redux",
    info: "실시간 멀티 타자게임",
    url: "https://typing.sooyadev.com/",
    image: "typing",
    date: 2022,
    work: "전체개발",
    platform: "모바일우선(반응형)",
    note: "",
    sideproject: 1,
  },
  {
    title: "그룹웨어",
    tech: "html5,css3,js,reactjs,styledcomponents,sass,chakraui,firebase,nextjs,redux,php,mysql",
    info: "회사 업무 및 직원관리를 위한 그룹웨어",
    url: "https://sy-groupware-sample.web.app/",
    image: "groupware",
    date: 2023,
    work: "전체개발",
    platform: "반응형",
    note: "실제 회사 그룹웨어로 사용한 프로젝트.(링크는 샘플사이트)",
    sideproject: 1,
  },
];

const techData = {
  typeList: [
    "Markup",
    "Style",
    "Language(Framework, Library)",
    "Backend",
    "State Library",
    "Etc",
  ],
  list: [
    { name: "html5", exIcon: 0, type: "Markup" },
    { name: "css3", exIcon: 0, type: "Style" },
    { name: "sass", exIcon: 0, type: "Style" },
    { name: "styledcomponents", exIcon: 1, type: "Style" },
    { name: "antd", exIcon: 0, type: "Style" },
    { name: "chakraui", exIcon: 0, type: "Style" },
    { name: "js", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "typescript", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "php", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "nextjs", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "jquery", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "reactjs", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "vitejs", exIcon: 0, type: "Language(Framework, Library)" },
    { name: "firebase", exIcon: 0, type: "Backend" },
    { name: "mysql", exIcon: 0, type: "Backend" },
    { name: "cloudtype", exIcon: 1, type: "Backend" },
    { name: "redux", exIcon: 0, type: "State Library" },
    { name: "reactquery", exIcon: 0, type: "State Library" },
    { name: "zustand", exIcon: 1, type: "State Library" },
    { name: "nodejs", exIcon: 0, type: "Etc" },
    { name: "pwa", exIcon: 0, type: "Etc" },
    { name: "socketio", exIcon: 1, type: "Etc" },
    { name: "openai", exIcon: 0, type: "Etc" },
  ],
};

export { workListData, techData };