import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { IReportDto } from 'src/app/dtos/ireport-dto';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private RestService: RestService) { }

  GetReports(): Observable<IReportDto[]> {
    return this.RestService.get<IReportDto[]>(
      `${environment.methods.report}/GetReports`
    );
  }

  GetReportsByFilter(data:any): Observable<IReportDto[]> {
    return this.RestService.get<IReportDto[]>(
      `${environment.methods.report}/GetReportsByFilter`,data
    );
  }

  PostReport(data:any): Observable<number> {
    return this.RestService.post<number>(
      `${environment.methods.report}/PostReport`,data
    );
  }

  PutReport(data:any): Observable<number> {
    return this.RestService.put<number>(
      `${environment.methods.report}/PutReport`,data
    );
  }

  DeleteReport(data:any): Observable<number> {
    return this.RestService.delete<number>(
      `${environment.methods.report}/DeleteReport`,data
    );
  }

}
