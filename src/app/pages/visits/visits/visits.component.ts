import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialog } from '@angular/material';

import { AuthService } from 'src/app/_services/auth.service';
import { Customer } from 'src/app/common/models/customer';
import { CreateVisitComponent } from '../create-visit/create-visit.component';
import { EditVisitComponent } from '../edit-visit/edit-visit.component';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private customer: Customer;
  private title = 'VISIT LIST';
  lineChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.getCustomer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCustomer() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.subscription.add(
        this.storeService.getCustomer(id)
        .subscribe(customer => {
          this.customer = customer;
          this.chargeChart();

        }, err => {
          Swal.fire('Error getting customer', `We can't get the customer`, 'error');
          console.error(err);
        })
      );
    });
  }

  private chargeChart() {
    const visits = this.customer.visits;
    visits.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      return 1;
    });
    const group = visits.reduce((r, a) => {
      if (r.length == 0) {
        r.push(0);
        r.push(a.visitTotal);
      }
      else {
        r.push(a.visitTotal + r[r.length - 1]);
      }
      return r;
    }, []);
    const values = [...Object.values(group)];
    const labels = Object.keys(group);
    this.lineChartData = [
      { data: values, label: 'USED ​​CREDIT' },
    ];
    this.lineChartLabels = labels;
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.storeService.removeVisit(id)
      .subscribe(isDeleted => {
        if (isDeleted == true) {
          Swal.fire('Deleted Visit', `the visit has been deleted`, 'success');
          this.getCustomer();
        }
      },
        err => {
          console.error(err);
        });
    }
  }

  createVisitDialog(): void {
    const dialogRef = this.dialog.open(CreateVisitComponent, {
      width: '600px',
      data: this.customer
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getCustomer();
    });
  }

  editVisitDialog(id: number): void {
    const dialogRef = this.dialog.open(EditVisitComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getCustomer();
    });
  }

}
