window.BlocklyApps = require('../base');
window.Turtle = require('./turtle');
require('./answers'); //XXX Mutates Turtle
var blocks = require('./blocks');

window.turtleMain = function() {

  document.write(turtlepage.start({}, null, {
    page: BlocklyApps.PAGE,
    level: BlocklyApps.LEVEL,
    reinf: Turtle.REINF ? reinf_data[BlocklyApps.PAGE][BlocklyApps.LEVEL] : 0,
    baseUrl: BlocklyApps.BASE_URL
  }));

  // Reinforcement/interstitial text.
  var reinf_data = [
    // There is no page 0.
    [],
    // Page 1.
    [undefined, // There is no level 0.
     undefined,
     // Before coloured square (2).
     ['I can draw in different colors.  Choose what color you would like me to use with the "set color" block.  Blocks for changing color don\'t count to your block count used for scoring, so go wild!', 'picture', 'set-colour.png'],
     // Before repeat (3).
     ['Tired of dragging and dropping?  Let the "repeat" block do the work for you.', 'animations', ['repeat-intro.gif']],
     // Before triangle (4).
     ['Do you like surprises?  Use the "random color" block to let me pick the color.', 'picture', 'random-colour.png'],
     // Before overlapping square and triangle (5).
     ['Did you know you can copy and paste a block?'],
     // Before envelope (turned square and triangle) (6).
     ['I can move backward, not just forward.'],
     // Before glasses (7).
     undefined,
     // Before spikes (8).
     ['Do you ever get tired of waiting for me?  You can make me move faster (or slower) with the speed slider.', 'picture', 'slider.gif'],
     // Before circle (9).
     undefined,
     // Before playground (10).
     ['Congratulations on completing this tutorial.  Just for fun, here\'s a new block that changes how wide of lines I draw.  We\'ve been using a default width of 5.', 'picture', 'set-width.png']
    ],
    // Page 2
    [undefined,  // There is no level 0.
     // Before drawing a square (11).  (It's new to have something before the first level.)
     ['To make room for new blocks, we\'ve put the blocks into categories.  You may have to look around for your old favorite blocks, but they\'re all there.'],
     // Before use of "draw a square" (2).
     ['We\'ve added a new category for "Functions", a powerful new type of block.'],
     // Before drawing of 3 squares (3).
     ['Wondering why it\'s better to use \'repeat\' than copying and pasting the blocks three times?  See why on the next level.'],
     // Before drawing of 36 squares (4).
     ['Here\'s how I solved the previous level.  Make sure you understand it before proceeding.', 'picture', 'three-squares.png'],
     // Before manually making nested squares (5).
     ['Let\'s explore what we can do with squares of different sizes...'],
     // Before using "count with" block (6).
     ['Wouldn\'t it be nice if you could tell me to count by tens from 50 to 100, drawing a square each time?  Well you can -- with the new "count with" block.  The programs on the left and right do the same thing.', 'picture', 'count-loop-square.png'],
     // Before boxy spiral (7).
     ['This code draws a boxy spiral.  You\'ll need to figure out what should go in the blanks on the "count with" block to do it with fewer blocks on the next level.', 'picture', 'spiral-quiz.png'],
     // Before same-height snowmen (8).
     ['We\'ve given you two new blocks: "jump forward", which moves the turtle without leaving a trail, and "draw a snowman", which draws an elephant -- just kidding.'],
     // Before family of snowmen (9).
     ['You don\'t need to always count from a low number to a high number.  You can count from high to low too.'],
     // Before playground (10).
     ['Way to go!']
   ],
   // Page 3
   [undefined,  // There is no level 0.
    // Before calling "draw a square" (1).
    ['You\'ll now learn how to create new blocks.  TODO: Phrase better and/or replace with video.'],
    // Before creating "draw a triangle" (2).
    ['Here\'s how the "draw a square" block was created.  On the next level, you\'ll create your own "draw a triangle" block.  TODO: Replace with a video.', 'animations', ['define-draw-a-square.gif']],
    // Before drawing squares and triangles to fence animals (3).
    ['Congratulations on adding a new block!  That\'s a huge step for a programmer.  Dividing big tasks into bite-sized pieces is what makes large programs possible.'],
    // Before drawing a house using square and triangle procedures (4).
    undefined,
    // Before creating a "draw a house" function (5).
    ['The new blocks that you define can be used just like the built-in blocks, including being used within another block definition...'],
    // Before adding length parameter to "draw a triangle" (6).
    ['Let me show you how the input was added to "draw a square".  You\'ll need to know this for the next level, where you\'ll add an input to "draw a triangle". ', 'animations', ['draw-a-square-add-input.gif']],
    // Before adding length parameter to "draw a house" (7).
    undefined,
    // Before modifying end location of "create a house" (8).
    ['It can be useful for a function to put the turtle at a good ending position, to help with building up bigger pictures.'],
    // Before calling "draw a house" within a for-loop (9).
    undefined,
    // Before final play level (10).
    ['You now know how to control the turtle, use loops ("repeat" and "count from"), and write and use functions.  Congratulations on becoming a programmer!']
   ],
   // Page 4.
   [undefined, // There is no level 0.
    // Before drawing the house
    undefined,
    // Before drawing the square
    undefined,
    // Before drawing the arrow
    undefined,
    // Before drawing the ship
    undefined
   ]
  ];

  blocks.install(Blockly);

};
