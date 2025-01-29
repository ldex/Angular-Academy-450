import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, LoadingIndicatorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}