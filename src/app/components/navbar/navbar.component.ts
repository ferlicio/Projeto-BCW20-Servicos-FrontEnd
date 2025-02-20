import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dataToken!: Date
  emailToken!: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataToken = this.authService.dataToken()
    this.emailToken = this.authService.emailToken();
  }
}
