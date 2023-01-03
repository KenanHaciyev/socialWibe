import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../../services/auth.service'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {Router} from '@angular/router'
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/login.actions'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'

@Injectable()
export class LoginEffect {
	constructor(
		private actions$: Actions,
		private authServ: AuthService,
		private persistanceServ: PersistanceService,
		private router: Router
	) {
	}

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginAction),
			switchMap(({request}) => {
				return this.authServ.login(request).pipe(
					map((currentUser) => {
						this.persistanceServ.set('accessToken', currentUser.token)
						return loginSuccessAction({currentUser})
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(loginFailureAction({errors: errorResponse.error.errors}))
					})
				)
			})
		)
	)

	redirectAfterSubmit$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginSuccessAction),
			tap(() => {
				this.router.navigate(['/'])
			})
		), {dispatch: false}
	)
}
