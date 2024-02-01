import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/Users';
import { UsersDataService } from 'src/app/service/users-data.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[]=[];

  userForm: FormGroup;

  constructor(private userDataService: UsersDataService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [null],
      profile: [null],
      bio: [null],
      interests:[null],
      role: [null]
    });

    this.onGetUser();
    
  }


  //post user
  OnFormSubmit(users:{
    name:string;
    profile:string;
    bio:string;
    interests:string;
    role:string;
  }) {
    console.log(this.userForm.value);
    this.userDataService.createUser(users).subscribe((res)=>{
      console.log(res);
    })
  }


  //get user
  onGetUser(){
    this.userDataService.getUser().subscribe((res)=>{
      console.log(res)
      this.users=res;
    })
  }

  //update user
  

  //delete user

}
