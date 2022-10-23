function memoizeAddTo80(n) {
  let cache = {};
  return function (n) {
    // This is closure in javascript.
    if (n in cache) {
      console.log("quickly retrieved from cache");
      return cache[n];
    } else {
      console.log("expensive operation");
      const answer = n + 80;
      cache[n] = answer;
      return answer;
    }
  };
}

const memoized = memoizeAddTo80();
console.log(1, memoized(6));
console.log(2, memoized(6));
