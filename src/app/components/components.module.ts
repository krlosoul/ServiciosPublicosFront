import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component'
import { SpinnerComponent }  from 'src/app/components/spinner/spinner.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    NotificationComponent,
    GridComponent,
    SearchComponent,
    ConfirmationModalComponent,
    SpinnerComponent
  ],
  exports: [
    NotificationComponent,
    GridComponent,
    SearchComponent,
    ConfirmationModalComponent,
    SpinnerComponent
  ],
})
export class ComponentsModule { }
