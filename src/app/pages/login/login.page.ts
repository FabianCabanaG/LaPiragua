import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    FormsModule // ✔ NECESARIO PARA ngModel
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    const user = await this.auth.login(this.email, this.password);

    if (!user) {
      this.errorMessage = 'Credenciales incorrectas';
      return;
    }

    this.router.navigate(['/home']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}