import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/core/general.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  subCategoryItem : any[]= [];
  itemId: string;

  constructor(
    private _generalService: GeneralService,
		// private spinner: NgxSpinnerService,
		// private toastr: ToastrService,
		private router: Router,
  ) { }

  ngOnInit() {
    this.itemId = localStorage.getItem('category-id')
    console.log(this.itemId)
    this.categoryItem(this.itemId);
  }

  categoryItem(event : any){
		this.router.navigateByUrl('sub-categories')
		this._generalService.getSubCategories(event).subscribe(result => {

			this.subCategoryItem.push(result.data)
			console.log(this.subCategoryItem)
		})
	}

}
