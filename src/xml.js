// Serializes an XML DOM node to a string.
exports.serialize = function(node) {
  var serializer = new XMLSerializer();
  return serializer.serializeToString(node);
};

exports.parseFromString = function(text, type) {
  if (typeof DOMParser !== 'undefined') {
    return new DOMParser().parseFromString(text, type);
  } else if (typeof ActiveXObject != 'undefined') {
    var doc = goog.dom.xml.createMsXmlDocument_();
    doc.loadXML(text);
    return doc;
  }
};

// Parses a single root element string.
exports.parseElement = function(text) {
  var dom = text.indexOf('<xml>') === 0 ?
      exports.parseFromString(text, 'text/xml') :
      exports.parseFromString('<xml>' + text + '</xml>', 'text/xml');
  var errors = dom.getElementsByTagName("parsererror");
  var element = dom.firstChild;
  if (!element) {
    throw new Error('Nothing parsed');
  }
  if (errors.length > 0) {
    throw new Error(exports.serialize(errors[0]));
  }
  if (element !== dom.lastChild) {
    throw new Error('Parsed multiple elements');
  }
  return element;
};
