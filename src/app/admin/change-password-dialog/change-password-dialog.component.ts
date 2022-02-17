import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JokeSource, JokeImportControllerService, ChangePasswordDto } from 'src/app/common/client/admin';
import { AuthenticationService } from 'src/app/common/service/authentication.service';
import { JokeImportDialogComponent } from '../joke-import-dialog/joke-import-dialog.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {
  form: FormGroup;
  selectedSource: JokeSource;

  constructor(
    private dialogRef: MatDialogRef<JokeImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sources: JokeSource[],
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
    this.form = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      newPasswordConfirm: [null, Validators.required],
    });
  }

  changePassword() {
    if (this.form.valid) {
      this.authenticationService.changePassword(this.form.value as ChangePasswordDto).subscribe(_ => {
        this.toastrService.success('Password changed successfully!', 'Change password');
        this.dialogRef.close(true);
      });
    }
  }
}
