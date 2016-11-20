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
  var running=false;

  // UI Variables
  var input_elmt="#code_input";
  var output_elmt="#output";
  var run_btn="#run_btn";

  String.prototype.highLightAt = function(index) {
    return this.substr(0, index) + '<span class="highlight">' + this.substr(index,1) + '</span>' + this.substr(index +1);
  }

  // Run Function
  // To Run The Code On The Users Request
  function runCode() {
    if (running) {return;}
    running=true;
    $(output_elmt).html("");
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
    var code_raw = $(input_elmt).val();
    var code_chars =  code_raw.replace(new RegExp('[^' + valid_chars + ']', 'g'), '');

    (function myLoop (i) {
       setTimeout(function () {

         // Get Char Value
         // At The Char Index
         var char_val = code_chars.charAt(char_index);
         console.log(char_val);

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
             oneup("+1", pointer);
             break;

           // Case For "-" Character
           // Decrease Cell Value By 1
           case "-":
             cells[pointer]--;
             oneup("-1", pointer);
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
             else {char_index++;loop_stack.pop();}
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
             console.log(char_val+" Is Not A Valid Character!");

         }

         // If The Character Is Not ']'
         // Continue To The Next Character
         if (char_val!="]") {char_index++;}

         // Update UI
         var offset = 5;
         var x=$(".cell").eq(pointer).position().left;
         x=x+offset;
         $(".pointer").css("margin-left", x+"px");
         $(".cell").eq(pointer).html(cells[pointer]);

          if (--i && char_index<code_chars.length) myLoop(i);      //  decrement i and call myLoop again if i > 0
       }, 50)
    })(10000);
  }

  // Output Function
  // To Output To The Screen
  function output(value) {
    console.log("Output Value : "+value);

    // Output Character To Screen
    $(output_elmt).append(value);
  }

 //One Up Fucntion
 //To Show +1 In Cell
  function oneup(text, pointer) {
    setTimeout(function () {
      var offsetX=20;
      var offsetY=0;
      var x=$(".cell").eq(pointer).position().left;
      x=x+$(".above-cells").position().left;
      x=x+offsetX;
      var y=$(".above-cells").position().top;
      y=y+offsetY;
      $(".above-cells").append("<div class='oneup' style='left:"+x+"px;top:"+y+"px;'>"+text+"</div>").children().last().animate({
        opacity: 0,
        top: "-=50"
      }, 500, function() { this.remove(); });
    }, 10);
  }

  // Input Function
  // To Get The Users Input
  function input() {
    return prompt("Enter User Input, Max 1 Character: ").charCodeAt(0);
  }

  // Reset Cells
  // To Clear The Cells
  function resetCells() {
    $(".cell").width(650 / $(".cell").length);
  }

  $(document).ready(function () {
    resetCells();
    $(run_btn).on("click", runCode);
  });

})( jQuery );
