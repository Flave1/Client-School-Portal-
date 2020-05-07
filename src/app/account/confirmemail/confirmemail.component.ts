import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AccountComponent } from '../account.component';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: []
})
export class ConfirmemailComponent implements OnInit {

  constructor(public accountService : AccountService, private spinner : NgxSpinnerService, 
    private router : Router ) { }
  ErrorDetails = {
    errors : [],
    message : '',
    fieldName : ''
  }
  ngOnInit(): void { 
  }

  
  onSubmit(){
    this.spinner.show();
    this.ErrorDetails = null;
    this.accountService.EmailConfirmation().subscribe(
      (res:any) =>{
        if(res.email != null){ 
          localStorage.setItem('email', res.email);
          this.spinner.hide(); 
          console.log(res); 
          this.router.navigate(['/account/changepassword']);
          console.log("Did not redirect ");
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
    )
  }
}
