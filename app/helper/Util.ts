const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HONEYPOTS = [
  "Cowrie",
  "Dionaea",
];

export const months = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
};

export const honeypots = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 2;
  const section = cfg.section;
  const values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = HONEYPOTS[Math.ceil(i) % 2];
    values.push(value.substring(0, section));
  }

  return values;
};