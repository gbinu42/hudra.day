"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/hooks/useAuth";
import { UserProfile, UserRole } from "@/lib/types/auth";
import { RBACService } from "@/lib/rbac";
import { usePermissions } from "@/lib/rbac";
import { Crown, Edit, Eye, UserX, UserCheck, Settings } from "lucide-react";

export function UserManagement() {
  const {
    userProfile,
    getAllUsers,
    updateUserRole,
    deactivateUser,
    activateUser,
    loading: authLoading,
  } = useAuth();

  const permissions = usePermissions(userProfile?.role || null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("viewer");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchUsers = async () => {
    // Don't fetch if user is not authenticated
    if (!userProfile?.uid) {
      console.log("No authenticated user, skipping fetch");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const usersList = await getAllUsers();
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch users if we have an authenticated user
    if (userProfile && userProfile.uid) {
      fetchUsers();
    }
  }, [userProfile]);

  const handleRoleChange = async () => {
    if (!selectedUser || !userProfile) return;

    try {
      // Validate the role assignment
      if (
        !RBACService.isValidRoleAssignment(
          userProfile.role,
          selectedUser.role,
          newRole
        )
      ) {
        alert("Invalid role assignment");
        return;
      }

      await updateUserRole(selectedUser.uid, newRole);
      await fetchUsers(); // Refresh the list
      setIsDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role");
    }
  };

  const handleUserStatusToggle = async (user: UserProfile) => {
    try {
      if (user.isActive) {
        await deactivateUser(user.uid);
      } else {
        await activateUser(user.uid);
      }
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Failed to update user status");
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      case "editor":
        return <Edit className="h-4 w-4" />;
      case "viewer":
        return <Eye className="h-4 w-4" />;
    }
  };

  const openRoleDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsDialogOpen(true);
  };

  // Show loading state while authentication is being determined
  if (authLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">Loading authentication...</p>
        </CardContent>
      </Card>
    );
  }

  // Check if current user can access this component
  if (!permissions.canManageUsers) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            You don't have permission to access user management.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">Loading users...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.uid}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  !user.isActive ? "opacity-50 bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined: {user.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Role Badge */}
                  <Badge
                    variant="outline"
                    className={`${RBACService.getRoleColor(user.role)}`}
                  >
                    <span className="flex items-center space-x-1">
                      {getRoleIcon(user.role)}
                      <span>{RBACService.getRoleDisplayName(user.role)}</span>
                    </span>
                  </Badge>

                  {/* Status Badge */}
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {/* Role Change Button - only for non-admin users */}
                    {user.role !== "admin" && user.uid !== userProfile?.uid && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openRoleDialog(user)}
                      >
                        Change Role
                      </Button>
                    )}

                    {/* Status Toggle Button - only for non-admin users */}
                    {user.role !== "admin" && user.uid !== userProfile?.uid && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserStatusToggle(user)}
                      >
                        {user.isActive ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Change Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Change the role for{" "}
              {selectedUser?.displayName || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Role</label>
              <p className="text-sm text-muted-foreground">
                {selectedUser &&
                  RBACService.getRoleDisplayName(selectedUser.role)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">New Role</label>
              <Select
                value={newRole}
                onValueChange={(value: UserRole) => setNewRole(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userProfile &&
                    RBACService.getAssignableRoles(userProfile.role).map(
                      (role) => (
                        <SelectItem key={role} value={role}>
                          <span className="flex items-center space-x-2">
                            {getRoleIcon(role)}
                            <span>{RBACService.getRoleDisplayName(role)}</span>
                          </span>
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
