import { NgModule } from '@angular/core';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { JokeService } from './service/joke.service';

@NgModule({
    declarations: [
        TimeFormatterPipe
    ],
    exports: [
        TimeFormatterPipe
    ]
  })
  export class CommonModule { }