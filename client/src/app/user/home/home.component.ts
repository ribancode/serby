import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/core/general.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/app/_services/user.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	categoriesList: any[] = [];
	subCategoryItem : any[] =[];

	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 3
			},
			940: {
				items: 6
			}
		},
		nav: false
	}

	customOptions2: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 2
			},
			940: {
				items: 5
			}
		},
		nav: false
	}

	customOptionsClean: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 2
			},
			940: {
				items: 5
			}
		},
		nav: false
	}

	customOptionsCustomer: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		margin: 30,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 3
			},
			940: {
				items: 3
			}
		},
		nav: false
	}

	constructor(
		private _generalService: GeneralService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private router: Router,
	) {}

	ngOnInit() {
		this.getCaegories();
	}

	getCaegories() {
		this.spinner.show()
		this._generalService.getCategories().subscribe(result => {
			if (result.status == 200) {
				this.categoriesList = result['data'];
				this.spinner.hide();
			}
		}, (error) => {
			this.spinner.hide()
			this.toastr.error('', 'Something went wrong');
		})
	}

	categoryItem(event : any){
		this.router.navigateByUrl('sub-categories')
		localStorage.setItem('category-id', event.id)
	}
}
