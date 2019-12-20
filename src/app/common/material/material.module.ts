import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
      MatIconModule,
      MatButtonModule,
      MatCheckboxModule,
      MatCardModule,
      MatButtonToggleModule
    ]
  })
  export class MaterialModule { }