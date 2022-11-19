import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { JokeEditDialogComponent } from '../joke-edit-dialog/joke-edit-dialog.component';
import { JokeDto } from 'src/app/common/client/admin/model/jokeDto';
import { JokeSearchRequest } from 'src/app/common/client/admin/model/jokeSearchRequest';
import { JokeControllerService } from 'src/app/common/client/admin/api/jokeController.service';
import { JokeImportControllerService, PageJokeDto } from 'src/app/common/client/admin';
import { Joke } from 'src/app/common/model/joke';
import { DomSanitizer } from '@angular/platform-browser';
import { JokeImportDialogComponent } from '../joke-import-dialog/joke-import-dialog.component';

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
  public readonly Language = JokeDto.LanguageEnum;

  public displayedColumns: string[] = ['language', 'text', 'created', 'lastModified', 'modify', 'delete'];
  public jokesDataSource: MatTableDataSource<JokeDto> = new MatTableDataSource<JokeDto>();
  
  public expandedElement: Joke | null;

  public request: JokeSearchRequest = { page: 0, pageSize: 5 };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private jokeService: JokeControllerService,
    private jokeImportService: JokeImportControllerService,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
  ) {
    this.searchJokes = this.searchJokes.bind(this);
  }

  ngAfterViewInit() {
    this.searchJokes();
  }

  resetSearch() {
    this.request = {} as JokeSearchRequest;
    this.searchJokes();
  }

  searchJokes() {
    this.request.page = this.paginator.pageIndex;
    this.request.pageSize = this.paginator.pageSize;

    this.jokeService.searchJokes(this.request).subscribe((response: PageJokeDto) => {
      this.jokesDataSource.data = response.content;
      this.paginator.pageIndex = response.number;
      this.paginator.pageSize = response.numberOfElements;
      this.paginator.length = response.totalElements;
    });
  }

  pageChanged(event: PageEvent) {
    this.searchJokes();
  }

  newJoke() {
    this.openJokeDialog().afterClosed().subscribe((newJoke: JokeDto) => {
      if (newJoke) {
        this.jokeService.saveJoke(newJoke).subscribe(this.searchJokes);
      }
    });
  }

  importJokes() {
    this.jokeImportService.getJokeSources().subscribe(sources => {
      this.dialog.open(JokeImportDialogComponent, {
        width: '20em',
        data: sources
      }).afterClosed().subscribe(success => {
        if (success) {
          this.searchJokes();
        }
      });
    });
  }

  getJoke(openedJoke: JokeDto) {
    if (this.expandedElement === openedJoke) {
      this.expandedElement = null;
    } else {
      this.jokeService.getJoke(openedJoke.id).subscribe(joke => {
        this.expandedElement = openedJoke;
        this.expandedElement.soundFile = this.domSanitizer.bypassSecurityTrustUrl(`data:audio/wav;base64,${joke.soundFile}`);
      });
    }
  }

  modifyJoke(joke: JokeDto, event: MouseEvent) {
    event.stopPropagation();

    this.openJokeDialog(joke).afterClosed().subscribe((modifiedJoke: JokeDto) => {
      if (modifiedJoke) {
        this.jokeService.updateJoke(modifiedJoke.id, modifiedJoke).subscribe(this.searchJokes);
      }
    });
  }

  deleteJoke(joke: JokeDto, event: MouseEvent) {
    event.stopPropagation();
    this.jokeService.deleteJoke(new Set([joke.id])).subscribe(this.searchJokes);
  }

  private openJokeDialog(joke?: JokeDto) {
    return this.dialog.open(JokeEditDialogComponent, {
      width: '600px',
      data: { joke }
    });
  }
}
