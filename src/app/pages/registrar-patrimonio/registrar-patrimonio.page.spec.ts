import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPatrimonioPage } from './registrar-patrimonio.page';

describe('RegistrarPatrimonioPage', () => {
  let component: RegistrarPatrimonioPage;
  let fixture: ComponentFixture<RegistrarPatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
