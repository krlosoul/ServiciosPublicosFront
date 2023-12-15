import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { IStatusDto } from 'src/app/dtos/istatus-dto';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private RestService: RestService) { }

  GetStatus(): Observable<IStatusDto[]> {
    return this.RestService.get<IStatusDto[]>(
      `${environment.methods.status}/GetStatus`
    );
  }

}
