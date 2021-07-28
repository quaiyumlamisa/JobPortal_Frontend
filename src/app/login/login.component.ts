import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from '../Models/Log';
import { LoginService } from '../login.service';
import jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logs:Log[]=[];
  log:Log=new Log();
  currentuser:any=
  {
    role:null,
  };

  form: FormGroup = new FormGroup({});
  constructor(private LoginService:LoginService,private fb: FormBuilder, private router: Router, private toastr: ToastrService)
  {
  
    this.form = fb.group
    ({
     
      email:['', [Validators.required]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]]
    
    })
  }

    get f()
    {
      return this.form.controls;  
    }

    submit()
    {
      this.check(); 
    }
  
    check():void
    {
      this.LoginService.Login(this.log).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(res.token);       
          this.currentuser.role=decodedToken.role;
         
  
           if(decodedToken.role=="Employer")
           {         
               this.router.navigateByUrl('employerdashboard'); 
           }
            

           else if(decodedToken.role=="Admin")
           {
               this.router.navigateByUrl('admindashboard'); 
           }

           else if(decodedToken.role=="Jobseeker")
           {
               this.router.navigateByUrl('Jobseekerdashboard');           
           }
           
        },
        err => {
          if (err.status == 400)
            this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          else
            console.log(err);
        }
      );
    }
      
    
  
    
  
  }  



