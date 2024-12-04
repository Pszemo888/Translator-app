import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTableTranslationComponent } from './editable-table-translations.component';

describe('EditableTableTranslationComponent', () => {
  let component: EditableTableTranslationComponent;
  let fixture: ComponentFixture<EditableTableTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableTableTranslationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTableTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
