// Functions for checking required blocks.

var BlocklyAppLevels = module.exports;

/**
 * Generate a required blocks dictionary for a call to a procedure that does
 * not have a return value.
 * @param {string} name The name of the procedure being called.
 * @return {Object} A required blocks dictionary able to check for and
 *     generate the specified block.
 */
BlocklyAppLevels.call = function(name) {
  return {test: function(block) {
    return block.type == 'procedures_callnoreturn' &&
        block.getTitleValue('NAME') == name; },
          type: 'procedures_callnoreturn',
          titles: {'NAME': name}};
}

/**
 * Generate a required blocks dictionary for a call to a procedure with a
 * single argument.
 * @param {string} func_name The name of the procedure being called.
 * @return {Object} A required blocks dictionary able to check for and
 *     generate the specified block.
 */
BlocklyAppLevels.callWithArg = function(func_name, arg_name) {
  return {test: function(block) {
    return block.type == 'procedures_callnoreturn' &&
        block.getTitleValue('NAME') == func_name; },
          type: 'procedures_callnoreturn',
          extra: '<mutation name="' + func_name + '"><arg name="' + arg_name +
          '"></arg></mutation>'
         };
}

/**
 * Generate a required blocks dictionary for the definition of a procedure
 * that does not have a return value.  This does not check if any arguments
 * are defined for the procedure.
 * @param {string} name The name of the procedure being defined.
 * @return {Object} A required blocks dictionary able to check for and
 *     generate the specified block.
 */
BlocklyAppLevels.define = function(name) {
  return {test: function(block) {
    return block.type == 'procedures_defnoreturn' &&
        block.getTitleValue('NAME') == name; },
          type: 'procedures_defnoreturn',
          titles: {'NAME': name}};
}
