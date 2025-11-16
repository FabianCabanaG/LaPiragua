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
  selector: 'app-register',
  templateUrl: './register.page.html',
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
export class RegisterPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

async register() {
  console.log('Iniciando registro...');

  console.log('Email ingresado:', this.email);
  console.log('Password ingresado:', this.password);

  try {
    console.log('Llamando a AuthService.register()...');
    const result = await this.auth.register(this.email, this.password);

    console.log('Resultado de AuthService.register():', result);

    if (!result) {
      console.error('Error: AuthService retornó null o undefined.');
      this.errorMessage = 'Error inesperado. Revisa la consola.';
      return;
    }

    if (result.error) {
      console.error('Error desde AuthService:', result.message);
      this.errorMessage = 'No se pudo crear la cuenta: ' + result.message;
      return;
    }

    console.log('Registro exitoso. Redirigiendo al login...');
    this.router.navigate(['/login']);

  } catch (err: any) {
    console.error('Excepción atrapada en register():', err);
    this.errorMessage = 'Error inesperado: ' + err.message;
  }
}
}