import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  Chart,
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

Chart.register(LineElement, LineController, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler, Legend);
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Dashboard implements AfterViewInit {
  ngAfterViewInit(): void {
    const canvas = document.getElementById('chart-line') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 230, 0, 50);
    gradient.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
    gradient.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
    gradient.addColorStop(0, 'rgba(94, 114, 228, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: '',
          tension: 0.4,
          borderColor: "#5e72e4",
          backgroundColor: gradient,
          borderWidth: 3,
          pointRadius: 0,
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              // borderDash: [5, 5]
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca3af', // light gray
              font: {
                size: 11,
                family: "Open Sans",
                style: 'normal',
                lineHeight: 2
              }
            }
          },
          x: {
            grid: {
              display: false,
              drawTicks: false,
              // borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '#9ca3af',
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: 'normal',
                lineHeight: 2
              }
            }
          }
        }
      }
    });
  }}
