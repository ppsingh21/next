import React from 'react';
import './globals.css';
import Image from 'next/image';
import Script from 'next/script';
import './sw-registration';
import LayoutProvider from '@/components/shop/layout/layoutContext';

export const metadata = {
  title: 'Purchase Less Driven Used Cars in Bangalore | Pran Motors',
  description:
    'Pran Motors is the best destination for buying less driven used cars in Bangalore. Check out our website to see our second hand cars and book a free test drive.',
  charset: 'utf-8',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Purchase Less Driven Used Cars in Bangalore | Pran Motors',
    description:
      'Pran Motors is the best destination for buying less driven used cars in Bangalore. Check out our website to see our second hand cars and book a free test drive.',
    images: [
      {
        url: 'https://api.pranmotors.com/uploads/customize/1711981391199_pran%20bghsdhsj.jpg',
        alt: 'Pran Motors',
      },
    ],
    url: 'https://pranmotors.com/',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="D0wHf8hppNNWTYveCr2IqnGp25888ppH0x9a0TIGQV4"
        />
      </head>
      <body>
        <Script
          id="clarity-script"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "msczf46vum");
            `,
          }}
        />
        <Script
          id="fb-pixel-script"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '458058239937282');
            fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "Localbusiness",
              "name": "Pran Motors",
              "description": "Pran Motors is the best destination for second hand cars in Bangalore. Visit our website and check out our less driven and pre owned cars.",
              "telephone": "+91-9900204243",
              "Email": "info@pranautos.com",
              "logo": "https://pranmotors.com/static/media/PRAN%20MOTORS%20Red1.5bc7e83ff22319111629.png",
              "image": "https://api.pranmotors.com/uploads/customize/1711981391199_pran%20bghsdhsj.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pran Autos, Hustle Hub Tech Park, HSR Layout Sector 2",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "addressCountry": "India",
                "postalCode": "560102"
              },
              "url": "https://pranmotors.com/",
              "sameAs" : [
                "https://www.facebook.com/people/Pran-Motors-Pre-Owned/61557625513527/?mibextid=WC7FNe&rdid=GdJ5KrHPapEbvsnL",
                "https://www.instagram.com/pranmotors/"
              ]
            }
            `,
          }}
        />
        <Script
          id="gtag-script"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QEVWRBP8LH');
            `,
          }}
        />
        <Script
          id="fallback-script"
          dangerouslySetInnerHTML={{
            __html: `
    (function() {
      var d = document, s = d.createElement('script'), b = d.getElementsByTagName('body')[0];
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s.async = true;
      s.onload = function() {
        if (window.fbq) {
          fbq('init', '458058239937282');
          fbq('track', 'PageView');
        }
      };
      b.appendChild(s);
    })();`,
          }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QEVWRBP8LH"
        />
        <noscript>
          <Image
                    loading='lazy'
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt="fbpixels"
            src="https://www.facebook.com/tr?id=458058239937282&ev=PageView&noscript=1"
          />
        </noscript>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
