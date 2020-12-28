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
    this.updateCatalog();
  }

  ngOnInit(): void {}

  exit(): void {
    this.dataService.user = null;
    this.router.navigateByUrl('/');
  }

  updateCatalog(): void {
    this.httpClient.get('http://104.154.97.177:8080/games').subscribe(
      (data: Game[]) => {
        this.games = data;
      },
      () => {}
    );
  }

  download(game: Game): void {
    this.httpClient
      .put('http://104.154.97.177:8080/download/' + game._id, null)
      .subscribe(
        () => this.updateCatalog(),
        () => {}
      );
  }

  get(game: Game): void {
    this.httpClient
      .put('http://104.154.97.177:8080/user', {
        user: this.dataService.user._id,
        game: game._id,
      })
      .subscribe(
        () => this.dataService.user.games.push(game._id),
        () => {}
      );
  }
}
