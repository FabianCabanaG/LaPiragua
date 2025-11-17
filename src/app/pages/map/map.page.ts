import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import * as L from 'leaflet';


// Configurar iconos personalizados para evitar problema de rutas
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class MapPage implements AfterViewInit {

  private map!: L.Map;

  constructor() {}

  // Se ejecuta cuando el HTML ya existe → ideal para inicializar Leaflet
  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    // Inicializar mapa centrado en Bogotá (4.7110, -74.0721)
    this.map = L.map('map').setView([4.7110, -74.0721], 13);

    // Tiles de OpenStreetMap (gratis)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Solucionar bug de tamaño al cargar
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    // Marcador de prueba
    L.marker([4.7110, -74.0721]).addTo(this.map)
      .bindPopup('Ejemplo: Bogotá')
      .openPopup();
  }
}
