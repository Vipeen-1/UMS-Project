import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/Users';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  api="https://user-proj-1-default-rtdb.firebaseio.com/user.json"

  constructor(private http:HttpClient) { }

  // create user
  createUser(user:{
    name:string;
    profile:string;
    bio:string;
    interests:string;
    role:string;
  }){
    return this.http.post<{ name: string }>(this.api,user);
  }

  //get user
  getUser(){
    return this.http.get<{[key:string]:User}>(this.api)
    .pipe(
      map((res)=>{
        const data=[];
        for(let key in res){
          if(res.hasOwnProperty(key)){
            data.push({...res[key], id:key})
          }
        }return data;
      }));
  }

  // update user
  UpdateUser(id:string,user:any){
    return this.http.put(`https://user-proj-1-default-rtdb.firebaseio.com/user/${id}.json`,user)
  }

  // delete user
  deleteUser(id:string){
    return this.http.delete(`https://user-proj-1-default-rtdb.firebaseio.com/user/${id}.json`)
  }


}
