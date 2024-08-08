# Search SDK Store example

This repository has an example implementation of a commerce website using the Sitecore Search JS SDK
using Store settings.


## Prerequisites

### Node.js
To run the project a Node.js installation is needed. to build the project. We recommend using the LTS version of Node.js. You can find it [here](https://nodejs.org/en/).

### Environment variables
The project needs some environment variables to work.
You can get the values for them in the Developers resources section of Customer Engagement Console (CEC). 
For full functionality, create a .env file in the root of the project and add the following environment variables.

The following variables should exist within the .env file:

VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key provided in CEC>


## Commands

- Running the project: On a terminal, execute `npm run dev`
- Building the project: On a terminal, execute `npm run build`

## Overview

The project is compose with 3 different pages:

- Home Page: Shows a `Search Results` widget to gather the results based on the store set on the header.
- Cart Page: A sample page of the current cart status. It should also reports an event to track the cart status.
- Order Page: A sample confirmation page to simulate an order confirmation event. 