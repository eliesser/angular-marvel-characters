import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters-list',
    loadComponent: () =>
      import('./components/characters-list/characters-list.component').then(
        (c) => c.CharactersListComponent
      ),
  },
  {
    path: 'characters-list/favorites',
    loadComponent: () =>
      import('./components/characters-list/characters-list.component').then(
        (c) => c.CharactersListComponent
      ),
  },
  {
    path: 'character/:id',
    loadComponent: () =>
      import('./components/character-detail/character-detail.component').then(
        (c) => c.CharacterDetailComponent
      ),
  },
  {
    path: '',
    redirectTo: 'characters-list',
    pathMatch: 'full',
  },
];
