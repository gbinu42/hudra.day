import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserManagement } from "@/components/admin/UserManagement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requiredRole="admin">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Administration Panel
            </h1>
            <p className="text-muted-foreground">
              Manage users and system settings
            </p>
          </div>
          <UserManagement />
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
