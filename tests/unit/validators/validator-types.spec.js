import validatorTypes from "@/validators/validator-types";

describe("validators/validator-types.js", () => {
  it("expect validator types to be their defaults", () => {
    expect(validatorTypes.REQUIRED).toBe("required");
    expect(validatorTypes.PATTERN).toBe("pattern");
    expect(validatorTypes.MAX_LENGTH).toBe("maxLength");
    expect(validatorTypes.MIN_LENGTH).toBe("minLength");
    expect(validatorTypes.MIN).toBe("min");
    expect(validatorTypes.MAX).toBe("max");
    expect(validatorTypes.RANGE_LENGTH).toBe("rangeLength");
    expect(validatorTypes.RANGE).toBe("range");
  });
});
