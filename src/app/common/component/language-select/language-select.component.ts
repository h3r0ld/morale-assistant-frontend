import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { JokeDto } from '../../client/public/model/jokeDto';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  public readonly LanguageEnum = JokeDto.LanguageEnum

  @Input()
  public required: boolean = false;

  @Input()
  public selected: JokeDto.LanguageEnum;

  @Output()
  public selectedChange = new EventEmitter<JokeDto.LanguageEnum>();

  ngOnInit() {
    if (!this.selected && this.required) {
      this.selected = JokeDto.LanguageEnum.En;
    }
  }

  selectChanged() {
    this.selectedChange.emit(this.selected);
  }
}
