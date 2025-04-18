import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: ' <svg class="icon" xmlns="http://www.w3.org/2000/svg">\n' +
    '      <use [attr.href]="href" [attr.xlink:href]="href"></use>\n' +
    '    </svg>',
  styles: ['']
})
export class SvgIconComponent {
  @Input() icon = ''

  get href() {
    return `assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
