"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/hooks/useAuth";
import { personService } from "@/lib/hymn-services";
import { Person } from "@/lib/types/hymn";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home, Users, Edit } from "lucide-react";
import { CHURCH_TRADITIONS } from "@/lib/types/hymn";

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

interface PersonEditClientProps {
  personId: string;
}

export default function PersonEditClient({ personId }: PersonEditClientProps) {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
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
  });

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

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
  }, [user, userProfile, router, authLoading]);

  useEffect(() => {
    if (!personId) return;

    const fetchPerson = async () => {
      try {
        const snapshot = await personService.getPersonById(personId);
        if (snapshot.exists()) {
          const data = snapshot.data();
          const personData: Person = {
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
          } as Person;
          setPerson(personData);
          setValue("name", personData.name);
          setValue("nameInSyriac", personData.nameInSyriac || "");
          setValue("biography", personData.biography || "");
          setValue("birthYear", personData.birthYear);
          setValue("deathYear", personData.deathYear);
          setValue("church", personData.church || "");
          setSelectedRoles(personData.role || []);
        }
      } catch (error) {
        console.error("Error fetching person:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [personId, setValue]);

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

      await personService.updatePerson(personId, {
        ...cleanData,
        name: data.name, // name is required
        role: selectedRoles,
      } as any);
      toast.success("Person updated successfully!");
      router.push("/admin/hymns");
    } catch (error) {
      console.error("Error updating person:", error);
      toast.error("Failed to update person");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userProfile.role !== "editor" && userProfile.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-16 space-y-4">
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
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You don't have permission to edit persons.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container mx-auto px-4 py-16 space-y-4">
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
              <BreadcrumbPage>Not Found</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Person Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The person you're trying to edit doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
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
                <Edit className="h-4 w-4" />
                Edit Person
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Person</h1>

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
                <Label className="mb-2 block">Name in Syriac (optional)</Label>
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
              {isSubmitting ? "Saving..." : "Update Person"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
