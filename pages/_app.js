import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';
import useScrollRestoration from '../hooks/useScrollRestoration';
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(()=>{

    Aos.init({
        duration:800,
        once:true,
    })
  },[])
return (
    <>
      <Navbar />
      <main className="pt-11">
        <Component {...pageProps} />
      </main>
    </>
  );
}
