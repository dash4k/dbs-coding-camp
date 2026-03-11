import { sum } from "./index.js";
import test from "node:test";
import assert from "node:assert/strict";

test("positive integer addition test", () => {
    assert.equal(sum(1, 3), 4);
    assert.equal(sum(2, 3), 5);
});

test("negative integer addition test", () => {
    assert.equal(sum(-1, 3), 2);
    assert.equal(sum(2, -3), -1);
    assert.equal(sum(-2, -3), -5);
});