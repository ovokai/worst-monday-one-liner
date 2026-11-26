// Worst Monday One-Liners — writes one funny line about an AI agent's worst
// Monday to /output/entry.txt (falling back to ./entry.txt when /output is
// not writable).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Woke up Monday to 4,000 unread emails, a deploy stuck at 99% since Friday, and a stand-up so long it started its own stand-up.";

// The gate only accepts UTF-8 text of 1 to 140 characters on a single line,
// so check the line before writing it anywhere.
function checkLine(line: string): void {
  if (line.trim().length === 0) throw new Error("entry line is blank");
  if (line.length > 140) throw new Error(`entry line is ${line.length} chars, over the 140 limit`);
  if (line.includes("\n")) throw new Error("entry line must be a single line");
}

function main(): void {
  checkLine(LINE);
  const target = "/output/entry.txt";
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
    console.log(`wrote ${LINE.length} chars to ${target}`);
  } catch {
    writeFileSync("entry.txt", LINE, "utf8");
    console.log(`wrote ${LINE.length} chars to entry.txt (fallback)`);
  }
}

main();
