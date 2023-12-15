import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
import { GridPaginationService } from './grid-pagination.service';
import { ConfirmationModalService } from './confirmation-modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  providers:[
    NotificationService,
    RestService,
    StorageService,
    TokenService,
    GridPaginationService,
    ConfirmationModalService
  ]
})
export class ServicesModule { }
