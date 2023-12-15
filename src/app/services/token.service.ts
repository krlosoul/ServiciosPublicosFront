import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Itoken } from 'src/app/interfaces/itoken';

@Injectable()
export class TokenService {
    private token: Itoken | null = null;
    jwtService: JwtHelperService = new JwtHelperService();

    decodeToken(token: string): Itoken | null {
        try {
            this.token = this.jwtService.decodeToken(token) as Itoken;

            return this.token;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
    }

    getTokenDto(): Itoken | null {
        return this.token;
    }
}
