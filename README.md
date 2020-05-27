<html>
<h1 align="center">GoBarber React App</h1>
<p align="center" >

<img src="https://img.shields.io/badge/language-react--typescript-blue.svg" />
<a href="https://codecov.io/gh/nelsonatgithub/gobarber-react"><img src="https://img.shields.io/codecov/c/github/nelsonatgithub/gobarber-react/dev.svg" /></a>
<a href="https://stats.uptimerobot.com/Wj6Alhjy9q/785050967"><img src="https://img.shields.io/uptimerobot/ratio/7/m785050967-4b90885fe91ee5c2007ba853.svg" /></a>
<a href="https://stats.uptimerobot.com/Wj6Alhjy9q/785050967"><img src="https://img.shields.io/uptimerobot/status/m785050967-4b90885fe91ee5c2007ba853.svg" /></a>
<a href="https://observatory.mozilla.org/analyze/nlsn-gobarber.netlify.app"><img src="https://img.shields.io/mozilla-observatory/grade-score/nlsn-gobarber.netlify.app?publish.svg" /></a>

</p>
</html>

# Descrição

Esse repositório implementa o Frontend ao projeto GoBarber. Esse trabalho é resultado do aprendizado no Bootcamp GoStack da Rocketseat.

> O GoBarber é uma aplicação que agenda serviços de barbearia entre clientes e donos de barbearia. Donos de lojas anunciam serviços definindo seus horários disponíveis. Clientes escolhem serviços e horários.

# Features

    1. Barbershop Services
        Vários serviços por barbearia (ex: cabelo, barba, manicure, etc.)

    2. Appointment by Service
        Agendamentos são atrelados a serviços, porque a loja pode prover mais de um serviço e serviços diferentes no mesmo horário.

    3. Messages for Appointments
        Cliente e Barbeiros conversam sobre o agendamento

# Executando o Projeto

## 1) Dependências

O projeto é desenvolvido em Linux. O aplicativo é feito no Node com React Framework.

Para instalar o Node, recomendo os scripts do [NodeSource](https://github.com/nodesource/distributions#installation-instructions): curl no arquivo de setup, pipe para bash e `apt install`

```bash
# Versão do Node
> node --version
v13.14.0

# Versão do Npm
> npm --version
6.14.5

# Atualização as dependências do repositório
> npm install
```

## 2) Backend do Projeto

O Backend é desenvolvido separadamente em [GoBarber Restfull Application](https://github.com/nelsonatgithub/gobarber-node).

Siga as instruções [aqui](https://github.com/nelsonatgithub/gobarber-node#executando-o-projeto) e levante o backend para prover dados ao GoBarber React App. O backend depende do Docker e Npm.

## 3) Servidor de Aplicação

```bash
# Executa o react-scripts por trás
> npm start
```

