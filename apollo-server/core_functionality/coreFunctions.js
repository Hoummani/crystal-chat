function comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.value == current.value && other.display == current.display
      }).length == 0;
    }
}
exports.comparer = comparer;