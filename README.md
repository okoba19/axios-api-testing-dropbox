# Dropbox API Testing Framework

## Overview

This repository contains an API testing framework built with JavaScript, utilizing popular libraries such as Axios for making HTTP requests and Mocha for test organization and execution. The framework is designed for testing the Dropbox API.

## Instruments

- **Axios:** A promise-based HTTP client for making API requests.
- **Mocha:** A feature-rich JavaScript test framework that runs on Node.js and in the browser.
- **Mochawesome:** A custom reporter for Mocha that generates HTML reports.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/dropbox-api-testing.git

2. Navigate to the project directory:

cd dropbox-api-testing

3. Install dependencies:

npm install

## Configuration
Obtain a Dropbox API access token from the Dropbox Developer Console. (https://www.dropbox.com/developers/apps)
Create new app and generate new Bearer Token. Configure all Permisions for created app.

After receving Bearer token encrypt it with tokenEncryptor class.

Update a .env file in the project root and add your encrypted access token:
as a VALID_TOKEN

DROPBOX_ACCESS_TOKEN=your-dropbox-api-token

## Running Tests
Execute the following command to run the tests:

## Test Reports
Tests are organized in the tests directory. After Test run Mochawesome report will generated in mochawesome-report project folder. Both htmk and json repoorts can be viewed from this folder.