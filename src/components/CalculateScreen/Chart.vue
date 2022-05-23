<template>
  <apexchart
    type="bar"
    height="250"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  props: {
    chartData: { type: Array, required: true },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        yaxis: {
          labels: {
            show: true,
            hideOverlappingLabels: true,
          },
        },
        xaxis: {
          categories: Object.keys(this.chartData).map((label) =>
            label.replace("_ratio", "").toUpperCase()
          ),
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      };
    },
    series() {
      return [
        {
          name: Object.keys(this.chartData),
          data: Object.values(this.chartData),
        },
      ];
    },
  },
};
</script>
