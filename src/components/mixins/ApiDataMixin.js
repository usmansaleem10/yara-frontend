import { cropList, procoteList } from "@/utils/services/index.js";
export default {
  data() {
    return {
      procotes: [],
      crops: [],
    };
  },
  mounted() {
    if (!this.procotes.length || !this.crops.length) this.fetchApiData();
  },
  methods: {
    procoteLabel(procote) {
      return {
        B: "Boron",
        Mn: "Magnesium",
        Zn: "Zinc",
        Cu: "Copper",
        BMZ: "BMZ",
        BCMZ: "BCMZ",
      }[procote];
    },
    fetchApiData() {
      Promise.all([cropList(), procoteList()]).then(([crops, procotes]) => {
        this.crops = crops.data.data;
        this.procotes = procotes.data.data;
      });
    },
  },
};
