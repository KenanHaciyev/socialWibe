import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TopBarComponent} from './components/top-bar/top-bar.component'
import {RouterModule} from '@angular/router'


@NgModule({
	declarations: [
		TopBarComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [TopBarComponent]
})
export class TopBarModule {
}
