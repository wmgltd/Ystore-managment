import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {
  success = false;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }
  sentYaadLead() {
    const masof = this.settingsService.getMasof();
    console.log(masof);
    let masofObject = { masof: masof };
    this.settingsService.lead(masofObject).subscribe((res) => {
      console.log(res);
      if (res) {
        this.success = true;
      }
    });
  }
}
