import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Joke } from 'src/app/common/model/joke';
import { Language } from 'src/app/common/model/language';
import { JokeService } from 'src/app/common/service/joke.service';
import { SoundBarComponent } from '../../common/component/sound-bar/sound-bar.component';

@Component({
  selector: 'app-joke-box',
  templateUrl: './joke-box.component.html',
  styleUrls: ['./joke-box.component.scss']
})
export class JokeBoxComponent {
  public readonly Language = Language;

  @ViewChild(SoundBarComponent) soundBar: SoundBarComponent;

  @Input() joke: Joke = {}  as Joke;

  public started: boolean = false;
  public selectedLanguage: Language = Language.English;
  public autoplay: boolean = true;
  
  public maxTimeLeft: number = 10;
  public timeLeft: number;
  public settingsOpened: boolean = false;
  
  private countdown: any;

  constructor(private jokeService: JokeService) { }

  onSoundEnded() {
    if (this.autoplay) {
      console.log('Sound ended, getting next joke... ');
      this.timeLeft = this.maxTimeLeft || 10;

      if (!this.countdown) {
        this.countdown = setInterval(() => {
          this.timeLeft--;
    
          if (this.timeLeft === 0) {
            this.getNextJoke();
          }
        }, 1000);
      }
    }
  }

  getNextJoke() {
    this.started = true;
    this.stopCountdown();
    this.joke.soundFile = null;

    this.jokeService.getRandomJoke(this.selectedLanguage).subscribe(joke => {
      this.joke = joke;

      this.joke.soundFile = new Audio("data:audio/wav;base64," + joke.soundFile);

      if (this.autoplay && this.soundBar) {
        this.soundBar.replay();
      } else if(this.soundBar) {
        console.log('Autoplay not set! ', this.autoplay);
        this.soundBar.stop();
      }
    });
  }

  stopCountdown() {
    console.log('Stopping countdown...');
    if (this.countdown) {
      console.log('Clearing countdown interval...');
      clearInterval(this.countdown);
      this.countdown = null;
    }
    this.timeLeft = 0;
  }
}
