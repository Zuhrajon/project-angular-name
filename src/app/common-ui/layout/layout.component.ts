import {Component, inject, OnInit} from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService)

  ngOnInit() {
    console.log('ngOnInit');
    this.profileService.getMe().subscribe( val => {
      console.log(val);

    })
  }
}
