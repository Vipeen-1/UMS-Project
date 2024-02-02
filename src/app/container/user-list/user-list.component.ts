import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/Users';
import { UsersDataService } from 'src/app/service/users-data.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  filteredUser:User[]=[];

  isUserCreate:boolean = false;

  editMode: boolean = false;

  currentId: string = '';

  errorMsg:string='';

  searchText:string='';

  userForm: FormGroup;

  constructor(private userDataService: UsersDataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [null,[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/) ]],
      profile: [null,[Validators.required]],
      bio: [null,[Validators.required]],
      interests: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });

    this.getUser();

  }

  addForm(){
    this.isUserCreate = !this.isUserCreate;
  }

  //post user
  OnFormSubmit(users: {
    name: string;
    profile: string;
    bio: string;
    interests: string;
    role: string;
  }) {
    console.log(this.userForm.value);
    if (!this.editMode) {
      this.userDataService.createUser(users).subscribe((res) => {
        console.log(res);
        this.userForm.reset();

        this.onFetchUsers();

        this.isUserCreate=false;
      },(err)=>{this.errorMsg=err.error})
    }
    else {
      this.userDataService.UpdateUser(this.currentId, users).subscribe((res)=>{
        console.log(res);
        this.editMode = false;
        this.userForm.reset();

        this.onFetchUsers();

        this.isUserCreate=false;
      },(err)=>{this.errorMsg=err.error})
    }
  }


  //get user
  onFetchUsers() {
    this.getUser();
  }

  private getUser() {
    this.userDataService.getUser().subscribe((res) => {
      console.log(res)
      this.users = res;

      if(!this.searchText){
        this.filteredUser = this.users;
      }

    },(err)=>{
      console.log(err);
      this.errorMsg=err.error;
    })

  }

  //update user
  editForm(id:string) {
    this.isUserCreate=true;

    this.currentId = id;
    let currentUser = this.users.find((p) => { return p.id === id })

    this.userForm.setValue({
      name: currentUser.name,
      profile: currentUser.profile,
      bio: currentUser.bio,
      interests: currentUser.interests,
      role: currentUser.role
    })

    this.editMode = true;


  }


  //delete user
  onDeleteUser(id:string){
    const userResponse = window.confirm('Do you want to delete the user?');
    if(userResponse){
      this.userDataService.deleteUser(id).subscribe((res)=>{
        console.log(res);
        this.onFetchUsers();
      },(err)=>{this.errorMsg=err.error})
    }else{
      return
    }

  }

  onSearchByName(name:string){
    console.log('hello on search')
    this.searchText=name;

    this.userDataService.searchByName(name).subscribe((res)=>{
      console.log('hello on search functions')
      this.filteredUser=res;
    })
  }

  

}
