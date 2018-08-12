import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  candidates = [];

  constructor(private _userService: UserService, private _router: Router, private _storage : StorageService) {
    this._userService.user()
      .subscribe(data => {
        console.log(data);
        this.getCandidates();
      }, err => {
        console.log(err);
        this._router.navigate(['/login']);
      })
  }

  getCandidates() {
    this._userService.getCandidates()
      .subscribe(data => {
        this.candidates = data;
        console.log(this.candidates)
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
        this._storage.clear();
        this._router.navigate(['/login'])
      }, err => {
        console.log(err);
      })
  }

  addVote(index) {
    var candidate = this.candidates[index];
    var userId = this._storage.get("userId");
    console.log("userid : " + userId);
    var body = {
      "userId" : userId,
      "candidateName" : candidate.name,
      "candidateId" :  candidate._id
    }
    this._userService.addVote(body)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
}
