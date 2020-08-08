# crystal-chat
this is a small real time chat application

# technologies
- Node/Express
- MongoDB as database
- GraphQL & GraphQL Subscription with redis
- Apollo client and server
- React/React Hooks and Tailwindcss
- React Framer Motion
- Moment and React-Moment
# How to run
- Inside the root folder of this project create .env file and paste these variables:

    - PORT=4000
    - JWT_KEY=bcXVb_DUJK_LL_MEniqChat;
    - MONGO_CONNECTION=mongodb://localhost:27017/crystal-chat-database
    - REDIS_HOST=127.0.0.1
    - REDIS_PORT=6379
- The same for client side you have to navigate to chat-ui folder and create .env file and paste these variables too:

    - REACT_APP_GRAPHQL_SERVER=http://localhost:4000/graphql
    - REACT_APP_GRAPHQL_SUBSCRIPTION=ws://localhost:4000/graphql
    - REACT_APP_FILES_STORE=http://localhost:4000/
    
- Run the app by executing the npm start command in the root folder and another one inside React app (chat-ui folder)
