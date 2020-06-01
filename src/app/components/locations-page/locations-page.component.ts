import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/Location';
import { environment } from 'src/environments/environment';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {

  public allLocations: Location[];
  public locationsToDisplay: Location[];
  public IsSearchActive: boolean = false ;
  public txtNearbyLocations: string = "";  

  private readonly UPLOADED_FILES_DIR = environment.apiUrl + '/uploadedfiles/';

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.get().subscribe((locations: Location[]) => {
      this.allLocations = locations;
      this.locationsToDisplay = locations
    });        
  }

  public getLocationPicturePath(location: Location): string {
    return location.picturePath != null ? 
      this.UPLOADED_FILES_DIR + location.picturePath : 
      '/assets/img/default-location-img.png'
  }

  public txtAddress_OnChange(address: Address) {
    this.locationService.getNearby(address).subscribe(
      (locations) => {
        this.locationsToDisplay = locations;
        this.IsSearchActive = true;
      },
      (error) => {
        console.log("Error getting nearby locations: ", error);
      }
    );
  }

  public btnClearResults_Click() {
    this.IsSearchActive = false;
    this.locationsToDisplay = this.allLocations;
    this.txtNearbyLocations = "";      
  }
}