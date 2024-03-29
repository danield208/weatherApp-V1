import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../_service/user.service";

@Injectable({
  providedIn: "root",
})
export class RouterAuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | any {
    if (this.user.userInitCompleted.value) return true;
    else this.router.navigateByUrl("/start");
  }
}
