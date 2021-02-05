import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joke } from 'src/app/common/model/joke';
import { JokeService } from 'src/app/common/service/joke.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  title = "Morale Assistant";
  version = environment.appVersion;
}
