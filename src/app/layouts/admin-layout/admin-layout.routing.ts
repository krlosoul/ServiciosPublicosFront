import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { RolesEnum } from 'src/app/enums/roles.enum';
import { WelcomeComponent } from 'src/app/pages/admin/welcome/welcome.component';
import { ReportsComponent } from 'src/app/pages/admin/reports/reports.component';
import { ViewReportsComponent } from 'src/app/pages/admin/view-reports/view-reports.component';

export const AdminLayoutRoutes: Routes = [
   { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
   { path: 'reports', component: ReportsComponent, canActivate: [RoleGuard], data: { expectedRole: [RolesEnum.Administrator, RolesEnum.Editor] } },
   { path: 'viewreports', component: ViewReportsComponent, canActivate: [RoleGuard], data: { expectedRole: [RolesEnum.Viewer] } }
];
