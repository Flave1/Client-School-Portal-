import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { PortalComponent } from './portal/portal.component';
import { AuthGuard } from './auth/auth.guard';
import { ChangepasswordComponent } from './account/changepassword/changepassword.component'; 
import { ErrorsComponent } from './errors/errors.component';
import { Error403Component } from './errors/error403/error403.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error500Component } from './errors/error500/error500.component';
import { ConfirmemailComponent } from './account/confirmemail/confirmemail.component';
import { SuperadminComponent } from './portal/superadmin/superadmin.component';
import { AdminComponent } from './portal/admin/admin.component';
import { BursarComponent } from './portal/bursar/bursar.component';
import { RegistrarComponent } from './portal/registrar/registrar.component';
import { StudentComponent } from './portal/student/student.component';
import { TeacherComponent } from './portal/teacher/teacher.component';
import { Roles } from './models/Roles';
import { ProfileComponent } from './portal/profile/profile.component'; 


const routes: Routes = [
  {path:'', redirectTo:'account/login', pathMatch:'full'}, 
  {path:'account', component:AccountComponent, 
  children:[
    {path:'registration', component:RegistrationComponent, 
    canActivate:[AuthGuard], data : {permittedRoles : [Roles[Roles.SuperAdmin, Roles.Registrar, Roles.Admin, Roles.Burser]]}},
    {path:'login', component:LoginComponent},
    {path:'changepassword', component:ChangepasswordComponent},
    {path:'confirmemail', component:ConfirmemailComponent},
  ]
  },
  {path : 'portal', component:PortalComponent, 
  canActivate:[AuthGuard], children:[
    {path: 'superadmin', component: SuperadminComponent,data : {permittedRoles : [Roles[Roles.SuperAdmin]]}},
    {path: 'admin', component : AdminComponent, data : {permittedRoles : [Roles[Roles.Admin, Roles.SuperAdmin]]}},
    {path: 'bursar', component: BursarComponent, data : {permittedRoles : [Roles[Roles.Burser]]}},
    {path: 'registrar', component: RegistrarComponent, data : {permittedRoles : [Roles[Roles.Registrar]]}},
    {path: 'student', component: StudentComponent, data : {permittedRoles : [Roles[Roles.Student]]}},
    {path: 'teacher', component: TeacherComponent, data : {permittedRoles : [Roles[Roles.Teacher]]}},
    {path: 'profile', component: ProfileComponent, children:[
      {path: '', component : ProfileComponent},
      {path: 'edit/:userId', component : ProfileComponent}
    ]}
  ]},
  {path : 'errors', component:ErrorsComponent, 
  children:[
    {path:'error403', component:Error403Component},
    {path:'error404', component:Error404Component},
    {path:'error500', component:Error500Component}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
