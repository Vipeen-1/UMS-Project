import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { ErrServiceService } from '../service/err-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../auth_interface/auth-response';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  
  loginMode:boolean=true;
  loggedIn?: boolean;

  authForm:FormGroup;

  constructor(private fb:FormBuilder,
              private _authService :AuthServiceService,
              private _errService:ErrServiceService,
              private router:Router,
              private activateRoute:ActivatedRoute
               ){}

  errorMessage:string='';

  ngOnInit(){

    this._authService.user.subscribe((res)=>{
      if(res){
        this.router.navigate(['Home'])
      }
    })

    this.authForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })

    this.activateRoute.queryParamMap.subscribe(res=>{
      let qParams = res.get('SignUp')

      if(qParams){
        this.loginMode=false;
      }else{
        this.loginMode=true;
      }

    })

  }

  onLogModeChange(){
    this.loginMode = !this.loginMode;
    this.authForm.reset();
  }

  onFormSubmit(){

    const email= this.authForm.value.username;
    console.log(email)
    const password= this.authForm.value.password;

    let authObservable: Observable<AuthResponse>

    if(this.loginMode){
      authObservable = this._authService.signIn(email,password)
    }else{
      authObservable = this._authService.signUp(email,password)
    }

    authObservable.subscribe((res)=>{
      console.log('auth componenet: ',res)
      if(res.registered){
        alert('Successfully Logged In!')
        this.router.navigate(['Home'])
      }
      // console.log(res)
    }
    ,err=>{
      console.log(err)
      this.errorMessage= err;

      alert('An Error Occured: '+ this.errorMessage)
      
    });
  }

  onEmptyFormSubmit(){
    if(this.authForm.invalid){
      console.log('helloooooooo')
      alert('Please Enter Username and Password!!')
    }
  }




}
