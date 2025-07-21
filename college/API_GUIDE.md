# 🔌 API Guide - College Management System

## Base URL
```
http://localhost:4951
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
    "status": "success",
    "data": { ... },
    "message": "Operation completed successfully"
}
```

### Error Response
```json
{
    "status": "error",
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    },
    "timestamp": "2024-01-15T10:30:00Z"
}
```

## Authentication Endpoints

### 1. User Registration

**Endpoint:** `POST /api/auth/signup`

**Description:** Register a new user account

**Request Body:**
```json
{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
}
```

**Response:**
```json
{
    "message": "User registered successfully"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
  }'
```

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
    "username": "john_doe",
    "password": "SecurePassword123!"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huX2RvZSIsImlhdCI6MTY0MjY4MDAwMCwiZXhwIjoxNjQyNzY2NDAwfQ.signature",
    "role": "STUDENT",
    "expiresIn": 86400
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "SecurePassword123!"
  }'
```

## Course Management Endpoints

### 3. Get All Courses

**Endpoint:** `GET /api/courses`

**Description:** Retrieve all available courses

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
    {
        "id": 1,
        "courseName": "Introduction to Computer Science",
        "courseCode": "CS101",
        "description": "Basic concepts of computer science and programming",
        "credits": 3,
        "instructor": {
            "id": 2,
            "name": "Dr. Jane Smith",
            "email": "jane.smith@college.edu"
        },
        "semester": "Fall 2024",
        "capacity": 30,
        "enrolled": 25
    },
    {
        "id": 2,
        "courseName": "Data Structures and Algorithms",
        "courseCode": "CS201",
        "description": "Advanced data structures and algorithm design",
        "credits": 4,
        "instructor": {
            "id": 3,
            "name": "Prof. Bob Johnson",
            "email": "bob.johnson@college.edu"
        },
        "semester": "Spring 2024",
        "capacity": 25,
        "enrolled": 20
    }
]
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Get Course by ID

**Endpoint:** `GET /api/courses/{id}`

**Description:** Retrieve a specific course by ID

**Path Parameters:**
- `id` (integer): Course ID

**Response:**
```json
{
    "id": 1,
    "courseName": "Introduction to Computer Science",
    "courseCode": "CS101",
    "description": "Basic concepts of computer science and programming",
    "credits": 3,
    "instructor": {
        "id": 2,
        "name": "Dr. Jane Smith",
        "email": "jane.smith@college.edu"
    },
    "semester": "Fall 2024",
    "capacity": 30,
    "enrolled": 25,
    "schedule": [
        {
            "day": "Monday",
            "time": "10:00 AM - 11:30 AM",
            "room": "CS-101"
        },
        {
            "day": "Wednesday",
            "time": "10:00 AM - 11:30 AM",
            "room": "CS-101"
        }
    ]
}
```

### 5. Create New Course (Admin Only)

**Endpoint:** `POST /api/courses`

**Description:** Create a new course (requires ADMIN role)

**Request Body:**
```json
{
    "courseName": "Web Development Fundamentals",
    "courseCode": "CS301",
    "description": "Introduction to web development using modern frameworks",
    "credits": 3,
    "instructorId": 2,
    "semester": "Fall 2024",
    "capacity": 30
}
```

**Response:**
```json
{
    "id": 3,
    "courseName": "Web Development Fundamentals",
    "courseCode": "CS301",
    "description": "Introduction to web development using modern frameworks",
    "credits": 3,
    "instructor": {
        "id": 2,
        "name": "Dr. Jane Smith",
        "email": "jane.smith@college.edu"
    },
    "semester": "Fall 2024",
    "capacity": 30,
    "enrolled": 0
}
```

## User Management Endpoints

### 6. Get User Profile

**Endpoint:** `GET /api/users/profile`

**Description:** Get current user's profile information

**Response:**
```json
{
    "id": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT",
    "enrolledCourses": [
        {
            "id": 1,
            "courseName": "Introduction to Computer Science",
            "courseCode": "CS101"
        }
    ],
    "createdAt": "2024-01-15T10:30:00Z"
}
```

### 7. Update User Profile

**Endpoint:** `PUT /api/users/profile`

**Description:** Update current user's profile

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@newemail.com"
}
```

**Response:**
```json
{
    "message": "Profile updated successfully"
}
```

### 8. Get All Users (Admin Only)

**Endpoint:** `GET /api/users`

**Description:** Get all users (requires ADMIN role)

**Query Parameters:**
- `page` (integer, optional): Page number (default: 0)
- `size` (integer, optional): Page size (default: 10)
- `role` (string, optional): Filter by role (STUDENT, ADMIN)

**Response:**
```json
{
    "content": [
        {
            "id": 1,
            "username": "john_doe",
            "email": "john.doe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "role": "STUDENT",
            "createdAt": "2024-01-15T10:30:00Z"
        }
    ],
    "totalElements": 50,
    "totalPages": 5,
    "size": 10,
    "number": 0
}
```

## Enrollment Endpoints

### 9. Enroll in Course

**Endpoint:** `POST /api/enrollments`

**Description:** Enroll current user in a course

**Request Body:**
```json
{
    "courseId": 1
}
```

**Response:**
```json
{
    "id": 1,
    "student": {
        "id": 1,
        "username": "john_doe",
        "firstName": "John",
        "lastName": "Doe"
    },
    "course": {
        "id": 1,
        "courseName": "Introduction to Computer Science",
        "courseCode": "CS101"
    },
    "enrollmentDate": "2024-01-15T10:30:00Z",
    "status": "ENROLLED"
}
```

### 10. Get User Enrollments

**Endpoint:** `GET /api/enrollments/my-courses`

**Description:** Get current user's course enrollments

**Response:**
```json
[
    {
        "id": 1,
        "course": {
            "id": 1,
            "courseName": "Introduction to Computer Science",
            "courseCode": "CS101",
            "credits": 3,
            "instructor": "Dr. Jane Smith"
        },
        "enrollmentDate": "2024-01-15T10:30:00Z",
        "status": "ENROLLED",
        "grade": null
    }
]
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_001` | Invalid credentials |
| `AUTH_002` | Token expired |
| `AUTH_003` | Access denied |
| `USER_001` | User not found |
| `USER_002` | Username already exists |
| `USER_003` | Email already exists |
| `COURSE_001` | Course not found |
| `COURSE_002` | Course code already exists |
| `COURSE_003` | Course capacity full |
| `ENROLL_001` | Already enrolled in course |
| `ENROLL_002` | Enrollment not found |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per user
- **Admin endpoints**: 200 requests per minute per admin user

## Postman Collection

Import this collection into Postman for easy API testing:

```json
{
    "info": {
        "name": "College Management System API",
        "description": "Complete API collection for testing",
        "version": "1.0.0"
    },
    "auth": {
        "type": "bearer",
        "bearer": [
            {
                "key": "token",
                "value": "{{jwt_token}}",
                "type": "string"
            }
        ]
    },
    "variable": [
        {
            "key": "base_url",
            "value": "http://localhost:8080"
        },
        {
            "key": "jwt_token",
            "value": ""
        }
    ]
}
```

## Testing Examples

### JavaScript/Fetch API
```javascript
// Login and get token
const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'john_doe',
        password: 'SecurePassword123!'
    })
});

const { token } = await loginResponse.json();

// Use token for authenticated requests
const coursesResponse = await fetch('http://localhost:8080/api/courses', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

const courses = await coursesResponse.json();
```

### Python/Requests
```python
import requests

# Login
login_data = {
    "username": "john_doe",
    "password": "SecurePassword123!"
}

response = requests.post('http://localhost:8080/api/auth/login', json=login_data)
token = response.json()['token']

# Get courses
headers = {'Authorization': f'Bearer {token}'}
courses_response = requests.get('http://localhost:8080/api/courses', headers=headers)
courses = courses_response.json()
```

## Swagger/OpenAPI Documentation

Interactive API documentation is available at:
```
http://localhost:8080/swagger-ui.html
```

OpenAPI specification:
```
http://localhost:8080/v3/api-docs
```

---

For more detailed information, refer to the main documentation or contact the development team.