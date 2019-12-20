import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PlayState } from 'src/app/common/model/play-state';


@Component({
  selector: 'app-sound-bar',
  templateUrl: './sound-bar.component.html',
  styleUrls: ['./sound-bar.component.scss']
})
export class SoundBarComponent implements OnInit, OnChanges {
  @Input() sound: HTMLAudioElement;
  @Output() soundEnded = new EventEmitter();

  private state: PlayState;

  public currentTime: number;
  public duration: number;
  public autoplay: boolean;

  constructor() {
    this.currentTime = 0;
    this.duration = 0;
    this.state = PlayState.STOPPED;
    this.autoplay = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changed!');

    this.sound.load();

    this.sound.ontimeupdate = () => {
      console.log('Setting currentTime to: ', this.sound.currentTime);
      this.currentTime = this.sound.currentTime;
    };

    this.sound.onloadedmetadata = () => {
      console.log('Setting duration to: ', this.sound.duration);
      this.duration = this.sound.duration;
    }

    this.sound.onended = () => {
      this.state = PlayState.STOPPED;
      console.log('Sending sound ended event!');
      this.soundEnded.emit();
    }

    if (this.autoplay) {
      this.play();
    }
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
    }
  }

  stop() {
    console.log('Stopping!');
    if (this.sound) {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.state = PlayState.STOPPED;
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
