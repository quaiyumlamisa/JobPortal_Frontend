import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './Models/Job';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  constructor(private http: HttpClient) { }


  public GetC():Observable<Job[]>
  {
    return this.http.get<Job[]>('http://localhost:5000/api/admin/GetAlljobsh');
  }

  public GetS(jobtitle:string):Observable<Job[]>
  {
    return this.http.get<Job[]>('http://localhost:5000/api/admin/filterbytitle?JobTitle='+jobtitle);
  }

  public  ownjobs(companyname:string):Observable<Job[]>
  {
    return this.http.get<Job[]>('http://localhost:5000/api/empprofile/filterbycompanyname?CompanyName='+companyname);
  }

  public empalljobs():Observable<Job[]>
  {
    return this.http.get<Job[]>('http://localhost:5000/api/empprofile/GetAlljobs');
  }

  public GetS1(jobtitle:string):Observable<Job[]>
  {
    return this.http.get<Job[]>('http://localhost:5000/api/seekerprofile/fiterbyjobtitle?JobTitle='+jobtitle);
  }

  public postjobs(job:Job):Observable<Job>
 {
   return this.http.post<Job>('http://localhost:5000/api/empprofile/Postjobs',job);
 }

 public edit(id:number,formData:Job):Observable<Job>
 {
   return this.http.put<Job>('http://localhost:5000/api/empprofile/editjobs/'+id,formData);
 }

 public removejob(id:number):Observable<Job>
 {
   return this.http.delete<Job>('http://localhost:5000/api/empprofile/deletejobs/'+id);
 }


}
