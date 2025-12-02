import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePatrimonioPage } from './detalle-patrimonio.page';

describe('DetallePatrimonioPage', () => {
  let component: DetallePatrimonioPage;
  let fixture: ComponentFixture<DetallePatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
