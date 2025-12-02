import { Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  private STORAGE_KEY = 'patrimonios_data';

  private patrimonios: Patrimonio[] = [
    {
      id: 1,
      nombre: "Parque Principal",
      ubicacion: "Centro del pueblo",
      coordenadas: { lat: 6.5567, lng: -75.8289 },
      foto: "assets/images/parque.jpg",
      calificacion: 4,
      comentarios: [
        { id: 1, autor: "Daniel", estrellas: 5, texto: "Muy bonito.", fecha: "2025-01-11" },
        { id: 2, autor: "Laura", estrellas: 4, texto: "Limpio y agradable.", fecha: "2025-01-12" }
      ]
    },
    {
      id: 2,
      nombre: "Casa Museo Cultural",
      ubicacion: "Calle 10 #15",
      coordenadas: { lat: 4.6019, lng: -74.072 },
      foto: "assets/images/museo.jpg",
      calificacion: 5,
      comentarios: [
        { id: 1, autor: "Carlos", estrellas: 5, texto: "Excelente lugar.", fecha: "2025-01-10" }
      ]
    },
    {
      id: 3,
      nombre: "Mirador del Río",
      ubicacion: "Vía al río",
      coordenadas: { lat: 29.2144, lng: -13.4812 },
      foto: "assets/images/plaza.jpg",
      calificacion: 4,
      comentarios: []
    },
    {
      id: 4,
      nombre: "Iglesia Central",
      ubicacion: "Centro",
      coordenadas: { lat: 8.76, lng: -75.8855 },
      foto: "assets/images/catedral.jpg",
      calificacion: 4,
      comentarios: []
    },
    {
      id: 5,
      nombre: "Sendero Ecológico",
      ubicacion: "Salida al bosque",
      coordenadas: { lat: 4.3625, lng: -74.3027 },
      foto: "assets/images/parque.jpg",
      calificacion: 5,
      comentarios: []
    }
  ];

  constructor() {
    this.loadFromStorage();  // ← carga datos guardados si existen
  }

  // ============================
  // 🔹 Métodos principales
  // ============================

  getPatrimonios() {
    return this.patrimonios;
  }

  getById(id: number) {
    return this.patrimonios.find(p => p.id === id);
  }

  // ============================
  // 🔹 Gestión de comentarios
  // ============================

  addComentario(id: number, comentario: any) {
    const lugar = this.getById(id);
    if (lugar) {
      comentario.id = this.generateComentarioId(lugar);
      lugar.comentarios.push(comentario);
      this.saveToStorage();
    }
  }

  editarComentario(id: number, comentarioId: number, nuevoComentario: any) {
    const lugar = this.getById(id);
    if (lugar) {
      const idx = lugar.comentarios.findIndex(c => c.id === comentarioId);
      if (idx > -1) {
        nuevoComentario.id = comentarioId;
        lugar.comentarios[idx] = nuevoComentario;
        this.saveToStorage();
      }
    }
  }

  borrarComentario(id: number, comentarioId: number) {
    const lugar = this.getById(id);
    if (lugar) {
      lugar.comentarios = lugar.comentarios.filter(c => c.id !== comentarioId);
      this.saveToStorage();
    }
  }

  private generateComentarioId(lugar: Patrimonio) {
    if (lugar.comentarios.length === 0) return 1;
    return Math.max(...lugar.comentarios.map(c => c.id)) + 1;
  }

  // ============================
  // 🔹 Persistencia local
  // ============================

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.patrimonios));
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.patrimonios = JSON.parse(data);
    }
  }
}
