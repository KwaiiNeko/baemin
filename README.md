# baemin

![image4](https://user-images.githubusercontent.com/121163873/235456623-55785b25-d4d6-421a-88d3-694f13a7804e.gif)

1. Project Intro
1-1. 프로젝트 소개
· 서비스를 소개하는 배달의민족 페이지 제작
· Fullpage.js 라이브러리 없이 Vanilla JS로 구현

1-2. 구성원
· 개인 프로젝트

1-3. 적용기술
· html5
· CSS
· JavaScript

2. Main Features
2-1. 접속 디바이스 확인
접속한 유저가 PC인지 모바일인지, 모바일이라면 안드로이드인지 아이폰인지에 따라 제공해야 하는 서비스가 다르므로 접속 디바이스를 확인하는 함수를 사용했습니다.

```
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
```

2-2. 마우스 휠 클릭으로 화면이동 막기
풀페이지에서 마우스 휠 클릭으로 화면을 이동하게 되면 의도한 바와 다르게 화면이 이동되는 문제가 발생하여 마우스 휠 클릭을 제한합니다.

```
document.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
        event.preventDefault();
    }
})
```

2-3. 모바일 스와이프(드래그) 방향 인식
당연히 기본적인 기능으로 제공되어 있을것이라고 생각한 모바일에서 스와이프 시 방향 인식에 대한 기능이 없어 당황했습니다.
모바일 유저가 처음 터치한 위치와 손을 뗀 위치의 좌표를 계산하여 스와이프 방향을 인식합니다.

```
document.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageY; // 터치가 끝나는 위치 저장
    if (startPoint < endPoint) {
        // 위로 스와이프 된 경우
        const clientHeight = window.innerHeight;

        // 쓰로틀링 적용
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;

                if (currentPage == 1) return;
                else {
                    currentPage--;
                    window.scrollBy(0, -clientHeight);
                    screenLayout(currentPage);
                }
            }, 500);
        }
    } else if (startPoint > endPoint) {
        // 아래로 스와이프 된 경우
        const clientHeight = window.innerHeight;

        // 쓰로틀링 적용
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;

                if (currentPage == 8) return;
                else {
                    currentPage++;
                    window.scrollBy(0, clientHeight);
                    screenLayout(currentPage);
                }
            }, 500);
        }
    }
});
```

2-4. 모바일 브라우저별 vh수치 조절

```
function setScreenSize() {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
```

3. Review
3-1. 풀페이지
프로젝트 시작 전, 인터넷에 이번 프로젝트의 가장 핵심 기능인 풀페이지에 관해 검색해본 적이 있었습니다. 그리고 단 하나도 빠짐없이 모든 글들이 "풀페이지 구현 도중 실패했습니다. Fullpage.js 라이브러리 사용합니다." 라는 글 뿐이었습니다.

그래서 이번 프로젝트를 시작하면서 차라리 실패하더라도 왜 사람들이 라이브러리를 반드시 사용하는지, 어떠한 점에서 문제가 발생하는지, 그리고 그 문제를 해결하려고 노력하는 과정에서의 실력 향상과 적절한 라이브러리의 사용 필요성에 대해 직접 경험해보고자 진행했습니다.

문제점 1. 브라우저 별 반응이 다름.
동일한 코드임에도 불구하고 네이버 웨일브라우저에서는 스크롤 시 화면이동 속도가 유독 빨랐고, 모바일 삼성브라우저에서는 스크롤 시 정상적으로 작동하다가 중간에 갑자기 화면이 튀어버리는 버그가 발생했습니다.
PC&모바일 크롬 엣지에서는 정상적으로 작동했습니다.

문제점 2. 모바일에서의 작동에서 오류발생
100% 정석적인 행동으로 화면을 사용하면 작동에는 문제가 없습니다.
하지만 모바일에서 스크롤을 매우 빠른속도로 연타한다거나, 새로고침을 미친듯이 한다거나, 여러 손가락으로 동시에 화면을 터치하는 등의 예외적인 상황에서는 의도하지 않은 여러가지 문제점들이 발생했습니다.

문제점 3. 모바일 브라우저 별 url Bar, nav Bar 크기로 인한 100vh 오류
풀페이지를 위해 각 페이지의 height를 100vh로 적용하여 프로젝트를 진행했으나 카카오톡 인앱브라우저, 삼성 인터넷 브라우저 등에서 100vh가 정상적으로 적용되지 않아 화면이 이상하게 잘리는 문제가 발생했습니다.

==========================

이러한 점들로 인해 결국 만족스러운 결과를 완성할 수 없었고, 개인적인 방법으로는 도저히 해결할 수 없었습니다.

3-2. 크로스 브라우징
위의 문제점과 연결된다고 볼 수 있을 것 같습니다.
PC만 하더라도 크롬, 웨일, 파이어폭스, 오페라 등이 있을 뿐만 아니라 모바일로 영역을 넓힌다면 더욱 답이 없어집니다. 안드로이드 크롬, 웨일, 엣지, 파이어폭스, 삼성인터넷브라우저와 애플의 사파리, 카카오톡의 인앱브라우저 등이 있습니다.

프로젝트 시작 전만 하더라도 만악의 근원 인터넷 익스플로러가 없어졌기 때문에 이제는 큰 문제가 되지 않을것이라고 생각하고 진행했습니다.
아주 오래된 코드나 너무 최신의 코드만 사용하지 않으면 문제가 되지 않을것이라고 생각했고, 반응형으로 제작할 것을 생각해서 크기만 잘 조절해주면 문제가 없을것이라고 생각했습니다.

하지만 브라우저별 url Bar, nav Bar가 각각 존재하는지도 다르고, 같은 코드도 실행에 문제가 발생하는 브라우저도 생기고, 각 브라우저별로 개인설정이 따로 들어가는 등 생각보다 문제가 많았습니다.

3-3. 반응형 웹
처음 프로젝트를 시작할 때 PC버전을 우선하여 만들고, PC버전이 완성되면 그때 미디어 쿼리를 이용하여 사이즈와 존재여부만 건들면 된다고 생각했습니다.

그래서 웹 제작 당시 px단위를 남발하여 우선 웹부분을 완성하는데 집중하였고,
웹 완성 이후에 모바일을 끼워맞추기 시작하면서 잘못되었음을 인식했습니다.

앞으로는 PC버전을 만들때 모바일을 미리 생각하여 적절한 %, vw, vh, em, rem등 적절한 단위를 사용해야 한다고 느꼈습니다.

==========================

4. 최종결론
프로젝트 완성도에 만족하느냐? 라고 한다면 만족할 수 없다고 대답할 것입니다.
원래 목표였던 PC에서는 문제없이 원하는 100%를 달성했다고 생각하지만, 생각보다 모바일에 대해서는 부족함을 많이 느꼈습니다.

지금 당장 개인으로는 여기서 더 혼자서 시간을 갈아넣고 인터넷을 조사해본다고 한들 모바일 크로스브라우징에 대한 해결책은 찾기 어려울것이라고 생각합니다.
이번 프로젝트를 진행하면서 가장 많은 시간을 잡아먹었지만 해결하지 못한 부분이라고 생각하고, 직접 경험을 통해 해결 할 수 있는 회사나 사수분을 만나 이러한 문제를 해결하는 방법을 배우고 싶습니다.
