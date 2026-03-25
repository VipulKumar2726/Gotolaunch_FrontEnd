# GoToLaunch Frontend - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install and run
npm install
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

---

## 📁 Important Files Quick Reference

### Core Application
| File | Purpose |
|------|---------|
| `src/main.jsx` | React entry point |
| `src/App.jsx` | Root component with routing |
| `index.html` | HTML template |
| `vite.config.js` | Vite configuration |
| `package.json` | Dependencies and scripts |

### Routing & Auth
| File | Purpose |
|------|---------|
| `src/routes/index.jsx` | All routes configuration |
| `src/routes/ProtectedRoute.jsx` | Authentication guard |
| `src/context/AuthContext.jsx` | Global auth state |
| `src/hooks/useAuth.js` | Auth hook |

### Services & Utils
| File | Purpose |
|------|---------|
| `src/api/axiosInstance.js` | HTTP client setup |
| `src/api/authService.js` | Auth API calls |
| `src/api/launchService.js` | Launch/Checklist/Report API calls |
| `src/utils/theme.js` | Material UI theme |
| `src/utils/constants.js` | App constants |
| `src/utils/formatters.js` | Date formatting |

### Pages (6 Total)
| File | Purpose |
|------|---------|
| `src/pages/LoginPage.jsx` | Login form |
| `src/pages/RegisterPage.jsx` | Registration form |
| `src/pages/DashboardPage.jsx` | List launches & create |
| `src/pages/LaunchDetailPage.jsx` | Launch details & checklist |
| `src/pages/LaunchDayPage.jsx` | Special launch day UI |
| `src/pages/ReportPage.jsx` | Post-launch report form |

### Components & Layouts
| File | Purpose |
|------|---------|
| `src/components/Checklist.jsx` | Reusable checklist component |
| `src/components/Notification.jsx` | Toast/Snackbar component |
| `src/components/TopNavbar.jsx` | Header component |
| `src/components/Sidebar.jsx` | Navigation sidebar |
| `src/layouts/AuthLayout.jsx` | Auth pages wrapper |
| `src/layouts/DashboardLayout.jsx` | Dashboard pages wrapper |

---

## 🔑 Key Components Overview

### AuthContext (Global State)
```javascript
// Usage in any component
const { user, isAuthenticated, login, register, logout, loading } = useAuth();

// Provides:
- user: Current user object
- isAuthenticated: Boolean auth status
- loading: Boolean loading state
- login(email, password): Login function
- register(email, password, fullName): Register function
- logout(): Logout function
```

### API Services
```javascript
// Auth
await authService.login(email, password);
await authService.register(email, password, fullName);
await authService.getCurrentUser();
await authService.logout();

// Launches
await launchService.getAllLaunches();
await launchService.getLaunchById(id);
await launchService.createLaunch(launchData);
await launchService.deleteLaunch(id);

// Checklist
await launchService.toggleChecklistItem(launchId, itemId);
await launchService.addChecklistItem(launchId, itemData);
await launchService.deleteChecklistItem(launchId, itemId);

// Reports
await launchService.getReport(launchId);
await launchService.submitReport(launchId, reportData);
await launchService.updateReport(launchId, reportData);
```

### Notification Hook
```javascript
// Usage in components
const { notification, showNotification, closeNotification } = useNotification();

// Show notifications
showNotification('Success!', 'success');    // success, error, warning, info
showNotification('Error occurred', 'error');

// Notification automatically closes after 4 seconds
```

---

## 🎨 Theme Colors

```javascript
// Primary colors
primary: '#1976D2'      // Blue
secondary: '#DC004E'    // Red

// Status colors
success: '#4CAF50'      // Green
error: '#F44336'        // Red
warning: '#FF9800'      // Orange
info: '#2196F3'         // Light Blue

// UI colors
background: '#F5F5F5'   // Light gray
surface: '#FFFFFF'      // White
text: '#212121'         // Dark gray
textSecondary: '#757575' // Medium gray
divider: '#BDBDBD'      // Light gray
```

---

## 📋 Common Patterns

### API Call with Loading & Error
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const fetchData = async () => {
  try {
    setLoading(true);
    setError('');
    const data = await launchService.getAllLaunches();
    // Use data...
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Error occurred';
    setError(errorMsg);
    showNotification(errorMsg, 'error');
  } finally {
    setLoading(false);
  }
};
```

### Protected Route
```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### Form with Validation
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!formData.title) {
    showNotification('Please enter title', 'warning');
    return;
  }
  
  // Submit form...
};
```

---

## 🛠️ Component Creation Template

```javascript
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState('');
  const { showNotification } = useNotification();

  const handleClick = () => {
    try {
      // Logic here
      showNotification('Success!', 'success');
    } catch (err) {
      showNotification('Error!', 'error');
    }
  };

  return (
    <Box sx={{ padding: '24px' }}>
      <TextField
        fullWidth
        label="Input"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Button onClick={handleClick} variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default MyComponent;
```

---

## 📚 Material UI Common Components

```javascript
// Container
<Box sx={{ padding: '24px' }}>

// Grid
<Grid container spacing={3}>
  <Grid item xs={12} sm={6}>
  </Grid>
</Grid>

// Card
<Card>
  <CardContent>
  </CardContent>
</Card>

// Buttons
<Button variant="contained">Save</Button>
<Button variant="outlined">Cancel</Button>
<Button variant="text">Link</Button>

// Input
<TextField label="Email" type="email" fullWidth />

// Alert
<Alert severity="success">Success message</Alert>

// Dialog
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>Content</DialogContent>
</Dialog>

// Checkbox
<Checkbox checked={checked} onChange={handleChange} />

// Chip
<Chip label="Status" color="primary" />

// CircularProgress
<CircularProgress />

// Snackbar
<Snackbar open={open} autoHideDuration={3000}>
  <Alert severity="success">Message</Alert>
</Snackbar>
```

---

## 🔗 Routes Map

```
/                          → /dashboard (redirect)
/login                     → LoginPage
/register                  → RegisterPage
/dashboard                 → DashboardPage (protected)
/launch/:id               → LaunchDetailPage (protected)
/launch/:id/day           → LaunchDayPage (protected)
/report/:launchId         → ReportPage (protected)
/*                        → /dashboard (fallback)
```

---

## 🌐 Environment Variables

```env
# Development
VITE_API_BASE_URL=http://localhost:5000/api

# Production
VITE_API_BASE_URL=https://api.gotoluanch.com
```

---

## 📊 Common API Response Formats

### Error Response
```json
{
  "message": "Error description",
  "status": 400
}
```

### User Response
```json
{
  "user": {
    "_id": "id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

### Launches Response
```json
{
  "launches": [
    {
      "_id": "id",
      "productName": "Product",
      "productUrl": "url",
      "launchDate": "2024-03-15",
      "status": "upcoming",
      "checklist": []
    }
  ]
}
```

---

## 🚦 HTTP Status Codes Handled

| Code | Action |
|------|--------|
| 200 | Success - continue |
| 201 | Created - success |
| 400 | Bad Request - show error message |
| 401 | Unauthorized - logout & redirect |
| 404 | Not Found - show error message |
| 500 | Server Error - show error message |

---

## ⚡ Performance Tips

### Optimize Imports
```javascript
// Good - specific import
import Button from '@mui/material/Button';

// Okay - but larger bundle
import { Button } from '@mui/material';
```

### Memoization for Large Lists
```javascript
const MemoizedRow = React.memo(({ item }) => (
  <div>{item.name}</div>
));
```

### Lazy Loading Routes
```javascript
const LaunchDetail = lazy(() => 
  import('./pages/LaunchDetailPage')
);
```

---

## 🧪 Testing Checklist

Before deploying:
```
[ ] Login/Register works
[ ] Create launch works
[ ] Toggle checklist items works
[ ] Add/delete items works
[ ] Launch Day Mode displays correctly
[ ] Report page loads existing data
[ ] All pages responsive on mobile
[ ] All notifications show correctly
[ ] Error handling works
[ ] Logout works
[ ] Redirects work properly
```

---

## 📞 Common Questions

### How to add a new field to a launch?
1. Update backend schema
2. Update API response
3. Update `launchService.js` if needed
4. Update component to display/input field
5. Update form validation if needed

### How to change colors?
1. Edit `src/utils/theme.js`
2. Change color in palette
3. Update component sx={{ color: 'primary' }}

### How to add dark mode?
1. Create dark theme in `theme.js`
2. Add theme toggle state
3. Switch ThemeProvider theme based on state
4. Store preference in localStorage

### How to add new route?
1. Create page component
2. Add route to `src/routes/index.jsx`
3. Wrap with ProtectedRoute if needed
4. Add navigation link in Sidebar/Navbar

---

## 🎓 Learning Resources

- React: https://react.dev
- Material UI: https://mui.com
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev
- Axios: https://axios-http.com

---

**Version**: 1.0.0
**Last Updated**: March 2024
**Status**: Ready for Production
