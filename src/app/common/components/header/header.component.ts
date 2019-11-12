import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onToggleOpenSidenav() {
    this.SideNavigationToggle.emit();
  }

  onLogOut() {
    this.authService.logout();
  }

}
