import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @Input() regForm: FormGroup;
  imagePath: any;
  url: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {

  }

  onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: no-shadowed-variable
    reader.onload = (event: any) => {
        this.regForm.get('storeForm').patchValue({logo: event.target.result});
        this.url = reader.result;
    };
}
  onFormSubmit(){

  }

}
