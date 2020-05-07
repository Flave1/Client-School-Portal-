import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  UserEmail = '';

  constructor(private fb : FormBuilder, private http : HttpClient) { }
 
 
  ConfirmEmail = this.fb.group({
    Email : ['', [Validators.required, Validators.email]], 
  });

  BurserReg = this.fb.group({ 
    Email : ['', [Validators.required, Validators.email]], 
    UserType : [''], 
  });

  PasswordChange = this.fb.group({ 
    
      Passwords : this.fb.group({
        OldPassword : ['', [Validators.required, Validators.minLength(8)]],
        NewPassword : ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword : ['', Validators.required]
    },{validator : this.comparePassowrds})
  });

  

  EmailConfirmation(){
    var body = {
      Email : this.ConfirmEmail.value.Email
    };
    return this.http.post(environment.apiURL+'/identity/confirm/email', body);
  }
  BurserAddUser(){
    var body = {
      Email : this.BurserReg.value.Email,
      UserType : this.BurserReg.value.UserType
    }; 
    return this.http.post(environment.apiURL+'/identity/burser/user/create', body);
  }

  login(formData){
    return this.http.post(environment.apiURL + '/identity/login', formData);
  }

  firstTimeLogin(email){
    var body = {
      Email : email,
      OldPassword : this.PasswordChange.value.Passwords.OldPassword,
      NewPassword : this.PasswordChange.value.Passwords.NewPassword
    };
    return this.http.post(environment.apiURL+'/identity/firstLogin/changePassword', body);
  }

  comparePassowrds(fb:FormGroup){
    let confirmPwdCtrl = fb.get('ConfirmPassword');
    if(confirmPwdCtrl.errors == null ||	'passwordMismatch' in confirmPwdCtrl.errors){
      if(fb.get('NewPassword').value != confirmPwdCtrl.value){
        confirmPwdCtrl.setErrors({passwordMismatch : true});
      }else{
        confirmPwdCtrl.setErrors(null);
      }
    }
  }

  roleMatch(allowedRoles) : boolean{
    console.log(allowedRoles);
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  FetchUserProfile(){
    return this.http.get(environment.apiURL + '/identity/profile')
  } 
}
