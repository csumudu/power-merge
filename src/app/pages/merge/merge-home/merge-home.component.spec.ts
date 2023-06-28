import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeHomeComponent } from './merge-home.component';

describe('MergeHomeComponent', () => {
  let component: MergeHomeComponent;
  let fixture: ComponentFixture<MergeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
