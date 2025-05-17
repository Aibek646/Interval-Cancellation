var cancellable = function (fn, args, t) {
  fn(...args);
  const timer = setInterval(() => fn(...args), t);
  const cancelFn = () => clearInterval(timer);
  return cancelFn;
};
const result = [];

const fn = (x1, x2, x3) => x1 + x2 + x3;
const args = [5, 1, 3];
const t = 50;
const cancelTimeMs = 180;

const start = performance.now();

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);

setTimeout(cancel, cancelTimeMs);

setTimeout(() => {
  console.log(result);
}, cancelTimeMs + t + 15);
