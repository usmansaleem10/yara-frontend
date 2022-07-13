<template>
  <div class="chart-holder">
    <label class="block font-bold text-center text-lg mb-1 text-blue-900"
      >Percentage of Crop Removal</label
    >
    <apexchart
      type="bar"
      height="200"
      :options="options"
      :series="chartSeries"
    />
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
            formatter: function (val) {
              return `${val}%`;
            },
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
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">' +
              '<div class="px-4 py-1 sm:px-1 bg-gray-50">' +
              w.config.xaxis.categories[dataPointIndex] +
              " </div>" +
              ' <div class="px-1 py-1 sm:p-1">' +
              series[seriesIndex][dataPointIndex] +
              "%" +
              "</div>" +
              "</div>"
            );
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
        mn: "Manganese",
        zn: "Zinc",
        cu: "Copper",
      }[procote];
    },
  },
};
</script>
