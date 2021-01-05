import { Component, OnInit, ViewChild } from '@angular/core';
import { JokeService } from 'src/app/common/service/joke.service';
import { Joke } from 'src/app/common/model/joke';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { SoundBarOptions } from 'src/app/common/component/sound-bar/sound-bar-options';

@Component({
  selector: 'app-joke-management-page',
  templateUrl: './joke-management-page.component.html',
  styleUrls: ['./joke-management-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JokeManagementPageComponent implements OnInit {
  public displayedColumns: string[] = [ 'id', 'language', 'text', 'soundFilePath', 'lastModified' ];
  public jokesDataSource: MatTableDataSource<Joke>;
  public expandedElement: Joke | null;

  public soundBarOptions = SoundBarOptions.build().hiddenAutoplay(true);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private jokeService: JokeService) {
  }

  ngOnInit() {
    this.jokeService.getJokes().subscribe(data => {
      this.jokesDataSource = new MatTableDataSource(data);
      this.jokesDataSource.paginator = this.paginator;
      this.jokesDataSource.sort = this.sort;
    });
  }

}
