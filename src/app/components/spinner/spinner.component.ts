import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {

  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private restService: RestService) {
    this.subscription = this.restService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}