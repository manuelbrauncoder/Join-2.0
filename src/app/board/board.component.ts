import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, CdkDropListGroup, CdkDropList],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  taskService = inject(TaskService);

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const task = event.previousContainer.data[event.previousIndex];
      console.log('same container', task.status);
      
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
      console.log('new status:', task.status);
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  filterTasks(status: string){
    let filteredTasks = this.taskService.fireService.tasks.filter((task) => task.status === status);
    return filteredTasks;
  }
}
