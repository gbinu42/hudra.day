"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Globe, Users, Edit3, Church, Scroll } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <Navbar />

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
              Digital Archive of East Syriac Liturgical Texts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hudra.day is an initiative by{" "}
              <a
                href="https://www.hendoacademy.org"
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hendo Academy
              </a>{" "}
              dedicated to digitizing and making freely available the rich
              Eastern Syriac liturgical tradition for scholars, clergy, and
              communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/books">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Liturgical Texts
                </Link>
              </Button>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/hymns">
                  <Scroll className="mr-2 h-5 w-5" />
                  Browse Hymns
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                asChild
              >
                <a href="/type">
                  <Edit3 className="mr-2 h-5 w-5" />
                  Try East Syriac Editor
                </a>
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
              Preserving and freely sharing the ancient Eastern Syriac
              liturgical heritage through modern digital technology, making
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
                  Making Eastern Syriac liturgical texts freely available to
                  scholars, clergy, and communities worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Preserve</CardTitle>
                <CardDescription>
                  Ensuring the Eastern Syriac liturgical heritage continues to
                  be accessible for future generations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section id="quick-access" className="py-20 px-4 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore the Library
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive into our growing collection of liturgical texts and hymns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
                <CardTitle className="text-2xl">Liturgical Texts</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-base">
                  Browse our collection of digitized East Syriac liturgical
                  books, including the Hudra and other sacred texts
                </CardDescription>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/books">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Books
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <Scroll className="h-16 w-16 mx-auto text-primary mb-4" />
                <CardTitle className="text-2xl">Hymns & Prayers</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-base">
                  Explore individual hymns, prayers, and liturgical texts with
                  translations and annotations
                </CardDescription>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/hymns">
                    <Scroll className="mr-2 h-5 w-5" />
                    Browse Hymns
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Churches Section */}
      <section id="churches" className="py-20 px-4 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              East Syriac Churches
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our work serves the manuscript traditions of four churches that
              were part of the East Syraic tradition, each with their unique
              heritage and contributions to Christian liturgical life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Church className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Ancient Church of the East</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Apostolic church that maintains the traditional East Syriac
                  liturgy and theological heritage, with communities primarily
                  in Iraq and the diaspora.
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
      <section id="editor" className="py-20 px-4 lg:px-8 bg-slate-50">
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
                <a href="/type">
                  <Edit3 className="mr-2 h-5 w-5" />
                  Launch East Syriac Editor
                </a>
              </Button>
            </div>
            <a href="/type" className="cursor-pointer">
              <div className="bg-white p-8 rounded-lg shadow-lg border hover:shadow-2xl hover:scale-105 hover:border-primary/30 transition-all duration-300 ease-in-out">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded  min-h-[300px] flex items-center justify-center">
                    <div
                      className="font-east-syriac-malankara-classical text-3xl leading-relaxed text-black text-justify hover:text-primary transition-colors duration-300"
                      dir="rtl"
                    >
                      ܐܲܒ݂ܘܼܢ ܕܒܲܫܡܲܝܵܐ ܢܸـܬ݂ܩܲܕܲܫ ܫܡܵـܟ݂ ܬܹܐܬܸܐ ܡܲܠܟܘܼܬ݂ܵܟ݂
                      ܢܸܗܘܸܐ ܨܸܒ݂ܝܵـܢܵـܟ݂: ܐܲܝܟܲܢܵܐ ܕܒܲܫܡܲܝܵܐ ܐܵܦ ܒܐܲܪܥܵܐ.
                      ܗܲܒ݂ܠܲܢ ܠܲܚܡܵܐ ܕܣܘܼܢܩܵܢܲܢ ܝܵܘܡܵܢܵܐ: ܘܲܫܒ݂ܘܿܩ ܠܲܢ ܚܵܘ̈ܒܲܝܢ
                      ܘܲܚܛܵܗܲܝ̈ܢ: ܐܲܝܟܲܢܵܐ ܕܐܵܦ ܚܢܲܢ ܫܒܲܩܢ ܠܚܲܝܵܒܲܝ̈ܢ. ܘܠܵܐ ܬܲܥܠܲܢ
                      ܠܢܸܣܝܘܿܢܵܐ: ܐܸܠܵܐ ܦܲـܨܵܢ ܡ̣ܢ ܒܝܼܫܵܐ: ܡܸܛܠ ܕܕ݂ܝܼܠܵܟ݂ ܗ݇ܝܼ
                      ܡܲܠܟܘܼܬ݂ܵܐ ܘܚܲܝܠܵܐ ܘܬ݂ܸܫܒܘܿܚܬܵܐ ܠܥܵܠܲܡ ܥܵܠܡܝܼܢ: ܐܵܡܹܝܢ.
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
