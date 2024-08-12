import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [AddTaskFormComponent, CommonModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  public dialogRef = inject(DialogRef); 
  startSlideOut: boolean = false;

  closeDialog(dialogOpen: boolean){
    if (!dialogOpen) {
      this.dialogRef.close();
    }
  }
}
