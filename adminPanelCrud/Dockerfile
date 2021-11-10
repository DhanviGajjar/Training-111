FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
RUN ls -a
COPY . .
RUN ls -a
RUN npm install
RUN ls -a
CMD ["node","./bin/www"]
