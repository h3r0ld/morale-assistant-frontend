import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../model/language';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  public readonly LanguageEnum = Language

  @Input()
  public required: boolean = false;

  @Input()
  public selected: Language;

  @Output()
  public selectedChange = new EventEmitter<Language>();

  ngOnInit() {
    if (!this.selected && this.required) {
      this.selected = Language.English;
    }
  }

  selectChanged() {
    this.selectedChange.emit(this.selected);
  }
}
