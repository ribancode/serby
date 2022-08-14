import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { GeneralService } from 'src/core/general.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-ce-table',
  templateUrl: './ce-table.component.html',
  styleUrls: ['./ce-table.component.css']
})
export class CeTableComponent  implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'image', 'created_at', 'details'];
  dataSource : MatTableDataSource<any>;

  @Output() showSubCat : EventEmitter<any> = new EventEmitter();
  categoriesData : any;

  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  addCategories: boolean;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }


  constructor(private generalService : GeneralService, private router : Router){
    // const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(){
      this.categoryData();
  }

  ngAfterViewInit() {
    // debugger/
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource.paginator)
    // console.log(this.paginator)
    // this.dataSource.sort = this.sort;
  }

  openSubCat(item : any){
    console.log(item)
    this.showSubCat.emit(item);
  }

   categoryData(){
    this.generalService.ceCategories().subscribe(res =>{
      this.categoriesData = res.data;
      console.log(this.categoriesData)
      this.dataSource = new MatTableDataSource([this.categoriesData[0]]);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource, this.paginator)
      console.log(this.dataSource.paginator)
    })
  }

  createNewUser(id: number) {
  }

  addCategory(){
    this.addCategories = true;
  }

  addNewProduct(event){
    console.log('tes',event)
  }

}

