import { AuthService } from './../../../services/auth.service';
import { ServerResponse } from './../../../models/server-response.model';
import { StoreService } from 'src/app/services/init-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class SignupComponent implements OnInit {
  stepperIndex = 0;
  registrationForm: FormGroup;
  isInitializing = true;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private auth: AuthService,
    private router: Router
  ) {
    // Get the q parameter recived from yaad sarig.
    this.route.queryParams.subscribe((params) => {
      const q = params.q;

      storeService.initStore(q).subscribe((response: ServerResponse) => {
        if (parseInt(response.data.store_active, 10) && response.data.token) {
          this.auth.setToken(response.data.token);
          this.router.navigate(['products'], {
            queryParamsHandling: 'preserve',
          });
        } else {
          if (response.data.client_id) {
            this.settingsService.setClientId(response.data.client_id);
          }

          this.isInitializing = false;
        }
      });
    });
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      ownerDetailsForm: new FormGroup({
        owner_name: new FormControl(null, Validators.required),
        owner_phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(new RegExp('[0-9]{9}')),
        ]),
        owner_email: new FormControl(null, Validators.required),
        private_company: new FormControl(null, [
          Validators.required,
          Validators.pattern(new RegExp('[0-9]')),
        ]),
      }),
      storeForm: new FormGroup({
        company_name: new FormControl(null, Validators.required),
        company_subdomain: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [this.uniqueSubdomain()], // this is how you use a validator
          updateOn: 'blur', // run validation on blur
        }),
        logo_name: new FormControl(null, Validators.required),
        logo: new FormControl(null, Validators.required),
      }),
      detailsForm: new FormGroup({
        company_address: new FormControl(null, Validators.required),
        company_city: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        is_policy_approved: new FormControl(null, Validators.required),
      }),
    });
  }

  private uniqueSubdomain() {
    return (ctrl: AbstractControl) => {
      // this is how you define a validator function
      const subdomain = ctrl.value;
      return subdomain // async validators return an Observable or Promise
        ? this.settingsService
            .validateSubdomain(subdomain)
            .pipe(
              map((isUnique) =>
                isUnique ? null : { subdomainNotUnique: true }
              )
            ) // validators return null if they're valid, otherwise some object
        : of(null); // don't bother checking if no value
    };
  }
}
