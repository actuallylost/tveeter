# Chat Page

## Abstract

The chat page is the default page for authenticated users. It displays a chatbox that contains all the messages sent by the user and other users. It also contains a text input that allows the user to send messages.

### Implementation

-   Handling usernames
    -   Fetching usernames
        -   Event payload consists instance of Message model
        -   Message model contains authorId
        -   AuthorId is used to fetch the username from the database
        -   Username is then sent as part of the payload to the client
    -   Storing usernames
    -   Displaying usernames
-   Handle chat messages
    -   Chat messages are taken from an input element and stored in the component state
    -   On Send Button click, the chat message is emitted to the websocket server
    -   If the chat message is successfully sent, the websocket emits the chat message to all connected clients
    -   The message is then displayed in the chatbox alongside with the username of the author
-   Handle chat errors through the UI (invalid message)
    -   If the chat message is empty, the Send Button is disabled
    -   If the chat message is not empty, the Send Button is enabled
