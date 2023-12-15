import { Injectable } from "@angular/core";
import { CanActivate, Router,ActivatedRouteSnapshot  } from "@angular/router";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.storageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
