import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PatrimonioService } from '../../services/patrimonio.service';
import { Patrimonio } from '../../models/patrimonio.model';

@Component({
  selector: 'app-detalle-patrimonio',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './detalle-patrimonio.page.html',
  styleUrls: ['./detalle-patrimonio.page.scss']
})
export class DetallePatrimonioPage implements OnInit {

  patrimonio!: Patrimonio;
  estrellas: number[] = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private patrimonioService: PatrimonioService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const lugar = this.patrimonioService.getById(id);

    if (lugar) {
      this.patrimonio = lugar;
    }
  }
}