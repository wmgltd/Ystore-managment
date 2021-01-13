import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CroperComponent } from 'src/app/components/croper/croper.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private productsService: ProductsService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {
    this.productsForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      img: new FormControl(''),
      fileSource: new FormControl(''),
      description: [null, Validators.required],
      catalog_number: new FormControl(null),
      category_id: new FormControl(null, [Validators.required]),
      price: [null, Validators.required],
      sale_price: [null],
      stock_units: [null, Validators.required],

    });
  }

  productsForm: FormGroup;
  statusList = [{ value: 0, text: 'לא פעיל' }, { value: 1, text: 'פעיל' }];
  isLoadingResults = false;
  categories: Category[];

  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id: number;
  imgUrl = environment.imgUrl;
  urls = [];
  cropedFile: any = '';
  imageChangedEvent: any = '';
  urlsAndEvent: urlsAndEvent[] = [];
  ngOnInit(): void {
    this.getCategories();

    this.id = this.data.id;
    this.getProductById(this.id);
  }
  getProductById(id: any) {
    this.productsService.get(id).subscribe((product: Product) => {
      this.urls = product.files.map(f => {
        return {
          id: f.id,
          path: f.path,
          is_removed: false
        };
      });
      this.urlsAndEvent = product.files.map(f => { return { url: f.path, event: '' } });
      this.productsForm.patchValue({
        fileSource: this.urls
      });
      this.productsForm.setValue({
        id: product.id,
        name: product.name,
        img: '',
        fileSource: '',
        description: product.description,
        price: product.price,
        catalog_number: product.catalog_number,
        category_id: product.category_id,
        sale_price: product.sale_price,
        stock_units: product.stock_units,
      });
    });
  }
  getCategories() {
    this.categoryService.getList()
      .subscribe((res: Category[]) => {
        this.categories = res;
      }, err => {
        console.error(err);
      });
  }
  onFormSubmit() {
    this.productsService.edit(this.productsForm.value)
      .subscribe((product: Product) => {
        this.dialogRef.close();

      }, (err: any) => {
        console.log(err);
        this.dialogRef.close();
      }
      );
  }
  onSelectFile(event) {
    this.imageChangedEvent = event;
    var urlandevent = new urlsAndEvent();
    urlandevent.event = event;
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        // tslint:disable-next-line: no-shadowed-variable
        reader.onload = (eve: any) => {
          this.urls.push({
            id: null,
            path: eve.target.result,
            is_removed: false
          });
          this.productsForm.patchValue({
            fileSource: this.urls
          });
          urlandevent.url = eve.target.result;
          urlandevent.event = event.target.files[i];
          this.urlsAndEvent.push(urlandevent);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage(index) {
    if (index > -1) {
      if (this.urls[index].id) {
        this.urls[index].is_removed = true;
      }
      else { this.urls.splice(index, 1); }
      this.productsForm.patchValue({
        fileSource: this.urls
      });
    }
  }
  hasImage() {
    return this.urls.find(x => x.is_removed === false);
  }
  openDeleteConfirmModal() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { canDeleted: true }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteProduct();
      }
    });
  }
  deleteProduct() {
    this.productsService.delete(this.data.id)
      .subscribe(res => {
        this.dialogRef.close();

      }, (err) => {
        this.dialogRef.close();

      }
      );
  }
  editImage(url): void {
    const urlAndEvent = this.urlsAndEvent.find((x) => x.url == url.path);
    if (!urlAndEvent.event) {
      this.toDataURL(this.imgUrl + urlAndEvent.url, function (dataUrl) {
      })
      getBase64ImageFromUrl(this.imgUrl + urlAndEvent.url)
        .then((result) => {
          urlAndEvent.event = result;
          const dialogRef = this.dialog.open(CroperComponent, {
            width: '75%',
            minWidth: '650px',
            data: { image: urlAndEvent.event }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const index = this.urls.indexOf(url);
              if (index > -1) {
                this.urls.splice(index, 1);
                this.urls.push(result);
                this.urlsAndEvent.forEach(element => {
                  element.url == url ? element.url = result : element.url;
                });
                this.productsForm.patchValue({
                  fileSource: this.urls
                });
              }
            }

          });
        })
        .catch(err => console.error(err));
    }
    else {
      const dialogRef = this.dialog.open(CroperComponent, {
        width: '75%',
        minWidth: '650px',
        data: { image: urlAndEvent.event ? urlAndEvent.event : this.imgUrl + urlAndEvent.url, aspectRatio: 3.9 / 2, toHeight: 200, toWidth: 390 }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          var thisurl = this.urls.find((x) => x.path == url.path);
          const index = this.urls.indexOf(thisurl);
          if (index > -1) {
            if (this.urls[index].id) {
              this.urls[index].is_removed = true;
            }
            else { this.urls.splice(index, 1); }
            this.urls.push({
              id: null,
              path: result,
              is_removed: false
            });
            this.urlsAndEvent.forEach(element => {
              console.log(element.url);
              console.log(url);
              console.log(result);
              if (element.url == url.path) {
                element.url = result;
              }
            });
            this.productsForm.patchValue({
              fileSource: this.urls
            });
          }
        }

      });
    }

  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
export class urlsAndEvent {
  url: any;
  event: any;
}
async function getBase64ImageFromUrl(imageUrl) {
  var res = await fetch(imageUrl);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  })
}