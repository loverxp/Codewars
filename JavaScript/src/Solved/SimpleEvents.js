// https://www.codewars.com/kata/52d3b68215be7c2d5300022f/solutions/javascript
class Event {
    constructor(){
        this.fs = [];
    }

    subscribe(f) {
        console.log("subscribe:");
        console.log(f);
        this.fs.push(f);
    }

    unsubscribe(f) {
        console.log("unsubscribe:");
        console.log(f);
        const i = this.fs.indexOf(f);
        if(i !== -1){
            this.fs.splice(i,1);
        }
    }

    emit() {
        console.log("emit");
        this.fs.forEach(f => {
            f.apply(null,arguments);
        });
    }
}

function f() {
    f.calls = (f.calls || 0) + 1;
    f.args = Array.prototype.slice.call(arguments);
    console.log(`   f.args: ${Array.prototype.slice.call(arguments)}`);
    console.log(`   f.args: ${f.args}`);
}

function f2(){
    console.log("f2");
    console.log(arguments);
}

const event = new Event();
event.subscribe(f);
event.show();
// event.emit(1, 2, 3, "abc");
// event.emit(2);

// console.log(`event.f.calls: ${event.f.calls}`);

event.unsubscribe(f);
// event.emit(1, 2, 3, "abc");
// console.log(`event.f.calls: ${event.f.calls}`);

// f2("abc");
console.log([1,2,3]);

event.subscribe(f);
// event.emit(1, 2, 3, "abc");