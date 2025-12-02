import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarPatrimonioPage } from './consultar-patrimonio.page';

describe('ConsultarPatrimonioPage', () => {
  let component: ConsultarPatrimonioPage;
  let fixture: ComponentFixture<ConsultarPatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
