import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './header/top-menu/top-menu.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { UserListComponent } from './container/user-list/user-list.component';
import { UserDetailComponent } from './container/user-detail/user-detail.component';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './container/search/search.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfileHighlightDirective } from './profile-highlight.directive';
import { LastLoginPipe } from './CustomDate.pipe';



const routes:Routes=[
  {path: '' , component:AuthComponent},
  {path: 'Home',component:UserListComponent},
  {path: 'Login',component:AuthComponent},
  {path: 'View-More/:id',component:UserDetailComponent},
  {path: 'About',component:UserDetailComponent},
  {path: 'Register',component:AuthComponent}
  // {path: 'About',component: }
]


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    HomeComponent,
    TopMenuComponent,
    MainMenuComponent,
    UserListComponent,
    UserDetailComponent,
    SearchComponent,
    AuthComponent,
    ProfileHighlightDirective,
    LastLoginPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
