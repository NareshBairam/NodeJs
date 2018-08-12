import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this._router.navigate(['/login']);
  }

  register() {
    if (!this.registrationForm.valid || (this.registrationForm.controls.password.value != this.registrationForm.controls.confirmPassword.value)) {
      console.log("Invalid form")
      return;
    } else {
      this._userService.register(JSON.stringify(this.registrationForm.value))
        .subscribe(data => {
          console.log(data)
          this._router.navigate(['/login']);
        },
          err => console.error(err))
      //console.log(JSON.stringify(this.registrationForm.value))
    }
  }

}
