import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../../services/auth.service'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {
	getCurrentUserAction,
	getCurrentUserFailureAction,
	getCurrentUserSuccessAction
} from '../actions/getCurrentUser.actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'

@Injectable()
export class GetCurrentUserEffects {
	constructor(
		private actions$: Actions,
		private authServ: AuthService,
		private persistanceServ: PersistanceService
	) {
	}

	getCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getCurrentUserAction),
			switchMap(() => {
				const token = this.persistanceServ.get('accessToken')
				if (!token) {
					return of(getCurrentUserFailureAction())
				}
				return this.authServ.getCurrentUser().pipe(
					map((currentUser: CurrentUserInterface) => {
						return getCurrentUserSuccessAction({currentUser})
					}),
					catchError(() => {
						return of(getCurrentUserFailureAction())
					})
				)
			})
		)
	)
}
