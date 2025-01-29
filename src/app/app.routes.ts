import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationErrorComponent } from './components/navigation-error/navigation-error.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    title: 'Products',
    loadChildren: () => import('./features/product/product.routes')
      .then(m => m.productRoutes)
  },
  {
    path: 'admin',
    title: 'Administration',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.adminRoutes),
    canActivate: [authGuard]
  },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'contact', title: 'Contact Us', component: ContactComponent },
  { path: '**', title: 'Error', component: NavigationErrorComponent }
];