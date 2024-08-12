import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [AddTaskFormComponent],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  public dialogRef = inject(DialogRef); 

  closeDialog(dialogOpen: boolean){
    if (!dialogOpen) {
      this.dialogRef.close();
    }
  }
}
