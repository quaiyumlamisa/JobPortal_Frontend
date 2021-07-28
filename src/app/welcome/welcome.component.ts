import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JobpostService } from '../jobpost.service';
import { Job } from '../Models/Job';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  joblists:Job[]=[];

  constructor(private JoblistService:JobpostService)
  {
  }

  ngOnInit()
  {
    this.loadjobs();
  }
  
  loadjobs()
  {
    this.JoblistService.GetC().subscribe(
      response => 
      {
          this.joblists= response;
      },

      err =>
      {
          console.log(err);
      },
    );
  }

 

}

