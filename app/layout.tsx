import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Particles from "@/components/ParticlesBg";

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
        url: "https://wcaquiz.vercel.app/og-image.jpg",
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
      <head/>
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
            <footer className="w-full flex items-center justify-center py-3 mt-10 lg:gap-2 gap-1 lg:flex-row flex-col">
              <Link
                isExternal
                className="flex items-center gap-1 text-current lg:text-sm text-xs"
                href="https://github.com/proddjt"
                title="giovanni tramontano github profile"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Giovanni Tramontano</p>
              </Link>
              <span className="lg:inline hidden">|</span>
              <Link isExternal className="flex items-center gap-1 text-current lg:text-sm text-xs" title="carmen gravano contact" href="mailto:carmen.grav998@gmail.com">
                <span className="text-default-600">Graphics by</span>
                <p className="text-primary">Carmen Gravano</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
