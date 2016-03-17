# Introduction #

When signing in for the yallo website the first time a captcha challenge has to be answered. The information that the captcha was solved successfully is then stored in a browser cookie. This cookie avoids that the captcha is presented for consecutive logins. As the widget uses the same website to send the SMS the content of this cookie has to be transferred from a web browser to the widget.


# Details #

For Safari (v3.2.3) it is possible to view the cookies but it is not possible to copy the content to the clipboard. Therefore the following description for [Firefox](http://www.mozilla.com/) (v3.0.10).

Log in to your account on yallo.ch at least once. Got to Menu Firefox -> Preferences -> Privacy and click the "Show Cookies" button. Search for "yallo.ch" and click on on the cookie with the name "captcha". At the bottom of the dialog, mark and copy the content (something like "0irbRp9aYiU9gRoVXmQYpw==" or a longer variant.) Paste it into the corresponding field in the widget account settings.