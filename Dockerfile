#Seto a imagem base
FROM node:18.18.0-alpine

#Cria diretório de trabalho
WORKDIR /usr/src/app

# Copio os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# #Instalo as dependências e oculto as mensagens de log (Apenas erros criticos serão exibidos)
RUN npm install --quiet --no-optional --no-found --loglevel=error

# #Defino que todos os arquivos do diretório atual serão copiados para o diretório de trabalho
# #Origem - Destino
COPY . .

#Copio meu dotenv de produção e renomeio para .env
COPY ./.env.production ./.env

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" , "start:prod" ]