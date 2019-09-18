import fetch from 'node-fetch'
const {get, upperCase, map} = require('lodash')

const API_ENDPOINT = "https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/"

const getCurrencyData = (data, path) => get(data, path, 0.0)

const getRelation =(base, divider) => parseFloat(base) / parseFloat(divider)

exports.handler = async (event, context) => {
  const b = get(event.queryStringParameters, 'base', 'USD')
  const d = get(event.queryStringParameters, 'divider', 'USD')
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(response => {
      const currencies = [
        {base: 'VES', divider: 'CLP'},
        {base: 'VES', divider: 'USD'},
        {base: 'USD', divider: 'PAB'},
        {base: 'CLP', divider: 'USD'},
      ]

      const baseData =  (b, data) => getCurrencyData(get(data,upperCase(b), 'USD'), 'avg_1h')
      const dividerData = (d, data) => getCurrencyData(get(data, upperCase(d), 'USD'),'avg_1h')

      const getReferencies = (response) =>  map(currencies, ({base, divider}) => ({
        rel: getRelation(baseData(base, response), baseData(divider, response)), 
        base: baseData(base, response), 
        divider: baseData(divider, response),
        ref: `${base}/${divider}`
      }))

      try {
        return {
          statusCode: 200,
          version: 1, 
          body: JSON.stringify({
            currencies: {
              base: baseData(b, response),
              divider: dividerData(d, response),
              relation: getRelation(baseData(b, response), baseData(d, response)),
              ref: `${b}/${d}`
            },
            references: getReferencies(response)
          }, null, 2)
        }
      } catch (error) {
        return {
          statusCode: 400,
          body: error
        }
      }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};