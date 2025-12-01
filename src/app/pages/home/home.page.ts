import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {


  constructor(private router: Router) {}

  ngOnInit() {
  }

  
  onRegistrar() {
    this.router.navigate(['/registrar-patrimonio']);
  }

  onConsultar() {
    this.router.navigate(['/consultar-patrimonio']);
  }

  onQr() {
    this.router.navigate(['/qr-scanner']);
  }


}
