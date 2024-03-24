import axios from 'axios';

const username = "ZSadwa";
const password = "n.85WpqgFasL*Yq";

async function startServer() {
    try {
        const response = await axios.post('https://aternos.org/go/start/', { username, password });
        if (response.status === 200) {
            console.log('Server started');
        } else {
            console.log('Failed to start server');
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function stopServer() {
    try {
        const response = await axios.post('https://aternos.org/go/stop/', { username, password });
        if (response.status === 200) {
            console.log('Server stopped');
        } else {
            console.log('Failed to stop server');
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function serverStatus() {
    try {
        const response = await axios.get('https://aternos.org/go/status');
        const status = response.data.status; // Assuming the status is available in the response data
        console.log(`Server Status: ${status}`);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

async function playerStatus() {
    try {
        const response = await axios.get('https://aternos.org/go/playercount');
        const playerCount = response.data.playerCount; // Assuming player count is available in the response data
        console.log(`Player Count: ${playerCount}`);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

// Example usage
/ Stopping the server
 startServer(); // Starting the server
 

