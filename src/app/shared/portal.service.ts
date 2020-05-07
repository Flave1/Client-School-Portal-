import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { UserDetails } from '../models/account';
import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient) { }
  UserDetails: UserDetails;
  Roles : Roles;
 
  
  roleMatch(allowedRoles:any) : boolean{
    console.log(allowedRoles);
   // var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    // if(allowedRoles?.length > 1){
    //   allowedRoles.forEach(element => {
    //     if(userRole == element){
    //       isMatch = true;
    //       return false;
    //     }
    //   });
    // }
    if(userRole == allowedRoles){
     // isMatch = true;
      return true;
    }
    return false;
  }

}
