import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {PersistanceService} from './persistance.service'

@Injectable({
	providedIn: 'root'
})
export class Authinterceptor implements HttpInterceptor {

	constructor(private persistanceService: PersistanceService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.persistanceService.get('accessToken')
		request = request.clone({
			setHeaders: {
				Authorization: token ? `request, ${token}` : ''
			}
		})
		return next.handle(request)
	}
}
