
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit, OnDestroy {
  @Input() selectData: Bank[] = [];
  @Input() errorMessage: any;

  @Output() bankSelected = new EventEmitter<Bank>();

  public selectCtrl: FormControl = new FormControl(null, Validators.required);
  public SelectFilterCtrl: FormControl = new FormControl();
  public filteredSelect: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  

  protected _onDestroy = new Subject<void>();


  ngOnInit() {
    this.filteredSelect.next(this.selectData.slice());
  
    this.SelectFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(searchText => {
        this.filteredSelect.next(this.filterBanks(searchText));
      });
  }

    ngOnChanges(changes: any): void {
    if (changes.selectData && changes.selectData.currentValue) {
      this.filteredSelect.next(changes.selectData.currentValue.slice());
    }
  }
  
  filterBanks(searchText: string): Bank[] {
    const search = searchText.toLowerCase();
    return this.selectData.filter(select => select.name.toLowerCase().includes(search));
  }

  

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onBankSelected(select: Bank) {
    this.bankSelected.emit(select);
  }

 


}
