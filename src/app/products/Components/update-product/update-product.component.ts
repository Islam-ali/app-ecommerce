import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutService } from '../../Services/produt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  allCategories:string[]=[];
  // selectedValue: string | undefined;
  URL: any;
  updateForm!:FormGroup;
  product:any; 
  constructor(private _ProdutService:ProdutService,private _FormBuilder:FormBuilder,private toastr: ToastrService) {
    this.updateForm = this._FormBuilder.group({
      title: ['',Validators.required],
      price: ['',Validators.required],
      description: ['',Validators.required],
      image: ['',Validators.required],
      category: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.contentProduct();
    this.categories();
  }
  categories(){
    this._ProdutService.getCategories().subscribe((res:any)=>{
      this.allCategories = res;
    })
  }
  useImage(event:any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Read file as data url
      reader.onloadend = () => { // function call once readAsDataUrl is completed
        this.URL = reader.result; // Set image in element
        this.updateForm.get('image')?.setValue(this.URL)
      };
    }
  }
  contentProduct(){
    let product = this._ProdutService.productItem.value
    this.updateForm.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    })
    this.URL = product.image
  }
  get f()
  {
    return this.updateForm?.controls;
  }
  updateProduct(productItem:FormGroup){
    let id = this._ProdutService.productItem.value.id
    this._ProdutService.updateProduct(id,productItem.value).subscribe({
      next:(res:any)=>{
        this.toastr.success('This is a success update', 'Success')
      },
      error:(err:any)=>{
        this.toastr.error(err.message, 'Error')
      }
    })
  }
}
