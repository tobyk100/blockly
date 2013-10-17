var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function $goog$provide$($name$$) {
  if(!COMPILED) {
    if(goog.isProvided_($name$$)) {
      throw Error('Namespace "' + $name$$ + '" already declared.');
    }
    delete goog.implicitNamespaces_[$name$$];
    for(var $namespace$$ = $name$$;($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
      goog.implicitNamespaces_[$namespace$$] = !0
    }
  }
  goog.exportPath_($name$$)
};
goog.setTestOnly = function $goog$setTestOnly$($opt_message$$) {
  if(COMPILED && !goog.DEBUG) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + $opt_message$$ ? ": " + $opt_message$$ : ".");
  }
};
COMPILED || (goog.isProvided_ = function $goog$isProvided_$($name$$) {
  return!goog.implicitNamespaces_[$name$$] && !!goog.getObjectByName($name$$)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function $goog$exportPath_$($name$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
  $name$$ = $name$$.split(".");
  $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
  $name$$[0] in $cur_opt_objectToExportTo$$ || !$cur_opt_objectToExportTo$$.execScript || $cur_opt_objectToExportTo$$.execScript("var " + $name$$[0]);
  for(var $part$$;$name$$.length && ($part$$ = $name$$.shift());) {
    !$name$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {}
  }
};
goog.getObjectByName = function $goog$getObjectByName$($name$$, $opt_obj$$) {
  for(var $parts$$ = $name$$.split("."), $cur$$ = $opt_obj$$ || goog.global, $part$$;$part$$ = $parts$$.shift();) {
    if(goog.isDefAndNotNull($cur$$[$part$$])) {
      $cur$$ = $cur$$[$part$$]
    }else {
      return null
    }
  }
  return $cur$$
};
goog.globalize = function $goog$globalize$($obj$$, $opt_global$$) {
  var $global$$ = $opt_global$$ || goog.global, $x$$;
  for($x$$ in $obj$$) {
    $global$$[$x$$] = $obj$$[$x$$]
  }
};
goog.addDependency = function $goog$addDependency$($path$$, $provides_require$$, $requires$$) {
  if(!COMPILED) {
    var $j_provide$$;
    $path$$ = $path$$.replace(/\\/g, "/");
    for(var $deps$$ = goog.dependencies_, $i$$ = 0;$j_provide$$ = $provides_require$$[$i$$];$i$$++) {
      $deps$$.nameToPath[$j_provide$$] = $path$$, $path$$ in $deps$$.pathToNames || ($deps$$.pathToNames[$path$$] = {}), $deps$$.pathToNames[$path$$][$j_provide$$] = !0
    }
    for($j_provide$$ = 0;$provides_require$$ = $requires$$[$j_provide$$];$j_provide$$++) {
      $path$$ in $deps$$.requires || ($deps$$.requires[$path$$] = {}), $deps$$.requires[$path$$][$provides_require$$] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$($errorMessage_name$$) {
  if(!COMPILED && !goog.isProvided_($errorMessage_name$$)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var $path$$ = goog.getPathFromDeps_($errorMessage_name$$);
      if($path$$) {
        goog.included_[$path$$] = !0;
        goog.writeScripts_();
        return
      }
    }
    $errorMessage_name$$ = "goog.require could not find: " + $errorMessage_name$$;
    goog.global.console && goog.global.console.error($errorMessage_name$$);
    throw Error($errorMessage_name$$);
  }
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$($opt_returnValue$$, $var_args$$) {
  return $opt_returnValue$$
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$($ctor$$) {
  $ctor$$.getInstance = function $$ctor$$$getInstance$() {
    if($ctor$$.instance_) {
      return $ctor$$.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
    return $ctor$$.instance_ = new $ctor$$
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var $doc$$ = goog.global.document;
  return"undefined" != typeof $doc$$ && "write" in $doc$$
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var $scripts$$ = goog.global.document.getElementsByTagName("script"), $i$$ = $scripts$$.length - 1;0 <= $i$$;--$i$$) {
        var $src$$ = $scripts$$[$i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?"), $l_qmark$$ = -1 == $l_qmark$$ ? $src$$.length : $l_qmark$$;
        if("base.js" == $src$$.substr($l_qmark$$ - 7, 7)) {
          goog.basePath = $src$$.substr(0, $l_qmark$$ - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$($src$$) {
  var $importScript$$ = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[$src$$] && $importScript$$($src$$) && (goog.dependencies_.written[$src$$] = !0)
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$($src$$) {
  if(goog.inHtmlDocument_()) {
    var $doc$$ = goog.global.document;
    if("complete" == $doc$$.readyState) {
      if(/\bdeps.js$/.test($src$$)) {
        return!1
      }
      throw Error('Cannot write "' + $src$$ + '" after document load');
    }
    $doc$$.write('<script type="text/javascript" src="' + $src$$ + '">\x3c/script>');
    return!0
  }
  return!1
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function $visitNode$$($path$$) {
    if(!($path$$ in $deps$$.written)) {
      if(!($path$$ in $deps$$.visited) && ($deps$$.visited[$path$$] = !0, $path$$ in $deps$$.requires)) {
        for(var $requireName$$ in $deps$$.requires[$path$$]) {
          if(!goog.isProvided_($requireName$$)) {
            if($requireName$$ in $deps$$.nameToPath) {
              $visitNode$$($deps$$.nameToPath[$requireName$$])
            }else {
              throw Error("Undefined nameToPath for " + $requireName$$);
            }
          }
        }
      }
      $path$$ in $seenScript$$ || ($seenScript$$[$path$$] = !0, $scripts$$.push($path$$))
    }
  }
  var $scripts$$ = [], $seenScript$$ = {}, $deps$$ = goog.dependencies_, $i$$3_path$$;
  for($i$$3_path$$ in goog.included_) {
    $deps$$.written[$i$$3_path$$] || $visitNode$$($i$$3_path$$)
  }
  for($i$$3_path$$ = 0;$i$$3_path$$ < $scripts$$.length;$i$$3_path$$++) {
    if($scripts$$[$i$$3_path$$]) {
      goog.importScript_(goog.basePath + $scripts$$[$i$$3_path$$])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$($rule$$) {
  return $rule$$ in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[$rule$$] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$($value$$) {
  var $s$$ = typeof $value$$;
  if("object" == $s$$) {
    if($value$$) {
      if($value$$ instanceof Array) {
        return"array"
      }
      if($value$$ instanceof Object) {
        return $s$$
      }
      var $className$$ = Object.prototype.toString.call($value$$);
      if("[object Window]" == $className$$) {
        return"object"
      }
      if("[object Array]" == $className$$ || "number" == typeof $value$$.length && "undefined" != typeof $value$$.splice && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$ || "undefined" != typeof $value$$.call && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$ && "undefined" == typeof $value$$.call) {
      return"object"
    }
  }
  return $s$$
};
goog.isDef = function $goog$isDef$($val$$) {
  return void 0 !== $val$$
};
goog.isNull = function $goog$isNull$($val$$) {
  return null === $val$$
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$($val$$) {
  return null != $val$$
};
goog.isArray = function $goog$isArray$($val$$) {
  return"array" == goog.typeOf($val$$)
};
goog.isArrayLike = function $goog$isArrayLike$($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return"array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length
};
goog.isDateLike = function $goog$isDateLike$($val$$) {
  return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear
};
goog.isString = function $goog$isString$($val$$) {
  return"string" == typeof $val$$
};
goog.isBoolean = function $goog$isBoolean$($val$$) {
  return"boolean" == typeof $val$$
};
goog.isNumber = function $goog$isNumber$($val$$) {
  return"number" == typeof $val$$
};
goog.isFunction = function $goog$isFunction$($val$$) {
  return"function" == goog.typeOf($val$$)
};
goog.isObject = function $goog$isObject$($val$$) {
  var $type$$ = typeof $val$$;
  return"object" == $type$$ && null != $val$$ || "function" == $type$$
};
goog.getUid = function $goog$getUid$($obj$$) {
  return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function $goog$removeUid$($obj$$) {
  "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_]
  }catch($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if("object" == $clone_type$$ || "array" == $clone_type$$) {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone_type$$ = "array" == $clone_type$$ ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$])
    }
    return $clone_type$$
  }
  return $obj$$
};
goog.bindNative_ = function $goog$bindNative_$($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
};
goog.bindJs_ = function $goog$bindJs_$($fn$$, $selfObj$$, $var_args$$) {
  if(!$fn$$) {
    throw Error();
  }
  if(2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments)
  }
};
goog.bind = function $goog$bind$($fn$$, $selfObj$$, $var_args$$) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function $goog$partial$($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$ = Array.prototype.slice.call(arguments);
    $newArgs$$.unshift.apply($newArgs$$, $args$$);
    return $fn$$.apply(this, $newArgs$$)
  }
};
goog.mixin = function $goog$mixin$($target$$, $source$$) {
  for(var $x$$ in $source$$) {
    $target$$[$x$$] = $source$$[$x$$]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function $goog$globalEval$($script$$) {
  if(goog.global.execScript) {
    goog.global.execScript($script$$, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval($script$$)
      }else {
        var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("script");
        $scriptElt$$.type = "text/javascript";
        $scriptElt$$.defer = !1;
        $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
        $doc$$.body.appendChild($scriptElt$$);
        $doc$$.body.removeChild($scriptElt$$)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$($className$$, $opt_modifier$$) {
  var $getMapping$$ = function $$getMapping$$$($cssName$$) {
    return goog.cssNameMapping_[$cssName$$] || $cssName$$
  }, $rename_renameByParts$$ = function $$rename_renameByParts$$$($cssName$$1_parts$$) {
    $cssName$$1_parts$$ = $cssName$$1_parts$$.split("-");
    for(var $mapped$$ = [], $i$$ = 0;$i$$ < $cssName$$1_parts$$.length;$i$$++) {
      $mapped$$.push($getMapping$$($cssName$$1_parts$$[$i$$]))
    }
    return $mapped$$.join("-")
  }, $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
    return $a$$
  };
  return $opt_modifier$$ ? $className$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$$)
};
goog.setCssNameMapping = function $goog$setCssNameMapping$($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function $goog$getMsg$($str$$, $opt_values$$) {
  var $values$$ = $opt_values$$ || {}, $key$$;
  for($key$$ in $values$$) {
    var $value$$ = ("" + $values$$[$key$$]).replace(/\$/g, "$$$$");
    $str$$ = $str$$.replace(RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$)
  }
  return $str$$
};
goog.getMsgWithFallback = function $goog$getMsgWithFallback$($a$$, $b$$) {
  return $a$$
};
goog.exportSymbol = function $goog$exportSymbol$($publicPath$$, $object$$, $opt_objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$)
};
goog.exportProperty = function $goog$exportProperty$($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$
};
goog.inherits = function $goog$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
};
goog.base = function $goog$base$($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if($caller$$.superClass_) {
    return $caller$$.superClass_.constructor.apply($me$$, Array.prototype.slice.call(arguments, 1))
  }
  for(var $args$$ = Array.prototype.slice.call(arguments, 2), $foundCaller$$ = !1, $ctor$$ = $me$$.constructor;$ctor$$;$ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller$$ = !0
    }else {
      if($foundCaller$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$)
      }
    }
  }
  if($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$($fn$$) {
  $fn$$.call(goog.global)
};
var Blockly = {Names:function($reservedWords_splitWords$$) {
  this.reservedDict_ = {};
  if($reservedWords_splitWords$$) {
    $reservedWords_splitWords$$ = $reservedWords_splitWords$$.split(",");
    for(var $x$$ = 0;$x$$ < $reservedWords_splitWords$$.length;$x$$++) {
      this.reservedDict_[Blockly.Names.PREFIX_ + $reservedWords_splitWords$$[$x$$]] = !0
    }
  }
  this.reset()
}};
Blockly.Names.PREFIX_ = "$_";
Blockly.Names.prototype.reset = function $Blockly$Names$$reset$() {
  this.db_ = {};
  this.dbReverse_ = {}
};
Blockly.Names.prototype.getName = function $Blockly$Names$$getName$($name$$, $type$$) {
  var $normalized$$ = Blockly.Names.PREFIX_ + $name$$.toLowerCase() + "_" + $type$$;
  if($normalized$$ in this.db_) {
    return this.db_[$normalized$$]
  }
  var $safeName$$ = this.getDistinctName($name$$, $type$$);
  return this.db_[$normalized$$] = $safeName$$
};
Blockly.Names.prototype.getDistinctName = function $Blockly$Names$$getDistinctName$($name$$, $type$$) {
  for(var $safeName$$ = this.safeName_($name$$), $i$$ = "";this.dbReverse_[Blockly.Names.PREFIX_ + $safeName$$ + $i$$] || Blockly.Names.PREFIX_ + $safeName$$ + $i$$ in this.reservedDict_;) {
    $i$$ = $i$$ ? $i$$ + 1 : 2
  }
  $safeName$$ += $i$$;
  this.dbReverse_[Blockly.Names.PREFIX_ + $safeName$$] = !0;
  return $safeName$$
};
Blockly.Names.prototype.safeName_ = function $Blockly$Names$$safeName_$($name$$) {
  $name$$ ? ($name$$ = encodeURI($name$$.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf($name$$[0]) && ($name$$ = "my_" + $name$$)) : $name$$ = "unnamed";
  return $name$$
};
Blockly.Names.equals = function $Blockly$Names$equals$($name1$$, $name2$$) {
  return $name1$$.toLowerCase() == $name2$$.toLowerCase()
};
Blockly.Xml = {};
Blockly.Xml.workspaceToDom = function $Blockly$Xml$workspaceToDom$($blocks_workspace$$) {
  var $width$$ = Blockly.svgSize().width, $xml$$ = goog.dom.createDom("xml");
  $blocks_workspace$$ = $blocks_workspace$$.getTopBlocks(!0);
  for(var $i$$ = 0, $block_xy$$;$block_xy$$ = $blocks_workspace$$[$i$$];$i$$++) {
    var $element$$ = Blockly.Xml.blockToDom_($block_xy$$);
    $block_xy$$ = $block_xy$$.getRelativeToSurfaceXY();
    $element$$.setAttribute("x", Blockly.RTL ? $width$$ - $block_xy$$.x : $block_xy$$.x);
    $element$$.setAttribute("y", $block_xy$$.y);
    $xml$$.appendChild($element$$)
  }
  return $xml$$
};
Blockly.Xml.blockToDom_ = function $Blockly$Xml$blockToDom_$($block$$) {
  var $element$$ = goog.dom.createDom("block");
  $element$$.setAttribute("type", $block$$.type);
  if($block$$.mutationToDom) {
    var $commentElement_input_mutation$$ = $block$$.mutationToDom();
    $commentElement_input_mutation$$ && $element$$.appendChild($commentElement_input_mutation$$)
  }
  for(var $hasValues_hw_x$$ = 0;$commentElement_input_mutation$$ = $block$$.inputList[$hasValues_hw_x$$];$hasValues_hw_x$$++) {
    for(var $i$$7_y$$ = 0, $empty_title$$7_title$$;$empty_title$$7_title$$ = $commentElement_input_mutation$$.titleRow[$i$$7_y$$];$i$$7_y$$++) {
      if($empty_title$$7_title$$.name && $empty_title$$7_title$$.EDITABLE) {
        var $childBlock_container$$ = goog.dom.createDom("title", null, $empty_title$$7_title$$.getValue());
        $childBlock_container$$.setAttribute("name", $empty_title$$7_title$$.name);
        $element$$.appendChild($childBlock_container$$)
      }
    }
  }
  $block$$.comment && ($commentElement_input_mutation$$ = goog.dom.createDom("comment", null, $block$$.comment.getText()), $commentElement_input_mutation$$.setAttribute("pinned", $block$$.comment.isVisible()), $hasValues_hw_x$$ = $block$$.comment.getBubbleSize(), $commentElement_input_mutation$$.setAttribute("h", $hasValues_hw_x$$.height), $commentElement_input_mutation$$.setAttribute("w", $hasValues_hw_x$$.width), $element$$.appendChild($commentElement_input_mutation$$));
  $hasValues_hw_x$$ = !1;
  for($i$$7_y$$ = 0;$commentElement_input_mutation$$ = $block$$.inputList[$i$$7_y$$];$i$$7_y$$++) {
    var $container$$;
    $empty_title$$7_title$$ = !0;
    $commentElement_input_mutation$$.type != Blockly.DUMMY_INPUT && ($childBlock_container$$ = $commentElement_input_mutation$$.connection.targetBlock(), $commentElement_input_mutation$$.type == Blockly.INPUT_VALUE ? ($container$$ = goog.dom.createDom("value"), $hasValues_hw_x$$ = !0) : $commentElement_input_mutation$$.type == Blockly.NEXT_STATEMENT && ($container$$ = goog.dom.createDom("statement")), $childBlock_container$$ && ($container$$.appendChild(Blockly.Xml.blockToDom_($childBlock_container$$)), 
    $empty_title$$7_title$$ = !1), $container$$.setAttribute("name", $commentElement_input_mutation$$.name), $empty_title$$7_title$$ || $element$$.appendChild($container$$))
  }
  $hasValues_hw_x$$ && $element$$.setAttribute("inline", $block$$.inputsInline);
  $block$$.isCollapsed() && $element$$.setAttribute("collapsed", !0);
  $block$$.disabled && $element$$.setAttribute("disabled", !0);
  $block$$.isDeletable() || $element$$.setAttribute("deletable", !1);
  $block$$.isMovable() || $element$$.setAttribute("movable", !1);
  $block$$.isEditable() || $element$$.setAttribute("editable", !1);
  $block$$.nextConnection && ($block$$ = $block$$.nextConnection.targetBlock()) && ($container$$ = goog.dom.createDom("next", null, Blockly.Xml.blockToDom_($block$$)), $element$$.appendChild($container$$));
  return $element$$
};
Blockly.Xml.domToText = function $Blockly$Xml$domToText$($dom$$) {
  return(new XMLSerializer).serializeToString($dom$$)
};
Blockly.Xml.domToPrettyText = function $Blockly$Xml$domToPrettyText$($dom$$1_lines_text$$) {
  $dom$$1_lines_text$$ = Blockly.Xml.domToText($dom$$1_lines_text$$).split("<");
  for(var $indent$$ = "", $x$$ = 1;$x$$ < $dom$$1_lines_text$$.length;$x$$++) {
    var $line$$ = $dom$$1_lines_text$$[$x$$];
    "/" == $line$$[0] && ($indent$$ = $indent$$.substring(2));
    $dom$$1_lines_text$$[$x$$] = $indent$$ + "<" + $line$$;
    "/" != $line$$[0] && "/>" != $line$$.slice(-2) && ($indent$$ += "  ")
  }
  $dom$$1_lines_text$$ = $dom$$1_lines_text$$.join("\n");
  $dom$$1_lines_text$$ = $dom$$1_lines_text$$.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, "$1</$2>");
  return $dom$$1_lines_text$$.replace(/^\n/, "")
};
Blockly.Xml.textToDom = function $Blockly$Xml$textToDom$($dom$$2_text$$) {
  $dom$$2_text$$ = (new DOMParser).parseFromString($dom$$2_text$$, "text/xml");
  if(!$dom$$2_text$$ || !$dom$$2_text$$.firstChild || "xml" != $dom$$2_text$$.firstChild.nodeName.toLowerCase() || $dom$$2_text$$.firstChild !== $dom$$2_text$$.lastChild) {
    throw"Blockly.Xml.textToDom did not obtain a valid XML tree.";
  }
  return $dom$$2_text$$.firstChild
};
Blockly.Xml.domToWorkspace = function $Blockly$Xml$domToWorkspace$($workspace$$, $xml$$) {
  for(var $width$$ = Blockly.svgSize().width, $x$$ = 0, $blockY_xmlChild$$;$blockY_xmlChild$$ = $xml$$.childNodes[$x$$];$x$$++) {
    if("block" == $blockY_xmlChild$$.nodeName.toLowerCase()) {
      var $block$$ = Blockly.Xml.domToBlock_($workspace$$, $blockY_xmlChild$$), $blockX$$ = parseInt($blockY_xmlChild$$.getAttribute("x"), 10);
      $blockY_xmlChild$$ = parseInt($blockY_xmlChild$$.getAttribute("y"), 10);
      isNaN($blockX$$) || isNaN($blockY_xmlChild$$) || $block$$.moveBy(Blockly.RTL ? $width$$ - $blockX$$ : $blockX$$, $blockY_xmlChild$$)
    }
  }
};
Blockly.Xml.domToBlock_ = function $Blockly$Xml$domToBlock_$($workspace$$, $xmlBlock$$) {
  var $block$$ = $xmlBlock$$.getAttribute("type"), $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("id"), $block$$ = new Blockly.Block($workspace$$, $block$$, $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  $block$$.initSvg();
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("inline")) && $block$$.setInputsInline("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("collapsed")) && $block$$.setCollapsed("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("disabled")) && $block$$.setDisabled("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("deletable")) && $block$$.setDeletable("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("movable")) && $block$$.setMovable("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $xmlBlock$$.getAttribute("editable")) && $block$$.setEditable("true" == $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$);
  for(var $blockChild_bubbleW_firstRealGrandchild_visible$$ = null, $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = 0, $bubbleH_input$$1_xmlChild$$;$bubbleH_input$$1_xmlChild$$ = $xmlBlock$$.childNodes[$collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$];$collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$++) {
    if(3 != $bubbleH_input$$1_xmlChild$$.nodeType || !$bubbleH_input$$1_xmlChild$$.data.match(/^\s*$/)) {
      for(var $blockChild_bubbleW_firstRealGrandchild_visible$$ = null, $name$$63_y$$ = 0, $grandchildNode$$;$grandchildNode$$ = $bubbleH_input$$1_xmlChild$$.childNodes[$name$$63_y$$];$name$$63_y$$++) {
        3 == $grandchildNode$$.nodeType && $grandchildNode$$.data.match(/^\s*$/) || ($blockChild_bubbleW_firstRealGrandchild_visible$$ = $grandchildNode$$)
      }
      $name$$63_y$$ = $bubbleH_input$$1_xmlChild$$.getAttribute("name");
      switch($bubbleH_input$$1_xmlChild$$.nodeName.toLowerCase()) {
        case "mutation":
          $block$$.domToMutation && $block$$.domToMutation($bubbleH_input$$1_xmlChild$$);
          break;
        case "comment":
          $block$$.setCommentText($bubbleH_input$$1_xmlChild$$.textContent);
          ($blockChild_bubbleW_firstRealGrandchild_visible$$ = $bubbleH_input$$1_xmlChild$$.getAttribute("pinned")) && $block$$.comment.setVisible("true" == $blockChild_bubbleW_firstRealGrandchild_visible$$);
          $blockChild_bubbleW_firstRealGrandchild_visible$$ = parseInt($bubbleH_input$$1_xmlChild$$.getAttribute("w"), 10);
          $bubbleH_input$$1_xmlChild$$ = parseInt($bubbleH_input$$1_xmlChild$$.getAttribute("h"), 10);
          isNaN($blockChild_bubbleW_firstRealGrandchild_visible$$) || isNaN($bubbleH_input$$1_xmlChild$$) || $block$$.comment.setBubbleSize($blockChild_bubbleW_firstRealGrandchild_visible$$, $bubbleH_input$$1_xmlChild$$);
          break;
        case "title":
          $block$$.setTitleValue($bubbleH_input$$1_xmlChild$$.textContent, $name$$63_y$$);
          break;
        case "value":
        ;
        case "statement":
          $bubbleH_input$$1_xmlChild$$ = $block$$.getInput($name$$63_y$$);
          if(!$bubbleH_input$$1_xmlChild$$) {
            throw"Input does not exist: " + $name$$63_y$$;
          }
          if($blockChild_bubbleW_firstRealGrandchild_visible$$ && "block" == $blockChild_bubbleW_firstRealGrandchild_visible$$.nodeName.toLowerCase()) {
            if($blockChild_bubbleW_firstRealGrandchild_visible$$ = Blockly.Xml.domToBlock_($workspace$$, $blockChild_bubbleW_firstRealGrandchild_visible$$), $blockChild_bubbleW_firstRealGrandchild_visible$$.outputConnection) {
              $bubbleH_input$$1_xmlChild$$.connection.connect($blockChild_bubbleW_firstRealGrandchild_visible$$.outputConnection)
            }else {
              if($blockChild_bubbleW_firstRealGrandchild_visible$$.previousConnection) {
                $bubbleH_input$$1_xmlChild$$.connection.connect($blockChild_bubbleW_firstRealGrandchild_visible$$.previousConnection)
              }else {
                throw"Child block does not have output or previous statement.";
              }
            }
          }
          break;
        case "next":
          if($blockChild_bubbleW_firstRealGrandchild_visible$$ && "block" == $blockChild_bubbleW_firstRealGrandchild_visible$$.nodeName.toLowerCase()) {
            if(!$block$$.nextConnection) {
              throw"Next statement does not exist.";
            }
            if($block$$.nextConnection.targetConnection) {
              throw"Next statement is already connected.";
            }
            $blockChild_bubbleW_firstRealGrandchild_visible$$ = Blockly.Xml.domToBlock_($workspace$$, $blockChild_bubbleW_firstRealGrandchild_visible$$);
            if(!$blockChild_bubbleW_firstRealGrandchild_visible$$.previousConnection) {
              throw"Next block does not have previous statement.";
            }
            $block$$.nextConnection.connect($blockChild_bubbleW_firstRealGrandchild_visible$$.previousConnection)
          }
      }
    }
  }
  ($collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$ = $block$$.nextConnection && $block$$.nextConnection.targetBlock()) ? $collapsed_deletable_disabled_editable_id$$1_inline_movable_next_x$$.render() : $block$$.render();
  return $block$$
};
Blockly.Xml.deleteNext = function $Blockly$Xml$deleteNext$($xmlBlock$$) {
  for(var $x$$ = 0, $child$$;$child$$ = $xmlBlock$$.childNodes[$x$$];$x$$++) {
    if("next" == $child$$.nodeName.toLowerCase()) {
      $xmlBlock$$.removeChild($child$$);
      break
    }
  }
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function $goog$string$startsWith$($str$$, $prefix$$) {
  return 0 == $str$$.lastIndexOf($prefix$$, 0)
};
goog.string.endsWith = function $goog$string$endsWith$($str$$, $suffix$$) {
  var $l$$ = $str$$.length - $suffix$$.length;
  return 0 <= $l$$ && $str$$.indexOf($suffix$$, $l$$) == $l$$
};
goog.string.caseInsensitiveStartsWith = function $goog$string$caseInsensitiveStartsWith$($str$$, $prefix$$) {
  return 0 == goog.string.caseInsensitiveCompare($prefix$$, $str$$.substr(0, $prefix$$.length))
};
goog.string.caseInsensitiveEndsWith = function $goog$string$caseInsensitiveEndsWith$($str$$, $suffix$$) {
  return 0 == goog.string.caseInsensitiveCompare($suffix$$, $str$$.substr($str$$.length - $suffix$$.length, $suffix$$.length))
};
goog.string.subs = function $goog$string$subs$($str$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $replacement$$ = String(arguments[$i$$]).replace(/\$/g, "$$$$");
    $str$$ = $str$$.replace(/\%s/, $replacement$$)
  }
  return $str$$
};
goog.string.collapseWhitespace = function $goog$string$collapseWhitespace$($str$$) {
  return $str$$.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function $goog$string$isEmpty$($str$$) {
  return/^[\s\xa0]*$/.test($str$$)
};
goog.string.isEmptySafe = function $goog$string$isEmptySafe$($str$$) {
  return goog.string.isEmpty(goog.string.makeSafe($str$$))
};
goog.string.isBreakingWhitespace = function $goog$string$isBreakingWhitespace$($str$$) {
  return!/[^\t\n\r ]/.test($str$$)
};
goog.string.isAlpha = function $goog$string$isAlpha$($str$$) {
  return!/[^a-zA-Z]/.test($str$$)
};
goog.string.isNumeric = function $goog$string$isNumeric$($str$$) {
  return!/[^0-9]/.test($str$$)
};
goog.string.isAlphaNumeric = function $goog$string$isAlphaNumeric$($str$$) {
  return!/[^a-zA-Z0-9]/.test($str$$)
};
goog.string.isSpace = function $goog$string$isSpace$($ch$$) {
  return" " == $ch$$
};
goog.string.isUnicodeChar = function $goog$string$isUnicodeChar$($ch$$) {
  return 1 == $ch$$.length && " " <= $ch$$ && "~" >= $ch$$ || "\u0080" <= $ch$$ && "\ufffd" >= $ch$$
};
goog.string.stripNewlines = function $goog$string$stripNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function $goog$string$canonicalizeNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function $goog$string$normalizeWhitespace$($str$$) {
  return $str$$.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function $goog$string$normalizeSpaces$($str$$) {
  return $str$$.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function $goog$string$collapseBreakingSpaces$($str$$) {
  return $str$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function $goog$string$trim$($str$$) {
  return $str$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function $goog$string$trimLeft$($str$$) {
  return $str$$.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function $goog$string$trimRight$($str$$) {
  return $str$$.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function $goog$string$caseInsensitiveCompare$($str1$$, $str2$$) {
  var $test1$$ = String($str1$$).toLowerCase(), $test2$$ = String($str2$$).toLowerCase();
  return $test1$$ < $test2$$ ? -1 : $test1$$ == $test2$$ ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function $goog$string$numerateCompare$($str1$$, $str2$$) {
  if($str1$$ == $str2$$) {
    return 0
  }
  if(!$str1$$) {
    return-1
  }
  if(!$str2$$) {
    return 1
  }
  for(var $num1_tokens1$$ = $str1$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $num2_tokens2$$ = $str2$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $count$$ = Math.min($num1_tokens1$$.length, $num2_tokens2$$.length), $i$$ = 0;$i$$ < $count$$;$i$$++) {
    var $a$$ = $num1_tokens1$$[$i$$], $b$$ = $num2_tokens2$$[$i$$];
    if($a$$ != $b$$) {
      return $num1_tokens1$$ = parseInt($a$$, 10), !isNaN($num1_tokens1$$) && ($num2_tokens2$$ = parseInt($b$$, 10), !isNaN($num2_tokens2$$) && $num1_tokens1$$ - $num2_tokens2$$) ? $num1_tokens1$$ - $num2_tokens2$$ : $a$$ < $b$$ ? -1 : 1
    }
  }
  return $num1_tokens1$$.length != $num2_tokens2$$.length ? $num1_tokens1$$.length - $num2_tokens2$$.length : $str1$$ < $str2$$ ? -1 : 1
};
goog.string.urlEncode = function $goog$string$urlEncode$($str$$) {
  return encodeURIComponent(String($str$$))
};
goog.string.urlDecode = function $goog$string$urlDecode$($str$$) {
  return decodeURIComponent($str$$.replace(/\+/g, " "))
};
goog.string.newLineToBr = function $goog$string$newLineToBr$($str$$, $opt_xml$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>")
};
goog.string.htmlEscape = function $goog$string$htmlEscape$($str$$, $opt_isLikelyToContainHtmlChars$$) {
  if($opt_isLikelyToContainHtmlChars$$) {
    return $str$$.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test($str$$)) {
    return $str$$
  }
  -1 != $str$$.indexOf("&") && ($str$$ = $str$$.replace(goog.string.amperRe_, "&amp;"));
  -1 != $str$$.indexOf("<") && ($str$$ = $str$$.replace(goog.string.ltRe_, "&lt;"));
  -1 != $str$$.indexOf(">") && ($str$$ = $str$$.replace(goog.string.gtRe_, "&gt;"));
  -1 != $str$$.indexOf('"') && ($str$$ = $str$$.replace(goog.string.quotRe_, "&quot;"));
  return $str$$
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function $goog$string$unescapeEntities$($str$$) {
  return goog.string.contains($str$$, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_($str$$) : goog.string.unescapePureXmlEntities_($str$$) : $str$$
};
goog.string.unescapeEntitiesUsingDom_ = function $goog$string$unescapeEntitiesUsingDom_$($str$$) {
  var $seen$$ = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, $div$$ = document.createElement("div");
  return $str$$.replace(goog.string.HTML_ENTITY_PATTERN_, function($s$$, $entity$$) {
    var $value$$ = $seen$$[$s$$];
    if($value$$) {
      return $value$$
    }
    if("#" == $entity$$.charAt(0)) {
      var $n$$ = Number("0" + $entity$$.substr(1));
      isNaN($n$$) || ($value$$ = String.fromCharCode($n$$))
    }
    $value$$ || ($div$$.innerHTML = $s$$ + " ", $value$$ = $div$$.firstChild.nodeValue.slice(0, -1));
    return $seen$$[$s$$] = $value$$
  })
};
goog.string.unescapePureXmlEntities_ = function $goog$string$unescapePureXmlEntities_$($str$$) {
  return $str$$.replace(/&([^;]+);/g, function($s$$, $entity$$) {
    switch($entity$$) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == $entity$$.charAt(0)) {
          var $n$$ = Number("0" + $entity$$.substr(1));
          if(!isNaN($n$$)) {
            return String.fromCharCode($n$$)
          }
        }
        return $s$$
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function $goog$string$whitespaceEscape$($str$$, $opt_xml$$) {
  return goog.string.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$)
};
goog.string.stripQuotes = function $goog$string$stripQuotes$($str$$, $quoteChars$$) {
  for(var $length$$ = $quoteChars$$.length, $i$$ = 0;$i$$ < $length$$;$i$$++) {
    var $quoteChar$$ = 1 == $length$$ ? $quoteChars$$ : $quoteChars$$.charAt($i$$);
    if($str$$.charAt(0) == $quoteChar$$ && $str$$.charAt($str$$.length - 1) == $quoteChar$$) {
      return $str$$.substring(1, $str$$.length - 1)
    }
  }
  return $str$$
};
goog.string.truncate = function $goog$string$truncate$($str$$, $chars$$, $opt_protectEscapedCharacters$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  $str$$.length > $chars$$ && ($str$$ = $str$$.substring(0, $chars$$ - 3) + "...");
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.truncateMiddle = function $goog$string$truncateMiddle$($str$$, $chars$$, $opt_protectEscapedCharacters$$, $half_opt_trailingChars$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  if($half_opt_trailingChars$$ && $str$$.length > $chars$$) {
    $half_opt_trailingChars$$ > $chars$$ && ($half_opt_trailingChars$$ = $chars$$);
    var $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$;
    $str$$ = $str$$.substring(0, $chars$$ - $half_opt_trailingChars$$) + "..." + $str$$.substring($endPoint_endPos$$)
  }else {
    $str$$.length > $chars$$ && ($half_opt_trailingChars$$ = Math.floor($chars$$ / 2), $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $half_opt_trailingChars$$ + $chars$$ % 2) + "..." + $str$$.substring($endPoint_endPos$$))
  }
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function $goog$string$quote$($s$$) {
  $s$$ = String($s$$);
  if($s$$.quote) {
    return $s$$.quote()
  }
  for(var $sb$$ = ['"'], $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    var $ch$$ = $s$$.charAt($i$$), $cc$$ = $ch$$.charCodeAt(0);
    $sb$$[$i$$ + 1] = goog.string.specialEscapeChars_[$ch$$] || (31 < $cc$$ && 127 > $cc$$ ? $ch$$ : goog.string.escapeChar($ch$$))
  }
  $sb$$.push('"');
  return $sb$$.join("")
};
goog.string.escapeString = function $goog$string$escapeString$($str$$) {
  for(var $sb$$ = [], $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    $sb$$[$i$$] = goog.string.escapeChar($str$$.charAt($i$$))
  }
  return $sb$$.join("")
};
goog.string.escapeChar = function $goog$string$escapeChar$($c$$) {
  if($c$$ in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[$c$$]
  }
  if($c$$ in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[$c$$] = goog.string.specialEscapeChars_[$c$$]
  }
  var $rv$$ = $c$$, $cc$$ = $c$$.charCodeAt(0);
  if(31 < $cc$$ && 127 > $cc$$) {
    $rv$$ = $c$$
  }else {
    if(256 > $cc$$) {
      if($rv$$ = "\\x", 16 > $cc$$ || 256 < $cc$$) {
        $rv$$ += "0"
      }
    }else {
      $rv$$ = "\\u", 4096 > $cc$$ && ($rv$$ += "0")
    }
    $rv$$ += $cc$$.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[$c$$] = $rv$$
};
goog.string.toMap = function $goog$string$toMap$($s$$) {
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    $rv$$[$s$$.charAt($i$$)] = !0
  }
  return $rv$$
};
goog.string.contains = function $goog$string$contains$($s$$, $ss$$) {
  return-1 != $s$$.indexOf($ss$$)
};
goog.string.countOf = function $goog$string$countOf$($s$$, $ss$$) {
  return $s$$ && $ss$$ ? $s$$.split($ss$$).length - 1 : 0
};
goog.string.removeAt = function $goog$string$removeAt$($s$$, $index$$, $stringLength$$) {
  var $resultStr$$ = $s$$;
  0 <= $index$$ && $index$$ < $s$$.length && 0 < $stringLength$$ && ($resultStr$$ = $s$$.substr(0, $index$$) + $s$$.substr($index$$ + $stringLength$$, $s$$.length - $index$$ - $stringLength$$));
  return $resultStr$$
};
goog.string.remove = function $goog$string$remove$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "");
  return $s$$.replace($re$$, "")
};
goog.string.removeAll = function $goog$string$removeAll$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "g");
  return $s$$.replace($re$$, "")
};
goog.string.regExpEscape = function $goog$string$regExpEscape$($s$$) {
  return String($s$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function $goog$string$repeat$($string$$, $length$$) {
  return Array($length$$ + 1).join($string$$)
};
goog.string.padNumber = function $goog$string$padNumber$($num$$4_s$$, $length$$, $index$$46_opt_precision$$) {
  $num$$4_s$$ = goog.isDef($index$$46_opt_precision$$) ? $num$$4_s$$.toFixed($index$$46_opt_precision$$) : String($num$$4_s$$);
  $index$$46_opt_precision$$ = $num$$4_s$$.indexOf(".");
  -1 == $index$$46_opt_precision$$ && ($index$$46_opt_precision$$ = $num$$4_s$$.length);
  return goog.string.repeat("0", Math.max(0, $length$$ - $index$$46_opt_precision$$)) + $num$$4_s$$
};
goog.string.makeSafe = function $goog$string$makeSafe$($obj$$) {
  return null == $obj$$ ? "" : String($obj$$)
};
goog.string.buildString = function $goog$string$buildString$($var_args$$) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function $goog$string$getRandomString$() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function $goog$string$compareVersions$($version1$$, $version2$$) {
  for(var $order_v1CompNum$$ = 0, $v1Subs$$ = goog.string.trim(String($version1$$)).split("."), $v2Subs$$ = goog.string.trim(String($version2$$)).split("."), $subCount$$ = Math.max($v1Subs$$.length, $v2Subs$$.length), $subIdx$$ = 0;0 == $order_v1CompNum$$ && $subIdx$$ < $subCount$$;$subIdx$$++) {
    var $v1Sub$$ = $v1Subs$$[$subIdx$$] || "", $v2Sub$$ = $v2Subs$$[$subIdx$$] || "", $v1CompParser$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$ = RegExp("(\\d*)(\\D*)", "g");
    do {
      var $v1Comp$$ = $v1CompParser$$.exec($v1Sub$$) || ["", "", ""], $v2Comp$$ = $v2CompParser$$.exec($v2Sub$$) || ["", "", ""];
      if(0 == $v1Comp$$[0].length && 0 == $v2Comp$$[0].length) {
        break
      }
      var $order_v1CompNum$$ = 0 == $v1Comp$$[1].length ? 0 : parseInt($v1Comp$$[1], 10), $v2CompNum$$ = 0 == $v2Comp$$[1].length ? 0 : parseInt($v2Comp$$[1], 10), $order_v1CompNum$$ = goog.string.compareElements_($order_v1CompNum$$, $v2CompNum$$) || goog.string.compareElements_(0 == $v1Comp$$[2].length, 0 == $v2Comp$$[2].length) || goog.string.compareElements_($v1Comp$$[2], $v2Comp$$[2])
    }while(0 == $order_v1CompNum$$)
  }
  return $order_v1CompNum$$
};
goog.string.compareElements_ = function $goog$string$compareElements_$($left$$, $right$$) {
  return $left$$ < $right$$ ? -1 : $left$$ > $right$$ ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function $goog$string$hashCode$($str$$) {
  for(var $result$$ = 0, $i$$ = 0;$i$$ < $str$$.length;++$i$$) {
    $result$$ = 31 * $result$$ + $str$$.charCodeAt($i$$), $result$$ %= goog.string.HASHCODE_MAX_
  }
  return $result$$
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function $goog$string$createUniqueString$() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function $goog$string$toNumber$($str$$) {
  var $num$$ = Number($str$$);
  return 0 == $num$$ && goog.string.isEmpty($str$$) ? NaN : $num$$
};
goog.string.toCamelCase = function $goog$string$toCamelCase$($str$$) {
  return String($str$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  })
};
goog.string.toSelectorCase = function $goog$string$toSelectorCase$($str$$) {
  return String($str$$).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function $goog$string$toTitleCase$($str$$, $opt_delimiters$$) {
  var $delimiters$$ = goog.isString($opt_delimiters$$) ? goog.string.regExpEscape($opt_delimiters$$) : "\\s";
  return $str$$.replace(RegExp("(^" + ($delimiters$$ ? "|[" + $delimiters$$ + "]+" : "") + ")([a-z])", "g"), function($all$$, $p1$$, $p2$$) {
    return $p1$$ + $p2$$.toUpperCase()
  })
};
goog.string.parseInt = function $goog$string$parseInt$($value$$) {
  isFinite($value$$) && ($value$$ = String($value$$));
  return goog.isString($value$$) ? /^\s*-?0x/i.test($value$$) ? parseInt($value$$, 16) : parseInt($value$$, 10) : NaN
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function $goog$userAgent$getUserAgentString$() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function $goog$userAgent$getNavigator$() {
  return goog.global.navigator
};
goog.userAgent.init_ = function $goog$userAgent$init_$() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var $ua$$;
  if(!goog.userAgent.BROWSER_KNOWN_ && ($ua$$ = goog.userAgent.getUserAgentString())) {
    var $navigator$$ = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == $ua$$.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != $ua$$.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == $navigator$$.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function $goog$userAgent$determinePlatform_$() {
  var $navigator$$ = goog.userAgent.getNavigator();
  return $navigator$$ && $navigator$$.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.initPlatform_ = function $goog$userAgent$initPlatform_$() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11");
  var $ua$$ = goog.userAgent.getUserAgentString();
  goog.userAgent.detectedAndroid_ = !!$ua$$ && 0 <= $ua$$.indexOf("Android");
  goog.userAgent.detectedIPhone_ = !!$ua$$ && 0 <= $ua$$.indexOf("iPhone");
  goog.userAgent.detectedIPad_ = !!$ua$$ && 0 <= $ua$$.indexOf("iPad")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.userAgent.detectedAndroid_;
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.userAgent.detectedIPhone_;
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.userAgent.detectedIPad_;
goog.userAgent.determineVersion_ = function $goog$userAgent$determineVersion_$() {
  var $arr$$10_operaVersion_version$$ = "", $docMode_re$$;
  goog.userAgent.OPERA && goog.global.opera ? ($arr$$10_operaVersion_version$$ = goog.global.opera.version, $arr$$10_operaVersion_version$$ = "function" == typeof $arr$$10_operaVersion_version$$ ? $arr$$10_operaVersion_version$$() : $arr$$10_operaVersion_version$$) : (goog.userAgent.GECKO ? $docMode_re$$ = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? $docMode_re$$ = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && ($docMode_re$$ = /WebKit\/(\S+)/), $docMode_re$$ && ($arr$$10_operaVersion_version$$ = 
  ($arr$$10_operaVersion_version$$ = $docMode_re$$.exec(goog.userAgent.getUserAgentString())) ? $arr$$10_operaVersion_version$$[1] : ""));
  return goog.userAgent.IE && ($docMode_re$$ = goog.userAgent.getDocumentMode_(), $docMode_re$$ > parseFloat($arr$$10_operaVersion_version$$)) ? String($docMode_re$$) : $arr$$10_operaVersion_version$$
};
goog.userAgent.getDocumentMode_ = function $goog$userAgent$getDocumentMode_$() {
  var $doc$$ = goog.global.document;
  return $doc$$ ? $doc$$.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function $goog$userAgent$compare$($v1$$, $v2$$) {
  return goog.string.compareVersions($v1$$, $v2$$)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function $goog$userAgent$isVersion$($version$$) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[$version$$] || (goog.userAgent.isVersionCache_[$version$$] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, $version$$))
};
goog.userAgent.isDocumentMode = function $goog$userAgent$isDocumentMode$($documentMode$$) {
  return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= $documentMode$$
};
goog.userAgent.DOCUMENT_MODE = function() {
  var $doc$$ = goog.global.document;
  return $doc$$ && goog.userAgent.IE ? goog.userAgent.getDocumentMode_() || ("CSS1Compat" == $doc$$.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
}();
Blockly.ScrollbarPair = function $Blockly$ScrollbarPair$($workspace$$) {
  this.workspace_ = $workspace$$;
  this.oldHostMetrics_ = null;
  this.hScroll = new Blockly.Scrollbar($workspace$$, !0, !0);
  this.vScroll = new Blockly.Scrollbar($workspace$$, !1, !0);
  this.corner_ = Blockly.createSvgElement("rect", {height:Blockly.Scrollbar.scrollbarThickness, width:Blockly.Scrollbar.scrollbarThickness, style:"fill: #fff"}, null);
  Blockly.Scrollbar.insertAfter_(this.corner_, $workspace$$.getBubbleCanvas())
};
Blockly.ScrollbarPair.prototype.dispose = function $Blockly$ScrollbarPair$$dispose$() {
  Blockly.unbindEvent_(this.onResizeWrapper_);
  this.onResizeWrapper_ = null;
  goog.dom.removeNode(this.corner_);
  this.oldHostMetrics_ = this.workspace_ = this.corner_ = null;
  this.hScroll.dispose();
  this.hScroll = null;
  this.vScroll.dispose();
  this.vScroll = null
};
Blockly.ScrollbarPair.prototype.resize = function $Blockly$ScrollbarPair$$resize$() {
  var $hostMetrics$$ = this.workspace_.getMetrics();
  if($hostMetrics$$) {
    var $resizeH$$ = !1, $resizeV$$ = !1;
    this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == $hostMetrics$$.viewWidth && this.oldHostMetrics_.viewHeight == $hostMetrics$$.viewHeight && this.oldHostMetrics_.absoluteTop == $hostMetrics$$.absoluteTop && this.oldHostMetrics_.absoluteLeft == $hostMetrics$$.absoluteLeft ? (this.oldHostMetrics_ && this.oldHostMetrics_.contentWidth == $hostMetrics$$.contentWidth && this.oldHostMetrics_.viewLeft == $hostMetrics$$.viewLeft && this.oldHostMetrics_.contentLeft == $hostMetrics$$.contentLeft || 
    ($resizeH$$ = !0), this.oldHostMetrics_ && this.oldHostMetrics_.contentHeight == $hostMetrics$$.contentHeight && this.oldHostMetrics_.viewTop == $hostMetrics$$.viewTop && this.oldHostMetrics_.contentTop == $hostMetrics$$.contentTop || ($resizeV$$ = !0)) : $resizeV$$ = $resizeH$$ = !0;
    $resizeH$$ && this.hScroll.resize($hostMetrics$$);
    $resizeV$$ && this.vScroll.resize($hostMetrics$$);
    this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == $hostMetrics$$.viewWidth && this.oldHostMetrics_.absoluteLeft == $hostMetrics$$.absoluteLeft || this.corner_.setAttribute("x", this.vScroll.xCoordinate);
    this.oldHostMetrics_ && this.oldHostMetrics_.viewHeight == $hostMetrics$$.viewHeight && this.oldHostMetrics_.absoluteTop == $hostMetrics$$.absoluteTop || this.corner_.setAttribute("y", this.hScroll.yCoordinate);
    this.oldHostMetrics_ = $hostMetrics$$
  }
};
Blockly.ScrollbarPair.prototype.set = function $Blockly$ScrollbarPair$$set$($x$$, $y$$) {
  if(Blockly.Scrollbar === Blockly.ScrollbarNative) {
    this.hScroll.set($x$$, !1);
    this.vScroll.set($y$$, !1);
    var $xyRatio$$ = {};
    $xyRatio$$.x = this.hScroll.outerDiv_.scrollLeft / this.hScroll.innerImg_.offsetWidth || 0;
    $xyRatio$$.y = this.vScroll.outerDiv_.scrollTop / this.vScroll.innerImg_.offsetHeight || 0;
    this.workspace_.setMetrics($xyRatio$$)
  }else {
    this.hScroll.set($x$$, !0), this.vScroll.set($y$$, !0)
  }
};
Blockly.ScrollbarInterface = function $Blockly$ScrollbarInterface$() {
};
Blockly.ScrollbarInterface.prototype.dispose = function $Blockly$ScrollbarInterface$$dispose$() {
};
Blockly.ScrollbarInterface.prototype.resize = function $Blockly$ScrollbarInterface$$resize$() {
};
Blockly.ScrollbarInterface.prototype.isVisible = function $Blockly$ScrollbarInterface$$isVisible$() {
};
Blockly.ScrollbarInterface.prototype.setVisible = function $Blockly$ScrollbarInterface$$setVisible$($visible$$) {
};
Blockly.ScrollbarInterface.prototype.set = function $Blockly$ScrollbarInterface$$set$($value$$, $fireEvents$$) {
};
Blockly.ScrollbarNative = function $Blockly$ScrollbarNative$($workspace$$, $horizontal$$, $opt_pair$$) {
  this.workspace_ = $workspace$$;
  this.pair_ = $opt_pair$$ || !1;
  this.horizontal_ = $horizontal$$;
  this.createDom_();
  if(null !== $horizontal$$) {
    Blockly.Scrollbar.scrollbarThickness || Blockly.ScrollbarNative.measureScrollbarThickness_($workspace$$);
    $horizontal$$ ? (this.foreignObject_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.outerDiv_.style.height = Blockly.Scrollbar.scrollbarThickness + "px", this.outerDiv_.style.overflowX = "scroll", this.outerDiv_.style.overflowY = "hidden", this.innerImg_.style.height = "1px") : (this.foreignObject_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.outerDiv_.style.width = Blockly.Scrollbar.scrollbarThickness + "px", this.outerDiv_.style.overflowX = "hidden", 
    this.outerDiv_.style.overflowY = "scroll", this.innerImg_.style.width = "1px");
    var $scrollbar$$ = this;
    this.onScrollWrapper_ = Blockly.bindEvent_(this.outerDiv_, "scroll", $scrollbar$$, function() {
      $scrollbar$$.onScroll_()
    });
    Blockly.bindEvent_(this.foreignObject_, "mousedown", null, function($e$$) {
      Blockly.hideChaff(!0);
      Blockly.noEvent($e$$)
    })
  }
};
Blockly.ScrollbarNative.prototype.dispose = function $Blockly$ScrollbarNative$$dispose$() {
  Blockly.unbindEvent_(this.onResizeWrapper_);
  this.onResizeWrapper_ = null;
  Blockly.unbindEvent_(this.onScrollWrapper_);
  this.onScrollWrapper_ = null;
  goog.dom.removeNode(this.foreignObject_);
  this.innerImg_ = this.outerDiv_ = this.workspace_ = this.foreignObject_ = null
};
Blockly.ScrollbarNative.prototype.resize = function $Blockly$ScrollbarNative$$resize$($hostMetrics$$) {
  if(!$hostMetrics$$ && ($hostMetrics$$ = this.workspace_.getMetrics(), !$hostMetrics$$)) {
    return
  }
  if(this.horizontal_) {
    var $outerLength$$ = $hostMetrics$$.viewWidth;
    this.pair_ ? $outerLength$$ -= Blockly.Scrollbar.scrollbarThickness : this.setVisible($outerLength$$ < $hostMetrics$$.contentWidth);
    this.ratio_ = $outerLength$$ / $hostMetrics$$.viewWidth;
    var $innerLength$$ = this.ratio_ * $hostMetrics$$.contentWidth, $innerOffset$$ = ($hostMetrics$$.viewLeft - $hostMetrics$$.contentLeft) * this.ratio_;
    this.outerDiv_.style.width = $outerLength$$ + "px";
    this.innerImg_.style.width = $innerLength$$ + "px";
    this.xCoordinate = $hostMetrics$$.absoluteLeft;
    this.pair_ && Blockly.RTL && (this.xCoordinate += Blockly.Scrollbar.scrollbarThickness);
    this.yCoordinate = $hostMetrics$$.absoluteTop + $hostMetrics$$.viewHeight - Blockly.Scrollbar.scrollbarThickness;
    this.foreignObject_.setAttribute("x", this.xCoordinate);
    this.foreignObject_.setAttribute("y", this.yCoordinate);
    this.foreignObject_.setAttribute("width", Math.max(0, $outerLength$$));
    this.outerDiv_.scrollLeft = Math.round($innerOffset$$)
  }else {
    $outerLength$$ = $hostMetrics$$.viewHeight, this.pair_ ? $outerLength$$ -= Blockly.Scrollbar.scrollbarThickness : this.setVisible($outerLength$$ < $hostMetrics$$.contentHeight), this.ratio_ = $outerLength$$ / $hostMetrics$$.viewHeight, $innerLength$$ = this.ratio_ * $hostMetrics$$.contentHeight, $innerOffset$$ = ($hostMetrics$$.viewTop - $hostMetrics$$.contentTop) * this.ratio_, this.outerDiv_.style.height = $outerLength$$ + "px", this.innerImg_.style.height = $innerLength$$ + "px", this.xCoordinate = 
    $hostMetrics$$.absoluteLeft, Blockly.RTL || (this.xCoordinate += $hostMetrics$$.viewWidth - Blockly.Scrollbar.scrollbarThickness), this.yCoordinate = $hostMetrics$$.absoluteTop, this.foreignObject_.setAttribute("x", this.xCoordinate), this.foreignObject_.setAttribute("y", this.yCoordinate), this.foreignObject_.setAttribute("height", Math.max(0, $outerLength$$)), this.outerDiv_.scrollTop = Math.round($innerOffset$$)
  }
};
Blockly.ScrollbarNative.prototype.createDom_ = function $Blockly$ScrollbarNative$$createDom_$() {
  this.foreignObject_ = Blockly.createSvgElement("foreignObject", {}, null);
  var $body$$ = document.createElementNS(Blockly.HTML_NS, "body");
  $body$$.setAttribute("xmlns", Blockly.HTML_NS);
  $body$$.setAttribute("class", "blocklyMinimalBody");
  var $outer$$ = document.createElementNS(Blockly.HTML_NS, "div");
  this.outerDiv_ = $outer$$;
  var $inner$$ = document.createElementNS(Blockly.HTML_NS, "img");
  $inner$$.setAttribute("src", Blockly.pathToBlockly + "media/1x1.gif");
  this.innerImg_ = $inner$$;
  $outer$$.appendChild($inner$$);
  $body$$.appendChild($outer$$);
  this.foreignObject_.appendChild($body$$);
  Blockly.Scrollbar.insertAfter_(this.foreignObject_, this.workspace_.getBubbleCanvas())
};
Blockly.ScrollbarNative.prototype.isVisible = function $Blockly$ScrollbarNative$$isVisible$() {
  return"none" != this.foreignObject_.style.display
};
Blockly.ScrollbarNative.prototype.setVisible = function $Blockly$ScrollbarNative$$setVisible$($visible$$) {
  if($visible$$ != this.isVisible()) {
    if(this.pair_) {
      throw"Unable to toggle visibility of paired scrollbars.";
    }
    $visible$$ ? (this.foreignObject_.style.display = "block", this.workspace_.getMetrics()) : (this.workspace_.setMetrics({x:0, y:0}), this.foreignObject_.style.display = "none")
  }
};
Blockly.ScrollbarNative.prototype.onScroll_ = function $Blockly$ScrollbarNative$$onScroll_$() {
  var $xyRatio$$ = {};
  this.horizontal_ ? $xyRatio$$.x = this.outerDiv_.scrollLeft / this.innerImg_.offsetWidth || 0 : $xyRatio$$.y = this.outerDiv_.scrollTop / this.innerImg_.offsetHeight || 0;
  this.workspace_.setMetrics($xyRatio$$)
};
Blockly.ScrollbarNative.prototype.set = function $Blockly$ScrollbarNative$$set$($value$$, $fireEvents$$) {
  if(!$fireEvents$$ && this.onScrollWrapper_) {
    var $scrollFunc$$ = Blockly.unbindEvent_(this.onScrollWrapper_)
  }
  this.horizontal_ ? this.outerDiv_.scrollLeft = $value$$ * this.ratio_ : this.outerDiv_.scrollTop = $value$$ * this.ratio_;
  $scrollFunc$$ && (this.onScrollWrapper_ = Blockly.bindEvent_(this.outerDiv_, "scroll", this, $scrollFunc$$))
};
Blockly.ScrollbarNative.measureScrollbarThickness_ = function $Blockly$ScrollbarNative$measureScrollbarThickness_$($testBar_thickness_workspace$$) {
  $testBar_thickness_workspace$$ = new Blockly.ScrollbarNative($testBar_thickness_workspace$$, null, !1);
  $testBar_thickness_workspace$$.outerDiv_.style.width = "100px";
  $testBar_thickness_workspace$$.outerDiv_.style.height = "100px";
  $testBar_thickness_workspace$$.innerImg_.style.width = "100%";
  $testBar_thickness_workspace$$.innerImg_.style.height = "200px";
  $testBar_thickness_workspace$$.foreignObject_.setAttribute("width", 1);
  $testBar_thickness_workspace$$.foreignObject_.setAttribute("height", 1);
  $testBar_thickness_workspace$$.outerDiv_.style.overflowY = "scroll";
  var $w1$$ = $testBar_thickness_workspace$$.innerImg_.offsetWidth;
  $testBar_thickness_workspace$$.outerDiv_.style.overflowY = "hidden";
  var $w2$$ = $testBar_thickness_workspace$$.innerImg_.offsetWidth;
  goog.dom.removeNode($testBar_thickness_workspace$$.foreignObject_);
  $testBar_thickness_workspace$$ = $w2$$ - $w1$$;
  0 >= $testBar_thickness_workspace$$ && ($testBar_thickness_workspace$$ = 15);
  Blockly.Scrollbar.scrollbarThickness = $testBar_thickness_workspace$$
};
Blockly.ScrollbarSvg = function $Blockly$ScrollbarSvg$($workspace$$, $horizontal$$, $opt_pair$$) {
  this.workspace_ = $workspace$$;
  this.pair_ = $opt_pair$$ || !1;
  this.horizontal_ = $horizontal$$;
  this.createDom_();
  $horizontal$$ ? (this.svgBackground_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness - 6), this.svgKnob_.setAttribute("y", 3)) : (this.svgBackground_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness - 6), this.svgKnob_.setAttribute("x", 3));
  this.onMouseDownBarWrapper_ = Blockly.bindEvent_(this.svgBackground_, "mousedown", this, this.onMouseDownBar_);
  this.onMouseDownKnobWrapper_ = Blockly.bindEvent_(this.svgKnob_, "mousedown", this, this.onMouseDownKnob_)
};
Blockly.ScrollbarSvg.prototype.dispose = function $Blockly$ScrollbarSvg$$dispose$() {
  this.onMouseUpKnob_();
  this.onResizeWrapper_ && (Blockly.unbindEvent_(this.onResizeWrapper_), this.onResizeWrapper_ = null);
  Blockly.unbindEvent_(this.onMouseDownBarWrapper_);
  this.onMouseDownBarWrapper_ = null;
  Blockly.unbindEvent_(this.onMouseDownKnobWrapper_);
  this.onMouseDownKnobWrapper_ = null;
  goog.dom.removeNode(this.svgGroup_);
  this.workspace_ = this.svgKnob_ = this.svgBackground_ = this.svgGroup_ = null
};
Blockly.ScrollbarSvg.prototype.resize = function $Blockly$ScrollbarSvg$$resize$($hostMetrics$$2_opt_metrics$$) {
  if(!$hostMetrics$$2_opt_metrics$$ && ($hostMetrics$$2_opt_metrics$$ = this.workspace_.getMetrics(), !$hostMetrics$$2_opt_metrics$$)) {
    return
  }
  if(this.horizontal_) {
    var $outerLength$$ = $hostMetrics$$2_opt_metrics$$.viewWidth;
    this.pair_ ? $outerLength$$ -= Blockly.Scrollbar.scrollbarThickness : this.setVisible($outerLength$$ < $hostMetrics$$2_opt_metrics$$.contentHeight);
    this.ratio_ = $outerLength$$ / $hostMetrics$$2_opt_metrics$$.contentWidth;
    if(-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) {
      this.ratio_ = 0
    }
    var $innerLength$$ = $hostMetrics$$2_opt_metrics$$.viewWidth * this.ratio_, $innerOffset$$ = ($hostMetrics$$2_opt_metrics$$.viewLeft - $hostMetrics$$2_opt_metrics$$.contentLeft) * this.ratio_;
    this.svgKnob_.setAttribute("width", Math.max(0, $innerLength$$));
    this.xCoordinate = $hostMetrics$$2_opt_metrics$$.absoluteLeft;
    this.pair_ && Blockly.RTL && (this.xCoordinate += $hostMetrics$$2_opt_metrics$$.absoluteLeft + Blockly.Scrollbar.scrollbarThickness);
    this.yCoordinate = $hostMetrics$$2_opt_metrics$$.absoluteTop + $hostMetrics$$2_opt_metrics$$.viewHeight - Blockly.Scrollbar.scrollbarThickness;
    this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + ", " + this.yCoordinate + ")");
    this.svgBackground_.setAttribute("width", Math.max(0, $outerLength$$));
    this.svgKnob_.setAttribute("x", this.constrainKnob_($innerOffset$$))
  }else {
    $outerLength$$ = $hostMetrics$$2_opt_metrics$$.viewHeight;
    this.pair_ ? $outerLength$$ -= Blockly.Scrollbar.scrollbarThickness : this.setVisible($outerLength$$ < $hostMetrics$$2_opt_metrics$$.contentHeight);
    this.ratio_ = $outerLength$$ / $hostMetrics$$2_opt_metrics$$.contentHeight;
    if(-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) {
      this.ratio_ = 0
    }
    $innerLength$$ = $hostMetrics$$2_opt_metrics$$.viewHeight * this.ratio_;
    $innerOffset$$ = ($hostMetrics$$2_opt_metrics$$.viewTop - $hostMetrics$$2_opt_metrics$$.contentTop) * this.ratio_;
    this.svgKnob_.setAttribute("height", Math.max(0, $innerLength$$));
    this.xCoordinate = $hostMetrics$$2_opt_metrics$$.absoluteLeft;
    Blockly.RTL || (this.xCoordinate += $hostMetrics$$2_opt_metrics$$.viewWidth - Blockly.Scrollbar.scrollbarThickness);
    this.yCoordinate = $hostMetrics$$2_opt_metrics$$.absoluteTop;
    this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + ", " + this.yCoordinate + ")");
    this.svgBackground_.setAttribute("height", Math.max(0, $outerLength$$));
    this.svgKnob_.setAttribute("y", this.constrainKnob_($innerOffset$$))
  }
  this.onScroll_()
};
Blockly.ScrollbarSvg.prototype.createDom_ = function $Blockly$ScrollbarSvg$$createDom_$() {
  this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
  this.svgBackground_ = Blockly.createSvgElement("rect", {"class":"blocklyScrollbarBackground"}, this.svgGroup_);
  var $radius$$ = Math.floor((Blockly.Scrollbar.scrollbarThickness - 6) / 2);
  this.svgKnob_ = Blockly.createSvgElement("rect", {"class":"blocklyScrollbarKnob", rx:$radius$$, ry:$radius$$}, this.svgGroup_);
  Blockly.Scrollbar.insertAfter_(this.svgGroup_, this.workspace_.getBubbleCanvas())
};
Blockly.ScrollbarSvg.prototype.isVisible = function $Blockly$ScrollbarSvg$$isVisible$() {
  return"none" != this.svgGroup_.getAttribute("display")
};
Blockly.ScrollbarSvg.prototype.setVisible = function $Blockly$ScrollbarSvg$$setVisible$($visible$$) {
  if($visible$$ != this.isVisible()) {
    if(this.pair_) {
      throw"Unable to toggle visibility of paired scrollbars.";
    }
    $visible$$ ? this.svgGroup_.setAttribute("display", "block") : (this.workspace_.setMetrics({x:0, y:0}), this.svgGroup_.setAttribute("display", "none"))
  }
};
Blockly.ScrollbarSvg.prototype.onMouseDownBar_ = function $Blockly$ScrollbarSvg$$onMouseDownBar_$($e$$) {
  Blockly.hideChaff(!0);
  if(!Blockly.isRightButton($e$$)) {
    var $mouseLocation_mouseXY$$ = Blockly.mouseToSvg($e$$), $mouseLocation_mouseXY$$ = this.horizontal_ ? $mouseLocation_mouseXY$$.x : $mouseLocation_mouseXY$$.y, $knobStart_knobXY$$ = Blockly.getSvgXY_(this.svgKnob_), $knobStart_knobXY$$ = this.horizontal_ ? $knobStart_knobXY$$.x : $knobStart_knobXY$$.y, $knobLength$$ = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "width" : "height")), $knobValue$$ = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")), $pageLength$$ = 
    0.95 * $knobLength$$;
    $mouseLocation_mouseXY$$ <= $knobStart_knobXY$$ ? $knobValue$$ -= $pageLength$$ : $mouseLocation_mouseXY$$ >= $knobStart_knobXY$$ + $knobLength$$ && ($knobValue$$ += $pageLength$$);
    this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", this.constrainKnob_($knobValue$$));
    this.onScroll_()
  }
  $e$$.stopPropagation()
};
Blockly.ScrollbarSvg.prototype.onMouseDownKnob_ = function $Blockly$ScrollbarSvg$$onMouseDownKnob_$($e$$) {
  Blockly.hideChaff(!0);
  this.onMouseUpKnob_();
  Blockly.isRightButton($e$$) || (this.startDragKnob = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")), this.startDragMouse = this.horizontal_ ? $e$$.clientX : $e$$.clientY, Blockly.ScrollbarSvg.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, this.onMouseUpKnob_), Blockly.ScrollbarSvg.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMoveKnob_));
  $e$$.stopPropagation()
};
Blockly.ScrollbarSvg.prototype.onMouseMoveKnob_ = function $Blockly$ScrollbarSvg$$onMouseMoveKnob_$($e$$) {
  this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", this.constrainKnob_(this.startDragKnob + ((this.horizontal_ ? $e$$.clientX : $e$$.clientY) - this.startDragMouse)));
  this.onScroll_()
};
Blockly.ScrollbarSvg.prototype.onMouseUpKnob_ = function $Blockly$ScrollbarSvg$$onMouseUpKnob_$() {
  Blockly.ScrollbarSvg.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.ScrollbarSvg.onMouseUpWrapper_), Blockly.ScrollbarSvg.onMouseUpWrapper_ = null);
  Blockly.ScrollbarSvg.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.ScrollbarSvg.onMouseMoveWrapper_), Blockly.ScrollbarSvg.onMouseMoveWrapper_ = null)
};
Blockly.ScrollbarSvg.prototype.constrainKnob_ = function $Blockly$ScrollbarSvg$$constrainKnob_$($value$$) {
  if(0 >= $value$$ || isNaN($value$$)) {
    $value$$ = 0
  }else {
    var $axis_knobLength$$ = this.horizontal_ ? "width" : "height", $barLength$$ = parseFloat(this.svgBackground_.getAttribute($axis_knobLength$$)), $axis_knobLength$$ = parseFloat(this.svgKnob_.getAttribute($axis_knobLength$$));
    $value$$ = Math.min($value$$, $barLength$$ - $axis_knobLength$$)
  }
  return $value$$
};
Blockly.ScrollbarSvg.prototype.onScroll_ = function $Blockly$ScrollbarSvg$$onScroll_$() {
  var $knobValue$$ = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")), $barLength$$1_xyRatio$$ = parseFloat(this.svgBackground_.getAttribute(this.horizontal_ ? "width" : "height")), $knobValue$$ = $knobValue$$ / $barLength$$1_xyRatio$$;
  isNaN($knobValue$$) && ($knobValue$$ = 0);
  $barLength$$1_xyRatio$$ = {};
  this.horizontal_ ? $barLength$$1_xyRatio$$.x = $knobValue$$ : $barLength$$1_xyRatio$$.y = $knobValue$$;
  this.workspace_.setMetrics($barLength$$1_xyRatio$$)
};
Blockly.ScrollbarSvg.prototype.set = function $Blockly$ScrollbarSvg$$set$($value$$, $fireEvents$$) {
  this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", $value$$ * this.ratio_);
  if($fireEvents$$) {
    this.onScroll_()
  }
};
goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.LINUX) ? (Blockly.Scrollbar = Blockly.ScrollbarNative, Blockly.Scrollbar.scrollbarThickness = 0) : (Blockly.Scrollbar = Blockly.ScrollbarSvg, Blockly.Scrollbar.scrollbarThickness = 15);
Blockly.Scrollbar.insertAfter_ = function $Blockly$Scrollbar$insertAfter_$($newNode$$, $refNode$$) {
  var $siblingNode$$ = $refNode$$.nextSibling, $parentNode$$ = $refNode$$.parentNode;
  if(!$parentNode$$) {
    throw"Reference node has no parent.";
  }
  $siblingNode$$ ? $parentNode$$.insertBefore($newNode$$, $siblingNode$$) : $parentNode$$.appendChild($newNode$$)
};
goog.disposable = {};
goog.disposable.IDisposable = function $goog$disposable$IDisposable$() {
};
goog.Disposable = function $goog$Disposable$() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (this.creationStack = Error().stack, goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function $goog$Disposable$getUndisposedObjects$() {
  var $ret$$ = [], $id$$;
  for($id$$ in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty($id$$) && $ret$$.push(goog.Disposable.instances_[Number($id$$)])
  }
  return $ret$$
};
goog.Disposable.clearUndisposedObjects = function $goog$Disposable$clearUndisposedObjects$() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function $goog$Disposable$$isDisposed$() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function $goog$Disposable$$dispose$() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var $uid$$ = goog.getUid(this);
    if(goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty($uid$$)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[$uid$$]
  }
};
goog.Disposable.prototype.registerDisposable = function $goog$Disposable$$registerDisposable$($disposable$$) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, $disposable$$))
};
goog.Disposable.prototype.addOnDisposeCallback = function $goog$Disposable$$addOnDisposeCallback$($callback$$, $opt_scope$$) {
  this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
  this.onDisposeCallbacks_.push(goog.bind($callback$$, $opt_scope$$))
};
goog.Disposable.prototype.disposeInternal = function $goog$Disposable$$disposeInternal$() {
  if(this.onDisposeCallbacks_) {
    for(;this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()()
    }
  }
};
goog.Disposable.isDisposed = function $goog$Disposable$isDisposed$($obj$$) {
  return $obj$$ && "function" == typeof $obj$$.isDisposed ? $obj$$.isDisposed() : !1
};
goog.dispose = function $goog$dispose$($obj$$) {
  $obj$$ && "function" == typeof $obj$$.dispose && $obj$$.dispose()
};
goog.disposeAll = function $goog$disposeAll$($var_args$$) {
  for(var $i$$ = 0, $len$$ = arguments.length;$i$$ < $len$$;++$i$$) {
    var $disposable$$ = arguments[$i$$];
    goog.isArrayLike($disposable$$) ? goog.disposeAll.apply(null, $disposable$$) : goog.dispose($disposable$$)
  }
};
goog.events = {};
goog.events.Event = function $goog$events$Event$($type$$, $opt_target$$) {
  this.type = $type$$;
  this.currentTarget = this.target = $opt_target$$
};
goog.events.Event.prototype.disposeInternal = function $goog$events$Event$$disposeInternal$() {
};
goog.events.Event.prototype.dispose = function $goog$events$Event$$dispose$() {
};
goog.events.Event.prototype.propagationStopped_ = !1;
goog.events.Event.prototype.defaultPrevented = !1;
goog.events.Event.prototype.returnValue_ = !0;
goog.events.Event.prototype.stopPropagation = function $goog$events$Event$$stopPropagation$() {
  this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function $goog$events$Event$$preventDefault$() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function $goog$events$Event$stopPropagation$($e$$) {
  $e$$.stopPropagation()
};
goog.events.Event.preventDefault = function $goog$events$Event$preventDefault$($e$$) {
  $e$$.preventDefault()
};
goog.events.Listenable = function $goog$events$Listenable$() {
};
goog.events.Listenable.USE_LISTENABLE_INTERFACE = !1;
goog.events.Listenable.IMPLEMENTED_BY_PROP_ = "__closure_listenable";
goog.events.Listenable.addImplementation = function $goog$events$Listenable$addImplementation$($cls$$) {
  $cls$$.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP_] = !0
};
goog.events.Listenable.isImplementedBy = function $goog$events$Listenable$isImplementedBy$($obj$$) {
  return!(!$obj$$ || !$obj$$[goog.events.Listenable.IMPLEMENTED_BY_PROP_])
};
goog.events.ListenableKey = function $goog$events$ListenableKey$() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function $goog$events$ListenableKey$reserveKey$() {
  return++goog.events.ListenableKey.counter_
};
goog.events.Listener = function $goog$events$Listener$() {
  goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack)
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = !1;
goog.events.Listener.prototype.callOnce = !1;
goog.events.Listener.prototype.init = function $goog$events$Listener$$init$($listener$$, $proxy$$, $src$$, $type$$, $capture$$, $opt_handler$$) {
  if(goog.isFunction($listener$$)) {
    this.isFunctionListener_ = !0
  }else {
    if($listener$$ && $listener$$.handleEvent && goog.isFunction($listener$$.handleEvent)) {
      this.isFunctionListener_ = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = $listener$$;
  this.proxy = $proxy$$;
  this.src = $src$$;
  this.type = $type$$;
  this.capture = !!$capture$$;
  this.handler = $opt_handler$$;
  this.callOnce = !1;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = !1
};
goog.events.Listener.prototype.handleEvent = function $goog$events$Listener$$handleEvent$($eventObject$$) {
  return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, $eventObject$$) : this.listener.handleEvent.call(this.listener, $eventObject$$)
};
goog.debug = {};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function $goog$debug$errorHandlerWeakDep$protectEntryPoint$($fn$$, $opt_tracers$$) {
  return $fn$$
}};
goog.object = {};
goog.object.forEach = function $goog$object$forEach$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
};
goog.object.filter = function $goog$object$filter$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$) && ($res$$[$key$$] = $obj$$[$key$$])
  }
  return $res$$
};
goog.object.map = function $goog$object$map$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
  return $res$$
};
goog.object.some = function $goog$object$some$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function $goog$object$every$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if(!$f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function $goog$object$getCount$($obj$$) {
  var $rv$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $rv$$++
  }
  return $rv$$
};
goog.object.getAnyKey = function $goog$object$getAnyKey$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $key$$
  }
};
goog.object.getAnyValue = function $goog$object$getAnyValue$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $obj$$[$key$$]
  }
};
goog.object.contains = function $goog$object$contains$($obj$$, $val$$) {
  return goog.object.containsValue($obj$$, $val$$)
};
goog.object.getValues = function $goog$object$getValues$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.getKeys = function $goog$object$getKeys$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $key$$
  }
  return $res$$
};
goog.object.getValueByKeys = function $goog$object$getValueByKeys$($obj$$, $var_args$$) {
  for(var $i$$ = goog.isArrayLike($var_args$$), $keys$$ = $i$$ ? $var_args$$ : arguments, $i$$ = $i$$ ? 0 : 1;$i$$ < $keys$$.length && ($obj$$ = $obj$$[$keys$$[$i$$]], goog.isDef($obj$$));$i$$++) {
  }
  return $obj$$
};
goog.object.containsKey = function $goog$object$containsKey$($obj$$, $key$$) {
  return $key$$ in $obj$$
};
goog.object.containsValue = function $goog$object$containsValue$($obj$$, $val$$) {
  for(var $key$$ in $obj$$) {
    if($obj$$[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function $goog$object$findKey$($obj$$, $f$$, $opt_this$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_this$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return $key$$
    }
  }
};
goog.object.findValue = function $goog$object$findValue$($obj$$, $f$$6_key$$, $opt_this$$) {
  return($f$$6_key$$ = goog.object.findKey($obj$$, $f$$6_key$$, $opt_this$$)) && $obj$$[$f$$6_key$$]
};
goog.object.isEmpty = function $goog$object$isEmpty$($obj$$) {
  for(var $key$$ in $obj$$) {
    return!1
  }
  return!0
};
goog.object.clear = function $goog$object$clear$($obj$$) {
  for(var $i$$ in $obj$$) {
    delete $obj$$[$i$$]
  }
};
goog.object.remove = function $goog$object$remove$($obj$$, $key$$) {
  var $rv$$;
  ($rv$$ = $key$$ in $obj$$) && delete $obj$$[$key$$];
  return $rv$$
};
goog.object.add = function $goog$object$add$($obj$$, $key$$, $val$$) {
  if($key$$ in $obj$$) {
    throw Error('The object already contains the key "' + $key$$ + '"');
  }
  goog.object.set($obj$$, $key$$, $val$$)
};
goog.object.get = function $goog$object$get$($obj$$, $key$$, $opt_val$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $opt_val$$
};
goog.object.set = function $goog$object$set$($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = $value$$
};
goog.object.setIfUndefined = function $goog$object$setIfUndefined$($obj$$, $key$$, $value$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $obj$$[$key$$] = $value$$
};
goog.object.clone = function $goog$object$clone$($obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.unsafeClone = function $goog$object$unsafeClone$($obj$$) {
  var $clone$$1_type$$ = goog.typeOf($obj$$);
  if("object" == $clone$$1_type$$ || "array" == $clone$$1_type$$) {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone$$1_type$$ = "array" == $clone$$1_type$$ ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone$$1_type$$[$key$$] = goog.object.unsafeClone($obj$$[$key$$])
    }
    return $clone$$1_type$$
  }
  return $obj$$
};
goog.object.transpose = function $goog$object$transpose$($obj$$) {
  var $transposed$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $transposed$$[$obj$$[$key$$]] = $key$$
  }
  return $transposed$$
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function $goog$object$extend$($target$$, $var_args$$) {
  for(var $key$$, $source$$, $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    $source$$ = arguments[$i$$];
    for($key$$ in $source$$) {
      $target$$[$key$$] = $source$$[$key$$]
    }
    for(var $j$$ = 0;$j$$ < goog.object.PROTOTYPE_FIELDS_.length;$j$$++) {
      $key$$ = goog.object.PROTOTYPE_FIELDS_[$j$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$])
    }
  }
};
goog.object.create = function $goog$object$create$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if($argLength$$ % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
    $rv$$[arguments[$i$$]] = arguments[$i$$ + 1]
  }
  return $rv$$
};
goog.object.createSet = function $goog$object$createSet$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$++) {
    $rv$$[arguments[$i$$]] = !0
  }
  return $rv$$
};
goog.object.createImmutableView = function $goog$object$createImmutableView$($obj$$) {
  var $result$$ = $obj$$;
  Object.isFrozen && !Object.isFrozen($obj$$) && ($result$$ = Object.create($obj$$), Object.freeze($result$$));
  return $result$$
};
goog.object.isImmutableView = function $goog$object$isImmutableView$($obj$$) {
  return!!Object.isFrozen && Object.isFrozen($obj$$)
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersion("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersion("1.9b") || goog.userAgent.IE && goog.userAgent.isVersion("8") || goog.userAgent.OPERA && 
goog.userAgent.isVersion("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersion("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersion("8") || goog.userAgent.IE && !goog.userAgent.isVersion("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)};
goog.debug.Error = function $goog$debug$Error$($opt_msg$$) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  $opt_msg$$ && (this.message = String($opt_msg$$))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function $goog$asserts$AssertionError$($messagePattern$$, $messageArgs$$) {
  $messageArgs$$.unshift($messagePattern$$);
  goog.debug.Error.call(this, goog.string.subs.apply(null, $messageArgs$$));
  $messageArgs$$.shift();
  this.messagePattern = $messagePattern$$
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function $goog$asserts$doAssertFailure_$($defaultMessage$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  var $message$$ = "Assertion failed";
  if($givenMessage$$) {
    var $message$$ = $message$$ + (": " + $givenMessage$$), $args$$ = $givenArgs$$
  }else {
    $defaultMessage$$ && ($message$$ += ": " + $defaultMessage$$, $args$$ = $defaultArgs$$)
  }
  throw new goog.asserts.AssertionError("" + $message$$, $args$$ || []);
};
goog.asserts.assert = function $goog$asserts$assert$($condition$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !$condition$$ && goog.asserts.doAssertFailure_("", null, $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $condition$$
};
goog.asserts.fail = function $goog$asserts$fail$($opt_message$$, $var_args$$) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + ($opt_message$$ ? ": " + $opt_message$$ : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function $goog$asserts$assertNumber$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber($value$$) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertString = function $goog$asserts$assertString$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString($value$$) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertFunction = function $goog$asserts$assertFunction$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction($value$$) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertObject = function $goog$asserts$assertObject$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject($value$$) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertArray = function $goog$asserts$assertArray$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray($value$$) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertBoolean = function $goog$asserts$assertBoolean$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean($value$$) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertInstanceof = function $goog$asserts$assertInstanceof$($value$$, $type$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || $value$$ instanceof $type$$ || goog.asserts.doAssertFailure_("instanceof check failed.", null, $opt_message$$, Array.prototype.slice.call(arguments, 3));
  return $value$$
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.peek = function $goog$array$peek$($array$$) {
  return $array$$[$array$$.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call($arr$$, $obj$$, $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex_i$$23_opt_fromIndex$$) {
  $fromIndex_i$$23_opt_fromIndex$$ = null == $fromIndex_i$$23_opt_fromIndex$$ ? 0 : 0 > $fromIndex_i$$23_opt_fromIndex$$ ? Math.max(0, $arr$$.length + $fromIndex_i$$23_opt_fromIndex$$) : $fromIndex_i$$23_opt_fromIndex$$;
  if(goog.isString($arr$$)) {
    return goog.isString($obj$$) && 1 == $obj$$.length ? $arr$$.indexOf($obj$$, $fromIndex_i$$23_opt_fromIndex$$) : -1
  }
  for(;$fromIndex_i$$23_opt_fromIndex$$ < $arr$$.length;$fromIndex_i$$23_opt_fromIndex$$++) {
    if($fromIndex_i$$23_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex_i$$23_opt_fromIndex$$] === $obj$$) {
      return $fromIndex_i$$23_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call($arr$$, $obj$$, null == $opt_fromIndex$$ ? $arr$$.length - 1 : $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex$$2_i$$24_opt_fromIndex$$) {
  $fromIndex$$2_i$$24_opt_fromIndex$$ = null == $fromIndex$$2_i$$24_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$$2_i$$24_opt_fromIndex$$;
  0 > $fromIndex$$2_i$$24_opt_fromIndex$$ && ($fromIndex$$2_i$$24_opt_fromIndex$$ = Math.max(0, $arr$$.length + $fromIndex$$2_i$$24_opt_fromIndex$$));
  if(goog.isString($arr$$)) {
    return goog.isString($obj$$) && 1 == $obj$$.length ? $arr$$.lastIndexOf($obj$$, $fromIndex$$2_i$$24_opt_fromIndex$$) : -1
  }
  for(;0 <= $fromIndex$$2_i$$24_opt_fromIndex$$;$fromIndex$$2_i$$24_opt_fromIndex$$--) {
    if($fromIndex$$2_i$$24_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex$$2_i$$24_opt_fromIndex$$] === $obj$$) {
      return $fromIndex$$2_i$$24_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)
  }
};
goog.array.forEachRight = function $goog$array$forEachRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$26_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$26_l$$ = $i$$26_l$$ - 1;0 <= $i$$26_l$$;--$i$$26_l$$) {
    $i$$26_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$26_l$$], $i$$26_l$$, $arr$$)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$) {
      var $val$$ = $arr2$$[$i$$];
      $f$$.call($opt_obj$$, $val$$, $i$$, $arr$$) && ($res$$[$resLength$$++] = $val$$)
    }
  }
  return $res$$
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = Array($l$$), $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && ($res$$[$i$$] = $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$))
  }
  return $res$$
};
goog.array.reduce = function $goog$array$reduce$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduce) {
    return $opt_obj$$ ? $arr$$.reduce(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduce($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEach($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.reduceRight = function $goog$array$reduceRight$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduceRight) {
    return $opt_obj$$ ? $arr$$.reduceRight(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduceRight($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEachRight($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && !$f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!1
    }
  }
  return!0
};
goog.array.count = function $goog$array$count$($arr$$0$$, $f$$, $opt_obj$$) {
  var $count$$ = 0;
  goog.array.forEach($arr$$0$$, function($element$$, $index$$, $arr$$) {
    $f$$.call($opt_obj$$, $element$$, $index$$, $arr$$) && ++$count$$
  }, $opt_obj$$);
  return $count$$
};
goog.array.find = function $goog$array$find$($arr$$, $f$$21_i$$, $opt_obj$$) {
  $f$$21_i$$ = goog.array.findIndex($arr$$, $f$$21_i$$, $opt_obj$$);
  return 0 > $f$$21_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$21_i$$) : $arr$$[$f$$21_i$$]
};
goog.array.findIndex = function $goog$array$findIndex$($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return $i$$
    }
  }
  return-1
};
goog.array.findRight = function $goog$array$findRight$($arr$$, $f$$23_i$$, $opt_obj$$) {
  $f$$23_i$$ = goog.array.findIndexRight($arr$$, $f$$23_i$$, $opt_obj$$);
  return 0 > $f$$23_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$23_i$$) : $arr$$[$f$$23_i$$]
};
goog.array.findIndexRight = function $goog$array$findIndexRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$34_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$34_l$$ = $i$$34_l$$ - 1;0 <= $i$$34_l$$;$i$$34_l$$--) {
    if($i$$34_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$34_l$$], $i$$34_l$$, $arr$$)) {
      return $i$$34_l$$
    }
  }
  return-1
};
goog.array.contains = function $goog$array$contains$($arr$$, $obj$$) {
  return 0 <= goog.array.indexOf($arr$$, $obj$$)
};
goog.array.isEmpty = function $goog$array$isEmpty$($arr$$) {
  return 0 == $arr$$.length
};
goog.array.clear = function $goog$array$clear$($arr$$) {
  if(!goog.isArray($arr$$)) {
    for(var $i$$ = $arr$$.length - 1;0 <= $i$$;$i$$--) {
      delete $arr$$[$i$$]
    }
  }
  $arr$$.length = 0
};
goog.array.insert = function $goog$array$insert$($arr$$, $obj$$) {
  goog.array.contains($arr$$, $obj$$) || $arr$$.push($obj$$)
};
goog.array.insertAt = function $goog$array$insertAt$($arr$$, $obj$$, $opt_i$$) {
  goog.array.splice($arr$$, $opt_i$$, 0, $obj$$)
};
goog.array.insertArrayAt = function $goog$array$insertArrayAt$($arr$$, $elementsToAdd$$, $opt_i$$) {
  goog.partial(goog.array.splice, $arr$$, $opt_i$$, 0).apply(null, $elementsToAdd$$)
};
goog.array.insertBefore = function $goog$array$insertBefore$($arr$$, $obj$$, $opt_obj2$$) {
  var $i$$;
  2 == arguments.length || 0 > ($i$$ = goog.array.indexOf($arr$$, $opt_obj2$$)) ? $arr$$.push($obj$$) : goog.array.insertAt($arr$$, $obj$$, $i$$)
};
goog.array.remove = function $goog$array$remove$($arr$$, $obj$$) {
  var $i$$ = goog.array.indexOf($arr$$, $obj$$), $rv$$;
  ($rv$$ = 0 <= $i$$) && goog.array.removeAt($arr$$, $i$$);
  return $rv$$
};
goog.array.removeAt = function $goog$array$removeAt$($arr$$, $i$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call($arr$$, $i$$, 1).length
};
goog.array.removeIf = function $goog$array$removeIf$($arr$$, $f$$25_i$$, $opt_obj$$) {
  $f$$25_i$$ = goog.array.findIndex($arr$$, $f$$25_i$$, $opt_obj$$);
  return 0 <= $f$$25_i$$ ? (goog.array.removeAt($arr$$, $f$$25_i$$), !0) : !1
};
goog.array.concat = function $goog$array$concat$($var_args$$) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function $goog$array$toArray$($object$$) {
  var $length$$ = $object$$.length;
  if(0 < $length$$) {
    for(var $rv$$ = Array($length$$), $i$$ = 0;$i$$ < $length$$;$i$$++) {
      $rv$$[$i$$] = $object$$[$i$$]
    }
    return $rv$$
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function $goog$array$extend$($arr1$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $arr2$$ = arguments[$i$$], $isArrayLike$$;
    if(goog.isArray($arr2$$) || ($isArrayLike$$ = goog.isArrayLike($arr2$$)) && Object.prototype.hasOwnProperty.call($arr2$$, "callee")) {
      $arr1$$.push.apply($arr1$$, $arr2$$)
    }else {
      if($isArrayLike$$) {
        for(var $len1$$ = $arr1$$.length, $len2$$ = $arr2$$.length, $j$$ = 0;$j$$ < $len2$$;$j$$++) {
          $arr1$$[$len1$$ + $j$$] = $arr2$$[$j$$]
        }
      }else {
        $arr1$$.push($arr2$$)
      }
    }
  }
};
goog.array.splice = function $goog$array$splice$($arr$$, $index$$, $howMany$$, $var_args$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply($arr$$, goog.array.slice(arguments, 1))
};
goog.array.slice = function $goog$array$slice$($arr$$, $start$$, $opt_end$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$) : goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$, $opt_end$$)
};
goog.array.removeDuplicates = function $goog$array$removeDuplicates$($arr$$, $opt_rv$$) {
  for(var $returnArray$$ = $opt_rv$$ || $arr$$, $seen$$ = {}, $cursorInsert$$ = 0, $cursorRead$$ = 0;$cursorRead$$ < $arr$$.length;) {
    var $current$$ = $arr$$[$cursorRead$$++], $key$$ = goog.isObject($current$$) ? "o" + goog.getUid($current$$) : (typeof $current$$).charAt(0) + $current$$;
    Object.prototype.hasOwnProperty.call($seen$$, $key$$) || ($seen$$[$key$$] = !0, $returnArray$$[$cursorInsert$$++] = $current$$)
  }
  $returnArray$$.length = $cursorInsert$$
};
goog.array.binarySearch = function $goog$array$binarySearch$($arr$$, $target$$, $opt_compareFn$$) {
  return goog.array.binarySearch_($arr$$, $opt_compareFn$$ || goog.array.defaultCompare, !1, $target$$)
};
goog.array.binarySelect = function $goog$array$binarySelect$($arr$$, $evaluator$$, $opt_obj$$) {
  return goog.array.binarySearch_($arr$$, $evaluator$$, !0, void 0, $opt_obj$$)
};
goog.array.binarySearch_ = function $goog$array$binarySearch_$($arr$$, $compareFn$$, $isEvaluator$$, $opt_target$$, $opt_selfObj$$) {
  for(var $left$$ = 0, $right$$ = $arr$$.length, $found$$;$left$$ < $right$$;) {
    var $middle$$ = $left$$ + $right$$ >> 1, $compareResult$$;
    $compareResult$$ = $isEvaluator$$ ? $compareFn$$.call($opt_selfObj$$, $arr$$[$middle$$], $middle$$, $arr$$) : $compareFn$$($opt_target$$, $arr$$[$middle$$]);
    0 < $compareResult$$ ? $left$$ = $middle$$ + 1 : ($right$$ = $middle$$, $found$$ = !$compareResult$$)
  }
  return $found$$ ? $left$$ : ~$left$$
};
goog.array.sort = function $goog$array$sort$($arr$$, $opt_compareFn$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call($arr$$, $opt_compareFn$$ || goog.array.defaultCompare)
};
goog.array.stableSort = function $goog$array$stableSort$($arr$$, $opt_compareFn$$) {
  for(var $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = {index:$i$$, value:$arr$$[$i$$]}
  }
  var $valueCompareFn$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function stableCompareFn($obj1$$, $obj2$$) {
    return $valueCompareFn$$($obj1$$.value, $obj2$$.value) || $obj1$$.index - $obj2$$.index
  });
  for($i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = $arr$$[$i$$].value
  }
};
goog.array.sortObjectsByKey = function $goog$array$sortObjectsByKey$($arr$$, $key$$, $opt_compareFn$$) {
  var $compare$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function($a$$, $b$$) {
    return $compare$$($a$$[$key$$], $b$$[$key$$])
  })
};
goog.array.isSorted = function $goog$array$isSorted$($arr$$, $compare$$1_opt_compareFn$$, $opt_strict$$) {
  $compare$$1_opt_compareFn$$ = $compare$$1_opt_compareFn$$ || goog.array.defaultCompare;
  for(var $i$$ = 1;$i$$ < $arr$$.length;$i$$++) {
    var $compareResult$$ = $compare$$1_opt_compareFn$$($arr$$[$i$$ - 1], $arr$$[$i$$]);
    if(0 < $compareResult$$ || 0 == $compareResult$$ && $opt_strict$$) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function $goog$array$equals$($arr1$$, $arr2$$, $equalsFn_opt_equalsFn$$) {
  if(!goog.isArrayLike($arr1$$) || !goog.isArrayLike($arr2$$) || $arr1$$.length != $arr2$$.length) {
    return!1
  }
  var $l$$ = $arr1$$.length;
  $equalsFn_opt_equalsFn$$ = $equalsFn_opt_equalsFn$$ || goog.array.defaultCompareEquality;
  for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$equalsFn_opt_equalsFn$$($arr1$$[$i$$], $arr2$$[$i$$])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function $goog$array$compare$($arr1$$, $arr2$$, $opt_equalsFn$$) {
  return goog.array.equals($arr1$$, $arr2$$, $opt_equalsFn$$)
};
goog.array.compare3 = function $goog$array$compare3$($arr1$$, $arr2$$, $compare$$2_opt_compareFn$$) {
  $compare$$2_opt_compareFn$$ = $compare$$2_opt_compareFn$$ || goog.array.defaultCompare;
  for(var $l$$ = Math.min($arr1$$.length, $arr2$$.length), $i$$ = 0;$i$$ < $l$$;$i$$++) {
    var $result$$ = $compare$$2_opt_compareFn$$($arr1$$[$i$$], $arr2$$[$i$$]);
    if(0 != $result$$) {
      return $result$$
    }
  }
  return goog.array.defaultCompare($arr1$$.length, $arr2$$.length)
};
goog.array.defaultCompare = function $goog$array$defaultCompare$($a$$, $b$$) {
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0
};
goog.array.defaultCompareEquality = function $goog$array$defaultCompareEquality$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.array.binaryInsert = function $goog$array$binaryInsert$($array$$, $value$$, $index$$51_opt_compareFn$$) {
  $index$$51_opt_compareFn$$ = goog.array.binarySearch($array$$, $value$$, $index$$51_opt_compareFn$$);
  return 0 > $index$$51_opt_compareFn$$ ? (goog.array.insertAt($array$$, $value$$, -($index$$51_opt_compareFn$$ + 1)), !0) : !1
};
goog.array.binaryRemove = function $goog$array$binaryRemove$($array$$, $index$$52_value$$, $opt_compareFn$$) {
  $index$$52_value$$ = goog.array.binarySearch($array$$, $index$$52_value$$, $opt_compareFn$$);
  return 0 <= $index$$52_value$$ ? goog.array.removeAt($array$$, $index$$52_value$$) : !1
};
goog.array.bucket = function $goog$array$bucket$($array$$, $sorter$$) {
  for(var $buckets$$ = {}, $i$$ = 0;$i$$ < $array$$.length;$i$$++) {
    var $value$$ = $array$$[$i$$], $key$$ = $sorter$$($value$$, $i$$, $array$$);
    goog.isDef($key$$) && ($buckets$$[$key$$] || ($buckets$$[$key$$] = [])).push($value$$)
  }
  return $buckets$$
};
goog.array.toObject = function $goog$array$toObject$($arr$$, $keyFunc$$, $opt_obj$$) {
  var $ret$$ = {};
  goog.array.forEach($arr$$, function($element$$, $index$$) {
    $ret$$[$keyFunc$$.call($opt_obj$$, $element$$, $index$$, $arr$$)] = $element$$
  });
  return $ret$$
};
goog.array.range = function $goog$array$range$($i$$, $opt_end$$, $opt_step_step$$) {
  var $array$$ = [], $start$$ = 0, $end$$ = $i$$;
  $opt_step_step$$ = $opt_step_step$$ || 1;
  void 0 !== $opt_end$$ && ($start$$ = $i$$, $end$$ = $opt_end$$);
  if(0 > $opt_step_step$$ * ($end$$ - $start$$)) {
    return[]
  }
  if(0 < $opt_step_step$$) {
    for($i$$ = $start$$;$i$$ < $end$$;$i$$ += $opt_step_step$$) {
      $array$$.push($i$$)
    }
  }else {
    for($i$$ = $start$$;$i$$ > $end$$;$i$$ += $opt_step_step$$) {
      $array$$.push($i$$)
    }
  }
  return $array$$
};
goog.array.repeat = function $goog$array$repeat$($value$$, $n$$) {
  for(var $array$$ = [], $i$$ = 0;$i$$ < $n$$;$i$$++) {
    $array$$[$i$$] = $value$$
  }
  return $array$$
};
goog.array.flatten = function $goog$array$flatten$($var_args$$) {
  for(var $result$$ = [], $i$$ = 0;$i$$ < arguments.length;$i$$++) {
    var $element$$ = arguments[$i$$];
    goog.isArray($element$$) ? $result$$.push.apply($result$$, goog.array.flatten.apply(null, $element$$)) : $result$$.push($element$$)
  }
  return $result$$
};
goog.array.rotate = function $goog$array$rotate$($array$$, $n$$) {
  goog.asserts.assert(null != $array$$.length);
  $array$$.length && ($n$$ %= $array$$.length, 0 < $n$$ ? goog.array.ARRAY_PROTOTYPE_.unshift.apply($array$$, $array$$.splice(-$n$$, $n$$)) : 0 > $n$$ && goog.array.ARRAY_PROTOTYPE_.push.apply($array$$, $array$$.splice(0, -$n$$)));
  return $array$$
};
goog.array.zip = function $goog$array$zip$($var_args$$) {
  if(!arguments.length) {
    return[]
  }
  for(var $result$$ = [], $i$$ = 0;;$i$$++) {
    for(var $value$$ = [], $j$$ = 0;$j$$ < arguments.length;$j$$++) {
      var $arr$$ = arguments[$j$$];
      if($i$$ >= $arr$$.length) {
        return $result$$
      }
      $value$$.push($arr$$[$i$$])
    }
    $result$$.push($value$$)
  }
};
goog.array.shuffle = function $goog$array$shuffle$($arr$$, $opt_randFn$$) {
  for(var $randFn$$ = $opt_randFn$$ || Math.random, $i$$ = $arr$$.length - 1;0 < $i$$;$i$$--) {
    var $j$$ = Math.floor($randFn$$() * ($i$$ + 1)), $tmp$$ = $arr$$[$i$$];
    $arr$$[$i$$] = $arr$$[$j$$];
    $arr$$[$j$$] = $tmp$$
  }
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function $goog$debug$EntryPointMonitor$() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function $goog$debug$entryPointRegistry$register$($callback$$) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = $callback$$;
  if(goog.debug.entryPointRegistry.monitorsMayExist_) {
    for(var $monitors$$ = goog.debug.entryPointRegistry.monitors_, $i$$ = 0;$i$$ < $monitors$$.length;$i$$++) {
      $callback$$(goog.bind($monitors$$[$i$$].wrap, $monitors$$[$i$$]))
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function $goog$debug$entryPointRegistry$monitorAll$($monitor$$) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for(var $transformer$$ = goog.bind($monitor$$.wrap, $monitor$$), $i$$ = 0;$i$$ < goog.debug.entryPointRegistry.refList_.length;$i$$++) {
    goog.debug.entryPointRegistry.refList_[$i$$]($transformer$$)
  }
  goog.debug.entryPointRegistry.monitors_.push($monitor$$)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function $goog$debug$entryPointRegistry$unmonitorAllIfPossible$($monitor$$1_transformer$$) {
  var $monitors$$ = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert($monitor$$1_transformer$$ == $monitors$$[$monitors$$.length - 1], "Only the most recent monitor can be unwrapped.");
  $monitor$$1_transformer$$ = goog.bind($monitor$$1_transformer$$.unwrap, $monitor$$1_transformer$$);
  for(var $i$$ = 0;$i$$ < goog.debug.entryPointRegistry.refList_.length;$i$$++) {
    goog.debug.entryPointRegistry.refList_[$i$$]($monitor$$1_transformer$$)
  }
  $monitors$$.length--
};
goog.events.EventWrapper = function $goog$events$EventWrapper$() {
};
goog.events.EventWrapper.prototype.listen = function $goog$events$EventWrapper$$listen$($src$$, $listener$$, $opt_capt$$, $opt_scope$$, $opt_eventHandler$$) {
};
goog.events.EventWrapper.prototype.unlisten = function $goog$events$EventWrapper$$unlisten$($src$$, $listener$$, $opt_capt$$, $opt_scope$$, $opt_eventHandler$$) {
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", 
POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", TRANSITIONEND:goog.userAgent.WEBKIT ? "webkitTransitionEnd" : goog.userAgent.OPERA ? "oTransitionEnd" : "transitionend", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", 
MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROVER:"MSPointerOver", MSPOINTEROUT:"MSPointerOut", MSPOINTERUP:"MSPointerUp", TEXTINPUT:"textinput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend"};
goog.reflect = {};
goog.reflect.object = function $goog$reflect$object$($type$$, $object$$) {
  return $object$$
};
goog.reflect.sinkValue = function $goog$reflect$sinkValue$($x$$) {
  goog.reflect.sinkValue[" "]($x$$);
  return $x$$
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function $goog$reflect$canAccessProperty$($obj$$, $prop$$) {
  try {
    return goog.reflect.sinkValue($obj$$[$prop$$]), !0
  }catch($e$$) {
  }
  return!1
};
goog.events.BrowserEvent = function $goog$events$BrowserEvent$($opt_e$$, $opt_currentTarget$$) {
  $opt_e$$ && this.init($opt_e$$, $opt_currentTarget$$)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = !1;
goog.events.BrowserEvent.prototype.altKey = !1;
goog.events.BrowserEvent.prototype.shiftKey = !1;
goog.events.BrowserEvent.prototype.metaKey = !1;
goog.events.BrowserEvent.prototype.platformModifierKey = !1;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function $goog$events$BrowserEvent$$init$($e$$, $opt_currentTarget$$) {
  var $type$$ = this.type = $e$$.type;
  goog.events.Event.call(this, $type$$);
  this.target = $e$$.target || $e$$.srcElement;
  this.currentTarget = $opt_currentTarget$$;
  var $relatedTarget$$ = $e$$.relatedTarget;
  $relatedTarget$$ ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty($relatedTarget$$, "nodeName") || ($relatedTarget$$ = null)) : $type$$ == goog.events.EventType.MOUSEOVER ? $relatedTarget$$ = $e$$.fromElement : $type$$ == goog.events.EventType.MOUSEOUT && ($relatedTarget$$ = $e$$.toElement);
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = goog.userAgent.WEBKIT || void 0 !== $e$$.offsetX ? $e$$.offsetX : $e$$.layerX;
  this.offsetY = goog.userAgent.WEBKIT || void 0 !== $e$$.offsetY ? $e$$.offsetY : $e$$.layerY;
  this.clientX = void 0 !== $e$$.clientX ? $e$$.clientX : $e$$.pageX;
  this.clientY = void 0 !== $e$$.clientY ? $e$$.clientY : $e$$.pageY;
  this.screenX = $e$$.screenX || 0;
  this.screenY = $e$$.screenY || 0;
  this.button = $e$$.button;
  this.keyCode = $e$$.keyCode || 0;
  this.charCode = $e$$.charCode || ("keypress" == $type$$ ? $e$$.keyCode : 0);
  this.ctrlKey = $e$$.ctrlKey;
  this.altKey = $e$$.altKey;
  this.shiftKey = $e$$.shiftKey;
  this.metaKey = $e$$.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? $e$$.metaKey : $e$$.ctrlKey;
  this.state = $e$$.state;
  this.event_ = $e$$;
  $e$$.defaultPrevented && this.preventDefault();
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function $goog$events$BrowserEvent$$isButton$($button$$) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == $button$$ : "click" == this.type ? $button$$ == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[$button$$])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function $goog$events$BrowserEvent$$isMouseActionButton$() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function $goog$events$BrowserEvent$$stopPropagation$() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function $goog$events$BrowserEvent$$preventDefault$() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var $be$$ = this.event_;
  if($be$$.preventDefault) {
    $be$$.preventDefault()
  }else {
    if($be$$.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if($be$$.ctrlKey || 112 <= $be$$.keyCode && 123 >= $be$$.keyCode) {
          $be$$.keyCode = -1
        }
      }catch($ex$$) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function $goog$events$BrowserEvent$$getBrowserEvent$() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function $goog$events$BrowserEvent$$disposeInternal$() {
};
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function $goog$events$listen$($listenableKey_src$$, $key$$43_type$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  if(goog.isArray($key$$43_type$$)) {
    for(var $i$$ = 0;$i$$ < $key$$43_type$$.length;$i$$++) {
      goog.events.listen($listenableKey_src$$, $key$$43_type$$[$i$$], $listener$$, $opt_capt$$, $opt_handler$$)
    }
    return null
  }
  $listenableKey_src$$ = goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($listenableKey_src$$) ? $listenableKey_src$$.listen($key$$43_type$$, goog.events.wrapListener_($listener$$), $opt_capt$$, $opt_handler$$) : goog.events.listen_($listenableKey_src$$, $key$$43_type$$, $listener$$, !1, $opt_capt$$, $opt_handler$$);
  $key$$43_type$$ = $listenableKey_src$$.key;
  goog.events.listeners_[$key$$43_type$$] = $listenableKey_src$$;
  return $key$$43_type$$
};
goog.events.listen_ = function $goog$events$listen_$($src$$, $type$$, $listener$$, $callOnce$$, $capture$$1_opt_capt$$, $opt_handler$$) {
  if(!$type$$) {
    throw Error("Invalid event type");
  }
  $capture$$1_opt_capt$$ = !!$capture$$1_opt_capt$$;
  var $listenerObj_map$$ = goog.events.listenerTree_;
  $type$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$] = {count_:0, remaining_:0});
  $listenerObj_map$$ = $listenerObj_map$$[$type$$];
  $capture$$1_opt_capt$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$] = {count_:0, remaining_:0}, $listenerObj_map$$.count_++);
  var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$], $srcUid$$ = goog.getUid($src$$), $listenerArray$$;
  $listenerObj_map$$.remaining_++;
  if($listenerObj_map$$[$srcUid$$]) {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
    for(var $i$$56_proxy$$ = 0;$i$$56_proxy$$ < $listenerArray$$.length;$i$$56_proxy$$++) {
      if($listenerObj_map$$ = $listenerArray$$[$i$$56_proxy$$], $listenerObj_map$$.listener == $listener$$ && $listenerObj_map$$.handler == $opt_handler$$) {
        if($listenerObj_map$$.removed) {
          break
        }
        $callOnce$$ || ($listenerArray$$[$i$$56_proxy$$].callOnce = !1);
        return $listenerArray$$[$i$$56_proxy$$]
      }
    }
  }else {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.count_++
  }
  $i$$56_proxy$$ = goog.events.getProxy();
  $listenerObj_map$$ = new goog.events.Listener;
  $listenerObj_map$$.init($listener$$, $i$$56_proxy$$, $src$$, $type$$, $capture$$1_opt_capt$$, $opt_handler$$);
  $listenerObj_map$$.callOnce = $callOnce$$;
  $i$$56_proxy$$.src = $src$$;
  $i$$56_proxy$$.listener = $listenerObj_map$$;
  $listenerArray$$.push($listenerObj_map$$);
  goog.events.sources_[$srcUid$$] || (goog.events.sources_[$srcUid$$] = []);
  goog.events.sources_[$srcUid$$].push($listenerObj_map$$);
  $src$$.addEventListener ? $src$$ != goog.global && $src$$.customEvent_ || $src$$.addEventListener($type$$, $i$$56_proxy$$, $capture$$1_opt_capt$$) : $src$$.attachEvent(goog.events.getOnString_($type$$), $i$$56_proxy$$);
  return $listenerObj_map$$
};
goog.events.getProxy = function $goog$events$getProxy$() {
  var $proxyCallbackFunction$$ = goog.events.handleBrowserEvent_, $f$$ = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function($eventObject$$) {
    return $proxyCallbackFunction$$.call($f$$.src, $f$$.listener, $eventObject$$)
  } : function($eventObject$$) {
    $eventObject$$ = $proxyCallbackFunction$$.call($f$$.src, $f$$.listener, $eventObject$$);
    if(!$eventObject$$) {
      return $eventObject$$
    }
  };
  return $f$$
};
goog.events.listenOnce = function $goog$events$listenOnce$($listenableKey$$1_src$$, $key$$44_type$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  if(goog.isArray($key$$44_type$$)) {
    for(var $i$$ = 0;$i$$ < $key$$44_type$$.length;$i$$++) {
      goog.events.listenOnce($listenableKey$$1_src$$, $key$$44_type$$[$i$$], $listener$$, $opt_capt$$, $opt_handler$$)
    }
    return null
  }
  $listenableKey$$1_src$$ = goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($listenableKey$$1_src$$) ? $listenableKey$$1_src$$.listenOnce($key$$44_type$$, goog.events.wrapListener_($listener$$), $opt_capt$$, $opt_handler$$) : goog.events.listen_($listenableKey$$1_src$$, $key$$44_type$$, $listener$$, !0, $opt_capt$$, $opt_handler$$);
  $key$$44_type$$ = $listenableKey$$1_src$$.key;
  goog.events.listeners_[$key$$44_type$$] = $listenableKey$$1_src$$;
  return $key$$44_type$$
};
goog.events.listenWithWrapper = function $goog$events$listenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.listen($src$$, $listener$$, $opt_capt$$, $opt_handler$$)
};
goog.events.unlisten = function $goog$events$unlisten$($listenerArray$$1_src$$, $type$$, $listener$$, $capture$$2_opt_capt$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      goog.events.unlisten($listenerArray$$1_src$$, $type$$[$i$$], $listener$$, $capture$$2_opt_capt$$, $opt_handler$$)
    }
    return null
  }
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($listenerArray$$1_src$$)) {
    return $listenerArray$$1_src$$.unlisten($type$$, goog.events.wrapListener_($listener$$), $capture$$2_opt_capt$$, $opt_handler$$)
  }
  $capture$$2_opt_capt$$ = !!$capture$$2_opt_capt$$;
  $listenerArray$$1_src$$ = goog.events.getListeners_($listenerArray$$1_src$$, $type$$, $capture$$2_opt_capt$$);
  if(!$listenerArray$$1_src$$) {
    return!1
  }
  for($i$$ = 0;$i$$ < $listenerArray$$1_src$$.length;$i$$++) {
    if($listenerArray$$1_src$$[$i$$].listener == $listener$$ && $listenerArray$$1_src$$[$i$$].capture == $capture$$2_opt_capt$$ && $listenerArray$$1_src$$[$i$$].handler == $opt_handler$$) {
      return goog.events.unlistenByKey($listenerArray$$1_src$$[$i$$].key)
    }
  }
  return!1
};
goog.events.unlistenByKey = function $goog$events$unlistenByKey$($key$$) {
  var $listener$$40_listenerArray$$ = goog.events.listeners_[$key$$];
  if(!$listener$$40_listenerArray$$ || $listener$$40_listenerArray$$.removed) {
    return!1
  }
  var $src$$12_srcUid$$ = $listener$$40_listenerArray$$.src;
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($src$$12_srcUid$$)) {
    return $src$$12_srcUid$$.unlistenByKey($listener$$40_listenerArray$$)
  }
  var $type$$ = $listener$$40_listenerArray$$.type, $proxy$$ = $listener$$40_listenerArray$$.proxy, $capture$$ = $listener$$40_listenerArray$$.capture;
  $src$$12_srcUid$$.removeEventListener ? $src$$12_srcUid$$ != goog.global && $src$$12_srcUid$$.customEvent_ || $src$$12_srcUid$$.removeEventListener($type$$, $proxy$$, $capture$$) : $src$$12_srcUid$$.detachEvent && $src$$12_srcUid$$.detachEvent(goog.events.getOnString_($type$$), $proxy$$);
  $src$$12_srcUid$$ = goog.getUid($src$$12_srcUid$$);
  goog.events.sources_[$src$$12_srcUid$$] && ($proxy$$ = goog.events.sources_[$src$$12_srcUid$$], goog.array.remove($proxy$$, $listener$$40_listenerArray$$), 0 == $proxy$$.length && delete goog.events.sources_[$src$$12_srcUid$$]);
  $listener$$40_listenerArray$$.removed = !0;
  if($listener$$40_listenerArray$$ = goog.events.listenerTree_[$type$$][$capture$$][$src$$12_srcUid$$]) {
    $listener$$40_listenerArray$$.needsCleanup_ = !0, goog.events.cleanUp_($type$$, $capture$$, $src$$12_srcUid$$, $listener$$40_listenerArray$$)
  }
  delete goog.events.listeners_[$key$$];
  return!0
};
goog.events.unlistenWithWrapper = function $goog$events$unlistenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.unlisten($src$$, $listener$$, $opt_capt$$, $opt_handler$$)
};
goog.events.cleanUp = function $goog$events$cleanUp$($listenableKey$$) {
  delete goog.events.listeners_[$listenableKey$$.key]
};
goog.events.cleanUp_ = function $goog$events$cleanUp_$($type$$, $capture$$, $srcUid$$, $listenerArray$$) {
  if(!$listenerArray$$.locked_ && $listenerArray$$.needsCleanup_) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$.length;$oldIndex$$++) {
      $listenerArray$$[$oldIndex$$].removed ? $listenerArray$$[$oldIndex$$].proxy.src = null : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$[$newIndex$$] = $listenerArray$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$.length = $newIndex$$;
    $listenerArray$$.needsCleanup_ = !1;
    0 == $newIndex$$ && (delete goog.events.listenerTree_[$type$$][$capture$$][$srcUid$$], goog.events.listenerTree_[$type$$][$capture$$].count_--, 0 == goog.events.listenerTree_[$type$$][$capture$$].count_ && (delete goog.events.listenerTree_[$type$$][$capture$$], goog.events.listenerTree_[$type$$].count_--), 0 == goog.events.listenerTree_[$type$$].count_ && delete goog.events.listenerTree_[$type$$])
  }
};
goog.events.removeAll = function $goog$events$removeAll$($opt_obj$$, $opt_type$$) {
  var $count$$ = 0, $noType$$ = null == $opt_type$$;
  if(null != $opt_obj$$) {
    if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && $opt_obj$$ && goog.events.Listenable.isImplementedBy($opt_obj$$)) {
      return $opt_obj$$.removeAllListeners($opt_type$$)
    }
    var $sourcesArray$$1_srcUid$$ = goog.getUid($opt_obj$$);
    if(goog.events.sources_[$sourcesArray$$1_srcUid$$]) {
      for(var $sourcesArray$$1_srcUid$$ = goog.events.sources_[$sourcesArray$$1_srcUid$$], $i$$ = $sourcesArray$$1_srcUid$$.length - 1;0 <= $i$$;$i$$--) {
        var $listener$$0$$ = $sourcesArray$$1_srcUid$$[$i$$];
        if($noType$$ || $opt_type$$ == $listener$$0$$.type) {
          goog.events.unlistenByKey($listener$$0$$.key), $count$$++
        }
      }
    }
  }else {
    goog.object.forEach(goog.events.listeners_, function($listener$$, $key$$) {
      goog.events.unlistenByKey($key$$);
      $count$$++
    })
  }
  return $count$$
};
goog.events.getListeners = function $goog$events$getListeners$($obj$$, $type$$, $capture$$) {
  return goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($obj$$) ? $obj$$.getListeners($type$$, $capture$$) : goog.events.getListeners_($obj$$, $type$$, $capture$$) || []
};
goog.events.getListeners_ = function $goog$events$getListeners_$($obj$$, $type$$, $capture$$) {
  var $map$$ = goog.events.listenerTree_;
  return $type$$ in $map$$ && ($map$$ = $map$$[$type$$], $capture$$ in $map$$ && ($map$$ = $map$$[$capture$$], $obj$$ = goog.getUid($obj$$), $map$$[$obj$$])) ? $map$$[$obj$$] : null
};
goog.events.getListener = function $goog$events$getListener$($listenerArray$$4_src$$, $i$$60_type$$, $listener$$, $capture$$7_opt_capt$$, $opt_handler$$) {
  $capture$$7_opt_capt$$ = !!$capture$$7_opt_capt$$;
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($listenerArray$$4_src$$)) {
    return $listenerArray$$4_src$$.getListener($i$$60_type$$, goog.events.wrapListener_($listener$$), $capture$$7_opt_capt$$, $opt_handler$$)
  }
  if($listenerArray$$4_src$$ = goog.events.getListeners_($listenerArray$$4_src$$, $i$$60_type$$, $capture$$7_opt_capt$$)) {
    for($i$$60_type$$ = 0;$i$$60_type$$ < $listenerArray$$4_src$$.length;$i$$60_type$$++) {
      if(!$listenerArray$$4_src$$[$i$$60_type$$].removed && $listenerArray$$4_src$$[$i$$60_type$$].listener == $listener$$ && $listenerArray$$4_src$$[$i$$60_type$$].capture == $capture$$7_opt_capt$$ && $listenerArray$$4_src$$[$i$$60_type$$].handler == $opt_handler$$) {
        return $listenerArray$$4_src$$[$i$$60_type$$]
      }
    }
  }
  return null
};
goog.events.hasListener = function $goog$events$hasListener$($obj$$67_objUid$$, $opt_type$$, $opt_capture$$) {
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($obj$$67_objUid$$)) {
    return $obj$$67_objUid$$.hasListener($opt_type$$, $opt_capture$$)
  }
  $obj$$67_objUid$$ = goog.getUid($obj$$67_objUid$$);
  var $listeners_map$$ = goog.events.sources_[$obj$$67_objUid$$];
  if($listeners_map$$) {
    var $hasType$$ = goog.isDef($opt_type$$), $hasCapture$$ = goog.isDef($opt_capture$$);
    return $hasType$$ && $hasCapture$$ ? ($listeners_map$$ = goog.events.listenerTree_[$opt_type$$], !!$listeners_map$$ && !!$listeners_map$$[$opt_capture$$] && $obj$$67_objUid$$ in $listeners_map$$[$opt_capture$$]) : $hasType$$ || $hasCapture$$ ? goog.array.some($listeners_map$$, function($listener$$) {
      return $hasType$$ && $listener$$.type == $opt_type$$ || $hasCapture$$ && $listener$$.capture == $opt_capture$$
    }) : !0
  }
  return!1
};
goog.events.expose = function $goog$events$expose$($e$$) {
  var $str$$ = [], $key$$;
  for($key$$ in $e$$) {
    $e$$[$key$$] && $e$$[$key$$].id ? $str$$.push($key$$ + " = " + $e$$[$key$$] + " (" + $e$$[$key$$].id + ")") : $str$$.push($key$$ + " = " + $e$$[$key$$])
  }
  return $str$$.join("\n")
};
goog.events.getOnString_ = function $goog$events$getOnString_$($type$$) {
  return $type$$ in goog.events.onStringMap_ ? goog.events.onStringMap_[$type$$] : goog.events.onStringMap_[$type$$] = goog.events.onString_ + $type$$
};
goog.events.fireListeners = function $goog$events$fireListeners$($obj$$, $type$$, $capture$$, $eventObject$$) {
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.isImplementedBy($obj$$)) {
    return $obj$$.fireListeners($type$$, $capture$$, $eventObject$$)
  }
  var $map$$ = goog.events.listenerTree_;
  return $type$$ in $map$$ && ($map$$ = $map$$[$type$$], $capture$$ in $map$$) ? goog.events.fireListeners_($map$$[$capture$$], $obj$$, $type$$, $capture$$, $eventObject$$) : !0
};
goog.events.fireListeners_ = function $goog$events$fireListeners_$($map$$, $obj$$69_objUid$$, $type$$, $capture$$, $eventObject$$) {
  var $retval$$ = 1;
  $obj$$69_objUid$$ = goog.getUid($obj$$69_objUid$$);
  if($map$$[$obj$$69_objUid$$]) {
    var $remaining$$ = --$map$$.remaining_, $listenerArray$$ = $map$$[$obj$$69_objUid$$];
    $listenerArray$$.locked_ ? $listenerArray$$.locked_++ : $listenerArray$$.locked_ = 1;
    try {
      for(var $length$$ = $listenerArray$$.length, $i$$ = 0;$i$$ < $length$$;$i$$++) {
        var $listener$$ = $listenerArray$$[$i$$];
        $listener$$ && !$listener$$.removed && ($retval$$ &= !1 !== goog.events.fireListener($listener$$, $eventObject$$))
      }
    }finally {
      $map$$.remaining_ = Math.max($remaining$$, $map$$.remaining_), $listenerArray$$.locked_--, goog.events.cleanUp_($type$$, $capture$$, $obj$$69_objUid$$, $listenerArray$$)
    }
  }
  return Boolean($retval$$)
};
goog.events.fireListener = function $goog$events$fireListener$($listener$$, $eventObject$$) {
  $listener$$.callOnce && goog.events.unlistenByKey($listener$$.key);
  return $listener$$.handleEvent($eventObject$$)
};
goog.events.getTotalListenerCount = function $goog$events$getTotalListenerCount$() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function $goog$events$dispatchEvent$($src$$, $e$$) {
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE) {
    return $src$$.dispatchEvent($e$$)
  }
  var $hasCapture$$1_type$$ = $e$$.type || $e$$, $current$$1_map$$ = goog.events.listenerTree_;
  if(!($hasCapture$$1_type$$ in $current$$1_map$$)) {
    return!0
  }
  if(goog.isString($e$$)) {
    $e$$ = new goog.events.Event($e$$, $src$$)
  }else {
    if($e$$ instanceof goog.events.Event) {
      $e$$.target = $e$$.target || $src$$
    }else {
      var $oldEvent_rv$$ = $e$$;
      $e$$ = new goog.events.Event($hasCapture$$1_type$$, $src$$);
      goog.object.extend($e$$, $oldEvent_rv$$)
    }
  }
  var $oldEvent_rv$$ = 1, $ancestors$$, $current$$1_map$$ = $current$$1_map$$[$hasCapture$$1_type$$], $hasCapture$$1_type$$ = !0 in $current$$1_map$$, $parent$$;
  if($hasCapture$$1_type$$) {
    $ancestors$$ = [];
    for($parent$$ = $src$$;$parent$$;$parent$$ = $parent$$.getParentEventTarget()) {
      $ancestors$$.push($parent$$)
    }
    $parent$$ = $current$$1_map$$[!0];
    $parent$$.remaining_ = $parent$$.count_;
    for(var $i$$ = $ancestors$$.length - 1;!$e$$.propagationStopped_ && 0 <= $i$$ && $parent$$.remaining_;$i$$--) {
      $e$$.currentTarget = $ancestors$$[$i$$], $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $ancestors$$[$i$$], $e$$.type, !0, $e$$) && !1 != $e$$.returnValue_
    }
  }
  if(!1 in $current$$1_map$$) {
    if($parent$$ = $current$$1_map$$[!1], $parent$$.remaining_ = $parent$$.count_, $hasCapture$$1_type$$) {
      for($i$$ = 0;!$e$$.propagationStopped_ && $i$$ < $ancestors$$.length && $parent$$.remaining_;$i$$++) {
        $e$$.currentTarget = $ancestors$$[$i$$], $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $ancestors$$[$i$$], $e$$.type, !1, $e$$) && !1 != $e$$.returnValue_
      }
    }else {
      for($current$$1_map$$ = $src$$;!$e$$.propagationStopped_ && $current$$1_map$$ && $parent$$.remaining_;$current$$1_map$$ = $current$$1_map$$.getParentEventTarget()) {
        $e$$.currentTarget = $current$$1_map$$, $oldEvent_rv$$ &= goog.events.fireListeners_($parent$$, $current$$1_map$$, $e$$.type, !1, $e$$) && !1 != $e$$.returnValue_
      }
    }
  }
  return Boolean($oldEvent_rv$$)
};
goog.events.protectBrowserEventEntryPoint = function $goog$events$protectBrowserEventEntryPoint$($errorHandler$$) {
  goog.events.handleBrowserEvent_ = $errorHandler$$.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function $goog$events$handleBrowserEvent_$($listener$$, $opt_evt$$) {
  if($listener$$.removed) {
    return!0
  }
  var $be$$1_type$$ = $listener$$.type, $map$$ = goog.events.listenerTree_;
  if(!($be$$1_type$$ in $map$$)) {
    return!0
  }
  var $map$$ = $map$$[$be$$1_type$$], $ieEvent_retval$$, $targetsMap$$;
  if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    $ieEvent_retval$$ = $opt_evt$$ || goog.getObjectByName("window.event");
    var $hasCapture$$ = !0 in $map$$, $hasBubble$$ = !1 in $map$$;
    if($hasCapture$$) {
      if(goog.events.isMarkedIeEvent_($ieEvent_retval$$)) {
        return!0
      }
      goog.events.markIeEvent_($ieEvent_retval$$)
    }
    var $evt$$ = new goog.events.BrowserEvent;
    $evt$$.init($ieEvent_retval$$, this);
    $ieEvent_retval$$ = !0;
    try {
      if($hasCapture$$) {
        for(var $ancestors$$ = [], $parent$$ = $evt$$.currentTarget;$parent$$;$parent$$ = $parent$$.parentNode) {
          $ancestors$$.push($parent$$)
        }
        $targetsMap$$ = $map$$[!0];
        $targetsMap$$.remaining_ = $targetsMap$$.count_;
        for(var $i$$ = $ancestors$$.length - 1;!$evt$$.propagationStopped_ && 0 <= $i$$ && $targetsMap$$.remaining_;$i$$--) {
          $evt$$.currentTarget = $ancestors$$[$i$$], $ieEvent_retval$$ &= goog.events.fireListeners_($targetsMap$$, $ancestors$$[$i$$], $be$$1_type$$, !0, $evt$$)
        }
        if($hasBubble$$) {
          for($targetsMap$$ = $map$$[!1], $targetsMap$$.remaining_ = $targetsMap$$.count_, $i$$ = 0;!$evt$$.propagationStopped_ && $i$$ < $ancestors$$.length && $targetsMap$$.remaining_;$i$$++) {
            $evt$$.currentTarget = $ancestors$$[$i$$], $ieEvent_retval$$ &= goog.events.fireListeners_($targetsMap$$, $ancestors$$[$i$$], $be$$1_type$$, !1, $evt$$)
          }
        }
      }else {
        $ieEvent_retval$$ = goog.events.fireListener($listener$$, $evt$$)
      }
    }finally {
      $ancestors$$ && ($ancestors$$.length = 0)
    }
    return $ieEvent_retval$$
  }
  $be$$1_type$$ = new goog.events.BrowserEvent($opt_evt$$, this);
  return $ieEvent_retval$$ = goog.events.fireListener($listener$$, $be$$1_type$$)
};
goog.events.markIeEvent_ = function $goog$events$markIeEvent_$($e$$) {
  var $useReturnValue$$ = !1;
  if(0 == $e$$.keyCode) {
    try {
      $e$$.keyCode = -1;
      return
    }catch($ex$$) {
      $useReturnValue$$ = !0
    }
  }
  if($useReturnValue$$ || void 0 == $e$$.returnValue) {
    $e$$.returnValue = !0
  }
};
goog.events.isMarkedIeEvent_ = function $goog$events$isMarkedIeEvent_$($e$$) {
  return 0 > $e$$.keyCode || void 0 != $e$$.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function $goog$events$getUniqueId$($identifier$$) {
  return $identifier$$ + "_" + goog.events.uniqueIdCounter_++
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener_ = function $goog$events$wrapListener_$($listener$$) {
  return goog.isFunction($listener$$) ? $listener$$ : $listener$$[goog.events.LISTENER_WRAPPER_PROP_] || ($listener$$[goog.events.LISTENER_WRAPPER_PROP_] = function $$listener$$$goog$events$LISTENER_WRAPPER_PROP_$($e$$) {
    return $listener$$.handleEvent($e$$)
  })
};
goog.debug.entryPointRegistry.register(function($transformer$$) {
  goog.events.handleBrowserEvent_ = $transformer$$(goog.events.handleBrowserEvent_)
});
goog.events.EventTarget = function $goog$events$EventTarget$() {
  goog.Disposable.call(this);
  goog.events.Listenable.USE_LISTENABLE_INTERFACE && (this.eventTargetListeners_ = {}, this.reallyDisposed_ = !1, this.actualEventTarget_ = this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.USE_LISTENABLE_INTERFACE && goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.prototype.customEvent_ = !0;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function $goog$events$EventTarget$$getParentEventTarget$() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function $goog$events$EventTarget$$setParentEventTarget$($parent$$) {
  this.parentEventTarget_ = $parent$$
};
goog.events.EventTarget.prototype.addEventListener = function $goog$events$EventTarget$$addEventListener$($type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$) {
  goog.events.listen(this, $type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$)
};
goog.events.EventTarget.prototype.removeEventListener = function $goog$events$EventTarget$$removeEventListener$($type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$) {
  goog.events.unlisten(this, $type$$, $handler$$, $opt_capture$$, $opt_handlerScope$$)
};
goog.events.EventTarget.prototype.dispatchEvent = function $goog$events$EventTarget$$dispatchEvent$($e$$) {
  if(goog.events.Listenable.USE_LISTENABLE_INTERFACE) {
    if(this.reallyDisposed_) {
      return!0
    }
    var $ancestorsTree$$, $ancestor$$ = this.getParentEventTarget();
    if($ancestor$$) {
      for($ancestorsTree$$ = [];$ancestor$$;$ancestor$$ = $ancestor$$.getParentEventTarget()) {
        $ancestorsTree$$.push($ancestor$$)
      }
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, $e$$, $ancestorsTree$$)
  }
  return goog.events.dispatchEvent(this, $e$$)
};
goog.events.EventTarget.prototype.disposeInternal = function $goog$events$EventTarget$$disposeInternal$() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.Listenable.USE_LISTENABLE_INTERFACE ? (this.removeAllListeners(), this.reallyDisposed_ = !0) : goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.events.Listenable.USE_LISTENABLE_INTERFACE && (goog.events.EventTarget.prototype.listen = function $goog$events$EventTarget$$listen$($type$$, $listener$$, $opt_useCapture$$, $opt_listenerScope$$) {
  return this.listenInternal_($type$$, $listener$$, !1, $opt_useCapture$$, $opt_listenerScope$$)
}, goog.events.EventTarget.prototype.listenOnce = function $goog$events$EventTarget$$listenOnce$($type$$, $listener$$, $opt_useCapture$$, $opt_listenerScope$$) {
  return this.listenInternal_($type$$, $listener$$, !0, $opt_useCapture$$, $opt_listenerScope$$)
}, goog.events.EventTarget.prototype.listenInternal_ = function $goog$events$EventTarget$$listenInternal_$($type$$, $listener$$, $callOnce$$, $opt_useCapture$$, $opt_listenerScope$$) {
  goog.asserts.assert(!this.reallyDisposed_, "Can not listen on disposed object.");
  var $listenerArray$$ = this.eventTargetListeners_[$type$$] || (this.eventTargetListeners_[$type$$] = []), $index$$54_listenerObj$$;
  $index$$54_listenerObj$$ = goog.events.EventTarget.findListenerIndex_($listenerArray$$, $listener$$, $opt_useCapture$$, $opt_listenerScope$$);
  if(-1 < $index$$54_listenerObj$$) {
    return $index$$54_listenerObj$$ = $listenerArray$$[$index$$54_listenerObj$$], $callOnce$$ || ($index$$54_listenerObj$$.callOnce = !1), $index$$54_listenerObj$$
  }
  $index$$54_listenerObj$$ = new goog.events.Listener;
  $index$$54_listenerObj$$.init($listener$$, null, this, $type$$, !!$opt_useCapture$$, $opt_listenerScope$$);
  $index$$54_listenerObj$$.callOnce = $callOnce$$;
  $listenerArray$$.push($index$$54_listenerObj$$);
  return $index$$54_listenerObj$$
}, goog.events.EventTarget.prototype.unlisten = function $goog$events$EventTarget$$unlisten$($listenerArray$$7_type$$, $index$$55_listener$$, $listenerObj$$2_opt_useCapture$$, $opt_listenerScope$$) {
  if(!($listenerArray$$7_type$$ in this.eventTargetListeners_)) {
    return!1
  }
  $listenerArray$$7_type$$ = this.eventTargetListeners_[$listenerArray$$7_type$$];
  $index$$55_listener$$ = goog.events.EventTarget.findListenerIndex_($listenerArray$$7_type$$, $index$$55_listener$$, $listenerObj$$2_opt_useCapture$$, $opt_listenerScope$$);
  return-1 < $index$$55_listener$$ ? ($listenerObj$$2_opt_useCapture$$ = $listenerArray$$7_type$$[$index$$55_listener$$], goog.events.cleanUp($listenerObj$$2_opt_useCapture$$), $listenerObj$$2_opt_useCapture$$.removed = !0, goog.array.removeAt($listenerArray$$7_type$$, $index$$55_listener$$)) : !1
}, goog.events.EventTarget.prototype.unlistenByKey = function $goog$events$EventTarget$$unlistenByKey$($key$$) {
  var $removed_type$$ = $key$$.type;
  if(!($removed_type$$ in this.eventTargetListeners_)) {
    return!1
  }
  if($removed_type$$ = goog.array.remove(this.eventTargetListeners_[$removed_type$$], $key$$)) {
    goog.events.cleanUp($key$$), $key$$.removed = !0
  }
  return $removed_type$$
}, goog.events.EventTarget.prototype.removeAllListeners = function $goog$events$EventTarget$$removeAllListeners$($opt_type$$, $opt_capture$$) {
  var $count$$ = 0, $type$$;
  for($type$$ in this.eventTargetListeners_) {
    if(!$opt_type$$ || $type$$ == $opt_type$$) {
      for(var $listenerArray$$ = this.eventTargetListeners_[$type$$], $i$$ = 0;$i$$ < $listenerArray$$.length;$i$$++) {
        ++$count$$, goog.events.cleanUp($listenerArray$$[$i$$]), $listenerArray$$[$i$$].removed = !0
      }
      $listenerArray$$.length = 0
    }
  }
  return $count$$
}, goog.events.EventTarget.prototype.fireListeners = function $goog$events$EventTarget$$fireListeners$($listenerArray$$9_type$$, $capture$$, $eventObject$$) {
  goog.asserts.assert(!this.reallyDisposed_, "Can not fire listeners after dispose() completed.");
  if(!($listenerArray$$9_type$$ in this.eventTargetListeners_)) {
    return!0
  }
  var $rv$$ = !0;
  $listenerArray$$9_type$$ = goog.array.clone(this.eventTargetListeners_[$listenerArray$$9_type$$]);
  for(var $i$$ = 0;$i$$ < $listenerArray$$9_type$$.length;++$i$$) {
    var $listener$$ = $listenerArray$$9_type$$[$i$$];
    $listener$$ && !$listener$$.removed && $listener$$.capture == $capture$$ && ($listener$$.callOnce && this.unlistenByKey($listener$$), $rv$$ = !1 !== $listener$$.handleEvent($eventObject$$) && $rv$$)
  }
  return $rv$$ && !1 != $eventObject$$.returnValue_
}, goog.events.EventTarget.prototype.getListeners = function $goog$events$EventTarget$$getListeners$($type$$, $capture$$) {
  var $listenerArray$$ = this.eventTargetListeners_[$type$$], $rv$$ = [];
  if($listenerArray$$) {
    for(var $i$$ = 0;$i$$ < $listenerArray$$.length;++$i$$) {
      var $listenerObj$$ = $listenerArray$$[$i$$];
      $listenerObj$$.capture == $capture$$ && $rv$$.push($listenerObj$$)
    }
  }
  return $rv$$
}, goog.events.EventTarget.prototype.getListener = function $goog$events$EventTarget$$getListener$($listenerArray$$11_type$$, $listener$$, $capture$$, $opt_listenerScope$$) {
  $listenerArray$$11_type$$ = this.eventTargetListeners_[$listenerArray$$11_type$$];
  var $i$$ = -1;
  $listenerArray$$11_type$$ && ($i$$ = goog.events.EventTarget.findListenerIndex_($listenerArray$$11_type$$, $listener$$, $capture$$, $opt_listenerScope$$));
  return-1 < $i$$ ? $listenerArray$$11_type$$[$i$$] : null
}, goog.events.EventTarget.prototype.hasListener = function $goog$events$EventTarget$$hasListener$($opt_type$$, $opt_capture$$) {
  var $hasType$$ = goog.isDef($opt_type$$), $hasCapture$$ = goog.isDef($opt_capture$$);
  return goog.object.some(this.eventTargetListeners_, function($listenersArray$$, $type$$) {
    for(var $i$$ = 0;$i$$ < $listenersArray$$.length;++$i$$) {
      if(!($hasType$$ && $listenersArray$$[$i$$].type != $opt_type$$ || $hasCapture$$ && $listenersArray$$[$i$$].capture != $opt_capture$$)) {
        return!0
      }
    }
    return!1
  })
}, goog.events.EventTarget.prototype.setTargetForTesting = function $goog$events$EventTarget$$setTargetForTesting$($target$$) {
  this.actualEventTarget_ = $target$$
}, goog.events.EventTarget.dispatchEventInternal_ = function $goog$events$EventTarget$dispatchEventInternal_$($target$$, $e$$, $opt_ancestorsTree$$) {
  var $type$$ = $e$$.type || $e$$;
  if(goog.isString($e$$)) {
    $e$$ = new goog.events.Event($e$$, $target$$)
  }else {
    if($e$$ instanceof goog.events.Event) {
      $e$$.target = $e$$.target || $target$$
    }else {
      var $oldEvent$$1_rv$$ = $e$$;
      $e$$ = new goog.events.Event($type$$, $target$$);
      goog.object.extend($e$$, $oldEvent$$1_rv$$)
    }
  }
  var $oldEvent$$1_rv$$ = !0, $currentTarget$$;
  if($opt_ancestorsTree$$) {
    for(var $i$$ = $opt_ancestorsTree$$.length - 1;!$e$$.propagationStopped_ && 0 <= $i$$;$i$$--) {
      $currentTarget$$ = $e$$.currentTarget = $opt_ancestorsTree$$[$i$$], $oldEvent$$1_rv$$ = $currentTarget$$.fireListeners($type$$, !0, $e$$) && $oldEvent$$1_rv$$
    }
  }
  $e$$.propagationStopped_ || ($currentTarget$$ = $e$$.currentTarget = $target$$, $oldEvent$$1_rv$$ = $currentTarget$$.fireListeners($type$$, !0, $e$$) && $oldEvent$$1_rv$$, $e$$.propagationStopped_ || ($oldEvent$$1_rv$$ = $currentTarget$$.fireListeners($type$$, !1, $e$$) && $oldEvent$$1_rv$$));
  if($opt_ancestorsTree$$) {
    for($i$$ = 0;!$e$$.propagationStopped_ && $i$$ < $opt_ancestorsTree$$.length;$i$$++) {
      $currentTarget$$ = $e$$.currentTarget = $opt_ancestorsTree$$[$i$$], $oldEvent$$1_rv$$ = $currentTarget$$.fireListeners($type$$, !1, $e$$) && $oldEvent$$1_rv$$
    }
  }
  return $oldEvent$$1_rv$$
}, goog.events.EventTarget.findListenerIndex_ = function $goog$events$EventTarget$findListenerIndex_$($listenerArray$$, $listener$$, $opt_useCapture$$, $opt_listenerScope$$) {
  for(var $i$$ = 0;$i$$ < $listenerArray$$.length;++$i$$) {
    var $listenerObj$$ = $listenerArray$$[$i$$];
    if($listenerObj$$.listener == $listener$$ && $listenerObj$$.capture == !!$opt_useCapture$$ && $listenerObj$$.handler == $opt_listenerScope$$) {
      return $i$$
    }
  }
  return-1
});
goog.Timer = function $goog$Timer$($opt_interval$$, $opt_timerObject$$) {
  goog.events.EventTarget.call(this);
  this.interval_ = $opt_interval$$ || 1;
  this.timerObject_ = $opt_timerObject$$ || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function $goog$Timer$$getInterval$() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function $goog$Timer$$setInterval$($interval$$) {
  this.interval_ = $interval$$;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function $goog$Timer$$tick_$() {
  if(this.enabled) {
    var $elapsed$$ = goog.now() - this.last_;
    0 < $elapsed$$ && $elapsed$$ < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - $elapsed$$) : (this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
  }
};
goog.Timer.prototype.dispatchTick = function $goog$Timer$$dispatchTick$() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function $goog$Timer$$start$() {
  this.enabled = !0;
  this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function $goog$Timer$$stop$() {
  this.enabled = !1;
  this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function $goog$Timer$$disposeInternal$() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function $goog$Timer$callOnce$($listener$$, $opt_delay$$, $opt_handler$$) {
  if(goog.isFunction($listener$$)) {
    $opt_handler$$ && ($listener$$ = goog.bind($listener$$, $opt_handler$$))
  }else {
    if($listener$$ && "function" == typeof $listener$$.handleEvent) {
      $listener$$ = goog.bind($listener$$.handleEvent, $listener$$)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  return $opt_delay$$ > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout($listener$$, $opt_delay$$ || 0)
};
goog.Timer.clear = function $goog$Timer$clear$($timerId$$) {
  goog.Timer.defaultTimerObject.clearTimeout($timerId$$)
};
Blockly.Trashcan = function $Blockly$Trashcan$($workspace$$) {
  this.workspace_ = $workspace$$
};
Blockly.Trashcan.prototype.BODY_URL_ = "media/trashbody.png";
Blockly.Trashcan.prototype.LID_URL_ = "media/trashlid.png";
Blockly.Trashcan.prototype.WIDTH_ = 47;
Blockly.Trashcan.prototype.BODY_HEIGHT_ = 45;
Blockly.Trashcan.prototype.LID_HEIGHT_ = 15;
Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 35;
Blockly.Trashcan.prototype.MARGIN_SIDE_ = 35;
Blockly.Trashcan.prototype.isOpen = !1;
Blockly.Trashcan.prototype.radius = 50;
Blockly.Trashcan.prototype.svgGroup_ = null;
Blockly.Trashcan.prototype.svgBody_ = null;
Blockly.Trashcan.prototype.svgLid_ = null;
Blockly.Trashcan.prototype.lidTask_ = 0;
Blockly.Trashcan.prototype.lidAngle_ = 0;
Blockly.Trashcan.prototype.left_ = 0;
Blockly.Trashcan.prototype.top_ = 0;
Blockly.Trashcan.prototype.createDom = function $Blockly$Trashcan$$createDom$() {
  this.svgGroup_ = Blockly.createSvgElement("g", {filter:"url(#blocklyTrashcanShadowFilter)"}, null);
  this.svgBody_ = Blockly.createSvgElement("image", {width:this.WIDTH_, height:this.BODY_HEIGHT_}, this.svgGroup_);
  this.svgBody_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", Blockly.pathToBlockly + this.BODY_URL_);
  this.svgBody_.setAttribute("y", this.LID_HEIGHT_);
  this.svgLid_ = Blockly.createSvgElement("image", {width:this.WIDTH_, height:this.LID_HEIGHT_}, this.svgGroup_);
  this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", Blockly.pathToBlockly + this.LID_URL_);
  return this.svgGroup_
};
Blockly.Trashcan.prototype.init = function $Blockly$Trashcan$$init$() {
  this.setOpen_(!1);
  this.position_();
  Blockly.bindEvent_(window, "resize", this, this.position_)
};
Blockly.Trashcan.prototype.dispose = function $Blockly$Trashcan$$dispose$() {
  this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
  this.workspace_ = this.svgLid_ = this.svgBody_ = null;
  goog.Timer.clear(this.lidTask_)
};
Blockly.Trashcan.prototype.position_ = function $Blockly$Trashcan$$position_$() {
  var $metrics$$ = this.workspace_.getMetrics();
  $metrics$$ && (this.left_ = Blockly.RTL ? this.MARGIN_SIDE_ : $metrics$$.viewWidth + $metrics$$.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_, this.top_ = this.BODY_HEIGHT_ + this.LID_HEIGHT_ - this.MARGIN_BOTTOM_, this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
};
Blockly.Trashcan.prototype.onMouseMove = function $Blockly$Trashcan$$onMouseMove$($e$$27_mouseXY$$) {
  if(this.svgGroup_) {
    $e$$27_mouseXY$$ = Blockly.mouseToSvg($e$$27_mouseXY$$);
    var $trashXY$$ = Blockly.getSvgXY_(this.svgGroup_);
    $e$$27_mouseXY$$ = $e$$27_mouseXY$$.x + this.radius > $trashXY$$.x && $e$$27_mouseXY$$.x < $trashXY$$.x + this.WIDTH_ + this.radius && $e$$27_mouseXY$$.y + this.radius > $trashXY$$.y && $e$$27_mouseXY$$.y < $trashXY$$.y + this.BODY_HEIGHT_ + this.LID_HEIGHT_ + this.radius;
    this.isOpen != $e$$27_mouseXY$$ && this.setOpen_($e$$27_mouseXY$$)
  }
};
Blockly.Trashcan.prototype.setOpen_ = function $Blockly$Trashcan$$setOpen_$($state$$) {
  this.isOpen != $state$$ && (goog.Timer.clear(this.lidTask_), this.isOpen = $state$$, this.animateLid_())
};
Blockly.Trashcan.prototype.animateLid_ = function $Blockly$Trashcan$$animateLid_$() {
  this.lidAngle_ += this.isOpen ? 10 : -10;
  this.lidAngle_ = Math.max(0, this.lidAngle_);
  this.svgLid_.setAttribute("transform", "rotate(" + (Blockly.RTL ? -this.lidAngle_ : this.lidAngle_) + ", " + (Blockly.RTL ? 4 : this.WIDTH_ - 4) + ", " + (this.LID_HEIGHT_ - 2) + ")");
  if(this.isOpen ? 45 > this.lidAngle_ : 0 < this.lidAngle_) {
    this.lidTask_ = goog.Timer.callOnce(this.animateLid_, 5, this)
  }
};
Blockly.Trashcan.prototype.close = function $Blockly$Trashcan$$close$() {
  this.setOpen_(!1)
};
Blockly.Workspace = function $Blockly$Workspace$($getMetrics$$, $setMetrics$$) {
  this.getMetrics = $getMetrics$$;
  this.setMetrics = $setMetrics$$;
  this.isFlyout = !1;
  this.topBlocks_ = [];
  this.maxBlocks = Infinity;
  Blockly.ConnectionDB.init(this)
};
Blockly.Workspace.SCAN_ANGLE = 3;
Blockly.Workspace.prototype.dragMode = !1;
Blockly.Workspace.prototype.scrollX = 0;
Blockly.Workspace.prototype.scrollY = 0;
Blockly.Workspace.prototype.trashcan = null;
Blockly.Workspace.prototype.fireChangeEventPid_ = null;
Blockly.Workspace.prototype.scrollbar = null;
Blockly.Workspace.prototype.createDom = function $Blockly$Workspace$$createDom$() {
  this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
  this.svgBlockCanvas_ = Blockly.createSvgElement("g", {}, this.svgGroup_);
  this.svgBubbleCanvas_ = Blockly.createSvgElement("g", {}, this.svgGroup_);
  this.fireChangeEvent();
  return this.svgGroup_
};
Blockly.Workspace.prototype.dispose = function $Blockly$Workspace$$dispose$() {
  this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
  this.svgBubbleCanvas_ = this.svgBlockCanvas_ = null;
  this.trashcan && (this.trashcan.dispose(), this.trashcan = null)
};
Blockly.Workspace.prototype.addTrashcan = function $Blockly$Workspace$$addTrashcan$() {
  if(Blockly.hasTrashcan && !Blockly.readOnly) {
    this.trashcan = new Blockly.Trashcan(this);
    var $svgTrashcan$$ = this.trashcan.createDom();
    this.svgGroup_.insertBefore($svgTrashcan$$, this.svgBlockCanvas_);
    this.trashcan.init()
  }
};
Blockly.Workspace.prototype.getCanvas = function $Blockly$Workspace$$getCanvas$() {
  return this.svgBlockCanvas_
};
Blockly.Workspace.prototype.getBubbleCanvas = function $Blockly$Workspace$$getBubbleCanvas$() {
  return this.svgBubbleCanvas_
};
Blockly.Workspace.prototype.addTopBlock = function $Blockly$Workspace$$addTopBlock$($block$$) {
  this.topBlocks_.push($block$$);
  this.fireChangeEvent()
};
Blockly.Workspace.prototype.removeTopBlock = function $Blockly$Workspace$$removeTopBlock$($block$$) {
  for(var $found$$ = !1, $child$$, $x$$ = 0;$child$$ = this.topBlocks_[$x$$];$x$$++) {
    if($child$$ == $block$$) {
      this.topBlocks_.splice($x$$, 1);
      $found$$ = !0;
      break
    }
  }
  if(!$found$$) {
    throw"Block not present in workspace's list of top-most blocks.";
  }
  this.fireChangeEvent()
};
Blockly.Workspace.prototype.getTopBlocks = function $Blockly$Workspace$$getTopBlocks$($ordered$$) {
  var $blocks$$ = [].concat(this.topBlocks_);
  if($ordered$$ && 1 < $blocks$$.length) {
    var $offset$$ = Math.sin(Blockly.Workspace.SCAN_ANGLE / 180 * Math.PI);
    Blockly.RTL && ($offset$$ *= -1);
    $blocks$$.sort(function($a$$, $b$$) {
      var $aXY$$ = $a$$.getRelativeToSurfaceXY(), $bXY$$ = $b$$.getRelativeToSurfaceXY();
      return $aXY$$.y + $offset$$ * $aXY$$.x - ($bXY$$.y + $offset$$ * $bXY$$.x)
    })
  }
  return $blocks$$
};
Blockly.Workspace.prototype.getAllBlocks = function $Blockly$Workspace$$getAllBlocks$() {
  for(var $blocks$$ = this.getTopBlocks(!1), $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    $blocks$$ = $blocks$$.concat($blocks$$[$x$$].getChildren())
  }
  return $blocks$$
};
Blockly.Workspace.prototype.clear = function $Blockly$Workspace$$clear$() {
  for(Blockly.hideChaff();this.topBlocks_.length;) {
    this.topBlocks_[0].dispose()
  }
};
Blockly.Workspace.prototype.render = function $Blockly$Workspace$$render$() {
  for(var $renderList$$ = this.getAllBlocks(), $x$$ = 0, $block$$;$block$$ = $renderList$$[$x$$];$x$$++) {
    $block$$.getChildren().length || $block$$.render()
  }
};
Blockly.Workspace.prototype.getBlockById = function $Blockly$Workspace$$getBlockById$($id$$) {
  for(var $blocks$$ = this.getAllBlocks(), $x$$ = 0, $block$$;$block$$ = $blocks$$[$x$$];$x$$++) {
    if($block$$.id == $id$$) {
      return $block$$
    }
  }
  return null
};
Blockly.Workspace.prototype.traceOn = function $Blockly$Workspace$$traceOn$($armed$$) {
  this.traceOn_ = $armed$$;
  this.traceWrapper_ && (Blockly.unbindEvent_(this.traceWrapper_), this.traceWrapper_ = null);
  $armed$$ && (this.traceWrapper_ = Blockly.bindEvent_(this.svgBlockCanvas_, "blocklySelectChange", this, function() {
    this.traceOn_ = !1
  }))
};
Blockly.Workspace.prototype.highlightBlock = function $Blockly$Workspace$$highlightBlock$($id$$) {
  if(this.traceOn_) {
    var $block$$ = null;
    if($id$$ && ($block$$ = this.getBlockById($id$$), !$block$$)) {
      return
    }
    this.traceOn(!1);
    $block$$ ? $block$$.select() : Blockly.selected && Blockly.selected.unselect();
    this.traceOn(!0)
  }
};
Blockly.Workspace.prototype.fireChangeEvent = function $Blockly$Workspace$$fireChangeEvent$() {
  this.fireChangeEventPid_ && window.clearTimeout(this.fireChangeEventPid_);
  var $canvas$$ = this.svgBlockCanvas_;
  $canvas$$ && (this.fireChangeEventPid_ = window.setTimeout(function() {
    Blockly.fireUiEvent($canvas$$, "blocklyWorkspaceChange")
  }, 0))
};
Blockly.Workspace.prototype.paste = function $Blockly$Workspace$$paste$($blockY$$1_xmlBlock$$) {
  if(!($blockY$$1_xmlBlock$$.getElementsByTagName("block").length >= this.remainingCapacity())) {
    var $block$$ = Blockly.Xml.domToBlock_(this, $blockY$$1_xmlBlock$$), $blockX$$ = parseInt($blockY$$1_xmlBlock$$.getAttribute("x"), 10);
    $blockY$$1_xmlBlock$$ = parseInt($blockY$$1_xmlBlock$$.getAttribute("y"), 10);
    if(!isNaN($blockX$$) && !isNaN($blockY$$1_xmlBlock$$)) {
      Blockly.RTL && ($blockX$$ = -$blockX$$);
      do {
        for(var $collide$$ = !1, $allBlocks$$ = this.getAllBlocks(), $x$$ = 0, $otherBlock_otherXY$$;$otherBlock_otherXY$$ = $allBlocks$$[$x$$];$x$$++) {
          $otherBlock_otherXY$$ = $otherBlock_otherXY$$.getRelativeToSurfaceXY(), 1 >= Math.abs($blockX$$ - $otherBlock_otherXY$$.x) && 1 >= Math.abs($blockY$$1_xmlBlock$$ - $otherBlock_otherXY$$.y) && ($blockX$$ = Blockly.RTL ? $blockX$$ - Blockly.SNAP_RADIUS : $blockX$$ + Blockly.SNAP_RADIUS, $blockY$$1_xmlBlock$$ += 2 * Blockly.SNAP_RADIUS, $collide$$ = !0)
        }
      }while($collide$$);
      $block$$.moveBy($blockX$$, $blockY$$1_xmlBlock$$)
    }
    $block$$.select()
  }
};
Blockly.Workspace.prototype.remainingCapacity = function $Blockly$Workspace$$remainingCapacity$() {
  return Infinity == this.maxBlocks ? Infinity : this.maxBlocks - this.getAllBlocks().length
};
Blockly.BlockSvg = function $Blockly$BlockSvg$($block$$) {
  this.block_ = $block$$;
  var $options$$ = {};
  $block$$.htmlId && ($options$$.id = $block$$.htmlId);
  this.svgGroup_ = Blockly.createSvgElement("g", $options$$, null);
  this.svgPathDark_ = Blockly.createSvgElement("path", {"class":"blocklyPathDark", transform:"translate(1, 1)"}, this.svgGroup_);
  this.svgPath_ = Blockly.createSvgElement("path", {"class":"blocklyPath"}, this.svgGroup_);
  this.svgPathLight_ = Blockly.createSvgElement("path", {"class":"blocklyPathLight"}, this.svgGroup_);
  this.svgPath_.tooltip = this.block_;
  Blockly.Tooltip && Blockly.Tooltip.bindMouseEvents(this.svgPath_);
  this.updateMovable()
};
Blockly.BlockSvg.INLINE = -1;
Blockly.BlockSvg.prototype.init = function $Blockly$BlockSvg$$init$() {
  var $block$$ = this.block_;
  this.updateColour();
  for(var $x$$ = 0, $input$$;$input$$ = $block$$.inputList[$x$$];$x$$++) {
    $input$$.init()
  }
  $block$$.mutator && $block$$.mutator.createIcon()
};
Blockly.BlockSvg.prototype.updateMovable = function $Blockly$BlockSvg$$updateMovable$() {
  this.block_.isMovable() ? Blockly.addClass_(this.svgGroup_, "blocklyDraggable") : Blockly.removeClass_(this.svgGroup_, "blocklyDraggable")
};
Blockly.BlockSvg.prototype.getRootElement = function $Blockly$BlockSvg$$getRootElement$() {
  return this.svgGroup_
};
Blockly.BlockSvg.SEP_SPACE_X = 10;
Blockly.BlockSvg.SEP_SPACE_Y = 10;
Blockly.BlockSvg.INLINE_PADDING_Y = 5;
Blockly.BlockSvg.MIN_BLOCK_Y = 25;
Blockly.BlockSvg.TAB_HEIGHT = 20;
Blockly.BlockSvg.TAB_WIDTH = 8;
Blockly.BlockSvg.NOTCH_WIDTH = 30;
Blockly.BlockSvg.CORNER_RADIUS = 8;
Blockly.BlockSvg.TITLE_HEIGHT = 18;
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS - 1) + 1;
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS + 1) - 1;
Blockly.BlockSvg.NOTCH_PATH_LEFT = "l 6,4 3,0 6,-4";
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = "l 6.5,4 2,0 6.5,-4";
Blockly.BlockSvg.NOTCH_PATH_RIGHT = "l -6,4 -3,0 -6,-4";
Blockly.BlockSvg.JAGGED_TEETH = "l 8,0 0,4 8,4 -16,8 8,4";
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
Blockly.BlockSvg.TAB_PATH_DOWN = "v 5 c 0,10 -" + Blockly.BlockSvg.TAB_WIDTH + ",-8 -" + Blockly.BlockSvg.TAB_WIDTH + ",7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",-2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",7.5";
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = "v 6.5 m -" + 0.98 * Blockly.BlockSvg.TAB_WIDTH + ",2.5 q -" + 0.05 * Blockly.BlockSvg.TAB_WIDTH + ",10 " + 0.27 * Blockly.BlockSvg.TAB_WIDTH + ",10 m " + 0.71 * Blockly.BlockSvg.TAB_WIDTH + ",-2.5 v 1.5";
Blockly.BlockSvg.TOP_LEFT_CORNER_START = "m 0," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL = "m " + Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + Blockly.BlockSvg.DISTANCE_45_INSIDE;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR = "m 1," + (Blockly.BlockSvg.CORNER_RADIUS - 1);
Blockly.BlockSvg.TOP_LEFT_CORNER = "A " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0";
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT = "A " + (Blockly.BlockSvg.CORNER_RADIUS - 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS - 1) + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",1";
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER = Blockly.BlockSvg.NOTCH_PATH_RIGHT + " h -" + (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) + " a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 -" + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL = "a " + (Blockly.BlockSvg.CORNER_RADIUS + 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS + 1) + " 0 0,0 " + (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL = "a " + (Blockly.BlockSvg.CORNER_RADIUS + 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS + 1) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS + 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS + 1);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR = "a " + (Blockly.BlockSvg.CORNER_RADIUS + 1) + "," + (Blockly.BlockSvg.CORNER_RADIUS + 1) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + "," + (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + 1);
Blockly.BlockSvg.prototype.dispose = function $Blockly$BlockSvg$$dispose$() {
  goog.dom.removeNode(this.svgGroup_);
  this.block_ = this.svgPathDark_ = this.svgPathLight_ = this.svgPath_ = this.svgGroup_ = null
};
Blockly.BlockSvg.prototype.disposeUiEffect = function $Blockly$BlockSvg$$disposeUiEffect$() {
  Blockly.playAudio("delete");
  var $xy$$ = Blockly.getSvgXY_(this.svgGroup_), $clone$$ = this.svgGroup_.cloneNode(!0);
  $clone$$.translateX_ = $xy$$.x;
  $clone$$.translateY_ = $xy$$.y;
  $clone$$.setAttribute("transform", "translate(" + $clone$$.translateX_ + "," + $clone$$.translateY_ + ")");
  Blockly.svg.appendChild($clone$$);
  0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? ($clone$$.style.display = "inline", $clone$$.bBox_ = {x:$clone$$.getBBox().x, y:$clone$$.getBBox().y, width:$clone$$.scrollWidth, height:$clone$$.scrollHeight}) : $clone$$.bBox_ = $clone$$.getBBox();
  $clone$$.startDate_ = new Date;
  Blockly.BlockSvg.disposeUiStep_($clone$$)
};
Blockly.BlockSvg.disposeUiStep_ = function $Blockly$BlockSvg$disposeUiStep_$($clone$$) {
  var $percent$$ = (new Date - $clone$$.startDate_) / 150;
  1 < $percent$$ ? goog.dom.removeNode($clone$$) : ($clone$$.setAttribute("transform", "translate(" + ($clone$$.translateX_ + (Blockly.RTL ? -1 : 1) * $clone$$.bBox_.width / 2 * $percent$$ + ", " + ($clone$$.translateY_ + $clone$$.bBox_.height * $percent$$)) + ") scale(" + (1 - $percent$$) + ")"), window.setTimeout(function() {
    Blockly.BlockSvg.disposeUiStep_($clone$$)
  }, 10))
};
Blockly.BlockSvg.prototype.connectionUiEffect = function $Blockly$BlockSvg$$connectionUiEffect$() {
  Blockly.playAudio("click");
  var $ripple_xy$$ = Blockly.getSvgXY_(this.svgGroup_);
  this.block_.outputConnection ? ($ripple_xy$$.x += Blockly.RTL ? 3 : -3, $ripple_xy$$.y += 13) : this.block_.previousConnection && ($ripple_xy$$.x += Blockly.RTL ? -23 : 23, $ripple_xy$$.y += 3);
  $ripple_xy$$ = Blockly.createSvgElement("circle", {cx:$ripple_xy$$.x, cy:$ripple_xy$$.y, r:0, fill:"none", stroke:"#888", "stroke-width":10}, Blockly.svg);
  $ripple_xy$$.startDate_ = new Date;
  Blockly.BlockSvg.connectionUiStep_($ripple_xy$$)
};
Blockly.BlockSvg.connectionUiStep_ = function $Blockly$BlockSvg$connectionUiStep_$($ripple$$) {
  var $percent$$ = (new Date - $ripple$$.startDate_) / 150;
  1 < $percent$$ ? goog.dom.removeNode($ripple$$) : ($ripple$$.setAttribute("r", 25 * $percent$$), $ripple$$.style.opacity = 1 - $percent$$, window.setTimeout(function() {
    Blockly.BlockSvg.connectionUiStep_($ripple$$)
  }, 10))
};
Blockly.BlockSvg.prototype.updateColour = function $Blockly$BlockSvg$$updateColour$() {
  if(!this.block_.disabled) {
    var $hexColour$$ = Blockly.makeColour(this.block_.getColour(), this.block_.getSaturation(), this.block_.getValue()), $rgb_rgbDark$$ = goog.color.hexToRgb($hexColour$$), $rgbLight$$ = goog.color.lighten($rgb_rgbDark$$, 0.3), $rgb_rgbDark$$ = goog.color.darken($rgb_rgbDark$$, 0.4);
    this.svgPathLight_.setAttribute("stroke", goog.color.rgbArrayToHex($rgbLight$$));
    this.svgPathDark_.setAttribute("fill", goog.color.rgbArrayToHex($rgb_rgbDark$$));
    this.svgPath_.setAttribute("fill", $hexColour$$)
  }
};
Blockly.BlockSvg.prototype.updateDisabled = function $Blockly$BlockSvg$$updateDisabled$() {
  this.block_.disabled || this.block_.getInheritedDisabled() ? (Blockly.addClass_(this.svgGroup_, "blocklyDisabled"), this.svgPath_.setAttribute("fill", "url(#blocklyDisabledPattern)")) : (Blockly.removeClass_(this.svgGroup_, "blocklyDisabled"), this.updateColour());
  for(var $children$$ = this.block_.getChildren(), $x$$ = 0, $child$$;$child$$ = $children$$[$x$$];$x$$++) {
    $child$$.svg_.updateDisabled()
  }
};
Blockly.BlockSvg.prototype.addSelect = function $Blockly$BlockSvg$$addSelect$() {
  Blockly.addClass_(this.svgGroup_, "blocklySelected");
  this.svgGroup_.parentNode.appendChild(this.svgGroup_)
};
Blockly.BlockSvg.prototype.removeSelect = function $Blockly$BlockSvg$$removeSelect$() {
  Blockly.removeClass_(this.svgGroup_, "blocklySelected")
};
Blockly.BlockSvg.prototype.addDragging = function $Blockly$BlockSvg$$addDragging$() {
  Blockly.addClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.removeDragging = function $Blockly$BlockSvg$$removeDragging$() {
  Blockly.removeClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.render = function $Blockly$BlockSvg$$render$() {
  this.block_.rendered = !0;
  var $cursorX_parentBlock$$ = Blockly.BlockSvg.SEP_SPACE_X;
  Blockly.RTL && ($cursorX_parentBlock$$ = -$cursorX_parentBlock$$);
  for(var $icons$$ = this.block_.getIcons(), $x$$ = 0;$x$$ < $icons$$.length;$x$$++) {
    $cursorX_parentBlock$$ = $icons$$[$x$$].renderIcon($cursorX_parentBlock$$)
  }
  $cursorX_parentBlock$$ += Blockly.RTL ? Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
  $icons$$ = this.renderCompute_($cursorX_parentBlock$$);
  this.renderDraw_($cursorX_parentBlock$$, $icons$$);
  ($cursorX_parentBlock$$ = this.block_.getParent()) ? $cursorX_parentBlock$$.render() : Blockly.fireUiEvent(window, "resize")
};
Blockly.BlockSvg.prototype.renderTitles_ = function $Blockly$BlockSvg$$renderTitles_$($titleList$$, $cursorX$$, $cursorY$$) {
  Blockly.RTL && ($cursorX$$ = -$cursorX$$);
  for(var $t$$ = 0, $title$$;$title$$ = $titleList$$[$t$$];$t$$++) {
    var $titleWidth$$ = $title$$.getSize().width;
    Blockly.RTL ? ($cursorX$$ -= $titleWidth$$, $title$$.getRootElement().setAttribute("transform", "translate(" + $cursorX$$ + ", " + $cursorY$$ + ")"), $titleWidth$$ && ($cursorX$$ -= Blockly.BlockSvg.SEP_SPACE_X)) : ($title$$.getRootElement().setAttribute("transform", "translate(" + $cursorX$$ + ", " + $cursorY$$ + ")"), $titleWidth$$ && ($cursorX$$ += $titleWidth$$ + Blockly.BlockSvg.SEP_SPACE_X))
  }
  return Blockly.RTL ? -$cursorX$$ : $cursorX$$
};
Blockly.BlockSvg.prototype.renderCompute_ = function $Blockly$BlockSvg$$renderCompute_$($iconWidth_y$$) {
  var $inputList_z$$ = this.block_.inputList, $inputRows$$ = [];
  $inputRows$$.rightEdge = $iconWidth_y$$ + 2 * Blockly.BlockSvg.SEP_SPACE_X;
  if(this.block_.previousConnection || this.block_.nextConnection) {
    $inputRows$$.rightEdge = Math.max($inputRows$$.rightEdge, Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X)
  }
  for(var $titleValueWidth$$ = 0, $titleStatementWidth$$ = 0, $hasValue$$ = !1, $hasStatement$$ = !1, $hasDummy$$ = !1, $lastType$$ = void 0, $isInline$$ = this.block_.inputsInline && !this.block_.isCollapsed(), $i$$ = 0, $input$$;$input$$ = $inputList_z$$[$i$$];$i$$++) {
    if($input$$.isVisible()) {
      var $row$$;
      $isInline$$ && $lastType$$ && $lastType$$ != Blockly.NEXT_STATEMENT && $input$$.type != Blockly.NEXT_STATEMENT ? $row$$ = $inputRows$$[$inputRows$$.length - 1] : ($lastType$$ = $input$$.type, $row$$ = [], $row$$.type = $isInline$$ && $input$$.type != Blockly.NEXT_STATEMENT ? Blockly.BlockSvg.INLINE : $input$$.type, $row$$.height = 0, $inputRows$$.push($row$$));
      $row$$.push($input$$);
      $input$$.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
      $input$$.renderWidth = $isInline$$ && $input$$.type == Blockly.INPUT_VALUE ? Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X : 0;
      if($input$$.connection && $input$$.connection.targetConnection) {
        var $bBox_j$$ = $input$$.connection.targetBlock().getHeightWidth();
        $input$$.renderHeight = Math.max($input$$.renderHeight, $bBox_j$$.height);
        $input$$.renderWidth = Math.max($input$$.renderWidth, $bBox_j$$.width)
      }
      $row$$.height = Math.max($row$$.height, $input$$.renderHeight);
      $input$$.titleWidth = 0;
      1 == $inputRows$$.length && ($input$$.titleWidth += Blockly.RTL ? -$iconWidth_y$$ : $iconWidth_y$$);
      for(var $bBox_j$$ = 0, $title$$10_titleSize$$;$title$$10_titleSize$$ = $input$$.titleRow[$bBox_j$$];$bBox_j$$++) {
        0 != $bBox_j$$ && ($input$$.titleWidth += Blockly.BlockSvg.SEP_SPACE_X), $title$$10_titleSize$$ = $title$$10_titleSize$$.getSize(), $input$$.titleWidth += $title$$10_titleSize$$.width, $row$$.height = Math.max($row$$.height, $title$$10_titleSize$$.height)
      }
      $row$$.type != Blockly.BlockSvg.INLINE && ($row$$.type == Blockly.NEXT_STATEMENT ? ($hasStatement$$ = !0, $titleStatementWidth$$ = Math.max($titleStatementWidth$$, $input$$.titleWidth)) : ($row$$.type == Blockly.INPUT_VALUE ? $hasValue$$ = !0 : $row$$.type == Blockly.DUMMY_INPUT && ($hasDummy$$ = !0), $titleValueWidth$$ = Math.max($titleValueWidth$$, $input$$.titleWidth)))
    }
  }
  for($iconWidth_y$$ = 0;$row$$ = $inputRows$$[$iconWidth_y$$];$iconWidth_y$$++) {
    if($row$$.thicker = !1, $row$$.type == Blockly.BlockSvg.INLINE) {
      for($inputList_z$$ = 0;$input$$ = $row$$[$inputList_z$$];$inputList_z$$++) {
        if($input$$.type == Blockly.INPUT_VALUE) {
          $row$$.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
          $row$$.thicker = !0;
          break
        }
      }
    }
  }
  $inputRows$$.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + $titleStatementWidth$$;
  $hasStatement$$ && ($inputRows$$.rightEdge = Math.max($inputRows$$.rightEdge, $inputRows$$.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH));
  $hasValue$$ ? $inputRows$$.rightEdge = Math.max($inputRows$$.rightEdge, $titleValueWidth$$ + 2 * Blockly.BlockSvg.SEP_SPACE_X + Blockly.BlockSvg.TAB_WIDTH) : $hasDummy$$ && ($inputRows$$.rightEdge = Math.max($inputRows$$.rightEdge, $titleValueWidth$$ + 2 * Blockly.BlockSvg.SEP_SPACE_X));
  $inputRows$$.hasValue = $hasValue$$;
  $inputRows$$.hasStatement = $hasStatement$$;
  $inputRows$$.hasDummy = $hasDummy$$;
  return $inputRows$$
};
Blockly.BlockSvg.prototype.renderDraw_ = function $Blockly$BlockSvg$$renderDraw_$($iconWidth$$, $inputRows$$) {
  if(this.block_.outputConnection) {
    this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !0
  }else {
    this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !1;
    if(this.block_.previousConnection) {
      var $highlightSteps_nextBlock$$ = this.block_.previousConnection.targetBlock();
      $highlightSteps_nextBlock$$ && $highlightSteps_nextBlock$$.nextConnection && $highlightSteps_nextBlock$$.nextConnection.targetConnection == this.block_.previousConnection && (this.squareTopLeftCorner_ = !0)
    }
    this.block_.nextConnection && ($highlightSteps_nextBlock$$ = this.block_.nextConnection.targetBlock()) && $highlightSteps_nextBlock$$.previousConnection && $highlightSteps_nextBlock$$.previousConnection.targetConnection == this.block_.nextConnection && (this.squareBottomLeftCorner_ = !0)
  }
  var $connectionsXY_pathString$$ = this.block_.getRelativeToSurfaceXY(), $steps$$ = [], $inlineSteps$$ = [], $highlightSteps_nextBlock$$ = [], $highlightInlineSteps$$ = [];
  this.renderDrawTop_($steps$$, $highlightSteps_nextBlock$$, $connectionsXY_pathString$$, $inputRows$$.rightEdge);
  var $cursorY$$ = this.renderDrawRight_($steps$$, $highlightSteps_nextBlock$$, $inlineSteps$$, $highlightInlineSteps$$, $connectionsXY_pathString$$, $inputRows$$, $iconWidth$$);
  this.renderDrawBottom_($steps$$, $highlightSteps_nextBlock$$, $connectionsXY_pathString$$, $cursorY$$);
  this.renderDrawLeft_($steps$$, $highlightSteps_nextBlock$$, $connectionsXY_pathString$$, $cursorY$$);
  $connectionsXY_pathString$$ = $steps$$.join(" ") + "\n" + $inlineSteps$$.join(" ");
  this.svgPath_.setAttribute("d", $connectionsXY_pathString$$);
  this.svgPathDark_.setAttribute("d", $connectionsXY_pathString$$);
  $connectionsXY_pathString$$ = $highlightSteps_nextBlock$$.join(" ") + "\n" + $highlightInlineSteps$$.join(" ");
  this.svgPathLight_.setAttribute("d", $connectionsXY_pathString$$);
  Blockly.RTL && (this.svgPath_.setAttribute("transform", "scale(-1 1)"), this.svgPathLight_.setAttribute("transform", "scale(-1 1)"), this.svgPathDark_.setAttribute("transform", "translate(1,1) scale(-1 1)"))
};
Blockly.BlockSvg.prototype.renderDrawTop_ = function $Blockly$BlockSvg$$renderDrawTop_$($steps$$, $highlightSteps$$, $connectionsXY$$, $rightEdge$$) {
  this.squareTopLeftCorner_ ? ($steps$$.push("m 0,0"), $highlightSteps$$.push("m 1,1")) : ($steps$$.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START), $highlightSteps$$.push(Blockly.RTL ? Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL : Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR), $steps$$.push(Blockly.BlockSvg.TOP_LEFT_CORNER), $highlightSteps$$.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT));
  Blockly.BROKEN_CONTROL_POINTS && $steps$$.push("c 0,5 0,-5 0,0");
  this.block_.previousConnection && ($steps$$.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), $highlightSteps$$.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), $steps$$.push(Blockly.BlockSvg.NOTCH_PATH_LEFT), $highlightSteps$$.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT), this.block_.previousConnection.moveTo($connectionsXY$$.x + (Blockly.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH), $connectionsXY$$.y));
  $steps$$.push("H", $rightEdge$$);
  $highlightSteps$$.push("H", $rightEdge$$ + (Blockly.RTL ? -1 : 0))
};
Blockly.BlockSvg.prototype.renderDrawRight_ = function $Blockly$BlockSvg$$renderDrawRight_$($steps$$, $highlightSteps$$, $inlineSteps$$, $highlightInlineSteps$$, $connectionsXY$$, $inputRows$$, $iconWidth$$) {
  for(var $cursorX$$, $cursorY$$ = 0, $connectionX$$, $connectionY$$, $y$$ = 0, $row$$;$row$$ = $inputRows$$[$y$$];$y$$++) {
    $cursorX$$ = Blockly.BlockSvg.SEP_SPACE_X;
    0 == $y$$ && ($cursorX$$ += Blockly.RTL ? -$iconWidth$$ : $iconWidth$$);
    $highlightSteps$$.push("M", $inputRows$$.rightEdge - 1 + "," + ($cursorY$$ + 1));
    if(this.block_.isCollapsed()) {
      var $input$$ = $row$$[0];
      $connectionX$$ = $cursorY$$ + Blockly.BlockSvg.TITLE_HEIGHT;
      this.renderTitles_($input$$.titleRow, $cursorX$$, $connectionX$$);
      $steps$$.push(Blockly.BlockSvg.JAGGED_TEETH);
      Blockly.RTL ? $highlightSteps$$.push("l 8,0 0,3.8 7,3.2 m -14.5,9 l 8,4") : $highlightSteps$$.push("h 8");
      $input$$ = $row$$.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
      $steps$$.push("v", $input$$);
      Blockly.RTL && $highlightSteps$$.push("v", $input$$ - 2)
    }else {
      if($row$$.type == Blockly.BlockSvg.INLINE) {
        for(var $titleRightX_x$$ = 0;$input$$ = $row$$[$titleRightX_x$$];$titleRightX_x$$++) {
          $connectionX$$ = $cursorY$$ + Blockly.BlockSvg.TITLE_HEIGHT, $row$$.thicker && ($connectionX$$ += Blockly.BlockSvg.INLINE_PADDING_Y), $cursorX$$ = this.renderTitles_($input$$.titleRow, $cursorX$$, $connectionX$$), $input$$.type != Blockly.DUMMY_INPUT && ($cursorX$$ += $input$$.renderWidth + Blockly.BlockSvg.SEP_SPACE_X), $input$$.type == Blockly.INPUT_VALUE && ($inlineSteps$$.push("M", $cursorX$$ - Blockly.BlockSvg.SEP_SPACE_X + "," + ($cursorY$$ + Blockly.BlockSvg.INLINE_PADDING_Y)), $inlineSteps$$.push("h", 
          Blockly.BlockSvg.TAB_WIDTH - $input$$.renderWidth), $inlineSteps$$.push(Blockly.BlockSvg.TAB_PATH_DOWN), $inlineSteps$$.push("v", $input$$.renderHeight - Blockly.BlockSvg.TAB_HEIGHT), $inlineSteps$$.push("h", $input$$.renderWidth - Blockly.BlockSvg.TAB_WIDTH), $inlineSteps$$.push("z"), Blockly.RTL ? ($highlightInlineSteps$$.push("M", $cursorX$$ - Blockly.BlockSvg.SEP_SPACE_X + Blockly.BlockSvg.TAB_WIDTH - $input$$.renderWidth - 1 + "," + ($cursorY$$ + Blockly.BlockSvg.INLINE_PADDING_Y + 
          1)), $highlightInlineSteps$$.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), $highlightInlineSteps$$.push("v", $input$$.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2), $highlightInlineSteps$$.push("h", $input$$.renderWidth - Blockly.BlockSvg.TAB_WIDTH)) : ($highlightInlineSteps$$.push("M", $cursorX$$ - Blockly.BlockSvg.SEP_SPACE_X + 1 + "," + ($cursorY$$ + Blockly.BlockSvg.INLINE_PADDING_Y + 1)), $highlightInlineSteps$$.push("v", $input$$.renderHeight), $highlightInlineSteps$$.push("h", 
          Blockly.BlockSvg.TAB_WIDTH - $input$$.renderWidth), $highlightInlineSteps$$.push("M", $cursorX$$ - $input$$.renderWidth - Blockly.BlockSvg.SEP_SPACE_X + 3.8 + "," + ($cursorY$$ + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.TAB_HEIGHT - 0.4)), $highlightInlineSteps$$.push("l", 0.42 * Blockly.BlockSvg.TAB_WIDTH + ",-1.8")), $connectionX$$ = Blockly.RTL ? $connectionsXY$$.x - $cursorX$$ - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + $input$$.renderWidth - 1 : $connectionsXY$$.x + 
          $cursorX$$ + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - $input$$.renderWidth + 1, $connectionY$$ = $connectionsXY$$.y + $cursorY$$ + Blockly.BlockSvg.INLINE_PADDING_Y, $input$$.connection.moveTo($connectionX$$, $connectionY$$), $input$$.connection.targetConnection && $input$$.connection.tighten_())
        }
        $cursorX$$ = Math.max($cursorX$$, $inputRows$$.rightEdge);
        $steps$$.push("H", $cursorX$$);
        $highlightSteps$$.push("H", $cursorX$$ + (Blockly.RTL ? -1 : 0));
        $steps$$.push("v", $row$$.height);
        Blockly.RTL && $highlightSteps$$.push("v", $row$$.height - 2)
      }else {
        $row$$.type == Blockly.INPUT_VALUE ? ($input$$ = $row$$[0], $connectionX$$ = $cursorY$$ + Blockly.BlockSvg.TITLE_HEIGHT, $input$$.align != Blockly.ALIGN_LEFT && ($titleRightX_x$$ = $inputRows$$.rightEdge - $input$$.titleWidth - Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X, $input$$.align == Blockly.ALIGN_RIGHT ? $cursorX$$ += $titleRightX_x$$ : $input$$.align == Blockly.ALIGN_CENTRE && ($cursorX$$ += ($titleRightX_x$$ + $cursorX$$) / 2)), this.renderTitles_($input$$.titleRow, 
        $cursorX$$, $connectionX$$), $steps$$.push(Blockly.BlockSvg.TAB_PATH_DOWN), $steps$$.push("v", $row$$.height - Blockly.BlockSvg.TAB_HEIGHT), Blockly.RTL ? ($highlightSteps$$.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), $highlightSteps$$.push("v", $row$$.height - Blockly.BlockSvg.TAB_HEIGHT)) : ($highlightSteps$$.push("M", $inputRows$$.rightEdge - 4.2 + "," + ($cursorY$$ + Blockly.BlockSvg.TAB_HEIGHT - 0.4)), $highlightSteps$$.push("l", 0.42 * Blockly.BlockSvg.TAB_WIDTH + ",-1.8")), 
        $connectionX$$ = $connectionsXY$$.x + (Blockly.RTL ? -$inputRows$$.rightEdge - 1 : $inputRows$$.rightEdge + 1), $connectionY$$ = $connectionsXY$$.y + $cursorY$$, $input$$.connection.moveTo($connectionX$$, $connectionY$$), $input$$.connection.targetConnection && $input$$.connection.tighten_()) : $row$$.type == Blockly.DUMMY_INPUT ? ($input$$ = $row$$[0], $connectionX$$ = $cursorY$$ + Blockly.BlockSvg.TITLE_HEIGHT, $input$$.align != Blockly.ALIGN_LEFT && ($titleRightX_x$$ = $inputRows$$.rightEdge - 
        $input$$.titleWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, $inputRows$$.hasValue && ($titleRightX_x$$ -= Blockly.BlockSvg.TAB_WIDTH), $input$$.align == Blockly.ALIGN_RIGHT ? $cursorX$$ += $titleRightX_x$$ : $input$$.align == Blockly.ALIGN_CENTRE && ($cursorX$$ += ($titleRightX_x$$ + $cursorX$$) / 2)), this.renderTitles_($input$$.titleRow, $cursorX$$, $connectionX$$), $steps$$.push("v", $row$$.height), Blockly.RTL && $highlightSteps$$.push("v", $row$$.height - 2)) : $row$$.type == Blockly.NEXT_STATEMENT && 
        ($input$$ = $row$$[0], 0 == $y$$ && ($steps$$.push("v", Blockly.BlockSvg.SEP_SPACE_Y), Blockly.RTL && $highlightSteps$$.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), $cursorY$$ += Blockly.BlockSvg.SEP_SPACE_Y), $connectionX$$ = $cursorY$$ + Blockly.BlockSvg.TITLE_HEIGHT, $input$$.align != Blockly.ALIGN_LEFT && ($titleRightX_x$$ = $inputRows$$.statementEdge - $input$$.titleWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, $input$$.align == Blockly.ALIGN_RIGHT ? $cursorX$$ += $titleRightX_x$$ : $input$$.align == 
        Blockly.ALIGN_CENTRE && ($cursorX$$ += ($titleRightX_x$$ + $cursorX$$) / 2)), this.renderTitles_($input$$.titleRow, $cursorX$$, $connectionX$$), $cursorX$$ = $inputRows$$.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH, $steps$$.push("H", $cursorX$$), $steps$$.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER), $steps$$.push("v", $row$$.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), $steps$$.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER), $steps$$.push("H", $inputRows$$.rightEdge), Blockly.RTL ? ($highlightSteps$$.push("M", 
        $cursorX$$ - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + ($cursorY$$ + Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), $highlightSteps$$.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL), $highlightSteps$$.push("v", $row$$.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), $highlightSteps$$.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL), $highlightSteps$$.push("H", $inputRows$$.rightEdge - 1)) : ($highlightSteps$$.push("M", $cursorX$$ - Blockly.BlockSvg.NOTCH_WIDTH + 
        Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + ($cursorY$$ + $row$$.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), $highlightSteps$$.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR), $highlightSteps$$.push("H", $inputRows$$.rightEdge)), $connectionX$$ = $connectionsXY$$.x + (Blockly.RTL ? -$cursorX$$ : $cursorX$$), $connectionY$$ = $connectionsXY$$.y + $cursorY$$ + 1, $input$$.connection.moveTo($connectionX$$, $connectionY$$), $input$$.connection.targetConnection && $input$$.connection.tighten_(), 
        $y$$ == $inputRows$$.length - 1 || $inputRows$$[$y$$ + 1].type == Blockly.NEXT_STATEMENT) && ($steps$$.push("v", Blockly.BlockSvg.SEP_SPACE_Y), Blockly.RTL && $highlightSteps$$.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), $cursorY$$ += Blockly.BlockSvg.SEP_SPACE_Y)
      }
    }
    $cursorY$$ += $row$$.height
  }
  $inputRows$$.length || ($cursorY$$ = Blockly.BlockSvg.MIN_BLOCK_Y, $steps$$.push("V", $cursorY$$), Blockly.RTL && $highlightSteps$$.push("V", $cursorY$$ - 1));
  return $cursorY$$
};
Blockly.BlockSvg.prototype.renderDrawBottom_ = function $Blockly$BlockSvg$$renderDrawBottom_$($steps$$, $highlightSteps$$, $connectionsXY$$, $cursorY$$) {
  this.block_.nextConnection && ($steps$$.push("H", Blockly.BlockSvg.NOTCH_WIDTH + " " + Blockly.BlockSvg.NOTCH_PATH_RIGHT), this.block_.nextConnection.moveTo(Blockly.RTL ? $connectionsXY$$.x - Blockly.BlockSvg.NOTCH_WIDTH : $connectionsXY$$.x + Blockly.BlockSvg.NOTCH_WIDTH, $connectionsXY$$.y + $cursorY$$ + 1), this.block_.nextConnection.targetConnection && this.block_.nextConnection.tighten_());
  Blockly.BROKEN_CONTROL_POINTS && $steps$$.push("c 0,5 0,-5 0,0");
  this.squareBottomLeftCorner_ ? ($steps$$.push("H 0"), Blockly.RTL || $highlightSteps$$.push("M", "1," + $cursorY$$)) : ($steps$$.push("H", Blockly.BlockSvg.CORNER_RADIUS), $steps$$.push("a", Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 -" + Blockly.BlockSvg.CORNER_RADIUS + ",-" + Blockly.BlockSvg.CORNER_RADIUS), Blockly.RTL || ($highlightSteps$$.push("M", Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + ($cursorY$$ - Blockly.BlockSvg.DISTANCE_45_INSIDE)), $highlightSteps$$.push("A", 
  Blockly.BlockSvg.CORNER_RADIUS - 1 + "," + (Blockly.BlockSvg.CORNER_RADIUS - 1) + " 0 0,1 1," + ($cursorY$$ - Blockly.BlockSvg.CORNER_RADIUS))))
};
Blockly.BlockSvg.prototype.renderDrawLeft_ = function $Blockly$BlockSvg$$renderDrawLeft_$($steps$$, $highlightSteps$$, $connectionsXY$$, $cursorY$$) {
  this.block_.outputConnection ? (this.block_.outputConnection.moveTo($connectionsXY$$.x, $connectionsXY$$.y), $steps$$.push("V", Blockly.BlockSvg.TAB_HEIGHT), $steps$$.push("c 0,-10 -" + Blockly.BlockSvg.TAB_WIDTH + ",8 -" + Blockly.BlockSvg.TAB_WIDTH + ",-7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",-7.5"), Blockly.RTL ? ($highlightSteps$$.push("M", -0.3 * Blockly.BlockSvg.TAB_WIDTH + ",8.9"), $highlightSteps$$.push("l", -0.45 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")) : 
  ($highlightSteps$$.push("V", Blockly.BlockSvg.TAB_HEIGHT - 1), $highlightSteps$$.push("m", -0.92 * Blockly.BlockSvg.TAB_WIDTH + ",-1 q " + -0.19 * Blockly.BlockSvg.TAB_WIDTH + ",-5.5 0,-11"), $highlightSteps$$.push("m", 0.92 * Blockly.BlockSvg.TAB_WIDTH + ",1 V 1 H 2"))) : Blockly.RTL || (this.squareTopLeftCorner_ ? $highlightSteps$$.push("V", 1) : $highlightSteps$$.push("V", Blockly.BlockSvg.CORNER_RADIUS));
  $steps$$.push("z")
};
Blockly.Field = function $Blockly$Field$($text$$) {
  this.sourceBlock_ = null;
  this.fieldGroup_ = Blockly.createSvgElement("g", {}, null);
  this.borderRect_ = Blockly.createSvgElement("rect", {rx:4, ry:4, x:-Blockly.BlockSvg.SEP_SPACE_X / 2, y:-12, height:16}, this.fieldGroup_);
  this.textElement_ = Blockly.createSvgElement("text", {"class":"blocklyText"}, this.fieldGroup_);
  this.size_ = {height:25, width:0};
  this.setText($text$$);
  this.visible_ = !0
};
Blockly.Field.NBSP = "\u00a0";
Blockly.Field.prototype.EDITABLE = !0;
Blockly.Field.prototype.init = function $Blockly$Field$$init$($block$$) {
  if(this.sourceBlock_) {
    throw"Field has already been initialized once.";
  }
  this.sourceBlock_ = $block$$;
  this.updateEditable();
  $block$$.getSvgRoot().appendChild(this.fieldGroup_);
  this.mouseUpWrapper_ = Blockly.bindEvent_(this.fieldGroup_, "mouseup", this, this.onMouseUp_);
  this.setText(null)
};
Blockly.Field.prototype.dispose = function $Blockly$Field$$dispose$() {
  this.mouseUpWrapper_ && (Blockly.unbindEvent_(this.mouseUpWrapper_), this.mouseUpWrapper_ = null);
  this.sourceBlock_ = null;
  goog.dom.removeNode(this.fieldGroup_);
  this.borderRect_ = this.textElement_ = this.fieldGroup_ = null
};
Blockly.Field.prototype.updateEditable = function $Blockly$Field$$updateEditable$() {
  this.EDITABLE && (this.sourceBlock_.isEditable() ? (Blockly.addClass_(this.fieldGroup_, "blocklyEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyNoNEditableText"), this.fieldGroup_.style.cursor = this.CURSOR) : (Blockly.addClass_(this.fieldGroup_, "blocklyNonEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyEditableText"), this.fieldGroup_.style.cursor = ""))
};
Blockly.Field.prototype.isVisible = function $Blockly$Field$$isVisible$() {
  return this.visible_
};
Blockly.Field.prototype.setVisible = function $Blockly$Field$$setVisible$($visible$$) {
  this.visible_ = $visible$$;
  this.getRootElement().style.display = $visible$$ ? "block" : "none"
};
Blockly.Field.prototype.getRootElement = function $Blockly$Field$$getRootElement$() {
  return this.fieldGroup_
};
Blockly.Field.prototype.render_ = function $Blockly$Field$$render_$() {
  var $width$$;
  $width$$ = this.textElement_.getComputedTextLength ? this.textElement_.getComputedTextLength() : 1;
  this.borderRect_ && this.borderRect_.setAttribute("width", $width$$ + Blockly.BlockSvg.SEP_SPACE_X);
  this.size_.width = $width$$
};
Blockly.Field.prototype.getSize = function $Blockly$Field$$getSize$() {
  this.size_.width || this.render_();
  return this.size_
};
Blockly.Field.prototype.getText = function $Blockly$Field$$getText$() {
  return this.text_
};
Blockly.Field.prototype.setText = function $Blockly$Field$$setText$($text$$) {
  null !== $text$$ && $text$$ !== this.text_ && (this.text_ = $text$$, goog.dom.removeChildren(this.textElement_), $text$$ = $text$$.replace(/\s/g, Blockly.Field.NBSP), $text$$ || ($text$$ = Blockly.Field.NBSP), $text$$ = document.createTextNode($text$$), this.textElement_.appendChild($text$$), this.size_.width = 0, this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent()))
};
Blockly.Field.prototype.getValue = function $Blockly$Field$$getValue$() {
  return this.getText()
};
Blockly.Field.prototype.setValue = function $Blockly$Field$$setValue$($text$$) {
  this.setText($text$$)
};
Blockly.Field.prototype.onMouseUp_ = function $Blockly$Field$$onMouseUp_$($e$$) {
  Blockly.isRightButton($e$$) || 2 != Blockly.Block.dragMode_ && this.sourceBlock_.isEditable() && this.showEditor_()
};
Blockly.Field.prototype.setTooltip = function $Blockly$Field$$setTooltip$($newTip$$) {
};
Blockly.FieldDropdown = function $Blockly$FieldDropdown$($menuGenerator$$, $opt_changeHandler$$) {
  this.menuGenerator_ = $menuGenerator$$;
  this.changeHandler_ = $opt_changeHandler$$;
  this.trimOptions_();
  var $firstTuple$$ = this.getOptions_()[0];
  this.value_ = $firstTuple$$[1];
  this.arrow_ = Blockly.createSvgElement("tspan", {}, null);
  this.arrow_.appendChild(document.createTextNode(Blockly.RTL ? "\u25be " : " \u25be"));
  Blockly.FieldDropdown.superClass_.constructor.call(this, $firstTuple$$[0])
};
goog.inherits(Blockly.FieldDropdown, Blockly.Field);
Blockly.FieldDropdown.createDom = function $Blockly$FieldDropdown$createDom$() {
  var $svgGroup$$ = Blockly.createSvgElement("g", {"class":"blocklyHidden blocklyFieldDropdown"}, null);
  Blockly.FieldDropdown.svgGroup_ = $svgGroup$$;
  Blockly.FieldDropdown.svgShadow_ = Blockly.createSvgElement("rect", {"class":"blocklyDropdownMenuShadow", x:0, y:1, rx:2, ry:2}, $svgGroup$$);
  Blockly.FieldDropdown.svgBackground_ = Blockly.createSvgElement("rect", {x:-2, y:-1, rx:2, ry:2, filter:"url(#blocklyEmboss)"}, $svgGroup$$);
  Blockly.FieldDropdown.svgOptions_ = Blockly.createSvgElement("g", {"class":"blocklyDropdownMenuOptions"}, $svgGroup$$);
  return $svgGroup$$
};
Blockly.FieldDropdown.prototype.dispose = function $Blockly$FieldDropdown$$dispose$() {
  Blockly.FieldDropdown.openDropdown_ == this && Blockly.FieldDropdown.hide();
  Blockly.Field.prototype.dispose.call(this)
};
Blockly.FieldDropdown.CORNER_RADIUS = 2;
Blockly.FieldDropdown.prototype.CURSOR = "default";
Blockly.FieldDropdown.openDropdown_ = null;
Blockly.FieldDropdown.prototype.showEditor_ = function $Blockly$FieldDropdown$$showEditor_$() {
  function $callbackFactory$$($value$$) {
    return function($e$$) {
      if(this.changeHandler_) {
        var $override$$ = this.changeHandler_($value$$);
        void 0 !== $override$$ && ($value$$ = $override$$)
      }
      null !== $value$$ && this.setValue($value$$);
      $e$$.stopPropagation()
    }
  }
  var $svgGroup$$ = Blockly.FieldDropdown.svgGroup_, $svgOptions$$ = Blockly.FieldDropdown.svgOptions_, $svgBackground_xy$$ = Blockly.FieldDropdown.svgBackground_, $borderBBox_hexColour$$ = Blockly.FieldDropdown.svgShadow_;
  goog.dom.removeChildren($svgOptions$$);
  Blockly.removeClass_($svgGroup$$, "blocklyHidden");
  Blockly.FieldDropdown.openDropdown_ = this;
  for(var $maxWidth$$ = 0, $resizeList$$ = [], $checkElement$$ = null, $height$$11_options$$ = this.getOptions_(), $width$$15_x$$ = 0;$width$$15_x$$ < $height$$11_options$$.length;$width$$15_x$$++) {
    var $value$$0$$ = $height$$11_options$$[$width$$15_x$$][1], $gElement$$ = Blockly.ContextMenu.optionToDom($height$$11_options$$[$width$$15_x$$][0]), $rectElement$$ = $gElement$$.firstChild, $textElement$$ = $gElement$$.lastChild;
    $svgOptions$$.appendChild($gElement$$);
    $checkElement$$ || $value$$0$$ != this.value_ || ($checkElement$$ = Blockly.createSvgElement("text", {"class":"blocklyMenuText", y:15}, null), $gElement$$.insertBefore($checkElement$$, $textElement$$), $checkElement$$.appendChild(document.createTextNode("\u2713")));
    $gElement$$.setAttribute("transform", "translate(0, " + $width$$15_x$$ * Blockly.ContextMenu.Y_HEIGHT + ")");
    $resizeList$$.push($rectElement$$);
    Blockly.bindEvent_($gElement$$, "mousedown", null, Blockly.noEvent);
    Blockly.bindEvent_($gElement$$, "mouseup", this, $callbackFactory$$($value$$0$$));
    Blockly.bindEvent_($gElement$$, "mouseup", null, Blockly.FieldDropdown.hide);
    $maxWidth$$ = $textElement$$.getComputedTextLength ? Math.max($maxWidth$$, $textElement$$.getComputedTextLength()) : 1
  }
  $maxWidth$$ += 2 * Blockly.ContextMenu.X_PADDING;
  for($width$$15_x$$ = 0;$width$$15_x$$ < $resizeList$$.length;$width$$15_x$$++) {
    $resizeList$$[$width$$15_x$$].setAttribute("width", $maxWidth$$)
  }
  if(Blockly.RTL) {
    for($width$$15_x$$ = 0;$gElement$$ = $svgOptions$$.childNodes[$width$$15_x$$];$width$$15_x$$++) {
      $textElement$$ = $gElement$$.lastChild, $textElement$$.setAttribute("text-anchor", "end"), $textElement$$.setAttribute("x", $maxWidth$$ - Blockly.ContextMenu.X_PADDING)
    }
  }
  $checkElement$$ && (Blockly.RTL ? ($checkElement$$.setAttribute("text-anchor", "end"), $checkElement$$.setAttribute("x", $maxWidth$$ - 5)) : $checkElement$$.setAttribute("x", 5));
  $width$$15_x$$ = $maxWidth$$ + 2 * Blockly.FieldDropdown.CORNER_RADIUS;
  $height$$11_options$$ = $height$$11_options$$.length * Blockly.ContextMenu.Y_HEIGHT + Blockly.FieldDropdown.CORNER_RADIUS + 1;
  $borderBBox_hexColour$$.setAttribute("width", $width$$15_x$$);
  $borderBBox_hexColour$$.setAttribute("height", $height$$11_options$$);
  $svgBackground_xy$$.setAttribute("width", $width$$15_x$$);
  $svgBackground_xy$$.setAttribute("height", $height$$11_options$$);
  $borderBBox_hexColour$$ = Blockly.makeColour(this.sourceBlock_.getColour(), this.sourceBlock_.getSaturation(), this.sourceBlock_.getValue());
  $svgBackground_xy$$.setAttribute("fill", $borderBBox_hexColour$$);
  $svgBackground_xy$$ = Blockly.getSvgXY_(this.borderRect_);
  0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? (this.borderRect_.style.display = "inline", $borderBBox_hexColour$$ = {x:this.borderRect_.getBBox().x, y:this.borderRect_.getBBox().y, width:this.borderRect_.scrollWidth, height:this.borderRect_.scrollHeight}) : $borderBBox_hexColour$$ = this.borderRect_.getBBox();
  $width$$15_x$$ = Blockly.RTL ? $svgBackground_xy$$.x - $maxWidth$$ + Blockly.ContextMenu.X_PADDING + $borderBBox_hexColour$$.width - Blockly.BlockSvg.SEP_SPACE_X / 2 : $svgBackground_xy$$.x - Blockly.ContextMenu.X_PADDING + Blockly.BlockSvg.SEP_SPACE_X / 2;
  $svgGroup$$.setAttribute("transform", "translate(" + $width$$15_x$$ + ", " + ($svgBackground_xy$$.y + $borderBBox_hexColour$$.height) + ")")
};
Blockly.FieldDropdown.prototype.trimOptions_ = function $Blockly$FieldDropdown$$trimOptions_$() {
  this.suffixTitle = this.prefixTitle = null;
  var $options$$ = this.menuGenerator_;
  if(goog.isArray($options$$) && !(2 > $options$$.length)) {
    var $newOptions_strings$$ = $options$$.map(function($t$$) {
      return $t$$[0]
    }), $shortest_x$$ = Blockly.shortestStringLength($newOptions_strings$$), $prefixLength$$ = Blockly.commonWordPrefix($newOptions_strings$$, $shortest_x$$), $suffixLength$$ = Blockly.commonWordSuffix($newOptions_strings$$, $shortest_x$$);
    if(($prefixLength$$ || $suffixLength$$) && !($shortest_x$$ <= $prefixLength$$ + $suffixLength$$)) {
      $prefixLength$$ && (this.prefixTitle = $newOptions_strings$$[0].substring(0, $prefixLength$$ - 1));
      $suffixLength$$ && (this.suffixTitle = $newOptions_strings$$[0].substr(1 - $suffixLength$$));
      $newOptions_strings$$ = [];
      for($shortest_x$$ = 0;$shortest_x$$ < $options$$.length;$shortest_x$$++) {
        var $text$$ = $options$$[$shortest_x$$][0], $value$$ = $options$$[$shortest_x$$][1], $text$$ = $text$$.substring($prefixLength$$, $text$$.length - $suffixLength$$);
        $newOptions_strings$$[$shortest_x$$] = [$text$$, $value$$]
      }
      this.menuGenerator_ = $newOptions_strings$$
    }
  }
};
Blockly.FieldDropdown.prototype.getOptions_ = function $Blockly$FieldDropdown$$getOptions_$() {
  return goog.isFunction(this.menuGenerator_) ? this.menuGenerator_.call(this) : this.menuGenerator_
};
Blockly.FieldDropdown.prototype.getValue = function $Blockly$FieldDropdown$$getValue$() {
  return this.value_
};
Blockly.FieldDropdown.prototype.setValue = function $Blockly$FieldDropdown$$setValue$($newValue$$) {
  this.value_ = $newValue$$;
  for(var $options$$ = this.getOptions_(), $x$$ = 0;$x$$ < $options$$.length;$x$$++) {
    if($options$$[$x$$][1] == $newValue$$) {
      this.setText($options$$[$x$$][0]);
      return
    }
  }
  this.setText($newValue$$)
};
Blockly.FieldDropdown.prototype.setText = function $Blockly$FieldDropdown$$setText$($text$$14_textNode$$) {
  this.sourceBlock_ && (this.arrow_.style.fill = Blockly.makeColour(this.sourceBlock_.getColour(), this.sourceBlock_.getSaturation(), this.sourceBlock_.getValue()));
  null !== $text$$14_textNode$$ && (this.text_ = $text$$14_textNode$$, goog.dom.removeChildren(this.textElement_), $text$$14_textNode$$ = $text$$14_textNode$$.replace(/\s/g, Blockly.Field.NBSP), $text$$14_textNode$$ || ($text$$14_textNode$$ = Blockly.Field.NBSP), $text$$14_textNode$$ = document.createTextNode($text$$14_textNode$$), this.textElement_.appendChild($text$$14_textNode$$), Blockly.RTL ? this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild) : this.textElement_.appendChild(this.arrow_), 
  this.size_.width = 0, this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent()))
};
Blockly.FieldDropdown.hide = function $Blockly$FieldDropdown$hide$() {
  var $svgGroup$$ = Blockly.FieldDropdown.svgGroup_;
  $svgGroup$$ && Blockly.addClass_($svgGroup$$, "blocklyHidden");
  Blockly.FieldDropdown.openDropdown_ = null
};
Blockly.Msg = {};
goog.string.StringBuffer = function $goog$string$StringBuffer$($opt_a1$$, $var_args$$) {
  null != $opt_a1$$ && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function $goog$string$StringBuffer$$set$($s$$) {
  this.buffer_ = "" + $s$$
};
goog.string.StringBuffer.prototype.append = function $goog$string$StringBuffer$$append$($a1$$, $opt_a2$$, $var_args$$) {
  this.buffer_ += $a1$$;
  if(null != $opt_a2$$) {
    for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
      this.buffer_ += arguments[$i$$]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function $goog$string$StringBuffer$$clear$() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function $goog$string$StringBuffer$$getLength$() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function $goog$string$StringBuffer$$toString$() {
  return this.buffer_
};
goog.math = {};
goog.math.randomInt = function $goog$math$randomInt$($a$$) {
  return Math.floor(Math.random() * $a$$)
};
goog.math.uniformRandom = function $goog$math$uniformRandom$($a$$, $b$$) {
  return $a$$ + Math.random() * ($b$$ - $a$$)
};
goog.math.clamp = function $goog$math$clamp$($value$$, $min$$, $max$$) {
  return Math.min(Math.max($value$$, $min$$), $max$$)
};
goog.math.modulo = function $goog$math$modulo$($a$$, $b$$) {
  var $r$$ = $a$$ % $b$$;
  return 0 > $r$$ * $b$$ ? $r$$ + $b$$ : $r$$
};
goog.math.lerp = function $goog$math$lerp$($a$$, $b$$, $x$$) {
  return $a$$ + $x$$ * ($b$$ - $a$$)
};
goog.math.nearlyEquals = function $goog$math$nearlyEquals$($a$$, $b$$, $opt_tolerance$$) {
  return Math.abs($a$$ - $b$$) <= ($opt_tolerance$$ || 1E-6)
};
goog.math.standardAngle = function $goog$math$standardAngle$($angle$$) {
  return goog.math.modulo($angle$$, 360)
};
goog.math.toRadians = function $goog$math$toRadians$($angleDegrees$$) {
  return $angleDegrees$$ * Math.PI / 180
};
goog.math.toDegrees = function $goog$math$toDegrees$($angleRadians$$) {
  return 180 * $angleRadians$$ / Math.PI
};
goog.math.angleDx = function $goog$math$angleDx$($degrees$$, $radius$$) {
  return $radius$$ * Math.cos(goog.math.toRadians($degrees$$))
};
goog.math.angleDy = function $goog$math$angleDy$($degrees$$, $radius$$) {
  return $radius$$ * Math.sin(goog.math.toRadians($degrees$$))
};
goog.math.angle = function $goog$math$angle$($x1$$, $y1$$, $x2$$, $y2$$) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2($y2$$ - $y1$$, $x2$$ - $x1$$)))
};
goog.math.angleDifference = function $goog$math$angleDifference$($startAngle$$, $endAngle$$) {
  var $d$$ = goog.math.standardAngle($endAngle$$) - goog.math.standardAngle($startAngle$$);
  180 < $d$$ ? $d$$ -= 360 : -180 >= $d$$ && ($d$$ = 360 + $d$$);
  return $d$$
};
goog.math.sign = function $goog$math$sign$($x$$) {
  return 0 == $x$$ ? 0 : 0 > $x$$ ? -1 : 1
};
goog.math.longestCommonSubsequence = function $goog$math$longestCommonSubsequence$($array1$$, $array2$$, $compare$$3_opt_compareFn$$, $collect_opt_collectorFn$$) {
  $compare$$3_opt_compareFn$$ = $compare$$3_opt_compareFn$$ || function($a$$, $b$$) {
    return $a$$ == $b$$
  };
  $collect_opt_collectorFn$$ = $collect_opt_collectorFn$$ || function($i1$$, $i2$$) {
    return $array1$$[$i1$$]
  };
  for(var $length1$$ = $array1$$.length, $length2$$ = $array2$$.length, $arr$$ = [], $i$$ = 0;$i$$ < $length1$$ + 1;$i$$++) {
    $arr$$[$i$$] = [], $arr$$[$i$$][0] = 0
  }
  for(var $j$$ = 0;$j$$ < $length2$$ + 1;$j$$++) {
    $arr$$[0][$j$$] = 0
  }
  for($i$$ = 1;$i$$ <= $length1$$;$i$$++) {
    for($j$$ = 1;$j$$ <= $length1$$;$j$$++) {
      $compare$$3_opt_compareFn$$($array1$$[$i$$ - 1], $array2$$[$j$$ - 1]) ? $arr$$[$i$$][$j$$] = $arr$$[$i$$ - 1][$j$$ - 1] + 1 : $arr$$[$i$$][$j$$] = Math.max($arr$$[$i$$ - 1][$j$$], $arr$$[$i$$][$j$$ - 1])
    }
  }
  for(var $result$$ = [], $i$$ = $length1$$, $j$$ = $length2$$;0 < $i$$ && 0 < $j$$;) {
    $compare$$3_opt_compareFn$$($array1$$[$i$$ - 1], $array2$$[$j$$ - 1]) ? ($result$$.unshift($collect_opt_collectorFn$$($i$$ - 1, $j$$ - 1)), $i$$--, $j$$--) : $arr$$[$i$$ - 1][$j$$] > $arr$$[$i$$][$j$$ - 1] ? $i$$-- : $j$$--
  }
  return $result$$
};
goog.math.sum = function $goog$math$sum$($var_args$$) {
  return goog.array.reduce(arguments, function($sum$$, $value$$) {
    return $sum$$ + $value$$
  }, 0)
};
goog.math.average = function $goog$math$average$($var_args$$) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function $goog$math$standardDeviation$($var_args$$) {
  var $sampleSize_variance$$ = arguments.length;
  if(2 > $sampleSize_variance$$) {
    return 0
  }
  var $mean$$ = goog.math.average.apply(null, arguments), $sampleSize_variance$$ = goog.math.sum.apply(null, goog.array.map(arguments, function($val$$) {
    return Math.pow($val$$ - $mean$$, 2)
  })) / ($sampleSize_variance$$ - 1);
  return Math.sqrt($sampleSize_variance$$)
};
goog.math.isInt = function $goog$math$isInt$($num$$) {
  return isFinite($num$$) && 0 == $num$$ % 1
};
goog.math.isFiniteNumber = function $goog$math$isFiniteNumber$($num$$) {
  return isFinite($num$$) && !isNaN($num$$)
};
goog.math.safeFloor = function $goog$math$safeFloor$($num$$, $opt_epsilon$$) {
  goog.asserts.assert(!goog.isDef($opt_epsilon$$) || 0 < $opt_epsilon$$);
  return Math.floor($num$$ + ($opt_epsilon$$ || 2E-15))
};
goog.math.safeCeil = function $goog$math$safeCeil$($num$$, $opt_epsilon$$) {
  goog.asserts.assert(!goog.isDef($opt_epsilon$$) || 0 < $opt_epsilon$$);
  return Math.ceil($num$$ - ($opt_epsilon$$ || 2E-15))
};
goog.math.Coordinate = function $goog$math$Coordinate$($opt_x$$, $opt_y$$) {
  this.x = goog.isDef($opt_x$$) ? $opt_x$$ : 0;
  this.y = goog.isDef($opt_y$$) ? $opt_y$$ : 0
};
goog.math.Coordinate.prototype.clone = function $goog$math$Coordinate$$clone$() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function $goog$math$Coordinate$$toString$() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function $goog$math$Coordinate$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : $a$$ && $b$$ ? $a$$.x == $b$$.x && $a$$.y == $b$$.y : !1
};
goog.math.Coordinate.distance = function $goog$math$Coordinate$distance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return Math.sqrt($dx$$ * $dx$$ + $dy$$ * $dy$$)
};
goog.math.Coordinate.magnitude = function $goog$math$Coordinate$magnitude$($a$$) {
  return Math.sqrt($a$$.x * $a$$.x + $a$$.y * $a$$.y)
};
goog.math.Coordinate.azimuth = function $goog$math$Coordinate$azimuth$($a$$) {
  return goog.math.angle(0, 0, $a$$.x, $a$$.y)
};
goog.math.Coordinate.squaredDistance = function $goog$math$Coordinate$squaredDistance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return $dx$$ * $dx$$ + $dy$$ * $dy$$
};
goog.math.Coordinate.difference = function $goog$math$Coordinate$difference$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x - $b$$.x, $a$$.y - $b$$.y)
};
goog.math.Coordinate.sum = function $goog$math$Coordinate$sum$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x + $b$$.x, $a$$.y + $b$$.y)
};
goog.math.Coordinate.prototype.ceil = function $goog$math$Coordinate$$ceil$() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this
};
goog.math.Coordinate.prototype.floor = function $goog$math$Coordinate$$floor$() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this
};
goog.math.Coordinate.prototype.round = function $goog$math$Coordinate$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
goog.math.Coordinate.prototype.translate = function $goog$math$Coordinate$$translate$($tx$$, $opt_ty$$) {
  $tx$$ instanceof goog.math.Coordinate ? (this.x += $tx$$.x, this.y += $tx$$.y) : (this.x += $tx$$, goog.isNumber($opt_ty$$) && (this.y += $opt_ty$$));
  return this
};
goog.math.Coordinate.prototype.scale = function $goog$math$Coordinate$$scale$($sx$$, $opt_sy$$) {
  var $sy$$ = goog.isNumber($opt_sy$$) ? $opt_sy$$ : $sx$$;
  this.x *= $sx$$;
  this.y *= $sy$$;
  return this
};
goog.math.Box = function $goog$math$Box$($top$$, $right$$, $bottom$$, $left$$) {
  this.top = $top$$;
  this.right = $right$$;
  this.bottom = $bottom$$;
  this.left = $left$$
};
goog.math.Box.boundingBox = function $goog$math$Box$boundingBox$($var_args$$) {
  for(var $box$$ = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $coord$$ = arguments[$i$$];
    $box$$.top = Math.min($box$$.top, $coord$$.y);
    $box$$.right = Math.max($box$$.right, $coord$$.x);
    $box$$.bottom = Math.max($box$$.bottom, $coord$$.y);
    $box$$.left = Math.min($box$$.left, $coord$$.x)
  }
  return $box$$
};
goog.math.Box.prototype.clone = function $goog$math$Box$$clone$() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function $goog$math$Box$$toString$() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function $goog$math$Box$$contains$($other$$) {
  return goog.math.Box.contains(this, $other$$)
};
goog.math.Box.prototype.expand = function $goog$math$Box$$expand$($top$$, $opt_right$$, $opt_bottom$$, $opt_left$$) {
  goog.isObject($top$$) ? (this.top -= $top$$.top, this.right += $top$$.right, this.bottom += $top$$.bottom, this.left -= $top$$.left) : (this.top -= $top$$, this.right += $opt_right$$, this.bottom += $opt_bottom$$, this.left -= $opt_left$$);
  return this
};
goog.math.Box.prototype.expandToInclude = function $goog$math$Box$$expandToInclude$($box$$) {
  this.left = Math.min(this.left, $box$$.left);
  this.top = Math.min(this.top, $box$$.top);
  this.right = Math.max(this.right, $box$$.right);
  this.bottom = Math.max(this.bottom, $box$$.bottom)
};
goog.math.Box.equals = function $goog$math$Box$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : $a$$ && $b$$ ? $a$$.top == $b$$.top && $a$$.right == $b$$.right && $a$$.bottom == $b$$.bottom && $a$$.left == $b$$.left : !1
};
goog.math.Box.contains = function $goog$math$Box$contains$($box$$, $other$$) {
  return $box$$ && $other$$ ? $other$$ instanceof goog.math.Box ? $other$$.left >= $box$$.left && $other$$.right <= $box$$.right && $other$$.top >= $box$$.top && $other$$.bottom <= $box$$.bottom : $other$$.x >= $box$$.left && $other$$.x <= $box$$.right && $other$$.y >= $box$$.top && $other$$.y <= $box$$.bottom : !1
};
goog.math.Box.relativePositionX = function $goog$math$Box$relativePositionX$($box$$, $coord$$) {
  return $coord$$.x < $box$$.left ? $coord$$.x - $box$$.left : $coord$$.x > $box$$.right ? $coord$$.x - $box$$.right : 0
};
goog.math.Box.relativePositionY = function $goog$math$Box$relativePositionY$($box$$, $coord$$) {
  return $coord$$.y < $box$$.top ? $coord$$.y - $box$$.top : $coord$$.y > $box$$.bottom ? $coord$$.y - $box$$.bottom : 0
};
goog.math.Box.distance = function $goog$math$Box$distance$($box$$, $coord$$) {
  var $x$$ = goog.math.Box.relativePositionX($box$$, $coord$$), $y$$ = goog.math.Box.relativePositionY($box$$, $coord$$);
  return Math.sqrt($x$$ * $x$$ + $y$$ * $y$$)
};
goog.math.Box.intersects = function $goog$math$Box$intersects$($a$$, $b$$) {
  return $a$$.left <= $b$$.right && $b$$.left <= $a$$.right && $a$$.top <= $b$$.bottom && $b$$.top <= $a$$.bottom
};
goog.math.Box.intersectsWithPadding = function $goog$math$Box$intersectsWithPadding$($a$$, $b$$, $padding$$) {
  return $a$$.left <= $b$$.right + $padding$$ && $b$$.left <= $a$$.right + $padding$$ && $a$$.top <= $b$$.bottom + $padding$$ && $b$$.top <= $a$$.bottom + $padding$$
};
goog.math.Box.prototype.ceil = function $goog$math$Box$$ceil$() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this
};
goog.math.Box.prototype.floor = function $goog$math$Box$$floor$() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this
};
goog.math.Box.prototype.round = function $goog$math$Box$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this
};
goog.math.Box.prototype.translate = function $goog$math$Box$$translate$($tx$$, $opt_ty$$) {
  $tx$$ instanceof goog.math.Coordinate ? (this.left += $tx$$.x, this.right += $tx$$.x, this.top += $tx$$.y, this.bottom += $tx$$.y) : (this.left += $tx$$, this.right += $tx$$, goog.isNumber($opt_ty$$) && (this.top += $opt_ty$$, this.bottom += $opt_ty$$));
  return this
};
goog.math.Box.prototype.scale = function $goog$math$Box$$scale$($sx$$, $opt_sy$$) {
  var $sy$$ = goog.isNumber($opt_sy$$) ? $opt_sy$$ : $sx$$;
  this.left *= $sx$$;
  this.right *= $sx$$;
  this.top *= $sy$$;
  this.bottom *= $sy$$;
  return this
};
goog.math.Size = function $goog$math$Size$($width$$, $height$$) {
  this.width = $width$$;
  this.height = $height$$
};
goog.math.Size.equals = function $goog$math$Size$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : $a$$ && $b$$ ? $a$$.width == $b$$.width && $a$$.height == $b$$.height : !1
};
goog.math.Size.prototype.clone = function $goog$math$Size$$clone$() {
  return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function $goog$math$Size$$toString$() {
  return"(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function $goog$math$Size$$getLongest$() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function $goog$math$Size$$getShortest$() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function $goog$math$Size$$area$() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function $goog$math$Size$$perimeter$() {
  return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function $goog$math$Size$$aspectRatio$() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function $goog$math$Size$$isEmpty$() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function $goog$math$Size$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function $goog$math$Size$$fitsInside$($target$$) {
  return this.width <= $target$$.width && this.height <= $target$$.height
};
goog.math.Size.prototype.floor = function $goog$math$Size$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function $goog$math$Size$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function $goog$math$Size$$scale$($sx$$, $opt_sy$$) {
  var $sy$$ = goog.isNumber($opt_sy$$) ? $opt_sy$$ : $sx$$;
  this.width *= $sx$$;
  this.height *= $sy$$;
  return this
};
goog.math.Size.prototype.scaleToFit = function $goog$math$Size$$scaleToFit$($s$$15_target$$) {
  $s$$15_target$$ = this.aspectRatio() > $s$$15_target$$.aspectRatio() ? $s$$15_target$$.width / this.width : $s$$15_target$$.height / this.height;
  return this.scale($s$$15_target$$)
};
goog.math.Rect = function $goog$math$Rect$($x$$, $y$$, $w$$, $h$$) {
  this.left = $x$$;
  this.top = $y$$;
  this.width = $w$$;
  this.height = $h$$
};
goog.math.Rect.prototype.clone = function $goog$math$Rect$$clone$() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function $goog$math$Rect$$toBox$() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function $goog$math$Rect$createFromBox$($box$$) {
  return new goog.math.Rect($box$$.left, $box$$.top, $box$$.right - $box$$.left, $box$$.bottom - $box$$.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function $goog$math$Rect$$toString$() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function $goog$math$Rect$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : $a$$ && $b$$ ? $a$$.left == $b$$.left && $a$$.width == $b$$.width && $a$$.top == $b$$.top && $a$$.height == $b$$.height : !1
};
goog.math.Rect.prototype.intersection = function $goog$math$Rect$$intersection$($rect_y1$$) {
  var $x0$$ = Math.max(this.left, $rect_y1$$.left), $x1$$ = Math.min(this.left + this.width, $rect_y1$$.left + $rect_y1$$.width);
  if($x0$$ <= $x1$$) {
    var $y0$$ = Math.max(this.top, $rect_y1$$.top);
    $rect_y1$$ = Math.min(this.top + this.height, $rect_y1$$.top + $rect_y1$$.height);
    if($y0$$ <= $rect_y1$$) {
      return this.left = $x0$$, this.top = $y0$$, this.width = $x1$$ - $x0$$, this.height = $rect_y1$$ - $y0$$, !0
    }
  }
  return!1
};
goog.math.Rect.intersection = function $goog$math$Rect$intersection$($a$$, $b$$) {
  var $x0$$ = Math.max($a$$.left, $b$$.left), $x1$$ = Math.min($a$$.left + $a$$.width, $b$$.left + $b$$.width);
  if($x0$$ <= $x1$$) {
    var $y0$$ = Math.max($a$$.top, $b$$.top), $y1$$ = Math.min($a$$.top + $a$$.height, $b$$.top + $b$$.height);
    if($y0$$ <= $y1$$) {
      return new goog.math.Rect($x0$$, $y0$$, $x1$$ - $x0$$, $y1$$ - $y0$$)
    }
  }
  return null
};
goog.math.Rect.intersects = function $goog$math$Rect$intersects$($a$$, $b$$) {
  return $a$$.left <= $b$$.left + $b$$.width && $b$$.left <= $a$$.left + $a$$.width && $a$$.top <= $b$$.top + $b$$.height && $b$$.top <= $a$$.top + $a$$.height
};
goog.math.Rect.prototype.intersects = function $goog$math$Rect$$intersects$($rect$$) {
  return goog.math.Rect.intersects(this, $rect$$)
};
goog.math.Rect.difference = function $goog$math$Rect$difference$($a$$, $b$$) {
  var $intersection_result$$ = goog.math.Rect.intersection($a$$, $b$$);
  if(!$intersection_result$$ || !$intersection_result$$.height || !$intersection_result$$.width) {
    return[$a$$.clone()]
  }
  var $intersection_result$$ = [], $top$$ = $a$$.top, $height$$ = $a$$.height, $ar$$ = $a$$.left + $a$$.width, $ab$$ = $a$$.top + $a$$.height, $br$$ = $b$$.left + $b$$.width, $bb$$ = $b$$.top + $b$$.height;
  $b$$.top > $a$$.top && ($intersection_result$$.push(new goog.math.Rect($a$$.left, $a$$.top, $a$$.width, $b$$.top - $a$$.top)), $top$$ = $b$$.top, $height$$ -= $b$$.top - $a$$.top);
  $bb$$ < $ab$$ && ($intersection_result$$.push(new goog.math.Rect($a$$.left, $bb$$, $a$$.width, $ab$$ - $bb$$)), $height$$ = $bb$$ - $top$$);
  $b$$.left > $a$$.left && $intersection_result$$.push(new goog.math.Rect($a$$.left, $top$$, $b$$.left - $a$$.left, $height$$));
  $br$$ < $ar$$ && $intersection_result$$.push(new goog.math.Rect($br$$, $top$$, $ar$$ - $br$$, $height$$));
  return $intersection_result$$
};
goog.math.Rect.prototype.difference = function $goog$math$Rect$$difference$($rect$$) {
  return goog.math.Rect.difference(this, $rect$$)
};
goog.math.Rect.prototype.boundingRect = function $goog$math$Rect$$boundingRect$($rect$$) {
  var $right$$ = Math.max(this.left + this.width, $rect$$.left + $rect$$.width), $bottom$$ = Math.max(this.top + this.height, $rect$$.top + $rect$$.height);
  this.left = Math.min(this.left, $rect$$.left);
  this.top = Math.min(this.top, $rect$$.top);
  this.width = $right$$ - this.left;
  this.height = $bottom$$ - this.top
};
goog.math.Rect.boundingRect = function $goog$math$Rect$boundingRect$($a$$, $b$$) {
  if(!$a$$ || !$b$$) {
    return null
  }
  var $clone$$ = $a$$.clone();
  $clone$$.boundingRect($b$$);
  return $clone$$
};
goog.math.Rect.prototype.contains = function $goog$math$Rect$$contains$($another$$) {
  return $another$$ instanceof goog.math.Rect ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function $goog$math$Rect$$getSize$() {
  return new goog.math.Size(this.width, this.height)
};
goog.math.Rect.prototype.ceil = function $goog$math$Rect$$ceil$() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Rect.prototype.floor = function $goog$math$Rect$$floor$() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Rect.prototype.round = function $goog$math$Rect$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Rect.prototype.translate = function $goog$math$Rect$$translate$($tx$$, $opt_ty$$) {
  $tx$$ instanceof goog.math.Coordinate ? (this.left += $tx$$.x, this.top += $tx$$.y) : (this.left += $tx$$, goog.isNumber($opt_ty$$) && (this.top += $opt_ty$$));
  return this
};
goog.math.Rect.prototype.scale = function $goog$math$Rect$$scale$($sx$$, $opt_sy$$) {
  var $sy$$ = goog.isNumber($opt_sy$$) ? $opt_sy$$ : $sx$$;
  this.left *= $sx$$;
  this.width *= $sx$$;
  this.top *= $sy$$;
  this.height *= $sy$$;
  return this
};
goog.dom = {};
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function $goog$dom$vendor$getVendorJsPrefix$() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
};
goog.dom.vendor.getVendorPrefix = function $goog$dom$vendor$getVendorPrefix$() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
};
goog.dom.classes = {};
goog.dom.classes.set = function $goog$dom$classes$set$($element$$, $className$$) {
  $element$$.className = $className$$
};
goog.dom.classes.get = function $goog$dom$classes$get$($className$$4_element$$) {
  $className$$4_element$$ = $className$$4_element$$.className;
  return goog.isString($className$$4_element$$) && $className$$4_element$$.match(/\S+/g) || []
};
goog.dom.classes.add = function $goog$dom$classes$add$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$ = goog.array.slice(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$.length;
  goog.dom.classes.add_($classes$$, $args$$);
  goog.dom.classes.set($element$$, $classes$$.join(" "));
  return $classes$$.length == $expectedCount$$
};
goog.dom.classes.remove = function $goog$dom$classes$remove$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$ = goog.array.slice(arguments, 1), $newClasses$$ = goog.dom.classes.getDifference_($classes$$, $args$$);
  goog.dom.classes.set($element$$, $newClasses$$.join(" "));
  return $newClasses$$.length == $classes$$.length - $args$$.length
};
goog.dom.classes.add_ = function $goog$dom$classes$add_$($classes$$, $args$$) {
  for(var $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
    goog.array.contains($classes$$, $args$$[$i$$]) || $classes$$.push($args$$[$i$$])
  }
};
goog.dom.classes.getDifference_ = function $goog$dom$classes$getDifference_$($arr1$$, $arr2$$) {
  return goog.array.filter($arr1$$, function($item$$) {
    return!goog.array.contains($arr2$$, $item$$)
  })
};
goog.dom.classes.swap = function $goog$dom$classes$swap$($element$$, $fromClass$$, $toClass$$) {
  for(var $classes$$ = goog.dom.classes.get($element$$), $removed$$ = !1, $i$$ = 0;$i$$ < $classes$$.length;$i$$++) {
    $classes$$[$i$$] == $fromClass$$ && (goog.array.splice($classes$$, $i$$--, 1), $removed$$ = !0)
  }
  $removed$$ && ($classes$$.push($toClass$$), goog.dom.classes.set($element$$, $classes$$.join(" ")));
  return $removed$$
};
goog.dom.classes.addRemove = function $goog$dom$classes$addRemove$($element$$, $classesToRemove$$, $classesToAdd$$) {
  var $classes$$ = goog.dom.classes.get($element$$);
  goog.isString($classesToRemove$$) ? goog.array.remove($classes$$, $classesToRemove$$) : goog.isArray($classesToRemove$$) && ($classes$$ = goog.dom.classes.getDifference_($classes$$, $classesToRemove$$));
  goog.isString($classesToAdd$$) && !goog.array.contains($classes$$, $classesToAdd$$) ? $classes$$.push($classesToAdd$$) : goog.isArray($classesToAdd$$) && goog.dom.classes.add_($classes$$, $classesToAdd$$);
  goog.dom.classes.set($element$$, $classes$$.join(" "))
};
goog.dom.classes.has = function $goog$dom$classes$has$($element$$, $className$$) {
  return goog.array.contains(goog.dom.classes.get($element$$), $className$$)
};
goog.dom.classes.enable = function $goog$dom$classes$enable$($element$$, $className$$, $enabled$$) {
  $enabled$$ ? goog.dom.classes.add($element$$, $className$$) : goog.dom.classes.remove($element$$, $className$$)
};
goog.dom.classes.toggle = function $goog$dom$classes$toggle$($element$$, $className$$) {
  var $add$$ = !goog.dom.classes.has($element$$, $className$$);
  goog.dom.classes.enable($element$$, $className$$, $add$$);
  return $add$$
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function $goog$dom$getDomHelper$($opt_element$$) {
  return $opt_element$$ ? new goog.dom.DomHelper(goog.dom.getOwnerDocument($opt_element$$)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function $goog$dom$getDocument$() {
  return document
};
goog.dom.getElement = function $goog$dom$getElement$($element$$) {
  return goog.isString($element$$) ? document.getElementById($element$$) : $element$$
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function $goog$dom$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(document, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.getElementsByClass = function $goog$dom$getElementsByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document;
  return goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelectorAll("." + $className$$) : $parent$$.getElementsByClassName ? $parent$$.getElementsByClassName($className$$) : goog.dom.getElementsByTagNameAndClass_(document, "*", $className$$, $opt_el$$)
};
goog.dom.getElementByClass = function $goog$dom$getElementByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document, $retVal$$ = null;
  return($retVal$$ = goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelector("." + $className$$) : goog.dom.getElementsByClass($className$$, $opt_el$$)[0]) || null
};
goog.dom.canUseQuerySelector_ = function $goog$dom$canUseQuerySelector_$($parent$$) {
  return!(!$parent$$.querySelectorAll || !$parent$$.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function $goog$dom$getElementsByTagNameAndClass_$($doc$$6_els_parent$$, $className$$10_opt_tag$$1_tagName$$, $opt_class$$, $arrayLike_opt_el$$) {
  $doc$$6_els_parent$$ = $arrayLike_opt_el$$ || $doc$$6_els_parent$$;
  $className$$10_opt_tag$$1_tagName$$ = $className$$10_opt_tag$$1_tagName$$ && "*" != $className$$10_opt_tag$$1_tagName$$ ? $className$$10_opt_tag$$1_tagName$$.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_($doc$$6_els_parent$$) && ($className$$10_opt_tag$$1_tagName$$ || $opt_class$$)) {
    return $doc$$6_els_parent$$.querySelectorAll($className$$10_opt_tag$$1_tagName$$ + ($opt_class$$ ? "." + $opt_class$$ : ""))
  }
  if($opt_class$$ && $doc$$6_els_parent$$.getElementsByClassName) {
    $doc$$6_els_parent$$ = $doc$$6_els_parent$$.getElementsByClassName($opt_class$$);
    if($className$$10_opt_tag$$1_tagName$$) {
      $arrayLike_opt_el$$ = {};
      for(var $len$$ = 0, $i$$ = 0, $el$$;$el$$ = $doc$$6_els_parent$$[$i$$];$i$$++) {
        $className$$10_opt_tag$$1_tagName$$ == $el$$.nodeName && ($arrayLike_opt_el$$[$len$$++] = $el$$)
      }
      $arrayLike_opt_el$$.length = $len$$;
      return $arrayLike_opt_el$$
    }
    return $doc$$6_els_parent$$
  }
  $doc$$6_els_parent$$ = $doc$$6_els_parent$$.getElementsByTagName($className$$10_opt_tag$$1_tagName$$ || "*");
  if($opt_class$$) {
    $arrayLike_opt_el$$ = {};
    for($i$$ = $len$$ = 0;$el$$ = $doc$$6_els_parent$$[$i$$];$i$$++) {
      $className$$10_opt_tag$$1_tagName$$ = $el$$.className, "function" == typeof $className$$10_opt_tag$$1_tagName$$.split && goog.array.contains($className$$10_opt_tag$$1_tagName$$.split(/\s+/), $opt_class$$) && ($arrayLike_opt_el$$[$len$$++] = $el$$)
    }
    $arrayLike_opt_el$$.length = $len$$;
    return $arrayLike_opt_el$$
  }
  return $doc$$6_els_parent$$
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function $goog$dom$setProperties$($element$$, $properties$$) {
  goog.object.forEach($properties$$, function($val$$, $key$$) {
    "style" == $key$$ ? $element$$.style.cssText = $val$$ : "class" == $key$$ ? $element$$.className = $val$$ : "for" == $key$$ ? $element$$.htmlFor = $val$$ : $key$$ in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? $element$$.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[$key$$], $val$$) : goog.string.startsWith($key$$, "aria-") || goog.string.startsWith($key$$, "data-") ? $element$$.setAttribute($key$$, $val$$) : $element$$[$key$$] = $val$$
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function $goog$dom$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize_($opt_window$$ || window)
};
goog.dom.getViewportSize_ = function $goog$dom$getViewportSize_$($doc$$7_el$$) {
  $doc$$7_el$$ = $doc$$7_el$$.document;
  $doc$$7_el$$ = goog.dom.isCss1CompatMode_($doc$$7_el$$) ? $doc$$7_el$$.documentElement : $doc$$7_el$$.body;
  return new goog.math.Size($doc$$7_el$$.clientWidth, $doc$$7_el$$.clientHeight)
};
goog.dom.getDocumentHeight = function $goog$dom$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function $goog$dom$getDocumentHeight_$($vh_win$$) {
  var $doc$$8_sh$$ = $vh_win$$.document, $body$$2_height$$ = 0;
  if($doc$$8_sh$$) {
    $vh_win$$ = goog.dom.getViewportSize_($vh_win$$).height;
    var $body$$2_height$$ = $doc$$8_sh$$.body, $docEl$$ = $doc$$8_sh$$.documentElement;
    if(goog.dom.isCss1CompatMode_($doc$$8_sh$$) && $docEl$$.scrollHeight) {
      $body$$2_height$$ = $docEl$$.scrollHeight != $vh_win$$ ? $docEl$$.scrollHeight : $docEl$$.offsetHeight
    }else {
      var $doc$$8_sh$$ = $docEl$$.scrollHeight, $oh$$ = $docEl$$.offsetHeight;
      $docEl$$.clientHeight != $oh$$ && ($doc$$8_sh$$ = $body$$2_height$$.scrollHeight, $oh$$ = $body$$2_height$$.offsetHeight);
      $body$$2_height$$ = $doc$$8_sh$$ > $vh_win$$ ? $doc$$8_sh$$ > $oh$$ ? $doc$$8_sh$$ : $oh$$ : $doc$$8_sh$$ < $oh$$ ? $doc$$8_sh$$ : $oh$$
    }
  }
  return $body$$2_height$$
};
goog.dom.getPageScroll = function $goog$dom$getPageScroll$($opt_window$$) {
  return goog.dom.getDomHelper(($opt_window$$ || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function $goog$dom$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function $goog$dom$getDocumentScroll_$($doc$$9_win$$) {
  var $el$$ = goog.dom.getDocumentScrollElement_($doc$$9_win$$);
  $doc$$9_win$$ = goog.dom.getWindow_($doc$$9_win$$);
  return new goog.math.Coordinate($doc$$9_win$$.pageXOffset || $el$$.scrollLeft, $doc$$9_win$$.pageYOffset || $el$$.scrollTop)
};
goog.dom.getDocumentScrollElement = function $goog$dom$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function $goog$dom$getDocumentScrollElement_$($doc$$) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_($doc$$) ? $doc$$.documentElement : $doc$$.body
};
goog.dom.getWindow = function $goog$dom$getWindow$($opt_doc$$) {
  return $opt_doc$$ ? goog.dom.getWindow_($opt_doc$$) : window
};
goog.dom.getWindow_ = function $goog$dom$getWindow_$($doc$$) {
  return $doc$$.parentWindow || $doc$$.defaultView
};
goog.dom.createDom = function $goog$dom$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function $goog$dom$createDom_$($doc$$, $args$$) {
  var $element$$20_tagName$$ = $args$$[0], $attributes$$ = $args$$[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$20_tagName$$ = ["<", $element$$20_tagName$$];
    $attributes$$.name && $element$$20_tagName$$.push(' name="', goog.string.htmlEscape($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$20_tagName$$.push(' type="', goog.string.htmlEscape($attributes$$.type), '"');
      var $clone$$ = {};
      goog.object.extend($clone$$, $attributes$$);
      delete $clone$$.type;
      $attributes$$ = $clone$$
    }
    $element$$20_tagName$$.push(">");
    $element$$20_tagName$$ = $element$$20_tagName$$.join("")
  }
  $element$$20_tagName$$ = $doc$$.createElement($element$$20_tagName$$);
  $attributes$$ && (goog.isString($attributes$$) ? $element$$20_tagName$$.className = $attributes$$ : goog.isArray($attributes$$) ? goog.dom.classes.add.apply(null, [$element$$20_tagName$$].concat($attributes$$)) : goog.dom.setProperties($element$$20_tagName$$, $attributes$$));
  2 < $args$$.length && goog.dom.append_($doc$$, $element$$20_tagName$$, $args$$, 2);
  return $element$$20_tagName$$
};
goog.dom.append_ = function $goog$dom$append_$($doc$$, $parent$$, $args$$, $i$$) {
  function $childHandler$$($child$$) {
    $child$$ && $parent$$.appendChild(goog.isString($child$$) ? $doc$$.createTextNode($child$$) : $child$$)
  }
  for(;$i$$ < $args$$.length;$i$$++) {
    var $arg$$ = $args$$[$i$$];
    goog.isArrayLike($arg$$) && !goog.dom.isNodeLike($arg$$) ? goog.array.forEach(goog.dom.isNodeList($arg$$) ? goog.array.toArray($arg$$) : $arg$$, $childHandler$$) : $childHandler$$($arg$$)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function $goog$dom$createElement$($name$$) {
  return document.createElement($name$$)
};
goog.dom.createTextNode = function $goog$dom$createTextNode$($content$$) {
  return document.createTextNode(String($content$$))
};
goog.dom.createTable = function $goog$dom$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(document, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.createTable_ = function $goog$dom$createTable_$($doc$$14_elem$$, $rows$$, $columns$$, $fillWithNbsp$$) {
  for(var $rowHtml$$ = ["<tr>"], $i$$ = 0;$i$$ < $columns$$;$i$$++) {
    $rowHtml$$.push($fillWithNbsp$$ ? "<td>&nbsp;</td>" : "<td></td>")
  }
  $rowHtml$$.push("</tr>");
  $rowHtml$$ = $rowHtml$$.join("");
  $columns$$ = ["<table>"];
  for($i$$ = 0;$i$$ < $rows$$;$i$$++) {
    $columns$$.push($rowHtml$$)
  }
  $columns$$.push("</table>");
  $doc$$14_elem$$ = $doc$$14_elem$$.createElement(goog.dom.TagName.DIV);
  $doc$$14_elem$$.innerHTML = $columns$$.join("");
  return $doc$$14_elem$$.removeChild($doc$$14_elem$$.firstChild)
};
goog.dom.htmlToDocumentFragment = function $goog$dom$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(document, $htmlString$$)
};
goog.dom.htmlToDocumentFragment_ = function $goog$dom$htmlToDocumentFragment_$($doc$$, $htmlString$$) {
  var $tempDiv$$ = $doc$$.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? ($tempDiv$$.innerHTML = "<br>" + $htmlString$$, $tempDiv$$.removeChild($tempDiv$$.firstChild)) : $tempDiv$$.innerHTML = $htmlString$$;
  if(1 == $tempDiv$$.childNodes.length) {
    return $tempDiv$$.removeChild($tempDiv$$.firstChild)
  }
  for(var $fragment$$ = $doc$$.createDocumentFragment();$tempDiv$$.firstChild;) {
    $fragment$$.appendChild($tempDiv$$.firstChild)
  }
  return $fragment$$
};
goog.dom.getCompatMode = function $goog$dom$getCompatMode$() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function $goog$dom$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function $goog$dom$isCss1CompatMode_$($doc$$) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == $doc$$.compatMode
};
goog.dom.canHaveChildren = function $goog$dom$canHaveChildren$($node$$) {
  if($node$$.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1
  }
  switch($node$$.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return!1
  }
  return!0
};
goog.dom.appendChild = function $goog$dom$appendChild$($parent$$, $child$$) {
  $parent$$.appendChild($child$$)
};
goog.dom.append = function $goog$dom$append$($parent$$, $var_args$$) {
  goog.dom.append_(goog.dom.getOwnerDocument($parent$$), $parent$$, arguments, 1)
};
goog.dom.removeChildren = function $goog$dom$removeChildren$($node$$) {
  for(var $child$$;$child$$ = $node$$.firstChild;) {
    $node$$.removeChild($child$$)
  }
};
goog.dom.insertSiblingBefore = function $goog$dom$insertSiblingBefore$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$)
};
goog.dom.insertSiblingAfter = function $goog$dom$insertSiblingAfter$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$.nextSibling)
};
goog.dom.insertChildAt = function $goog$dom$insertChildAt$($parent$$, $child$$, $index$$) {
  $parent$$.insertBefore($child$$, $parent$$.childNodes[$index$$] || null)
};
goog.dom.removeNode = function $goog$dom$removeNode$($node$$) {
  return $node$$ && $node$$.parentNode ? $node$$.parentNode.removeChild($node$$) : null
};
goog.dom.replaceNode = function $goog$dom$replaceNode$($newNode$$, $oldNode$$) {
  var $parent$$ = $oldNode$$.parentNode;
  $parent$$ && $parent$$.replaceChild($newNode$$, $oldNode$$)
};
goog.dom.flattenElement = function $goog$dom$flattenElement$($element$$) {
  var $child$$, $parent$$ = $element$$.parentNode;
  if($parent$$ && $parent$$.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if($element$$.removeNode) {
      return $element$$.removeNode(!1)
    }
    for(;$child$$ = $element$$.firstChild;) {
      $parent$$.insertBefore($child$$, $element$$)
    }
    return goog.dom.removeNode($element$$)
  }
};
goog.dom.getChildren = function $goog$dom$getChildren$($element$$) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != $element$$.children ? $element$$.children : goog.array.filter($element$$.childNodes, function($node$$) {
    return $node$$.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function $goog$dom$getFirstElementChild$($node$$) {
  return void 0 != $node$$.firstElementChild ? $node$$.firstElementChild : goog.dom.getNextElementNode_($node$$.firstChild, !0)
};
goog.dom.getLastElementChild = function $goog$dom$getLastElementChild$($node$$) {
  return void 0 != $node$$.lastElementChild ? $node$$.lastElementChild : goog.dom.getNextElementNode_($node$$.lastChild, !1)
};
goog.dom.getNextElementSibling = function $goog$dom$getNextElementSibling$($node$$) {
  return void 0 != $node$$.nextElementSibling ? $node$$.nextElementSibling : goog.dom.getNextElementNode_($node$$.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function $goog$dom$getPreviousElementSibling$($node$$) {
  return void 0 != $node$$.previousElementSibling ? $node$$.previousElementSibling : goog.dom.getNextElementNode_($node$$.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function $goog$dom$getNextElementNode_$($node$$, $forward$$) {
  for(;$node$$ && $node$$.nodeType != goog.dom.NodeType.ELEMENT;) {
    $node$$ = $forward$$ ? $node$$.nextSibling : $node$$.previousSibling
  }
  return $node$$
};
goog.dom.getNextNode = function $goog$dom$getNextNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if($node$$.firstChild) {
    return $node$$.firstChild
  }
  for(;$node$$ && !$node$$.nextSibling;) {
    $node$$ = $node$$.parentNode
  }
  return $node$$ ? $node$$.nextSibling : null
};
goog.dom.getPreviousNode = function $goog$dom$getPreviousNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if(!$node$$.previousSibling) {
    return $node$$.parentNode
  }
  for($node$$ = $node$$.previousSibling;$node$$ && $node$$.lastChild;) {
    $node$$ = $node$$.lastChild
  }
  return $node$$
};
goog.dom.isNodeLike = function $goog$dom$isNodeLike$($obj$$) {
  return goog.isObject($obj$$) && 0 < $obj$$.nodeType
};
goog.dom.isElement = function $goog$dom$isElement$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function $goog$dom$isWindow$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.window == $obj$$
};
goog.dom.getParentElement = function $goog$dom$getParentElement$($element$$23_parent$$) {
  if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    return $element$$23_parent$$.parentElement
  }
  $element$$23_parent$$ = $element$$23_parent$$.parentNode;
  return goog.dom.isElement($element$$23_parent$$) ? $element$$23_parent$$ : null
};
goog.dom.contains = function $goog$dom$contains$($parent$$, $descendant$$) {
  if($parent$$.contains && $descendant$$.nodeType == goog.dom.NodeType.ELEMENT) {
    return $parent$$ == $descendant$$ || $parent$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$.compareDocumentPosition) {
    return $parent$$ == $descendant$$ || Boolean($parent$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$
};
goog.dom.compareNodeOrder = function $goog$dom$compareNodeOrder$($node1$$, $node2$$) {
  if($node1$$ == $node2$$) {
    return 0
  }
  if($node1$$.compareDocumentPosition) {
    return $node1$$.compareDocumentPosition($node2$$) & 2 ? 1 : -1
  }
  if(goog.userAgent.IE && !goog.userAgent.isDocumentMode(9)) {
    if($node1$$.nodeType == goog.dom.NodeType.DOCUMENT) {
      return-1
    }
    if($node2$$.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1
    }
  }
  if("sourceIndex" in $node1$$ || $node1$$.parentNode && "sourceIndex" in $node1$$.parentNode) {
    var $isElement1_range1$$ = $node1$$.nodeType == goog.dom.NodeType.ELEMENT, $doc$$ = $node2$$.nodeType == goog.dom.NodeType.ELEMENT;
    if($isElement1_range1$$ && $doc$$) {
      return $node1$$.sourceIndex - $node2$$.sourceIndex
    }
    var $parent1$$ = $node1$$.parentNode, $parent2$$ = $node2$$.parentNode;
    return $parent1$$ == $parent2$$ ? goog.dom.compareSiblingOrder_($node1$$, $node2$$) : !$isElement1_range1$$ && goog.dom.contains($parent1$$, $node2$$) ? -1 * goog.dom.compareParentsDescendantNodeIe_($node1$$, $node2$$) : !$doc$$ && goog.dom.contains($parent2$$, $node1$$) ? goog.dom.compareParentsDescendantNodeIe_($node2$$, $node1$$) : ($isElement1_range1$$ ? $node1$$.sourceIndex : $parent1$$.sourceIndex) - ($doc$$ ? $node2$$.sourceIndex : $parent2$$.sourceIndex)
  }
  $doc$$ = goog.dom.getOwnerDocument($node1$$);
  $isElement1_range1$$ = $doc$$.createRange();
  $isElement1_range1$$.selectNode($node1$$);
  $isElement1_range1$$.collapse(!0);
  $doc$$ = $doc$$.createRange();
  $doc$$.selectNode($node2$$);
  $doc$$.collapse(!0);
  return $isElement1_range1$$.compareBoundaryPoints(goog.global.Range.START_TO_END, $doc$$)
};
goog.dom.compareParentsDescendantNodeIe_ = function $goog$dom$compareParentsDescendantNodeIe_$($textNode$$, $node$$) {
  var $parent$$ = $textNode$$.parentNode;
  if($parent$$ == $node$$) {
    return-1
  }
  for(var $sibling$$ = $node$$;$sibling$$.parentNode != $parent$$;) {
    $sibling$$ = $sibling$$.parentNode
  }
  return goog.dom.compareSiblingOrder_($sibling$$, $textNode$$)
};
goog.dom.compareSiblingOrder_ = function $goog$dom$compareSiblingOrder_$($node1$$, $node2$$) {
  for(var $s$$ = $node2$$;$s$$ = $s$$.previousSibling;) {
    if($s$$ == $node1$$) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function $goog$dom$findCommonAncestor$($var_args$$) {
  var $i$$, $count$$ = arguments.length;
  if(!$count$$) {
    return null
  }
  if(1 == $count$$) {
    return arguments[0]
  }
  var $paths$$ = [], $minLength$$ = Infinity;
  for($i$$ = 0;$i$$ < $count$$;$i$$++) {
    for(var $ancestors$$ = [], $first$$2_node$$ = arguments[$i$$];$first$$2_node$$;) {
      $ancestors$$.unshift($first$$2_node$$), $first$$2_node$$ = $first$$2_node$$.parentNode
    }
    $paths$$.push($ancestors$$);
    $minLength$$ = Math.min($minLength$$, $ancestors$$.length)
  }
  $ancestors$$ = null;
  for($i$$ = 0;$i$$ < $minLength$$;$i$$++) {
    for(var $first$$2_node$$ = $paths$$[0][$i$$], $j$$ = 1;$j$$ < $count$$;$j$$++) {
      if($first$$2_node$$ != $paths$$[$j$$][$i$$]) {
        return $ancestors$$
      }
    }
    $ancestors$$ = $first$$2_node$$
  }
  return $ancestors$$
};
goog.dom.getOwnerDocument = function $goog$dom$getOwnerDocument$($node$$) {
  return $node$$.nodeType == goog.dom.NodeType.DOCUMENT ? $node$$ : $node$$.ownerDocument || $node$$.document
};
goog.dom.getFrameContentDocument = function $goog$dom$getFrameContentDocument$($frame$$) {
  return $frame$$.contentDocument || $frame$$.contentWindow.document
};
goog.dom.getFrameContentWindow = function $goog$dom$getFrameContentWindow$($frame$$) {
  return $frame$$.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument($frame$$))
};
goog.dom.setTextContent = function $goog$dom$setTextContent$($element$$, $text$$) {
  if("textContent" in $element$$) {
    $element$$.textContent = $text$$
  }else {
    if($element$$.firstChild && $element$$.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;$element$$.lastChild != $element$$.firstChild;) {
        $element$$.removeChild($element$$.lastChild)
      }
      $element$$.firstChild.data = $text$$
    }else {
      goog.dom.removeChildren($element$$);
      var $doc$$ = goog.dom.getOwnerDocument($element$$);
      $element$$.appendChild($doc$$.createTextNode(String($text$$)))
    }
  }
};
goog.dom.getOuterHtml = function $goog$dom$getOuterHtml$($element$$) {
  if("outerHTML" in $element$$) {
    return $element$$.outerHTML
  }
  var $div$$ = goog.dom.getOwnerDocument($element$$).createElement("div");
  $div$$.appendChild($element$$.cloneNode(!0));
  return $div$$.innerHTML
};
goog.dom.findNode = function $goog$dom$findNode$($root$$, $p$$) {
  var $rv$$ = [];
  return goog.dom.findNodes_($root$$, $p$$, $rv$$, !0) ? $rv$$[0] : void 0
};
goog.dom.findNodes = function $goog$dom$findNodes$($root$$, $p$$) {
  var $rv$$ = [];
  goog.dom.findNodes_($root$$, $p$$, $rv$$, !1);
  return $rv$$
};
goog.dom.findNodes_ = function $goog$dom$findNodes_$($child$$9_root$$, $p$$, $rv$$, $findOne$$) {
  if(null != $child$$9_root$$) {
    for($child$$9_root$$ = $child$$9_root$$.firstChild;$child$$9_root$$;) {
      if($p$$($child$$9_root$$) && ($rv$$.push($child$$9_root$$), $findOne$$) || goog.dom.findNodes_($child$$9_root$$, $p$$, $rv$$, $findOne$$)) {
        return!0
      }
      $child$$9_root$$ = $child$$9_root$$.nextSibling
    }
  }
  return!1
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function $goog$dom$isFocusableTabIndex$($element$$26_index$$) {
  var $attrNode$$ = $element$$26_index$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$26_index$$ = $element$$26_index$$.tabIndex, goog.isNumber($element$$26_index$$) && 0 <= $element$$26_index$$ && 32768 > $element$$26_index$$) : !1
};
goog.dom.setFocusableTabIndex = function $goog$dom$setFocusableTabIndex$($element$$, $enable$$) {
  $enable$$ ? $element$$.tabIndex = 0 : ($element$$.tabIndex = -1, $element$$.removeAttribute("tabIndex"))
};
goog.dom.getTextContent = function $goog$dom$getTextContent$($node$$) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in $node$$) {
    $node$$ = goog.string.canonicalizeNewlines($node$$.innerText)
  }else {
    var $buf$$ = [];
    goog.dom.getTextContent_($node$$, $buf$$, !0);
    $node$$ = $buf$$.join("")
  }
  $node$$ = $node$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  $node$$ = $node$$.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || ($node$$ = $node$$.replace(/ +/g, " "));
  " " != $node$$ && ($node$$ = $node$$.replace(/^\s*/, ""));
  return $node$$
};
goog.dom.getRawTextContent = function $goog$dom$getRawTextContent$($node$$) {
  var $buf$$ = [];
  goog.dom.getTextContent_($node$$, $buf$$, !1);
  return $buf$$.join("")
};
goog.dom.getTextContent_ = function $goog$dom$getTextContent_$($child$$10_node$$, $buf$$, $normalizeWhitespace$$) {
  if(!($child$$10_node$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if($child$$10_node$$.nodeType == goog.dom.NodeType.TEXT) {
      $normalizeWhitespace$$ ? $buf$$.push(String($child$$10_node$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$.push($child$$10_node$$.nodeValue)
    }else {
      if($child$$10_node$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        $buf$$.push(goog.dom.PREDEFINED_TAG_VALUES_[$child$$10_node$$.nodeName])
      }else {
        for($child$$10_node$$ = $child$$10_node$$.firstChild;$child$$10_node$$;) {
          goog.dom.getTextContent_($child$$10_node$$, $buf$$, $normalizeWhitespace$$), $child$$10_node$$ = $child$$10_node$$.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function $goog$dom$getNodeTextLength$($node$$) {
  return goog.dom.getTextContent($node$$).length
};
goog.dom.getNodeTextOffset = function $goog$dom$getNodeTextOffset$($node$$, $opt_offsetParent$$) {
  for(var $root$$ = $opt_offsetParent$$ || goog.dom.getOwnerDocument($node$$).body, $buf$$ = [];$node$$ && $node$$ != $root$$;) {
    for(var $cur$$ = $node$$;$cur$$ = $cur$$.previousSibling;) {
      $buf$$.unshift(goog.dom.getTextContent($cur$$))
    }
    $node$$ = $node$$.parentNode
  }
  return goog.string.trimLeft($buf$$.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function $goog$dom$getNodeAtOffset$($parent$$, $offset$$, $opt_result$$) {
  $parent$$ = [$parent$$];
  for(var $pos$$ = 0, $cur$$ = null;0 < $parent$$.length && $pos$$ < $offset$$;) {
    if($cur$$ = $parent$$.pop(), !($cur$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if($cur$$.nodeType == goog.dom.NodeType.TEXT) {
        var $i$$81_text$$ = $cur$$.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), $pos$$ = $pos$$ + $i$$81_text$$.length
      }else {
        if($cur$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          $pos$$ += goog.dom.PREDEFINED_TAG_VALUES_[$cur$$.nodeName].length
        }else {
          for($i$$81_text$$ = $cur$$.childNodes.length - 1;0 <= $i$$81_text$$;$i$$81_text$$--) {
            $parent$$.push($cur$$.childNodes[$i$$81_text$$])
          }
        }
      }
    }
  }
  goog.isObject($opt_result$$) && ($opt_result$$.remainder = $cur$$ ? $cur$$.nodeValue.length + $offset$$ - $pos$$ - 1 : 0, $opt_result$$.node = $cur$$);
  return $cur$$
};
goog.dom.isNodeList = function $goog$dom$isNodeList$($val$$) {
  if($val$$ && "number" == typeof $val$$.length) {
    if(goog.isObject($val$$)) {
      return"function" == typeof $val$$.item || "string" == typeof $val$$.item
    }
    if(goog.isFunction($val$$)) {
      return"function" == typeof $val$$.item
    }
  }
  return!1
};
goog.dom.getAncestorByTagNameAndClass = function $goog$dom$getAncestorByTagNameAndClass$($element$$, $opt_tag$$, $opt_class$$) {
  if(!$opt_tag$$ && !$opt_class$$) {
    return null
  }
  var $tagName$$ = $opt_tag$$ ? $opt_tag$$.toUpperCase() : null;
  return goog.dom.getAncestor($element$$, function($node$$) {
    return(!$tagName$$ || $node$$.nodeName == $tagName$$) && (!$opt_class$$ || goog.dom.classes.has($node$$, $opt_class$$))
  }, !0)
};
goog.dom.getAncestorByClass = function $goog$dom$getAncestorByClass$($element$$, $className$$) {
  return goog.dom.getAncestorByTagNameAndClass($element$$, null, $className$$)
};
goog.dom.getAncestor = function $goog$dom$getAncestor$($element$$, $matcher$$, $ignoreSearchSteps_opt_includeNode$$, $opt_maxSearchSteps$$) {
  $ignoreSearchSteps_opt_includeNode$$ || ($element$$ = $element$$.parentNode);
  $ignoreSearchSteps_opt_includeNode$$ = null == $opt_maxSearchSteps$$;
  for(var $steps$$ = 0;$element$$ && ($ignoreSearchSteps_opt_includeNode$$ || $steps$$ <= $opt_maxSearchSteps$$);) {
    if($matcher$$($element$$)) {
      return $element$$
    }
    $element$$ = $element$$.parentNode;
    $steps$$++
  }
  return null
};
goog.dom.getActiveElement = function $goog$dom$getActiveElement$($doc$$) {
  try {
    return $doc$$ && $doc$$.activeElement
  }catch($e$$) {
  }
  return null
};
goog.dom.DomHelper = function $goog$dom$DomHelper$($opt_document$$) {
  this.document_ = $opt_document$$ || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function $goog$dom$DomHelper$$setDocument$($document$$) {
  this.document_ = $document$$
};
goog.dom.DomHelper.prototype.getDocument = function $goog$dom$DomHelper$$getDocument$() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function $goog$dom$DomHelper$$getElement$($element$$) {
  return goog.isString($element$$) ? this.document_.getElementById($element$$) : $element$$
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function $goog$dom$DomHelper$$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.DomHelper.prototype.getElementsByClass = function $goog$dom$DomHelper$$getElementsByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementsByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function $goog$dom$DomHelper$$getElementByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function $goog$dom$DomHelper$$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize($opt_window$$ || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function $goog$dom$DomHelper$$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function $goog$dom$DomHelper$$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function $goog$dom$DomHelper$$createElement$($name$$) {
  return this.document_.createElement($name$$)
};
goog.dom.DomHelper.prototype.createTextNode = function $goog$dom$DomHelper$$createTextNode$($content$$) {
  return this.document_.createTextNode(String($content$$))
};
goog.dom.DomHelper.prototype.createTable = function $goog$dom$DomHelper$$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(this.document_, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function $goog$dom$DomHelper$$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(this.document_, $htmlString$$)
};
goog.dom.DomHelper.prototype.getCompatMode = function $goog$dom$DomHelper$$getCompatMode$() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function $goog$dom$DomHelper$$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function $goog$dom$DomHelper$$getWindow$() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function $goog$dom$DomHelper$$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function $goog$dom$DomHelper$$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function $goog$dom$DomHelper$$getActiveElement$($opt_doc$$) {
  return goog.dom.getActiveElement($opt_doc$$ || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.style = {};
goog.style.setStyle = function $goog$style$setStyle$($element$$, $style$$, $opt_value$$) {
  goog.isString($style$$) ? goog.style.setStyle_($element$$, $opt_value$$, $style$$) : goog.object.forEach($style$$, goog.partial(goog.style.setStyle_, $element$$))
};
goog.style.setStyle_ = function $goog$style$setStyle_$($element$$, $value$$, $propertyName$$7_style$$) {
  ($propertyName$$7_style$$ = goog.style.getVendorJsStyleName_($element$$, $propertyName$$7_style$$)) && ($element$$.style[$propertyName$$7_style$$] = $value$$)
};
goog.style.getVendorJsStyleName_ = function $goog$style$getVendorJsStyleName_$($element$$, $style$$) {
  var $camelStyle$$ = goog.string.toCamelCase($style$$);
  if(void 0 === $element$$.style[$camelStyle$$]) {
    var $prefixedStyle$$ = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase($style$$);
    if(void 0 !== $element$$.style[$prefixedStyle$$]) {
      return $prefixedStyle$$
    }
  }
  return $camelStyle$$
};
goog.style.getVendorStyleName_ = function $goog$style$getVendorStyleName_$($element$$, $style$$) {
  var $camelStyle$$1_prefixedStyle$$ = goog.string.toCamelCase($style$$);
  return void 0 === $element$$.style[$camelStyle$$1_prefixedStyle$$] && ($camelStyle$$1_prefixedStyle$$ = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase($style$$), void 0 !== $element$$.style[$camelStyle$$1_prefixedStyle$$]) ? goog.dom.vendor.getVendorPrefix() + "-" + $style$$ : $style$$
};
goog.style.getStyle = function $goog$style$getStyle$($element$$, $property$$) {
  var $styleValue$$ = $element$$.style[goog.string.toCamelCase($property$$)];
  return"undefined" !== typeof $styleValue$$ ? $styleValue$$ : $element$$.style[goog.style.getVendorJsStyleName_($element$$, $property$$)] || ""
};
goog.style.getComputedStyle = function $goog$style$getComputedStyle$($element$$, $property$$) {
  var $doc$$ = goog.dom.getOwnerDocument($element$$);
  return $doc$$.defaultView && $doc$$.defaultView.getComputedStyle && ($doc$$ = $doc$$.defaultView.getComputedStyle($element$$, null)) ? $doc$$[$property$$] || $doc$$.getPropertyValue($property$$) || "" : ""
};
goog.style.getCascadedStyle = function $goog$style$getCascadedStyle$($element$$, $style$$) {
  return $element$$.currentStyle ? $element$$.currentStyle[$style$$] : null
};
goog.style.getStyle_ = function $goog$style$getStyle_$($element$$, $style$$) {
  return goog.style.getComputedStyle($element$$, $style$$) || goog.style.getCascadedStyle($element$$, $style$$) || $element$$.style && $element$$.style[$style$$]
};
goog.style.getComputedPosition = function $goog$style$getComputedPosition$($element$$) {
  return goog.style.getStyle_($element$$, "position")
};
goog.style.getBackgroundColor = function $goog$style$getBackgroundColor$($element$$) {
  return goog.style.getStyle_($element$$, "backgroundColor")
};
goog.style.getComputedOverflowX = function $goog$style$getComputedOverflowX$($element$$) {
  return goog.style.getStyle_($element$$, "overflowX")
};
goog.style.getComputedOverflowY = function $goog$style$getComputedOverflowY$($element$$) {
  return goog.style.getStyle_($element$$, "overflowY")
};
goog.style.getComputedZIndex = function $goog$style$getComputedZIndex$($element$$) {
  return goog.style.getStyle_($element$$, "zIndex")
};
goog.style.getComputedTextAlign = function $goog$style$getComputedTextAlign$($element$$) {
  return goog.style.getStyle_($element$$, "textAlign")
};
goog.style.getComputedCursor = function $goog$style$getComputedCursor$($element$$) {
  return goog.style.getStyle_($element$$, "cursor")
};
goog.style.setPosition = function $goog$style$setPosition$($el$$, $arg1_y$$, $opt_arg2$$) {
  var $x$$, $buggyGeckoSubPixelPos$$ = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  $arg1_y$$ instanceof goog.math.Coordinate ? ($x$$ = $arg1_y$$.x, $arg1_y$$ = $arg1_y$$.y) : ($x$$ = $arg1_y$$, $arg1_y$$ = $opt_arg2$$);
  $el$$.style.left = goog.style.getPixelStyleValue_($x$$, $buggyGeckoSubPixelPos$$);
  $el$$.style.top = goog.style.getPixelStyleValue_($arg1_y$$, $buggyGeckoSubPixelPos$$)
};
goog.style.getPosition = function $goog$style$getPosition$($element$$) {
  return new goog.math.Coordinate($element$$.offsetLeft, $element$$.offsetTop)
};
goog.style.getClientViewportElement = function $goog$style$getClientViewportElement$($doc$$) {
  $doc$$ = $doc$$ ? goog.dom.getOwnerDocument($doc$$) : goog.dom.getDocument();
  return!goog.userAgent.IE || goog.userAgent.isDocumentMode(9) || goog.dom.getDomHelper($doc$$).isCss1CompatMode() ? $doc$$.documentElement : $doc$$.body
};
goog.style.getViewportPageOffset = function $goog$style$getViewportPageOffset$($doc$$) {
  var $body$$ = $doc$$.body;
  $doc$$ = $doc$$.documentElement;
  return new goog.math.Coordinate($body$$.scrollLeft || $doc$$.scrollLeft, $body$$.scrollTop || $doc$$.scrollTop)
};
goog.style.getBoundingClientRect_ = function $goog$style$getBoundingClientRect_$($doc$$27_el$$) {
  var $rect$$ = $doc$$27_el$$.getBoundingClientRect();
  goog.userAgent.IE && ($doc$$27_el$$ = $doc$$27_el$$.ownerDocument, $rect$$.left -= $doc$$27_el$$.documentElement.clientLeft + $doc$$27_el$$.body.clientLeft, $rect$$.top -= $doc$$27_el$$.documentElement.clientTop + $doc$$27_el$$.body.clientTop);
  return $rect$$
};
goog.style.getOffsetParent = function $goog$style$getOffsetParent$($element$$48_parent$$) {
  if(goog.userAgent.IE && !goog.userAgent.isDocumentMode(8)) {
    return $element$$48_parent$$.offsetParent
  }
  var $doc$$ = goog.dom.getOwnerDocument($element$$48_parent$$), $positionStyle$$ = goog.style.getStyle_($element$$48_parent$$, "position"), $skipStatic$$ = "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$;
  for($element$$48_parent$$ = $element$$48_parent$$.parentNode;$element$$48_parent$$ && $element$$48_parent$$ != $doc$$;$element$$48_parent$$ = $element$$48_parent$$.parentNode) {
    if($positionStyle$$ = goog.style.getStyle_($element$$48_parent$$, "position"), $skipStatic$$ = $skipStatic$$ && "static" == $positionStyle$$ && $element$$48_parent$$ != $doc$$.documentElement && $element$$48_parent$$ != $doc$$.body, !$skipStatic$$ && ($element$$48_parent$$.scrollWidth > $element$$48_parent$$.clientWidth || $element$$48_parent$$.scrollHeight > $element$$48_parent$$.clientHeight || "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$ || "relative" == $positionStyle$$)) {
      return $element$$48_parent$$
    }
  }
  return null
};
goog.style.getVisibleRectForElement = function $goog$style$getVisibleRectForElement$($el$$6_element$$) {
  for(var $visibleRect$$ = new goog.math.Box(0, Infinity, Infinity, 0), $dom$$ = goog.dom.getDomHelper($el$$6_element$$), $body$$ = $dom$$.getDocument().body, $documentElement$$ = $dom$$.getDocument().documentElement, $scrollEl_scrollY$$ = $dom$$.getDocumentScrollElement();$el$$6_element$$ = goog.style.getOffsetParent($el$$6_element$$);) {
    if(!(goog.userAgent.IE && 0 == $el$$6_element$$.clientWidth || goog.userAgent.WEBKIT && 0 == $el$$6_element$$.clientHeight && $el$$6_element$$ == $body$$ || $el$$6_element$$ == $body$$ || $el$$6_element$$ == $documentElement$$ || "visible" == goog.style.getStyle_($el$$6_element$$, "overflow"))) {
      var $pos$$ = goog.style.getPageOffset($el$$6_element$$), $client$$ = goog.style.getClientLeftTop($el$$6_element$$);
      $pos$$.x += $client$$.x;
      $pos$$.y += $client$$.y;
      $visibleRect$$.top = Math.max($visibleRect$$.top, $pos$$.y);
      $visibleRect$$.right = Math.min($visibleRect$$.right, $pos$$.x + $el$$6_element$$.clientWidth);
      $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $pos$$.y + $el$$6_element$$.clientHeight);
      $visibleRect$$.left = Math.max($visibleRect$$.left, $pos$$.x)
    }
  }
  $body$$ = $scrollEl_scrollY$$.scrollLeft;
  $scrollEl_scrollY$$ = $scrollEl_scrollY$$.scrollTop;
  $visibleRect$$.left = Math.max($visibleRect$$.left, $body$$);
  $visibleRect$$.top = Math.max($visibleRect$$.top, $scrollEl_scrollY$$);
  $dom$$ = $dom$$.getViewportSize();
  $visibleRect$$.right = Math.min($visibleRect$$.right, $body$$ + $dom$$.width);
  $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $scrollEl_scrollY$$ + $dom$$.height);
  return 0 <= $visibleRect$$.top && 0 <= $visibleRect$$.left && $visibleRect$$.bottom > $visibleRect$$.top && $visibleRect$$.right > $visibleRect$$.left ? $visibleRect$$ : null
};
goog.style.getContainerOffsetToScrollInto = function $goog$style$getContainerOffsetToScrollInto$($element$$, $container$$2_scrollTop$$, $opt_center$$) {
  var $elementPos_relY$$ = goog.style.getPageOffset($element$$), $containerPos_spaceX$$ = goog.style.getPageOffset($container$$2_scrollTop$$), $containerBorder_scrollLeft$$ = goog.style.getBorderBox($container$$2_scrollTop$$), $relX$$ = $elementPos_relY$$.x - $containerPos_spaceX$$.x - $containerBorder_scrollLeft$$.left, $elementPos_relY$$ = $elementPos_relY$$.y - $containerPos_spaceX$$.y - $containerBorder_scrollLeft$$.top, $containerPos_spaceX$$ = $container$$2_scrollTop$$.clientWidth - $element$$.offsetWidth;
  $element$$ = $container$$2_scrollTop$$.clientHeight - $element$$.offsetHeight;
  $containerBorder_scrollLeft$$ = $container$$2_scrollTop$$.scrollLeft;
  $container$$2_scrollTop$$ = $container$$2_scrollTop$$.scrollTop;
  $opt_center$$ ? ($containerBorder_scrollLeft$$ += $relX$$ - $containerPos_spaceX$$ / 2, $container$$2_scrollTop$$ += $elementPos_relY$$ - $element$$ / 2) : ($containerBorder_scrollLeft$$ += Math.min($relX$$, Math.max($relX$$ - $containerPos_spaceX$$, 0)), $container$$2_scrollTop$$ += Math.min($elementPos_relY$$, Math.max($elementPos_relY$$ - $element$$, 0)));
  return new goog.math.Coordinate($containerBorder_scrollLeft$$, $container$$2_scrollTop$$)
};
goog.style.scrollIntoContainerView = function $goog$style$scrollIntoContainerView$($element$$51_offset$$, $container$$, $opt_center$$) {
  $element$$51_offset$$ = goog.style.getContainerOffsetToScrollInto($element$$51_offset$$, $container$$, $opt_center$$);
  $container$$.scrollLeft = $element$$51_offset$$.x;
  $container$$.scrollTop = $element$$51_offset$$.y
};
goog.style.getClientLeftTop = function $goog$style$getClientLeftTop$($el$$) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var $left$$ = parseFloat(goog.style.getComputedStyle($el$$, "borderLeftWidth"));
    if(goog.style.isRightToLeft($el$$)) {
      var $scrollbarWidth$$ = $el$$.offsetWidth - $el$$.clientWidth - $left$$ - parseFloat(goog.style.getComputedStyle($el$$, "borderRightWidth")), $left$$ = $left$$ + $scrollbarWidth$$
    }
    return new goog.math.Coordinate($left$$, parseFloat(goog.style.getComputedStyle($el$$, "borderTopWidth")))
  }
  return new goog.math.Coordinate($el$$.clientLeft, $el$$.clientTop)
};
goog.style.getPageOffset = function $goog$style$getPageOffset$($el$$) {
  var $box$$7_parent$$, $doc$$ = goog.dom.getOwnerDocument($el$$), $positionStyle$$ = goog.style.getStyle_($el$$, "position");
  goog.asserts.assertObject($el$$, "Parameter is required");
  var $BUGGY_GECKO_BOX_OBJECT$$ = goog.userAgent.GECKO && $doc$$.getBoxObjectFor && !$el$$.getBoundingClientRect && "absolute" == $positionStyle$$ && ($box$$7_parent$$ = $doc$$.getBoxObjectFor($el$$)) && (0 > $box$$7_parent$$.screenX || 0 > $box$$7_parent$$.screenY), $pos$$ = new goog.math.Coordinate(0, 0), $viewportElement$$ = goog.style.getClientViewportElement($doc$$);
  if($el$$ == $viewportElement$$) {
    return $pos$$
  }
  if($el$$.getBoundingClientRect) {
    $box$$7_parent$$ = goog.style.getBoundingClientRect_($el$$), $el$$ = goog.dom.getDomHelper($doc$$).getDocumentScroll(), $pos$$.x = $box$$7_parent$$.left + $el$$.x, $pos$$.y = $box$$7_parent$$.top + $el$$.y
  }else {
    if($doc$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT$$) {
      $box$$7_parent$$ = $doc$$.getBoxObjectFor($el$$), $el$$ = $doc$$.getBoxObjectFor($viewportElement$$), $pos$$.x = $box$$7_parent$$.screenX - $el$$.screenX, $pos$$.y = $box$$7_parent$$.screenY - $el$$.screenY
    }else {
      $box$$7_parent$$ = $el$$;
      do {
        $pos$$.x += $box$$7_parent$$.offsetLeft;
        $pos$$.y += $box$$7_parent$$.offsetTop;
        $box$$7_parent$$ != $el$$ && ($pos$$.x += $box$$7_parent$$.clientLeft || 0, $pos$$.y += $box$$7_parent$$.clientTop || 0);
        if(goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition($box$$7_parent$$)) {
          $pos$$.x += $doc$$.body.scrollLeft;
          $pos$$.y += $doc$$.body.scrollTop;
          break
        }
        $box$$7_parent$$ = $box$$7_parent$$.offsetParent
      }while($box$$7_parent$$ && $box$$7_parent$$ != $el$$);
      if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == $positionStyle$$) {
        $pos$$.y -= $doc$$.body.offsetTop
      }
      for($box$$7_parent$$ = $el$$;($box$$7_parent$$ = goog.style.getOffsetParent($box$$7_parent$$)) && $box$$7_parent$$ != $doc$$.body && $box$$7_parent$$ != $viewportElement$$;) {
        $pos$$.x -= $box$$7_parent$$.scrollLeft, goog.userAgent.OPERA && "TR" == $box$$7_parent$$.tagName || ($pos$$.y -= $box$$7_parent$$.scrollTop)
      }
    }
  }
  return $pos$$
};
goog.style.getPageOffsetLeft = function $goog$style$getPageOffsetLeft$($el$$) {
  return goog.style.getPageOffset($el$$).x
};
goog.style.getPageOffsetTop = function $goog$style$getPageOffsetTop$($el$$) {
  return goog.style.getPageOffset($el$$).y
};
goog.style.getFramedPageOffset = function $goog$style$getFramedPageOffset$($el$$, $relativeWin$$) {
  var $position$$ = new goog.math.Coordinate(0, 0), $currentWin$$ = goog.dom.getWindow(goog.dom.getOwnerDocument($el$$)), $currentEl$$ = $el$$;
  do {
    var $offset$$ = $currentWin$$ == $relativeWin$$ ? goog.style.getPageOffset($currentEl$$) : goog.style.getClientPosition($currentEl$$);
    $position$$.x += $offset$$.x;
    $position$$.y += $offset$$.y
  }while($currentWin$$ && $currentWin$$ != $relativeWin$$ && ($currentEl$$ = $currentWin$$.frameElement) && ($currentWin$$ = $currentWin$$.parent));
  return $position$$
};
goog.style.translateRectForAnotherFrame = function $goog$style$translateRectForAnotherFrame$($rect$$, $origBase$$, $newBase_pos$$) {
  if($origBase$$.getDocument() != $newBase_pos$$.getDocument()) {
    var $body$$ = $origBase$$.getDocument().body;
    $newBase_pos$$ = goog.style.getFramedPageOffset($body$$, $newBase_pos$$.getWindow());
    $newBase_pos$$ = goog.math.Coordinate.difference($newBase_pos$$, goog.style.getPageOffset($body$$));
    goog.userAgent.IE && !$origBase$$.isCss1CompatMode() && ($newBase_pos$$ = goog.math.Coordinate.difference($newBase_pos$$, $origBase$$.getDocumentScroll()));
    $rect$$.left += $newBase_pos$$.x;
    $rect$$.top += $newBase_pos$$.y
  }
};
goog.style.getRelativePosition = function $goog$style$getRelativePosition$($a$$, $b$$) {
  var $ap$$ = goog.style.getClientPosition($a$$), $bp$$ = goog.style.getClientPosition($b$$);
  return new goog.math.Coordinate($ap$$.x - $bp$$.x, $ap$$.y - $bp$$.y)
};
goog.style.getClientPosition = function $goog$style$getClientPosition$($el$$) {
  var $pos$$ = new goog.math.Coordinate;
  if($el$$.nodeType == goog.dom.NodeType.ELEMENT) {
    if($el$$.getBoundingClientRect) {
      var $box$$8_isAbstractedEvent_scrollCoord$$ = goog.style.getBoundingClientRect_($el$$);
      $pos$$.x = $box$$8_isAbstractedEvent_scrollCoord$$.left;
      $pos$$.y = $box$$8_isAbstractedEvent_scrollCoord$$.top
    }else {
      var $box$$8_isAbstractedEvent_scrollCoord$$ = goog.dom.getDomHelper($el$$).getDocumentScroll(), $pageCoord_targetEvent$$ = goog.style.getPageOffset($el$$);
      $pos$$.x = $pageCoord_targetEvent$$.x - $box$$8_isAbstractedEvent_scrollCoord$$.x;
      $pos$$.y = $pageCoord_targetEvent$$.y - $box$$8_isAbstractedEvent_scrollCoord$$.y
    }
    goog.userAgent.GECKO && !goog.userAgent.isVersion(12) && ($pos$$ = goog.math.Coordinate.sum($pos$$, goog.style.getCssTranslation($el$$)))
  }else {
    $box$$8_isAbstractedEvent_scrollCoord$$ = goog.isFunction($el$$.getBrowserEvent), $pageCoord_targetEvent$$ = $el$$, $el$$.targetTouches ? $pageCoord_targetEvent$$ = $el$$.targetTouches[0] : $box$$8_isAbstractedEvent_scrollCoord$$ && $el$$.getBrowserEvent().targetTouches && ($pageCoord_targetEvent$$ = $el$$.getBrowserEvent().targetTouches[0]), $pos$$.x = $pageCoord_targetEvent$$.clientX, $pos$$.y = $pageCoord_targetEvent$$.clientY
  }
  return $pos$$
};
goog.style.setPageOffset = function $goog$style$setPageOffset$($el$$, $x$$, $opt_y$$) {
  var $cur$$ = goog.style.getPageOffset($el$$);
  $x$$ instanceof goog.math.Coordinate && ($opt_y$$ = $x$$.y, $x$$ = $x$$.x);
  goog.style.setPosition($el$$, $el$$.offsetLeft + ($x$$ - $cur$$.x), $el$$.offsetTop + ($opt_y$$ - $cur$$.y))
};
goog.style.setSize = function $goog$style$setSize$($element$$, $w$$, $h$$) {
  if($w$$ instanceof goog.math.Size) {
    $h$$ = $w$$.height, $w$$ = $w$$.width
  }else {
    if(void 0 == $h$$) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth($element$$, $w$$);
  goog.style.setHeight($element$$, $h$$)
};
goog.style.getPixelStyleValue_ = function $goog$style$getPixelStyleValue_$($value$$, $round$$) {
  "number" == typeof $value$$ && ($value$$ = ($round$$ ? Math.round($value$$) : $value$$) + "px");
  return $value$$
};
goog.style.setHeight = function $goog$style$setHeight$($element$$, $height$$) {
  $element$$.style.height = goog.style.getPixelStyleValue_($height$$, !0)
};
goog.style.setWidth = function $goog$style$setWidth$($element$$, $width$$) {
  $element$$.style.width = goog.style.getPixelStyleValue_($width$$, !0)
};
goog.style.getSize = function $goog$style$getSize$($element$$55_size$$) {
  if("none" != goog.style.getStyle_($element$$55_size$$, "display")) {
    return goog.style.getSizeWithDisplay_($element$$55_size$$)
  }
  var $style$$ = $element$$55_size$$.style, $originalDisplay$$ = $style$$.display, $originalVisibility$$ = $style$$.visibility, $originalPosition$$ = $style$$.position;
  $style$$.visibility = "hidden";
  $style$$.position = "absolute";
  $style$$.display = "inline";
  $element$$55_size$$ = goog.style.getSizeWithDisplay_($element$$55_size$$);
  $style$$.display = $originalDisplay$$;
  $style$$.position = $originalPosition$$;
  $style$$.visibility = $originalVisibility$$;
  return $element$$55_size$$
};
goog.style.getSizeWithDisplay_ = function $goog$style$getSizeWithDisplay_$($clientRect_element$$) {
  var $offsetWidth$$ = $clientRect_element$$.offsetWidth, $offsetHeight$$ = $clientRect_element$$.offsetHeight, $webkitOffsetsZero$$ = goog.userAgent.WEBKIT && !$offsetWidth$$ && !$offsetHeight$$;
  return goog.isDef($offsetWidth$$) && !$webkitOffsetsZero$$ || !$clientRect_element$$.getBoundingClientRect ? new goog.math.Size($offsetWidth$$, $offsetHeight$$) : ($clientRect_element$$ = goog.style.getBoundingClientRect_($clientRect_element$$), new goog.math.Size($clientRect_element$$.right - $clientRect_element$$.left, $clientRect_element$$.bottom - $clientRect_element$$.top))
};
goog.style.getBounds = function $goog$style$getBounds$($element$$57_s$$) {
  var $o$$ = goog.style.getPageOffset($element$$57_s$$);
  $element$$57_s$$ = goog.style.getSize($element$$57_s$$);
  return new goog.math.Rect($o$$.x, $o$$.y, $element$$57_s$$.width, $element$$57_s$$.height)
};
goog.style.toCamelCase = function $goog$style$toCamelCase$($selector$$) {
  return goog.string.toCamelCase(String($selector$$))
};
goog.style.toSelectorCase = function $goog$style$toSelectorCase$($selector$$) {
  return goog.string.toSelectorCase($selector$$)
};
goog.style.getOpacity = function $goog$style$getOpacity$($el$$14_result$$) {
  var $match$$1_style$$ = $el$$14_result$$.style;
  $el$$14_result$$ = "";
  "opacity" in $match$$1_style$$ ? $el$$14_result$$ = $match$$1_style$$.opacity : "MozOpacity" in $match$$1_style$$ ? $el$$14_result$$ = $match$$1_style$$.MozOpacity : "filter" in $match$$1_style$$ && ($match$$1_style$$ = $match$$1_style$$.filter.match(/alpha\(opacity=([\d.]+)\)/)) && ($el$$14_result$$ = String($match$$1_style$$[1] / 100));
  return"" == $el$$14_result$$ ? $el$$14_result$$ : Number($el$$14_result$$)
};
goog.style.setOpacity = function $goog$style$setOpacity$($el$$, $alpha$$) {
  var $style$$ = $el$$.style;
  "opacity" in $style$$ ? $style$$.opacity = $alpha$$ : "MozOpacity" in $style$$ ? $style$$.MozOpacity = $alpha$$ : "filter" in $style$$ && ($style$$.filter = "" === $alpha$$ ? "" : "alpha(opacity=" + 100 * $alpha$$ + ")")
};
goog.style.setTransparentBackgroundImage = function $goog$style$setTransparentBackgroundImage$($el$$, $src$$) {
  var $style$$ = $el$$.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? $style$$.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $src$$ + '", sizingMethod="crop")' : ($style$$.backgroundImage = "url(" + $src$$ + ")", $style$$.backgroundPosition = "top left", $style$$.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function $goog$style$clearTransparentBackgroundImage$($el$$17_style$$) {
  $el$$17_style$$ = $el$$17_style$$.style;
  "filter" in $el$$17_style$$ ? $el$$17_style$$.filter = "" : $el$$17_style$$.backgroundImage = "none"
};
goog.style.showElement = function $goog$style$showElement$($el$$, $display$$) {
  $el$$.style.display = $display$$ ? "" : "none"
};
goog.style.isElementShown = function $goog$style$isElementShown$($el$$) {
  return"none" != $el$$.style.display
};
goog.style.installStyles = function $goog$style$installStyles$($stylesString$$, $opt_node$$) {
  var $dh$$ = goog.dom.getDomHelper($opt_node$$), $body$$ = null;
  if(goog.userAgent.IE) {
    $body$$ = $dh$$.getDocument().createStyleSheet(), goog.style.setStyles($body$$, $stylesString$$)
  }else {
    var $head$$ = $dh$$.getElementsByTagNameAndClass("head")[0];
    $head$$ || ($body$$ = $dh$$.getElementsByTagNameAndClass("body")[0], $head$$ = $dh$$.createDom("head"), $body$$.parentNode.insertBefore($head$$, $body$$));
    $body$$ = $dh$$.createDom("style");
    goog.style.setStyles($body$$, $stylesString$$);
    $dh$$.appendChild($head$$, $body$$)
  }
  return $body$$
};
goog.style.uninstallStyles = function $goog$style$uninstallStyles$($styleSheet$$) {
  goog.dom.removeNode($styleSheet$$.ownerNode || $styleSheet$$.owningElement || $styleSheet$$)
};
goog.style.setStyles = function $goog$style$setStyles$($element$$, $stylesString$$) {
  goog.userAgent.IE ? $element$$.cssText = $stylesString$$ : $element$$.innerHTML = $stylesString$$
};
goog.style.setPreWrap = function $goog$style$setPreWrap$($el$$20_style$$) {
  $el$$20_style$$ = $el$$20_style$$.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? ($el$$20_style$$.whiteSpace = "pre", $el$$20_style$$.wordWrap = "break-word") : $el$$20_style$$.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function $goog$style$setInlineBlock$($el$$21_style$$) {
  $el$$21_style$$ = $el$$21_style$$.style;
  $el$$21_style$$.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? ($el$$21_style$$.zoom = "1", $el$$21_style$$.display = "inline") : $el$$21_style$$.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function $goog$style$isRightToLeft$($el$$) {
  return"rtl" == goog.style.getStyle_($el$$, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function $goog$style$isUnselectable$($el$$) {
  return goog.style.unselectableStyle_ ? "none" == $el$$.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == $el$$.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function $goog$style$setUnselectable$($el$$24_i$$, $unselectable_value$$, $descendants_opt_noRecurse$$) {
  $descendants_opt_noRecurse$$ = $descendants_opt_noRecurse$$ ? null : $el$$24_i$$.getElementsByTagName("*");
  var $name$$ = goog.style.unselectableStyle_;
  if($name$$) {
    if($unselectable_value$$ = $unselectable_value$$ ? "none" : "", $el$$24_i$$.style[$name$$] = $unselectable_value$$, $descendants_opt_noRecurse$$) {
      $el$$24_i$$ = 0;
      for(var $descendant$$;$descendant$$ = $descendants_opt_noRecurse$$[$el$$24_i$$];$el$$24_i$$++) {
        $descendant$$.style[$name$$] = $unselectable_value$$
      }
    }
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if($unselectable_value$$ = $unselectable_value$$ ? "on" : "", $el$$24_i$$.setAttribute("unselectable", $unselectable_value$$), $descendants_opt_noRecurse$$) {
        for($el$$24_i$$ = 0;$descendant$$ = $descendants_opt_noRecurse$$[$el$$24_i$$];$el$$24_i$$++) {
          $descendant$$.setAttribute("unselectable", $unselectable_value$$)
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function $goog$style$getBorderBoxSize$($element$$) {
  return new goog.math.Size($element$$.offsetWidth, $element$$.offsetHeight)
};
goog.style.setBorderBoxSize = function $goog$style$setBorderBoxSize$($element$$, $size$$) {
  var $doc$$30_style$$ = goog.dom.getOwnerDocument($element$$), $isCss1CompatMode_paddingBox$$ = goog.dom.getDomHelper($doc$$30_style$$).isCss1CompatMode();
  if(!goog.userAgent.IE || $isCss1CompatMode_paddingBox$$ && goog.userAgent.isVersion("8")) {
    goog.style.setBoxSizingSize_($element$$, $size$$, "border-box")
  }else {
    if($doc$$30_style$$ = $element$$.style, $isCss1CompatMode_paddingBox$$) {
      var $isCss1CompatMode_paddingBox$$ = goog.style.getPaddingBox($element$$), $borderBox$$ = goog.style.getBorderBox($element$$);
      $doc$$30_style$$.pixelWidth = $size$$.width - $borderBox$$.left - $isCss1CompatMode_paddingBox$$.left - $isCss1CompatMode_paddingBox$$.right - $borderBox$$.right;
      $doc$$30_style$$.pixelHeight = $size$$.height - $borderBox$$.top - $isCss1CompatMode_paddingBox$$.top - $isCss1CompatMode_paddingBox$$.bottom - $borderBox$$.bottom
    }else {
      $doc$$30_style$$.pixelWidth = $size$$.width, $doc$$30_style$$.pixelHeight = $size$$.height
    }
  }
};
goog.style.getContentBoxSize = function $goog$style$getContentBoxSize$($borderBox$$1_element$$61_height$$) {
  var $doc$$31_paddingBox$$1_width$$ = goog.dom.getOwnerDocument($borderBox$$1_element$$61_height$$), $borderBoxSize_ieCurrentStyle$$ = goog.userAgent.IE && $borderBox$$1_element$$61_height$$.currentStyle;
  if($borderBoxSize_ieCurrentStyle$$ && goog.dom.getDomHelper($doc$$31_paddingBox$$1_width$$).isCss1CompatMode() && "auto" != $borderBoxSize_ieCurrentStyle$$.width && "auto" != $borderBoxSize_ieCurrentStyle$$.height && !$borderBoxSize_ieCurrentStyle$$.boxSizing) {
    return $doc$$31_paddingBox$$1_width$$ = goog.style.getIePixelValue_($borderBox$$1_element$$61_height$$, $borderBoxSize_ieCurrentStyle$$.width, "width", "pixelWidth"), $borderBox$$1_element$$61_height$$ = goog.style.getIePixelValue_($borderBox$$1_element$$61_height$$, $borderBoxSize_ieCurrentStyle$$.height, "height", "pixelHeight"), new goog.math.Size($doc$$31_paddingBox$$1_width$$, $borderBox$$1_element$$61_height$$)
  }
  $borderBoxSize_ieCurrentStyle$$ = goog.style.getBorderBoxSize($borderBox$$1_element$$61_height$$);
  $doc$$31_paddingBox$$1_width$$ = goog.style.getPaddingBox($borderBox$$1_element$$61_height$$);
  $borderBox$$1_element$$61_height$$ = goog.style.getBorderBox($borderBox$$1_element$$61_height$$);
  return new goog.math.Size($borderBoxSize_ieCurrentStyle$$.width - $borderBox$$1_element$$61_height$$.left - $doc$$31_paddingBox$$1_width$$.left - $doc$$31_paddingBox$$1_width$$.right - $borderBox$$1_element$$61_height$$.right, $borderBoxSize_ieCurrentStyle$$.height - $borderBox$$1_element$$61_height$$.top - $doc$$31_paddingBox$$1_width$$.top - $doc$$31_paddingBox$$1_width$$.bottom - $borderBox$$1_element$$61_height$$.bottom)
};
goog.style.setContentBoxSize = function $goog$style$setContentBoxSize$($element$$, $size$$) {
  var $doc$$32_style$$ = goog.dom.getOwnerDocument($element$$), $isCss1CompatMode$$1_paddingBox$$ = goog.dom.getDomHelper($doc$$32_style$$).isCss1CompatMode();
  if(!goog.userAgent.IE || $isCss1CompatMode$$1_paddingBox$$ && goog.userAgent.isVersion("8")) {
    goog.style.setBoxSizingSize_($element$$, $size$$, "content-box")
  }else {
    if($doc$$32_style$$ = $element$$.style, $isCss1CompatMode$$1_paddingBox$$) {
      $doc$$32_style$$.pixelWidth = $size$$.width, $doc$$32_style$$.pixelHeight = $size$$.height
    }else {
      var $isCss1CompatMode$$1_paddingBox$$ = goog.style.getPaddingBox($element$$), $borderBox$$ = goog.style.getBorderBox($element$$);
      $doc$$32_style$$.pixelWidth = $size$$.width + $borderBox$$.left + $isCss1CompatMode$$1_paddingBox$$.left + $isCss1CompatMode$$1_paddingBox$$.right + $borderBox$$.right;
      $doc$$32_style$$.pixelHeight = $size$$.height + $borderBox$$.top + $isCss1CompatMode$$1_paddingBox$$.top + $isCss1CompatMode$$1_paddingBox$$.bottom + $borderBox$$.bottom
    }
  }
};
goog.style.setBoxSizingSize_ = function $goog$style$setBoxSizingSize_$($element$$63_style$$, $size$$, $boxSizing$$) {
  $element$$63_style$$ = $element$$63_style$$.style;
  goog.userAgent.GECKO ? $element$$63_style$$.MozBoxSizing = $boxSizing$$ : goog.userAgent.WEBKIT ? $element$$63_style$$.WebkitBoxSizing = $boxSizing$$ : $element$$63_style$$.boxSizing = $boxSizing$$;
  $element$$63_style$$.width = Math.max($size$$.width, 0) + "px";
  $element$$63_style$$.height = Math.max($size$$.height, 0) + "px"
};
goog.style.getIePixelValue_ = function $goog$style$getIePixelValue_$($element$$, $pixelValue_value$$, $name$$, $pixelName$$) {
  if(/^\d+px?$/.test($pixelValue_value$$)) {
    return parseInt($pixelValue_value$$, 10)
  }
  var $oldStyleValue$$ = $element$$.style[$name$$], $oldRuntimeValue$$ = $element$$.runtimeStyle[$name$$];
  $element$$.runtimeStyle[$name$$] = $element$$.currentStyle[$name$$];
  $element$$.style[$name$$] = $pixelValue_value$$;
  $pixelValue_value$$ = $element$$.style[$pixelName$$];
  $element$$.style[$name$$] = $oldStyleValue$$;
  $element$$.runtimeStyle[$name$$] = $oldRuntimeValue$$;
  return $pixelValue_value$$
};
goog.style.getIePixelDistance_ = function $goog$style$getIePixelDistance_$($element$$, $propName$$) {
  var $value$$ = goog.style.getCascadedStyle($element$$, $propName$$);
  return $value$$ ? goog.style.getIePixelValue_($element$$, $value$$, "left", "pixelLeft") : 0
};
goog.style.getBox_ = function $goog$style$getBox_$($element$$, $stylePrefix$$) {
  if(goog.userAgent.IE) {
    var $left$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Left"), $right$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Right"), $top$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Top"), $bottom$$ = goog.style.getIePixelDistance_($element$$, $stylePrefix$$ + "Bottom");
    return new goog.math.Box($top$$, $right$$, $bottom$$, $left$$)
  }
  $left$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Left");
  $right$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Right");
  $top$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Top");
  $bottom$$ = goog.style.getComputedStyle($element$$, $stylePrefix$$ + "Bottom");
  return new goog.math.Box(parseFloat($top$$), parseFloat($right$$), parseFloat($bottom$$), parseFloat($left$$))
};
goog.style.getPaddingBox = function $goog$style$getPaddingBox$($element$$) {
  return goog.style.getBox_($element$$, "padding")
};
goog.style.getMarginBox = function $goog$style$getMarginBox$($element$$) {
  return goog.style.getBox_($element$$, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function $goog$style$getIePixelBorder_$($element$$, $prop$$) {
  if("none" == goog.style.getCascadedStyle($element$$, $prop$$ + "Style")) {
    return 0
  }
  var $width$$ = goog.style.getCascadedStyle($element$$, $prop$$ + "Width");
  return $width$$ in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[$width$$] : goog.style.getIePixelValue_($element$$, $width$$, "left", "pixelLeft")
};
goog.style.getBorderBox = function $goog$style$getBorderBox$($bottom$$5_element$$) {
  if(goog.userAgent.IE) {
    var $left$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderLeft"), $right$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderRight"), $top$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderTop");
    $bottom$$5_element$$ = goog.style.getIePixelBorder_($bottom$$5_element$$, "borderBottom");
    return new goog.math.Box($top$$, $right$$, $bottom$$5_element$$, $left$$)
  }
  $left$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderLeftWidth");
  $right$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderRightWidth");
  $top$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderTopWidth");
  $bottom$$5_element$$ = goog.style.getComputedStyle($bottom$$5_element$$, "borderBottomWidth");
  return new goog.math.Box(parseFloat($top$$), parseFloat($right$$), parseFloat($bottom$$5_element$$), parseFloat($left$$))
};
goog.style.getFontFamily = function $goog$style$getFontFamily$($el$$) {
  var $doc$$33_range$$ = goog.dom.getOwnerDocument($el$$), $font$$ = "";
  if($doc$$33_range$$.body.createTextRange) {
    $doc$$33_range$$ = $doc$$33_range$$.body.createTextRange();
    $doc$$33_range$$.moveToElementText($el$$);
    try {
      $font$$ = $doc$$33_range$$.queryCommandValue("FontName")
    }catch($e$$) {
      $font$$ = ""
    }
  }
  $font$$ || ($font$$ = goog.style.getStyle_($el$$, "fontFamily"));
  $el$$ = $font$$.split(",");
  1 < $el$$.length && ($font$$ = $el$$[0]);
  return goog.string.stripQuotes($font$$, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function $goog$style$getLengthUnits$($units$$1_value$$) {
  return($units$$1_value$$ = $units$$1_value$$.match(goog.style.lengthUnitRegex_)) && $units$$1_value$$[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function $goog$style$getFontSize$($el$$) {
  var $fontSize$$ = goog.style.getStyle_($el$$, "fontSize"), $parentSize_sizeElement_sizeUnits$$ = goog.style.getLengthUnits($fontSize$$);
  if($fontSize$$ && "px" == $parentSize_sizeElement_sizeUnits$$) {
    return parseInt($fontSize$$, 10)
  }
  if(goog.userAgent.IE) {
    if($parentSize_sizeElement_sizeUnits$$ in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_($el$$, $fontSize$$, "left", "pixelLeft")
    }
    if($el$$.parentNode && $el$$.parentNode.nodeType == goog.dom.NodeType.ELEMENT && $parentSize_sizeElement_sizeUnits$$ in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return $el$$ = $el$$.parentNode, $parentSize_sizeElement_sizeUnits$$ = goog.style.getStyle_($el$$, "fontSize"), goog.style.getIePixelValue_($el$$, $fontSize$$ == $parentSize_sizeElement_sizeUnits$$ ? "1em" : $fontSize$$, "left", "pixelLeft")
    }
  }
  $parentSize_sizeElement_sizeUnits$$ = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild($el$$, $parentSize_sizeElement_sizeUnits$$);
  $fontSize$$ = $parentSize_sizeElement_sizeUnits$$.offsetHeight;
  goog.dom.removeNode($parentSize_sizeElement_sizeUnits$$);
  return $fontSize$$
};
goog.style.parseStyleAttribute = function $goog$style$parseStyleAttribute$($value$$) {
  var $result$$ = {};
  goog.array.forEach($value$$.split(/\s*;\s*/), function($keyValue_pair$$) {
    $keyValue_pair$$ = $keyValue_pair$$.split(/\s*:\s*/);
    2 == $keyValue_pair$$.length && ($result$$[goog.string.toCamelCase($keyValue_pair$$[0].toLowerCase())] = $keyValue_pair$$[1])
  });
  return $result$$
};
goog.style.toStyleAttribute = function $goog$style$toStyleAttribute$($obj$$) {
  var $buffer$$ = [];
  goog.object.forEach($obj$$, function($value$$, $key$$) {
    $buffer$$.push(goog.string.toSelectorCase($key$$), ":", $value$$, ";")
  });
  return $buffer$$.join("")
};
goog.style.setFloat = function $goog$style$setFloat$($el$$, $value$$) {
  $el$$.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = $value$$
};
goog.style.getFloat = function $goog$style$getFloat$($el$$) {
  return $el$$.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function $goog$style$getScrollbarWidth$($innerDiv_opt_className_width$$) {
  var $outerDiv$$ = goog.dom.createElement("div");
  $innerDiv_opt_className_width$$ && ($outerDiv$$.className = $innerDiv_opt_className_width$$);
  $outerDiv$$.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  $innerDiv_opt_className_width$$ = goog.dom.createElement("div");
  goog.style.setSize($innerDiv_opt_className_width$$, "200px", "200px");
  $outerDiv$$.appendChild($innerDiv_opt_className_width$$);
  goog.dom.appendChild(goog.dom.getDocument().body, $outerDiv$$);
  $innerDiv_opt_className_width$$ = $outerDiv$$.offsetWidth - $outerDiv$$.clientWidth;
  goog.dom.removeNode($outerDiv$$);
  return $innerDiv_opt_className_width$$
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function $goog$style$getCssTranslation$($element$$) {
  var $property$$;
  goog.userAgent.IE ? $property$$ = "-ms-transform" : goog.userAgent.WEBKIT ? $property$$ = "-webkit-transform" : goog.userAgent.OPERA ? $property$$ = "-o-transform" : goog.userAgent.GECKO && ($property$$ = "-moz-transform");
  var $transform$$;
  $property$$ && ($transform$$ = goog.style.getStyle_($element$$, $property$$));
  $transform$$ || ($transform$$ = goog.style.getStyle_($element$$, "transform"));
  return $transform$$ ? ($element$$ = $transform$$.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat($element$$[1]), parseFloat($element$$[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0)
};
goog.events.EventHandler = function $goog$events$EventHandler$($opt_handler$$) {
  goog.Disposable.call(this);
  this.handler_ = $opt_handler$$;
  this.keys_ = []
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function $goog$events$EventHandler$$listen$($src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  goog.isArray($type$$) || (goog.events.EventHandler.typeArray_[0] = $type$$, $type$$ = goog.events.EventHandler.typeArray_);
  for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
    var $key$$ = goog.events.listen($src$$, $type$$[$i$$], $opt_fn$$ || this, $opt_capture$$ || !1, $opt_handler$$ || this.handler_ || this);
    this.keys_.push($key$$)
  }
  return this
};
goog.events.EventHandler.prototype.listenOnce = function $goog$events$EventHandler$$listenOnce$($key$$52_src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      this.listenOnce($key$$52_src$$, $type$$[$i$$], $opt_fn$$, $opt_capture$$, $opt_handler$$)
    }
  }else {
    $key$$52_src$$ = goog.events.listenOnce($key$$52_src$$, $type$$, $opt_fn$$ || this, $opt_capture$$, $opt_handler$$ || this.handler_ || this), this.keys_.push($key$$52_src$$)
  }
  return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function $goog$events$EventHandler$$listenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.listen($src$$, $listener$$, $opt_capt$$, $opt_handler$$ || this.handler_ || this, this);
  return this
};
goog.events.EventHandler.prototype.getListenerCount = function $goog$events$EventHandler$$getListenerCount$() {
  return this.keys_.length
};
goog.events.EventHandler.prototype.unlisten = function $goog$events$EventHandler$$unlisten$($key$$53_listener$$59_src$$, $type$$, $opt_fn$$, $opt_capture$$, $opt_handler$$) {
  if(goog.isArray($type$$)) {
    for(var $i$$ = 0;$i$$ < $type$$.length;$i$$++) {
      this.unlisten($key$$53_listener$$59_src$$, $type$$[$i$$], $opt_fn$$, $opt_capture$$, $opt_handler$$)
    }
  }else {
    if($key$$53_listener$$59_src$$ = goog.events.getListener($key$$53_listener$$59_src$$, $type$$, $opt_fn$$ || this, $opt_capture$$, $opt_handler$$ || this.handler_ || this)) {
      $key$$53_listener$$59_src$$ = $key$$53_listener$$59_src$$.key, goog.events.unlistenByKey($key$$53_listener$$59_src$$), goog.array.remove(this.keys_, $key$$53_listener$$59_src$$)
    }
  }
  return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function $goog$events$EventHandler$$unlistenWithWrapper$($src$$, $wrapper$$, $listener$$, $opt_capt$$, $opt_handler$$) {
  $wrapper$$.unlisten($src$$, $listener$$, $opt_capt$$, $opt_handler$$ || this.handler_ || this, this);
  return this
};
goog.events.EventHandler.prototype.removeAll = function $goog$events$EventHandler$$removeAll$() {
  goog.array.forEach(this.keys_, goog.events.unlistenByKey);
  this.keys_.length = 0
};
goog.events.EventHandler.prototype.disposeInternal = function $goog$events$EventHandler$$disposeInternal$() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function $goog$events$EventHandler$$handleEvent$($e$$) {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.ui = {};
goog.ui.IdGenerator = function $goog$ui$IdGenerator$() {
};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function $goog$ui$IdGenerator$$getNextUniqueId$() {
  return":" + (this.nextId_++).toString(36)
};
goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();
goog.ui.Component = function $goog$ui$Component$($opt_domHelper$$) {
  goog.events.EventTarget.call(this);
  this.dom_ = $opt_domHelper$$ || goog.dom.getDomHelper();
  this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.defaultRightToLeft_ = null;
goog.ui.Component.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", HIDE:"hide", DISABLE:"disable", ENABLE:"enable", HIGHLIGHT:"highlight", UNHIGHLIGHT:"unhighlight", ACTIVATE:"activate", DEACTIVATE:"deactivate", SELECT:"select", UNSELECT:"unselect", CHECK:"check", UNCHECK:"uncheck", FOCUS:"focus", BLUR:"blur", OPEN:"open", CLOSE:"close", ENTER:"enter", LEAVE:"leave", ACTION:"action", CHANGE:"change"};
goog.ui.Component.Error = {NOT_SUPPORTED:"Method not supported", DECORATE_INVALID:"Invalid element to decorate", ALREADY_RENDERED:"Component already rendered", PARENT_UNABLE_TO_BE_SET:"Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds", NOT_OUR_CHILD:"Child is not in parent component", NOT_IN_DOCUMENT:"Operation not supported while component is not in document", STATE_INVALID:"Invalid component state"};
goog.ui.Component.State = {ALL:255, DISABLED:1, HOVER:2, ACTIVE:4, SELECTED:8, CHECKED:16, FOCUSED:32, OPENED:64};
goog.ui.Component.getStateTransitionEvent = function $goog$ui$Component$getStateTransitionEvent$($state$$, $isEntering$$) {
  switch($state$$) {
    case goog.ui.Component.State.DISABLED:
      return $isEntering$$ ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
      return $isEntering$$ ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
      return $isEntering$$ ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
      return $isEntering$$ ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
      return $isEntering$$ ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
      return $isEntering$$ ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
      return $isEntering$$ ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
  }
  throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function $goog$ui$Component$setDefaultRightToLeft$($rightToLeft$$) {
  goog.ui.Component.defaultRightToLeft_ = $rightToLeft$$
};
goog.ui.Component.prototype.id_ = null;
goog.ui.Component.prototype.inDocument_ = !1;
goog.ui.Component.prototype.element_ = null;
goog.ui.Component.prototype.rightToLeft_ = null;
goog.ui.Component.prototype.model_ = null;
goog.ui.Component.prototype.parent_ = null;
goog.ui.Component.prototype.children_ = null;
goog.ui.Component.prototype.childIndex_ = null;
goog.ui.Component.prototype.wasDecorated_ = !1;
goog.ui.Component.prototype.getId = function $goog$ui$Component$$getId$() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function $goog$ui$Component$$setId$($id$$) {
  this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, $id$$, this));
  this.id_ = $id$$
};
goog.ui.Component.prototype.getElement = function $goog$ui$Component$$getElement$() {
  return this.element_
};
goog.ui.Component.prototype.getElementStrict = function $goog$ui$Component$$getElementStrict$() {
  var $el$$ = this.element_;
  goog.asserts.assert($el$$, "Can not call getElementStrict before rendering/decorating.");
  return $el$$
};
goog.ui.Component.prototype.setElementInternal = function $goog$ui$Component$$setElementInternal$($element$$) {
  this.element_ = $element$$
};
goog.ui.Component.prototype.getElementsByClass = function $goog$ui$Component$$getElementsByClass$($className$$) {
  return this.element_ ? this.dom_.getElementsByClass($className$$, this.element_) : []
};
goog.ui.Component.prototype.getElementByClass = function $goog$ui$Component$$getElementByClass$($className$$) {
  return this.element_ ? this.dom_.getElementByClass($className$$, this.element_) : null
};
goog.ui.Component.prototype.getHandler = function $goog$ui$Component$$getHandler$() {
  return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
};
goog.ui.Component.prototype.setParent = function $goog$ui$Component$$setParent$($parent$$) {
  if(this == $parent$$) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  if($parent$$ && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != $parent$$) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  this.parent_ = $parent$$;
  goog.ui.Component.superClass_.setParentEventTarget.call(this, $parent$$)
};
goog.ui.Component.prototype.getParent = function $goog$ui$Component$$getParent$() {
  return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function $goog$ui$Component$$setParentEventTarget$($parent$$) {
  if(this.parent_ && this.parent_ != $parent$$) {
    throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
  }
  goog.ui.Component.superClass_.setParentEventTarget.call(this, $parent$$)
};
goog.ui.Component.prototype.getDomHelper = function $goog$ui$Component$$getDomHelper$() {
  return this.dom_
};
goog.ui.Component.prototype.isInDocument = function $goog$ui$Component$$isInDocument$() {
  return this.inDocument_
};
goog.ui.Component.prototype.createDom = function $goog$ui$Component$$createDom$() {
  this.element_ = this.dom_.createElement("div")
};
goog.ui.Component.prototype.render = function $goog$ui$Component$$render$($opt_parentElement$$) {
  this.render_($opt_parentElement$$)
};
goog.ui.Component.prototype.renderBefore = function $goog$ui$Component$$renderBefore$($sibling$$) {
  this.render_($sibling$$.parentNode, $sibling$$)
};
goog.ui.Component.prototype.render_ = function $goog$ui$Component$$render_$($opt_parentElement$$, $opt_beforeNode$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.element_ || this.createDom();
  $opt_parentElement$$ ? $opt_parentElement$$.insertBefore(this.element_, $opt_beforeNode$$ || null) : this.dom_.getDocument().body.appendChild(this.element_);
  this.parent_ && !this.parent_.isInDocument() || this.enterDocument()
};
goog.ui.Component.prototype.decorate = function $goog$ui$Component$$decorate$($element$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if($element$$ && this.canDecorate($element$$)) {
    this.wasDecorated_ = !0, this.dom_ && this.dom_.getDocument() == goog.dom.getOwnerDocument($element$$) || (this.dom_ = goog.dom.getDomHelper($element$$)), this.decorateInternal($element$$), this.enterDocument()
  }else {
    throw Error(goog.ui.Component.Error.DECORATE_INVALID);
  }
};
goog.ui.Component.prototype.canDecorate = function $goog$ui$Component$$canDecorate$($element$$) {
  return!0
};
goog.ui.Component.prototype.wasDecorated = function $goog$ui$Component$$wasDecorated$() {
  return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function $goog$ui$Component$$decorateInternal$($element$$) {
  this.element_ = $element$$
};
goog.ui.Component.prototype.enterDocument = function $goog$ui$Component$$enterDocument$() {
  this.inDocument_ = !0;
  this.forEachChild(function($child$$) {
    !$child$$.isInDocument() && $child$$.getElement() && $child$$.enterDocument()
  })
};
goog.ui.Component.prototype.exitDocument = function $goog$ui$Component$$exitDocument$() {
  this.forEachChild(function($child$$) {
    $child$$.isInDocument() && $child$$.exitDocument()
  });
  this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
  this.inDocument_ = !1
};
goog.ui.Component.prototype.disposeInternal = function $goog$ui$Component$$disposeInternal$() {
  this.inDocument_ && this.exitDocument();
  this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
  this.forEachChild(function($child$$) {
    $child$$.dispose()
  });
  !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
  this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null;
  goog.ui.Component.superClass_.disposeInternal.call(this)
};
goog.ui.Component.prototype.makeId = function $goog$ui$Component$$makeId$($idFragment$$) {
  return this.getId() + "." + $idFragment$$
};
goog.ui.Component.prototype.makeIds = function $goog$ui$Component$$makeIds$($object$$) {
  var $ids$$ = {}, $key$$;
  for($key$$ in $object$$) {
    $ids$$[$key$$] = this.makeId($object$$[$key$$])
  }
  return $ids$$
};
goog.ui.Component.prototype.getModel = function $goog$ui$Component$$getModel$() {
  return this.model_
};
goog.ui.Component.prototype.setModel = function $goog$ui$Component$$setModel$($obj$$) {
  this.model_ = $obj$$
};
goog.ui.Component.prototype.getFragmentFromId = function $goog$ui$Component$$getFragmentFromId$($id$$) {
  return $id$$.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function $goog$ui$Component$$getElementByFragment$($idFragment$$) {
  if(!this.inDocument_) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  return this.dom_.getElement(this.makeId($idFragment$$))
};
goog.ui.Component.prototype.addChild = function $goog$ui$Component$$addChild$($child$$, $opt_render$$) {
  this.addChildAt($child$$, this.getChildCount(), $opt_render$$)
};
goog.ui.Component.prototype.addChildAt = function $goog$ui$Component$$addChildAt$($child$$, $index$$58_sibling$$, $contentElement_opt_render$$) {
  if($child$$.inDocument_ && ($contentElement_opt_render$$ || !this.inDocument_)) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if(0 > $index$$58_sibling$$ || $index$$58_sibling$$ > this.getChildCount()) {
    throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
  }
  this.childIndex_ && this.children_ || (this.childIndex_ = {}, this.children_ = []);
  $child$$.getParent() == this ? (goog.object.set(this.childIndex_, $child$$.getId(), $child$$), goog.array.remove(this.children_, $child$$)) : goog.object.add(this.childIndex_, $child$$.getId(), $child$$);
  $child$$.setParent(this);
  goog.array.insertAt(this.children_, $child$$, $index$$58_sibling$$);
  $child$$.inDocument_ && this.inDocument_ && $child$$.getParent() == this ? ($contentElement_opt_render$$ = this.getContentElement(), $contentElement_opt_render$$.insertBefore($child$$.getElement(), $contentElement_opt_render$$.childNodes[$index$$58_sibling$$] || null)) : $contentElement_opt_render$$ ? (this.element_ || this.createDom(), $index$$58_sibling$$ = this.getChildAt($index$$58_sibling$$ + 1), $child$$.render_(this.getContentElement(), $index$$58_sibling$$ ? $index$$58_sibling$$.element_ : 
  null)) : this.inDocument_ && !$child$$.inDocument_ && $child$$.element_ && $child$$.element_.parentNode && $child$$.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT && $child$$.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function $goog$ui$Component$$getContentElement$() {
  return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function $goog$ui$Component$$isRightToLeft$() {
  null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
  return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function $goog$ui$Component$$setRightToLeft$($rightToLeft$$) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.rightToLeft_ = $rightToLeft$$
};
goog.ui.Component.prototype.hasChildren = function $goog$ui$Component$$hasChildren$() {
  return!!this.children_ && 0 != this.children_.length
};
goog.ui.Component.prototype.getChildCount = function $goog$ui$Component$$getChildCount$() {
  return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function $goog$ui$Component$$getChildIds$() {
  var $ids$$ = [];
  this.forEachChild(function($child$$) {
    $ids$$.push($child$$.getId())
  });
  return $ids$$
};
goog.ui.Component.prototype.getChild = function $goog$ui$Component$$getChild$($id$$) {
  return this.childIndex_ && $id$$ ? goog.object.get(this.childIndex_, $id$$) || null : null
};
goog.ui.Component.prototype.getChildAt = function $goog$ui$Component$$getChildAt$($index$$) {
  return this.children_ ? this.children_[$index$$] || null : null
};
goog.ui.Component.prototype.forEachChild = function $goog$ui$Component$$forEachChild$($f$$, $opt_obj$$) {
  this.children_ && goog.array.forEach(this.children_, $f$$, $opt_obj$$)
};
goog.ui.Component.prototype.indexOfChild = function $goog$ui$Component$$indexOfChild$($child$$) {
  return this.children_ && $child$$ ? goog.array.indexOf(this.children_, $child$$) : -1
};
goog.ui.Component.prototype.removeChild = function $goog$ui$Component$$removeChild$($child$$, $opt_unrender$$) {
  if($child$$) {
    var $id$$ = goog.isString($child$$) ? $child$$ : $child$$.getId();
    $child$$ = this.getChild($id$$);
    $id$$ && $child$$ && (goog.object.remove(this.childIndex_, $id$$), goog.array.remove(this.children_, $child$$), $opt_unrender$$ && ($child$$.exitDocument(), $child$$.element_ && goog.dom.removeNode($child$$.element_)), $child$$.setParent(null))
  }
  if(!$child$$) {
    throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
  }
  return $child$$
};
goog.ui.Component.prototype.removeChildAt = function $goog$ui$Component$$removeChildAt$($index$$, $opt_unrender$$) {
  return this.removeChild(this.getChildAt($index$$), $opt_unrender$$)
};
goog.ui.Component.prototype.removeChildren = function $goog$ui$Component$$removeChildren$($opt_unrender$$) {
  for(var $removedChildren$$ = [];this.hasChildren();) {
    $removedChildren$$.push(this.removeChildAt(0, $opt_unrender$$))
  }
  return $removedChildren$$
};
goog.a11y = {};
goog.a11y.aria = {};
goog.a11y.aria.State = {ACTIVEDESCENDANT:"activedescendant", ATOMIC:"atomic", AUTOCOMPLETE:"autocomplete", BUSY:"busy", CHECKED:"checked", CONTROLS:"controls", DESCRIBEDBY:"describedby", DISABLED:"disabled", DROPEFFECT:"dropeffect", EXPANDED:"expanded", FLOWTO:"flowto", GRABBED:"grabbed", HASPOPUP:"haspopup", HIDDEN:"hidden", INVALID:"invalid", LABEL:"label", LABELLEDBY:"labelledby", LEVEL:"level", LIVE:"live", MULTILINE:"multiline", MULTISELECTABLE:"multiselectable", ORIENTATION:"orientation", OWNS:"owns", 
POSINSET:"posinset", PRESSED:"pressed", READONLY:"readonly", RELEVANT:"relevant", REQUIRED:"required", SELECTED:"selected", SETSIZE:"setsize", SORT:"sort", VALUEMAX:"valuemax", VALUEMIN:"valuemin", VALUENOW:"valuenow", VALUETEXT:"valuetext"};
goog.a11y.aria.Role = {ALERT:"alert", ALERTDIALOG:"alertdialog", APPLICATION:"application", ARTICLE:"article", BANNER:"banner", BUTTON:"button", CHECKBOX:"checkbox", COLUMNHEADER:"columnheader", COMBOBOX:"combobox", COMPLEMENTARY:"complementary", DIALOG:"dialog", DIRECTORY:"directory", DOCUMENT:"document", FORM:"form", GRID:"grid", GRIDCELL:"gridcell", GROUP:"group", HEADING:"heading", IMG:"img", LINK:"link", LIST:"list", LISTBOX:"listbox", LISTITEM:"listitem", LOG:"log", MAIN:"main", MARQUEE:"marquee", 
MATH:"math", MENU:"menu", MENUBAR:"menubar", MENU_ITEM:"menuitem", MENU_ITEM_CHECKBOX:"menuitemcheckbox", MENU_ITEM_RADIO:"menuitemradio", NAVIGATION:"navigation", NOTE:"note", OPTION:"option", PRESENTATION:"presentation", PROGRESSBAR:"progressbar", RADIO:"radio", RADIOGROUP:"radiogroup", REGION:"region", ROW:"row", ROWGROUP:"rowgroup", ROWHEADER:"rowheader", SCROLLBAR:"scrollbar", SEARCH:"search", SEPARATOR:"separator", SLIDER:"slider", SPINBUTTON:"spinbutton", STATUS:"status", TAB:"tab", TAB_LIST:"tablist", 
TAB_PANEL:"tabpanel", TEXTBOX:"textbox", TIMER:"timer", TOOLBAR:"toolbar", TOOLTIP:"tooltip", TREE:"tree", TREEGRID:"treegrid", TREEITEM:"treeitem"};
goog.a11y.aria.LivePriority = {OFF:"off", POLITE:"polite", ASSERTIVE:"assertive"};
goog.a11y.aria.setRole = function $goog$a11y$aria$setRole$($element$$, $roleName$$) {
  $element$$.setAttribute("role", $roleName$$)
};
goog.a11y.aria.getRole = function $goog$a11y$aria$getRole$($element$$) {
  return $element$$.getAttribute("role") || ""
};
goog.a11y.aria.setState = function $goog$a11y$aria$setState$($element$$, $state$$, $value$$) {
  $element$$.setAttribute("aria-" + $state$$, $value$$)
};
goog.a11y.aria.getState = function $goog$a11y$aria$getState$($element$$, $stateName$$) {
  var $attrb$$ = $element$$.getAttribute("aria-" + $stateName$$);
  return!0 === $attrb$$ || !1 === $attrb$$ ? $attrb$$ ? "true" : "false" : $attrb$$ ? String($attrb$$) : ""
};
goog.a11y.aria.getActiveDescendant = function $goog$a11y$aria$getActiveDescendant$($element$$) {
  var $id$$ = goog.a11y.aria.getState($element$$, goog.a11y.aria.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument($element$$).getElementById($id$$)
};
goog.a11y.aria.setActiveDescendant = function $goog$a11y$aria$setActiveDescendant$($element$$, $activeElement$$) {
  goog.a11y.aria.setState($element$$, goog.a11y.aria.State.ACTIVEDESCENDANT, $activeElement$$ ? $activeElement$$.id : "")
};
goog.events.KeyCodes = {WIN_KEY_FF_LINUX:0, MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, FF_SEMICOLON:59, FF_EQUALS:61, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, 
N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90, META:91, WIN_KEY_RIGHT:92, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SCROLL_LOCK:145, FIRST_MEDIA_KEY:166, LAST_MEDIA_KEY:183, 
SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, TILDE:192, SINGLE_QUOTE:222, OPEN_SQUARE_BRACKET:219, BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229, PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent = function $goog$events$KeyCodes$isTextModifyingKeyEvent$($e$$) {
  if($e$$.altKey && !$e$$.ctrlKey || $e$$.metaKey || $e$$.keyCode >= goog.events.KeyCodes.F1 && $e$$.keyCode <= goog.events.KeyCodes.F12) {
    return!1
  }
  switch($e$$.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.MAC_FF_META:
    ;
    case goog.events.KeyCodes.META:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.NUM_CENTER:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.PHANTOM:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.SCROLL_LOCK:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.WIN_KEY:
    ;
    case goog.events.KeyCodes.WIN_KEY_RIGHT:
      return!1;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return!goog.userAgent.GECKO;
    default:
      return $e$$.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || $e$$.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function $goog$events$KeyCodes$firesKeyPressEvent$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!(goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525"))) {
    return!0
  }
  if(goog.userAgent.MAC && $opt_altKey$$) {
    return goog.events.KeyCodes.isCharacterKey($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && ($opt_heldKeyCode$$ == goog.events.KeyCodes.CTRL || $opt_heldKeyCode$$ == goog.events.KeyCodes.ALT || goog.userAgent.MAC && $opt_heldKeyCode$$ == goog.events.KeyCodes.META)) {
    return!1
  }
  if(goog.userAgent.WEBKIT && $opt_ctrlKey$$ && $opt_shiftKey$$) {
    switch($keyCode$$) {
      case goog.events.KeyCodes.BACKSLASH:
      ;
      case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
      ;
      case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      ;
      case goog.events.KeyCodes.TILDE:
      ;
      case goog.events.KeyCodes.SEMICOLON:
      ;
      case goog.events.KeyCodes.DASH:
      ;
      case goog.events.KeyCodes.EQUALS:
      ;
      case goog.events.KeyCodes.COMMA:
      ;
      case goog.events.KeyCodes.PERIOD:
      ;
      case goog.events.KeyCodes.SLASH:
      ;
      case goog.events.KeyCodes.APOSTROPHE:
      ;
      case goog.events.KeyCodes.SINGLE_QUOTE:
        return!1
    }
  }
  if(goog.userAgent.IE && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return!1
  }
  switch($keyCode$$) {
    case goog.events.KeyCodes.ENTER:
      return!(goog.userAgent.IE && goog.userAgent.isDocumentMode(9));
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT
  }
  return goog.events.KeyCodes.isCharacterKey($keyCode$$)
};
goog.events.KeyCodes.isCharacterKey = function $goog$events$KeyCodes$isCharacterKey$($keyCode$$) {
  if($keyCode$$ >= goog.events.KeyCodes.ZERO && $keyCode$$ <= goog.events.KeyCodes.NINE || $keyCode$$ >= goog.events.KeyCodes.NUM_ZERO && $keyCode$$ <= goog.events.KeyCodes.NUM_MULTIPLY || $keyCode$$ >= goog.events.KeyCodes.A && $keyCode$$ <= goog.events.KeyCodes.Z || goog.userAgent.WEBKIT && 0 == $keyCode$$) {
    return!0
  }
  switch($keyCode$$) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.FF_SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.FF_EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return!0;
    default:
      return!1
  }
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function $goog$events$KeyCodes$normalizeGeckoKeyCode$($keyCode$$) {
  switch($keyCode$$) {
    case goog.events.KeyCodes.FF_EQUALS:
      return goog.events.KeyCodes.EQUALS;
    case goog.events.KeyCodes.FF_SEMICOLON:
      return goog.events.KeyCodes.SEMICOLON;
    case goog.events.KeyCodes.MAC_FF_META:
      return goog.events.KeyCodes.META;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
      return goog.events.KeyCodes.WIN_KEY;
    default:
      return $keyCode$$
  }
};
goog.ui.tree = {};
goog.ui.tree.BaseNode = function $goog$ui$tree$BaseNode$($html$$, $opt_config$$, $opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.config_ = $opt_config$$ || goog.ui.tree.TreeControl.defaultConfig;
  this.html_ = $html$$
};
goog.inherits(goog.ui.tree.BaseNode, goog.ui.Component);
goog.ui.tree.BaseNode.EventType = {BEFORE_EXPAND:"beforeexpand", EXPAND:"expand", BEFORE_COLLAPSE:"beforecollapse", COLLAPSE:"collapse"};
goog.ui.tree.BaseNode.allNodes = {};
goog.ui.tree.BaseNode.prototype.selected_ = !1;
goog.ui.tree.BaseNode.prototype.expanded_ = !1;
goog.ui.tree.BaseNode.prototype.toolTip_ = null;
goog.ui.tree.BaseNode.prototype.afterLabelHtml_ = "";
goog.ui.tree.BaseNode.prototype.isUserCollapsible_ = !0;
goog.ui.tree.BaseNode.prototype.depth_ = -1;
goog.ui.tree.BaseNode.prototype.disposeInternal = function $goog$ui$tree$BaseNode$$disposeInternal$() {
  goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this);
  this.tree_ && (this.tree_.removeNode(this), this.tree_ = null);
  this.setElementInternal(null)
};
goog.ui.tree.BaseNode.prototype.initAccessibility = function $goog$ui$tree$BaseNode$$initAccessibility$() {
  var $ce_count$$13_ei_el$$30_img$$ = this.getElement();
  if($ce_count$$13_ei_el$$30_img$$) {
    var $i$$86_label$$ = this.getLabelElement();
    $i$$86_label$$ && !$i$$86_label$$.id && ($i$$86_label$$.id = this.getId() + ".label");
    goog.a11y.aria.setRole($ce_count$$13_ei_el$$30_img$$, "treeitem");
    goog.a11y.aria.setState($ce_count$$13_ei_el$$30_img$$, "selected", !1);
    goog.a11y.aria.setState($ce_count$$13_ei_el$$30_img$$, "expanded", !1);
    goog.a11y.aria.setState($ce_count$$13_ei_el$$30_img$$, "level", this.getDepth());
    $i$$86_label$$ && goog.a11y.aria.setState($ce_count$$13_ei_el$$30_img$$, "labelledby", $i$$86_label$$.id);
    ($ce_count$$13_ei_el$$30_img$$ = this.getIconElement()) && goog.a11y.aria.setRole($ce_count$$13_ei_el$$30_img$$, "presentation");
    ($ce_count$$13_ei_el$$30_img$$ = this.getExpandIconElement()) && goog.a11y.aria.setRole($ce_count$$13_ei_el$$30_img$$, "presentation");
    if($ce_count$$13_ei_el$$30_img$$ = this.getChildrenElement()) {
      if(goog.a11y.aria.setRole($ce_count$$13_ei_el$$30_img$$, "group"), $ce_count$$13_ei_el$$30_img$$.hasChildNodes()) {
        for($ce_count$$13_ei_el$$30_img$$ = this.getChildCount(), $i$$86_label$$ = 1;$i$$86_label$$ <= $ce_count$$13_ei_el$$30_img$$;$i$$86_label$$++) {
          var $child$$ = this.getChildAt($i$$86_label$$ - 1).getElement();
          goog.asserts.assert($child$$, "The child element cannot be null");
          goog.a11y.aria.setState($child$$, "setsize", $ce_count$$13_ei_el$$30_img$$);
          goog.a11y.aria.setState($child$$, "posinset", $i$$86_label$$)
        }
      }
    }
  }
};
goog.ui.tree.BaseNode.prototype.createDom = function $goog$ui$tree$BaseNode$$createDom$() {
  var $element$$82_sb$$ = new goog.string.StringBuffer;
  this.toHtml($element$$82_sb$$);
  $element$$82_sb$$ = this.getDomHelper().htmlToDocumentFragment($element$$82_sb$$.toString());
  this.setElementInternal($element$$82_sb$$)
};
goog.ui.tree.BaseNode.prototype.enterDocument = function $goog$ui$tree$BaseNode$$enterDocument$() {
  goog.ui.tree.BaseNode.superClass_.enterDocument.call(this);
  goog.ui.tree.BaseNode.allNodes[this.getId()] = this;
  this.initAccessibility()
};
goog.ui.tree.BaseNode.prototype.exitDocument = function $goog$ui$tree$BaseNode$$exitDocument$() {
  goog.ui.tree.BaseNode.superClass_.exitDocument.call(this);
  delete goog.ui.tree.BaseNode.allNodes[this.getId()]
};
goog.ui.tree.BaseNode.prototype.addChildAt = function $goog$ui$tree$BaseNode$$addChildAt$($child$$, $el$$31_index$$, $opt_render$$) {
  goog.asserts.assert(!$child$$.getParent());
  $opt_render$$ = this.getChildAt($el$$31_index$$ - 1);
  var $nextNode$$ = this.getChildAt($el$$31_index$$);
  goog.ui.tree.BaseNode.superClass_.addChildAt.call(this, $child$$, $el$$31_index$$);
  $child$$.previousSibling_ = $opt_render$$;
  $child$$.nextSibling_ = $nextNode$$;
  $opt_render$$ ? $opt_render$$.nextSibling_ = $child$$ : this.firstChild_ = $child$$;
  $nextNode$$ ? $nextNode$$.previousSibling_ = $child$$ : this.lastChild_ = $child$$;
  ($el$$31_index$$ = this.getTree()) && $child$$.setTreeInternal($el$$31_index$$);
  $child$$.setDepth_(this.getDepth() + 1);
  if(this.getElement() && (this.updateExpandIcon(), this.getExpanded())) {
    $el$$31_index$$ = this.getChildrenElement();
    $child$$.getElement() || $child$$.createDom();
    var $childElement$$ = $child$$.getElement(), $nextElement$$ = $nextNode$$ && $nextNode$$.getElement();
    $el$$31_index$$.insertBefore($childElement$$, $nextElement$$);
    this.isInDocument() && $child$$.enterDocument();
    $nextNode$$ || ($opt_render$$ ? $opt_render$$.updateExpandIcon() : (goog.style.showElement($el$$31_index$$, !0), this.setExpanded(this.getExpanded())))
  }
};
goog.ui.tree.BaseNode.prototype.add = function $goog$ui$tree$BaseNode$$add$($child$$, $opt_before$$) {
  goog.asserts.assert(!$opt_before$$ || $opt_before$$.getParent() == this, "Can only add nodes before siblings");
  $child$$.getParent() && $child$$.getParent().removeChild($child$$);
  this.addChildAt($child$$, $opt_before$$ ? this.indexOfChild($opt_before$$) : this.getChildCount());
  return $child$$
};
goog.ui.tree.BaseNode.prototype.removeChild = function $goog$ui$tree$BaseNode$$removeChild$($childNode$$, $opt_unrender$$) {
  var $el$$32_tree$$ = this.getTree(), $newLast_selectedNode_wasLast$$ = $el$$32_tree$$ ? $el$$32_tree$$.getSelectedItem() : null;
  if($newLast_selectedNode_wasLast$$ == $childNode$$ || $childNode$$.contains($newLast_selectedNode_wasLast$$)) {
    $el$$32_tree$$.hasFocus() ? (this.select(), goog.Timer.callOnce(this.onTimeoutSelect_, 10, this)) : this.select()
  }
  goog.ui.tree.BaseNode.superClass_.removeChild.call(this, $childNode$$);
  this.lastChild_ == $childNode$$ && (this.lastChild_ = $childNode$$.previousSibling_);
  this.firstChild_ == $childNode$$ && (this.firstChild_ = $childNode$$.nextSibling_);
  $childNode$$.previousSibling_ && ($childNode$$.previousSibling_.nextSibling_ = $childNode$$.nextSibling_);
  $childNode$$.nextSibling_ && ($childNode$$.nextSibling_.previousSibling_ = $childNode$$.previousSibling_);
  $newLast_selectedNode_wasLast$$ = $childNode$$.isLastSibling();
  $childNode$$.tree_ = null;
  $childNode$$.depth_ = -1;
  if($el$$32_tree$$ && ($el$$32_tree$$.removeNode(this), this.isInDocument())) {
    $el$$32_tree$$ = this.getChildrenElement();
    if($childNode$$.isInDocument()) {
      var $childEl$$ = $childNode$$.getElement();
      $el$$32_tree$$.removeChild($childEl$$);
      $childNode$$.exitDocument()
    }
    $newLast_selectedNode_wasLast$$ && ($newLast_selectedNode_wasLast$$ = this.getLastChild()) && $newLast_selectedNode_wasLast$$.updateExpandIcon();
    this.hasChildren() || ($el$$32_tree$$.style.display = "none", this.updateExpandIcon(), this.updateIcon_())
  }
  return $childNode$$
};
goog.ui.tree.BaseNode.prototype.remove = goog.ui.tree.BaseNode.prototype.removeChild;
goog.ui.tree.BaseNode.prototype.onTimeoutSelect_ = function $goog$ui$tree$BaseNode$$onTimeoutSelect_$() {
  this.select()
};
goog.ui.tree.BaseNode.prototype.getDepth = function $goog$ui$tree$BaseNode$$getDepth$() {
  var $depth$$ = this.depth_;
  0 > $depth$$ && ($depth$$ = this.computeDepth_(), this.setDepth_($depth$$));
  return $depth$$
};
goog.ui.tree.BaseNode.prototype.computeDepth_ = function $goog$ui$tree$BaseNode$$computeDepth_$() {
  var $parent$$ = this.getParent();
  return $parent$$ ? $parent$$.getDepth() + 1 : 0
};
goog.ui.tree.BaseNode.prototype.setDepth_ = function $goog$ui$tree$BaseNode$$setDepth_$($depth$$) {
  if($depth$$ != this.depth_) {
    this.depth_ = $depth$$;
    var $row$$ = this.getRowElement();
    if($row$$) {
      var $indent$$ = this.getPixelIndent_() + "px";
      this.isRightToLeft() ? $row$$.style.paddingRight = $indent$$ : $row$$.style.paddingLeft = $indent$$
    }
    this.forEachChild(function($child$$) {
      $child$$.setDepth_($depth$$ + 1)
    })
  }
};
goog.ui.tree.BaseNode.prototype.contains = function $goog$ui$tree$BaseNode$$contains$($current$$2_node$$) {
  for(;$current$$2_node$$;) {
    if($current$$2_node$$ == this) {
      return!0
    }
    $current$$2_node$$ = $current$$2_node$$.getParent()
  }
  return!1
};
goog.ui.tree.BaseNode.EMPTY_CHILDREN_ = [];
goog.ui.tree.BaseNode.prototype.getChildren = function $goog$ui$tree$BaseNode$$getChildren$() {
  var $children$$ = [];
  this.forEachChild(function($child$$) {
    $children$$.push($child$$)
  });
  return $children$$
};
goog.ui.tree.BaseNode.prototype.getFirstChild = function $goog$ui$tree$BaseNode$$getFirstChild$() {
  return this.getChildAt(0)
};
goog.ui.tree.BaseNode.prototype.getLastChild = function $goog$ui$tree$BaseNode$$getLastChild$() {
  return this.getChildAt(this.getChildCount() - 1)
};
goog.ui.tree.BaseNode.prototype.getPreviousSibling = function $goog$ui$tree$BaseNode$$getPreviousSibling$() {
  return this.previousSibling_
};
goog.ui.tree.BaseNode.prototype.getNextSibling = function $goog$ui$tree$BaseNode$$getNextSibling$() {
  return this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isLastSibling = function $goog$ui$tree$BaseNode$$isLastSibling$() {
  return!this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isSelected = function $goog$ui$tree$BaseNode$$isSelected$() {
  return this.selected_
};
goog.ui.tree.BaseNode.prototype.select = function $goog$ui$tree$BaseNode$$select$() {
  var $tree$$ = this.getTree();
  $tree$$ && $tree$$.setSelectedItem(this)
};
goog.ui.tree.BaseNode.prototype.deselect = goog.nullFunction;
goog.ui.tree.BaseNode.prototype.setSelectedInternal = function $goog$ui$tree$BaseNode$$setSelectedInternal$($selected_treeElement$$) {
  if(this.selected_ != $selected_treeElement$$) {
    this.selected_ = $selected_treeElement$$;
    this.updateRow();
    var $el$$ = this.getElement();
    $el$$ && (goog.a11y.aria.setState($el$$, "selected", $selected_treeElement$$), $selected_treeElement$$ && ($selected_treeElement$$ = this.getTree().getElement(), goog.asserts.assert($selected_treeElement$$, "The DOM element for the tree cannot be null"), goog.a11y.aria.setState($selected_treeElement$$, "activedescendant", this.getId())))
  }
};
goog.ui.tree.BaseNode.prototype.getExpanded = function $goog$ui$tree$BaseNode$$getExpanded$() {
  return this.expanded_
};
goog.ui.tree.BaseNode.prototype.setExpandedInternal = function $goog$ui$tree$BaseNode$$setExpandedInternal$($expanded$$) {
  this.expanded_ = $expanded$$
};
goog.ui.tree.BaseNode.prototype.setExpanded = function $goog$ui$tree$BaseNode$$setExpanded$($expanded$$) {
  var $isStateChange$$ = $expanded$$ != this.expanded_;
  if(!$isStateChange$$ || this.dispatchEvent($expanded$$ ? goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND : goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE)) {
    var $ce$$1_tree$$;
    this.expanded_ = $expanded$$;
    $ce$$1_tree$$ = this.getTree();
    var $el$$ = this.getElement();
    if(this.hasChildren()) {
      if(!$expanded$$ && $ce$$1_tree$$ && this.contains($ce$$1_tree$$.getSelectedItem()) && this.select(), $el$$) {
        if($ce$$1_tree$$ = this.getChildrenElement()) {
          if(goog.style.showElement($ce$$1_tree$$, $expanded$$), $expanded$$ && this.isInDocument() && !$ce$$1_tree$$.hasChildNodes()) {
            var $sb$$ = new goog.string.StringBuffer;
            this.forEachChild(function($child$$) {
              $child$$.toHtml($sb$$)
            });
            $ce$$1_tree$$.innerHTML = $sb$$.toString();
            this.forEachChild(function($child$$) {
              $child$$.enterDocument()
            })
          }
        }
        this.updateExpandIcon()
      }
    }else {
      ($ce$$1_tree$$ = this.getChildrenElement()) && goog.style.showElement($ce$$1_tree$$, !1)
    }
    $el$$ && (this.updateIcon_(), goog.a11y.aria.setState($el$$, "expanded", $expanded$$));
    $isStateChange$$ && this.dispatchEvent($expanded$$ ? goog.ui.tree.BaseNode.EventType.EXPAND : goog.ui.tree.BaseNode.EventType.COLLAPSE)
  }
};
goog.ui.tree.BaseNode.prototype.toggle = function $goog$ui$tree$BaseNode$$toggle$() {
  this.setExpanded(!this.getExpanded())
};
goog.ui.tree.BaseNode.prototype.expand = function $goog$ui$tree$BaseNode$$expand$() {
  this.setExpanded(!0)
};
goog.ui.tree.BaseNode.prototype.collapse = function $goog$ui$tree$BaseNode$$collapse$() {
  this.setExpanded(!1)
};
goog.ui.tree.BaseNode.prototype.collapseChildren = function $goog$ui$tree$BaseNode$$collapseChildren$() {
  this.forEachChild(function($child$$) {
    $child$$.collapseAll()
  })
};
goog.ui.tree.BaseNode.prototype.collapseAll = function $goog$ui$tree$BaseNode$$collapseAll$() {
  this.collapseChildren();
  this.collapse()
};
goog.ui.tree.BaseNode.prototype.expandChildren = function $goog$ui$tree$BaseNode$$expandChildren$() {
  this.forEachChild(function($child$$) {
    $child$$.expandAll()
  })
};
goog.ui.tree.BaseNode.prototype.expandAll = function $goog$ui$tree$BaseNode$$expandAll$() {
  this.expandChildren();
  this.expand()
};
goog.ui.tree.BaseNode.prototype.reveal = function $goog$ui$tree$BaseNode$$reveal$() {
  var $parent$$ = this.getParent();
  $parent$$ && ($parent$$.setExpanded(!0), $parent$$.reveal())
};
goog.ui.tree.BaseNode.prototype.setIsUserCollapsible = function $goog$ui$tree$BaseNode$$setIsUserCollapsible$($isCollapsible$$) {
  (this.isUserCollapsible_ = $isCollapsible$$) || this.expand();
  this.getElement() && this.updateExpandIcon()
};
goog.ui.tree.BaseNode.prototype.isUserCollapsible = function $goog$ui$tree$BaseNode$$isUserCollapsible$() {
  return this.isUserCollapsible_
};
goog.ui.tree.BaseNode.prototype.toHtml = function $goog$ui$tree$BaseNode$$toHtml$($sb$$) {
  var $childClass_tree$$ = this.getTree(), $childClass_tree$$ = !$childClass_tree$$.getShowLines() || $childClass_tree$$ == this.getParent() && !$childClass_tree$$.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren, $nonEmptyAndExpanded$$ = this.getExpanded() && this.hasChildren();
  $sb$$.append('<div class="', this.config_.cssItem, '" id="', this.getId(), '">', this.getRowHtml(), '<div class="', $childClass_tree$$, '" style="', this.getLineStyle(), $nonEmptyAndExpanded$$ ? "" : "display:none;", '">');
  $nonEmptyAndExpanded$$ && this.forEachChild(function($child$$) {
    $child$$.toHtml($sb$$)
  });
  $sb$$.append("</div></div>")
};
goog.ui.tree.BaseNode.prototype.getPixelIndent_ = function $goog$ui$tree$BaseNode$$getPixelIndent_$() {
  return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth)
};
goog.ui.tree.BaseNode.prototype.getRowHtml = function $goog$ui$tree$BaseNode$$getRowHtml$() {
  var $sb$$ = new goog.string.StringBuffer;
  $sb$$.append('<div class="', this.getRowClassName(), '" style="padding-', this.isRightToLeft() ? "right:" : "left:", this.getPixelIndent_(), 'px">', this.getExpandIconHtml(), this.getIconHtml(), this.getLabelHtml(), "</div>");
  return $sb$$.toString()
};
goog.ui.tree.BaseNode.prototype.getRowClassName = function $goog$ui$tree$BaseNode$$getRowClassName$() {
  var $selectedClass$$;
  $selectedClass$$ = this.isSelected() ? " " + this.config_.cssSelectedRow : "";
  return this.config_.cssTreeRow + $selectedClass$$
};
goog.ui.tree.BaseNode.prototype.getLabelHtml = function $goog$ui$tree$BaseNode$$getLabelHtml$() {
  var $toolTip$$ = this.getToolTip(), $sb$$ = new goog.string.StringBuffer;
  $sb$$.append('<span class="', this.config_.cssItemLabel, '"', $toolTip$$ ? ' title="' + goog.string.htmlEscape($toolTip$$) + '"' : "", ">", this.getHtml(), "</span>", "<span>", this.getAfterLabelHtml(), "</span>");
  return $sb$$.toString()
};
goog.ui.tree.BaseNode.prototype.getAfterLabelHtml = function $goog$ui$tree$BaseNode$$getAfterLabelHtml$() {
  return this.afterLabelHtml_
};
goog.ui.tree.BaseNode.prototype.setAfterLabelHtml = function $goog$ui$tree$BaseNode$$setAfterLabelHtml$($html$$) {
  this.afterLabelHtml_ = $html$$;
  var $el$$ = this.getAfterLabelElement();
  $el$$ && ($el$$.innerHTML = $html$$)
};
goog.ui.tree.BaseNode.prototype.getIconHtml = function $goog$ui$tree$BaseNode$$getIconHtml$() {
  return'<span style="display:inline-block" class="' + this.getCalculatedIconClass() + '"></span>'
};
goog.ui.tree.BaseNode.prototype.getExpandIconHtml = function $goog$ui$tree$BaseNode$$getExpandIconHtml$() {
  return'<span type="expand" style="display:inline-block" class="' + this.getExpandIconClass() + '"></span>'
};
goog.ui.tree.BaseNode.prototype.getExpandIconClass = function $goog$ui$tree$BaseNode$$getExpandIconClass$() {
  var $tree$$ = this.getTree(), $hideLines$$ = !$tree$$.getShowLines() || $tree$$ == this.getParent() && !$tree$$.getShowRootLines(), $config$$ = this.config_, $sb$$ = new goog.string.StringBuffer;
  $sb$$.append($config$$.cssTreeIcon, " ", $config$$.cssExpandTreeIcon, " ");
  if(this.hasChildren()) {
    var $bits$$ = 0;
    $tree$$.getShowExpandIcons() && this.isUserCollapsible_ && ($bits$$ = this.getExpanded() ? 2 : 1);
    $hideLines$$ || ($bits$$ = this.isLastSibling() ? $bits$$ + 4 : $bits$$ + 8);
    switch($bits$$) {
      case 1:
        $sb$$.append($config$$.cssExpandTreeIconPlus);
        break;
      case 2:
        $sb$$.append($config$$.cssExpandTreeIconMinus);
        break;
      case 4:
        $sb$$.append($config$$.cssExpandTreeIconL);
        break;
      case 5:
        $sb$$.append($config$$.cssExpandTreeIconLPlus);
        break;
      case 6:
        $sb$$.append($config$$.cssExpandTreeIconLMinus);
        break;
      case 8:
        $sb$$.append($config$$.cssExpandTreeIconT);
        break;
      case 9:
        $sb$$.append($config$$.cssExpandTreeIconTPlus);
        break;
      case 10:
        $sb$$.append($config$$.cssExpandTreeIconTMinus);
        break;
      default:
        $sb$$.append($config$$.cssExpandTreeIconBlank)
    }
  }else {
    $hideLines$$ ? $sb$$.append($config$$.cssExpandTreeIconBlank) : this.isLastSibling() ? $sb$$.append($config$$.cssExpandTreeIconL) : $sb$$.append($config$$.cssExpandTreeIconT)
  }
  return $sb$$.toString()
};
goog.ui.tree.BaseNode.prototype.getLineStyle = function $goog$ui$tree$BaseNode$$getLineStyle$() {
  return"background-position:" + this.getLineStyle2() + ";"
};
goog.ui.tree.BaseNode.prototype.getLineStyle2 = function $goog$ui$tree$BaseNode$$getLineStyle2$() {
  return(this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0"
};
goog.ui.tree.BaseNode.prototype.getElement = function $goog$ui$tree$BaseNode$$getElement$() {
  var $el$$ = goog.ui.tree.BaseNode.superClass_.getElement.call(this);
  $el$$ || ($el$$ = this.getDomHelper().getElement(this.getId()), this.setElementInternal($el$$));
  return $el$$
};
goog.ui.tree.BaseNode.prototype.getRowElement = function $goog$ui$tree$BaseNode$$getRowElement$() {
  var $el$$ = this.getElement();
  return $el$$ ? $el$$.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getExpandIconElement = function $goog$ui$tree$BaseNode$$getExpandIconElement$() {
  var $el$$ = this.getRowElement();
  return $el$$ ? $el$$.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getIconElement = function $goog$ui$tree$BaseNode$$getIconElement$() {
  var $el$$ = this.getRowElement();
  return $el$$ ? $el$$.childNodes[1] : null
};
goog.ui.tree.BaseNode.prototype.getLabelElement = function $goog$ui$tree$BaseNode$$getLabelElement$() {
  var $el$$ = this.getRowElement();
  return $el$$ && $el$$.lastChild ? $el$$.lastChild.previousSibling : null
};
goog.ui.tree.BaseNode.prototype.getAfterLabelElement = function $goog$ui$tree$BaseNode$$getAfterLabelElement$() {
  var $el$$ = this.getRowElement();
  return $el$$ ? $el$$.lastChild : null
};
goog.ui.tree.BaseNode.prototype.getChildrenElement = function $goog$ui$tree$BaseNode$$getChildrenElement$() {
  var $el$$ = this.getElement();
  return $el$$ ? $el$$.lastChild : null
};
goog.ui.tree.BaseNode.prototype.setIconClass = function $goog$ui$tree$BaseNode$$setIconClass$($s$$) {
  this.iconClass_ = $s$$;
  this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getIconClass = function $goog$ui$tree$BaseNode$$getIconClass$() {
  return this.iconClass_
};
goog.ui.tree.BaseNode.prototype.setExpandedIconClass = function $goog$ui$tree$BaseNode$$setExpandedIconClass$($s$$) {
  this.expandedIconClass_ = $s$$;
  this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getExpandedIconClass = function $goog$ui$tree$BaseNode$$getExpandedIconClass$() {
  return this.expandedIconClass_
};
goog.ui.tree.BaseNode.prototype.setText = function $goog$ui$tree$BaseNode$$setText$($s$$) {
  this.setHtml(goog.string.htmlEscape($s$$))
};
goog.ui.tree.BaseNode.prototype.getText = function $goog$ui$tree$BaseNode$$getText$() {
  return goog.string.unescapeEntities(this.getHtml())
};
goog.ui.tree.BaseNode.prototype.setHtml = function $goog$ui$tree$BaseNode$$setHtml$($s$$21_tree$$) {
  this.html_ = $s$$21_tree$$;
  var $el$$ = this.getLabelElement();
  $el$$ && ($el$$.innerHTML = $s$$21_tree$$);
  ($s$$21_tree$$ = this.getTree()) && $s$$21_tree$$.setNode(this)
};
goog.ui.tree.BaseNode.prototype.getHtml = function $goog$ui$tree$BaseNode$$getHtml$() {
  return this.html_
};
goog.ui.tree.BaseNode.prototype.setToolTip = function $goog$ui$tree$BaseNode$$setToolTip$($s$$) {
  this.toolTip_ = $s$$;
  var $el$$ = this.getLabelElement();
  $el$$ && ($el$$.title = $s$$)
};
goog.ui.tree.BaseNode.prototype.getToolTip = function $goog$ui$tree$BaseNode$$getToolTip$() {
  return this.toolTip_
};
goog.ui.tree.BaseNode.prototype.updateRow = function $goog$ui$tree$BaseNode$$updateRow$() {
  var $rowEl$$ = this.getRowElement();
  $rowEl$$ && ($rowEl$$.className = this.getRowClassName())
};
goog.ui.tree.BaseNode.prototype.updateExpandIcon = function $goog$ui$tree$BaseNode$$updateExpandIcon$() {
  var $cel_img$$ = this.getExpandIconElement();
  $cel_img$$ && ($cel_img$$.className = this.getExpandIconClass());
  if($cel_img$$ = this.getChildrenElement()) {
    $cel_img$$.style.backgroundPosition = this.getLineStyle2()
  }
};
goog.ui.tree.BaseNode.prototype.updateIcon_ = function $goog$ui$tree$BaseNode$$updateIcon_$() {
  this.getIconElement().className = this.getCalculatedIconClass()
};
goog.ui.tree.BaseNode.prototype.onMouseDown = function $goog$ui$tree$BaseNode$$onMouseDown$($e$$) {
  "expand" == $e$$.target.getAttribute("type") && this.hasChildren() ? this.isUserCollapsible_ && this.toggle() : (this.select(), this.updateRow())
};
goog.ui.tree.BaseNode.prototype.onClick_ = goog.events.Event.preventDefault;
goog.ui.tree.BaseNode.prototype.onDoubleClick_ = function $goog$ui$tree$BaseNode$$onDoubleClick_$($e$$) {
  "expand" == $e$$.target.getAttribute("type") && this.hasChildren() || this.isUserCollapsible_ && this.toggle()
};
goog.ui.tree.BaseNode.prototype.onKeyDown = function $goog$ui$tree$BaseNode$$onKeyDown$($e$$) {
  var $handled$$ = !0;
  switch($e$$.keyCode) {
    case goog.events.KeyCodes.RIGHT:
      if($e$$.altKey) {
        break
      }
      this.hasChildren() && (this.getExpanded() ? this.getFirstChild().select() : this.setExpanded(!0));
      break;
    case goog.events.KeyCodes.LEFT:
      if($e$$.altKey) {
        break
      }
      if(this.hasChildren() && this.getExpanded() && this.isUserCollapsible_) {
        this.setExpanded(!1)
      }else {
        var $nextNode$$1_parent$$ = this.getParent(), $tree$$ = this.getTree();
        $nextNode$$1_parent$$ && ($tree$$.getShowRootNode() || $nextNode$$1_parent$$ != $tree$$) && $nextNode$$1_parent$$.select()
      }
      break;
    case goog.events.KeyCodes.DOWN:
      ($nextNode$$1_parent$$ = this.getNextShownNode()) && $nextNode$$1_parent$$.select();
      break;
    case goog.events.KeyCodes.UP:
      ($nextNode$$1_parent$$ = this.getPreviousShownNode()) && $nextNode$$1_parent$$.select();
      break;
    default:
      $handled$$ = !1
  }
  $handled$$ && ($e$$.preventDefault(), ($tree$$ = this.getTree()) && $tree$$.clearTypeAhead());
  return $handled$$
};
goog.ui.tree.BaseNode.prototype.onKeyPress_ = function $goog$ui$tree$BaseNode$$onKeyPress_$($e$$) {
  !$e$$.altKey && $e$$.keyCode >= goog.events.KeyCodes.LEFT && $e$$.keyCode <= goog.events.KeyCodes.DOWN && $e$$.preventDefault()
};
goog.ui.tree.BaseNode.prototype.getLastShownDescendant = function $goog$ui$tree$BaseNode$$getLastShownDescendant$() {
  return this.getExpanded() && this.hasChildren() ? this.getLastChild().getLastShownDescendant() : this
};
goog.ui.tree.BaseNode.prototype.getNextShownNode = function $goog$ui$tree$BaseNode$$getNextShownNode$() {
  if(this.hasChildren() && this.getExpanded()) {
    return this.getFirstChild()
  }
  for(var $parent$$ = this, $next$$;$parent$$ != this.getTree();) {
    $next$$ = $parent$$.getNextSibling();
    if(null != $next$$) {
      return $next$$
    }
    $parent$$ = $parent$$.getParent()
  }
  return null
};
goog.ui.tree.BaseNode.prototype.getPreviousShownNode = function $goog$ui$tree$BaseNode$$getPreviousShownNode$() {
  var $parent$$ = this.getPreviousSibling();
  if(null != $parent$$) {
    return $parent$$.getLastShownDescendant()
  }
  var $parent$$ = this.getParent(), $tree$$ = this.getTree();
  return $tree$$.getShowRootNode() || $parent$$ != $tree$$ ? $parent$$ : null
};
goog.ui.tree.BaseNode.prototype.getClientData = goog.ui.tree.BaseNode.prototype.getModel;
goog.ui.tree.BaseNode.prototype.setClientData = goog.ui.tree.BaseNode.prototype.setModel;
goog.ui.tree.BaseNode.prototype.getConfig = function $goog$ui$tree$BaseNode$$getConfig$() {
  return this.config_
};
goog.ui.tree.BaseNode.prototype.setTreeInternal = function $goog$ui$tree$BaseNode$$setTreeInternal$($tree$$) {
  this.tree_ != $tree$$ && (this.tree_ = $tree$$, $tree$$.setNode(this), this.forEachChild(function($child$$) {
    $child$$.setTreeInternal($tree$$)
  }))
};
goog.ui.tree.TreeNode = function $goog$ui$tree$TreeNode$($html$$, $opt_config$$, $opt_domHelper$$) {
  goog.ui.tree.BaseNode.call(this, $html$$, $opt_config$$, $opt_domHelper$$)
};
goog.inherits(goog.ui.tree.TreeNode, goog.ui.tree.BaseNode);
goog.ui.tree.TreeNode.prototype.tree_ = null;
goog.ui.tree.TreeNode.prototype.getTree = function $goog$ui$tree$TreeNode$$getTree$() {
  if(this.tree_) {
    return this.tree_
  }
  var $parent$$28_tree$$ = this.getParent();
  return $parent$$28_tree$$ && ($parent$$28_tree$$ = $parent$$28_tree$$.getTree()) ? (this.setTreeInternal($parent$$28_tree$$), $parent$$28_tree$$) : null
};
goog.ui.tree.TreeNode.prototype.getCalculatedIconClass = function $goog$ui$tree$TreeNode$$getCalculatedIconClass$() {
  var $expanded$$ = this.getExpanded();
  if($expanded$$ && this.expandedIconClass_) {
    return this.expandedIconClass_
  }
  if(!$expanded$$ && this.iconClass_) {
    return this.iconClass_
  }
  var $config$$ = this.getConfig();
  if(this.hasChildren()) {
    if($expanded$$ && $config$$.cssExpandedFolderIcon) {
      return $config$$.cssTreeIcon + " " + $config$$.cssExpandedFolderIcon
    }
    if(!$expanded$$ && $config$$.cssCollapsedFolderIcon) {
      return $config$$.cssTreeIcon + " " + $config$$.cssCollapsedFolderIcon
    }
  }else {
    if($config$$.cssFileIcon) {
      return $config$$.cssTreeIcon + " " + $config$$.cssFileIcon
    }
  }
  return""
};
Blockly.ContextMenu = {};
Blockly.ContextMenu.X_PADDING = 20;
Blockly.ContextMenu.Y_HEIGHT = 20;
Blockly.ContextMenu.visible = !1;
Blockly.ContextMenu.createDom = function $Blockly$ContextMenu$createDom$() {
  var $svgGroup$$ = Blockly.createSvgElement("g", {"class":"blocklyHidden"}, null);
  Blockly.ContextMenu.svgGroup = $svgGroup$$;
  Blockly.ContextMenu.svgShadow = Blockly.createSvgElement("rect", {"class":"blocklyContextMenuShadow", x:2, y:-2, rx:4, ry:4}, $svgGroup$$);
  Blockly.ContextMenu.svgBackground = Blockly.createSvgElement("rect", {"class":"blocklyContextMenuBackground", y:-4, rx:4, ry:4}, $svgGroup$$);
  Blockly.ContextMenu.svgOptions = Blockly.createSvgElement("g", {"class":"blocklyContextMenuOptions"}, $svgGroup$$);
  return $svgGroup$$
};
Blockly.ContextMenu.show = function $Blockly$ContextMenu$show$($xy$$, $options$$) {
  if($options$$.length) {
    goog.dom.removeChildren(Blockly.ContextMenu.svgOptions);
    Blockly.ContextMenu.svgGroup.style.display = "block";
    for(var $anchorX_maxWidth$$ = 0, $anchorY_resizeList$$ = [Blockly.ContextMenu.svgBackground, Blockly.ContextMenu.svgShadow], $bBox$$1_x$$ = 0, $option_svgSize$$;$option_svgSize$$ = $options$$[$bBox$$1_x$$];$bBox$$1_x$$++) {
      var $gElement$$ = Blockly.ContextMenu.optionToDom($option_svgSize$$.text), $rectElement$$ = $gElement$$.firstChild, $textElement$$ = $gElement$$.lastChild;
      Blockly.ContextMenu.svgOptions.appendChild($gElement$$);
      $gElement$$.setAttribute("transform", "translate(0, " + $bBox$$1_x$$ * Blockly.ContextMenu.Y_HEIGHT + ")");
      $anchorY_resizeList$$.push($rectElement$$);
      Blockly.bindEvent_($gElement$$, "mousedown", null, Blockly.noEvent);
      $option_svgSize$$.enabled ? (Blockly.bindEvent_($gElement$$, "mouseup", null, $option_svgSize$$.callback), Blockly.bindEvent_($gElement$$, "mouseup", null, Blockly.ContextMenu.hide)) : $gElement$$.setAttribute("class", "blocklyMenuDivDisabled");
      $anchorX_maxWidth$$ = Math.max($anchorX_maxWidth$$, $textElement$$.getComputedTextLength())
    }
    $anchorX_maxWidth$$ += 2 * Blockly.ContextMenu.X_PADDING;
    for($bBox$$1_x$$ = 0;$bBox$$1_x$$ < $anchorY_resizeList$$.length;$bBox$$1_x$$++) {
      $anchorY_resizeList$$[$bBox$$1_x$$].setAttribute("width", $anchorX_maxWidth$$)
    }
    if(Blockly.RTL) {
      for($bBox$$1_x$$ = 0;$gElement$$ = Blockly.ContextMenu.svgOptions.childNodes[$bBox$$1_x$$];$bBox$$1_x$$++) {
        $textElement$$ = $gElement$$.lastChild, $textElement$$.setAttribute("text-anchor", "end"), $textElement$$.setAttribute("x", $anchorX_maxWidth$$ - Blockly.ContextMenu.X_PADDING)
      }
    }
    Blockly.ContextMenu.svgBackground.setAttribute("height", $options$$.length * Blockly.ContextMenu.Y_HEIGHT + 8);
    Blockly.ContextMenu.svgShadow.setAttribute("height", $options$$.length * Blockly.ContextMenu.Y_HEIGHT + 10);
    $anchorX_maxWidth$$ = $xy$$.x;
    $anchorY_resizeList$$ = $xy$$.y;
    0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? (Blockly.ContextMenu.svgGroup.style.display = "inline", $bBox$$1_x$$ = {x:Blockly.ContextMenu.svgGroup.getBBox().x, y:Blockly.ContextMenu.svgGroup.getBBox().y, width:Blockly.ContextMenu.svgGroup.scrollWidth, height:Blockly.ContextMenu.svgGroup.scrollHeight}) : $bBox$$1_x$$ = Blockly.ContextMenu.svgGroup.getBBox();
    $option_svgSize$$ = Blockly.svgSize();
    $anchorY_resizeList$$ + $bBox$$1_x$$.height > $option_svgSize$$.height && ($anchorY_resizeList$$ -= $bBox$$1_x$$.height - 10);
    Blockly.RTL ? 0 >= $anchorX_maxWidth$$ - $bBox$$1_x$$.width ? $anchorX_maxWidth$$++ : $anchorX_maxWidth$$ -= $bBox$$1_x$$.width : $anchorX_maxWidth$$ + $bBox$$1_x$$.width > $option_svgSize$$.width ? $anchorX_maxWidth$$ -= $bBox$$1_x$$.width : $anchorX_maxWidth$$++;
    Blockly.ContextMenu.svgGroup.setAttribute("transform", "translate(" + $anchorX_maxWidth$$ + ", " + $anchorY_resizeList$$ + ")");
    Blockly.ContextMenu.visible = !0
  }else {
    Blockly.ContextMenu.hide()
  }
};
Blockly.ContextMenu.optionToDom = function $Blockly$ContextMenu$optionToDom$($text$$17_textNode$$) {
  var $gElement$$ = Blockly.createSvgElement("g", {"class":"blocklyMenuDiv"}, null);
  Blockly.createSvgElement("rect", {height:Blockly.ContextMenu.Y_HEIGHT}, $gElement$$);
  var $textElement$$ = Blockly.createSvgElement("text", {"class":"blocklyMenuText", x:Blockly.ContextMenu.X_PADDING, y:15}, $gElement$$);
  $text$$17_textNode$$ = document.createTextNode($text$$17_textNode$$);
  $textElement$$.appendChild($text$$17_textNode$$);
  return $gElement$$
};
Blockly.ContextMenu.hide = function $Blockly$ContextMenu$hide$() {
  Blockly.ContextMenu.visible && (Blockly.ContextMenu.svgGroup.style.display = "none", Blockly.ContextMenu.visible = !1)
};
Blockly.ContextMenu.callbackFactory = function $Blockly$ContextMenu$callbackFactory$($block$$, $xml$$) {
  return function() {
    var $newBlock$$ = Blockly.Xml.domToBlock_($block$$.workspace, $xml$$), $xy$$ = $block$$.getRelativeToSurfaceXY();
    $xy$$.x = Blockly.RTL ? $xy$$.x - Blockly.SNAP_RADIUS : $xy$$.x + Blockly.SNAP_RADIUS;
    $xy$$.y += 2 * Blockly.SNAP_RADIUS;
    $newBlock$$.moveBy($xy$$.x, $xy$$.y);
    $newBlock$$.select()
  }
};
Blockly.Bubble = function $Blockly$Bubble$($bBox$$2_workspace$$, $content$$, $shape$$, $anchorX$$, $anchorY$$, $bubbleWidth$$, $bubbleHeight$$) {
  var $angle$$ = Blockly.Bubble.ARROW_ANGLE;
  Blockly.RTL && ($angle$$ = -$angle$$);
  this.arrow_radians_ = 2 * ($angle$$ / 360) * Math.PI;
  this.workspace_ = $bBox$$2_workspace$$;
  this.content_ = $content$$;
  this.shape_ = $shape$$;
  $bBox$$2_workspace$$.getBubbleCanvas().appendChild(this.createDom_($content$$, !(!$bubbleWidth$$ || !$bubbleHeight$$)));
  this.setAnchorLocation($anchorX$$, $anchorY$$);
  $bubbleWidth$$ && $bubbleHeight$$ || (0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? (this.content_.style.display = "inline", $bBox$$2_workspace$$ = {x:this.content_.getBBox().x, y:this.content_.getBBox().y, width:this.content_.scrollWidth, height:this.content_.scrollHeight}) : $bBox$$2_workspace$$ = this.content_.getBBox(), $bubbleWidth$$ = $bBox$$2_workspace$$.width + 2 * Blockly.Bubble.BORDER_WIDTH, $bubbleHeight$$ = $bBox$$2_workspace$$.height + 2 * 
  Blockly.Bubble.BORDER_WIDTH);
  this.setBubbleSize($bubbleWidth$$, $bubbleHeight$$);
  this.positionBubble_();
  this.renderArrow_();
  this.rendered_ = !0;
  Blockly.readOnly || (Blockly.bindEvent_(this.bubbleBack_, "mousedown", this, this.bubbleMouseDown_), this.resizeGroup_ && Blockly.bindEvent_(this.resizeGroup_, "mousedown", this, this.resizeMouseDown_))
};
Blockly.Bubble.BORDER_WIDTH = 6;
Blockly.Bubble.ARROW_THICKNESS = 10;
Blockly.Bubble.ARROW_ANGLE = 20;
Blockly.Bubble.ARROW_BEND = 4;
Blockly.Bubble.ANCHOR_RADIUS = 8;
Blockly.Bubble.onMouseUpWrapper_ = null;
Blockly.Bubble.onMouseMoveWrapper_ = null;
Blockly.Bubble.unbindDragEvents_ = function $Blockly$Bubble$unbindDragEvents_$() {
  Blockly.Bubble.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_), Blockly.Bubble.onMouseUpWrapper_ = null);
  Blockly.Bubble.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_), Blockly.Bubble.onMouseMoveWrapper_ = null)
};
Blockly.Bubble.prototype.rendered_ = !1;
Blockly.Bubble.prototype.anchorX_ = 0;
Blockly.Bubble.prototype.anchorY_ = 0;
Blockly.Bubble.prototype.relativeLeft_ = 0;
Blockly.Bubble.prototype.relativeTop_ = 0;
Blockly.Bubble.prototype.width_ = 0;
Blockly.Bubble.prototype.height_ = 0;
Blockly.Bubble.prototype.autoLayout_ = !0;
Blockly.Bubble.prototype.createDom_ = function $Blockly$Bubble$$createDom_$($content$$, $hasResize$$) {
  this.bubbleGroup_ = Blockly.createSvgElement("g", {}, null);
  var $bubbleEmboss_resizeSize$$ = Blockly.createSvgElement("g", {filter:"url(#blocklyEmboss)"}, this.bubbleGroup_);
  this.bubbleArrow_ = Blockly.createSvgElement("path", {}, $bubbleEmboss_resizeSize$$);
  this.bubbleBack_ = Blockly.createSvgElement("rect", {"class":"blocklyDraggable", x:0, y:0, rx:Blockly.Bubble.BORDER_WIDTH, ry:Blockly.Bubble.BORDER_WIDTH}, $bubbleEmboss_resizeSize$$);
  $hasResize$$ ? (this.resizeGroup_ = Blockly.createSvgElement("g", {"class":Blockly.RTL ? "blocklyResizeSW" : "blocklyResizeSE"}, this.bubbleGroup_), $bubbleEmboss_resizeSize$$ = 2 * Blockly.Bubble.BORDER_WIDTH, Blockly.createSvgElement("polygon", {points:"0,x x,x x,0".replace(/x/g, $bubbleEmboss_resizeSize$$.toString())}, this.resizeGroup_), Blockly.createSvgElement("line", {"class":"blocklyResizeLine", x1:$bubbleEmboss_resizeSize$$ / 3, y1:$bubbleEmboss_resizeSize$$ - 1, x2:$bubbleEmboss_resizeSize$$ - 
  1, y2:$bubbleEmboss_resizeSize$$ / 3}, this.resizeGroup_), Blockly.createSvgElement("line", {"class":"blocklyResizeLine", x1:2 * $bubbleEmboss_resizeSize$$ / 3, y1:$bubbleEmboss_resizeSize$$ - 1, x2:$bubbleEmboss_resizeSize$$ - 1, y2:2 * $bubbleEmboss_resizeSize$$ / 3}, this.resizeGroup_)) : this.resizeGroup_ = null;
  this.bubbleGroup_.appendChild($content$$);
  return this.bubbleGroup_
};
Blockly.Bubble.prototype.bubbleMouseDown_ = function $Blockly$Bubble$$bubbleMouseDown_$($e$$) {
  this.promote_();
  Blockly.Bubble.unbindDragEvents_();
  Blockly.isRightButton($e$$) || Blockly.isTargetInput_($e$$) || (Blockly.setCursorHand_(!0), this.dragDeltaX = Blockly.RTL ? this.relativeLeft_ + $e$$.clientX : this.relativeLeft_ - $e$$.clientX, this.dragDeltaY = this.relativeTop_ - $e$$.clientY, Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.bubbleMouseMove_), Blockly.hideChaff(), $e$$.stopPropagation())
};
Blockly.Bubble.prototype.bubbleMouseMove_ = function $Blockly$Bubble$$bubbleMouseMove_$($e$$) {
  this.autoLayout_ = !1;
  this.relativeLeft_ = Blockly.RTL ? this.dragDeltaX - $e$$.clientX : this.dragDeltaX + $e$$.clientX;
  this.relativeTop_ = this.dragDeltaY + $e$$.clientY;
  this.positionBubble_();
  this.renderArrow_()
};
Blockly.Bubble.prototype.resizeMouseDown_ = function $Blockly$Bubble$$resizeMouseDown_$($e$$) {
  this.promote_();
  Blockly.Bubble.unbindDragEvents_();
  Blockly.isRightButton($e$$) || (Blockly.setCursorHand_(!0), this.resizeDeltaWidth = Blockly.RTL ? this.width_ + $e$$.clientX : this.width_ - $e$$.clientX, this.resizeDeltaHeight = this.height_ - $e$$.clientY, Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.resizeMouseMove_), Blockly.hideChaff(), $e$$.stopPropagation())
};
Blockly.Bubble.prototype.resizeMouseMove_ = function $Blockly$Bubble$$resizeMouseMove_$($e$$) {
  this.autoLayout_ = !1;
  var $w$$ = this.resizeDeltaWidth, $h$$ = this.resizeDeltaHeight + $e$$.clientY, $w$$ = Blockly.RTL ? $w$$ - $e$$.clientX : $w$$ + $e$$.clientX;
  this.setBubbleSize($w$$, $h$$);
  Blockly.RTL && this.positionBubble_()
};
Blockly.Bubble.prototype.registerResizeEvent = function $Blockly$Bubble$$registerResizeEvent$($thisObject$$, $callback$$) {
  Blockly.bindEvent_(this.bubbleGroup_, "resize", $thisObject$$, $callback$$)
};
Blockly.Bubble.prototype.promote_ = function $Blockly$Bubble$$promote_$() {
  this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)
};
Blockly.Bubble.prototype.setAnchorLocation = function $Blockly$Bubble$$setAnchorLocation$($x$$, $y$$) {
  this.anchorX_ = $x$$;
  this.anchorY_ = $y$$;
  this.rendered_ && this.positionBubble_()
};
Blockly.Bubble.prototype.layoutBubble_ = function $Blockly$Bubble$$layoutBubble_$() {
  var $relativeLeft$$ = -this.width_ / 4, $bBox$$ = -this.height_ - Blockly.BlockSvg.MIN_BLOCK_Y;
  if(this.workspace_.scrollbar) {
    var $metrics$$ = this.workspace_.getMetrics();
    this.anchorX_ + $relativeLeft$$ < Blockly.BlockSvg.SEP_SPACE_X + $metrics$$.viewLeft ? $relativeLeft$$ = Blockly.BlockSvg.SEP_SPACE_X + $metrics$$.viewLeft - this.anchorX_ : $metrics$$.viewLeft + $metrics$$.viewWidth < this.anchorX_ + $relativeLeft$$ + this.width_ + Blockly.BlockSvg.SEP_SPACE_X + Blockly.Scrollbar.scrollbarThickness && ($relativeLeft$$ = $metrics$$.viewLeft + $metrics$$.viewWidth - this.anchorX_ - this.width_ - Blockly.BlockSvg.SEP_SPACE_X - Blockly.Scrollbar.scrollbarThickness);
    this.anchorY_ + $bBox$$ < Blockly.BlockSvg.SEP_SPACE_Y + $metrics$$.viewTop && (0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? (this.shape_.style.display = "inline", $bBox$$ = {x:this.shape_.getBBox().x, y:this.shape_.getBBox().y, width:this.shape_.scrollWidth, height:this.shape_.scrollHeight}) : $bBox$$ = this.shape_.getBBox(), $bBox$$ = $bBox$$.height)
  }
  this.relativeLeft_ = $relativeLeft$$;
  this.relativeTop_ = $bBox$$
};
Blockly.Bubble.prototype.positionBubble_ = function $Blockly$Bubble$$positionBubble_$() {
  this.bubbleGroup_.setAttribute("transform", "translate(" + (Blockly.RTL ? this.anchorX_ - this.relativeLeft_ - this.width_ : this.anchorX_ + this.relativeLeft_) + ", " + (this.relativeTop_ + this.anchorY_) + ")")
};
Blockly.Bubble.prototype.getBubbleSize = function $Blockly$Bubble$$getBubbleSize$() {
  return{width:this.width_, height:this.height_}
};
Blockly.Bubble.prototype.setBubbleSize = function $Blockly$Bubble$$setBubbleSize$($width$$, $height$$) {
  var $doubleBorderWidth$$ = 2 * Blockly.Bubble.BORDER_WIDTH;
  $width$$ = Math.max($width$$, $doubleBorderWidth$$ + 45);
  $height$$ = Math.max($height$$, $doubleBorderWidth$$ + Blockly.BlockSvg.TITLE_HEIGHT);
  this.width_ = $width$$;
  this.height_ = $height$$;
  this.bubbleBack_.setAttribute("width", $width$$);
  this.bubbleBack_.setAttribute("height", $height$$);
  this.resizeGroup_ && (Blockly.RTL ? this.resizeGroup_.setAttribute("transform", "translate(" + 2 * Blockly.Bubble.BORDER_WIDTH + ", " + ($height$$ - $doubleBorderWidth$$) + ") scale(-1 1)") : this.resizeGroup_.setAttribute("transform", "translate(" + ($width$$ - $doubleBorderWidth$$) + ", " + ($height$$ - $doubleBorderWidth$$) + ")"));
  this.rendered_ && (this.autoLayout_ && this.layoutBubble_(), this.positionBubble_(), this.renderArrow_());
  Blockly.fireUiEvent(this.bubbleGroup_, "resize")
};
Blockly.Bubble.prototype.renderArrow_ = function $Blockly$Bubble$$renderArrow_$() {
  var $steps$$ = [], $baseX2_relBubbleX$$ = this.width_ / 2, $baseY2_relBubbleY$$ = this.height_ / 2, $relAnchorX_run$$ = -this.relativeLeft_, $relAnchorY_rise$$ = -this.relativeTop_;
  if($baseX2_relBubbleX$$ == $relAnchorX_run$$ && $baseY2_relBubbleY$$ == $relAnchorY_rise$$) {
    $steps$$.push("M " + $baseX2_relBubbleX$$ + "," + $baseY2_relBubbleY$$)
  }else {
    $relAnchorY_rise$$ -= $baseY2_relBubbleY$$;
    $relAnchorX_run$$ -= $baseX2_relBubbleX$$;
    Blockly.RTL && ($relAnchorX_run$$ *= -1);
    var $hypotenuse_swirlRun$$ = Math.sqrt($relAnchorY_rise$$ * $relAnchorY_rise$$ + $relAnchorX_run$$ * $relAnchorX_run$$), $angle$$ = Math.acos($relAnchorX_run$$ / $hypotenuse_swirlRun$$);
    0 > $relAnchorY_rise$$ && ($angle$$ = 2 * Math.PI - $angle$$);
    var $rightAngle_thickness$$ = $angle$$ + Math.PI / 2;
    $rightAngle_thickness$$ > 2 * Math.PI && ($rightAngle_thickness$$ -= 2 * Math.PI);
    var $rightRise_swirlAngle$$ = Math.sin($rightAngle_thickness$$), $rightRun$$ = Math.cos($rightAngle_thickness$$), $backoffRatio_baseX1_bubbleSize$$ = this.getBubbleSize(), $rightAngle_thickness$$ = ($backoffRatio_baseX1_bubbleSize$$.width + $backoffRatio_baseX1_bubbleSize$$.height) / Blockly.Bubble.ARROW_THICKNESS, $rightAngle_thickness$$ = Math.min($rightAngle_thickness$$, $backoffRatio_baseX1_bubbleSize$$.width, $backoffRatio_baseX1_bubbleSize$$.height) / 2, $backoffRatio_baseX1_bubbleSize$$ = 
    1 - Blockly.Bubble.ANCHOR_RADIUS / $hypotenuse_swirlRun$$, $relAnchorX_run$$ = $baseX2_relBubbleX$$ + $backoffRatio_baseX1_bubbleSize$$ * $relAnchorX_run$$, $relAnchorY_rise$$ = $baseY2_relBubbleY$$ + $backoffRatio_baseX1_bubbleSize$$ * $relAnchorY_rise$$, $backoffRatio_baseX1_bubbleSize$$ = $baseX2_relBubbleX$$ + $rightAngle_thickness$$ * $rightRun$$, $baseY1$$ = $baseY2_relBubbleY$$ + $rightAngle_thickness$$ * $rightRise_swirlAngle$$, $baseX2_relBubbleX$$ = $baseX2_relBubbleX$$ - $rightAngle_thickness$$ * 
    $rightRun$$, $baseY2_relBubbleY$$ = $baseY2_relBubbleY$$ - $rightAngle_thickness$$ * $rightRise_swirlAngle$$, $rightRise_swirlAngle$$ = $angle$$ + this.arrow_radians_;
    $rightRise_swirlAngle$$ > 2 * Math.PI && ($rightRise_swirlAngle$$ -= 2 * Math.PI);
    $angle$$ = Math.sin($rightRise_swirlAngle$$) * $hypotenuse_swirlRun$$ / Blockly.Bubble.ARROW_BEND;
    $hypotenuse_swirlRun$$ = Math.cos($rightRise_swirlAngle$$) * $hypotenuse_swirlRun$$ / Blockly.Bubble.ARROW_BEND;
    $steps$$.push("M" + $backoffRatio_baseX1_bubbleSize$$ + "," + $baseY1$$);
    $steps$$.push("C" + ($backoffRatio_baseX1_bubbleSize$$ + $hypotenuse_swirlRun$$) + "," + ($baseY1$$ + $angle$$) + " " + $relAnchorX_run$$ + "," + $relAnchorY_rise$$ + " " + $relAnchorX_run$$ + "," + $relAnchorY_rise$$);
    $steps$$.push("C" + $relAnchorX_run$$ + "," + $relAnchorY_rise$$ + " " + ($baseX2_relBubbleX$$ + $hypotenuse_swirlRun$$) + "," + ($baseY2_relBubbleY$$ + $angle$$) + " " + $baseX2_relBubbleX$$ + "," + $baseY2_relBubbleY$$)
  }
  $steps$$.push("z");
  this.bubbleArrow_.setAttribute("d", $steps$$.join(" "))
};
Blockly.Bubble.prototype.setColour = function $Blockly$Bubble$$setColour$($hexColour$$) {
  this.bubbleBack_.setAttribute("fill", $hexColour$$);
  this.bubbleArrow_.setAttribute("fill", $hexColour$$)
};
Blockly.Bubble.prototype.dispose = function $Blockly$Bubble$$dispose$() {
  Blockly.Bubble.unbindDragEvents_();
  goog.dom.removeNode(this.bubbleGroup_);
  this.shape_ = this.content_ = this.workspace_ = this.bubbleGroup_ = null
};
Blockly.Icon = function $Blockly$Icon$($block$$) {
  this.block_ = $block$$
};
Blockly.Icon.RADIUS = 8;
Blockly.Icon.prototype.bubble_ = null;
Blockly.Icon.prototype.iconX_ = 0;
Blockly.Icon.prototype.iconY_ = 0;
Blockly.Icon.prototype.createIcon_ = function $Blockly$Icon$$createIcon_$() {
  this.iconGroup_ = Blockly.createSvgElement("g", {}, null);
  this.block_.getSvgRoot().appendChild(this.iconGroup_);
  Blockly.bindEvent_(this.iconGroup_, "mouseup", this, this.iconClick_);
  this.updateEditable()
};
Blockly.Icon.prototype.dispose = function $Blockly$Icon$$dispose$() {
  goog.dom.removeNode(this.iconGroup_);
  this.iconGroup_ = null;
  this.setVisible(!1);
  this.block_ = null
};
Blockly.Icon.prototype.updateEditable = function $Blockly$Icon$$updateEditable$() {
  this.block_.isEditable() && !this.block_.isInFlyout ? Blockly.addClass_(this.iconGroup_, "blocklyIconGroup") : Blockly.removeClass_(this.iconGroup_, "blocklyIconGroup")
};
Blockly.Icon.prototype.isVisible = function $Blockly$Icon$$isVisible$() {
  return!!this.bubble_
};
Blockly.Icon.prototype.iconClick_ = function $Blockly$Icon$$iconClick_$($e$$) {
  this.block_.isEditable() && !this.block_.isInFlyout && this.setVisible(!this.isVisible())
};
Blockly.Icon.prototype.updateColour = function $Blockly$Icon$$updateColour$() {
  if(this.isVisible()) {
    var $hexColour$$ = Blockly.makeColour(this.block_.getColour());
    this.bubble_.setColour($hexColour$$)
  }
};
Blockly.Icon.prototype.renderIcon = function $Blockly$Icon$$renderIcon$($cursorX$$) {
  if(this.block_.isCollapsed()) {
    return this.iconGroup_.setAttribute("display", "none"), $cursorX$$
  }
  this.iconGroup_.setAttribute("display", "block");
  var $diameter$$ = 2 * Blockly.Icon.RADIUS;
  Blockly.RTL && ($cursorX$$ -= $diameter$$);
  this.iconGroup_.setAttribute("transform", "translate(" + $cursorX$$ + ", 5)");
  this.computeIconLocation();
  return $cursorX$$ = Blockly.RTL ? $cursorX$$ - Blockly.BlockSvg.SEP_SPACE_X : $cursorX$$ + ($diameter$$ + Blockly.BlockSvg.SEP_SPACE_X)
};
Blockly.Icon.prototype.setIconLocation = function $Blockly$Icon$$setIconLocation$($x$$, $y$$) {
  this.iconX_ = $x$$;
  this.iconY_ = $y$$;
  this.isVisible() && this.bubble_.setAnchorLocation($x$$, $y$$)
};
Blockly.Icon.prototype.computeIconLocation = function $Blockly$Icon$$computeIconLocation$() {
  var $blockXY_newY$$ = this.block_.getRelativeToSurfaceXY(), $iconXY$$ = Blockly.getRelativeXY_(this.iconGroup_), $newX$$ = $blockXY_newY$$.x + $iconXY$$.x + Blockly.Icon.RADIUS, $blockXY_newY$$ = $blockXY_newY$$.y + $iconXY$$.y + Blockly.Icon.RADIUS;
  $newX$$ === this.iconX_ && $blockXY_newY$$ === this.iconY_ || this.setIconLocation($newX$$, $blockXY_newY$$)
};
Blockly.Icon.prototype.getIconLocation = function $Blockly$Icon$$getIconLocation$() {
  return{x:this.iconX_, y:this.iconY_}
};
Blockly.Mutator = function $Blockly$Mutator$($quarkNames$$) {
  Blockly.Mutator.superClass_.constructor.call(this, null);
  this.quarkXml_ = [];
  for(var $x$$ = 0;$x$$ < $quarkNames$$.length;$x$$++) {
    var $element$$ = goog.dom.createDom("block", {type:$quarkNames$$[$x$$]});
    this.quarkXml_[$x$$] = $element$$
  }
};
goog.inherits(Blockly.Mutator, Blockly.Icon);
Blockly.Mutator.prototype.workspaceWidth_ = 0;
Blockly.Mutator.prototype.workspaceHeight_ = 0;
Blockly.Mutator.prototype.createIcon = function $Blockly$Mutator$$createIcon$() {
  Blockly.Icon.prototype.createIcon_.call(this);
  var $quantum$$ = Blockly.Icon.RADIUS / 2;
  Blockly.createSvgElement("rect", {"class":"blocklyIconShield", width:4 * $quantum$$, height:4 * $quantum$$, rx:$quantum$$, ry:$quantum$$}, this.iconGroup_);
  this.iconMark_ = Blockly.createSvgElement("text", {"class":"blocklyIconMark", x:Blockly.Icon.RADIUS, y:2 * Blockly.Icon.RADIUS - 4}, this.iconGroup_);
  this.iconMark_.appendChild(document.createTextNode("\u2605"))
};
Blockly.Mutator.prototype.createEditor_ = function $Blockly$Mutator$$createEditor_$() {
  this.svgDialog_ = Blockly.createSvgElement("svg", {x:Blockly.Bubble.BORDER_WIDTH, y:Blockly.Bubble.BORDER_WIDTH}, null);
  this.svgBackground_ = Blockly.createSvgElement("rect", {"class":"blocklyMutatorBackground", height:"100%", width:"100%"}, this.svgDialog_);
  var $mutator$$ = this;
  this.workspace_ = new Blockly.Workspace(function() {
    return $mutator$$.getFlyoutMetrics_()
  }, null);
  this.flyout_ = new Blockly.Flyout;
  this.flyout_.autoClose = !1;
  this.svgDialog_.appendChild(this.flyout_.createDom());
  this.svgDialog_.appendChild(this.workspace_.createDom());
  return this.svgDialog_
};
Blockly.Mutator.prototype.resizeBubble_ = function $Blockly$Mutator$$resizeBubble_$() {
  var $doubleBorderWidth$$ = 2 * Blockly.Bubble.BORDER_WIDTH;
  if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
    this.workspace_.getCanvas().style.display = "inline";
    var $height$$ = {x:this.workspace_.getCanvas().getBBox().x, y:this.workspace_.getCanvas().getBBox().y, width:this.workspace_.getCanvas().scrollWidth, height:this.workspace_.getCanvas().scrollHeight}
  }else {
    $height$$ = this.workspace_.getCanvas().getBBox()
  }
  var $flyoutMetrics$$ = this.flyout_.getMetrics_(), $width$$;
  $width$$ = Blockly.RTL ? -$height$$.x : $height$$.width + $height$$.x;
  $height$$ = Math.max($height$$.height + 3 * $doubleBorderWidth$$, $flyoutMetrics$$.contentHeight + 20);
  $width$$ += 3 * $doubleBorderWidth$$;
  if(Math.abs(this.workspaceWidth_ - $width$$) > $doubleBorderWidth$$ || Math.abs(this.workspaceHeight_ - $height$$) > $doubleBorderWidth$$) {
    this.workspaceWidth_ = $width$$, this.workspaceHeight_ = $height$$, this.bubble_.setBubbleSize($width$$ + $doubleBorderWidth$$, $height$$ + $doubleBorderWidth$$), this.svgDialog_.setAttribute("width", this.workspaceWidth_), this.svgDialog_.setAttribute("height", this.workspaceHeight_)
  }
  Blockly.RTL && ($doubleBorderWidth$$ = "translate(" + this.workspaceWidth_ + ",0)", this.workspace_.getCanvas().setAttribute("transform", $doubleBorderWidth$$))
};
Blockly.Mutator.prototype.setVisible = function $Blockly$Mutator$$setVisible$($blocks$$4_margin_visible$$) {
  if($blocks$$4_margin_visible$$ != this.isVisible()) {
    if($blocks$$4_margin_visible$$) {
      this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svg_.svgGroup_, this.iconX_, this.iconY_, null, null);
      var $thisObj$$ = this;
      this.flyout_.init(this.workspace_, !1);
      this.flyout_.show(this.quarkXml_);
      this.rootBlock_ = this.block_.decompose(this.workspace_);
      $blocks$$4_margin_visible$$ = this.rootBlock_.getDescendants();
      for(var $i$$87_x$$ = 0, $child$$;$child$$ = $blocks$$4_margin_visible$$[$i$$87_x$$];$i$$87_x$$++) {
        $child$$.render()
      }
      this.rootBlock_.setMovable(!1);
      this.rootBlock_.setDeletable(!1);
      $blocks$$4_margin_visible$$ = 2 * this.flyout_.CORNER_RADIUS;
      $i$$87_x$$ = this.flyout_.width_ + $blocks$$4_margin_visible$$;
      Blockly.RTL && ($i$$87_x$$ = -$i$$87_x$$);
      this.rootBlock_.moveBy($i$$87_x$$, $blocks$$4_margin_visible$$);
      this.block_.saveConnections && (this.block_.saveConnections(this.rootBlock_), this.sourceListener_ = Blockly.bindEvent_(this.block_.workspace.getCanvas(), "blocklyWorkspaceChange", this.block_, function() {
        $thisObj$$.block_.saveConnections($thisObj$$.rootBlock_)
      }));
      this.resizeBubble_();
      Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this.block_, function() {
        $thisObj$$.workspaceChanged_()
      });
      this.updateColour()
    }else {
      this.svgBackground_ = this.svgDialog_ = null, this.flyout_.dispose(), this.flyout_ = null, this.workspace_.dispose(), this.rootBlock_ = this.workspace_ = null, this.bubble_.dispose(), this.bubble_ = null, this.workspaceHeight_ = this.workspaceWidth_ = 0, this.sourceListener_ && (Blockly.unbindEvent_(this.sourceListener_), this.sourceListener_ = null)
    }
  }
};
Blockly.Mutator.prototype.workspaceChanged_ = function $Blockly$Mutator$$workspaceChanged_$() {
  if(0 == Blockly.Block.dragMode_) {
    for(var $blocks$$ = this.workspace_.getTopBlocks(!1), $b$$ = 0, $block$$;$block$$ = $blocks$$[$b$$];$b$$++) {
      var $blockXY$$ = $block$$.getRelativeToSurfaceXY(), $blockHW$$ = $block$$.getHeightWidth();
      (Blockly.RTL ? $blockXY$$.x > -this.flyout_.width_ + 20 : $blockXY$$.x < this.flyout_.width_ - 20) ? $block$$.dispose(!1, !0) : 20 > $blockXY$$.y + $blockHW$$.height && $block$$.moveBy(0, 20 - $blockHW$$.height - $blockXY$$.y)
    }
  }
  this.rootBlock_.workspace == this.workspace_ && ($blocks$$ = this.block_.rendered, this.block_.rendered = !1, this.block_.compose(this.rootBlock_), this.block_.rendered = $blocks$$, this.block_.rendered && this.block_.render(), this.resizeBubble_(), this.block_.workspace.fireChangeEvent())
};
Blockly.Mutator.prototype.getFlyoutMetrics_ = function $Blockly$Mutator$$getFlyoutMetrics_$() {
  var $left$$ = 0;
  Blockly.RTL && ($left$$ += this.workspaceWidth_);
  return{viewHeight:this.workspaceHeight_, viewWidth:0, absoluteTop:0, absoluteLeft:$left$$}
};
Blockly.Mutator.prototype.dispose = function $Blockly$Mutator$$dispose$() {
  this.block_.mutator = null;
  Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Connection = function $Blockly$Connection$($source$$, $type$$) {
  this.sourceBlock_ = $source$$;
  this.targetConnection = null;
  this.type = $type$$;
  this.y_ = this.x_ = 0;
  this.inDB_ = !1;
  this.dbList_ = this.sourceBlock_.workspace.connectionDBList
};
Blockly.Connection.prototype.dispose = function $Blockly$Connection$$dispose$() {
  if(this.targetConnection) {
    throw"Disconnect connection before disposing of it.";
  }
  this.inDB_ && this.dbList_[this.type].removeConnection_(this);
  this.inDB_ = !1;
  Blockly.highlightedConnection_ == this && (Blockly.highlightedConnection_ = null);
  Blockly.localConnection_ == this && (Blockly.localConnection_ = null)
};
Blockly.Connection.prototype.isSuperior = function $Blockly$Connection$$isSuperior$() {
  return this.type == Blockly.INPUT_VALUE || this.type == Blockly.NEXT_STATEMENT
};
Blockly.Connection.prototype.connect = function $Blockly$Connection$$connect$($otherConnection$$) {
  if(this.sourceBlock_ == $otherConnection$$.sourceBlock_) {
    throw"Attempted to connect a block to itself.";
  }
  if(this.sourceBlock_.workspace !== $otherConnection$$.sourceBlock_.workspace) {
    throw"Blocks are on different workspaces.";
  }
  if(Blockly.OPPOSITE_TYPE[this.type] != $otherConnection$$.type) {
    throw"Attempt to connect incompatible types.";
  }
  if(this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
    if(this.targetConnection) {
      throw"Source connection already connected (value).";
    }
    if($otherConnection$$.targetConnection) {
      var $orphanBlock$$ = $otherConnection$$.targetBlock();
      $orphanBlock$$.setParent(null);
      if(!$orphanBlock$$.outputConnection) {
        throw"Orphan block does not have an output connection.";
      }
      for(var $connection_newBlock$$1_parentBlock$$ = this.sourceBlock_;$connection_newBlock$$1_parentBlock$$ = Blockly.Connection.singleConnection_($connection_newBlock$$1_parentBlock$$, $orphanBlock$$);) {
        if($connection_newBlock$$1_parentBlock$$.targetBlock()) {
          $connection_newBlock$$1_parentBlock$$ = $connection_newBlock$$1_parentBlock$$.targetBlock()
        }else {
          $connection_newBlock$$1_parentBlock$$.connect($orphanBlock$$.outputConnection);
          $orphanBlock$$ = null;
          break
        }
      }
      $orphanBlock$$ && window.setTimeout(function() {
        $orphanBlock$$.outputConnection.bumpAwayFrom_($otherConnection$$)
      }, Blockly.BUMP_DELAY)
    }
  }else {
    if(this.targetConnection) {
      throw"Source connection already connected (block).";
    }
    if($otherConnection$$.targetConnection) {
      if(this.type != Blockly.PREVIOUS_STATEMENT) {
        throw"Can only do a mid-stack connection with the top of a block.";
      }
      $orphanBlock$$ = $otherConnection$$.targetBlock();
      $orphanBlock$$.setParent(null);
      if(!$orphanBlock$$.previousConnection) {
        throw"Orphan block does not have a previous connection.";
      }
      for($connection_newBlock$$1_parentBlock$$ = this.sourceBlock_;$connection_newBlock$$1_parentBlock$$.nextConnection;) {
        if($connection_newBlock$$1_parentBlock$$.nextConnection.targetConnection) {
          $connection_newBlock$$1_parentBlock$$ = $connection_newBlock$$1_parentBlock$$.nextConnection.targetBlock()
        }else {
          $connection_newBlock$$1_parentBlock$$.nextConnection.connect($orphanBlock$$.previousConnection);
          $orphanBlock$$ = null;
          break
        }
      }
      $orphanBlock$$ && window.setTimeout(function() {
        $orphanBlock$$.previousConnection.bumpAwayFrom_($otherConnection$$)
      }, Blockly.BUMP_DELAY)
    }
  }
  var $childBlock$$;
  this.isSuperior() ? ($connection_newBlock$$1_parentBlock$$ = this.sourceBlock_, $childBlock$$ = $otherConnection$$.sourceBlock_) : ($connection_newBlock$$1_parentBlock$$ = $otherConnection$$.sourceBlock_, $childBlock$$ = this.sourceBlock_);
  this.targetConnection = $otherConnection$$;
  $otherConnection$$.targetConnection = this;
  $childBlock$$.setParent($connection_newBlock$$1_parentBlock$$);
  $connection_newBlock$$1_parentBlock$$.rendered && $connection_newBlock$$1_parentBlock$$.svg_.updateDisabled();
  $childBlock$$.rendered && $childBlock$$.svg_.updateDisabled();
  $connection_newBlock$$1_parentBlock$$.rendered && $childBlock$$.rendered && (this.type == Blockly.NEXT_STATEMENT || this.type == Blockly.PREVIOUS_STATEMENT ? $childBlock$$.render() : $connection_newBlock$$1_parentBlock$$.render())
};
Blockly.Connection.singleConnection_ = function $Blockly$Connection$singleConnection_$($block$$, $orphanBlock$$) {
  for(var $connection$$ = !1, $x$$ = 0;$x$$ < $block$$.inputList.length;$x$$++) {
    var $thisConnection$$ = $block$$.inputList[$x$$].connection;
    if($thisConnection$$ && $thisConnection$$.type == Blockly.INPUT_VALUE && $orphanBlock$$.outputConnection.checkType_($thisConnection$$)) {
      if($connection$$) {
        return null
      }
      $connection$$ = $thisConnection$$
    }
  }
  return $connection$$
};
Blockly.Connection.prototype.disconnect = function $Blockly$Connection$$disconnect$() {
  var $childBlock$$2_otherConnection$$ = this.targetConnection;
  if(!$childBlock$$2_otherConnection$$) {
    throw"Source connection not connected.";
  }
  if($childBlock$$2_otherConnection$$.targetConnection != this) {
    throw"Target connection not connected to source connection.";
  }
  this.targetConnection = $childBlock$$2_otherConnection$$.targetConnection = null;
  var $parentBlock$$;
  this.isSuperior() ? ($parentBlock$$ = this.sourceBlock_, $childBlock$$2_otherConnection$$ = $childBlock$$2_otherConnection$$.sourceBlock_) : ($parentBlock$$ = $childBlock$$2_otherConnection$$.sourceBlock_, $childBlock$$2_otherConnection$$ = this.sourceBlock_);
  $parentBlock$$.rendered && $parentBlock$$.render();
  $childBlock$$2_otherConnection$$.rendered && ($childBlock$$2_otherConnection$$.svg_.updateDisabled(), $childBlock$$2_otherConnection$$.render())
};
Blockly.Connection.prototype.targetBlock = function $Blockly$Connection$$targetBlock$() {
  return this.targetConnection ? this.targetConnection.sourceBlock_ : null
};
Blockly.Connection.prototype.bumpAwayFrom_ = function $Blockly$Connection$$bumpAwayFrom_$($dy$$) {
  if(0 == Blockly.Block.dragMode_) {
    var $rootBlock$$ = this.sourceBlock_.getRootBlock();
    if(!$rootBlock$$.isInFlyout) {
      var $reverse$$ = !1;
      if(!$rootBlock$$.isMovable()) {
        $rootBlock$$ = $dy$$.sourceBlock_.getRootBlock();
        if(!$rootBlock$$.isMovable()) {
          return
        }
        $dy$$ = this;
        $reverse$$ = !0
      }
      $rootBlock$$.getSvgRoot().parentNode.appendChild($rootBlock$$.getSvgRoot());
      var $dx$$ = $dy$$.x_ + Blockly.SNAP_RADIUS - this.x_;
      $dy$$ = $dy$$.y_ + 2 * Blockly.SNAP_RADIUS - this.y_;
      $reverse$$ && ($dy$$ = -$dy$$);
      Blockly.RTL && ($dx$$ = -$dx$$);
      $rootBlock$$.moveBy($dx$$, $dy$$)
    }
  }
};
Blockly.Connection.prototype.moveTo = function $Blockly$Connection$$moveTo$($x$$, $y$$) {
  this.inDB_ && this.dbList_[this.type].removeConnection_(this);
  this.x_ = $x$$;
  this.y_ = $y$$;
  this.dbList_[this.type].addConnection_(this)
};
Blockly.Connection.prototype.moveBy = function $Blockly$Connection$$moveBy$($dx$$, $dy$$) {
  this.moveTo(this.x_ + $dx$$, this.y_ + $dy$$)
};
Blockly.Connection.prototype.highlight = function $Blockly$Connection$$highlight$() {
  var $steps$$;
  this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE ? ($steps$$ = Blockly.RTL ? -Blockly.BlockSvg.TAB_WIDTH : Blockly.BlockSvg.TAB_WIDTH, $steps$$ = "m 0,0 v 5 c 0,10 " + -$steps$$ + ",-8 " + -$steps$$ + ",7.5 s " + $steps$$ + ",-2.5 " + $steps$$ + ",7.5 v 5") : $steps$$ = Blockly.RTL ? "m 20,0 h -5 l -6,4 -3,0 -6,-4 h -5" : "m -20,0 h 5 l 6,4 3,0 6,-4 h 5";
  var $xy$$ = this.sourceBlock_.getRelativeToSurfaceXY();
  Blockly.Connection.highlightedPath_ = Blockly.createSvgElement("path", {"class":"blocklyHighlightedConnectionPath", d:$steps$$, transform:"translate(" + (this.x_ - $xy$$.x) + ", " + (this.y_ - $xy$$.y) + ")"}, this.sourceBlock_.getSvgRoot())
};
Blockly.Connection.prototype.unhighlight = function $Blockly$Connection$$unhighlight$() {
  goog.dom.removeNode(Blockly.Connection.highlightedPath_);
  delete Blockly.Connection.highlightedPath_
};
Blockly.Connection.prototype.tighten_ = function $Blockly$Connection$$tighten_$() {
  var $dx$$ = Math.round(this.targetConnection.x_ - this.x_), $dy$$ = Math.round(this.targetConnection.y_ - this.y_);
  if(0 != $dx$$ || 0 != $dy$$) {
    var $block$$ = this.targetBlock(), $svgRoot_xy$$ = $block$$.getSvgRoot();
    if(!$svgRoot_xy$$) {
      throw"block is not rendered.";
    }
    $svgRoot_xy$$ = Blockly.getRelativeXY_($svgRoot_xy$$);
    $block$$.getSvgRoot().setAttribute("transform", "translate(" + ($svgRoot_xy$$.x - $dx$$) + ", " + ($svgRoot_xy$$.y - $dy$$) + ")");
    $block$$.moveConnections_(-$dx$$, -$dy$$)
  }
};
Blockly.Connection.prototype.closest = function $Blockly$Connection$$closest$($maxLimit$$, $dx$$, $dy$$) {
  function $checkConnection_$$($yIndex$$) {
    var $connection$$2_dy$$ = $db$$[$yIndex$$];
    if(($connection$$2_dy$$.type == Blockly.OUTPUT_VALUE || $connection$$2_dy$$.type == Blockly.PREVIOUS_STATEMENT) && $connection$$2_dy$$.targetConnection || !$thisConnection$$.checkType_($connection$$2_dy$$)) {
      return!0
    }
    $connection$$2_dy$$ = $connection$$2_dy$$.sourceBlock_;
    do {
      if($sourceBlock$$ == $connection$$2_dy$$) {
        return!0
      }
      $connection$$2_dy$$ = $connection$$2_dy$$.getParent()
    }while($connection$$2_dy$$);
    var $dx$$11_r$$ = $currentX$$ - $db$$[$yIndex$$].x_, $connection$$2_dy$$ = $currentY$$ - $db$$[$yIndex$$].y_, $dx$$11_r$$ = Math.sqrt($dx$$11_r$$ * $dx$$11_r$$ + $connection$$2_dy$$ * $connection$$2_dy$$);
    $dx$$11_r$$ <= $maxLimit$$ && ($closestConnection$$ = $db$$[$yIndex$$], $maxLimit$$ = $dx$$11_r$$);
    return $connection$$2_dy$$ < $maxLimit$$
  }
  if(this.targetConnection) {
    return{connection:null, radius:$maxLimit$$}
  }
  var $db$$ = this.dbList_[Blockly.OPPOSITE_TYPE[this.type]], $currentX$$ = this.x_ + $dx$$, $currentY$$ = this.y_ + $dy$$;
  $dx$$ = 0;
  for(var $pointerMid$$ = $dy$$ = $db$$.length - 2;$dx$$ < $pointerMid$$;) {
    $db$$[$pointerMid$$].y_ < $currentY$$ ? $dx$$ = $pointerMid$$ : $dy$$ = $pointerMid$$, $pointerMid$$ = Math.floor(($dx$$ + $dy$$) / 2)
  }
  $dy$$ = $dx$$ = $pointerMid$$;
  var $closestConnection$$ = null, $sourceBlock$$ = this.sourceBlock_, $thisConnection$$ = this;
  if($db$$.length) {
    for(;0 <= $dx$$ && $checkConnection_$$($dx$$);) {
      $dx$$--
    }
    do {
      $dy$$++
    }while($dy$$ < $db$$.length && $checkConnection_$$($dy$$))
  }
  return{connection:$closestConnection$$, radius:$maxLimit$$}
};
Blockly.Connection.prototype.checkType_ = function $Blockly$Connection$$checkType_$($otherConnection$$) {
  if(!this.check_ || !$otherConnection$$.check_) {
    return!0
  }
  for(var $x$$ = 0;$x$$ < this.check_.length;$x$$++) {
    if(-1 != $otherConnection$$.check_.indexOf(this.check_[$x$$])) {
      return!0
    }
  }
  return!1
};
Blockly.Connection.prototype.setCheck = function $Blockly$Connection$$setCheck$($check$$) {
  $check$$ ? ($check$$ instanceof Array || ($check$$ = [$check$$]), this.check_ = $check$$, this.targetConnection && !this.checkType_(this.targetConnection) && (this.isSuperior() ? this.targetBlock().setParent(null) : this.sourceBlock_.setParent(null), this.sourceBlock_.bumpNeighbours_())) : this.check_ = null;
  return this
};
Blockly.Connection.prototype.neighbours_ = function $Blockly$Connection$$neighbours_$($maxLimit$$) {
  function $checkConnection_$$($yIndex$$) {
    var $dx$$ = $currentX$$ - $db$$[$yIndex$$].x_, $dy$$ = $currentY$$ - $db$$[$yIndex$$].y_;
    Math.sqrt($dx$$ * $dx$$ + $dy$$ * $dy$$) <= $maxLimit$$ && $neighbours$$.push($db$$[$yIndex$$]);
    return $dy$$ < $maxLimit$$
  }
  for(var $db$$ = this.dbList_[Blockly.OPPOSITE_TYPE[this.type]], $currentX$$ = this.x_, $currentY$$ = this.y_, $pointerMin$$ = 0, $pointerMax$$ = $db$$.length - 2, $pointerMid$$ = $pointerMax$$;$pointerMin$$ < $pointerMid$$;) {
    $db$$[$pointerMid$$].y_ < $currentY$$ ? $pointerMin$$ = $pointerMid$$ : $pointerMax$$ = $pointerMid$$, $pointerMid$$ = Math.floor(($pointerMin$$ + $pointerMax$$) / 2)
  }
  var $pointerMax$$ = $pointerMin$$ = $pointerMid$$, $neighbours$$ = [];
  if($db$$.length) {
    for(;0 <= $pointerMin$$ && $checkConnection_$$($pointerMin$$);) {
      $pointerMin$$--
    }
    do {
      $pointerMax$$++
    }while($pointerMax$$ < $db$$.length && $checkConnection_$$($pointerMax$$))
  }
  return $neighbours$$
};
Blockly.Connection.prototype.hideAll = function $Blockly$Connection$$hideAll$() {
  this.inDB_ && this.dbList_[this.type].removeConnection_(this);
  if(this.targetConnection) {
    for(var $blocks$$ = this.targetBlock().getDescendants(), $b$$ = 0;$b$$ < $blocks$$.length;$b$$++) {
      for(var $block$$18_icons$$ = $blocks$$[$b$$], $connections_x$$ = $block$$18_icons$$.getConnections_(!0), $c$$ = 0;$c$$ < $connections_x$$.length;$c$$++) {
        var $connection$$ = $connections_x$$[$c$$];
        $connection$$.inDB_ && this.dbList_[$connection$$.type].removeConnection_($connection$$)
      }
      $block$$18_icons$$ = $block$$18_icons$$.getIcons();
      for($connections_x$$ = 0;$connections_x$$ < $block$$18_icons$$.length;$connections_x$$++) {
        $block$$18_icons$$[$connections_x$$].setVisible(!1)
      }
    }
  }
};
Blockly.Connection.prototype.unhideAll = function $Blockly$Connection$$unhideAll$() {
  this.inDB_ || this.dbList_[this.type].addConnection_(this);
  var $renderList$$ = [];
  if(this.type != Blockly.INPUT_VALUE && this.type != Blockly.NEXT_STATEMENT) {
    return $renderList$$
  }
  var $block$$ = this.targetBlock();
  if($block$$) {
    var $connections$$;
    $block$$.isCollapsed() ? ($connections$$ = [], $block$$.outputConnection && $connections$$.push($block$$.outputConnection), $block$$.nextConnection && $connections$$.push($block$$.nextConnection), $block$$.previousConnection && $connections$$.push($block$$.previousConnection)) : $connections$$ = $block$$.getConnections_(!0);
    for(var $c$$ = 0;$c$$ < $connections$$.length;$c$$++) {
      $renderList$$ = $renderList$$.concat($connections$$[$c$$].unhideAll())
    }
    0 == $renderList$$.length && ($renderList$$[0] = $block$$)
  }
  return $renderList$$
};
Blockly.ConnectionDB = function $Blockly$ConnectionDB$() {
};
Blockly.ConnectionDB.prototype = [];
Blockly.ConnectionDB.constructor = Blockly.ConnectionDB;
Blockly.ConnectionDB.prototype.addConnection_ = function $Blockly$ConnectionDB$$addConnection_$($connection$$) {
  if($connection$$.inDB_) {
    throw"Connection already in database.";
  }
  for(var $pointerMin$$ = 0, $pointerMax$$ = this.length;$pointerMin$$ < $pointerMax$$;) {
    var $pointerMid$$ = Math.floor(($pointerMin$$ + $pointerMax$$) / 2);
    if(this[$pointerMid$$].y_ < $connection$$.y_) {
      $pointerMin$$ = $pointerMid$$ + 1
    }else {
      if(this[$pointerMid$$].y_ > $connection$$.y_) {
        $pointerMax$$ = $pointerMid$$
      }else {
        $pointerMin$$ = $pointerMid$$;
        break
      }
    }
  }
  this.splice($pointerMin$$, 0, $connection$$);
  $connection$$.inDB_ = !0
};
Blockly.ConnectionDB.prototype.removeConnection_ = function $Blockly$ConnectionDB$$removeConnection_$($connection$$) {
  if(!$connection$$.inDB_) {
    throw"Connection not in database.";
  }
  $connection$$.inDB_ = !1;
  for(var $pointerMin$$ = 0, $pointerMax$$ = this.length - 2, $pointerMid$$ = $pointerMax$$;$pointerMin$$ < $pointerMid$$;) {
    this[$pointerMid$$].y_ < $connection$$.y_ ? $pointerMin$$ = $pointerMid$$ : $pointerMax$$ = $pointerMid$$, $pointerMid$$ = Math.floor(($pointerMin$$ + $pointerMax$$) / 2)
  }
  for($pointerMax$$ = $pointerMin$$ = $pointerMid$$;0 <= $pointerMin$$ && this[$pointerMin$$].y_ == $connection$$.y_;) {
    if(this[$pointerMin$$] == $connection$$) {
      this.splice($pointerMin$$, 1);
      return
    }
    $pointerMin$$--
  }
  do {
    if(this[$pointerMax$$] == $connection$$) {
      this.splice($pointerMax$$, 1);
      return
    }
    $pointerMax$$++
  }while($pointerMax$$ < this.length && this[$pointerMax$$].y_ == $connection$$.y_);
  throw"Unable to find connection in connectionDB.";
};
Blockly.ConnectionDB.init = function $Blockly$ConnectionDB$init$($workspace$$) {
  var $dbList$$ = [];
  $dbList$$[Blockly.INPUT_VALUE] = new Blockly.ConnectionDB;
  $dbList$$[Blockly.OUTPUT_VALUE] = new Blockly.ConnectionDB;
  $dbList$$[Blockly.NEXT_STATEMENT] = new Blockly.ConnectionDB;
  $dbList$$[Blockly.PREVIOUS_STATEMENT] = new Blockly.ConnectionDB;
  $workspace$$.connectionDBList = $dbList$$
};
Blockly.Blocks = {};
Blockly.Comment = function $Blockly$Comment$($block$$) {
  Blockly.Comment.superClass_.constructor.call(this, $block$$);
  this.createIcon_()
};
goog.inherits(Blockly.Comment, Blockly.Icon);
Blockly.Comment.prototype.text_ = "";
Blockly.Comment.prototype.width_ = 160;
Blockly.Comment.prototype.height_ = 80;
Blockly.Comment.prototype.createIcon_ = function $Blockly$Comment$$createIcon_$() {
  Blockly.Icon.prototype.createIcon_.call(this);
  Blockly.createSvgElement("circle", {"class":"blocklyIconShield", r:Blockly.Icon.RADIUS, cx:Blockly.Icon.RADIUS, cy:Blockly.Icon.RADIUS}, this.iconGroup_);
  this.iconMark_ = Blockly.createSvgElement("text", {"class":"blocklyIconMark", x:Blockly.Icon.RADIUS, y:2 * Blockly.Icon.RADIUS - 3}, this.iconGroup_);
  this.iconMark_.appendChild(document.createTextNode("?"))
};
Blockly.Comment.prototype.createEditor_ = function $Blockly$Comment$$createEditor_$() {
  this.foreignObject_ = Blockly.createSvgElement("foreignObject", {x:Blockly.Bubble.BORDER_WIDTH, y:Blockly.Bubble.BORDER_WIDTH}, null);
  var $body$$ = document.createElementNS(Blockly.HTML_NS, "body");
  $body$$.setAttribute("xmlns", Blockly.HTML_NS);
  $body$$.className = "blocklyMinimalBody";
  this.textarea_ = document.createElementNS(Blockly.HTML_NS, "textarea");
  this.textarea_.className = "blocklyCommentTextarea";
  this.textarea_.setAttribute("dir", Blockly.RTL ? "RTL" : "LTR");
  $body$$.appendChild(this.textarea_);
  this.foreignObject_.appendChild($body$$);
  Blockly.bindEvent_(this.textarea_, "mouseup", this, this.textareaFocus_);
  return this.foreignObject_
};
Blockly.Comment.prototype.resizeBubble_ = function $Blockly$Comment$$resizeBubble_$() {
  var $size$$ = this.bubble_.getBubbleSize(), $doubleBorderWidth$$ = 2 * Blockly.Bubble.BORDER_WIDTH;
  this.foreignObject_.setAttribute("width", $size$$.width - $doubleBorderWidth$$);
  this.foreignObject_.setAttribute("height", $size$$.height - $doubleBorderWidth$$);
  this.textarea_.style.width = $size$$.width - $doubleBorderWidth$$ - 4 + "px";
  this.textarea_.style.height = $size$$.height - $doubleBorderWidth$$ - 4 + "px"
};
Blockly.Comment.prototype.setVisible = function $Blockly$Comment$$setVisible$($visible$$) {
  if($visible$$ != this.isVisible()) {
    var $text$$ = this.getText(), $size$$ = this.getBubbleSize();
    $visible$$ ? (this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svg_.svgGroup_, this.iconX_, this.iconY_, this.width_, this.height_), this.bubble_.registerResizeEvent(this, this.resizeBubble_), this.updateColour(), this.text_ = null) : (this.bubble_.dispose(), this.foreignObject_ = this.textarea_ = this.bubble_ = null);
    this.setText($text$$);
    this.setBubbleSize($size$$.width, $size$$.height)
  }
};
Blockly.Comment.prototype.textareaFocus_ = function $Blockly$Comment$$textareaFocus_$($e$$) {
  this.bubble_.promote_();
  this.textarea_.focus()
};
Blockly.Comment.prototype.getBubbleSize = function $Blockly$Comment$$getBubbleSize$() {
  return this.isVisible() ? this.bubble_.getBubbleSize() : {width:this.width_, height:this.height_}
};
Blockly.Comment.prototype.setBubbleSize = function $Blockly$Comment$$setBubbleSize$($width$$, $height$$) {
  this.isVisible() ? this.bubble_.setBubbleSize($width$$, $height$$) : (this.width_ = $width$$, this.height_ = $height$$)
};
Blockly.Comment.prototype.getText = function $Blockly$Comment$$getText$() {
  return this.isVisible() ? this.textarea_.value : this.text_
};
Blockly.Comment.prototype.setText = function $Blockly$Comment$$setText$($text$$) {
  this.isVisible() ? this.textarea_.value = $text$$ : this.text_ = $text$$
};
Blockly.Comment.prototype.dispose = function $Blockly$Comment$$dispose$() {
  this.block_.comment = null;
  Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Tooltip = {};
Blockly.Tooltip.visible = !1;
Blockly.Tooltip.mouseOutPid_ = 0;
Blockly.Tooltip.showPid_ = 0;
Blockly.Tooltip.lastXY_ = {x:0, y:0};
Blockly.Tooltip.element_ = null;
Blockly.Tooltip.poisonedElement_ = null;
Blockly.Tooltip.svgGroup_ = null;
Blockly.Tooltip.svgText_ = null;
Blockly.Tooltip.svgBackground_ = null;
Blockly.Tooltip.svgShadow_ = null;
Blockly.Tooltip.OFFSET_X = 0;
Blockly.Tooltip.OFFSET_Y = 10;
Blockly.Tooltip.RADIUS_OK = 10;
Blockly.Tooltip.HOVER_MS = 1E3;
Blockly.Tooltip.MARGINS = 5;
Blockly.Tooltip.createDom = function $Blockly$Tooltip$createDom$() {
  var $svgGroup$$ = Blockly.createSvgElement("g", {"class":"blocklyHidden"}, null);
  Blockly.Tooltip.svgGroup_ = $svgGroup$$;
  Blockly.Tooltip.svgShadow_ = Blockly.createSvgElement("rect", {"class":"blocklyTooltipShadow", x:2, y:2}, $svgGroup$$);
  Blockly.Tooltip.svgBackground_ = Blockly.createSvgElement("rect", {"class":"blocklyTooltipBackground"}, $svgGroup$$);
  Blockly.Tooltip.svgText_ = Blockly.createSvgElement("text", {"class":"blocklyTooltipText"}, $svgGroup$$);
  return $svgGroup$$
};
Blockly.Tooltip.bindMouseEvents = function $Blockly$Tooltip$bindMouseEvents$($element$$) {
  Blockly.bindEvent_($element$$, "mouseover", null, Blockly.Tooltip.onMouseOver_);
  Blockly.bindEvent_($element$$, "mouseout", null, Blockly.Tooltip.onMouseOut_);
  Blockly.bindEvent_($element$$, "mousemove", null, Blockly.Tooltip.onMouseMove_)
};
Blockly.Tooltip.onMouseOver_ = function $Blockly$Tooltip$onMouseOver_$($e$$44_element$$) {
  for($e$$44_element$$ = $e$$44_element$$.target;!goog.isString($e$$44_element$$.tooltip) && !goog.isFunction($e$$44_element$$.tooltip);) {
    $e$$44_element$$ = $e$$44_element$$.tooltip
  }
  Blockly.Tooltip.element_ != $e$$44_element$$ && (Blockly.Tooltip.hide(), Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.element_ = $e$$44_element$$);
  window.clearTimeout(Blockly.Tooltip.mouseOutPid_)
};
Blockly.Tooltip.onMouseOut_ = function $Blockly$Tooltip$onMouseOut_$($e$$) {
  Blockly.Tooltip.mouseOutPid_ = window.setTimeout(function() {
    Blockly.Tooltip.element_ = null;
    Blockly.Tooltip.poisonedElement_ = null;
    Blockly.Tooltip.hide()
  }, 1);
  window.clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.onMouseMove_ = function $Blockly$Tooltip$onMouseMove_$($e$$46_mouseXY$$) {
  if(Blockly.Tooltip.element_ && Blockly.Tooltip.element_.tooltip && !(Blockly.ContextMenu && Blockly.ContextMenu.visible || 0 != Blockly.Block.dragMode_)) {
    if(Blockly.Tooltip.visible) {
      $e$$46_mouseXY$$ = Blockly.mouseToSvg($e$$46_mouseXY$$);
      var $dy$$ = Blockly.Tooltip.lastXY_.y - $e$$46_mouseXY$$.y;
      Math.sqrt(Math.pow(Blockly.Tooltip.lastXY_.x - $e$$46_mouseXY$$.x, 2) + Math.pow($dy$$, 2)) > Blockly.Tooltip.RADIUS_OK && Blockly.Tooltip.hide()
    }else {
      Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_ && (window.clearTimeout(Blockly.Tooltip.showPid_), Blockly.Tooltip.lastXY_ = Blockly.mouseToSvg($e$$46_mouseXY$$), Blockly.Tooltip.showPid_ = window.setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS))
    }
  }
};
Blockly.Tooltip.hide = function $Blockly$Tooltip$hide$() {
  Blockly.Tooltip.visible && (Blockly.Tooltip.visible = !1, Blockly.Tooltip.svgGroup_ && (Blockly.Tooltip.svgGroup_.style.display = "none"));
  window.clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.show_ = function $Blockly$Tooltip$show_$() {
  Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
  if(Blockly.Tooltip.svgGroup_) {
    goog.dom.removeChildren(Blockly.Tooltip.svgText_);
    var $bBox$$4_lines$$ = Blockly.Tooltip.element_.tooltip;
    goog.isFunction($bBox$$4_lines$$) && ($bBox$$4_lines$$ = $bBox$$4_lines$$());
    for(var $bBox$$4_lines$$ = $bBox$$4_lines$$.split("\n"), $anchorY$$2_i$$88_width$$ = 0;$anchorY$$2_i$$88_width$$ < $bBox$$4_lines$$.length;$anchorY$$2_i$$88_width$$++) {
      var $anchorX$$2_height$$20_maxWidth$$ = Blockly.createSvgElement("tspan", {dy:"1em", x:Blockly.Tooltip.MARGINS}, Blockly.Tooltip.svgText_), $svgSize$$1_textNode$$4_x$$ = document.createTextNode($bBox$$4_lines$$[$anchorY$$2_i$$88_width$$]);
      $anchorX$$2_height$$20_maxWidth$$.appendChild($svgSize$$1_textNode$$4_x$$)
    }
    Blockly.Tooltip.visible = !0;
    Blockly.Tooltip.svgGroup_.style.display = "block";
    0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident") ? (Blockly.Tooltip.svgText_.style.display = "inline", $bBox$$4_lines$$ = {x:Blockly.Tooltip.svgText_.getBBox().x, y:Blockly.Tooltip.svgText_.getBBox().y, width:Blockly.Tooltip.svgText_.scrollWidth, height:Blockly.Tooltip.svgText_.scrollHeight}) : $bBox$$4_lines$$ = Blockly.Tooltip.svgText_.getBBox();
    $anchorY$$2_i$$88_width$$ = 2 * Blockly.Tooltip.MARGINS + $bBox$$4_lines$$.width;
    $anchorX$$2_height$$20_maxWidth$$ = $bBox$$4_lines$$.height;
    Blockly.Tooltip.svgBackground_.setAttribute("width", $anchorY$$2_i$$88_width$$);
    Blockly.Tooltip.svgBackground_.setAttribute("height", $anchorX$$2_height$$20_maxWidth$$);
    Blockly.Tooltip.svgShadow_.setAttribute("width", $anchorY$$2_i$$88_width$$);
    Blockly.Tooltip.svgShadow_.setAttribute("height", $anchorX$$2_height$$20_maxWidth$$);
    if(Blockly.RTL) {
      for(var $anchorX$$2_height$$20_maxWidth$$ = $bBox$$4_lines$$.width, $svgSize$$1_textNode$$4_x$$ = 0, $textElement$$;$textElement$$ = Blockly.Tooltip.svgText_.childNodes[$svgSize$$1_textNode$$4_x$$];$svgSize$$1_textNode$$4_x$$++) {
        $textElement$$.setAttribute("text-anchor", "end"), $textElement$$.setAttribute("x", $anchorX$$2_height$$20_maxWidth$$ + Blockly.Tooltip.MARGINS)
      }
    }
    $anchorX$$2_height$$20_maxWidth$$ = Blockly.Tooltip.lastXY_.x;
    $anchorX$$2_height$$20_maxWidth$$ = Blockly.RTL ? $anchorX$$2_height$$20_maxWidth$$ - (Blockly.Tooltip.OFFSET_X + $anchorY$$2_i$$88_width$$) : $anchorX$$2_height$$20_maxWidth$$ + Blockly.Tooltip.OFFSET_X;
    $anchorY$$2_i$$88_width$$ = Blockly.Tooltip.lastXY_.y + Blockly.Tooltip.OFFSET_Y;
    $svgSize$$1_textNode$$4_x$$ = Blockly.svgSize();
    $anchorY$$2_i$$88_width$$ + $bBox$$4_lines$$.height > $svgSize$$1_textNode$$4_x$$.height && ($anchorY$$2_i$$88_width$$ -= $bBox$$4_lines$$.height + 2 * Blockly.Tooltip.OFFSET_Y);
    Blockly.RTL ? $anchorX$$2_height$$20_maxWidth$$ = Math.max(Blockly.Tooltip.MARGINS, $anchorX$$2_height$$20_maxWidth$$) : $anchorX$$2_height$$20_maxWidth$$ + $bBox$$4_lines$$.width > $svgSize$$1_textNode$$4_x$$.width - 2 * Blockly.Tooltip.MARGINS && ($anchorX$$2_height$$20_maxWidth$$ = $svgSize$$1_textNode$$4_x$$.width - $bBox$$4_lines$$.width - 2 * Blockly.Tooltip.MARGINS);
    Blockly.Tooltip.svgGroup_.setAttribute("transform", "translate(" + $anchorX$$2_height$$20_maxWidth$$ + "," + $anchorY$$2_i$$88_width$$ + ")")
  }
};
Blockly.FieldLabel = function $Blockly$FieldLabel$($text$$) {
  this.sourceBlock_ = null;
  this.textElement_ = Blockly.createSvgElement("text", {"class":"blocklyText"}, null);
  this.size_ = {height:25, width:0};
  this.setText($text$$)
};
goog.inherits(Blockly.FieldLabel, Blockly.Field);
Blockly.FieldLabel.prototype.EDITABLE = !1;
Blockly.FieldLabel.prototype.init = function $Blockly$FieldLabel$$init$($block$$) {
  if(this.sourceBlock_) {
    throw"Text has already been initialized once.";
  }
  this.sourceBlock_ = $block$$;
  $block$$.getSvgRoot().appendChild(this.textElement_);
  this.textElement_.tooltip = this.sourceBlock_;
  Blockly.Tooltip && Blockly.Tooltip.bindMouseEvents(this.textElement_)
};
Blockly.FieldLabel.prototype.dispose = function $Blockly$FieldLabel$$dispose$() {
  goog.dom.removeNode(this.textElement_);
  this.textElement_ = null
};
Blockly.FieldLabel.prototype.getRootElement = function $Blockly$FieldLabel$$getRootElement$() {
  return this.textElement_
};
Blockly.FieldLabel.prototype.setTooltip = function $Blockly$FieldLabel$$setTooltip$($newTip$$) {
  this.textElement_.tooltip = $newTip$$
};
Blockly.Input = function $Blockly$Input$($type$$, $name$$, $block$$, $connection$$) {
  this.type = $type$$;
  this.name = $name$$;
  this.sourceBlock_ = $block$$;
  this.connection = $connection$$;
  this.titleRow = [];
  this.align = Blockly.ALIGN_LEFT;
  this.visible_ = !0
};
Blockly.Input.prototype.appendTitle = function $Blockly$Input$$appendTitle$($title$$, $opt_name$$) {
  if(!$title$$ && !$opt_name$$) {
    return this
  }
  goog.isString($title$$) && ($title$$ = new Blockly.FieldLabel($title$$));
  this.sourceBlock_.svg_ && $title$$.init(this.sourceBlock_);
  $title$$.name = $opt_name$$;
  $title$$.prefixTitle && this.appendTitle($title$$.prefixTitle);
  this.titleRow.push($title$$);
  $title$$.suffixTitle && this.appendTitle($title$$.suffixTitle);
  this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_());
  return this
};
Blockly.Input.prototype.isVisible = function $Blockly$Input$$isVisible$() {
  return this.visible_
};
Blockly.Input.prototype.setVisible = function $Blockly$Input$$setVisible$($visible$$) {
  var $renderList$$ = [];
  if(this.visible_ == $visible$$) {
    return $renderList$$
  }
  for(var $display$$ = (this.visible_ = $visible$$) ? "block" : "none", $child$$32_y$$ = 0, $title$$;$title$$ = this.titleRow[$child$$32_y$$];$child$$32_y$$++) {
    $title$$.setVisible($visible$$)
  }
  this.connection && ($renderList$$ = $visible$$ ? this.connection.unhideAll() : this.connection.hideAll(), $child$$32_y$$ = this.connection.targetBlock()) && ($child$$32_y$$.svg_.getRootElement().style.display = $display$$, $visible$$ || ($child$$32_y$$.rendered = !1));
  return $renderList$$
};
Blockly.Input.prototype.setCheck = function $Blockly$Input$$setCheck$($check$$) {
  if(!this.connection) {
    throw"This input does not have a connection.";
  }
  this.connection.setCheck($check$$);
  return this
};
Blockly.Input.prototype.setAlign = function $Blockly$Input$$setAlign$($align$$) {
  this.align = $align$$;
  this.sourceBlock_.rendered && this.sourceBlock_.render();
  return this
};
Blockly.Input.prototype.init = function $Blockly$Input$$init$() {
  for(var $x$$ = 0;$x$$ < this.titleRow.length;$x$$++) {
    this.titleRow[$x$$].init(this.sourceBlock_)
  }
};
Blockly.Input.prototype.dispose = function $Blockly$Input$$dispose$() {
  for(var $i$$ = 0, $title$$;$title$$ = this.titleRow[$i$$];$i$$++) {
    $title$$.dispose()
  }
  this.connection && this.connection.dispose();
  this.sourceBlock_ = null
};
Blockly.Warning = function $Blockly$Warning$($block$$) {
  Blockly.Warning.superClass_.constructor.call(this, $block$$);
  this.createIcon_()
};
goog.inherits(Blockly.Warning, Blockly.Icon);
Blockly.Warning.prototype.text_ = "";
Blockly.Warning.prototype.createIcon_ = function $Blockly$Warning$$createIcon_$() {
  Blockly.Icon.prototype.createIcon_.call(this);
  Blockly.createSvgElement("path", {"class":"blocklyIconShield", d:"M 2,15 Q -1,15 0.5,12 L 6.5,1.7 Q 8,-1 9.5,1.7 L 15.5,12 Q 17,15 14,15 z"}, this.iconGroup_);
  this.iconMark_ = Blockly.createSvgElement("text", {"class":"blocklyIconMark", x:Blockly.Icon.RADIUS, y:2 * Blockly.Icon.RADIUS - 3}, this.iconGroup_);
  this.iconMark_.appendChild(document.createTextNode("!"))
};
Blockly.Warning.prototype.textToDom_ = function $Blockly$Warning$$textToDom_$($lines$$2_text$$) {
  var $paragraph$$ = Blockly.createSvgElement("text", {"class":"blocklyText", y:Blockly.Bubble.BORDER_WIDTH}, null);
  $lines$$2_text$$ = $lines$$2_text$$.split("\n");
  for(var $i$$ = 0;$i$$ < $lines$$2_text$$.length;$i$$++) {
    var $tspanElement$$ = Blockly.createSvgElement("tspan", {dy:"1em", x:Blockly.Bubble.BORDER_WIDTH}, $paragraph$$), $textNode$$ = document.createTextNode($lines$$2_text$$[$i$$]);
    $tspanElement$$.appendChild($textNode$$)
  }
  return $paragraph$$
};
Blockly.Warning.prototype.setVisible = function $Blockly$Warning$$setVisible$($paragraph$$1_size$$17_visible$$) {
  if($paragraph$$1_size$$17_visible$$ != this.isVisible()) {
    if($paragraph$$1_size$$17_visible$$) {
      $paragraph$$1_size$$17_visible$$ = this.textToDom_(this.text_);
      this.bubble_ = new Blockly.Bubble(this.block_.workspace, $paragraph$$1_size$$17_visible$$, this.block_.svg_.svgGroup_, this.iconX_, this.iconY_, null, null);
      if(Blockly.RTL) {
        if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
          $paragraph$$1_size$$17_visible$$.style.display = "inline";
          var $maxWidth$$ = {x:$paragraph$$1_size$$17_visible$$.getBBox().x, y:$paragraph$$1_size$$17_visible$$.getBBox().y, width:$paragraph$$1_size$$17_visible$$.scrollWidth, height:$paragraph$$1_size$$17_visible$$.scrollHeight}.width
        }else {
          $maxWidth$$ = $paragraph$$1_size$$17_visible$$.getBBox().width
        }
        for(var $x$$ = 0, $textElement$$;$textElement$$ = $paragraph$$1_size$$17_visible$$.childNodes[$x$$];$x$$++) {
          $textElement$$.setAttribute("text-anchor", "end"), $textElement$$.setAttribute("x", $maxWidth$$ + Blockly.Bubble.BORDER_WIDTH)
        }
      }
      this.updateColour();
      $paragraph$$1_size$$17_visible$$ = this.bubble_.getBubbleSize();
      this.bubble_.setBubbleSize($paragraph$$1_size$$17_visible$$.width, $paragraph$$1_size$$17_visible$$.height)
    }else {
      this.bubble_.dispose(), this.foreignObject_ = this.body_ = this.bubble_ = null
    }
  }
};
Blockly.Warning.prototype.bodyFocus_ = function $Blockly$Warning$$bodyFocus_$($e$$) {
  this.bubble_.promote_()
};
Blockly.Warning.prototype.setText = function $Blockly$Warning$$setText$($text$$) {
  this.text_ = $text$$;
  this.isVisible() && (this.setVisible(!1), this.setVisible(!0))
};
Blockly.Warning.prototype.dispose = function $Blockly$Warning$$dispose$() {
  this.block_.warning = null;
  Blockly.Icon.prototype.dispose.call(this)
};
Blockly.uidCounter_ = 0;
Blockly.Block = function $Blockly$Block$($workspace$$, $prototypeName$$, $htmlId_prototype$$) {
  this.id = ++Blockly.uidCounter_;
  this.htmlId = $htmlId_prototype$$;
  this.previousConnection = this.nextConnection = this.outputConnection = null;
  this.inputList = [];
  this.disabled = this.rendered = this.inputsInline = !1;
  this.tooltip = "";
  this.contextMenu = !0;
  this.parentBlock_ = null;
  this.childBlocks_ = [];
  this.editable_ = this.movable_ = this.deletable_ = !0;
  this.collapsed_ = !1;
  this.workspace = $workspace$$;
  this.isInFlyout = $workspace$$.isFlyout;
  this.colourSaturation_ = 0.45;
  this.colourValue_ = 0.65;
  $workspace$$.addTopBlock(this);
  if($prototypeName$$) {
    this.type = $prototypeName$$;
    $htmlId_prototype$$ = Blockly.Blocks[$prototypeName$$];
    if(!$htmlId_prototype$$) {
      throw'Error: "' + $prototypeName$$ + '" is an unknown language block.';
    }
    goog.mixin(this, $htmlId_prototype$$)
  }
  goog.isFunction(this.init) && this.init();
  goog.isFunction(this.onchange) && Blockly.bindEvent_($workspace$$.getCanvas(), "blocklyWorkspaceChange", this, this.onchange)
};
Blockly.Block.prototype.svg_ = null;
Blockly.Block.prototype.mutator = null;
Blockly.Block.prototype.comment = null;
Blockly.Block.prototype.warning = null;
Blockly.Block.prototype.getIcons = function $Blockly$Block$$getIcons$() {
  var $icons$$ = [];
  this.mutator && $icons$$.push(this.mutator);
  this.comment && $icons$$.push(this.comment);
  this.warning && $icons$$.push(this.warning);
  return $icons$$
};
Blockly.Block.prototype.initSvg = function $Blockly$Block$$initSvg$() {
  this.svg_ = new Blockly.BlockSvg(this);
  this.svg_.init();
  Blockly.readOnly || Blockly.bindEvent_(this.svg_.getRootElement(), "mousedown", this, this.onMouseDown_);
  this.workspace.getCanvas().appendChild(this.svg_.getRootElement())
};
Blockly.Block.prototype.getSvgRoot = function $Blockly$Block$$getSvgRoot$() {
  return this.svg_ && this.svg_.getRootElement()
};
Blockly.Block.dragMode_ = 0;
Blockly.Block.onMouseUpWrapper_ = null;
Blockly.Block.onMouseMoveWrapper_ = null;
Blockly.Block.terminateDrag_ = function $Blockly$Block$terminateDrag_$() {
  Blockly.Block.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Block.onMouseUpWrapper_), Blockly.Block.onMouseUpWrapper_ = null);
  Blockly.Block.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Block.onMouseMoveWrapper_), Blockly.Block.onMouseMoveWrapper_ = null);
  var $selected$$ = Blockly.selected;
  if(2 == Blockly.Block.dragMode_ && $selected$$) {
    var $xy$$ = $selected$$.getRelativeToSurfaceXY();
    $selected$$.moveConnections_($xy$$.x - $selected$$.startDragX, $xy$$.y - $selected$$.startDragY);
    delete $selected$$.draggedBubbles_;
    $selected$$.setDragging_(!1);
    $selected$$.render();
    goog.Timer.callOnce($selected$$.bumpNeighbours_, Blockly.BUMP_DELAY, $selected$$);
    Blockly.fireUiEvent(window, "resize")
  }
  $selected$$ && $selected$$.workspace.fireChangeEvent();
  Blockly.Block.dragMode_ = 0
};
Blockly.Block.prototype.select = function $Blockly$Block$$select$() {
  if(!this.svg_) {
    throw"Block is not rendered.";
  }
  Blockly.selected && Blockly.selected.unselect();
  Blockly.selected = this;
  this.svg_.addSelect();
  Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.Block.prototype.unselect = function $Blockly$Block$$unselect$() {
  if(!this.svg_) {
    throw"Block is not rendered.";
  }
  Blockly.selected = null;
  this.svg_.removeSelect();
  Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.Block.prototype.dispose = function $Blockly$Block$$dispose$($healStack$$, $animate$$) {
  this.rendered = !1;
  this.unplug($healStack$$);
  $animate$$ && this.svg_ && this.svg_.disposeUiEffect();
  this.workspace.removeTopBlock(this);
  this.workspace = null;
  Blockly.selected == this && (Blockly.selected = null, Blockly.terminateDrag_());
  for(var $x$$ = this.childBlocks_.length - 1;0 <= $x$$;$x$$--) {
    this.childBlocks_[$x$$].dispose(!1)
  }
  for(var $connections$$2_icons$$4_input$$ = this.getIcons(), $x$$ = 0;$x$$ < $connections$$2_icons$$4_input$$.length;$x$$++) {
    $connections$$2_icons$$4_input$$[$x$$].dispose()
  }
  for($x$$ = 0;$connections$$2_icons$$4_input$$ = this.inputList[$x$$];$x$$++) {
    $connections$$2_icons$$4_input$$.dispose()
  }
  this.inputList = [];
  $connections$$2_icons$$4_input$$ = this.getConnections_(!0);
  for($x$$ = 0;$x$$ < $connections$$2_icons$$4_input$$.length;$x$$++) {
    var $connection$$ = $connections$$2_icons$$4_input$$[$x$$];
    $connection$$.targetConnection && $connection$$.disconnect();
    $connections$$2_icons$$4_input$$[$x$$].dispose()
  }
  this.svg_ && (this.svg_.dispose(), this.svg_ = null)
};
Blockly.Block.prototype.unplug = function $Blockly$Block$$unplug$($healStack$$, $bump$$) {
  $bump$$ = $bump$$ && !!this.getParent();
  if(this.outputConnection) {
    this.outputConnection.targetConnection && this.setParent(null)
  }else {
    var $previousTarget$$ = null;
    this.previousConnection && this.previousConnection.targetConnection && ($previousTarget$$ = this.previousConnection.targetConnection, this.setParent(null));
    if($healStack$$ && this.nextConnection && this.nextConnection.targetConnection) {
      var $nextTarget$$ = this.nextConnection.targetConnection;
      this.nextConnection.targetBlock().setParent(null);
      $previousTarget$$ && $previousTarget$$.connect($nextTarget$$)
    }
  }
  $bump$$ && this.moveBy(Blockly.SNAP_RADIUS * (Blockly.RTL ? -1 : 1), 2 * Blockly.SNAP_RADIUS)
};
Blockly.Block.prototype.getRelativeToSurfaceXY = function $Blockly$Block$$getRelativeToSurfaceXY$() {
  var $x$$ = 0, $y$$ = 0;
  if(this.svg_) {
    var $element$$ = this.svg_.getRootElement();
    do {
      var $xy$$ = Blockly.getRelativeXY_($element$$), $x$$ = $x$$ + $xy$$.x, $y$$ = $y$$ + $xy$$.y, $element$$ = $element$$.parentNode
    }while($element$$ && $element$$ != this.workspace.getCanvas())
  }
  return{x:$x$$, y:$y$$}
};
Blockly.Block.prototype.moveBy = function $Blockly$Block$$moveBy$($dx$$, $dy$$) {
  var $xy$$ = this.getRelativeToSurfaceXY();
  this.svg_.getRootElement().setAttribute("transform", "translate(" + ($xy$$.x + $dx$$) + ", " + ($xy$$.y + $dy$$) + ")");
  this.moveConnections_($dx$$, $dy$$)
};
Blockly.Block.prototype.getHeightWidth = function $Blockly$Block$$getHeightWidth$() {
  try {
    if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
      this.getSvgRoot().style.display = "inline";
      var $bBox$$ = {x:this.getSvgRoot().getBBox().x, y:this.getSvgRoot().getBBox().y, width:this.getSvgRoot().scrollWidth, height:this.getSvgRoot().scrollHeight}
    }else {
      $bBox$$ = this.getSvgRoot().getBBox()
    }
  }catch($e$$) {
    return{height:0, width:0}
  }
  Blockly.BROKEN_CONTROL_POINTS && ($bBox$$.height -= 10, this.nextConnection && ($bBox$$.height += 4));
  $bBox$$.height -= 1;
  return $bBox$$
};
Blockly.Block.prototype.onMouseDown_ = function $Blockly$Block$$onMouseDown_$($e$$) {
  if(!this.isInFlyout) {
    Blockly.svgResize();
    Blockly.terminateDrag_();
    this.select();
    Blockly.hideChaff();
    if(Blockly.isRightButton($e$$)) {
      Blockly.ContextMenu && this.showContextMenu_(Blockly.mouseToSvg($e$$))
    }else {
      if(this.isMovable()) {
        Blockly.removeAllRanges();
        Blockly.setCursorHand_(!0);
        var $descendants$$1_xy$$ = this.getRelativeToSurfaceXY();
        this.startDragX = $descendants$$1_xy$$.x;
        this.startDragY = $descendants$$1_xy$$.y;
        this.startDragMouseX = $e$$.clientX;
        this.startDragMouseY = $e$$.clientY;
        Blockly.Block.dragMode_ = 1;
        Blockly.Block.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, this.onMouseUp_);
        Blockly.Block.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMove_);
        this.draggedBubbles_ = [];
        for(var $descendants$$1_xy$$ = this.getDescendants(), $x$$ = 0, $descendant$$2_icons$$;$descendant$$2_icons$$ = $descendants$$1_xy$$[$x$$];$x$$++) {
          $descendant$$2_icons$$ = $descendant$$2_icons$$.getIcons();
          for(var $y$$ = 0;$y$$ < $descendant$$2_icons$$.length;$y$$++) {
            var $data$$ = $descendant$$2_icons$$[$y$$].getIconLocation();
            $data$$.bubble = $descendant$$2_icons$$[$y$$];
            this.draggedBubbles_.push($data$$)
          }
        }
      }else {
        return
      }
    }
    $e$$.stopPropagation()
  }
};
Blockly.Block.prototype.onMouseUp_ = function $Blockly$Block$$onMouseUp_$($e$$) {
  Blockly.terminateDrag_();
  Blockly.selected && Blockly.highlightedConnection_ ? (Blockly.localConnection_.connect(Blockly.highlightedConnection_), this.svg_ && (Blockly.localConnection_.isSuperior() ? Blockly.highlightedConnection_ : Blockly.localConnection_).sourceBlock_.svg_.connectionUiEffect(), this.workspace.trashcan && this.workspace.trashcan.isOpen && this.workspace.trashcan.close()) : this.workspace.trashcan && this.workspace.trashcan.isOpen && ($e$$ = this.workspace.trashcan, goog.Timer.callOnce($e$$.close, 100, 
  $e$$), Blockly.selected.dispose(!1, !0), Blockly.fireUiEvent(window, "resize"));
  Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null)
};
Blockly.Block.prototype.showHelp_ = function $Blockly$Block$$showHelp_$() {
  var $url$$ = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
  $url$$ && window.open($url$$)
};
Blockly.Block.prototype.duplicate_ = function $Blockly$Block$$duplicate_$() {
  var $newBlock$$2_xmlBlock$$ = Blockly.Xml.blockToDom_(this);
  Blockly.Xml.deleteNext($newBlock$$2_xmlBlock$$);
  var $newBlock$$2_xmlBlock$$ = Blockly.Xml.domToBlock_(this.workspace, $newBlock$$2_xmlBlock$$), $xy$$ = this.getRelativeToSurfaceXY();
  $xy$$.x = Blockly.RTL ? $xy$$.x - Blockly.SNAP_RADIUS : $xy$$.x + Blockly.SNAP_RADIUS;
  $xy$$.y += 2 * Blockly.SNAP_RADIUS;
  $newBlock$$2_xmlBlock$$.moveBy($xy$$.x, $xy$$.y);
  return $newBlock$$2_xmlBlock$$
};
Blockly.Block.prototype.showContextMenu_ = function $Blockly$Block$$showContextMenu_$($xy$$) {
  if(!Blockly.readOnly && this.contextMenu) {
    var $block$$ = this, $options$$ = [];
    if(this.isDeletable() && !$block$$.isInFlyout) {
      var $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {text:Blockly.Msg.DUPLICATE_BLOCK, enabled:!0, callback:function() {
        $block$$.duplicate_()
      }};
      this.getDescendants().length > this.workspace.remainingCapacity() && ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.enabled = !1);
      $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$);
      Blockly.Comment && !this.collapsed_ && ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {enabled:!0}, this.comment ? ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = Blockly.Msg.REMOVE_COMMENT, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.setCommentText(null)
      }) : ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = Blockly.Msg.ADD_COMMENT, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.setCommentText("")
      }), $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$));
      if(!this.collapsed_) {
        for($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = 0;$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ < this.inputList.length;$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$++) {
          if(this.inputList[$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$].type == Blockly.INPUT_VALUE) {
            $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {enabled:!0};
            $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = this.inputsInline ? Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
            $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
              $block$$.setInputsInline(!$block$$.inputsInline)
            };
            $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$);
            break
          }
        }
      }
      Blockly.collapse && (this.collapsed_ ? ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {enabled:!0}, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = Blockly.Msg.EXPAND_BLOCK, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.setCollapsed(!1)
      }) : ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {enabled:!0}, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = Blockly.Msg.COLLAPSE_BLOCK, $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.setCollapsed(!0)
      }), $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$));
      $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {text:this.disabled ? Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK, enabled:!this.getInheritedDisabled(), callback:function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.setDisabled(!$block$$.disabled)
      }};
      $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$);
      $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = this.getDescendants().length;
      $block$$.nextConnection && $block$$.nextConnection.targetConnection && ($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ -= this.nextConnection.targetBlock().getDescendants().length);
      $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {text:1 == $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$), enabled:!0, callback:function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
        $block$$.dispose(!0, !0)
      }};
      $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$)
    }
    $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$ = {enabled:!(goog.isFunction(this.helpUrl) ? !this.helpUrl() : !this.helpUrl)};
    $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.text = Blockly.Msg.HELP;
    $collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$.callback = function $$collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$$callback$() {
      $block$$.showHelp_()
    };
    $options$$.push($collapseOption_commentOption_deleteOption_descendantCount_disableOption_duplicateOption_expandOption_helpOption_i$$);
    this.customContextMenu && !$block$$.isInFlyout && this.customContextMenu($options$$);
    Blockly.ContextMenu.show($xy$$, $options$$)
  }
};
Blockly.Block.prototype.getConnections_ = function $Blockly$Block$$getConnections_$($all$$2_x$$) {
  var $myConnections$$ = [];
  if($all$$2_x$$ || this.rendered) {
    if(this.outputConnection && $myConnections$$.push(this.outputConnection), this.nextConnection && $myConnections$$.push(this.nextConnection), this.previousConnection && $myConnections$$.push(this.previousConnection), $all$$2_x$$ || !this.collapsed_) {
      $all$$2_x$$ = 0;
      for(var $input$$;$input$$ = this.inputList[$all$$2_x$$];$all$$2_x$$++) {
        $input$$.connection && $myConnections$$.push($input$$.connection)
      }
    }
  }
  return $myConnections$$
};
Blockly.Block.prototype.moveConnections_ = function $Blockly$Block$$moveConnections_$($dx$$, $dy$$) {
  if(this.rendered) {
    for(var $icons$$6_myConnections$$ = this.getConnections_(!1), $x$$ = 0;$x$$ < $icons$$6_myConnections$$.length;$x$$++) {
      $icons$$6_myConnections$$[$x$$].moveBy($dx$$, $dy$$)
    }
    $icons$$6_myConnections$$ = this.getIcons();
    for($x$$ = 0;$x$$ < $icons$$6_myConnections$$.length;$x$$++) {
      $icons$$6_myConnections$$[$x$$].computeIconLocation()
    }
    for($x$$ = 0;$x$$ < this.childBlocks_.length;$x$$++) {
      this.childBlocks_[$x$$].moveConnections_($dx$$, $dy$$)
    }
  }
};
Blockly.Block.prototype.setDragging_ = function $Blockly$Block$$setDragging_$($adding$$) {
  $adding$$ ? this.svg_.addDragging() : this.svg_.removeDragging();
  for(var $x$$ = 0;$x$$ < this.childBlocks_.length;$x$$++) {
    this.childBlocks_[$x$$].setDragging_($adding$$)
  }
};
Blockly.Block.prototype.onMouseMove_ = function $Blockly$Block$$onMouseMove_$($e$$) {
  if(!("mousemove" == $e$$.type && 1 >= $e$$.clientX && 0 == $e$$.clientY && 0 == $e$$.button)) {
    Blockly.removeAllRanges();
    var $dx$$ = $e$$.clientX - this.startDragMouseX, $dy$$ = $e$$.clientY - this.startDragMouseY;
    1 == Blockly.Block.dragMode_ && Math.sqrt(Math.pow($dx$$, 2) + Math.pow($dy$$, 2)) > Blockly.DRAG_RADIUS && (Blockly.Block.dragMode_ = 2, this.setParent(null), this.setDragging_(!0));
    if(2 == Blockly.Block.dragMode_) {
      var $i$$92_x$$ = this.startDragX + $dx$$, $commentData_myConnections$$2_y$$ = this.startDragY + $dy$$;
      this.svg_.getRootElement().setAttribute("transform", "translate(" + $i$$92_x$$ + ", " + $commentData_myConnections$$2_y$$ + ")");
      for($i$$92_x$$ = 0;$i$$92_x$$ < this.draggedBubbles_.length;$i$$92_x$$++) {
        $commentData_myConnections$$2_y$$ = this.draggedBubbles_[$i$$92_x$$], $commentData_myConnections$$2_y$$.bubble.setIconLocation($commentData_myConnections$$2_y$$.x + $dx$$, $commentData_myConnections$$2_y$$.y + $dy$$)
      }
      for(var $commentData_myConnections$$2_y$$ = this.getConnections_(!1), $closestConnection$$ = null, $localConnection$$ = null, $radiusConnection$$ = Blockly.SNAP_RADIUS, $i$$92_x$$ = 0;$i$$92_x$$ < $commentData_myConnections$$2_y$$.length;$i$$92_x$$++) {
        var $myConnection$$ = $commentData_myConnections$$2_y$$[$i$$92_x$$], $neighbour$$ = $myConnection$$.closest($radiusConnection$$, $dx$$, $dy$$);
        $neighbour$$.connection && ($closestConnection$$ = $neighbour$$.connection, $localConnection$$ = $myConnection$$, $radiusConnection$$ = $neighbour$$.radius)
      }
      Blockly.highlightedConnection_ && Blockly.highlightedConnection_ != $closestConnection$$ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null, Blockly.localConnection_ = null);
      $closestConnection$$ && $closestConnection$$ != Blockly.highlightedConnection_ && ($closestConnection$$.highlight(), Blockly.highlightedConnection_ = $closestConnection$$, Blockly.localConnection_ = $localConnection$$);
      if(this.workspace.trashcan && this.isDeletable()) {
        this.workspace.trashcan.onMouseMove($e$$)
      }
    }
  }
  $e$$.stopPropagation()
};
Blockly.Block.prototype.bumpNeighbours_ = function $Blockly$Block$$bumpNeighbours_$() {
  if(0 == Blockly.Block.dragMode_) {
    var $rootBlock$$ = this.getRootBlock();
    if(!$rootBlock$$.isInFlyout) {
      for(var $myConnections$$ = this.getConnections_(!1), $x$$ = 0;$x$$ < $myConnections$$.length;$x$$++) {
        var $connection$$ = $myConnections$$[$x$$];
        $connection$$.targetConnection && $connection$$.isSuperior() && $connection$$.targetBlock().bumpNeighbours_();
        for(var $neighbours$$ = $connection$$.neighbours_(Blockly.SNAP_RADIUS), $y$$ = 0;$y$$ < $neighbours$$.length;$y$$++) {
          var $otherConnection$$ = $neighbours$$[$y$$];
          $connection$$.targetConnection && $otherConnection$$.targetConnection || $otherConnection$$.sourceBlock_.getRootBlock() != $rootBlock$$ && ($connection$$.isSuperior() ? $otherConnection$$.bumpAwayFrom_($connection$$) : $connection$$.bumpAwayFrom_($otherConnection$$))
        }
      }
    }
  }
};
Blockly.Block.prototype.getParent = function $Blockly$Block$$getParent$() {
  return this.parentBlock_
};
Blockly.Block.prototype.getSurroundParent = function $Blockly$Block$$getSurroundParent$() {
  for(var $block$$ = this;;) {
    do {
      var $prevBlock$$ = $block$$, $block$$ = $block$$.getParent();
      if(!$block$$) {
        return null
      }
    }while($block$$.nextConnection && $block$$.nextConnection.targetBlock() == $prevBlock$$);
    return $block$$
  }
};
Blockly.Block.prototype.getRootBlock = function $Blockly$Block$$getRootBlock$() {
  var $rootBlock$$, $block$$ = this;
  do {
    $rootBlock$$ = $block$$, $block$$ = $rootBlock$$.parentBlock_
  }while($block$$);
  return $rootBlock$$
};
Blockly.Block.prototype.getChildren = function $Blockly$Block$$getChildren$() {
  return this.childBlocks_
};
Blockly.Block.prototype.setParent = function $Blockly$Block$$setParent$($newParent$$) {
  if(this.parentBlock_) {
    for(var $children$$2_oldXY_xy$$ = this.parentBlock_.childBlocks_, $child$$, $x$$ = 0;$child$$ = $children$$2_oldXY_xy$$[$x$$];$x$$++) {
      if($child$$ == this) {
        $children$$2_oldXY_xy$$.splice($x$$, 1);
        break
      }
    }
    $children$$2_oldXY_xy$$ = this.getRelativeToSurfaceXY();
    this.workspace.getCanvas().appendChild(this.svg_.getRootElement());
    this.svg_.getRootElement().setAttribute("transform", "translate(" + $children$$2_oldXY_xy$$.x + ", " + $children$$2_oldXY_xy$$.y + ")");
    this.parentBlock_ = null;
    this.previousConnection && this.previousConnection.targetConnection && this.previousConnection.disconnect();
    this.outputConnection && this.outputConnection.targetConnection && this.outputConnection.disconnect()
  }else {
    this.workspace.removeTopBlock(this)
  }
  (this.parentBlock_ = $newParent$$) ? ($newParent$$.childBlocks_.push(this), $children$$2_oldXY_xy$$ = this.getRelativeToSurfaceXY(), $newParent$$.svg_ && this.svg_ && $newParent$$.svg_.getRootElement().appendChild(this.svg_.getRootElement()), $newParent$$ = this.getRelativeToSurfaceXY(), this.moveConnections_($newParent$$.x - $children$$2_oldXY_xy$$.x, $newParent$$.y - $children$$2_oldXY_xy$$.y)) : this.workspace.addTopBlock(this)
};
Blockly.Block.prototype.getDescendants = function $Blockly$Block$$getDescendants$() {
  for(var $blocks$$ = [this], $child$$, $x$$ = 0;$child$$ = this.childBlocks_[$x$$];$x$$++) {
    $blocks$$ = $blocks$$.concat($child$$.getDescendants())
  }
  return $blocks$$
};
Blockly.Block.prototype.isDeletable = function $Blockly$Block$$isDeletable$() {
  return this.deletable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setDeletable = function $Blockly$Block$$setDeletable$($deletable$$) {
  this.deletable_ = $deletable$$;
  this.svg_ && this.svg_.updateMovable()
};
Blockly.Block.prototype.isMovable = function $Blockly$Block$$isMovable$() {
  return this.movable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setMovable = function $Blockly$Block$$setMovable$($movable$$) {
  this.movable_ = $movable$$
};
Blockly.Block.prototype.isEditable = function $Blockly$Block$$isEditable$() {
  return this.editable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setEditable = function $Blockly$Block$$setEditable$($editable$$1_x$$) {
  this.editable_ = $editable$$1_x$$;
  $editable$$1_x$$ = 0;
  for(var $icons$$7_input$$;$icons$$7_input$$ = this.inputList[$editable$$1_x$$];$editable$$1_x$$++) {
    for(var $y$$ = 0, $title$$;$title$$ = $icons$$7_input$$.titleRow[$y$$];$y$$++) {
      $title$$.updateEditable()
    }
  }
  $icons$$7_input$$ = this.getIcons();
  for($editable$$1_x$$ = 0;$editable$$1_x$$ < $icons$$7_input$$.length;$editable$$1_x$$++) {
    $icons$$7_input$$[$editable$$1_x$$].updateEditable()
  }
};
Blockly.Block.prototype.setHelpUrl = function $Blockly$Block$$setHelpUrl$($url$$) {
  this.helpUrl = $url$$
};
Blockly.Block.prototype.getColour = function $Blockly$Block$$getColour$() {
  return this.colourHue_
};
Blockly.Block.prototype.getSaturation = function $Blockly$Block$$getSaturation$() {
  return this.colourSaturation_
};
Blockly.Block.prototype.getValue = function $Blockly$Block$$getValue$() {
  return this.colourValue_
};
Blockly.Block.prototype.setColour = function $Blockly$Block$$setColour$($colourHue_x$$) {
  this.colourHue_ = $colourHue_x$$;
  this.svg_ && this.svg_.updateColour();
  var $icons$$8_input$$ = this.getIcons();
  for($colourHue_x$$ = 0;$colourHue_x$$ < $icons$$8_input$$.length;$colourHue_x$$++) {
    $icons$$8_input$$[$colourHue_x$$].updateColour()
  }
  if(this.rendered) {
    for($colourHue_x$$ = 0;$icons$$8_input$$ = this.inputList[$colourHue_x$$];$colourHue_x$$++) {
      for(var $y$$ = 0, $title$$;$title$$ = $icons$$8_input$$.titleRow[$y$$];$y$$++) {
        $title$$.setText(null)
      }
    }
    this.render()
  }
};
Blockly.Block.prototype.setHSV = function $Blockly$Block$$setHSV$($colourHue$$1_x$$, $colourSaturation_icons$$9_input$$, $colourValue_y$$) {
  this.colourHue_ = $colourHue$$1_x$$;
  this.colourSaturation_ = $colourSaturation_icons$$9_input$$;
  this.colourValue_ = $colourValue_y$$;
  this.svg_ && this.svg_.updateColour();
  $colourSaturation_icons$$9_input$$ = this.getIcons();
  for($colourHue$$1_x$$ = 0;$colourHue$$1_x$$ < $colourSaturation_icons$$9_input$$.length;$colourHue$$1_x$$++) {
    $colourSaturation_icons$$9_input$$[$colourHue$$1_x$$].updateColour()
  }
  if(this.rendered) {
    for($colourHue$$1_x$$ = 0;$colourSaturation_icons$$9_input$$ = this.inputList[$colourHue$$1_x$$];$colourHue$$1_x$$++) {
      $colourValue_y$$ = 0;
      for(var $title$$;$title$$ = $colourSaturation_icons$$9_input$$.titleRow[$colourValue_y$$];$colourValue_y$$++) {
        $title$$.setText(null)
      }
    }
    this.render()
  }
};
Blockly.Block.prototype.getTitle_ = function $Blockly$Block$$getTitle_$($name$$) {
  for(var $x$$ = 0, $input$$;$input$$ = this.inputList[$x$$];$x$$++) {
    for(var $y$$ = 0, $title$$;$title$$ = $input$$.titleRow[$y$$];$y$$++) {
      if($title$$.name === $name$$) {
        return $title$$
      }
    }
  }
  return null
};
Blockly.Block.prototype.getTitleValue = function $Blockly$Block$$getTitleValue$($name$$70_title$$) {
  return($name$$70_title$$ = this.getTitle_($name$$70_title$$)) ? $name$$70_title$$.getValue() : null
};
Blockly.Block.prototype.setTitleValue = function $Blockly$Block$$setTitleValue$($newValue$$, $name$$) {
  var $title$$ = this.getTitle_($name$$);
  if($title$$) {
    $title$$.setValue($newValue$$)
  }else {
    throw'Title "' + $name$$ + '" not found.';
  }
};
Blockly.Block.prototype.setTooltip = function $Blockly$Block$$setTooltip$($newTip$$) {
  this.tooltip = $newTip$$
};
Blockly.Block.prototype.setPreviousStatement = function $Blockly$Block$$setPreviousStatement$($newBoolean$$, $opt_check$$) {
  if(this.previousConnection) {
    if(this.previousConnection.targetConnection) {
      throw"Must disconnect previous statement before removing connection.";
    }
    this.previousConnection.dispose();
    this.previousConnection = null
  }
  if($newBoolean$$) {
    if(this.outputConnection) {
      throw"Remove output connection prior to adding previous connection.";
    }
    void 0 === $opt_check$$ && ($opt_check$$ = null);
    this.previousConnection = new Blockly.Connection(this, Blockly.PREVIOUS_STATEMENT);
    this.previousConnection.setCheck($opt_check$$)
  }
  this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setNextStatement = function $Blockly$Block$$setNextStatement$($newBoolean$$, $opt_check$$) {
  if(this.nextConnection) {
    if(this.nextConnection.targetConnection) {
      throw"Must disconnect next statement before removing connection.";
    }
    this.nextConnection.dispose();
    this.nextConnection = null
  }
  $newBoolean$$ && (void 0 === $opt_check$$ && ($opt_check$$ = null), this.nextConnection = new Blockly.Connection(this, Blockly.NEXT_STATEMENT), this.nextConnection.setCheck($opt_check$$));
  this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setOutput = function $Blockly$Block$$setOutput$($newBoolean$$, $opt_check$$) {
  if(this.outputConnection) {
    if(this.outputConnection.targetConnection) {
      throw"Must disconnect output value before removing connection.";
    }
    this.outputConnection.dispose();
    this.outputConnection = null
  }
  if($newBoolean$$) {
    if(this.previousConnection) {
      throw"Remove previous connection prior to adding output connection.";
    }
    void 0 === $opt_check$$ && ($opt_check$$ = null);
    this.outputConnection = new Blockly.Connection(this, Blockly.OUTPUT_VALUE);
    this.outputConnection.setCheck($opt_check$$)
  }
  this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setInputsInline = function $Blockly$Block$$setInputsInline$($newBoolean$$) {
  this.inputsInline = $newBoolean$$;
  this.rendered && (this.render(), this.bumpNeighbours_(), this.workspace.fireChangeEvent())
};
Blockly.Block.prototype.setDisabled = function $Blockly$Block$$setDisabled$($disabled$$) {
  this.disabled != $disabled$$ && (this.disabled = $disabled$$, this.svg_.updateDisabled(), this.workspace.fireChangeEvent())
};
Blockly.Block.prototype.getInheritedDisabled = function $Blockly$Block$$getInheritedDisabled$() {
  for(var $block$$ = this;;) {
    $block$$ = $block$$.getSurroundParent();
    if(!$block$$) {
      return!1
    }
    if($block$$.disabled) {
      return!0
    }
  }
};
Blockly.Block.prototype.isCollapsed = function $Blockly$Block$$isCollapsed$() {
  return this.collapsed_
};
Blockly.Block.prototype.setCollapsed = function $Blockly$Block$$setCollapsed$($block$$28_collapsed$$1_icons$$) {
  if(this.collapsed_ != $block$$28_collapsed$$1_icons$$) {
    this.collapsed_ = $block$$28_collapsed$$1_icons$$;
    for(var $renderList$$ = [], $text$$23_x$$ = 0, $input$$;$input$$ = this.inputList[$text$$23_x$$];$text$$23_x$$++) {
      $renderList$$ = $renderList$$.concat($input$$.setVisible(!$block$$28_collapsed$$1_icons$$))
    }
    if($block$$28_collapsed$$1_icons$$) {
      $block$$28_collapsed$$1_icons$$ = this.getIcons();
      for($text$$23_x$$ = 0;$text$$23_x$$ < $block$$28_collapsed$$1_icons$$.length;$text$$23_x$$++) {
        $block$$28_collapsed$$1_icons$$[$text$$23_x$$].setVisible(!1)
      }
      $text$$23_x$$ = this.toString(Blockly.COLLAPSE_CHARS);
      this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendTitle($text$$23_x$$)
    }else {
      this.removeInput("_TEMP_COLLAPSED_INPUT")
    }
    $renderList$$.length || ($renderList$$[0] = this);
    if(this.rendered) {
      for($text$$23_x$$ = 0;$block$$28_collapsed$$1_icons$$ = $renderList$$[$text$$23_x$$];$text$$23_x$$++) {
        $block$$28_collapsed$$1_icons$$.render()
      }
      this.bumpNeighbours_()
    }
  }
};
Blockly.Block.prototype.toString = function $Blockly$Block$$toString$($opt_maxLength$$) {
  for(var $text$$ = [], $x$$ = 0, $child$$35_input$$;$child$$35_input$$ = this.inputList[$x$$];$x$$++) {
    for(var $y$$ = 0, $title$$;$title$$ = $child$$35_input$$.titleRow[$y$$];$y$$++) {
      $text$$.push($title$$.getText())
    }
    $child$$35_input$$.connection && (($child$$35_input$$ = $child$$35_input$$.connection.targetBlock()) ? $text$$.push($child$$35_input$$.toString()) : $text$$.push("?"))
  }
  $text$$ = goog.string.trim($text$$.join(" ")) || "???";
  $opt_maxLength$$ && ($text$$ = goog.string.truncate($text$$, $opt_maxLength$$));
  return $text$$
};
Blockly.Block.prototype.appendValueInput = function $Blockly$Block$$appendValueInput$($name$$) {
  return this.appendInput_(Blockly.INPUT_VALUE, $name$$)
};
Blockly.Block.prototype.appendStatementInput = function $Blockly$Block$$appendStatementInput$($name$$) {
  return this.appendInput_(Blockly.NEXT_STATEMENT, $name$$)
};
Blockly.Block.prototype.appendDummyInput = function $Blockly$Block$$appendDummyInput$($opt_name$$) {
  return this.appendInput_(Blockly.DUMMY_INPUT, $opt_name$$ || "")
};
Blockly.Block.prototype.appendInput_ = function $Blockly$Block$$appendInput_$($type$$, $name$$) {
  var $connection$$9_input$$ = null;
  if($type$$ == Blockly.INPUT_VALUE || $type$$ == Blockly.NEXT_STATEMENT) {
    $connection$$9_input$$ = new Blockly.Connection(this, $type$$)
  }
  $connection$$9_input$$ = new Blockly.Input($type$$, $name$$, this, $connection$$9_input$$);
  this.inputList.push($connection$$9_input$$);
  this.rendered && (this.render(), this.bumpNeighbours_());
  return $connection$$9_input$$
};
Blockly.Block.prototype.moveInputBefore = function $Blockly$Block$$moveInputBefore$($name$$, $refName$$) {
  if($name$$ == $refName$$) {
    throw"Can't move \"" + $name$$ + '" to itself.';
  }
  for(var $inputIndex$$ = -1, $refIndex$$ = -1, $x$$ = 0, $input$$;$input$$ = this.inputList[$x$$];$x$$++) {
    if($input$$.name == $name$$) {
      if($inputIndex$$ = $x$$, -1 != $refIndex$$) {
        break
      }
    }else {
      if($input$$.name == $refName$$ && ($refIndex$$ = $x$$, -1 != $inputIndex$$)) {
        break
      }
    }
  }
  if(-1 == $inputIndex$$) {
    throw'Named input "' + $name$$ + '" not found.';
  }
  if(-1 == $refIndex$$) {
    throw'Reference input "' + $name$$ + '" not found.';
  }
  this.inputList.splice($inputIndex$$, 1);
  $inputIndex$$ < $refIndex$$ && $refIndex$$--;
  this.inputList.splice($refIndex$$, 0, $input$$);
  this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.removeInput = function $Blockly$Block$$removeInput$($name$$) {
  for(var $x$$ = 0, $input$$;$input$$ = this.inputList[$x$$];$x$$++) {
    if($input$$.name == $name$$) {
      $input$$.connection && $input$$.connection.targetConnection && $input$$.connection.targetBlock().setParent(null);
      $input$$.dispose();
      this.inputList.splice($x$$, 1);
      this.rendered && (this.render(), this.bumpNeighbours_());
      return
    }
  }
  throw'Input "' + $name$$ + '" not found.';
};
Blockly.Block.prototype.getInput = function $Blockly$Block$$getInput$($name$$) {
  for(var $x$$ = 0, $input$$;$input$$ = this.inputList[$x$$];$x$$++) {
    if($input$$.name == $name$$) {
      return $input$$
    }
  }
  return null
};
Blockly.Block.prototype.getInputTargetBlock = function $Blockly$Block$$getInputTargetBlock$($input$$17_name$$) {
  return($input$$17_name$$ = this.getInput($input$$17_name$$)) && $input$$17_name$$.connection && $input$$17_name$$.connection.targetBlock()
};
Blockly.Block.prototype.setMutator = function $Blockly$Block$$setMutator$($mutator$$) {
  this.mutator && this.mutator !== $mutator$$ && this.mutator.dispose();
  $mutator$$ && ($mutator$$.block_ = this, this.mutator = $mutator$$, this.svg_ && $mutator$$.createIcon())
};
Blockly.Block.prototype.getCommentText = function $Blockly$Block$$getCommentText$() {
  return this.comment ? this.comment.getText().replace(/\s+$/, "").replace(/ +\n/g, "\n") : ""
};
Blockly.Block.prototype.setCommentText = function $Blockly$Block$$setCommentText$($text$$) {
  if(!Blockly.Comment) {
    throw"Comments not supported.";
  }
  var $changedState$$ = !1;
  goog.isString($text$$) ? (this.comment || (this.comment = new Blockly.Comment(this), $changedState$$ = !0), this.comment.setText($text$$)) : this.comment && (this.comment.dispose(), $changedState$$ = !0);
  this.rendered && (this.render(), $changedState$$ && this.bumpNeighbours_())
};
Blockly.Block.prototype.setWarningText = function $Blockly$Block$$setWarningText$($text$$) {
  if(!Blockly.Warning) {
    throw"Warnings not supported.";
  }
  this.isInFlyout && ($text$$ = null);
  var $changedState$$ = !1;
  goog.isString($text$$) ? (this.warning || (this.warning = new Blockly.Warning(this), $changedState$$ = !0), this.warning.setText($text$$)) : this.warning && (this.warning.dispose(), $changedState$$ = !0);
  $changedState$$ && this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.render = function $Blockly$Block$$render$() {
  if(!this.svg_) {
    throw"Uninitialized block cannot be rendered.  Call block.initSvg()";
  }
  this.svg_.render()
};
Blockly.Flyout = function $Blockly$Flyout$() {
  var $flyout$$ = this;
  this.workspace_ = new Blockly.Workspace(function() {
    return $flyout$$.getMetrics_()
  }, function($ratio$$) {
    return $flyout$$.setMetrics_($ratio$$)
  });
  this.workspace_.isFlyout = !0;
  this.changeWrapper_ = null;
  this.height_ = this.width_ = 0;
  this.buttons_ = [];
  this.listeners_ = []
};
Blockly.Flyout.prototype.autoClose = !0;
Blockly.Flyout.prototype.CORNER_RADIUS = 8;
Blockly.Flyout.prototype.onResizeWrapper_ = null;
Blockly.Flyout.prototype.createDom = function $Blockly$Flyout$$createDom$() {
  this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
  this.svgBackground_ = Blockly.createSvgElement("path", {"class":"blocklyFlyoutBackground"}, this.svgGroup_);
  this.svgGroup_.appendChild(this.workspace_.createDom());
  return this.svgGroup_
};
Blockly.Flyout.prototype.dispose = function $Blockly$Flyout$$dispose$() {
  this.hide();
  this.onResizeWrapper_ && (Blockly.unbindEvent_(this.onResizeWrapper_), this.onResizeWrapper_ = null);
  this.changeWrapper_ && (Blockly.unbindEvent_(this.changeWrapper_), this.changeWrapper_ = null);
  this.scrollbar_ && (this.scrollbar_.dispose(), this.scrollbar_ = null);
  this.workspace_ = null;
  this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
  this.targetWorkspace_ = this.svgBackground_ = null
};
Blockly.Flyout.prototype.getMetrics_ = function $Blockly$Flyout$$getMetrics_$() {
  if(!this.isVisible()) {
    return null
  }
  var $viewHeight$$ = this.height_ - 2 * this.CORNER_RADIUS, $viewWidth$$ = this.width_;
  try {
    if(Blockly.isMsie() || Blockly.isTrident()) {
      this.workspace_.getCanvas().style.display = "inline";
      var $optionBox$$ = {x:this.workspace_.getCanvas().getBBox().x, y:this.workspace_.getCanvas().getBBox().y, width:this.workspace_.getCanvas().scrollWidth, height:this.workspace_.getCanvas().scrollHeight}
    }else {
      $optionBox$$ = this.workspace_.getCanvas().getBBox()
    }
  }catch($e$$) {
    $optionBox$$ = {height:0, y:0}
  }
  return{viewHeight:$viewHeight$$, viewWidth:$viewWidth$$, contentHeight:$optionBox$$.height + $optionBox$$.y, viewTop:-this.workspace_.scrollY, contentTop:0, absoluteTop:this.CORNER_RADIUS, absoluteLeft:0}
};
Blockly.Flyout.prototype.setMetrics_ = function $Blockly$Flyout$$setMetrics_$($y$$) {
  var $metrics$$ = this.getMetrics_();
  goog.isNumber($y$$.y) && (this.workspace_.scrollY = -$metrics$$.contentHeight * $y$$.y - $metrics$$.contentTop);
  $y$$ = this.workspace_.scrollY + $metrics$$.absoluteTop;
  this.workspace_.getCanvas().setAttribute("transform", "translate(0," + $y$$ + ")")
};
Blockly.Flyout.prototype.init = function $Blockly$Flyout$$init$($workspace$$, $withScrollbar$$) {
  this.targetWorkspace_ = $workspace$$;
  $withScrollbar$$ && (this.scrollbar_ = new Blockly.Scrollbar(this.workspace_, !1, !1));
  this.hide();
  this.onResizeWrapper_ = Blockly.bindEvent_(window, goog.events.EventType.RESIZE, this, this.position_);
  this.position_();
  this.changeWrapper_ = Blockly.bindEvent_(this.targetWorkspace_.getCanvas(), "blocklyWorkspaceChange", this, this.filterForCapacity_)
};
Blockly.Flyout.prototype.position_ = function $Blockly$Flyout$$position_$() {
  if(this.isVisible()) {
    var $metrics$$ = this.targetWorkspace_.getMetrics();
    if($metrics$$) {
      var $edgeWidth_x$$ = this.width_ - this.CORNER_RADIUS;
      Blockly.RTL && ($edgeWidth_x$$ *= -1);
      var $path$$ = ["M " + (Blockly.RTL ? this.width_ : 0) + ",0"];
      $path$$.push("h", $edgeWidth_x$$);
      $path$$.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, Blockly.RTL ? 0 : 1, Blockly.RTL ? -this.CORNER_RADIUS : this.CORNER_RADIUS, this.CORNER_RADIUS);
      $path$$.push("v", Math.max(0, $metrics$$.viewHeight - 2 * this.CORNER_RADIUS));
      $path$$.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, Blockly.RTL ? 0 : 1, Blockly.RTL ? this.CORNER_RADIUS : -this.CORNER_RADIUS, this.CORNER_RADIUS);
      $path$$.push("h", -$edgeWidth_x$$);
      $path$$.push("z");
      this.svgBackground_.setAttribute("d", $path$$.join(" "));
      $edgeWidth_x$$ = $metrics$$.absoluteLeft;
      Blockly.RTL && ($edgeWidth_x$$ += $metrics$$.viewWidth, $edgeWidth_x$$ -= this.width_);
      this.svgGroup_.setAttribute("transform", "translate(" + $edgeWidth_x$$ + "," + $metrics$$.absoluteTop + ")");
      this.height_ = $metrics$$.viewHeight;
      this.scrollbar_ && this.scrollbar_.resize()
    }
  }
};
Blockly.Flyout.prototype.isVisible = function $Blockly$Flyout$$isVisible$() {
  return"block" == this.svgGroup_.style.display
};
Blockly.Flyout.prototype.hide = function $Blockly$Flyout$$hide$() {
  if(this.isVisible()) {
    this.svgGroup_.style.display = "none";
    for(var $x$$ = 0, $blocks$$8_listen_rect$$;$blocks$$8_listen_rect$$ = this.listeners_[$x$$];$x$$++) {
      Blockly.unbindEvent_($blocks$$8_listen_rect$$)
    }
    this.listeners_.splice(0);
    this.reflowWrapper_ && (Blockly.unbindEvent_(this.reflowWrapper_), this.reflowWrapper_ = null);
    $blocks$$8_listen_rect$$ = this.workspace_.getTopBlocks(!1);
    for(var $x$$ = 0, $block$$;$block$$ = $blocks$$8_listen_rect$$[$x$$];$x$$++) {
      $block$$.workspace == this.workspace_ && $block$$.dispose(!1, !1)
    }
    for($x$$ = 0;$blocks$$8_listen_rect$$ = this.buttons_[$x$$];$x$$++) {
      goog.dom.removeNode($blocks$$8_listen_rect$$)
    }
    this.buttons_.splice(0)
  }
};
Blockly.Flyout.prototype.show = function $Blockly$Flyout$$show$($cursorY$$) {
  this.hide();
  var $margin$$ = this.CORNER_RADIUS;
  this.svgGroup_.style.display = "block";
  var $blocks$$ = [], $gaps$$ = [];
  if($cursorY$$ == Blockly.Variables.NAME_TYPE) {
    Blockly.Variables.flyoutCategory($blocks$$, $gaps$$, $margin$$, this.workspace_)
  }else {
    if($cursorY$$ == Blockly.Procedures.NAME_TYPE) {
      Blockly.Procedures.flyoutCategory($blocks$$, $gaps$$, $margin$$, this.workspace_)
    }else {
      for(var $i$$ = 0, $block$$30_xml$$;$block$$30_xml$$ = $cursorY$$[$i$$];$i$$++) {
        $block$$30_xml$$.tagName && "BLOCK" == $block$$30_xml$$.tagName.toUpperCase() && ($block$$30_xml$$ = Blockly.Xml.domToBlock_(this.workspace_, $block$$30_xml$$), $blocks$$.push($block$$30_xml$$), $gaps$$.push(3 * $margin$$))
      }
    }
  }
  $cursorY$$ = $margin$$;
  for($i$$ = 0;$block$$30_xml$$ = $blocks$$[$i$$];$i$$++) {
    for(var $allBlocks$$1_root$$ = $block$$30_xml$$.getDescendants(), $blockHW$$1_j$$8_rect$$ = 0, $child$$;$child$$ = $allBlocks$$1_root$$[$blockHW$$1_j$$8_rect$$];$blockHW$$1_j$$8_rect$$++) {
      $child$$.isInFlyout = !0, Blockly.Comment && $child$$.setCommentText(null)
    }
    $block$$30_xml$$.render();
    $allBlocks$$1_root$$ = $block$$30_xml$$.getSvgRoot();
    $blockHW$$1_j$$8_rect$$ = $block$$30_xml$$.getHeightWidth();
    $block$$30_xml$$.moveBy(Blockly.RTL ? 0 : $margin$$ + Blockly.BlockSvg.TAB_WIDTH, $cursorY$$);
    $cursorY$$ += $blockHW$$1_j$$8_rect$$.height + $gaps$$[$i$$];
    $blockHW$$1_j$$8_rect$$ = Blockly.createSvgElement("rect", {"fill-opacity":0}, null);
    this.workspace_.getCanvas().insertBefore($blockHW$$1_j$$8_rect$$, $block$$30_xml$$.getSvgRoot());
    $block$$30_xml$$.flyoutRect_ = $blockHW$$1_j$$8_rect$$;
    this.buttons_[$i$$] = $blockHW$$1_j$$8_rect$$;
    this.autoClose ? this.listeners_.push(Blockly.bindEvent_($allBlocks$$1_root$$, "mousedown", null, this.createBlockFunc_($block$$30_xml$$))) : this.listeners_.push(Blockly.bindEvent_($allBlocks$$1_root$$, "mousedown", null, this.blockMouseDown_($block$$30_xml$$)));
    this.listeners_.push(Blockly.bindEvent_($allBlocks$$1_root$$, "mouseover", $block$$30_xml$$.svg_, $block$$30_xml$$.svg_.addSelect));
    this.listeners_.push(Blockly.bindEvent_($allBlocks$$1_root$$, "mouseout", $block$$30_xml$$.svg_, $block$$30_xml$$.svg_.removeSelect));
    this.listeners_.push(Blockly.bindEvent_($blockHW$$1_j$$8_rect$$, "mousedown", null, this.createBlockFunc_($block$$30_xml$$)));
    this.listeners_.push(Blockly.bindEvent_($blockHW$$1_j$$8_rect$$, "mouseover", $block$$30_xml$$.svg_, $block$$30_xml$$.svg_.addSelect));
    this.listeners_.push(Blockly.bindEvent_($blockHW$$1_j$$8_rect$$, "mouseout", $block$$30_xml$$.svg_, $block$$30_xml$$.svg_.removeSelect))
  }
  this.width_ = 0;
  this.reflow();
  this.filterForCapacity_();
  Blockly.fireUiEvent(window, "resize");
  this.reflowWrapper_ = Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this, this.reflow);
  this.workspace_.fireChangeEvent()
};
Blockly.Flyout.prototype.reflow = function $Blockly$Flyout$$reflow$() {
  for(var $flyoutWidth$$ = 0, $margin$$ = this.CORNER_RADIUS, $blocks$$ = this.workspace_.getTopBlocks(!1), $x$$ = 0, $block$$;$block$$ = $blocks$$[$x$$];$x$$++) {
    $block$$.getSvgRoot();
    var $blockHW$$ = $block$$.getHeightWidth(), $flyoutWidth$$ = Math.max($flyoutWidth$$, $blockHW$$.width)
  }
  $flyoutWidth$$ += $margin$$ + Blockly.BlockSvg.TAB_WIDTH + $margin$$ / 2 + Blockly.Scrollbar.scrollbarThickness;
  if(this.width_ != $flyoutWidth$$) {
    for($x$$ = 0;$block$$ = $blocks$$[$x$$];$x$$++) {
      var $blockHW$$ = $block$$.getHeightWidth(), $blockXY$$ = $block$$.getRelativeToSurfaceXY();
      if(Blockly.RTL) {
        var $dx$$ = $flyoutWidth$$ - $margin$$ - Blockly.BlockSvg.TAB_WIDTH - $blockXY$$.x;
        $block$$.moveBy($dx$$, 0);
        $blockXY$$.x += $dx$$
      }
      $block$$.flyoutRect_ && ($block$$.flyoutRect_.setAttribute("width", $blockHW$$.width), $block$$.flyoutRect_.setAttribute("height", $blockHW$$.height), $block$$.flyoutRect_.setAttribute("x", Blockly.RTL ? $blockXY$$.x - $blockHW$$.width : $blockXY$$.x), $block$$.flyoutRect_.setAttribute("y", $blockXY$$.y))
    }
    this.width_ = $flyoutWidth$$;
    Blockly.fireUiEvent(window, "resize")
  }
};
Blockly.Block.prototype.moveTo = function $Blockly$Block$$moveTo$($x$$, $y$$) {
  var $oldXY$$ = this.getRelativeToSurfaceXY();
  this.svg_.getRootElement().setAttribute("transform", "translate(" + $x$$ + ", " + $y$$ + ")");
  this.moveConnections_($x$$ - $oldXY$$.x, $y$$ - $oldXY$$.y)
};
Blockly.Flyout.prototype.blockMouseDown_ = function $Blockly$Flyout$$blockMouseDown_$($block$$) {
  var $flyout$$ = this;
  return function($e$$) {
    Blockly.terminateDrag_();
    Blockly.hideChaff();
    Blockly.isRightButton($e$$) ? Blockly.ContextMenu && $block$$.showContextMenu_(Blockly.mouseToSvg($e$$)) : (Blockly.removeAllRanges(), Blockly.setCursorHand_(!0), Blockly.Flyout.startDragMouseX_ = $e$$.clientX, Blockly.Flyout.startDragMouseY_ = $e$$.clientY, Blockly.Flyout.startBlock_ = $block$$, Blockly.Flyout.startFlyout_ = $flyout$$, Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.terminateDrag_), Blockly.Flyout.onMouseMoveWrapper_ = Blockly.bindEvent_(document, 
    "mousemove", this, $flyout$$.onMouseMove_));
    $e$$.stopPropagation()
  }
};
Blockly.Flyout.prototype.onMouseMove_ = function $Blockly$Flyout$$onMouseMove_$($e$$) {
  if("mousemove" == $e$$.type && 1 >= $e$$.clientX && 0 == $e$$.clientY && 0 == $e$$.button) {
    $e$$.stopPropagation()
  }else {
    Blockly.removeAllRanges();
    var $dy$$ = $e$$.clientY - Blockly.Flyout.startDragMouseY_;
    Math.sqrt(Math.pow($e$$.clientX - Blockly.Flyout.startDragMouseX_, 2) + Math.pow($dy$$, 2)) > Blockly.DRAG_RADIUS && Blockly.Flyout.startFlyout_.createBlockFunc_(Blockly.Flyout.startBlock_)($e$$)
  }
};
Blockly.Flyout.prototype.createBlockFunc_ = function $Blockly$Flyout$$createBlockFunc_$($originBlock$$) {
  var $flyout$$ = this;
  return function($e$$) {
    if(!Blockly.isRightButton($e$$) && !$originBlock$$.disabled) {
      var $block$$33_xml$$ = Blockly.Xml.blockToDom_($originBlock$$), $block$$33_xml$$ = Blockly.Xml.domToBlock_($flyout$$.targetWorkspace_, $block$$33_xml$$), $svgRootOld_xyOld$$ = $originBlock$$.getSvgRoot();
      if(!$svgRootOld_xyOld$$) {
        throw"originBlock is not rendered.";
      }
      var $svgRootOld_xyOld$$ = Blockly.getSvgXY_($svgRootOld_xyOld$$), $svgRootNew_xyNew$$ = $block$$33_xml$$.getSvgRoot();
      if(!$svgRootNew_xyNew$$) {
        throw"block is not rendered.";
      }
      $svgRootNew_xyNew$$ = Blockly.getSvgXY_($svgRootNew_xyNew$$);
      $block$$33_xml$$.moveBy($svgRootOld_xyOld$$.x - $svgRootNew_xyNew$$.x, $svgRootOld_xyOld$$.y - $svgRootNew_xyNew$$.y);
      $flyout$$.autoClose ? $flyout$$.hide() : $flyout$$.filterForCapacity_();
      $block$$33_xml$$.onMouseDown_($e$$)
    }
  }
};
Blockly.Flyout.prototype.filterForCapacity_ = function $Blockly$Flyout$$filterForCapacity_$() {
  for(var $remainingCapacity$$ = this.targetWorkspace_.remainingCapacity(), $blocks$$ = this.workspace_.getTopBlocks(!1), $i$$ = 0, $block$$;$block$$ = $blocks$$[$i$$];$i$$++) {
    var $disabled$$ = $block$$.getDescendants().length > $remainingCapacity$$;
    $block$$.setDisabled($disabled$$)
  }
};
Blockly.Flyout.terminateDrag_ = function $Blockly$Flyout$terminateDrag_$() {
  Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_), Blockly.Flyout.onMouseUpWrapper_ = null);
  Blockly.Flyout.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_), Blockly.Flyout.onMouseMoveWrapper_ = null);
  Blockly.Flyout.startDragMouseX_ = 0;
  Blockly.Flyout.startDragMouseY_ = 0;
  Blockly.Flyout.startBlock_ = null;
  Blockly.Flyout.startFlyout_ = null
};
goog.structs = {};
goog.structs.getCount = function $goog$structs$getCount$($col$$) {
  return"function" == typeof $col$$.getCount ? $col$$.getCount() : goog.isArrayLike($col$$) || goog.isString($col$$) ? $col$$.length : goog.object.getCount($col$$)
};
goog.structs.getValues = function $goog$structs$getValues$($col$$) {
  if("function" == typeof $col$$.getValues) {
    return $col$$.getValues()
  }
  if(goog.isString($col$$)) {
    return $col$$.split("")
  }
  if(goog.isArrayLike($col$$)) {
    for(var $rv$$ = [], $l$$ = $col$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$.push($col$$[$i$$])
    }
    return $rv$$
  }
  return goog.object.getValues($col$$)
};
goog.structs.getKeys = function $goog$structs$getKeys$($col$$2_l$$) {
  if("function" == typeof $col$$2_l$$.getKeys) {
    return $col$$2_l$$.getKeys()
  }
  if("function" != typeof $col$$2_l$$.getValues) {
    if(goog.isArrayLike($col$$2_l$$) || goog.isString($col$$2_l$$)) {
      var $rv$$ = [];
      $col$$2_l$$ = $col$$2_l$$.length;
      for(var $i$$ = 0;$i$$ < $col$$2_l$$;$i$$++) {
        $rv$$.push($i$$)
      }
      return $rv$$
    }
    return goog.object.getKeys($col$$2_l$$)
  }
};
goog.structs.contains = function $goog$structs$contains$($col$$, $val$$) {
  return"function" == typeof $col$$.contains ? $col$$.contains($val$$) : "function" == typeof $col$$.containsValue ? $col$$.containsValue($val$$) : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.contains($col$$, $val$$) : goog.object.containsValue($col$$, $val$$)
};
goog.structs.isEmpty = function $goog$structs$isEmpty$($col$$) {
  return"function" == typeof $col$$.isEmpty ? $col$$.isEmpty() : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.isEmpty($col$$) : goog.object.isEmpty($col$$)
};
goog.structs.clear = function $goog$structs$clear$($col$$) {
  "function" == typeof $col$$.clear ? $col$$.clear() : goog.isArrayLike($col$$) ? goog.array.clear($col$$) : goog.object.clear($col$$)
};
goog.structs.forEach = function $goog$structs$forEach$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.forEach) {
    $col$$.forEach($f$$, $opt_obj$$)
  }else {
    if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
      goog.array.forEach($col$$, $f$$, $opt_obj$$)
    }else {
      for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
        $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)
      }
    }
  }
};
goog.structs.filter = function $goog$structs$filter$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.filter) {
    return $col$$.filter($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.filter($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$) && ($rv$$[$keys$$[$i$$]] = $values$$[$i$$])
    }
  }else {
    for($rv$$ = [], $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$) && $rv$$.push($values$$[$i$$])
    }
  }
  return $rv$$
};
goog.structs.map = function $goog$structs$map$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.map) {
    return $col$$.map($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.map($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$keys$$[$i$$]] = $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$)
    }
  }else {
    for($rv$$ = [], $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$i$$] = $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$)
    }
  }
  return $rv$$
};
goog.structs.some = function $goog$structs$some$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.some) {
    return $col$$.some($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.some($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function $goog$structs$every$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.every) {
    return $col$$.every($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.every($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!1
    }
  }
  return!0
};
goog.structs.Trie = function $goog$structs$Trie$($opt_trie$$) {
  this.childNodes_ = {};
  $opt_trie$$ && this.setAll($opt_trie$$)
};
goog.structs.Trie.prototype.value_ = void 0;
goog.structs.Trie.prototype.set = function $goog$structs$Trie$$set$($key$$, $value$$) {
  this.setOrAdd_($key$$, $value$$, !1)
};
goog.structs.Trie.prototype.add = function $goog$structs$Trie$$add$($key$$, $value$$) {
  this.setOrAdd_($key$$, $value$$, !0)
};
goog.structs.Trie.prototype.setOrAdd_ = function $goog$structs$Trie$$setOrAdd_$($key$$, $value$$, $opt_add$$) {
  for(var $node$$ = this, $characterPosition$$ = 0;$characterPosition$$ < $key$$.length;$characterPosition$$++) {
    var $currentCharacter$$ = $key$$.charAt($characterPosition$$);
    $node$$.childNodes_[$currentCharacter$$] || ($node$$.childNodes_[$currentCharacter$$] = new goog.structs.Trie);
    $node$$ = $node$$.childNodes_[$currentCharacter$$]
  }
  if($opt_add$$ && void 0 !== $node$$.value_) {
    throw Error('The collection already contains the key "' + $key$$ + '"');
  }
  $node$$.value_ = $value$$
};
goog.structs.Trie.prototype.setAll = function $goog$structs$Trie$$setAll$($trie_values$$) {
  var $keys$$ = goog.structs.getKeys($trie_values$$);
  $trie_values$$ = goog.structs.getValues($trie_values$$);
  for(var $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    this.set($keys$$[$i$$], $trie_values$$[$i$$])
  }
};
goog.structs.Trie.prototype.get = function $goog$structs$Trie$$get$($key$$) {
  for(var $node$$ = this, $characterPosition$$ = 0;$characterPosition$$ < $key$$.length;$characterPosition$$++) {
    var $currentCharacter$$ = $key$$.charAt($characterPosition$$);
    if(!$node$$.childNodes_[$currentCharacter$$]) {
      return
    }
    $node$$ = $node$$.childNodes_[$currentCharacter$$]
  }
  return $node$$.value_
};
goog.structs.Trie.prototype.getKeyAndPrefixes = function $goog$structs$Trie$$getKeyAndPrefixes$($key$$, $opt_keyStartIndex$$) {
  var $node$$ = this, $matches$$ = {}, $characterPosition$$ = $opt_keyStartIndex$$ || 0;
  void 0 !== $node$$.value_ && ($matches$$[$characterPosition$$] = $node$$.value_);
  for(;$characterPosition$$ < $key$$.length;$characterPosition$$++) {
    var $currentCharacter$$ = $key$$.charAt($characterPosition$$);
    if(!($currentCharacter$$ in $node$$.childNodes_)) {
      break
    }
    $node$$ = $node$$.childNodes_[$currentCharacter$$];
    void 0 !== $node$$.value_ && ($matches$$[$characterPosition$$] = $node$$.value_)
  }
  return $matches$$
};
goog.structs.Trie.prototype.getValues = function $goog$structs$Trie$$getValues$() {
  var $allValues$$ = [];
  this.getValuesInternal_($allValues$$);
  return $allValues$$
};
goog.structs.Trie.prototype.getValuesInternal_ = function $goog$structs$Trie$$getValuesInternal_$($allValues$$) {
  void 0 !== this.value_ && $allValues$$.push(this.value_);
  for(var $childNode$$ in this.childNodes_) {
    this.childNodes_[$childNode$$].getValuesInternal_($allValues$$)
  }
};
goog.structs.Trie.prototype.getKeys = function $goog$structs$Trie$$getKeys$($opt_prefix$$) {
  var $allKeys$$ = [];
  if($opt_prefix$$) {
    for(var $node$$ = this, $characterPosition$$ = 0;$characterPosition$$ < $opt_prefix$$.length;$characterPosition$$++) {
      var $currentCharacter$$ = $opt_prefix$$.charAt($characterPosition$$);
      if(!$node$$.childNodes_[$currentCharacter$$]) {
        return[]
      }
      $node$$ = $node$$.childNodes_[$currentCharacter$$]
    }
    $node$$.getKeysInternal_($opt_prefix$$, $allKeys$$)
  }else {
    this.getKeysInternal_("", $allKeys$$)
  }
  return $allKeys$$
};
goog.structs.Trie.prototype.getKeysInternal_ = function $goog$structs$Trie$$getKeysInternal_$($keySoFar$$, $allKeys$$) {
  void 0 !== this.value_ && $allKeys$$.push($keySoFar$$);
  for(var $childNode$$ in this.childNodes_) {
    this.childNodes_[$childNode$$].getKeysInternal_($keySoFar$$ + $childNode$$, $allKeys$$)
  }
};
goog.structs.Trie.prototype.containsKey = function $goog$structs$Trie$$containsKey$($key$$) {
  return void 0 !== this.get($key$$)
};
goog.structs.Trie.prototype.containsValue = function $goog$structs$Trie$$containsValue$($value$$) {
  if(this.value_ === $value$$) {
    return!0
  }
  for(var $childNode$$ in this.childNodes_) {
    if(this.childNodes_[$childNode$$].containsValue($value$$)) {
      return!0
    }
  }
  return!1
};
goog.structs.Trie.prototype.clear = function $goog$structs$Trie$$clear$() {
  this.childNodes_ = {};
  this.value_ = void 0
};
goog.structs.Trie.prototype.remove = function $goog$structs$Trie$$remove$($key$$) {
  for(var $currentParent_node$$ = this, $parents$$ = [], $characterPosition$$ = 0;$characterPosition$$ < $key$$.length;$characterPosition$$++) {
    var $currentCharacter$$ = $key$$.charAt($characterPosition$$);
    if(!$currentParent_node$$.childNodes_[$currentCharacter$$]) {
      throw Error('The collection does not have the key "' + $key$$ + '"');
    }
    $parents$$.push([$currentParent_node$$, $currentCharacter$$]);
    $currentParent_node$$ = $currentParent_node$$.childNodes_[$currentCharacter$$]
  }
  $key$$ = $currentParent_node$$.value_;
  for(delete $currentParent_node$$.value_;0 < $parents$$.length;) {
    if($currentCharacter$$ = $parents$$.pop(), $currentParent_node$$ = $currentCharacter$$[0], $currentCharacter$$ = $currentCharacter$$[1], goog.object.isEmpty($currentParent_node$$.childNodes_[$currentCharacter$$].childNodes_)) {
      delete $currentParent_node$$.childNodes_[$currentCharacter$$]
    }else {
      break
    }
  }
  return $key$$
};
goog.structs.Trie.prototype.clone = function $goog$structs$Trie$$clone$() {
  return new goog.structs.Trie(this)
};
goog.structs.Trie.prototype.getCount = function $goog$structs$Trie$$getCount$() {
  return goog.structs.getCount(this.getValues())
};
goog.structs.Trie.prototype.isEmpty = function $goog$structs$Trie$$isEmpty$() {
  return void 0 === this.value_ && goog.structs.isEmpty(this.childNodes_)
};
goog.ui.tree.TypeAhead = function $goog$ui$tree$TypeAhead$() {
  this.nodeMap_ = new goog.structs.Trie
};
goog.ui.tree.TypeAhead.prototype.buffer_ = "";
goog.ui.tree.TypeAhead.prototype.matchingLabels_ = null;
goog.ui.tree.TypeAhead.prototype.matchingNodes_ = null;
goog.ui.tree.TypeAhead.prototype.matchingLabelIndex_ = 0;
goog.ui.tree.TypeAhead.prototype.matchingNodeIndex_ = 0;
goog.ui.tree.TypeAhead.Offset = {DOWN:1, UP:-1};
goog.ui.tree.TypeAhead.prototype.handleNavigation = function $goog$ui$tree$TypeAhead$$handleNavigation$($e$$56_length$$) {
  var $handled$$ = !1;
  switch($e$$56_length$$.keyCode) {
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.UP:
      $e$$56_length$$.ctrlKey && (this.jumpTo_($e$$56_length$$.keyCode == goog.events.KeyCodes.DOWN ? goog.ui.tree.TypeAhead.Offset.DOWN : goog.ui.tree.TypeAhead.Offset.UP), $handled$$ = !0);
      break;
    case goog.events.KeyCodes.BACKSPACE:
      $e$$56_length$$ = this.buffer_.length - 1;
      $handled$$ = !0;
      0 < $e$$56_length$$ ? (this.buffer_ = this.buffer_.substring(0, $e$$56_length$$), this.jumpToLabel_(this.buffer_)) : 0 == $e$$56_length$$ ? this.buffer_ = "" : $handled$$ = !1;
      break;
    case goog.events.KeyCodes.ESC:
      this.buffer_ = "", $handled$$ = !0
  }
  return $handled$$
};
goog.ui.tree.TypeAhead.prototype.handleTypeAheadChar = function $goog$ui$tree$TypeAhead$$handleTypeAheadChar$($ch$$3_e$$) {
  var $handled$$ = !1;
  $ch$$3_e$$.ctrlKey || $ch$$3_e$$.altKey || ($ch$$3_e$$ = String.fromCharCode($ch$$3_e$$.charCode || $ch$$3_e$$.keyCode).toLowerCase(), goog.string.isUnicodeChar($ch$$3_e$$) && (" " != $ch$$3_e$$ || this.buffer_) && (this.buffer_ += $ch$$3_e$$, $handled$$ = this.jumpToLabel_(this.buffer_)));
  return $handled$$
};
goog.ui.tree.TypeAhead.prototype.setNodeInMap = function $goog$ui$tree$TypeAhead$$setNodeInMap$($node$$) {
  var $labelText$$ = $node$$.getText();
  if($labelText$$ && !goog.string.isEmptySafe($labelText$$)) {
    var $labelText$$ = $labelText$$.toLowerCase(), $previousValue$$ = this.nodeMap_.get($labelText$$);
    $previousValue$$ ? $previousValue$$.push($node$$) : this.nodeMap_.set($labelText$$, [$node$$])
  }
};
goog.ui.tree.TypeAhead.prototype.removeNodeFromMap = function $goog$ui$tree$TypeAhead$$removeNodeFromMap$($node$$) {
  var $labelText$$ = $node$$.getText();
  if($labelText$$ && !goog.string.isEmptySafe($labelText$$)) {
    var $labelText$$ = $labelText$$.toLowerCase(), $nodeList$$ = this.nodeMap_.get($labelText$$);
    $nodeList$$ && (goog.array.remove($nodeList$$, $node$$), $nodeList$$.length && this.nodeMap_.remove($labelText$$))
  }
};
goog.ui.tree.TypeAhead.prototype.jumpToLabel_ = function $goog$ui$tree$TypeAhead$$jumpToLabel_$($labels_typeAhead$$) {
  var $handled$$ = !1;
  ($labels_typeAhead$$ = this.nodeMap_.getKeys($labels_typeAhead$$)) && $labels_typeAhead$$.length && (this.matchingLabelIndex_ = this.matchingNodeIndex_ = 0, $handled$$ = this.nodeMap_.get($labels_typeAhead$$[0]), $handled$$ = this.selectMatchingNode_($handled$$)) && (this.matchingLabels_ = $labels_typeAhead$$);
  return $handled$$
};
goog.ui.tree.TypeAhead.prototype.jumpTo_ = function $goog$ui$tree$TypeAhead$$jumpTo_$($offset$$) {
  var $handled$$4_nodes$$ = !1, $labels$$ = this.matchingLabels_;
  if($labels$$) {
    var $handled$$4_nodes$$ = null, $nodeIndexOutOfRange$$ = !1;
    if(this.matchingNodes_) {
      var $newLabelIndex_newNodeIndex$$ = this.matchingNodeIndex_ + $offset$$;
      0 <= $newLabelIndex_newNodeIndex$$ && $newLabelIndex_newNodeIndex$$ < this.matchingNodes_.length ? (this.matchingNodeIndex_ = $newLabelIndex_newNodeIndex$$, $handled$$4_nodes$$ = this.matchingNodes_) : $nodeIndexOutOfRange$$ = !0
    }
    $handled$$4_nodes$$ || ($newLabelIndex_newNodeIndex$$ = this.matchingLabelIndex_ + $offset$$, 0 <= $newLabelIndex_newNodeIndex$$ && $newLabelIndex_newNodeIndex$$ < $labels$$.length && (this.matchingLabelIndex_ = $newLabelIndex_newNodeIndex$$), $labels$$.length > this.matchingLabelIndex_ && ($handled$$4_nodes$$ = this.nodeMap_.get($labels$$[this.matchingLabelIndex_])), $handled$$4_nodes$$ && $handled$$4_nodes$$.length && $nodeIndexOutOfRange$$ && (this.matchingNodeIndex_ = $offset$$ == goog.ui.tree.TypeAhead.Offset.UP ? 
    $handled$$4_nodes$$.length - 1 : 0));
    if($handled$$4_nodes$$ = this.selectMatchingNode_($handled$$4_nodes$$)) {
      this.matchingLabels_ = $labels$$
    }
  }
  return $handled$$4_nodes$$
};
goog.ui.tree.TypeAhead.prototype.selectMatchingNode_ = function $goog$ui$tree$TypeAhead$$selectMatchingNode_$($nodes$$) {
  var $node$$;
  $nodes$$ && (this.matchingNodeIndex_ < $nodes$$.length && ($node$$ = $nodes$$[this.matchingNodeIndex_], this.matchingNodes_ = $nodes$$), $node$$ && ($node$$.reveal(), $node$$.select()));
  return!!$node$$
};
goog.ui.tree.TypeAhead.prototype.clear = function $goog$ui$tree$TypeAhead$$clear$() {
  this.buffer_ = ""
};
goog.events.KeyHandler = function $goog$events$KeyHandler$($opt_element$$, $opt_capture$$) {
  goog.events.EventTarget.call(this);
  $opt_element$$ && this.attach($opt_element$$, $opt_capture$$)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {3:goog.events.KeyCodes.ENTER, 12:goog.events.KeyCodes.NUMLOCK, 63232:goog.events.KeyCodes.UP, 63233:goog.events.KeyCodes.DOWN, 63234:goog.events.KeyCodes.LEFT, 63235:goog.events.KeyCodes.RIGHT, 63236:goog.events.KeyCodes.F1, 63237:goog.events.KeyCodes.F2, 63238:goog.events.KeyCodes.F3, 63239:goog.events.KeyCodes.F4, 63240:goog.events.KeyCodes.F5, 63241:goog.events.KeyCodes.F6, 63242:goog.events.KeyCodes.F7, 63243:goog.events.KeyCodes.F8, 63244:goog.events.KeyCodes.F9, 
63245:goog.events.KeyCodes.F10, 63246:goog.events.KeyCodes.F11, 63247:goog.events.KeyCodes.F12, 63248:goog.events.KeyCodes.PRINT_SCREEN, 63272:goog.events.KeyCodes.DELETE, 63273:goog.events.KeyCodes.HOME, 63275:goog.events.KeyCodes.END, 63276:goog.events.KeyCodes.PAGE_UP, 63277:goog.events.KeyCodes.PAGE_DOWN, 63289:goog.events.KeyCodes.NUMLOCK, 63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function $goog$events$KeyHandler$$handleKeyDown_$($e$$) {
  goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !$e$$.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !$e$$.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !$e$$.metaKey) && (this.keyCode_ = this.lastKey_ = -1);
  -1 == this.lastKey_ && ($e$$.ctrlKey && $e$$.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : $e$$.altKey && $e$$.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : $e$$.metaKey && $e$$.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
  goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent($e$$.keyCode, this.lastKey_, $e$$.shiftKey, $e$$.ctrlKey, $e$$.altKey) ? this.handleEvent($e$$) : (this.keyCode_ = goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode($e$$.keyCode) : $e$$.keyCode, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = $e$$.altKey))
};
goog.events.KeyHandler.prototype.resetState = function $goog$events$KeyHandler$$resetState$() {
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.handleKeyup_ = function $goog$events$KeyHandler$$handleKeyup_$($e$$) {
  this.resetState();
  this.altKey_ = $e$$.altKey
};
goog.events.KeyHandler.prototype.handleEvent = function $goog$events$KeyHandler$$handleEvent$($e$$) {
  var $be$$2_event$$ = $e$$.getBrowserEvent(), $keyCode$$, $charCode$$, $altKey$$ = $be$$2_event$$.altKey;
  goog.userAgent.IE && $e$$.type == goog.events.EventType.KEYPRESS ? ($keyCode$$ = this.keyCode_, $charCode$$ = $keyCode$$ != goog.events.KeyCodes.ENTER && $keyCode$$ != goog.events.KeyCodes.ESC ? $be$$2_event$$.keyCode : 0) : goog.userAgent.WEBKIT && $e$$.type == goog.events.EventType.KEYPRESS ? ($keyCode$$ = this.keyCode_, $charCode$$ = 0 <= $be$$2_event$$.charCode && 63232 > $be$$2_event$$.charCode && goog.events.KeyCodes.isCharacterKey($keyCode$$) ? $be$$2_event$$.charCode : 0) : goog.userAgent.OPERA ? 
  ($keyCode$$ = this.keyCode_, $charCode$$ = goog.events.KeyCodes.isCharacterKey($keyCode$$) ? $be$$2_event$$.keyCode : 0) : ($keyCode$$ = $be$$2_event$$.keyCode || this.keyCode_, $charCode$$ = $be$$2_event$$.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && ($altKey$$ = this.altKey_), goog.userAgent.MAC && $charCode$$ == goog.events.KeyCodes.QUESTION_MARK && $keyCode$$ == goog.events.KeyCodes.WIN_KEY && ($keyCode$$ = goog.events.KeyCodes.SLASH));
  var $key$$ = $keyCode$$, $keyIdentifier$$ = $be$$2_event$$.keyIdentifier;
  $keyCode$$ ? 63232 <= $keyCode$$ && $keyCode$$ in goog.events.KeyHandler.safariKey_ ? $key$$ = goog.events.KeyHandler.safariKey_[$keyCode$$] : 25 == $keyCode$$ && $e$$.shiftKey && ($key$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in goog.events.KeyHandler.keyIdentifier_ && ($key$$ = goog.events.KeyHandler.keyIdentifier_[$keyIdentifier$$]);
  $e$$ = $key$$ == this.lastKey_;
  this.lastKey_ = $key$$;
  $be$$2_event$$ = new goog.events.KeyEvent($key$$, $charCode$$, $e$$, $be$$2_event$$);
  $be$$2_event$$.altKey = $altKey$$;
  this.dispatchEvent($be$$2_event$$)
};
goog.events.KeyHandler.prototype.getElement = function $goog$events$KeyHandler$$getElement$() {
  return this.element_
};
goog.events.KeyHandler.prototype.attach = function $goog$events$KeyHandler$$attach$($element$$, $opt_capture$$) {
  this.keyUpKey_ && this.detach();
  this.element_ = $element$$;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, $opt_capture$$);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, $opt_capture$$, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, $opt_capture$$, this)
};
goog.events.KeyHandler.prototype.detach = function $goog$events$KeyHandler$$detach$() {
  this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
  this.element_ = null;
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function $goog$events$KeyHandler$$disposeInternal$() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach()
};
goog.events.KeyEvent = function $goog$events$KeyEvent$($keyCode$$, $charCode$$, $repeat$$, $browserEvent$$) {
  goog.events.BrowserEvent.call(this, $browserEvent$$);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = $keyCode$$;
  this.charCode = $charCode$$;
  this.repeat = $repeat$$
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.events.FocusHandler = function $goog$events$FocusHandler$($element$$) {
  goog.events.EventTarget.call(this);
  this.element_ = $element$$;
  $element$$ = goog.userAgent.IE ? "focusout" : "blur";
  this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
  this.listenKeyOut_ = goog.events.listen(this.element_, $element$$, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {FOCUSIN:"focusin", FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent = function $goog$events$FocusHandler$$handleEvent$($e$$) {
  var $be$$3_event$$ = $e$$.getBrowserEvent(), $be$$3_event$$ = new goog.events.BrowserEvent($be$$3_event$$);
  $be$$3_event$$.type = "focusin" == $e$$.type || "focus" == $e$$.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
  this.dispatchEvent($be$$3_event$$)
};
goog.events.FocusHandler.prototype.disposeInternal = function $goog$events$FocusHandler$$disposeInternal$() {
  goog.events.FocusHandler.superClass_.disposeInternal.call(this);
  goog.events.unlistenByKey(this.listenKeyIn_);
  goog.events.unlistenByKey(this.listenKeyOut_);
  delete this.element_
};
goog.structs.Collection = function $goog$structs$Collection$() {
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function $goog$iter$Iterator$() {
};
goog.iter.Iterator.prototype.next = function $goog$iter$Iterator$$next$() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function $goog$iter$Iterator$$__iterator__$($opt_keys$$) {
  return this
};
goog.iter.toIterator = function $goog$iter$toIterator$($iterable$$) {
  if($iterable$$ instanceof goog.iter.Iterator) {
    return $iterable$$
  }
  if("function" == typeof $iterable$$.__iterator__) {
    return $iterable$$.__iterator__(!1)
  }
  if(goog.isArrayLike($iterable$$)) {
    var $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
    $newIter$$.next = function $$newIter$$$next$() {
      for(;;) {
        if($i$$ >= $iterable$$.length) {
          throw goog.iter.StopIteration;
        }
        if($i$$ in $iterable$$) {
          return $iterable$$[$i$$++]
        }
        $i$$++
      }
    };
    return $newIter$$
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function $goog$iter$forEach$($iterable$$, $f$$, $opt_obj$$) {
  if(goog.isArrayLike($iterable$$)) {
    try {
      goog.array.forEach($iterable$$, $f$$, $opt_obj$$)
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration) {
        throw $ex$$;
      }
    }
  }else {
    $iterable$$ = goog.iter.toIterator($iterable$$);
    try {
      for(;;) {
        $f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)
      }
    }catch($ex$$0$$) {
      if($ex$$0$$ !== goog.iter.StopIteration) {
        throw $ex$$0$$;
      }
    }
  }
};
goog.iter.filter = function $goog$iter$filter$($iterable$$2_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$2_newIter$$);
  $iterable$$2_newIter$$ = new goog.iter.Iterator;
  $iterable$$2_newIter$$.next = function $$iterable$$2_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      if($f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
        return $val$$
      }
    }
  };
  return $iterable$$2_newIter$$
};
goog.iter.range = function $goog$iter$range$($startOrStop$$, $opt_stop$$, $opt_step$$) {
  var $start$$ = 0, $stop$$ = $startOrStop$$, $step$$ = $opt_step$$ || 1;
  1 < arguments.length && ($start$$ = $startOrStop$$, $stop$$ = $opt_stop$$);
  if(0 == $step$$) {
    throw Error("Range step argument must not be zero");
  }
  var $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    if(0 < $step$$ && $start$$ >= $stop$$ || 0 > $step$$ && $start$$ <= $stop$$) {
      throw goog.iter.StopIteration;
    }
    var $rv$$ = $start$$;
    $start$$ += $step$$;
    return $rv$$
  };
  return $newIter$$
};
goog.iter.join = function $goog$iter$join$($iterable$$, $deliminator$$) {
  return goog.iter.toArray($iterable$$).join($deliminator$$)
};
goog.iter.map = function $goog$iter$map$($iterable$$4_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$4_newIter$$);
  $iterable$$4_newIter$$ = new goog.iter.Iterator;
  $iterable$$4_newIter$$.next = function $$iterable$$4_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      return $f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)
    }
  };
  return $iterable$$4_newIter$$
};
goog.iter.reduce = function $goog$iter$reduce$($iterable$$, $f$$, $val$$0$$, $opt_obj$$) {
  var $rval$$ = $val$$0$$;
  goog.iter.forEach($iterable$$, function($val$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$)
  });
  return $rval$$
};
goog.iter.some = function $goog$iter$some$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if($f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!0
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!1
};
goog.iter.every = function $goog$iter$every$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if(!$f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!1
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!0
};
goog.iter.chain = function $goog$iter$chain$($var_args$$) {
  var $args$$ = arguments, $length$$ = $args$$.length, $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    try {
      if($i$$ >= $length$$) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator($args$$[$i$$]).next()
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration || $i$$ >= $length$$) {
        throw $ex$$;
      }
      $i$$++;
      return this.next()
    }
  };
  return $newIter$$
};
goog.iter.dropWhile = function $goog$iter$dropWhile$($iterable$$8_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$8_newIter$$);
  $iterable$$8_newIter$$ = new goog.iter.Iterator;
  var $dropping$$ = !0;
  $iterable$$8_newIter$$.next = function $$iterable$$8_newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterator$$.next();
      if(!$dropping$$ || !$f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
        return $dropping$$ = !1, $val$$
      }
    }
  };
  return $iterable$$8_newIter$$
};
goog.iter.takeWhile = function $goog$iter$takeWhile$($iterable$$9_newIter$$, $f$$, $opt_obj$$) {
  var $iterator$$ = goog.iter.toIterator($iterable$$9_newIter$$);
  $iterable$$9_newIter$$ = new goog.iter.Iterator;
  var $taking$$ = !0;
  $iterable$$9_newIter$$.next = function $$iterable$$9_newIter$$$next$() {
    for(;;) {
      if($taking$$) {
        var $val$$ = $iterator$$.next();
        if($f$$.call($opt_obj$$, $val$$, void 0, $iterator$$)) {
          return $val$$
        }
        $taking$$ = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return $iterable$$9_newIter$$
};
goog.iter.toArray = function $goog$iter$toArray$($iterable$$) {
  if(goog.isArrayLike($iterable$$)) {
    return goog.array.toArray($iterable$$)
  }
  $iterable$$ = goog.iter.toIterator($iterable$$);
  var $array$$ = [];
  goog.iter.forEach($iterable$$, function($val$$) {
    $array$$.push($val$$)
  });
  return $array$$
};
goog.iter.equals = function $goog$iter$equals$($iterable1$$, $iterable2$$) {
  $iterable1$$ = goog.iter.toIterator($iterable1$$);
  $iterable2$$ = goog.iter.toIterator($iterable2$$);
  var $b1$$, $b2$$;
  try {
    for(;;) {
      $b1$$ = $b2$$ = !1;
      var $val1$$ = $iterable1$$.next();
      $b1$$ = !0;
      var $val2$$ = $iterable2$$.next();
      $b2$$ = !0;
      if($val1$$ != $val2$$) {
        break
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
    if($b1$$ && !$b2$$) {
      return!1
    }
    if(!$b2$$) {
      try {
        $iterable2$$.next()
      }catch($ex1$$) {
        if($ex1$$ !== goog.iter.StopIteration) {
          throw $ex1$$;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function $goog$iter$nextOrValue$($iterable$$, $defaultValue$$) {
  try {
    return goog.iter.toIterator($iterable$$).next()
  }catch($e$$) {
    if($e$$ != goog.iter.StopIteration) {
      throw $e$$;
    }
    return $defaultValue$$
  }
};
goog.iter.product = function $goog$iter$product$($var_args$$) {
  if(goog.array.some(arguments, function($arr$$) {
    return!$arr$$.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var $iter$$ = new goog.iter.Iterator, $arrays$$ = arguments, $indicies$$ = goog.array.repeat(0, $arrays$$.length);
  $iter$$.next = function $$iter$$$next$() {
    if($indicies$$) {
      for(var $retVal$$ = goog.array.map($indicies$$, function($valueIndex$$, $arrayIndex$$) {
        return $arrays$$[$arrayIndex$$][$valueIndex$$]
      }), $i$$ = $indicies$$.length - 1;0 <= $i$$;$i$$--) {
        goog.asserts.assert($indicies$$);
        if($indicies$$[$i$$] < $arrays$$[$i$$].length - 1) {
          $indicies$$[$i$$]++;
          break
        }
        if(0 == $i$$) {
          $indicies$$ = null;
          break
        }
        $indicies$$[$i$$] = 0
      }
      return $retVal$$
    }
    throw goog.iter.StopIteration;
  };
  return $iter$$
};
goog.iter.cycle = function $goog$iter$cycle$($iter$$1_iterable$$) {
  var $baseIterator$$ = goog.iter.toIterator($iter$$1_iterable$$), $cache$$ = [], $cacheIndex$$ = 0;
  $iter$$1_iterable$$ = new goog.iter.Iterator;
  var $useCache$$ = !1;
  $iter$$1_iterable$$.next = function $$iter$$1_iterable$$$next$() {
    var $returnElement$$ = null;
    if(!$useCache$$) {
      try {
        return $returnElement$$ = $baseIterator$$.next(), $cache$$.push($returnElement$$), $returnElement$$
      }catch($e$$) {
        if($e$$ != goog.iter.StopIteration || goog.array.isEmpty($cache$$)) {
          throw $e$$;
        }
        $useCache$$ = !0
      }
    }
    $returnElement$$ = $cache$$[$cacheIndex$$];
    $cacheIndex$$ = ($cacheIndex$$ + 1) % $cache$$.length;
    return $returnElement$$
  };
  return $iter$$1_iterable$$
};
goog.structs.Map = function $goog$structs$Map$($opt_map$$, $var_args$$) {
  this.map_ = {};
  this.keys_ = [];
  var $argLength$$ = arguments.length;
  if(1 < $argLength$$) {
    if($argLength$$ % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
      this.set(arguments[$i$$], arguments[$i$$ + 1])
    }
  }else {
    $opt_map$$ && this.addAll($opt_map$$)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function $goog$structs$Map$$getCount$() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function $goog$structs$Map$$getValues$() {
  this.cleanupKeysArray_();
  for(var $rv$$ = [], $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    $rv$$.push(this.map_[this.keys_[$i$$]])
  }
  return $rv$$
};
goog.structs.Map.prototype.getKeys = function $goog$structs$Map$$getKeys$() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function $goog$structs$Map$$containsKey$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$)
};
goog.structs.Map.prototype.containsValue = function $goog$structs$Map$$containsValue$($val$$) {
  for(var $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    if(goog.structs.Map.hasKey_(this.map_, $key$$) && this.map_[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function $goog$structs$Map$$equals$($otherMap$$, $opt_equalityFn$$) {
  if(this === $otherMap$$) {
    return!0
  }
  if(this.count_ != $otherMap$$.getCount()) {
    return!1
  }
  var $equalityFn$$ = $opt_equalityFn$$ || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var $key$$, $i$$ = 0;$key$$ = this.keys_[$i$$];$i$$++) {
    if(!$equalityFn$$(this.get($key$$), $otherMap$$.get($key$$))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function $goog$structs$Map$defaultEquals$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.structs.Map.prototype.isEmpty = function $goog$structs$Map$$isEmpty$() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function $goog$structs$Map$$clear$() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function $goog$structs$Map$$remove$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? (delete this.map_[$key$$], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function $goog$structs$Map$$cleanupKeysArray_$() {
  if(this.count_ != this.keys_.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      var $key$$ = this.keys_[$srcIndex$$];
      goog.structs.Map.hasKey_(this.map_, $key$$) && (this.keys_[$destIndex$$++] = $key$$);
      $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
  if(this.count_ != this.keys_.length) {
    for(var $seen$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      $key$$ = this.keys_[$srcIndex$$], goog.structs.Map.hasKey_($seen$$, $key$$) || (this.keys_[$destIndex$$++] = $key$$, $seen$$[$key$$] = 1), $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
};
goog.structs.Map.prototype.get = function $goog$structs$Map$$get$($key$$, $opt_val$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? this.map_[$key$$] : $opt_val$$
};
goog.structs.Map.prototype.set = function $goog$structs$Map$$set$($key$$, $value$$) {
  goog.structs.Map.hasKey_(this.map_, $key$$) || (this.count_++, this.keys_.push($key$$), this.version_++);
  this.map_[$key$$] = $value$$
};
goog.structs.Map.prototype.addAll = function $goog$structs$Map$$addAll$($map$$7_values$$) {
  var $keys$$;
  $map$$7_values$$ instanceof goog.structs.Map ? ($keys$$ = $map$$7_values$$.getKeys(), $map$$7_values$$ = $map$$7_values$$.getValues()) : ($keys$$ = goog.object.getKeys($map$$7_values$$), $map$$7_values$$ = goog.object.getValues($map$$7_values$$));
  for(var $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    this.set($keys$$[$i$$], $map$$7_values$$[$i$$])
  }
};
goog.structs.Map.prototype.clone = function $goog$structs$Map$$clone$() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function $goog$structs$Map$$transpose$() {
  for(var $transposed$$ = new goog.structs.Map, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $transposed$$.set(this.map_[$key$$], $key$$)
  }
  return $transposed$$
};
goog.structs.Map.prototype.toObject = function $goog$structs$Map$$toObject$() {
  this.cleanupKeysArray_();
  for(var $obj$$ = {}, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $obj$$[$key$$] = this.map_[$key$$]
  }
  return $obj$$
};
goog.structs.Map.prototype.getKeyIterator = function $goog$structs$Map$$getKeyIterator$() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function $goog$structs$Map$$getValueIterator$() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function $goog$structs$Map$$__iterator__$($opt_keys$$) {
  this.cleanupKeysArray_();
  var $i$$ = 0, $keys$$ = this.keys_, $map$$ = this.map_, $version$$ = this.version_, $selfObj$$ = this, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      if($version$$ != $selfObj$$.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if($i$$ >= $keys$$.length) {
        throw goog.iter.StopIteration;
      }
      var $key$$ = $keys$$[$i$$++];
      return $opt_keys$$ ? $key$$ : $map$$[$key$$]
    }
  };
  return $newIter$$
};
goog.structs.Map.hasKey_ = function $goog$structs$Map$hasKey_$($obj$$, $key$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $key$$)
};
goog.structs.Set = function $goog$structs$Set$($opt_values$$) {
  this.map_ = new goog.structs.Map;
  $opt_values$$ && this.addAll($opt_values$$)
};
goog.structs.Set.getKey_ = function $goog$structs$Set$getKey_$($val$$) {
  var $type$$ = typeof $val$$;
  return"object" == $type$$ && $val$$ || "function" == $type$$ ? "o" + goog.getUid($val$$) : $type$$.substr(0, 1) + $val$$
};
goog.structs.Set.prototype.getCount = function $goog$structs$Set$$getCount$() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function $goog$structs$Set$$add$($element$$) {
  this.map_.set(goog.structs.Set.getKey_($element$$), $element$$)
};
goog.structs.Set.prototype.addAll = function $goog$structs$Set$$addAll$($col$$11_values$$) {
  $col$$11_values$$ = goog.structs.getValues($col$$11_values$$);
  for(var $l$$ = $col$$11_values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    this.add($col$$11_values$$[$i$$])
  }
};
goog.structs.Set.prototype.removeAll = function $goog$structs$Set$$removeAll$($col$$12_values$$) {
  $col$$12_values$$ = goog.structs.getValues($col$$12_values$$);
  for(var $l$$ = $col$$12_values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    this.remove($col$$12_values$$[$i$$])
  }
};
goog.structs.Set.prototype.remove = function $goog$structs$Set$$remove$($element$$) {
  return this.map_.remove(goog.structs.Set.getKey_($element$$))
};
goog.structs.Set.prototype.clear = function $goog$structs$Set$$clear$() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function $goog$structs$Set$$isEmpty$() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function $goog$structs$Set$$contains$($element$$) {
  return this.map_.containsKey(goog.structs.Set.getKey_($element$$))
};
goog.structs.Set.prototype.containsAll = function $goog$structs$Set$$containsAll$($col$$) {
  return goog.structs.every($col$$, this.contains, this)
};
goog.structs.Set.prototype.intersection = function $goog$structs$Set$$intersection$($col$$14_values$$) {
  var $result$$ = new goog.structs.Set;
  $col$$14_values$$ = goog.structs.getValues($col$$14_values$$);
  for(var $i$$ = 0;$i$$ < $col$$14_values$$.length;$i$$++) {
    var $value$$ = $col$$14_values$$[$i$$];
    this.contains($value$$) && $result$$.add($value$$)
  }
  return $result$$
};
goog.structs.Set.prototype.difference = function $goog$structs$Set$$difference$($col$$) {
  var $result$$ = this.clone();
  $result$$.removeAll($col$$);
  return $result$$
};
goog.structs.Set.prototype.getValues = function $goog$structs$Set$$getValues$() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function $goog$structs$Set$$clone$() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function $goog$structs$Set$$equals$($col$$) {
  return this.getCount() == goog.structs.getCount($col$$) && this.isSubsetOf($col$$)
};
goog.structs.Set.prototype.isSubsetOf = function $goog$structs$Set$$isSubsetOf$($col$$) {
  var $colCount$$ = goog.structs.getCount($col$$);
  if(this.getCount() > $colCount$$) {
    return!1
  }
  !($col$$ instanceof goog.structs.Set) && 5 < $colCount$$ && ($col$$ = new goog.structs.Set($col$$));
  return goog.structs.every(this, function($value$$) {
    return goog.structs.contains($col$$, $value$$)
  })
};
goog.structs.Set.prototype.__iterator__ = function $goog$structs$Set$$__iterator__$($opt_keys$$) {
  return this.map_.__iterator__(!1)
};
goog.debug.catchErrors = function $goog$debug$catchErrors$($logFunc$$, $opt_cancel$$, $opt_target$$2_target$$) {
  $opt_target$$2_target$$ = $opt_target$$2_target$$ || goog.global;
  var $oldErrorHandler$$ = $opt_target$$2_target$$.onerror, $retVal$$ = !!$opt_cancel$$;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersion("535.3") && ($retVal$$ = !$retVal$$);
  $opt_target$$2_target$$.onerror = function $$opt_target$$2_target$$$onerror$($message$$, $url$$, $line$$) {
    $oldErrorHandler$$ && $oldErrorHandler$$($message$$, $url$$, $line$$);
    $logFunc$$({message:$message$$, fileName:$url$$, line:$line$$});
    return $retVal$$
  }
};
goog.debug.expose = function $goog$debug$expose$($obj$$, $opt_showFn$$) {
  if("undefined" == typeof $obj$$) {
    return"undefined"
  }
  if(null == $obj$$) {
    return"NULL"
  }
  var $str$$ = [], $x$$;
  for($x$$ in $obj$$) {
    if($opt_showFn$$ || !goog.isFunction($obj$$[$x$$])) {
      var $s$$ = $x$$ + " = ";
      try {
        $s$$ += $obj$$[$x$$]
      }catch($e$$) {
        $s$$ += "*** " + $e$$ + " ***"
      }
      $str$$.push($s$$)
    }
  }
  return $str$$.join("\n")
};
goog.debug.deepExpose = function $goog$debug$deepExpose$($obj$$0$$, $opt_showFn$$) {
  var $previous$$ = new goog.structs.Set, $str$$ = [], $helper$$ = function $$helper$$$($obj$$, $space$$) {
    var $nestspace$$ = $space$$ + "  ";
    try {
      if(goog.isDef($obj$$)) {
        if(goog.isNull($obj$$)) {
          $str$$.push("NULL")
        }else {
          if(goog.isString($obj$$)) {
            $str$$.push('"' + $obj$$.replace(/\n/g, "\n" + $space$$) + '"')
          }else {
            if(goog.isFunction($obj$$)) {
              $str$$.push(String($obj$$).replace(/\n/g, "\n" + $space$$))
            }else {
              if(goog.isObject($obj$$)) {
                if($previous$$.contains($obj$$)) {
                  $str$$.push("*** reference loop detected ***")
                }else {
                  $previous$$.add($obj$$);
                  $str$$.push("{");
                  for(var $x$$ in $obj$$) {
                    if($opt_showFn$$ || !goog.isFunction($obj$$[$x$$])) {
                      $str$$.push("\n"), $str$$.push($nestspace$$), $str$$.push($x$$ + " = "), $helper$$($obj$$[$x$$], $nestspace$$)
                    }
                  }
                  $str$$.push("\n" + $space$$ + "}")
                }
              }else {
                $str$$.push($obj$$)
              }
            }
          }
        }
      }else {
        $str$$.push("undefined")
      }
    }catch($e$$) {
      $str$$.push("*** " + $e$$ + " ***")
    }
  };
  $helper$$($obj$$0$$, "");
  return $str$$.join("")
};
goog.debug.exposeArray = function $goog$debug$exposeArray$($arr$$) {
  for(var $str$$ = [], $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    goog.isArray($arr$$[$i$$]) ? $str$$.push(goog.debug.exposeArray($arr$$[$i$$])) : $str$$.push($arr$$[$i$$])
  }
  return"[ " + $str$$.join(", ") + " ]"
};
goog.debug.exposeException = function $goog$debug$exposeException$($err$$, $opt_fn$$) {
  try {
    var $e$$ = goog.debug.normalizeErrorObject($err$$);
    return"Message: " + goog.string.htmlEscape($e$$.message) + '\nUrl: <a href="view-source:' + $e$$.fileName + '" target="_new">' + $e$$.fileName + "</a>\nLine: " + $e$$.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape($e$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace($opt_fn$$) + "-> ")
  }catch($e2$$) {
    return"Exception trying to expose exception! You win, we lose. " + $e2$$
  }
};
goog.debug.normalizeErrorObject = function $goog$debug$normalizeErrorObject$($err$$) {
  var $href$$ = goog.getObjectByName("window.location.href");
  if(goog.isString($err$$)) {
    return{message:$err$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$, stack:"Not available"}
  }
  var $lineNumber$$, $fileName$$, $threwError$$ = !1;
  try {
    $lineNumber$$ = $err$$.lineNumber || $err$$.line || "Not available"
  }catch($e$$) {
    $lineNumber$$ = "Not available", $threwError$$ = !0
  }
  try {
    $fileName$$ = $err$$.fileName || $err$$.filename || $err$$.sourceURL || goog.global.$googDebugFname || $href$$
  }catch($e$$0$$) {
    $fileName$$ = "Not available", $threwError$$ = !0
  }
  return!$threwError$$ && $err$$.lineNumber && $err$$.fileName && $err$$.stack ? $err$$ : {message:$err$$.message, name:$err$$.name, lineNumber:$lineNumber$$, fileName:$fileName$$, stack:$err$$.stack || "Not available"}
};
goog.debug.enhanceError = function $goog$debug$enhanceError$($err$$, $opt_message$$) {
  var $error$$ = "string" == typeof $err$$ ? Error($err$$) : $err$$;
  $error$$.stack || ($error$$.stack = goog.debug.getStacktrace(arguments.callee.caller));
  if($opt_message$$) {
    for(var $x$$ = 0;$error$$["message" + $x$$];) {
      ++$x$$
    }
    $error$$["message" + $x$$] = String($opt_message$$)
  }
  return $error$$
};
goog.debug.getStacktraceSimple = function $goog$debug$getStacktraceSimple$($opt_depth$$) {
  for(var $sb$$ = [], $fn$$ = arguments.callee.caller, $depth$$ = 0;$fn$$ && (!$opt_depth$$ || $depth$$ < $opt_depth$$);) {
    $sb$$.push(goog.debug.getFunctionName($fn$$));
    $sb$$.push("()\n");
    try {
      $fn$$ = $fn$$.caller
    }catch($e$$) {
      $sb$$.push("[exception trying to get caller]\n");
      break
    }
    $depth$$++;
    if($depth$$ >= goog.debug.MAX_STACK_DEPTH) {
      $sb$$.push("[...long stack...]");
      break
    }
  }
  $opt_depth$$ && $depth$$ >= $opt_depth$$ ? $sb$$.push("[...reached max depth limit...]") : $sb$$.push("[end]");
  return $sb$$.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function $goog$debug$getStacktrace$($opt_fn$$) {
  return goog.debug.getStacktraceHelper_($opt_fn$$ || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function $goog$debug$getStacktraceHelper_$($fn$$, $visited$$) {
  var $sb$$ = [];
  if(goog.array.contains($visited$$, $fn$$)) {
    $sb$$.push("[...circular reference...]")
  }else {
    if($fn$$ && $visited$$.length < goog.debug.MAX_STACK_DEPTH) {
      $sb$$.push(goog.debug.getFunctionName($fn$$) + "(");
      for(var $args$$ = $fn$$.arguments, $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
        0 < $i$$ && $sb$$.push(", ");
        var $arg$$;
        $arg$$ = $args$$[$i$$];
        switch(typeof $arg$$) {
          case "object":
            $arg$$ = $arg$$ ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            $arg$$ = String($arg$$);
            break;
          case "boolean":
            $arg$$ = $arg$$ ? "true" : "false";
            break;
          case "function":
            $arg$$ = ($arg$$ = goog.debug.getFunctionName($arg$$)) ? $arg$$ : "[fn]";
            break;
          default:
            $arg$$ = typeof $arg$$
        }
        40 < $arg$$.length && ($arg$$ = $arg$$.substr(0, 40) + "...");
        $sb$$.push($arg$$)
      }
      $visited$$.push($fn$$);
      $sb$$.push(")\n");
      try {
        $sb$$.push(goog.debug.getStacktraceHelper_($fn$$.caller, $visited$$))
      }catch($e$$) {
        $sb$$.push("[exception trying to get caller]\n")
      }
    }else {
      $fn$$ ? $sb$$.push("[...long stack...]") : $sb$$.push("[end]")
    }
  }
  return $sb$$.join("")
};
goog.debug.setFunctionResolver = function $goog$debug$setFunctionResolver$($resolver$$) {
  goog.debug.fnNameResolver_ = $resolver$$
};
goog.debug.getFunctionName = function $goog$debug$getFunctionName$($fn$$) {
  if(goog.debug.fnNameCache_[$fn$$]) {
    return goog.debug.fnNameCache_[$fn$$]
  }
  if(goog.debug.fnNameResolver_) {
    var $matches$$2_name$$ = goog.debug.fnNameResolver_($fn$$);
    if($matches$$2_name$$) {
      return goog.debug.fnNameCache_[$fn$$] = $matches$$2_name$$
    }
  }
  $fn$$ = String($fn$$);
  goog.debug.fnNameCache_[$fn$$] || ($matches$$2_name$$ = /function ([^\(]+)/.exec($fn$$), goog.debug.fnNameCache_[$fn$$] = $matches$$2_name$$ ? $matches$$2_name$$[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[$fn$$]
};
goog.debug.makeWhitespaceVisible = function $goog$debug$makeWhitespaceVisible$($string$$) {
  return $string$$.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function $goog$debug$LogRecord$($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  this.reset($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function $goog$debug$LogRecord$$reset$($level$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof $opt_sequenceNumber$$ ? $opt_sequenceNumber$$ : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = $opt_time$$ || goog.now();
  this.level_ = $level$$;
  this.msg_ = $msg$$;
  this.loggerName_ = $loggerName$$;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function $goog$debug$LogRecord$$getLoggerName$() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function $goog$debug$LogRecord$$getException$() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function $goog$debug$LogRecord$$setException$($exception$$) {
  this.exception_ = $exception$$
};
goog.debug.LogRecord.prototype.getExceptionText = function $goog$debug$LogRecord$$getExceptionText$() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function $goog$debug$LogRecord$$setExceptionText$($text$$) {
  this.exceptionText_ = $text$$
};
goog.debug.LogRecord.prototype.setLoggerName = function $goog$debug$LogRecord$$setLoggerName$($loggerName$$) {
  this.loggerName_ = $loggerName$$
};
goog.debug.LogRecord.prototype.getLevel = function $goog$debug$LogRecord$$getLevel$() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function $goog$debug$LogRecord$$setLevel$($level$$) {
  this.level_ = $level$$
};
goog.debug.LogRecord.prototype.getMessage = function $goog$debug$LogRecord$$getMessage$() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function $goog$debug$LogRecord$$setMessage$($msg$$) {
  this.msg_ = $msg$$
};
goog.debug.LogRecord.prototype.getMillis = function $goog$debug$LogRecord$$getMillis$() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function $goog$debug$LogRecord$$setMillis$($time$$) {
  this.time_ = $time$$
};
goog.debug.LogRecord.prototype.getSequenceNumber = function $goog$debug$LogRecord$$getSequenceNumber$() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function $goog$debug$LogBuffer$() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function $goog$debug$LogBuffer$getInstance$() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function $goog$debug$LogBuffer$$addRecord$($level$$, $msg$$, $loggerName$$) {
  var $curIndex_ret$$ = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = $curIndex_ret$$;
  if(this.isFull_) {
    return $curIndex_ret$$ = this.buffer_[$curIndex_ret$$], $curIndex_ret$$.reset($level$$, $msg$$, $loggerName$$), $curIndex_ret$$
  }
  this.isFull_ = $curIndex_ret$$ == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[$curIndex_ret$$] = new goog.debug.LogRecord($level$$, $msg$$, $loggerName$$)
};
goog.debug.LogBuffer.isBufferingEnabled = function $goog$debug$LogBuffer$isBufferingEnabled$() {
  return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function $goog$debug$LogBuffer$$clear$() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function $goog$debug$LogBuffer$$forEachRecord$($func$$) {
  var $buffer$$ = this.buffer_;
  if($buffer$$[0]) {
    var $curIndex$$ = this.curIndex_, $i$$ = this.isFull_ ? $curIndex$$ : -1;
    do {
      $i$$ = ($i$$ + 1) % goog.debug.LogBuffer.CAPACITY, $func$$($buffer$$[$i$$])
    }while($i$$ != $curIndex$$)
  }
};
goog.debug.Logger = function $goog$debug$Logger$($name$$) {
  this.name_ = $name$$
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function $goog$debug$Logger$Level$($name$$, $value$$) {
  this.name = $name$$;
  this.value = $value$$
};
goog.debug.Logger.Level.prototype.toString = function $goog$debug$Logger$Level$$toString$() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function $goog$debug$Logger$Level$createPredefinedLevelsCache_$() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var $i$$ = 0, $level$$;$level$$ = goog.debug.Logger.Level.PREDEFINED_LEVELS[$i$$];$i$$++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[$level$$.value] = $level$$, goog.debug.Logger.Level.predefinedLevelsCache_[$level$$.name] = $level$$
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function $goog$debug$Logger$Level$getPredefinedLevel$($name$$) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[$name$$] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function $goog$debug$Logger$Level$getPredefinedLevelByValue$($value$$) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if($value$$ in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[$value$$]
  }
  for(var $i$$ = 0;$i$$ < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++$i$$) {
    var $level$$ = goog.debug.Logger.Level.PREDEFINED_LEVELS[$i$$];
    if($level$$.value <= $value$$) {
      return $level$$
    }
  }
  return null
};
goog.debug.Logger.getLogger = function $goog$debug$Logger$getLogger$($name$$) {
  return goog.debug.LogManager.getLogger($name$$)
};
goog.debug.Logger.logToProfilers = function $goog$debug$Logger$logToProfilers$($msg$$) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp($msg$$) : goog.global.console.markTimeline && goog.global.console.markTimeline($msg$$));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark($msg$$)
};
goog.debug.Logger.prototype.getName = function $goog$debug$Logger$$getName$() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function $goog$debug$Logger$$addHandler$($handler$$) {
  goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push($handler$$)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push($handler$$))
};
goog.debug.Logger.prototype.removeHandler = function $goog$debug$Logger$$removeHandler$($handler$$) {
  var $handlers$$ = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!$handlers$$ && goog.array.remove($handlers$$, $handler$$)
};
goog.debug.Logger.prototype.getParent = function $goog$debug$Logger$$getParent$() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function $goog$debug$Logger$$getChildren$() {
  this.children_ || (this.children_ = {});
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function $goog$debug$Logger$$setLevel$($level$$) {
  goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = $level$$ : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = $level$$)
};
goog.debug.Logger.prototype.getLevel = function $goog$debug$Logger$$getLevel$() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function $goog$debug$Logger$$getEffectiveLevel$() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function $goog$debug$Logger$$isLoggable$($level$$) {
  return $level$$.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function $goog$debug$Logger$$log$($level$$, $msg$$, $opt_exception$$) {
  this.isLoggable($level$$) && this.doLogRecord_(this.getLogRecord($level$$, $msg$$, $opt_exception$$))
};
goog.debug.Logger.prototype.getLogRecord = function $goog$debug$Logger$$getLogRecord$($level$$, $msg$$, $opt_exception$$) {
  var $logRecord$$ = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord($level$$, $msg$$, this.name_) : new goog.debug.LogRecord($level$$, String($msg$$), this.name_);
  $opt_exception$$ && ($logRecord$$.setException($opt_exception$$), $logRecord$$.setExceptionText(goog.debug.exposeException($opt_exception$$, arguments.callee.caller)));
  return $logRecord$$
};
goog.debug.Logger.prototype.shout = function $goog$debug$Logger$$shout$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.SHOUT, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.severe = function $goog$debug$Logger$$severe$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.SEVERE, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.warning = function $goog$debug$Logger$$warning$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.WARNING, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.info = function $goog$debug$Logger$$info$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.INFO, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.config = function $goog$debug$Logger$$config$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.CONFIG, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.fine = function $goog$debug$Logger$$fine$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINE, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.finer = function $goog$debug$Logger$$finer$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINER, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.finest = function $goog$debug$Logger$$finest$($msg$$, $opt_exception$$) {
  this.log(goog.debug.Logger.Level.FINEST, $msg$$, $opt_exception$$)
};
goog.debug.Logger.prototype.logRecord = function $goog$debug$Logger$$logRecord$($logRecord$$) {
  this.isLoggable($logRecord$$.getLevel()) && this.doLogRecord_($logRecord$$)
};
goog.debug.Logger.prototype.doLogRecord_ = function $goog$debug$Logger$$doLogRecord_$($logRecord$$) {
  goog.debug.Logger.logToProfilers("log:" + $logRecord$$.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var $i$$122_target$$ = this;$i$$122_target$$;) {
      $i$$122_target$$.callPublish_($logRecord$$), $i$$122_target$$ = $i$$122_target$$.getParent()
    }
  }else {
    for(var $i$$122_target$$ = 0, $handler$$;$handler$$ = goog.debug.Logger.rootHandlers_[$i$$122_target$$++];) {
      $handler$$($logRecord$$)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function $goog$debug$Logger$$callPublish_$($logRecord$$) {
  if(this.handlers_) {
    for(var $i$$ = 0, $handler$$;$handler$$ = this.handlers_[$i$$];$i$$++) {
      $handler$$($logRecord$$)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function $goog$debug$Logger$$setParent_$($parent$$) {
  this.parent_ = $parent$$
};
goog.debug.Logger.prototype.addChild_ = function $goog$debug$Logger$$addChild_$($name$$, $logger$$) {
  this.getChildren()[$name$$] = $logger$$
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function $goog$debug$LogManager$initialize$() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(""), goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function $goog$debug$LogManager$getLoggers$() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function $goog$debug$LogManager$getRoot$() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function $goog$debug$LogManager$getLogger$($name$$) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[$name$$] || goog.debug.LogManager.createLogger_($name$$)
};
goog.debug.LogManager.createFunctionForCatchErrors = function $goog$debug$LogManager$createFunctionForCatchErrors$($opt_logger$$) {
  return function($info$$) {
    ($opt_logger$$ || goog.debug.LogManager.getRoot()).severe("Error: " + $info$$.message + " (" + $info$$.fileName + " @ Line: " + $info$$.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function $goog$debug$LogManager$createLogger_$($name$$) {
  var $logger$$ = new goog.debug.Logger($name$$);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var $lastDotIndex_leafName$$ = $name$$.lastIndexOf("."), $parentLogger_parentName$$ = $name$$.substr(0, $lastDotIndex_leafName$$), $lastDotIndex_leafName$$ = $name$$.substr($lastDotIndex_leafName$$ + 1), $parentLogger_parentName$$ = goog.debug.LogManager.getLogger($parentLogger_parentName$$);
    $parentLogger_parentName$$.addChild_($lastDotIndex_leafName$$, $logger$$);
    $logger$$.setParent_($parentLogger_parentName$$)
  }
  return goog.debug.LogManager.loggers_[$name$$] = $logger$$
};
goog.ui.tree.TreeControl = function $goog$ui$tree$TreeControl$($html$$, $opt_config$$, $opt_domHelper$$) {
  goog.ui.tree.BaseNode.call(this, $html$$, $opt_config$$, $opt_domHelper$$);
  this.setExpandedInternal(!0);
  this.setSelectedInternal(!0);
  this.selectedItem_ = this;
  this.typeAhead_ = new goog.ui.tree.TypeAhead;
  if(goog.userAgent.IE) {
    try {
      document.execCommand("BackgroundImageCache", !1, !0)
    }catch($e$$) {
      this.logger_.warning("Failed to enable background image cache")
    }
  }
};
goog.inherits(goog.ui.tree.TreeControl, goog.ui.tree.BaseNode);
goog.ui.tree.TreeControl.prototype.keyHandler_ = null;
goog.ui.tree.TreeControl.prototype.focusHandler_ = null;
goog.ui.tree.TreeControl.prototype.logger_ = goog.debug.Logger.getLogger("goog.ui.tree.TreeControl");
goog.ui.tree.TreeControl.prototype.focused_ = !1;
goog.ui.tree.TreeControl.prototype.focusedNode_ = null;
goog.ui.tree.TreeControl.prototype.showLines_ = !0;
goog.ui.tree.TreeControl.prototype.showExpandIcons_ = !0;
goog.ui.tree.TreeControl.prototype.showRootNode_ = !0;
goog.ui.tree.TreeControl.prototype.showRootLines_ = !0;
goog.ui.tree.TreeControl.prototype.getTree = function $goog$ui$tree$TreeControl$$getTree$() {
  return this
};
goog.ui.tree.TreeControl.prototype.getDepth = function $goog$ui$tree$TreeControl$$getDepth$() {
  return 0
};
goog.ui.tree.TreeControl.prototype.reveal = function $goog$ui$tree$TreeControl$$reveal$() {
};
goog.ui.tree.TreeControl.prototype.handleFocus_ = function $goog$ui$tree$TreeControl$$handleFocus_$($e$$) {
  this.focused_ = !0;
  goog.dom.classes.add(this.getElement(), "focused");
  this.selectedItem_ && this.selectedItem_.select()
};
goog.ui.tree.TreeControl.prototype.handleBlur_ = function $goog$ui$tree$TreeControl$$handleBlur_$($e$$) {
  this.focused_ = !1;
  goog.dom.classes.remove(this.getElement(), "focused")
};
goog.ui.tree.TreeControl.prototype.hasFocus = function $goog$ui$tree$TreeControl$$hasFocus$() {
  return this.focused_
};
goog.ui.tree.TreeControl.prototype.getExpanded = function $goog$ui$tree$TreeControl$$getExpanded$() {
  return!this.showRootNode_ || goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)
};
goog.ui.tree.TreeControl.prototype.setExpanded = function $goog$ui$tree$TreeControl$$setExpanded$($expanded$$) {
  this.showRootNode_ ? goog.ui.tree.TreeControl.superClass_.setExpanded.call(this, $expanded$$) : this.setExpandedInternal($expanded$$)
};
goog.ui.tree.TreeControl.prototype.getExpandIconHtml = function $goog$ui$tree$TreeControl$$getExpandIconHtml$() {
  return""
};
goog.ui.tree.TreeControl.prototype.getIconElement = function $goog$ui$tree$TreeControl$$getIconElement$() {
  var $el$$ = this.getRowElement();
  return $el$$ ? $el$$.firstChild : null
};
goog.ui.tree.TreeControl.prototype.getExpandIconElement = function $goog$ui$tree$TreeControl$$getExpandIconElement$() {
  return null
};
goog.ui.tree.TreeControl.prototype.updateExpandIcon = function $goog$ui$tree$TreeControl$$updateExpandIcon$() {
};
goog.ui.tree.TreeControl.prototype.getRowClassName = function $goog$ui$tree$TreeControl$$getRowClassName$() {
  return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this) + (this.showRootNode_ ? "" : " " + this.getConfig().cssHideRoot)
};
goog.ui.tree.TreeControl.prototype.getCalculatedIconClass = function $goog$ui$tree$TreeControl$$getCalculatedIconClass$() {
  var $expanded$$ = this.getExpanded();
  if($expanded$$ && this.expandedIconClass_) {
    return this.expandedIconClass_
  }
  if(!$expanded$$ && this.iconClass_) {
    return this.iconClass_
  }
  var $config$$ = this.getConfig();
  return $expanded$$ && $config$$.cssExpandedRootIcon ? $config$$.cssTreeIcon + " " + $config$$.cssExpandedRootIcon : !$expanded$$ && $config$$.cssCollapsedRootIcon ? $config$$.cssTreeIcon + " " + $config$$.cssCollapsedRootIcon : ""
};
goog.ui.tree.TreeControl.prototype.setSelectedItem = function $goog$ui$tree$TreeControl$$setSelectedItem$($node$$) {
  if(this.selectedItem_ != $node$$) {
    var $hadFocus$$ = !1;
    this.selectedItem_ && ($hadFocus$$ = this.selectedItem_ == this.focusedNode_, this.selectedItem_.setSelectedInternal(!1));
    if(this.selectedItem_ = $node$$) {
      $node$$.setSelectedInternal(!0), $hadFocus$$ && $node$$.select()
    }
    this.dispatchEvent(goog.events.EventType.CHANGE)
  }
};
goog.ui.tree.TreeControl.prototype.getSelectedItem = function $goog$ui$tree$TreeControl$$getSelectedItem$() {
  return this.selectedItem_
};
goog.ui.tree.TreeControl.prototype.setShowLines = function $goog$ui$tree$TreeControl$$setShowLines$($b$$) {
  this.showLines_ != $b$$ && (this.showLines_ = $b$$, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowLines = function $goog$ui$tree$TreeControl$$getShowLines$() {
  return this.showLines_
};
goog.ui.tree.TreeControl.prototype.updateLinesAndExpandIcons_ = function $goog$ui$tree$TreeControl$$updateLinesAndExpandIcons_$() {
  function $updateShowLines$$($node$$) {
    var $childrenEl_expandIconEl$$ = $node$$.getChildrenElement();
    if($childrenEl_expandIconEl$$) {
      var $childClass$$ = !$showLines$$ || $tree$$ == $node$$.getParent() && !$showRootLines$$ ? $node$$.getConfig().cssChildrenNoLines : $node$$.getConfig().cssChildren;
      $childrenEl_expandIconEl$$.className = $childClass$$;
      if($childrenEl_expandIconEl$$ = $node$$.getExpandIconElement()) {
        $childrenEl_expandIconEl$$.className = $node$$.getExpandIconClass()
      }
    }
    $node$$.forEachChild($updateShowLines$$)
  }
  var $tree$$ = this, $showLines$$ = $tree$$.getShowLines(), $showRootLines$$ = $tree$$.getShowRootLines();
  $updateShowLines$$(this)
};
goog.ui.tree.TreeControl.prototype.setShowRootLines = function $goog$ui$tree$TreeControl$$setShowRootLines$($b$$) {
  this.showRootLines_ != $b$$ && (this.showRootLines_ = $b$$, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowRootLines = function $goog$ui$tree$TreeControl$$getShowRootLines$() {
  return this.showRootLines_
};
goog.ui.tree.TreeControl.prototype.setShowExpandIcons = function $goog$ui$tree$TreeControl$$setShowExpandIcons$($b$$) {
  this.showExpandIcons_ != $b$$ && (this.showExpandIcons_ = $b$$, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowExpandIcons = function $goog$ui$tree$TreeControl$$getShowExpandIcons$() {
  return this.showExpandIcons_
};
goog.ui.tree.TreeControl.prototype.setShowRootNode = function $goog$ui$tree$TreeControl$$setShowRootNode$($b$$) {
  if(this.showRootNode_ != $b$$) {
    this.showRootNode_ = $b$$;
    if(this.isInDocument()) {
      var $el$$ = this.getRowElement();
      $el$$ && ($el$$.className = this.getRowClassName())
    }
    !$b$$ && this.getSelectedItem() == this && this.getFirstChild() && this.setSelectedItem(this.getFirstChild())
  }
};
goog.ui.tree.TreeControl.prototype.getShowRootNode = function $goog$ui$tree$TreeControl$$getShowRootNode$() {
  return this.showRootNode_
};
goog.ui.tree.TreeControl.prototype.initAccessibility = function $goog$ui$tree$TreeControl$$initAccessibility$() {
  goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);
  var $elt$$ = this.getElement();
  goog.asserts.assert($elt$$, "The DOM element for the tree cannot be null.");
  goog.a11y.aria.setRole($elt$$, "tree");
  goog.a11y.aria.setState($elt$$, "labelledby", this.getLabelElement().id)
};
goog.ui.tree.TreeControl.prototype.enterDocument = function $goog$ui$tree$TreeControl$$enterDocument$() {
  goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);
  var $el$$ = this.getElement();
  $el$$.className = this.getConfig().cssRoot;
  $el$$.setAttribute("hideFocus", "true");
  this.attachEvents_();
  this.initAccessibility()
};
goog.ui.tree.TreeControl.prototype.exitDocument = function $goog$ui$tree$TreeControl$$exitDocument$() {
  goog.ui.tree.TreeControl.superClass_.exitDocument.call(this);
  this.detachEvents_()
};
goog.ui.tree.TreeControl.prototype.attachEvents_ = function $goog$ui$tree$TreeControl$$attachEvents_$() {
  var $el$$ = this.getElement();
  $el$$.tabIndex = 0;
  var $kh$$ = this.keyHandler_ = new goog.events.KeyHandler($el$$), $fh$$ = this.focusHandler_ = new goog.events.FocusHandler($el$$);
  this.getHandler().listen($fh$$, goog.events.FocusHandler.EventType.FOCUSOUT, this.handleBlur_).listen($fh$$, goog.events.FocusHandler.EventType.FOCUSIN, this.handleFocus_).listen($kh$$, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen($el$$, goog.events.EventType.MOUSEDOWN, this.handleMouseEvent_).listen($el$$, goog.events.EventType.CLICK, this.handleMouseEvent_).listen($el$$, goog.events.EventType.DBLCLICK, this.handleMouseEvent_)
};
goog.ui.tree.TreeControl.prototype.detachEvents_ = function $goog$ui$tree$TreeControl$$detachEvents_$() {
  this.keyHandler_.dispose();
  this.keyHandler_ = null;
  this.focusHandler_.dispose();
  this.focusHandler_ = null
};
goog.ui.tree.TreeControl.prototype.handleMouseEvent_ = function $goog$ui$tree$TreeControl$$handleMouseEvent_$($e$$) {
  this.logger_.fine("Received event " + $e$$.type);
  var $node$$ = this.getNodeFromEvent_($e$$);
  if($node$$) {
    switch($e$$.type) {
      case goog.events.EventType.MOUSEDOWN:
        $node$$.onMouseDown($e$$);
        break;
      case goog.events.EventType.CLICK:
        $node$$.onClick_($e$$);
        break;
      case goog.events.EventType.DBLCLICK:
        $node$$.onDoubleClick_($e$$)
    }
  }
};
goog.ui.tree.TreeControl.prototype.handleKeyEvent = function $goog$ui$tree$TreeControl$$handleKeyEvent$($e$$) {
  var $handled$$ = !1;
  ($handled$$ = this.typeAhead_.handleNavigation($e$$) || this.selectedItem_ && this.selectedItem_.onKeyDown($e$$) || this.typeAhead_.handleTypeAheadChar($e$$)) && $e$$.preventDefault();
  return $handled$$
};
goog.ui.tree.TreeControl.prototype.getNodeFromEvent_ = function $goog$ui$tree$TreeControl$$getNodeFromEvent_$($e$$76_target$$) {
  var $node$$ = null;
  for($e$$76_target$$ = $e$$76_target$$.target;null != $e$$76_target$$;) {
    if($node$$ = goog.ui.tree.BaseNode.allNodes[$e$$76_target$$.id]) {
      return $node$$
    }
    if($e$$76_target$$ == this.getElement()) {
      break
    }
    $e$$76_target$$ = $e$$76_target$$.parentNode
  }
  return null
};
goog.ui.tree.TreeControl.prototype.createNode = function $goog$ui$tree$TreeControl$$createNode$($html$$) {
  return new goog.ui.tree.TreeNode($html$$ || "", this.getConfig(), this.getDomHelper())
};
goog.ui.tree.TreeControl.prototype.setNode = function $goog$ui$tree$TreeControl$$setNode$($node$$) {
  this.typeAhead_.setNodeInMap($node$$)
};
goog.ui.tree.TreeControl.prototype.removeNode = function $goog$ui$tree$TreeControl$$removeNode$($node$$) {
  this.typeAhead_.removeNodeFromMap($node$$)
};
goog.ui.tree.TreeControl.prototype.clearTypeAhead = function $goog$ui$tree$TreeControl$$clearTypeAhead$() {
  this.typeAhead_.clear()
};
goog.ui.tree.TreeControl.defaultConfig = {indentWidth:19, cssRoot:"goog-tree-root goog-tree-item", cssHideRoot:"goog-tree-hide-root", cssItem:"goog-tree-item", cssChildren:"goog-tree-children", cssChildrenNoLines:"goog-tree-children-nolines", cssTreeRow:"goog-tree-row", cssItemLabel:"goog-tree-item-label", cssTreeIcon:"goog-tree-icon", cssExpandTreeIcon:"goog-tree-expand-icon", cssExpandTreeIconPlus:"goog-tree-expand-icon-plus", cssExpandTreeIconMinus:"goog-tree-expand-icon-minus", cssExpandTreeIconTPlus:"goog-tree-expand-icon-tplus", 
cssExpandTreeIconTMinus:"goog-tree-expand-icon-tminus", cssExpandTreeIconLPlus:"goog-tree-expand-icon-lplus", cssExpandTreeIconLMinus:"goog-tree-expand-icon-lminus", cssExpandTreeIconT:"goog-tree-expand-icon-t", cssExpandTreeIconL:"goog-tree-expand-icon-l", cssExpandTreeIconBlank:"goog-tree-expand-icon-blank", cssExpandedFolderIcon:"goog-tree-expanded-folder-icon", cssCollapsedFolderIcon:"goog-tree-collapsed-folder-icon", cssFileIcon:"goog-tree-file-icon", cssExpandedRootIcon:"goog-tree-expanded-folder-icon", 
cssCollapsedRootIcon:"goog-tree-collapsed-folder-icon", cssSelectedRow:"selected"};
Blockly.Toolbox = {};
Blockly.Toolbox.width = 0;
Blockly.Toolbox.selectedOption_ = null;
Blockly.Toolbox.CONFIG_ = {indentWidth:19, cssRoot:"blocklyTreeRoot", cssHideRoot:"blocklyHidden", cssItem:"", cssTreeRow:"blocklyTreeRow", cssItemLabel:"blocklyTreeLabel", cssTreeIcon:"blocklyTreeIcon", cssExpandedFolderIcon:"blocklyTreeIconOpen", cssFileIcon:"blocklyTreeIconNone", cssSelectedRow:"blocklyTreeSelected"};
Blockly.Toolbox.createDom = function $Blockly$Toolbox$createDom$($svg$$, $container$$) {
  Blockly.Toolbox.HtmlDiv = goog.dom.createDom("div", "blocklyToolboxDiv");
  Blockly.Toolbox.HtmlDiv.setAttribute("dir", Blockly.RTL ? "RTL" : "LTR");
  $container$$.appendChild(Blockly.Toolbox.HtmlDiv);
  Blockly.Toolbox.flyout_ = new Blockly.Flyout;
  $svg$$.appendChild(Blockly.Toolbox.flyout_.createDom());
  Blockly.bindEvent_(Blockly.Toolbox.HtmlDiv, "mousedown", null, function($e$$) {
    Blockly.fireUiEvent(window, "resize");
    Blockly.isRightButton($e$$) || $e$$.target == Blockly.Toolbox.HtmlDiv ? Blockly.hideChaff(!1) : Blockly.hideChaff(!0)
  })
};
Blockly.Toolbox.init = function $Blockly$Toolbox$init$() {
  Blockly.Toolbox.CONFIG_.cleardotPath = Blockly.pathToBlockly + "media/1x1.gif";
  Blockly.Toolbox.CONFIG_.cssCollapsedFolderIcon = "blocklyTreeIconClosed" + (Blockly.RTL ? "Rtl" : "Ltr");
  var $tree$$ = new Blockly.Toolbox.TreeControl("root", Blockly.Toolbox.CONFIG_);
  Blockly.Toolbox.tree_ = $tree$$;
  $tree$$.setShowRootNode(!1);
  $tree$$.setShowLines(!1);
  $tree$$.setShowExpandIcons(!1);
  $tree$$.setSelectedItem(null);
  Blockly.Toolbox.HtmlDiv.style.display = "block";
  Blockly.Toolbox.flyout_.init(Blockly.mainWorkspace, !0);
  Blockly.Toolbox.populate_();
  $tree$$.render(Blockly.Toolbox.HtmlDiv);
  goog.events.listen(window, goog.events.EventType.RESIZE, Blockly.Toolbox.position_);
  Blockly.Toolbox.position_()
};
Blockly.Toolbox.position_ = function $Blockly$Toolbox$position_$() {
  var $treeDiv$$ = Blockly.Toolbox.HtmlDiv, $svgBox_xy$$ = goog.style.getBorderBox(Blockly.svg), $svgSize$$ = Blockly.svgSize();
  Blockly.RTL ? ($svgBox_xy$$ = Blockly.convertCoordinates(0, 0, !1), $treeDiv$$.style.left = $svgBox_xy$$.x + $svgSize$$.width - $treeDiv$$.offsetWidth + "px") : $treeDiv$$.style.marginLeft = $svgBox_xy$$.left;
  $treeDiv$$.style.height = $svgSize$$.height + 1 + "px";
  Blockly.Toolbox.width = $treeDiv$$.offsetWidth;
  Blockly.RTL || (Blockly.Toolbox.width -= 1)
};
Blockly.Toolbox.populate_ = function $Blockly$Toolbox$populate_$() {
  function $syncTrees$$($treeIn$$, $treeOut$$) {
    for(var $i$$ = 0, $childIn$$;$childIn$$ = $treeIn$$.childNodes[$i$$];$i$$++) {
      if($childIn$$.tagName) {
        var $childOut_name$$ = $childIn$$.tagName.toUpperCase();
        if("CATEGORY" == $childOut_name$$) {
          $childOut_name$$ = $rootOut$$.createNode($childIn$$.getAttribute("name"));
          $childOut_name$$.blocks = [];
          $treeOut$$.add($childOut_name$$);
          var $custom$$ = $childIn$$.getAttribute("custom");
          $custom$$ ? $childOut_name$$.blocks = $custom$$ : $syncTrees$$($childIn$$, $childOut_name$$)
        }else {
          "BLOCK" == $childOut_name$$ && $treeOut$$.blocks.push($childIn$$)
        }
      }
    }
  }
  var $rootOut$$ = Blockly.Toolbox.tree_;
  $rootOut$$.blocks = [];
  $syncTrees$$(Blockly.languageTree, Blockly.Toolbox.tree_);
  if($rootOut$$.blocks.length) {
    throw"Toolbox cannot have both blocks and categories in the root level.";
  }
  Blockly.fireUiEvent(window, "resize")
};
Blockly.Toolbox.clearSelection = function $Blockly$Toolbox$clearSelection$() {
  Blockly.Toolbox.tree_.setSelectedItem(null)
};
Blockly.Toolbox.TreeControl = function $Blockly$Toolbox$TreeControl$($html$$, $opt_config$$, $opt_domHelper$$) {
  goog.ui.tree.TreeControl.call(this, $html$$, $opt_config$$, $opt_domHelper$$)
};
goog.inherits(Blockly.Toolbox.TreeControl, goog.ui.tree.TreeControl);
Blockly.Toolbox.TreeControl.prototype.enterDocument = function $Blockly$Toolbox$TreeControl$$enterDocument$() {
  Blockly.Toolbox.TreeControl.superClass_.enterDocument.call(this);
  if(goog.events.BrowserFeature.TOUCH_ENABLED) {
    var $el$$ = this.getElement();
    Blockly.bindEvent_($el$$, goog.events.EventType.TOUCHSTART, this, this.handleTouchEvent_)
  }
};
Blockly.Toolbox.TreeControl.prototype.handleTouchEvent_ = function $Blockly$Toolbox$TreeControl$$handleTouchEvent_$($e$$) {
  $e$$.preventDefault();
  var $node$$ = this.getNodeFromEvent_($e$$);
  $node$$ && $e$$.type === goog.events.EventType.TOUCHSTART && window.setTimeout(function() {
    $node$$.onMouseDown($e$$)
  }, 1)
};
Blockly.Toolbox.TreeControl.prototype.createNode = function $Blockly$Toolbox$TreeControl$$createNode$($html$$) {
  return new Blockly.Toolbox.TreeNode($html$$ || "", this.getConfig(), this.getDomHelper())
};
Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function $Blockly$Toolbox$TreeControl$$setSelectedItem$($node$$) {
  this.selectedItem_ != $node$$ && (goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, $node$$), $node$$ && $node$$.blocks && $node$$.blocks.length ? Blockly.Toolbox.flyout_.show($node$$.blocks) : Blockly.Toolbox.flyout_.hide())
};
Blockly.Toolbox.TreeNode = function $Blockly$Toolbox$TreeNode$($html$$, $opt_config$$, $opt_domHelper$$) {
  goog.ui.tree.TreeNode.call(this, $html$$, $opt_config$$, $opt_domHelper$$);
  $html$$ = function $$html$$$() {
    Blockly.fireUiEvent(window, "resize")
  };
  goog.events.listen(Blockly.Toolbox.tree_, goog.ui.tree.BaseNode.EventType.EXPAND, $html$$);
  goog.events.listen(Blockly.Toolbox.tree_, goog.ui.tree.BaseNode.EventType.COLLAPSE, $html$$)
};
goog.inherits(Blockly.Toolbox.TreeNode, goog.ui.tree.TreeNode);
Blockly.Toolbox.TreeNode.prototype.getExpandIconHtml = function $Blockly$Toolbox$TreeNode$$getExpandIconHtml$() {
  return"<span></span>"
};
Blockly.Toolbox.TreeNode.prototype.getExpandIconElement = function $Blockly$Toolbox$TreeNode$$getExpandIconElement$() {
  return null
};
Blockly.Toolbox.TreeNode.prototype.onMouseDown = function $Blockly$Toolbox$TreeNode$$onMouseDown$($e$$) {
  this.hasChildren() && this.isUserCollapsible_ ? (this.toggle(), this.select()) : this.isSelected() ? this.getTree().setSelectedItem(null) : this.select();
  this.updateRow()
};
Blockly.Toolbox.TreeNode.prototype.onDoubleClick_ = function $Blockly$Toolbox$TreeNode$$onDoubleClick_$($e$$) {
};
Blockly.Variables = {};
Blockly.Variables.NAME_TYPE = "VARIABLE";
Blockly.Variables.allVariables = function $Blockly$Variables$allVariables$($opt_block_variableHash$$) {
  var $blocks$$;
  $blocks$$ = $opt_block_variableHash$$ ? $opt_block_variableHash$$.getDescendants() : Blockly.mainWorkspace.getAllBlocks();
  $opt_block_variableHash$$ = {};
  for(var $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $blockVariables_func$$ = $blocks$$[$x$$].getVars;
    if($blockVariables_func$$) {
      for(var $blockVariables_func$$ = $blockVariables_func$$.call($blocks$$[$x$$]), $y$$ = 0;$y$$ < $blockVariables_func$$.length;$y$$++) {
        var $varName$$ = $blockVariables_func$$[$y$$];
        $varName$$ && ($opt_block_variableHash$$[Blockly.Names.PREFIX_ + $varName$$.toLowerCase()] = $varName$$)
      }
    }
  }
  $blocks$$ = [];
  for(var $name$$ in $opt_block_variableHash$$) {
    $blocks$$.push($opt_block_variableHash$$[$name$$])
  }
  return $blocks$$
};
Blockly.Variables.renameVariable = function $Blockly$Variables$renameVariable$($oldName$$, $newName$$) {
  for(var $blocks$$ = Blockly.mainWorkspace.getAllBlocks(), $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $func$$ = $blocks$$[$x$$].renameVar;
    $func$$ && $func$$.call($blocks$$[$x$$], $oldName$$, $newName$$)
  }
};
Blockly.Variables.flyoutCategory = function $Blockly$Variables$flyoutCategory$($blocks$$, $gaps$$, $margin$$, $workspace$$) {
  var $variableList$$ = Blockly.Variables.allVariables();
  $variableList$$.sort(goog.string.caseInsensitiveCompare);
  $variableList$$.unshift(null);
  for(var $defaultVariable$$ = void 0, $i$$ = 0;$i$$ < $variableList$$.length;$i$$++) {
    if($variableList$$[$i$$] !== $defaultVariable$$) {
      var $getBlock$$ = Blockly.Blocks.variables_get ? new Blockly.Block($workspace$$, "variables_get") : null;
      $getBlock$$ && $getBlock$$.initSvg();
      var $setBlock$$ = Blockly.Blocks.variables_set ? new Blockly.Block($workspace$$, "variables_set") : null;
      $setBlock$$ && $setBlock$$.initSvg();
      null === $variableList$$[$i$$] ? $defaultVariable$$ = ($getBlock$$ || $setBlock$$).getVars()[0] : ($getBlock$$ && $getBlock$$.setTitleValue($variableList$$[$i$$], "VAR"), $setBlock$$ && $setBlock$$.setTitleValue($variableList$$[$i$$], "VAR"));
      $setBlock$$ && $blocks$$.push($setBlock$$);
      $getBlock$$ && $blocks$$.push($getBlock$$);
      $getBlock$$ && $setBlock$$ ? $gaps$$.push($margin$$, 3 * $margin$$) : $gaps$$.push(2 * $margin$$)
    }
  }
};
Blockly.Variables.generateUniqueName = function $Blockly$Variables$generateUniqueName$() {
  var $variableList$$ = Blockly.Variables.allVariables(), $newName$$ = "";
  if($variableList$$.length) {
    $variableList$$.sort(goog.string.caseInsensitiveCompare);
    for(var $nameSuffix$$ = 0, $potName$$ = "i", $i$$ = 0, $inUse$$ = !1;!$newName$$;) {
      $i$$ = 0;
      for($inUse$$ = !1;$i$$ < $variableList$$.length && !$inUse$$;) {
        $variableList$$[$i$$].toLowerCase() == $potName$$ && ($inUse$$ = !0), $i$$++
      }
      $inUse$$ ? ("z" === $potName$$[0] ? ($nameSuffix$$++, $potName$$ = "a") : ($potName$$ = String.fromCharCode($potName$$.charCodeAt(0) + 1), "l" == $potName$$[0] && ($potName$$ = String.fromCharCode($potName$$.charCodeAt(0) + 1))), 0 < $nameSuffix$$ && ($potName$$ += $nameSuffix$$)) : $newName$$ = $potName$$
    }
  }else {
    $newName$$ = "i"
  }
  return $newName$$
};
Blockly.FieldVariable = function $Blockly$FieldVariable$($varname$$, $opt_changeHandler$$) {
  var $changeHandler$$;
  if($opt_changeHandler$$) {
    var $thisObj$$ = this;
    $changeHandler$$ = function $$changeHandler$$$($newVal_value$$) {
      var $retVal$$ = Blockly.FieldVariable.dropdownChange.call($thisObj$$, $newVal_value$$);
      $newVal_value$$ = void 0 === $retVal$$ ? $newVal_value$$ : null === $retVal$$ ? $thisObj$$.getValue() : $retVal$$;
      $opt_changeHandler$$.call($thisObj$$, $newVal_value$$);
      return $retVal$$
    }
  }else {
    $changeHandler$$ = Blockly.FieldVariable.dropdownChange
  }
  Blockly.FieldVariable.superClass_.constructor.call(this, Blockly.FieldVariable.dropdownCreate, $changeHandler$$);
  $varname$$ ? this.setValue($varname$$) : this.setValue(Blockly.Variables.generateUniqueName())
};
goog.inherits(Blockly.FieldVariable, Blockly.FieldDropdown);
Blockly.FieldVariable.prototype.getValue = function $Blockly$FieldVariable$$getValue$() {
  return this.getText()
};
Blockly.FieldVariable.prototype.setValue = function $Blockly$FieldVariable$$setValue$($text$$) {
  this.value_ = $text$$;
  this.setText($text$$)
};
Blockly.FieldVariable.dropdownCreate = function $Blockly$FieldVariable$dropdownCreate$() {
  var $variableList$$ = Blockly.Variables.allVariables(), $name$$89_options$$ = this.getText();
  $name$$89_options$$ && -1 == $variableList$$.indexOf($name$$89_options$$) && $variableList$$.push($name$$89_options$$);
  $variableList$$.sort(goog.string.caseInsensitiveCompare);
  $variableList$$.push(Blockly.Msg.RENAME_VARIABLE);
  $variableList$$.push(Blockly.Msg.NEW_VARIABLE);
  for(var $name$$89_options$$ = [], $x$$ = 0;$x$$ < $variableList$$.length;$x$$++) {
    $name$$89_options$$[$x$$] = [$variableList$$[$x$$], $variableList$$[$x$$]]
  }
  return $name$$89_options$$
};
Blockly.FieldVariable.dropdownChange = function $Blockly$FieldVariable$dropdownChange$($text$$) {
  function $promptName$$($promptText$$, $defaultText$$) {
    Blockly.hideChaff();
    var $newVar$$ = window.prompt($promptText$$, $defaultText$$);
    return $newVar$$ && $newVar$$.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")
  }
  if($text$$ == Blockly.Msg.RENAME_VARIABLE) {
    var $oldVar$$ = this.getText();
    ($text$$ = $promptName$$(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", $oldVar$$), $oldVar$$)) && Blockly.Variables.renameVariable($oldVar$$, $text$$);
    return null
  }
  if($text$$ == Blockly.Msg.NEW_VARIABLE) {
    return($text$$ = $promptName$$(Blockly.Msg.NEW_VARIABLE_TITLE, "")) ? (Blockly.Variables.renameVariable($text$$, $text$$), $text$$) : null
  }
};
Blockly.Procedures = {};
Blockly.Procedures.NAME_TYPE = "PROCEDURE";
Blockly.Procedures.allProcedures = function $Blockly$Procedures$allProcedures$() {
  for(var $blocks$$ = Blockly.mainWorkspace.getAllBlocks(), $proceduresReturn$$ = [], $proceduresNoReturn$$ = [], $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $func$$ = $blocks$$[$x$$].getProcedureDef;
    $func$$ && ($func$$ = $func$$.call($blocks$$[$x$$])) && ($func$$[2] ? $proceduresReturn$$.push($func$$) : $proceduresNoReturn$$.push($func$$))
  }
  $proceduresNoReturn$$.sort(Blockly.Procedures.procTupleComparator_);
  $proceduresReturn$$.sort(Blockly.Procedures.procTupleComparator_);
  return[$proceduresNoReturn$$, $proceduresReturn$$]
};
Blockly.Procedures.procTupleComparator_ = function $Blockly$Procedures$procTupleComparator_$($ta$$, $tb$$) {
  var $a$$ = $ta$$[0].toLowerCase(), $b$$ = $tb$$[0].toLowerCase();
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0
};
Blockly.Procedures.findLegalName = function $Blockly$Procedures$findLegalName$($name$$, $block$$) {
  if($block$$.isInFlyout) {
    return $name$$
  }
  for(;!Blockly.Procedures.isLegalName($name$$, $block$$.workspace, $block$$);) {
    var $r$$ = $name$$.match(/^(.*?)(\d+)$/);
    $name$$ = $r$$ ? $r$$[1] + (parseInt($r$$[2], 10) + 1) : $name$$ + "2"
  }
  return $name$$
};
Blockly.Procedures.isLegalName = function $Blockly$Procedures$isLegalName$($name$$, $blocks$$16_workspace$$, $opt_exclude$$) {
  $blocks$$16_workspace$$ = $blocks$$16_workspace$$.getAllBlocks();
  for(var $x$$ = 0;$x$$ < $blocks$$16_workspace$$.length;$x$$++) {
    if($blocks$$16_workspace$$[$x$$] != $opt_exclude$$) {
      var $func$$ = $blocks$$16_workspace$$[$x$$].getProcedureDef;
      if($func$$ && ($func$$ = $func$$.call($blocks$$16_workspace$$[$x$$]), Blockly.Names.equals($func$$[0], $name$$))) {
        return!1
      }
    }
  }
  return!0
};
Blockly.Procedures.rename = function $Blockly$Procedures$rename$($text$$) {
  $text$$ = $text$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
  $text$$ = Blockly.Procedures.findLegalName($text$$, this.sourceBlock_);
  for(var $blocks$$ = this.sourceBlock_.workspace.getAllBlocks(), $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $func$$ = $blocks$$[$x$$].renameProcedure;
    $func$$ && $func$$.call($blocks$$[$x$$], this.text_, $text$$)
  }
  return $text$$
};
Blockly.Procedures.flyoutCategory = function $Blockly$Procedures$flyoutCategory$($blocks$$, $gaps$$, $margin$$, $workspace$$) {
  function $populateProcedures$$($procedureList$$, $templateName$$) {
    for(var $x$$ = 0;$x$$ < $procedureList$$.length;$x$$++) {
      var $block$$ = new Blockly.Block($workspace$$, $templateName$$);
      $block$$.setTitleValue($procedureList$$[$x$$][0], "NAME");
      for(var $tempIds$$ = [], $t$$ = 0;$t$$ < $procedureList$$[$x$$][1].length;$t$$++) {
        $tempIds$$[$t$$] = "ARG" + $t$$
      }
      $block$$.setProcedureParameters($procedureList$$[$x$$][1], $tempIds$$);
      $block$$.initSvg();
      $blocks$$.push($block$$);
      $gaps$$.push(2 * $margin$$)
    }
  }
  if(Blockly.Blocks.procedures_defnoreturn) {
    var $block$$36_tuple$$ = new Blockly.Block($workspace$$, "procedures_defnoreturn");
    $block$$36_tuple$$.initSvg();
    $blocks$$.push($block$$36_tuple$$);
    $gaps$$.push(2 * $margin$$)
  }
  Blockly.Blocks.procedures_defreturn && ($block$$36_tuple$$ = new Blockly.Block($workspace$$, "procedures_defreturn"), $block$$36_tuple$$.initSvg(), $blocks$$.push($block$$36_tuple$$), $gaps$$.push(2 * $margin$$));
  Blockly.Blocks.procedures_ifreturn && ($block$$36_tuple$$ = new Blockly.Block($workspace$$, "procedures_ifreturn"), $block$$36_tuple$$.initSvg(), $blocks$$.push($block$$36_tuple$$), $gaps$$.push(2 * $margin$$));
  $gaps$$.length && ($gaps$$[$gaps$$.length - 1] = 3 * $margin$$);
  $block$$36_tuple$$ = Blockly.Procedures.allProcedures();
  $populateProcedures$$($block$$36_tuple$$[0], "procedures_callnoreturn");
  $populateProcedures$$($block$$36_tuple$$[1], "procedures_callreturn")
};
Blockly.Procedures.getCallers = function $Blockly$Procedures$getCallers$($name$$, $workspace$$) {
  for(var $callers$$ = [], $blocks$$ = $workspace$$.getAllBlocks(), $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $func$$9_procName$$ = $blocks$$[$x$$].getProcedureCall;
    $func$$9_procName$$ && ($func$$9_procName$$ = $func$$9_procName$$.call($blocks$$[$x$$])) && Blockly.Names.equals($func$$9_procName$$, $name$$) && $callers$$.push($blocks$$[$x$$])
  }
  return $callers$$
};
Blockly.Procedures.disposeCallers = function $Blockly$Procedures$disposeCallers$($name$$, $workspace$$) {
  for(var $callers$$ = Blockly.Procedures.getCallers($name$$, $workspace$$), $x$$ = 0;$x$$ < $callers$$.length;$x$$++) {
    $callers$$[$x$$].dispose(!0, !1)
  }
};
Blockly.Procedures.mutateCallers = function $Blockly$Procedures$mutateCallers$($callers$$2_name$$, $workspace$$17_x$$, $paramNames$$, $paramIds$$) {
  $callers$$2_name$$ = Blockly.Procedures.getCallers($callers$$2_name$$, $workspace$$17_x$$);
  for($workspace$$17_x$$ = 0;$workspace$$17_x$$ < $callers$$2_name$$.length;$workspace$$17_x$$++) {
    $callers$$2_name$$[$workspace$$17_x$$].setProcedureParameters($paramNames$$, $paramIds$$)
  }
};
Blockly.Procedures.getDefinition = function $Blockly$Procedures$getDefinition$($name$$, $workspace$$) {
  for(var $blocks$$ = $workspace$$.getAllBlocks(), $x$$ = 0;$x$$ < $blocks$$.length;$x$$++) {
    var $func$$10_tuple$$ = $blocks$$[$x$$].getProcedureDef;
    if($func$$10_tuple$$ && ($func$$10_tuple$$ = $func$$10_tuple$$.call($blocks$$[$x$$])) && Blockly.Names.equals($func$$10_tuple$$[0], $name$$)) {
      return $blocks$$[$x$$]
    }
  }
  return null
};
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370db", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#db7093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
goog.color.parse = function $goog$color$parse$($str$$) {
  var $result$$ = {};
  $str$$ = String($str$$);
  var $hex_maybeHex_rgb$$ = goog.color.prependHashIfNecessaryHelper($str$$);
  if(goog.color.isValidHexColor_($hex_maybeHex_rgb$$)) {
    return $result$$.hex = goog.color.normalizeHex($hex_maybeHex_rgb$$), $result$$.type = "hex", $result$$
  }
  $hex_maybeHex_rgb$$ = goog.color.isValidRgbColor_($str$$);
  if($hex_maybeHex_rgb$$.length) {
    return $result$$.hex = goog.color.rgbArrayToHex($hex_maybeHex_rgb$$), $result$$.type = "rgb", $result$$
  }
  if(goog.color.names && ($hex_maybeHex_rgb$$ = goog.color.names[$str$$.toLowerCase()])) {
    return $result$$.hex = $hex_maybeHex_rgb$$, $result$$.type = "named", $result$$
  }
  throw Error($str$$ + " is not a valid color string");
};
goog.color.isValidColor = function $goog$color$isValidColor$($str$$) {
  var $maybeHex$$ = goog.color.prependHashIfNecessaryHelper($str$$);
  return!!(goog.color.isValidHexColor_($maybeHex$$) || goog.color.isValidRgbColor_($str$$).length || goog.color.names && goog.color.names[$str$$.toLowerCase()])
};
goog.color.parseRgb = function $goog$color$parseRgb$($str$$) {
  var $rgb$$ = goog.color.isValidRgbColor_($str$$);
  if(!$rgb$$.length) {
    throw Error($str$$ + " is not a valid RGB color");
  }
  return $rgb$$
};
goog.color.hexToRgbStyle = function $goog$color$hexToRgbStyle$($hexColor$$) {
  return goog.color.rgbStyle_(goog.color.hexToRgb($hexColor$$))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function $goog$color$normalizeHex$($hexColor$$) {
  if(!goog.color.isValidHexColor_($hexColor$$)) {
    throw Error("'" + $hexColor$$ + "' is not a valid hex color");
  }
  4 == $hexColor$$.length && ($hexColor$$ = $hexColor$$.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
  return $hexColor$$.toLowerCase()
};
goog.color.hexToRgb = function $goog$color$hexToRgb$($b$$34_hexColor$$) {
  $b$$34_hexColor$$ = goog.color.normalizeHex($b$$34_hexColor$$);
  var $r$$ = parseInt($b$$34_hexColor$$.substr(1, 2), 16), $g$$ = parseInt($b$$34_hexColor$$.substr(3, 2), 16);
  $b$$34_hexColor$$ = parseInt($b$$34_hexColor$$.substr(5, 2), 16);
  return[$r$$, $g$$, $b$$34_hexColor$$]
};
goog.color.rgbToHex = function $goog$color$rgbToHex$($hexR_r$$, $g$$, $b$$) {
  $hexR_r$$ = Number($hexR_r$$);
  $g$$ = Number($g$$);
  $b$$ = Number($b$$);
  if(isNaN($hexR_r$$) || 0 > $hexR_r$$ || 255 < $hexR_r$$ || isNaN($g$$) || 0 > $g$$ || 255 < $g$$ || isNaN($b$$) || 0 > $b$$ || 255 < $b$$) {
    throw Error('"(' + $hexR_r$$ + "," + $g$$ + "," + $b$$ + '") is not a valid RGB color');
  }
  $hexR_r$$ = goog.color.prependZeroIfNecessaryHelper($hexR_r$$.toString(16));
  $g$$ = goog.color.prependZeroIfNecessaryHelper($g$$.toString(16));
  $b$$ = goog.color.prependZeroIfNecessaryHelper($b$$.toString(16));
  return"#" + $hexR_r$$ + $g$$ + $b$$
};
goog.color.rgbArrayToHex = function $goog$color$rgbArrayToHex$($rgb$$) {
  return goog.color.rgbToHex($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.rgbToHsl = function $goog$color$rgbToHsl$($normR_r$$, $g$$, $b$$) {
  $normR_r$$ /= 255;
  $g$$ /= 255;
  $b$$ /= 255;
  var $max$$ = Math.max($normR_r$$, $g$$, $b$$), $min$$ = Math.min($normR_r$$, $g$$, $b$$), $h$$ = 0, $s$$ = 0, $l$$ = 0.5 * ($max$$ + $min$$);
  $max$$ != $min$$ && ($max$$ == $normR_r$$ ? $h$$ = 60 * ($g$$ - $b$$) / ($max$$ - $min$$) : $max$$ == $g$$ ? $h$$ = 60 * ($b$$ - $normR_r$$) / ($max$$ - $min$$) + 120 : $max$$ == $b$$ && ($h$$ = 60 * ($normR_r$$ - $g$$) / ($max$$ - $min$$) + 240), $s$$ = 0 < $l$$ && 0.5 >= $l$$ ? ($max$$ - $min$$) / (2 * $l$$) : ($max$$ - $min$$) / (2 - 2 * $l$$));
  return[Math.round($h$$ + 360) % 360, $s$$, $l$$]
};
goog.color.rgbArrayToHsl = function $goog$color$rgbArrayToHsl$($rgb$$) {
  return goog.color.rgbToHsl($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.hueToRgb_ = function $goog$color$hueToRgb_$($v1$$, $v2$$, $vH$$) {
  0 > $vH$$ ? $vH$$ += 1 : 1 < $vH$$ && ($vH$$ -= 1);
  return 1 > 6 * $vH$$ ? $v1$$ + 6 * ($v2$$ - $v1$$) * $vH$$ : 1 > 2 * $vH$$ ? $v2$$ : 2 > 3 * $vH$$ ? $v1$$ + 6 * ($v2$$ - $v1$$) * (2 / 3 - $vH$$) : $v1$$
};
goog.color.hslToRgb = function $goog$color$hslToRgb$($h$$, $s$$, $l$$) {
  var $r$$ = 0, $g$$ = 0, $b$$ = 0;
  $h$$ /= 360;
  if(0 == $s$$) {
    $r$$ = $g$$ = $b$$ = 255 * $l$$
  }else {
    var $temp2$$ = $b$$ = 0, $temp2$$ = 0.5 > $l$$ ? $l$$ * (1 + $s$$) : $l$$ + $s$$ - $s$$ * $l$$, $b$$ = 2 * $l$$ - $temp2$$, $r$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$ + 1 / 3), $g$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$), $b$$ = 255 * goog.color.hueToRgb_($b$$, $temp2$$, $h$$ - 1 / 3)
  }
  return[Math.round($r$$), Math.round($g$$), Math.round($b$$)]
};
goog.color.hslArrayToRgb = function $goog$color$hslArrayToRgb$($hsl$$) {
  return goog.color.hslToRgb($hsl$$[0], $hsl$$[1], $hsl$$[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function $goog$color$isValidHexColor_$($str$$) {
  return goog.color.validHexColorRe_.test($str$$)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function $goog$color$isNormalizedHexColor_$($str$$) {
  return goog.color.normalizedHexColorRe_.test($str$$)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function $goog$color$isValidRgbColor_$($r$$8_str$$) {
  var $b$$ = $r$$8_str$$.match(goog.color.rgbColorRe_);
  if($b$$) {
    $r$$8_str$$ = Number($b$$[1]);
    var $g$$ = Number($b$$[2]), $b$$ = Number($b$$[3]);
    if(0 <= $r$$8_str$$ && 255 >= $r$$8_str$$ && 0 <= $g$$ && 255 >= $g$$ && 0 <= $b$$ && 255 >= $b$$) {
      return[$r$$8_str$$, $g$$, $b$$]
    }
  }
  return[]
};
goog.color.prependZeroIfNecessaryHelper = function $goog$color$prependZeroIfNecessaryHelper$($hex$$) {
  return 1 == $hex$$.length ? "0" + $hex$$ : $hex$$
};
goog.color.prependHashIfNecessaryHelper = function $goog$color$prependHashIfNecessaryHelper$($str$$) {
  return"#" == $str$$.charAt(0) ? $str$$ : "#" + $str$$
};
goog.color.rgbStyle_ = function $goog$color$rgbStyle_$($rgb$$) {
  return"rgb(" + $rgb$$.join(",") + ")"
};
goog.color.hsvToRgb = function $goog$color$hsvToRgb$($h$$9_val1$$, $s$$, $brightness$$) {
  var $red$$ = 0, $green$$ = 0, $blue$$ = 0;
  if(0 == $s$$) {
    $blue$$ = $green$$ = $red$$ = $brightness$$
  }else {
    var $sextant$$ = Math.floor($h$$9_val1$$ / 60), $remainder$$ = $h$$9_val1$$ / 60 - $sextant$$;
    $h$$9_val1$$ = $brightness$$ * (1 - $s$$);
    var $val2$$ = $brightness$$ * (1 - $s$$ * $remainder$$);
    $s$$ = $brightness$$ * (1 - $s$$ * (1 - $remainder$$));
    switch($sextant$$) {
      case 1:
        $red$$ = $val2$$;
        $green$$ = $brightness$$;
        $blue$$ = $h$$9_val1$$;
        break;
      case 2:
        $red$$ = $h$$9_val1$$;
        $green$$ = $brightness$$;
        $blue$$ = $s$$;
        break;
      case 3:
        $red$$ = $h$$9_val1$$;
        $green$$ = $val2$$;
        $blue$$ = $brightness$$;
        break;
      case 4:
        $red$$ = $s$$;
        $green$$ = $h$$9_val1$$;
        $blue$$ = $brightness$$;
        break;
      case 5:
        $red$$ = $brightness$$;
        $green$$ = $h$$9_val1$$;
        $blue$$ = $val2$$;
        break;
      case 6:
      ;
      case 0:
        $red$$ = $brightness$$, $green$$ = $s$$, $blue$$ = $h$$9_val1$$
    }
  }
  return[Math.floor($red$$), Math.floor($green$$), Math.floor($blue$$)]
};
goog.color.rgbToHsv = function $goog$color$rgbToHsv$($hue_red$$, $green$$, $blue$$) {
  var $max$$ = Math.max(Math.max($hue_red$$, $green$$), $blue$$), $min$$ = Math.min(Math.min($hue_red$$, $green$$), $blue$$);
  if($min$$ == $max$$) {
    $min$$ = $hue_red$$ = 0
  }else {
    var $delta$$ = $max$$ - $min$$, $min$$ = $delta$$ / $max$$;
    $hue_red$$ = 60 * ($hue_red$$ == $max$$ ? ($green$$ - $blue$$) / $delta$$ : $green$$ == $max$$ ? 2 + ($blue$$ - $hue_red$$) / $delta$$ : 4 + ($hue_red$$ - $green$$) / $delta$$);
    0 > $hue_red$$ && ($hue_red$$ += 360);
    360 < $hue_red$$ && ($hue_red$$ -= 360)
  }
  return[$hue_red$$, $min$$, $max$$]
};
goog.color.rgbArrayToHsv = function $goog$color$rgbArrayToHsv$($rgb$$) {
  return goog.color.rgbToHsv($rgb$$[0], $rgb$$[1], $rgb$$[2])
};
goog.color.hsvArrayToRgb = function $goog$color$hsvArrayToRgb$($hsv$$) {
  return goog.color.hsvToRgb($hsv$$[0], $hsv$$[1], $hsv$$[2])
};
goog.color.hexToHsl = function $goog$color$hexToHsl$($hex$$2_rgb$$) {
  $hex$$2_rgb$$ = goog.color.hexToRgb($hex$$2_rgb$$);
  return goog.color.rgbToHsl($hex$$2_rgb$$[0], $hex$$2_rgb$$[1], $hex$$2_rgb$$[2])
};
goog.color.hslToHex = function $goog$color$hslToHex$($h$$, $s$$, $l$$) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb($h$$, $s$$, $l$$))
};
goog.color.hslArrayToHex = function $goog$color$hslArrayToHex$($hsl$$) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb($hsl$$[0], $hsl$$[1], $hsl$$[2]))
};
goog.color.hexToHsv = function $goog$color$hexToHsv$($hex$$) {
  return goog.color.rgbArrayToHsv(goog.color.hexToRgb($hex$$))
};
goog.color.hsvToHex = function $goog$color$hsvToHex$($h$$, $s$$, $v$$) {
  return goog.color.rgbArrayToHex(goog.color.hsvToRgb($h$$, $s$$, $v$$))
};
goog.color.hsvArrayToHex = function $goog$color$hsvArrayToHex$($hsv$$) {
  return goog.color.hsvToHex($hsv$$[0], $hsv$$[1], $hsv$$[2])
};
goog.color.hslDistance = function $goog$color$hslDistance$($hsl1$$, $hsl2$$) {
  var $sl1$$, $sl2$$;
  $sl1$$ = 0.5 >= $hsl1$$[2] ? $hsl1$$[1] * $hsl1$$[2] : $hsl1$$[1] * (1 - $hsl1$$[2]);
  $sl2$$ = 0.5 >= $hsl2$$[2] ? $hsl2$$[1] * $hsl2$$[2] : $hsl2$$[1] * (1 - $hsl2$$[2]);
  return($hsl1$$[2] - $hsl2$$[2]) * ($hsl1$$[2] - $hsl2$$[2]) + $sl1$$ * $sl1$$ + $sl2$$ * $sl2$$ - 2 * $sl1$$ * $sl2$$ * Math.cos(2 * ($hsl1$$[0] / 360 - $hsl2$$[0] / 360) * Math.PI)
};
goog.color.blend = function $goog$color$blend$($rgb1$$, $rgb2$$, $factor$$) {
  $factor$$ = goog.math.clamp($factor$$, 0, 1);
  return[Math.round($factor$$ * $rgb1$$[0] + (1 - $factor$$) * $rgb2$$[0]), Math.round($factor$$ * $rgb1$$[1] + (1 - $factor$$) * $rgb2$$[1]), Math.round($factor$$ * $rgb1$$[2] + (1 - $factor$$) * $rgb2$$[2])]
};
goog.color.darken = function $goog$color$darken$($rgb$$, $factor$$) {
  return goog.color.blend([0, 0, 0], $rgb$$, $factor$$)
};
goog.color.lighten = function $goog$color$lighten$($rgb$$, $factor$$) {
  return goog.color.blend([255, 255, 255], $rgb$$, $factor$$)
};
goog.color.highContrast = function $goog$color$highContrast$($prime$$, $suggestions$$) {
  for(var $suggestionsWithDiff$$ = [], $i$$ = 0;$i$$ < $suggestions$$.length;$i$$++) {
    $suggestionsWithDiff$$.push({color:$suggestions$$[$i$$], diff:goog.color.yiqBrightnessDiff_($suggestions$$[$i$$], $prime$$) + goog.color.colorDiff_($suggestions$$[$i$$], $prime$$)})
  }
  $suggestionsWithDiff$$.sort(function($a$$, $b$$) {
    return $b$$.diff - $a$$.diff
  });
  return $suggestionsWithDiff$$[0].color
};
goog.color.yiqBrightness_ = function $goog$color$yiqBrightness_$($rgb$$) {
  return Math.round((299 * $rgb$$[0] + 587 * $rgb$$[1] + 114 * $rgb$$[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function $goog$color$yiqBrightnessDiff_$($rgb1$$, $rgb2$$) {
  return Math.abs(goog.color.yiqBrightness_($rgb1$$) - goog.color.yiqBrightness_($rgb2$$))
};
goog.color.colorDiff_ = function $goog$color$colorDiff_$($rgb1$$, $rgb2$$) {
  return Math.abs($rgb1$$[0] - $rgb2$$[0]) + Math.abs($rgb1$$[1] - $rgb2$$[1]) + Math.abs($rgb1$$[2] - $rgb2$$[2])
};
goog.ui.SelectionModel = function $goog$ui$SelectionModel$($opt_items$$) {
  goog.events.EventTarget.call(this);
  this.items_ = [];
  this.addItems($opt_items$$)
};
goog.inherits(goog.ui.SelectionModel, goog.events.EventTarget);
goog.ui.SelectionModel.prototype.selectedItem_ = null;
goog.ui.SelectionModel.prototype.selectionHandler_ = null;
goog.ui.SelectionModel.prototype.getSelectionHandler = function $goog$ui$SelectionModel$$getSelectionHandler$() {
  return this.selectionHandler_
};
goog.ui.SelectionModel.prototype.setSelectionHandler = function $goog$ui$SelectionModel$$setSelectionHandler$($handler$$) {
  this.selectionHandler_ = $handler$$
};
goog.ui.SelectionModel.prototype.getItemCount = function $goog$ui$SelectionModel$$getItemCount$() {
  return this.items_.length
};
goog.ui.SelectionModel.prototype.indexOfItem = function $goog$ui$SelectionModel$$indexOfItem$($item$$) {
  return $item$$ ? goog.array.indexOf(this.items_, $item$$) : -1
};
goog.ui.SelectionModel.prototype.getFirst = function $goog$ui$SelectionModel$$getFirst$() {
  return this.items_[0]
};
goog.ui.SelectionModel.prototype.getLast = function $goog$ui$SelectionModel$$getLast$() {
  return this.items_[this.items_.length - 1]
};
goog.ui.SelectionModel.prototype.getItemAt = function $goog$ui$SelectionModel$$getItemAt$($index$$) {
  return this.items_[$index$$] || null
};
goog.ui.SelectionModel.prototype.addItems = function $goog$ui$SelectionModel$$addItems$($items$$) {
  $items$$ && (goog.array.forEach($items$$, function($item$$) {
    this.selectItem_($item$$, !1)
  }, this), goog.array.extend(this.items_, $items$$))
};
goog.ui.SelectionModel.prototype.addItem = function $goog$ui$SelectionModel$$addItem$($item$$) {
  this.addItemAt($item$$, this.getItemCount())
};
goog.ui.SelectionModel.prototype.addItemAt = function $goog$ui$SelectionModel$$addItemAt$($item$$, $index$$) {
  $item$$ && (this.selectItem_($item$$, !1), goog.array.insertAt(this.items_, $item$$, $index$$))
};
goog.ui.SelectionModel.prototype.removeItem = function $goog$ui$SelectionModel$$removeItem$($item$$) {
  $item$$ && goog.array.remove(this.items_, $item$$) && $item$$ == this.selectedItem_ && (this.selectedItem_ = null, this.dispatchEvent(goog.events.EventType.SELECT))
};
goog.ui.SelectionModel.prototype.removeItemAt = function $goog$ui$SelectionModel$$removeItemAt$($index$$) {
  this.removeItem(this.getItemAt($index$$))
};
goog.ui.SelectionModel.prototype.getSelectedItem = function $goog$ui$SelectionModel$$getSelectedItem$() {
  return this.selectedItem_
};
goog.ui.SelectionModel.prototype.getItems = function $goog$ui$SelectionModel$$getItems$() {
  return goog.array.clone(this.items_)
};
goog.ui.SelectionModel.prototype.setSelectedItem = function $goog$ui$SelectionModel$$setSelectedItem$($item$$) {
  $item$$ != this.selectedItem_ && (this.selectItem_(this.selectedItem_, !1), this.selectedItem_ = $item$$, this.selectItem_($item$$, !0));
  this.dispatchEvent(goog.events.EventType.SELECT)
};
goog.ui.SelectionModel.prototype.getSelectedIndex = function $goog$ui$SelectionModel$$getSelectedIndex$() {
  return this.indexOfItem(this.selectedItem_)
};
goog.ui.SelectionModel.prototype.setSelectedIndex = function $goog$ui$SelectionModel$$setSelectedIndex$($index$$) {
  this.setSelectedItem(this.getItemAt($index$$))
};
goog.ui.SelectionModel.prototype.clear = function $goog$ui$SelectionModel$$clear$() {
  goog.array.clear(this.items_);
  this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.disposeInternal = function $goog$ui$SelectionModel$$disposeInternal$() {
  goog.ui.SelectionModel.superClass_.disposeInternal.call(this);
  delete this.items_;
  this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.selectItem_ = function $goog$ui$SelectionModel$$selectItem_$($item$$, $select$$) {
  $item$$ && ("function" == typeof this.selectionHandler_ ? this.selectionHandler_($item$$, $select$$) : "function" == typeof $item$$.setSelected && $item$$.setSelected($select$$))
};
goog.ui.ControlRenderer = function $goog$ui$ControlRenderer$() {
};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function $goog$ui$ControlRenderer$getCustomRenderer$($ctor$$, $cssClassName$$) {
  var $renderer$$ = new $ctor$$;
  $renderer$$.getCssClass = function $$renderer$$$getCssClass$() {
    return $cssClassName$$
  };
  return $renderer$$
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.prototype.getAriaRole = function $goog$ui$ControlRenderer$$getAriaRole$() {
};
goog.ui.ControlRenderer.prototype.createDom = function $goog$ui$ControlRenderer$$createDom$($control$$) {
  var $element$$ = $control$$.getDomHelper().createDom("div", this.getClassNames($control$$).join(" "), $control$$.getContent());
  this.setAriaStates($control$$, $element$$);
  return $element$$
};
goog.ui.ControlRenderer.prototype.getContentElement = function $goog$ui$ControlRenderer$$getContentElement$($element$$) {
  return $element$$
};
goog.ui.ControlRenderer.prototype.enableClassName = function $goog$ui$ControlRenderer$$enableClassName$($control$$1_element$$, $className$$, $enable$$) {
  if($control$$1_element$$ = $control$$1_element$$.getElement ? $control$$1_element$$.getElement() : $control$$1_element$$) {
    if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
      var $combinedClasses$$ = this.getAppliedCombinedClassNames_(goog.dom.classes.get($control$$1_element$$), $className$$);
      $combinedClasses$$.push($className$$);
      goog.partial($enable$$ ? goog.dom.classes.add : goog.dom.classes.remove, $control$$1_element$$).apply(null, $combinedClasses$$)
    }else {
      goog.dom.classes.enable($control$$1_element$$, $className$$, $enable$$)
    }
  }
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function $goog$ui$ControlRenderer$$enableExtraClassName$($control$$, $className$$, $enable$$) {
  this.enableClassName($control$$, $className$$, $enable$$)
};
goog.ui.ControlRenderer.prototype.canDecorate = function $goog$ui$ControlRenderer$$canDecorate$($element$$) {
  return!0
};
goog.ui.ControlRenderer.prototype.decorate = function $goog$ui$ControlRenderer$$decorate$($control$$, $element$$) {
  $element$$.id && $control$$.setId($element$$.id);
  var $contentElem_hasCombinedClassName$$ = this.getContentElement($element$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $control$$.setContentInternal($contentElem_hasCombinedClassName$$.firstChild.nextSibling ? goog.array.clone($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$.setContentInternal(null);
  var $state$$ = 0, $rendererClassName$$ = this.getCssClass(), $structuralClassName$$ = this.getStructuralCssClass(), $hasRendererClassName$$ = !1, $hasStructuralClassName$$ = !1, $contentElem_hasCombinedClassName$$ = !1, $classNames$$ = goog.dom.classes.get($element$$);
  goog.array.forEach($classNames$$, function($className$$) {
    $hasRendererClassName$$ || $className$$ != $rendererClassName$$ ? $hasStructuralClassName$$ || $className$$ != $structuralClassName$$ ? $state$$ |= this.getStateFromClass($className$$) : $hasStructuralClassName$$ = !0 : ($hasRendererClassName$$ = !0, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = !0))
  }, this);
  $control$$.setStateInternal($state$$);
  $hasRendererClassName$$ || ($classNames$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = !0));
  $hasStructuralClassName$$ || $classNames$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$.getExtraClassNames();
  $extraClassNames$$ && $classNames$$.push.apply($classNames$$, $extraClassNames$$);
  if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
    var $combinedClasses$$ = this.getAppliedCombinedClassNames_($classNames$$);
    0 < $combinedClasses$$.length && ($classNames$$.push.apply($classNames$$, $combinedClasses$$), $contentElem_hasCombinedClassName$$ = !0)
  }
  $hasRendererClassName$$ && $hasStructuralClassName$$ && !$extraClassNames$$ && !$contentElem_hasCombinedClassName$$ || goog.dom.classes.set($element$$, $classNames$$.join(" "));
  this.setAriaStates($control$$, $element$$);
  return $element$$
};
goog.ui.ControlRenderer.prototype.initializeDom = function $goog$ui$ControlRenderer$$initializeDom$($control$$) {
  $control$$.isRightToLeft() && this.setRightToLeft($control$$.getElement(), !0);
  $control$$.isEnabled() && this.setFocusable($control$$, $control$$.isVisible())
};
goog.ui.ControlRenderer.prototype.setAriaRole = function $goog$ui$ControlRenderer$$setAriaRole$($element$$, $opt_preferredRole$$) {
  var $ariaRole$$ = $opt_preferredRole$$ || this.getAriaRole();
  $ariaRole$$ && (goog.asserts.assert($element$$, "The element passed as a first parameter cannot be null."), goog.a11y.aria.setRole($element$$, $ariaRole$$))
};
goog.ui.ControlRenderer.prototype.setAriaStates = function $goog$ui$ControlRenderer$$setAriaStates$($control$$, $element$$) {
  goog.asserts.assert($control$$);
  goog.asserts.assert($element$$);
  $control$$.isVisible() || goog.a11y.aria.setState($element$$, goog.a11y.aria.State.HIDDEN, !$control$$.isVisible());
  $control$$.isEnabled() || this.updateAriaState($element$$, goog.ui.Component.State.DISABLED, !$control$$.isEnabled());
  $control$$.isSupportedState(goog.ui.Component.State.SELECTED) && this.updateAriaState($element$$, goog.ui.Component.State.SELECTED, $control$$.isSelected());
  $control$$.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState($element$$, goog.ui.Component.State.CHECKED, $control$$.isChecked());
  $control$$.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState($element$$, goog.ui.Component.State.OPENED, $control$$.isOpen())
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function $goog$ui$ControlRenderer$$setAllowTextSelection$($element$$, $allow$$) {
  goog.style.setUnselectable($element$$, !$allow$$, !goog.userAgent.IE && !goog.userAgent.OPERA)
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function $goog$ui$ControlRenderer$$setRightToLeft$($element$$, $rightToLeft$$) {
  this.enableClassName($element$$, this.getStructuralCssClass() + "-rtl", $rightToLeft$$)
};
goog.ui.ControlRenderer.prototype.isFocusable = function $goog$ui$ControlRenderer$$isFocusable$($control$$) {
  var $keyTarget$$;
  return $control$$.isSupportedState(goog.ui.Component.State.FOCUSED) && ($keyTarget$$ = $control$$.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex($keyTarget$$) : !1
};
goog.ui.ControlRenderer.prototype.setFocusable = function $goog$ui$ControlRenderer$$setFocusable$($control$$, $focusable$$) {
  var $keyTarget$$;
  if($control$$.isSupportedState(goog.ui.Component.State.FOCUSED) && ($keyTarget$$ = $control$$.getKeyEventTarget())) {
    if(!$focusable$$ && $control$$.isFocused()) {
      try {
        $keyTarget$$.blur()
      }catch($e$$) {
      }
      $control$$.isFocused() && $control$$.handleBlur(null)
    }
    goog.dom.isFocusableTabIndex($keyTarget$$) != $focusable$$ && goog.dom.setFocusableTabIndex($keyTarget$$, $focusable$$)
  }
};
goog.ui.ControlRenderer.prototype.setVisible = function $goog$ui$ControlRenderer$$setVisible$($element$$, $visible$$) {
  goog.style.showElement($element$$, $visible$$);
  $element$$ && goog.a11y.aria.setState($element$$, goog.a11y.aria.State.HIDDEN, !$visible$$)
};
goog.ui.ControlRenderer.prototype.setState = function $goog$ui$ControlRenderer$$setState$($control$$, $state$$, $enable$$) {
  var $element$$ = $control$$.getElement();
  if($element$$) {
    var $className$$ = this.getClassForState($state$$);
    $className$$ && this.enableClassName($control$$, $className$$, $enable$$);
    this.updateAriaState($element$$, $state$$, $enable$$)
  }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function $goog$ui$ControlRenderer$$updateAriaState$($element$$, $ariaState_state$$, $enable$$) {
  goog.ui.ControlRenderer.ARIA_STATE_MAP_ || (goog.ui.ControlRenderer.ARIA_STATE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.a11y.aria.State.DISABLED, goog.ui.Component.State.SELECTED, goog.a11y.aria.State.SELECTED, goog.ui.Component.State.CHECKED, goog.a11y.aria.State.CHECKED, goog.ui.Component.State.OPENED, goog.a11y.aria.State.EXPANDED));
  if($ariaState_state$$ = goog.ui.ControlRenderer.ARIA_STATE_MAP_[$ariaState_state$$]) {
    goog.asserts.assert($element$$, "The element passed as a first parameter cannot be null."), goog.a11y.aria.setState($element$$, $ariaState_state$$, $enable$$)
  }
};
goog.ui.ControlRenderer.prototype.setContent = function $goog$ui$ControlRenderer$$setContent$($element$$, $content$$) {
  var $contentElem$$ = this.getContentElement($element$$);
  if($contentElem$$ && (goog.dom.removeChildren($contentElem$$), $content$$)) {
    if(goog.isString($content$$)) {
      goog.dom.setTextContent($contentElem$$, $content$$)
    }else {
      var $childHandler$$ = function $$childHandler$$$($child$$) {
        if($child$$) {
          var $doc$$ = goog.dom.getOwnerDocument($contentElem$$);
          $contentElem$$.appendChild(goog.isString($child$$) ? $doc$$.createTextNode($child$$) : $child$$)
        }
      };
      goog.isArray($content$$) ? goog.array.forEach($content$$, $childHandler$$) : !goog.isArrayLike($content$$) || "nodeType" in $content$$ ? $childHandler$$($content$$) : goog.array.forEach(goog.array.clone($content$$), $childHandler$$)
    }
  }
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function $goog$ui$ControlRenderer$$getKeyEventTarget$($control$$) {
  return $control$$.getElement()
};
goog.ui.ControlRenderer.prototype.getCssClass = function $goog$ui$ControlRenderer$$getCssClass$() {
  return goog.ui.ControlRenderer.CSS_CLASS
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function $goog$ui$ControlRenderer$$getIe6ClassCombinations$() {
  return[]
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function $goog$ui$ControlRenderer$$getStructuralCssClass$() {
  return this.getCssClass()
};
goog.ui.ControlRenderer.prototype.getClassNames = function $goog$ui$ControlRenderer$$getClassNames$($control$$10_extraClassNames$$) {
  var $classNamesForState_cssClass$$ = this.getCssClass(), $classNames$$ = [$classNamesForState_cssClass$$], $structuralCssClass$$ = this.getStructuralCssClass();
  $structuralCssClass$$ != $classNamesForState_cssClass$$ && $classNames$$.push($structuralCssClass$$);
  $classNamesForState_cssClass$$ = this.getClassNamesForState($control$$10_extraClassNames$$.getState());
  $classNames$$.push.apply($classNames$$, $classNamesForState_cssClass$$);
  ($control$$10_extraClassNames$$ = $control$$10_extraClassNames$$.getExtraClassNames()) && $classNames$$.push.apply($classNames$$, $control$$10_extraClassNames$$);
  goog.userAgent.IE && !goog.userAgent.isVersion("7") && $classNames$$.push.apply($classNames$$, this.getAppliedCombinedClassNames_($classNames$$));
  return $classNames$$
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function $goog$ui$ControlRenderer$$getAppliedCombinedClassNames_$($classes$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$ = $classes$$.concat([$opt_includedClass$$]));
  goog.array.forEach(this.getIe6ClassCombinations(), function($combo$$) {
    !goog.array.every($combo$$, goog.partial(goog.array.contains, $classes$$)) || $opt_includedClass$$ && !goog.array.contains($combo$$, $opt_includedClass$$) || $toAdd$$.push($combo$$.join("_"))
  });
  return $toAdd$$
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function $goog$ui$ControlRenderer$$getClassNamesForState$($state$$) {
  for(var $classNames$$ = [];$state$$;) {
    var $mask$$ = $state$$ & -$state$$;
    $classNames$$.push(this.getClassForState($mask$$));
    $state$$ &= ~$mask$$
  }
  return $classNames$$
};
goog.ui.ControlRenderer.prototype.getClassForState = function $goog$ui$ControlRenderer$$getClassForState$($state$$) {
  this.classByState_ || this.createClassByStateMap_();
  return this.classByState_[$state$$]
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function $goog$ui$ControlRenderer$$getStateFromClass$($className$$20_state$$) {
  this.stateByClass_ || this.createStateByClassMap_();
  $className$$20_state$$ = parseInt(this.stateByClass_[$className$$20_state$$], 10);
  return isNaN($className$$20_state$$) ? 0 : $className$$20_state$$
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function $goog$ui$ControlRenderer$$createClassByStateMap_$() {
  var $baseClass$$ = this.getStructuralCssClass();
  this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, $baseClass$$ + "-disabled", goog.ui.Component.State.HOVER, $baseClass$$ + "-hover", goog.ui.Component.State.ACTIVE, $baseClass$$ + "-active", goog.ui.Component.State.SELECTED, $baseClass$$ + "-selected", goog.ui.Component.State.CHECKED, $baseClass$$ + "-checked", goog.ui.Component.State.FOCUSED, $baseClass$$ + "-focused", goog.ui.Component.State.OPENED, $baseClass$$ + "-open")
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function $goog$ui$ControlRenderer$$createStateByClassMap_$() {
  this.classByState_ || this.createClassByStateMap_();
  this.stateByClass_ = goog.object.transpose(this.classByState_)
};
goog.ui.PaletteRenderer = function $goog$ui$PaletteRenderer$() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.PaletteRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.PaletteRenderer);
goog.ui.PaletteRenderer.cellId_ = 0;
goog.ui.PaletteRenderer.CSS_CLASS = "goog-palette";
goog.ui.PaletteRenderer.prototype.createDom = function $goog$ui$PaletteRenderer$$createDom$($palette$$) {
  var $classNames$$ = this.getClassNames($palette$$);
  return $palette$$.getDomHelper().createDom("div", $classNames$$ ? $classNames$$.join(" ") : null, this.createGrid($palette$$.getContent(), $palette$$.getSize(), $palette$$.getDomHelper()))
};
goog.ui.PaletteRenderer.prototype.createGrid = function $goog$ui$PaletteRenderer$$createGrid$($items$$, $size$$, $dom$$) {
  for(var $rows$$ = [], $row$$ = 0, $index$$ = 0;$row$$ < $size$$.height;$row$$++) {
    for(var $cells$$ = [], $column$$ = 0;$column$$ < $size$$.width;$column$$++) {
      var $item$$ = $items$$ && $items$$[$index$$++];
      $cells$$.push(this.createCell($item$$, $dom$$))
    }
    $rows$$.push(this.createRow($cells$$, $dom$$))
  }
  return this.createTable($rows$$, $dom$$)
};
goog.ui.PaletteRenderer.prototype.createTable = function $goog$ui$PaletteRenderer$$createTable$($rows$$, $dom$$) {
  var $table$$ = $dom$$.createDom("table", this.getCssClass() + "-table", $dom$$.createDom("tbody", this.getCssClass() + "-body", $rows$$));
  $table$$.cellSpacing = 0;
  $table$$.cellPadding = 0;
  goog.a11y.aria.setRole($table$$, "grid");
  return $table$$
};
goog.ui.PaletteRenderer.prototype.createRow = function $goog$ui$PaletteRenderer$$createRow$($cells$$, $dom$$) {
  return $dom$$.createDom("tr", this.getCssClass() + "-row", $cells$$)
};
goog.ui.PaletteRenderer.prototype.createCell = function $goog$ui$PaletteRenderer$$createCell$($node$$, $dom$$) {
  var $cell$$ = $dom$$.createDom("td", {"class":this.getCssClass() + "-cell", id:this.getCssClass() + "-cell-" + goog.ui.PaletteRenderer.cellId_++}, $node$$);
  goog.a11y.aria.setRole($cell$$, "gridcell");
  return $cell$$
};
goog.ui.PaletteRenderer.prototype.canDecorate = function $goog$ui$PaletteRenderer$$canDecorate$($element$$) {
  return!1
};
goog.ui.PaletteRenderer.prototype.decorate = function $goog$ui$PaletteRenderer$$decorate$($palette$$, $element$$) {
  return null
};
goog.ui.PaletteRenderer.prototype.setContent = function $goog$ui$PaletteRenderer$$setContent$($element$$, $content$$) {
  if($element$$) {
    var $tbody$$ = goog.dom.getElementsByTagNameAndClass("tbody", this.getCssClass() + "-body", $element$$)[0];
    if($tbody$$) {
      var $index$$ = 0;
      goog.array.forEach($tbody$$.rows, function($row$$) {
        goog.array.forEach($row$$.cells, function($cell$$) {
          goog.dom.removeChildren($cell$$);
          if($content$$) {
            var $item$$ = $content$$[$index$$++];
            $item$$ && goog.dom.appendChild($cell$$, $item$$)
          }
        })
      });
      if($index$$ < $content$$.length) {
        for(var $cells$$ = [], $dom$$ = goog.dom.getDomHelper($element$$), $width$$ = $tbody$$.rows[0].cells.length;$index$$ < $content$$.length;) {
          var $item$$9_row$$ = $content$$[$index$$++];
          $cells$$.push(this.createCell($item$$9_row$$, $dom$$));
          $cells$$.length == $width$$ && ($item$$9_row$$ = this.createRow($cells$$, $dom$$), goog.dom.appendChild($tbody$$, $item$$9_row$$), $cells$$.length = 0)
        }
        if(0 < $cells$$.length) {
          for(;$cells$$.length < $width$$;) {
            $cells$$.push(this.createCell("", $dom$$))
          }
          $item$$9_row$$ = this.createRow($cells$$, $dom$$);
          goog.dom.appendChild($tbody$$, $item$$9_row$$)
        }
      }
    }
    goog.style.setUnselectable($element$$, !0, goog.userAgent.GECKO)
  }
};
goog.ui.PaletteRenderer.prototype.getContainingItem = function $goog$ui$PaletteRenderer$$getContainingItem$($palette$$, $node$$) {
  for(var $root$$ = $palette$$.getElement();$node$$ && $node$$.nodeType == goog.dom.NodeType.ELEMENT && $node$$ != $root$$;) {
    if("TD" == $node$$.tagName && goog.dom.classes.has($node$$, this.getCssClass() + "-cell")) {
      return $node$$.firstChild
    }
    $node$$ = $node$$.parentNode
  }
  return null
};
goog.ui.PaletteRenderer.prototype.highlightCell = function $goog$ui$PaletteRenderer$$highlightCell$($palette$$3_table$$, $cell$$2_node$$, $highlight$$) {
  $cell$$2_node$$ && ($cell$$2_node$$ = $cell$$2_node$$.parentNode, goog.dom.classes.enable($cell$$2_node$$, this.getCssClass() + "-cell-hover", $highlight$$), $palette$$3_table$$ = $palette$$3_table$$.getElement().firstChild, goog.a11y.aria.setState($palette$$3_table$$, "activedescendent", $cell$$2_node$$.id))
};
goog.ui.PaletteRenderer.prototype.selectCell = function $goog$ui$PaletteRenderer$$selectCell$($palette$$, $node$$, $select$$) {
  $node$$ && goog.dom.classes.enable($node$$.parentNode, this.getCssClass() + "-cell-selected", $select$$)
};
goog.ui.PaletteRenderer.prototype.getCssClass = function $goog$ui$PaletteRenderer$$getCssClass$() {
  return goog.ui.PaletteRenderer.CSS_CLASS
};
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function $goog$ui$registry$getDefaultRenderer$($componentCtor$$) {
  for(var $key$$;$componentCtor$$;) {
    $key$$ = goog.getUid($componentCtor$$);
    if($key$$ = goog.ui.registry.defaultRenderers_[$key$$]) {
      break
    }
    $componentCtor$$ = $componentCtor$$.superClass_ ? $componentCtor$$.superClass_.constructor : null
  }
  return $key$$ ? goog.isFunction($key$$.getInstance) ? $key$$.getInstance() : new $key$$ : null
};
goog.ui.registry.setDefaultRenderer = function $goog$ui$registry$setDefaultRenderer$($componentCtor$$, $rendererCtor$$) {
  if(!goog.isFunction($componentCtor$$)) {
    throw Error("Invalid component class " + $componentCtor$$);
  }
  if(!goog.isFunction($rendererCtor$$)) {
    throw Error("Invalid renderer class " + $rendererCtor$$);
  }
  var $key$$ = goog.getUid($componentCtor$$);
  goog.ui.registry.defaultRenderers_[$key$$] = $rendererCtor$$
};
goog.ui.registry.getDecoratorByClassName = function $goog$ui$registry$getDecoratorByClassName$($className$$) {
  return $className$$ in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[$className$$]() : null
};
goog.ui.registry.setDecoratorByClassName = function $goog$ui$registry$setDecoratorByClassName$($className$$, $decoratorFn$$) {
  if(!$className$$) {
    throw Error("Invalid class name " + $className$$);
  }
  if(!goog.isFunction($decoratorFn$$)) {
    throw Error("Invalid decorator function " + $decoratorFn$$);
  }
  goog.ui.registry.decoratorFunctions_[$className$$] = $decoratorFn$$
};
goog.ui.registry.getDecorator = function $goog$ui$registry$getDecorator$($decorator_element$$) {
  for(var $classNames$$ = goog.dom.classes.get($decorator_element$$), $i$$ = 0, $len$$ = $classNames$$.length;$i$$ < $len$$;$i$$++) {
    if($decorator_element$$ = goog.ui.registry.getDecoratorByClassName($classNames$$[$i$$])) {
      return $decorator_element$$
    }
  }
  return null
};
goog.ui.registry.reset = function $goog$ui$registry$reset$() {
  goog.ui.registry.defaultRenderers_ = {};
  goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.decorate = function $goog$ui$decorate$($element$$) {
  var $decorator$$ = goog.ui.registry.getDecorator($element$$);
  $decorator$$ && $decorator$$.decorate($element$$);
  return $decorator$$
};
goog.ui.Control = function $goog$ui$Control$($content$$, $opt_renderer$$, $opt_domHelper$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.renderer_ = $opt_renderer$$ || goog.ui.registry.getDefaultRenderer(this.constructor);
  this.setContentInternal($content$$)
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = !0;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = !0;
goog.ui.Control.prototype.allowTextSelection_ = !1;
goog.ui.Control.prototype.preferredAriaRole_ = null;
goog.ui.Control.prototype.isHandleMouseEvents = function $goog$ui$Control$$isHandleMouseEvents$() {
  return this.handleMouseEvents_
};
goog.ui.Control.prototype.setHandleMouseEvents = function $goog$ui$Control$$setHandleMouseEvents$($enable$$) {
  this.isInDocument() && $enable$$ != this.handleMouseEvents_ && this.enableMouseEventHandling_($enable$$);
  this.handleMouseEvents_ = $enable$$
};
goog.ui.Control.prototype.getKeyEventTarget = function $goog$ui$Control$$getKeyEventTarget$() {
  return this.renderer_.getKeyEventTarget(this)
};
goog.ui.Control.prototype.getKeyHandler = function $goog$ui$Control$$getKeyHandler$() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
goog.ui.Control.prototype.getRenderer = function $goog$ui$Control$$getRenderer$() {
  return this.renderer_
};
goog.ui.Control.prototype.setRenderer = function $goog$ui$Control$$setRenderer$($renderer$$) {
  if(this.isInDocument()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.getElement() && this.setElementInternal(null);
  this.renderer_ = $renderer$$
};
goog.ui.Control.prototype.getExtraClassNames = function $goog$ui$Control$$getExtraClassNames$() {
  return this.extraClassNames_
};
goog.ui.Control.prototype.addClassName = function $goog$ui$Control$$addClassName$($className$$) {
  $className$$ && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, $className$$) || this.extraClassNames_.push($className$$) : this.extraClassNames_ = [$className$$], this.renderer_.enableExtraClassName(this, $className$$, !0))
};
goog.ui.Control.prototype.removeClassName = function $goog$ui$Control$$removeClassName$($className$$) {
  $className$$ && this.extraClassNames_ && (goog.array.remove(this.extraClassNames_, $className$$), 0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, $className$$, !1))
};
goog.ui.Control.prototype.enableClassName = function $goog$ui$Control$$enableClassName$($className$$, $enable$$) {
  $enable$$ ? this.addClassName($className$$) : this.removeClassName($className$$)
};
goog.ui.Control.prototype.createDom = function $goog$ui$Control$$createDom$() {
  var $element$$ = this.renderer_.createDom(this);
  this.setElementInternal($element$$);
  this.renderer_.setAriaRole($element$$, this.getPreferredAriaRole());
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection($element$$, !1);
  this.isVisible() || this.renderer_.setVisible($element$$, !1)
};
goog.ui.Control.prototype.getPreferredAriaRole = function $goog$ui$Control$$getPreferredAriaRole$() {
  return this.preferredAriaRole_
};
goog.ui.Control.prototype.setPreferredAriaRole = function $goog$ui$Control$$setPreferredAriaRole$($role$$) {
  this.preferredAriaRole_ = $role$$
};
goog.ui.Control.prototype.getContentElement = function $goog$ui$Control$$getContentElement$() {
  return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Control.prototype.canDecorate = function $goog$ui$Control$$canDecorate$($element$$) {
  return this.renderer_.canDecorate($element$$)
};
goog.ui.Control.prototype.decorateInternal = function $goog$ui$Control$$decorateInternal$($element$$) {
  $element$$ = this.renderer_.decorate(this, $element$$);
  this.setElementInternal($element$$);
  this.renderer_.setAriaRole($element$$, this.getPreferredAriaRole());
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection($element$$, !1);
  this.visible_ = "none" != $element$$.style.display
};
goog.ui.Control.prototype.enterDocument = function $goog$ui$Control$$enterDocument$() {
  goog.ui.Control.superClass_.enterDocument.call(this);
  this.renderer_.initializeDom(this);
  if(this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
    var $keyTarget$$ = this.getKeyEventTarget();
    if($keyTarget$$) {
      var $keyHandler$$ = this.getKeyHandler();
      $keyHandler$$.attach($keyTarget$$);
      this.getHandler().listen($keyHandler$$, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen($keyTarget$$, goog.events.EventType.FOCUS, this.handleFocus).listen($keyTarget$$, goog.events.EventType.BLUR, this.handleBlur)
    }
  }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function $goog$ui$Control$$enableMouseEventHandling_$($enable$$) {
  var $handler$$ = this.getHandler(), $element$$ = this.getElement();
  $enable$$ ? ($handler$$.listen($element$$, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen($element$$, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen($element$$, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen($element$$, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && $handler$$.listen($element$$, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && $handler$$.listen($element$$, 
  goog.events.EventType.DBLCLICK, this.handleDblClick)) : ($handler$$.unlisten($element$$, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten($element$$, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten($element$$, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten($element$$, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && $handler$$.unlisten($element$$, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), 
  goog.userAgent.IE && $handler$$.unlisten($element$$, goog.events.EventType.DBLCLICK, this.handleDblClick))
};
goog.ui.Control.prototype.exitDocument = function $goog$ui$Control$$exitDocument$() {
  goog.ui.Control.superClass_.exitDocument.call(this);
  this.keyHandler_ && this.keyHandler_.detach();
  this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1)
};
goog.ui.Control.prototype.disposeInternal = function $goog$ui$Control$$disposeInternal$() {
  goog.ui.Control.superClass_.disposeInternal.call(this);
  this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
  delete this.renderer_;
  this.extraClassNames_ = this.content_ = null
};
goog.ui.Control.prototype.getContent = function $goog$ui$Control$$getContent$() {
  return this.content_
};
goog.ui.Control.prototype.setContent = function $goog$ui$Control$$setContent$($content$$) {
  this.renderer_.setContent(this.getElement(), $content$$);
  this.setContentInternal($content$$)
};
goog.ui.Control.prototype.setContentInternal = function $goog$ui$Control$$setContentInternal$($content$$) {
  this.content_ = $content$$
};
goog.ui.Control.prototype.getCaption = function $goog$ui$Control$$getCaption$() {
  var $caption_content$$ = this.getContent();
  if(!$caption_content$$) {
    return""
  }
  $caption_content$$ = goog.isString($caption_content$$) ? $caption_content$$ : goog.isArray($caption_content$$) ? goog.array.map($caption_content$$, goog.dom.getRawTextContent).join("") : goog.dom.getTextContent($caption_content$$);
  return goog.string.collapseBreakingSpaces($caption_content$$)
};
goog.ui.Control.prototype.setCaption = function $goog$ui$Control$$setCaption$($caption$$) {
  this.setContent($caption$$)
};
goog.ui.Control.prototype.setRightToLeft = function $goog$ui$Control$$setRightToLeft$($rightToLeft$$) {
  goog.ui.Control.superClass_.setRightToLeft.call(this, $rightToLeft$$);
  var $element$$ = this.getElement();
  $element$$ && this.renderer_.setRightToLeft($element$$, $rightToLeft$$)
};
goog.ui.Control.prototype.isAllowTextSelection = function $goog$ui$Control$$isAllowTextSelection$() {
  return this.allowTextSelection_
};
goog.ui.Control.prototype.setAllowTextSelection = function $goog$ui$Control$$setAllowTextSelection$($allow$$) {
  this.allowTextSelection_ = $allow$$;
  var $element$$ = this.getElement();
  $element$$ && this.renderer_.setAllowTextSelection($element$$, $allow$$)
};
goog.ui.Control.prototype.isVisible = function $goog$ui$Control$$isVisible$() {
  return this.visible_
};
goog.ui.Control.prototype.setVisible = function $goog$ui$Control$$setVisible$($visible$$, $opt_force$$) {
  if($opt_force$$ || this.visible_ != $visible$$ && this.dispatchEvent($visible$$ ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    var $element$$ = this.getElement();
    $element$$ && this.renderer_.setVisible($element$$, $visible$$);
    this.isEnabled() && this.renderer_.setFocusable(this, $visible$$);
    this.visible_ = $visible$$;
    return!0
  }
  return!1
};
goog.ui.Control.prototype.isEnabled = function $goog$ui$Control$$isEnabled$() {
  return!this.hasState(goog.ui.Component.State.DISABLED)
};
goog.ui.Control.prototype.isParentDisabled_ = function $goog$ui$Control$$isParentDisabled_$() {
  var $parent$$ = this.getParent();
  return!!$parent$$ && "function" == typeof $parent$$.isEnabled && !$parent$$.isEnabled()
};
goog.ui.Control.prototype.setEnabled = function $goog$ui$Control$$setEnabled$($enable$$) {
  !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !$enable$$) && ($enable$$ || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, $enable$$), this.setState(goog.ui.Component.State.DISABLED, !$enable$$))
};
goog.ui.Control.prototype.isHighlighted = function $goog$ui$Control$$isHighlighted$() {
  return this.hasState(goog.ui.Component.State.HOVER)
};
goog.ui.Control.prototype.setHighlighted = function $goog$ui$Control$$setHighlighted$($highlight$$) {
  this.isTransitionAllowed(goog.ui.Component.State.HOVER, $highlight$$) && this.setState(goog.ui.Component.State.HOVER, $highlight$$)
};
goog.ui.Control.prototype.isActive = function $goog$ui$Control$$isActive$() {
  return this.hasState(goog.ui.Component.State.ACTIVE)
};
goog.ui.Control.prototype.setActive = function $goog$ui$Control$$setActive$($active$$) {
  this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, $active$$) && this.setState(goog.ui.Component.State.ACTIVE, $active$$)
};
goog.ui.Control.prototype.isSelected = function $goog$ui$Control$$isSelected$() {
  return this.hasState(goog.ui.Component.State.SELECTED)
};
goog.ui.Control.prototype.setSelected = function $goog$ui$Control$$setSelected$($select$$) {
  this.isTransitionAllowed(goog.ui.Component.State.SELECTED, $select$$) && this.setState(goog.ui.Component.State.SELECTED, $select$$)
};
goog.ui.Control.prototype.isChecked = function $goog$ui$Control$$isChecked$() {
  return this.hasState(goog.ui.Component.State.CHECKED)
};
goog.ui.Control.prototype.setChecked = function $goog$ui$Control$$setChecked$($check$$) {
  this.isTransitionAllowed(goog.ui.Component.State.CHECKED, $check$$) && this.setState(goog.ui.Component.State.CHECKED, $check$$)
};
goog.ui.Control.prototype.isFocused = function $goog$ui$Control$$isFocused$() {
  return this.hasState(goog.ui.Component.State.FOCUSED)
};
goog.ui.Control.prototype.setFocused = function $goog$ui$Control$$setFocused$($focused$$) {
  this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, $focused$$) && this.setState(goog.ui.Component.State.FOCUSED, $focused$$)
};
goog.ui.Control.prototype.isOpen = function $goog$ui$Control$$isOpen$() {
  return this.hasState(goog.ui.Component.State.OPENED)
};
goog.ui.Control.prototype.setOpen = function $goog$ui$Control$$setOpen$($open$$) {
  this.isTransitionAllowed(goog.ui.Component.State.OPENED, $open$$) && this.setState(goog.ui.Component.State.OPENED, $open$$)
};
goog.ui.Control.prototype.getState = function $goog$ui$Control$$getState$() {
  return this.state_
};
goog.ui.Control.prototype.hasState = function $goog$ui$Control$$hasState$($state$$) {
  return!!(this.state_ & $state$$)
};
goog.ui.Control.prototype.setState = function $goog$ui$Control$$setState$($state$$, $enable$$) {
  this.isSupportedState($state$$) && $enable$$ != this.hasState($state$$) && (this.renderer_.setState(this, $state$$, $enable$$), this.state_ = $enable$$ ? this.state_ | $state$$ : this.state_ & ~$state$$)
};
goog.ui.Control.prototype.setStateInternal = function $goog$ui$Control$$setStateInternal$($state$$) {
  this.state_ = $state$$
};
goog.ui.Control.prototype.isSupportedState = function $goog$ui$Control$$isSupportedState$($state$$) {
  return!!(this.supportedStates_ & $state$$)
};
goog.ui.Control.prototype.setSupportedState = function $goog$ui$Control$$setSupportedState$($state$$, $support$$) {
  if(this.isInDocument() && this.hasState($state$$) && !$support$$) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  !$support$$ && this.hasState($state$$) && this.setState($state$$, !1);
  this.supportedStates_ = $support$$ ? this.supportedStates_ | $state$$ : this.supportedStates_ & ~$state$$
};
goog.ui.Control.prototype.isAutoState = function $goog$ui$Control$$isAutoState$($state$$) {
  return!!(this.autoStates_ & $state$$) && this.isSupportedState($state$$)
};
goog.ui.Control.prototype.setAutoStates = function $goog$ui$Control$$setAutoStates$($states$$, $enable$$) {
  this.autoStates_ = $enable$$ ? this.autoStates_ | $states$$ : this.autoStates_ & ~$states$$
};
goog.ui.Control.prototype.isDispatchTransitionEvents = function $goog$ui$Control$$isDispatchTransitionEvents$($state$$) {
  return!!(this.statesWithTransitionEvents_ & $state$$) && this.isSupportedState($state$$)
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function $goog$ui$Control$$setDispatchTransitionEvents$($states$$, $enable$$) {
  this.statesWithTransitionEvents_ = $enable$$ ? this.statesWithTransitionEvents_ | $states$$ : this.statesWithTransitionEvents_ & ~$states$$
};
goog.ui.Control.prototype.isTransitionAllowed = function $goog$ui$Control$$isTransitionAllowed$($state$$, $enable$$) {
  return this.isSupportedState($state$$) && this.hasState($state$$) != $enable$$ && (!(this.statesWithTransitionEvents_ & $state$$) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent($state$$, $enable$$))) && !this.isDisposed()
};
goog.ui.Control.prototype.handleMouseOver = function $goog$ui$Control$$handleMouseOver$($e$$) {
  !goog.ui.Control.isMouseEventWithinElement_($e$$, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0)
};
goog.ui.Control.prototype.handleMouseOut = function $goog$ui$Control$$handleMouseOut$($e$$) {
  !goog.ui.Control.isMouseEventWithinElement_($e$$, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1))
};
goog.ui.Control.prototype.handleContextMenu = goog.nullFunction;
goog.ui.Control.isMouseEventWithinElement_ = function $goog$ui$Control$isMouseEventWithinElement_$($e$$, $elem$$) {
  return!!$e$$.relatedTarget && goog.dom.contains($elem$$, $e$$.relatedTarget)
};
goog.ui.Control.prototype.handleMouseDown = function $goog$ui$Control$$handleMouseDown$($e$$) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), $e$$.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
  !this.isAllowTextSelection() && $e$$.isMouseActionButton() && $e$$.preventDefault()
};
goog.ui.Control.prototype.handleMouseUp = function $goog$ui$Control$$handleMouseUp$($e$$) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && this.performActionInternal($e$$) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1))
};
goog.ui.Control.prototype.handleDblClick = function $goog$ui$Control$$handleDblClick$($e$$) {
  this.isEnabled() && this.performActionInternal($e$$)
};
goog.ui.Control.prototype.performActionInternal = function $goog$ui$Control$$performActionInternal$($e$$) {
  this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
  this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0);
  this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
  var $actionEvent$$ = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
  $e$$ && ($actionEvent$$.altKey = $e$$.altKey, $actionEvent$$.ctrlKey = $e$$.ctrlKey, $actionEvent$$.metaKey = $e$$.metaKey, $actionEvent$$.shiftKey = $e$$.shiftKey, $actionEvent$$.platformModifierKey = $e$$.platformModifierKey);
  return this.dispatchEvent($actionEvent$$)
};
goog.ui.Control.prototype.handleFocus = function $goog$ui$Control$$handleFocus$($e$$) {
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0)
};
goog.ui.Control.prototype.handleBlur = function $goog$ui$Control$$handleBlur$($e$$) {
  this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1);
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1)
};
goog.ui.Control.prototype.handleKeyEvent = function $goog$ui$Control$$handleKeyEvent$($e$$) {
  return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal($e$$) ? ($e$$.preventDefault(), $e$$.stopPropagation(), !0) : !1
};
goog.ui.Control.prototype.handleKeyEventInternal = function $goog$ui$Control$$handleKeyEventInternal$($e$$) {
  return $e$$.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal($e$$)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
  return new goog.ui.Control(null)
});
goog.ui.Palette = function $goog$ui$Palette$($items$$, $opt_renderer$$, $opt_domHelper$$) {
  goog.ui.Control.call(this, $items$$, $opt_renderer$$ || goog.ui.PaletteRenderer.getInstance(), $opt_domHelper$$);
  this.setAutoStates(goog.ui.Component.State.CHECKED | goog.ui.Component.State.SELECTED | goog.ui.Component.State.OPENED, !1)
};
goog.inherits(goog.ui.Palette, goog.ui.Control);
goog.ui.Palette.EventType = {AFTER_HIGHLIGHT:goog.events.getUniqueId("afterhighlight")};
goog.ui.Palette.prototype.size_ = null;
goog.ui.Palette.prototype.highlightedIndex_ = -1;
goog.ui.Palette.prototype.selectionModel_ = null;
goog.ui.Palette.prototype.disposeInternal = function $goog$ui$Palette$$disposeInternal$() {
  goog.ui.Palette.superClass_.disposeInternal.call(this);
  this.selectionModel_ && (this.selectionModel_.dispose(), this.selectionModel_ = null);
  this.size_ = null
};
goog.ui.Palette.prototype.setContentInternal = function $goog$ui$Palette$$setContentInternal$($content$$) {
  goog.ui.Palette.superClass_.setContentInternal.call(this, $content$$);
  this.adjustSize_();
  this.selectionModel_ ? (this.selectionModel_.clear(), this.selectionModel_.addItems($content$$)) : (this.selectionModel_ = new goog.ui.SelectionModel($content$$), this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_, this)), this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange));
  this.highlightedIndex_ = -1
};
goog.ui.Palette.prototype.getCaption = function $goog$ui$Palette$$getCaption$() {
  return""
};
goog.ui.Palette.prototype.setCaption = function $goog$ui$Palette$$setCaption$($caption$$) {
};
goog.ui.Palette.prototype.handleMouseOver = function $goog$ui$Palette$$handleMouseOver$($e$$) {
  goog.ui.Palette.superClass_.handleMouseOver.call(this, $e$$);
  var $item$$ = this.getRenderer().getContainingItem(this, $e$$.target);
  $item$$ && $e$$.relatedTarget && goog.dom.contains($item$$, $e$$.relatedTarget) || $item$$ != this.getHighlightedItem() && this.setHighlightedItem($item$$)
};
goog.ui.Palette.prototype.handleMouseOut = function $goog$ui$Palette$$handleMouseOut$($e$$) {
  goog.ui.Palette.superClass_.handleMouseOut.call(this, $e$$);
  var $item$$ = this.getRenderer().getContainingItem(this, $e$$.target);
  $item$$ && $e$$.relatedTarget && goog.dom.contains($item$$, $e$$.relatedTarget) || $item$$ == this.getHighlightedItem() && this.getRenderer().highlightCell(this, $item$$, !1)
};
goog.ui.Palette.prototype.handleMouseDown = function $goog$ui$Palette$$handleMouseDown$($e$$95_item$$) {
  goog.ui.Palette.superClass_.handleMouseDown.call(this, $e$$95_item$$);
  this.isActive() && ($e$$95_item$$ = this.getRenderer().getContainingItem(this, $e$$95_item$$.target), $e$$95_item$$ != this.getHighlightedItem() && this.setHighlightedItem($e$$95_item$$))
};
goog.ui.Palette.prototype.performActionInternal = function $goog$ui$Palette$$performActionInternal$($e$$) {
  var $item$$ = this.getHighlightedItem();
  return $item$$ ? (this.setSelectedItem($item$$), goog.ui.Palette.superClass_.performActionInternal.call(this, $e$$)) : !1
};
goog.ui.Palette.prototype.handleKeyEvent = function $goog$ui$Palette$$handleKeyEvent$($e$$) {
  var $items$$ = this.getContent(), $items$$ = $items$$ ? $items$$.length : 0, $numColumns$$ = this.size_.width;
  if(0 == $items$$ || !this.isEnabled()) {
    return!1
  }
  if($e$$.keyCode == goog.events.KeyCodes.ENTER || $e$$.keyCode == goog.events.KeyCodes.SPACE) {
    return this.performActionInternal($e$$)
  }
  if($e$$.keyCode == goog.events.KeyCodes.HOME) {
    return this.setHighlightedIndex(0), !0
  }
  if($e$$.keyCode == goog.events.KeyCodes.END) {
    return this.setHighlightedIndex($items$$ - 1), !0
  }
  var $highlightedIndex$$ = 0 > this.highlightedIndex_ ? this.getSelectedIndex() : this.highlightedIndex_;
  switch($e$$.keyCode) {
    case goog.events.KeyCodes.LEFT:
      -1 == $highlightedIndex$$ && ($highlightedIndex$$ = $items$$);
      if(0 < $highlightedIndex$$) {
        return this.setHighlightedIndex($highlightedIndex$$ - 1), $e$$.preventDefault(), !0
      }
      break;
    case goog.events.KeyCodes.RIGHT:
      if($highlightedIndex$$ < $items$$ - 1) {
        return this.setHighlightedIndex($highlightedIndex$$ + 1), $e$$.preventDefault(), !0
      }
      break;
    case goog.events.KeyCodes.UP:
      -1 == $highlightedIndex$$ && ($highlightedIndex$$ = $items$$ + $numColumns$$ - 1);
      if($highlightedIndex$$ >= $numColumns$$) {
        return this.setHighlightedIndex($highlightedIndex$$ - $numColumns$$), $e$$.preventDefault(), !0
      }
      break;
    case goog.events.KeyCodes.DOWN:
      if(-1 == $highlightedIndex$$ && ($highlightedIndex$$ = -$numColumns$$), $highlightedIndex$$ < $items$$ - $numColumns$$) {
        return this.setHighlightedIndex($highlightedIndex$$ + $numColumns$$), $e$$.preventDefault(), !0
      }
  }
  return!1
};
goog.ui.Palette.prototype.handleSelectionChange = function $goog$ui$Palette$$handleSelectionChange$($e$$) {
};
goog.ui.Palette.prototype.getSize = function $goog$ui$Palette$$getSize$() {
  return this.size_
};
goog.ui.Palette.prototype.setSize = function $goog$ui$Palette$$setSize$($size$$, $opt_rows$$) {
  if(this.getElement()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.size_ = goog.isNumber($size$$) ? new goog.math.Size($size$$, $opt_rows$$) : $size$$;
  this.adjustSize_()
};
goog.ui.Palette.prototype.getHighlightedIndex = function $goog$ui$Palette$$getHighlightedIndex$() {
  return this.highlightedIndex_
};
goog.ui.Palette.prototype.getHighlightedItem = function $goog$ui$Palette$$getHighlightedItem$() {
  var $items$$ = this.getContent();
  return $items$$ && $items$$[this.highlightedIndex_]
};
goog.ui.Palette.prototype.setHighlightedIndex = function $goog$ui$Palette$$setHighlightedIndex$($index$$) {
  $index$$ != this.highlightedIndex_ && (this.highlightIndex_(this.highlightedIndex_, !1), this.highlightedIndex_ = $index$$, this.highlightIndex_($index$$, !0), this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))
};
goog.ui.Palette.prototype.setHighlightedItem = function $goog$ui$Palette$$setHighlightedItem$($item$$) {
  var $items$$ = this.getContent();
  this.setHighlightedIndex($items$$ ? goog.array.indexOf($items$$, $item$$) : -1)
};
goog.ui.Palette.prototype.getSelectedIndex = function $goog$ui$Palette$$getSelectedIndex$() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
};
goog.ui.Palette.prototype.getSelectedItem = function $goog$ui$Palette$$getSelectedItem$() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
};
goog.ui.Palette.prototype.setSelectedIndex = function $goog$ui$Palette$$setSelectedIndex$($index$$) {
  this.selectionModel_ && this.selectionModel_.setSelectedIndex($index$$)
};
goog.ui.Palette.prototype.setSelectedItem = function $goog$ui$Palette$$setSelectedItem$($item$$) {
  this.selectionModel_ && this.selectionModel_.setSelectedItem($item$$)
};
goog.ui.Palette.prototype.highlightIndex_ = function $goog$ui$Palette$$highlightIndex_$($index$$, $highlight$$) {
  if(this.getElement()) {
    var $items$$ = this.getContent();
    $items$$ && 0 <= $index$$ && $index$$ < $items$$.length && this.getRenderer().highlightCell(this, $items$$[$index$$], $highlight$$)
  }
};
goog.ui.Palette.prototype.selectItem_ = function $goog$ui$Palette$$selectItem_$($item$$, $select$$) {
  this.getElement() && this.getRenderer().selectCell(this, $item$$, $select$$)
};
goog.ui.Palette.prototype.adjustSize_ = function $goog$ui$Palette$$adjustSize_$() {
  var $items$$9_length$$ = this.getContent();
  if($items$$9_length$$) {
    if(this.size_ && this.size_.width) {
      if($items$$9_length$$ = Math.ceil($items$$9_length$$.length / this.size_.width), !goog.isNumber(this.size_.height) || this.size_.height < $items$$9_length$$) {
        this.size_.height = $items$$9_length$$
      }
    }else {
      $items$$9_length$$ = Math.ceil(Math.sqrt($items$$9_length$$.length)), this.size_ = new goog.math.Size($items$$9_length$$, $items$$9_length$$)
    }
  }else {
    this.size_ = new goog.math.Size(0, 0)
  }
};
goog.ui.ColorPalette = function $goog$ui$ColorPalette$($opt_colors$$, $opt_renderer$$, $opt_domHelper$$) {
  this.colors_ = $opt_colors$$ || [];
  goog.ui.Palette.call(this, null, $opt_renderer$$ || goog.ui.PaletteRenderer.getInstance(), $opt_domHelper$$);
  this.setColors(this.colors_)
};
goog.inherits(goog.ui.ColorPalette, goog.ui.Palette);
goog.ui.ColorPalette.prototype.normalizedColors_ = null;
goog.ui.ColorPalette.prototype.getColors = function $goog$ui$ColorPalette$$getColors$() {
  return this.colors_
};
goog.ui.ColorPalette.prototype.setColors = function $goog$ui$ColorPalette$$setColors$($colors$$) {
  this.colors_ = $colors$$;
  this.normalizedColors_ = null;
  this.setContent(this.createColorNodes())
};
goog.ui.ColorPalette.prototype.getSelectedColor = function $goog$ui$ColorPalette$$getSelectedColor$() {
  var $color$$ = this.getSelectedItem();
  return $color$$ ? ($color$$ = goog.style.getStyle($color$$, "background-color"), goog.ui.ColorPalette.parseColor_($color$$)) : null
};
goog.ui.ColorPalette.prototype.setSelectedColor = function $goog$ui$ColorPalette$$setSelectedColor$($color$$3_hexColor$$) {
  $color$$3_hexColor$$ = goog.ui.ColorPalette.parseColor_($color$$3_hexColor$$);
  this.normalizedColors_ || (this.normalizedColors_ = goog.array.map(this.colors_, function($color$$) {
    return goog.ui.ColorPalette.parseColor_($color$$)
  }));
  this.setSelectedIndex($color$$3_hexColor$$ ? goog.array.indexOf(this.normalizedColors_, $color$$3_hexColor$$) : -1)
};
goog.ui.ColorPalette.prototype.createColorNodes = function $goog$ui$ColorPalette$$createColorNodes$() {
  return goog.array.map(this.colors_, function($color$$) {
    var $swatch$$ = this.getDomHelper().createDom("div", {"class":this.getRenderer().getCssClass() + "-colorswatch", style:"background-color:" + $color$$});
    $swatch$$.title = "#" == $color$$.charAt(0) ? "RGB (" + goog.color.hexToRgb($color$$).join(", ") + ")" : $color$$;
    return $swatch$$
  }, this)
};
goog.ui.ColorPalette.parseColor_ = function $goog$ui$ColorPalette$parseColor_$($color$$) {
  if($color$$) {
    try {
      return goog.color.parse($color$$).hex
    }catch($ex$$) {
    }
  }
  return null
};
goog.ui.ColorPicker = function $goog$ui$ColorPicker$($opt_domHelper$$, $opt_colorPalette$$) {
  goog.ui.Component.call(this, $opt_domHelper$$);
  this.colorPalette_ = $opt_colorPalette$$ || null;
  this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onColorPaletteAction_)
};
goog.inherits(goog.ui.ColorPicker, goog.ui.Component);
goog.ui.ColorPicker.DEFAULT_NUM_COLS = 5;
goog.ui.ColorPicker.EventType = {CHANGE:"change"};
goog.ui.ColorPicker.prototype.focusable_ = !0;
goog.ui.ColorPicker.prototype.getColors = function $goog$ui$ColorPicker$$getColors$() {
  return this.colorPalette_ ? this.colorPalette_.getColors() : null
};
goog.ui.ColorPicker.prototype.setColors = function $goog$ui$ColorPicker$$setColors$($colors$$) {
  this.colorPalette_ ? this.colorPalette_.setColors($colors$$) : this.createColorPalette_($colors$$)
};
goog.ui.ColorPicker.prototype.addColors = function $goog$ui$ColorPicker$$addColors$($colors$$) {
  this.setColors($colors$$)
};
goog.ui.ColorPicker.prototype.setSize = function $goog$ui$ColorPicker$$setSize$($size$$) {
  this.colorPalette_ || this.createColorPalette_([]);
  this.colorPalette_.setSize($size$$)
};
goog.ui.ColorPicker.prototype.getSize = function $goog$ui$ColorPicker$$getSize$() {
  return this.colorPalette_ ? this.colorPalette_.getSize() : null
};
goog.ui.ColorPicker.prototype.setColumnCount = function $goog$ui$ColorPicker$$setColumnCount$($n$$) {
  this.setSize($n$$)
};
goog.ui.ColorPicker.prototype.getSelectedIndex = function $goog$ui$ColorPicker$$getSelectedIndex$() {
  return this.colorPalette_ ? this.colorPalette_.getSelectedIndex() : -1
};
goog.ui.ColorPicker.prototype.setSelectedIndex = function $goog$ui$ColorPicker$$setSelectedIndex$($ind$$) {
  this.colorPalette_ && this.colorPalette_.setSelectedIndex($ind$$)
};
goog.ui.ColorPicker.prototype.getSelectedColor = function $goog$ui$ColorPicker$$getSelectedColor$() {
  return this.colorPalette_ ? this.colorPalette_.getSelectedColor() : null
};
goog.ui.ColorPicker.prototype.setSelectedColor = function $goog$ui$ColorPicker$$setSelectedColor$($color$$) {
  this.colorPalette_ && this.colorPalette_.setSelectedColor($color$$)
};
goog.ui.ColorPicker.prototype.isFocusable = function $goog$ui$ColorPicker$$isFocusable$() {
  return this.focusable_
};
goog.ui.ColorPicker.prototype.setFocusable = function $goog$ui$ColorPicker$$setFocusable$($focusable$$) {
  this.focusable_ = $focusable$$;
  this.colorPalette_ && this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED, $focusable$$)
};
goog.ui.ColorPicker.prototype.canDecorate = function $goog$ui$ColorPicker$$canDecorate$($element$$) {
  return!1
};
goog.ui.ColorPicker.prototype.enterDocument = function $goog$ui$ColorPicker$$enterDocument$() {
  goog.ui.ColorPicker.superClass_.enterDocument.call(this);
  this.colorPalette_ && this.colorPalette_.render(this.getElement());
  this.getElement().unselectable = "on"
};
goog.ui.ColorPicker.prototype.disposeInternal = function $goog$ui$ColorPicker$$disposeInternal$() {
  goog.ui.ColorPicker.superClass_.disposeInternal.call(this);
  this.colorPalette_ && (this.colorPalette_.dispose(), this.colorPalette_ = null)
};
goog.ui.ColorPicker.prototype.focus = function $goog$ui$ColorPicker$$focus$() {
  this.colorPalette_ && this.colorPalette_.getElement().focus()
};
goog.ui.ColorPicker.prototype.onColorPaletteAction_ = function $goog$ui$ColorPicker$$onColorPaletteAction_$($e$$) {
  $e$$.stopPropagation();
  this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)
};
goog.ui.ColorPicker.prototype.createColorPalette_ = function $goog$ui$ColorPicker$$createColorPalette_$($colors$$) {
  $colors$$ = new goog.ui.ColorPalette($colors$$, null, this.getDomHelper());
  $colors$$.setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS);
  $colors$$.setSupportedState(goog.ui.Component.State.FOCUSED, this.focusable_);
  this.addChild($colors$$);
  this.colorPalette_ = $colors$$;
  this.isInDocument() && this.colorPalette_.render(this.getElement())
};
goog.ui.ColorPicker.createSimpleColorGrid = function $goog$ui$ColorPicker$createSimpleColorGrid$($cp$$1_opt_domHelper$$) {
  $cp$$1_opt_domHelper$$ = new goog.ui.ColorPicker($cp$$1_opt_domHelper$$);
  $cp$$1_opt_domHelper$$.setSize(7);
  $cp$$1_opt_domHelper$$.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
  return $cp$$1_opt_domHelper$$
};
goog.ui.ColorPicker.SIMPLE_GRID_COLORS = "#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");
Blockly.utils = {};
Blockly.addClass_ = function $Blockly$addClass_$($element$$, $className$$) {
  var $classes$$ = $element$$.getAttribute("class") || "";
  -1 == (" " + $classes$$ + " ").indexOf(" " + $className$$ + " ") && ($classes$$ && ($classes$$ += " "), $element$$.setAttribute("class", $classes$$ + $className$$))
};
Blockly.removeClass_ = function $Blockly$removeClass_$($element$$, $className$$) {
  var $classList_classes$$ = $element$$.getAttribute("class");
  if(-1 != (" " + $classList_classes$$ + " ").indexOf(" " + $className$$ + " ")) {
    for(var $classList_classes$$ = $classList_classes$$.split(/\s+/), $i$$ = 0;$i$$ < $classList_classes$$.length;$i$$++) {
      $classList_classes$$[$i$$] && $classList_classes$$[$i$$] != $className$$ || ($classList_classes$$.splice($i$$, 1), $i$$--)
    }
    $classList_classes$$.length ? $element$$.setAttribute("class", $classList_classes$$.join(" ")) : $element$$.removeAttribute("class")
  }
};
Blockly.bindEvent_ = function $Blockly$bindEvent_$($element$$, $name$$, $thisObject$$, $func$$) {
  var $bindData$$ = [], $wrapFunc$$;
  if(!$element$$.addEventListener) {
    throw"Element is not a DOM node with addEventListener.";
  }
  $wrapFunc$$ = function $$wrapFunc$$$($e$$) {
    $func$$.apply($thisObject$$, arguments)
  };
  $element$$.addEventListener($name$$, $wrapFunc$$, !1);
  $bindData$$.push([$element$$, $name$$, $wrapFunc$$]);
  $name$$ in Blockly.bindEvent_.TOUCH_MAP && ($wrapFunc$$ = function $$wrapFunc$$$($e$$) {
    if(1 == $e$$.changedTouches.length) {
      var $touchPoint$$ = $e$$.changedTouches[0];
      $e$$.clientX = $touchPoint$$.clientX;
      $e$$.clientY = $touchPoint$$.clientY
    }
    $func$$.apply($thisObject$$, arguments);
    $e$$.preventDefault()
  }, $element$$.addEventListener(Blockly.bindEvent_.TOUCH_MAP[$name$$], $wrapFunc$$, !1), $bindData$$.push([$element$$, Blockly.bindEvent_.TOUCH_MAP[$name$$], $wrapFunc$$]));
  return $bindData$$
};
Blockly.bindEvent_.TOUCH_MAP = {};
Blockly.bindEvent_.TOUCH_MAP = "ontouchstart" in document.documentElement ? {mousedown:"touchstart", mousemove:"touchmove", mouseup:"touchend"} : {};
Blockly.unbindEvent_ = function $Blockly$unbindEvent_$($bindData$$) {
  for(;$bindData$$.length;) {
    var $bindDatum$$ = $bindData$$.pop(), $func$$ = $bindDatum$$[2];
    $bindDatum$$[0].removeEventListener($bindDatum$$[1], $func$$, !1)
  }
  return $func$$
};
Blockly.fireUiEvent = function $Blockly$fireUiEvent$($element$$, $eventName$$) {
  var $doc$$35_evt$$ = document;
  if($doc$$35_evt$$.createEvent) {
    $doc$$35_evt$$ = $doc$$35_evt$$.createEvent("UIEvents"), $doc$$35_evt$$.initEvent($eventName$$, !0, !0), $element$$.dispatchEvent($doc$$35_evt$$)
  }else {
    if($doc$$35_evt$$.createEventObject) {
      $doc$$35_evt$$ = $doc$$35_evt$$.createEventObject(), $element$$.fireEvent("on" + $eventName$$, $doc$$35_evt$$)
    }else {
      throw"FireEvent: No event creation mechanism.";
    }
  }
};
Blockly.noEvent = function $Blockly$noEvent$($e$$) {
  $e$$.preventDefault();
  $e$$.stopPropagation()
};
Blockly.getRelativeXY_ = function $Blockly$getRelativeXY_$($element$$123_r$$9_transform$$) {
  var $xy$$ = {x:0, y:0}, $x$$132_y$$ = $element$$123_r$$9_transform$$.getAttribute("x");
  $x$$132_y$$ && ($xy$$.x = parseInt($x$$132_y$$, 10));
  if($x$$132_y$$ = $element$$123_r$$9_transform$$.getAttribute("y")) {
    $xy$$.y = parseInt($x$$132_y$$, 10)
  }
  if($element$$123_r$$9_transform$$ = ($element$$123_r$$9_transform$$ = $element$$123_r$$9_transform$$.getAttribute("transform")) && $element$$123_r$$9_transform$$.match(/translate\(\s*([-\d.]+)([ ,]\s*([-\d.]+)\s*\))?/)) {
    $xy$$.x += parseInt($element$$123_r$$9_transform$$[1], 10), $element$$123_r$$9_transform$$[3] && ($xy$$.y += parseInt($element$$123_r$$9_transform$$[3], 10))
  }
  return $xy$$
};
Blockly.getSvgXY_ = function $Blockly$getSvgXY_$($element$$) {
  var $x$$ = 0, $y$$ = 0;
  do {
    var $xy$$ = Blockly.getRelativeXY_($element$$), $x$$ = $x$$ + $xy$$.x, $y$$ = $y$$ + $xy$$.y;
    $element$$ = $element$$.parentNode
  }while($element$$ && $element$$ != Blockly.svg);
  return{x:$x$$, y:$y$$}
};
Blockly.getAbsoluteXY_ = function $Blockly$getAbsoluteXY_$($element$$125_xy$$) {
  $element$$125_xy$$ = Blockly.getSvgXY_($element$$125_xy$$);
  return Blockly.convertCoordinates($element$$125_xy$$.x, $element$$125_xy$$.y, !1)
};
Blockly.createSvgElement = function $Blockly$createSvgElement$($e$$103_name$$, $attrs$$, $opt_parent$$) {
  $e$$103_name$$ = document.createElementNS(Blockly.SVG_NS, $e$$103_name$$);
  for(var $key$$ in $attrs$$) {
    $e$$103_name$$.setAttribute($key$$, $attrs$$[$key$$])
  }
  document.body.runtimeStyle && ($e$$103_name$$.runtimeStyle = $e$$103_name$$.currentStyle = $e$$103_name$$.style);
  $opt_parent$$ && $opt_parent$$.appendChild($e$$103_name$$);
  return $e$$103_name$$
};
Blockly.isRightButton = function $Blockly$isRightButton$($e$$) {
  return 2 == $e$$.button || $e$$.ctrlKey
};
Blockly.convertCoordinates = function $Blockly$convertCoordinates$($matrix_x$$, $y$$, $toSvg$$) {
  $toSvg$$ && ($matrix_x$$ -= window.pageXOffset, $y$$ -= window.pageYOffset);
  var $svgPoint_xy$$ = Blockly.svg.createSVGPoint();
  $svgPoint_xy$$.x = $matrix_x$$;
  $svgPoint_xy$$.y = $y$$;
  $matrix_x$$ = Blockly.svg.getScreenCTM();
  $toSvg$$ && ($matrix_x$$ = $matrix_x$$.inverse());
  $svgPoint_xy$$ = $svgPoint_xy$$.matrixTransform($matrix_x$$);
  $toSvg$$ || ($svgPoint_xy$$.x += window.pageXOffset, $svgPoint_xy$$.y += window.pageYOffset);
  return $svgPoint_xy$$
};
Blockly.mouseToSvg = function $Blockly$mouseToSvg$($e$$) {
  return Blockly.convertCoordinates($e$$.clientX + window.pageXOffset, $e$$.clientY + window.pageYOffset, !0)
};
Blockly.shortestStringLength = function $Blockly$shortestStringLength$($array$$) {
  if(!$array$$.length) {
    return 0
  }
  for(var $len$$ = $array$$[0].length, $i$$ = 1;$i$$ < $array$$.length;$i$$++) {
    $len$$ = Math.min($len$$, $array$$[$i$$].length)
  }
  return $len$$
};
Blockly.commonWordPrefix = function $Blockly$commonWordPrefix$($array$$, $opt_shortest$$) {
  if(!$array$$.length) {
    return 0
  }
  if(1 == $array$$.length) {
    return $array$$[0].length
  }
  for(var $wordPrefix$$ = 0, $max$$ = $opt_shortest$$ || Blockly.shortestStringLength($array$$), $len$$ = 0;$len$$ < $max$$;$len$$++) {
    for(var $letter$$ = $array$$[0][$len$$], $i$$ = 1;$i$$ < $array$$.length;$i$$++) {
      if($letter$$ != $array$$[$i$$][$len$$]) {
        return $wordPrefix$$
      }
    }
    " " == $letter$$ && ($wordPrefix$$ = $len$$ + 1)
  }
  for($i$$ = 1;$i$$ < $array$$.length;$i$$++) {
    if(($letter$$ = $array$$[$i$$][$len$$]) && " " != $letter$$) {
      return $wordPrefix$$
    }
  }
  return $max$$
};
Blockly.commonWordSuffix = function $Blockly$commonWordSuffix$($array$$, $opt_shortest$$) {
  if(!$array$$.length) {
    return 0
  }
  if(1 == $array$$.length) {
    return $array$$[0].length
  }
  for(var $wordPrefix$$ = 0, $max$$ = $opt_shortest$$ || Blockly.shortestStringLength($array$$), $len$$ = 0;$len$$ < $max$$;$len$$++) {
    for(var $letter$$ = $array$$[0].substr(-$len$$ - 1, 1), $i$$ = 1;$i$$ < $array$$.length;$i$$++) {
      if($letter$$ != $array$$[$i$$].substr(-$len$$ - 1, 1)) {
        return $wordPrefix$$
      }
    }
    " " == $letter$$ && ($wordPrefix$$ = $len$$ + 1)
  }
  for($i$$ = 1;$i$$ < $array$$.length;$i$$++) {
    if(($letter$$ = $array$$[$i$$].charAt($array$$[$i$$].length - $len$$ - 1)) && " " != $letter$$) {
      return $wordPrefix$$
    }
  }
  return $max$$
};
Blockly.isNumber = function $Blockly$isNumber$($str$$) {
  return!!$str$$.match(/^\s*-?\d+(\.\d+)?\s*$/)
};
Blockly.isMsie = function $Blockly$isMsie$() {
  return 0 <= navigator.userAgent.indexOf("MSIE")
};
Blockly.isTrident = function $Blockly$isTrident$() {
  return 0 <= navigator.userAgent.indexOf("Trident")
};
Blockly.FieldColour = function $Blockly$FieldColour$($colour$$, $opt_changeHandler$$) {
  Blockly.FieldColour.superClass_.constructor.call(this, "\u00a0\u00a0\u00a0");
  this.changeHandler_ = $opt_changeHandler$$;
  this.borderRect_.style.fillOpacity = 1;
  this.setValue($colour$$)
};
goog.inherits(Blockly.FieldColour, Blockly.Field);
Blockly.FieldColour.prototype.CURSOR = "default";
Blockly.FieldColour.prototype.dispose = function $Blockly$FieldColour$$dispose$() {
  Blockly.WidgetDiv.hideIfField(this);
  Blockly.FieldColour.superClass_.dispose.call(this)
};
Blockly.FieldColour.prototype.getValue = function $Blockly$FieldColour$$getValue$() {
  return this.colour_
};
Blockly.FieldColour.prototype.setValue = function $Blockly$FieldColour$$setValue$($colour$$) {
  this.colour_ = $colour$$;
  this.borderRect_.style.fill = $colour$$;
  this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_.workspace.fireChangeEvent()
};
Blockly.FieldColour.COLOURS = goog.ui.ColorPicker.SIMPLE_GRID_COLORS;
Blockly.FieldColour.COLUMNS = 7;
Blockly.FieldColour.prototype.showEditor_ = function $Blockly$FieldColour$$showEditor_$() {
  Blockly.WidgetDiv.show(this, Blockly.FieldColour.dispose_);
  var $div$$ = Blockly.WidgetDiv.DIV, $picker$$ = new goog.ui.ColorPicker;
  $picker$$.setSize(Blockly.FieldColour.COLUMNS);
  $picker$$.setColors(Blockly.FieldColour.COLOURS);
  $picker$$.render($div$$);
  $picker$$.setSelectedColor(this.getValue());
  var $xy$$ = Blockly.getAbsoluteXY_(this.borderRect_);
  if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
    this.borderRect_.style.display = "inline";
    var $borderBBox$$ = {x:this.borderRect_.getBBox().x, y:this.borderRect_.getBBox().y, width:this.borderRect_.scrollWidth, height:this.borderRect_.scrollHeight}
  }else {
    $borderBBox$$ = this.borderRect_.getBBox()
  }
  Blockly.RTL && ($xy$$.x += $borderBBox$$.width);
  $xy$$.y += $borderBBox$$.height - 1;
  Blockly.RTL && ($xy$$.x -= $div$$.offsetWidth);
  $div$$.style.left = $xy$$.x + "px";
  $div$$.style.top = $xy$$.y + "px";
  var $thisObj$$ = this;
  Blockly.FieldColour.changeEventKey_ = goog.events.listen($picker$$, goog.ui.ColorPicker.EventType.CHANGE, function($colour$$2_event$$) {
    $colour$$2_event$$ = $colour$$2_event$$.target.getSelectedColor() || "#000000";
    Blockly.WidgetDiv.hide();
    if($thisObj$$.changeHandler_) {
      var $override$$ = $thisObj$$.changeHandler_($colour$$2_event$$);
      void 0 !== $override$$ && ($colour$$2_event$$ = $override$$)
    }
    null !== $colour$$2_event$$ && $thisObj$$.setValue($colour$$2_event$$)
  })
};
Blockly.FieldColour.dispose_ = function $Blockly$FieldColour$dispose_$() {
  Blockly.FieldColour.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_)
};
Blockly.FieldTextInput = function $Blockly$FieldTextInput$($text$$, $opt_changeHandler$$) {
  Blockly.FieldTextInput.superClass_.constructor.call(this, $text$$);
  this.changeHandler_ = $opt_changeHandler$$
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);
Blockly.FieldTextInput.prototype.CURSOR = "text";
Blockly.FieldTextInput.prototype.dispose = function $Blockly$FieldTextInput$$dispose$() {
  Blockly.WidgetDiv.hideIfField(this);
  Blockly.FieldTextInput.superClass_.dispose.call(this)
};
Blockly.FieldTextInput.prototype.setText = function $Blockly$FieldTextInput$$setText$($text$$) {
  if(null !== $text$$) {
    if(this.changeHandler_) {
      var $validated$$ = this.changeHandler_($text$$);
      null !== $validated$$ && void 0 !== $validated$$ && ($text$$ = $validated$$)
    }
    Blockly.Field.prototype.setText.call(this, $text$$)
  }
};
Blockly.FieldTextInput.prototype.showEditor_ = function $Blockly$FieldTextInput$$showEditor_$() {
  if(goog.userAgent.MOBILE) {
    var $htmlInput_newValue$$ = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_);
    if(this.changeHandler_) {
      var $div$$3_override$$ = this.changeHandler_($htmlInput_newValue$$);
      void 0 !== $div$$3_override$$ && ($htmlInput_newValue$$ = $div$$3_override$$)
    }
    null !== $htmlInput_newValue$$ && this.setText($htmlInput_newValue$$)
  }else {
    Blockly.WidgetDiv.show(this, this.dispose_()), $div$$3_override$$ = Blockly.WidgetDiv.DIV, $htmlInput_newValue$$ = goog.dom.createDom("input", "blocklyHtmlInput"), Blockly.FieldTextInput.htmlInput_ = $htmlInput_newValue$$, $div$$3_override$$.appendChild($htmlInput_newValue$$), $htmlInput_newValue$$.value = $htmlInput_newValue$$.defaultValue = this.text_, $htmlInput_newValue$$.oldValue_ = null, this.validate_(), this.resizeEditor_(), $htmlInput_newValue$$.focus(), $htmlInput_newValue$$.select(), 
    $htmlInput_newValue$$.onKeyUpWrapper_ = Blockly.bindEvent_($htmlInput_newValue$$, "keyup", this, this.onHtmlInputChange_), $htmlInput_newValue$$.onKeyPressWrapper_ = Blockly.bindEvent_($htmlInput_newValue$$, "keypress", this, this.onHtmlInputChange_), $div$$3_override$$ = this.sourceBlock_.workspace.getCanvas(), $htmlInput_newValue$$.onWorkspaceChangeWrapper_ = Blockly.bindEvent_($div$$3_override$$, "blocklyWorkspaceChange", this, this.resizeEditor_)
  }
};
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function $Blockly$FieldTextInput$$onHtmlInputChange_$($e$$106_text$$) {
  var $htmlInput$$ = Blockly.FieldTextInput.htmlInput_;
  13 == $e$$106_text$$.keyCode ? Blockly.WidgetDiv.hide() : 27 == $e$$106_text$$.keyCode ? (this.setText($htmlInput$$.defaultValue), Blockly.WidgetDiv.hide()) : ($e$$106_text$$ = $htmlInput$$.value, $e$$106_text$$ !== $htmlInput$$.oldValue_ ? ($htmlInput$$.oldValue_ = $e$$106_text$$, this.setText($e$$106_text$$), this.validate_()) : goog.userAgent.WEBKIT && this.sourceBlock_.render())
};
Blockly.FieldTextInput.prototype.validate_ = function $Blockly$FieldTextInput$$validate_$() {
  var $valid$$ = !0;
  goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
  var $htmlInput$$ = Blockly.FieldTextInput.htmlInput_;
  this.changeHandler_ && ($valid$$ = this.changeHandler_($htmlInput$$.value));
  null === $valid$$ ? Blockly.addClass_($htmlInput$$, "blocklyInvalidInput") : Blockly.removeClass_($htmlInput$$, "blocklyInvalidInput")
};
Blockly.FieldTextInput.prototype.resizeEditor_ = function $Blockly$FieldTextInput$$resizeEditor_$() {
  var $div$$ = Blockly.WidgetDiv.DIV;
  if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
    this.fieldGroup_.style.display = "inline";
    var $bBox$$7_xy$$ = {x:this.fieldGroup_.getBBox().x, y:this.fieldGroup_.getBBox().y, width:this.fieldGroup_.scrollWidth, height:this.fieldGroup_.scrollHeight}
  }else {
    $bBox$$7_xy$$ = this.fieldGroup_.getBBox()
  }
  $div$$.style.width = $bBox$$7_xy$$.width + "px";
  $bBox$$7_xy$$ = Blockly.getAbsoluteXY_(this.borderRect_);
  if(Blockly.RTL) {
    if(0 <= navigator.userAgent.indexOf("MSIE") || 0 <= navigator.userAgent.indexOf("Trident")) {
      this.borderRect_.style.display = "inline";
      var $borderBBox$$ = {x:this.borderRect_.getBBox().x, y:this.borderRect_.getBBox().y, width:this.borderRect_.scrollWidth, height:this.borderRect_.scrollHeight}
    }else {
      $borderBBox$$ = this.borderRect_.getBBox()
    }
    $bBox$$7_xy$$.x += $borderBBox$$.width;
    $bBox$$7_xy$$.x -= $div$$.offsetWidth
  }
  $bBox$$7_xy$$.y += 1;
  goog.userAgent.WEBKIT && ($bBox$$7_xy$$.y -= 3);
  $div$$.style.left = $bBox$$7_xy$$.x + "px";
  $div$$.style.top = $bBox$$7_xy$$.y + "px"
};
Blockly.FieldTextInput.prototype.dispose_ = function $Blockly$FieldTextInput$$dispose_$() {
  var $thisField$$ = this;
  return function() {
    var $htmlInput$$ = Blockly.FieldTextInput.htmlInput_, $text$$;
    $text$$ = $htmlInput$$.value;
    $thisField$$.changeHandler_ && ($text$$ = $thisField$$.changeHandler_($text$$), null === $text$$ && ($text$$ = $htmlInput$$.defaultValue));
    $thisField$$.setText($text$$);
    $thisField$$.sourceBlock_.render();
    Blockly.unbindEvent_($htmlInput$$.onKeyUpWrapper_);
    Blockly.unbindEvent_($htmlInput$$.onKeyPressWrapper_);
    Blockly.unbindEvent_($htmlInput$$.onWorkspaceChangeWrapper_);
    Blockly.FieldTextInput.htmlInput_ = null
  }
};
Blockly.FieldTextInput.numberValidator = function $Blockly$FieldTextInput$numberValidator$($n$$6_text$$) {
  $n$$6_text$$ = $n$$6_text$$.replace(/O/ig, "0");
  $n$$6_text$$ = $n$$6_text$$.replace(/,/g, "");
  $n$$6_text$$ = parseFloat($n$$6_text$$ || 0);
  return isNaN($n$$6_text$$) ? null : String($n$$6_text$$)
};
Blockly.FieldTextInput.nonnegativeIntegerValidator = function $Blockly$FieldTextInput$nonnegativeIntegerValidator$($n$$7_text$$) {
  ($n$$7_text$$ = Blockly.FieldTextInput.numberValidator($n$$7_text$$)) && ($n$$7_text$$ = String(Math.max(0, Math.floor($n$$7_text$$))));
  return $n$$7_text$$
};
Blockly.Generator = {};
Blockly.Generator.NAME_TYPE = "generated_function";
Blockly.Generator.languages = {};
Blockly.Generator.get = function $Blockly$Generator$get$($name$$) {
  if(!($name$$ in Blockly.Generator.languages)) {
    var $generator$$ = new Blockly.CodeGenerator($name$$);
    Blockly.Generator.languages[$name$$] = $generator$$
  }
  return Blockly.Generator.languages[$name$$]
};
Blockly.Generator.workspaceToCode = function $Blockly$Generator$workspaceToCode$($generator$$1_name$$) {
  var $code$$ = [];
  $generator$$1_name$$ = Blockly.Generator.get($generator$$1_name$$);
  $generator$$1_name$$.init();
  for(var $blocks$$ = Blockly.mainWorkspace.getTopBlocks(!0), $x$$ = 0, $block$$;$block$$ = $blocks$$[$x$$];$x$$++) {
    var $line$$ = $generator$$1_name$$.blockToCode($block$$);
    $line$$ instanceof Array && ($line$$ = $line$$[0]);
    $line$$ && ($block$$.outputConnection && $generator$$1_name$$.scrubNakedValue && ($line$$ = $generator$$1_name$$.scrubNakedValue($line$$)), $code$$.push($line$$))
  }
  $code$$ = $code$$.join("\n");
  $code$$ = $generator$$1_name$$.finish($code$$);
  $code$$ = $code$$.replace(/^\s+\n/, "");
  $code$$ = $code$$.replace(/\n\s+$/, "\n");
  return $code$$ = $code$$.replace(/[ \t]+\n/g, "\n")
};
Blockly.Generator.prefixLines = function $Blockly$Generator$prefixLines$($text$$, $prefix$$) {
  return $prefix$$ + $text$$.replace(/\n(.)/g, "\n" + $prefix$$ + "$1")
};
Blockly.Generator.allNestedComments = function $Blockly$Generator$allNestedComments$($block$$39_blocks$$) {
  var $comments$$ = [];
  $block$$39_blocks$$ = $block$$39_blocks$$.getDescendants();
  for(var $x$$ = 0;$x$$ < $block$$39_blocks$$.length;$x$$++) {
    var $comment$$ = $block$$39_blocks$$[$x$$].getCommentText();
    $comment$$ && $comments$$.push($comment$$)
  }
  $comments$$.length && $comments$$.push("");
  return $comments$$.join("\n")
};
Blockly.CodeGenerator = function $Blockly$CodeGenerator$($name$$) {
  this.name_ = $name$$;
  this.RESERVED_WORDS_ = ""
};
Blockly.CodeGenerator.prototype.blockToCode = function $Blockly$CodeGenerator$$blockToCode$($block$$40_nextBlock$$) {
  if(!$block$$40_nextBlock$$) {
    return""
  }
  if($block$$40_nextBlock$$.disabled) {
    return $block$$40_nextBlock$$ = $block$$40_nextBlock$$.nextConnection && $block$$40_nextBlock$$.nextConnection.targetBlock(), this.blockToCode($block$$40_nextBlock$$)
  }
  var $code$$3_func$$ = this[$block$$40_nextBlock$$.type];
  if(!$code$$3_func$$) {
    throw'Language "' + this.name_ + '" does not know how to generate code for block type "' + $block$$40_nextBlock$$.type + '".';
  }
  $code$$3_func$$ = $code$$3_func$$.call($block$$40_nextBlock$$);
  return $code$$3_func$$ instanceof Array ? [this.scrub_($block$$40_nextBlock$$, $code$$3_func$$[0]), $code$$3_func$$[1]] : this.scrub_($block$$40_nextBlock$$, $code$$3_func$$)
};
Blockly.CodeGenerator.prototype.valueToCode = function $Blockly$CodeGenerator$$valueToCode$($block$$, $code$$4_name$$, $order$$) {
  if(isNaN($order$$)) {
    throw'Expecting valid order from block "' + $block$$.type + '".';
  }
  $block$$ = $block$$.getInputTargetBlock($code$$4_name$$);
  if(!$block$$) {
    return""
  }
  var $innerOrder_tuple$$ = this.blockToCode($block$$);
  if("" === $innerOrder_tuple$$) {
    return""
  }
  if(!($innerOrder_tuple$$ instanceof Array)) {
    throw'Expecting tuple from value block "' + $block$$.type + '".';
  }
  $code$$4_name$$ = $innerOrder_tuple$$[0];
  $innerOrder_tuple$$ = $innerOrder_tuple$$[1];
  if(isNaN($innerOrder_tuple$$)) {
    throw'Expecting valid order from value block "' + $block$$.type + '".';
  }
  $code$$4_name$$ && $order$$ <= $innerOrder_tuple$$ && ($code$$4_name$$ = "(" + $code$$4_name$$ + ")");
  return $code$$4_name$$
};
Blockly.CodeGenerator.prototype.statementToCode = function $Blockly$CodeGenerator$$statementToCode$($block$$, $name$$) {
  var $targetBlock$$ = $block$$.getInputTargetBlock($name$$), $code$$ = this.blockToCode($targetBlock$$);
  if(!goog.isString($code$$)) {
    throw'Expecting code from statement block "' + $targetBlock$$.type + '".';
  }
  $code$$ && ($code$$ = Blockly.Generator.prefixLines($code$$, "  "));
  return $code$$
};
Blockly.CodeGenerator.prototype.addReservedWords = function $Blockly$CodeGenerator$$addReservedWords$($words$$) {
  this.RESERVED_WORDS_ += $words$$ + ","
};
goog.cssom = {};
goog.cssom.CssRuleType = {STYLE:1, IMPORT:3, MEDIA:4, FONT_FACE:5, PAGE:6, NAMESPACE:7};
goog.cssom.getAllCssText = function $goog$cssom$getAllCssText$($opt_styleSheet$$) {
  return goog.cssom.getAllCss_($opt_styleSheet$$ || document.styleSheets, !0)
};
goog.cssom.getAllCssStyleRules = function $goog$cssom$getAllCssStyleRules$($opt_styleSheet$$) {
  return goog.cssom.getAllCss_($opt_styleSheet$$ || document.styleSheets, !1)
};
goog.cssom.getCssRulesFromStyleSheet = function $goog$cssom$getCssRulesFromStyleSheet$($styleSheet$$) {
  var $cssRuleList$$ = null;
  try {
    $cssRuleList$$ = $styleSheet$$.rules || $styleSheet$$.cssRules
  }catch($e$$) {
    if(15 == $e$$.code) {
      throw $e$$.styleSheet = $styleSheet$$, $e$$;
    }
  }
  return $cssRuleList$$
};
goog.cssom.getAllCssStyleSheets = function $goog$cssom$getAllCssStyleSheets$($opt_styleSheet$$, $opt_includeDisabled$$) {
  var $styleSheetsOutput$$ = [], $styleSheet$$ = $opt_styleSheet$$ || document.styleSheets, $includeDisabled$$ = goog.isDef($opt_includeDisabled$$) ? $opt_includeDisabled$$ : !1;
  if($styleSheet$$.imports && $styleSheet$$.imports.length) {
    for(var $i$$ = 0, $n$$ = $styleSheet$$.imports.length;$i$$ < $n$$;$i$$++) {
      goog.array.extend($styleSheetsOutput$$, goog.cssom.getAllCssStyleSheets($styleSheet$$.imports[$i$$]))
    }
  }else {
    if($styleSheet$$.length) {
      for($i$$ = 0, $n$$ = $styleSheet$$.length;$i$$ < $n$$;$i$$++) {
        goog.array.extend($styleSheetsOutput$$, goog.cssom.getAllCssStyleSheets($styleSheet$$[$i$$]))
      }
    }else {
      var $cssRuleList$$ = goog.cssom.getCssRulesFromStyleSheet($styleSheet$$);
      if($cssRuleList$$ && $cssRuleList$$.length) {
        for(var $i$$ = 0, $n$$ = $cssRuleList$$.length, $cssRule$$;$i$$ < $n$$;$i$$++) {
          $cssRule$$ = $cssRuleList$$[$i$$], $cssRule$$.styleSheet && goog.array.extend($styleSheetsOutput$$, goog.cssom.getAllCssStyleSheets($cssRule$$.styleSheet))
        }
      }
    }
  }
  !($styleSheet$$.type || $styleSheet$$.rules || $styleSheet$$.cssRules) || $styleSheet$$.disabled && !$includeDisabled$$ || $styleSheetsOutput$$.push($styleSheet$$);
  return $styleSheetsOutput$$
};
goog.cssom.getCssTextFromCssRule = function $goog$cssom$getCssTextFromCssRule$($cssRule$$) {
  var $cssText_styleCssText$$ = "";
  $cssRule$$.cssText ? $cssText_styleCssText$$ = $cssRule$$.cssText : $cssRule$$.style && $cssRule$$.style.cssText && $cssRule$$.selectorText && ($cssText_styleCssText$$ = $cssRule$$.style.cssText.replace(/\s*-closure-parent-stylesheet:\s*\[object\];?\s*/gi, "").replace(/\s*-closure-rule-index:\s*[\d]+;?\s*/gi, ""), $cssText_styleCssText$$ = $cssRule$$.selectorText + " { " + $cssText_styleCssText$$ + " }");
  return $cssText_styleCssText$$
};
goog.cssom.getCssRuleIndexInParentStyleSheet = function $goog$cssom$getCssRuleIndexInParentStyleSheet$($cssRule$$, $opt_parentStyleSheet$$) {
  if($cssRule$$.style && $cssRule$$.style["-closure-rule-index"]) {
    return $cssRule$$.style["-closure-rule-index"]
  }
  var $cssRuleList$$ = $opt_parentStyleSheet$$ || goog.cssom.getParentStyleSheet($cssRule$$);
  if(!$cssRuleList$$) {
    throw Error("Cannot find a parentStyleSheet.");
  }
  if(($cssRuleList$$ = goog.cssom.getCssRulesFromStyleSheet($cssRuleList$$)) && $cssRuleList$$.length) {
    for(var $i$$ = 0, $n$$ = $cssRuleList$$.length, $thisCssRule$$;$i$$ < $n$$;$i$$++) {
      if($thisCssRule$$ = $cssRuleList$$[$i$$], $thisCssRule$$ == $cssRule$$) {
        return $i$$
      }
    }
  }
  return-1
};
goog.cssom.getParentStyleSheet = function $goog$cssom$getParentStyleSheet$($cssRule$$) {
  return $cssRule$$.parentStyleSheet || $cssRule$$.style["-closure-parent-stylesheet"]
};
goog.cssom.replaceCssRule = function $goog$cssom$replaceCssRule$($cssRule$$4_index$$, $cssText$$, $opt_parentStyleSheet$$1_parentStyleSheet$$, $opt_index$$) {
  if($opt_parentStyleSheet$$1_parentStyleSheet$$ = $opt_parentStyleSheet$$1_parentStyleSheet$$ || goog.cssom.getParentStyleSheet($cssRule$$4_index$$)) {
    if($cssRule$$4_index$$ = 0 <= $opt_index$$ ? $opt_index$$ : goog.cssom.getCssRuleIndexInParentStyleSheet($cssRule$$4_index$$, $opt_parentStyleSheet$$1_parentStyleSheet$$), 0 <= $cssRule$$4_index$$) {
      goog.cssom.removeCssRule($opt_parentStyleSheet$$1_parentStyleSheet$$, $cssRule$$4_index$$), goog.cssom.addCssRule($opt_parentStyleSheet$$1_parentStyleSheet$$, $cssText$$, $cssRule$$4_index$$)
    }else {
      throw Error("Cannot proceed without the index of the cssRule.");
    }
  }else {
    throw Error("Cannot proceed without the parentStyleSheet.");
  }
};
goog.cssom.addCssRule = function $goog$cssom$addCssRule$($cssStyleSheet$$, $cssText$$2_matches$$, $index$$72_opt_index$$) {
  if(0 > $index$$72_opt_index$$ || void 0 == $index$$72_opt_index$$) {
    $index$$72_opt_index$$ = ($cssStyleSheet$$.rules || $cssStyleSheet$$.cssRules).length
  }
  if($cssStyleSheet$$.insertRule) {
    $cssStyleSheet$$.insertRule($cssText$$2_matches$$, $index$$72_opt_index$$)
  }else {
    if($cssText$$2_matches$$ = /^([^\{]+)\{([^\{]+)\}/.exec($cssText$$2_matches$$), 3 == $cssText$$2_matches$$.length) {
      $cssStyleSheet$$.addRule($cssText$$2_matches$$[1], $cssText$$2_matches$$[2], $index$$72_opt_index$$)
    }else {
      throw Error("Your CSSRule appears to be ill-formatted.");
    }
  }
};
goog.cssom.removeCssRule = function $goog$cssom$removeCssRule$($cssStyleSheet$$, $index$$) {
  $cssStyleSheet$$.deleteRule ? $cssStyleSheet$$.deleteRule($index$$) : $cssStyleSheet$$.removeRule($index$$)
};
goog.cssom.addCssText = function $goog$cssom$addCssText$($cssText$$, $opt_domHelper$$) {
  var $cssTextNode_document$$ = $opt_domHelper$$ ? $opt_domHelper$$.getDocument() : goog.dom.getDocument(), $cssNode$$ = $cssTextNode_document$$.createElement("style");
  $cssNode$$.type = "text/css";
  $cssTextNode_document$$.getElementsByTagName("head")[0].appendChild($cssNode$$);
  $cssNode$$.styleSheet ? $cssNode$$.styleSheet.cssText = $cssText$$ : ($cssTextNode_document$$ = $cssTextNode_document$$.createTextNode($cssText$$), $cssNode$$.appendChild($cssTextNode_document$$));
  return $cssNode$$
};
goog.cssom.getFileNameFromStyleSheet = function $goog$cssom$getFileNameFromStyleSheet$($href$$1_styleSheet$$) {
  return($href$$1_styleSheet$$ = $href$$1_styleSheet$$.href) ? /([^\/\?]+)[^\/]*$/.exec($href$$1_styleSheet$$)[1] : null
};
goog.cssom.getAllCss_ = function $goog$cssom$getAllCss_$($styleSheet$$, $isTextOutput$$) {
  for(var $cssOut$$ = [], $styleSheets$$ = goog.cssom.getAllCssStyleSheets($styleSheet$$), $i$$ = 0;$styleSheet$$ = $styleSheets$$[$i$$];$i$$++) {
    var $cssRuleList$$ = goog.cssom.getCssRulesFromStyleSheet($styleSheet$$);
    if($cssRuleList$$ && $cssRuleList$$.length) {
      if(!$isTextOutput$$) {
        var $ruleIndex$$ = 0
      }
      for(var $j$$ = 0, $n$$ = $cssRuleList$$.length, $cssRule$$5_res$$;$j$$ < $n$$;$j$$++) {
        $cssRule$$5_res$$ = $cssRuleList$$[$j$$], $isTextOutput$$ && !$cssRule$$5_res$$.href ? ($cssRule$$5_res$$ = goog.cssom.getCssTextFromCssRule($cssRule$$5_res$$), $cssOut$$.push($cssRule$$5_res$$)) : $cssRule$$5_res$$.href || ($cssRule$$5_res$$.style && ($cssRule$$5_res$$.parentStyleSheet || ($cssRule$$5_res$$.style["-closure-parent-stylesheet"] = $styleSheet$$), $cssRule$$5_res$$.style["-closure-rule-index"] = $ruleIndex$$), $cssOut$$.push($cssRule$$5_res$$)), $isTextOutput$$ || $ruleIndex$$++
      }
    }
  }
  return $isTextOutput$$ ? $cssOut$$.join(" ") : $cssOut$$
};
Blockly.Css = {};
Blockly.Css.inject = function $Blockly$Css$inject$() {
  var $text$$ = Blockly.Css.CONTENT.join("\n"), $path$$ = Blockly.pathToBlockly.replace(/[\\\/]$/, ""), $text$$ = $text$$.replace(/<<<PATH>>>/g, $path$$);
  goog.cssom.addCssText($text$$)
};
Blockly.Css.CONTENT = [".blocklySvg {", "  background-color: #fff;", "  border: 1px solid #ddd;", "}", ".blocklyWidgetDiv {", "  position: absolute;", "  display: none;", "  z-index: 999;", "}", ".blocklyDraggable {", "  /* Hotspot coordinates are baked into the CUR file, but they are still", "     required in the CSS due to a Chrome bug.", "     http://code.google.com/p/chromium/issues/detail?id=1446 */", "  cursor: url(<<<PATH>>>/media/handopen.cur) 8 5, auto;", "}", ".blocklyResizeSE {", "  fill: #aaa;", 
"  cursor: se-resize;", "}", ".blocklyResizeSW {", "  fill: #aaa;", "  cursor: sw-resize;", "}", ".blocklyResizeLine {", "  stroke-width: 1;", "  stroke: #888;", "}", ".blocklyHighlightedConnectionPath {", "  stroke-width: 4px;", "  stroke: #fc3;", "  fill: none;", "}", ".blocklyPathLight {", "  fill: none;", "  stroke-width: 2;", "  stroke-linecap: round;", "}", ".blocklySelected>.blocklyPath {", "  stroke-width: 3px;", "  stroke: #fc3;", "}", ".blocklySelected>.blocklyPathLight {", "  display: none;", 
"}", ".blocklyDragging>.blocklyPath,", ".blocklyDragging>.blocklyPathLight {", "  fill-opacity: 0.8;", "  stroke-opacity: 0.8;", "}", ".blocklyDragging>.blocklyPathDark {", "  display: none;", "}", ".blocklyDisabled>.blocklyPath {", "  fill-opacity: 0.50;", "  stroke-opacity: 0.50;", "}", ".blocklyDisabled>.blocklyPathLight,", ".blocklyDisabled>.blocklyPathDark {", "  display: none;", "}", ".blocklyText {", "  cursor: default;", "  font-family: sans-serif;", "  font-size: 11pt;", "  fill: #fff;", 
"}", ".blocklyNonEditableText>text {", "  pointer-events: none;", "}", ".blocklyNonEditableText>rect,", ".blocklyEditableText>rect {", "  fill: #fff;", "  fill-opacity: 0.6;", "}", ".blocklyNonEditableText>text,", ".blocklyEditableText>text {", "  fill: #000;", "}", ".blocklyEditableText:hover>rect {", "  stroke-width: 2;", "  stroke: #fff;", "}", "/*", " * Don't allow users to select text.  It gets annoying when trying to", " * drag a block and selected text moves instead.", " */", ".blocklySvg text {", 
"  -moz-user-select: none;", "  -webkit-user-select: none;", "  user-select: none;", "  cursor: inherit;", "}", "", ".blocklyHidden {", "  display: none;", "}", ".blocklyFieldDropdown:not(.blocklyHidden) {", "  display: block;", "}", ".blocklyTooltipBackground {", "  fill: #ffffc7;", "  stroke-width: 1px;", "  stroke: #d8d8d8;", "}", ".blocklyTooltipShadow,", ".blocklyContextMenuShadow,", ".blocklyDropdownMenuShadow {", "  fill: #bbb;", "  filter: url(#blocklyShadowFilter);", "}", ".blocklyTooltipText {", 
"  font-family: sans-serif;", "  font-size: 9pt;", "  fill: #000;", "}", "", ".blocklyIconShield {", "  cursor: default;", "  fill: #00c;", "  stroke-width: 1px;", "  stroke: #ccc;", "}", ".blocklyIconGroup:hover>.blocklyIconShield {", "  fill: #00f;", "  stroke: #fff;", "}", ".blocklyIconGroup:hover>.blocklyIconMark {", "  fill: #fff;", "}", ".blocklyIconMark {", "  cursor: default !important;", "  font-family: sans-serif;", "  font-size: 9pt;", "  font-weight: bold;", "  fill: #ccc;", "  text-anchor: middle;", 
"}", ".blocklyWarningBody {", "}", ".blocklyMinimalBody {", "  margin: 0;", "  padding: 0;", "}", ".blocklyCommentTextarea {", "  margin: 0;", "  padding: 2px;", "  border: 0;", "  resize: none;", "  background-color: #ffc;", "}", ".blocklyHtmlInput {", "  font-family: sans-serif;", "  font-size: 11pt;", "  border: none;", "  outline: none;", "  width: 100%", "}", ".blocklyContextMenuBackground,", ".blocklyMutatorBackground {", "  fill: #fff;", "  stroke-width: 1;", "  stroke: #ddd;", "}", ".blocklyContextMenuOptions>.blocklyMenuDiv,", 
".blocklyContextMenuOptions>.blocklyMenuDivDisabled,", ".blocklyDropdownMenuOptions>.blocklyMenuDiv {", "  fill: #fff;", "}", ".blocklyContextMenuOptions>.blocklyMenuDiv:hover>rect,", ".blocklyDropdownMenuOptions>.blocklyMenuDiv:hover>rect {", "  fill: #57e;", "}", ".blocklyMenuSelected>rect {", "  fill: #57e;", "}", ".blocklyMenuText {", "  cursor: default !important;", "  font-family: sans-serif;", "  font-size: 15px; /* All context menu sizes are based on pixels. */", "  fill: #000;", "}", ".blocklyContextMenuOptions>.blocklyMenuDiv:hover>.blocklyMenuText,", 
".blocklyDropdownMenuOptions>.blocklyMenuDiv:hover>.blocklyMenuText {", "  fill: #fff;", "}", ".blocklyMenuSelected>.blocklyMenuText {", "  fill: #fff;", "}", ".blocklyMenuDivDisabled>.blocklyMenuText {", "  fill: #ccc;", "}", ".blocklyFlyoutBackground {", "  fill: #ddd;", "  fill-opacity: 0.8;", "}", ".blocklyColourBackground {", "  fill: #666;", "}", ".blocklyScrollbarBackground {", "  fill: #fff;", "  stroke-width: 1;", "  stroke: #e4e4e4;", "}", ".blocklyScrollbarKnob {", "  fill: #ccc;", "}", 
".blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,", ".blocklyScrollbarKnob:hover {", "  fill: #bbb;", "}", ".blocklyInvalidInput {", "  background: #faa;", "}", ".blocklyAngleCircle {", "  stroke: #444;", "  stroke-width: 1;", "  fill: #ddd;", "  fill-opacity: 0.8;", "}", ".blocklyAngleMarks {", "  stroke: #444;", "  stroke-width: 1;", "}", ".blocklyAngleGuage {", "  fill: #d00;", "  fill-opacity: 0.8;  ", "}", "", "/* Category tree in Toolbox. */", ".blocklyToolboxDiv {", "  background-color: #ddd;", 
"  display: none;", "  overflow-x: visible;", "  overflow-y: auto;", "  position: absolute;", "}", ".blocklyTreeRoot {", "  padding: 4px 0;", "}", ".blocklyTreeRoot:focus {", "  outline: none;", "}", ".blocklyTreeRow {", "  line-height: 22px;", "  height: 22px;", "  padding-right: 1em;", "  white-space: nowrap;", "}", '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {', "  padding-right: 0;", "  padding-left: 1em !important;", "}", ".blocklyTreeRow:hover {", "  background-color: #e4e4e4;", "}", ".blocklyTreeIcon {", 
"  height: 16px;", "  width: 16px;", "  vertical-align: middle;", "  background-image: url(<<<PATH>>>/media/tree.png);", "}", ".blocklyTreeIconClosedLtr {", "  background-position: -32px -1px;", "}", ".blocklyTreeIconClosedRtl {", "  background-position: 0px -1px;", "}", ".blocklyTreeIconOpen {", "  background-position: -16px -1px;", "}", ".blocklyTreeIconNone {", "  background-position: -48px -1px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedLtr {", "  background-position: -32px -17px;", 
"}", ".blocklyTreeSelected>.blocklyTreeIconClosedRtl {", "  background-position: 0px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconOpen {", "  background-position: -16px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconNone {", "  background-position: -48px -17px;", "}", ".blocklyTreeLabel {", "  cursor: default;", "  font-family: sans-serif;", "  font-size: 16px;", "  padding: 0 3px;", "  vertical-align: middle;", "}", ".blocklyTreeSelected  {", "  background-color: #57e !important;", "}", 
".blocklyTreeSelected .blocklyTreeLabel {", "  color: #fff;", "}", "", "/*", " * Copyright 2007 The Closure Library Authors. All Rights Reserved.", " *", " * Use of this source code is governed by the Apache License, Version 2.0.", " * See the COPYING file for details.", " */", "", "/* Author: pupius@google.com (Daniel Pupius) */", "", "/*", " Styles to make the colorpicker look like the old gmail color picker", " NOTE: without CSS scoping this will override styles defined in palette.css", "*/", 
".goog-palette {", "  outline: none;", "  cursor: default;", "}", "", ".goog-palette-table {", "  border: 1px solid #666;", "  border-collapse: collapse;", "}", "", ".goog-palette-cell {", "  height: 13px;", "  width: 15px;", "  margin: 0;", "  border: 0;", "  text-align: center;", "  vertical-align: middle;", "  border-right: 1px solid #666;", "  font-size: 1px;", "}", "", ".goog-palette-colorswatch {", "  position: relative;", "  height: 13px;", "  width: 15px;", "  border: 1px solid #666;", "}", 
"", ".goog-palette-cell-hover .goog-palette-colorswatch {", "  border: 1px solid #FFF;", "}", "", ".goog-palette-cell-selected .goog-palette-colorswatch {", "  border: 1px solid #000;", "  color: #fff;", "}", ""];
Blockly.inject = function $Blockly$inject$($container$$, $opt_options$$) {
  if(!goog.dom.contains(document, $container$$)) {
    throw"Error: container is not in current document.";
  }
  $opt_options$$ && goog.mixin(Blockly, Blockly.parseOptions_($opt_options$$));
  Blockly.createDom_($container$$);
  Blockly.init_()
};
Blockly.parseOptions_ = function $Blockly$parseOptions_$($options$$) {
  var $readOnly$$ = !!$options$$.readOnly;
  if($readOnly$$) {
    var $hasCategories$$ = !1, $hasTrashcan$$ = !1, $hasCollapse$$ = !1, $tree$$ = null
  }else {
    ($tree$$ = $options$$.toolbox) ? ("string" != typeof $tree$$ && "undefined" == typeof XSLTProcessor && ($tree$$ = $tree$$.outerHTML), "string" == typeof $tree$$ && ($tree$$ = Blockly.Xml.textToDom($tree$$)), $hasCategories$$ = !!$tree$$.getElementsByTagName("category").length) : ($tree$$ = null, $hasCategories$$ = !1), $hasTrashcan$$ = $options$$.trashcan, void 0 === $hasTrashcan$$ && ($hasTrashcan$$ = $hasCategories$$), $hasCollapse$$ = $options$$.collapse, void 0 === $hasCollapse$$ && ($hasCollapse$$ = 
    $hasCategories$$)
  }
  if($tree$$ && !$hasCategories$$) {
    var $hasScrollbars$$ = !1
  }else {
    $hasScrollbars$$ = $options$$.scrollbars, void 0 === $hasScrollbars$$ && ($hasScrollbars$$ = !0)
  }
  return{RTL:!!$options$$.rtl, collapse:$hasCollapse$$, readOnly:$readOnly$$, maxBlocks:$options$$.maxBlocks || Infinity, pathToBlockly:$options$$.path || "./", hasCategories:$hasCategories$$, hasScrollbars:$hasScrollbars$$, hasTrashcan:$hasTrashcan$$, languageTree:$tree$$}
};
Blockly.createDom_ = function $Blockly$createDom_$($container$$) {
  $container$$.setAttribute("dir", "LTR");
  goog.ui.Component.setDefaultRightToLeft(Blockly.RTL);
  Blockly.Css.inject();
  var $svg$$ = Blockly.createSvgElement("svg", {xmlns:"http://www.w3.org/2000/svg", "xmlns:html":"http://www.w3.org/1999/xhtml", "xmlns:xlink":"http://www.w3.org/1999/xlink", version:"1.1", "class":"blocklySvg"}, null), $defs_flyout$$4_pattern$$ = Blockly.createSvgElement("defs", {}, $svg$$), $feMerge_filter_flyoutSvg$$, $feSpecularLighting$$;
  $feMerge_filter_flyoutSvg$$ = Blockly.createSvgElement("filter", {id:"blocklyEmboss"}, $defs_flyout$$4_pattern$$);
  Blockly.createSvgElement("feGaussianBlur", {"in":"SourceAlpha", stdDeviation:1, result:"blur"}, $feMerge_filter_flyoutSvg$$);
  $feSpecularLighting$$ = Blockly.createSvgElement("feSpecularLighting", {"in":"blur", surfaceScale:1, specularConstant:0.5, specularExponent:10, "lighting-color":"white", result:"specOut"}, $feMerge_filter_flyoutSvg$$);
  Blockly.createSvgElement("fePointLight", {x:-5E3, y:-1E4, z:2E4}, $feSpecularLighting$$);
  Blockly.createSvgElement("feComposite", {"in":"specOut", in2:"SourceAlpha", operator:"in", result:"specOut"}, $feMerge_filter_flyoutSvg$$);
  Blockly.createSvgElement("feComposite", {"in":"SourceGraphic", in2:"specOut", operator:"arithmetic", k1:0, k2:1, k3:1, k4:0}, $feMerge_filter_flyoutSvg$$);
  $feMerge_filter_flyoutSvg$$ = Blockly.createSvgElement("filter", {id:"blocklyTrashcanShadowFilter"}, $defs_flyout$$4_pattern$$);
  Blockly.createSvgElement("feGaussianBlur", {"in":"SourceAlpha", stdDeviation:2, result:"blur"}, $feMerge_filter_flyoutSvg$$);
  Blockly.createSvgElement("feOffset", {"in":"blur", dx:1, dy:1, result:"offsetBlur"}, $feMerge_filter_flyoutSvg$$);
  $feMerge_filter_flyoutSvg$$ = Blockly.createSvgElement("feMerge", {}, $feMerge_filter_flyoutSvg$$);
  Blockly.createSvgElement("feMergeNode", {"in":"offsetBlur"}, $feMerge_filter_flyoutSvg$$);
  Blockly.createSvgElement("feMergeNode", {"in":"SourceGraphic"}, $feMerge_filter_flyoutSvg$$);
  $feMerge_filter_flyoutSvg$$ = Blockly.createSvgElement("filter", {id:"blocklyShadowFilter"}, $defs_flyout$$4_pattern$$);
  Blockly.createSvgElement("feGaussianBlur", {stdDeviation:2}, $feMerge_filter_flyoutSvg$$);
  $defs_flyout$$4_pattern$$ = Blockly.createSvgElement("pattern", {id:"blocklyDisabledPattern", patternUnits:"userSpaceOnUse", width:10, height:10}, $defs_flyout$$4_pattern$$);
  Blockly.createSvgElement("rect", {width:10, height:10, fill:"#aaa"}, $defs_flyout$$4_pattern$$);
  Blockly.createSvgElement("path", {d:"M 0 0 L 10 10 M 10 0 L 0 10", stroke:"#cc0"}, $defs_flyout$$4_pattern$$);
  Blockly.mainWorkspace = new Blockly.Workspace(Blockly.getMainWorkspaceMetrics_, Blockly.setMainWorkspaceMetrics_);
  $svg$$.appendChild(Blockly.mainWorkspace.createDom());
  Blockly.mainWorkspace.maxBlocks = Blockly.maxBlocks;
  Blockly.readOnly || (Blockly.hasCategories ? Blockly.Toolbox.createDom($svg$$, $container$$) : (Blockly.mainWorkspace.flyout_ = new Blockly.Flyout, $defs_flyout$$4_pattern$$ = Blockly.mainWorkspace.flyout_, $feMerge_filter_flyoutSvg$$ = $defs_flyout$$4_pattern$$.createDom(), $defs_flyout$$4_pattern$$.init(Blockly.mainWorkspace, !0), $defs_flyout$$4_pattern$$.autoClose = !1, goog.dom.insertSiblingBefore($feMerge_filter_flyoutSvg$$, Blockly.mainWorkspace.svgGroup_), Blockly.addChangeListener(function() {
    if(0 == Blockly.Block.dragMode_) {
      var $metrics$$ = Blockly.mainWorkspace.getMetrics();
      if(0 > $metrics$$.contentTop || $metrics$$.contentTop + $metrics$$.contentHeight > $metrics$$.viewHeight + $metrics$$.viewTop || $metrics$$.contentLeft < (Blockly.RTL ? $metrics$$.viewLeft : 0) || $metrics$$.contentLeft + $metrics$$.contentWidth > $metrics$$.viewWidth + (Blockly.RTL ? 2 : 1) * $metrics$$.viewLeft) {
        for(var $blocks$$ = Blockly.mainWorkspace.getTopBlocks(!1), $b$$ = 0, $block$$;$block$$ = $blocks$$[$b$$];$b$$++) {
          var $blockXY$$ = $block$$.getRelativeToSurfaceXY(), $blockHW$$ = $block$$.getHeightWidth(), $overflow$$ = $metrics$$.viewTop + 25 - $blockHW$$.height - $blockXY$$.y;
          0 < $overflow$$ && $block$$.moveBy(0, $overflow$$);
          $overflow$$ = $metrics$$.viewTop + $metrics$$.viewHeight - 25 - $blockXY$$.y;
          0 > $overflow$$ && $block$$.moveBy(0, $overflow$$);
          $overflow$$ = 25 + $metrics$$.viewLeft - $blockXY$$.x - (Blockly.RTL ? 0 : $blockHW$$.width);
          0 < $overflow$$ && $block$$.moveBy($overflow$$, 0);
          $overflow$$ = $metrics$$.viewLeft + $metrics$$.viewWidth - 25 - $blockXY$$.x + (Blockly.RTL ? $blockHW$$.width : 0);
          0 > $overflow$$ && $block$$.moveBy($overflow$$, 0);
          $block$$.isDeletable() && 50 < (Blockly.RTL ? $blockXY$$.x - 2 * $metrics$$.viewLeft - $metrics$$.viewWidth : -$blockXY$$.x) && $block$$.dispose(!1, !0)
        }
      }
    }
  })));
  Blockly.Tooltip && $svg$$.appendChild(Blockly.Tooltip.createDom());
  !Blockly.readOnly && Blockly.FieldDropdown && $svg$$.appendChild(Blockly.FieldDropdown.createDom());
  Blockly.ContextMenu && Blockly.ContextMenu && $svg$$.appendChild(Blockly.ContextMenu.createDom());
  $container$$.appendChild($svg$$);
  Blockly.svg = $svg$$;
  Blockly.svgResize();
  Blockly.WidgetDiv.DIV = goog.dom.createDom("div", "blocklyWidgetDiv");
  document.body.appendChild(Blockly.WidgetDiv.DIV)
};
Blockly.init_ = function $Blockly$init_$() {
  if(goog.userAgent.WEBKIT) {
    var $path$$8_translation$$ = Blockly.createSvgElement("path", {d:"m 0,0 c 0,-5 0,-5 0,0 H 50 V 50 z"}, Blockly.svg);
    Blockly.isMsie() || Blockly.isTrident() ? ($path$$8_translation$$.style.display = "inline", $path$$8_translation$$.bBox_ = {x:$path$$8_translation$$.getBBox().x, y:$path$$8_translation$$.getBBox().y, width:$path$$8_translation$$.scrollWidth, height:$path$$8_translation$$.scrollHeight}) : $path$$8_translation$$.bBox_ = $path$$8_translation$$.getBBox();
    50 < $path$$8_translation$$.bBox_.height && (Blockly.BROKEN_CONTROL_POINTS = !0);
    Blockly.svg.removeChild($path$$8_translation$$)
  }
  Blockly.bindEvent_(Blockly.svg, "mousedown", null, Blockly.onMouseDown_);
  Blockly.bindEvent_(Blockly.svg, "mousemove", null, Blockly.onMouseMove_);
  Blockly.bindEvent_(Blockly.svg, "contextmenu", null, Blockly.onContextMenu_);
  Blockly.documentEventsBound_ || (Blockly.bindEvent_(window, "resize", document, Blockly.svgResize), Blockly.bindEvent_(document, "mouseup", null, Blockly.onMouseUp_), Blockly.bindEvent_(document, "keydown", null, Blockly.onKeyDown_), goog.userAgent.IPAD && Blockly.bindEvent_(window, "orientationchange", document, function() {
    Blockly.fireUiEvent(window, "resize")
  }, !1), Blockly.documentEventsBound_ = !0);
  Blockly.languageTree && (Blockly.hasCategories ? Blockly.Toolbox.init() : (Blockly.mainWorkspace.flyout_.init(Blockly.mainWorkspace, !0), Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes), Blockly.mainWorkspace.scrollX = Blockly.mainWorkspace.flyout_.width_, $path$$8_translation$$ = "translate(" + Blockly.mainWorkspace.scrollX + ", 0)", Blockly.mainWorkspace.getCanvas().setAttribute("transform", $path$$8_translation$$), Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform", 
  $path$$8_translation$$)));
  Blockly.hasScrollbars && (Blockly.mainWorkspace.scrollbar = new Blockly.ScrollbarPair(Blockly.mainWorkspace), Blockly.mainWorkspace.scrollbar.resize());
  Blockly.mainWorkspace.addTrashcan();
  Blockly.loadAudio_(["media/click.mp3", "media/click.wav", "media/click.ogg"], "click");
  Blockly.loadAudio_(["media/delete.mp3", "media/delete.ogg", "media/delete.wav"], "delete")
};
Blockly.FieldCheckbox = function $Blockly$FieldCheckbox$($state$$, $opt_changeHandler$$) {
  Blockly.FieldCheckbox.superClass_.constructor.call(this, "");
  this.changeHandler_ = $opt_changeHandler$$;
  this.checkElement_ = Blockly.createSvgElement("text", {"class":"blocklyText", x:-3}, this.fieldGroup_);
  var $textNode$$ = document.createTextNode("\u2713");
  this.checkElement_.appendChild($textNode$$);
  this.setValue($state$$)
};
goog.inherits(Blockly.FieldCheckbox, Blockly.Field);
Blockly.FieldCheckbox.prototype.CURSOR = "default";
Blockly.FieldCheckbox.prototype.getValue = function $Blockly$FieldCheckbox$$getValue$() {
  return String(this.state_).toUpperCase()
};
Blockly.FieldCheckbox.prototype.setValue = function $Blockly$FieldCheckbox$$setValue$($newState_strBool$$) {
  $newState_strBool$$ = "TRUE" == $newState_strBool$$;
  this.state_ !== $newState_strBool$$ && (this.state_ = $newState_strBool$$, this.checkElement_.style.display = $newState_strBool$$ ? "block" : "none", this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_.workspace.fireChangeEvent())
};
Blockly.FieldCheckbox.prototype.showEditor_ = function $Blockly$FieldCheckbox$$showEditor_$() {
  var $newState$$ = !this.state_;
  if(this.changeHandler_) {
    var $override$$ = this.changeHandler_($newState$$);
    void 0 !== $override$$ && ($newState$$ = $override$$)
  }
  null !== $newState$$ && this.setValue(String($newState$$).toUpperCase())
};
Blockly.WidgetDiv = {};
Blockly.WidgetDiv.DIV = null;
Blockly.WidgetDiv.field_ = null;
Blockly.WidgetDiv.dispose_ = null;
Blockly.WidgetDiv.show = function $Blockly$WidgetDiv$show$($newField$$, $dispose$$) {
  Blockly.WidgetDiv.hide();
  Blockly.WidgetDiv.field_ = $newField$$;
  Blockly.WidgetDiv.dispose_ = $dispose$$;
  Blockly.WidgetDiv.DIV.style.display = "block"
};
Blockly.WidgetDiv.hide = function $Blockly$WidgetDiv$hide$() {
  Blockly.WidgetDiv.field_ && (Blockly.WidgetDiv.DIV.style.display = "none", Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_(), Blockly.WidgetDiv.field_ = null, Blockly.WidgetDiv.dispose_ = null, goog.dom.removeChildren(Blockly.WidgetDiv.DIV))
};
Blockly.WidgetDiv.hideIfField = function $Blockly$WidgetDiv$hideIfField$($oldField$$) {
  Blockly.WidgetDiv.field_ == $oldField$$ && Blockly.WidgetDiv.hide()
};
Blockly.FieldImage = function $Blockly$FieldImage$($src$$, $width$$, $height$$) {
  this.sourceBlock_ = null;
  $height$$ = Number($height$$);
  $width$$ = Number($width$$);
  this.size_ = {height:$height$$ + 10, width:$width$$};
  var $offsetY$$ = 6 - Blockly.BlockSvg.TITLE_HEIGHT;
  this.fieldGroup_ = Blockly.createSvgElement("g", {}, null);
  this.imageElement_ = Blockly.createSvgElement("image", {height:$height$$ + "px", width:$width$$ + "px", y:$offsetY$$}, this.fieldGroup_);
  this.setText($src$$);
  goog.userAgent.GECKO && (this.rectElement_ = Blockly.createSvgElement("rect", {height:$height$$ + "px", width:$width$$ + "px", y:$offsetY$$, "fill-opacity":0}, this.fieldGroup_))
};
goog.inherits(Blockly.FieldImage, Blockly.Field);
Blockly.FieldImage.prototype.rectElement_ = null;
Blockly.FieldImage.prototype.EDITABLE = !1;
Blockly.FieldImage.prototype.init = function $Blockly$FieldImage$$init$($block$$) {
  if(this.sourceBlock_) {
    throw"Image has already been initialized once.";
  }
  this.sourceBlock_ = $block$$;
  $block$$.getSvgRoot().appendChild(this.fieldGroup_);
  $block$$ = this.rectElement_ || this.imageElement_;
  $block$$.tooltip = this.sourceBlock_;
  Blockly.Tooltip && Blockly.Tooltip.bindMouseEvents($block$$)
};
Blockly.FieldImage.prototype.dispose = function $Blockly$FieldImage$$dispose$() {
  goog.dom.removeNode(this.fieldGroup_);
  this.rectElement_ = this.imageElement_ = this.fieldGroup_ = null
};
Blockly.FieldImage.prototype.setTooltip = function $Blockly$FieldImage$$setTooltip$($newTip$$) {
  (this.rectElement_ || this.imageElement_).tooltip = $newTip$$
};
Blockly.FieldImage.prototype.getText = function $Blockly$FieldImage$$getText$() {
  return this.src_
};
Blockly.FieldImage.prototype.setText = function $Blockly$FieldImage$$setText$($src$$) {
  null !== $src$$ && (this.src_ = $src$$, this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", goog.isString($src$$) ? $src$$ : ""))
};
Blockly.FieldAngle = function $Blockly$FieldAngle$($text$$, $opt_changeHandler$$) {
  var $changeHandler$$;
  if($opt_changeHandler$$) {
    var $thisObj$$ = this;
    $changeHandler$$ = function $$changeHandler$$$($value$$) {
      $value$$ = Blockly.FieldAngle.angleValidator.call($thisObj$$, $value$$);
      null !== $value$$ && $opt_changeHandler$$.call($thisObj$$, $value$$);
      return $value$$
    }
  }else {
    $changeHandler$$ = Blockly.FieldAngle.angleValidator
  }
  this.symbol_ = Blockly.createSvgElement("tspan", {}, null);
  this.symbol_.appendChild(document.createTextNode("\u00b0"));
  Blockly.FieldAngle.superClass_.constructor.call(this, $text$$, $changeHandler$$)
};
goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);
Blockly.FieldAngle.HALF = 50;
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;
Blockly.FieldAngle.prototype.dispose_ = function $Blockly$FieldAngle$$dispose_$() {
  var $thisField$$ = this;
  return function() {
    Blockly.FieldAngle.superClass_.dispose_.call($thisField$$)();
    $thisField$$.gauge_ = null;
    $thisField$$.clickWrapper_ && Blockly.unbindEvent_($thisField$$.clickWrapper_);
    $thisField$$.moveWrapper1_ && Blockly.unbindEvent_($thisField$$.moveWrapper1_);
    $thisField$$.moveWrapper2_ && Blockly.unbindEvent_($thisField$$.moveWrapper2_)
  }
};
Blockly.FieldAngle.prototype.showEditor_ = function $Blockly$FieldAngle$$showEditor_$() {
  Blockly.FieldAngle.superClass_.showEditor_.call(this);
  var $div$$5_svg$$ = Blockly.WidgetDiv.DIV;
  if($div$$5_svg$$.firstChild) {
    var $div$$5_svg$$ = Blockly.createSvgElement("svg", {xmlns:"http://www.w3.org/2000/svg", "xmlns:html":"http://www.w3.org/1999/xhtml", "xmlns:xlink":"http://www.w3.org/1999/xlink", version:"1.1", height:2 * Blockly.FieldAngle.HALF + "px", width:2 * Blockly.FieldAngle.HALF + "px"}, $div$$5_svg$$), $circle$$ = Blockly.createSvgElement("circle", {cx:Blockly.FieldAngle.HALF, cy:Blockly.FieldAngle.HALF, r:Blockly.FieldAngle.RADIUS, "class":"blocklyAngleCircle"}, $div$$5_svg$$);
    this.gauge_ = Blockly.createSvgElement("path", {"class":"blocklyAngleGuage"}, $div$$5_svg$$);
    for(var $a$$ = 0;360 > $a$$;$a$$ += 15) {
      Blockly.createSvgElement("line", {x1:Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS, y1:Blockly.FieldAngle.HALF, x2:Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS - (0 == $a$$ % 45 ? 10 : 5), y2:Blockly.FieldAngle.HALF, "class":"blocklyAngleMarks", transform:"rotate(" + $a$$ + ", " + Blockly.FieldAngle.HALF + ", " + Blockly.FieldAngle.HALF + ")"}, $div$$5_svg$$)
    }
    $div$$5_svg$$.style.marginLeft = "-35px";
    this.clickWrapper_ = Blockly.bindEvent_($div$$5_svg$$, "click", this, Blockly.WidgetDiv.hide);
    this.moveWrapper1_ = Blockly.bindEvent_($circle$$, "mousemove", this, this.onMouseMove);
    this.moveWrapper2_ = Blockly.bindEvent_(this.gauge_, "mousemove", this, this.onMouseMove);
    this.updateGraph()
  }
};
Blockly.FieldAngle.prototype.onMouseMove = function $Blockly$FieldAngle$$onMouseMove$($dy$$20_e$$) {
  var $angle$$4_bBox$$ = this.gauge_.ownerSVGElement.getBoundingClientRect(), $dx$$ = $dy$$20_e$$.clientX - $angle$$4_bBox$$.left - Blockly.FieldAngle.HALF;
  $dy$$20_e$$ = $dy$$20_e$$.clientY - $angle$$4_bBox$$.top - Blockly.FieldAngle.HALF;
  $angle$$4_bBox$$ = Math.atan(-$dy$$20_e$$ / $dx$$);
  isNaN($angle$$4_bBox$$) || ($angle$$4_bBox$$ = 180 * ($angle$$4_bBox$$ / Math.PI), 0 > $dx$$ ? $angle$$4_bBox$$ += 180 : 0 < $dy$$20_e$$ && ($angle$$4_bBox$$ += 360), $angle$$4_bBox$$ = String(Math.round($angle$$4_bBox$$)), Blockly.FieldTextInput.htmlInput_.value = $angle$$4_bBox$$, this.setText($angle$$4_bBox$$))
};
Blockly.FieldAngle.prototype.setText = function $Blockly$FieldAngle$$setText$($text$$) {
  Blockly.FieldAngle.superClass_.setText.call(this, $text$$);
  this.updateGraph();
  Blockly.RTL ? this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild) : this.textElement_.appendChild(this.symbol_);
  this.size_.width = 0
};
Blockly.FieldAngle.prototype.updateGraph = function $Blockly$FieldAngle$$updateGraph$() {
  if(this.gauge_) {
    var $angleRadians$$ = Number(this.getText()) / 180 * Math.PI;
    if(isNaN($angleRadians$$)) {
      this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF + ", " + Blockly.FieldAngle.HALF)
    }else {
      var $x$$ = Blockly.FieldAngle.HALF + Math.cos($angleRadians$$) * Blockly.FieldAngle.RADIUS, $y$$ = Blockly.FieldAngle.HALF + Math.sin($angleRadians$$) * -Blockly.FieldAngle.RADIUS;
      this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF + ", " + Blockly.FieldAngle.HALF + " h " + Blockly.FieldAngle.RADIUS + " A " + Blockly.FieldAngle.RADIUS + "," + Blockly.FieldAngle.RADIUS + " 0 " + ($angleRadians$$ > Math.PI ? 1 : 0) + " 0 " + $x$$ + "," + $y$$ + " z")
    }
  }
};
Blockly.FieldAngle.angleValidator = function $Blockly$FieldAngle$angleValidator$($n$$11_text$$) {
  $n$$11_text$$ = Blockly.FieldTextInput.numberValidator($n$$11_text$$);
  null !== $n$$11_text$$ && ($n$$11_text$$ %= 360, 0 > $n$$11_text$$ && ($n$$11_text$$ += 360), $n$$11_text$$ = String($n$$11_text$$));
  return $n$$11_text$$
};
Blockly.pathToBlockly = "./";
Blockly.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.HTML_NS = "http://www.w3.org/1999/xhtml";
Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;
Blockly.makeColour = function $Blockly$makeColour$($hue$$, $saturation$$, $value$$) {
  return goog.color.hsvToHex($hue$$, $saturation$$, 256 * $value$$)
};
Blockly.INPUT_VALUE = 1;
Blockly.OUTPUT_VALUE = 2;
Blockly.NEXT_STATEMENT = 3;
Blockly.PREVIOUS_STATEMENT = 4;
Blockly.DUMMY_INPUT = 5;
Blockly.ALIGN_LEFT = -1;
Blockly.ALIGN_CENTRE = 0;
Blockly.ALIGN_RIGHT = 1;
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;
Blockly.SOUNDS_ = {};
Blockly.selected = null;
Blockly.readOnly = !1;
Blockly.highlightedConnection_ = null;
Blockly.localConnection_ = null;
Blockly.DRAG_RADIUS = 5;
Blockly.SNAP_RADIUS = 15;
Blockly.BUMP_DELAY = 250;
Blockly.COLLAPSE_CHARS = 30;
Blockly.mainWorkspace = null;
Blockly.clipboard_ = null;
Blockly.svgSize = function $Blockly$svgSize$() {
  return{width:Blockly.svg.cachedWidth_, height:Blockly.svg.cachedHeight_}
};
Blockly.svgResize = function $Blockly$svgResize$() {
  var $svg$$ = Blockly.svg, $div$$6_height$$22_style$$ = getComputedStyle($svg$$), $borderWidth_width$$ = 0;
  $div$$6_height$$22_style$$ && ($borderWidth_width$$ = parseInt($div$$6_height$$22_style$$.borderLeftWidth, 10) + parseInt($div$$6_height$$22_style$$.borderRightWidth, 10));
  $div$$6_height$$22_style$$ = $svg$$.parentNode;
  $borderWidth_width$$ = $div$$6_height$$22_style$$.offsetWidth - $borderWidth_width$$;
  $div$$6_height$$22_style$$ = $div$$6_height$$22_style$$.offsetHeight;
  $svg$$.cachedWidth_ != $borderWidth_width$$ && ($svg$$.setAttribute("width", $borderWidth_width$$ + "px"), $svg$$.cachedWidth_ = $borderWidth_width$$);
  $svg$$.cachedHeight_ != $div$$6_height$$22_style$$ && ($svg$$.setAttribute("height", $div$$6_height$$22_style$$ + "px"), $svg$$.cachedHeight_ = $div$$6_height$$22_style$$);
  Blockly.mainWorkspace.scrollbar && Blockly.mainWorkspace.scrollbar.resize()
};
Blockly.getWorkspaceWidth = function $Blockly$getWorkspaceWidth$() {
  var $metrics$$ = Blockly.mainWorkspace.getMetrics();
  return $metrics$$ ? $metrics$$.viewWidth : 0
};
Blockly.getToolboxWidth = function $Blockly$getToolboxWidth$() {
  var $metrics$$ = (Blockly.mainWorkspace.flyout_ || Blockly.Toolbox.flyout_).workspace_.getMetrics();
  return $metrics$$ ? $metrics$$.viewWidth : 0
};
Blockly.onMouseDown_ = function $Blockly$onMouseDown_$($e$$) {
  Blockly.terminateDrag_();
  Blockly.hideChaff();
  var $isTargetSvg$$ = $e$$.target && $e$$.target.nodeName && "svg" == $e$$.target.nodeName.toLowerCase();
  !Blockly.readOnly && Blockly.selected && $isTargetSvg$$ && Blockly.selected.unselect();
  Blockly.isRightButton($e$$) ? Blockly.ContextMenu && Blockly.showContextMenu_(Blockly.mouseToSvg($e$$)) : (Blockly.readOnly || $isTargetSvg$$) && Blockly.mainWorkspace.scrollbar && (Blockly.mainWorkspace.dragMode = !0, Blockly.mainWorkspace.startDragMouseX = $e$$.clientX, Blockly.mainWorkspace.startDragMouseY = $e$$.clientY, Blockly.mainWorkspace.startDragMetrics = Blockly.mainWorkspace.getMetrics(), Blockly.mainWorkspace.startScrollX = Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.startScrollY = 
  Blockly.mainWorkspace.scrollY)
};
Blockly.onMouseUp_ = function $Blockly$onMouseUp_$($e$$) {
  Blockly.setCursorHand_(!1);
  Blockly.mainWorkspace.dragMode = !1
};
Blockly.onMouseMove_ = function $Blockly$onMouseMove_$($e$$111_y$$) {
  if(Blockly.mainWorkspace.dragMode) {
    Blockly.removeAllRanges();
    var $metrics$$ = Blockly.mainWorkspace.startDragMetrics, $x$$ = Blockly.mainWorkspace.startScrollX + ($e$$111_y$$.clientX - Blockly.mainWorkspace.startDragMouseX);
    $e$$111_y$$ = Blockly.mainWorkspace.startScrollY + ($e$$111_y$$.clientY - Blockly.mainWorkspace.startDragMouseY);
    $x$$ = Math.min($x$$, -$metrics$$.contentLeft);
    $e$$111_y$$ = Math.min($e$$111_y$$, -$metrics$$.contentTop);
    $x$$ = Math.max($x$$, $metrics$$.viewWidth - $metrics$$.contentLeft - $metrics$$.contentWidth);
    $e$$111_y$$ = Math.max($e$$111_y$$, $metrics$$.viewHeight - $metrics$$.contentTop - $metrics$$.contentHeight);
    Blockly.mainWorkspace.scrollbar.set(-$x$$ - $metrics$$.contentLeft, -$e$$111_y$$ - $metrics$$.contentTop)
  }
};
Blockly.onKeyDown_ = function $Blockly$onKeyDown_$($e$$) {
  if(!Blockly.isTargetInput_($e$$)) {
    if(27 == $e$$.keyCode) {
      Blockly.hideChaff()
    }else {
      if(8 == $e$$.keyCode || 46 == $e$$.keyCode) {
        try {
          Blockly.selected && Blockly.selected.isDeletable() && (Blockly.hideChaff(), Blockly.selected.dispose(!0, !0))
        }finally {
          $e$$.preventDefault()
        }
      }else {
        if($e$$.altKey || $e$$.ctrlKey || $e$$.metaKey) {
          Blockly.selected && Blockly.selected.isDeletable() && Blockly.selected.workspace == Blockly.mainWorkspace && (Blockly.hideChaff(), 67 == $e$$.keyCode ? Blockly.copy_(Blockly.selected) : 88 == $e$$.keyCode && (Blockly.copy_(Blockly.selected), Blockly.selected.dispose(!0, !0))), 86 == $e$$.keyCode && Blockly.clipboard_ && Blockly.mainWorkspace.paste(Blockly.clipboard_)
        }
      }
    }
  }
};
Blockly.terminateDrag_ = function $Blockly$terminateDrag_$() {
  Blockly.Block.terminateDrag_();
  Blockly.Flyout.terminateDrag_()
};
Blockly.copy_ = function $Blockly$copy_$($block$$45_xy$$) {
  var $xmlBlock$$ = Blockly.Xml.blockToDom_($block$$45_xy$$);
  Blockly.Xml.deleteNext($xmlBlock$$);
  $block$$45_xy$$ = $block$$45_xy$$.getRelativeToSurfaceXY();
  $xmlBlock$$.setAttribute("x", Blockly.RTL ? -$block$$45_xy$$.x : $block$$45_xy$$.x);
  $xmlBlock$$.setAttribute("y", $block$$45_xy$$.y);
  Blockly.clipboard_ = $xmlBlock$$
};
Blockly.showContextMenu_ = function $Blockly$showContextMenu_$($xy$$) {
  if(!Blockly.readOnly) {
    var $options$$ = [];
    if(Blockly.collapse) {
      for(var $expandOption$$1_hasCollapsedBlocks_helpOption$$ = !1, $collapseOption$$ = !1, $topBlocks$$ = Blockly.mainWorkspace.getTopBlocks(!1), $i$$0$$ = 0;$i$$0$$ < $topBlocks$$.length;$i$$0$$++) {
        $topBlocks$$[$i$$0$$].isCollapsed() ? $expandOption$$1_hasCollapsedBlocks_helpOption$$ = !0 : $collapseOption$$ = !0
      }
      $collapseOption$$ = {enabled:$collapseOption$$};
      $collapseOption$$.text = Blockly.Msg.COLLAPSE_ALL;
      $collapseOption$$.callback = function $$collapseOption$$$callback$() {
        for(var $i$$ = 0;$i$$ < $topBlocks$$.length;$i$$++) {
          $topBlocks$$[$i$$].setCollapsed(!0)
        }
      };
      $options$$.push($collapseOption$$);
      $expandOption$$1_hasCollapsedBlocks_helpOption$$ = {enabled:$expandOption$$1_hasCollapsedBlocks_helpOption$$};
      $expandOption$$1_hasCollapsedBlocks_helpOption$$.text = Blockly.Msg.EXPAND_ALL;
      $expandOption$$1_hasCollapsedBlocks_helpOption$$.callback = function $$expandOption$$1_hasCollapsedBlocks_helpOption$$$callback$() {
        for(var $i$$ = 0;$i$$ < $topBlocks$$.length;$i$$++) {
          $topBlocks$$[$i$$].setCollapsed(!1)
        }
      };
      $options$$.push($expandOption$$1_hasCollapsedBlocks_helpOption$$)
    }
    $expandOption$$1_hasCollapsedBlocks_helpOption$$ = {enabled:!1};
    $expandOption$$1_hasCollapsedBlocks_helpOption$$.text = Blockly.Msg.HELP;
    $expandOption$$1_hasCollapsedBlocks_helpOption$$.callback = function $$expandOption$$1_hasCollapsedBlocks_helpOption$$$callback$() {
    };
    $options$$.push($expandOption$$1_hasCollapsedBlocks_helpOption$$);
    Blockly.ContextMenu.show($xy$$, $options$$)
  }
};
Blockly.onContextMenu_ = function $Blockly$onContextMenu_$($e$$) {
  !Blockly.isTargetInput_($e$$) && Blockly.ContextMenu && $e$$.preventDefault()
};
Blockly.hideChaff = function $Blockly$hideChaff$($opt_allowToolbox$$) {
  Blockly.Tooltip && Blockly.Tooltip.hide();
  Blockly.ContextMenu && Blockly.ContextMenu.hide();
  Blockly.FieldDropdown && Blockly.FieldDropdown.hide();
  Blockly.WidgetDiv.hide();
  !$opt_allowToolbox$$ && Blockly.Toolbox.flyout_ && Blockly.Toolbox.flyout_.autoClose && Blockly.Toolbox.clearSelection()
};
Blockly.removeAllRanges = function $Blockly$removeAllRanges$() {
  if(window.getSelection) {
    var $sel$$ = window.getSelection();
    $sel$$ && $sel$$.removeAllRanges && ($sel$$.removeAllRanges(), window.setTimeout(function() {
      window.getSelection().removeAllRanges()
    }, 0))
  }
};
Blockly.isTargetInput_ = function $Blockly$isTargetInput_$($e$$) {
  return"textarea" == $e$$.target.type || "text" == $e$$.target.type
};
Blockly.loadAudio_ = function $Blockly$loadAudio_$($filenames$$, $name$$) {
  if(window.Audio && $filenames$$.length) {
    for(var $sound$$, $audioTest$$ = new window.Audio, $i$$ = 0;$i$$ < $filenames$$.length;$i$$++) {
      var $filename$$ = Blockly.pathToBlockly + $filenames$$[$i$$], $ext$$ = $filename$$.match(/\.(\w+)$/);
      if($ext$$ && $audioTest$$.canPlayType("audio/" + $ext$$[1])) {
        $sound$$ = new window.Audio($filename$$);
        break
      }
    }
    $sound$$ && $sound$$.play && ($sound$$.play(), $sound$$.volume = 0.01, Blockly.SOUNDS_[$name$$] = $sound$$)
  }
};
Blockly.playAudio = function $Blockly$playAudio$($name$$, $opt_volume$$) {
  var $mySound_sound$$ = Blockly.SOUNDS_[$name$$];
  $mySound_sound$$ && ($mySound_sound$$ = goog.userAgent.DOCUMENT_MODE && 9 === goog.userAgent.DOCUMENT_MODE || goog.userAgent.IPAD || goog.userAgent.ANDROID ? $mySound_sound$$ : $mySound_sound$$.cloneNode(), $mySound_sound$$.volume = void 0 === $opt_volume$$ ? 1 : $opt_volume$$, $mySound_sound$$.play())
};
Blockly.setCursorHand_ = function $Blockly$setCursorHand_$($closed$$) {
  if(!Blockly.readOnly) {
    var $cursor$$ = "";
    $closed$$ && ($cursor$$ = "url(" + Blockly.pathToBlockly + "media/handclosed.cur) 7 3, auto");
    Blockly.selected && (Blockly.selected.getSvgRoot().style.cursor = $cursor$$);
    Blockly.svg.style.cursor = $cursor$$
  }
};
Blockly.getMainWorkspaceMetrics_ = function $Blockly$getMainWorkspaceMetrics_$() {
  var $svgSize$$ = Blockly.svgSize();
  $svgSize$$.width -= Blockly.Toolbox.width;
  var $rightEdge$$1_viewWidth$$ = $svgSize$$.width - Blockly.Scrollbar.scrollbarThickness, $bottomEdge_viewHeight$$ = $svgSize$$.height - Blockly.Scrollbar.scrollbarThickness;
  try {
    if(Blockly.isMsie() || Blockly.isTrident()) {
      Blockly.mainWorkspace.getCanvas().style.display = "inline";
      var $blockBox$$ = {x:Blockly.mainWorkspace.getCanvas().getBBox().x, y:Blockly.mainWorkspace.getCanvas().getBBox().y, width:Blockly.mainWorkspace.getCanvas().scrollWidth, height:Blockly.mainWorkspace.getCanvas().scrollHeight}
    }else {
      $blockBox$$ = Blockly.mainWorkspace.getCanvas().getBBox()
    }
  }catch($e$$) {
    return null
  }
  if(Blockly.mainWorkspace.scrollbar) {
    var $leftEdge$$ = Math.min($blockBox$$.x - $rightEdge$$1_viewWidth$$ / 2, $blockBox$$.x + $blockBox$$.width - $rightEdge$$1_viewWidth$$), $rightEdge$$1_viewWidth$$ = Math.max($blockBox$$.x + $blockBox$$.width + $rightEdge$$1_viewWidth$$ / 2, $blockBox$$.x + $rightEdge$$1_viewWidth$$), $topEdge$$ = Math.min($blockBox$$.y - $bottomEdge_viewHeight$$ / 2, $blockBox$$.y + $blockBox$$.height - $bottomEdge_viewHeight$$), $bottomEdge_viewHeight$$ = Math.max($blockBox$$.y + $blockBox$$.height + $bottomEdge_viewHeight$$ / 
    2, $blockBox$$.y + $bottomEdge_viewHeight$$)
  }else {
    $leftEdge$$ = $blockBox$$.x, $rightEdge$$1_viewWidth$$ = $leftEdge$$ + $blockBox$$.width, $topEdge$$ = $blockBox$$.y, $bottomEdge_viewHeight$$ = $topEdge$$ + $blockBox$$.height
  }
  return{viewHeight:$svgSize$$.height, viewWidth:$svgSize$$.width, contentHeight:$bottomEdge_viewHeight$$ - $topEdge$$, contentWidth:$rightEdge$$1_viewWidth$$ - $leftEdge$$, viewTop:-Blockly.mainWorkspace.scrollY, viewLeft:-Blockly.mainWorkspace.scrollX, contentTop:$topEdge$$, contentLeft:$leftEdge$$, absoluteTop:0, absoluteLeft:Blockly.RTL ? 0 : Blockly.Toolbox.width}
};
Blockly.setMainWorkspaceMetrics_ = function $Blockly$setMainWorkspaceMetrics_$($translation$$2_xyRatio$$) {
  if(!Blockly.mainWorkspace.scrollbar) {
    throw"Attempt to set main workspace scroll without scrollbars.";
  }
  var $metrics$$ = Blockly.getMainWorkspaceMetrics_();
  goog.isNumber($translation$$2_xyRatio$$.x) && (Blockly.mainWorkspace.scrollX = -$metrics$$.contentWidth * $translation$$2_xyRatio$$.x - $metrics$$.contentLeft);
  goog.isNumber($translation$$2_xyRatio$$.y) && (Blockly.mainWorkspace.scrollY = -$metrics$$.contentHeight * $translation$$2_xyRatio$$.y - $metrics$$.contentTop);
  $translation$$2_xyRatio$$ = "translate(" + (Blockly.mainWorkspace.scrollX + $metrics$$.absoluteLeft) + "," + (Blockly.mainWorkspace.scrollY + $metrics$$.absoluteTop) + ")";
  Blockly.mainWorkspace.getCanvas().setAttribute("transform", $translation$$2_xyRatio$$);
  Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform", $translation$$2_xyRatio$$)
};
Blockly.addChangeListener = function $Blockly$addChangeListener$($func$$) {
  return Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(), "blocklyWorkspaceChange", null, $func$$)
};
Blockly.removeChangeListener = function $Blockly$removeChangeListener$($bindData$$) {
  Blockly.unbindEvent_($bindData$$)
};

