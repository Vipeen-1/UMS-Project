import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {

  isLogged:boolean = false;

  userProfile

  constructor(private _authService:AuthServiceService){
    this._authService.profileInfo.subscribe((res)=>{
      this.userProfile=res;
    })
  }

  ngOnInit(){
    this._authService.user.subscribe(res=>{
       this.isLogged= res ? true: false; 
    })
  }

  onSignOut(){
    this._authService.signOut();
  }

  OnRegisterClicked(){
    this.isLogged=false;
  }

}
