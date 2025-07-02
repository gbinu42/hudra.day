import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Access Your Hudra Account",
  description:
    "Sign in to your Hudra.day account to access your personalized collection of East Syriac liturgical texts and contribute to our digital preservation project.",
  keywords: [
    "Hudra sign in",
    "login",
    "account access",
    "East Syriac texts",
    "liturgical texts login",
    "Hendo Academy login",
    "Syriac studies account",
  ],
  openGraph: {
    title: "Sign In to Hudra.day - Access Your Account",
    description:
      "Sign in to access your personalized collection of East Syriac liturgical texts and contribute to our digital preservation project.",
    url: "https://hudra.day/signin",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Sign In to Hudra.day",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sign In to Hudra.day - Access Your Account",
    description:
      "Sign in to access your personalized collection of East Syriac liturgical texts.",
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
  alternates: {
    canonical: "https://hudra.day/signin",
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
