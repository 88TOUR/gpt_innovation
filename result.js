const result = JSON.parse(localStorage.getItem("travelResult"));
const title = document.getElementById("resultTitle");
const desc = document.getElementById("resultDesc");
const rec = document.getElementById("recommendations");

if (result.introvert > result.extrovert) {
  title.textContent = "혼자 즐기는 여행자";
  desc.textContent = "자연과 고요함을 즐기는 당신에게는 제주 올레길이 잘 어울려요.";
  rec.innerHTML = "<ul><li>제주 올레길</li><li>강릉 바다 산책</li></ul>";
} else {
  title.textContent = "활발한 사교 여행자";
  desc.textContent = "친구들과 즐기는 여정! 홍대, 부산 해운대 등이 잘 어울려요.";
  rec.innerHTML = "<ul><li>홍대</li><li>부산 해운대</li><li>서울 술집 투어</li></ul>";
}
