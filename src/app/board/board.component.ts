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

@Component({
  selector: 'app-board',
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
    CdkDragPreview
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  taskService = inject(TaskService);
  userService = inject(UserService);

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
