import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form: FormGroup

	constructor(private fBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.initializeForm()
	}

	initializeForm() {
		this.form = this.fBuilder.group({
			username: ['', Validators.required],
			email: '',
			password: ''
		})
	}

	onSubmit() {
		console.log(this.form.value)
	}
}
