import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { FormInputComponent } from "../../shared/ui/form-input/form-input.component";
import { ChangePasswordService } from './change-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, RouterLink, FormInputComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly fb= inject(FormBuilder);
  private readonly router= inject(Router);
  private readonly toastr= inject(ToastrService);
  private readonly changePasswordService= inject(ChangePasswordService);
  loading:boolean=false;
  errorMessage:string='';
  changePasswordForm:FormGroup= this.fb.group({
    password:['',[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    newPassword:['',[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword:['',Validators.required]
  },{validators:this.confirmPassword})



    confirmPassword(g: FormGroup) {
      const newPassword = g.get('newPassword')?.value;
      const confirmPassword = g.get('confirmPassword')?.value;
      if (newPassword !== confirmPassword && confirmPassword !== '') {
        g.get('confirmPassword')?.setErrors({ mismatch: true })
        return { misMatch: true }
      }
      return null
    }
    submitForm(){

      if (this.changePasswordForm.valid && !this.loading) {
        const body={ password: this.changePasswordForm.get('password')?.value,
          newPassword:this.changePasswordForm.get('newPassword')?.value}

          this.changePasswordfn(body)
      }
      else{
        this.changePasswordForm.markAllAsTouched();
      }
    }

    changePasswordfn(body:object){
        this.loading=true;
      this.changePasswordService.changePassword(body).subscribe({
        next:(res:any)=>{
        this.loading=false;
        localStorage.setItem('socialToken',res.data.token);
        this.router.navigate(['/feed'],{queryParams:{tab:'feed'}});
        this.toastr.success(res.message)
        
        },
        error:(err)=> {
          this.loading=false;
          this.errorMessage=err.error.message;
        },
      })
    }

}
