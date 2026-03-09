import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  viewProviders:[{provide:ControlContainer,useExisting:FormGroupDirective}],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
  host: { class: 'block' }
})
export class FormInputComponent {

  @Input({required:true}) ControlName:string='';
  @Input({required:true}) type:string='';
  @Input({required:true}) id:string='';
  @Input({required:true}) labelText:string='';
  @Input({required:true}) control!:AbstractControl;
  changeType:string='password';
    toggleShowPassword() {

    this.changeType = this.changeType === 'password' ? 'text' : 'password';
  }
}
