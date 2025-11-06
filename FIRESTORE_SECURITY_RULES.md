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

    // Helper function to check if user can read protected books
    function canReadProtectedBooks() {
      return request.auth != null && getUserRole() == 'admin';
    }

    // Users collection rules
    match /users/{userId} {
      // Users can read their own profile
      allow read: if request.auth != null && request.auth.uid == userId;

      // Only admins can read all users or update user roles
      allow read, write: if request.auth != null && getUserRole() == 'admin';
    }

    // Books collection rules with private and protected field support
    match /books/{bookId} {
      // Allow read for protected books only to admins
      allow read: if resource.data.protected == true && canReadProtectedBooks();

      // Allow read for private books only to editors and admins (if not protected)
      allow read: if resource.data.private == true &&
        (!('protected' in resource.data) || resource.data.protected == false) &&
        canReadPrivateBooks();

      // Allow read for public books to any authenticated user (if not private or protected)
      allow read: if canReadBooks() &&
        (!('private' in resource.data) || resource.data.private == false) &&
        (!('protected' in resource.data) || resource.data.protected == false);

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
          // Protected book - only admins can access
          (book.data.protected == true && canReadProtectedBooks()) ||
          // Private book (if not protected) - editors and admins can access
          (book.data.private == true &&
           (!('protected' in book.data) || book.data.protected == false) &&
           canReadPrivateBooks()) ||
          // Public book (not private and not protected) - any authenticated user can access
          ((!('private' in book.data) || book.data.private == false) &&
           (!('protected' in book.data) || book.data.protected == false))
        );
      }

      // Allow read if user can access the parent book
      allow read: if canReadBooks() && canAccessParentBook();

      // Allow write operations for editors and admins
      allow create, update: if request.auth != null && getUserRole() in ['editor', 'admin'];

      // Allow delete only for admins
      allow delete: if request.auth != null && getUserRole() == 'admin';
    }

    // Comments collection rules
    match /comments/{commentId} {
      // Anyone can read approved comments
      allow read: if resource.data.status == 'approved';

      // Authenticated users can read their own comments (regardless of status)
      allow read: if request.auth != null &&
                     resource.data.userId == request.auth.uid;

      // Admins can read all comments
      allow read: if request.auth != null && getUserRole() == 'admin';

      // Anyone (authenticated or not) can create comments, but they must start as 'pending'
      // parentId is optional for nested/threaded comments
      allow create: if request.resource.data.status == 'pending' &&
                       request.resource.data.comment is string &&
                       request.resource.data.name is string &&
                       request.resource.data.email is string &&
                       request.resource.data.resourceType is string &&
                       request.resource.data.resourceId is string &&
                       (!('parentId' in request.resource.data) || request.resource.data.parentId is string);

      // Only admins can update or delete comments
      allow update, delete: if request.auth != null && getUserRole() == 'admin';
    }

    // Add rules for other collections as needed...
  }
}
```

## Key Security Features:

### Books & Pages

1. **Public Books**: Books without the `private` and `protected` fields (or with both set to `false`) are accessible to all authenticated users
2. **Private Books**: Books with `private: true` (but not `protected: true`) are only accessible to editors and admins
3. **Protected Books**: Books with `protected: true` are only accessible to admins (regardless of private setting)
4. **Unauthenticated Users**: Cannot access any books (server-side protection)
5. **Viewers**: Can only access public books
6. **Pages**: Inherit privacy and protection settings from their parent book
7. **Creation/Editing**: Only admins can create books, editors and admins can edit (but not change creator)

### Comments

1. **Reading Comments**:

   - Anyone can read approved comments (no authentication required)
   - Authenticated users can read their own comments regardless of status
   - Admins can read all comments (pending, approved, rejected)

2. **Creating Comments**:

   - Anyone can create comments (authenticated or not)
   - All new comments must have status set to 'pending'
   - Required fields are validated: comment, name, email, resourceType, resourceId

3. **Moderating Comments**:
   - Only admins can update comment status (approve/reject)
   - Only admins can delete comments
   - Regular users cannot edit their comments after submission

## Important Notes:

- These rules provide **server-side protection** in addition to the client-side filtering
- Unauthenticated requests will be blocked entirely at the database level
- The `!('private' in resource.data)` and `!('protected' in resource.data)` checks handle existing books without these fields
- Protected books take precedence over private books - if a book is protected, only admins can access it regardless of the private setting
- Helper functions make the rules more readable and maintainable
