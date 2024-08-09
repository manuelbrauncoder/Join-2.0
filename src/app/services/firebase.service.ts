import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, DocumentChange, DocumentData, query, orderBy, onSnapshot, deleteDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);

  tasks: Task[] = [];

  constructor() { }

  /**
   * Task without id; id is generated in firebase
   * @param task 
   * @returns a clean json for saving in firebase
   */
  getCleanTaskJson(task: Task){
    return {
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
      assignedTo: task.assignedTo,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
      status: task.status
    }
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

  /**
   * add Task to firebase collection "tasks"
   * @param task 
   */
  async addTask(task: any){
    await addDoc(this.getCollectionRef('tasks'), this.getCleanTaskJson(task)).catch((err) => {
      console.log('Error adding Task to Firebase', err);
    })
  }

  async deleteData(id: string, collection: string){
    let docRef = doc(this.getCollectionRef(collection), id);
    await deleteDoc(docRef).catch((err) => {
      console.log('Error deleting Data', err);
      
    })
  }

  /**
   * log changes in firebase
   * call in onSnapshot
   * @param change 
   */
  logChanges(change: DocumentChange<DocumentData>) {
    if (change.type === 'added') {
      console.log('New Data ', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified Data: ', change.doc.data());
    }
    if (change.type === 'removed') {
      console.log('Removed Data: ', change.doc.data());
    }
  }

  /**
   * safe tasks from firebase in tasks
   * @returns a snapshot from tasks
   */
  getTaskList(){
    const q = query(this.getCollectionRef('tasks'), orderBy('title'));
    return onSnapshot(q, (list) => {
      this.tasks = [];
      list.forEach((element) => {
        const task = this.setTaskObject(element.data(), element.id);
        this.tasks.push(task);
      });
      list.docChanges().forEach((change) => {
        this.logChanges(change);
      })
    })
  }

  /**
   * 
   * @param obj task
   * @param taskId firebse document id
   * @returns a Task Object
   */
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
      status: obj.status || 'todo'
    }
  }
}
