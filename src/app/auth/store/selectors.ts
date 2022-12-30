import {createSelector} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'
import {AppStateInterface} from '../../shared/types/appState.interface'

// export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth')

export const authFeatureSelector = (state: AppStateInterface): AuthStateInterface => state.auth

export const isSubmittingSelector = createSelector(
	authFeatureSelector,
	(authState: AuthStateInterface) => authState.isSubmitting
)
export const validationErrorsSelector = createSelector(authFeatureSelector,
	(authState: AuthStateInterface) => authState.validationErrors
)
