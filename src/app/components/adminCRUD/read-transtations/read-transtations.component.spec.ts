import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTranstationsComponent } from './read-transtations.component';

describe('ReadTranstationsComponent', () => {
  let component: ReadTranstationsComponent;
  let fixture: ComponentFixture<ReadTranstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadTranstationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadTranstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
