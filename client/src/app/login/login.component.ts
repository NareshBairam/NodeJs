import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _userService: UserService, private _storage: StorageService) { }

  ngOnInit() {
  }

  moveToRegister() {
    this._router.navigate(['/register']);
  }

  login() {
    if (!this.loginForm.valid) {
      console.log("Invalid form")
      return
    } else {
      this._userService.login(JSON.stringify(this.loginForm.value))
        .subscribe(data => {
          var user = JSON.stringify(data);
          this._storage.set("userId", JSON.parse(user)["_id"]);
          var isAdmin = JSON.parse(user)["isAdmin"];
          if (isAdmin)
            this._router.navigate(['/admin']);
          else
            this._router.navigate(['/home']);
        },
          err => console.error(err))
      console.log(JSON.stringify(this.loginForm.value))
    }
  }

}
