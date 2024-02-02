import { Component, OnInit } from '@angular/core';
import { UsersDataService } from './service/users-data.service';
import { AuthServiceService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ums-pro';

  constructor(private _authService:AuthServiceService ){}

  ngOnInit(){
    this._authService.autoSignIn();
  }

}
