import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';

import { PatrimonioService } from '../../services/patrimonio.service';

@Component({
  selector: 'app-consultar-patrimonio',
  templateUrl: './consultar-patrimonio.page.html',
  styleUrls: ['./consultar-patrimonio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    // Ionic Components usados en el HTML:
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonIcon,
  ],
})
export class ConsultarPatrimonioPage {
  patrimonios: any[] = [];

  constructor(private patrimonioService: PatrimonioService) {}

  ngOnInit() {
    this.patrimonios = this.patrimonioService.getPatrimonios();
  }
}
