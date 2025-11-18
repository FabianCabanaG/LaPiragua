import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registrar-patrimonio',
  templateUrl: './registrar-patrimonio.page.html',
  styleUrls: ['./registrar-patrimonio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistrarPatrimonioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
