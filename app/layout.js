import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Mini Shop",
  description: "Shop Admin by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}