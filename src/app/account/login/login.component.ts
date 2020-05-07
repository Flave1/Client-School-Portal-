import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';  
import { AccountComponent } from '../account.component';
import { Roles } from 'src/app/models/Roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
formModel={
      Email : '',
      Password : ''
    }

    LoginErrorResponse = {
      errors : [],
      message : '',
      fieldName : ''
    }

  userRole = new Array<string>();
  constructor(private accountService : AccountService, private router : Router, 
    private spinner : NgxSpinnerService) { } 

    
  ngOnInit(): void { 
  }


  onSubmit(form: NgForm)
  {
    this.spinner.show();
    this.LoginErrorResponse = null;
    this.accountService.login(form.value).subscribe(
      (res:any) => { 
        if(res.isFirstTimeLogin || res.email != null){
          this.accountService.UserEmail = res.email;
          this.spinner.hide(); 
          localStorage.setItem('email', res.email); 
          console.log(res);
          this.router.navigate(['account/changepassword'])
        }
        if(res.token != null){
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.spinner.hide(); 
          console.log(res); 
          this.RouteUserBasedOnRole();
          console.log("Did not redirect ");
         }
      }, 
        (err:any) => { 
          if(err.error != null){
            this.LoginErrorResponse = err.error; 
            this.spinner.hide();  
          }
          console.log(this.LoginErrorResponse);
          console.log(err);
         
        } 
    );
    
  }

  RouteUserBasedOnRole(){ 
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.userRole.push(payLoad.role) 
    console.log(this.userRole); 
                      
    this.userRole.forEach(element => {
      if(element == Roles[Roles.SuperAdmin]){ 
        this.router.navigate(['portal/superadmin']);
        return false;
      }
      if(element == Roles[Roles.Admin]){ 
        this.router.navigate(['portal/admin']);
        return false;
      }
      else if(element == Roles[Roles.Burser]){ 
        this.router.navigate(['portal/bursar']);
        return false;
      }
      else if(element == Roles[Roles.Registrar]){ 
        this.router.navigate(['portal/registrar']);
        return false;
      }
      else if(element == Roles[Roles.Student]){ 
        this.router.navigate(['portal/student']);
        return false;
      }
      else if(element == Roles[Roles.Teacher]){ 
        this.router.navigate(['portal/teacher']);
        return false;
      } else{
        this.router.navigate(['errors/404']);
        return false;
      }
    });
    
  }
}
