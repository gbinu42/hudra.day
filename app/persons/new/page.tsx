"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { personService } from "@/lib/hymn-services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Home, Users, Plus } from "lucide-react";
import { CHURCH_TRADITIONS } from "@/lib/types/hymn";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameInSyriac: z.string().optional(),
  biography: z.string().optional(),
  birthYear: z
    .union([z.number(), z.nan()])
    .optional()
    .transform((val) =>
      val === undefined || isNaN(val as number) ? undefined : val
    ),
  deathYear: z
    .union([z.number(), z.nan()])
    .optional()
    .transform((val) =>
      val === undefined || isNaN(val as number) ? undefined : val
    ),
  church: z.string().optional(),
});

type PersonFormData = z.infer<typeof personSchema>;

const PERSON_ROLES = [
  "composer",
  "author",
  "poet",
  "performer",
  "translator",
  "scholar",
  "saint",
  "bishop",
  "priest",
  "other",
];

export default function NewPersonPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      nameInSyriac: "",
      biography: "",
      birthYear: undefined,
      deathYear: undefined,
      church: "",
    },
  });

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    if (!user) {
      router.push("/signin");
      return;
    }

    if (
      userProfile &&
      userProfile.role !== "editor" &&
      userProfile.role !== "admin"
    ) {
      router.push("/hymns");
    }
  }, [user, userProfile, router, loading]);

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const onSubmit = async (data: PersonFormData) => {
    setIsSubmitting(true);
    try {
      // Filter out undefined values for Firebase
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      ) as Partial<PersonFormData>;

      await personService.createPerson(
        {
          ...cleanData,
          name: data.name, // name is required
          role: selectedRoles,
        } as any,
        user!.uid
      );
      toast.success("Person added successfully!");
      router.push("/admin/hymns");
    } catch (error) {
      console.error("Error creating person:", error);
      toast.error("Failed to add person");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (userProfile.role !== "editor" && userProfile.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/hymns">
                    <Users className="h-4 w-4" />
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Access Denied</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
              <p className="text-muted-foreground mb-6">
                You don't have permission to add persons.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/hymns">
                  <Users className="h-4 w-4" />
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Person
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Add New Person</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Name *</Label>
                  <Input {...register("name")} placeholder="Full name" />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">
                    Name in Syriac (optional)
                  </Label>
                  <Input
                    {...register("nameInSyriac")}
                    placeholder="ܫܡܐ ܣܘܪܝܝܐ"
                    dir="rtl"
                    className="py-3"
                    style={{
                      fontFamily: "East Syriac Adiabene, serif",
                      fontSize: "1.5rem",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Birth Year (optional)</Label>
                    <Input
                      type="number"
                      {...register("birthYear", { valueAsNumber: true })}
                      placeholder="e.g., 306"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Death Year (optional)</Label>
                    <Input
                      type="number"
                      {...register("deathYear", { valueAsNumber: true })}
                      placeholder="e.g., 373"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">
                    Church Tradition (optional)
                  </Label>
                  <Select
                    value={watch("church")}
                    onValueChange={(value) => setValue("church", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select church tradition" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHURCH_TRADITIONS.map((church) => (
                        <SelectItem key={church} value={church}>
                          {church}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Biography (optional)</Label>
                  <Textarea
                    {...register("biography")}
                    placeholder="Brief biography or description"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all applicable roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {PERSON_ROLES.map((role) => (
                    <Badge
                      key={role}
                      variant={
                        selectedRoles.includes(role) ? "default" : "outline"
                      }
                      className="cursor-pointer capitalize"
                      onClick={() => toggleRole(role)}
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/hymns")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add Person"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
