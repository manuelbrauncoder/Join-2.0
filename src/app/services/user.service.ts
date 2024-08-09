import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fireService = inject(FirebaseService);
  users: User[] = [];
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

  exampleUsers: User[] = [
    {
      "id": '',
      "name": "Elon Musk",
      "email": "elon.musk@tech.com",
      "password": "SpaceX123!",
      "phone": "+1-310-420-0000",
      "color": "#FF7A00"
    },
    {
      "id": '',
      "name": "Bill Gates",
      "email": "bill.gates@tech.com",
      "password": "Microsoft@98",
      "phone": "+1-425-703-0000",
      "color": "#9327FF"
    },
    {
      "id": '',
      "name": "Jeff Bezos",
      "email": "jeff.bezos@tech.com",
      "password": "Amazon#2024",
      "phone": "+1-206-266-0000",
      "color": "#6E52FF"
    },
    {
      "id": '',
      "name": "Tim Cook",
      "email": "tim.cook@tech.com",
      "password": "Apple123!",
      "phone": "+1-408-996-0000",
      "color": "#FC71FF"
    },
    {
      "id": '',
      "name": "Mark Zuckerberg",
      "email": "mark.zuckerberg@tech.com",
      "password": "Meta@2024",
      "phone": "+1-650-543-0000",
      "color": "#FFBB2B"
    },
    {
      "id": '',
      "name": "Sundar Pichai",
      "email": "sundar.pichai@tech.com",
      "password": "Google#2024",
      "phone": "+1-650-253-0000",
      "color": "#1FD7C1"
    },
    {
      "id": '',
      "name": "Satya Nadella",
      "email": "satya.nadella@tech.com",
      "password": "Azure@2024",
      "phone": "+1-425-882-0000",
      "color": "#462F8A"
    },
    {
      "id": '',
      "name": "Sheryl Sandberg",
      "email": "sheryl.sandberg@tech.com",
      "password": "Facebook2024!",
      "phone": "+1-650-543-0001",
      "color": "#FF4646"
    },
    {
      "id": '',
      "name": "Larry Page",
      "email": "larry.page@tech.com",
      "password": "Alphabet#01",
      "phone": "+1-650-253-0001",
      "color": "#00BEE8"
    },
    {
      "id": '',
      "name": "Sergey Brin",
      "email": "sergey.brin@tech.com",
      "password": "GoogleX@24",
      "phone": "+1-650-253-0002",
      "color": "#FF7A00"
    },
    {
      "id": '',
      "name": "Jack Dorsey",
      "email": "jack.dorsey@tech.com",
      "password": "Twitter2024#",
      "phone": "+1-415-222-0000",
      "color": "#9327FF"
    },
    {
      "id": '',
      "name": "Susan Wojcicki",
      "email": "susan.wojcicki@tech.com",
      "password": "YouTube@24",
      "phone": "+1-650-253-0003",
      "color": "#6E52FF"
    },
    {
      "id": '',
      "name": "Reed Hastings",
      "email": "reed.hastings@tech.com",
      "password": "Netflix2024!",
      "phone": "+1-408-540-0000",
      "color": "#FC71FF"
    },
    {
      "id": '',
      "name": "Marissa Mayer",
      "email": "marissa.mayer@tech.com",
      "password": "Yahoo@24!",
      "phone": "+1-408-349-0000",
      "color": "#FFBB2B"
    },
    {
      "id": '',
      "name": "Steve Jobs",
      "email": "steve.jobs@tech.com",
      "password": "Apple1984!",
      "phone": "+1-408-996-0001",
      "color": "#1FD7C1"
    }
  ];

  constructor() {}

  async addLocalUsersToFirebase() {
    for (let i = 0; i < this.exampleUsers.length; i++) {
      const user = this.exampleUsers[i];
        await this.fireService.addUser(user);
    }
  }
}
