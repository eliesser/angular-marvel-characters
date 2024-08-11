import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent {
  @Input() isFavorite: boolean = false;
  @Input() numberVisible: boolean = false;
  @Input() favoritesLength: number = 0;
  @Input() height: number = 24;
  @Input() width: number = 24;
}
