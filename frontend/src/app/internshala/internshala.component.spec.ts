import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshalaComponent } from './internshala.component';

describe('InternshalaComponent', () => {
  let component: InternshalaComponent;
  let fixture: ComponentFixture<InternshalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
