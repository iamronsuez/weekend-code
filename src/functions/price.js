import fetch from 'node-fetch'
import {get, upperCase, map} from 'lodash'

const API_ENDPOINT = "https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/"

const getCurrencyData = (data, path) => get(data, path, 0.0)

const getRelation =(base, divider) => parseFloat(base) / parseFloat(divider)

exports.handler = async (event, context) => {
  const {base, divider} = event.queryStringParameters
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(response => {
      const currencies = [
        {base: 'VES', divider: 'CLP'},
        {base: 'CLP', divider: 'VES'},
        {base: 'USD', divider: 'VES'},
        {base: 'USD', divider: 'CLP'},
        {base: 'PAB', divider: 'USD'},
        {base: 'PAB', divider: 'VES'},
        {base: 'USD', divider: 'PAB'},
      ]

      const baseData =  (b, data) => getCurrencyData(get(data,upperCase(b), 'USD'), 'rates.last')
      const dividerData = (d, data) => getCurrencyData(get(data, upperCase(d), 'USD'),'rates.last')

      const references = map(currencies, ({base, divider}) => ({
        rel: getRelation(baseData(base, response), baseData(divider, response)), 
        base, 
        divider
      }))

      try {
        return {
          statusCode: 200,
          body: JSON.stringify({
            currencies: {
              base: baseData(b, response),
              divider: dividerData(d, response),
              relation: getRelation(baseData(b, response), baseData(d, response))
            },
            references
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