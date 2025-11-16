import { Injectable } from '@angular/core';
import { DatabaseService } from './database';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: DatabaseService) {}

  async register(email: string, password: string): Promise<any> {
    try {
      const existing = await this.db.getUserByEmail(email);
      if (existing) {
        return { error: true, message: 'Email ya existe' };
      }

      const hash = bcrypt.hashSync(password, 10);
      const id = await this.db.addUser(email, hash);

      return { id };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  }

  async login(email: string, password: string): Promise<any | null> {
    const user = await this.db.getUserByEmail(email);

    if (!user) return null;

    const valid = bcrypt.compareSync(password, user.password);
    return valid ? user : null;
  }
}