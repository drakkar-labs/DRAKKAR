import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dräkkar Labs — Ingeniería Inteligente para la Próxima Era Digital",
  description:
    "Dräkkar Labs diseña infraestructura potenciada por IA, plataformas de software inteligente y sistemas cloud escalables que redefinen la forma en que se construye y despliega la tecnología.",
  keywords: [
    "inteligencia artificial",
    "infraestructura cloud",
    "software empresarial",
    "aprendizaje automático",
    "DevOps",
    "ingeniería de plataformas",
    "Dräkkar Labs",
  ],
  openGraph: {
    title: "Dräkkar Labs — Ingeniería Inteligente para la Próxima Era Digital",
    description:
      "Diseñamos infraestructura potenciada por IA, plataformas de software inteligente y sistemas cloud escalables.",
    type: "website",
    locale: "es_ES",
    siteName: "Dräkkar Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dräkkar Labs — Ingeniería Inteligente para la Próxima Era Digital",
    description:
      "Diseñamos infraestructura potenciada por IA, plataformas de software inteligente y sistemas cloud escalables.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#050816",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <noscript>
          <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Dräkkar Labs</h1>
              <p className="text-muted/60 mb-6">
                Esta sitio requiere JavaScript para funcionar correctamente.
              </p>
              <a href="https://github.com/gpb-industries/DRAKKAR" className="text-gold underline">
                Visita nuestro GitHub
              </a>
            </div>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
