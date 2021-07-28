import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { JobpostService } from '../jobpost.service';
import { AppliedjobsService } from '../appliedjobs.service';
import { Employer } from '../Models/Employer';
import { Router } from '@angular/router';
import { Jobseeker } from '../Models/Jobseeker';
import { Job } from '../Models/Job';
import { Applyjobs } from '../Models/Applyjob';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent  {

  form: FormGroup = new FormGroup({});
  constructor(private router: Router,private service:RegistrationService,private toastr: ToastrService,private service1:JobpostService,
    private fb: FormBuilder,private service2: AppliedjobsService)
  {
    this.form=fb.group({
      search:""
    })

  }
  counter1:boolean=false;
  counter2:boolean=false;
  counter3:boolean=false;
  counter4:boolean=false;
  counter5:boolean=false;

  employer:Employer[]=[];
  jobseeker:Jobseeker[]=[];
  joblists:Job[]=[];
  joblists1:Job[]=[];
  applicants:Applyjobs[]=[];
  job:string;

  

  showseekerlist()
  {
    this.counter1=true;
    this.counter2=false;
    this.counter3=false;
    this.counter4=false;
    this.counter5=false;
   
    this.service.GetJ().subscribe(
      response => 
      {
      this.jobseeker= response;
      }
    );
  }


  showemplist()
  {
    this.counter2=true;
    this.counter1=false;
    this.counter3=false;
    this.counter4=false;
    this.counter5=false;
    
    this.service.Get().subscribe(
      response => 
      {
      this.employer= response;
      }
    );
  }


  deleteDataj(id:number) 
  {

    if (confirm('Are you sure to delete this record?')) {
      this.service.removej(id)
        .subscribe(
          res => {
           
            this.showseekerlist();
            this.toastr.success("Deleted successfully");
          },
          err => { console.log(err) }
        )
    }
  }

  deleteDataem(id:number) 
  {

    if (confirm('Are you sure to delete this record?')) {
      this.service.remove(id)
        .subscribe(
          res => {
           
            this.showemplist();
            this.toastr.success("Deleted successfully");
          },
          err => { console.log(err) }
        )
    }
  }

  showjobs()
  {
    this.counter3=true;
    this.counter2=false;
    this.counter1=false;
    this.counter4=false;
    this.counter5=false;

    this.service1.GetC().subscribe(
      response => 
      {
      this.joblists= response;
      
      },
      err => {
        console.log(err);
      },
    );
  }


  submit()
  {
    this.service1.GetS(this.job).subscribe(
      response => 
      {
      this.joblists1= response;
      this.counter1=false;
      this.counter2=false;
      this.counter3=false;
      this.counter4=true;
      this.counter5=false;


      }
    );
  }

  createlink(lk:string)
  {
    return "http://localhost:5000/"+lk;
  }

  showapplicants()
  {
    this.counter1=false;
    this.counter2=false;
    this.counter3=false;
    this.counter4=false;
    this.counter5=true;
    
    this.service2. getallap().subscribe(
      response => 
      {
      this.applicants= response;
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['welcome-page']);
  }

}
