// https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/

exports.Tree = class Tree {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }

    static fromArray(array) {
        console.log("Tree.fromArray");
        console.log(array);
        if (array == null || array.length == 0) return null;
        const root = new Tree(array.shift());
        const queue = [root];

        for (let layer = 1; array.length > 0; layer++) {
            for (let i = 0; i < Math.pow(2, layer) / 2 && i < array.length; i++) {
                const parent = queue.shift();
                if (parent) {
                    const leftVal = array.shift();
                    const rightVal = array.shift();
                    parent.left = leftVal != undefined ? new Tree(leftVal) : null;
                    parent.right = rightVal != undefined ? new Tree(rightVal) : null;
                    queue.push(parent.left);
                    queue.push(parent.right);
                }
            }
        }
        return root;
    }

    static fromJson(json) {
        console.log(json);

        if (json.length == 0) {
            return null;
        }
        const array = JSON.parse(json);
        return Tree.fromArray(array);
    }

    toArray() {
        console.log(this);
        if (!this) return "";
        const output = [];
        const queue = [this];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node != undefined) {
                output.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            }
            else {
                output.push(null);
            }
        }
        while (output[output.length - 1] == undefined) {
            output.pop();
        }
        return output;
    }

    toJson() {
        return JSON.stringify(this.toArray());
    }
};
