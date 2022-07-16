import { ProdutService } from './../../Services/produt.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {
  @Output() value:EventEmitter<string>= new EventEmitter();
  query:string='';
  valueSelect!:string;
  title:string='Category';
  @Input() category:string[]=[];
  @Output() selectCategory:EventEmitter<string>= new EventEmitter();
  constructor( private ProductService:ProdutService) { }

  ngOnInit(): void {
  }

  filterCategory(value:any){
    this.valueSelect = value;
    this.selectCategory.emit(value);
  }
  onChange(UpdatedValue : string) :void
  {
    this.value.emit(UpdatedValue);
  }



}
