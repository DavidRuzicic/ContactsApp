CREATE USER 'newuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON contactappdb.* TO 'newuser'@'%';
FLUSH PRIVILEGES;