import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        StorageService,
        TokenService,
        AuthenticationService,
        NotificationService,
      ],
      imports: [HttpClientModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call ValidateInputs when login is called', () => {
    spyOn(component as any, 'ValidateInputs');  // Indicamos explícitamente el tipo

    // Simulamos un valor en el email para pasar la validación
    component.emai = 'test@example.com';

    // Llamamos al método público que a su vez llama al método privado
    component.login();

    // Verificamos que el método privado fue llamado
    expect(component['ValidateInputs']).toHaveBeenCalled();
  });

  it('should set isEmailEmpty to true when ValidateInputs with empty email', () => {
    component.emai = '';
    
    // Llamamos directamente a ValidateInputs ya que es el método que queremos probar
    (component as any)['ValidateInputs']();  // Indicamos explícitamente el tipo

    expect(component.isEmailEmpty).toBe(true);
  });

  it('should set isEmailEmpty to false when ValidateInputs with a non-empty email', () => {
    component.emai = 'test@example.com';
    
    // Llamamos directamente a ValidateInputs ya que es el método que queremos probar
    (component as any)['ValidateInputs']();  // Indicamos explícitamente el tipo

    expect(component.isEmailEmpty).toBe(false);
  });
});
