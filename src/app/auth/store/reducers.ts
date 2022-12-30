import {AuthStateInterface} from '../types/authState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.actions'

const initialState: AuthStateInterface = {
	isSubmitting: false,
	currentUser: null,
	isLoggedIn: null,
	validationErrors: null
}

const authReducer = createReducer(
	initialState,
	on(
		registerAction,
		(state): AuthStateInterface => ({
			...state,
			isSubmitting: true
		})
	),
	on(
		registerSuccessAction,
		(state, action) => ({
			...state,
			isLoggedIn: true,
			currentUser: action.currentUser
		})
	),
	on(
		registerFailureAction,
		(state, action) => ({
			...state,
			isSubmitting: false,
			validationErrors: action.errors
		})
	)
)

export function reducers(state: AuthStateInterface, action: Action) {
	return authReducer(state, action)
}
