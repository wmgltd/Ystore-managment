import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-acquaintance',
  templateUrl: './acquaintance.component.html',
  styleUrls: ['./acquaintance.component.scss']
})
export class AcquaintanceComponent implements OnInit {
  @Input() regForm: FormGroup

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }
  onFormSubmit() {

  }
  signUp() {
    console.log(this.regForm);
    if (this.regForm.valid) {
      console.log("valid");
      const clientId = this.settingsService.getClientId();
      console.log(clientId);
      const masof = this.settingsService.getMasof();

      const data = {
        ...this.regForm.value.detailsForm,
        ...this.regForm.value.storeForm,
        ...this.regForm.value.ownerDetailsForm,
        clientId,
        masof,
      };
      console.log(data);
      // this.auth.setToken(this.route.snapshot.paramMap.get('q'));
      this.settingsService.signUp(data).subscribe((token: any) => {
        // TODO save token
        console.log(token);
        // this.router.navigate(['products'], {
        //   queryParamsHandling: '',
        // });
        if (token) {
          console.log(token);
          this.auth.setToken(token);
          this.router.navigate(['products'], {
            queryParamsHandling: '',
          });
        }
      });
    }
  }
}
