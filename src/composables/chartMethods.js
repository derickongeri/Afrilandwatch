export default function setChartMethods() {

  const stackBarChart = function (val) {
    let stackOption = val;

    let chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderWidth: 0,
          inflateAmount: 0,
          borderRadius: {
            topLeft: 5,
            topRight: 5,
            bottomLeft: 5,
            bottomRight: 5,
          },
          borderSkipped: false,
        },
      },
      scales: {
        x: {
          stacked: stackOption,
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
          stacked: stackOption,
          ticks: {
            callback: function (value) {
              value = value.toFixed();
              return `${value}`;
            },
            color: "",
            tickLength: 0,
            tickWidth: 0,
          },
          grid: {
            color: "#9e9d24",
            opacity: 0.4,
            borderDash: [1, 10],
            drawBorder: false,
            tickLength: 0,
            tickWidth: 0,
          },
        },
      },
      plugins: {
        datalabels: {
          display: false,
          anchor: "center",
          align: "center",
          offset: 0,
          opacity: 0.9,
          formatter: (val, ctx) => {
            // Grab the label for this value
            const label = ctx.chart.data.labels[ctx.dataIndex];

            // Format the number with 2 decimal places
            const formattedVal = Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
            }).format(val);

            // Put them together
            return `${formattedVal}`;
          },
          borderRadius: 5,
          leftborderWidth: 2,
          borderColor: ["#b71c1c", "#2e7d32", "#fff9b4"],
          color: "#404040",
          size: "6",
          backgroundColor: "",
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
    };

    return chartOptions
  };

  const exportChartAsImg = function (chartType) {
    let elementIdname = null;
    switch (chartType) {
      case "pie":
        elementIdname = "pie-chart";
        break;
      case "bar":
        elementIdname = "bar-chart";
        break;
      case "stackedBar":
        elementIdname = "bar-stacked";
        break;
      case "line":
        elementIdname = "line-chart";
        break;
      default:
        elementIdname = "bar-chart";
    }

    let chartURL = document
      .getElementById(elementIdname)
      .toDataURL("image/png");

    let a = document.createElement("a");
    a.href = chartURL;
    a.download = "image-export.png";
    a.click();
    a = null;
  };

  return {
    exportChartAsImg,
    stackBarChart,
  };
}
