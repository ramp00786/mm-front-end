import '@/styles/globals.css';
import '@/styles/lib/owlcarousel/assets/owl.carousel.min.css';
import '@/styles/bootstrap.min.css';
import '@/styles/theme.css';
import '@/styles/hover.css'
import NextNProgress from 'nextjs-progressbar';

import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
