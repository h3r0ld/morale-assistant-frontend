import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JokeService } from 'src/app/common/service/joke.service';
import { Joke } from 'src/app/common/model/joke';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { SoundBarOptions } from 'src/app/common/component/sound-bar/sound-bar-options';
import { JokeSearchRequest } from 'src/app/common/model/joke-search-request';
import { MatDialog } from '@angular/material';
import { JokeEditDialogComponent } from '../joke-edit-dialog/joke-edit-dialog.component';

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
export class JokeManagementPageComponent implements AfterViewInit {
  public displayedColumns: string[] = [ 'id', 'language', 'text', 'created', 'lastModified', 'modify', 'delete'];
  public jokesDataSource: MatTableDataSource<Joke>;
  public expandedElement: Joke | null;

  public soundBarOptions: SoundBarOptions = {
    hideAutoplay: true
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private jokeService: JokeService,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.searchJokes();
  }

  searchJokes() {
    const request = {
      page: {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }
    } as JokeSearchRequest;

    this.jokeService.searchJokes(request).subscribe(response => {
      this.jokesDataSource = new MatTableDataSource(response.content);
      this.paginator.pageIndex = response.paging.pageIndex;
      this.paginator.pageSize = response.paging.pageSize;
      this.paginator.length = response.paging.totalElements;
    });
  }

  pageChanged(event: PageEvent) {
    this.searchJokes();
  }

  modifyJoke(joke: Joke, event: MouseEvent) {
    event.stopPropagation();

    this.dialog.open(JokeEditDialogComponent, {
      width: '300px',
      data: { joke }
    }).afterClosed().subscribe((modifiedJoke: Joke) => {
      if (modifiedJoke) {
        this.jokeService.updateJoke(modifiedJoke).subscribe(() => {
          this.searchJokes();
        });
      }
    });
  }

  deleteJoke(joke: Joke, event: MouseEvent) {
    event.stopPropagation();
    this.jokeService.deleteJoke(joke).subscribe(() => {
      this.searchJokes();
    });
  }
}
