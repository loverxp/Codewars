function ListNode(val) {
    this.val = val;
    this.next = null;
}

function arrayToList(array) {
    let list = new ListNode(0);
    array.reduce((a, b) => {
        a.next = new ListNode(b);
        return a.next;
    }, list);
    return list.next;
}

function listToArray(list) {
    const array = [];
    while (list) {
        array.push(list.val);
        list = list.next;
    }
    return array;
}

function test(fun, array, ...args) {
    console.time();

    // let lists = array.map(a => arrayToList(a));
    console.log(array);
    console.log(...args);

    let lists = arrayToList(array);

    console.log("result:");
    const result = fun(lists, ...args);
    console.log(listToArray(result));

    console.timeEnd();
}

module.exports = {
    ListNode: ListNode,
    arrayToList: arrayToList,
    listToArray: listToArray,
    test: test,
    logListAsArray: function (name, list) {
        if (name.length > 0) {
            console.log(name);
        }
        console.log(this.listToArray(list));
    }
}

function testLogList(root) {
    console.log(root);
    let node = root;
    while (node) {
        console.log("value:", node.val);
        node = node.next;
    }

}

// test(testLogList, [2, 3, 5, 6, 1, 3]);