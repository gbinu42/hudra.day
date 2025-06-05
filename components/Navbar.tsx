"use client";

import { Button } from "@/components/ui/button";
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
import { Menu, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Navbar() {
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Hudra Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-3xl font-syriac">ܚܘܼܕܪܵܐ</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#mission"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
              >
                Mission
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#churches"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
              >
                Churches
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/type"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus:text-primary focus:outline-none"
              >
                East Syriac Editor
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-3">
          {!loading && user ? (
            // Show user info and sign out when authenticated
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {user.displayName || user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
                asChild
              >
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-primary hover:text-primary/80"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : !loading ? (
            // Show signin/signup when not authenticated
            <>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
                asChild
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : null}
        </div>

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
                href="/"
                className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#mission"
                className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Mission
              </Link>
              <Link
                href="/#churches"
                className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Churches
              </Link>
              <Link
                href="/editor"
                className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
              >
                East Syriac Editor
              </Link>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {!loading && user ? (
                  // Show user info and sign out when authenticated
                  <>
                    <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:text-primary/80 justify-start"
                      asChild
                    >
                      <Link href="/profile">
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-primary hover:text-primary/80 justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : !loading ? (
                  // Show signin/signup when not authenticated
                  <>
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:text-primary/80 justify-start"
                      asChild
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
