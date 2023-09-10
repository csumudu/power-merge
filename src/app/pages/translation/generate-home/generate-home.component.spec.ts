import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateHomeComponent } from './generate-home.component';

describe('GenerateHomeComponent', () => {
  let component: GenerateHomeComponent;
  let fixture: ComponentFixture<GenerateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
