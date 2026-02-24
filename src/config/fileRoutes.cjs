const { resolve } = require('node:path');
const express = require('express');

const uploadImage = resolve(__dirname, '..', '..', 'uploads');
const fileConfigRoute = express.static(uploadImage);

module.exports = fileConfigRoute;
