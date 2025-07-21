# 🎓 College Management System - Full Stack Application

A comprehensive college management system built with **Spring Boot** backend and **Angular** frontend, featuring secure authentication, complete academic management, and modern web architecture.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    COLLEGE MANAGEMENT SYSTEM                │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Angular)          │  Backend (Spring Boot)       │
│  ├── Student Dashboard       │  ├── REST API Controllers    │
│  ├── Faculty Dashboard       │  ├── JWT Authentication      │
│  ├── Admin Dashboard         │  ├── Spring Security         │
│  ├── Course Management       │  ├── JPA/Hibernate           │
│  └── User Management         │  └── MySQL Database          │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Features

### 🔐 Authentication & Security
- **JWT Token-based Authentication** - Secure, stateless authentication
- **Role-based Authorization** - Student, Faculty, and Admin roles
- **Password Encryption** - BCrypt hashing for secure password storage
- **Session Management** - Stateless session handling

### 👥 User Management
- **Multi-role System** - Students, Faculty, and Administrators
- **User Registration & Login** - Secure signup and authentication
- **Profile Management** - Update personal information and preferences
- **User CRUD Operations** - Complete user lifecycle management

### 📚 Academic Management
- **Course Management** - Create, read, update, delete courses
- **Department Management** - Organize courses by departments
- **Faculty Management** - Assign faculty to courses and departments
- **Student Enrollment** - Enroll students in courses
- **Attendance Tracking** - Monitor student attendance
- **Grade Management** - Record and manage student grades

### 🎯 Dashboard Features
- **Student Dashboard** - View enrolled courses, grades, and announcements
- **Faculty Dashboard** - Manage courses, students, and announcements
- **Admin Dashboard** - System-wide management and analytics
- **Real-time Updates** - Dynamic content updates

### 🌐 Modern Web Features
- **Responsive Design** - Mobile-friendly interface
- **RESTful API** - Clean, documented API endpoints
- **CORS Support** - Cross-origin resource sharing
- **API Documentation** - Interactive Swagger/OpenAPI docs
- **Monitoring** - Health checks and application metrics

## 🚀 Quick Start

### Prerequisites

**Backend Requirements:**
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

**Frontend Requirements:**
- Node.js 16+ and npm
- Angular CLI 15+

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/freak073/College-Management-System.git
   cd College-Management-System
   ```

2. **Backend Setup (Spring Boot)**
   ```bash
   cd college
   
   # Configure Database
   # Create MySQL database named 'college_db'
   # Update src/main/resources/application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/college_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   
   # Build and Run
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup (Angular)**
   ```bash
   cd myApp
   
   # Install dependencies
   npm install
   
   # Start development server
   ng serve
   ```

4. **Access the Application**
   - **Frontend**: `http://localhost:4200`
   - **Backend API**: `http://localhost:4951`
   - **Swagger UI**: `http://localhost:4951/swagger-ui.html`
   - **Health Check**: `http://localhost:4951/actuator/health`

## 🏗️ Project Structure

### Full Stack Architecture
```
College-Management-System/
├── college/                          # Spring Boot Backend
│   ├── src/main/java/com/app/college/
│   │   ├── config/                   # Configuration classes
│   │   │   ├── CorsConfig.java       # CORS configuration
│   │   │   ├── SecurityConfig.java   # Security configuration
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── OpenApiConfig.java    # Swagger configuration
│   │   ├── controller/               # REST Controllers
│   │   │   ├── AuthController.java   # Authentication endpoints
│   │   │   ├── CourseController.java # Course management
│   │   │   ├── StudentController.java# Student management
│   │   │   ├── FacultyController.java# Faculty management
│   │   │   └── DepartmentController.java
│   │   ├── service/                  # Business Logic Layer
│   │   │   ├── UserService.java
│   │   │   ├── CourseService.java
│   │   │   ├── StudentService.java
│   │   │   └── FacultyService.java
│   │   ├── repository/               # Data Access Layer
│   │   │   ├── UserRepository.java
│   │   │   ├── CourseRepository.java
│   │   │   └── StudentRepository.java
│   │   ├── model/                    # Entity Classes
│   │   │   ├── User.java
│   │   │   ├── Course.java
│   │   │   ├── Student.java
│   │   │   └── Faculty.java
│   │   ├── dto/                      # Data Transfer Objects
│   │   └── security/                 # Security utilities
│   └── src/main/resources/
│       └── application.properties
│
├── myApp/                            # Angular Frontend
│   ├── src/app/
│   │   ├── pages/                    # Page Components
│   │   │   ├── login/                # Login page
│   │   │   ├── dashboard/            # Main dashboard
│   │   │   ├── admin-dashboard/      # Admin dashboard
│   │   │   ├── courses/              # Course management
│   │   │   ├── students/             # Student management
│   │   │   ├── faculty/              # Faculty management
│   │   │   └── departments/          # Department management
│   │   ├── services/                 # Angular Services
│   │   │   ├── auth.service.ts       # Authentication service
│   │   │   ├── course.service.ts     # Course service
│   │   │   ├── student.service.ts    # Student service
│   │   │   └── faculty.service.ts    # Faculty service
│   │   ├── models/                   # TypeScript interfaces
│   │   └── app-routing.module.ts     # Route configuration
│   ├── angular.json
│   ├── package.json
│   └── proxy.conf.json               # Proxy configuration
│
├── README.md                         # This file
├── DOCUMENTATION.md                  # Technical documentation
└── API_GUIDE.md                     # API reference guide
```

### Security Architecture
- **JWT-based Authentication** - Stateless authentication using JSON Web Tokens
- **Role-based Authorization** - Student, Faculty, and Admin access levels
- **CORS Configuration** - Configured for Angular frontend on `localhost:4200`
- **HTTP Interceptors** - Automatic token attachment for API calls
- **Route Guards** - Frontend route protection based on authentication

## 🔧 Technology Stack

### Backend Technologies
| Technology                 | Version         | Purpose                                          |
|----------------------------|-----------------|--------------------------------------------------|
| Java                       | 17              | Core programming language                        |
| Spring Boot                | 3.5.0           | Main application framework                       |
| Maven                      | 4.0.0           | Build and dependency management                  |
| Spring Data JPA            | Starter         | Database access with Hibernate                  |
| Spring Web                 | Starter         | REST API development                             |
| Spring Security            | Starter         | Authentication and authorization                 |
| MySQL Connector/J          | Runtime         | MySQL database connectivity                      |
| Lombok                     | Latest          | Reduce boilerplate code                          |
| JJWT                       | 0.11.5          | JWT token generation and validation              |
| Swagger/OpenAPI            | 2.5.0           | API documentation                                |
| Jackson JSR310             | Included        | Java 8+ Date/Time JSON serialization            |
| Spring Boot Actuator       | Starter         | Application monitoring and metrics               |
| JUnit                      | Starter         | Unit and integration testing                     |

### Frontend Technologies
| Technology                 | Version         | Purpose                                          |
|----------------------------|-----------------|--------------------------------------------------|
| Angular                    | 15+             | Frontend framework                               |
| TypeScript                 | 4.8+            | Type-safe JavaScript development                 |
| Angular CLI                | 15+             | Development tools and build system               |
| Angular Router             | 15+             | Client-side routing                              |
| Angular HTTP Client        | 15+             | HTTP communication with backend                  |
| RxJS                       | 7+              | Reactive programming with observables            |
| Bootstrap/CSS3             | Latest          | Responsive UI styling                            |
| Node.js                    | 16+             | JavaScript runtime for development               |
| npm                        | 8+              | Package manager                                  |

### Database & Infrastructure
| Technology                 | Version         | Purpose                                          |
|----------------------------|-----------------|--------------------------------------------------|
| MySQL                      | 8.0+            | Primary database                                 |
| Hibernate                  | 6.x             | ORM framework                                    |
| HikariCP                   | Included        | Connection pooling                               |

## 🔌 API Endpoints Overview

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |

### Course Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/courses` | Get all courses | Authenticated |
| POST | `/api/courses` | Create new course | Admin |
| PUT | `/api/courses/{id}` | Update course | Admin |
| DELETE | `/api/courses/{id}` | Delete course | Admin |

### Student Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/students` | Get all students | Admin/Faculty |
| POST | `/api/students` | Create new student | Admin |
| PUT | `/api/students/{id}` | Update student | Admin |
| DELETE | `/api/students/{id}` | Delete student | Admin |

### Faculty Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/faculty` | Get all faculty | Admin |
| POST | `/api/faculty` | Create new faculty | Admin |
| PUT | `/api/faculty/{id}` | Update faculty | Admin |
| DELETE | `/api/faculty/{id}` | Delete faculty | Admin |

### Department Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/departments` | Get all departments | Authenticated |
| POST | `/api/departments` | Create new department | Admin |
| PUT | `/api/departments/{id}` | Update department | Admin |
| DELETE | `/api/departments/{id}` | Delete department | Admin |

### Enrollment Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/enrollments` | Get all enrollments | Admin/Faculty |
| POST | `/api/enrollments` | Enroll student | Admin |
| PUT | `/api/enrollments/{id}` | Update enrollment | Admin |
| DELETE | `/api/enrollments/{id}` | Delete enrollment | Admin |

### Example API Usage

#### User Registration
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "STUDENT"
}
```

#### Accessing Protected Endpoints
```bash
curl -X GET http://localhost:8080/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛠️ Development

### Running Tests
```bash
mvn test
```

### Building for Production
```bash
mvn clean package
java -jar target/college-0.0.1-SNAPSHOT.jar
```

### Database Migration
The application uses JPA/Hibernate for automatic schema generation. On first run, tables will be created automatically.

## 🔒 Security Features

- **JWT Token Authentication** - Secure, stateless authentication
- **Password Encoding** - BCrypt password hashing
- **CORS Protection** - Configured for specific origins
- **Method-level Security** - Fine-grained access control
- **Session Management** - Stateless session policy

## � ️ Frontend Features

### User Interfaces
- **Landing Page** - Welcome page with system overview
- **Login/Signup** - User authentication interface
- **Student Dashboard** - Personal academic information
- **Faculty Dashboard** - Course and student management
- **Admin Dashboard** - System-wide administration

### Key Components
- **Course Management** - CRUD operations for courses
- **Student Management** - Student registration and profile management
- **Faculty Management** - Faculty profiles and course assignments
- **Department Management** - Academic department organization
- **Attendance Tracking** - Student attendance monitoring
- **Grade Management** - Academic performance tracking
- **User Management** - System user administration

### Angular Services
- **AuthService** - Authentication and authorization
- **CourseService** - Course-related API calls
- **StudentService** - Student management operations
- **FacultyService** - Faculty management operations
- **UserService** - User management operations

### Routing & Navigation
- **Role-based Routing** - Different routes for different user roles
- **Route Guards** - Authentication-based access control
- **Lazy Loading** - Optimized module loading

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `application.properties`
   - Ensure database `college_db` exists

2. **JWT Token Issues**
   - Check token expiration
   - Verify token format in Authorization header: `Bearer <token>`

3. **CORS Errors**
   - Verify frontend URL in `CorsConfig.java`
   - Check if preflight OPTIONS requests are allowed

## 📈 Monitoring

Access application metrics and health information:
- Health: `http://localhost:8080/actuator/health`
- Info: `http://localhost:8080/actuator/info`
- Metrics: `http://localhost:8080/actuator/metrics`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **VARUN K P** - *Initial work* - [YourGitHub](https://github.com/freak073)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- JWT.io for JWT implementation guidance
- Swagger team for API documentation tools

---

**Note**: This is a demo project for educational purposes. For production use, consider additional security measures, comprehensive testing, and proper error handling.
