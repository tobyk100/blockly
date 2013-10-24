/**
 * Blockly Apps: Common code
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
 * @fileoverview Common support code for Blockly apps.
 * @author fraser@google.com (Neil Fraser)
 */
"use strict";
var BlocklyApps = module.exports;
var msg = require('../locale/current/common');
var parseXmlElement = require('./xml').parseElement;
var feedback = require('./feedback.js');
var addReadyListener = require('./dom').addReadyListener;
var responsive = require('./responsive');
var utils = require('./utils');

//TODO: These should be members of a BlocklyApp instance.
var onAttempt;
var onContinue;

/**
 * The parent directory of the apps. Contains common.js.
 */
BlocklyApps.BASE_URL = undefined;

/**
 * If the user presses backspace, stop propagation - this prevents blockly
 * from eating the backspace key
 * @param {!Event} e Keyboard event.
 */
var codeKeyDown = function(e) {
  if (e.keyCode == 8) {
    e.stopPropagation();
  }
};

/**
 * Common startup tasks for all apps.
 */
BlocklyApps.init = function(config) {
  if (!config) {
    config = {};
  }
  // Store configuration.
  onAttempt = config.onAttempt || function(report) {
    console.log('Attempt!');
    console.log(report);
    if (report.onComplete) {
      report.onComplete();
    }
  };
  onContinue = config.onContinue || function() {
    console.log('Continue!');
  };

  // Record time at initialization.
  BlocklyApps.initTime = new Date().getTime();

  // Fixes viewport for small screens.
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && screen.availWidth < 725) {
    viewport.setAttribute('content',
        'width=725, initial-scale=.35, user-scalable=no');
  }

  if (config.level.editCode) {
    BlocklyApps.editCode = true;
    var codeTextbox = document.getElementById('codeTextbox');
    var codeFunctions = config.level.codeFunctions;
    // Insert hint text from level codeFunctions into editCode area
    if (codeFunctions) {
      var hintText = "";
      for (var i = 0; i < codeFunctions.length; i++) {
        hintText = hintText + " " + codeFunctions[i].func + "();";
      }
      codeTextbox.innerHTML += msg.typeFuncs().replace('%1', hintText);
    }
    // Needed to prevent blockly from swallowing up the backspace key
    codeTextbox.addEventListener('keydown', codeKeyDown, true);
  }

  BlocklyApps.Dialog = config.Dialog;

  var showCode = document.getElementById('show-code-header');
  if (showCode) {
    utils.addClickTouchEvent(showCode, function() {
      feedback.showGeneratedCode(BlocklyApps.Dialog);
    });
  }

  BlocklyApps.ICON = config.skin.icon;

  if (BlocklyApps.Dialog) {
    exports.showInstructions(config.level.instructions);
  }

  // Add events for touch devices when the window is done loading.
  addReadyListener(BlocklyApps.addTouchEvents);

  if (exports.isMobile()) {
    responsive.forceLandscape();
  }
  if (exports.isPageShort()) {
    responsive.scrollPastHeader();
  }
};

exports.isMobile = function() {
  var reg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/;
  return reg.test(window.navigator.userAgent);
};

/**
 * Returns true if viewport is shorter than documentElement height.
 * False otherwise.
 */
exports.isPageShort = function() {
  var pageHeight = document.documentElement.getBoundingClientRect().height;
  return (window.innerHeight < pageHeight);
};

/**
 * @param {Object} options Configuration parameters for Blockly. Parameters are
 * optional and include:
 *  - {string} path The root path to the /blockly directory, defaults to the
 *    the directory in which this script is located.
 *  - {boolean} rtl True if the current language right to left.
 *  - {DomElement} toolbox The element in which to insert the toolbox,
 *    defaults to the element with 'toolbox'.
 *  - {boolean} trashcan True if the trashcan should be displayed, defaults to
 *    true.
 * @param {DomElement} div The parent div in which to insert Blockly.
 */
exports.inject = function(div, options) {
  var defaults = {
    path: BlocklyApps.BASE_URL,
    rtl: BlocklyApps.isRtl(),
    toolbox: document.getElementById('toolbox'),
    trashcan: true
  };
  Blockly.inject(div, utils.extend(defaults, options));
};

/**
 * Returns true if the current HTML page is in right-to-left language mode.
 */
BlocklyApps.isRtl = function() {
  var head = document.getElementsByTagName('head')[0];
  if (head && head.parentElement) {
    return head.parentElement.getAttribute('dir') == 'rtl';
  } else {
    return false;
  }
};

/**
 * Initialize Blockly for a readonly iframe.  Called on page load.
 * XML argument may be generated from the console with:
 * Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)).slice(5, -6)
 */
BlocklyApps.initReadonly = function(options) {
  Blockly.inject(document.getElementById('blockly'), {
    path: options.baseUrl,
    readOnly: true,
    rtl: BlocklyApps.isRtl(),
    scrollbars: false
  });
  BlocklyApps.loadBlocks(options.blocks);
};

/**
 * Load the editor with blocks.
 * @param {string} blocksXml Text representation of blocks.
 */
BlocklyApps.loadBlocks = function(blocksXml) {
  var xml = parseXmlElement(blocksXml);
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
};

exports.showInstructions = function(instructions) {
  var instructionsDiv = document.createElement('div');
  instructionsDiv.innerHTML = require('./templates/instructions.html')({
    instructions: instructions
  });

  var buttons = document.createElement('div');
  buttons.innerHTML = require('./templates/buttons.html')({
    data: {
      ok: true
    }
  });

  instructionsDiv.appendChild(buttons);

  var dialog = feedback.createModalDialogWithIcon(BlocklyApps.Dialog,
                                                  instructionsDiv);
  dialog.show();

  var okayButton = document.getElementById('ok-button');
  if (okayButton) {
    utils.addClickTouchEvent(okayButton, function() {
      dialog.hide();
    });
  }

  var promptDiv = document.getElementById('prompt');
  promptDiv.innerHTML = instructions;

  var promptIcon = document.getElementById('prompt-icon');
  promptIcon.src = BlocklyApps.ICON;
};

/**
 *  Resizes the blockly workspace.
 */
BlocklyApps.onResize = function(gameWidth) {
  gameWidth = gameWidth || 0;
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var codeTextbox = document.getElementById('codeTextbox');

  // resize either blockly or codetextbox
  var div = BlocklyApps.editCode ? codeTextbox : blocklyDiv;

  var blocklyDivParent = blocklyDiv.parentNode;
  var parentStyle = window.getComputedStyle ?
                    window.getComputedStyle(blocklyDivParent) :
                    blocklyDivParent.currentStyle.width;  // IE

  var parentWidth = parseInt(parentStyle.width, 10);
  var parentHeight = parseInt(parentStyle.height, 10);

  div.style.top = blocklyDivParent.offsetTop + 'px';
  div.style.width = Math.min(1200, (parentWidth - gameWidth - 40)) + 'px';
  div.style.marginLeft = (gameWidth + 15) + 'px';
  div.style.height = parentHeight + 'px';

  BlocklyApps.resizeHeaders();
};

BlocklyApps.resizeHeaders = function() {
  var categoriesWidth = 0;
  var categories = Blockly.Toolbox.HtmlDiv;
  if (categories) {
    categoriesWidth = parseInt(window.getComputedStyle(categories).width, 10);
  }

  var workspaceWidth = Blockly.getWorkspaceWidth();
  var toolboxWidth = Blockly.getToolboxWidth();

  var workspaceHeader = document.getElementById('workspace-header');
  var toolboxHeader = document.getElementById('toolbox-header');
  var showCodeHeader = document.getElementById('show-code-header');

  var showCodeWidth = parseInt(window.getComputedStyle(showCodeHeader).width,
                               10);

  toolboxHeader.style.width = (categoriesWidth + toolboxWidth) + 'px';
  workspaceHeader.style.width = (workspaceWidth -
                                 toolboxWidth -
                                 showCodeWidth) + 'px';
};

/**
 * Highlight the block (or clear highlighting).
 * @param {?string} id ID of block that triggered this action.
 */
BlocklyApps.highlight = function(id) {
  if (id) {
    var m = id.match(/^block_id_(\d+)$/);
    if (m) {
      id = m[1];
    }
  }
  Blockly.mainWorkspace.highlightBlock(id);
};

/**
 * If the user has executed too many actions, we're probably in an infinite
 * loop.  Sadly I wasn't able to solve the Halting Problem.
 * @param {?string} opt_id ID of loop block to highlight.
 * @throws {Infinity} Throws an error to terminate the user's program.
 */
BlocklyApps.checkTimeout = function(opt_id) {
  if (opt_id) {
    BlocklyApps.log.push([null, opt_id]);
  }
  if (BlocklyApps.ticks-- < 0) {
    throw Infinity;
  }
};

/**
 * On touch enabled browsers, add touch-friendly variants of event handlers
 * for elements such as buttons whose event handlers are specified in the
 * markup. For example, ontouchend is treated as equivalent to onclick.
 */
BlocklyApps.addTouchEvents = function() {
  // Do nothing if the browser doesn't support touch.
  if (!('ontouchstart' in document.documentElement)) {
    return;
  }
  // Treat ontouchend as equivalent to onclick for buttons.
  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (!button.ontouchend) {
      button.ontouchend = button.onclick;
    }
  }
};

// The following properties get their non-default values set by the application.

/**
 * Whether to alert user to empty blocks, short-circuiting all other tests.
 */
BlocklyApps.CHECK_FOR_EMPTY_BLOCKS = undefined;

/**
 * The ideal number of blocks to solve this level.  Users only get 2
 * stars if they use more than this number.
 * @type {!number=}
 */
BlocklyApps.IDEAL_BLOCK_NUM = undefined;

/**
 * An array of dictionaries representing required blocks.  Keys are:
 * - test (required): A test whether the block is present, either:
 *   - A string, in which case the string is searched for in the generated code.
 *   - A single-argument function is called on each user-added block
 *     individually.  If any call returns true, the block is deemed present.
 *     "User-added" blocks are ones that are neither disabled or undeletable.
 * - type (required): The type of block to be produced for display to the user
 *   if the test failed.
 * - titles (optional): A dictionary, where, for each KEY-VALUE pair, this is
 *   added to the block definition: <title name="KEY">VALUE</title>.
 * - value (optional): A dictionary, where, for each KEY-VALUE pair, this is
 *   added to the block definition: <value name="KEY">VALUE</value>
 * - extra (optional): A string that should be blacked between the "block"
 *   start and end tags.
 * @type {!Array=}
 */
BlocklyApps.REQUIRED_BLOCKS = undefined;

/**
 * The number of required blocks to give hints about at any one time.
 * Set this to Infinity to show all.
 * @type {!number=}
 */
BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG = undefined;

/**
 * Flag indicating whether the last program run completed the level.
 * @type {?boolean}
 */
BlocklyApps.levelComplete = null;

/**
 * Transcript of user's actions.  The format is application-dependent.
 * @type {?Array.<Array>}
 */
BlocklyApps.log = null;

/**
 * The number of steps remaining before the currently running program
 * is deemed to be in an infinite loop and terminated.
 * @type {?number}
 */
BlocklyApps.ticks = null;

/**
 * The number of attempts (how many times the run button has been pressed)
 * @type {?number}
 */
BlocklyApps.attempts = 0;

/**
 * Stores the time at init. The delta to current time is used for logging
 * and reporting to capture how long it took to arrive at an attempt.
 * @type {?number}
 */
BlocklyApps.initTime = undefined;

/**
 * Reset the playing field to the start position and kill any pending
 * animation tasks.  This will benerally be replaced by an application.
 * @param {boolean} first True if an opening animation is to be played.
 */
BlocklyApps.reset = function(first) {};

/**
 * Enumeration of test results.
 * BlocklyApps.getTestResults() runs checks in the below order.
 * EMPTY_BLOCKS_FAIL can only occur if BlocklyApps.CHECK_FOR_EMPTY_BLOCKS true.
 */
BlocklyApps.TestResults = {
  NO_TESTS_RUN: -1,           // Default.
  FREE_PLAY: 0,               // 0 stars, try again or continue.
  EMPTY_BLOCK_FAIL: 1,        // 0 stars.
  TOO_FEW_BLOCKS_FAIL: 2,     // 0 stars.
  LEVEL_INCOMPLETE_FAIL: 3,   // 0 stars.
  MISSING_BLOCK_UNFINISHED: 4,// 0 star.
  MISSING_BLOCK_FINISHED: 10, // 1 star.
  OTHER_1_STAR_FAIL: 11,      // Application-specific 1-star failure.
  TOO_MANY_BLOCKS_FAIL: 20,   // 2 stars.
  OTHER_2_STAR_FAIL: 21,      // Application-specific 2-star failure.
  ALL_PASS: 100               // 3 stars.
};

/**
 * Updates the document's 'capacity' element's innerHTML with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from Blockly.mainWorkspace.remainingCapacity().
 */
BlocklyApps.updateCapacity = function() {
  var cap = Blockly.mainWorkspace.remainingCapacity();
  var p = document.getElementById('capacity');
  if (cap == Infinity) {
    p.style.display = 'none';
  } else {
    p.style.display = 'inline';
    if (cap === 0) {
      p.innerHTML = msg.capacity0();
    } else if (cap === 1) {
      p.innerHTML = msg.capacity1();
    } else {
      cap = Number(cap);
      p.innerHTML = msg.capacity2().replace('%1', cap);
    }
  }
};

// Methods for determining and displaying feedback.

/**
 * Display feedback based on test results.  The test results must be
 * explicitly provided.
 * @param {{feedbackType: number}} Test results (a constant property of
 *     BlocklyApps.TestResults).
 */
BlocklyApps.displayFeedback = function(options) {
  feedback.displayFeedback(options, BlocklyApps.Dialog, onContinue);
};

BlocklyApps.getTestResults = function() {
  return feedback.getTestResults();
};

BlocklyApps.hasEmptyTopLevelBlocks = function() {
  return feedback.hasEmptyTopLevelBlocks();
};

/**
 * Report back to the server, if available.
 * @param {string} app The name of the application.
 * @param {number} id A unique identifier generated when the page was loaded.
 * @param {string} levelId The ID of the current level.
 * @param {number} result An indicator of the success of the code.
 * @param {number} testResult More specific data on success or failure of code.
 * @param {string} program The user program, which will get URL-encoded.
 * @param {function} onComplete Function to be called upon completion.
 */
BlocklyApps.report =
    function(app, levelId, result, testResult, program, onComplete) {
  var report = {
    app: app,
    level: levelId,
    result: result,
    testResult: testResult,
    program: encodeURIComponent(program),
    attempt: BlocklyApps.attempts,
    time: ((new Date().getTime()) - BlocklyApps.initTime),
    onComplete: onComplete
  };
  onAttempt(report);
};

/**
 * Click the reset button.  Reset the application.
 */
BlocklyApps.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  Blockly.mainWorkspace.traceOn(false);
  BlocklyApps.reset(false);
};
