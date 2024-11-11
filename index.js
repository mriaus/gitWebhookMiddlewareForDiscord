const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());


// Env vars. Add more if you need more here like userID or diferents roles ids
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const DISCORD_ROLE_ID = process.env.DISCORD_ROLE_ID; 


app.post('/github-webhook', (req, res) => {
    const payload = req.body;
    // For opened pr example
    if (payload.action === 'opened' && payload.pull_request) {
        const prTitle = payload.pull_request.title;
        const prUrl = payload.pull_request.html_url;
        const prAuthor = payload.pull_request.user.login;
  
        // The msg for the discord channel
        const message = {
            content: `🔔 Nueva pull request creada por **${prAuthor}**: [${prTitle}](${prUrl})\n <@&${DISCORD_ROLE_ID}>.`
        }

         // Sends the msg
        axios.post(DISCORD_WEBHOOK_URL, message)
        .then(() => {
        res.status(200).send('Message sent to Discord');
        })
        .catch(error => {
        console.error('Error sending the message:', error);
        res.status(500).send('Error sending the message');
        });
    } else {
        // Remove the else statement and add additional if conditions if you want more functionality.
        res.status(200).send('Evento no relevante');
    }
});

app.get("/", (req,res) => {
  const htmlResponse = `  <html>
        <head>
            <title>Github Middleware</title>
        </head>
        <body>
            <h1>Middleware is Running</h1>
        </body>
    </html>`
    res.send(htmlResponse)
})

// Servidor escuchando en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});