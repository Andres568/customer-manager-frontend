import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Customer } from 'src/app/common/models/customer';
import { StoreService } from 'src/app/_services/store.service';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { AuthService } from 'src/app/_services/auth.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private title = 'CUSTOMER LIST';
  private customers: Customer[];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  @ViewChild('canvas', { static: false }) private chartRef;

  constructor(private storeService: StoreService,
    private authService: AuthService,
    public dialog: MatDialog,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subscription.add(
      this.storeService.getAllCustomers().subscribe(customers => {
        this.customers = customers;
        this.chargeChart();
      }
        , err => {
          Swal.fire('Error loading customers', `We can't load the customers`, 'error');
          console.error(err);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private chargeChart() {
    const group = this.customers.reduce((r, a) => {
      r[a.city.name] = r[a.city.name] && a.visits ? r[a.city.name] + a.visits.length : a.visits.length;
      return r;
    }, {});
    const values = Object.values(group);
    const labels = Object.keys(group);
    this.barChartData = [
      { data: values, label: 'VISITS PER CITY' }
    ];
    this.barChartLabels = labels;
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.storeService.removeCustomer(100)
        .subscribe(x => console.log(x),
          err => {
            // this.errores = err.error.errors as string[];
            console.error('Error code from backend: ' + err.status);
            console.error(err);
            console.error(err.error.errors);
          });
    }
  }

  createCustomerDialog(): void {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  editCustomerDialog(id: number): void {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
