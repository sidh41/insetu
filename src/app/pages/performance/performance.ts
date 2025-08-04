import { CommonModule } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';
// import { BaseChartDirective } from 'ng2-charts';
// import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-performance',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './performance.html',
  styleUrl: './performance.scss'
})

export class Performance implements OnInit {

  // @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;



  ngOnInit(): void { }

//   public barChartOptions: ChartConfiguration<'bar'>['options'] = {
//     scales: {
//       x: {},
//       y: {
//         min: 10,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//       // datalabels: {
//       //   anchor: 'end',
//       //   align: 'end',
//       // },
//     },
//   };

//   public barChartType = 'bar' as const;


//   // Pie
//   public pieChartOptions: ChartConfiguration['options'] = {
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//       // datalabels: {
//       //   formatter: (value, ctx) => {
//       //     if (ctx.chart.data.labels) {
//       //       return ctx.chart.data.labels[ctx.dataIndex];
//       //     }
//       //     return '';
//       //   },
//       // },
//     },
//   };
//   public pieChartData: ChartData<'pie', number[], string | string[]> = {
//     labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
//     datasets: [
//       {
//         data: [300, 500, 100],
//       },
//     ],
//   };
//   public pieChartType: ChartType = 'pie';


//   public barChartData: ChartData<'bar'> = {
//     labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
//     datasets: [
//       { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
//       { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
//     ],
//   };

//   // events
//   public chartClicked({
//     event,
//     active,
//   }: {
//     event?: ChartEvent;
//     active?: object[];
//   }): void {
//     console.log(event, active);
//   }

//   public chartHovered({
//     event,
//     active,
//   }: {
//     event?: ChartEvent;
//     active?: object[];
//   }): void {
//     console.log(event, active);
//   }

//   public randomize(): void {
//     console.log("randomize hello world ===>")
//     this.barChartData.datasets[0].data = [
//       Math.round(Math.random() * 100),
//       59,
//       80,
//       Math.round(Math.random() * 100),
//       56,
//       Math.round(Math.random() * 100),
//       40,
//     ];

//     this.chart?.update();
//   }
 }
