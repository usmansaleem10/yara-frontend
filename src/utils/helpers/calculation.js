const LBS_PER_METRIC_TON = 2204.62;
const ROUND_PRECISION = 2;

const litters_per_tonne = (procoteMultiplier, yieldValue, dfRate) => {
  const mlProcotePerAcre = yieldValue * procoteMultiplier;
  return (((LBS_PER_METRIC_TON / dfRate) * mlProcotePerAcre) / 1000).toFixed(
    ROUND_PRECISION
  );
};

const product_price = (l_tonne, amount, dfRate) => {
  return (((l_tonne * amount) / LBS_PER_METRIC_TON) * dfRate).toFixed(
    ROUND_PRECISION
  );
};
const ratios = (procote, removal) => {
  const procoteRatios = {
    b_ratio: procote.b_ratio,
    cu_ratio: procote.cu_ratio,
    mn_ratio: procote.mn_ratio,
    zn_ratio: procote.zn_ratio,
  };
  const removalRatios = {
    b_ratio: removal.b_ratio,
    cu_ratio: removal.cu_ratio,
    mn_ratio: removal.mn_ratio,
    zn_ratio: removal.zn_ratio,
  };
  return {
    procoteRatios,
    removalRatios,
  };
};

const crop_removal = (procoteMultiplier, procote, removal, yieldValue) => {
  const { procoteRatios, removalRatios } = ratios(procote, removal);
  const validRatios = Object.keys(procoteRatios).filter(
    (key) => procoteRatios[key] != null
  );
  const ratioHash = {};
  validRatios.forEach((key) => {
    let value =
      ((yieldValue * procoteMultiplier) / procoteRatios[key] / yieldValue) *
      removalRatios[key];
    ratioHash[key] = parseFloat(value).toFixed(ROUND_PRECISION);
  });
  return ratioHash;
};
export const calculateChange = (
  procote,
  yieldValue,
  dfRate,
  removalValue,
  currency,
  procoteMultiplier
) => {
  let l_tonne = 0;
  let kg_tonne = 0;
  let price = 0;
  if (dfRate > 0) {
    l_tonne = litters_per_tonne(procoteMultiplier, yieldValue, dfRate);
    kg_tonne = (procote.density * l_tonne).toFixed(ROUND_PRECISION);
    price = product_price(l_tonne, procote[currency], dfRate);
  }
  const removal = crop_removal(
    procoteMultiplier,
    procote,
    removalValue,
    yieldValue
  );
  return {
    quantity: { liter: l_tonne, kg: kg_tonne },
    price: price,
    removal: removal,
  };
};
