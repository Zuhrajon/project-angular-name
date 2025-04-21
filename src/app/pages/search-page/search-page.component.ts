import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { HttpClientModule } from '@angular/common/http';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from "./profile-filters/profile-filters.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [HttpClientModule, ProfileCardComponent, ProfileFiltersComponent, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles

  constructor () {
   
  }
}
