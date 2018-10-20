// Brain Fuck Interpreter
// © Ben Fleming 2016

// How It Works
// >, i++;
// <, i--;
// +, val++;
// -, val--;
// [, loop start;
// ], loop end;
// ,, get user input;
// ., print val as ASCII;

export default function* (code) {
  let codeidx = 0,
      pointer = 0,
      cells = [],
      loops = [],
      output = ''

  while (true) {
    if (codeidx > code.length - 1)
      return

    if (isNaN(cells[pointer]))
      cells[pointer] = 0

    output = ''

    switch (code.charAt(codeidx)) {

      // check if char is '>'
      // if true then increment the pointer by one
      // [START]
      case '>':
        pointer++; break
      // [END]

      // check if the char is '<'
      // if true then decrement the pointer by one
      // [START]
      case '<':
        pointer--; break
      // [END]

      // check if the char is '+'
      // if true then increment the cell by one
      // [START]
      case '+':
        cells[pointer]++; break
      // [END]

      // check if the char is '-'
      // if true then decrement the cell by one
      // [START]
      case '-':
        cells[pointer]--; break
      // [END]

      // check if the char is '['
      // if true then append the current index 
      // to the loop array
      // [START]
      case '[':
        loops.push(codeidx); break
      // [END]

      // check if the char is ']', and the cell is not zero
      // if true then jump back to the start of the loop
      // else continue with the program
      // [START]
      case ']':
        if (cells[pointer]!=0) {codeidx=loops.pop()-1;}
        else {loops.pop();}
        break
      // [END]
      
      // check if the char is '.'
      // if true then set the output
      // [START]
      case '.':
        output = String.fromCharCode(
          cells[pointer]
        ); break
      // [END]

    }

    codeidx++
    yield { output, cells, pointer }
  }
}