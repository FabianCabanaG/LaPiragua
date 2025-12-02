import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // 👈 Importar ActivatedRoute
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import * as L from 'leaflet';

// Configurar iconos personalizados
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
export class MapPage implements OnInit, AfterViewInit { // 👈 Cambiar AfterViewInit por OnInit

  private map!: L.Map;
  
  // Variables para almacenar las coordenadas recibidas
  patrimonioLat: number | undefined;
  patrimonioLng: number | undefined;
  patrimonioNombre: string | undefined;

  // 👈 Inyectar ActivatedRoute para leer los parámetros de la URL
  constructor(private route: ActivatedRoute) {}

  // 1. Leer los parámetros de la URL tan pronto como se inicializa el componente
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Convertir a número y asignar
      this.patrimonioLat = Number(params['lat']);
      this.patrimonioLng = Number(params['lng']);
      this.patrimonioNombre = params['nombre'];
      
      // Si ya tenemos el mapa inicializado, podemos agregar el marcador inmediatamente
      // Si no, la lógica de initMap (en ngAfterViewInit) lo hará.
    });
  }

  // 2. Se ejecuta cuando el HTML ya existe → ideal para inicializar Leaflet
  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    // 🛑 COORDENADAS DE CENTRADO 🛑
    // Usar las coordenadas recibidas si existen. Si no, usar la ubicación por defecto (Bogotá).
    const centerLat = this.patrimonioLat && !isNaN(this.patrimonioLat) ? this.patrimonioLat : 4.7110;
    const centerLng = this.patrimonioLng && !isNaN(this.patrimonioLng) ? this.patrimonioLng : -74.0721;
    const zoomLevel = this.patrimonioLat ? 16 : 13; // Más zoom si es un punto específico

    // 1. Inicializar mapa
    if (this.map) {
      this.map.remove(); // Evitar duplicación si se llama dos veces
    }
    this.map = L.map('map').setView([centerLat, centerLng], zoomLevel);

    // 2. Tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // 3. Añadir el marcador del patrimonio (si existe)
    if (this.patrimonioLat && this.patrimonioLng && this.patrimonioNombre) {
      L.marker([this.patrimonioLat, this.patrimonioLng]).addTo(this.map)
        .bindPopup(`<b>${this.patrimonioNombre}</b>`)
        .openPopup();
    } else {
      // Marcador de prueba si no se pasaron coordenadas
      L.marker([centerLat, centerLng]).addTo(this.map)
        .bindPopup('Centro por Defecto')
        .openPopup();
    }
    
    // 4. Solucionar bug de tamaño al cargar (esencial en Ionic)
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }
}