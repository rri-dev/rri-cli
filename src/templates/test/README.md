# rri-test-template

A simple template designed to be a starting point for an integration test project.

# Quick Start

* `npm test` - runs already built sample test

# Usage

* build out tests as needed in the `/test` folder
* update `.gitignore` as needed
* add packages as needed
* create a git repo, push it to the repo
* fire off the tests using our CI infrastructure (heroku or rancher)
    - initially we will use Heroku, until our Rancher CI is mature enough

# Basic Test Design

* simple testing pattern:
    1) setup - any mocking or inital required setup
    2) run target - run the target, for integration tests this will mostly be hitting an endpoint
    3) test outcome - query the expected downstream systems to ensure they have expected states