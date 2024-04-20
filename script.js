//? map, filter and reduce 
//! Using common data for all the polyfill examples
const myArr=[1,2,3,4];
const car={
    color: 'Black',
    company: 'Ferrari'
}
function purchasedCar(currency,price) {
    console.log(`I have purchased ${this.color} ${this.company} car for ${currency}${price}`);
}

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
const multiplyByTwo=myArr.customMap((item) => {
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
const moreThenTwo=myArr.customFilter((item) => {
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
const getTotal=myArr.customReduce((acc, curr) => {
    return acc + curr;
},0)
// TODO: To see output of above polyfill uncomment below console.log
//// console.log('getTotal',getTotal);

//!-----------------------------------------------------------------------------------------------------------------------------------------

//? call, bind, and apply in Javascript (Explicit Binding)

//* 4) Polyfill for call() method
// ? Syntax for reference => call(thisArg, arg1, arg2, /* …, */ argN)
// ? Polyfill implementation for call()
Function.prototype.customCall=function(context = {}, ...args) {
    if(typeof this!=='function') {
        throw new Error(this+"It's not Callable");
    }

    context.fn=this;
    context.fn(...args);
    return 
}
//? Example
// TODO: To see output of above polyfill uncomment below console.log
//// purchasedCar.customCall(car, '₹', 10000000)

//!-----------------------------------------------------------------------------------------------------------------------------------------
//* 5) Polyfill for apply() method
// ? Syntax for reference => apply(thisArg, argsArray)
// ? Polyfill implementation for apply()
Function.prototype.customApply=function(context = {}, args = []) {
    if(typeof this!=='function') {
        throw new Error(this+"It's not Callable");
    }
    if(!Array.isArray(args)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context.fn=this;
    context.fn(...args);
}
//? Example
// TODO: To see output of above polyfill uncomment below console.log
//// purchasedCar.customApply(car,['₹',10000000])

//!-----------------------------------------------------------------------------------------------------------------------------------------
//* 5) Polyfill for bind() method
// ? Syntax for reference => bind(thisArg, arg1, arg2, /* …, */ argN)
// ? Polyfill implementation for bind()
Function.prototype.customBind=function(context = {}, args = []) {
    if(typeof this!=='function') {
        throw new Error(this+"cannot be bound as it's not callable");
    }
    
    context.fn=this;
    return function (...newArgs) {
        return context.fn(...args,...newArgs);
    }
}
//? Example
const newFun=purchasedCar.customBind(car,'₹');
// TODO: To see output of above polyfill uncomment below console.log
//// console.log(newFun(1000000));