# Login Page

## Abstract

The login modal is a simple form that takes in an email and password. It also has a register button that redirects to the register page, a forgot email button that redirects to the forgot email page, and a forgot password button that redirects to the forgot password page.

### Implementation

-   Handle login details
    -   Login details are taken from an input element and stored in the component state
    -   On Login Button click, the login details are passed to supabase
    -   If the login is successful, the access token is stored in local storage
-   Once authenticated, redirect to the chat page
    -   The chat page is the default page for authenticated users
    -   Supabase is used to check if the user is authenticated, by checking if a current session exists through `getSession()`.
    -   If a current session exists, the user is redirected to the chat page
    -   If a current session does not exist, the user is redirected to the login page
-   Handle login errors through the UI (invalid email/password)
    -   If the email is invalid, send a toast notification
    -   If the password is invalid, send a toast notification, detailing why it's invalid
