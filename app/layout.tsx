import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import "./globals.css";

export const metadata = {
  title: "TrueTrip - Travel Supply Chain",
  description: "Transparent and efficient travel supply-chain system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}