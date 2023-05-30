import {
  sortArrayByProperty,
  sortArrayWithPredicate,
} from "../../utils/functions.js";
import { assert } from "chai";

const checkOrder = <T extends Record<string, any>>(
  arr: T[],
  prop: keyof T,
  orderArr: any[]
) => {
  for (let i = 0; i < arr.length; i++) {
    assert.equal(arr[i][prop], orderArr[i]);
  }
};

const fileList = [
  { id: 2, name: "b", url: "b" },
  { id: 3, name: "c", url: "c" },
  { id: 1, name: "a", url: "a" },
];

describe("sort utilities", function () {
  it("should sort arrays properly - by name, ascending", function () {
    checkOrder(sortArrayByProperty(fileList, "name", "asc"), "name", [
      "a",
      "b",
      "c",
    ]);
  });

  it("should sort arrays properly - by name, descending", function () {
    checkOrder(sortArrayByProperty(fileList, "name", "desc"), "name", [
      "c",
      "b",
      "a",
    ]);
  });

  it("should sort arrays properly - by id, ascending", function () {
    checkOrder(sortArrayByProperty(fileList, "id", "asc"), "id", [1, 2, 3]);
  });

  it("should sort arrays properly - by id, descending", function () {
    checkOrder(sortArrayByProperty(fileList, "id", "desc"), "id", [3, 2, 1]);
  });

  it("should sort arrays properly - with custom predicate, ascending", function () {
    checkOrder(
      sortArrayWithPredicate(fileList, "asc", (a, b) =>
        a.name.localeCompare(b.name)
      ),
      "name",
      ["a", "b", "c"]
    );
  });

  it("should sort arrays properly - with custom predicate, descending", function () {
    checkOrder(
      sortArrayWithPredicate(fileList, "desc", (a, b) =>
        a.name.localeCompare(b.name)
      ),
      "name",
      ["c", "b", "a"]
    );
  });
});
