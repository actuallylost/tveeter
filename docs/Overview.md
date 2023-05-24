# Overview

## What is this?

Tveeter is a web-application that allows you to communicate with others in real-time.

## User Interface

### Chat

-   Header that displays the username
-   List of messages
-   Chat box to type messages
-   Send button

#### Chat Functionality

-   Send messages
-   Receive messages in real-time
-   Websocket connection

### Login

-   Login Modal
    -   Email input
    -   Password input
    -   Login button
    -   Register button that redirects to the register page

#### Login Functionality

-   Handle login details
-   Pass them to supabase
-   Once authenticated, redirect to the chat page
-   Handle login errors through the UI (invalid email/password)

### Register

-   Register Modal
    -   Username input
    -   Email input
    -   Password input
    -   Register button
    -   Login button that redirects to the login page

#### Register Functionality

-   Handle register details
-   Pass them to supabase
-   Pass username to the database through the API
-   Once email is verified, fetch the access token from the URL
-   Store the access token in local storage
-   Once authenticated, redirect to the chat page
-   Handle register errors through the UI (invalid username/email/password)

## API

### Endpoints

#### Users

-   `/api/v1/users`
    -   `GET`
        -   Returns a list of all users
    -   `POST`
        -   Creates a new user
-   `/api/v1/users/<id>`
    -   `GET`
        -   Returns a user with the given id
    -   `DELETE`
        -   Deletes a user with the given id
-   `/api/v1/users/<id>/messages`
    -   `GET`
        -   Returns a list of all messages from the user with the given id

---

#### Messages

-   `/api/v1/channels/<id>/messages`
    -   `GET`
        -   Returns a list of all messages
    -   `POST`
        -   Creates a new message
-   `/api/v1/channels/<id>/messages/<id>`
    -   `GET`
        -   Returns a message with the given id
    -   `DELETE`
        -   Deletes a message with the given id

---

#### Channels

-   `/api/v1/channels`
    -   `GET`
        -   Returns a list of all channels
    -   `POST`
        -   Creates a new channel
-   `/api/v1/channels/<id>`
    -   `GET`
        -   Returns a channel with the given id
    -   `DELETE`
        -   Deletes a channel with the given id

---

#### Auth

-   `/api/v1/auth/login`
    -   `POST`
        -   Logs in a user
-   `/api/v1/auth/register`
    -   `POST`
        -   Registers a new user

---

### Models

#### User

```json
{
	"id": 1234567890123456,
	"username": "username",
	"createdAt": "2023-05-10T13:38:37.865Z",
	"messages": [
		{
			"id": 1234567890123456,
			"content": "hello world!",
			"authorId": 1234567890123456,
			"channelId": 1234567890123456,
			"createdAt": "2023-05-10T13:38:37.865Z"
		}
	],
	"channels": [
		{
			"userId": 1234567890123456,
			"channelId": "2023-05-10T13:38:37.865Z"
		}
	]
}
```

#### Channel

```json
{
	"id": 1234567890123456,
	"createdAt": "2023-05-10T13:38:37.865Z",
	"messages": [
		{
			"id": 1234567890123456,
			"content": "hello world!",
			"authorId": 1234567890123456,
			"channelId": 1234567890123456,
			"createdAt": "2023-05-10T13:38:37.865Z"
		}
	],
	"users": [
		{
			"userId": 1234567890123456,
			"channelId": 1234567890123456
		}
	]
}
```

#### ChannelMembership

```json
{
	"userId": 1234567890123456,
	"channelId": 1234567890123456
}
```

#### Message

```json
{
	"id": 1234567890123456,
	"content": "content",
	"authorId": 1234567890123456,
	"channelId": 1234567890123456,
	"createdAt": "2023-05-10T13:38:37.865Z"
}
```

## TODO

-   [x] Create a basic UI
-   [x] Create the API endpoints
-   [x] Create the database models
-   [x] Create the authentication system
-   [x] Create the login/register pages
-   [x] Create the chat page
-   [x] Implement login/register modals
-   [ ] Implement websockets client side
-   [ ] Implement login/register functionality
-   [ ] Implement chat functionality
