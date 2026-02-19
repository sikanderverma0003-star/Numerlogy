# Numerology SaaS - Complete Setup Guide

## 🚀 Project Structure

```
d:/Numerlology/
├── src/                          # Frontend (Vite + React)
│   ├── pages/
│   │   ├── Index.tsx            # Landing page
│   │   ├── NotFound.tsx
│   │   ├── auth/
│   │   │   ├── Signup.tsx       # Connected to backend ✅
│   │   │   ├── Login.tsx        # Connected to backend ✅
│   │   │   └── ForgotPassword.tsx
│   │   └── dashboard/
│   │       ├── page.tsx         # Dashboard home
│   │       ├── history.tsx      # Report history
│   │       └── profile.tsx      # User profile
│   ├── components/
│   │   ├── auth/                # Auth UI components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── FormInput.tsx
│   │   │   └── PasswordInput.tsx
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNavbar.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── ToolForm.tsx
│   │   │   ├── HistoryList.tsx
│   │   │   └── DashboardCardSkeleton.tsx
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── dashboardAPI.ts      # API client with auth headers
│   │   └── utils.ts
│   ├── hooks/
│   ├── App.tsx                  # Router with protected routes ✅
│   └── main.tsx
├── server/                       # Backend (Express + Node)
│   ├── models/
│   │   ├── User.ts              # User schema with queries limit
│   │   └── Report.ts            # Report schema
│   ├── config/
│   │   ├── db.ts                # MongoDB connection
│   │   └── jwt.ts               # JWT utilities
│   ├── middleware/
│   │   └── auth.ts              # JWT middleware
│   ├── routes/
│   │   ├── auth.ts              # POST /signup, login, forgot-password ✅
│   │   ├── dashboard.ts         # Dashboard API endpoints ✅
│   │   └── tool.ts              # Tool/report generation ✅
│   └── index.ts                 # Express server setup ✅
├── .env.local.example           # Environment template
└── package.json                 # Dependencies
```

## 📋 Setup Instructions

### Step 1: Create .env.local File
Copy `.env.local.example` to `.env.local` and update values:
```bash
# Frontend
VITE_API_URL=http://localhost:3001/api

# Backend
PORT=3001
MONGODB_URI=mongodb://localhost:27017/numerology
JWT_SECRET=your-super-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
```

### Step 2: Install Backend Dependencies
```bash
cd d:\Numerlology
npm install express cors dotenv jsonwebtoken bcrypt mongoose @types/express @types/node
```

### Step 3: Start MongoDB
```bash
mongod
```

### Step 4: Start Backend Server
```bash
# In d:\Numerlology directory
npm run dev:server
# Or manually:
npx ts-node server/index.ts
```

Expected output:
```
🚀 Server running on http://localhost:3001
```

### Step 5: Start Frontend
```bash
# In another terminal in d:\Numerlology
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Create new account
  - Body: `{ email, password, name? }`
  - Returns: `{ token, user: { _id, email, name, plan } }`

- `POST /api/auth/login` - Login
  - Body: `{ email, password }`
  - Returns: `{ token, user: { _id, email, name, plan } }`

- `POST /api/auth/forgot-password` - Request password reset
  - Body: `{ email }`
  - Returns: `{ message }`

### Dashboard Routes (`/api/dashboard`) - Protected
- `GET /api/dashboard/stats` - Get dashboard stats
  - Returns: `{ totalReports, planType, usedQueries, queryLimit, remainingUsage, userName }`

- `GET /api/dashboard/history?page=1&limit=10` - Get paginated reports
  - Returns: `{ reports: [...], pagination: { page, limit, total, pages } }`

- `DELETE /api/dashboard/history/:reportId` - Delete a report
  - Returns: `{ message }`

- `GET /api/dashboard/profile` - Get user profile
  - Returns: `{ _id, email, name, plan, used_queries, query_limit }`

- `PUT /api/dashboard/profile` - Update user profile
  - Body: `{ name }`
  - Returns: Updated user object

### Tool Routes (`/api/tool`) - Protected
- `POST /api/tool/generate` - Generate numerology report
  - Body: `{ inputData: { fullName, dateOfBirth }, type: 'numerology'|'astrology'|'tarot' }`
  - Returns: `{ _id, userId, inputData, result, type, createdAt }`
  - Rate limit: Respect user's `query_limit`

## 🔐 Authentication Flow

### Frontend
1. User signs up/logs in → API call to `/api/auth/signup` or `/api/auth/login`
2. Server returns JWT token
3. Frontend stores token in `localStorage.authToken`
4. Frontend stores email in `localStorage.userEmail`
5. All protected API calls include `Authorization: Bearer {token}`

### Protected Routes
- `/dashboard` - Redirects to `/login` if no token
- `/dashboard/history` - Protected
- `/dashboard/profile` - Protected

### API Client
All dashboard API calls use `dashboardAPI` utility from `src/lib/dashboardAPI.ts`:
```typescript
import dashboardAPI from '@/lib/dashboardAPI';

const stats = await dashboardAPI.getStats();
const history = await dashboardAPI.getHistory(page, limit);
const report = await dashboardAPI.generateReport(inputData, type);
```

This utility automatically:
- Retrieves JWT from localStorage
- Adds `Authorization: Bearer {token}` header
- Handles errors

## 📦 Current Dependencies

### Frontend (Already Installed)
- react, react-dom, react-router-dom
- @tanstack/react-query
- tailwindcss, @tailwindcss/typography
- shadcn/ui components
- lucide-react
- All in package.json

### Backend (NEEDS INSTALLATION)
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^18.0.0",
    "@types/bcrypt": "^5.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

## ✅ Completed Features

- ✅ Authentication Pages (Signup, Login, ForgotPassword)
- ✅ Auth Components (AuthLayout, FormInput, PasswordInput)
- ✅ Backend Auth Routes (/api/auth/signup, login, forgot-password)
- ✅ Backend Auth Middleware (JWT validation)
- ✅ Protected Routes Component (ProtectedRoute wrapper)
- ✅ Dashboard Layout (Sidebar + TopNavbar + Main content)
- ✅ Dashboard Pages (Home, History, Profile)
- ✅ Dashboard Components (Cards, ToolForm, HistoryList)
- ✅ API Client Utility (dashboardAPI with auth headers)
- ✅ Database Models (User with query limits, Report)
- ✅ Database Connection (MongoDB with Mongoose)
- ✅ Numerology Calculation (Mock implementation)
- ✅ Query Rate Limiting (Per user plan)
- ✅ Frontend-Backend Integration (API calls for all features)

## 🔄 User Flow

### New User
1. Lands on `/` (landing page)
2. Clicks "Sign Up" → navigates to `/signup`
3. Fills signup form (email, password, name)
4. Backend hashes password, creates user in MongoDB
5. Server returns JWT token
6. Frontend stores token, redirects to `/dashboard`

### Existing User
1. Clicks "Sign In" → navigates to `/login`
2. Enters credentials
3. Backend validates email/password
4. Server returns JWT token
5. Frontend stores token, redirects to `/dashboard`

### Dashboard Usage
1. User sees stats (totalReports, planType, remainingQueries)
2. User fills form (name, DOB, report type)
3. Frontend calls `/api/tool/generate` with form data
4. Backend checks query limit, generates numerology result
5. Report saved to MongoDB
6. User can view history, delete reports, update profile

## 📝 Notes

- JWT expires in 7 days
- Free plan has 10 queries/month
- Passwords hashed with bcrypt (10 salt rounds)
- All database queries indexed for performance
- CORS enabled for localhost:5173
- Error messages localized on frontend

## 🐛 Common Issues

### "Connection refused" on startup
- MongoDB not running? Start with `mongod`
- Backend port 3001 in use? Change PORT in .env.local
- Frontend port 5173 in use? Vite will auto-increment

### "Unauthorized" errors
- Token expired? Clear localStorage and log in again
- Token not in header? Dashboard API utility should handle it
- Check browser console Network tab for Authorization header

### "User not found" after signup
- Check MongoDB connection is working
- Verify Mongoose models are exported correctly
- Check console logs on backend for errors

## 🎯 Next Steps (Optional Enhancements)

- [ ] Email verification on signup
- [ ] Password reset via email link
- [ ] Premium plan upgrade flow
- [ ] Payment integration (Stripe)
- [ ] Social login (Google, GitHub)
- [ ] Report PDF export
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics tracking
- [ ] Dark mode toggle
