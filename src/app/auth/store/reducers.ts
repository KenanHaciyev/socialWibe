import {AuthStateInterface} from '../types/authState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.actions'
import {loginAction, loginFailureAction, loginSuccessAction} from './actions/login.actions'
import {
	getCurrentUserAction,
	getCurrentUserFailureAction,
	getCurrentUserSuccessAction
} from './actions/getCurrentUser.actions'

const initialState: AuthStateInterface = {
	isSubmitting: false,
	isLoading: false,
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
	),
	on(
		loginAction,
		(state: AuthStateInterface) => ({
			...state,
			isSubmitting: true,
			validationErrors: null
		})
	),
	on(
		loginSuccessAction,
		(state: AuthStateInterface) => ({
			...state,
			isLoggedIn: true,
			isSubmitting: false
		})
	),
	on(
		loginFailureAction,
		(state: AuthStateInterface, action) => ({
			...state,
			isSubmitting: false,
			validationErrors: action.errors
		})
	),
	on(
		getCurrentUserAction,
		(state: AuthStateInterface, action) => ({
			...state,
			isLoading: true
		})
	),
	on(
		getCurrentUserSuccessAction,
		(state: AuthStateInterface, action) => ({
			...state,
			isLoading: false,
			currentUser: action.currentUser,
			isLoggedIn: true
		})
	),
	on(
		getCurrentUserFailureAction,
		(state: AuthStateInterface, action) => ({
			...state,
			isLoggedIn: false,
			isLoading: false,
			currentUser: null
		})
	)
)

export function reducers(state: AuthStateInterface, action: Action) {
	return authReducer(state, action)
}
