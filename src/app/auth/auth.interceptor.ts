import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {  tap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
constructor(private router : Router) { 
}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(localStorage.getItem('token') != null){
            const clonedReq = req.clone({
               headers : req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
            });
            console.log(clonedReq);
             return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    err =>{
                        if(err.status == 401){
                            this.router.navigateByUrl('account/login')
                        }
                        else if(err.status == 403){
                            this.router.navigateByUrl('errors/error403')
                        }
                        else if(err.status == 404){
                            this.router.navigateByUrl('errors/error404')
                        }
                        else if(err.status == 500){
                            this.router.navigateByUrl('errors/error500')
                        }
                    }
                )
        ) 
    }
    else {
        return next.handle(req.clone());
    }
  }
}