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
'use strict';

var BlocklyApps = module.exports;
var msg = require('../build/en_us/i18n/common');
var dialog = require('./dialog');

/**
 * The parent directory of the apps. Contains common.js.
 */
BlocklyApps.BASE_URL = (function() {
  // This implementation gaurantees the correct absolute path regardless of
  // hosting solution.
  var scripts = document.getElementsByTagName('script');
  // Scripts are executed synchronously so this script is the most recently
  // loaded.
  var thisScript = scripts[scripts.length - 1];
  var baseUrl = thisScript.src;
  var parentUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
  return parentUrl + '../'; //XXX
})();

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
BlocklyApps.getStringParamFromUrl = function(name, defaultValue) {
  var val =
      window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Extracts a numeric parameter from the URL.
 * If the parameter is absent or less than min_value, min_value is
 * returned.  If it is greater than max_value, max_value is returned.
 * @param {string} name The name of the parameter.
 * @param {number} minValue The minimum legal value.
 * @param {number} maxValue The maximum legal value.
 * @return {number} A number in the range [min_value, max_value].
 */
BlocklyApps.getNumberParamFromUrl = function(name, minValue, maxValue) {
  var val = Number(BlocklyApps.getStringParamFromUrl(name, 'NaN'));
  return isNaN(val) ? minValue : Math.min(Math.max(minValue, val), maxValue);
};

/**
 * Common startup tasks for all apps.
 */
BlocklyApps.init = function() {
  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById('linkButton');
  if ('BlocklyStorage' in window) {
    BlocklyStorage.HTTPREQUEST_ERROR = msg.httpRequestError();
    BlocklyStorage.LINK_ALERT = msg.linkAlert();
    BlocklyStorage.HASH_ERROR = msg.hashError();
    BlocklyStorage.XML_ERROR = msg.xmlError();
    // Swap out the BlocklyStorage's alert() for a nicer dialog.
    BlocklyStorage.alert = BlocklyApps.storageAlert;
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }

  // Fixes viewport for small screens.
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && screen.availWidth < 725) {
    viewport.setAttribute('content',
        'width=725, initial-scale=.35, user-scalable=no');
  }
};

/**
 * Returns true if the current HTML page is in right-to-left language mode.
 */
BlocklyApps.isRtl = function() {
  document.head.parentElement.getAttribute('dir') == 'rtl';
};

/**
 * Initialize Blockly for a readonly iframe.  Called on page load.
 * XML argument may be generated from the console with:
 * Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)).slice(5, -6)
 */
BlocklyApps.initReadonly = function() {
  Blockly.inject(document.getElementById('blockly'),
      {path: BlocklyApps.BASE_URL,
       readOnly: true,
       rtl: BlocklyApps.isRtl(),
       scrollbars: false});

  // Add the blocks.
  var xml = BlocklyApps.getStringParamFromUrl('xml', '');
  var parsed_xml = Blockly.Xml.textToDom('<xml>' + xml + '</xml>');
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, parsed_xml);
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
BlocklyApps.loadBlocks = function(defaultXml) {
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (window.sessionStorage.loadOnceBlocks) {
    // Language switching stores the blocks during the reload.
    var text = window.sessionStorage.loadOnceBlocks;
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 *  Resizes the blockly workspace.
 */
BlocklyApps.onResize = function() {
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var top = visualization.offsetTop;
  var scrollY = window.scrollY;
  blocklyDiv.style.top = Math.max(top, scrollY) + 'px';
  var svg = document.getElementById('svgMaze');

  var blocklyDivParent = blocklyDiv.parentNode;
  var parentStyle = window.getComputedStyle ?
                    window.getComputedStyle(blocklyDivParent) :
                    blocklyDivParent.currentStyle.width;  // IE
  var parentWidth = parseInt(parentStyle.width);
  var parentHeight = window.innerHeight - parseInt(blocklyDiv.style.top) +
    scrollY - 20;

  blocklyDiv.style.width = (parentWidth - svg.clientWidth - 40) + 'px';
  blocklyDiv.style.height = parentHeight + 'px';
  blocklyDiv.style.marginLeft = (svg.clientWidth + 15) + 'px';
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
 * Hide the dialog pop-up and interstitials.
 * @param {boolean} opt_animate Animate the dialog closing.  Defaults to true.
 *     Requires that origin was not null when dialog was opened.
 */
BlocklyApps.hideDialog = function(opt_animate) {
  dialog.hide(opt_animate);
  BlocklyApps.hideInterstitial();
};

/**
 * Display a storage-related modal dialog.
 * @param {string} message Text to alert.
 */
BlocklyApps.storageAlert = function(message) {
  var container = document.getElementById('containerStorage');
  container.innerHTML = '';
  var lines = message.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(lines[i]));
    container.appendChild(p);
  }

  var content = document.getElementById('dialogStorage');
  var origin = document.getElementById('linkButton');
  var style = {
    width: '50%',
    left: '25%',
    top: '5em'
  };
  dialog.show(content, origin, true, true, style, function() {
    content.parentNode.removeChild(content);
  });
};

/**
 * JavaScript code used to bail out of infinite loops.
 */
BlocklyApps.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout();\n';

/**
 * Convert the user's code to raw JavaScript.
 * @param {string} code Generated code.
 * @return {string} The code without serial numbers and timeout checks.
 */
BlocklyApps.stripCode = function(code) {
  // Strip out serial numbers.
  code = code.replace(/(,\s*)?'block_id_\d+'\)/g, ')');
  // Remove timeouts.
  var regex = new RegExp(BlocklyApps.INFINITE_LOOP_TRAP
      .replace('(%1)', '\\((\'\\d+\')?\\)'), 'g');
  return code.replace(regex, '');
};

/**
 * Show the user's code in raw JavaScript.
 * @param {Element} origin Animate the dialog opening/closing from/to this
 *     DOM element.  If null, don't show any animations for opening or closing.
 */
BlocklyApps.showCode = function(origin) {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = BlocklyApps.stripCode(code);
  var pre = document.getElementById('containerCode');
  pre.innerHTML = '';
  // Inject the code as a textNode, then extract with innerHTML, thus escaping.
  pre.appendChild(document.createTextNode(code));
  if (typeof prettyPrintOne == 'function') {
    code = pre.innerHTML;
    code = prettyPrintOne(code, 'js');
    pre.innerHTML = code;
  }

  var content = document.getElementById('dialogCode');
  var style = {
    width: '40%',
    left: '30%',
    top: '5em'
  };
  dialog.show(content, origin, true, true, style);
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
  for (var i = 0, button; button = buttons[i]; i++) {
    if (!button.ontouchend) {
      button.ontouchend = button.onclick;
    }
  }
};

// Add events for touch devices when the window is done loading.
window.addEventListener('load', BlocklyApps.addTouchEvents, false);

/**
 * Load the Prettify CSS and JavaScript.
 */
BlocklyApps.importPrettify = function() {
  // <link rel="stylesheet" type="text/css" href="../prettify.css">
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', BlocklyApps.BASE_URL + 'prettify.css');
  document.head.appendChild(link);
  // <script type="text/javascript" src="../prettify.js"></script>
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', BlocklyApps.BASE_URL + 'prettify.js');
  document.head.appendChild(script);
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
  NO_TESTS_RUN: -1,          // Default.
  EMPTY_BLOCK_FAIL: 1,       // 0 stars.
  MISSING_BLOCK_FAIL: 2,     // 1 star.
  TOO_FEW_BLOCKS_FAIL: 3,    // 0 stars.
  LEVEL_INCOMPLETE_FAIL: 4,  // 0 stars.
  TOO_MANY_BLOCKS_FAIL: 5,   // 2 stars.
  OTHER_1_STAR_FAIL: 6,      // Application-specific 1-star failure.
  OTHER_2_STAR_FAIL: 7,      // Application-specific 2-star failure.
  ALL_PASS: 0                // 3 stars.
};

/**
 * The interstital setting for each level defined in the application.
 * @type {!Array=}
 */
BlocklyApps.INTERSTITIALS = undefined;

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
    if (cap == 0) {
      p.innerHTML = msg.capacity0();
    } else if (cap == 1) {
      p.innerHTML = msg.capacity1();
    } else {
      cap = Number(cap);
      p.innerHTML = msg.capacity2().replace('%1', cap);
    }
  }
};

// Methods for determining and displaying feedback.

/**
 * Display feedback based on test results.  The test results can be
 * explicitly provied so a specific application (namely Turtle) can generate
 * test results in its own way and display feedback.
 * @param {?number} opt_feedbackType Test results (a constant property of
 *     BlocklyApps.TestResults).
 */
BlocklyApps.displayFeedback = function(options) {
  if (!options) {
    options = {};
  }
  options.feedbackType = options.feedbackType || BlocklyApps.getTestResults();
  BlocklyApps.hideFeedback();
  BlocklyApps.setErrorFeedback(options);
  BlocklyApps.prepareFeedback(options);
  BlocklyApps.displayCloseDialogButtons(options.feedbackType);
  BlocklyApps.showHelp(true, options.feedbackType);
};

/**
 * Check user's code for empty top-level blocks e.g. 'repeat'.
 * @return {boolean} true if block is empty (no blocks are nested inside).
 */
BlocklyApps.hasEmptyTopLevelBlocks = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = BlocklyApps.stripCode(code);
  return /\{\s*\}/.test(code);
};

/**
 * Check whether the user code has all the blocks required for the level.
 * @return {boolean} true if all blocks are present, false otherwise.
 */
BlocklyApps.hasAllRequiredBlocks = function() {
  return BlocklyApps.getMissingRequiredBlocks().length == 0;
};

/**
 * Get blocks that the user intends in the program, namely any that
 * are not disabled and can be deleted.
 * @return {Array<Object>} The blocks.
 */
BlocklyApps.getUserBlocks_ = function() {
  var allBlocks = Blockly.mainWorkspace.getAllBlocks();
  var blocks = allBlocks.filter(
      function(block) {
        return !block.disabled && block.isDeletable();
      });
  return blocks;
};

/**
 * Check to see if the user's code contains the required blocks for a level.
 * This never returns more than BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG.
 * @return {!Array} array of array of strings where each array of strings is
 * a set of blocks that at least one of them should be used. Each block is
 * represented as the prefix of an id in the corresponding template.soy.
 */
BlocklyApps.getMissingRequiredBlocks = function() {
  var missingBlocks = [];
  var code = null;  // JavaScript code, which is initalized lazily.
  if (BlocklyApps.REQUIRED_BLOCKS && BlocklyApps.REQUIRED_BLOCKS.length) {
    var blocks = BlocklyApps.getUserBlocks_();
    // For each list of required blocks
    // Keep track of the number of the missing block lists. It should not be
    // bigger than BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG
    var missingBlockNum = 0;
    for (var i = 0;
         i < BlocklyApps.REQUIRED_BLOCKS.length &&
             missingBlockNum < BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG;
         i++) {
      var tests = BlocklyApps.REQUIRED_BLOCKS[i];
      // For each of the test
      // If at least one of the tests succeeded, we consider the required block
      // is used
      var usedRequiredBlock = false;
      for (var testId = 0; testId < tests.length; testId++) {
        var test = tests[testId].test;
        if (typeof test === 'string') {
          if (!code) {
            code = Blockly.Generator.workspaceToCode('JavaScript');
          }
          if (code.indexOf(test) !== -1) {
            // Succeeded, moving to the next list of tests
            usedRequiredBlock = true;
            break;
          }
        } else if (typeof test === 'function') {
          if (blocks.some(test)) {
            // Succeeded, moving to the next list of tests
            usedRequiredBlock = true;
            break;
          }
        } else {
          window.alert('Bad test: ' + test);
        }
      }
      if (!usedRequiredBlock) {
        missingBlockNum++;
        missingBlocks = missingBlocks.concat(BlocklyApps.REQUIRED_BLOCKS[i]);
      }
    }
  }
  return missingBlocks;
};

/**
 * Counts the number of blocks used.  Blocks are only counted if they are
 * not disabled, are deletable, and match BlocklyApps.FREE_BLOCKS_FILTER,
 * if defined.
 * @return {number} Number of blocks used.
 */
BlocklyApps.getNumBlocksUsed = function() {
  var blocks = BlocklyApps.getUserBlocks_();
  if (!BlocklyApps.FREE_BLOCKS) {
    return blocks.length;
  }
  var count = 0;
  for (var i = 0; i < blocks.length; i++) {
    if (!blocks[i].type.match(BlocklyApps.FREE_BLOCKS)) {
      count++;
    }
  }
  return count;
};

/**
 * Runs the tests and returns results.
 * @return {number} The appropriate property of BlocklyApps.TestResults.
 */
BlocklyApps.getTestResults = function() {
  if (BlocklyApps.CHECK_FOR_EMPTY_BLOCKS &&
      BlocklyApps.hasEmptyTopLevelBlocks()) {
    return BlocklyApps.TestResults.EMPTY_BLOCK_FAIL;
  }
  if (!BlocklyApps.hasAllRequiredBlocks()) {
    return BlocklyApps.TestResults.MISSING_BLOCK_FAIL;
  }
  var numBlocksUsed = BlocklyApps.getNumBlocksUsed();
  if (!BlocklyApps.levelComplete) {
    if (BlocklyApps.IDEAL_BLOCK_NUM &&
        numBlocksUsed < BlocklyApps.IDEAL_BLOCK_NUM) {
      return BlocklyApps.TestResults.TOO_FEW_BLOCKS_FAIL;
    }
    return BlocklyApps.TestResults.LEVEL_INCOMPLETE_FAIL;
  }
  if (BlocklyApps.IDEAL_BLOCK_NUM &&
      numBlocksUsed > BlocklyApps.IDEAL_BLOCK_NUM) {
    return BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL;
  } else {
    return BlocklyApps.TestResults.ALL_PASS;
  }
};

/**
 * Show stars based on the degree of completion and if the level is complete.
 * @param {number} numStars The number of stars to display.
 */
BlocklyApps.displayStars = function(numStars) {
  document.getElementById('star' + numStars).style.display = 'block';
};

/**
 * Sets appropriate feedback for when the modal dialog is displayed.
 * @param {number} feedbackType A constant property of BlocklyApps.TestResults,
 *     typically produced by BlocklyApps.getTestResults().
 */
BlocklyApps.setErrorFeedback = function(options) {
  switch (options.feedbackType) {
    // Give hint, not stars, for empty block or not finishing level.
    case BlocklyApps.TestResults.EMPTY_BLOCK_FAIL:
      document.getElementById('emptyBlocksError').style.display = 'list-item';
      break;
    case BlocklyApps.TestResults.TOO_FEW_BLOCKS_FAIL:
      document.getElementById('tooFewBlocksError').style.display = 'list-item';
      break;
    case BlocklyApps.TestResults.LEVEL_INCOMPLETE_FAIL:
      document.getElementById('levelIncompleteError')
          .style.display = 'list-item';
      break;

    // For completing level, user gets at least one star.
    case BlocklyApps.TestResults.OTHER_1_STAR_FAIL:
      BlocklyApps.displayStars(1);
      document.getElementById('appSpecificOneStarFeedback')
            .style.display = 'list-item';
      break;
    // One star for failing to use required blocks but only if level completed.
    case BlocklyApps.TestResults.MISSING_BLOCK_FAIL:
      // For each error type in the array, display the corresponding error.
      var missingBlocks = BlocklyApps.getMissingRequiredBlocks();
      if (missingBlocks.length) {
        document.getElementById('missingBlocksError')
            .style.display = 'list-item';
        document.getElementById('feedbackBlocks').src =
            BlocklyApps.BASE_URL + options.app + '/readonly.html?xml=' +
            BlocklyApps.generateXMLForBlocks(missingBlocks);
        document.getElementById('feedbackBlocks').style.display = 'block';
      }
      if (BlocklyApps.levelComplete) {
        BlocklyApps.displayStars(1);
      }
      break;

    // Two stars for using too many blocks.
    case BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL:
      BlocklyApps.displayStars(2);
      BlocklyApps.setTextForElement(
          'tooManyBlocksError',
          msg.numBlocksNeeded().replace(
              '%1', BlocklyApps.IDEAL_BLOCK_NUM).replace(
                  '%2', BlocklyApps.getNumBlocksUsed())).style.display =
                      'list-item';
      break;
    case BlocklyApps.TestResults.OTHER_2_STAR_FAIL:
      BlocklyApps.displayStars(2);
      document.getElementById('appSpecificTwoStarFeedback')
            .style.display = 'list-item';
      break;

    // Three stars!
    case BlocklyApps.TestResults.ALL_PASS:
      BlocklyApps.displayStars(3);
      break;
  }
};

/**
 * Where to report back information about the user program.
 * Undefined if no server given to report to.
 */

BlocklyApps.REPORT_URL = BlocklyApps.getStringParamFromUrl('callback_url');

/**
 * Caches the current report to send to the server. An app can set this
 * variable and continue to execute.
 */
var latestReport_ = undefined;

/**
 * Report back to the server, if available.
 * @param {string} app The name of the application.
 * @param {number} id A unique identifier generated when the page was loaded.
 * @param {number} level The current level of the application.
 * @param {number} result An indicator of the success of the code.
 * @param {string} program The user program, which will get URL-encoded.
 */
BlocklyApps.report = function(app, level, result, program) {
  latestReport_ = {
    'app': app,
    'level': level,
    'result': result,
    'attempt': 1,  // TODO(toby): implement
    'time': 1,  // TODO(toby): implement
    'program': encodeURIComponent(program)
  };
};

/**
 * Send the latest report set by BlocklyApps.report and redirect based
 * on the response from the server.
 */
BlocklyApps.reportAndRedirect = function() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onload = function() {
    var response = JSON.parse(httpRequest.responseText);
    var redirect = response['redirect'];
    if (redirect) {
      window.location.href = redirect;
    }
  };
  httpRequest.open('POST', BlocklyApps.REPORT_URL);
  httpRequest.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  var query = [];
  for (var key in latestReport_) {
    query.push(key + '=' + latestReport_[key]);
  }
  query = query.join('&');
  httpRequest.send(query);
};

/**
 * Prepare feedback to display after the user's program has finished running.
 * Specifically, set colours and buttons of feedback added through
 * BlocklyApps.displayFeedback();
 * @param {number} options.feedbackType A constant property of BlocklyApps.TestResults.
 */
BlocklyApps.prepareFeedback = function(options) {
  if (!options) {
    options = {};
  }
  // Determine colour and buttons.
  var feedbackText = document.getElementById('levelFeedbackText');
  if (options.feedbackType == BlocklyApps.TestResults.ALL_PASS) {
    feedbackText.style.color = 'green';
    feedbackText.style.textAlign = 'center';
    document.getElementById('hintTitle').style.display = 'none';
    if (options.finalLevel) {
      document.getElementById('finalLevelMsg').style.display = 'list-item';
    } else {
      document.getElementById('nextLevelMsg').style.display = 'list-item';
    }
  } else {
    feedbackText.style.color = 'red';
    feedbackText.style.textAlign = 'left';
    document.getElementById('hintTitle').style.display = 'inline';
  }
  feedbackText.style.display = 'block';
};

/**
 * Hide end of level feedback.
 */
BlocklyApps.hideFeedback = function() {
  document.getElementById('levelFeedbackText').style.display = 'none';
  var feedbackArray = document.querySelectorAll('.feedback');
  for (var f = 0, feedback; feedback = feedbackArray[f]; f++) {
    feedback.style.display = 'none';
  }
  document.getElementById('tryAgainButton').style.display = 'none';
  document.getElementById('continueButton').style.display = 'none';
};

/**
 * Either show an interstitial or go to the next level.
 */
BlocklyApps.continueClicked = function() {
  var interstitial = document.getElementById('interstitial').style.display;
  if (interstitial == 'none' && BlocklyApps.INTERSTITIALS.after) {
    BlocklyApps.showInterstitial();
  } else {
    BlocklyApps.hideDialog(false);
    BlocklyApps.createURLAndOpenNextLevel();
  }
};

/**
 * Close the dialog so the user can try again.
 */
BlocklyApps.tryAgainClicked = function() {
  BlocklyApps.hideDialog(true);
};

/**
 * Show the close dialog buttons depending on the state of the level.
 * @param {number} feedbackType The results of block tests.
 */
BlocklyApps.displayCloseDialogButtons = function(feedbackType) {
  var continueButton = document.getElementById('continueButton');
  var tryAgainButton = document.getElementById('tryAgainButton');
  var returnToLevelButton = document.getElementById('returnToLevelButton');
  switch (feedbackType) {
    case BlocklyApps.TestResults.ALL_PASS:
      continueButton.style.display = 'inline';
      tryAgainButton.style.display = 'none';
      returnToLevelButton.style.display = 'none';
      break;
    case BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL:
    case BlocklyApps.TestResults.OTHER_2_STAR_FAIL:
      continueButton.style.display = 'inline';
      tryAgainButton.style.display = 'inline';
      returnToLevelButton.style.display = 'none';
      break;
    case BlocklyApps.TestResults.MISSING_BLOCK_FAIL:
    case BlocklyApps.TestResults.OTHER_1_STAR_FAIL:
      tryAgainButton.style.display = 'inline';
      continueButton.style.display = 'none';
      returnToLevelButton.style.display = 'none';
      break;
    default:
      returnToLevelButton.style.display = 'block';
      continueButton.style.display = 'none';
      tryAgainButton.style.display = 'none';
  }
};

/**
 * Show the interstitial content.
 */
BlocklyApps.showInterstitial = function() {
  if (BlocklyApps.levelComplete) {
    if (BlocklyApps.INTERSTITIALS.after) {
      var preInterArray = document.querySelectorAll('.preInter');
      for (var r = 0, preInter; preInter = preInterArray[r]; r++) {
        preInter.style.display = 'none';
      }
      var postInterArray = document.querySelectorAll('.postInter');
      for (var s = 0, postInter; postInter = postInterArray[s]; s++) {
          postInter.style.display = 'block';
      }
      document.getElementById('interstitial').style.display = 'block';
    }
  } else if (BlocklyApps.INTERSTITIALS.before) {
    document.getElementById('interstitial').style.display = 'block';
  }
};

/**
 * Hide the interstitial content.
 */
BlocklyApps.hideInterstitial = function() {
  document.getElementById('interstitial').style.display = 'none';
};

/**
 * Construct the URL and go to the next level.
 */
BlocklyApps.createURLAndOpenNextLevel = function(config) {
  if (BlocklyApps.REPORT_URL) {  // Ask the server where to go next.
    BlocklyApps.reportAndRedirect();
  } else {
    //XXX Use url library to produce well formed URLs. Currently got "?&".
    window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + '?' +
      (BlocklyApps.PAGE ? '&page=' + BlocklyApps.PAGE : '') +
      '&level=' + (config.level + 1) +
      // TODO: Fix hack used to temporarily keep turtle interstitials working.
      (config.skin ? '&skin=' + config.skin.id : '&reinf=1');
  }
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

/**
 * Show the help pop-up.
 * @param {boolean} animate Animate the pop-up opening.
 * @param {number} feedbackType If defined, the results of end of level tests.
 */
BlocklyApps.showHelp = function(animate, feedbackType) {
  feedbackType = typeof feedbackType !== 'undefined' ?
      feedbackType : BlocklyApps.NO_TESTS_RUN;
  var help = document.getElementById('help');
  var button = document.getElementById('helpButton');
  button.removeAttribute('disabled');

  var style = {
    width: '50%',
    right: '25%',
    top: '3em'
  };
  if (document.getElementById('reinfMsg')) {
    var reinfMSG = document.getElementById('reinfMsg').innerHTML.match(/\S/);
    var interstitial = document.getElementById('interstitial').style.display;
    if (reinfMSG && interstitial == 'none') {
      BlocklyApps.showInterstitial();
    }
  }
  BlocklyApps.displayCloseDialogButtons(feedbackType);
  dialog.show(help, button, animate, true, style);
};

/**
 * Place text in the specified element, if found.  This eliminates
 * any other children of the element and creates a child text node.
 * @param {string} id The identifier of the element.
 * @param {string} text The text to display.
 * @return {Object} The element.
 */
BlocklyApps.setTextForElement = function(id, text) {
  var element = document.getElementById(id);
  if (element) {
    element.innerHTML = '';  // Remove existing children or text.
    element.appendChild(document.createTextNode(text));
  }
  return element;
};

/**
 * Creates the XML for blocks to be displayed in a read-only frame.
 * @param {Array} blockArray An array of blocks to display (with optional args).
 * @return {string} The generated string of XML.
 */
BlocklyApps.generateXMLForBlocks = function(blockArray) {
  var blockXMLStrings = [];
  var blockX = 10;  // Prevent left output plugs from being cut off.
  var blockY = 0;
  var blockXPadding = 200;
  var blockYPadding = 120;
  var blocksPerLine = 2;
  var iframeHeight = parseInt(document.getElementById('feedbackBlocks')
          .style.height);
  for (var i = 0, block; block = blockArray[i]; i++) {
    if (block) {
      blockXMLStrings.push('<block', ' type="', block['type'], '" x= "',
                          blockX.toString(), '" y="', blockY, '">');
      if (block['titles']) {
        var titleNames = Object.keys(block['titles']);
        for (var k = 0, name; name = titleNames[k]; k++) {
          blockXMLStrings.push('<title name="', name, '">',
                              block['titles'][name], '</title>');
        }
      }
      if (block['values']) {
        var valueNames = Object.keys(block['values']);
        for (var k = 0, name; name = valueNames[k]; k++) {
          blockXMLStrings.push('<value name="', name, '">',
                              block['values'][name], '</title>');
        }
      }
      if (block['extra']) {
        blockXMLStrings.append(block['extra']);
      }
      blockXMLStrings.push('</block>');
      if ((i + 1) % blocksPerLine == 0) {
        blockY += blockYPadding;
        iframeHeight += blockYPadding;
        blockX = 0;
      } else {
        blockX += blockXPadding;
      }
    }
    document.getElementById('feedbackBlocks').style.height =
        iframeHeight + 'px';
  }
  return encodeURIComponent(blockXMLStrings.join(''));
};
