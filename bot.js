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


async function startServer(onlineStatus, message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: "new",
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto('https://aternos.org/go/');
      await page.waitForSelector('.username');
  
      await page.type('.username', username);
      await page.type('.password', password);
      await page.click('.login-button');
  
      await page.waitForNavigation();
      await page.waitForSelector('.servercard.offline');
      await page.click('.servercard.offline');
      await page.waitForTimeout(2000);
      await page.click('#start');
  
      let status = '';
      while (true) {
        await page.waitForTimeout(15000);
        status = await page.evaluate(() => document.querySelector('.statuslabel-label')?.textContent.trim());
        if (status === 'Online') {
          message.channel.send('Server is online.');
          onlineStatus = true;
          break;
        } else {
          message.channel.send('Waiting for the server to start...');
        }
      }
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
      return onlineStatus;
    }
  }
  
  async function stopServer(onlineStatus, message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: "new",
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto('https://aternos.org/go/');
      await page.waitForSelector('.username');
  
      await page.type('.username', username);
      await page.type('.password', password);
      await page.click('.login-button');
  
      await page.waitForNavigation();
      await page.waitForSelector('.servercard.online');
      await page.click('.servercard.online');
      await page.waitForTimeout(2000);
      await page.click('#stop');
  
      onlineStatus = false;
      message.channel.send('Server is stopped.');
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
      return onlineStatus;
    }
  }
  
  async function restartServer(onlineStatus, message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: true,
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto('https://aternos.org/go/');
      await page.waitForSelector('.username');
  
      await page.type('.username', username);
      await page.type('.password', password);
      await page.click('.login-button');
  
      await page.waitForNavigation();
      await page.waitForSelector('.servercard.online');
      await page.click('.servercard.online');
      await page.waitForTimeout(2000);
      await page.click('#restart');
  
      onlineStatus = true;
      message.channel.send('Server is restarted.');
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
      return onlineStatus;
    }
  }
  
  async function serverStatus(message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: "new",
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto('https://aternos.org/go/');
      await page.waitForSelector('.username');
  
      await page.type('.username', username);
      await page.type('.password', password);
      await page.click('.login-button');
  
      await page.waitForNavigation();
      await page.waitForSelector('.servercard');
  
      const status = await page.evaluate(() => document.querySelector('.statuslabel-label')?.textContent.trim());
      message.channel.send('Server Status: ' + (status || 'Status label not found'));
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
    }
  }
  
  async function playerStatus(message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: "new",
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto('https://aternos.org/go/');
      await page.waitForSelector('.username');
  
      await page.type('.username', username);
      await page.type('.password', password);
      await page.click('.login-button');
  
      await page.waitForNavigation();
      await page.waitForSelector('.servercard');
  
      const playerCount = await page.evaluate(() => document.querySelector('.live-status-box-value.js-players')?.textContent.trim());
      message.channel.send('Player Count: ' + (playerCount || 'Player count not found'));
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
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
