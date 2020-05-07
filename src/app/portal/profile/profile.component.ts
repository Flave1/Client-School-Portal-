import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/shared/account.service';
import { UserDetails } from 'src/app/models/account';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserType } from 'src/app/models/Roles';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StaffprofileComponent } from './staffprofile/staffprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  currentUser : UserDetails;
  constructor(private spinner : NgxSpinnerService, public accountService : AccountService,
     private dialog : MatDialog) {
      this.getUserProfile();
      }

  ngOnInit(): void {
  }


  updateProfile(userId){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {userId};
    if(this.currentUser.userType == UserType[UserType.Student]){
      this.dialog.open(StudentprofileComponent, dialogConfig);
    }
    if(this.currentUser.userType == UserType[UserType.Staff]){
      this.dialog.open(StaffprofileComponent, dialogConfig);
    }
    
  }

  updateStudentProfile(){

  }

  updateStaffProfile(){

  }
  getUserProfile(){
    this.spinner.show();
    this.accountService.FetchUserProfile().subscribe(
      (res:any) => {
        this.currentUser = res;  
        this.spinner.hide(); 
      },
      (err:any)=>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }
}
