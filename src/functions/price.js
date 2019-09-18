import fetch from 'node-fetch'
import {get, upperCase, map} from 'lodash'

const API_ENDPOINT = "https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/"

const getCurrencyData = (data, path) => get(data, path, 0.0)

const getRelation =(base, divider) => parseFloat(base) / parseFloat(divider)

exports.handler = async (event, context) => {
  const {base, divider} = event.queryStringParameters
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const currencies = [
        {base: 'VES', divider: 'CLP'},
        {base: 'CLP', divider: 'VES'},
        {base: 'USD', divider: 'VES'},
        {base: 'USD', divider: 'CLP'},
        {base: 'PAB', divider: 'USD'},
        {base: 'PAB', divider: 'VES'},
        {base: 'USD', divider: 'PAB'},
      ]

      const baseData =  getCurrencyData(get(data,upperCase(base), 'USD'), 'rates.last')
      const dividerData = getCurrencyData(get(data, upperCase(divider), 'USD'),'rates.last')
      const references = map(currencies, ({base, divider}) => ({rel: getRelation(base, divider), base, divider}))
      try {
        return {
          statusCode: 200,
          body: JSON.stringify({
            currencies: {
              base: baseData,
              divider: dividerData,
              relation: getRelation(baseData, dividerData)
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