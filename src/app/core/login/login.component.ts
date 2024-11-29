import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule ,CommonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
private fb:FormBuilder = inject(FormBuilder);
private commonService:CommonService = inject(CommonService);
loginForm!: FormGroup;
isLoggedIn:boolean = false;

ngOnInit(): void {
  this.initForm();
}
initForm(){
  this.loginForm = this.fb.group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])]
  })
}

handleLoginClick(){
  if(this.loginForm.valid){
    this.isLoggedIn = true ;
   this.login(this.isLoggedIn)
  }
}

login(value:any){
  this.commonService.isLoggedIn$.next(value)
}


}
