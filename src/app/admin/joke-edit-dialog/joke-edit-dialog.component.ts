import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Joke } from 'src/app/common/model/joke';
import { Language } from 'src/app/common/model/language';

@Component({
  selector: 'app-joke-edit-dialog',
  templateUrl: './joke-edit-dialog.component.html',
  styleUrls: ['./joke-edit-dialog.component.scss']
})
export class JokeEditDialogComponent {
  public joke: Joke = { language: Language.English } as Joke;
  public title = "Joke";

  constructor(
    public dialogRef: MatDialogRef<JokeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { joke: Joke },
  ) {
    if (data.joke) {
      this.joke = data.joke
      this.title = "Modify joke";
    } else {
      this.title = "New joke";
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
