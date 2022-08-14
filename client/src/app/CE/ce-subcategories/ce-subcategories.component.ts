import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GeneralService } from 'src/core/general.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCeProductComponent } from '../add-ce-product/add-ce-product.component';

@Component({
  selector: 'app-ce-subcategories',
  templateUrl: './ce-subcategories.component.html',
  styleUrls: ['./ce-subcategories.component.css']
})
export class CeSubcategoriesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'status', 'image', 'created_at', 'details'];
  dataSource : MatTableDataSource<any>;
  subCategoriesData :any;
  @ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;



  @Input() subCatItem : any;

  constructor(private generalService : GeneralService, public dialog: MatDialog, private matDialog: MatDialog) { }

  ngOnInit() {
    this.subCategories();
  }

  subCategories(){
    this.generalService.ceSubCategories(this.subCatItem.id).subscribe(res =>{
      this.subCategoriesData = res.data;
      this.dataSource = new MatTableDataSource([this.subCategoriesData[0]]);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource, this.paginator)
      console.log(this.dataSource.paginator)
  })
}

openSubCat(element : any){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = element;
  let dialogRef = this.dialog.open(AddCeProductComponent, dialogConfig);


  dialogRef.afterClosed().subscribe(value => {
    console.log(`Dialog sent: ${value}`); 
  });
  // console.log(element)
  // const dialogRef = this.dialog.open(AddCeProductComponent, {
  //   width: '250px',
  //   // data: {name: this.name, animal: this.animal}
  // });

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   // this.animal = result;
  // });
}


 

}
