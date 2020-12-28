import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../user';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  loginEmail: string;
  loginPassword: string;

  signinEmail: string;
  signinPassword: string;
  signinConfirm: string;

  constructor(
    private dataService: DataService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.httpClient
      .post('http://104.154.97.177:8080/login', {
        email: this.loginEmail,
        password: this.loginPassword,
      })
      .subscribe(
        (data: User) => {
          this.dataService.user = data;
          this.router.navigateByUrl('/home');
        },
        () => {}
      );
  }

  signin(): void {
    if (
      this.signinEmail &&
      this.signinPassword &&
      this.signinPassword === this.signinConfirm
    ) {
      this.httpClient
        .post('http://104.154.97.177:8080/signin', {
          email: this.signinEmail,
          password: this.signinPassword,
        })
        .subscribe(
          (data: User) => {
            this.dataService.user = data;
            this.router.navigateByUrl('/home');
            console.log(this.dataService.user);
          },
          () => {}
        );
    }
  }
}
