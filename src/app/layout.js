

import { Geist, Geist_Mono, Dancing_Script, Inter, Playfair_Display, Electrolize } from "next/font/google";
import "./globals.css";
import Script from "next/script";
// import 'leaflet/dist/leaflet.css';
import { headers } from "next/headers";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
// import { GlobalProvider } from '@/context/context';
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { AlertProvider } from "@/context/AlertContext";
import { OrderProvider } from "@/context/OrderContext";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

// const inter = Inter({
//   variable: "--primary-font",
//   subsets: ["latin"],
// });
const electrolize = Electrolize({
  variable: "--primary-font",
  subsets: ["latin"],
  weight: ['400']
});

const playfairDisplay = Playfair_Display({
  variable: "--secondary-font",
  subsets: ["latin"],
});


export const metadata = {
  title: "Aebis Unique Menu",
  description: "Order your meal today",
};

export default async function RootLayout({ children }) {

  const headersList = await headers()
  const pathname = headersList.get('x-pathname')


  // Pages that need completely different root layout
  const alternativeLayoutPages = ['/admin/dashboard'];

  // console.log("RootLayout pathname:", !alternativeLayoutPages.includes(pathname));

  // if (alternativeLayoutPages.includes(pathname)) {
  //   return (
  //     <html>
  //       <body>
  //         {children}
  //       </body>
  //     </html>
  //   )
  // }

  return (
    <html lang="en" className={`${electrolize.variable} ${playfairDisplay.variable} ${dancingScript.variable}`}>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body
      style={{ padding: alternativeLayoutPages.includes(pathname) ? '0' : null }}
      className={`${electrolize.variable} ${playfairDisplay.variable} ${dancingScript.variable}`}>
        <AlertProvider>
          <OrderProvider>
            <ProductProvider>
              <CartProvider>
                {(!alternativeLayoutPages.includes(pathname)) && <Navbar />}
                {/* <Navbar /> */}
                {children}
                {(!alternativeLayoutPages.includes(pathname)) && <Footer />}

                {/* <Footer /> */}

              </CartProvider>
            </ProductProvider>
          </OrderProvider>
        </AlertProvider>

      </body>
    </html>
  );
}
