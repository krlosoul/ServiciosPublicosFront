import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { IAuthenticationDto } from 'src/app/dtos/iauthentication-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit, OnDestroy {

  isEmailEmpty:boolean = false;
  emai: string = '';
  authenticationDto: IAuthenticationDto;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private tokenService: TokenService,
    private notification: NotificationService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {}

  ngOnDestroy() { }

  login() {
    if (this.ValidateInputs()) {
      this.handleAuthentication();
    }
    else{
      this.notification.Error('El correo es obligatorio.');
    }
  }

  private ValidateInputs(): boolean {
    this.isEmailEmpty = this.emai === '';
    return !this.isEmailEmpty;
  }

  private Authentication() {
    const data = {
      email: this.emai,
    };
    return this.authenticationService.Authentication(data);
  }

  private handleAuthentication() {
    this.Authentication().subscribe({
      next: (result) => {
        if (result) {
          this.authenticationDto = result;
          this.storageService.addToken(this.authenticationDto.token);          
          this.notification.Success(`Bienvenido ${this.storageService.getName()}`);
          this.router.navigate(['admin/welcome']);
        }
      }
    });
  }
}
