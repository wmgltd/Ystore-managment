import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input()
  percentage: number;
  @Input()
  quantity: number; 
  @Input()
  status: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
