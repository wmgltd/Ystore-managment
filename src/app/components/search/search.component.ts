import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }
  myControl = new FormControl();
  @Input()
  fullArray: any[];
  fileterArray: any[] = [];
  @Input()
  filterby: string[] = [];
  @Output()
  ReturnFilterArray = new EventEmitter<any[]>();
  // filteredOptions: Observable<any[]>;
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.fullArray) {
      this.fileterArray = this.fullArray;
      console.log(this.fileterArray);
    }
  }
  private _filter(value: string): any[] {
    console.log(this.fileterArray);
    console.log(value);
    const filterValue = String(value).toLowerCase();
    return this.fileterArray.filter(option =>
      this.filterby.find(by => option["" + by + ""]?.toLowerCase().indexOf(filterValue) >= 0)
    );
  }
  onChangeSearch(event) {
    var array;
    console.log(event);
    if (event) {
      array = this._filter(event);
    }
    else {
      array = this.fullArray;
    }
    this.ReturnFilterArray.emit(array);
  }
}
