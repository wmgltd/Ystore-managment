import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }
  sentYaadLead() {
    this.settingsService.lead().subscribe((res) => {
      console.log(res);
    });
  }
}
