import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string='';
  password: string='';
  errorMessage: string='';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/dashboard']); // Redirect to dashboard after login
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error => {
        this.errorMessage = 'Error during login';
      }
    );
  }
}
