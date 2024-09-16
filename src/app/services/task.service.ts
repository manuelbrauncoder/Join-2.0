import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.class';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  fireService = inject(FirebaseService);

  showAddTaskOverlay = false; // add task window in board
  showDetailOverlay = false; // task detail view in board
  taskEditMode = false; // edit mode in task detail view in board

  taskStatus: 'todo' | 'progress' | 'feedback' | 'done' = 'todo';
  
  exampleTasks: Task[] = [
    {
      id: '',
      title: 'Develop Responsive Layout for Homepage',
      description:
        'Create a responsive layout for the homepage that adapts to various screen sizes.',
      subtasks: [
        { title: 'Design mobile wireframes', done: false },
        { title: 'Implement CSS media queries', done: false },
      ],
      assignedTo: ['Emily Davis', 'Matthew Taylor'],
      priority: 'medium',
      dueDate: 1726358400000, // 15. September 2024
      category: 'Technical Task',
      status: 'todo',
    },
    {
      id: '',
      title: 'Set Up User Authentication Module',
      description:
        'Implement user authentication with JWT and integrate it with the frontend.',
      subtasks: [
        { title: 'Set up backend endpoints', done: true },
        { title: 'Create login and registration pages', done: false },
      ],
      assignedTo: ['Michael Johnson'],
      priority: 'urgent',
      dueDate: 1728960000000, // 15. Oktober 2024
      category: 'Technical Task',
      status: 'progress',
    },
    {
      id: '',
      title: 'Write User Documentation',
      description:
        'Prepare comprehensive user documentation for the new features.',
      subtasks: [
        { title: 'Outline documentation structure', done: true },
        { title: 'Write content for each section', done: false },
      ],
      assignedTo: ['Daniel Thomas'],
      priority: 'low',
      dueDate: 1730438400000, // 1. November 2024
      category: 'User Story',
      status: 'todo',
    },
    {
      id: '',
      title: 'Integrate Payment Gateway',
      description:
        'Add a new payment gateway to support additional payment options.',
      subtasks: [
        { title: 'Research payment gateway providers', done: true },
        { title: 'Implement API integration', done: false },
      ],
      assignedTo: ['John Smith', 'Amanda Wilson'],
      priority: 'urgent',
      dueDate: 1731657600000, // 15. November 2024
      category: 'Technical Task',
      status: 'todo',
    },
    {
      id: '',
      title: 'Optimize Database Queries',
      description:
        'Improve database performance by optimizing slow-running queries.',
      subtasks: [
        { title: 'Identify slow queries', done: true },
        { title: 'Rewrite queries for optimization', done: false },
      ],
      assignedTo: ['Jane Doe'],
      priority: 'medium',
      dueDate: 1727740800000, // 1. Oktober 2024
      category: 'Technical Task',
      status: 'progress',
    },
    {
      id: '',
      title: 'Conduct Usability Testing',
      description:
        'Perform usability testing with target users and collect feedback.',
      subtasks: [
        { title: 'Prepare test scenarios', done: true },
        { title: 'Conduct testing sessions', done: false },
      ],
      assignedTo: ['Christopher Brown'],
      priority: 'low',
      dueDate: 1733040000000, // 1. Dezember 2024
      category: 'User Story',
      status: 'todo',
    },
    {
      id: '',
      title: 'Design New Marketing Landing Page',
      description:
        'Create a new landing page to improve lead generation and user engagement.',
      subtasks: [
        { title: 'Draft initial design mockups', done: true },
        { title: 'Implement design in HTML/CSS', done: false },
      ],
      assignedTo: ['Olivia Anderson', 'Sophia Martinez'],
      priority: 'medium',
      dueDate: 1734259200000, // 15. Dezember 2024
      category: 'User Story',
      status: 'todo',
    }
  ];

  constructor() {}

  setTaskStatus(status: 'todo' | 'progress' | 'feedback' | 'done') {
    this.taskStatus = status;
  }

  /**
   * save Example tasks in firebase collection
   */
  async addLocalTasksToFirebase() {
    for (let i = 0; i < this.exampleTasks.length; i++) {
      const task = this.exampleTasks[i];
      await this.fireService.addTask(task);
    }
  }

  /**
   * delete all tasks in firebase collection
   */
  async deleteAllTasks() {
    while (this.fireService.tasks.length > 0) {
      const id = this.fireService.tasks[0].id;
      await this.fireService.deleteData(id, 'tasks');
    }
  }

  /**
   *
   * @param assignedToUser
   * @returns the color in user.color or a default color
   */
  getColorForUser(assignedToUser: string) {
    const user = this.fireService.users.find(
      (user) => user.name.toLowerCase() === assignedToUser.toLowerCase()
    );
    return user ? user.color : '#29abe2';
  }

  /**
   *
   * @param prio
   * @returns the img source for the priority
   */
  getPrioIcon(prio: string) {
    switch (prio) {
      case 'low':
        return 'assets/img/prio-low.png';
      case 'medium':
        return 'assets/img/prio-medium.png';
      case 'urgent':
        return 'assets/img/prio-urgent.png';
      default:
        return 'assets/img/prio-medium.png';
    }
  }

  /**
   * search deleted User in Tasks
   * --> Delete User in Task
   * @param name
   */
  async deleteUserInTask(name: string) {
    for (let i = 0; i < this.fireService.tasks.length; i++) {
      const task = this.fireService.tasks[i];
      for (let k = 0; k < task.assignedTo.length; k++) {
        const assignedUsers = task.assignedTo[k];
        if (name.toLowerCase() === assignedUsers.toLowerCase()) {
          this.fireService.tasks[i].assignedTo.splice(k, 1);
          await this.fireService.updateTask(task);
        }
      }
    }
  }

  /**
   * search oldName in tasks
   * replace with newName
   * @param oldName
   * @param newName
   */
  async updateUserInTask(oldName: string, newName: string) {
    for (let i = 0; i < this.fireService.tasks.length; i++) {
      const task = this.fireService.tasks[i];
      for (let k = 0; k < task.assignedTo.length; k++) {
        const assignedToUser = task.assignedTo[k];
        if (oldName.toLowerCase() === assignedToUser.toLowerCase()) {
          this.fireService.tasks[i].assignedTo.splice(k, 1, newName);
          await this.fireService.updateTask(task);
        }
      }
    }
  }
}
