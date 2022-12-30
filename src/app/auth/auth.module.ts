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

const routes: Routes = [
	{
		path: 'register', component: RegisterComponent
	}
]

@NgModule({
	declarations: [
		RegisterComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		BackendErrorMessagesModule,
		EffectsModule.forFeature([RegisterEffect]),
		RouterModule.forChild(routes),
		StoreModule.forFeature('auth', reducers)
	]
	// providers:[AuthModule, PersistanceService]
})
export class AuthModule {
}
