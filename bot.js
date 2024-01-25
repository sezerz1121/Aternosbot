import pkg from 'discord.js';
import puppeteer from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

// Add Puppeteer Ad Blocker plugin
puppeteerExtra.use(AdblockerPlugin());
// Add Puppeteer Stealth plugin
puppeteerExtra.use(StealthPlugin());

var username = "ZSadwa";
var password = "n.85WpqgFasL*Yq";
var onlineStatus =false;
//functions 
async function startServer(message, onlineStatus) {
    try {
        // Launch the browser and open a new blank page
        const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
        const browser = await puppeteerExtra.launch({
            executablePath: chromePath,
            // Set to true for headless mode
            headless: "new",
        });
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto('https://aternos.org/go/');

        // Fill in the username and password fields
        await page.type('.username', username);
        await page.type('.password', password);

        // Click the login button (if there's a specific button element)
        await page.click('.login-button');

        // Wait for the login to complete
        await page.waitForNavigation();
        await page.waitForTimeout(4000);

        // Click the "start" button
        await page.click('.servercard.offline');
        await page.waitForTimeout(4000);
        await page.click('#start');
        await page.waitForTimeout(2000);

        let status = '';

        // Infinite loop to continuously check the status
        while (true) {
            status = await page.evaluate(() => {
                const span = document.querySelector('.statuslabel-label');
                return span ? span.textContent.trim() : '';
            });

            if (status === 'Online') {
                // Log "Online" message to Discord
                message.channel.send('Online');
                onlineStatus = true;
                break; // Exit the loop once status is "Online"
            } else {
                // Log "Status is not 'Online' yet. Retrying..." message to Discord
                message.channel.send('Starting');
                await page.waitForTimeout(15000); // Wait for 15 seconds before retrying
            }
        }

        // Close the browser
        await browser.close();
        return onlineStatus;
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function stopServer(message,onlineStatus)  {
    // Launch the browser and open a new blank page
    const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  
    const browser = await puppeteerExtra.launch({
      executablePath: chromePath,
       // Set to true for headless mode
       headless: "new",
    });
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('https://aternos.org/go/');
  
    // Fill in the username and password fields
    await page.type('.username', username);
    await page.type('.password', password);
  
    // Click the login button (if there's a specific button element)
    await page.click('.login-button');
    
    // Wait for the login to complete (you might need to adjust the waiting time)
    await page.waitForNavigation();
    await page.waitForTimeout(4000);
    await page.click('.servercard.online');
    await page.waitForTimeout(4000);
    await page.click('#stop');
    await page.waitForTimeout(2000);
    onlineStatus=false;
    
    await browser.close();
    message.channel.send('Now server is offline');
    return onlineStatus;
      
  };

  async function serverStatus(message) {
    const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  
    const browser = await puppeteerExtra.launch({
      executablePath: chromePath,
      headless: "new",
    });
    const page = await browser.newPage();
  
    try {
      // Navigate the page to a URL
      await page.goto('https://aternos.org/go/');
  
      // Fill in the username and password fields
      await page.type('.username', username);
      await page.type('.password', password);
  
      // Click the login button (if there's a specific button element)
      await page.click('.login-button');
  
      // Wait for the login to complete
      await page.waitForNavigation();
      await page.waitForTimeout(4000);
  
      // Click the server card (handle different scenarios)
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
  
      // Wait for the status label to be present
      await page.waitForSelector('.statuslabel-label');
  
      // Get the text content of the status label
      const status = await page.evaluate(() => {
        const statusLabel = document.querySelector('.statuslabel-label');
        return statusLabel ? statusLabel.textContent.trim() : 'Status label not found';
      });
  
      message.channel.send('Server Status:'+ status);
    } catch (error) {
      console.error('Error navigating or fetching server status:', error.message);
    } finally {
      // Close the browser
      await browser.close();
    }
  }

  async function playerStatus(message) {
    const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  
    const browser = await puppeteerExtra.launch({
      executablePath: chromePath,
      headless: "new",
    });
    const page = await browser.newPage();
  
    try {
      // Navigate the page to a URL
      await page.goto('https://aternos.org/go/');
  
      // Fill in the username and password fields
      await page.type('.username', username);
      await page.type('.password', password);
  
      // Click the login button (if there's a specific button element)
      await page.click('.login-button');
  
      // Wait for the login to complete
      await page.waitForNavigation();
      await page.waitForTimeout(4000);
  
      // Click the server card (handle different scenarios)
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
  
      
  
      // Wait for the player count element to be present
      await page.waitForSelector('.live-status-box-value.js-players');
  
      // Get the text content of the player count
      const playerCount = await page.evaluate(() => {
        const playerCountElement = document.querySelector('.live-status-box-value.js-players');
        return playerCountElement ? playerCountElement.textContent.trim() : 'Player count not found';
      });
  
      message.channel.send('Player Count:'+playerCount);
    } catch (error) {
      console.error('Error navigating or fetching server status:', error.message);
    } finally {
      // Close the browser
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
        message.channel.send('Pong!');
    }
});

// Debug statement to log bot login
client.on('debug', console.log);

// Login to Discord with your app's token
client.login('MTEzODMzNDExMzA2NjEzOTcyOQ.G9LPLx.KfRLnXs8Osox8fLzuGR_kMEHyQF72iiV3hpkWw');
