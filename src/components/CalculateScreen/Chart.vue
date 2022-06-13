<template>
  <div class="chart-holder">
    <apexchart type="bar" height="250" :options="options" :series="chartSeries" />
  </div>
</template>
<script>
export default {
  props: {
    chartData: { type: Object, required: true },
  },
  data() {
    return {
      options: {},
      chartSeries: [],
    };
  },
  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.options = this.chartOptions(newVal);
        this.chartSeries = this.series(newVal);
      },
    },
  },
  methods: {
    chartOptions(data) {
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
          categories: Object.keys(data).map((label) =>
            this.procoteLabel(label.replace("_ratio", ""))
          ),
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      };
    },
    series(data) {
      return [
        {
          name: Object.keys(data),
          data: Object.values(data),
        },
      ];
    },
    procoteLabel(procote) {
      return {
        b: "Boron",
        mn: "Magnesium",
        zn: "Zinc",
        cu: "Copper",
      }[procote];
    },
  },
};
</script>
