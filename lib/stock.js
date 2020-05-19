'use strict'

const { makeRequest, generateJson } = require('./utilities');
const financial = require('./financial');

module.exports = (stock) => {

    return {
        profile: () => makeRequest('company/profile', generateJson(stock)),
        quote: () => makeRequest('quote', generateJson(stock)),
        financial: financial(stock),
        rating: () => makeRequest('company/rating', generateJson(stock)),
        current_price: () => makeRequest('stock/real-time-price', generateJson(stock)),

        dividend_history: ({ start_date, end_date, data_type, limit } = {}) => makeRequest('historical-price-full/stock_dividend', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })),
        split_history: ({ start_date, end_date, data_type, limit } = {}) => makeRequest('historical-price-full/stock_split', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })),
        history: ({ start_date, end_date, data_type, limit } = {}) => makeRequest('historical-price-full', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })),
        history_interval: (interval = '1hour') => makeRequest('historical-chart', generateJson(interval + '/' + stock))
    }
};