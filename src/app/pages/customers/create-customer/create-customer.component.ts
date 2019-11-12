import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from 'src/app/common/models/customer';
import { StoreService } from 'src/app/_services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Country } from 'src/app/common/models/country';
import { City } from 'src/app/common/models/city';
import { State } from 'src/app/common/models/state';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private title = 'Create customer';
  private form: FormGroup;
  private countries: Country[];
  private errores: string[];

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateCustomerComponent>) { }

  ngOnInit() {
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
    customer.availableCredit = customer.creditLimit;

    this.storeService.addCustomer(customer)
      .subscribe(isCreated => {
        if (isCreated) {
          Swal.fire('New Client', `the customer has been created`, 'success');
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
