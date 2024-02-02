import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/Users';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  api="https://user-proj-1-default-rtdb.firebaseio.com/user.json";

  apiKey="AIzaSyCiraRFPtfR4bc4_-BTDqRr4jzZkdK7jOg";

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

  //view more
  ViewMore(id){
    return this.http.get<any>(`https://user-proj-1-default-rtdb.firebaseio.com/user/${id}.json`)
  }

  //search by name
  searchByName(name){
    return this.http.get(this.api).pipe(
      map((res)=>{
        let data=[];
        for(let key in res){
          if(res.hasOwnProperty(key)){
            data.push({...res[key], id:key})
          }
        }
        return data;
      })
    ).pipe(
      map((user)=>{
        if(Array.isArray(user)){
          return user.filter((p)=>{
            return (p.name.toLowerCase().includes(name.toLowerCase()) || p.interests.toLowerCase().includes(name.toLowerCase()))
          })
        }else{
          return [];
        }

      })
    )
  }


}
