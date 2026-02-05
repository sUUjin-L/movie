import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Utensils, Play, ExternalLink, ChevronRight, Star, Plus, ChevronLeft, Map as MapIcon, Navigation, Heart, Share2, Copy, Check, Search } from 'lucide-react';


const WISH_STORAGE_KEY = 'k-drama-hunters-wishlist';


const DramaTravelGuide = () => {
 const [view, setView] = useState('home'); // 'home' or 'detail'
 const [selectedDrama, setSelectedDrama] = useState('Tangerines');
 const [activeScene, setActiveScene] = useState(0);
 const [mapQuery, setMapQuery] = useState("");
 const [selectedPin, setSelectedPin] = useState("main");
 const [wishedIds, setWishedIds] = useState(() => {
   try {
     const saved = localStorage.getItem(WISH_STORAGE_KEY);
     return saved ? JSON.parse(saved) : [];
   } catch {
     return [];
   }
 });
 const [heroSlideIndex, setHeroSlideIndex] = useState(0);
 const [shareOpen, setShareOpen] = useState(false);
 const [copied, setCopied] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchFocused, setSearchFocused] = useState(false);
 const shareRef = useRef(null);
 const searchRef = useRef(null);

 useEffect(() => {
   const handleClickOutside = (e) => {
     if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
     if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
   };
   document.addEventListener('click', handleClickOutside);
   return () => document.removeEventListener('click', handleClickOutside);
 }, []);

 const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
 const shareTitle = 'K Drama Hunters - 드라마 촬영지 여행 가이드';

 const copyUrl = async () => {
   try {
     await navigator.clipboard.writeText(shareUrl);
     setCopied(true);
     setTimeout(() => setCopied(false), 2000);
   } catch (_) {}
 };

 const shareLinks = {
   kakao: `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`,
   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
   twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
 };

 const getLocationHashtags = (location) => {
   if (!location) return [];
   const region = location.region.replace(/\s+/g, '');
   const fromName = location.name.replace(/\s+/g, '').replace(/[&()]/g, '').slice(0, 12);
   const base = [region, `${region}여행`, '드라마촬영지'];
   const list = [...new Set([...base, fromName])].filter(Boolean);
   return list.slice(0, 5);
 };

 const getInstagramTagUrl = (tag) => {
   const safe = String(tag).replace(/[#\/?&]/g, '').trim() || '드라마촬영지';
   return `https://www.instagram.com/explore/tags/${safe}/`;
 };

 const getSearchUrl = (query) => `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
 const getYoutubeLink = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;
 const getThumbnail = (videoId, quality = 'maxresdefault') => `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
 const getGoogleMapEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;


 // 드라마별 포스터 및 메타 정보
 const mediaList = [
   {
     id: 'Tangerines',
     title: "폭싹 속았수다",
     image: "https://i.namu.wiki/i/tK4cyqSdVu72gTd8k806oD-e1QZ4WIqpx0a03V4l0qYbkAUGfsOfodCATTVaazwcdyU2UOyrdciMKlyZSNO0UBm6piqJrLwYQdY8SatlQMY6Dbk3zPEZCvQyukQbeVKoS_4gUQ6FRw6RNCmKpWuJOg.webp",
     type: "Netflix 시리즈",
     functional: true,
     cast: "아이유(이지은), 박보검",
     genre: "시대극, 로맨스",
     tone: "찬란한, 요망진"
   },
   {
     id: 'goblin',
     title: "도깨비",
     image: "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDZfMTM0/MDAxNjE1MDA4ODY3NzY0.8kNnKk4v3jT0pblt4ykZx1YrT3rLp7booyGsBtE39vgg.Q369LsIDofXrhe9QcyMlop0ouoSE7NGL0XwbHZaHPXYg.JPEG.kgwst0320/1_%EF%BC%881%EF%BC%89.jpg?type=w800",
     type: "tvN 드라마",
     functional: true,
     cast: "공유, 김고은, 이동욱",
     genre: "판타지, 로맨스",
     tone: "쓸쓸하고 찬란한"
   },
   {
     id: 'if-we',
     title: "만약에 우리",
     image: "https://i.namu.wiki/i/IvLzRrX-DS877M7tJiayBTPZOcfSkVaxW3SUdyq85PoHi5jXfpBfIbu1Ktgm3t4VtEDEUPEQtUUjj8huOCjUX4YViKdGqZtdyHqag--B1BVlehjPm16TL0cUX7DTCp8j456RcOYUzESjfC2_4OCs0w.webp",
     type: "영화",
     functional: true,
     cast: "구교환, 문가영",
     genre: "로맨스, 드라마",
     tone: "아련한, 서정적인"
   },
   {
     id: 'single-inferno',
     title: "솔로지옥 5",
     image: "https://i.namu.wiki/i/a1s7X96x7Au03cA_RBXe7N6GWEArKt9eANM53RDIwrjyzeQZmE0pvNtwTKlpg8znWdtU3DZ6tjWUMOZHiDguSCxA3IgbClFN9D6ucVnUJ6YyFUJObeI4UZ6N_G4PVq224nCKywwtjl62lVR-hoYD7A.webp",
     type: "Netflix 예능",
     functional: true,
     cast: "홍진경, 이다희, 규현, 한해, 덱스",
     genre: "연애 리얼리티",
     tone: "도파민, 뜨거운"
   },
   {
     id: 'demon-hunters',
     title: "케이팝 데몬 헌터스",
     image: "https://i.namu.wiki/i/zss1DIbAfeBL3lDlni55jnXxqZqGmH4_LJRMrwu2ehktXwIdIkDMe-EPXEVu3XSzJefkpwFJ5NgYTkB7N8NGIgzcWzLRX2NzPv4WX6ARq5qkOreUQBH52mSpueinyqXfklrfLSIC47SOoW63kA08Zw.webp",
     type: "Netflix 오리지널",
     functional: true,
     cast: "가온, 루시, 카이",
     genre: "판타지, 액션, 아이돌",
     tone: "화려한, 긴박한"
   }
 ];


 // 드라마별 장면 데이터
 const scenesData = {
   'Tangerines': [
     {
       title: "유채꽃밭 속의 찬란한 약속",
       videoId: "Blo4eXzQbEI",
       location: { region: "고창", name: "전북 고창 학원농장", address: "전라북도 고창군 공음면 학원농장길 154", desc: "제주도를 배경으로 하지만 드넓은 꽃밭 연출을 위해 고창에서 촬영된 명장면입니다.", url: getSearchUrl("고창 학원농장"), image: "https://cdn.imweb.me/upload/S20220630380b5f7627ccc/2b9069cb367aa.jpeg" },
       restaurants: [
         { name: "수복회관", menu: "삼겹살", desc: "파인애플과 함께 즐기는 난로삼겹살 맛집.", url: getSearchUrl("고창 수복회관"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl6uPhX8v-SHQCr2K7a9ZSemvFGJw4EoMWWg&s" },
         { name: "본가", menu: "바지락 비빔밥", desc: "매콤새콤한 양념과 싱싱한 바지락의 조화.", url: getSearchUrl("고창 본가 바지락비빔밥"), image: "https://cdn.welfarehello.com/naver-blog/production/topgochang/2024-04/223416535495/topgochang_223416535495_18.jpg?f=webp&q=80&w=800" },
         { name: "나래궁", menu: "짬짜면", desc: "고창에서만 맛볼 수 있는 특별한 비빔 짬짜면.", url: getSearchUrl("고창 나래궁"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lzG-3QnCEE-mHal2Tl_yEKUeq7-YRU7xgw&s" }
       ],
       attractions: [
         { name: "고창 고인돌 유적", desc: "유네스코 세계문화유산인 역사 산책로.", url: getSearchUrl("고창 고인돌 유적"), image: "https://www.gochang.go.kr/tour/usr/images/contents/7treasure/dolmen/01.jpg" },
         { name: "고창읍성", desc: "답성놀이로 유명한 조선시대 성곽.", url: getSearchUrl("고창읍성"), image: "https://tour.jb.go.kr/attachfiles/ctnt/20250801/20250801175655611.jpg" },
         { name: "선운사", desc: "사계절이 아름다운 천년 고찰.", url: getSearchUrl("고창 선운사"), image: "https://cdn.ardentnews.co.kr/news/photo/202510/8083_38344_1245.jpg" }
       ]
     },
     {
       title: "성산의 푸른 바다와 마을 풍경",
       videoId: "UtfqWDlVOZY",
       location: { region: "제주", name: "성산 일출봉 & 섭지코지", address: "제주 서귀포시 성산읍 일출로 284-12", desc: "주인공들의 어린 시절과 옛 제주 마을의 정취를 담은 대표 촬영지입니다.", url: getSearchUrl("성산 일출봉"), image: "https://api.cdn.visitjeju.net/photomng/imgpath/202409/19/3588ff67-3597-4bc7-a905-ed129cb6e5a2.webp" },
       restaurants: [
         { name: "로컬크랩", menu: "보일링시푸드", desc: "이국적인 해산물 요리.", url: getSearchUrl("제주 로컬크랩"), image: "https://cdn.ksilbo.co.kr/news/photo/201812/674765_349961_1622.jpg" },
         { name: "맛나식당", menu: "섞어조림", desc: "제주에서 손꼽히는 가성비 최고의 조림 맛집.", url: getSearchUrl("제주 맛나식당"), image: "https://mblogthumb-phinf.pstatic.net/MjAyMjAzMTZfMTE1/MDAxNjQ3NDMyMzQxMTYy.cZUOAPq0oZCrVGG26OOn6qaEjN1OCMbPc3qxBkZi5vUg.x6_l46S0r8_MZiuielyOwk-B0YmapbKzAU8iy4MDTZEg.PNG.kizaki56/00.png?type=w800" },
         { name: "가시아방국수", menu: "고기국수", desc: "두툼한 돔베고기가 올라간 제주 정통 국수.", url: getSearchUrl("제주 가시아방국수"), image: "https://api.cdn.visitjeju.net/photomng/imgpath/201804/30/a6d766c6-e4f9-463f-a148-31906a8c93dd.webp" }
       ],
       attractions: [
         { name: "우도", desc: "성산항에서 배로 15분, 섬 속의 아름다운 섬.", url: getSearchUrl("제주 우도 여행"), image: "https://www.ktsketch.co.kr/news/photo/201905/3745_12341_529.jpg" },
         { name: "광치기해변", desc: "일출봉을 배경으로 인생샷을 남기는 해변.", url: getSearchUrl("제주 광치기해변"), image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/6c/cf/e9/seogwipo.jpg?w=900&h=-1&s=1" },
         { name: "빛의 벙커", desc: "몰입형 미디어 아트를 즐길 수 있는 전시 공간.", url: getSearchUrl("제주 빛의 벙커"), image: "https://monthlyart.com/wp-content/uploads/2021/01/%ED%83%91%EB%B7%B0-%EC%BD%98%ED%85%90%EC%B8%A0-800x600.png" }
       ]
     },
     {
       title: "낭만 가득한 이국적 야자수 길",
       videoId: "H6Opo-Asphc",
       location: { region: "서귀포", name: "보목동 칠십리로", address: "제주 서귀포시 보목동 1480-10 일대", desc: "야자수들이 늘어선 이국적인 길로 드라이브 코스로 인기가 높습니다.", url: getSearchUrl("서귀포 야자수길"), image: "https://cdn.latimes.kr/news/photo/202309/50883_61934_3720.png" },
       restaurants: [
         { name: "어진이네횟집", menu: "자리물회", desc: "보목포구 앞에서 즐기는 시원한 현지인 별미.", url: getSearchUrl("서귀포 어진이네횟집"), image: "https://d12zq4w4guyljn.cloudfront.net/750_750_20240208024711_photo1_d7d350b5f7fd.webp" },
         { name: "삼보식당", menu: "해물뚝배기", desc: "수요미식회에 소개된 깊은 맛의 해물 뚝배기.", url: getSearchUrl("서귀포 삼보식당"), image: "https://tong.visitkorea.or.kr/cms/resource/63/2800363_image2_1.jpg" },
         { name: "쌍둥이횟집", menu: "모듬회", desc: "다양한 스끼다시로 유명한 서귀포 랜드마크.", url: getSearchUrl("서귀포 쌍둥이횟집"), image: "https://cdn.jejuwapeople.com/news/photo/202207/1680_1610_439.jpg" }
       ],
       attractions: [
         { name: "쇠소깍", desc: "민물과 바닷물이 만나는 비경 속 테우 체험.", url: getSearchUrl("제주 쇠소깍"), image: "https://www.telltrip.com/wp-content/uploads/2025/09/soesokkak-jeju-guide4.webp" },
         { name: "정방폭포", desc: "바다로 직접 떨어지는 동양 유일의 해안 폭포.", url: getSearchUrl("서귀포 정방폭포"), image: "https://mblogthumb-phinf.pstatic.net/MjAyMTExMDRfMTg3/MDAxNjM1OTk0MDA0Mzk2.sqO96OpkzhIb0zFjkBIUesj-Tqy_uuh5-HT8Y1SkEQkg.PWMuu2CR52WtmzLfLPKkvnGzHlReO8E4pExnXFjlw_Ug.JPEG.wlsgml850/SE-1079ad43-6d11-4c1b-b7a3-b59251418388.jpg?type=w800" },
         { name: "서귀포 매일올레시장", desc: "먹거리와 볼거리가 가득한 서귀포 최대 시장.", url: getSearchUrl("서귀포 매일올레시장"), image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/83/1b/be/caption.jpg?w=900&h=500&s=1" }
       ]
     }
   ],
   'goblin': [
     {
       title: "운명적인 첫 소환, 그 바닷가",
       videoId: "mCeMgl6rR-U",
       location: { region: "강릉", name: "강릉 주문진 방파제", address: "강원도 강릉시 주문진읍 교항리 81-151", desc: "지은탁이 김신을 처음 소환했던 전설적인 장소입니다.", url: getSearchUrl("주문진 도깨비 촬영지"), image: "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDZfMTM0/MDAxNjE1MDA4ODY3NzY0.8kNnKk4v3jT0pblt4ykZx1YrT3rLp7booyGsBtE39vgg.Q369LsIDofXrhe9QcyMlop0ouoSE7NGL0XwbHZaHPXYg.JPEG.kgwst0320/1_%EF%BC%881%EF%BC%89.jpg?type=w800" },
       restaurants: [
         { name: "동화가든", menu: "짬뽕순두부", desc: "얼큰하고 고소한 초당순두부의 명소.", url: getSearchUrl("강릉 동화가든"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250925_112%2F1758792854931pK9uj_JPEG%2FGJF03041-1.jpg" },
         { name: "엄지네포장마차", menu: "꼬막비빔밥", desc: "감칠맛 가득한 강릉의 명물.", url: getSearchUrl("강릉 엄지네포장마차"), image: "https://d12zq4w4guyljn.cloudfront.net/300_300_20250804043131_photo1_b3250d0fb741.webp" },
         { name: "테라로사 커피공장", menu: "핸드드립", desc: "커피 성지라 불리는 대규모 카페 공간.", url: getSearchUrl("강릉 테라로사"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200422_278%2F1587531042172TgXbr_JPEG%2FV-ta0vOWwlwKQkmnI-B9s7ja.jpg" }
       ],
       attractions: [
         { name: "강릉 카페거리", desc: "안목해변을 따라 늘어선 카페 투어.", url: getSearchUrl("강릉 안목해변 카페거리"), image: "https://i.namu.wiki/i/vmRT2AVevrRFsS0E9UxKxe3zy9VyFwlpZjwA8-TNnC9lEvC-LwEcuj1r11ssZA_cfi9nn3Fec_A0ylsH97tXlg.bmp" },
         { name: "하슬라아트월드", desc: "바다를 품은 복합 예술 공간.", url: getSearchUrl("강릉 하슬라아트월드"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220929_216%2F1664420840128aJkuD_JPEG%2F%25C7%25CF%25BD%25BD%25B6%25F3%25C0%25FC%25B0%25E6_%25B5%25E5%25B7%25D0%25C1%25A4%25B8%25E9.jpg" },
         { name: "BTS 버스정류장", desc: "앨범 자켓 촬영지로 팬들이 찾는 명소.", url: getSearchUrl("주문진 BTS 버스정류장"), image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMTZfMTY3%2FMDAxNjM0MzEyMDMxODg3.cmbHbNx_6DBCCUgNMpq-8P3bOppedgUF2oXT5wJ98scg.nvhJxZlBHTezBjNLwRECQxDcO9SU8re-cRi_hVuzUJ0g.JPEG.ping746%2F001-20211015.JPG&type=a340" }
       ]
     },
     {
       title: "천 년의 기다림, 설원의 고백",
       videoId: "fQluA3RJWgA",
       location: { region: "평창", name: "오대산 월정사 전나무 숲길", address: "강원도 평창군 진부면 오대산로 374-8", desc: "눈 쌓인 숲길에서 사랑을 고백하던 낭만적인 장소입니다.", url: getSearchUrl("오대산 월정사 전나무숲길"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRVS-Ow85FMUMp9zwFV496HZNf9lzF0aG3A&s" },
       restaurants: [
         { name: "부일식당", menu: "산채비빔밥", desc: "50년 전통의 건강한 산채 정식.", url: getSearchUrl("평창 부일식당"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAxMTdfMTQ3%2FMDAxNzY4NjIxMTMxOTE4.njrBd-46Ofn5D15aTxA0dzPx9Uns4g4mBpW-Clbz88Eg.BBr6pExbaUVoYmtZUfuqYtpn3747A1UUyBHrw6c7YS4g.JPEG%2F2A9E4A5E-374E-46EE-A72B-CFDEA721B3D8.jpeg%3Ftype%3Dw1500_60_sharpen" },
         { name: "황태회관", menu: "황태구이", desc: "대관령 덕장의 깊은 맛을 담은 요리.", url: getSearchUrl("평창 황태회관"), image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMjlfMjIy%2FMDAxNzY3MDA0NjM5OTc5.k3czG_fsgKYyYibtGde0uGnuPyG7qPjK7Q4wnnqmMjkg.Lalh5Fz2ZFEA7c-bbtQukglYWgfluLmtF8sx58_E2Tgg.JPEG%2FKakaoTalk_20251229_193457948_09.jpg" },
         { name: "진태원", menu: "탕수육", desc: "독특한 식감으로 평창에서 유명한 중식당.", url: getSearchUrl("평창 진태원"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAxMjdfMjc0%2FMDAxNzY5NDk3NTU0OTg3.Jvq7c4kvXMQAMSmFouq1gzqWIcV-U6NfXsgPosffmUcg.qlOK68FFhOpy8CF0vZRodS85_s7UiMdXeqHxtNyymx8g.JPEG%2FAB6E4D7F-6EED-4C5D-9583-7FF7A55ED35A.jpeg%3Ftype%3Dw1500_60_sharpen" }
       ],
       attractions: [
         { name: "대관령 양떼목장", desc: "초원과 양 떼가 어우러진 목가적 풍경.", url: getSearchUrl("대관령 양떼목장"), image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MDFfMTY0%2FMDAxNzQ4NzM0NjIzNTgz.409_i6AQhV8aRt57K9seHQ09aiFbYcwbJkkJ2pawK9Ig.SdWXBGEcdAudAlpbmHMoM54GxqlWzuA1rVoBc_yWZRIg.JPEG%2F_MG_8348.jpg&type=sc960_832" },
         { name: "안반데기", desc: "은하수가 쏟아지는 고랭지 마을.", url: getSearchUrl("강릉 안반데기"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqjg8oT9d_PaddBRIWRbcgzxOlAPnXuN4bQ&s" },
         { name: "발왕산 케이블카", desc: "백두대간의 절경을 한눈에 담는 코스.", url: getSearchUrl("용평리조트 발왕산 케이블카"), image: "https://blog-static.kkday.com/ko/blog/wp-content/uploads/gangwon_pyeongchang_cablecar_skywalk_3.jpg" }
       ]
     },
     {
       title: "노란 책방 골목의 위로",
       videoId: "_N38SRKvrUU",
       location: { region: "인천", name: "인천 배다리 헌책방 골목 (한미서점)", address: "인천광역시 동구 금곡로 9", desc: "도깨비가 지은탁의 머리를 쓰다듬어 주던 따뜻한 장면의 배경입니다.", url: getSearchUrl("배다리 한미서점"), image: "https://newsimg.hankookilbo.com/2017/01/23/201701230995625668_2.jpg" },
       restaurants: [
         { name: "신포닭강정", menu: "원조 닭강정", desc: "중독성 강한 매콤달콤한 소스의 원조.", url: getSearchUrl("인천 신포닭강정"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231027_237%2F16983900226341fTtv_JPEG%2F_DSC2538.jpg" },
         { name: "공화춘", menu: "자장면", desc: "자장면의 발상지에서 맛보는 깊은 춘장의 맛.", url: getSearchUrl("인천 차이나타운 공화춘"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAyMDFfMjc2%2FMDAxNzY5OTE0Mjk5OTM4.CYQPCGV-17cFZiUXj2Vr0_G8EwyHFhnpISMC1XlymI0g.hWFuCw36j4pVL9tuuFAsuvZIFnGL9YZVgeVhOPIvgHMg.JPEG%2F20260201_113505.jpg.jpg%3Ftype%3Dw1500_60_sharpen" },
         { name: "잉글랜드 왕돈까스", menu: "경양식 돈까스", desc: "레트로 감성이 가득한 경양식 돈까스.", url: getSearchUrl("인천 잉글랜드 왕돈까스"), image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fblogfiles.pstatic.net%2FMjAyNTA3MTVfMjQ2%2FMDAxNzUyNTU0MTg5MzU1.FhXR7B6CV_v4hDFAIo3EcIVjibCZRmd6zVwoU1OEBSgg.u2rATo5--YRuQnk9kNHr2baZfgGuRY-spnTfVtRXPhsg.JPEG%2Foutput%EF%BC%BF3612068539.jpg%2F900x1200" }
       ],
       attractions: [
         { name: "인천 차이나타운", desc: "한국 속의 작은 중국, 화려한 건물들.", url: getSearchUrl("인천 차이나타운"), image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=f7853db9-ac17-488f-8905-6f2b955e45bb" },
         { name: "송월동 동화마을", desc: "벽화가 가득한 알록달록한 마을.", url: getSearchUrl("송월동 동화마을"), image: "https://www.koreaetour.com/wp-content/uploads/2019/05/%EC%86%A1%EC%9B%94%EB%8F%99%EB%8F%99%ED%99%94%EB%A7%88%EC%9D%84.jpg" },
         { name: "개항장 거리", desc: "근대 건축물이 보존된 아날로그 감성 거리.", url: getSearchUrl("인천 개항장 거리"), image: "https://www.ito.or.kr/images/bbs/galleryko/2023/middle/gaehangjanggeori_(1).jpg" }
       ]
     },
     {
       title: "대파 런웨이",
       videoId: "5RzyLCkLhz8",
       location: {
         region: "서울",
         name: "신촌 그래피티 터널 (토끼굴)",
         address: "서울 서대문구 신촌역로 22-55",
         desc: "도깨비와 저승사자가 대파를 사 들고 런웨이 모델처럼 비장하게 걷던 코믹 명장면의 촬영지입니다. 어두운 터널 속 그래피티가 힙한 분위기를 자아냅니다.",
         url: getSearchUrl("신촌 토끼굴 도깨비 촬영지"),
         image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=8cb4f9a7-2f33-4426-bf5f-aa635d878fd0"
       },
       restaurants: [
         {
           name: "정육면체",
           menu: "깨부수면 & 우육면",
           desc: "미쉐린 가이드 빕 구르망에 선정된 면 요리 전문점으로, 고소한 깨부수면이 일품입니다.",
           url: getSearchUrl("신촌 정육면체"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240505_67%2F1714917171502UYWBA_JPEG%2FKakaoTalk_20240404_043844551_03.jpg"
         },
         {
           name: "신촌칼",
           menu: "양식",
           desc: "부드러운 수비드 스테이크와 함께 사랑하는 사람과 행복한 시간을 보낼 수 있습니다.",
           url: "https://naver.me/FV7Ygjut",
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20250422_6%2F1745250580146ESdaa_PNG%2F%25BD%25BA%25C5%25D7%25C0%25CC%25C5%25A9.png"
         },
         {
           name: "신촌수제비",
           menu: "수제비",
           desc: "30년 넘게 자리를 지켜온 신촌의 터줏대감으로, 저렴한 가격에 깊은 맛을 자랑합니다.",
           url: getSearchUrl("신촌 수제비"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAxMjNfMjU1%2FMDAxNzY5MTA4ODMwMTIy.hkwNLT_DZc6DQYDgPxeTjlxdlMID4PyYmoInfUxT3u4g.vhyEjjoOZORZ8nT-PAzjmcdfVdFEhtObM_7CLQUtRhQg.JPEG%2F1000058359.jpg.jpg%3Ftype%3Dw1500_60_sharpen"
         }
       ],
       attractions: [
         {
           name: "연세대학교 캠퍼스",
           desc: "담쟁이덩굴로 뒤덮인 고풍스러운 건물들이 아름다워 산책과 사진 촬영에 최적입니다.",
           url: getSearchUrl("연세대학교 캠퍼스"),
           image: "https://www.yonsei.ac.kr/sites/sc/images/sub/img-cam-guide1.jpg"
         },
         {
           name: "경의선 책거리",
           desc: "폐철길을 따라 조성된 문화 산책로로, 다양한 책방과 예술 작품을 만날 수 있습니다.",
           url: getSearchUrl("경의선 책거리"),
           image: "https://img.hankyung.com/photo/201610/AB.12749450.1.jpg"
         },
         {
           name: "신촌 유플렉스 & 명물거리",
           desc: "젊음의 활기가 넘치는 거리로, 버스킹 공연과 다양한 쇼핑을 즐길 수 있는 핫플레이스입니다.",
           url: getSearchUrl("신촌 명물거리"),
           image: "https://t1.daumcdn.net/cfile/tistory/230DEA41547B016D06"
         }
       ]
     }
   ],
   'if-we': [
     {
       title: "이야기가 시작되는 곳, 지족마을",
       videoId: "J_RddSZnATU",
       location: {
         region: "남해",
         name: "남해 지족마을",
         address: "경남 남해군 삼동면 지족리",
         desc: "영화 속 은호의 고향의 실제 모델이 된 곳입니다. 고요하고 서정적인 남해 바닷가 마을의 정취가 그대로 묻어나는 이 곳은 은호와 정원의 시간이 가장 많이 겹쳐지는 공간으로, 영화의 따뜻하면서도 아련한 분위기를 완성했습니다.",
         url: getSearchUrl("남해 지족마을"),
         image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqZCSCCCMq2W8-UsaLHKG_eLE6CD1peSG-l9y55Cvms-vo5JM6UgFuoJq_shbLZ021-B9AdgdI4g8lj4aTrqF1lNn4gMAEo8XEdn5l9Qm_ByH2MkKCsG8CdLb5OIT2Mc2gjLho-=s1360-w1360-h1020-rw"
       },
       restaurants: [
         {
           name: "지족반점 (은호식당)",
           menu: "짜장면 & 탕수육",
           desc: "영화 촬영지 그 자체. 소박한 동네 중국집이지만, 영화의 여운을 느끼며 먹는 짜장면 한 그릇은 특별한 맛을 선사합니다.",
           url: getSearchUrl("남해 지족반점"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTExMDlfMTc0%2FMDAxNzYyNjg5NTI4ODQ2.Az6LJ8SPHVTl7VpzxfWOHvXtXmJrn4oRz_V21wluQIQg.vRJJaHC0c3ELZ1rRV_csA7z2henxi3hOrkPs-4F2Xrog.JPEG%2F395AB149-F816-419D-8C49-FCE635CA56C0.jpeg%3Ftype%3Dw1500_60_sharpen"
         },
         {
           name: "우리식당",
           menu: "멸치쌈밥",
           desc: "지족마을 인근의 남해 향토음식 전문점. 남해 특색인 멸치와 쌈의 조화가 일품입니다.",
           url: getSearchUrl("남해 우리식당"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_245%2F1441008215631BYS6w_JPEG%2F12053896_0.jpg"
         },
         {
           name: "다길김밥",
           menu: "참치샐러드김밥",
           desc: "다길김밥은 다양한 종류의 푸짐한 김밥과 건강한 맛을 자랑하는 맛집입니다.",
           url: getSearchUrl("다길김밥"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMzBfMTMg%2FMDAxNzY3MDg5MTI4ODM5.AEBfl_dtxZ_Cs1I2n-SLcKYKMNGWIoU0xy3jAYQUpKEg.uBSR7B5mzJcbv0hyBX_gi43AKpFeW8oUjUOetDEqg8Eg.JPEG%2FIMG_1960.JPG"
         }
       ],
       attractions: [
         {
           name: "지족마을 골목길",
           desc: "영화 속 두 주인공이 거닐던 소박한 골목. 낮은 돌담과 바다가 어우러진 풍경이 산책하기 좋습니다.",
           url: getSearchUrl("남해 지족구거리"),
           image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MDlfMTA4/MDAxNjU0NzUxMDkxNTA1.ZeEu-LWDO4e1Rm43hWSpoK8XY33QEllJz0W5AWVT3dAg.zN-9NZ4mRIExeO1GsmaK0NUwWdtTYmVDbKtuztWv8XYg.JPEG.namhae_gun/SE-8d3759b2-251d-4c92-b79e-0ace1d3440de.jpg?type=w800"
         },
         {
           name: "창선교",
           desc: "지족해협을 가로지르는 붉은 다리. 다리 위에서 내려다보는 죽방렴의 풍경이 장관입니다.",
           url: getSearchUrl("남해 창선교"),
           image: "https://cdn.idomin.com/news/photo/201301/403504_308595_4015.jpg"
         },
         {
           name: "남해 독일마을",
           desc: "차로 15분 거리에 있는 이국적인 마을. 붉은 지붕과 남해 바다가 어우러져 인생샷 명소로 꼽힙니다.",
           url: getSearchUrl("남해 독일마을"),
           image: "https://flexible.img.hani.co.kr/flexible/normal/970/554/imgdb/original/2024/0507/20240507502806.jpg"
         }
       ]
     },
     {
       title: "복잡한 감정의 교차로, 동호대교",
       videoId: "6FiUjgp1LfY",
       location: {
         region: "서울",
         name: "서울 동호대교",
         address: "서울특별시 성동구 옥수동 ~ 강남구 압구정동",
         desc: "정원이 버스를 타고 집으로 돌아가는 장면의 배경으로 등장합니다. 한강 위를 가로지르는 전철과 차량들의 불빛 속에서, 흔들리는 정원의 내면을 대변하듯 화려하면서도 쓸쓸한 서울의 야경이 펼쳐집니다.",
         url: getSearchUrl("동호대교 야경"),
         image: "https://image.utoimage.com/preview/cp872655/2019/10/201910012038_500.jpg"
       },
       restaurants: [
         {
           name: "옥수동화덕피자",
           menu: "비스마르크 피자",
           desc: "동호대교 북단 옥수동의 찐맛집. 쫄깃한 도우와 신선한 재료가 어우러진 화덕피자가 일품입니다.",
           url: getSearchUrl("옥수동 화덕피자"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250516_268%2F1747385077909ijEe0_JPEG%2FKakaoTalk_20250515_211648829.jpg"
         },
         {
           name: "압구정공주떡",
           menu: "흑임자 인절미",
           desc: "동호대교 남단 압구정의 명물. 입안 가득 퍼지는 고소한 흑임자 인절미는 선물용으로도 최고입니다.",
           url: getSearchUrl("압구정 공주떡"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250811_123%2F1754896547125MYwhv_JPEG%2F%25BE%25D0%25B1%25B8%25C1%25A4%25BC%25DB%25C6%25ED%25BC%25BC%25C6%25AE.jpg"
         },
         {
           name: "치카이라멘",
           menu: "돈코츠라멘",
           desc: "동호대교 북단 일본식 라멘을 맛볼 수 있는 맛집",
           url: getSearchUrl("치카이라멘"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240819_124%2F1724002999302fiF7C_JPEG%2F1000010172.jpg"
         }
       ],
       attractions: [
         {
           name: "잠원 한강공원",
           desc: "동호대교 아래로 이어지는 산책로. 화려한 강남의 야경을 바라보며 산책하거나 자전거를 타기 좋습니다.",
           url: getSearchUrl("잠원 한강공원"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150901_135%2F1441033968800uV38D_JPEG%2F13416926_0.jpg"
         },
         {
           name: "서울숲",
           desc: "도심 속 거대한 숲. 사계절 내내 아름다운 풍경을 자랑하며, 피크닉과 산책을 즐기기에 완벽합니다.",
           url: getSearchUrl("서울숲"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMDZfMjEg%2FMDAxNjcwMjU0OTMyMjE2.DT0klTMVzjIEWseoxCEB9T-1RBHA9XUDB9lv4vyZypcg.okgh46JdScFsGeajS0S2xaJPGz99xKxWI4ezkNRbZ6Ag.JPEG.star7sss%2FKakaoTalk_20221125_014407556_01.jpg%231403x1080"
         },
         {
           name: "매봉산 공원",
           desc: "동호대교와 한강이 한눈에 내려다보이는 서울의 숨겨진 야경 명소입니다.",
           url: getSearchUrl("매봉산 공원"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTAxMTBfMjA4%2FMDAxNzM2NTA1MjY0NjY4.86fRjV_eIcSWCpFoKkY0jO7anLauN_AZ5IOBlLfh_3wg.b5OtoEhQ3srFS4qmrpjaofXwe5NCX2sNGfapPAVFMF4g.JPEG%2F1000049977.jpg.jpg%3Ftype%3Dw1500_60_sharpen"
         }
       ]
     },
     {
       title: "함께 보낸 바다의 기억",
       videoId: "r57SuPHE1pA",
       location: {
         region: "태안",
         name: "태안 파도리해수욕장",
         address: "충남 태안군 소원면 모항파도로",
         desc: "은호와 정원이 바다를 바라보며 현실을 잠시 잊고 서로에게 집중했던 장소입니다. 화려하지 않은 잔잔한 파도와 해식동굴이 만들어내는 독특한 풍경이 인상적입니다.",
         url: getSearchUrl("태안 파도리해수욕장"),
         image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTA4MjZfMTY2%2FMDAxNzU2MTM3OTMzNTI2.Xl1Ro3Pryf4HN2aFyDFs7aMUxhMuA9D56LaRKG_WuCgg.1zttOWfKfQXoCFUwJWEKA3rniE3bOcdUaYhkJ1eXFLog.JPEG%2F7051D242-079F-4C51-9A74-F83362E2CB38.jpeg%3Ftype%3Dw1500_60_sharpen"
       },
       restaurants: [
         {
           name: "인생버거",
           menu: "수제버거",
           desc: "파도리 해변 바로 앞에 위치한 수제버거 맛집. 바다를 보며 즐기는 육즙 가득한 버거가 유명합니다.",
           url: getSearchUrl("태안 파도리 인생버거"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220719_58%2F16581948632022OhYz_JPEG%2F1D2782BD-1EA0-4028-9806-BAA62336C32F.jpeg"
         },
         {
           name: "해담",
           menu: "전복덮밥",
           desc: "국내산 참전복이 들어간 전복덮밥을 맛볼 수 있는 퓨전일식집입니다.",
           url: getSearchUrl("태안 통나무집사람들"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250901_43%2F1756657073939jptXQ_JPEG%2FIMG_4137.jpeg"
         },
         {
           name: "커피인터뷰 파도리",
           menu: "오션뷰 커피",
           desc: "붉은 벽돌과 통유리창 너머로 서해의 일몰을 감상할 수 있는 감성 카페입니다.",
           url: getSearchUrl("커피인터뷰 파도리"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230113_69%2F1673581550691wa2Lx_JPEG%2FKakaoTalk_20230113_124409804.jpg"
         }
       ],
       attractions: [
         {
           name: "파도리 해식동굴",
           desc: "인생샷 성지로 불리는 동굴. 동굴 안에서 바다를 배경으로 실루엣 사진을 남기는 것이 필수 코스입니다.",
           url: getSearchUrl("파도리 해식동굴"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAxMjVfMTkw%2FMDAxNzY5MzQ0OTg0MDE4.v_a_RM2mlYZUdXawuOLBMuyQtk2XRbqhLEMt5aIra_Ag.w5UNZXUrIyCyMx_AqtlaKHDBQtPfqd24kWRZdtikFXYg.JPEG%2F2E50B7D2-882F-4D8B-8338-B711F89A682E.jpeg%3Ftype%3Dw1500_60_sharpen"
         },
         {
           name: "만리포 해수욕장",
           desc: "서해의 3대 해수욕장 중 하나로, 파도리에서 가까워 함께 둘러보기 좋습니다. 서핑 명소로도 유명합니다.",
           url: getSearchUrl("태안 만리포해수욕장"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMjBfMTQz%2FMDAxNzY2MjAxNTQ5OTI2.y_cSqIiT32LzotIdoxVOhLobj50QkGZrqDIfcgof2fsg.moitRgyGgJIihhxjE7xFHyQTlkAnHU49KC3c-r6yx1Eg.JPEG%2F%25C5%25C2%25BE%25C8_2.jpg"
         },
         {
           name: "천리포수목원",
           desc: "국내 최초의 사립 수목원으로, 바다와 숲이 어우러진 산책로를 걸으며 힐링할 수 있습니다.",
           url: getSearchUrl("태안 천리포수목원"),
           image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190321_156%2F1553133635938Wjcqf_JPEG%2FvPw07rdn93EobShekUCCcjE5.jpg"
         }
       ]
     }
   ],
   'single-inferno': [
     {
       title: "거친 매력의 시작, 지옥도 해변",
       videoId: "6bXoiLguSXc",
       location: {
         region: "옹진",
         name: "인천 사승봉도 (지옥도)",
         address: "인천광역시 옹진군 자월면 승봉리",
         desc: "솔로지옥 시리즈의 상징인 무인도입니다. 시즌 5에서는 더욱 광활해진 해변과 강화된 서바이벌 규칙으로 출연자들의 본능적인 로맨스를 자극하는 장소입니다.",
         url: getSearchUrl("사승봉도 솔로지옥"),
         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
       },
       restaurants: [
         {
           name: "승봉도 어촌식당",
           menu: "자연산 회 & 매운탕",
           desc: "지옥도 입구인 승봉도에서 맛볼 수 있는 신선한 해산물 요리입니다.",
           url: getSearchUrl("승봉도 맛집"),
           image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "무인도 캠핑 푸드",
           menu: "해산물 직화 라면",
           desc: "지옥도 감성을 그대로 느낄 수 있는 야외 직화 요리 스타일입니다.",
           url: getSearchUrl("사승봉도 캠핑"),
           image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "인천항 연안부두",
           menu: "밴댕이 회무침",
           desc: "섬으로 떠나기 전 인천에서 즐길 수 있는 별미 중 하나입니다.",
           url: getSearchUrl("인천 연안부두 맛집"),
           image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
         }
       ],
       attractions: [
         {
           name: "사승봉도 낙조 명당",
           desc: "서해안 최고의 일몰을 감상할 수 있는 해변 포인트입니다.",
           url: getSearchUrl("사승봉도 일몰"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160601_129%2Fkalgard_1464792982366YEPre_JPEG%2FIMG_7432.jpg&type=sc960_832"
         },
         {
           name: "목섬",
           desc: "물때가 맞아야 들어갈 수 있는 신비로운 모래섬입니다.",
           url: getSearchUrl("옹진군 목섬"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MTJfMzcg%2FMDAxNjYwMjk1MTA3MTAx.r7rHuJWOi5CG8KvYOfGrZZlUnFzNgIT8lpGYu04Q1Bgg.YwErDA_InYbYzYORObPnxV7q4-gKfZmvse3NpBeHbwQg.JPEG.jjok3204%2FDSC_0686.jpg&type=sc960_832"
         },
         {
           name: "대이작도 해양생태관",
           desc: "인근 섬 대이작도에서 즐기는 생태 체험 코스입니다.",
           url: getSearchUrl("대이작도 여행"),
           image: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fitour.incheon.go.kr%2Fcommon%2FviewImg.do%3FimgId%3DDBI22012116261840185&type=sc960_832"
         }
       ]
     },
     {
       title: "디지털 오로라 아래의 천국도",
       videoId: "wpTtaUcg_Jg",
       location: {
         region: "인천",
         name: "인스파이어 리조트 오로라",
         address: "인천광역시 중구 공항문화로 127",
         desc: "시즌 5의 새로운 천국도 랜드마크입니다. 150m 길이의 LED 천장에서 펼쳐지는 환상적인 디지털 아트 쇼가 커플들의 로맨틱한 분위기를 극대화합니다.",
         url: getSearchUrl("인스파이어 리조트 오로라"),
         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
       },
       restaurants: [
         {
           name: "마이클 조던 스테이크",
           menu: "드라이 에이징 스테이크",
           desc: "리조트 내 위치한 최고급 다이닝으로, 완벽한 천국도 데이트를 완성합니다.",
           url: getSearchUrl("인스파이어 마이클 조던 스테이크"),
           image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "가든 팜 카페",
           menu: "팜 투 테이블 뷔페",
           desc: "신선한 식재료로 구성된 웰빙 뷔페로 천국도의 여유로운 아침을 책임집니다.",
           url: getSearchUrl("인스파이어 가든 팜 카페"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDJfMTEw%2FMDAxNzA5Mzc0OTM1ODA3.wkcVInf7bfSwIA3BRe230VKQnEU0zVVaeZ5EsYgfCoMg.ZO05nyxBlt9OAXRxMtipzW_sOLf7CkxGjF408gwVoUMg.JPEG%2FKakaoTalk_20240302_192142256.jpg&type=sc960_832"
         },
         {
           name: "브라세리 1783",
           menu: "프렌치 스타일 다이닝",
           desc: "화려한 열기구 컨셉의 바에서 즐기는 로맨틱한 밤의 다이닝입니다.",
           url: getSearchUrl("인스파이어 브라세리 1783"),
           image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
         }
       ],
       attractions: [
         {
           name: "로툰다 (Rotunda)",
           desc: "움직이는 대형 키네틱 샹들리에가 연출하는 압도적인 예술적 공간입니다.",
           url: getSearchUrl("인스파이어 로툰다"),
           image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "을왕리 해변",
           desc: "리조트 인근의 대표 해수욕장으로 시원한 바닷바람을 쐬기 좋습니다.",
           url: getSearchUrl("을왕리 해수욕장"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MDVfMTE1%2FMDAxNzU3MDcxNDU3MDc5.nK0Sm2e1uSL2AiGFHNBSV211gKlo6rHG31SQA2uU8HYg.tRftuULUhDlmP8c9Go-PEMiYaK19Q3pc0KnDeBbF6a0g.JPEG%2FKakaoTalk_Photo_2025-09-05-19-26-59-28.jpeg&type=sc960_832"
         },
         {
           name: "영종도 마시안 해변",
           desc: "갯벌 체험과 베이커리 카페로 유명한 데이트 명소입니다.",
           url: getSearchUrl("마시안 해변"),
           image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
         }
       ]
     },
     {
       title: "푸른 물결 속의 유혹, 스플래시 베이",
       videoId: "Ogh7jCE1Xp4",
       location: {
         region: "인천",
         name: "인스파이어 스플래시 베이",
         address: "인천광역시 중구 공항문화로 127 리조트 내",
         desc: "사계절 내내 즐길 수 있는 실내 워터파크입니다. 투명한 유리 돔 아래에서 펼쳐지는 커플들의 과감하고 시원한 데이트 장소입니다.",
         url: getSearchUrl("인스파이어 스플래시 베이"),
         image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
       },
       restaurants: [
         {
           name: "홍반",
           menu: "정통 중식 요리",
           desc: "물놀이 후 즐기는 고급스럽고 든든한 중식 다이닝입니다.",
           url: getSearchUrl("인스파이어 홍반"),
           image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "히로키",
           menu: "컨템포러리 일식",
           desc: "정갈한 일식 코스로 천국도의 품격을 더해주는 레스토랑입니다.",
           url: getSearchUrl("인스파이어 히로키"),
           image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "오아시스 고메 빌리지",
           menu: "푸드 코트",
           desc: "리조트 내 다양한 맛집들을 한 번에 만나볼 수 있는 푸드홀입니다.",
           url: getSearchUrl("인스파이어 오아시스 고메 빌리지"),
           image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
         }
       ],
       attractions: [
         {
           name: "파라다이스 시티 씨메르",
           desc: "인근의 또 다른 럭셔리 스파 시설로, 힐링 투어 코스로 제격입니다.",
           url: getSearchUrl("파라다이스 씨메르"),
           image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
         },
         {
           name: "인천공항 전망대",
           desc: "비행기 이착륙을 가까이서 볼 수 있는 이색적인 데이트 스팟입니다.",
           url: getSearchUrl("인천공항 전망대"),
           image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F032%2F2009%2F11%2F02%2F20091102.12100105000004.01L.jpg&type=sc960_832"
         },
         {
           name: "왕산 마리나",
           desc: "요트 체험이 가능한 곳으로 천국도급 럭셔리 여행의 정점을 찍을 수 있습니다.",
           url: getSearchUrl("왕산 마리나 요트"),
           image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
         }
       ]
     }
   ],
   'demon-hunters': [
     {
       title: "연습실 거울 속의 첫 번째 조우",
       videoId: "DWUWHhv6ZLI",
       location: {
         region: "성수",
         name: "성수동 언더그라운드 스튜디오",
         address: "서울특별시 성동구 성수동2가 300-1",
         desc: "주인공 가온이 연습 도중 거울 속에서 튀어나온 3급 데몬을 처음 마주한 장소입니다. 산업적 감성의 노출 콘크리트 인테리어가 헌터들의 긴박한 분위기를 잘 살려줍니다.",
         url: getSearchUrl("성수동 빈티지 스튜디오"),
         image: "https://i.ytimg.com/vi/xQnsFqn44uo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA9Jpr0u8UiAc1rkOsTmlIWNxmbFg"
       },
       restaurants: [
         {
           name: "성수 연방 소바",
           menu: "마제소바 & 가츠산도",
           desc: "연습에 지친 헌터들이 몰래 빠져나와 에너지를 보충하던 성수동 최고의 힙한 맛집입니다.",
           url: getSearchUrl("성수동 마제소바 맛집"),
           image: "https://d12zq4w4guyljn.cloudfront.net/750_750_20250829052217_photo1_296e8744c199.webp"
         },
         {
           name: "글로우 카페",
           menu: "아인슈페너",
           desc: "작전 회의를 가장한 수다 타임이 이루어지는 곳으로, 옥상 테라스 뷰가 일품입니다.",
           url: getSearchUrl("성수 글로우 카페"),
           image: "https://the-edit.co.kr/wp-content/uploads/2023/07/glow_cheong02_batch.jpg"
         },
         {
           name: "성수 다락",
           menu: "오므라이스",
           desc: "아기자기한 분위기에서 즐기는 헌터들의 오프데이 점심 코스입니다.",
           url: getSearchUrl("성수다락"),
           image: "https://img.siksinhot.com/place/1588683450519170.jpg"
         }
       ],
       attractions: [
         {
           name: "서울숲",
           desc: "데몬을 추격하다 잠시 숨을 고르던 도심 속 숲으로, 피크닉과 산책에 최적입니다.",
           url: getSearchUrl("서울숲 공원"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFlLUTEOSVuTH8gigtQJIHBiJgV5ldt0-xQ&s"
         },
         {
           name: "언더스탠드에비뉴",
           desc: "컨테이너 박스가 늘어선 독특한 배경으로 헌터들의 스트릿 화보 촬영지로 등장했습니다.",
           url: getSearchUrl("언더스탠드에비뉴"),
           image: "https://www.sd.go.kr/site/tour/images/contents/cts1891_img2.jpg"
         },
         {
           name: "뚝섬유원지",
           desc: "한강변에서 야간 훈련을 하던 장소로, 탁 트인 강바람을 쐬기 좋습니다.",
           url: getSearchUrl("뚝섬유원지"),
           image: "https://hangang.seoul.go.kr/resources/zeroCMS/site/main/images/park_view_photo_4.jpg"
         }
       ]
     },
     {
       title: "비 내리는 야외 공연장 결투",
       videoId: "7vCK0VBuQLs",
       location: {
         region: "송도",
         name: "송도 센트럴파크 야외무대",
         address: "인천광역시 연수구 컨벤시아대로 160",
         desc: "폭우 속에서 펼쳐지는 헌터들의 칼군무 퇴마 액션이 촬영된 명소입니다. 미래도시 같은 송도의 야경과 조명이 어우러져 화려한 비주얼을 자랑합니다.",
         url: getSearchUrl("송도 센트럴파크"),
         image: "https://cdn.slist.kr/news/photo/202506/652907_1015894_549.jpg"
       },
       restaurants: [
         {
           name: "송도 그리다디저트",
           menu: "조각 케이크 & 홍차",
           desc: "전투 후 당 충전이 필요한 헌터 멤버 '루시'의 단골 디저트 샵으로 알려져 있습니다.",
           url: getSearchUrl("송도 그리다디저트"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9xPRG-PwPFxm6XIeodWtFDAWfWCEnV5LvQ&s"
         },
         {
           name: "송도 한옥마을 마당",
           menu: "한우 구이",
           desc: "대규모 전투를 마친 헌터 팀의 공식 회식 장소입니다. 고급스러운 분위기가 특징입니다.",
           url: getSearchUrl("송도 한옥마을 마당"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHpYVRoaKdsY7lAXPpHDykzpCeoziiwTx4uQ&s"
         },
         {
           name: "조우",
           menu: "일식 다이닝",
           desc: "비밀스러운 정보 공유가 이루어지던 차분한 일식 레스토랑입니다.",
           url: getSearchUrl("송도 조우"),
           image: "https://dnvefa72aowie.cloudfront.net/jobs/article/19405420/1713148546035/job-post-411550696.jpeg?q=95&s=1440x1440&t=inside"
         }
       ],
       attractions: [
         {
           name: "송도 트라이보울",
           desc: "독특한 건축물로, 극 중 빌런 데몬의 비밀 아지트로 설정되었던 이색적인 복합문화공간입니다.",
           url: getSearchUrl("송도 트라이보울"),
           image: "https://i.namu.wiki/i/vnQArnNmI3gN9A2b0oOetNI-dPD20tBxdiVh53Y_l-ZB26xyOCB0M5UgLZdG2A2QgvwcnJOSDvKU0DgDKXvynQ.webp"
         },
         {
           name: "인천대교 전망대",
           desc: "탁 트인 바다와 거대한 교량을 배경으로 헌터들이 비장하게 결의를 다지던 곳입니다.",
           url: getSearchUrl("인천대교 전망대"),
           image: "https://cdn.incheontoday.com/news/photo/202304/229457_232303_1556.jpg"
         },
         {
           name: "커낼워크",
           desc: "유럽풍 쇼핑 스트리트로 멤버들이 위장 잠입 수사를 하던 화려한 거리입니다.",
           url: getSearchUrl("송도 커낼워크"),
           image: "https://tourimage.interpark.com/BBS/Tour/FckUpload/201803/6365715046002555370.jpg"
         }
       ]
     },
     {
       title: "남한산성 성벽 위의 마지막 결전",
       videoId: "2FS3JAPTKXs",
       location: {
         region: "경기 광주",
         name: "남한산성 수어장대",
         address: "경기도 광주시 남한산성면 남한산성로 731",
         desc: "시즌 1의 대미를 장식한 최종 결전 장소입니다. 고즈넉한 성곽과 헌터들의 현대적인 네온 무기가 대비되어 압도적인 영상미를 보여주었습니다.",
         url: getSearchUrl("남한산성 수어장대"),
         image: "https://img.etoday.co.kr/pto_db/2025/06/600/20250624163205_2190011_1200_665.png"
       },
       restaurants: [
         {
           name: "남한산성 낙선재",
           menu: "닭볶음탕 & 한정식",
           desc: "촬영 종료 후 배우들이 몸보신을 위해 찾았던 유명한 한옥 맛집입니다.",
           url: getSearchUrl("남한산성 낙선재"),
           image: "https://d12zq4w4guyljn.cloudfront.net/750_750_20251121055821549_menu_a0fababd222c.webp"
         },
         {
           name: "카페 산(San)",
           menu: "산 전망 라떼",
           desc: "산등성이가 한눈에 내려다보이는 뷰 맛집으로 헌터들의 감성 휴식처입니다.",
           url: getSearchUrl("남한산성 카페 산"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Q4qpC2ekTbzI2S3fyFbyeTBy6w6VVMc6Nw&s"
         },
         {
           name: "오복손두부",
           menu: "주먹두부 & 두부전골",
           desc: "80년 전통의 맛으로, 멤버 '가온'이 가장 좋아한다고 언급한 로컬 맛집입니다.",
           url: getSearchUrl("남한산성 오복손두부"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvXoFCLj_qh69jTP8Ca-zgTi2h6XQasTcEtQ&s"
         }
       ],
       attractions: [
         {
           name: "남한산성 도립공원",
           desc: "유네스코 세계문화유산으로 지정된 곳으로, 성곽길을 따라 걷는 트레킹 코스가 훌륭합니다.",
           url: getSearchUrl("남한산성 도립공원"),
           image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a32a732f-4096-4eef-a9fb-6e2926d8e5e2"
         },
         {
           name: "서문 전망대",
           desc: "서울 시내 야경이 한눈에 보이는 곳으로, 야간 퇴마 작전의 배경이 되었습니다.",
           url: getSearchUrl("남한산성 서문 전망대"),
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33I_KdkBYpH18nQ97T6HFuE4HciNZ5QCCWw&s"
         },
         {
           name: "경기도자박물관",
           desc: "인근에 위치한 박물관으로 고전적인 소품들이 드라마 헌터 도구들의 모티브가 되었습니다.",
           url: getSearchUrl("경기도자박물관"),
           image: "https://museum.or.kr/wp-content/uploads/2025/03/%EA%B2%BD%EA%B8%B0%EB%8F%84%EC%9E%90%EB%B0%95%EB%AC%BC%EA%B4%80.jpg"
         }
       ]
     }
   ]
 };


 const getSearchResults = (q) => {
   const query = (q || '').trim();
   if (!query) return [];
   const lower = query.toLowerCase();
   const results = [];
   const seen = new Set();
   const key = (dramaId, sceneIdx, type, label) => `${dramaId}-${sceneIdx ?? ''}-${type}-${label}`;
   mediaList.forEach((drama) => {
     if (!drama.functional) return;
     if (drama.title.includes(query) || drama.id.toLowerCase().includes(lower)) {
       const k = key(drama.id, null, 'drama', drama.title);
       if (!seen.has(k)) { seen.add(k); results.push({ type: '작품', label: drama.title, dramaId: drama.id, sceneIndex: 0 }); }
     }
     if (drama.cast.includes(query)) {
       const k = key(drama.id, null, 'cast', drama.title);
       if (!seen.has(k)) { seen.add(k); results.push({ type: '주연', label: drama.cast, dramaId: drama.id, sceneIndex: 0, subLabel: drama.title }); }
     }
     const scenes = scenesData[drama.id] || [];
     scenes.forEach((scene, sceneIdx) => {
       if (scene.location.region.includes(query)) {
         const k = key(drama.id, sceneIdx, 'region', scene.location.region);
         if (!seen.has(k)) { seen.add(k); results.push({ type: '지역', label: scene.location.region, dramaId: drama.id, sceneIndex: sceneIdx, subLabel: drama.title }); }
       }
       if (scene.location.name.includes(query) || (scene.location.address && scene.location.address.includes(query))) {
         const k = key(drama.id, sceneIdx, 'place', scene.location.name);
         if (!seen.has(k)) { seen.add(k); results.push({ type: '장소', label: scene.location.name, dramaId: drama.id, sceneIndex: sceneIdx, subLabel: drama.title }); }
       }
       (scene.restaurants || []).forEach((r) => {
         if (r.name.includes(query)) {
           const k = key(drama.id, sceneIdx, 'rest', r.name);
           if (!seen.has(k)) { seen.add(k); results.push({ type: '장소', label: r.name, dramaId: drama.id, sceneIndex: sceneIdx, subLabel: drama.title }); }
         }
       });
       (scene.attractions || []).forEach((a) => {
         if (a.name.includes(query)) {
           const k = key(drama.id, sceneIdx, 'attr', a.name);
           if (!seen.has(k)) { seen.add(k); results.push({ type: '장소', label: a.name, dramaId: drama.id, sceneIndex: sceneIdx, subLabel: drama.title }); }
         }
       });
     });
   });
   return results.slice(0, 20);
 };

 const searchResults = getSearchResults(searchQuery);

 const goToSearchResult = (item) => {
   setSelectedDrama(item.dramaId);
   setActiveScene(item.sceneIndex ?? 0);
   setView('detail');
   setSearchQuery('');
   setSearchFocused(false);
 };

 const currentDrama = mediaList.find(m => m.id === selectedDrama);
 const currentScenes = scenesData[selectedDrama] || [];
 const current = currentScenes[activeScene] || currentScenes[0];


 useEffect(() => {
   if (current) {
     setMapQuery(current.location.name);
     setSelectedPin("main");
   }
   window.scrollTo(0, 0);
 }, [activeScene, selectedDrama, view]);


 const handlePinClick = (query, pinId) => {
   const regionPrefix = current.location.region ? `${current.location.region} ` : "";
   const finalQuery = query.includes(current.location.region) ? query : regionPrefix + query;
   setMapQuery(finalQuery);
   setSelectedPin(pinId);
 };


 const toggleWish = (dramaId) => {
   setWishedIds((prev) => {
     const next = prev.includes(dramaId) ? prev.filter((id) => id !== dramaId) : [...prev, dramaId];
     try {
       localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(next));
     } catch (_) {}
     return next;
   });
 };


 const isWished = (dramaId) => wishedIds.includes(dramaId);


 useEffect(() => {
   try {
     localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(wishedIds));
   } catch (_) {}
 }, [wishedIds]);


 useEffect(() => {
   const t = setInterval(() => {
     setHeroSlideIndex((i) => (i + 1) % mediaList.length);
   }, 5000);
   return () => clearInterval(t);
 }, []);


 const heroItem = mediaList[heroSlideIndex];


 // --- VIEW: HOME PAGE ---
 const HomeView = () => (
   <div className="animate-in fade-in duration-1000">
     <section className="relative h-[85vh] w-full overflow-hidden">
       <img
         key={heroSlideIndex}
         src={heroItem.image}
         className="absolute inset-0 w-full h-full object-cover object-top animate-in fade-in duration-700"
         alt={`${heroItem.title} 배너`}
       />
       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
       <div className="absolute bottom-0 left-0 right-0 flex gap-2 justify-center pb-6 z-10">
         {mediaList.map((_, i) => (
           <button
             key={i}
             onClick={() => setHeroSlideIndex(i)}
             className={`w-2 h-2 rounded-full transition-all ${i === heroSlideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
             aria-label={`슬라이드 ${i + 1}`}
           />
         ))}
       </div>
       <div className="absolute bottom-[20%] left-10 md:left-20 max-w-2xl space-y-6 text-left">
         <div className="flex items-center gap-2">
           <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-red-900/50">HOT</span>
           <span className="text-zinc-300 text-xs font-bold tracking-widest uppercase">Now Trending</span>
         </div>
         <h2 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl italic uppercase">{heroItem.title}</h2>
         <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed drop-shadow-lg max-w-lg">
           {heroItem.type}. {heroItem.tone}
         </p>
         <div className="flex gap-4 pt-4">
           <button
             onClick={() => { setSelectedDrama(heroItem.id); setActiveScene(0); setView('detail'); }}
             className="px-10 py-3.5 bg-white text-black font-black rounded flex items-center gap-3 hover:bg-zinc-200 transition text-xl shadow-xl active:scale-95"
           >
             <Play size={24} fill="black" /> 지금 헌팅 시작
           </button>
         </div>
       </div>
     </section>


     <div className="px-10 md:px-20 -mt-24 relative z-20 space-y-16 pb-20 text-left">
       {wishedIds.length > 0 && (
         <section id="wished">
           <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
             <Heart size={24} className="fill-red-500 text-red-500" />
             <span className="w-1 h-6 bg-red-600 inline-block"></span>
             찜한 작품
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-white text-left">
             {mediaList.filter((item) => wishedIds.includes(item.id)).map((item) => (
               <div
                 key={item.id}
                 onClick={() => { setSelectedDrama(item.id); setActiveScene(0); setView('detail'); }}
                 className="group relative aspect-[2/3] rounded-lg overflow-hidden border border-red-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:ring-2 hover:ring-red-600 shadow-2xl"
               >
                 <img src={item.image} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" alt={item.title} />
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-4 text-center">
                   <h4 className="font-black text-lg leading-tight">{item.title}</h4>
                   <p className="text-[10px] text-zinc-400 mt-2">헌팅 코스 보기</p>
                 </div>
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleWish(item.id); }}
                   className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                   aria-label="찜 해제"
                 >
                   <Heart size={18} className="fill-red-500 text-red-500" />
                 </button>
               </div>
             ))}
           </div>
         </section>
       )}
       <section>
         <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
           <span className="w-1 h-6 bg-red-600 inline-block"></span>
           요즘 뜨는 드라마 헌팅 코스
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-white text-left">
           {mediaList.map((item) => (
             <div
               key={item.id}
               className={`group relative aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 transition-all duration-500 cursor-pointer ${item.functional ? 'hover:scale-105 hover:ring-2 hover:ring-red-600 shadow-2xl' : 'opacity-40 grayscale'}`}
             >
               <div
                 onClick={() => { if(item.functional) { setSelectedDrama(item.id); setActiveScene(0); setView('detail'); } }}
                 className="absolute inset-0"
               >
                 <img src={item.image} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" alt={item.title} />
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-4 text-center">
                   <span className="text-[10px] font-black text-red-600 mb-1 uppercase tracking-widest">{item.type}</span>
                   <h4 className="font-black text-lg leading-tight">{item.title}</h4>
                   <p className="text-[10px] text-zinc-400 mt-2">{item.functional ? '헌팅 코스 보기' : '준비 중'}</p>
                 </div>
               </div>
               {item.functional && (
                 <button
                   type="button"
                   onClick={(e) => { e.stopPropagation(); toggleWish(item.id); }}
                   className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                   aria-label={isWished(item.id) ? '찜 해제' : '찜하기'}
                 >
                   <Heart size={18} className={isWished(item.id) ? 'fill-red-500 text-red-500' : 'text-white'} />
                 </button>
               )}
               {item.functional && <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase shadow-md">NEW</div>}
             </div>
           ))}
         </div>
       </section>
     </div>
   </div>
 );


 // --- VIEW: DETAIL PAGE ---
 const DetailView = () => (
   <div className="animate-in fade-in duration-700">
     <div className="max-w-7xl mx-auto px-6 py-4 text-left">
       <button
         onClick={() => setView('home')}
         className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition group font-bold"
       >
         <ChevronLeft size={24} className="group-hover:-translate-x-1 transition" /> 리스트로 돌아가기
       </button>


       <section className="relative mb-12">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           {/* Sidebar Scene Selection */}
           <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
             <h3 className="text-lg font-bold flex items-center gap-2 text-white text-left">
               <span className="w-1 h-5 bg-red-600 inline-block"></span>
               에피소드 및 장면
             </h3>
             <div className="space-y-4">
               {currentScenes.map((scene, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveScene(idx)}
                   className={`w-full text-left rounded-md transition-all group overflow-hidden ${
                     activeScene === idx
                     ? 'ring-2 ring-white scale-[1.02] shadow-lg shadow-red-900/20'
                     : 'opacity-50 hover:opacity-100 scale-100'
                   }`}
                 >
                   <div className="relative aspect-video">
                     <img src={getThumbnail(scene.videoId, 'mqdefault')} alt={scene.title} className="w-full h-full object-cover" />
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800">
                       {activeScene === idx && <div className="h-full bg-red-600 w-full animate-pulse"></div>}
                     </div>
                   </div>
                   <div className="bg-zinc-900 p-3">
                     <h4 className="font-bold text-xs truncate text-white">{scene.title}</h4>
                     <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter font-bold">Famous Scene {idx + 1}</p>
                   </div>
                 </button>
               ))}
             </div>


             {/* Drama Meta Info */}
             <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4 backdrop-blur-sm hidden lg:block text-white">
               <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">작품 상세</h4>
               <div className="space-y-3 text-xs">
                 <p><span className="text-zinc-500 font-bold mr-2 uppercase tracking-tighter">Cast</span> {currentDrama.cast}</p>
                 <p><span className="text-zinc-500 font-bold mr-2 uppercase tracking-tighter">Genre</span> {currentDrama.genre}</p>
                 <p><span className="text-zinc-500 font-bold mr-2 uppercase tracking-tighter">Tone</span> {currentDrama.tone}</p>
               </div>
             </div>
           </div>


           {/* Main Content Area */}
           <div className="lg:col-span-9 space-y-8">
             <div className="relative aspect-video rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-zinc-900 group text-left">
               <img src={getThumbnail(current.videoId)} className="w-full h-full object-cover opacity-60" alt="Backdrop" />
               <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                 <div className="flex items-center gap-2 mb-2 text-white">
                   <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border border-white/20 uppercase tracking-tighter">{currentDrama.type}</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter drop-shadow-2xl italic text-white uppercase">{current.title}</h2>
                 <div className="flex gap-3 mb-8">
                   <a href={getYoutubeLink(current.videoId)} target="_blank" rel="noopener noreferrer" className="px-6 md:px-10 py-2.5 md:py-3 bg-white text-black font-black rounded flex items-center gap-2 hover:bg-zinc-200 transition text-sm md:text-lg shadow-xl">
                     <Play size={24} fill="black" /> 유튜브에서 재생
                   </a>
                   <button
                     onClick={() => toggleWish(selectedDrama)}
                     className={`px-4 md:px-6 py-2.5 md:py-3 rounded backdrop-blur-md flex items-center gap-2 transition text-sm md:text-lg border ${isWished(selectedDrama) ? 'bg-red-600/80 border-red-500/50 text-white hover:bg-red-600' : 'bg-zinc-500/50 text-white border-white/10 hover:bg-zinc-500/80'}`}
                   >
                     <Heart size={24} className={isWished(selectedDrama) ? 'fill-current' : ''} />
                     {isWished(selectedDrama) ? '찜 해제' : '찜하기'}
                   </button>
                 </div>
                 <p className="hidden md:block text-lg text-zinc-300 max-w-2xl leading-relaxed font-medium line-clamp-3">{current.location.desc}</p>
               </div>
             </div>


             {/* Info Grid: Location and MAP */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white text-left">
               {/* Location Card */}
               <div className="lg:col-span-2 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-red-600 transition backdrop-blur-md group overflow-hidden shadow-lg">
                 <a href={current.location.url} target="_blank" rel="noopener noreferrer" className="block aspect-video w-full overflow-hidden">
                   <img src={current.location.image} alt={current.location.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </a>
                 <div className="p-8">
                   <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3 text-red-600"><MapPin size={28} /><h3 className="text-xl font-black uppercase tracking-tighter">Location</h3></div>
                     <a href={current.location.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-zinc-500 group-hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest">상세 정보 보기 <ExternalLink size={14} /></a>
                   </div>
                   <div className="space-y-5">
                     <h4 className="text-3xl font-black group-hover:text-red-500 transition-colors tracking-tight">{current.location.name}</h4>
                     <p className="text-zinc-400 text-sm font-medium leading-snug">{current.location.address}</p>
                     <div className="flex flex-wrap gap-2 pt-2">
                       {getLocationHashtags(current.location).map((tag) => (
                         <a
                           key={tag}
                           href={getInstagramTagUrl(tag)}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-zinc-300 hover:text-white text-xs font-bold transition-all"
                         >
                           #{tag}
                         </a>
                       ))}
                       <span className="text-[10px] text-zinc-500 self-center ml-1">인스타에서 보기</span>
                     </div>
                   </div>
                 </div>
               </div>


               {/* Tour Map with Interactive Pins */}
               <div className="bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col overflow-hidden h-full shadow-2xl">
                 <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                   <h3 className="text-lg font-black flex items-center gap-2 uppercase tracking-tighter">
                     <MapIcon size={20} className="text-red-600" /> Tour Map
                   </h3>
                   <div className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 uppercase tracking-widest">
                     <Navigation size={12} /> {current.location.region} Area
                   </div>
                 </div>
                 <div className="flex-grow w-full min-h-[300px] relative bg-zinc-800">
                   <iframe
                     width="100%"
                     height="100%"
                     frameBorder="0"
                     scrolling="no"
                     src={getGoogleMapEmbedUrl(mapQuery)}
                     className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                     title="Google Map"
                   ></iframe>
                 </div>
                 <div className="p-4 bg-zinc-950/80 backdrop-blur-sm space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                   <button onClick={() => handlePinClick(current.location.name, 'main')} className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${selectedPin === 'main' ? 'bg-red-900/20 border border-red-600/50' : 'hover:bg-zinc-800 border border-transparent'}`}>
                     <div className={`w-2 h-2 rounded-full ${selectedPin === 'main' ? 'bg-red-500 animate-pulse' : 'bg-red-900'}`}></div>
                     <div className="flex-1"><span className={`text-xs font-bold block ${selectedPin === 'main' ? 'text-red-500' : 'text-zinc-300'}`}>{current.location.name}</span></div>
                   </button>
                   {current.restaurants.map((rest, i) => (
                     <button key={`rest-${i}`} onClick={() => handlePinClick(rest.name, `rest-${i}`)} className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${selectedPin === `rest-${i}` ? 'bg-blue-900/20 border border-blue-600/50' : 'hover:bg-zinc-800 border border-transparent'}`}>
                       <div className={`w-2 h-2 rounded-full ${selectedPin === `rest-${i}` ? 'bg-blue-500' : 'bg-blue-900'}`}></div>
                       <div className="flex-1"><span className={`text-xs font-bold block ${selectedPin === `rest-${i}` ? 'text-blue-500' : 'text-zinc-300'}`}>{rest.name}</span></div>
                     </button>
                   ))}
                   {current.attractions.map((attr, i) => (
                     <button key={`attr-${i}`} onClick={() => handlePinClick(attr.name, `attr-${i}`)} className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${selectedPin === `attr-${i}` ? 'bg-amber-900/20 border border-amber-600/50' : 'hover:bg-zinc-800 border border-transparent'}`}>
                       <div className={`w-2 h-2 rounded-full ${selectedPin === `attr-${i}` ? 'bg-amber-500' : 'bg-amber-900'}`}></div>
                       <div className="flex-1"><span className={`text-xs font-bold block ${selectedPin === `attr-${i}` ? 'text-amber-500' : 'text-zinc-300'}`}>{attr.name}</span></div>
                     </button>
                   ))}
                 </div>
               </div>
             </div>


             {/* Recommendations */}
             <div className="space-y-16 pt-8 text-white font-bold text-left">
               {/* Dining Guide Row (3 Items) */}
               <div>
                 <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter text-white"><Utensils size={28} className="text-red-600" /> Dining Guide</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   {current.restaurants.map((rest, i) => (
                     <a key={i} href={rest.url} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 group cursor-pointer rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all block shadow-lg">
                       <div className="h-40 overflow-hidden relative"><img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-[8px] font-black rounded uppercase shadow-lg z-10 tracking-widest text-white uppercase">Best</div></div>
                       <div className="p-5"><h4 className="font-black text-sm mb-1 group-hover:text-red-500 transition-colors uppercase tracking-tight text-white">{rest.name}</h4><p className="text-[10px] text-zinc-400 font-black mb-3 border-b border-zinc-800 pb-2 uppercase tracking-tighter">{rest.menu || '대표메뉴'}</p><p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-medium">{rest.desc}</p></div>
                     </a>
                   ))}
                 </div>
               </div>


               {/* Nearby Attraction Row (3 Items) */}
               <div>
                 <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter text-white"><Star size={28} className="text-red-600" /> Nearby Attraction</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-bold text-white">
                   {current.attractions.map((attr, i) => (
                     <a key={i} href={attr.url} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 rounded-xl border border-zinc-800 hover:bg-zinc-800/80 hover:border-red-600/30 transition-all cursor-pointer flex flex-col h-full group block overflow-hidden shadow-lg">
                       <div className="h-40 w-full overflow-hidden text-white"><img src={attr.image} alt={attr.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                       <div className="p-6 flex flex-col justify-between flex-grow">
                         <h4 className="font-black text-sm mb-3 flex justify-between items-center group-hover:text-red-500 transition-colors uppercase tracking-tight text-white">{attr.name} <ChevronRight size={16} /></h4>
                         <p className="text-[11px] text-zinc-500 leading-relaxed font-medium line-clamp-3">{attr.desc}</p>
                       </div>
                     </a>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   </div>
 );


 return (
   <div className="min-h-screen bg-zinc-950 text-white font-sans pb-20 selection:bg-red-600 selection:text-white overflow-x-hidden">
     <header className={`bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-50 transition-colors duration-300 ${view === 'home' ? 'bg-transparent shadow-none' : 'bg-zinc-950 shadow-2xl'}`}>
       <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center text-zinc-200 font-bold">
         <div className="flex items-center gap-6 md:gap-10 text-left w-full md:w-auto shrink-0">
           <h1 onClick={() => setView('home')} className="text-2xl md:text-3xl font-black tracking-tighter text-red-600 cursor-pointer hover:scale-105 transition-transform uppercase tracking-widest">K Drama Hunters</h1>
           <nav className="hidden lg:flex gap-5 text-sm font-medium text-left">
             <button onClick={() => setView('home')} className={`hover:text-white transition ${view === 'home' ? 'text-white font-bold' : ''}`}>홈</button>
             <button onClick={() => { setView('detail'); setSelectedDrama('Tangerines'); setActiveScene(0); }} className={`hover:text-white transition ${view === 'detail' ? 'text-white font-bold border-b-2 border-red-600 pb-1' : ''}`}>드라마 촬영지</button>
           </nav>
         </div>
         <div className="relative w-full md:flex-1 md:max-w-2xl" ref={searchRef}>
           <div className="flex items-center gap-2 w-full bg-white/10 hover:bg-white/15 focus-within:bg-white/20 rounded-lg border border-white/20 px-3 py-2 transition-colors">
             <Search size={18} className="text-zinc-400 shrink-0" />
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onFocus={() => setSearchFocused(true)}
               placeholder="작품, 장소, 주연, 지역 검색..."
               className="flex-1 min-w-0 bg-transparent text-white placeholder-zinc-500 text-sm font-medium outline-none"
               aria-label="검색"
             />
           </div>
           {searchFocused && (searchQuery.trim() || searchResults.length > 0) && (
             <div className="absolute left-0 right-0 top-full mt-2 py-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
               {searchQuery.trim() && searchResults.length === 0 ? (
                 <p className="px-4 py-6 text-center text-zinc-500 text-sm">검색 결과가 없습니다.</p>
               ) : (
                 searchResults.slice(0, 15).map((item, i) => (
                   <button
                     key={`${item.dramaId}-${item.sceneIndex}-${item.type}-${i}`}
                     type="button"
                     onClick={() => goToSearchResult(item)}
                     className="w-full flex flex-col items-start gap-0.5 px-4 py-3 text-left hover:bg-zinc-800 transition"
                   >
                     <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{item.type}</span>
                     <span className="text-sm font-bold text-white">{item.label}</span>
                     {item.subLabel && <span className="text-xs text-zinc-500">{item.subLabel}</span>}
                   </button>
                 ))
               )}
             </div>
           )}
         </div>
         <div className="flex items-center gap-4 shrink-0">
           {wishedIds.length > 0 && (
             <div className="flex items-center gap-2 text-zinc-400">
               <Heart size={20} className="fill-red-500/80 text-red-500/80" />
               <span className="text-sm font-bold">찜 {wishedIds.length}</span>
             </div>
           )}
           <div className="relative" ref={shareRef}>
             <button
               type="button"
               onClick={(e) => { e.stopPropagation(); setShareOpen((v) => !v); }}
               className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition text-xs font-bold uppercase tracking-widest"
               aria-label="공유"
             >
               <Share2 size={14} />
               <span>공유</span>
             </button>
             {shareOpen && (
               <div className="absolute right-0 top-full mt-2 w-48 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 animate-in fade-in duration-200">
                 <button
                   type="button"
                   onClick={copyUrl}
                   className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-800 transition"
                 >
                   {copied ? <Check size={16} className="text-green-500 shrink-0" /> : <Copy size={16} className="shrink-0 text-zinc-500" />}
                   <span>{copied ? '복사됨' : 'URL 복사'}</span>
                 </button>
                 <a
                   href={shareLinks.kakao}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 transition"
                   onClick={() => setShareOpen(false)}
                 >
                   <span className="w-4 h-4 rounded bg-[#FEE500] flex items-center justify-center text-[0.65rem] font-black text-[#191919]">K</span>
                   <span>카카오톡</span>
                 </a>
                 <a
                   href={shareLinks.facebook}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 transition"
                   onClick={() => setShareOpen(false)}
                 >
                   <span className="w-4 h-4 rounded bg-[#1877F2] flex items-center justify-center text-white text-[0.6rem] font-bold">f</span>
                   <span>페이스북</span>
                 </a>
                 <a
                   href={shareLinks.twitter}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 transition"
                   onClick={() => setShareOpen(false)}
                 >
                   <span className="w-4 h-4 rounded bg-[#000] flex items-center justify-center text-white text-[0.6rem] font-bold">𝕏</span>
                   <span>트위터(X)</span>
                 </a>
                 <button
                   type="button"
                   className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-800 transition"
                   onClick={async () => {
                     await copyUrl();
                     setShareOpen(false);
                     window.open('https://www.instagram.com/', '_blank');
                   }}
                 >
                   <span className="w-4 h-4 rounded flex items-center justify-center bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-[0.6rem] font-bold">ig</span>
                   <span>인스타그램 (링크 복사 후 열기)</span>
                 </button>
               </div>
             )}
           </div>
         </div>
       </div>
     </header>


     {view === 'home' ? <HomeView /> : <DetailView />}


     <footer className="mt-20 py-24 px-10 border-t border-zinc-900 bg-black text-zinc-500 font-bold text-left">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 text-left">
         <div className="space-y-8 max-w-sm text-left uppercase tracking-tighter">
           <h2 className="text-4xl font-black text-red-600 tracking-tighter">K Drama Hunters</h2>
           <p className="text-sm leading-relaxed font-medium">K 드라마 헌터스는 명작 드라마의 발자취를 따라가는 프리미엄 여행 큐레이션 서비스입니다.</p>
         </div>
       </div>
       <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-zinc-900 text-[10px] text-zinc-700 font-black tracking-widest text-left uppercase">© 2026 K DRAMA HUNTERS KOREA. ALL RIGHTS RESERVED.</div>
     </footer>
   </div>
 );
};


export default DramaTravelGuide;








