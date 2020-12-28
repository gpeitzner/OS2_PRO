import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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

  constructor(private data: DataService, private httpClient: HttpClient) {}

  ngOnInit(): void {}
}
