import { Injectable } from '@angular/core';

// Nombre de la base de datos y la tabla
const DB_NAME = 'myapp-db';
const STORE_NAME = 'users';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db!: IDBDatabase;

  constructor() {}

  // Inicializa la DB
  async initDB(): Promise<void> {
    console.log('[IndexedDB] Inicializando base de datos...');

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[IndexedDB] Error al abrir DB', request.error);
        reject(request.error);
      };

      request.onupgradeneeded = () => {
        this.db = request.result;

        console.log('[IndexedDB] Ejecutando onupgradeneeded...');

        if (!this.db.objectStoreNames.contains(STORE_NAME)) {
          this.db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
        console.log('[IndexedDB] Object store creado:', STORE_NAME);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[IndexedDB] Base de datos lista.');
        resolve();
      };
    });
  }

  // Añadir usuario
  async addUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const user = { email, password };
      const request = store.add(user);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      const request = store.openCursor();

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          if (cursor.value.email === email) {
            resolve(cursor.value);
            return;
          }
          cursor.continue();
        } else {
          resolve(null);
        }
      };
    });
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<any[]> {
    return new Promise((resolve) => {
      const tx = this.db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
    });
  }
}