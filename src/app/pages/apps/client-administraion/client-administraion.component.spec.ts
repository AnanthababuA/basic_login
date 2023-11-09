import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdministraionComponent } from './client-administraion.component';

describe('ClientAdministraionComponent', () => {
  let component: ClientAdministraionComponent;
  let fixture: ComponentFixture<ClientAdministraionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAdministraionComponent]
    });
    fixture = TestBed.createComponent(ClientAdministraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
