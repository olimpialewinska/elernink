import { searchByName } from "../../utils/functions.js";
import { assert } from "chai";

describe("search utilities", function () {
  it("should return an empty array if no files are passed", function () {
    let result = searchByName("a", []);
    assert.equal(result.length, 0);
  });
  it("should return an empty array if no files match the search", function () {
    let files = [
      { id: "1", name: "hello", url: "a" },
      { id: "2", name: "hello world", url: "b" },
      { id: "3", name: "c", url: "c" },
    ];
    let result = searchByName("zz", files);
    assert.equal(result.length, 0);
  });

  it("should return array of resuts matching query", function () {
    let files = [
      { id: "1", name: "hello", url: "a" },
      { id: "2", name: "hello world", url: "b" },
      { id: "3", name: "c", url: "c" },
    ];
    let result = searchByName("ll", files);
    assert.equal(result.length, 2);
  });
});
