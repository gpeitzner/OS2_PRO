import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public dataService: DataService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    if (!this.dataService.user) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {}

  exit(): void {
    this.dataService.user = null;
    this.router.navigateByUrl('/');
  }
}
