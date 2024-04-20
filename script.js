//? map, filter and reduce 
//! Using common array for all the polyfill examples
const arr=[1,2,3,4];

//!-----------------------------------------------------------------------------------------------------------------------------------------
//* 1) Polyfill for map()
// ? Syntax for reference => Array.map((item,index,Array) => {});
// ? Polyfill implementation for Array.map()
Array.prototype.customMap=function(cb) {
    const mapTemp=[];
    for (let index = 0; index < this.length; index++) {
        mapTemp.push(cb(this[index],index,this));
    }
    
    return mapTemp;
}
//* Example
const multiplyByTwo=arr.customMap((item) => {
    return item*2;
})
// TODO: To see output of above polyfill uncomment below console.log
////console.log('multiplyByTwo',multiplyByTwo);

//!-----------------------------------------------------------------------------------------------------------------------------------------
//* 2) Polyfill for filter()
// ? Syntax for reference => Array.filter((item, index, Array) => {});
// ? Polyfill implementation for Array.filter()
Array.prototype.customFilter=function(cb) {
    const filterTemp=[];
    for(let index=0;index<this.length;index++) {
        if(cb(this[index],index,this)) filterTemp.push(this[index]);
    }
    
    return filterTemp;
}
//? Example
const moreThenTwo=arr.customFilter((item) => {
    return item > 2;
})
// TODO: To see output of above polyfill uncomment below console.log
//// console.log('moreThenTwo',moreThenTwo);

//!-----------------------------------------------------------------------------------------------------------------------------------------
//* 3) Polyfill for reduce()
// ? Syntax for reference => Array.reduce((accumulator,current,index,array) => {},initialValue);
// ? Polyfill implementation for Array.reduce()
Array.prototype.customReduce=function(cb, initialValue) {
    let accumulator=initialValue;
    
    for(let index=0;index<this.length;index++) {
        accumulator=accumulator? cb(accumulator,this[index],index,this):this[index];
    }
    
    return accumulator;
}
//? Example
const getTotal=arr.customReduce((acc, curr) => {
    return acc + curr;
},0)
// TODO: To see output of above polyfill uncomment below console.log
//// console.log('getTotal',getTotal);

//!-----------------------------------------------------------------------------------------------------------------------------------------
