import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listings } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-new-listings-page',
  templateUrl: './new-listings-page.component.html',
  styleUrls: ['./new-listings-page.component.css'],
})
export class NewListingsPageComponent implements OnInit {
  listing!: Listings;
  constructor(
    private listingsService: ListingsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(listingData: Listings): void {
    this.listingsService
      .createListing(
        listingData.name,
        listingData.description,
        listingData.price
      )
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
