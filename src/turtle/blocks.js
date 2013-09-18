/**
 * Blockly Demo: Turtle Graphics
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

var msg = require('../../build/en_us/i18n/turtle');

// Install extensions to Blockly's language and JavaScript generator.
exports.install = function(blockly) {

  var generator = blockly.Generator.get('JavaScript');
  blockly.JavaScript = generator;

  // Create a smaller palette.
  blockly.FieldColour.COLOURS = [
    // Row 1.
    Turtle.Colours.BLACK, Turtle.Colours.GREY,
    Turtle.Colours.KHAKI, Turtle.Colours.WHITE,
    // Row 2.
    Turtle.Colours.RED, Turtle.Colours.PINK,
    Turtle.Colours.ORANGE, Turtle.Colours.YELLOW,
    // Row 3.
    Turtle.Colours.GREEN, Turtle.Colours.BLUE,
    Turtle.Colours.AQUAMARINE, Turtle.Colours.PLUM];
  blockly.FieldColour.COLUMNS = 4;

  // Block definitions.
  blockly.Language.draw_move_by_constant = {
    // Block for moving forward or backward the internal number of pixels.
    helpUrl: 'http://www.example.com/',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_move.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldTextInput('100',
            blockly.FieldTextInput.numberValidator), 'VALUE')
          .appendTitle(msg.dots());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.moveForwardTooltip());
    }
  };

  generator.draw_move_by_constant = function() {
    // Generate JavaScript for moving forward or backward the internal number of
    // pixels.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };


  blockly.Language.draw_turn_by_constant_restricted = {
    // Block for turning either left or right from among a fixed set of angles.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_turn.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.VALUE), 'VALUE')
          .appendTitle(msg.degrees());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  blockly.Language.draw_turn_by_constant_restricted.VALUE =
      [30, 45, 60, 90, 120, 135, 150, 180].
      map(function(t) {return [String(t), String(t)];});

  generator.draw_turn_by_constant_restricted = function() {
    // Generate JavaScript for turning either left or right from among a fixed
    // set of angles.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_turn_by_constant = {
    // Block for turning left or right any number of degrees.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_turn.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldTextInput('90',
              blockly.FieldTextInput.numberValidator), 'VALUE')
          .appendTitle(msg.degrees());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  generator.draw_turn_by_constant = function() {
    // Generate JavaScript for turning left or right.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  generator.draw_move_inline = function() {
    // Generate JavaScript for moving forward or backward the internal number of
    // pixels.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };


  blockly.Language.draw_turn_inline_restricted = {
    // Block for turning either left or right from among a fixed set of angles.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_turn.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.VALUE), 'VALUE')
          .appendTitle(msg.degrees());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  blockly.Language.draw_turn_inline_restricted.VALUE =
      [30, 45, 60, 90, 120, 135, 150, 180].
      map(function(t) {return [String(t), String(t)];});

  generator.draw_turn_inline_restricted = function() {
    // Generate JavaScript for turning either left or right from among a fixed
    // set of angles.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_turn_inline = {
    // Block for turning left or right any number of degrees.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_turn.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldTextInput('90',
              blockly.FieldTextInput.numberValidator), 'VALUE')
          .appendTitle(msg.degrees());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  generator.draw_turn_inline = function() {
    // Generate JavaScript for turning left or right.
    var value = window.parseFloat(this.getTitleValue('VALUE'));
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.variables_get_counter = {
    // Variable getter.
    category: null,  // Variables are handled specially.
    helpUrl: blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(blockly.LANG_VARIABLES_GET_TITLE)
          .appendTitle(new blockly.FieldLabel(msg.loopVariable()), 'VAR');
      this.setOutput(true);
      this.setTooltip(blockly.LANG_VARIABLES_GET_TOOLTIP);
    },
    getVars: function() {
      return [this.getTitleValue('VAR')];
    }
  };

  generator.variables_get_counter = generator.variables_get;

  blockly.Language.variables_get_length = {
    // Variable getter.
    category: null,  // Variables are handled specially.
    helpUrl: blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(blockly.LANG_VARIABLES_GET_TITLE)
          .appendTitle(new blockly.FieldLabel('length'), 'VAR');
      this.setOutput(true);
      this.setTooltip(blockly.LANG_VARIABLES_GET_TOOLTIP);
    },
    getVars: function() {
      return [this.getTitleValue('VAR')];
    }
  };

  generator.variables_get_length = generator.variables_get;

  blockly.Language.variables_get_height = {
    // Variable getter.
    category: null,  // Variables are handled specially.
    helpUrl: blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(blockly.LANG_VARIABLES_GET_TITLE)
          .appendTitle(new blockly.FieldLabel('height'), 'VAR');
      this.setOutput(true);
      this.setTooltip(blockly.LANG_VARIABLES_GET_TOOLTIP);
    },
    getVars: function() {
      return [this.getTitleValue('VAR')];
    }
  };

  generator.variables_get_height = generator.variables_get;

  blockly.Language.variables_get_sides = {
    // Variable getter.
    category: null,  // Variables are handled specially.
    helpUrl: blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(blockly.LANG_VARIABLES_GET_TITLE)
          .appendTitle(new blockly.FieldLabel('sides'), 'VAR');
      this.setOutput(true);
      this.setTooltip(blockly.LANG_VARIABLES_GET_TOOLTIP);
    },
    getVars: function() {
      return [this.getTitleValue('VAR')];
    }
  };

  generator.variables_get_sides = generator.variables_get;

  // Create a fake "draw a square" function so it can be made available to users
  // without being shown in the workspace.
  blockly.Language.draw_a_square = {
    // Draw a square.
    init: function() {
      this.setColour(290);
      this.appendDummyInput()
          .appendTitle(msg.drawASquare());
      this.appendValueInput('VALUE')
          .setAlign(blockly.ALIGN_RIGHT)
          .setCheck('Number')
              .appendTitle(msg.lengthParameter() + ':');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip('');
    }
  };

  generator.draw_a_square = function() {
    // Generate JavaScript for drawing a square.
    var value_length = generator.valueToCode(
        this, 'VALUE', generator.ORDER_ATOMIC);
    var loopVar = generator.variableDB_.getDistinctName(
        'count', blockly.Variables.NAME_TYPE);
    return [
        // The generated comment helps detect required blocks.
        // Don't change it without changing REQUIRED_BLOCKS.
        '// draw_a_square',  
        'for (var ' + loopVar + ' = 0; ' + loopVar + ' < 4; ' +
              loopVar + '++) {',
        '  Turtle.moveForward(' + value_length + ');',
        '  Turtle.turnRight(90);',
        '}\n'].join('\n');
  };

  // Create a fake "draw a snowman" function so it can be made available to
  // users without being shown in the workspace.
  blockly.Language.draw_a_snowman = {
    // Draw a circle in front of the turtle, ending up on the opposite side.
    init: function() {
      this.setColour(290);
      this.appendDummyInput()
          .appendTitle(msg.drawASnowman());
      this.appendValueInput('VALUE')
          .setAlign(blockly.ALIGN_RIGHT)
          .setCheck('Number')
          .appendTitle(msg.heightParameter() + ':');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
    }
  };

  generator.draw_a_snowman = function() {
    // Generate JavaScript for drawing a snowman in front of the turtle.
    var value = generator.valueToCode(
        this, 'VALUE', generator.ORDER_ATOMIC);
    var distancesVar = generator.variableDB_.getDistinctName(
        'distances', blockly.Variables.NAME_TYPE);
    var loopVar = generator.variableDB_.getDistinctName(
        'counter', blockly.Variables.NAME_TYPE);
    var degreeVar = generator.variableDB_.getDistinctName(
        'degree', blockly.Variables.NAME_TYPE);
    var distanceVar = generator.variableDB_.getDistinctName(
        'distance', blockly.Variables.NAME_TYPE);
    return [
      // The generated comment helps detect required blocks.
      // Don't change it without changing REQUIRED_BLOCKS.
      '// draw_a_snowman',  
      'Turtle.turnLeft(90);',
      'var ' + distancesVar + ' = [' + value + ' * .5, ' + value + ' * .3,' +
          value + ' * .2];',
      'for (var ' + loopVar + ' = 0; ' + loopVar + ' < 6; ' +
          loopVar + '++) {\n',
      '  var ' + distanceVar + ' = ' + distancesVar + '[' + loopVar +
          ' < 3 ? ' + loopVar + ': 5 - ' + loopVar + '] / 57.5;',
      '  for (var ' + degreeVar + ' = 0; ' + degreeVar + ' < 90; ' +
          degreeVar + '++) {',
      '    Turtle.moveForward(' + distanceVar + ');',
      '    Turtle.turnRight(2);',
      '  }',
      '  if (' + loopVar + ' != 2) {',
      '    Turtle.turnLeft(180);',
      '  }',
      '}',
      'Turtle.turnLeft(90);\n'].join('\n');
  };

  // This is a modified copy of blockly.Language.controls_for with the
  // variable named "counter" hardcoded.
  blockly.Language.controls_for_counter = {
    // For loop with hardcoded loop variable.
    helpUrl: blockly.LANG_CONTROLS_FOR_HELPURL,
    init: function() {
      this.setColour(120);
      this.appendDummyInput()
          .appendTitle(blockly.LANG_CONTROLS_FOR_INPUT_WITH)
          .appendTitle(new blockly.FieldLabel(msg.loopVariable()),
                       'VAR');
      this.appendValueInput('FROM')
          .setCheck('Number')
          .setAlign(blockly.ALIGN_RIGHT)
          .appendTitle(blockly.LANG_CONTROLS_FOR_INPUT_FROM);
      this.appendValueInput('TO')
          .setCheck('Number')
          .setAlign(blockly.ALIGN_RIGHT)
          .appendTitle(blockly.LANG_CONTROLS_FOR_INPUT_TO);
      this.appendValueInput('BY')
          .setCheck('Number')
          .setAlign(blockly.ALIGN_RIGHT)
          .appendTitle(blockly.LANG_CONTROLS_FOR_INPUT_BY);
      if (blockly.LANG_CONTROLS_FOR_TAIL) {
        this.appendDummyInput()
            .appendTitle(blockly.LANG_CONTROLS_FOR_TAIL);
      }
      this.appendStatementInput('DO')
          .appendTitle(blockly.LANG_CONTROLS_FOR_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip(blockly.LANG_CONTROLS_FOR_TOOLTIP.replace(
          '%1', this.getTitleValue('VAR')));
    },
    getVars: function() {
      return [this.getTitleValue('VAR')];
    },
    customContextMenu: function(options) {
      var option = {enabled: true};
      var name = this.getTitleValue('VAR');
      option.text = blockly.LANG_VARIABLES_SET_CREATE_GET.replace('%1', name);
      var xmlTitle = goog.dom.createDom('title', null, name);
      xmlTitle.setAttribute('name', 'VAR');
      var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
      xmlBlock.setAttribute('type', 'variables_get_counter');
      option.callback = blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    }
  };

  generator.controls_for_counter = generator.controls_for;

  // Delete these standard blocks.
  delete blockly.Language.procedures_defreturn;
  delete blockly.Language.procedures_ifreturn;

  // General blocks.

  blockly.Language.draw_move = {
    // Block for moving forward or backwards.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendValueInput('VALUE')
          .setCheck('Number')
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_move.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(msg.dots());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.moveTooltip());
    }
  };

  blockly.Language.draw_move.DIRECTIONS =
      [[msg.moveForward(), 'moveForward'],
       [msg.moveBackward(), 'moveBackward']];

  generator.draw_move = function() {
    // Generate JavaScript for moving forward or backwards.
    var value = generator.valueToCode(this, 'VALUE',
        generator.ORDER_NONE) || '0';
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.jump = {
    // Block for moving forward or backwards.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendValueInput('VALUE')
          .setCheck('Number')
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.jump.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(msg.dots());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.jumpTooltip());
    }
  };

  blockly.Language.jump.DIRECTIONS =
      [[msg.jumpForward(), 'jumpForward'],
       [msg.jumpBackward(), 'jumpBackward']];

  generator.jump = function() {
    // Generate JavaScript for jumping forward or backwards.
    var value = generator.valueToCode(this, 'VALUE',
        generator.ORDER_NONE) || '0';
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_turn = {
    // Block for turning left or right.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendValueInput('VALUE')
          .setCheck('Number')
          .appendTitle(new blockly.FieldDropdown(
              blockly.Language.draw_turn.DIRECTIONS), 'DIR');
      this.appendDummyInput()
          .appendTitle(msg.degrees());
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  blockly.Language.draw_turn.DIRECTIONS =
      [[msg.turnRight(), 'turnRight'],
       [msg.turnLeft(), 'turnLeft']];

  generator.draw_turn = function() {
    // Generate JavaScript for turning left or right.
    var value = generator.valueToCode(this, 'VALUE',
        generator.ORDER_NONE) || '0';
    return 'Turtle.' + this.getTitleValue('DIR') +
        '(' + value + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_width = {
    // Block for setting the pen width.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendValueInput('WIDTH')
          .setCheck('Number')
          .appendTitle(msg.setWidth());
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.widthTooltip());
    }
  };

  generator.draw_width = function() {
    // Generate JavaScript for setting the pen width.
    var width = generator.valueToCode(this, 'WIDTH',
        generator.ORDER_NONE) || '1';
    return 'Turtle.penWidth(' + width + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_pen = {
    // Block for pen up/down.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.STATE), 'PEN');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.penTooltip());
    }
  };

  blockly.Language.draw_pen.STATE =
      [[msg.penUp(), 'penUp'],
       [msg.penDown(), 'penDown']];

  generator.draw_pen = function() {
    // Generate JavaScript for pen up/down.
    return 'Turtle.' + this.getTitleValue('PEN') +
        '(\'block_id_' + this.id + '\');\n';
  };

  blockly.Language.draw_colour = {
    // Block for setting the colour.
    helpUrl: '',
    init: function() {
      this.setColour(20);
      this.appendValueInput('COLOUR')
          .setCheck('Colour')
          .appendTitle(msg.setColour());
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip(msg.colourTooltip());
    }
  };

  generator.draw_colour = function() {
    // Generate JavaScript for setting the colour.
    var colour = generator.valueToCode(this, 'COLOUR',
        generator.ORDER_NONE) || '\'#000000\'';
    return 'Turtle.penColour(' + colour + ', \'block_id_' +
        this.id + '\');\n';
  };

  blockly.Language.turtle_visibility = {
    // Block for changing turtle visiblity.
    helpUrl: '',
    init: function() {
      this.setColour(160);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.STATE), 'VISIBILITY');
      this.setTooltip(msg.turtleVisibilityTooltip());
    }
  };

  blockly.Language.turtle_visibility.STATE =
      [[msg.hideTurtle(), 'hideTurtle'],
       [msg.showTurtle(), 'showTurtle']];

  generator.turtle_visibility = function() {
    // Generate JavaScript for changing turtle visibility.
    return 'Turtle.' + this.getTitleValue('VISIBILITY') +
        '(\'block_id_' + this.id + '\');\n';
  };

};
