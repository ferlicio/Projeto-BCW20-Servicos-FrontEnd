import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChamadosComponent } from './form-chamados.component';

describe('FormChamadosComponent', () => {
  let component: FormChamadosComponent;
  let fixture: ComponentFixture<FormChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
