import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { hasTokenGuard } from './core/auth/guards/has-token-guard';
import { isLoginedGuard } from './core/auth/guards/is-logined-guard';
import { SuggestionsComponent } from './features/suggestions/suggestions.component';
import { DetailsComponent } from './features/details/details.component';
import { FriendsComponent } from './features/friends/friends.component';

export const routes: Routes = [
    {path:"" ,redirectTo:"login", pathMatch:"full"},
    {path:"" ,component:AuthLayoutComponent ,canActivate:[isLoginedGuard]
        ,children:[
        {path:"login" ,component:LoginComponent , title:"login page"},
        {path:"register", component:RegisterComponent , title:"register page"},
       

    ]},

    {path:"" ,component:MainLayoutComponent ,canActivate:[hasTokenGuard],
        children:[
        {path:"feed" ,component:FeedComponent , title:"feed page"},
        {path:"profile/:id" ,component:ProfileComponent , title:"profile page"},
        {path:"notification",component:NotificationComponent , title:"notification page"},
        {path:"changePassword",component:ChangePasswordComponent , title:"change password page"},
        {path:"suggestions",component:SuggestionsComponent , title:"suggestions page"},
        {path:"details/:id",component:DetailsComponent , title:"post details page"},
        {path:"friends/:id",component:FriendsComponent , title:"friends page"},
        {path: "**" ,component:NotFoundComponent , title:"not found page"}
    ]},
    
];
