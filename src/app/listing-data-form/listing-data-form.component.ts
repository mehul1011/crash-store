import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Listings } from '../types';

@Component({
  selector: 'app-listing-data-form',
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.css'],
})
export class ListingDataFormComponent {
  @Input('buttonText') buttonText!: string;
  @Input('listing') listing!: Listings;

  @Output()
  onSubmitEvent = new EventEmitter<Listings>();
  name: string = '';
  description: string = '';
  price: string = '';
  views: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.listing?.name;
    this.description = this.listing?.description;
    this.price = this.listing?.price.toString();
    this.views = this.listing?.views;
  }

  onSubmit(): void {
    this.onSubmitEvent.emit({
      id: <any>null,
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: this.views,
    });
    // alert('Creating your listing...');
    // this.router.navigateByUrl('/my-listings');
  }
}
