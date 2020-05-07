import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';  
import { NgxSpinnerService } from "ngx-spinner";  
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {
ErrorDetails = {
  errors : [],
  message : '',
  fieldName : ''
}
Success : string;

  constructor(public accountService : AccountService, 
    private spinner : NgxSpinnerService, private router : Router) { }

  ngOnInit(): void { 
    this.accountService.BurserReg.reset();
  }

  onSubmit(){
        this.spinner.show(); 
    this.accountService.BurserAddUser().subscribe( 
      (res:any) => {
        if(res.token){   
            this.Success = "User Added Successfuly";
            this.accountService.BurserReg.reset();
            this.ErrorDetails = null;
            this.spinner.hide();
        }else{
          res.error.errors.forEach(element => {
            this.ErrorDetails = element.value;
            this.spinner.hide();
            this.Success = ""
          });
        }
      },
      (err:any) => { 
        if(err.error != null){
          this.ErrorDetails = err.error; 
          this.spinner.hide(); 
          this.Success = ""
        }
        if(err.error.errors != null){
          err.error.errors.forEach(element => {
            this.ErrorDetails.errors = element; 
            this.spinner.hide();
            this.Success = ""
          });
        }
        

        console.log(this.ErrorDetails);
        console.log(err);
      }
    );
  }
}
