import sum from "./index.js";
import test from "node:test";
import assert from "node:assert/strict";

test("typeof a !== 'number' || typeof b !== 'number'", () => {
    assert.equal(sum("4", 4), 0);
    assert.equal(sum(4, "4"), 0);
    assert.equal(sum("4", "4"), 0);
});

test("a < 0 || b < 0", () => {
    assert.equal(sum(-1, 1), 0);
    assert.equal(sum(1, -1), 0);
    assert.equal(sum(-1, -1), 0);
});

test("correct arguments", () => {
    assert.equal(sum(1, 3), 4);
    assert.equal(sum(3, 1), 4);
    assert.equal(sum(3, 3), 6);
})