import { Component, OnInit } from '@angular/core';
import { IReportDto } from 'src/app/dtos/ireport-dto';
import { IServiceDto } from 'src/app/dtos/iservice-dto';
import { IStatusDto } from 'src/app/dtos/istatus-dto';
import { IUserDto } from 'src/app/dtos/iuser-dto';
import { ReportService } from 'src/app/services/report/report.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {

  customHeaders = {
    serviceName: 'Servicio',
    statusName: 'Estado',
    userName: 'Usuario',
    observation: 'Observacion',
    creationOn: 'Fecha de Reporte'
  };
  hideColumns = ['id', 'idService', 'idStatus', 'idUser'];
  reportDto: IReportDto[] = [];

  serviceDto: IServiceDto[] = [];
  statusDto: IStatusDto[] = [];
  userDto: IUserDto[] = [];

  constructor(
    private reportService : ReportService,
    private serviceService : ServiceService,
    private statusService : StatusService,
    private userService : UserService) {}

  ngOnInit() {
    this.handleGetReports();
    this.handleGetService();
    this.handleGetStatus();
    this.handleGetUsers();
  }

  handleSearch(searchData: any) {
    this.handleGetReportsByFilter(searchData);
  }

  private handleGetReports() {
    this.GetReports().subscribe({
      next: (result) => {
        if (result) {
          this.reportDto = result;
        }
      }
    });
  }

  private GetReports() {
    return this.reportService.GetReports();
  }

  private handleGetService() {
    this.GetService().subscribe({
      next: (result) => {
        if (result) {
          this.serviceDto = result;
        }
      }
    });
  }

  private GetService() {
    return this.serviceService.GetService();
  }

  private handleGetStatus() {
    this.GetStatus().subscribe({
      next: (result) => {
        if (result) {
          this.statusDto = result;
        }
      }
    });
  }

  private GetStatus() {
    return this.statusService.GetStatus();
  }

  private handleGetUsers() {
    this.GetUsers().subscribe({
      next: (result) => {
        if (result) {
          this.userDto = result;
        }
      }
    });
  }

  private GetUsers() {
    return this.userService.GetUsers();
  }

  private handleGetReportsByFilter(filter : string) {
    this.GetReportsByFilter(filter).subscribe({
      next: (result) => {
        if (result) {
          this.reportDto = result;
        }
        else{
          this.handleGetReports();
        }
      }
    });
  }

  private GetReportsByFilter(filter : string) {
    return this.reportService.GetReportsByFilter(filter);
  }
}
