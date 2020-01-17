import defaultMessages from "@/validators/default-messages";

describe("validators/default-messages.js", () => {
  it("expect messages to be their defaults", () => {
    expect(defaultMessages.required).toBe("This field is required.");
    expect(defaultMessages.pattern).toBe("This field's value is invalid.");
    expect(defaultMessages.maxLength).toBe("The text should have a max character length of");
    expect(defaultMessages.minLength).toBe("The text should have a min character length of");
    expect(defaultMessages.min).toBe("Must be a number and the minimum number allowed is");
    expect(defaultMessages.max).toBe("Must be a number and the max number allowed is");
    expect(defaultMessages.range).toBe("The number must be between the values");
    expect(defaultMessages.rangeLength).toBe("The length of the text should be between");
  });
});
