# Kwankwasiyya Digital ID System - Backend API

Pure Node.js, Express.js, and MySQL backend for the Kwankwasiyya Digital ID System.

## Features

- **Supporter Registration** - Register new supporters with photo upload
- **Digital ID Generation** - Generate PDF digital ID cards with QR codes
- **Verification System** - Verify supporter authenticity via registration number
- **Analytics Dashboard** - Track registration trends and geographic distribution
- **Admin Management** - View, search, filter, and export supporter data
- **RESTful API** - Clean REST API architecture

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **PDFKit** - PDF generation
- **QRCode** - QR code generation
- **JWT** - Authentication

## Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update with your configuration:
   ```
   PORT=3080
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_DATABASE=kwankwasiyya_db
   
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   MAX_FILE_SIZE=5242880
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE kwankwasiyya_db;
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3080`

## API Endpoints

### Public Endpoints

#### Register Supporter
```http
POST /api/supporters/register
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "age": 30,
  "business": "Trading",
  "state": "Kano",
  "LG": "Gwale",
  "ward": "Ward 1",
  "pollingUnit": "Unit 001",
  "phoneNumber": "08012345678",
  "email": "john@example.com",
  "photo": <file>
}
```

#### Verify Supporter
```http
GET /api/supporters/verify/:registrationNumber
```

#### Download PDF
```http
GET /api/pdf/:registrationNumber
```

### Protected Endpoints (Require JWT Token)

Add header: `Authorization: Bearer <token>`

#### Get All Supporters
```http
GET /api/supporters?page=1&limit=10&search=&state=&LG=
```

#### Get Supporter by ID
```http
GET /api/supporters/:id
```

#### Get Statistics
```http
GET /api/supporters/statistics
```

#### Export to CSV
```http
GET /api/supporters/export/csv
```

#### Get Registration Trends
```http
GET /api/analytics/trends?days=30
```

#### Get Supporters by State
```http
GET /api/analytics/by-state
```

#### Get Supporters by LG
```http
GET /api/analytics/by-lg
```

#### Get Key Metrics
```http
GET /api/analytics/metrics
```

## Database Schema

### Supporters Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| registrationNumber | VARCHAR(50) | Unique registration number |
| fullName | VARCHAR(255) | Full name |
| age | INTEGER | Age (optional) |
| business | VARCHAR(255) | Business (optional) |
| state | VARCHAR(100) | State |
| LG | VARCHAR(100) | Local Government |
| ward | VARCHAR(100) | Ward |
| pollingUnit | VARCHAR(100) | Polling Unit |
| phoneNumber | VARCHAR(20) | Phone number |
| email | VARCHAR(255) | Email (optional) |
| photoUrl | VARCHAR(500) | Photo URL |
| createdAt | DATETIME | Creation timestamp |
| updatedAt | DATETIME | Update timestamp |

## Project Structure

```
kwankwasiyya_backend/
├── config/
│   ├── database.js          # Database configuration
│   └── sequelize.js          # Sequelize setup
├── controllers/
│   ├── supporterController.js    # Supporter CRUD operations
│   ├── pdfController.js          # PDF generation
│   └── analyticsController.js    # Analytics endpoints
├── middleware/
│   └── authentication.js     # JWT authentication
├── models/
│   └── supporter.model.js    # Supporter model
├── routes/
│   ├── supporterRoutes.js    # Supporter routes
│   ├── pdfRoutes.js          # PDF routes
│   └── analyticsRoutes.js    # Analytics routes
├── uploads/                  # Uploaded photos
├── generated/                # Generated files
├── server.js                 # Main server file
├── package.json              # Dependencies
└── .env                      # Environment variables
```

## Authentication

For protected endpoints, you need to include a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "statusCode": 400,
    "message": "Detailed error message"
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## License

ISC

## Support

For issues or questions, please contact the development team.
