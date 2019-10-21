import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from './../../../../shared/common/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StringsService } from 'src/app/shared/services/strings.service';


@Component({
  selector: 'app-form-edit-dialog',
  templateUrl: './form-edit-dialog.component.html',
  styleUrls: ['./form-edit-dialog.component.css']
})
export class FormEditDialogComponent implements OnInit {

  constructor(
    public str: StringsService,
    public dialogRef: MatDialogRef<FormEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
