# user registration process

- recieve user data from frontend
- server side validing
- if not valide
  -- response with invalid message
  else
  -- encrypt passqord
  -- store in the db
  -- create unique url for email address
  -- validation and send that unique url to the client email

# Once client receives the email, they will follow the link that should redirect the to out frontend web page where we get the unique part of the url and call server to verify that code

inserver:
receive the unique emal validating code
check if the code is valid and exist ind atabase
if not
responsd invalid request access
if exist
update user status from inactive to active in the database
send email
