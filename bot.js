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
<<<<<<< HEAD
async function startServer(message, onlineStatus) {
    try {
        // Launch the browser and open a new blank page
       const browser = await puppeteer.launch({
            args: [
            "-disable-setuid-sandbox",
            "-no-sandbox",
            "-single-process",
            "-no-zygote",
            headless: "new",
            executablePath:
            process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PAT
            : puppeteer.executablePath(),
                
            });
        
        const page = await browser.newPage();
=======
>>>>>>> 079f1a6166554246adafad1b5c1af5c71e02b7a7


<<<<<<< HEAD
        // Fill in the username and password fields
       await page.waitForSelector('.username');
        await page.type('.username', username);
        await page.waitForSelector('.password');
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
            } else if(status === 'Online') {
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
    
  
    const browser = await puppeteerExtra.launch({
         args: ['--no-sandbox'],
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
    
  
    const browser = await puppeteerExtra.launch({
=======
async function startServer(message,onlineStatus) {
    const browser = await puppeteerExtra.launch({
>>>>>>> 079f1a6166554246adafad1b5c1af5c71e02b7a7
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


      
      await page.waitForTimeout(3000);
      await page.waitForSelector('#start');
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
  
  async function stopServer(message,onlineStatus) {
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
<<<<<<< HEAD

  async function playerStatus(message) {
    
=======
>>>>>>> 079f1a6166554246adafad1b5c1af5c71e02b7a7
  
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


async function playerNames(message) {

  const browser = await puppeteerExtra.launch({
    args: ['--no-sandbox'],
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();

  try {
    // Navigate to the page
    await page.goto('https://aternos.org/go/');
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
    
    // Click on the navigation toggle icon to toggle the navigation menu
    await page.click('i.fas.fa-bars');

    // Wait for the navigation menu animation to complete
    await page.waitForTimeout(1000); // Adjust the timeout as needed

    // Get the navigation menu element
    const navigationElement = await page.$('.navigation');
    if (!navigationElement) {
      throw new Error('Navigation menu element not found');
    }

    // Get the style of the navigation menu
    const navigationStyle = await page.evaluate(element => {
      return window.getComputedStyle(element).getPropertyValue('left');
    }, navigationElement);

    // Check if the navigation menu is expanded (left: 0px) or collapsed (left: -200px)
    if (navigationStyle === '0px') {
      // If expanded, click on the "Players" link
      await page.click('a[href="/players/"].item');
    } else {
      // If collapsed, click on the navigation toggle icon again to expand the menu
      await page.click('i.fas.fa-bars');
      await page.waitForTimeout(1000); // Adjust the timeout as needed

      // Click on the "Players" link after the menu is expanded
      await page.click('a[href="/players/"].item');
    }

    // Wait for the player card list to be visible
    await page.waitForSelector('.playercardlist.online');

    // Extract the player names
    const playerNames = await page.evaluate(() => {
      const playerCards = document.querySelectorAll('.playercardlist.online .player-name');
      return Array.from(playerCards).map(card => card.textContent.trim());
    });

    // Log the player names
    message.channel.send('Online Players:'+ playerNames.join(', '));
  } catch (error) {
    console.error('Error:', error);
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
    if (message.content.startsWith('/Playernames')) {
        playerNames(message); // Log if the start command is detected
        message.channel.send('Online Player Names');
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
