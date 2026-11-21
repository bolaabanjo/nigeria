import assert from "node:assert/strict";
import { test } from "node:test";
import { isDeepStrictEqual } from "node:util";

export function knownDefect(id, name, expected, baseline, observe) {
  let failure;
  test(`[${id}] ${name}`, {
    expectFailure: {
      label: "documented baseline defect",
      match: (error) =>
        failure !== undefined &&
        error === failure &&
        isDeepStrictEqual(error.actual, baseline),
    },
  }, async (context) => {
    const actual = await observe(context);
    try {
      assert.deepEqual(actual, expected);
    } catch (error) {
      failure = error;
      throw error;
    }
  });
}
