
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModals'
import RegisterModal from '@/components/modals/RegisterModals'
import EditModal from '@/components/modals/EditModals';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal/>
      <RegisterModal/>
      <LoginModal />
     
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </>
  )
}
