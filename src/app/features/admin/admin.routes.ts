import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from '../../guards/auth.guard';

export const adminRoutes: Routes = [
  { 
    path: '', 
    component: AdminDashboardComponent,
    canActivate: [authGuard]
  }
];