import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-indicator',
  imports: [CommonModule],
  template: `
    @if (loadingService.getLoading() | async) {
      <div class="fixed top-0 left-0 right-0 z-50">
        <div class="h-1 bg-blue-100 overflow-hidden">
          <div class="w-full h-full bg-blue-600 origin-left animate-loading-bar"></div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes loading-bar {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }
    .animate-loading-bar {
      animation: loading-bar 1.5s ease-in-out infinite;
    }
  `]
})
export class LoadingIndicatorComponent {
  loadingService = inject(LoadingService);
}