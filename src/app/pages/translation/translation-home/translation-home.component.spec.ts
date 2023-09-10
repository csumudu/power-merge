import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationHomeComponent } from './translation-home.component';

describe('TranslationHomeComponent', () => {
  let component: TranslationHomeComponent;
  let fixture: ComponentFixture<TranslationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
