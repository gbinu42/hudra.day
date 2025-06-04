"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { sendPasswordResetEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Send password reset email using Firebase
      await sendPasswordResetEmail(values.email);

      toast.success("Password reset email sent! Check your inbox.");
      setIsEmailSent(true);
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      let errorMessage =
        "Failed to send password reset email. Please try again.";

      if (error instanceof Error) {
        // Handle specific Firebase error codes
        if (error.message.includes("auth/user-not-found")) {
          errorMessage = "No account found with this email address.";
        } else if (error.message.includes("auth/invalid-email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (error.message.includes("auth/too-many-requests")) {
          errorMessage = "Too many requests. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.push("/signin");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Hudra Logo"
                width={64}
                height={64}
                className="h-16 w-16"
                priority
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isEmailSent ? "Check your email" : "Reset your password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isEmailSent
                ? "We have sent a password reset link to your email address"
                : "Enter your email address and we will send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEmailSent ? (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send reset link"}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  <Button
                    variant="ghost"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={handleGoBack}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm underline-offset-4 hover:underline"
                    onClick={() => {
                      setIsEmailSent(false);
                      form.reset();
                    }}
                  >
                    try again
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
