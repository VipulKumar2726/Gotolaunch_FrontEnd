# GoToLaunch Frontend - Setup & Deployment Guide

## Quick Start

### 1. Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- A running GoToLaunch backend server

### 2. Installation (5 minutes)

```bash
# Navigate to project directory
cd gotolaunch-front-end

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env.local

# Edit .env.local with your backend URL
# VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Development (1 minute)

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

---

## Project Features

### Authentication System
- **Registration**: New users can create accounts
- **Login**: Existing users authenticate with email/password
- **Session Management**: JWT tokens stored in HttpOnly cookies
- **Protected Routes**: Dashboard and launch pages require authentication
- **Auto-logout**: 401 errors trigger automatic logout

### Dashboard
- **Launch List**: View all your product launches
- **Create Launches**: Modal form to create new launches
- **Launch Cards**: Quick overview with status and date
- **Grid Layout**: Responsive cards layout

### Launch Details Page
- **Launch Info**: Product name, URL, date, timezone
- **Checklist Management**: 
  - View items by category (Pre-launch, Launch Day, Post-launch)
  - Toggle completion status
  - Add custom items with descriptions and due dates
  - Delete items
- **Action Buttons**: Launch Day Mode, View Report, Delete Launch

### Launch Day Mode
- **Special UI**: Large typography and highlighted styling
- **Focus Mode**: Shows only Launch Day checklist items
- **Progress Tracking**: Display completion percentage
- **Quick Actions**: Mark all items done at once

### Post-Launch Report
- **Performance Metrics**: Track upvotes and Product Hunt rank
- **Traffic Notes**: Document traffic sources and patterns
- **Learnings**: Record insights for future launches
- **Edit Support**: Update reports anytime

---

## API Integration

### Authentication Endpoints
```
POST   /auth/login       - Login with email/password
POST   /auth/register    - Create new account
GET    /auth/me          - Get current user info
POST   /auth/logout      - Logout user
```

### Launch Endpoints
```
GET    /launch                    - List all launches
POST   /launch/create            - Create new launch
GET    /launch/:id               - Get launch details
PUT    /launch/:id               - Update launch
DELETE /launch/:id               - Delete launch
GET    /launch/:id/checklist     - Get checklist items
POST   /launch/:id/checklist     - Add checklist item
PUT    /launch/:id/checklist/:itemId/toggle - Toggle item
DELETE /launch/:id/checklist/:itemId - Delete item
GET    /launch/:id/report        - Get launch report
POST   /launch/:id/report        - Create report
PUT    /launch/:id/report        - Update report
```

### Expected Request/Response Format

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

**Launch Response:**
```json
{
  "launch": {
    "_id": "launch_id",
    "productName": "My Product",
    "productUrl": "https://myproduct.com",
    "launchDate": "2024-03-15",
    "timezone": "America/New_York",
    "status": "upcoming",
    "checklist": [
      {
        "_id": "item_id",
        "title": "Prepare marketing",
        "description": "Create launch announcement",
        "category": "Pre-launch",
        "dueDate": "2024-03-10",
        "completed": false
      }
    ]
  }
}
```

---

## Environment Configuration

### .env.local
```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000/api

# For production
# VITE_API_BASE_URL=https://api.gotoluanch.com
```

### Development vs Production
- **Development**: Local backend at http://localhost:5000
- **Production**: Set to your deployed backend URL
- **CORS**: Backend must allow requests from frontend origin

---

## Folder Structure Explanation

### /src/api
- **axiosInstance.js**: Axios configuration with interceptors
- **authService.js**: Authentication API calls
- **launchService.js**: Launch, checklist, and report API calls

### /src/components
- **Checklist.jsx**: Reusable checklist component
- **Notification.jsx**: Toast notification component
- **Sidebar.jsx**: Navigation sidebar
- **TopNavbar.jsx**: Header with user info

### /src/context
- **AuthContext.jsx**: Global authentication state and methods

### /src/hooks
- **useAuth.js**: Hook to access auth context
- **useNotification.js**: Hook for showing notifications

### /src/layouts
- **AuthLayout.jsx**: Layout for login/register pages
- **DashboardLayout.jsx**: Layout for protected pages (sidebar + navbar)

### /src/pages
- **LoginPage.jsx**: User login page
- **RegisterPage.jsx**: User registration page
- **DashboardPage.jsx**: List launches and create new
- **LaunchDetailPage.jsx**: Launch details with checklist
- **LaunchDayPage.jsx**: Special UI for launch day
- **ReportPage.jsx**: Create/edit launch reports

### /src/routes
- **index.jsx**: Router configuration with all routes
- **ProtectedRoute.jsx**: Route guard component

### /src/utils
- **constants.js**: App constants and enums
- **formatters.js**: Date formatting utilities
- **theme.js**: Material UI theme configuration

---

## Build & Deployment

### Development Build
```bash
npm run dev
# Builds with hot module replacement
# http://localhost:5173
```

### Production Build
```bash
npm run build
# Creates optimized build in /dist folder
# JS files are chunked for better loading
```

### Production Preview
```bash
npm run preview
# Preview the production build locally
```

### Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo for automatic deployments
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Option 4: Static Hosting
- Upload `/dist` folder to any static hosting:
  - AWS S3 + CloudFront
  - Google Cloud Storage
  - Azure Static Web Apps
  - GitHub Pages

---

## Features & Roadmap

### ✅ Implemented
- User authentication (register/login/logout)
- Dashboard with launch list
- Create launches with wizard
- Detailed launch pages
- Checklist management by category
- Launch day special mode
- Post-launch reporting
- Responsive design
- Professional SaaS UI
- Error handling and notifications

### 🔜 Coming Soon
- Dark theme support
- Advanced analytics and charts
- Team collaboration features
- Launch templates
- Email notifications
- Social media integration
- Mobile app version
- Offline support

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### CORS Errors
- Verify backend is running
- Check `VITE_API_BASE_URL` in `.env.local`
- Backend must have CORS enabled for frontend URL

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Not Receiving Notifications
- Check `useNotification` hook is imported in components
- Verify `Notification` component is rendered in App.jsx

### Authentication Not Working
- Check network tab in DevTools
- Verify backend returns user data in response
- Check HttpOnly cookies are set
- Verify `/auth/me` endpoint works

---

## Performance Tips

### Code Splitting
The app automatically chunks vendors and MUI:
- `vendor.js`: React, React Router, Axios
- `mui.js`: Material UI components
- `index.js`: Application code

### Lazy Loading (Future Enhancement)
```javascript
const LaunchDetail = lazy(() => import('./pages/LaunchDetailPage'));
```

### Image Optimization
- Store images in `/public/assets`
- Use optimized formats (WebP, SVG)
- Implement lazy loading with `<img loading="lazy">`

### Bundle Analysis
```bash
npm install -g source-map-explorer
source-map-explorer 'dist/assets/*.js'
```

---

## Security Best Practices

### ✅ Currently Implemented
- HttpOnly cookies for JWT tokens
- CSRF protection via framework defaults
- Input validation on client side
- Error message sanitization
- Protected routes with authentication

### 🔐 Additional Recommendations
- Implement rate limiting on backend
- Use HTTPS in production
- Set proper CORS headers
- Validate all backend responses
- Use content security policy headers
- Implement refresh token rotation
- Add request signing for sensitive operations

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari  | Latest 2 versions |
| Edge    | Latest 2 versions |

---

## Testing Commands

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Getting Help

### Common Issues
1. **Blank page loading**
   - Check console for errors
   - Verify API URL in .env.local
   - Check if backend is running

2. **Can't login**
   - Verify credentials
   - Check if backend is running
   - Look at network requests in DevTools

3. **CSS not loading properly**
   - Clear browser cache
   - Restart dev server
   - Check MUI theme is applied

### Support Resources
- Check README.md for features
- Review component code for usage examples
- Check API documentation format
- Look at existing API service implementations

---

## Contact & Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Review code comments
3. Check backend API documentation
4. Open an issue with details and reproduction steps

---

**Last Updated**: March 2024
**Version**: 1.0.0
**Status**: Production Ready
