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
