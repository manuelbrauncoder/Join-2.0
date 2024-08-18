import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  CdkDragPlaceholder,
  CdkDragPreview
} from '@angular/cdk/drag-drop';
import { BoardTaskCardComponent } from '../board-task-card/board-task-card.component';
import { UserService } from '../services/user.service';
import { BoardTaskCardEmptyComponent } from '../board-task-card-empty/board-task-card-empty.component';
import { FilterTasksPipe } from '../pipes/filter-tasks.pipe';
import { Task } from '../models/task.class';
import { FormsModule } from '@angular/forms';
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { BoardTaskDetailCardComponent } from "../board-task-detail-card/board-task-detail-card.component";

const overLayHidden = { transform: 'translate(120%, -50%)' };
const overlayVisible = { transform: 'translate(-50%, -50%)' };

const timing = '225ms ease-in';

@Component({
  selector: 'app-board',
  animations: [
    trigger('toggleOverlay', [
      transition(':enter', [style(overLayHidden), animate(timing, style(overlayVisible))]),
      transition(':leave', [style(overlayVisible), animate(timing, style(overLayHidden))]),
    ]),
  ],
  standalone: true,
  imports: [
    CdkDrag,
    CdkDragHandle,
    CdkDropListGroup,
    CdkDropList,
    BoardTaskCardComponent,
    BoardTaskCardEmptyComponent,
    FilterTasksPipe,
    CdkDragPlaceholder,
    CdkDragPreview,
    FormsModule,
    AddTaskFormComponent,
    BoardTaskDetailCardComponent
],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);
  showAddTaskOverlay: boolean = false;
  showDetailCard = false;
  searchInput: string = '';
  taskForDetail = new Task;

  toggleDetailCard(){
    this.showDetailCard = !this.showDetailCard;
  }

  openDetailCard(task: Task){
    this.taskForDetail = task;
    this.showDetailCard = true;
  }

  /**
   * hide add task overlay
   * @param event 
   */
  hideOverlay(event: boolean){
    this.showAddTaskOverlay = false;
  }

  /**
   * toggle add task overlay
   */
  toggleOverlay(){
    this.showAddTaskOverlay = !this.showAddTaskOverlay;
  }

  /**
   * filter tasks by searchInput
   * @returns all or searched
   */
  filteredTasks(): Task[] {
    if (!this.searchInput) {
      return this.taskService.fireService.tasks;
    }
    return this.taskService.fireService.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchInput)
    );
  }

  /**
   * Angular CdK Drag and Drop
   * change task status if droped in new container
   * @param event 
   * @param newStatus 
   */
  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.previousContainer.data[event.previousIndex];
      console.log('same container', task.status);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
      console.log('new status:', task.status);
      console.log('moved task:', task);
      this.taskService.fireService.updateTask(task);
    }
  }

  filterTasks(status: string) {
    let filteredTasks = this.taskService.fireService.tasks.filter(
      (task) => task.status === status
    );
    return filteredTasks;
  }
}
