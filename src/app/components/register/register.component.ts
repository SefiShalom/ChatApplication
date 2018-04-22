import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  nickname: string;
  profilePicture: string;
  email: string;
  password: string;
  confirmPass: string;

  isFormValid: boolean;

  constructor(private registerService: RegisterService, private router: Router) {
    this.isFormValid = false;
    this.profilePicture = 'http://voice4thought.org/wp-content/uploads/2016/08/default2-1-1.jpg';
  }

  ngOnInit() {
  }

  register(){

    let registration = {
      name: this.firstName,
      last_name: this.lastName,
      nickname: this.nickname,
      email: this.email.toLowerCase(),
      profile_picture: this.profilePicture,
      password: this.password,
    }

    this.registerService.postRegistration(registration).subscribe(res => {
      if(res !== {}){
        console.log(res);
        this.router.navigate(['/']);
      }

    });
  }

  validateForm(){
  }

}
