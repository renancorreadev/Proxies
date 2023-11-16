FROM node:16.20.0-alpine3.18

RUN addgroup appgroup && adduser app -G appgroup -D

# Seta a variavel de ambiente HOME da app

ENV HOME=/home/app

# Copie o package.json e o package-lock.json para o diretório de trabalho

COPY package*.json $HOME/node_docker/

# Defina o diretório de trabalho dentro do contêiner

WORKDIR $HOME/node_docker

# Instale as dependências da aplicação

RUN yarn && yarn cache clean


# Copie o código fonte da aplicação para o diretório de trabalho

COPY . $HOME/node_docker
RUN chown -R app $HOME

# Exponha a porta em que a aplicação estará em execução

EXPOSE 3000
# Comando a ser executado quando o contêiner for iniciado

USER app
CMD [ "yarn", "start" ]