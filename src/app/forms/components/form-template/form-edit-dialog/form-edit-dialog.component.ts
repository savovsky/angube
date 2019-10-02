import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-form-edit-dialog',
  templateUrl: './form-edit-dialog.component.html',
  styleUrls: ['./form-edit-dialog.component.css']
})
export class FormEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
