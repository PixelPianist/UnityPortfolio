import "@styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@components/Footer";
import NavBar from "@components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="flex-grow">
            <NavBar/>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
  );
}