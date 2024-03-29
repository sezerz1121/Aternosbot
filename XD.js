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
async function startServer(onlineStatus, message) {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: false,
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
      await page.waitForSelector('.btn.btn-white.CspDLDFOEQRw');
      await page.click('.btn.btn-white.CspDLDFOEQRw');
      await page.waitForTimeout(5000);
      await page.waitForSelector('#start');
      await page.click('#start');
  
      let status = '';
      while (true) {
        await page.waitForTimeout(15000);
        status = await page.evaluate(() => document.querySelector('.statuslabel-label')?.textContent.trim());
        if (status === 'Online') {
          message.channel.send('Server is online.');
          onlineStatus = "new";
          break;
        } else if(status != 'Online') {
          console.log(status);
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
  
  async function serverStatus() {
    const browser = await puppeteerExtra.launch({
      args: ['--no-sandbox'],
      headless: false,
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
      ('Player Count: ' + (playerCount || 'Player count not found'));
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      await browser.close();
    }
  }
  
async function playerOnline() {
  
  const browser = await puppeteerExtra.launch({
    args: ['--no-sandbox'],
    headless: false,
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
    message.channel.send('Online Players:', playerNames.join(', '));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

async function  playerNames() {
  const browser = await puppeteerExtra.launch({
    args: ['--no-sandbox'],
    headless: false,
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
    console.log('Online Players:', playerNames.join(', '));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}
startServer();
