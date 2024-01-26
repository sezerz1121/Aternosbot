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
async function startServer(onlineStatus)  {
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
  await page.click('.servercard.offline');
  await page.waitForTimeout(4000);
  await page.click('#start');
  await page.waitForTimeout(2000);
 // Assuming the rest of your Puppeteer setup is here...



 let status = '';

  // Infinite loop to continuously check the status
  while (true) {
    status = await page.evaluate(() => {
      const span = document.querySelector('.statuslabel-label');
      return span ? span.textContent.trim() : '';
    });

    if (status === 'Online') {
      console.log('Online');
      onlineStatus=true;
      break; // Exit the loop once status is "Online"
    } else {
      console.log('Status is not "Online" yet. Retrying...');
      await page.waitForTimeout(15000); // Wait for 3 seconds before retrying
    }
  }

  
    
    
  

  // Close the browser
  await browser.close();
  return onlineStatus;
    
};


async function stopServer(onlineStatus)  {
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
  return onlineStatus;
    
};


async function restartServer(onlineStatus)  {
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
  await page.click('#restart');
  await page.waitForTimeout(2000);
  onlineStatus=true;
  await browser.close();
  return onlineStatus;
    
};



async function serverStatus() {
  

  const browser = await puppeteerExtra.launch({
    
    headless: false,
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

    console.log('Server Status:', status);
  } catch (error) {
    console.error('Error navigating or fetching server status:', error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}
serverStatus();



async function playerStatus() {
  

  const browser = await puppeteerExtra.launch({
    
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

    console.log('Player Count:', playerCount);
  } catch (error) {
    console.error('Error navigating or fetching server status:', error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}



async function playerOnline() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = await puppeteerExtra.launch({
    executablePath: chromePath,
    headless: "new",
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


