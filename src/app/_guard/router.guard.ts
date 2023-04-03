import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { APIDataService } from "../_service/api-data.service";

@Injectable({
	providedIn: "root",
})
export class RouterAuthGuard implements CanActivate {
	constructor(private data: APIDataService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | any {
		if (this.data.DataLoadedAndAuthenticated.value) return true;
		else this.router.navigateByUrl("start");
	}
}
