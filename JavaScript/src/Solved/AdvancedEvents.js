// https://www.codewars.com/kata/52d4678038644497e900007c/solutions/javascript
function Event() {
    let fs = [];
    this.subscribe = function(){

        console.log("subscribe:");
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
        args.forEach(f => {
            if(f instanceof Function){
                fs.push(f);
            }
        });
    }

    this.unsubscribe = function(){
        console.log("unsubscribe:");
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
        args.reverse().forEach(f =>{
            const i = fs.lastIndexOf(f);
            if (i !== -1) {
                fs.splice(i, 1);
            }
        });
    }

    this.emit = function(){
        console.log("emit");
        const t = [].concat(fs);
        t.forEach(f => {
            f.apply(this,arguments);
        });
    }
}

function f() {
    f.calls = (f.calls || 0) + 1;
    f.args = Array.prototype.slice.call(arguments);
    console.log(`   f.args: ${Array.prototype.slice.call(arguments)}`);
    console.log(`   f.args: ${f.args}`);
}

function f1(){
    console.log("f1");
    console.log(arguments);
}

function f2(){
    console.log("f2");
    console.log(arguments);
}

function f3(){
    console.log("f3");
    console.log(arguments);
}

function f4(){
    console.log("f4");
    console.log(arguments);
}

// const event = new Event();
// event.subscribe(f);
// event.show();
// event.emit(1, 2, 3, "abc");
// event.emit(2);

// console.log(`event.f.calls: ${event.f.calls}`);

// event.unsubscribe(f);
// event.emit(1, 2, 3, "abc");
// console.log(`event.f.calls: ${event.f.calls}`);

// f2("abc");
// console.log([1,2,3]);

// event.subscribe(f);
// event.emit(1, 2, 3, "abc");
// console.log(fs);

// event.subscribe(f1,f2,f3,f4);
// event.emit();

// event.test(1,2,3);

function Construct(){
    this.f1 = () => {
        console.log("f1");
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
    }

    this.f2 = function(){
        console.log("f2");
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
    }
}

var o = new Construct();
// o.f1(1,2,3);
// o.f2(1,2,3);

function fFactory(e,name){
    function f() {
        console.log(name);
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
        e.subscribe(fFactory(e,"second"));
    }
    return f;
}

var e = new Event();

// e.subscribe(function () {
    // console.log('first');
    // e.subscribe(function() {console.log('second'); });
// });
// e.emit();
// e.emit();
e.subscribe(fFactory(e,"first"));
e.emit(1,2);
e.emit(3,4,5);


