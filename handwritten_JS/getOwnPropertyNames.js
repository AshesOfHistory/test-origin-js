if (typeof Object.getOwnPropertyNames !== 'function') {
  Object.getOwnPropertyNames = function(o) {
    if (o !== Object(o)) {
      throw TypeError('Object.getOwnPropertyNames called on non-object');
    }
    var props = [],
      p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        props.push(p);
      }
    }
    return props;
  };
}