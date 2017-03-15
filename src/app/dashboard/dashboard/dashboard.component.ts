import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdlLayoutComponent } from 'angular2-mdl/components';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('layoutDashboard') layoutDashboard: MdlLayoutComponent;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        // Close sidebar on route change
        this.layoutDashboard.closeDrawer();
      });
  }

}
