import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { SeekerSignupComponent } from './seeker-signup/seeker-signup.component';
import { LoginComponent } from './login/login.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobpostService } from './jobpost.service';
import { RegistrationService } from './registration.service';
import { LoginService } from './login.service';
import { AppliedjobsService } from './appliedjobs.service';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EmpSignupComponent,
    SeekerSignupComponent,
    LoginComponent,
    EmployerDashboardComponent,
    AdminDashboardComponent,
    SeekerDashboardComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [JobpostService,RegistrationService,LoginService,AppliedjobsService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
