import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  DocumentChange,
  DocumentData,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { SubTask, Task } from '../models/task.class';
import { LetterGroup, UserCl } from '../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore = inject(Firestore);
  tasks: Task[] = [];
  users: UserCl[] = [];
  letterUser: any = [];

  constructor() {
  }


  getLetterObjects() {
    this.letterUser = [];
    let letterMap = new Map<string, UserCl[]>();
    this.users.forEach((user) => {
      let firstLetter = user.name.charAt(0).toLowerCase();
      let usersList = letterMap.get(firstLetter);
      if (!usersList) {
        usersList = [];
        letterMap.set(firstLetter, usersList);
      }
      usersList.push(user);
    });
    this.letterUser = Array.from(
      letterMap,
      ([letter, users]) =>
        new LetterGroup({
          letter,
          users,
        })
    );
    this.letterUser.sort((a: LetterGroup, b: LetterGroup) =>
      a.letter.localeCompare(b.letter)
    );
  }

  createLetterUserObject(letter: string, user: UserCl) {
    return {
      firstLetter: letter,
      letterUsers: user,
    };
  }

  /**
   * Task without id; id is generated in firebase
   * @param task
   * @returns a clean json for saving in firebase
   */
  getCleanTaskJson(task: Task) {
    return {
      title: task.title,
      description: task.description,
      subtasks: task.subtasks.map((subtask) =>
        this.getCleanSubtaskJson(subtask)
      ),
      assignedTo: task.assignedTo,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
      status: task.status,
    };
  }

  getCleanSubtaskJson(subtask: any) {
    return {
      title: subtask.title,
      done: subtask.done,
    };
  }

  getCleanUserJson(user: UserCl) {
    return {
      name: user.name,
      uid: user.uid,
      email: user.email,
      password: user.password,
      phone: user.phone,
      color: user.color,
    };
  }

  /**
   *
   * @param collRef Reference of the firebase collection
   * "tasks" or "users"
   * @returns Collection Reference
   */
  getCollectionRef(collRef: string) {
    return collection(this.firestore, collRef);
  }

  /**
   *
   * @param collRef Reference of the firebase collection
   * @param docId document id
   * @returns Document Reference
   */
  getDocRef(collRef: string, docId: string) {
    return doc(this.getCollectionRef(collRef), docId);
  }

  async addTask(task: any) {
    await addDoc(
      this.getCollectionRef('tasks'),
      this.getCleanTaskJson(task)
    ).catch((err) => {
      console.log('Error adding Task to Firebase', err);
    });
  }

  async addUser(user: any) {
    await addDoc(
      this.getCollectionRef('users'),
      this.getCleanUserJson(user)
    ).catch((err) => {
      console.log('Error adding User to Firebase', err);
    });
  }

  async deleteData(id: string, collection: string) {
    let docRef = doc(this.getCollectionRef(collection), id);
    await deleteDoc(docRef).catch((err) => {
      console.log('Error deleting Data', err);
    });
  }

  async updateTask(task: Task) {
    let docRef = doc(this.getCollectionRef('tasks'), task.id);
    await updateDoc(docRef, this.getCleanTaskJson(task)).catch((err) => {
      console.log('Error updating Task', err);
    });
  }

  async updateUser(user: UserCl) {
    let docRef = doc(this.getCollectionRef('users'), user.id);
    await updateDoc(docRef, this.getCleanUserJson(user)).catch((err) => {
      console.log('Error updating User', err);
    });
  }

  logTaskChanges(change: DocumentChange<DocumentData>) {
    if (change.type === 'added') {
      //console.log('New Data ', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified Data: ', change.doc.data());
    }
    if (change.type === 'removed') {
      console.log('Removed Data: ', change.doc.data());
    }
  }

  logUserChanges(change: DocumentChange<DocumentData>) {
    if (change.type === 'added') {
      //console.log('New Data ', change.doc.data());
      this.getLetterObjects();
    }
    if (change.type === 'modified') {
      console.log('Modified Data: ', change.doc.data());
      this.getLetterObjects();
    }
    if (change.type === 'removed') {
      console.log('Removed Data: ', change.doc.data());
      this.getLetterObjects();
    }
  }

  getTasksList() {
    const q = query(this.getCollectionRef('tasks'), orderBy('title'));
    return onSnapshot(q, (list) => {
      this.tasks = [];
      list.forEach((element) => {
        const task = this.setTaskObject(element.data(), element.id);
        this.tasks.push(task);
      });
      list.docChanges().forEach((change) => {
        this.logTaskChanges(change);
      });
    });
  }

  getUsersList() {
    const q = query(this.getCollectionRef('users'), orderBy('name'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        const user = this.setUserObject(element.data(), element.id);
        this.users.push(user);
      });
      list.docChanges().forEach((change) => {
        this.logUserChanges(change);
      });
    });
  }

  setUserObject(obj: any, userId: string): UserCl {
    return {
      id: userId,
      uid: obj.uid || '',
      name: obj.name || '',
      email: obj.email || '',
      password: obj.password || '',
      phone: obj.phone || '',
      color: obj.color || '',
    };
  }

  setTaskObject(obj: any, taskId: string): Task {
    return {
      id: taskId || '',
      title: obj.title || '',
      description: obj.description || '',
      subtasks: obj.subtasks || [],
      assignedTo: obj.assignedTo || [],
      priority: obj.priority || 'medium',
      dueDate: obj.dueDate || 0,
      category: obj.category || 'Technical Task',
      status: obj.status || 'todo',
    };
  }
}
