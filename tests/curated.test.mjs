import assert from "node:assert/strict";
import { after, test } from "node:test";
import { ANSWERS, ANSWER_MAP } from "../lib/answers.ts";
import { curatedAnswer, retrieve } from "../lib/ask.ts";
import { SOURCES } from "../lib/sources.ts";
import { followUp, negatives, positives } from "./fixtures/questions.mjs";
import { knownDefect } from "./support/known-defect.mjs";

for (const { question, answerId, sourceIds } of positives) {
  test(`curated answers ${question}`, () => {
    assert.equal(retrieve(question)[0]?.entry.id, answerId);
    assertCuratedAnswer(question, "", answerId, sourceIds);
  });
}

test("curated answer uses prior topic for a contextual follow-up", () => {
  const { question, context, answerId, sourceIds } = followUp;
  assert.equal(curatedAnswer(question).confident, false);
  assertCuratedAnswer(question, context, answerId, sourceIds);
});

function assertCuratedAnswer(question, context, answerId, sourceIds) {
  const result = curatedAnswer(question, context);
  assert.equal(result.mode, "curated");
  assert.equal(result.confident, true);
  assert.equal(result.answer, ANSWER_MAP.get(answerId).answer);
  assert.deepEqual(result.sources.map(({ id }) => id), sourceIds);
}

function confidentAnswerId(question) {
  const result = curatedAnswer(question);
  assert.equal(result.mode, "curated");
  assert.equal(typeof result.confident, "boolean");
  if (!result.confident) return null;
  const answer = ANSWERS.find((entry) => entry.answer === result.answer);
  assert.ok(answer, "A confident answer must resolve to a curated entry");
  return answer.id;
}

for (const { question, answerId, defectId, baseline } of negatives) {
  const name = `curated abstains on ${question}`;
  if (defectId) {
    knownDefect(defectId, name, answerId, baseline, () => confidentAnswerId(question));
  } else {
    test(name, () => {
      assert.equal(confidentAnswerId(question), answerId);
      assert.deepEqual(curatedAnswer(question).sources.map(({ id }) => id), [
        "egov-home", "egov-services", "nigeria-gov",
      ]);
    });
  }
}

after((context) => {
  const correct = positives.filter(({ question, answerId }) =>
    retrieve(question)[0]?.entry.id === answerId).length;
  const falseConfidence = negatives.filter(({ question }) => curatedAnswer(question).confident).length;
  const total = positives.length + negatives.length + 1;
  context.diagnostic(`Curated top-1: ${correct}/${positives.length}. False confidence: ${falseConfidence}/${negatives.length}. Total cases: ${total}.`);
});

test("curated source IDs are unique and every curated reference resolves", () => {
  const ids = new Set(SOURCES.map(({ id }) => id));
  assert.equal(ids.size, SOURCES.length);
  for (const answer of ANSWERS) {
    assert.equal(new Set(answer.sourceIds).size, answer.sourceIds.length, answer.id);
    for (const id of answer.sourceIds) assert.ok(ids.has(id), `${answer.id} cites unknown ID ${id}`);
  }
});
