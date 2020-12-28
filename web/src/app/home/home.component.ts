import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  games: Game[];

  constructor(
    public dataService: DataService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    if (!this.dataService.user) {
      this.router.navigateByUrl('/');
    }
    this.httpClient.get('http://104.154.97.177:8080/games').subscribe(
      (data: Game[]) => {
        this.games = data;
      },
      () => {}
    );
  }

  ngOnInit(): void {}

  exit(): void {
    this.dataService.user = null;
    this.router.navigateByUrl('/');
  }
}
