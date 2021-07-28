import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator } from './Confirmed.Validator';
import { RegistrationService } from '../registration.service';
import { Jobseeker } from '../Models/Jobseeker';

@Component({
  selector: 'app-seeker-signup',
  templateUrl: './seeker-signup.component.html',
  styleUrls: ['./seeker-signup.component.css']
})
export class SeekerSignupComponent  {

  seekers:Jobseeker[]=[];
  seeker:Jobseeker=new Jobseeker();

  form: FormGroup = new FormGroup({});
  
  constructor(private EmployerService:RegistrationService,private fb: FormBuilder,private router: Router,private toastr: ToastrService) 
  {
  
    this.form = fb.group({
      fullname: ['', [Validators.required]],
      mobileNumber:['', [Validators.required, Validators.pattern("[0-9]{11}")]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    }
    
    )
  }

  get f(){

    return this.form.controls;

  }

  

  submit()
  {
    this.insertSeeker();
  }

  insertSeeker():void
  {
    this.EmployerService.AddSeeker(this.seeker).subscribe(
    response =>
    {
      this.toastr.success("New jobseeker created","Registration successful");
      this.form.reset();
      this.router.navigateByUrl('welcome-page/login');
    },

    err=>
    {
      console.log(err);
    }
    );

    
  }

  

}