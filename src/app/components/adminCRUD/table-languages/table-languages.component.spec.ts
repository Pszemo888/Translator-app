import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLanguagesComponent } from './table-languages.component';

describe('TableLanguagesComponent', () => {
  let component: TableLanguagesComponent;
  let fixture: ComponentFixture<TableLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLanguagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
