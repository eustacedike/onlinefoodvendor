import { Geist, Geist_Mono, Dancing_Script, Inter, Playfair_Display, Electrolize } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
// import { GlobalProvider } from '@/context/context';
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
// import { AlertProvider } from "@/context/AlertContext";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${electrolize.variable} ${playfairDisplay.variable} ${dancingScript.variable}`}>
      <body>
      {/* <AlertProvider> */}
        <ProductProvider>
          <CartProvider>
            
          <Navbar />
          {children}
          <Footer />
          </CartProvider>
        </ProductProvider>
        {/* </AlertProvider> */}

      </body>
    </html>
  );
}
