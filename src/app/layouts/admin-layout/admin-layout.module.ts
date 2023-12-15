import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesDirective } from 'src/app/directives/roles.directive';
import { ComponentsModule } from "src/app/components/components.module";
import { WelcomeComponent } from 'src/app/pages/admin/welcome/welcome.component';
import { ReportsComponent } from 'src/app/pages/admin/reports/reports.component';
import { ViewReportsComponent } from 'src/app/pages/admin/view-reports/view-reports.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule
  ],
  declarations: [
    RolesDirective,
    WelcomeComponent,
    ReportsComponent,
    ViewReportsComponent
  ]
})

export class AdminLayoutModule {}
