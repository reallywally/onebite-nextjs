import { Html, Head, Main, NextScript } from "next/document";

// 모든 페이지에서 공통으로 적용되어야하는 부분
// GA, font, meta tag 등등
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
