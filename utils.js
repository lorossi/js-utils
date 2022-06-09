/**
 * Returns a random number in range [a, b) (i.e. a included, b excluded)
 * If only one parameter is passed, the random number will be generated in range [0, a)
 * If no parameters are passed, the random number will be generated in range [0, 1)
 *
 * @param {Number} [a] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {Number} [b] maximum range value
 * @returns {Number} random number
 */
const random = (a, b) => {
  if (a == undefined && b == undefined) {
    a = 0;
    b = 1;
  } else if (b == undefined) {
    b = a;
    a = 0;
  }
  return Math.random() * (b - a) + a;
};

/**
 * Return a random integer in range [a, b) (i.e. a included, b excluded)
 * If only one parameter is passed, the random number will be generated in range [0, a)
 * If no parameters are passed, the random number will be generated in range [0, 1]
 *
 * @param {Number} [a] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {Number} [b] maximum range value
 * @returns {Number} random number
 */
const random_int = (a, b) => {
  if (a == undefined && b == undefined) {
    a = 0;
    b = 2;
  } else if (b == undefined) {
    b = a;
    a = 0;
  }

  return Math.floor(Math.random() * (b - a)) + a;
};

/**
 * Return a random integer in range (average - interval, average + interval)
 * If only one parameter is passed, the random number will be generated in range (average - 0.5, average + 0.5)
 * If no parameters are passed, the random number will be generated in range [0, 1]
 *
 * @param {Number} [a=0.5] average value of the random numbers
 * @param {Number} [b=0.5] semi interval of the random numbers
 * @returns {Number} random number
 */
const random_interval = (average = 0.5, interval = 0.5) => {
  return Math.random() * (interval * 2) + (average - interval);
};

/**
 * Return a random number generated with a gaussian distribution
 *
 * @param {Number} [min=0] minimum value of the random numbers
 * @param {Number} [max=1] minimum value of the random numbers
 * @param {Number} [skew=0] skew of the gaussian function
 * @returns {Number} random number
 */
const random_normal = (min = 0, max = 1, skew = 0) => {
  // Box–Muller transform;
  let u, v;
  u = 0;
  v = 0;

  while (u == 0) u = Math.random(); // convert [0,1) to (0,1)
  while (v == 0) v = Math.random();
  let num;
  num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = random_normal(min, max, skew); // resample between 0 and 1 if out of range
  } else {
    num = Math.pow(num, skew); // skew
    num *= max - min; // stretch to fill range
    num += min; // offset to min
  }
  return num;
};

/**
 * Returns a random item from the provided array
 *
 * @param {Array} a an array
 * @returns {any} item from input array
 */
const random_from_array = (a) => {
  return a[Math.floor(Math.random() * a.length)];
};

/**
 * Shuffles the provided array in place (the original array gets shuffled)
 *
 * @param {Array} a an array
 */
const shuffle_array = (a) => {
  a.map((x) => ({ val: x, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((x) => x.val);
};

/**
 * Returns the square distance between two coordinates
 *
 * @param {Number} x1 first coordinate x value
 * @param {Number} y1 first coordinate y value
 * @param {Number} x2 second coordinate x value
 * @param {Number} y2 second coordinate y value
 * @returns {Number} square distance between the coordinates
 */
const dist_sq = (x1, y1, x2, y2) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

/**
 * Returns the manhattan distance between two coordinates
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns {Number} manhattan distance between the coordinates
 */
const manhattan_dist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Returns the distance between two coordinates
 *
 * @param {Number} x1 first coordinate x value
 * @param {Number} y1 first coordinate y value
 * @param {Number} x2 second coordinate x value
 * @param {Number} y2 second coordinate y value
 * @returns {Number} distance between the coordinates
 */
const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

/**
 * Maps (rescales) a value from an old interval to a new interval
 *
 * @param {Number} value value in the old interval
 * @param {Number} old_min minimum value of the old interval
 * @param {Number} old_max maximum value of the old interval
 * @param {Number} new_min minimum value of the new interval
 * @param {Number} new_max maximum value of the new interval
 * @returns {Number} mapped value
 *
 * @example
 * map(192, 0, 255, 1024, 2048);
 * // => 1795.0117647058823
 */
const map = (value, old_min, old_max, new_min, new_max) => {
  return (
    ((value - old_min) * (new_max - new_min)) / (old_max - old_min) + new_min
  );
};

/**
 * Wraps a value into an interval, like the modulo expression but in both directions of the interval
 *
 * @param {Number} value value to be wrapped
 * @param {Number} [min_val=0] minimum value in the interval
 * @param {Number} [max_val=1] maximum value in the interval
 * @returns {Number}
 *
 * @example
 * wrap(65, 0, 60);
 * // => 5
 */
const wrap = (value, min_val = 0, max_val = 1) => {
  while (value > max_val) value -= max_val - min_val;
  while (value < min_val) value += max_val - min_val;
  return value;
};

/**
 * Clamps (constrains) a value into an interval
 *
 * @param {Number} value value to be clamped
 * @param {Number} [min_val=0] minimum value in the interval
 * @param {Number} [max_val=1] maximum value in the interval
 * @returns  {Number}
 *
 * @example
 * clamp(-5, -3, 10);
 * // => -3
 */
const clamp = (value, min = 0, max = 1) => {
  return Math.min(Math.max(min, value), max);
};

/**
 * Returns true if the function is called by a mobile browser
 *
 * @returns {boolean}
 */
const is_mobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Returns the value of a CSS variable used in the current page
 *
 * @param {String} property CSS property name
 * @returns {String} CSS property value
 */
const get_css_var = (property) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .split(" ")
    .join("");
};

/**
 * @typedef {Object} Point
 * @property {Number} x - x coordinate of the point
 * @property {Number} y - y coordinate of the point
 */

/**
 * Returns the (x, y) coordinates of a 1D data structure treated as a 2D structure (a grid)
 *
 * @param {Number} i index of the item
 * @param {Number} width width of the data structure
 * @returns {Point}
 *
 * @example
 * xy_from_index(25, 10);
 * // => {x: 5, y: 2}
 */
const xy_from_index = (i, width) => {
  const x = i % width;
  const y = parseInt(i / width);
  return { x: x, y: y };
};

/**
 * Returns the index corresponding to the (x, y) coordinates of a 2D data structure (a grid) treated as a 1D structure
 *
 * @param {Number} x x coordinate of the point
 * @param {Number} y y coordinate of the point
 * @param {Number} width width of the data structure
 * @returns {Number}
 *
 * @example
 * index_from_xy(7, 4, 12);
 * // => 55
 */
const index_from_xy = (x, y, width) => {
  return x + width * y;
};

/**
 * Returns the hexadecimal conversion of a decimal number
 *
 * @param {Number} dec the base 10 number
 * @param {Number} [padding=0] digits of zero padding in front of the hex number
 * @param {boolean} [prefix=false] if true, 0x gets added in front of the hex number
 * @param {boolean} [round=true] if true, the number gets rounded before conversion
 * @returns {Number}
 *
 * @example
 * dec_to_hex(232);
 * // => "E8"
 *
 * @example
 * dec_to_hex(12, 2);
 * // => "0C"
 *
 * @example
 * dec_to_hex(14, 2, true);
 * // => "0x0E"
 */
const dec_to_hex = (dec, padding = 0, prefix = false, round = true) => {
  if (round) dec = Math.floor(dec);
  let hex = dec.toString(16).padStart(padding, 0).toUpperCase();
  if (prefix) hex = "0x" + hex;
  return hex;
};

/**
 * Returns the decimal conversion of a hexadecimal number
 *
 * @param {Number} hex the base 16 number
 * @returns {Number}
 *
 * @example
 * hex_to_dec("E8");
 * // => 232
 * @example
 * hex_to_dec("0xF6");
 * // => 246
 * @example
 * hex_to_dec("64h");
 *  100
 */
const hex_to_dec = (hex) => parseInt(hex, 16);

/**
 * Shuffles and returns a string
 *
 * @param {String} string the string to be shuffled
 * @returns {String}
 */
const shuffle_string = (string) =>
  string
    .split("")
    .map((s) => ({ val: s, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((s) => s.val)
    .join("");

/**
 * Generates a random alphanumeric string of set length
 *
 * @param {Number} len length of the random string
 * @returns {String}
 */
const random_string = (len) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  for (let i = 0; i < len; i++) result += random_from_array(characters);
  return result;
};

/**
 * In and out polynomial easing
 *
 * @param {Number} x in range [0, 1]
 * @param {Number} n degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_inout = (x, n) => {
  return x < 0.5
    ? Math.pow(2, n - 1) * Math.pow(x, n)
    : 1 - Math.pow(-2 * x + 2, n) / 2;
};
/**
 * In polynomial easing
 *
 * @param {Number} x in range [0, 1]
 * @param {Number} n degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_in = (x, n) => {
  return Math.pow(2, n - 1) * Math.pow(x, n);
};

/**
 * Out polynomial easing
 *
 * @param {Number} x in range [0, 1]
 * @param {Number} n degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_out = (x, n) => {
  return 1 - Math.pow(-2 * x + 2, n) / 2;
};
