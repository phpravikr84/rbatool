====
GST Fraud App
===
Run application. Web Server Gateway Interface. In Linux we can use Gunicorn or Waitress
flask --app wsgi run

#Verify password
pip install "bcrypt<4.0" passlib[bcrypt]

Generate password
from passlib.hash import bcrypt
print(bcrypt.hash("123456789"))


from passlib.hash import bcrypt

hash_from_db = "$2b$12$sLkXGPU2yMAw4KyQB5UZK.GJH9VPE.JC10wD1OXxHmNRcjArO.2wa"
print(bcrypt.verify("123456789", hash_from_db))