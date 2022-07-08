# GazinSeg - Bank

## **Confluence:**

https://gazinlabs.atlassian.net/wiki/spaces/GS/pages/117178562/GSBank+-+API

## **Requeriments**

- Docker
- Docker Compose
- Nodejs (v16)
- Yarn

## **Preparing environment**

Commands:

```bash
cp .development.env.example .development.env

cp .test.env.example .test.env

yarn

yarn start
```

## **SonarQube**

Analyze:

```bash
sonar-scanner.bat -D"sonar.projectKey=GazinBank-Seguros-Backend" -D"sonar.sources=." -D"sonar.host.url=https://sonar.gazin.com.br" -D"sonar.login=8fbb0232092b4a297258426a9e4f07d66f2a82d2"
```
