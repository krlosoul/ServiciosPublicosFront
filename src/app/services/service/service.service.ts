import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { IServiceDto } from 'src/app/dtos/iservice-dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private RestService: RestService) { }

  GetService(): Observable<IServiceDto[]> {
    return this.RestService.get<IServiceDto[]>(
      `${environment.methods.service}/GetService`
    );
  }
}
