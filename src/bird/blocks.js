/**
 * Blockly Apps: Bird Blocks
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Blocks for Blockly's Bird application.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

var msg = require('../../build/en_us/i18n/bird');

// Install extensions to Blockly's language and JavaScript generator.
exports.install = function(blockly) {

  var generator = blockly.Generator.get('JavaScript');
  blockly.JavaScript = generator;

  blockly.Language.bird_hungry = {
    // Block for hungry condition.
    helpUrl: '',
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(msg.hungry());
      this.setOutput(true, 'Boolean');
      this.setTooltip(msg.hungryTooltip());
    }
  };

  generator.bird_hungry = function() {
    // Generate JavaScript for hungry condition.
    return ['Bird.isHungry', generator.ORDER_MEMBER];
  };

  blockly.Language.bird_heading = {
    // Block for moving bird in a direction.
    helpUrl: '',
    init: function() {
      this.setColour(290);
      this.appendDummyInput()
          .appendTitle(msg.heading())
          .appendTitle(new blockly.FieldAngle('90'), 'ANGLE');
      this.setPreviousStatement(true);
      this.setTooltip(msg.headingTooltip());
    }
  };

  generator.bird_heading = function() {
    // Generate JavaScript for moving bird in a direction.
    var dir = this.getTitleValue('ANGLE');
    return 'Bird.heading(' + dir + ', \'block_id_' + this.id + '\');\n';
  };

  blockly.Language.bird_position = {
    // Block for getting bird's x or y position.
    helpUrl: '',
    init: function() {
      this.setColour(330);
      this.appendDummyInput()
          .appendTitle(new blockly.FieldDropdown([['x', 'X'], ['y', 'Y']]), 'XY');
      this.setOutput(true, 'Number');
      this.setTooltip(msg.positionTooltip());
    }
  };

  generator.bird_position = function() {
    // Generate JavaScript for getting bird's x or y position.
    var code = 'Bird.' + this.getTitleValue('XY');
    return [code, generator.ORDER_MEMBER];
  };

  blockly.Language.bird_compare = {
    // Block for comparing bird's x or y position with a number.
    helpUrl: blockly.LANG_LOGIC_COMPARE_HELPURL,
    init: function() {
      if (blockly.RTL) {
        var OPERATORS = [['>', 'LT'], ['<', 'GT']];
      } else {
        var OPERATORS = [['<', 'LT'], ['>', 'GT']];
      }
      this.setColour(210);
      this.setOutput(true, 'Boolean');
      this.appendValueInput('A')
          .setCheck('Number');
      this.appendValueInput('B')
          .setCheck('Number')
          .appendTitle(new blockly.FieldDropdown(OPERATORS), 'OP');
      this.setInputsInline(true);
      // Assign 'this' to a variable for use in the tooltip closure below.
      var thisBlock = this;
      this.setTooltip(function() {
        var op = thisBlock.getTitleValue('OP');
        return thisBlock.TOOLTIPS[op];
      });
    }
  };

  blockly.Language.bird_compare.TOOLTIPS = {
    LT: blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
    GT: blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT
  };

  generator.bird_compare = function() {
    // Generate JavaScript for comparing bird's x or y position with a number.
    var operator = (this.getTitleValue('OP') == 'LT') ? '<' : '>';
    var order = generator.ORDER_RELATIONAL;
    var argument0 = generator.valueToCode(this, 'A', order) || '0';
    var argument1 = generator.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  };

  blockly.Language.bird_and = {
    // Block for logical operator 'and'.
    helpUrl: blockly.LANG_LOGIC_OPERATION_HELPURL,
    init: function() {
      this.setColour(210);
      this.setOutput(true, 'Boolean');
      this.appendValueInput('A')
          .setCheck('Boolean');
      this.appendValueInput('B')
          .setCheck('Boolean')
          .appendTitle('and', 'AND');
      this.setInputsInline(true);
      this.setTooltip(blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND);
    }
  };

  generator.bird_and = function() {
    // Generate JavaScript for logical operator 'and'.
    var order = generator.ORDER_LOGICAL_AND;
    var argument0 = generator.valueToCode(this, 'A', order) || 'false';
    var argument1 = generator.valueToCode(this, 'B', order) || 'false';
    var code = argument0 + ' && ' + argument1;
    return [code, order];
  };

  blockly.Language.bird_ifElse = {
    // Block for 'if/else'.
    helpUrl: blockly.LANG_CONTROLS_IF_HELPURL,
    init: function() {
      this.setColour(210);
      this.appendValueInput("CONDITION")
          .appendTitle(msg.if())
          .setCheck("Boolean");
      this.appendStatementInput('DO')
          .appendTitle(msg.doCode());
      this.appendStatementInput('ELSE')
          .appendTitle(msg.elseCode());
      this.setDeletable(false);
      this.setTooltip(blockly.LANG_CONTROLS_IF_TOOLTIP_2);
    }
  };

  generator.bird_ifElse = function() {
    // Generate JavaScript for 'if/else' conditional.
    var argument = generator.valueToCode(this, 'CONDITION',
                   generator.ORDER_ATOMIC) || 'false';
    var branch0 = generator.statementToCode(this, 'DO');
    var branch1 = generator.statementToCode(this, 'ELSE');
    var code = 'if (' + argument + ') {\n' + branch0 +
               '} else {\n' + branch1 + '}\n';
    return code;
  };

  blockly.Language.controls_if.oldInit = blockly.Language.controls_if.init;

  blockly.Language.controls_if.init = function() {
    this.oldInit();
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setDeletable(false);
  };

};
