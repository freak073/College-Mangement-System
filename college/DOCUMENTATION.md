# 📋 College Management System - Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Database Schema](#database-schema)
4. [Security Implementation](#security-implementation)
5. [API Reference](#api-reference)
6. [Configuration Guide](#configuration-guide)
7. [Deployment Guide](#deployment-guide)

## System Overview

The College Management System is a RESTful web application built using Spring Boot 3.5.0 that provides comprehensive management capabilities for educational institutions. The system implements modern security practices with JWT authentication and role-based authorization.

### Key Components
- **Authentication Service**: JWT-based user authentication
- **User Management**: Student and admin user handling
- **Course Management**: CRUD operations for academic courses
- **Security Layer**: Spring Security with custom configurations
- **API Documentation**: Swagger/OpenAPI integration

## Architecture Design

### Layered Architecture
```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│         (REST Controllers)          │
├─────────────────────────────────────┤
│            Service Layer            │
│         (Business Logic)            │
├─────────────────────────────────────┤
│         Repository Layer            │
│        (Data Access Layer)          │
├─────────────────────────────────────┤
│           Database Layer            │
│            (MySQL)                  │
└─────────────────────────────────────┘
```

### Security Architecture
```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Client    │───▶│ JWT Filter   │───▶│ Controller  │
│ (Frontend)  │    │ (Security)   │    │ (Endpoint)  │
└─────────────┘    └──────────────┘    └─────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ UserDetails  │
                   │   Service    │
                   └──────────────┘
```

## Database Schema

### User Entity
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'ADMIN') DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Course Entity
```sql
CREATE TABLE courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    credits INTEGER DEFAULT 3,
    instructor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);
```

## Security Implementation

### JWT Configuration
- **Algorithm**: HS256
- **Token Expiration**: 24 hours (configurable)
- **Secret Key**: Environment-based configuration
- **Claims**: Username, roles, expiration

### Security Filter Chain
1. **CORS Filter**: Handles cross-origin requests
2. **JWT Authentication Filter**: Validates JWT tokens
3. **Authentication Provider**: Validates user credentials
4. **Authorization**: Role-based access control

### Protected Endpoints
```java
// Public endpoints
/api/auth/**           // Authentication endpoints
/v3/api-docs/**        // Swagger documentation
/swagger-ui/**         // Swagger UI

// Protected endpoints
/api/users/**          // User management (requires authentication)
/api/courses/**        // Course management (requires authentication)
```

## API Reference

### Authentication API

#### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "STUDENT|ADMIN"
}
```

**Response:**
```json
{
    "message": "User registered successfully"
}
```

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "STUDENT"
}
```

### Course API

#### GET /api/courses
Retrieve all courses.

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
        "description": "Basic computer science concepts",
        "credits": 3
    }
]
```

## Configuration Guide

### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/college_db
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:password}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=${JWT_SECRET:mySecretKey}
jwt.expiration=86400000

# Server Configuration
server.port=8080

# Actuator Configuration
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized
```

### Environment Variables
```bash
# Database
export DB_USERNAME=your_db_username
export DB_PASSWORD=your_db_password

# JWT
export JWT_SECRET=your_super_secret_jwt_key

# Application
export SPRING_PROFILES_ACTIVE=production
```

## Deployment Guide

### Docker Deployment

#### Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/college-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: college_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_USERNAME: root
      DB_PASSWORD: rootpassword
      JWT_SECRET: your_production_secret
    depends_on:
      - mysql

volumes:
  mysql_data:
```

### Production Deployment Steps

1. **Build the Application**
   ```bash
   mvn clean package -DskipTests
   ```

2. **Create Docker Image**
   ```bash
   docker build -t college-management-system .
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Health Check**
   ```bash
   curl http://localhost:8080/actuator/health
   ```

### Performance Considerations

- **Database Connection Pooling**: Configure HikariCP for optimal performance
- **Caching**: Implement Redis for session management and caching
- **Load Balancing**: Use Nginx for load balancing multiple instances
- **Monitoring**: Integrate with Prometheus and Grafana for monitoring

### Security Best Practices

1. **Environment Variables**: Store sensitive data in environment variables
2. **HTTPS**: Use SSL/TLS in production
3. **Rate Limiting**: Implement API rate limiting
4. **Input Validation**: Validate all input data
5. **SQL Injection Prevention**: Use parameterized queries
6. **CORS**: Configure CORS for specific domains only

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Issues**
   - Check MySQL service status
   - Verify connection parameters
   - Ensure database exists

2. **JWT Token Issues**
   - Verify token format and expiration
   - Check secret key configuration
   - Validate token claims

3. **CORS Issues**
   - Check allowed origins in CorsConfig
   - Verify preflight request handling
   - Check browser developer tools

4. **Performance Issues**
   - Monitor database query performance
   - Check connection pool settings
   - Review application logs

### Logging Configuration

```properties
# Logging Configuration
logging.level.com.app.college=DEBUG
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=INFO
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
logging.file.name=logs/college-management.log
```

## Testing Strategy

### Unit Testing
- Service layer testing with Mockito
- Repository testing with @DataJpaTest
- Controller testing with @WebMvcTest

### Integration Testing
- Full application context testing
- Database integration testing
- Security integration testing

### API Testing
- Postman collection for manual testing
- Automated API testing with RestAssured
- Load testing with JMeter

---

For additional support or questions, please refer to the project repository or contact the development team.