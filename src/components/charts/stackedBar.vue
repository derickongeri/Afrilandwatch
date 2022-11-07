<template>
  <div class="q-my-none q-mt-none" style="
      max-width: 90%;
      border: 0px solid rgb(160, 160, 160);
      position: relative;
      left: 5%;
    ">
    <Bar :chartData="chartData" :chartOptions="chartOptions" :chart-data="chartData" :chart-id="chartId"
      :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
      :height="height" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartOptions: {
      type:Object,
      default: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          bar: {
            borderWidth: 0,
            inflateAmount: 0,
            borderRadius: { topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5 },
            borderSkipped: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: "",
            },
            grid: {
              color: "",
              opacity: 0.4,
              borderDash: [5, 2],
              drawBorder: true,
            },
          },
          y: {
            stacked: true,
            ticks: {
              callback: function (value) {
                value = value.toFixed();
                return `${value}`;
              },
              color: "",
              tickLength: 0,
              tickWidth: 0
            },
            grid: {
              color: "#9e9d24",
              opacity: 0.4,
              borderDash: [1, 10],
              drawBorder: false,
              tickLength: 0,
              tickWidth: 0
            },
          },
        },
        plugins: {
          datalabels: {
            display: false,
            anchor: 'center',
            align: 'center',
            offset: 0,
            opacity: 0.9,
            formatter: (val, ctx) => {
              // Grab the label for this value
              const label = ctx.chart.data.labels[ctx.dataIndex];

              // Format the number with 2 decimal places
              const formattedVal = Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
              }).format(val);

              // Put them together
              return `${formattedVal}`;
            },
            borderRadius: 5,
            leftborderWidth: 2,
            borderColor: ['#b71c1c', '#2e7d32', '#fff9b4'],
            color: '#404040',
            size: '6',
            backgroundColor: '',
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              font: {
                fontColor: "#EEEEEE",
              },
            },
          },
          title: {
            display: false,
            text: "Crop Area in Ha",
            position: "left",
            color: "#EEEEEE",
          },
        },
      }
    },
    chartData: {
      type: Object,
      default: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            backgroundColor: ["#b71c1c"],
            data: [30, 15, 18, 23, 29, 35],
            label: "Degraded",
            barPercentage: 0.5,
            categoryPercentage: 0.75,
          },
          {
            backgroundColor: ["#fff9b4"],
            data: [50, 70, 61, 57, 41, 45],
            label: "Stable",
            barPercentage: 0.5,
            categoryPercentage: 0.75,
          },
          {
            backgroundColor: ["#2e7d32"],
            data: [20, 15, 21, 20, 30, 20],
            label: "Improved",
            barPercentage: 0.5,
            categoryPercentage: 0.75,
          },
        ],
      },
    },
    chartId: {
      type: String,
      default: "bar-stacked",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 350,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => { },
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // chartOptions: {

      // },
    };
  },
};
</script>
