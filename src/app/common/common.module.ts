import { NgModule } from '@angular/core';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { JokeService } from './service/joke.service';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        TimeFormatterPipe,
        PageNotFoundComponent
    ],
    exports: [
        TimeFormatterPipe
    ],
    providers: [
        JokeService
    ]
})
export class CommonModule { }
