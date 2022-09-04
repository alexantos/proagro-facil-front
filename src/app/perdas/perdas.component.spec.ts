import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdasComponent } from './perdas.component';

describe('PerdasComponent', () => {
  let component: PerdasComponent;
  let fixture: ComponentFixture<PerdasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerdasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
