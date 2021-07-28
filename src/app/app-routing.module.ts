import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { SeekerSignupComponent } from './seeker-signup/seeker-signup.component';
import { LoginComponent } from './login/login.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
      path:'',redirectTo:'/welcome-page', pathMatch:'full'
    },

    {
      path:'welcome-page',
      component:WelcomeComponent
    },

    {
      path:'welcome-page/login',
      component:LoginComponent 
    },

    {
      path:'welcome-page/signupemp',
      component:EmpSignupComponent
    },

    {
      path:'welcome-page/signupseeker',
      component:SeekerSignupComponent 
    },

    {
      path:'employerdashboard',
      component:EmployerDashboardComponent,
      canActivate:[AuthGuard]
    },

    {
      path:'admindashboard',
      component:AdminDashboardComponent,  
      canActivate:[AuthGuard] 
    },

    {
      path:'Jobseekerdashboard',
      component:SeekerDashboardComponent ,
      canActivate:[AuthGuard]
  
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
