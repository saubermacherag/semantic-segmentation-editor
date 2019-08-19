FROM node:8.12.0-slim

MAINTAINER devops@wastebox.biz

WORKDIR /home/node/app

COPY package*.json /home/node/app/

RUN npm install

RUN /bin/sh -c 'curl https://install.meteor.com/ | sh'

COPY ./ /home/node/app

RUN [ "mkdir", "-p", "/home/node/app/input_img/" ]
RUN [ "mkdir", "-p", "/home/node/app/output_img/" ]

EXPOSE 3000
EXPOSE 3001

#RUN meteor update --patch --allow-superuser

CMD [ "npm", "start" ]
#RUN meteor --settings settings.json --production
