import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-cat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
  catImageUrl: string = '';

  constructor(private catService: CatService, private cdr: ChangeDetectorRef) {
    this.loadNewCat();
  }

  loadNewCat() {
    this.catService.getRandomCat().subscribe(url => {
      this.catImageUrl = url;
      this.cdr.detectChanges();
    });
  }
}
