import "@styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
  );
}