import { AuthService } from './../../../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() regForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  signUp() {
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
        this.router.navigate(['products'], {
          queryParamsHandling: '',
        });
        if (token) {
          console.log(token);
          this.auth.setToken(token);
          // this.router.navigate(['products'], {
          //   queryParamsHandling: '',
          // });
        }
      });
    }
  }
}
