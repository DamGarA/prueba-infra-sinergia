# SINERGIA

## Requirements
- Java 21
- maven
- Node 20+
- npm
- docker

## Configuring project

```bash
cd config/docker-services
docker compose up -d
cd ../ssl
bash configure-ssl.sh
```


## Installing module dependencies

### Backend
```bash
cd modules/backend
mvn -T 1C clean install -DskipTests
```

### Frontend
```bash
cd modules/frontend
npm install
```


## Running modules

### Backend
Just run it from IntelliJ

### Frontend
```bash
npm start
```
