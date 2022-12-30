import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.actions'
import {Observable} from 'rxjs'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form: FormGroup
	isSubmitting$: Observable<boolean>
	backendErrors$: Observable<BackendErrorsInterface | null>

	constructor(private fBuilder: FormBuilder,
							private store: Store) {
	}

	ngOnInit(): void {
		this.initializeForm()
		this.initializeValues()
	}

	initializeForm() {
		this.form = this.fBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	onSubmit(): void {
		const request: RegisterRequestInterface = {
			user: this.form.value
		}
		this.store.dispatch(registerAction({request}))
	}

	initializeValues() {
		this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
		this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
	}
}
