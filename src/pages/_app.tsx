
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModals'
import RegisterModal from '@/components/modals/RegisterModals'
import EditModal from '@/components/modals/EditModals';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import BottomBar from "@/components/layout/Bottombar";
import PreviewImageModal from "@/components/modals/PreviewImageModal";
import TweetModal from "@/components/modals/TweetModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal/>
      <RegisterModal/>
      <LoginModal />
      <PreviewImageModal/>
      <TweetModal/>
      <div className="sm:h-full"> 
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <BottomBar />
      </div>
      </SessionProvider>
    </>
  )
}
