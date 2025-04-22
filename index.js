#!/usr/bin/env node

const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function takeScreenshot(url, options = {}) {
    console.log('Taking screenshot...');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        // Set initial viewport size with custom or default values
        await page.setViewport({
            width: options.width || 1920,
            height: options.height || 1080,
            deviceScaleFactor: 1,
        });

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        // Wait for all content to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // If no height is specified, use the full page height
        if (!options.height) {
            const height = await page.evaluate(() => {
                return Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                );
            });
            await page.setViewport({
                width: options.width || 1920,
                height: height,
                deviceScaleFactor: 1,
            });
        }
        
        let filename = url.split('/').pop();
        // Take the screenshot
        const screenshot = await page.screenshot({
            fullPage: !options.height, // Only take full page screenshot if no fixed height is set
            path: `${filename}.png`
        });
        
        console.log(`Screenshot saved successfully: ${filename}.png`);
        
        if (options.open) {
            console.log('Opening screenshot...');
            const open = await import('open');
            await open.default(`${filename}.png`);
        }
    } catch (error) {
        console.error('Error while taking screenshot:', error);
    } finally {
        await browser.close();
    }
}

// Process command line arguments
const args = process.argv.slice(2);
const options = {
    open: args.includes('--open'),
    width: null,
    height: null
};

// Extract width and height values
const widthArg = args.find(arg => arg.startsWith('--width='));
if (widthArg) {
    options.width = parseInt(widthArg.split('=')[1]);
}

const heightArg = args.find(arg => arg.startsWith('--height='));
if (heightArg) {
    options.height = parseInt(heightArg.split('=')[1]);
}

// Find URL (first argument that doesn't start with --)
const url = args.find(arg => !arg.startsWith('--'));

if (url) {
    takeScreenshot(url, options).then(() => {
        process.exit(0);
    });
} else {
    rl.question('Please enter the URL to screenshot: ', (url) => {
        takeScreenshot(url, options).then(() => {
            rl.close();
        });
    });
} 