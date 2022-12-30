import {Injectable} from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class PersistanceService {

	constructor() {
	}

	set(key: string, data: any): void {
		try {
			localStorage.setItem(key, JSON.stringify(data))
		} catch (e) {
			console.log('Error saving to localstorage', e)
		}
	}

	get(key: string): any {
		try {
			return JSON.parse(localStorage.getItem(key))
		} catch (e) {
			console.log('Error getting data from localstorage', e)
			return null
		}
	}
}
