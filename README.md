<p align="center">
  <img src="https://raw.githubusercontent.com/your-username/shelby-cli/main/assets/banner-top.png" width="100%" />
</p>

<h1 align="center">Shelby CLI Uploader</h1>

<p align="center">
A lightweight developer CLI for uploading images and documents with real-time progress tracking.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green" />
  <img src="https://img.shields.io/badge/TypeScript-CLI-blue" />
  <img src="https://img.shields.io/badge/Platform-Developer%20Tool-orange" />
  <img src="https://img.shields.io/badge/License-MIT-purple" />
</p>

---

# Shelby CLI Uploader

**Shelby CLI Uploader** is a lightweight command-line tool built with **Node.js and TypeScript** that allows developers to upload files directly from the terminal with real-time progress feedback.

This project demonstrates how to build a clean **developer CLI tool** including:

* file streaming uploads
* progress tracking in terminal
* batch folder uploads
* structured CLI commands

The tool is designed as a **developer demo project** and can easily be extended to support real storage systems such as decentralized or cloud storage services.

---

# Features

* Upload images or documents directly from the command line
* Upload entire folders in batch mode
* Real-time progress bar during uploads
* Upload speed calculation
* Clean CLI command structure
* Built with modern TypeScript

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/shelby-cli.git
cd shelby-cli
```

Install dependencies:

```bash
npm install
```

Run the CLI tool using:

```bash
npx ts-node src/index.ts
```

---

# CLI Commands

### Upload a file

```bash
npx ts-node src/index.ts upload photo.jpg
```

Example output:

```
Uploading: photo.jpg
Size: 9.42 KB

Upload |████████████████████| 100%
9645 / 9645 bytes
Speed: 117 KB/s

Upload completed successfully
```

---

### Upload a folder

Upload all files inside a directory.

```bash
npx ts-node src/index.ts upload-folder ./images
```

The CLI will automatically detect and upload each file sequentially.

---

### Verify command

```bash
npx ts-node src/index.ts verify
```

This command simulates a verification process for uploaded files.

In a real system this could verify:

* file hashes
* content identifiers
* storage integrity

---

# Project Structure

```
shelby-cli
│
├── src
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# Tech Stack

* Node.js
* TypeScript
* Commander (CLI framework)
* Axios (HTTP client)
* cli-progress (progress bar)
* Chalk (terminal styling)

---

# Example Upload Flow

```
User Terminal
      │
      │ upload photo.jpg
      ▼
Shelby CLI Tool
      │
      │ HTTP request
      ▼
Test Upload Endpoint
```

Currently the CLI uses a **test HTTP endpoint** for demonstration purposes.

This can later be extended to integrate with real storage APIs.

---

# Future Improvements

Possible future upgrades for this project:

* decentralized storage integration
* file CID verification
* parallel uploads
* retry system for failed uploads
* authentication support
* improved terminal UI

---

# License

MIT License

This project is open for experimentation, modification, and developer learning.

---

<p align="center">
Built with passion for developer tooling
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/your-username/shelby-cli/main/assets/banner-bottom.png" width="100%" />
</p>
