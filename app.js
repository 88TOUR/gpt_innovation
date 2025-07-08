// ───────────────── 데이터 ──────────────────
const DATA = {
  questions: [
    { text: "10시간 비행기 vs 24시간 기차 여행", a: "비행기 ✈️", b: "기차 🚂", mapA: "ex", mapB: "pl"},
    { text: "계획 없이 즉흥 여행 vs 치밀한 동선 여행", a: "즉흥!", b: "치밀!", mapA: "so", mapB: "pl"},
    { text: "매일 다른 도시 이동 vs 한 도시 깊게 탐험", a: "다른 도시", b: "한 도시", mapA: "ex", mapB: "re"},
    { text: "호캉스 풀데이 vs 로컬 골목 탐험", a: "호캉스", b: "골목 탐험", mapA: "re", mapB: "ex"},
    { text: "버킷리스트 액티비티 체험 vs 카페에서 하루 종일", a: "액티비티", b: "카페", mapA: "ex", mapB: "re"},
    { text: "친구들과 단체 여행 vs 완전 솔로 여행", a: "단체", b: "솔로", mapA: "so", mapB: "pl"},
    { text: "새벽 일출 보기 vs 늦잠 후 브런치", a: "일출", b: "브런치", mapA: "pl", mapB: "re"},
    { text: "SNS 인증 필수 여행 vs 오프라인 힐링 여행", a: "SNS", b: "힐링", mapA: "so", mapB: "re"},
    { text: "즉석 파티 vs 현지 인터뷰 기록", a: "파티", b: "인터뷰", mapA: "so", mapB: "pl"},
    { text: "길 잃기 모험 vs 네비게이션 필수", a: "모험", b: "안전", mapA: "ex", mapB: "pl"},
    { text: "스카이다이빙 vs 스파 마사지", a: "스카이다이빙", b: "스파", mapA: "ex", mapB: "re"},
    { text: "즉흥 연장 여행 vs 예정대로 귀가", a: "연장!", b: "귀가", mapA: "so", mapB: "pl"}
  ],
  types: {
    ex: {
      emoji: "🧭",
      name: "모험가형",
      desc: "새로운 자극을 찾아 어디든 떠나는 액티브 탐험가!",
      courses: ["제주 오프로드 UTV 투어","뉴질랜드 퀸스타운 번지점프","페루 잉카트레일 4박5일"]
    },
    re: {
      emoji: "🛋️",
      name: "힐링러형",
      desc: "휴식과 감성을 중시하는 릴렉스 마스터!",
      courses: ["강릉 안목 해변 카페투어","발리 우붓 요가 리트릿","프랑스 프로방스 라벤더 2박3일"]
    },
    pl: {
      emoji: "📅",
      name: "계획러형",
      desc: "완벽 일정표가 행복인 체계적 여행가!",
      courses: ["스위스 알프스 기차일주","교토 전통문화 3박4일","뉴욕 미술관+뮤지컬 동선 투어"]
    },
    so: {
      emoji: "🎉",
      name: "소셜라이저형",
      desc: "사람 만나고 파티 즐기며 에너지 충전!",
      courses: ["방콕 루프탑 바 호핑","바르셀로나 펍크롤 투어","부산 해운대 서핑·BBQ 파티"]
    }
  }
};

// ──────────────── 상태 관리 ────────────────
let qIndex = 0;
let scores = { ex:0, re:0, pl:0, so:0 };

// DOM 캐시
const startV = $("#start"), qV = $("#question"), rV = $("#result");
const qText = $("#questionText"), optA = $("#optA"), optB = $("#optB");
const pFill = $("#progressFill"), pTxt = $("#progressText");

// 헬퍼
function $(sel){ return document.querySelector(sel); }
function swap(view){ document.querySelectorAll(".view").forEach(v=>v.classList.remove("active")); view.classList.add("active"); }

// ──────────────── 로직 ────────────────
$("#startBtn").onclick = () => {
  qIndex = 0; scores = { ex:0,re:0,pl:0,so:0 };
  loadQuestion();
  swap(qV);
};

function loadQuestion(){
  const q = DATA.questions[qIndex];
  qText.textContent = q.text;
  optA.textContent = q.a;
  optB.textContent = q.b;
  pFill.style.width = `${(qIndex)/12*100}%`;
  pTxt.textContent = `${qIndex+1} / 12`;
}

[optA, optB].forEach(btn=>{
  btn.onclick = e=>{
    const choice = e.currentTarget.dataset.choice;
    const mapKey = DATA.questions[qIndex][choice === "a" ? "mapA" : "mapB"];
    scores[mapKey]++;

    // 다음
    qIndex++;
    if(qIndex < DATA.questions.length){
      loadQuestion();
    }else{
      showResult();
    }
  };
});

function showResult(){
  // 최다 득표
  const top = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const info = DATA.types[top];

  $("#typeEmoji").textContent = info.emoji;
  $("#typeName").textContent  = info.name;
  $("#typeDesc").textContent  = info.desc;

  const ul = $("#courseList");
  ul.innerHTML = "";
  info.courses.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `• ${c}`;
    ul.appendChild(li);
  });

  pFill.style.width = "100%";
  swap(rV);
}

// 다시하기
$("#retryBtn").onclick = ()=> swap(startV);

// 공유 (클립보드 복사)
$("#shareBtn").onclick = ()=>{
  navigator.clipboard.writeText(location.href);
  alert("링크가 복사되었습니다!");
};
