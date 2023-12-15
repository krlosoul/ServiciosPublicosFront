import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { RolesEnum } from 'src/app/enums/roles.enum';

@Directive({
  selector: '[roles]'
})
export class RolesDirective implements OnInit {
  private allowedRoles: RolesEnum[];
  private roleToken;

  @Input() set roles(value: RolesEnum[]) {
    this.allowedRoles = value;
    this.updateView();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.roleToken = this.storageService.getRole();
    this.updateView();
  }

  private updateView(): void {
    const userHasRole = this.allowedRoles.includes(this.roleToken as RolesEnum);;
    if (userHasRole) {
      this.renderer.removeStyle(this.el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
