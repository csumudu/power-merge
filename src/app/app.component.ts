import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  selectedRoute = '';

  constructor(private activateRoute: Router) {
    this.activateRoute.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        console.log('router-->', e);
        this.selectedRoute = e.urlAfterRedirects;
      });
  }

  allTabs = [
    {
      name: 'Merge',
      route: '/merge',
    },
    {
      name: 'Compare',
      route: '/compare',
    },
    {
      name: 'Translation',
      route: '/translation',
    },
    {
      name: 'Settings',
      route: '/settings',
    },
  ];
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
