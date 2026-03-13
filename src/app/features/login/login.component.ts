import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
errorMessage:string='';
  loading:boolean=false;
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    login:['',[Validators.required, Validators.minLength(2)]],
    
    password:['',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  })

toggleShowPassword(pass:HTMLInputElement){
  
  pass.type=pass.type==='password'?'text':'password';
}
  submitForm():void{    
    if(this.loginForm.valid && !this.loading)
    {
      
      this.loading=true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{          
         if (res.success) {
          localStorage.setItem('socialToken',res.data.token)
          localStorage.setItem('socialUser',JSON.stringify(res.data.user))
          localStorage.setItem('loginTime',Date.now().toString())
          

           this.router.navigate(['/feed']);
         }
        },
        error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
        this.loading=false;
        },
        complete:()=>{
          this.loading=false;
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }


}
