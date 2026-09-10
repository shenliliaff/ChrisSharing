import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const readingDir = "docs/reading";
const publicReadingDir = "docs/.vuepress/public/reading";
const searchDir = "docs/_reading-search";

rmSync(publicReadingDir, { recursive: true, force: true });
cpSync(readingDir, publicReadingDir, { recursive: true });

rmSync(searchDir, { recursive: true, force: true });
mkdirSync(searchDir, { recursive: true });

for (const fileName of readdirSync(readingDir)) {
  if (!fileName.endsWith(".md") || fileName === "README.md" || fileName.startsWith("_")) continue;

  const sourcePath = join(readingDir, fileName);
  const source = readFileSync(sourcePath, "utf8");
  const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "");
  const permalink = `/reading-search/${basename(fileName, ".md")}.html`;

  writeFileSync(
    join(searchDir, fileName),
    `---\nindex: false\narticle: false\npermalink: ${permalink}\n---\n\n${content}`,
  );
}