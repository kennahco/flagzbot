function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function roll(n, names, whiteFlags, redFlags) {
  var rolls = [];

  var nameRolls = getRandom(names, n);
  var whiteFlagRolls = getRandom(whiteFlags, n*2);
  var redFlagRolls = getRandom(redFlags, n);

  for (i = 0; i < n; i++) {
    rolls[i] = {name: nameRolls[i], whiteFlagA: whiteFlagRolls[i],
                whiteFlagB: whiteFlagRolls[i + n], redFlag: redFlagRolls[i]}
  };
  return rolls;
}

module.exports.roll = roll;