# GoToLaunch - Product Hunt Launch Planning Tool

A production-ready SaaS frontend for planning and managing product launches. Built with React, Vite, and Material UI.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Automatic session management

### Dashboard
- View all your launches at a glance
- Create new launches with product details
- Quick stats on launch statuses

### Launch Management
- Organize launches with details (name, URL, date, timezone)
- Manage detailed checklists organized by category
- Add custom checklist items
- Track completion progress
- Assign due dates to tasks

### Launch Day Mode
- Special UI for launch day
- Focus on critical tasks
- Mark all items done quickly
- Large typography for visibility

### Post-Launch Reports
- Document launch performance (upvotes, rank)
- Record traffic insights
- Write and refine learnings
- View and update reports anytime

### User Experience
- Fully responsive design
- Clean, professional SaaS UI
- Light theme with subtle shadows
- Smooth transitions and interactions
- Notifications for all actions
- Loading states and error handling

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Material UI v7** - Component library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - Global state management

## Project Structure

```
src/
├── api/                 # API service layer
│   ├── axiosInstance.js # Axios configuration
│   ├── authService.js   # Auth API calls
│   └── launchService.js # Launch API calls
├── components/          # Reusable components
│   ├── Checklist.jsx    # Checklist UI component
│   ├── Notification.jsx # Toast notifications
│   ├── Sidebar.jsx      # Navigation sidebar
│   └── TopNavbar.jsx    # Header
├── context/             # Context providers
│   └── AuthContext.jsx  # Auth state management
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Auth hook
│   └── useNotification.js # Notification hook
├── layouts/             # Layout wrappers
│   ├── AuthLayout.jsx   # Auth pages layout
│   └── DashboardLayout.jsx # Dashboard layout
├── pages/               # Page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── LaunchDetailPage.jsx
│   ├── LaunchDayPage.jsx
│   └── ReportPage.jsx
├── routes/              # Router configuration
│   ├── index.jsx        # Router setup
│   └── ProtectedRoute.jsx # Auth guard
├── utils/               # Utilities
│   ├── constants.js     # App constants
│   ├── formatters.js    # Date/time formatters
│   └── theme.js         # MUI theme config
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gotolaunch-front-end
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API base URL:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The application integrates with a backend API at `http://localhost:5000/api`. Ensure the backend server is running.

### Required Endpoints

**Authentication:**
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

**Launches:**
- `GET /launch` - List all launches
- `POST /launch/create` - Create new launch
- `GET /launch/:id` - Get launch details
- `PUT /launch/:id` - Update launch
- `DELETE /launch/:id` - Delete launch

**Checklists:**
- `GET /launch/:launchId/checklist` - Get checklist items
- `POST /launch/:launchId/checklist` - Add item
- `PUT /launch/:launchId/checklist/:itemId/toggle` - Toggle item completion
- `DELETE /launch/:launchId/checklist/:itemId` - Delete item

**Reports:**
- `GET /launch/:launchId/report` - Get report
- `POST /launch/:launchId/report` - Create report
- `PUT /launch/:launchId/report` - Update report

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token (stored in HttpOnly cookie)
3. App calls `/auth/me` to verify session on load
4. Protected routes require authentication
5. 401 responses trigger logout

## Styling

The app uses Material UI v7 with a custom light theme. All styling is configured in `src/utils/theme.js`.

### Color Palette
- Primary: #1976D2 (Blue)
- Secondary: #DC004E (Red)
- Success: #4CAF50 (Green)
- Error: #F44336 (Red)
- Warning: #FF9800 (Orange)

## Best Practices

- Clean component structure
- Reusable components and hooks
- Centralized API service layer
- Global state with Context API
- Proper error handling
- Loading states for async operations
- Responsive design for all devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React Router
- Optimized bundle size with Vite
- Lazy loading of routes
- Image optimization
- CSS-in-JS with MUI (no extra CSS files)

## Contributing

Guidelines for contribution:
1. Follow the existing code structure
2. Use meaningful component and variable names
3. Add error handling for API calls
4. Test on multiple screen sizes
5. Follow the Material Design principles

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue in the repository.

## Roadmap

Future enhancements:
- Dark mode
- Advanced analytics
- Team collaboration features
- Social sharing integration
- Mobile app version
- Email notifications
