import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Create Your Hudra Account",
  description:
    "Create a free account on Hudra.day to access East Syriac liturgical texts, contribute to our digital preservation project, and connect with the global Church of the East community.",
  keywords: [
    "Hudra sign up",
    "create account",
    "register",
    "East Syriac texts",
    "liturgical texts registration",
    "Hendo Academy registration",
    "Syriac studies community",
    "free account",
  ],
  openGraph: {
    title: "Sign Up for Hudra.day - Create Your Free Account",
    description:
      "Create a free account to access East Syriac liturgical texts and contribute to our digital preservation project.",
    url: "https://www.hudra.day/signup",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Sign Up for Hudra.day",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sign Up for Hudra.day - Create Your Free Account",
    description:
      "Create a free account to access East Syriac liturgical texts and contribute to our preservation project.",
  },
  robots: {
    index: false, // Don't index signup pages
    follow: true,
  },
  alternates: {
    canonical: "https://www.hudra.day/signup",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
