import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComicsCardComponent } from './character-detail-comics-card.component';

describe('CharacterDetailComicsCardComponent', () => {
  let component: CharacterDetailComicsCardComponent;
  let fixture: ComponentFixture<CharacterDetailComicsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailComicsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
