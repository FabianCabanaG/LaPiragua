import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database';

import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    CommonModule,
  ]
})
export class DebugPage implements OnInit {

  users: any[] = [];

  constructor(private db: DatabaseService) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    console.log('[Debug] getAllUsers...');
    this.users = await this.db.getAllUsers();
  }
}
