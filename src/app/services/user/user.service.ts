import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { IUserDto } from 'src/app/dtos/iuser-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private RestService: RestService) { }

  GetUsers(): Observable<IUserDto[]> {
    return this.RestService.get<IUserDto[]>(
      `${environment.methods.user}/GetUsers`
    );
  }
}
