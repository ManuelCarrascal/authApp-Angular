import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';
import { AuthService } from './auth/services/auth.service';
import { Component, computed, effect, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'authApp';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === 'checking') {
      return false;
    }
    return true;
  });

  authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
