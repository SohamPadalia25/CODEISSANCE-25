# Authentication Setup Guide

This guide explains how the donor registration and login functionality is connected between the frontend and backend.

## Backend API Endpoints

### Donor Authentication (OTP-based)
- **POST** `/api/donor/login/request-otp` - Request OTP for donor login
- **POST** `/api/donor/login/verify-otp` - Verify OTP and get JWT token

### User Registration/Login (Password-based)
- **POST** `/api/v1/users/register` - Register new user
- **POST** `/api/v1/users/login` - Login with email/password
- **GET** `/api/v1/users/me` - Get current user profile

## Frontend Implementation

### 1. API Service (`src/services/api.ts`)
- Centralized API service for all backend communication
- Handles authentication tokens automatically
- Error handling with custom ApiError class
- Methods for donor OTP flow and regular user authentication

### 2. Authentication Context (`src/context/AuthContext.tsx`)
- React context for managing authentication state
- Provides login, register, logout functions
- Handles token storage and user data management
- Supports both OTP-based (donor) and password-based authentication

### 3. Updated Components

#### Login Component (`src/pages/Login.tsx`)
- **Donor Login**: OTP-based authentication
  1. User selects "Donor" role
  2. Enters email address
  3. System sends OTP to email
  4. User enters OTP to complete login
- **Other Roles**: Password-based authentication
  1. User selects role (Hospital Admin/Blood Bank)
  2. Enters email and password
  3. System validates credentials

#### Signup Component (`src/pages/Signup.tsx`)
- Unified registration for all user types
- Automatically logs in user after successful registration
- Role-based navigation after signup

### 4. Protected Routes (`src/components/ProtectedRoute.tsx`)
- Component for protecting routes that require authentication
- Role-based access control
- Automatic redirect to login if not authenticated

## Authentication Flow

### For Donors (OTP-based)
1. User selects "Donor" role on login page
2. Enters email address
3. Frontend calls `/api/donor/login/request-otp`
4. Backend sends OTP to email
5. User enters OTP
6. Frontend calls `/api/donor/login/verify-otp`
7. Backend returns JWT token
8. User is redirected to donor dashboard

### For Other Users (Password-based)
1. User selects role and enters credentials
2. Frontend calls `/api/v1/users/login`
3. Backend validates credentials
4. Backend returns JWT token and user data
5. User is redirected to appropriate dashboard

### Registration Flow
1. User fills registration form
2. Frontend calls `/api/v1/users/register`
3. Backend creates user account
4. Frontend automatically logs in user
5. User is redirected to appropriate dashboard

## Environment Configuration

Create a `.env` file in the frontend root:
```
VITE_API_BASE_URL=http://localhost:8000
```

## Backend Requirements

Ensure your backend has:
1. CORS configured to allow frontend origin
2. Email service configured for OTP sending
3. JWT secret set in environment variables
4. Database connection established

## Testing the Authentication

1. **Start Backend**: `cd Backend && npm start`
2. **Start Frontend**: `cd pixel-copy-showcase-main && npm run dev`
3. **Test Donor Registration**:
   - Go to `/signup`
   - Select "Donor" role
   - Fill form and submit
   - Should redirect to donor dashboard
4. **Test Donor Login**:
   - Go to `/login`
   - Select "Donor" role
   - Enter email and click "Send OTP"
   - Check email for OTP
   - Enter OTP to complete login
5. **Test Other Roles**:
   - Register as Hospital Admin or Blood Bank
   - Login with email/password
   - Should redirect to appropriate dashboard

## Error Handling

- Network errors are caught and displayed to user
- API errors show specific error messages
- Loading states prevent multiple submissions
- Form validation ensures required fields are filled

## Security Features

- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Role-based route protection
- Secure password handling
- OTP expiration (5 minutes)

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **Email Not Sending**: Check email service configuration in backend
3. **Token Issues**: Clear localStorage and try again
4. **API Connection**: Verify backend is running on correct port

### Debug Steps:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Check backend logs for errors
4. Ensure environment variables are set correctly
