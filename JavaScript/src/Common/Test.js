exports.test = function (fun, ...args) {
    // console.log("fun:",);
    console.log("test", fun);
    console.log("args:", args);

    console.time();
    const result = fun(...args);
    console.log("result:");
    console.log(result);
    console.timeEnd();
    console.log("\n");
};

exports.Test = class {
    timeLabel = "time";
    // logArgs = true;
    // logResult = true;
    argsLogger;
    resultLogger;

    constructor(fun, ...args) {
        this.fun = fun;
        this.args = args;
        this.logArgs = true;
        this.logResult = true;
    }

    do() {
        console.log("test", this.fun);
        if (this.logArgs) {
            console.log("args:");
            if (this.argsLogger) {
                this.argsLogger(this.args);
            }
            else {
                console.log(this.args);
            }
        }

        console.time(this.timeLabel);
        const result = this.fun(...this.args);
        if (this.logResult) {
            console.log("result:");
            if (this.resultLogger) {
                this.resultLogger(result);
            }
            else {
                console.log(result);
            }
        }
        console.timeEnd(this.timeLabel);
        console.log("\n");
    }
}