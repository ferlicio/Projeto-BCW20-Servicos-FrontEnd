import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelecaoClienteComponent } from './delecao-cliente.component';

describe('DelecaoClienteComponent', () => {
  let component: DelecaoClienteComponent;
  let fixture: ComponentFixture<DelecaoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelecaoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelecaoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
