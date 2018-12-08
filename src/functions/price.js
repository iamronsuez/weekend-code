import fetch from 'node-fetch'
import {get, upperCase} from 'lodash'

const API_ENDPOINT = "https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/"

const getCurrencyData = (data, path) => get(data, path, 0.0)

const getRelation =(base, divider) => parseFloat(base) / parseFloat(divider)

exports.handler = async (event, context) => {
  const {base, divider} = event.queryStringParameters
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const baseData =  getCurrencyData(get(data,upperCase(base), 'USD'), 'rates.last')
      const dividerData = getCurrencyData(get(data, upperCase(divider), 'USD'),'rates.last')
      try {
        return {
          statusCode: 200,
          body: JSON.stringify({currencies: {
              base: baseData,
              divider: dividerData,
              relation: getRelation(baseData, dividerData)
            }
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