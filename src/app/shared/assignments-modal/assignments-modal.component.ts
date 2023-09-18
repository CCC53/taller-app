import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AssignmentsModalData } from 'src/app/types/assignments';

@Component({
  selector: 'app-assignments-modal',
  templateUrl: './assignments-modal.component.html',
  styleUrls: ['./assignments-modal.component.scss']
})
export class AssignmentsModalComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  model: any;
  type: string;

  constructor(
    public dialogRef: MatDialogRef<AssignmentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentsModalData
  ) {
    this.fields = data.fields;
    this.type = data.type;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.model = this.form.value;
    this.dialogRef.close(this.model);
  }

}
