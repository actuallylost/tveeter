# Redirect Page

## Abstract

Redirect is a page that is visited after clicking the email confirmation link. It is used to assign an access token and a username to the auth Redux store. It then redirects the user to to the chat page. It also checks if the user is already logged in, and if so, redirects them to the chat page.

### Implementation

-   Runs `supabaseSessionCheck()` on first render.
-   If access token is present, fetch the username by sending the access token as a request body to the server.
-   If a username is returned, dispatch the username and access token to redux and redirect to the chat page.
-   Othewise redirect to the login page.
