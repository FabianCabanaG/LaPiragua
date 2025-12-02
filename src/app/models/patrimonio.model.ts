export interface Patrimonio {
  id: number;
  nombre: string;
  ubicacion: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  foto: string;
  calificacion: number;
  comentarios: Comentario[];
}

export interface Comentario {
  id: number;
  autor: string;
  estrellas: number; // 1 a 5
  texto: string;
  fecha: string;
}
