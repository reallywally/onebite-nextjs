import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// 모든 컴포넌트의 부모
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
