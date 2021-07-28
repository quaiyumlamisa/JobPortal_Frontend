import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobpostService } from '../jobpost.service';
import { LoginService } from '../login.service';
import { AppliedjobsService } from '../appliedjobs.service';
import { Files } from '../Models/Files';
import { Filedata } from '../Models/Filedata';
import { map } from '../Models/map';
import { HttpClient } from '@angular/common/http';
import { Job } from '../Models/Job';
import { Applyjobs } from '../Models/Applyjob';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent implements OnInit {

  

  public isCreate: boolean;
  public name: number;
  public fullname:string;

  public user: Filedata;
  public users: Files;
  public cvpath:string;
  public response: {dbPath: ''};


  joblists:Job[]=[];
  joblists1:Job[]=[];

  public param:map; 

  form: FormGroup = new FormGroup({});
  form1: FormGroup = new FormGroup({});


  constructor(private router: Router, private service:LoginService,private fb: FormBuilder,
             private toastr: ToastrService,private service1:JobpostService,private http: HttpClient,private service2:AppliedjobsService)
              { 
                this.form = fb.group({
                  fullname:"",
                  phoneNumber:"",
                  email:"",
                  password:""
              }),
              this.form1=fb.group({
                search:""
              })

             } 

  public progress: number;
  public message: string;
  public dbpath:string;

  userDetails:any={};
  applylists:Applyjobs[]=[];
  showpro:boolean=false;
  editpro:boolean=false;
  showjob:boolean=false;
  apc:boolean=false;
  
  nsearch:boolean=false;
  counter3:boolean=false;
  counter4:boolean=false;

  cv:boolean=false;
  id:number;
  data:any;
  job:string;


  @Output() public onUploadFinished = new EventEmitter();

  ngOnInit()
  {
    this.loadprofile();
    this.isCreate = true;
  }

  loadprofile()
  {
    this.service.getseekerProfile().subscribe(
      (res: any) => {
        this. userDetails = res;
        this.id=this.userDetails.jobSeekerId;
        this.fullname=this.userDetails.fullName;
      
      },
      err => {
        console.log(err);
      },
    );
  }           


  showprofile()
  {
  
    this.loadprofile();
    this.showpro=true;
    this.editpro=false;
    this.showjob=false;
    this.apc=false;
    this.counter3=false;
    this.counter4=false;
    this.nsearch=false;
    this.cv=false;
  }
  
  editprofile()
  {

    this.showpro=false;
    this.editpro=true;
    this.showjob=false;
    this.apc=false;
    this.counter3=false;
    this.counter4=false;
    this.nsearch=false;
    this.cv=false;
   
    this.form.controls["fullname"].setValue(this.userDetails.fullName);   
    this.form.controls["phoneNumber"].setValue(this.userDetails.phoneNumber);  
    this.form.controls["email"].setValue(this.userDetails.email);      
    this.form.controls["password"].setValue(this.userDetails.password); 
  }


  submit()
  {
    this.service.editproseeker(this.userDetails.jobSeekerId,this.form.value).subscribe(
      response =>
      {
        this.data=response;
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
      this.service.removeseekerprofile(this.id)
        .subscribe(
          res => {
            
            this.toastr.success("Deleted successfully");
            this.onLogout();
          },
          err => { console.log(err) }
        )
    }
  }

  uploadcv()
  {
       this.cv=true;
       this.showpro=false;
       this.editpro=false;
       this.showjob=false;
       this.apc=false;
       this.counter3=false;
       this.counter4=false;
       this.nsearch=false;


  }

  public onCreate = () => 
  {

    this.user =
     {
        jobSeekerId: this.id,
        filepath: this.response.dbPath   
     }

   
    this.http.post('http://localhost:5000/api/seekerprofile/upcvdata', this.user)
    .subscribe(res => {
      this.getUsers();
      this.isCreate = false;
    });
    }

    private getUsers = () => {
      this.http.get('http://localhost:5000/api/seekerprofile/getcv/'+this.id)
      .subscribe(res => {
        this.users = res as Files;
        this.cvpath="http://localhost:5000/"+ this.users.filepath;
      
      });
    }
    

    public returnToCreate = () => {
      this.isCreate = true;
      
    
    }

    public uploadFinished = (event) => {
      this.response = event;
    }
  
     createImgPath() 
     {
      console.log(`http://localhost:5000/`+this.cvpath);
     // return `http://localhost:5000/`+;
    }


    showjobs()
   {
      this.showpro=false;
      this.editpro=false;
      this.counter3=true;
      this.counter4=false;
      this.apc=false;
      this.cv=false;
    

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


  Search()
  {
    this.showpro=false;
    this.editpro=false;
    this.counter3=false;
    this.apc=false;
    this.counter4=true;
    this.cv=false;
    
    this.service1.GetS1(this.job).subscribe(
      response => 
      {
      this.joblists1= response;
      }
    );

  }


  apply(mpid:number)
  {
    this.param={
      mapid: mpid,
      seekerid: this.id
    };
    this.service2.Apply(this.param).subscribe(
      response =>
      {    
        this.toastr.success("Applied");
      },
      err=>
      {
        console.log(err);
      })
  }

    



  showapplications()
  {
    this.showpro=false;
    this.editpro=false;
    this.showjob=false;
    this.apc=true;
    this.counter3=false;
    this.counter4=false;
    this.cv=false;

    this.service2.Applylist1(this.fullname).subscribe(
      response => 
      {
      
      this.applylists= response;
      
      
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


