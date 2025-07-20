
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // Only add Authorization header for protected endpoints
  const isProtected = !req.url.includes('/api/auth/signup') && !req.url.includes('/api/auth/login');
  if (token && isProtected) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
