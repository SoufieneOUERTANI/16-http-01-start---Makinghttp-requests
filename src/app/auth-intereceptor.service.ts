import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request is on its way"+((req !== null && req.body !== null)?" => "+JSON.stringify(req.body):""))
        const modifiedRequest = req.clone({headers : req.headers.append('Auth', 'xyz')});
        return next.handle(modifiedRequest).pipe(tap(event => {
            if(event.type === HttpEventType.Response){
                console.log('response arrived, body data : '+ JSON.stringify(event.body))
            }
        }));
    }
}