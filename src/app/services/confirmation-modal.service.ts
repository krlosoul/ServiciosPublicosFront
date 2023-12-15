import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
  private modalRef: NgbModalRef;
  private resultSubject = new Subject<boolean>();

  constructor(private modalService: NgbModal) {}

  confirm(title: string, message: string): Subject<boolean> {
    this.resultSubject = new Subject<boolean>();  
    this.modalRef = this.modalService.open(ConfirmationModalComponent, { centered: true, });
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.message = message;
    this.modalRef.result.then((result) => {
      this.resultSubject.next(result === true);
      this.resultSubject.complete();
    }).catch(() => {
      this.resultSubject.next(false);
      this.resultSubject.complete();
    });
    return this.resultSubject;
  }  

  close(confirm: boolean) {
    if (this.modalRef) {
      this.modalRef.close(confirm);
    }
  }
}
