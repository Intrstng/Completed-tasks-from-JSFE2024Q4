# Fun chat

1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/fun-chat/README.md)

2. Screenshots:

![Screenshot_3](https://github.com/user-attachments/assets/616a2ef4-9503-4c18-8096-d8762b819a0c)
![Screenshot_4](https://github.com/user-attachments/assets/e1abdc86-65b1-4679-bca5-0355347fa66c)
![Screenshot_1](https://github.com/user-attachments/assets/a3d956b6-4dfe-4680-8042-227b57f6fd4d)
![Screenshot_2](https://github.com/user-attachments/assets/1291dec1-58d8-43fc-9d0a-ef712b8842ce)

3. Deploy: [link](https://rolling-scopes-school.github.io/intrstng-JSFE2024Q4/fun-chat/#login)

# How to start frontend application:

### Downloading

```
git clone https://github.com/rolling-scopes-school/intrstng-JSFE2024Q4.git
```

### Go to the application root folder (run in terminal from the original folder where the repo was cloned):
```
cd intrstng-JSFE2024Q4
```

### Switch to task branch:

```
git checkout fun-chat
```

### Installing NPM modules

```
npm install
```

### If you encounter problems during npm installation:

```
npm install --force
```

### Start **Async Race** frontend application:

```
npm run start
```


# Important

## To run this application, you need to start the local Websocket server first, which you can find at the following link: [Server Application for the Chat. API](https://github.com/rolling-scopes-school/fun-chat-server/tree/main)

## How to start local server:

### Downloading

```
git clone https://github.com/rolling-scopes-school/fun-chat-server.git
```

### Go to the server app root folder (run in terminal from the original folder where the repo was cloned):
```
cd fun-chat-server
```

### Installing NPM modules

```
npm install
```

### If you encounter problems during npm installation:

```
npm install --force
```

### Create the `.env` file and specify the port settings and server event log settings in it:

 - In the created .env file, set the `SERVER_PORT` parameter to `4000` (if it is not possible to run the server using port `4000`, you can use another port).
 - In the created .env file, set the `LOG` parameter to one of the values listed below:
   - ALL - all incoming and outgoing requests
   - ERROR - only erroneous requests
   - INCOMING - all incoming requests
   - OUTCOMING - all outgoing requests
   - NONE - request logging disabled


### Start **Fun chat** Websocket local server:

```
npm run start
```

## Now you can fully work with the Fun chat frontend application.
