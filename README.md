# onebite-nextjs

## 정리

### 프로젝트 생성 명령어

```shell
npx create-next-app@14 [프로젝트명]
```

### 페이지 라우터

- src밑에 폴더명 그대로 url path가 됨
  - src/search.tsx 또는 src/search/index.tsx
- search/111와같은 형태는 src/search/[id].tsx 으로 만들면 되고 ```const {id} = router.query``` 이렇게 이름을 맞춰서 꺼내쓰면됨
- search/111/222/333 처럼 복합한 경로는 src/search/[...id].tsx로 만들면 되고 이는 catch all segment 이라함
- index.tsx 기능까지 하고 싶다면 src/search/[[...id]].tsx로 만들고 이건 optional catch all segment 이라함함

### 네비게이팅

- a태그와 동일 기능을 하는 ```next/link의 Link``` 컴포넌트를 사용
- 동적인 방법은 ```useRouter```의 push로 가능

### 프리페칭

- 단어 그대로 미리 페이지를 불러와서 보여줄 상황이 발생했을때 바로 보여줌
- 개발자 도구 네트워크 탭에서 확인이 가능하고 ```npm run dev```는 개발 모드라서 프리페칭을 하지않으니 빌드해서 시작하기
- 기본적으로는 Link 컴포넌트를 사용했을때만 프리페칭을함
- ```router.push("/test")```와 같은 동적인 이동도 프리페칭할라면 ```router.prefetch("/test")```로 만들면됨
- 만약 Link 컴포넌트의 프리페칭은 않하고 싶다면 Linck 컴포넌트에 ```prefetch={false}``` 추가

### API Routes

- /src/api/hello.ts 경로의 파일을 api path로 사용할 수 있음
- 강의에서는 언급하지 않으니 이런게 있다 정도만 기억하자

### 스타일링

- css의 충돌을 막기 위해 App 컴포넌트에서만 글로벌 css를 import 가능
- next는 모듈 css를 지원
  - index.module.css로 만들면 tsx 파일에서 import 가능

### 사전 렌더링과 데이터 페칭

- 리액트은 마운트 이후에 데이터 페칭을 요청해서 렌더링 완료 시간 +_페칭 시간으로 생각 보다 오래걸리 수 있음
- next는 이런 단점을 보완하고자 사전 렌더링 중 데이터 페칭을 할수 있음
- 사전 렌더링 종류로 1) SSR, 2) SSG, 3) ISR가 있음
- 혹시나 페칭 데이터가 많거나, 서버 상태가 안좋아서 오래걸릴 수도 있는데 이건 빌드타임으로도 해결 가능

### SSR

- tsx파일안에 SSR을 사용하는 약속의 함수를 만들면 간단하게 할 수 있음

```typescript
export const getServerSideProps = () => {
  // 컴포넌트 보다 먼저 실행됨

  const data = "hello world";

  return {
    props: {
      data,
    },
  };
};
```

### SSG

- build 할때 페이지를 렌더링하고 요청이 오면 즉각적 응답
- 대신 데이터 최신 반영이 어려움
- 당연히? 개발 모드로는 안됨
- 그리고 미리 렌더링되니까 getStaticProps는 query string을 받아올수 없고 search 페이지 같은 경우 원래는 SSG 방식이 불가능
- 동적 페이지는 getStaticPaths 추가 필요
- SSG

### ISR

- 특정 시간 이후의 다시 생성
- 시간과 상관없이 사용자 행동으로 최신 데이터가 변경되는 경우 ISR은 적합하지 않을 수 있음
- 그래서 요청을 받을때 마다 다시 생성하는 방식을 on-demand ISR 이라함
- 요즘 이 방식을 많이 사용
