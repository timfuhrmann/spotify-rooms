FROM golang:1.16-alpine
RUN mkdir -p /usr/src/app
ENV PORT 8080
WORKDIR /usr/src/app
COPY go.mod /usr/src/app
COPY . /usr/src/app
RUN go build -o main .
EXPOSE 8080
CMD [ "./main" ]