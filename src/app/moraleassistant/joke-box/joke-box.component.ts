import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeDto } from 'src/app/common/client/admin';
import { MoraleAssistantControllerService } from 'src/app/common/client/public';
import { Joke } from 'src/app/common/model/joke';
import { SoundBarComponent } from '../../common/component/sound-bar/sound-bar.component';

@Component({
  selector: 'app-joke-box',
  templateUrl: './joke-box.component.html',
  styleUrls: ['./joke-box.component.scss']
})
export class JokeBoxComponent implements OnInit {
  public readonly Language = JokeDto.LanguageEnum;

  @ViewChild(SoundBarComponent) soundBar: SoundBarComponent;

  public joke: Joke = {}  as Joke;

  public started = false;
  public selectedLanguage: JokeDto.LanguageEnum = JokeDto.LanguageEnum.En;
  public autoplay = true;

  public singleJoke = false;
  public maxTimeLeft = 10;
  public timeLeft: number;
  public settingsOpened = false;

  private countdown: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jokeService: MoraleAssistantControllerService,
    private snackBar: MatSnackBar,
  ) {
    this.handleJokeResponse = this.handleJokeResponse.bind(this);
  }

  ngOnInit() {
    const jokeId = this.route.snapshot.params.id;

    if (jokeId) {
      this.jokeService.getJoke(jokeId).subscribe(joke => {
        this.singleJoke = true;
        this.started = true;
        this.autoplay = false;
        this.handleJokeResponse(joke);
      }, err => {
        this.router.navigate(['/']);
      });
    }
  }

  onSoundEnded() {
    if (this.autoplay) {
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
    if (this.soundBar) {
      this.soundBar.stop();
    }

    this.started = true;
    this.stopCountdown();
    this.joke.soundFile = null;

    this.jokeService.getRandomJoke(this.selectedLanguage).subscribe(this.handleJokeResponse);
  }

  stopCountdown() {
    if (this.countdown) {
      clearInterval(this.countdown);
      this.countdown = null;
    }
    this.timeLeft = 0;
  }

  onShareCopy(subject: string) {
    this.snackBar.open(`${subject} copied.`, 'Cool!', {
      duration: 2000,
    });
  }

  onSoundLoaded() {
    if (this.autoplay) {
      this.soundBar.play();
    }
  }

  start(language: JokeDto.LanguageEnum) {
    this.selectedLanguage = language;
    this.getNextJoke();
  }

  private handleJokeResponse(joke: JokeDto) {
    this.joke = joke;
    this.joke.shareURL = `${window.location.origin}/joke/${joke.id}`;
    this.joke.embedded = this.getEmbeddedURL(joke);

    this.joke.soundFile = new Audio('data:audio/wav;base64,' + joke.soundFile);

    if (this.autoplay && this.soundBar) {
      this.soundBar.replay();
    } else if(this.soundBar) {
      this.soundBar.stop();
    }
  }

  private getEmbeddedURL(joke: JokeDto) {
    return `<iframe src="${window.location.origin}/joke-box/${joke.id}" width="840" height="220" frameBorder="0" allowFullScreen></iframe>`;
  }
}
