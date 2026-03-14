#!/usr/bin/env node

import { program } from "commander";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import cliProgress from "cli-progress";
import chalk from "chalk";

const ENDPOINT = "https://httpbin.org/post";

/* Format file size */
function formatBytes(bytes: number) {

if (bytes < 1024) return bytes + " B";

if (bytes < 1024 * 1024)
return (bytes / 1024).toFixed(2) + " KB";

if (bytes < 1024 * 1024 * 1024)
return (bytes / 1024 / 1024).toFixed(2) + " MB";

return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

}

/* Upload single file */
async function uploadFile(filePath: string) {

if (!fs.existsSync(filePath)) {
console.log(chalk.red("❌ File not found:"), filePath);
return;
}

const stat = fs.statSync(filePath);

if (stat.isDirectory()) {
console.log(chalk.red("❌ Path is a folder. Use upload-folder instead."));
return;
}

const fileSize = stat.size;

console.log(chalk.cyan("\n📤 Uploading:"), filePath);
console.log(chalk.yellow("📦 Size:"), formatBytes(fileSize));

const bar = new cliProgress.SingleBar({

format:
"Upload |{bar}| {percentage}% | {value}/{total} bytes | Speed:{speed}",

barCompleteChar: "█",
barIncompleteChar: "░",
hideCursor: true

});

bar.start(fileSize, 0, { speed: "0 B/s" });

const start = Date.now();
let uploadedBytes = 0;

const stream = fs.createReadStream(filePath);

stream.on("data", (chunk) => {

uploadedBytes += chunk.length;

const elapsed = (Date.now() - start) / 1000 || 1;
const speed = formatBytes(uploadedBytes / elapsed) + "/s";

bar.increment(chunk.length, { speed });

});

const form = new FormData();
form.append("file", stream);

try {

const res = await axios.post(
ENDPOINT,
form,
{ headers: form.getHeaders() }
);

bar.stop();

console.log(chalk.green("\n✅ Upload completed successfully\n"));

console.log(chalk.gray("Server response:"));
console.log(res.data);

} catch (err: any) {

bar.stop();

console.log(chalk.red("\n❌ Upload failed"));

if (err.response) {

console.log("Status:", err.response.status);
console.log(err.response.data);

} else {

console.log(err.message);

}

}

}

/* Upload folder */
async function uploadFolder(folderPath: string) {

if (!fs.existsSync(folderPath)) {
console.log(chalk.red("❌ Folder not found"));
return;
}

const files = fs.readdirSync(folderPath);

console.log(chalk.cyan("\n📁 Upload folder:"), folderPath);

for (const file of files) {

const fullPath = path.join(folderPath, file);
const stat = fs.statSync(fullPath);

if (stat.isFile()) {
await uploadFile(fullPath);
}

}

console.log(chalk.green("\n✅ Folder upload completed"));

}

/* Verify placeholder */
function verify() {

console.log(chalk.blue("\n🔎 Verify feature"));
console.log("This would check file hashes / CID in real storage.");

}

/* CLI commands */

program
.command("upload")
.argument("<file>")
.description("Upload image or document")
.action(uploadFile);

program
.command("upload-folder")
.argument("<folder>")
.description("Upload all files in folder")
.action(uploadFolder);

program
.command("verify")
.description("Verify uploaded files")
.action(verify);

program.parse();