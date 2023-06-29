import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listings } from '../types';

@Component({
  selector: 'app-listing-details-page',
  templateUrl: './listing-details-page.component.html',
  styleUrls: ['./listing-details-page.component.css'],
})
export class ListingDetailsPageComponent implements OnInit {
  isLoading: boolean = true;
  listing!: Listings;
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe((listing) => {
        this.listing = listing;
        this.isLoading = false;
      });
      this.listingsService
        .addViewsToListings(id)
        .subscribe(() => console.log('Your listing was viewed'));
    }
  }
}
