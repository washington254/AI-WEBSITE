import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { ThemeProvider } from "next-themes";
import { Navbar } from '@/components/Navbar';
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body>
        <ThemeProvider attribute="class">
          <Navbar />
          <Layout>{children}</Layout>
          <PopupWidget />
        </ThemeProvider>
        {/* <Cta /> */}
      </body>
    </html>
  )
}
