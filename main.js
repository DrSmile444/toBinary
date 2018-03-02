'use strict'; let p = console.log;

let output = document.getElementById('output');

function start(key, flag) {
  if (key) {
    output.value = toDecimal( prompt('Pick number: (binary)',''), flag )
  } else {
    output.value = toBinary( +prompt('Pick number:',''), flag );
  }
}

function toBinary(num, flag) {
  outputDefault();
  let outputBin = '';

  if (isNaN(+num) ){
    outputBin = 'This is not a number!';
    return 1;
  }
  
  let result = [];

  if (flag) {
    let remainder = Math.abs(num % 2), 
        interval = num - remainder,
        indent = (interval + '').length + 1;
    outputBin += num + '|' + addSpace(interval, indent) + '|M\n';

    result.push(remainder)

    while(0 < Math.abs(num) ) {
      num = (num - result[result.length-1]) / -2;

      result.push( Math.abs(num % 2) );

      interval = (num - result[result.length-1]);

      outputBin += num + '|'+ addSpace(interval, indent) + '|' + result[result.length-2] +'\n';
    }

    result = result.slice(0, result.length-1)
  } else {
    outputBin += num + '|B\n';

    while(0 < num) {
      let remainder = num % 2;
      result.push(remainder);
      num = Math.floor(num/2);
      outputBin += num + '|'+ remainder + '\n';
    }
  }  
  
  if (output.value.length > 37) {
    output.style.height = '220px';
  }
  if (output.value.length > 50) {
    output.style.height = '270px';
  }

  result = result.reverse().join('');
  outputBin += 'Result:  \n' + result;
  return outputBin;
}

function toDecimal(num, flag) {
  outputDefault();
  let process = (num + '').split('').reverse();
  let result = 0, arr = [], minus = '';

  for (let i = 0, n = process.length; i < n; i++) {
    if (+process[i]) {
      minus = '';

      if(flag) {
        if(i % 2 == 1) minus = '-';
      }

      let chache = +(minus + Math.pow(2, i) );
      result += chache;
      arr.push(chache)
    }
  }

  return num + ' =\n' + arr.reverse().join(' + ') + '\nResult is:   \n' + result;
}

function outputDefault() {
  output.value = '';
  output.style.height = '200px';
}

function addSpace(string, count) {
  string += '';
  let arr = string.split('').reverse();
  for(let i = 0, n = count - string.length; i < n; i++) {
    arr.push(' ');
  }
  return arr.reverse().join('');
}

function about() {
  let info = '\n   The program helps understand the principle of obtaining a binary number.\n\n   New function: you can get a number in the negative binary numeric system!\n\nAnyway, you can obtain a decimal number.';
  
  alert(info);
}