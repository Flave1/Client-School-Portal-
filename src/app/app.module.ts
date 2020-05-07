import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AccountService } from './shared/account.service';
import { PortalComponent } from './portal/portal.component';
import { ChangepasswordComponent } from './account/changepassword/changepassword.component'; 
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorsComponent } from './errors/errors.component';
import { Error403Component } from './errors/error403/error403.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error500Component } from './errors/error500/error500.component';
import { ConfirmemailComponent } from './account/confirmemail/confirmemail.component';
import { SuperadminComponent } from './portal/superadmin/superadmin.component';
import { AdminComponent } from './portal/admin/admin.component';
import { BursarComponent } from './portal/bursar/bursar.component';
import { RegistrarComponent } from './portal/registrar/registrar.component';
import { TeacherComponent } from './portal/teacher/teacher.component';
import { StudentComponent } from './portal/student/student.component';
import { PortalService } from './shared/portal.service'; 
import { ProfileComponent } from './portal/profile/profile.component';
import { StudentprofileComponent } from './portal/profile/studentprofile/studentprofile.component';
import { StaffprofileComponent } from './portal/profile/staffprofile/staffprofile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    PortalComponent,
    ChangepasswordComponent,
    ErrorsComponent,
    Error403Component,
    Error404Component,
    Error500Component,
    ConfirmemailComponent,
    SuperadminComponent,
    AdminComponent,
    BursarComponent,
    RegistrarComponent,
    TeacherComponent,
    StudentComponent,
    ProfileComponent,
    StudentprofileComponent,
    StaffprofileComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule 
  ],
  entryComponents : [StudentprofileComponent, StaffprofileComponent],
  providers: [
    AccountService, 
    {  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Title,
    PortalService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
