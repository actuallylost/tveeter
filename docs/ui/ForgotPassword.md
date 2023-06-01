# Forgot Password Page

## Abstract

The Forgot Password page is used to reset a user's password. It is accessed by clicking the "Forgot Password" link on the Login page. The user is prompted to enter their email address. If the email address is valid, a password reset email is sent to the user. The user can then click the link in the email to reset their password.

### Implementation

-   The Forgot Password page is implemented in the `ForgotPassword` component.
-   It is accessed by clicking the "Forgot Password" link on the Login page and is routed to `/forgot-password`.
-   Handling the password reset process is done through the `handlePasswordReset` function.
    -   The function takes in an email address and sends a password reset email to the user.
    -   A toast notication is sent to the user either on success or failure.
    -   The notification tells the user that if the email address is valid, a password reset email will be sent to them.
    -   The user can then click the link in the email to reset their password.
-   Handling password reset
    -   The password reset process is handled by Supabase.
    -   The user is redirected to the login page after changing their password.
