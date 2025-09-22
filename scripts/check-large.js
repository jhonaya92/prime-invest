const fs = require("fs");
const { execSync } = require("child_process");
const max = 100 * 1024 * 1024;
const lines = execSync("git ls-files -s").toString().trim().split("\n");
const files = lines.map((l) => l.split("\t")[1]).filter(Boolean);
for (const f of files) {
  try {
    const size = fs.statSync(f).size;
    if (size > max) {
      console.error(`? Arquivo grande detectado: ${f} (${size} bytes).`);
      process.exit(1);
    }
  } catch {}
}
console.log("? OK (sem arquivos >100MB).");
