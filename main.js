'use strict';

let output = document.getElementById('output');

function start() {
  toBinary( +prompt('Pick number:','') );
}

function toBinary(num) {
  outputDefault();

  if (isNaN(+num) ){
    output.value = 'This is not a number!';
    return 1;
  }
  
  let result = [];
  output.value += num + '|B\n';

  for(let i = 0; i < num;) {
    let remainder = num % 2;
    result.push(remainder);
    num = Math.floor(num/2);
    output.value += num + '|'+ remainder + '\n';
  }
  if (output.value.length > 37) {
    output.style.height = '220px';
  }
  if (output.value.length > 50) {
    output.style.height = '270px';
  }

  result = result.reverse().join('');
  output.value += 'Result:  \n' + result;
  return 0;
}

function outputDefault() {
  output.value = '';
  output.style.height = '200px';
}

function about() {
  let info = '   The program helps understand the principle of obtaining a binary number.';
  
  alert(info);
}