import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  votes = [];

  constructor(private _userService: UserService, private _router: Router) {
    this.getVotes();
  }

  getVotes() {
    this._userService.getVotes()
      .subscribe(data => {
        this.votes = data;
        console.log(this.votes)
      }, err => {
        console.log(err)
      });
  }

  ngOnInit() {
  }

  logout() {
    this._userService.logout()
      .subscribe(data => {
        console.log(data);
        this._router.navigate(['/login'])
      }, err => {
        console.log(err);
      })
  }
}
