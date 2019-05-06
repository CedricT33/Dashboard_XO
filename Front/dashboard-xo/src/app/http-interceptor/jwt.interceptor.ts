import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

// intercepte toutes requêtes envoyées au back et y ajoute le token s'il existe.
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available
    const accessToken = sessionStorage.getItem(environment.accessToken);

    // on n'intercepte pas la requete visant l'api adresse.data.gouv (il ne faut pas de clef dans le header)
    if (accessToken && !request.url.includes('api-adresse.data.gouv.fr')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
