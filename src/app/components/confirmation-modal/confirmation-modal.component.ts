import { Component } from '@angular/core';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  title: string;
  message: string;

  constructor(private confirmationModalService: ConfirmationModalService) {
    this.title = '';
    this.message = '';
  }

  confirm() {
    this.confirmationModalService.close(true);
  }

  cancel() {
    this.confirmationModalService.close(false);
  }
}
