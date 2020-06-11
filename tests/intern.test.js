const Intern = require("../lib/intern.js");

test("Can set school via constructor", () => {
  const testValue = "UF";
  const e = new Intern("Tyler", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Tyler", 1, "test@test.com", "UF");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UF";
  const e = new Intern("Tyler", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});