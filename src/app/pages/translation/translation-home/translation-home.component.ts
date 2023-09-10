import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-translation-home',
  templateUrl: './translation-home.component.html',
  styleUrls: ['./translation-home.component.css'],
})
export class TranslationHomeComponent {
  menu = [
    {
      name: 'Analize',
      path: 'analize',
    },
    {
      name: 'Generate',
      path: 'generate',
    },
    {
      name: 'Compare',
      path: 'diff',
    },
  ];

  selectedMenu = this.menu[0];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSelect(itm: any) {
    this.selectedMenu = itm;
    //this.router.navigateByUrl("diff")
    this.router.navigate([itm.path], { relativeTo: this.route });
  }
}
