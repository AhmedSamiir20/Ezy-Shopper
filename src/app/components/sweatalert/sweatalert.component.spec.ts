import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweatalertComponent } from './sweatalert.component';

describe('SweatalertComponent', () => {
  let component: SweatalertComponent;
  let fixture: ComponentFixture<SweatalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweatalertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SweatalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
