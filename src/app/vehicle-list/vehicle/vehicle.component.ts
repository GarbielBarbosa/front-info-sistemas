import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormType } from 'enums/form.enum';
import { AlignType, FromType, NotificationType } from 'enums/notifications.enum';
import PlateHelper from 'helper/plate.helper';
import { Vehicle } from 'models/vehicles.model';
import { NotificationsService } from 'services/notifications.service';
import { VehicleService } from 'services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  plateHelper: PlateHelper = new PlateHelper()
  model: Vehicle;
  form: FormGroup;
  type: FormType;
  eFormType = FormType;
  loading: boolean = true;
  returnLinks
  constructor(
    protected vehicleService: VehicleService,
    protected route: ActivatedRoute,
    protected notificationsService: NotificationsService,
    protected router: Router,

  ) {

  }

  get fc() { return this.form.controls }

  ngOnInit(): void {
    this.start()
  }

  start() {
    this.route.params.subscribe(params => this.load(params));
  }

  load(params: object) {
    if (params['id'] == "new") {
      this.loaded(this.vehicleService.create(), FormType.Create);
    }
    else {
      this.vehicleService.get(params['id']).subscribe(x => {
        this.loaded(new Vehicle(x), FormType.Edit)
      });
    }
  }

  loaded(model: Vehicle, type: FormType) {
    this.model = model;
    this.form = this.model.asForm;
    this.type = type;
    this.loading = false;
  }

  validate() {
    if (this.form.value.placa == '')
      this.form.controls.placa.setErrors({ "required": true })
    else if (!this.plateHelper.validate(this.form.value.placa))
      this.form.controls.placa.setErrors({ "invalid": true })

  }

  onSubmit() {
    this.validate()
    if (this.form.invalid) {
      this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.danger, "Verifique se os campos obrigatorios foram preenchidos");
      return;
    }
    this.loading = true;
    if (this.type === FormType.Create) {
      this.vehicleService.save(this.form.value)
        .subscribe(
          d => {
            this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.success, "Veículo salvo com sucesso");
          },
          e => {
            this.loading = false;
            this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.danger, "Ocorreu um erro ao salvar o veículo");
          },
          () => {
            this.router.navigate(['/vehicle-list'], { relativeTo: this.route });
          }
        );
    } else {
      this.vehicleService.update(this.form.value)
        .subscribe(
          d => {
            this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.success, "Veículo alterado com sucesso");
          },
          e => {
            this.loading = false;
            this.notificationsService.showNotification(FromType.bottom, AlignType.center, NotificationType.danger, "Ocorreu um erro ao alterar o veículo");
          },
          () => {
            this.router.navigate(['/vehicle-list'], { relativeTo: this.route });
          }
        );
    }
  }


}
