import { Component,  ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showApps = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  goToCats() {
    this.router.navigate(['/cats']);
  }
  goToApps() {
    this.showApps = !this.showApps;
    this.cdr.detectChanges();
  }
}
