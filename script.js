const header = document.querySelector(".header");
const downloadBox = document.querySelector(".downloadBox");
const btn_download = document.querySelector(".downloadBox .download");
const btn_download_flexbox = document.querySelector(".downloadFlexBox");
const recruitment = document.querySelector(".recruitment");

const pageDot = document.querySelector(".pageDot");
const pageDots = document.querySelectorAll(".pageDot img");

const imageAnimations = document.querySelectorAll(".image2");

const scrollButton = document.querySelector(".scroll");

const app_download = document.querySelector(".app_download img");

let currentPage = 0;
let timer;
let timer1;

let startPoint = 0;
let endPoint = 0;

setScreenSize();

drawPageDot();

// 기본 마우스 휠 클릭 막기
document.addEventListener("mousedown", (event) => {
  if (event.button == 1) {
    event.preventDefault();
  }
});

// 헤더 앱 다운로드 버튼
btn_download.addEventListener("click", () => {
  const mobileType = checkMobile();
  if (mobileType === "AOS") {
    window.open(
      "https://play.google.com/store/apps/details?id=com.sampleapp",
      "_blank"
    );
  } else if (mobileType === "IOS") {
    window.open("https://apps.apple.com/KR/app/id378084485?mt=8", "_blank");
  } else {
    btn_download_flexbox.classList.toggle("active");
  }
});

app_download.addEventListener("click", () => {
  const mobileType = checkMobile();
  if (mobileType === "AOS") {
    window.open(
      "https://play.google.com/store/apps/details?id=com.sampleapp",
      "_blank"
    );
  } else if (mobileType === "IOS") {
    window.open("https://apps.apple.com/KR/app/id378084485?mt=8", "_blank");
  } else {
    window.open("https://www.baemin.com", "_blank");
  }
});

// 기본 모바일 터치 이벤트 막기
document.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

// 모바일 터치 이벤트 (스와이프)
document.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageY; // 터치가 시작되는 위치 저장
});

document.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageY; // 터치가 끝나는 위치 저장

  // 아래에서 위로 스와이프 된 경우
  if (startPoint < endPoint) {
    const clientHeight = window.innerHeight;

    // 쓰로틀링 적용
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;

        // 첫 페이지면 더이상 위로 이동X
        if (currentPage == 0) return;
        else {
          --currentPage;
          scrollTo(clientHeight * currentPage);
          screenLayout(currentPage);
        }
      }, 500);
    }
  }
  // 위에서 아래로 스와이프 된 경우
  else if (startPoint > endPoint) {
    const clientHeight = window.innerHeight;

    // 쓰로틀링 적용
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;

        // 마지막 페이지면 더이상 아래로 이동X
        if (currentPage == 7) return;
        else {
          ++currentPage;
          scrollTo(clientHeight * currentPage);
          screenLayout(currentPage);
        }
      }, 500);
    }
  }
});

// 마우스 휠 이벤트
document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const clientHeight = window.innerHeight;

    // 쓰로틀링 적용
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;

        // 아래로 휠다운 된 경우
        if (event.deltaY > 0) {
          // 마지막 페이지면 더이상 아래로 이동X
          if (currentPage == 7) return;
          else {
            ++currentPage;
            scrollTo(clientHeight * currentPage);
            screenLayout(currentPage);
          }
        }
        // 위로 휠업 된 경우
        if (event.deltaY < 0) {
          // 첫 페이지면 더이상 위로 이동X
          if (currentPage == 0) return;
          else {
            --currentPage;
            scrollTo(clientHeight * currentPage);
            screenLayout(currentPage);
          }
        }
      }, 500);
    }
  },
  { passive: false }
);

for (i = 0; i < pageDots.length; i++) {
  pageDots[i].addEventListener("click", (event) => {
    if (!timer1) {
      timer1 = setTimeout(function () {
        timer1 = null;
        scrollTo(
          window.innerHeight *
            Number(event.target.id.charAt(event.target.id.length - 1))
        );
        currentPage = Number(
          event.target.id.charAt(event.target.id.length - 1)
        );
        screenLayout(currentPage);
      }, 500);
    }
  });
}

window.addEventListener("resize", () => {
  setScreenSize();
});

// 페이지 이동시 화면 레이아웃 그리기
function screenLayout(currentPage) {
  switch (currentPage + 1) {
    case 1:
      // 앱 다운로드 버튼 1-0
      downloadBox.style.visibility = "hidden";
      btn_download.disabled = true;
      // 헤더 전체
      header.style.display = "flex";
      // 라이더 모집 버튼
      recruitment.display = "block";
      // 페이지 이동 도트
      pageDot.style.display = "none";
      break;
    case 2:
      drawPageDot(currentPage - 1);
      // 앱 다운로드 버튼 0-1
      downloadBox.style.visibility = "visible";
      btn_download.disabled = false;
      // 라이더 모집 버튼 1-0
      recruitment.display = "none";
      // 페이지 이동 전체도트 0-1
      pageDot.style.display = "flex";
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      break;
    case 3:
      drawPageDot(currentPage - 1);
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      break;

    case 4:
      drawPageDot(currentPage - 1);
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      break;

    case 5:
      drawPageDot(currentPage - 1);
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      break;

    case 6:
      drawPageDot(currentPage - 1);
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      break;

    case 7:
      drawPageDot(currentPage - 1);
      // 헤더 전체 0-1
      header.style.display = "flex";
      // 페이지 이동 전체도트 0-1
      pageDot.style.display = "flex";
      // 이미지 애니메이션
      imageAnimations[currentPage - 1].classList.add("active");
      // 스크롤 버튼 0-1
      scrollButton.style.display = "block";
      break;

    case 8:
      // 헤더 전체 1-0
      header.style.display = "none";
      // 페이지 이동 전체도트 1-0
      pageDot.style.display = "none";
      // 스크롤 버튼 1-0
      scrollButton.style.display = "none";
      break;
  }
}

function drawPageDot(currentPage) {
  for (i = 0; i < pageDots.length; i++) {
    if (i == currentPage) {
      pageDots[i].src =
        "https://www.baemin.com/_next/static/images/dotSelect@2x.png";
      continue;
    }
    pageDots[i].src =
      "https://www.baemin.com/_next/static/images/dotScroll02@2x.png";
  }
}

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// PC인지 모바일인지, 안드로이드인지 IOS인지 체크
function checkMobile() {
  const mobileVerification = navigator.userAgent.toLowerCase();

  let mobileType;

  if (mobileVerification.indexOf("android") > -1) {
    mobileType = "AOS";
    return mobileType;
  } else if (
    mobileVerification.indexOf("iphone") > -1 ||
    mobileVerification.indexOf("ipad") > -1 ||
    mobileVerification.indexOf("ipod") > -1
  ) {
    mobileType = "IOS";
    return mobileType;
  }
}

// 풀페이지 스크롤
const scrollTo = (yPos, duration = 600) => {
  // Easing function from https://gist.github.com/gre/1650294
  const easeOutCubic = (t) => --t * t * t + 1;
  const startY = window.scrollY;
  const difference = yPos - startY;
  const startTime = performance.now();

  const move = () => {
    const progress = (performance.now() - startTime) / duration;
    const amount = easeOutCubic(progress);
    window.scrollTo({ top: startY + amount * difference });
    if (progress < 0.99) {
      window.requestAnimationFrame(move);
    }
  };

  move();
};
