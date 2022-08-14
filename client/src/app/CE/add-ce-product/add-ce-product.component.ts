import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ce-product',
  templateUrl: './add-ce-product.component.html',
  styleUrls: ['./add-ce-product.component.css']
})
export class AddCeProductComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddCeProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

 title  :string;
 description : string;

  ngOnInit() {
    console.log(this.data, this.title)
  }

  close() {
    this.dialogRef.close();
  }

}
