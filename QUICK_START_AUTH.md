import { Link } from "react-router-dom";

<Link to="/signup">
  Get My Free Report
</Link># 🚀 Authentication System - Quick Start Guide

## What's Been Generated

Your new authentication system includes:

### 📄 Pages (3 new pages)
- **Signup Page** - `/signup` - User registration with password confirmation
- **Login Page** - `/login` - User login with remember me option
- **Forgot Password** - `/forgot-password` - Password reset flow

### 🧩 Components (3 reusable components)
- **AuthLayout** - Consistent card-based layout for all auth pages
- **FormInput** - Reusable text input with validation display
- **PasswordInput** - Password input with show/hide toggle

### 🔧 Utilities
- **useAuth Hook** - Optional global auth state management
- **AppProviders** - Wrapper for auth provider

### 📚 Documentation
- **AUTH_SYSTEM_DOCS.md** - Comprehensive docs (this folder)

---

## ✅ Already Integrated

The authentication routes are **already added** to your `App.tsx`:

```tsx
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
```

✨ **No additional setup needed!**

---

## 🎯 How to Use

### 1. Access the Auth Pages

Start your dev server and visit:
- **Signup**: http://localhost:5173/signup
- **Login**: http://localhost:5173/login
- **Forgot Password**: http://localhost:5173/forgot-password

### 2. Link from Your Landing Page

Update your "Get My Free Report" button to navigate to signup:

```tsx
import { Link } from "react-router-dom";

// In your HeroSection.tsx
<Link to="/signup" className="button-class">
  Get My Free Report
</Link>

// Or with navigate hook
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const handleClick = () => navigate("/signup");
```

### 3. Add Navbar Links

Add auth links to your Navbar:

```tsx
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      {/* Your existing nav items */}
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
};
```

### 4. Use Global Auth State (Optional)

If you want centralized auth state management:

**Step 1: Wrap your app with AuthProvider**

```tsx
// In App.tsx
import { AuthProvider } from "@/hooks/useAuth";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Your routes */}
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Step 2: Use auth anywhere**

```tsx
import { useAuth } from "@/hooks/useAuth";

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

## 🎨 Design Features

All pages match your landing page design:

✅ **Purple gradient theme** - Consistent with your hero section
✅ **Glass card effect** - Modern frosted glass UI
✅ **2xl rounded corners** - Matches your design system
✅ **Soft shadows** - Elegant glow effects
✅ **Responsive** - Perfect on mobile, tablet, desktop
✅ **Dark background** - Beautiful hero gradient
✅ **Smooth animations** - Fade-in effects
✅ **Accessibility** - Proper labels, ARIA attributes

---

## 🔐 Form Validation

All forms include client-side validation:

### Signup Validation
- ✅ Email format check
- ✅ Password minimum 6 characters
- ✅ Password confirmation match
- ✅ Terms acceptance required
- ✅ Real-time error clearing

### Login Validation
- ✅ Email format check
- ✅ Password required
- ✅ Remember me persistence
- ✅ Success message on redirect

### Forgot Password Validation
- ✅ Email format check
- ✅ Success confirmation screen
- ✅ Resend option

---

## 💾 Data Management

Currently uses **localStorage** for demo:

```tsx
// Signup - stores user info
localStorage.setItem("user", JSON.stringify({
  email: "user@example.com",
  createdAt: timestamp
}));

// Login - remembers email if checked
if (rememberMe) {
  localStorage.setItem("rememberedEmail", email);
}

// Forgot Password - shows confirmation
```

### To Connect to Your Backend

Replace localStorage calls with API requests:

```tsx
// In Signup.tsx handleSubmit
const response = await fetch("/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password
  })
});

const data = await response.json();
localStorage.setItem("authToken", data.token);
```

---

## 📱 Responsive Design

All pages are fully responsive:

- **Mobile** (320px) - Single column, full-width inputs
- **Tablet** (768px) - Card centered, optimized spacing
- **Desktop** (1024px+) - Centered card with max-width

Test by resizing your browser or using DevTools device emulation.

---

## 🔗 File Structure

```
src/
├── App.tsx (✅ Already updated with routes)
├── components/
│   └── auth/
│       ├── AuthLayout.tsx ✨ (Reusable layout)
│       ├── FormInput.tsx ✨ (Text input)
│       └── PasswordInput.tsx ✨ (Password with toggle)
├── pages/
│   └── auth/
│       ├── Signup.tsx 🆕
│       ├── Login.tsx 🆕
│       └── ForgotPassword.tsx 🆕
├── hooks/
│   └── useAuth.ts 🆕 (Optional global state)
└── providers/
    └── AppProviders.tsx 🆕 (Optional provider wrapper)
```

---

## ✨ Customization

### Change Colors

Edit the theme in `tailwind.config.ts` or use custom classes:

```tsx
// In any component
<button className="bg-primary hover:bg-primary/90">
  Custom Button
</button>
```

### Change Button Style

Update button styling:

```tsx
// Replace glow-button class
<Button className="w-full custom-button-class">
  Submit
</Button>
```

### Change Form Labels

Simply update the label props:

```tsx
<FormInput
  label="Your Custom Label"
  placeholder="Custom placeholder"
  // ...
/>
```

### Add Custom Validations

Edit validation in each page component:

```tsx
const handleValidation = (): boolean => {
  // Add your custom validation logic
  if (formData.password.length < 8) {
    newErrors.password = "Min 8 characters";
  }
  // ...
};
```

---

## 🧪 Testing Checklist

- [ ] Visit `/signup` - page loads with glass card
- [ ] Try empty signup submission - shows errors
- [ ] Enter invalid email - shows error
- [ ] Enter password < 6 chars - shows error
- [ ] Uncheck terms - shows error
- [ ] Valid signup - redirects to login with message
- [ ] Visit `/login` - page loads
- [ ] Click show/hide password - toggle works
- [ ] Check remember me - saves email
- [ ] Valid login - redirects to home
- [ ] Visit `/forgot-password` - page loads
- [ ] Submit email - shows confirmation
- [ ] Resize browser - responsive layout works
- [ ] Test on mobile device - all working

---

## 🚨 Important Notes

### Not Production Ready
The current implementation uses localStorage and doesn't connect to a backend. For production:

1. Create backend API endpoints
2. Implement JWT token management
3. Add secure password hashing
4. Use HTTPS only
5. Add CSRF protection
6. Implement rate limiting

### Security Considerations
- Never store passwords in localStorage
- Don't commit auth tokens to version control
- Validate all inputs on backend
- Use secure HTTP headers
- Implement session management

---

## 🆘 Troubleshooting

### Pages not loading?
- Check that routes are added to App.tsx ✅ (already done)
- Verify file paths are correct
- Check dev console for import errors

### Styling looks wrong?
- Ensure Tailwind CSS is configured correctly
- Check that glass-card and glow-button classes exist in index.css
- Verify theme colors in tailwind.config.ts

### Form validation not working?
- Check browser console for errors
- Verify validation functions are called on submit
- Test with valid/invalid data

### Need Help?
See AUTH_SYSTEM_DOCS.md for detailed documentation!

---

## 📞 Integration Support

Everything you need is included! The system is designed to work independently while integrating seamlessly with your existing landing page.

**Your landing page remains untouched** - add auth pages alongside existing content.

Happy coding! 🎉
