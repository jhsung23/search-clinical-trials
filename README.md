# Search Clinical Trials

> 원티드 프론트엔드 온보딩 3주차 과제입니다.
>
> - 개발자: 성지현
> - 개발 기간: 2023.09.06

검색어 추천 및 캐싱 기능을 제공하는 웹 사이트입니다.

## 📄 과제 요구사항

- 질환명 검색 시 api 호출하여 검색어 추천 기능 구현
- api 호출 별 로컬 캐싱 구현 및 expire time 설정
- 입력마다 api 호출하지 않도록 api 호출 횟수 줄이기
- 키보드로 추천 검색어 이동하기

## 🔗 배포 링크

> 🚨 본 배포 링크는 서버가 연결되지 않았기 때문에 동작하지 않습니다.

[https://search-clinical-trials.vercel.app](https://search-clinical-trials.vercel.app)

## 🏃‍♂️ 실행 방법

[이 레포지토리](https://github.com/walking-sunset/assignment-api)의 서버를 로컬에서 실행한 다음 본 레포지토리를 `clone`하여 다음 명령어를 입력해 주세요.

```bash
yarn
yarn dev
```

위 명령어 입력 후 `http://localhost:5173/`에 접속해 주세요.

## 🎬 실행 화면

![Sep-06-2023 19-08-04](https://github.com/jhsung23/search-clinical-trials/assets/69228045/2e14a540-d8cb-476a-8303-29985c157b6f)

## 🧑🏻‍💻 개발 내용

### 키보드 입력에 따른 잦은 api 요청 줄이기

콜백이 연속으로 호출될 경우 마지막 호출만 실행시키는 useDebounce 커스텀 훅을 만들어 0.3초 간 입력이 없다면 api 요청을 전송하도록 했습니다.

```tsx
const searchRelatedKeywords = useDebounce(async (targetKeyword: string) => {
  if (targetKeyword.length === 0) return;
  try {
    const response = await getRelatedKeywords(targetKeyword);
    setRelatedKeywords(response.data);
  } catch (e) {
    console.error(e);
  }
}, 300);
```

### api 응답을 캐싱하여 사용하기

검색한 적 있는 검색어를 짧은 시간 내에 다시 검색할 때 발생하는 요청을 줄이기 위해 응답을 캐싱하여 사용했습니다.

응답은 빠른 속도로 데이터를 가져올 수 있다는 이점이 있는 브라우저의 캐시 스토리지에 저장하였고, 이를 사용하기 위한 [인터페이스](https://github.com/jhsung23/search-clinical-trials/blob/main/src/apis/CacheStorageAPI.ts)를 만들었습니다.

api 요청 전, 캐시 스토리지에 캐싱된 응답이 있는지 확인하고 응답 저장 시간과 현재 시간을 비교하여 만료 시간이 지나지 않았다면 api 요청 없이 캐싱된 응답을 사용합니다.

캐싱된 응답이 없거나 만료 시간이 지난 응답이라면 api 요청을 보내고, 그 응답을 캐싱하여 사용합니다.

```tsx
const getRelatedKeywords = async (targetKeyword: string) => {
  const cachedUrl = `${END_POINT}?q=${targetKeyword}`;
  const cachedResponse = await cacheStorageApi.get(cachedUrl);
  if (cachedResponse) {
    return cachedResponse;
  }

  console.info('calling api');
  const response = await axiosInstance.get<RelatedKeyword[]>(END_POINT, {
    params: { q: targetKeyword },
  });
  cacheStorageApi.set(`${END_POINT}?q=${targetKeyword}`, response);
  return response;
};
```

### 키보드로 추천 검색어 포커싱하기

키보드의 `arrow up` 키와 `arrow down` 키를 눌러 추천 검색어 포커싱을 이동할 수 있게 구현했습니다.

검색창(input) 컴포넌트에 포커스되어 있을 때, `arrow up` 키와 `arrow down` 키를 눌러 onKeyDown 이벤트가 트리거될 경우 선택한 아이템의 인덱스 번호를 가지는 상태를 업데이트합니다.

```tsx
if (event.key === 'ArrowUp' && selectedIndex >= 0) {
  setSelectedIndex((prev) => prev - 1);
}
if (event.key === 'ArrowDown' && selectedIndex < relatedKeywords.length - 1) {
  setSelectedIndex((prev) => prev + 1);
}
```

검색어를 입력한 뒤 바로 `arrow down` 키를 눌렀을 때, 이벤트가 두 번 트리거되는 문제점이 있었습니다.

이는 한글 같은 조합 문자에서 발생하는 문제로, native event의 isComposing이 true인 경우 이벤트 처리를 중지시킴으로써 해결했습니다.

```tsx
if (event.nativeEvent.isComposing) return;
```

## 🛠️ 기술 스택

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/react router-CA4245?style=flat&logo=react router&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white">
</div>
