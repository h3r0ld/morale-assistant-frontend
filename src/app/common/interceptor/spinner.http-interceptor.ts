import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import {finalize } from "rxjs/operators";

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {
    private static readonly SPINNER_NAME = 'spinner';

    private count = 0;

    constructor(private spinner: NgxSpinnerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show(SpinnerHttpInterceptor.SPINNER_NAME);
    
        this.count++;

        return next.handle(req)
          .pipe (finalize(() => {
              this.count--;
              if (this.count == 0) {
                this.spinner.hide(SpinnerHttpInterceptor.SPINNER_NAME)
              }
            })
          );
      }
}