import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionForm } from '../../../shared/interfaces/session-form.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(event: SessionForm) {
    console.log(event);
    this.router.navigate(['/auth/net-worth']);
  }
}
