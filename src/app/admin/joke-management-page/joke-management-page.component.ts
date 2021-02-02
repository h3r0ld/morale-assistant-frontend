import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JokeService } from 'src/app/common/service/joke.service';
import { Joke } from 'src/app/common/model/joke';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { JokeSearchRequest } from 'src/app/common/model/joke-search-request';
import { MatDialog } from '@angular/material/dialog';
import { JokeEditDialogComponent } from '../joke-edit-dialog/joke-edit-dialog.component';
import { Language } from 'src/app/common/model/language';

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
  public readonly Language = Language

  public displayedColumns: string[] = ['language', 'text', 'created', 'lastModified', 'modify', 'delete'];
  public jokesDataSource: MatTableDataSource<Joke>;
  public expandedElement: Joke | null;

  public request: JokeSearchRequest = {} as JokeSearchRequest;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private jokeService: JokeService,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.searchJokes();
  }

  resetSearch() {
    this.request = {} as JokeSearchRequest;
    this.searchJokes();
  }

  searchJokes() {
    this.request.page = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.jokeService.searchJokes(this.request).subscribe(response => {
      this.jokesDataSource = new MatTableDataSource(response.content);
      this.paginator.pageIndex = response.paging.pageIndex;
      this.paginator.pageSize = response.paging.pageSize;
      this.paginator.length = response.paging.totalElements;
    });
  }

  pageChanged(event: PageEvent) {
    this.searchJokes();
  }

  newJoke() {
    this.openJokeDialog().afterClosed().subscribe((newJoke: Joke) => {
      if (newJoke) {
        this.jokeService.saveJoke(newJoke).subscribe(() => {
          this.searchJokes();
        });
      }
    });
  }

  getJoke(openedJoke: Joke) {
    if (this.expandedElement === openedJoke) {
      this.expandedElement = null;
    } else {
      this.expandedElement = openedJoke;
    }
  }

  getSoundFileUrl(joke: Joke) {
    return this.jokeService.getJokeSoundURL(joke);
  }

  modifyJoke(joke: Joke, event: MouseEvent) {
    event.stopPropagation();

    this.openJokeDialog(joke).afterClosed().subscribe((modifiedJoke: Joke) => {
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

  private openJokeDialog(joke: Joke | undefined = undefined) {
    return this.dialog.open(JokeEditDialogComponent, {
      width: '600px',
      data: { joke }
    })
  }
}
