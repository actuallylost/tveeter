# Forgot Email Page

## Abstract

The Forgot Email page is used to retrieve a user's email address. It is accessed by clicking the "Forgot Email" link on the Login page. The user is prompted to enter their username. If the username is valid, an email containing the user's email address is sent to the user.

### Implementation

-   The Forgot Email page is implemented in the `ForgotEmail` component.
-   It is accessed by clicking the "Forgot Email" link on the Login page and is routed to `/forgot-email`.
-   Handling the email retrieval process is done through the `handleEmailRetrieval` function.
    -   The function takes in a username and sends an email containing the user's email address to the user.
    -   A toast notication is sent to the user either on success or failure.
    -   The notification tells the user that if the username is valid, an email containing the user's email address will be sent to them.
-   Handling email retrieval
    -   The email retrieval process is handled by Supabase.
    -   The user is redirected to the login page after retrieving their email address.
