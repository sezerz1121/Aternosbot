import pkg from 'discord.js';
import puppeteer from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import dotenv from 'dotenv';
dotenv.config();

// Add Puppeteer Ad Blocker plugin
puppeteerExtra.use(AdblockerPlugin());
// Add Puppeteer Stealth plugin
puppeteerExtra.use(StealthPlugin());
const TOKEN = process.env.DISCORD_TOKEN;
var username = "ZSadwa";
var password = "n.85WpqgFasL*Yq";
var onlineStatus =false;
//functions 
const puppeteerOptions = {
    args: ['--no-sandbox'],
    headless: "new", // Set to true for headless mode
};

async function startServer(message, onlineStatus) {
    try {
        const browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();

        await page.goto('https://aternos.org/go/', { timeout: 60000 });
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        await page.type('.username', username);
        await page.type('.password', password);
        await page.click('.login-button');

        await page.waitForNavigation();
        await page.waitForTimeout(4000);

        await page.click('.servercard.offline');
        await page.waitForTimeout(4000);
        await page.click('#start');
        await page.waitForTimeout(2000);

        let status = '';

        while (true) {
            status = await page.evaluate(() => {
                const span = document.querySelector('.statuslabel-label');
                return span ? span.textContent.trim() : '';
            });

            if (status === 'Online') {
                message.channel.send('Online');
                onlineStatus = true;
                break;
            } else {
                message.channel.send('Starting');
                await page.waitForTimeout(15000);
            }
        }

        await browser.close();
        return onlineStatus;
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function stopServer(message, onlineStatus) {
    try {
        const browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();

        await page.goto('https://aternos.org/go/', { timeout: 60000 });

        await page.type('.username', username);
        await page.type('.password', password);
        await page.click('.login-button');

        await page.waitForNavigation();
        await page.waitForTimeout(4000);

        await page.click('.servercard.online');
        await page.waitForTimeout(4000);
        await page.click('#stop');
        await page.waitForTimeout(2000);

        onlineStatus = false;
        await browser.close();

        message.channel.send('Now server is offline');
    } catch (error) {
        console.error('Error occurred:', error.message);
    }

    return onlineStatus;
}

async function serverStatus(message) {
    try {
        const browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();

        await page.goto('https://aternos.org/go/', { timeout: 60000 });

        await page.type('.username', username);
        await page.type('.password', password);
        await page.click('.login-button');

        await page.waitForNavigation();
        await page.waitForTimeout(4000);

        let status = '';

        try {
            await page.click('.servercard.online');
        } catch (error) {
            try {
                await page.click('.servercard.offline');
            } catch (error) {
                try {
                    await page.click('.servercard.loading');
                } catch (error) {
                    console.error('Error clicking server card:', error.message);
                }
            }
        }

        await page.waitForTimeout(4000);
        await page.waitForSelector('.statuslabel-label');

        status = await page.evaluate(() => {
            const statusLabel = document.querySelector('.statuslabel-label');
            return statusLabel ? statusLabel.textContent.trim() : 'Status label not found';
        });

        await browser.close();

        message.channel.send('Server Status: ' + status);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function playerStatus(message) {
    try {
        const browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();

        await page.goto('https://aternos.org/go/', { timeout: 60000 });

        await page.type('.username', username);
        await page.type('.password', password);
        await page.click('.login-button');

        await page.waitForNavigation();
        await page.waitForTimeout(4000);

        let playerCount = '';

        try {
            await page.click('.servercard.online');
            await page.waitForSelector('.live-status-box-value.js-players');
            playerCount = await page.evaluate(() => {
                const playerCountElement = document.querySelector('.live-status-box-value.js-players');
                return playerCountElement ? playerCountElement.textContent.trim() : 'Player count not found';
            });
        } catch (error) {
            console.error('Error fetching player count:', error.message);
            playerCount = 'Player count not found';
        }

        await browser.close();

        message.channel.send('Player Count: ' + playerCount);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}




















  // function ends









































const { Client, GatewayIntentBits } = pkg;

// Create a new Discord client with intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        // Add other intents as needed
    ]
});

// Event listener for when the client is ready
client.once('ready', () => {
    console.log('Ready!');
});

// Event listener for when a message is received
client.on('messageCreate', message => {
    console.log('Message received:', message.content); // Log the received message content
    
    if (message.author.bot) return;

    if (message.content.startsWith('/Start')) {
        startServer(message,onlineStatus); // Log if the start command is detected
        message.channel.send('Starting server');
    }
    if (message.content.startsWith('/Stop')) {
        stopServer(message,onlineStatus); // Log if the start command is detected
        message.channel.send('Stoping server');
    }
    if (message.content.startsWith('/Status')) {
        serverStatus(message); // Log if the start command is detected
        message.channel.send('Showing Status');
    }
    if (message.content.startsWith('/Playeronline')) {
        playerStatus(message); // Log if the start command is detected
        message.channel.send('Online Player');
    }

    // Your bot logic goes here
    if (message.content === '!ping') {
        message.channel.send('Pong');
    }
});

// Debug statement to log bot login
client.on('debug', console.log);

// Login to Discord with your app's token
client.login(TOKEN);
