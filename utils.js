/**
 * Returns a random number in range [a, b) (i.e. a included, b excluded)
 * If only one parameter is passed, the random number will be generated in range [0, a)
 * If no parameters are passed, the random number will be generated in range [0, 1)
 *
 * @param {number|null} [a=null] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {number|null} [b=null] maximum range value
 * @returns {number} random number
 */
const random = (a = null, b = null) => {
  if (a == null && b == null) {
    a = 0;
    b = 1;
  } else if (b == null) {
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
 * @param {number|null} [a=null] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {number|null} [b=null] maximum range value
 * @returns {number} random number
 */
const random_int = (a = null, b = null) => {
  if (a == null && b == null) {
    a = 0;
    b = 2;
  } else if (b == null) {
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
 * @param {number} [average=0.5] average value of the random numbers
 * @param {number} [interval=0.5] semi interval of the random numbers
 * @returns {number} random number
 */
const random_interval = (average = 0.5, interval = 0.5) => {
  return Math.random() * (interval * 2) + (average - interval);
};

/**
 * Return a random number generated with a gaussian distribution
 *
 * @param {number} [min=0] minimum value of the random numbers
 * @param {number} [max=1] minimum value of the random numbers
 * @param {number} [skew=0] skew of the gaussian function
 * @returns {number} random number
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
 * @returns {*} item from input array
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
 * @param {number} x1 first coordinate x value
 * @param {number} y1 first coordinate y value
 * @param {number} x2 second coordinate x value
 * @param {number} y2 second coordinate y value
 * @returns {number} square distance between the coordinates
 */
const dist_sq = (x1, y1, x2, y2) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

/**
 * Returns the manhattan distance between two coordinates
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number} manhattan distance between the coordinates
 */
const manhattan_dist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Returns the distance between two coordinates
 *
 * @param {number} x1 first coordinate x value
 * @param {number} y1 first coordinate y value
 * @param {number} x2 second coordinate x value
 * @param {number} y2 second coordinate y value
 * @returns {number} distance between the coordinates
 */
const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

/**
 * Maps (rescales) a value from an old interval to a new interval
 *
 * @param {number} value value in the old interval
 * @param {number} old_min minimum value of the old interval
 * @param {number} old_max maximum value of the old interval
 * @param {number} new_min minimum value of the new interval
 * @param {number} new_max maximum value of the new interval
 * @returns {number} mapped value
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
 * @param {number} value value to be wrapped
 * @param {number} [min_val=0] minimum value in the interval
 * @param {number} [max_val=1] maximum value in the interval
 * @returns {number}
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
 * @param {number} value value to be clamped
 * @param {number} [min_val=0] minimum value in the interval
 * @param {number} [max_val=1] maximum value in the interval
 * @returns  {number}
 *
 * @example
 * clamp(-5, -3, 10);
 * // => -3
 */
const clamp = (value, min_val = 0, max_val = 1) => {
  return Math.min(Math.max(min_val, value), max_val);
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
 * @param {string} property CSS property name
 * @returns {string} CSS property value
 */
const get_css_var = (property) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .split(" ")
    .join("");
};

/**
 * Returns the (x, y) coordinates of a 1D data structure treated as a 2D structure (a grid)
 *
 * @param {number} i index of the item
 * @param {number} width width of the data structure
 * @returns {Object}
 *
 * @example
 * xy_from_index(25, 10);
 * // => {x: 5, y: 2}
 */
const xy_from_index = (i, width) => {
  const x = i % width;
  const y = Math.floor(i / width);
  return { x: x, y: y };
};

/**
 * Returns the index corresponding to the (x, y) coordinates of a 2D data structure (a grid) treated as a 1D structure
 *
 * @param {number} x x coordinate of the point
 * @param {number} y y coordinate of the point
 * @param {number} width width of the data structure
 * @returns {number}
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
 * @param {number} dec the base 10 number
 * @param {number} [padding=0] digits of zero padding in front of the hex number
 * @param {boolean} [prefix=false] if true, 0x gets added in front of the hex number
 * @param {boolean} [round=true] if true, the number gets rounded before conversion
 * @returns {string}
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
  let hex = dec.toString(16).padStart(padding, "0").toUpperCase();
  if (prefix) hex = "0x" + hex;
  return hex;
};

/**
 * Returns the decimal conversion of a hexadecimal number
 *
 * @param {number} hex the base 16 number
 * @returns {number}
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
 * @param {string} string the string to be shuffled
 * @returns {string}
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
 * @param {number} len length of the random string
 * @returns {string}
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
 * @param {number} x in range [0, 1]
 * @param {number} [n=2] degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_inout = (x, n = 2) => {
  if (x < 0.5) return x ** n * 2 ** (n - 1);
  return 1 - (-2 * x + 2) ** n / 2 ** (n - 1);
};
/**
 * In polynomial easing
 *
 * @param {number} x in range [0, 1]
 * @param {number} [n=2] degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_in = (x, n = 2) => {
  return x ** n;
};

/**
 * Out polynomial easing
 *
 * @param {number} x in range [0, 1]
 * @param {number} [n=2] degree of the polynomial
 * @returns x smoothed
 */
const poly_ease_out = (x, n = 2) => {
  return 1 - (1 - x) ** n;
};
