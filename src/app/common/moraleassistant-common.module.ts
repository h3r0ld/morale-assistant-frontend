import { NgModule } from '@angular/core';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { JokeService } from './service/joke.service';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SoundBarComponent } from './component/sound-bar/sound-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LanguageSelectComponent } from './component/language-select/language-select.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerHttpInterceptor } from './interceptor/spinner.http-interceptor';

@NgModule({
    declarations: [
        TimeFormatterPipe,
        SoundBarComponent,
        PageNotFoundComponent,
        LanguageSelectComponent,
    ],
    imports: [
        FlexLayoutModule,
        CommonModule,
        MaterialModule,
        NgxSpinnerModule,
    ],
    exports: [
        FlexLayoutModule,
        TimeFormatterPipe,
        SoundBarComponent,
        LanguageSelectComponent,
        NgxSpinnerModule,
    ],
    providers: [
        JokeService,
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerHttpInterceptor, multi: true},
    ]
})
export class MoraleAssistantCommonModule { }
