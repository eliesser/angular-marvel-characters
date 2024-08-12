import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComicsComponent } from './character-detail-comics.component';

describe('CharacterDetailComicsComponent', () => {
  let component: CharacterDetailComicsComponent;
  let fixture: ComponentFixture<CharacterDetailComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailComicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
