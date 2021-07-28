import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { Employer } from '../Models/Employer';
import { Jobseeker } from '../Models/Jobseeker';
import { RegistrationService } from '../registration.service';
import { JobpostService } from '../jobpost.service';
import { AppliedjobsService } from '../appliedjobs.service';
import { Job } from '../Models/Job';
import { Applyjobs } from '../Models/Applyjob';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

  counter1:boolean=false;
  counter2:boolean=false;
  showpro:boolean=false;
  editpro:boolean=false;
  pj:boolean=false;
  sj:boolean=false;
  list:boolean=false;
  showall:boolean=false;
  search:boolean=false;
  edit:boolean=false;

  jobid:number;
  userDetails:any={};
  employer:Employer[]=[];
  jobseeker:Jobseeker[]=[];

  joblists:Job[]=[];
  
  joblists1:Job[]=[];
  joblists2:Job[]=[];
  applylists:Applyjobs[]=[];

  job:Job=new Job();
  companyname:string;

  id:number;
  form: FormGroup = new FormGroup({});
  form1: FormGroup = new FormGroup({});

  constructor(private router: Router,private service:LoginService,private service1:RegistrationService,
    private fb: FormBuilder,private toastr: ToastrService,private service2:JobpostService,private service3:AppliedjobsService)
  {
    this.form = fb.group({
      companyName: '',     
      contactPerson: '',
      location: '',
      contactNumber: '',
      email: '',
      password: '',

     }),

     this.form1 = fb.group({
      jobTitle: '',     
      jobDescription: '',
      jobType: '',
      experience: '',
      salary: '',
      vacancy: '',
      qualification: '',
      skills: '',
      lastDate: '',
      location: '',

     })

  }

  ngOnInit()
  {
    this.loadprofile();
  }

  get f()
  {
    return this.form.controls;
  }

  loadprofile()
  {
    this.service.getEmpProfile().subscribe(
      (res: any) => {
        this. userDetails = res;
        this.id=this.userDetails.employersId;
        this.companyname=this.userDetails.companyName;

       
      },
      err => {
        console.log(err);
      },
    );
  }

  showseekerlist()
  {
   
   this.counter1=true;
   this.showpro=false;
   this.editpro=false;
   this.sj=false;
   this.list=false;
   this.showall=false;
   this.edit=false;

    this.service1.GetJ().subscribe(
      response => 
      {
      this.jobseeker= response;
      }
    ); 

   
  }


  showprofile()
  {
  
  this.loadprofile();
  this.showpro=true;
  this.counter1=false;
  this.editpro=false;
  this.sj=false;
  this.list=false;
  this.showall=false;
  this.edit=false;
   
  }

  editprofile()
  {

    this.editpro=true;
    this.showpro=false;

    this.counter1=false;
    this.sj=false;
    this.list=false;
    this.showall=false;
    this.edit=false;

   
    this.form.controls["companyName"].setValue(this.userDetails.companyName);  
    this.form.controls["contactPerson"].setValue(this.userDetails.contactPerson);      
    this.form.controls["location"].setValue(this.userDetails.location); 
    this.form.controls["contactNumber"].setValue(this.userDetails.contactNumber);  
    this.form.controls["email"].setValue(this.userDetails.email);      
    this.form.controls["password"].setValue(this.userDetails.password); 
  }


  editjob(j:Job)
  {
    this.editpro=false;
    this.showpro=false;
    this.counter1=false;
    this.sj=false;
    this.list=false;
    this.showall=false;
    this.edit=true;
    this.jobid=j.mapId;

    this.form1.controls["jobTitle"].setValue(j.jobTitle); 
    this.form1.controls["jobDescription"].setValue(j.jobDescription);
    this.form1.controls["jobType"].setValue(j.jobType); 
    this.form1.controls["experience"].setValue(j.experience);
    this.form1.controls["salary"].setValue(j.salary); 
    this.form1.controls["vacancy"].setValue(j. vacancy);
    this.form1.controls["qualification"].setValue(j.qualification); 
    this.form1.controls["skills"].setValue(j.skills);
    this.form1.controls["lastDate"].setValue(j.lastDate); 
    this.form1.controls["location"].setValue(j.location);

  }

  Update()
  {
    this.service2.edit(this.jobid,this.form1.value).subscribe(
      response =>
      {          
        this.form1.reset();
        
        this.toastr.success("Updated successfully");
      },
      err=>
      {
        console.log(err);
      })
  }

  

  submit()
  {
    this.service.editemp(this.userDetails.employersId,this.form.value).subscribe(
      response =>
      {
        this.form.reset();    
        this.toastr.success("Updated successfully");
      },
      err=>
      {
        console.log(err);
      })
  }



  deleteprofile()
  {

    if (confirm('Are you sure to delete this record?')) {
      this.service.removeemp(this.id)
        .subscribe(
          res => {
            
            this.toastr.success("Deleted successfully");
            this.onLogout();
          },
          err => { console.log(err) }
        )
    }
  }


postjob()
{
  this.pj=true;
  this.showpro=false;
  this.counter1=false;
  this.editpro=false;
  this.sj=false;
  this.list=false;
  this.showall=false;

}  

submit1()
{
 
  this.service2.postjobs(this.job).subscribe(
    response =>
    {
      this.form1.reset();     
      this.toastr.success("New job created");
  
     }
    );
}


showjobs()
  {   
    this.service2.ownjobs( this.companyname).subscribe(
      response => 
      {
      this.joblists= response;
      
      },
      err => {
        console.log(err);
      },
    );

    this.sj=true;
    this.pj=false;
    this.showpro=false;
    this.counter1=false;
    this.editpro=false;
    this.list=false;
    this.showall=false;

  }


  deletejob(i:number)
  {
    if (confirm('Are you sure to delete this record?')) {
      this.service2.removejob(i)
        .subscribe(
          res => {
            
            this.toastr.success("Deleted successfully");
            this.showjobs();
          },
          err => { console.log(err) }
        )
    }

    
  }
  //Applylist
  showapplications()
  { 
    this.service3.Applylist(this.companyname).subscribe(
      response => 
      {
      this.applylists= response;   
      },

      err => {
        console.log(err);
      },
    );

    this.list=true;
    this.sj=false;
    this.pj=false;
    this.showpro=false;
    this.counter1=false;
    this.editpro=false;
    this.showall=false;

  }

  createlink(lk:string)
  {
    return "http://localhost:5000/"+lk;
  }

  showalljobs()
  {
   
    this.list=false;
    this.sj=false;
    this.pj=false;
    this.showpro=false;
    this.counter1=false;
    this.editpro=false;
    this.showall=true;
    
  
      this.service2.empalljobs().subscribe(
        response => 
        {
        this.joblists1= response;
        
        },
        err => {
          console.log(err);
        },
      );
   
    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['welcome-page']);
  }
}
