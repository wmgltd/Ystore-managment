import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  removedItems: any[] = [];
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, public dialog: MatDialog) {

    this.categoriesForm = this.formBuilder.group({
      categories: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getList()
      .subscribe((res: Category[]) => {
        this.categories.clear();
        res.forEach((category) => {
          this.categories.push(this.formBuilder.group({
            id: [category.id],
            value: [category.value, Validators.required]
          }));
        }, err => {
          console.error(err);
        });

      });
  }


  onFormSubmit() {
    if (this.categoriesForm.valid) {
      this.categoryService.editCategories({ categories: this.categories.value, removed_items: this.removedItems })
        .subscribe((data: any) => {


          this.getCategories();
        }, (err: any) => {
          console.log(err);

        }
        );
    }
  }
  get categories() {
    return this.categoriesForm.get('categories') as FormArray;
  }
  addItem() {
    this.categories.push(this.formBuilder.group({
      id: [null],
      value: [null, Validators.required]
    }));
  }
  openDeleteConfirmModal(index: number) {
    if (this.categories.at(index).get('id').value) {
      console.log(this.categories.at(index).get('id').value);
      this.categoryService.validateDeleteCategory(this.categories.at(index).get('id').value).subscribe((res) => {
        console.log(res);
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
          width: '400px',
          data: { canDeleted: res }
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.removedItems.push(this.categories.at(index).get('id').value);
            this.removeItem(index);
            this.onFormSubmit();

          }
        });
      });
    }
    else {
      this.removeItem(index);
    }
  }
  removeItem(index: number) {
    console.log("aaaa");
    this.categories.removeAt(index);
  }


}
