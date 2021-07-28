import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applyjobs } from './Models/Applyjob';
import { map } from './Models/map';

@Injectable({
  providedIn: 'root'
})
export class AppliedjobsService {

  constructor(private http: HttpClient) { }

  public Apply(mp:map):Observable<map>
  {
     return this.http.post<map>('http://localhost:5000/api/seekerprofile/Applyjobs',mp);
  }

  public Applylist(companyName:string):Observable<Applyjobs[]>
  {
    return this.http.get<Applyjobs[]>('http://localhost:5000/api/empprofile/fiterbyempid?CompanyName'+companyName);
  }

  public getallap():Observable< Applyjobs[]>
  {
   return this.http.get< Applyjobs[]>( 'http://localhost:5000/api/admin/GetAlljobsap');
  }

  public Applylist1(Name:string):Observable<Applyjobs[]>
  {
    return this.http.get<Applyjobs[]>('http://localhost:5000/api/seekerprofile/fiterbyseekername?Name'+Name);
  }


  


 
}
