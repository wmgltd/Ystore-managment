import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() regForm: FormGroup;

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {

  }
  signUp(){
    if (this.regForm.valid){
      const data = {
        ...this.regForm.value.detailsForm,
        ...this.regForm.value.storeForm,
        ...this.regForm.value.ownerDetailsForm
      };
      this.settingsService.signUp(data).subscribe((token: any) => {
        // TODO save token
        if (token){
          localStorage.setItem('token', token.token);
          this.router.navigate(['products'], { queryParamsHandling: 'preserve' });
        }
      });
    }
  }

}
