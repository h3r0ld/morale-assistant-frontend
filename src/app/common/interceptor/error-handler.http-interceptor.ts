import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { BackendError, BackendErrorResponse } from '../model/error';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const backendErrorResponse = httpErrorResponse.error as BackendErrorResponse;

        if (httpErrorResponse.status === 401) {
          this.showUnauthorizedError();
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          this.router.navigate(['/']);
          return throwError(httpErrorResponse);
        }

        if (backendErrorResponse && backendErrorResponse.errors) {
          this.showBackendErrors(backendErrorResponse.errors);
        } else {
          this.showError();
        }

        return throwError(httpErrorResponse);
      })
    );
  }
  
  private showBackendErrors(errors: BackendError[]) {
    errors.forEach(error => {
      this.toastr.error(error.details, error.title);
    });
  }

  private showError() {
    this.toastr.error('Backend is not available, please try again later. :(', 'Error');
  }

  private showUnauthorizedError() {
    this.toastr.error('Unauthorized access.', 'Error');
  }
}
