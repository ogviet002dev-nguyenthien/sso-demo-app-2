import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  private isValidToken?: boolean;
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authServices.isLoggedInOnServer().subscribe((result) => {
      this.isValidToken = result;
      if (!this.isValidToken) {
        window.location.assign(environment.loginURL);
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  navigateToDashboard() {
    window.location.assign(environment.loginURL);
  }
}
