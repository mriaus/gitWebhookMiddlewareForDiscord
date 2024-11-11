# Middleware docu

This is a simple middleware template between GitHub and Discord. With this example, we ensure that every time a pull request is made, a specific role in our Discord gets notified.

##  How to deploy

In this case, we are going to deploy on Vercel. To do this, we will add the following file:
vercel.json
```javascript
{
    "builds": [{
        "src": "./index.js",
        "use": "@vercel/node"
    }],
    "routes":[
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
```
And you are going to need an account here: https://vercel.com/.

In vercel you can directly import proyects from git, so you just need to import it

![imagen](https://github.com/user-attachments/assets/4745e824-1077-491b-a7d6-1a8582eb01dc)

In this case im just gonna add 2 Enviroments variables: DISCORD_WEBHOOK_URL and DISCORD_ROLE_ID, you can do it now or in the configuration tab.

![Captura de pantalla 2024-11-11 a las 16 12 28](https://github.com/user-attachments/assets/c041fcc4-6991-4752-b595-57fe85a7e919)

## Where can i find the Webhook url and the role id?

To obtain the ID of a role in Discord, we need to go to the roles section, and in the three dots, we can copy it.

![imagen](https://github.com/user-attachments/assets/607081f5-ccbc-43a6-a141-2ee0c5f822f8)


To obtain the webhook url firts you need to go to integrations and create a new webhook, you can put the name as you want and select the channel when te bot is going to write, then you can just copy the url.

![Captura de pantalla 2024-11-11 a las 16 47 21](https://github.com/user-attachments/assets/d5beded8-f6bb-4c64-bb48-a4ac1d970dfe)


with this we can now deploy. But we need one more thing.

## Configure the Github webhook.

In the settings tab inside a project we can create webhooks so we will need the url of the deployed app + /github-webhook in this case, as we call the post in the index.
Remember to change the Content type to application/json and the events to "Send me everything"

![Captura de pantalla 2024-11-11 a las 16 34 12](https://github.com/user-attachments/assets/c46a2ebf-7115-45de-8cb7-b0e18e38dccd)


And now, if we create a PR we get the notification in the channel we selected:

![imagen](https://github.com/user-attachments/assets/40ecb3ce-df04-47b8-9068-0f71995c8565)


![Captura de pantalla 2024-11-11 a las 16 44 57](https://github.com/user-attachments/assets/b8cf7679-39da-44df-ae56-10ba9bb41929)


## How to add more cases:

To add more cases you just need to add other if conditions in the post and do what you want, remember:
<@user_id> for users id.
<@&role_id> for roles id

