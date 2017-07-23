import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorImagemComponent } from './editor-imagem.component';

describe('EditorImagemComponent', () => {
  let component: EditorImagemComponent;
  let fixture: ComponentFixture<EditorImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
