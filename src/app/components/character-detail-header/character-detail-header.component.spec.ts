import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailHeaderComponent } from './character-detail-header.component';

describe('CharacterDetailHeaderComponent', () => {
  let component: CharacterDetailHeaderComponent;
  let fixture: ComponentFixture<CharacterDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
