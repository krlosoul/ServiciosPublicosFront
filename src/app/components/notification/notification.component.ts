import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INotification } from '../../interfaces/inotification';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-Notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: INotification[] = [];
  isNotificationModalVisible = false;
  private notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.getNotification().subscribe(
      (notifications: INotification[]) => {
        this.notifications = notifications;
        this.showNotificationModal();
      }
    );
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

  removeNotification(notification: INotification) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  private showNotificationModal() {
    this.isNotificationModalVisible = this.notifications.length > 0;
  }
}
