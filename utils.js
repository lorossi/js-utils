const random = (a, b) => {
  if (a == undefined && b == undefined) return random(0, 1);
  else if (b == undefined) return random(0, a);
  else if (a != undefined && b != undefined) return Math.random() * (b - a) + a;
};

const random_int = (a, b) => {
  if (a == undefined && b == undefined) return random_int(0, 1);
  else if (b == undefined) return random_int(0, a);
  else if (a != undefined && b != undefined) return Math.floor(Math.random() * (b - a)) + a;
};

const random_interval = (average = 0, interval = 1) => {
  return random(average - interval, average + interval);
};

const random_from_array = arr => {
  return arr[random_int(arr.length - 1)];
};

const random_normal = (min = 0, max = 1, skew = 0) => {
  // Box–Muller transform;
  let u, v;
  u = 0;
  v = 0;

  while (u == 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v == 0) v = Math.random();
  let num;
  num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = random_normal(min, max, skew);// resample between 0 and 1 if out of range
  } else {
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
  }
  return num;
};

const shuffle_array = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const map = (val, old_min, old_max, new_min, new_max) => {
  return (val - old_min) * (new_max - new_min) / (old_max - old_min) + new_min;
};

const distSq = (x1, y1, x2, y2) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(distSq(x1, y1, x2, y2));
};

const constrain = (x, min_val = 0, max_val = 1) => {
  return Math.max(Math.min(x, max_val), min_val);
};

const wrap = (x, min_val = 0, max_val = 1) => {
  while (x > max_val) x -= max_val - min_val;
  while (x < min_val) x += max_val - min_val;
  return x;
};

const is_mobile = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

const get_css_var = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(property).split(" ").join("");
};

const xy_from_index = (i, width) => {
  const x = i % width;
  const y = parseInt(i / width);
  return { x: x, y: y };
};

const index_from_xy = (x, y, width) => {
  return x + width * y;
};
