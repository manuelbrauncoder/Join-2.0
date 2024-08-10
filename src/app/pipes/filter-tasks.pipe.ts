import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.class';

@Pipe({
  name: 'filterTasks',
  standalone: true
})
export class FilterTasksPipe implements PipeTransform {

  transform(tasks: Task[], filter: string): Task[] {
    return tasks.filter(task => task.status === filter);
  }

}
