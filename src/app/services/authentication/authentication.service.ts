import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { IAuthenticationDto } from 'src/app/dtos/iauthentication-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private RestService: RestService) { }

  Authentication(data: any): Observable<IAuthenticationDto> {
    return this.RestService.get<IAuthenticationDto>(
      `${environment.methods.authentication}/Authentication`,data,false
    );
  }
}
