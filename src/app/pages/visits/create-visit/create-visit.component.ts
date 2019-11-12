import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Visit } from 'src/app/common/models/visit';
import { SalesRepresentative } from 'src/app/common/models/salesRepresentative';
import { Customer } from 'src/app/common/models/customer';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.scss']
})
export class CreateVisitComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private title = 'Create visit';
  private form: FormGroup;
  private salesRepresentatives: SalesRepresentative[];
  private customer: Customer;
  private errores: string[];

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) { }

  ngOnInit() {
    this.customer = this.data;
    this.form = this.formBuilder.group({
      date: ['', [Validators.required]],
      net: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      salesRepresentative: ['', [Validators.required]],
    });

    this.subscription.add(
      this.storeService.getAllSalesRepresentatives()
      .subscribe(salesRepresentatives => {
        this.salesRepresentatives = salesRepresentatives;
      },
        err => {
          Swal.fire('Error loading sales representatives', `We can't load thesales representatives`, 'error');
          console.error(err);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveVisit(visit: Visit) {
    visit.customer = this.data;
    this.storeService.addVisit(visit)
      .subscribe(isCreated => {
        if (isCreated) {
          Swal.fire('New Visit', `the customer has been created`, 'success');
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

  bySalesRepresentative(salesRepresentative1: SalesRepresentative, salesRepresentative2: SalesRepresentative) {
    return salesRepresentative1.name == salesRepresentative2.name;
  }

}
