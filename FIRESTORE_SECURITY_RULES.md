# Firestore Security Rules for Private Books Feature

Add these rules to your Firestore Database in the Firebase Console (Rules tab):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to get user role
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    // Helper function to check if user can read books
    function canReadBooks() {
      return request.auth != null;
    }

    // Helper function to check if user can read private books
    function canReadPrivateBooks() {
      return request.auth != null && getUserRole() in ['editor', 'admin'];
    }

    // Users collection rules
    match /users/{userId} {
      // Users can read their own profile
      allow read: if request.auth != null && request.auth.uid == userId;

      // Only admins can read all users or update user roles
      allow read, write: if request.auth != null && getUserRole() == 'admin';
    }

    // Books collection rules with private field support
    match /books/{bookId} {
      // Allow read for public books (private == false or undefined) to any authenticated user
      allow read: if canReadBooks() && (
        !('private' in resource.data) ||  // Field doesn't exist (default public)
        resource.data.private == false    // Explicitly public
      );

      // Allow read for private books only to editors and admins
      allow read: if resource.data.private == true && canReadPrivateBooks();

      // Allow create only to admins
      allow create: if request.auth != null && getUserRole() == 'admin';

      // Allow update to editors and admins (but prevent changing createdBy)
      allow update: if request.auth != null &&
        getUserRole() in ['editor', 'admin'] &&
        request.resource.data.createdBy == resource.data.createdBy;

      // Allow delete only to admins
      allow delete: if request.auth != null && getUserRole() == 'admin';
    }

    // Pages collection rules (inherit from parent book privacy)
    match /pages/{pageId} {
      // Helper function to check if user can access the parent book
      function canAccessParentBook() {
        let book = get(/databases/$(database)/documents/books/$(resource.data.bookId));
        return (
          // Public book (private field doesn't exist or is false)
          (!('private' in book.data) || book.data.private == false) ||
          // Private book but user has editor/admin role
          (book.data.private == true && canReadPrivateBooks())
        );
      }

      // Allow read if user can access the parent book
      allow read: if canReadBooks() && canAccessParentBook();

      // Allow write operations for editors and admins
      allow create, update: if request.auth != null && getUserRole() in ['editor', 'admin'];

      // Allow delete only for admins
      allow delete: if request.auth != null && getUserRole() == 'admin';
    }

    // Add rules for other collections as needed...
  }
}
```

## Key Security Features:

1. **Public Books**: Books without the `private` field or with `private: false` are accessible to all authenticated users
2. **Private Books**: Books with `private: true` are only accessible to editors and admins
3. **Unauthenticated Users**: Cannot access any books (server-side protection)
4. **Viewers**: Can only access public books
5. **Pages**: Inherit privacy settings from their parent book
6. **Creation/Editing**: Only admins can create books, editors and admins can edit (but not change creator)

## Important Notes:

- These rules provide **server-side protection** in addition to the client-side filtering
- Unauthenticated requests will be blocked entirely at the database level
- The `!('private' in resource.data)` check handles existing books without the private field
- Helper functions make the rules more readable and maintainable
