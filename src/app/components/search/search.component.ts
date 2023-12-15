import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IServiceDto } from 'src/app/dtos/iservice-dto';
import { IStatusDto } from 'src/app/dtos/istatus-dto';
import { IUserDto } from 'src/app/dtos/iuser-dto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() services: IServiceDto[];
  @Input() statuses: IStatusDto[];
  @Input() users: IUserDto[];

  selectedService: IServiceDto;
  selectedStatus: IStatusDto;
  selectedUser: IUserDto;

  @Output() searchEvent = new EventEmitter<any>();

  buscar() {
    const searchData = {
      idService: this.selectedService,
      idStatus: this.selectedStatus,
      idUser: this.selectedUser,
    };
    this.searchEvent.emit(searchData);
  }

  limpiar(){
    this.selectedService = null;
    this.selectedStatus = null;
    this.selectedUser = null;
  }
}