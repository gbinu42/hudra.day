export type UserRole = "admin" | "editor" | "viewer";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface RolePermissions {
  read: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  manageUsers?: boolean;
  manageRoles?: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  viewer: {
    read: true,
    create: false,
    edit: false,
    delete: false,
  },
  editor: {
    read: true,
    create: true,
    edit: true,
    delete: false,
  },
  admin: {
    read: true,
    create: true,
    edit: true,
    delete: true,
    manageUsers: true,
    manageRoles: true,
  },
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};
