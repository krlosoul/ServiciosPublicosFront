export interface IReportDto {
  id: number;
  idService: number;
  serviceName?: string;
  idStatus: number;
  statusName?: string;
  idUser: number;
  userName?: string;
  observation?: string;
  creationOn: Date;
}
