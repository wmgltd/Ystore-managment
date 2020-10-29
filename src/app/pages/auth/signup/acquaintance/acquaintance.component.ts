import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-acquaintance',
  templateUrl: './acquaintance.component.html',
  styleUrls: ['./acquaintance.component.scss']
})
export class AcquaintanceComponent implements OnInit {
  @Input() regForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }
  onFormSubmit(){

  }

}
