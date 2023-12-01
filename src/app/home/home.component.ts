import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" (input)="filterResults(filter.value)" placeholder="Filter by city" #filter>
        <!-- <button (click)="filterResults(filter.value)" class="primary" type="button">Search</button> -->
      </form>
    </section>

    <section *ngIf="filteredLocationList" class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
    <section class="results">
      <p class="no-results" *ngIf="filteredLocationList.length === 0">No results found.</p>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(
    private housingService: HousingService
  ) { 
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(filter: string) {
    if(!filter){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation.city?.toLowerCase().includes(filter.toLowerCase())
    );
  }

}