# 📋 College Management System - Full Stack Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Database Schema](#database-schema)
4. [Security Implementation](#security-implementation)
5. [API Reference](#api-reference)
6. [Configuration Guide](#configuration-guide)
7. [Deployment Guide](#deployment-guide)

## System Overview

The College Management System is a full-stack web application built using Spring Boot 3.5.0 backend and Angular 15+ frontend that provides comprehensive management capabilities for educational institutions. The system implements modern security practices with JWT authentication, role-based authorization, and responsive user interfaces for students, faculty, and administrators.

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
┌─────────────┐     ┌──────────────┐      ┌─────────────┐
│   Client    │───▶ | JWT Filter   |───▶ |Controller   │
│ (Frontend)  │     │ (Security)   |      │ (Endpoint)  │
└─────────────┘     └──────────────┘      └─────────────┘
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
## Fro
ntend Architecture

### Angular Application Structure
```
myApp/
├── src/app/
│   ├── pages/                    # Page Components
│   │   ├── login/                # Authentication pages
│   │   ├── signup/
│   │   ├── dashboard/            # Main dashboard
│   │   ├── admin-dashboard/      # Admin-specific dashboard
│   │   ├── courses/              # Course management
│   │   ├── students/             # Student management
│   │   ├── faculty/              # Faculty management
│   │   ├── departments/          # Department management
│   │   ├── attendance/           # Attendance tracking
│   │   └── gradebook/            # Grade management
│   ├── services/                 # Angular Services
│   │   ├── auth.service.ts       # Authentication service
│   │   ├── course.service.ts     # Course operations
│   │   ├── student.service.ts    # Student operations
│   │   ├── faculty.service.ts    # Faculty operations
│   │   ├── department.service.ts # Department operations
│   │   └── user.service.ts       # User management
│   ├── models/                   # TypeScript interfaces
│   │   ├── user.model.ts
│   │   ├── course.model.ts
│   │   ├── student.model.ts
│   │   └── faculty.model.ts
│   ├── guards/                   # Route guards
│   │   └── auth.guard.ts
│   └── interceptors/             # HTTP interceptors
│       └── auth.interceptor.ts
├── angular.json                  # Angular configuration
├── package.json                  # Dependencies
└── proxy.conf.json              # Development proxy
```

### Component Architecture

**Dashboard Components:**
- **Student Dashboard**: Personal academic information, enrolled courses, grades
- **Faculty Dashboard**: Assigned courses, student management, announcements
- **Admin Dashboard**: System overview, user management, reports

**Management Components:**
- **Course Management**: CRUD operations for courses
- **Student Management**: Student registration, profile management
- **Faculty Management**: Faculty profiles, course assignments
- **Department Management**: Academic department organization

**Shared Components:**
- **Navigation**: Role-based navigation menu
- **Forms**: Reusable form components
- **Tables**: Data display with pagination and sorting
- **Modals**: Confirmation dialogs and forms

### Service Layer

**Authentication Service:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }
  
  signup(userData: SignupRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
```

**HTTP Interceptor:**
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}
```

### Routing Configuration

**App Routing Module:**
```typescript
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'courses', 
    component: CoursesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'students', 
    component: StudentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'FACULTY'] }
  },
  { 
    path: 'faculty', 
    component: FacultyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  }
];
```

## Full Stack Integration

### API Communication

**Frontend-Backend Communication Flow:**
```
Angular Component → Service → HTTP Client → Backend API
                                              ↓
Database ← Repository ← Service ← Controller ←
```

**Example Integration - Course Management:**

**Frontend Service:**
```typescript
getCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(`${this.apiUrl}/courses`);
}

addCourse(course: CourseRequest): Observable<Course> {
  return this.http.post<Course>(`${this.apiUrl}/courses`, course);
}
```

**Backend Controller:**
```java
@GetMapping
public List<CourseDTO> getAllCourses() {
    return courseService.getAllCourses();
}

@PostMapping
@PreAuthorize("hasRole('ADMIN')")
public CourseDTO createCourse(@RequestBody CourseRequestDTO request) {
    return courseService.addCourse(request);
}
```

### State Management

**Local Storage for Authentication:**
```typescript
// Store authentication data
localStorage.setItem('token', response.token);
localStorage.setItem('role', response.role);

// Retrieve authentication data
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
```

**Component State Management:**
```typescript
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(private courseService: CourseService) {}
  
  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }
}
```

## Development Workflow

### Frontend Development Setup

1. **Install Dependencies:**
   ```bash
   cd myApp
   npm install
   ```

2. **Development Server:**
   ```bash
   ng serve
   # Application runs on http://localhost:4200
   ```

3. **Build for Production:**
   ```bash
   ng build --prod
   ```

### Backend Development Setup

1. **Database Setup:**
   ```sql
   CREATE DATABASE college_db;
   ```

2. **Application Configuration:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/college_db
   spring.datasource.username=root
   spring.datasource.password=password
   ```

3. **Run Application:**
   ```bash
   cd college
   mvn spring-boot:run
   # Application runs on http://localhost:8080
   ```

### Development Proxy Configuration

**proxy.conf.json:**
```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

**Angular CLI with Proxy:**
```bash
ng serve --proxy-config proxy.conf.json
```

## Testing Strategy

### Frontend Testing

**Unit Testing with Jasmine/Karma:**
```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should authenticate user', () => {
    const mockResponse = { token: 'test-token', role: 'STUDENT' };
    
    service.login({ username: 'test', password: 'test' }).subscribe(response => {
      expect(response.token).toBe('test-token');
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
```

**End-to-End Testing with Protractor/Cypress:**
```typescript
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login-btn]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### Integration Testing

**Full Stack Integration Test:**
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FullStackIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testLoginAndAccessProtectedEndpoint() {
        // Login
        LoginRequest loginRequest = new LoginRequest("admin", "password");
        ResponseEntity<AuthResponse> loginResponse = 
            restTemplate.postForEntity("/api/auth/login", loginRequest, AuthResponse.class);
        
        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        String token = loginResponse.getBody().getToken();
        
        // Access protected endpoint
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<CourseDTO[]> coursesResponse = 
            restTemplate.exchange("/api/courses", HttpMethod.GET, entity, CourseDTO[].class);
        
        assertEquals(HttpStatus.OK, coursesResponse.getStatusCode());
    }
}
```

## Deployment Guide

### Production Deployment

**Frontend Deployment (Nginx):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/college-frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Backend Deployment (Docker):**
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/college-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Docker Compose:**
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

  backend:
    build: ./college
    ports:
      - "8080:8080"
    environment:
      DB_USERNAME: root
      DB_PASSWORD: rootpassword
      JWT_SECRET: your_production_secret
    depends_on:
      - mysql

  frontend:
    build: ./myApp
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

This comprehensive documentation covers the full-stack architecture, implementation details, and deployment strategies for the College Management System.