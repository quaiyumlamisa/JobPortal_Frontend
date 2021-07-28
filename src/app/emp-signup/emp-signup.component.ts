import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator } from './Confirmed.Validator';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

import { Employer } from '../Models/Employer';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css']
})
export class EmpSignupComponent 
{

  employers:Employer[]=[];
  employer:Employer=new Employer();

  form: FormGroup = new FormGroup({});
  
  constructor(private EmployerService:RegistrationService,private fb: FormBuilder,private router: Router,private toastr: ToastrService) 
  {
  
    this.form = fb.group({
      companyname: ['', [Validators.required]],    
      contactperson: ['', [Validators.required]],
      location: ['', [Validators.required]],
      mobileNumber:['', [Validators.required, Validators.pattern("[0-9]{11}")]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    }
    
    )
  }

  get f()
  {
    return this.form.controls;
  }

  submit()
  {
    this.insertEmployee();
  }

  insertEmployee():void
  {
    this.EmployerService.AddEmployee(this.employer).subscribe(
    response =>
    {
      this.form.reset();      
      this.toastr.success("New employer created","Registration successful");
      this.router.navigateByUrl('welcome-page/login');
    },

    err=>
    {
      console.log(err);
    }
    );  
  }
}