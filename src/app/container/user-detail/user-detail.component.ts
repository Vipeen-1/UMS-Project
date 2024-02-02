import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/Users';
import { UsersDataService } from 'src/app/service/users-data.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id:string='';
  detailedView:User[]=[];

  constructor(private userDataService:UsersDataService , 
              private router:ActivatedRoute){}

  ngOnInit(){
    this.router.params.subscribe((param)=>{
      this.id=param['id'];
      this.userDataService.ViewMore(this.id).subscribe((data)=>{
        this.detailedView = data;
      })
    })

  }

}
