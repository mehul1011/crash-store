import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listings } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  email: string = '';
  message: string = '';
  listing!: Listings;

  constructor(
    private listingService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingService.getListingById(id).subscribe((listing) => {
        this.listing = listing;
        this.message = `Hi! I am interested in your ${this.listing.name.toLowerCase()} listing.`;
      });
    }
  }

  sendMessage(): void {
    alert('Your message has been send');
    this.router.navigateByUrl('/listings');
  }
}
