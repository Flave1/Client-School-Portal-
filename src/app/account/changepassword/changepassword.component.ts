import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountComponent } from '../account.component';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: []
})
export class ChangepasswordComponent implements OnInit {
  ErrorDetails = {
  errors : [],
  message : '',
  fieldName : ''
} 
SessionExpired : any;

  constructor(private router : Router, public accountService : AccountService, 
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {  
  }


  onSubmit(){ 
    this.SessionExpired = "Session Expired! Re-login"
    this.spinner.show();
    if(localStorage.getItem('email') == null){
      this.ErrorDetails.errors = this.SessionExpired;
      this.spinner.hide();
    }
    const email = localStorage.getItem('email');
    this.accountService.firstTimeLogin(email).subscribe( 
      (res:any) => {
        if(res.token){    
            this.accountService.BurserReg.reset();
            this.ErrorDetails = null;
            localStorage.removeItem('email');
            localStorage.setItem('token', res.token);
            this.spinner.hide();
            this.router.navigateByUrl('/portal');
        }else{
          res.error.errors.forEach(element => {
            this.ErrorDetails = element.value;
            this.spinner.hide(); 
          });
        }
      },
      (err:any) => { 
        if(err.error != null){
          this.ErrorDetails = err.error; 
          this.spinner.hide();  
        } 
        console.log(this.ErrorDetails);
        console.log(err);
      }
);
  }

}
