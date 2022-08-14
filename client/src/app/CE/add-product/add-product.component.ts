import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedFile : File = null;
  addProductForm: FormGroup;

  @Output() addNewProduct : EventEmitter<any> = new EventEmitter();

  constructor( private formbuilder: FormBuilder,) { }

  ngOnInit() {
    this.addProductForm = this.formbuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            pimage: ['',Validators.required],
        });
  }

  addProduct(){
    this.addNewProduct.emit({addValue : true , value : this.addProductForm.value})
  }

  cancelProduct(){
    console.log('working')
    this.addNewProduct.emit({addValue: false, value : this.addProductForm.value})

  }
  submitProductData(){

  }

  onFileChange(event){
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files.length) {
        const file = (event.target.files[0] as File);
        this.addProductForm.get('pimage').setValue(file.name);
    }
}

}
