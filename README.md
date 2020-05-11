# pokemon-lh-conf

## Installation steps

To run the project, we need to install truflle and ganache.

### Truffle
Go through instruction [here](https://truffleframework.com/truffle) to install truffle locally. Please note that node version should be > `v10.1.0`

### Ganache
Install ganache to run Blockchain locally. Follow instruction [here](https://truffleframework.com/ganache) to install ganache.

## Start

Start ganache app. A local Blockchain should spin up.

Run the following to compile the contracts

```shell
truffle compile
```
Run the following to deploy the contracts on to Blockchain

```shell
truffle migrate
```

Have a look at the scripts under `scripts` folder to interact with Blockchian

Run an script by running the following command.

```shell
truffle exec <scriptname.js>
```
