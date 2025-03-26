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
