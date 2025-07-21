# 🎓 College Management System

A comprehensive college management system built with Spring Boot, featuring secure authentication, course management, and modern REST API architecture.

## ✨ Features

- **🔐 JWT Authentication & Authorization** - Secure login system with role-based access control
- **👥 User Management** - Student and admin user registration and management
- **📚 Course Management** - Complete CRUD operations for courses
- **🛡️ Spring Security Integration** - Protected endpoints with JWT tokens
- **📖 API Documentation** - Interactive Swagger/OpenAPI documentation
- **🌐 CORS Support** - Frontend integration ready (Angular compatible)
- **📊 Monitoring** - Spring Boot Actuator for health checks and metrics

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/College-Management-System-Using-SpringBoot.git
   cd College-Management-System-Using-SpringBoot/college
   ```

2. **Configure Database**
   - Create a MySQL database named `college_db`
   - Update `application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/college_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the Application**
   - API Base URL: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - Health Check: `http://localhost:8080/actuator/health`

## 🏗️ Architecture

### Project Structure
```
college/
├── src/main/java/com/app/college/
│   ├── config/          # Configuration classes
│   │   ├── CorsConfig.java
│   │   └── SecurityConfig.java
│   ├── controller/      # REST Controllers
│   │   └── AuthController.java
│   ├── service/         # Business Logic
│   │   └── CourseService.java
│   ├── repository/      # Data Access Layer
│   ├── model/          # Entity Classes
│   └── dto/            # Data Transfer Objects
└── src/main/resources/
    └── application.properties
```

### Security Architecture
- **JWT-based Authentication** - Stateless authentication using JSON Web Tokens
- **Role-based Authorization** - Different access levels for students and admins
- **CORS Configuration** - Configured for Angular frontend on `localhost:4200`
- **Protected Endpoints** - All `/api/users/**` endpoints require authentication

## 🔧 Technologies and Versions

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
| JUnit                      | Starter         | Unit and integration testing              

## 🔌 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |

### Protected Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/**` | User operations | Authenticated |
| GET | `/api/courses` | Get all courses | Authenticated |

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

## 📚 Frontend Integration

This backend is designed to work with an Angular frontend. The CORS configuration allows requests from `http://localhost:4200`.

### Frontend Setup (Angular)
1. Install Angular CLI: `npm install -g @angular/cli`
2. Navigate to the `myApp` directory
3. Install dependencies: `npm install`
4. Start development server: `ng serve`

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

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- JWT.io for JWT