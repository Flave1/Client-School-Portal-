import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../shared/account.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private accountService: AccountService) { }

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem('token') != null){
        console.log("Before checking for roles");
        let roles = next.data['permittedRoles'] as Array<string>;
         console.log(roles);
        if(roles){
          if(this.accountService.roleMatch(roles)){
            return true; 
          }else{
            console.log("No roles found 1");
            this.router.navigate(['/errors/error403'])
            return false;
          }
        }else if(!roles){
          console.log("Area does not require roles");
          return true;
        }
      }else{
        console.log("Not Authenticated");
         this.router.navigate(['/account/login']);
         return false;
      }
    
  }
  
}
