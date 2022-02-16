import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JokeImportControllerService, JokeSource } from 'src/app/common/client/admin';

@Component({
  selector: 'app-joke-import-dialog',
  templateUrl: './joke-import-dialog.component.html',
  styleUrls: ['./joke-import-dialog.component.scss']
})
export class JokeImportDialogComponent {
  form: FormGroup;
  selectedSource: JokeSource;

  constructor(
    private dialogRef: MatDialogRef<JokeImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sources: JokeSource[],
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private jokeImportService: JokeImportControllerService,
  ) {
    this.form = this.formBuilder.group({
      source: [null, Validators.required],
      count: [1, Validators.min(1)]
    });
  }

  importJokes() {
    const source = this.form.value.source.name;
    const count = this.form.value.count;
    this.jokeImportService.importJokes(source, count).subscribe(_ => {
      this.toastrService.success(`${count} joke(s) successfully imported!`, 'Import joke');
      this.dialogRef.close(true);
    });
  }
}
