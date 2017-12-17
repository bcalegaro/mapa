import { Injectable } from '@angular/core';
import * as Chartist from "chartist";

import Chart from "chart.js";


@Injectable()
export class ChartService {
  // For reconfigure proportional max bar
  private tickValue = 5;
  // Chart index and values
  public indicesNumeros: Array<string>;
  public valorNumeros: Array<number>;
  public totalNumeros: number;
  // Chart configurations and values
  private barChartData: any[];
  private barChartLabels: string[];
  // Configurações gerais do gráfico
  private barChartOptions: any;

  // Mychart instance
  private myChart: any;

  // Charts colors from pallete
  red = "#f44336";
  orange = "#ff9800";
  yellow = "#fec60a";
  green = "#4caf50";
  blue400 = "#42a5f5";
  indigo600 = "#3949ab";
  purple = "#9c27b0";
  pink = "#e91e63";
  gold = "#ffc107";

  constructor() { }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq2 = 0;
  }

  // Function to show and update chart
  init() {

    const numberChartData = {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ],
      series: [[10, 10, 10, 10, 10, 10, 10, 10, 10]]
    };
    const options = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 20,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }
      ]
    ];
    const numberChart = new Chartist.Bar(
      "#emailsSubscriptionChart",
      numberChartData,
      options,
      responsiveOptions
    );

    // start animation for the Chart
    this.startAnimationForBarChart(numberChart);
  }

  setTick(value: number) {
    this.tickValue = value;
  }

  configureChart() {
    this.setDefaultFontColor();
    this.setDefaultData();
    this.setDefaultOptions();
    this.setDefaultValues();
  }

  setDefaultFontColor() {
    Chart.defaults.global.defaultFontColor = "#000000";
  }

  setDefaultData() {
    this.barChartData = [{
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        this.red,
        this.orange,
        this.yellow,
        this.green,
        this.blue400,
        this.indigo600,
        this.purple,
        this.pink,
        this.gold]
    }];
  }

  setDefaultLabels() {
    this.barChartLabels = ["0%", "0%", "0%", "0%", "100%", "0%", "0%", "0%", "0%"];
  }

  setDefaultOptions() {
    this.barChartOptions = {
      legend: {
        display: false
      },
      events: [],
      // Remove a barra do eixo Y e deixa a do eixo X
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            max: 100,
            beginAtZero: true,
            stepSize: 10
          }
        }],
      },
      // Animação para colocar texto em cima das barras
      animation: {
        duration: 1,
        onComplete: function () {
          const chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(32, "bold", Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
            const backgroundColor = [
              "#f44336",
              "#ff9800",
              "#fec60a",
              "#4caf50",
              "#42a5f5",
              "#3949ab",
              "#9c27b0",
              "#e91e63",
              "#ffc107"];
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              ctx.fillStyle = backgroundColor[index];
              if (dataset.data[index] === 0) {
                ctx.fillText("", bar._model.x, bar._model.y);
              } else {
                ctx.fillText(index + 1, bar._model.x, bar._model.y + 5);
              }
            });
          });
        }
      }
    };
  }

  setDefaultValues() {
    let i;
    this.indicesNumeros = new Array<string>();
    this.valorNumeros = new Array<number>();
    for (i = 1; i < 10; i++) {
      this.indicesNumeros.push(i);
      this.valorNumeros.push(i);
    }
    this.totalNumeros = 20;
  }

  createChart(canvas) {
    this.configureChart();
    this.myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData
      },
      options: this.barChartOptions
    });
  }

  updateChart(indicesNumeros: Array<string>, valorNumeros: Array<number>, totalNumeros: number) {
    // Prepara os novos valores a ser adicionados
    const newData = new Array<any>();
    const newLabel = new Array<any>();
    let total = 0;
    for (const valor of valorNumeros) {
      total = total + +valor;
    };
    for (const valor of valorNumeros) {
      const x = Math.round(valor * 100 / total);
      newData.push(x);
      newLabel.push(x + "%");
    };
    // Assinala os valores do gráfico
    this.myChart.data.datasets[0].data = newData;
    this.myChart.data.labels = newLabel;
    this.totalNumeros = total;
    // Configura o tamanho do gráfico
    const yAxesMAX = Math.max.apply(Math, newData) + this.tickValue;
    this.myChart.options.scales.yAxes[0].ticks.max = yAxesMAX;
    // Reinicia o gráfico
    this.myChart.update();
  }


}
