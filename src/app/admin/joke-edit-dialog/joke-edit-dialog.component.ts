import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Joke } from 'src/app/common/model/joke';

@Component({
  selector: 'app-joke-edit-dialog',
  templateUrl: './joke-edit-dialog.component.html',
  styleUrls: ['./joke-edit-dialog.component.scss']
})
export class JokeEditDialogComponent {
  public joke?: Joke | null;

  constructor(
    public dialogRef: MatDialogRef<JokeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { joke: Joke },
  ) {
    this.joke = data.joke;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
