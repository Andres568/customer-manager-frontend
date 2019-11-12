import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from 'src/app/common/models/customer';
import { take } from 'rxjs/operators';
import { Country } from 'src/app/common/models/country';
import { State } from 'src/app/common/models/state';
import { City } from 'src/app/common/models/city';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  templateUrl: '../create-customer/create-customer.component.html',
  styleUrls: ['../create-customer/create-customer.component.scss']
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private title = 'Edit customer';
  private form: FormGroup;
  private customerId: number;
  private countries: Country[];
  private errores: string[];

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.customerId = this.data;
    this.form = this.formBuilder.group({
      nit: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      creditLimit: ['', [Validators.required, Validators.min(0)]],
      visitsPercentage: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

    this.storeService.getCustomer(+this.customerId)
      .pipe(
        take(1)
      )
      .subscribe(customer => {
        console.log(customer);
        this.form = this.formBuilder.group({
          id: [customer.id],
          nit: [customer.nit, [Validators.required]],
          fullName: [customer.fullName, [Validators.required]],
          address: [customer.address, [Validators.required]],
          phone: [customer.phone, [Validators.required]],
          creditLimit: [customer.creditLimit, [Validators.required, Validators.min(0)]],
          availableCredit: [customer.availableCredit],
          visitsPercentage: [customer.visitsPercentage, [Validators.required, Validators.min(0), Validators.max(1)]],
          country: [customer.country, [Validators.required]],
          state: [customer.state, [Validators.required]],
          city: [customer.city, [Validators.required]],
          visits: [customer.visits],

        });
      });
    this.subscription.add(
      this.storeService.getAllCountries()
        .subscribe(countries => {
          this.countries = countries;
        },
          err => {
            Swal.fire('Error loading countries', `We can't load the countries`, 'error');
            console.error(err);
          })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveCustomer(customer: Customer) {
    this.storeService.updateCustomer(customer)
      .subscribe(isUpdated => {
        if (isUpdated) {
          Swal.fire('Updated Client', `the customer has been updated`, 'success');
          this.onDialogBack();
        }
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Error code from backend: ' + err.status);
          console.error(err.error.errors);
        });
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

  byCountry(country1: Country, country2: Country) {
    return country1.name == country2.name;
  }
  byState(state1: State, state2: State) {
    return state1.name == state2.name;
  }
  byCity(city1: City, city2: City) {
    return city1.name == city2.name;
  }

}
