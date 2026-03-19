# Herbal Garden Backend API

Backend REST API for the Herbal Garden wellness application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication**: User registration, login with JWT tokens
- **Plant Management**: CRUD operations for plant data with search/filter
- **Favorites**: Add/remove plants to user favorites and persistent storage
- **User Profiles**: Update profile, change password, manage preferences
- **AYUSH Integration**: Support for Ayurveda, Siddha, Unani, Homeopathy
- **Error Handling**: Comprehensive error handling and validation
- **CORS Enabled**: Frontend integration with React app

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with configuration:
```bash
cp .env.example .env
```

4. Update `.env` with your settings:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/herbal-garden
JWT_SECRET=your_secure_secret_key
FRONTEND_URL=http://localhost:5173
```

## 🎯 Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will start on `http://localhost:5000` (or your configured PORT)

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response: { token, user }
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Logout
```
POST /auth/logout

Response: { message: "Logout successful" }
```

### Plant Endpoints

#### Get All Plants
```
GET /plants
```

#### Get Plant by ID
```
GET /plants/:id
```

#### Search Plants
```
GET /plants/search?q=tulsi&type=Herb&region=India&ayush=Ayurveda
```

#### Create Plant (Admin)
```
POST /plants
Content-Type: application/json

{
  "name": "Tulsi",
  "scientificName": "Ocimum sanctum",
  "description": "...",
  "uses": [{ "use": "Immunity", "description": "..." }],
  "ayushSystem": ["Ayurveda"]
}
```

#### Update Plant (Admin)
```
PUT /plants/:id
Content-Type: application/json
```

#### Delete Plant (Admin)
```
DELETE /plants/:id
```

### Favorite Endpoints (Requires Authentication)

#### Add to Favorites
```
POST /favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "plantId": "60d5ec49a1b2c3f4e5g6h7i8"
}
```

#### Get User Favorites
```
GET /favorites
Authorization: Bearer <token>
```

#### Remove from Favorites
```
DELETE /favorites/:plantId
Authorization: Bearer <token>
```

#### Check if Favorite
```
GET /favorites/check/:plantId
Authorization: Bearer <token>
```

### User Endpoints (Requires Authentication)

#### Get Profile
```
GET /users/profile
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Plant enthusiast",
  "preferences": {
    "favoriteCategory": "immunity",
    "notifications": true
  }
}
```

#### Update Password
```
PUT /users/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

#### Delete Account
```
DELETE /users/account
Authorization: Bearer <token>
```

## 🗄️ Database Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required)
- `bio`: String (optional)
- `preferences`: Object
  - `favoriteCategory`: String (digestive|immunity|skin-care|general)
  - `notifications`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Plant
- `name`: String (required, unique)
- `scientificName`: String
- `commonNames`: Array
- `description`: String (required)
- `uses`: Array of Objects
- `region`: String
- `plantType`: String (Herb|Shrub|Tree|Vine|Flower|Root|Other)
- `ayushSystem`: Array (Ayurveda|Siddha|Unani|Homeopathy)
- `potentialBenefits`: Array
- `cautions`: Array
- `image`: String
- `tags`: Array
- `createdAt`: Date
- `updatedAt`: Date

### Favorite
- `userId`: ObjectId (ref: User)
- `plantId`: ObjectId (ref: Plant)
- `notes`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire based on `JWT_EXPIRE` setting (default: 7 days)

## 🛠️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment mode |
| MONGODB_URI | mongodb://localhost:27017/herbal-garden | MongoDB connection string |
| JWT_SECRET | default_secret | Secret key for JWT signing |
| JWT_EXPIRE | 7d | Token expiration time |
| FRONTEND_URL | http://localhost:5173 | Frontend URL for CORS |

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── plantController.js    # Plant CRUD operations
│   │   ├── favoriteController.js # Favorite management
│   │   └── userController.js     # User profile management
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Plant.js              # Plant schema
│   │   └── Favorite.js           # Favorite schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── plants.js             # Plant endpoints
│   │   ├── favorites.js          # Favorite endpoints
│   │   └── users.js              # User endpoints
│   ├── utils/
│   │   └── jwt.js                # JWT utilities
│   └── server.js                 # Express app configuration
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🚨 Error Handling

All API responses follow a consistent error format:

### Success Response
```json
{
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "error": "Error message here",
  "details": ["Additional details if applicable"]
}
```

### Common Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 🔗 Frontend Integration

The backend is configured to work with the React frontend:

```javascript
// Frontend API base URL
const API_URL = 'http://localhost:5000/api';

// Example: Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();

// Store token and use in subsequent requests
localStorage.setItem('herbalGardenAuth', token);

// Protected endpoint example
const response = await fetch(`${API_URL}/favorites`, {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🧪 Testing

Recommended tools:
- **Postman**: API testing and documentation
- **Thunder Client**: VSCode extension for API testing
- **Insomnia**: REST client and API design platform

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a pull request

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues and questions:
- Check the API documentation above
- Review error messages and status codes
- Verify environment configuration
- Check MongoDB connection

---

**Herbal Garden Backend** | Version 1.0.0 | Built with ❤️
