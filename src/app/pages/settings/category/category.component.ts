import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoriesForm: FormGroup;
  removedItems:any[]=[];
  matcher = new MyErrorStateMatcher();
  
  constructor(private formBuilder: FormBuilder,private categoryService :CategoryService) {

    this.categoriesForm = this.formBuilder.group({
      categories : this.formBuilder.array([]) 
    });
   }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getList()
    .subscribe((res: Category[]) => {
      this.categories.clear();
     res.forEach((category)=>{
        this.categories.push(this.formBuilder.group({
          id:[category.id],
          value:[category.value, Validators.required]
        }));
    }, err => {
      console.error(err);
    });
  
});
}


  onFormSubmit() {
    
    this.categoryService.editCategories({categories:this.categories.value,removed_items:this.removedItems})
      .subscribe((data: any) => {
          

          this.getCategories();
        }, (err: any) => {
          console.log(err);
         
        }
      );
  }
  get categories() {
    return this.categoriesForm.get('categories') as FormArray;
  }
  addItem(){
    this.categories.push(this.formBuilder.group({
      id:[null],
      value:[null, Validators.required]
    }));
  }
  removeItem(index:number){
    if(this.categories.at(index).get('id').value)
        this.removedItems.push(this.categories.at(index).get('id').value);
    this.categories.removeAt(index);

  }


}
