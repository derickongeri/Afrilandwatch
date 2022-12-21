<template>
  <div class="q-my-none q-mt-none " style="
      max-width: 80%;
      left: 10%;
      border: 0px solid rgb(160, 160, 160);
      border-radius: 20px;
      position: relative;
    ">
    <canvas id="chartJSContainer" width="200" height="200"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js"

Chart.defaults.elements.arc.borderWidth = 0;
Chart.defaults.datasets.doughnut.cutout = '85%';

var chartInstance = new Chart(document.getElementById("chartJSContainer"), {
  type: 'doughnut',
  data: {
    labels: [
      'Label 1',
      'Label 2',
      'Label 3',
      'Label 4'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [22, 31, 26, 19],
      backgroundColor: [
        '#000000',
        '#ffff00',
        '#aaaaaa',
        '#ff0000'
      ]
    }]
  },

  plugins: [{
    afterUpdate: function(chart) {
      const arcs = chart.getDatasetMeta(0).data;

      arcs.forEach(function(arc) {
        arc.round = {
          x: (chart.chartArea.left + chart.chartArea.right) / 2,
          y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
          radius: (arc.outerRadius + arc.innerRadius) / 2,
          thickness: (arc.outerRadius - arc.innerRadius) / 2,
          backgroundColor: arc.options.backgroundColor
        }
      });
    },
    afterDraw: (chart) => {
      const {
        ctx,
        canvas
      } = chart;

      chart.getDatasetMeta(0).data.forEach(arc => {
        const startAngle = Math.PI / 2 - arc.startAngle;
        const endAngle = Math.PI / 2 - arc.endAngle;

        ctx.save();
        ctx.translate(arc.round.x, arc.round.y);
        ctx.fillStyle = arc.options.backgroundColor;
        ctx.beginPath();
        ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    }
  }]
});


// export default {
//   name: "BarChart",
//   components: { Doughnut },
//   props: {
//     chartOptions: {
//       type: Object,
//       default: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           datalabels: {
//             display: 'auto',
//             anchor: 'center',
//             align: 'center',
//             offset: 4,
//             opacity: 0.7,
//             formatter: (val, ctx) => {
//               // Grab the label for this value
//               const label = ctx.chart.data.labels[ctx.dataIndex];

//               // Format the number with 2 decimal places
//               const formattedVal = Intl.NumberFormat('en-US', {
//                 minimumFractionDigits: 1,
//               }).format(val);

//               // Put them together
//               return `${formattedVal} %`;
//             },
//             borderRadius: 5,
//             leftborderWidth: 2,
//             borderColor: ['#b71c1c', '#2e7d32', '#fff9b4'],
//             color: '#404040',
//             size: '8',
//             backgroundColor: '#fff',
//           },
//           legend: {
//             display: true,
//             position: "left",
//             labels: {
//               font: {
//                 fontColor: "#EEEEEE",
//               },
//               usePointStyle: true,
//               padding: 25
//             },
//           },
//           title: {
//             display: false,
//             align: 'start',
//             text: "Crop Area in Ha",
//             position: "top",
//             color: "#404040",
//           },
//         },
//       }
//     },
//     chartData: {
//       type: Object,
//       default: {
//         labels: ["Degraded", "new", "Improved", "Stable"],
//         datasets: [{
//           backgroundColor: ['#b71c1c','blue', '#2e7d32', '#fff9b4'],
//           borderColor: "rgba(0, 0, 0, 0)",
//           borderRadius: 0,
//           borderWidth: 0,
//           spacing: 0,
//           cutout: "75",
//           radius: "80%",
//           data: [15, 2, 30, 60]
//         }],
//       },
//       required: true
//     },
//     chartId: {
//       type: String,
//       default: 'Doughnut-chart'
//     },
//     width: {
//       type: Number,
//       default: 400
//     },
//     height: {
//       type: Number,
//       default: 300
//     },
//     cssClasses: {
//       default: '',
//       type: String
//     },
//     styles: {
//       type: Object,
//       default: () => { }
//     },
//     plugins: {
//       type: Array,
//       default: () => []
//     }
//   },
//   data() {
//     return {
//       // chartOptions: {
//       //   responsive: true,
//       //   plugins: {
//       //     legend: {
//       //       display: true,
//       //       position: "right",
//       //       labels: {
//       //         font: {
//       //           fontColor: "#EEEEEE",
//       //         },
//       //       },
//       //     },
//       //     title: {
//       //       display: false,
//       //       text: "Crop Area in Ha",
//       //       position: "left",
//       //       color: "#EEEEEE",
//       //     },
//       //   },
//       // },
//     };
//   },
// };
</script>
