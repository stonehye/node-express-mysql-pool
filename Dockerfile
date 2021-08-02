FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN sequelize db:create 
# 위 명령을 입력하시면, config/config.json파일을 읽은 후, develpment모드에 적혀있는 nodejs라는 DB를 만드는 것을 확인할 수 있습니다.

CMD ["npm", "start"]
