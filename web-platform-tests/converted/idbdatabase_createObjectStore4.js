require("../../build/global");
const Event = require("../../build/lib/FakeEvent").default;
const {
    add_completion_callback,
    assert_array_equals,
    assert_equals,
    assert_false,
    assert_not_equals,
    assert_throws,
    assert_true,
    async_test,
    createdb,
    createdb_for_multiple_tests,
    fail,
    format_value,
    indexeddb_test,
    setup,
    test,
} = require("../support-node");

const document = {};
const window = global;



var t = async_test(),
    open_rq = createdb(t)

open_rq.onupgradeneeded = function(e) {
    var db = e.target.result
    db.createObjectStore("dupe")
    assert_throws(
        'ConstraintError',
        function() { db.createObjectStore("dupe") })

    // Bonus test creating a new objectstore after the exception
    db.createObjectStore("dupe ")
    t.done()
}

