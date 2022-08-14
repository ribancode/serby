import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { generalConfig } from 'src/constant/general-config.constants';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categoriesForm: FormGroup;
    subCategoriesForm: FormGroup;
    categoriesList: any;
    subcategoriesList: any;

    constructor(
        private formbuilder: FormBuilder,
        private _generalService: GeneralService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private http: HttpClient
    ) {
        this.categoriesForm = this.formbuilder.group({
            categoryArray: this.formbuilder.array([], Validators.required)
        })
    }

    ngOnInit() {
        this.getCaegories();
    }

    getCaegories() {
        this.spinner.show()
        this._generalService.categories().subscribe(result => {
            if (result.status == 200) {
                this.categoriesList = result['data'];
                this.spinner.hide();
            } else {
                this.toastr.warning('', result.message);
                this.spinner.hide()
            }
        }, (error) => {
            this.spinner.hide()
            this.toastr.error('', 'Something went wrong');
        })
    }

    onCategoryChange(e) {
        const categoryArray: FormArray = this.categoriesForm.get('categoryArray') as FormArray;
        if (e.target.checked) {
            categoryArray.push(new FormControl(parseInt(e.target.value)));
        } else {
            let i: number = 0;
            categoryArray.controls.forEach((item: FormControl) => {
                if (item.value == e.target.value) {
                    categoryArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }

    submitCatgories() {
        if (this.categoriesForm.value) {
            this.spinner.show()
            this._generalService.subCategories({ data: this.categoriesForm.value.categoryArray }).subscribe(result => {
                if (result.status == 200) {
                    this.subcategoriesList = result.data;
                    localStorage.setItem("sub_categories_list", JSON.stringify(this.subcategoriesList));
                    this.router.navigateByUrl('CE/sub-categories');
                    this.spinner.hide()
                } else {
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                }
            }, (error) => {
                this.toastr.error('', 'Something went wrong');
                this.spinner.hide()
            })
        } else {
            this._generalService.ceMarkFormGroupTouched(this.categoriesForm);
        }
    }

}
