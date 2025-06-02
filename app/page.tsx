import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpen,
  Globe,
  Users,
  Edit3,
  Menu,
  Church,
  Scroll,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Hudra Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-3xl font-syriac">ܚܘܼܕܪܵܐ</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#home"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#mission"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
                >
                  Mission
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#churches"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
                >
                  Churches
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#editor"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
                >
                  East Syriac Editor
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <Image
                    src="/images/logo.png"
                    alt="Hudra Logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="font-syriac text-2xl">ܚܘܼܕܪܵܐ</span>
                </SheetTitle>
                <SheetDescription>
                  Free access to Church of the East liturgical texts
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8 px-4">
                <Link
                  href="#home"
                  className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#mission"
                  className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Mission
                </Link>
                <Link
                  href="#churches"
                  className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Churches
                </Link>
                <Link
                  href="#editor"
                  className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  East Syriac Editor
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-20 px-4 lg:px-8 bg-gradient-to-t from-primary/10 via-primary/5 to-white relative overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: "url('/images/header.png')" }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Work in Progress Banner */}
            <div className="inline-block bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg font-semibold mb-6">
              🚧 Work in Progress - Coming Soon
            </div>

            <h1 className="text-4xl md:text-6xl tracking-tight mb-4">
              <span className="font-syriac text-primary">ܚܘܼܕܪܵܐ</span>
              <span className="mx-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-bold">
                Hudra
              </span>
              <span className="text-primary font-bold">ഹുദ്റാ</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
              Digital Archive of Church of the East Liturgical Texts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hudra.day is an initiative by{" "}
              <Link
                href="https://www.hendoacademy.org"
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hendo Academy
              </Link>{" "}
              dedicated to digitizing and making freely available the rich
              liturgical tradition of the Church of the East for scholars,
              clergy, and communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="text-lg px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Liturgical Texts
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                asChild
              >
                <Link href="/type">
                  <Edit3 className="mr-2 h-5 w-5" />
                  Try East Syriac Editor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preserving and freely sharing the ancient liturgical heritage of
              the Church of the East through modern digital technology, making
              these sacred texts accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Scroll className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Digitize</CardTitle>
                <CardDescription>
                  Converting ancient liturgical manuscripts and texts into
                  high-quality digital formats for preservation and access
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Share Freely</CardTitle>
                <CardDescription>
                  Making Church of the East liturgical texts freely available to
                  scholars, clergy, and communities worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Preserve</CardTitle>
                <CardDescription>
                  Ensuring the liturgical heritage of the Church of the East
                  continues to be accessible for future generations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Churches Section */}
      <section id="churches" className="py-20 px-4 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              East Syriac Churches
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our work serves the manuscript traditions of three churches that
              were part of the Church of the East tradition, each with their
              unique heritage and contributions to Christian liturgical life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Church className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Syro-Malabar Church</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  One of the oldest Christian communities in the world, tracing
                  its origins to St. Thomas the Apostle in India. Rich tradition
                  of liturgical manuscripts and theological works.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Church className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Assyrian Church of the East</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ancient apostolic church with headquarters in Erbil, Iraq.
                  Preserves the original East Syriac liturgical tradition and
                  extensive manuscript collections.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Church className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Chaldean Catholic Church</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Eastern Catholic church in full communion with Rome,
                  maintaining East Syriac traditions. Significant manuscript
                  heritage from Mesopotamia and beyond.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Syriac Editor Section */}
      <section id="editor" className="py-20 px-4 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Online East Syriac + Karshon Editor
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our advanced East Syriac + Karshon(Garshuni Malayalam) online
                text editor makes it easy to work with East Syriac and Karshon
                texts, supporting the East Syriac script with comprehensive
                typographical features for accurate transcription and study.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Full Unicode East Syriac support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Full Unicode Karshon(Garshuni Malayalam) support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Mobile First Design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Liturgical text formatting tools (WIP)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Manuscript transcription features (WIP)</span>
                </div>
              </div>

              <Button size="lg" asChild>
                <Link href="/type">
                  <Edit3 className="mr-2 h-5 w-5" />
                  Launch East Syriac Editor
                </Link>
              </Button>
            </div>
            <Link href="/type" className="cursor-pointer">
              <div className="bg-white p-8 rounded-lg shadow-lg border hover:shadow-2xl hover:scale-105 hover:border-primary/30 transition-all duration-300 ease-in-out">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded  min-h-[300px] flex items-center justify-center">
                    <div
                      className="font-syriac text-3xl leading-relaxed text-black text-justify hover:text-primary transition-colors duration-300"
                      dir="rtl"
                    >
                      ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ ܢܸـܬ݂ܩܲܕܲܫ ܫܡܵـܟ݂ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂
                      ܢܸܗܘܸܐ ܨܸܒ݂ܝܵـܢܵـܟ݂: ܐܲܝܟܲܢܵܐ ܕܒܲܫܡܲܝܵܐ ܐܵܦ ܒܐܲܪܥܵܐ.
                      ܗܲܒ݂ܠܲܢ ܠܲܚܡܵܐ ܕܣܘܼܢܩܵܢܲܢ ܝܲܘܡܵܢܵܐ: ܘܲܫܒ݂ܘܿܩ ܠܲܢ ܚܲܘ̈ܒܲܝܢ
                      ܘܲܚܛܵܗܲܝ̈ܢ: ܐܲܝܟܲܢܵܐ ܕܐܵܦ ܚܢܲܢ ܫܒܲܩܢ ܠܚܲܝܵܒܲܝ̈ܢ. ܘܠܵܐ ܬܲܥܠܲܢ
                      ܠܢܸܣܝܘܿܢܵܐ: ܐܸܠܵܐ ܦܲـܨܵܢ ܡ̣ܢ ܒܝܼܫܵܐ: ܡܸܛܠ ܕܕ݂ܝܼܠܵܟ݂ ܗ݇ܝܼ
                      ܡܲܠܟܘܼܬ݂ܵܐ ܘܚܲܝܠܵܐ ܘܬ݂ܸܫܒܘܿܚܬܵܐ ܠܥܵܠܲܡ ܥܵܠܡܝܼܢ: ܐܵܡܹܝܢ.
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Hudra Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-3xl font-syriac">ܚܘܼܕܪܵܐ</span>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                The East Syriac Breviary project(hudra.day) is dedicated to
                digitizing and freely sharing the liturgical treasures of the
                Church of the East through innovative digital solutions.
              </p>
              <div className="flex items-center space-x-2 text-white/70">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Made with love by Hendo Academy</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Liturgical Texts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link
                    href="https://www.hendoacademy.org"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hendo Academy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cross Image Column */}
            <div className="flex justify-center items-center md:items-start col-span-1 md:col-span-1">
              <Image
                src="/images/sliwa.png"
                alt="East Syriac Cross"
                width={150}
                height={150}
                className="transition-transform hover:scale-110"
              />
            </div>
          </div>

          <Separator className="bg-white/20 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
            <p>&copy; 2025 Hendo Academy. All rights reserved.</p>
            <p>Preserving sacred eastern tradition for all</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
