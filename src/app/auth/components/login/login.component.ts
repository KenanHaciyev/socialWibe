import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'
import {select, Store} from '@ngrx/store'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {loginAction} from '../../store/actions/login.actions'

@Component({
	selector: 'mc-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	onSubmit(): void {
		const request: LoginRequestInterface = {
			user: this.form.value
		}
		this.store.dispatch(loginAction({request}))
	}

	initializeValues() {
		this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
		this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
	}
}
