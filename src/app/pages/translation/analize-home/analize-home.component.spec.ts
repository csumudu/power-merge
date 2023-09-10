import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizeHomeComponent } from './analize-home.component';

describe('AnalizeHomeComponent', () => {
  let component: AnalizeHomeComponent;
  let fixture: ComponentFixture<AnalizeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalizeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
