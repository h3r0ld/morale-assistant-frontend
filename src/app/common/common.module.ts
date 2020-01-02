import { NgModule } from '@angular/core';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';

@NgModule({
    declarations: [
        TimeFormatterPipe
    ],
    exports: [
        TimeFormatterPipe
    ]
})
export class CommonModule { }
