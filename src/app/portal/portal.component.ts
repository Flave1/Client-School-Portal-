import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '../shared/portal.service';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { UserDetails } from '../models/account'; 
import { Roles } from '../models/Roles';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: []
})
export class PortalComponent implements OnInit {  
  currentUser: UserDetails; 
  userRoles : any;
  canAccessSuperAdminComponents :boolean = false;
  canAccessAdminComponents :boolean = false;
  canAccessTeacherComponents :boolean = false;
  canAccessBursarComponents :boolean = false;
  canAccessRegistrarComponents :boolean = false;
  canAccessStudentComponents :boolean = false; 

  constructor(private router: Router, public portalService : PortalService, private accountService : AccountService,
    private spninner : NgxSpinnerService) { 
      this.userRoles = [];
      this.getUserProfile();
    }
    
    
  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    console.log("roles from api ", this.currentUser?.roles);  
  }
  
  getUserProfile(){
    this.spninner.show();
    this.accountService.FetchUserProfile().subscribe(
      (res:any) => {
        this.currentUser = res;
        this.userRoles = res.roles;  
        this.checkRolesMatch(this.userRoles) 
        this.spninner.hide(); 
      },
      (err:any)=>{
        console.log(err);
        this.spninner.hide();
      }
    );
  }

  checkRolesMatch(roles){ 
    roles.forEach(element => {
      if(element == Roles[Roles.SuperAdmin]){
        this.canAccessSuperAdminComponents = true; 
        return false;
      }
      if(element == Roles[Roles.Admin]){
        this.canAccessAdminComponents = true; 
        return false;
      }
      else if(element == Roles[Roles.Burser]){
        this.canAccessBursarComponents = true; 
        return false;
      }
      else if(element == Roles[Roles.Registrar]){
        this.canAccessRegistrarComponents = true; 
        return false;
      }
      else if(element == Roles[Roles.Student]){
        this.canAccessStudentComponents = true; 
        return false;
      }
      else if(element == Roles[Roles.Teacher]){
        this.canAccessTeacherComponents = true; 
        return false;
      }  
    });
    
  }


  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/account/login']);
  }
}
