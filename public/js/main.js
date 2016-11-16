// Brain Fuck Interperter
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

// TODO: Connect To A UI
// Connect An Output Section
// Connect An Input Section
// Connect A Run Button

// Main Function Block
(function( $ ) {

  // Global Variables
  // valid_chars as str; String Of All The Vaild Brainfuck Characters
  var valid_chars="<>+-[],.";

  // Run Function
  // To Run The Code On The Users Request
  function runCode() {
    // Variables
    // char_index as int; Index Of The Current Charcater
    // pointer as int; Index Of The Current Cell
    // cells as arr; Array Of All The Cells
    // loop_stack as arr; Array Of All Current Loops
    var char_index=0;
    var pointer=0;
    var cells=[0];
    var loop_stack=[];

    // Get Brainfuck Code
    // And Get Only The Valid Characters
    var code_raw = $("#code_input").val();
    if (code_raw === undefined) { console.log("Code Not Found"); return; }
    var code_chars =  code_raw.replace(new RegExp('[^' + valid_chars + ']', 'g'), '');

    // Run Through BrainFuck Code
    while (char_index<code_chars.length) {

      // Get Char Value
      // At The Char Index
      var char_val = code_chars.charAt(char_index);

      // Switch Case For Each Characters Action
      switch (char_val) {

        // Case For ">" Character
        // Increase Pointer Value By 1
        case ">":
          pointer++;
          if (cells[pointer]==null) {cells[pointer]=0;}
          break;

        // Case For "<" Character
        // Decrease Pointer Value By 1
        case "<":
          pointer--;
          break;

        // Case For "+" Character
        // Increase Cell Value By 1
        case "+":
          cells[pointer]++;
          break;

        // Case For "-" Character
        // Decrease Cell Value By 1
        case "-":
          cells[pointer]--;
          break;

        // Case For "[" Character
        // Push The Character Index To The Loop Memory
        case "[":
          loop_stack.push(char_index);
          break;

        // Case For "]" Character
        // Rturn To The Last "[" Character In The Code
        case "]":
          if (cells[pointer]!=0) {char_index=loop_stack.pop();}
          else {loop_stack.pop();}
          break;

        // Case For "," Character
        // Get The Users Input
        case ",":
          cells[pointer]=input();
          break;

        // Case For "." Character
        // Output The Current Cell Value As ASCII
        case ".":
          // Call The Output Function
          output(String.fromCharCode(cells[pointer]));
          break;

        // Default Case To Handle Errors
        // Add To The Error Count
        default:
          error_count++;

      }

      // If The Character Is Not ']'
      // Continue To The Next Character
      if (char_val!="]") {char_index++;}

    }
  }

  // Output Function
  // To Output To The Screen
  function output(value) {
    console.log("Output Value : "+value);
  }

  // Input Function
  // To Get The Users Input
  function input() {
    return prompt("Enter User Input, Max 1 Character: ").charCodeAt(0);
  }

  $(document).ready(function () {
    $("#run_btn").on("click", runCode);
  });

})( jQuery );
