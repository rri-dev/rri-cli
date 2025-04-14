# RRI CLI

CLI that can be used to create boilerplate templates

* APIs - `rri-some-api` - Generic crud operations for integrating with an external system
* Microservices - `rri-some-ms` - Lightweight NodeJs program to separate concerns
* NPM Packages - `rri-some-np` - Abstract away services to be consumed by other packages

## Installation

* `npm i rri-cli -g` - install the cli globally

## Usage

`rri-cli` - answer the prompts, a project template will be created in a sub-folder that follows the naming convention
    - i.e. `rri-someabbreviation-api` where _someabbreviation_ is the value you supplied for the name

## Troubleshooting

* `npm update rri-cli -g` - update to latest version
* `npm list -g --depth=0` - list the current version of global packages
* `npm cache clean --force` - run this if npm doens't update it to the latest version