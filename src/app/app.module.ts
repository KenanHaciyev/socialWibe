import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthModule} from './auth/auth.module'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects'

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		HttpClientModule,
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
		EffectsModule.forRoot([])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
