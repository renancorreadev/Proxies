# Para gerar o certificado ssh para o PostGree 

❯ openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout server.key -out server.crt