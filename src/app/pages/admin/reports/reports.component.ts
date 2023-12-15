import { Component, OnInit } from '@angular/core';
import { IReportDto } from 'src/app/dtos/ireport-dto';
import { IServiceDto } from 'src/app/dtos/iservice-dto';
import { IStatusDto } from 'src/app/dtos/istatus-dto';
import { IUserDto } from 'src/app/dtos/iuser-dto';
import { ReportService } from 'src/app/services/report/report.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  customHeaders = {
    serviceName: 'Servicio',
    statusName: 'Estado',
    userName: 'Usuario',
    observation: 'Observacion',
    creationOn: 'Fecha de Reporte'
  };
  hideColumns = ['id', 'idService', 'idStatus', 'idUser'];
  reportDto: IReportDto[] = [];

  services: IServiceDto[];
  statuses: IStatusDto[];
  users: IUserDto[];
  inputObservation: string = '';

  selectedService: IServiceDto = null;
  selectedStatus: IStatusDto = null;
  selectedUser: IUserDto = null;

  registerId: number = 0;

  actions = [
    { Icon: 'fas fa-edit', Action: this.editar.bind(this) },
    { Icon: 'fas fa-trash', Action: this.borrar.bind(this) },
  ];

  isService:boolean;
  isStatus:boolean;
  isUser:boolean;
  isObservation:boolean;

  constructor(
    private reportService : ReportService,
    private serviceService : ServiceService,
    private statusService : StatusService,
    private userService : UserService,
    private notificationService : NotificationService,
    private confirmationModalService: ConfirmationModalService) {}

  ngOnInit() {
    this.handleGetReports();
    this.handleGetService();
    this.handleGetStatus();
    this.handleGetUsers();
  }

  guardar(){
    if (this.ValidateInputs()) {
      let data = {
        idService: this.selectedService,
        idStatus: this.selectedStatus,
        idUser: this.selectedUser,
        observation: this.inputObservation
      };
      if (this.registerId > 0) {
        data['id'] = this.registerId;
        this.handlePutReport(data);
      }
      else {
        this.handlePostReport(data); 
      }
    }
    else{
      this.notificationService.Error('Todos los datos son obligatorios.');
    }
  }
  
  editar(row: any) {
    this.registerId = row.id,
    this.selectedService = row.idService;
    this.selectedStatus = row.idStatus;
    this.selectedUser = row.idUser;
    this.inputObservation = row.observation;
    this.notificationService.Success("Datos cargados en el formulario.");
  }

  borrar(row: any) {
    this.abrirModal(row);
  }

  abrirModal(row: any) {
    let data = {
      id: row.id
    };
    const title = 'Confirmación';
    const message = '¿Estás seguro de que deseas realizar esta acción?';

    this.confirmationModalService.confirm(title, message).subscribe((result) => {
      if (result) {
        this.handleDeleteReport(data);
      }
    });
  }

  private limpiar(){
    this.selectedService = null,
    this.selectedStatus = null,
    this.selectedUser = null,
    this.inputObservation = '';
    this.registerId = 0;
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
          this.services = result;
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
          this.statuses = result;
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
          this.users = result;
        }
      }
    });
  }

  private GetUsers() {
    return this.userService.GetUsers();
  }

  private handlePostReport(data : any) {
    this.PostReport(data).subscribe({
      next: (result) => {
        if (result) {
          this.notificationService.Success("Nuevo reporte registrado.");
          this.limpiar();
          this.handleGetReports();
        }
      }
    });
  }

  private PostReport(data : any) {
    return this.reportService.PostReport(data);
  }

  private handlePutReport(data : any) {
    this.PutReport(data).subscribe({
      next: (result) => {
        if (result) {
          this.notificationService.Success("Reporte actualizado.");
          this.limpiar();
          this.handleGetReports();
        }
      }
    });
  }

  private PutReport(data : any) {
    return this.reportService.PutReport(data);
  }

  private handleDeleteReport(data : any) {
    this.DeleteReport(data).subscribe({
      next: (result) => {
        if (result) {
          this.notificationService.Success("Reporte eliminado.");
          this.limpiar();
          this.handleGetReports();
        }
      }
    });
  }

  private DeleteReport(data : any) {
    return this.reportService.DeleteReport(data);
  }

  private ValidateInputs(): boolean {
    this.isService = this.selectedService === null;
    this.isStatus = this.selectedStatus === null;
    this.isUser = this.selectedUser === null;
    this.isObservation = this.inputObservation === '';
    return !this.isService && !this.isStatus && !this.isUser && !this.isObservation;
  }
}
