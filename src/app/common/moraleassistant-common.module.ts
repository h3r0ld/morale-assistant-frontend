import { NgModule } from '@angular/core';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { JokeService } from './service/joke.service';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SoundBarComponent } from './component/sound-bar/sound-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        TimeFormatterPipe,
        SoundBarComponent,
        PageNotFoundComponent
    ],
    imports: [
        FlexLayoutModule,
        CommonModule,
        MaterialModule,
    ],
    exports: [
        TimeFormatterPipe,
        SoundBarComponent,
    ],
    providers: [
        JokeService
    ]
})
export class MoraleAssistantCommonModule { }
