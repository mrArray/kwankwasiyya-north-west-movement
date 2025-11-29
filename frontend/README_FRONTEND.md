# Kwankwasiyya Digital ID System - Frontend

React frontend application built with Vite and Tailwind CSS for the Kwankwasiyya Movement Northwest digital registration and ID generation system.

## Features

### Public Features
- **Supporter Registration** - Complete registration form with photo upload
- **Digital ID Generation** - Automatic generation of registration number and digital ID
- **Verification System** - Verify supporter authenticity using registration number
- **PDF Download** - Download digital ID cards as PDF

### Admin Features
- **JWT Authentication** - Secure admin access with JWT tokens
- **Dashboard** - Overview with key statistics and metrics
- **Supporter Management** - View, search, filter, and export supporter data
- **Analytics** - Registration trends, geographic distribution, and key metrics
- **CSV Export** - Export supporter data for external analysis

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Wouter** - Lightweight routing
- **TypeScript** - Type-safe development

## Project Structure

```
client/
├── public/
│   └── logo.jpeg           # Kwankwasiyya logo
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   └── AdminLayout.tsx # Admin dashboard layout
│   ├── lib/
│   │   └── api.ts          # API client and types
│   ├── pages/
│   │   ├── Register.tsx    # Public registration form
│   │   ├── Verify.tsx      # Verification page
│   │   ├── AdminLogin.tsx  # Admin login
│   │   ├── AdminDashboard.tsx    # Admin overview
│   │   ├── AdminSupporters.tsx   # Supporter management
│   │   └── AdminAnalytics.tsx    # Analytics and charts
│   ├── App.tsx             # Routes and app structure
│   ├── const.ts            # App constants
│   └── index.css           # Global styles and theme
└── package.json
```

## Configuration

### Backend API URL

The frontend connects to the backend API using the `VITE_API_BASE_URL` environment variable. You can configure this in the Management UI under Settings → Secrets.

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:3080/api
```

**Production:**
```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Branding

The application uses the Kwankwasiyya branding:
- **Logo**: `/logo.jpeg` (configured in `client/src/const.ts`)
- **Colors**: Green primary color (oklch(45% 0.15 150)) matching the movement's branding
- **Theme**: Light theme with custom color palette

To update the logo:
1. Replace the logo in `client/public/logo.jpeg`
2. Update `APP_LOGO` in `client/src/const.ts`
3. Update the favicon in Management UI Settings → General

## Routes

### Public Routes
- `/` or `/register` - Supporter registration form
- `/verify` - Verify registration number

### Admin Routes
- `/admin` - Admin login (requires JWT token)
- `/admin/dashboard` - Statistics overview
- `/admin/supporters` - Supporter management with search, filter, and export
- `/admin/analytics` - Registration trends and geographic distribution

## API Integration

The frontend integrates with the following backend endpoints:

### Public Endpoints
- `POST /api/supporters/register` - Register new supporter
- `GET /api/supporters/verify/:registrationNumber` - Verify supporter
- `GET /api/pdf/:registrationNumber` - Download digital ID PDF

### Protected Endpoints (Require JWT Token)
- `GET /api/supporters` - Get all supporters with pagination
- `GET /api/supporters/:id` - Get supporter by ID
- `GET /api/supporters/statistics` - Get statistics
- `GET /api/supporters/export/csv` - Export to CSV
- `GET /api/analytics/trends` - Registration trends
- `GET /api/analytics/by-state` - Supporters by state
- `GET /api/analytics/by-lg` - Supporters by local government
- `GET /api/analytics/metrics` - Key metrics

## Admin Authentication

The admin panel uses JWT token authentication. To access admin features:

1. Navigate to `/admin`
2. Enter your JWT token (obtained from backend)
3. The token is stored in localStorage for subsequent requests
4. Use the Logout button to clear the token

## Development

The project is managed through the Manus platform:

1. **Preview** - View the live application in the Management UI
2. **Code** - Access and download all source files
3. **Settings** - Configure environment variables and secrets
4. **Publish** - Deploy the application (requires checkpoint)

## Responsive Design

The application is fully responsive and works on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## Features Implemented

✅ Supporter registration with photo upload
✅ Form validation and error handling
✅ Registration number generation and display
✅ Verification system with detailed supporter info
✅ PDF download functionality
✅ Admin authentication with JWT
✅ Dashboard with statistics
✅ Supporter list with pagination
✅ Search and filter by name, state, LG
✅ CSV export
✅ Registration trends visualization
✅ Geographic distribution charts
✅ Key metrics display
✅ Loading states and error handling
✅ Toast notifications
✅ Responsive design
✅ Kwankwasiyya branding and colors

## Backend Setup

This frontend requires the Kwankwasiyya backend API to be running. Refer to the backend README for setup instructions.

Key backend requirements:
- Node.js backend running on configured port (default: 3080)
- MySQL database configured
- CORS enabled for frontend origin
- JWT secret configured for admin authentication

## Support

For issues or questions about the Kwankwasiyya Digital ID System, please contact the development team.

## License

ISC
