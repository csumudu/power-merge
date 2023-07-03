import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEditorComponent } from './open-editor.component';

describe('OpenEditorComponent', () => {
  let component: OpenEditorComponent;
  let fixture: ComponentFixture<OpenEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
