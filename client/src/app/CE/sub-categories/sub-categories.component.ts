import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

    categoriesForm: FormGroup;
    subCategoriesForm: FormGroup;
    subCaegoriesList: any[] = [];

    constructor(
        private formbuilder: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private _generalService: GeneralService,
        private http: HttpClient
    ) { 
        this.subCategoriesForm = this.formbuilder.group({
            subCategoryArray: this.formbuilder.array([], Validators.required)
        })
    }

    ngOnInit() {
        this.subCategories();
    }

    subCategories() {
        if(JSON.parse(localStorage.getItem("sub_categories_list"))){
            this.subCaegoriesList.push(JSON.parse(localStorage.getItem('sub_categories_list')));
            localStorage.removeItem('sub_categories_list')
        } else{
            this.router.navigateByUrl('CE/categories');
        }
    }

    onSubCategoryChange(e) {
        const subCategoryArray: FormArray = this.subCategoriesForm.get('subCategoryArray') as FormArray;

        if (e.target.checked) {
            subCategoryArray.push(new FormControl({ id: parseInt(e.target.value), category_id: parseInt(e.target.getAttribute('data-category-id')) } ));
        } else {
            let i: number = 0;
            subCategoryArray.controls.forEach((item: FormControl) => {
                if (item.value.id == e.target.value) {
                    subCategoryArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }

    submitSubCategories() {
        if (this.subCategoriesForm.value) {
            this.spinner.show()
            console.log(localStorage.getItem('user_phone'));
            this._generalService.submitCategories({ phone: localStorage.getItem('user_phone'), data: this.subCategoriesForm.value.subCategoryArray }).subscribe(result => {
                if (result.status == 200) {
                    this.toastr.success('', result.message);
                    this.spinner.hide();
                    this.router.navigateByUrl('CE/approve')
                } else {
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                }
            }, (error) => {
                this.spinner.hide()
                this.toastr.error('', 'Something went wrong');
            })
        } else {
            this._generalService.ceMarkFormGroupTouched(this.subCategoriesForm);
        }
    }

}
