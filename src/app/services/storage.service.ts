import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {  
  constructor(private router: Router, private tokenService: TokenService){}

  addToken(token: string): void {
    localStorage.setItem('jwt_', JSON.stringify(token));
    this.tokenService.decodeToken(token);
    let data = this.tokenService.getTokenDto();
    this.setUser(data);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('jwt_'));
  }

  setUser(data: any){
    this.setName(data.UserName);
    this.setRole(data.Roles);
    this.setId(data.IdUser);
    localStorage.setItem('user_', JSON.stringify(data));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user_'));
  }

  setName(name: any){
    localStorage.setItem('name_', JSON.stringify(name));
  }

  getName(): string {
    return JSON.parse(localStorage.getItem('name_'));
  }

  setRole(role: any){
    localStorage.setItem('role_', JSON.stringify(role));
  }

  getRole(): string {
    return JSON.parse(localStorage.getItem('role_'));
  }

  setId(id: any){
    localStorage.setItem('id_', JSON.stringify(id));
  }

  getId(): string {
    return JSON.parse(localStorage.getItem('id_'));
  }

  logoutUser(): void {
    this.clearStorage();
  }

  private clearStorage(): void {
    localStorage.clear();
  }
}
