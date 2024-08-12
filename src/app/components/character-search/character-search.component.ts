import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-search.component.html',
  styleUrl: './character-search.component.scss',
})
export class CharacterSearchComponent {
  @Input() cantCharacters: number = 0;
  @Input() searchValue: string = '';
  @Output() onKeydownEnterEmit: EventEmitter<string> =
    new EventEmitter<string>();

  searchForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [this.searchValue],
    });
  }

  onKeydownEnter() {
    const searchValue = this.searchForm.get('search')?.value;
    this.onKeydownEnterEmit.emit(searchValue.trim());
  }
}
