"use strict";

var p = console.log;
var output = document.getElementById("output");

function start(key, flag) {
  outputDefault();
  if (key == "decimal") {
    //*** */
    //pick number
    //*** */
    var number = prompt("Pick number: (binary)", "");
    var checkedFloat = parseNumber(number).length == 2;

    if (!isNumber(number) || checkedFloat) {
      output.value = "This is not a number or zero!";
      return 1;
    }

    output.value = toDecimal(number, flag);
  } else if (key == "binary") {
    //*** */
    //pick number
    //*** */
    var _number = prompt("Pick number:", "");
    if (!isNumber(_number)) {
      output.value = "This is not a number or zero!";
      return 1;
    }

    _number = parseNumber(_number);
    var _checkedFloat = _number.length == 2;

    if (_checkedFloat && flag && _number[0] == 0) {
      output.value = "This is not a number or zero!";
      return 1;
    }

    var binReal = void 0;
    var binFloat = void 0;

    if (_number[0] == 0) {
      binReal = ["", 0];
    } else {
      binReal = toBinary(+_number[0], flag, _checkedFloat);
    }

    output.value = binReal[0];
    if (_number[1] && !flag) {
      var accuracy = prompt("Pick precision in numbers:\n0.(count)", "");
      if (!isNumber(accuracy)) {
        accuracy = 4;
      }

      binFloat = toBinaryFloat(_number[1], accuracy);
      output.value += binFloat[0];
      output.value += "\n\nFinal:  \n" + binReal[1] + "." + binFloat[1];
    }
  }
  if (output.value.length > 60) {
    output.style.height = "36vh";
  }
}

function parseNumber(num) {
  num = num + "";
  var result1 = num.split(".");
  var result2 = num.split(",");
  if (result1.length == 2) {
    return result1;
  }
  return result2;
}

function toBinary(num, flag, float) {
  //flag is responsible for minus binary
  var outputBin = "";
  var result = [];

  if (flag) {
    var remainder = Math.abs(num % 2),
      interval = num - remainder,
      indent = (interval + "").length + 1;
    outputBin += num + "|" + addSymbol(interval, indent, " ") + "|M\n";

    result.push(remainder);

    while (0 < Math.abs(num)) {
      num = (num - result[result.length - 1]) / -2;

      result.push(Math.abs(num % 2));

      interval = num - result[result.length - 1];

      outputBin +=
        num +
        "|" +
        addSymbol(interval, indent, " ") +
        "|" +
        result[result.length - 2] +
        "\n";
    }

    result = result.slice(0, result.length - 1);
  } else {
    outputBin += num + "|B\n";

    while (0 < num) {
      var _remainder = num % 2;
      result.push(_remainder);
      num = Math.floor(num / 2);
      outputBin += num + "|" + _remainder + "\n";
    }
  }
  result = result.reverse().join("");

  if (!float || flag) {
    outputBin += "Result:  \n" + result;
  } else {
    outputBin += "\n";
  }
  return [outputBin, result];
}

function toBinaryFloat(num, accuracy) {
  var result = [];
  var text = ["0." + num + "|B"];
  var stage = (num + "").length + 1;
  accuracy = accuracy;

  for (var i = 0; i < accuracy; i++) {
    num = +num * 2 + "";
    //fix empty sybmols after multiply
    num = addSymbol(num, stage - 1, "0");
    var temp = ["0.", num];

    switch (num.length) {
      case stage:
        num = (num + "").slice(1, stage);
        temp[0] = "1.";
        temp[1] = num;
        result.push(1);
        break;

      case stage - 2:
        //fix empty symbol
        temp[1] = num + "0";
        break;

      default:
        result.push(0);
    }

    temp.push("|" + result[i]);
    text.push(temp.join(""));
  }

  return [text.join("\n"), result.join("")];
}

function toDecimal(num, flag) {
  var process = (num + "").split("").reverse();
  var result = 0,
    arr = [],
    minus = "";

  for (var i = 0, n = process.length; i < n; i++) {
    if (+process[i] == 0 || +process[i] == 1) {
      minus = "";

      if (flag) {
        if (i % 2 == 1) minus = "-";
      }

      var chache = +(minus + Math.pow(2, i));
      result += chache;
      arr.push(chache);
    } else {
      return "Invalid number!\n Use only 1 and 0.";
    }
  }

  return (
    +num + " =\n" + arr.reverse().join(" + ") + "\nResult is:   \n" + result
  );
}

//*** */
// additional funcs
//*** */

function isNumber(number) {
  var temp = "";
  try {
    if (!!~number.indexOf(",")) {
      if (number[0] == ",") {
        number = "." + number.slice(1, number.length);
      } else {
        temp += parseInt(number);
        temp += "." + number.slice(temp.length + 1, number.length);
        number = temp;
      }
    }
  } finally {
    return !(isNaN(+number) || number == 0 || number == null);
  }
}

function outputDefault() {
  output.value = "";
  output.style.height = "200px";
}

function addSymbol(string, count, symbol) {
  string = string + "";
  var strLeng = string.length;
  var temp = "";

  if (strLeng < count) {
    for (var i = 0, n = count - strLeng; i < n; i++) {
      temp += symbol + "";
    }
  }

  return temp + string;
}

function about() {
  var info =
    "\n   The program helps understand the principle of obtaining a binary number.\n\nFeatures: \n - negative system\n - float numbers\n\nAnyway, you can obtain a decimal number.";

  alert(info);
}
