
exports.methodLog = function (str = "") {
    return function (target, propertyKey, descriptor) {
        // console.log(target.toString());    // will print all code of the class of target
        // console.log(target.prototype);        // will print "Interpreter {}" 
        // console.log(target.prototype.toString());    
        let method = descriptor.value;
        descriptor.value = function () {
            if (str.length > 0) {
                console.log(str);
            }
            console.log(`method: ${getClassName(target)} ${propertyKey}`)
            console.log({ args: arguments });
            let result = method.apply(this, arguments);
            if (result) {
                console.log({ result: result });
            }
            return result;
        }
    }
};