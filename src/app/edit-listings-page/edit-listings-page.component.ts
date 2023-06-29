import { Component, OnInit } from '@angular/core';
import { Listings } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';
@Component({
  selector: 'app-edit-listings-page',
  templateUrl: './edit-listings-page.component.html',
  styleUrls: ['./edit-listings-page.component.css'],
})
export class EditListingsPageComponent implements OnInit {
  saveChanges: string = 'Save Changes';
  listing!: Listings;

  constructor(
    private listingsService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe((listing) => {
        this.listing = listing;
        console.log(listing);
      });
    }
  }

  onSubmit(listingData: Listings): void {
    this.listingsService
      .editListing(
        this.listing.id,
        listingData.name,
        listingData.description,
        listingData.price
      )
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
