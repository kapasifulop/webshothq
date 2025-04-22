# WebShotHQ

A high-quality website screenshot tool with customizable viewport dimensions. Take perfect screenshots of any website with ease.

## Features

- Take full-page screenshots of any website
- Customize viewport width and height
- Automatically open screenshots after creation
- Interactive and command-line modes
- Supports custom viewport dimensions
- High-quality output

## Installation

1. Install from npm:
```bash
npm install -g webshothq
```

Or clone this repository and install dependencies:
```bash
git clone https://github.com/kapasifulop/webshothq.git
cd webshothq
npm install
```

## Usage

### Basic Usage
```bash
webshothq https://example.com
```
Or if installed locally:
```bash
node index.js https://example.com
```

### With Custom Width
```bash
webshothq https://example.com --width=1080
```

### With Custom Height
```bash
webshothq https://example.com --height=800
```

### With Both Dimensions
```bash
webshothq https://example.com --width=1080 --height=800
```

### Auto-open Screenshot
```bash
webshothq https://example.com --open
```

### Interactive Mode
```bash
webshothq
```

## Options

- `--width=<pixels>`: Set viewport width (default: 1920)
- `--height=<pixels>`: Set viewport height (uses full page height if not specified)
- `--open`: Automatically open the screenshot after creation

## Output

Screenshots are saved in the current directory with the filename derived from the URL.

## Requirements

- Node.js
- NPM
- Puppeteer (installed automatically with npm install)

## Author

Kapási Fülöp (fulop@larasoft.hu)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 