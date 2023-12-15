import { Component, OnInit } from '@angular/core';
import { Itoken } from 'src/app/interfaces/itoken';
import { StorageService } from 'src/app/services/storage.service';
import { RolesEnum } from 'src/app/enums/roles.enum';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  token: Itoken;
  rolesEnum = RolesEnum;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.token = this.storageService.getUser();
  }

}
