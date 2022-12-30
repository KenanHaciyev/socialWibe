import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../../services/auth.service'
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/register.actions'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
	constructor(private actions$: Actions,
							private authServ: AuthService,
							private persistanceServ: PersistanceService,
							private router: Router) {
	}

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerAction),
			switchMap(({request}) => {
				return this.authServ.register(request).pipe(
					map((currentUser: CurrentUserInterface) => {
						this.persistanceServ.set('accessToken', currentUser.token)
						return registerSuccessAction({currentUser})
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(registerFailureAction({errors: errorResponse.error.errors}))
					})
				)
			})
		)
	)

	redirectAfterSubmit$ = createEffect(() =>
			this.actions$.pipe(
				ofType(registerSuccessAction),
				tap(() => {
					this.router.navigate(['/'])
				})
			),
		{dispatch: false}
	)
}
