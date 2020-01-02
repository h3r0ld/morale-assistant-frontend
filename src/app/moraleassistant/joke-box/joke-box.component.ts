import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Joke } from 'src/app/common/model/joke';
import { Language } from 'src/app/common/model/language';
import { JokeService } from 'src/app/common/service/joke.service';
import { SoundBarComponent } from '../sound-bar/sound-bar.component';

@Component({
  selector: 'app-joke-box',
  templateUrl: './joke-box.component.html',
  styleUrls: ['./joke-box.component.scss']
})
export class JokeBoxComponent implements OnInit {
  @Input() joke: Joke;

  public Language = Language;

  public autoplay: boolean;
  public timeLeft: number;
  public maxTimeLeft = 10;

  @ViewChild(SoundBarComponent, null) soundBar: SoundBarComponent;

  private countdown: any;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.joke = new Joke('Hello, this is a very very funny joke, you should laugh very intensively.', Language.HU);
    this.joke.soundFile = new Audio('../../../assets/audio/short_sound.mp3');
  }

  onSoundEnded() {
    console.log('Sound ended, getting next joke... ');
    this.timeLeft = this.maxTimeLeft;
    this.countdown = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft === 0) {
        this.getNextJoke();
      }
    }, 1000);
  }

  onSoundStarted() {
    this.stopCountdown();
  }

  getNextJoke() {
    this.stopCountdown();

    this.jokeService.getNextJoke(this.joke.language).subscribe(data => {
      console.log('data: ', data);
      if (data.type === 'single') {
        this.joke = new Joke(data.joke, Language.EN);
        this.joke.soundFile = new Audio('../../../assets/audio/short_sound.mp3');
      } else {
        this.joke = new Joke(`${data.setup} ${data.delivery}`, Language.EN);
        this.joke.soundFile = new Audio('../../../assets/audio/short_sound.mp3');
      }

      if (this.autoplay) {
        this.soundBar.replay();
      } else {
        console.log('Autoplay not set! ', this.autoplay);
        this.soundBar.stop();
      }
    });
  }

  getProgress() {
    return (this.soundBar.isPlaying() || this.soundBar.isPaused()
    ? Math.floor(this.soundBar.currentTime) / this.soundBar.duration : this.timeLeft / this.maxTimeLeft) * 100;
  }

  private stopCountdown() {
    console.log('Stopping countdown...');
    if (this.countdown) {
      console.log('Clearing countdown interval...');
      clearInterval(this.countdown);
    }
    this.timeLeft = 0;
  }
}
