
 import './globals.css'
import Footer from './components/footer/Footer'
import NavBar from './components/nav/Nav'
import PNav from './components/PNav'
import { Toaster } from 'react-hot-toast'
import AuthProvider from'../providers/AuthProvider'
import { MProvider } from './context/context'
import MYProvider from '../providers/mprovider'
import Container from './components/Contaner'


export const metadata = {
  title: 'فعاليات ندوات ',
  description: 'اكتشف الفعاليات و ارسل دعوات',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      {/* <body className={inter.className}> */}
      <body>
        <AuthProvider>
         <MProvider>
        
      <PNav />
      {children}

      <Toaster />
        <Footer/>
        </MProvider>
        </AuthProvider>
        </body>
      
     
    </html>
  )
}
