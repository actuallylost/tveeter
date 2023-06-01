# Register Page

## Abstract

The register page is a simple form that takes in a username, email and password. It also has a login button that redirects to the login page.

### Implementation

-   Handle register details
    -   Register details are taken from an input element and stored in the component state
    -   On Register Button click, the register details are passed to supabase
    -   If the register is successful, the user's email is sent a verification email
    -   The user is made aware of it via a toast notification on successful registration
-   Once registered, redirect to the login page
    -   The login page is the default page for unauthenticated users
    -   Supabase is used to check if the user is authenticated, by checking if a current session exists through `getSession()`.
    -   If a current session exists, the user is redirected to the chat page
    -   If a current session does not exist, the user is redirected to the login page
-   Handle register errors through the UI (invalid username/email/password)
    -   If the username, email or password is invalid, send a toast notification
