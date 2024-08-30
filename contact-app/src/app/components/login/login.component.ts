import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: User = { username: '', password: '' };
  errorMessage: string = '';

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/contacts']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
