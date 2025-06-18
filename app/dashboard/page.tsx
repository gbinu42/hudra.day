import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleDashboard } from "@/components/RoleDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requireAuth={true}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Personalized experience based on your role and permissions
            </p>
          </div>
          <RoleDashboard />
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
