import { inject, Injectable } from '@angular/core';
import { UserCl } from '../models/user.class';
import { FirebaseService } from './firebase.service';
import { UiService } from './ui.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fireService = inject(FirebaseService);
  uiService = inject(UiService);
  users: UserCl[] = [];
  authService = inject(FirebaseAuthService);

  colors: string[] = [
    '#FF7A00',
    '#9327FF',
    '#6E52FF',
    '#FC71FF',
    '#FFBB2B',
    '#1FD7C1',
    '#462F8A',
    '#FF4646',
    '#00BEE8',
  ];

  exampleUsers: UserCl[] = [
    {
      "id": "",
      "uid": "",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "password": "SecurePass123!",
      "phone": "+1-555-123-4560",
      "color": "#6A5ACD"
    },
    {
      "id": "",
      "uid": "",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "password": "JaneDoe!2021",
      "phone": "+1-555-123-4561",
      "color": "#2E8B57"
    },
    {
      "id": "",
      "uid": "",
      "name": "Michael Johnson",
      "email": "michael.johnson@example.com",
      "password": "Mjohnson@99",
      "phone": "+1-555-123-4562",
      "color": "#4682B4"
    },
    {
      "id": "",
      "uid": "",
      "name": "Emily Davis",
      "email": "emily.davis@example.com",
      "password": "EmiDavis#2022",
      "phone": "+1-555-123-4563",
      "color": "#CD853F"
    },
    {
      "id": "",
      "uid": "",
      "name": "Christopher Brown",
      "email": "chris.brown@example.com",
      "password": "ChrisB_77",
      "phone": "+1-555-123-4564",
      "color": "#8FBC8F"
    },
    {
      "id": "",
      "uid": "",
      "name": "Amanda Wilson",
      "email": "amanda.wilson@example.com",
      "password": "AmandaW*321",
      "phone": "+1-555-123-4565",
      "color": "#B0C4DE"
    },
    {
      "id": "",
      "uid": "",
      "name": "Matthew Taylor",
      "email": "matthew.taylor@example.com",
      "password": "MattT!567",
      "phone": "+1-555-123-4566",
      "color": "#556B2F"
    },
    {
      "id": "",
      "uid": "",
      "name": "Olivia Anderson",
      "email": "olivia.anderson@example.com",
      "password": "OliviaA$890",
      "phone": "+1-555-123-4567",
      "color": "#DAA520"
    },
    {
      "id": "",
      "uid": "",
      "name": "Daniel Thomas",
      "email": "daniel.thomas@example.com",
      "password": "DanThomas#001",
      "phone": "+1-555-123-4568",
      "color": "#8B4513"
    },
    {
      "id": "",
      "uid": "",
      "name": "Sophia Martinez",
      "email": "sophia.martinez@example.com",
      "password": "SophiaM!234",
      "phone": "+1-555-123-4569",
      "color": "#A0522D"
    }
  ];

  constructor() {}

  isUserAccount(user: UserCl){
    return user.uid !== '';
  }

  async addLocalUsersToFirebase() {
    for (let i = 0; i < this.exampleUsers.length; i++) {
      const user = this.exampleUsers[i];
        await this.fireService.addUser(user);
    }
  }

  async deleteAllUsers() {
    while (this.fireService.users.length > 0) {
      const id = this.fireService.users[0].id;
      await this.fireService.deleteData(id, 'users');
    }
  }

  getRandomColor(){
    return this.colors[Math.floor(Math.random()*this.colors.length)];
  }
}
