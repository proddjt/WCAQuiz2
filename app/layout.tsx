import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import i18n from '@/app/translation/i18n';

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Particles from "@/components/ParticlesBg";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  verification: {
    google: siteConfig.googleVerification,
  },
  openGraph: {
    type: "website",
    url: siteConfig.canonicalUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://wcaquiz.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WCAQuiz preview",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://wcaquiz.xyz",
              name: "WCAQuiz",
              description: "An independent web-app based on World Cube Association world. It allows you to play various quizzes based on WCA data.",
              image: "https://wcaquiz.xyz/og-image.jpg",
            }),
          }}
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-transparent font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-[-1] h-full">
              <Particles 
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={20}
                speed={0.5}
                particleBaseSize={200}
                moveParticlesOnHover={false}
                alphaParticles={true}
                disableRotation={true}
              />
            </div>

            <main className="pt-16 px-4 flex-grow h-full flex justify-center items-center">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
