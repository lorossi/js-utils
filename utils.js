/**
 * Returns a random number in range [a, b) (i.e. a included, b excluded)
 * If only one parameter is passed, the random number will be generated in range [0, a)
 * If no parameters are passed, the random number will be generated in range [0, 1)
 * 
 * @param {number} [a] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {number} [b] maximum range value
 * @returns {number} random number
 */
const random = (a, b) => {
  if (a == undefined && b == undefined) return random(0, 1);
  else if (b == undefined) return random(0, a);
  else if (a != undefined && b != undefined) return Math.random() * (b - a) + a;
};

/**
 * Return a random integer in range [a, b) (i.e. a included, b excluded)
 * If only one parameter is passed, the random number will be generated in range [0, a)
 * If no parameters are passed, the random number will be generated in range [0, 1]
 *
 * @param {number} [a] if two parameters are passed, minimum range value; maximum range value otherwise
 * @param {number} [b] maximum range value
 * @returns {number} random number
 */
const random_int = (a, b) => {
  if (a == undefined && b == undefined) return random_int(0, 2);
  else if (b == undefined) return random_int(0, a);
  else if (a != undefined && b != undefined) return Math.floor(Math.random() * (b - a)) + a;
};

/**
 * Return a random integer in range (average - interval, average + interval)
 * If only one parameter is passed, the random number will be generated in range (average - 0.5, average + 0.5)
 * If no parameters are passed, the random number will be generated in range [0, 1]
 *
 * @param {number} [a=0.5] average value of the random numbers
 * @param {number} [b=0.5] semi interval of the random numbers
 * @returns {number} random number
 */
const random_interval = (average = 0.5, interval = 0.5) => {
  return random(average - interval, average + interval);
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
 * Return a random item from the provided array
 * 
 * @param {Array} a an array
 * @returns {any} item from input array
 */
const random_from_array = a => {
  return a[random_int(a.length)];
};

/**
 * Shuffles the provided array without returning it (the original array gets shuffled)
 *
 * @param {Array} a an array
 */
const shuffle_array = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
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
 * Returns the distance between two coordinates
 *
 * @param {number} x1 first coordinate x value
 * @param {number} y1 first coordinate y value
 * @param {number} x2 second coordinate x value
 * @param {number} y2 second coordinate y value
 * @returns {number} distance between the coordinates
 */
const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(dist_sq(x1, y1, x2, y2));
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
 * // returns 1795.0117647058823
 */
const map = (value, old_min, old_max, new_min, new_max) => {
  return (value - old_min) * (new_max - new_min) / (old_max - old_min) + new_min;
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
 * // returns 5
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
 * // returns -3
 */
const clamp = (value, min = 0, max = 1) => {
  return Math.min(Math.max(min, value), max);
}

/**
 * Returns true if the function is called by a mobile browser
 * 
 * @returns {boolean}
 */
const is_mobile = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

/**
 * Returns the value of a CSS variable used in the current page
 * 
 * @param {String} property CSS property name
 * @returns {String} CSS property value
 */
const get_css_var = property => {
  return getComputedStyle(document.documentElement).getPropertyValue(property).split(" ").join("");
};

/**
 * @typedef {Object} Point
 * @property {number} x - x coordinate of the point
 * @property {number} y - y coordinate of the point
 */

/**
 * Returns the (x, y) coordinates of a 1D data structure treated as a 2D structure (a grid)
 * 
 * @param {number} i index of the item
 * @param {number} width width of the data structure
 * @returns {Point}
 * 
 * @example
 * xy_from_index(25, 10);
 * // returns {x: 5, y: 2}
 */
const xy_from_index = (i, width) => {
  const x = i % width;
  const y = parseInt(i / width);
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
 * // returns 55
 */
const index_from_xy = (x, y, width) => {
  return x + width * y;
}