import { FormControl, FormGroup, Validators } from '@angular/forms';


export class Vehicle {
	form: FormGroup;

	id: number;
	placa: string;
	chassi: string;
	renavam: string;
	modelo: string;
	marca: string;
	ano: number;

	constructor(other?: any) {
		if (other != null) {
			this.id = other.id;
			this.placa = other.placa;
			this.chassi = other.chassi;
			this.renavam = other.renavam;
			this.modelo = other.modelo;
			this.marca = other.marca;
			this.ano = other.ano;
		}
	}

	get asForm(): FormGroup {
		if (this.form == null) {
			this.form = new FormGroup({
				id: new FormControl(this.id),
				placa: new FormControl(this.placa, [Validators.required]),
				chassi: new FormControl(this.chassi, [Validators.required]),
				renavam: new FormControl(this.renavam, [Validators.required]),
				modelo: new FormControl(this.modelo, [Validators.required]),
				marca: new FormControl(this.marca, [Validators.required]),
				ano: new FormControl(this.ano, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(4), Validators.minLength(4),Validators.min(1886), Validators.max(new Date().getFullYear())]),

			});
		}
		return this.form;
	}
}


