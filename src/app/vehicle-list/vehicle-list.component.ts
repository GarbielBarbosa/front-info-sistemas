import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FromType, AlignType, NotificationType } from 'enums/notifications.enum';
import { PaginationList } from 'models/pagination-list.model';
import { Vehicle } from 'models/vehicles.model';
import { NotificationsService } from 'services/notifications.service';
import { VehicleService } from 'services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  closeResult = '';
  currentPage = 3;
  disablepage = 3;
  isDisabled = true;
  pagecustom: 4;
  size = 0;
  vehicles: Array<Vehicle> = new Array<Vehicle>();
  constructor(
    protected vehicleService: VehicleService,
    protected notificationsService: NotificationsService,
    private modalService: NgbModal
  ) {
    this.getVehicles(1)
  }

  ngOnInit(): void {

  }
  getVehicles(page) {
    this.vehicleService.pagination(page).subscribe(data => {
      this.size = data.size;
      this.vehicles = data.data.map(d => new Vehicle(d))
    })
  }

  deleteVehicles(id: number) {
    this.vehicleService.delete(id).subscribe(d => {
      this.vehicleService.list().subscribe(data => {
        this.vehicles = data.map(d => new Vehicle(d))
        this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.success, "Veículo excluido com sucesso");
      })

    }, e => {
      this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.danger, "Erro ao excluir o veiculo");
    })
  }

  confirmDelete(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      if (result) {
        this.deleteVehicles(id)
      }
    });
  }
}
