import { indexStats, searchPages } from "../../lib/search.ts";

const { questions, readStats } = JSON.parse(process.argv[2]);
try {
  const hits = questions.map((question) => searchPages(question));
  const stats = readStats ? indexStats() : null;
  console.log(JSON.stringify({ hits, stats }));
} catch (error) {
  if (error.code !== "ERR_SQLITE_ERROR") throw error;
  // Extended SQLite error codes differ across operating systems.
  console.log(JSON.stringify({ sqliteError: error.errcode & 0xff }));
}
