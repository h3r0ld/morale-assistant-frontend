import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const user = this.authenticationService.userValue;
        if (user) {
            // logged in, so return value
            return true;
        }
        
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
        
        return false;
    }
}