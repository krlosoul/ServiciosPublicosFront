import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { NotificationService } from "src/app/services/notification.service";
import { RolesEnum } from 'src/app/enums/roles.enum';

@Injectable({
    providedIn: 'root',
  })
  export class RoleGuard implements CanActivate {
    constructor(
      private router: Router, 
      private storageService: StorageService,
      private notification: NotificationService) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const userRole = this.storageService.getRole() as RolesEnum;  
      const expectedRoles = route.data.expectedRole as RolesEnum[];
      if (expectedRoles.includes(userRole)) {
        return true;
      } else {        
        this.notification.Warn("No tiene los permisos necesario.");
        this.router.navigate(['admin/welcome']);
        return false;        
      }
    }
  }
  