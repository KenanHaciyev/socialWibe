import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {RouterModule, Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {RegisterEffect} from './store/effects/register.effect'
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backendErrorMessages.module'
import {LoginEffect} from './store/effects/login.effect'
import {LoginComponent} from './components/login/login.component'
import {GetCurrentUserEffects} from './store/effects/getCurrentUser.effects'

const routes: Routes = [
	{
		path: 'register', component: RegisterComponent
	},
	{
		path: 'login', component: LoginComponent
	}
]

@NgModule({
	declarations: [
		RegisterComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		BackendErrorMessagesModule,
		EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffects]),
		RouterModule.forChild(routes),
		StoreModule.forFeature('auth', reducers)
	]
})
export class AuthModule {
}
