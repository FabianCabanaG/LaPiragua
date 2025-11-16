import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private dbService: DatabaseService
  ) {
    this.initializeApp();
  }

async initializeApp() {
  console.log('[AppComponent] Plataforma lista, inicializando BD...');
  await this.platform.ready();
  
  try {
    await this.dbService.initDB();
    console.log('[AppComponent] BD inicializada exitosamente.');
  } catch (error) {
    console.error('[AppComponent] ERROR al iniciar la BD:', error);
  }
}
}