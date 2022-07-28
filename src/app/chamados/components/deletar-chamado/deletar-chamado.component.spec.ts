import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarChamadoComponent } from './deletar-chamado.component';

describe('DeletarChamadoComponent', () => {
  let component: DeletarChamadoComponent;
  let fixture: ComponentFixture<DeletarChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
