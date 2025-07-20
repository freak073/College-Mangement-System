import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
  { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
  {
    path: 'admin-login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { role: 'admin' }
  },
  // Feature stub routes for dashboard cards
  { path: 'grades', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  { path: 'profile', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  { path: 'announcements', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  { path: 'support', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  // Remove feature stub routes for faculty dashboard features (now real components)
  { path: 'department-info', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  { path: 'department-courses', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  { path: 'reports', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },
  {
    path: 'faculty-login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { role: 'faculty' }
  },
  {
    path: 'student-login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { role: 'student' }
  },
  {
    path: 'department-login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { role: 'department' }
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  // Admin dashboard feature routes (unique)
  { path: 'admin-students', loadComponent: () => import('./pages/admin-students/admin-students.component').then(m => m.AdminStudentsComponent), data: { role: 'admin' } },
  { path: 'admin-faculty', loadComponent: () => import('./pages/faculty/faculty.component').then(m => m.FacultyComponent), data: { role: 'admin' } },
  { path: 'admin-courses', loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent), data: { role: 'admin' } },
  { path: 'admin-departments', loadComponent: () => import('./pages/admin-departments/admin-departments.component').then(m => m.AdminDepartmentsComponent), data: { role: 'admin' } },
  // Unique dashboard routes
  { path: 'faculty-dashboard', loadComponent: () => import('./pages/faculty/faculty.component').then(m => m.FacultyComponent) },
  { path: 'student-dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'department-dashboard', loadComponent: () => import('./pages/departments/departments.component').then(m => m.DepartmentsComponent) },
  { path: 'settings', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },

  { path: 'faculty-courses', loadComponent: () => import('./pages/faculty-courses/faculty-courses.component').then(m => m.FacultyCoursesComponent) },
  { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance.component').then(m => m.AttendanceComponent) },
  { path: 'gradebook', loadComponent: () => import('./pages/gradebook/gradebook.component').then(m => m.GradebookComponent) },
  { path: 'faculty-announcements', loadComponent: () => import('./pages/faculty-announcements/faculty-announcements.component').then(m => m.FacultyAnnouncementsComponent) },
  { path: 'faculty-profile', loadComponent: () => import('./pages/faculty-profile/faculty-profile.component').then(m => m.FacultyProfileComponent) },

  { path: 'student-courses', loadComponent: () => import('./pages/feature-stub/feature-stub.component').then(m => m.FeatureStubComponent) },

];
