/**
 * Blockly Demo: Maze
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
 * @fileoverview Demonstration of Blockly: Solving a maze.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

var msg = require('../../build/en_us/i18n/maze');

// Install extensions to Blockly's language and JavaScript generator.
exports.install = function(blockly, skin) {

  var generator = blockly.Generator.get('JavaScript');
  blockly.JavaScript = generator;

  blockly.Language.maze_moveForward = {
    // Block for moving forward.
    helpUrl: 'http://code.google.com/p/blockly/wiki/Move',
    init: function() {
      this.setColour(290);
      this.appendDummyInput()
          .appendTitle(msg.moveForward());
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.moveForwardTooltip());
    }
  };

  generator.maze_moveForward = function() {
    // Generate JavaScript for moving forward.
    return 'Maze.moveForward(\'block_id_' + this.id + '\');\n';
  };

  blockly.Language.maze_turn = {
    // Block for turning left or right.
    helpUrl: 'http://code.google.com/p/blockly/wiki/Turn',
    init: function() {
      this.setColour(290);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(msg.turnTooltip());
    }
  };

  blockly.Language.maze_turn.DIRECTIONS =
      [[msg.turnLeft() + ' \u27F2', 'turnLeft'],
       [msg.turnRight() + ' \u27F3', 'turnRight']];

  generator.maze_turn = function() {
    // Generate JavaScript for turning left or right.
    var dir = this.getTitleValue('DIR');
    return 'Maze.' + dir + '(\'block_id_' + this.id + '\');\n';
  };

  blockly.Language.maze_isPath = {
    // Block for checking if there a path.
    helpUrl: '',
    init: function() {
      this.setColour(210);
      this.setOutput(true, 'Boolean');
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
      this.setTooltip(msg.isPathTooltip());
    }
  };

  blockly.Language.maze_isPath.DIRECTIONS =
      [[msg.pathAhead(), 'isPathForward'],
       [msg.pathLeft() + ' \u27F2', 'isPathLeft'],
       [msg.pathRight() + ' \u27F3', 'isPathRight']];

  generator.maze_isPath = function() {
    // Generate JavaScript for checking if there is a path.
    var code = 'Maze.' + this.getTitleValue('DIR') + '()';
    return [code, generator.ORDER_FUNCTION_CALL];
  };

  blockly.Language.maze_if = {
    // Block for 'if' conditional if there is a path.
    helpUrl: '',
    init: function() {
      this.setColour(210);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
      this.appendStatementInput('DO')
          .appendTitle(msg.doCode());
      this.setTooltip(msg.ifTooltip());
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  blockly.Language.maze_if.DIRECTIONS =
      blockly.Language.maze_isPath.DIRECTIONS;

  generator.maze_if = function() {
    // Generate JavaScript for 'if' conditional if there is a path.
    var argument = 'Maze.' + this.getTitleValue('DIR') +
        '(\'block_id_' + this.id + '\')';
    var branch = generator.statementToCode(this, 'DO');
    var code = 'if (' + argument + ') {\n' + branch + '}\n';
    return code;
  };

  blockly.Language.maze_ifElse = {
    // Block for 'if/else' conditional if there is a path.
    helpUrl: '',
    init: function() {
      this.setColour(210);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
      this.appendStatementInput('DO')
          .appendTitle(msg.doCode());
      this.appendStatementInput('ELSE')
          .appendTitle(msg.elseCode());
      this.setTooltip(msg.ifelseTooltip());
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  blockly.Language.maze_ifElse.DIRECTIONS =
      blockly.Language.maze_isPath.DIRECTIONS;

  generator.maze_ifElse = function() {
    // Generate JavaScript for 'if/else' conditional if there is a path.
    var argument = 'Maze.' + this.getTitleValue('DIR') +
        '(\'block_id_' + this.id + '\')';
    var branch0 = generator.statementToCode(this, 'DO');
    var branch1 = generator.statementToCode(this, 'ELSE');
    var code = 'if (' + argument + ') {\n' + branch0 +
               '} else {\n' + branch1 + '}\n';
    return code;
  };

  blockly.Language.maze_forever = {
    // Do forever loop.
    helpUrl: 'http://code.google.com/p/blockly/wiki/Repeat',
    init: function() {
      this.setColour(120);
      this.appendDummyInput()
          .appendTitle(msg.repeatUntil())
          .appendTitle(new blockly.FieldImage(skin.goal, 12, 16));
      this.appendStatementInput('DO')
          .appendTitle(msg.doCode());
      this.setPreviousStatement(true);
      this.setTooltip(msg.whileTooltip());
    }
  };

  generator.maze_forever = function() {
    // Generate JavaScript for do forever loop.
    var branch = generator.statementToCode(this, 'DO');
    branch = BlocklyApps.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + this.id + '\'') + branch;
    return 'while (true) {\n' + branch + '}\n';
  };

};
