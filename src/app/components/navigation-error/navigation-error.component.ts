import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-error',
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation-error.component.html'
})
export class NavigationErrorComponent {}