'use strict';

(function dazeApiInitializer(){
  
  /* utilities
  */
  function fromDate(date){
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    
    return (year * 10000) + (month * 100) + date.getDate();
  }
  
  function getSet(set){
    
    if(typeof set === "undefined") return fromDate(new Date);
    
    // set = Date object
    if(set instanceof Date) return fromDate(set);
    
    // set = "December 17, 1995 03:24:00"
    // set = "1995-12-17T03:24:00"
    // set = "1995-12-17T03:24:00.418Z"
    if(typeof set === "string") return fromDate(new Date(set));
    
    if(typeof set !== "number") return false;
    
    // set = 20160403
    if(set.toString().length === 8) return set;
    
    // set = 1459716679548
    return fromDate(new Date(set));
  }
  
  function makeDate(set){
    
    if(typeof set !== "number") return false;
    
    set = set.toString();
    
    if(set.length !== 8) return false;
    
    var date = new Date();
    date.setFullYear(Number(set.substr(0,4)));
    date.setMonth(Number((set[4] === "0") ? set.substr(5,1) : set.substr(4,2)) - 1);
    date.setDate(Number((set[6] === "0") ? set.substr(7) : set.substr(6)));
    
    return date;
  }
  
  function getDayDifference(setA,setB){
    
    return Math.ceil((makeDate(setA).getTime() - makeDate(setB).getTime()) / (1000 * 60 * 60 * 24));
  }
  
  /* daze API
  */
  function dazeApi(set){
    
    if(!(this instanceof dazeApi)) return new dazeApi(set);
    
    this.set = getSet(set);
  }
  
  dazeApi.prototype.toDaze = function(){
    
    if(typeof this.set !== "number") return false;
    
    return this.set;
  };
  
  dazeApi.prototype.toDate = function(){
    
    if(typeof this.set !== "number") return false;
    
    return makeDate(this.set);
  };
  
  dazeApi.prototype.late = function(set){
    
    if(typeof this.set !== "number") return false;
    
    set = getSet(set);
    
    if(typeof set !== "number") return false;
    
    return (this.set >= set);
  };
  
  dazeApi.prototype.past = function(set){
    
    if(typeof this.set !== "number") return false;
    
    set = getSet(set);
    
    if(typeof set !== "number") return false;
    
    return getDayDifference(this.set,set);
  };
  
  dazeApi.prototype.until = function(set){
    
    if(typeof this.set !== "number") return false;
    
    set = getSet(set);
    
    if(typeof set !== "number") return false;
    
    return getDayDifference(set,this.set);
  };
  
  dazeApi.prototype.greater = function(set){
    
    if(typeof this.set !== "number") return false;
    
    set = getSet(set);
    
    if(typeof set !== "number") return false;
    
    return (this.set > set);
  };
  
  dazeApi.prototype.lesser = function(set){
    
    if(typeof this.set !== "number") return false;
    
    set = getSet(set);
    
    if(typeof set !== "number") return false;
    
    return (this.set < set);
  };
  
  /* export and finish
  */
  function daze(set){ return dazeApi(set); }
  
  if(
    typeof module !== "undefined"
    &&
    typeof module.exports === "object"
  ){
    
    module.exports = daze;
  }
  else if(
    typeof exports === "object"
  ){
    
    exports = daze;
  }
  else if(
    typeof Date.daze === "undefined"
  ){
    
    Date.daze = daze;
  }
})();

