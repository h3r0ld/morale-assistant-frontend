import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JokeDto } from 'src/app/common/client/admin/model/jokeDto';

@Component({
  selector: 'app-joke-edit-dialog',
  templateUrl: './joke-edit-dialog.component.html',
  styleUrls: ['./joke-edit-dialog.component.scss']
})
export class JokeEditDialogComponent {
  public joke: JokeDto = { language: JokeDto.LanguageEnum.En, text: '' };
  public title = 'Joke';

  constructor(
    public dialogRef: MatDialogRef<JokeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { joke: JokeDto },
  ) {
    if (data.joke) {
      this.joke = data.joke;
      this.title = 'Modify joke';
    } else {
      this.title = 'New joke';
    }
  }
}
