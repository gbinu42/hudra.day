"use client";

import { UserRole, ROLE_PERMISSIONS, ROLE_HIERARCHY } from "./types/auth";

// RBAC Utility Class
export class RBACService {
  /**
   * Check if a user has a specific permission
   */
  static hasPermission(
    userRole: UserRole,
    permission: keyof typeof ROLE_PERMISSIONS.admin
  ): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole];
    return rolePermissions[permission] === true;
  }

  /**
   * Check if a user can access a specific route based on required role
   */
  static canAccessRoute(userRole: UserRole, requiredRole: UserRole): boolean {
    const userLevel = ROLE_HIERARCHY[userRole];
    const requiredLevel = ROLE_HIERARCHY[requiredRole];
    return userLevel >= requiredLevel;
  }

  /**
   * Check if a user can manage another user (based on role hierarchy)
   */
  static canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
    if (managerRole !== "admin") return false;

    const managerLevel = ROLE_HIERARCHY[managerRole];
    const targetLevel = ROLE_HIERARCHY[targetRole];

    return managerLevel > targetLevel;
  }

  /**
   * Get all permissions for a role
   */
  static getRolePermissions(role: UserRole) {
    return ROLE_PERMISSIONS[role];
  }

  /**
   * Check if user can perform CRUD operations
   */
  static canRead(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "read");
  }

  static canCreate(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "create");
  }

  static canEdit(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "edit");
  }

  static canDelete(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "delete");
  }

  static canManageUsers(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "manageUsers");
  }

  static canManageRoles(userRole: UserRole): boolean {
    return this.hasPermission(userRole, "manageRoles");
  }

  /**
   * Get the highest role that can be assigned by the current user
   */
  static getMaxAssignableRole(userRole: UserRole): UserRole | null {
    if (userRole === "admin") return "editor"; // Admin can assign up to editor
    return null; // Non-admins cannot assign roles
  }

  /**
   * Get available roles that a user can assign to others
   */
  static getAssignableRoles(userRole: UserRole): UserRole[] {
    if (userRole === "admin") {
      return ["viewer", "editor"];
    }
    return [];
  }

  /**
   * Validate if a role assignment is valid
   */
  static isValidRoleAssignment(
    assignerRole: UserRole,
    targetCurrentRole: UserRole,
    newRole: UserRole
  ): boolean {
    // Only admins can change roles
    if (assignerRole !== "admin") return false;

    // Cannot assign admin role (protect against privilege escalation)
    if (newRole === "admin") return false;

    // Cannot modify another admin's role
    if (targetCurrentRole === "admin") return false;

    return true;
  }

  /**
   * Get user role display name
   */
  static getRoleDisplayName(role: UserRole): string {
    const displayNames: Record<UserRole, string> = {
      admin: "Administrator",
      editor: "Editor",
      viewer: "Viewer",
    };
    return displayNames[role];
  }

  /**
   * Get role color for UI (CSS classes)
   */
  static getRoleColor(role: UserRole): string {
    const colors: Record<UserRole, string> = {
      admin: "bg-red-100 text-red-800 border-red-200",
      editor: "bg-blue-100 text-blue-800 border-blue-200",
      viewer: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[role];
  }
}

// HOC for route protection (commented out for now - requires React context integration)
// export function withRoleProtection<T extends object>(
//   Component: React.ComponentType<T>,
//   requiredRole: UserRole
// ) {
//   return function ProtectedComponent(props: T) {
//     // This would be used with your auth hook
//     // Implementation depends on how you want to handle unauthorized access
//     return <Component {...props} />;
//   };
// }

// Hook for checking permissions
export function usePermissions(userRole: UserRole | null) {
  if (!userRole) {
    return {
      canRead: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canManageUsers: false,
      canManageRoles: false,
      canAccessRoute: () => false,
    };
  }

  return {
    canRead: RBACService.canRead(userRole),
    canCreate: RBACService.canCreate(userRole),
    canEdit: RBACService.canEdit(userRole),
    canDelete: RBACService.canDelete(userRole),
    canManageUsers: RBACService.canManageUsers(userRole),
    canManageRoles: RBACService.canManageRoles(userRole),
    canAccessRoute: (requiredRole: UserRole) =>
      RBACService.canAccessRoute(userRole, requiredRole),
  };
}
