import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationComponent } from './add-translation.component';

describe('AddTranslationComponent', () => {
  let component: AddTranslationComponent;
  let fixture: ComponentFixture<AddTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTranslationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
