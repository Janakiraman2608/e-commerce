import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@e-commerce/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
