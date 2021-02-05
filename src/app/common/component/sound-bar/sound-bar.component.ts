import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PlayState } from 'src/app/common/model/play-state';


@Component({
  selector: 'app-sound-bar',
  templateUrl: './sound-bar.component.html',
  styleUrls: ['./sound-bar.component.scss']
})
export class SoundBarComponent implements OnChanges {
  @Input() sound: HTMLAudioElement;
  
  @Output() soundLoaded = new EventEmitter();
  @Output() soundStarted = new EventEmitter();
  @Output() soundStopped = new EventEmitter();
  @Output() soundEnded = new EventEmitter();

  private state: PlayState;

  public currentTime: number;
  public duration: number;

  constructor() {
    this.currentTime = 0;
    this.duration = 0;
    this.state = PlayState.STOPPED;
  }

  ngOnChanges() {
    if (!this.sound) {
      return;
    }

    this.sound.onloadeddata = () => {
      this.soundLoaded.emit();
    }

    this.sound.ontimeupdate = () => {
      this.currentTime = this.sound.currentTime;
    };

    this.sound.onloadedmetadata = () => {
      this.duration = this.sound.duration;
    };

    this.sound.onended = () => {
      this.state = PlayState.STOPPED;
      this.soundEnded.emit();
    };

    this.sound.load();
  }

  isPlaying(): boolean {
    return this.state === PlayState.PLAYING;
  }

  isStopped(): boolean {
    return this.state === PlayState.STOPPED;
  }

  isPaused(): boolean {
    return this.state === PlayState.PAUSED;
  }

  play() {
    console.log('Playing!');
    if (this.sound) {
      this.sound.play();
      this.state = PlayState.PLAYING;
      this.soundStarted.emit();
    }
  }

  stop() {
    console.log('Stopping!');
    if (this.sound) {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.state = PlayState.STOPPED;
      this.soundStopped.emit();
    }
  }

  pause() {
    console.log('Pausing!');
    if (this.sound) {
      this.sound.pause();
      this.state = PlayState.PAUSED;
    }
  }

  replay() {
    console.log('Replay!');
    this.stop();
    this.play();
  }
}
