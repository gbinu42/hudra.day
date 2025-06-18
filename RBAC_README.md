# Role-Based Authentication System (RBAC)

## Overview

This project implements a comprehensive role-based authentication system using Firebase Auth and Firestore. The system supports three user roles with hierarchical permissions and can be easily extended to support additional roles.

## User Roles

### 1. Viewer (Level 1)

- **Permissions**: Read-only access
- **Description**: Can browse and view content but cannot create, edit, or delete anything
- **Use case**: End users who only need to consume content

### 2. Editor (Level 2)

- **Permissions**: Read, Create, Edit
- **Description**: Can view, create, and edit content but cannot delete or manage users
- **Use case**: Content creators and contributors

### 3. Admin (Level 3)

- **Permissions**: Full access (Read, Create, Edit, Delete, Manage Users, Manage Roles)
- **Description**: Full system access including user management and role assignments
- **Use case**: System administrators and managers

## System Architecture

### Core Components

1. **Type Definitions** (`lib/types/auth.ts`)

   - UserRole type and UserProfile interface
   - Role permissions configuration
   - Role hierarchy definitions

2. **Enhanced Firebase Services** (`lib/firebase-services.ts`)

   - User profile management with roles
   - Role-based authentication methods
   - Admin-only operations for user management

3. **RBAC Utilities** (`lib/rbac.ts`)

   - Permission checking functions
   - Role-based route access control
   - UI helpers for role management

4. **Enhanced Authentication Hook** (`lib/hooks/useAuth.ts`)

   - Role-aware authentication state
   - User profile management
   - Permission checking helpers

5. **UI Components**
   - `AuthButton`: Displays user role information
   - `ProtectedRoute`: Route-level access control
   - `UserManagement`: Admin panel for user management
   - `RoleDashboard`: Role-aware dashboard

## Setup Instructions

### 1. Database Schema

The system automatically creates user profiles in Firestore under the `users` collection with the following structure:

```typescript
{
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### 2. Creating Your First Admin User

Since the system prevents privilege escalation, you need to manually create your first admin user:

1. Sign up a new user through the app (they'll get 'viewer' role by default)
2. In Firebase Console, go to Firestore Database
3. Find the user document in the `users` collection
4. Edit the `role` field to `'admin'`
5. Save the changes

### 3. Firestore Security Rules

Add these security rules to your Firestore to enforce role-based access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;

      // Only admins can read all users or update user roles
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Add more rules for your content collections
    match /content/{document} {
      // Viewers can read
      allow read: if request.auth != null;

      // Editors and admins can create and edit
      allow create, update: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['editor', 'admin'];

      // Only admins can delete
      allow delete: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Usage Examples

### 1. Protecting Routes

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Require authentication (any role)
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Require specific role
<ProtectedRoute requiredRole="admin">
  <AdminOnlyComponent />
</ProtectedRoute>
```

### 2. Checking Permissions in Components

```tsx
import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";

function MyComponent() {
  const { userProfile, isAdmin, isEditor } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);

  return (
    <div>
      {permissions.canCreate && <button>Create Content</button>}

      {isAdmin && <button>Admin Function</button>}

      {permissions.canEdit && <button>Edit</button>}
    </div>
  );
}
```

### 3. Managing Users (Admin Only)

```tsx
import { useAuth } from "@/lib/hooks/useAuth";

function AdminPanel() {
  const { updateUserRole, getAllUsers, deactivateUser } = useAuth();

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole);
      console.log("Role updated successfully");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  // Component implementation...
}
```

## Available Pages

1. **Dashboard** (`/dashboard`) - Role-aware dashboard showing permissions and available actions
2. **Admin Panel** (`/admin`) - User management interface (admin only)
3. **Editor** (`/editor`) - Content creation/editing (editor and admin)
4. **Texts** (`/texts`) - Content browsing (all authenticated users)

## Security Features

1. **Hierarchy-based Access**: Higher roles inherit lower role permissions
2. **Privilege Escalation Prevention**: Admins cannot assign admin roles to others
3. **Self-Protection**: Users cannot modify their own roles or deactivate themselves
4. **Active Status**: Deactivated users are denied access
5. **Client-Side Protection**: All sensitive operations require server-side validation

## Adding New Roles

To add new roles:

1. Update the `UserRole` type in `lib/types/auth.ts`
2. Add permissions to `ROLE_PERMISSIONS`
3. Update `ROLE_HIERARCHY` with appropriate level
4. Update UI components to handle the new role
5. Update Firestore security rules if needed

Example:

```typescript
export type UserRole = "admin" | "editor" | "moderator" | "viewer";

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  // ... existing roles
  moderator: {
    read: true,
    create: true,
    edit: true,
    delete: false, // Can't delete but can moderate content
    moderateContent: true, // New permission
  },
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  viewer: 1,
  moderator: 2,
  editor: 3,
  admin: 4,
};
```

## Best Practices

1. **Always validate permissions server-side** - Client-side checks are for UX only
2. **Use the ProtectedRoute component** for page-level protection
3. **Check permissions before showing UI elements** to improve user experience
4. **Test role transitions** thoroughly, especially edge cases
5. **Monitor admin actions** for security auditing
6. **Regularly review user roles** and remove inactive users

## Troubleshooting

### User Profile Not Loading

- Check if the user document exists in Firestore
- Verify Firestore security rules allow read access
- Check browser console for authentication errors

### Permission Denied Errors

- Verify the user's role in Firestore
- Check if the user's `isActive` field is true
- Ensure Firestore security rules are correctly configured

### Admin Functions Not Working

- Verify the current user has admin role
- Check if target user's role allows the operation
- Ensure proper error handling in your components

## Security Considerations

1. **Never rely solely on client-side role checking** for security
2. **Implement proper Firestore security rules** to enforce server-side validation
3. **Regularly audit user roles and permissions**
4. **Use HTTPS in production** and secure your Firebase configuration
5. **Implement proper error handling** to avoid information leakage
6. **Monitor authentication events** for suspicious activity

This role-based authentication system provides a solid foundation for managing user permissions in your application while maintaining security and scalability.
