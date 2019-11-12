import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { StoreService } from 'src/app/_services/store.service';
import { Visit } from 'src/app/common/models/visit';
import { SalesRepresentative } from 'src/app/common/models/salesRepresentative';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-visit',
  templateUrl: '../create-visit/create-visit.component.html',
  styleUrls: ['../create-visit/create-visit.component.scss']
})
export class EditVisitComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private title = 'Edit visit';
  private form: FormGroup;
  private visitId: number;
  private salesRepresentatives: SalesRepresentative[];
  private errores: string[];

  constructor(private storeService: StoreService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.visitId = this.data;
    this.form = this.formBuilder.group({
      date: ['', [Validators.required]],
      net: ['', [Validators.required, Validators.min(0)]],
      visitTotal: ['', [Validators.required,]],
      description: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      salesRepresentative: ['', [Validators.required]],
    });

    this.storeService.getVisit(+this.visitId)
      .pipe(
        take(1)
      )
      .subscribe(visit => {
        this.form = this.formBuilder.group({
          date: [visit.date, [Validators.required]],
          net: [visit.net, [Validators.required, Validators.min(0)]],
          visitTotal: [visit.visitTotal, [Validators.required,]],
          description: [visit.description, [Validators.required]],
          customer: [visit.customer, [Validators.required]],
          salesRepresentative: [visit.salesRepresentative, [Validators.required]],
        });
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
    this.storeService.updateVisit(visit)
    .subscribe(isUpdated => {
      if (isUpdated) {
        Swal.fire('Updated Visit', `the visit has been updated`, 'success');
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
