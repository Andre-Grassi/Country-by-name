// Requires node modules
const axios = require('axios')
const process = require('process')

async function getNation(name) {
  try {
    // Gets the response of the URL
    const response = await axios.get(`https://api.nationalize.io?name=${name}`)

    // Gets the data that is contained inside response
    const data = response.data

    // Logs the probabilities of each country to the console
    logProbabilities(data)
  } catch (error) {
    // Logs error
    console.log(error)
  } finally {
    // Logs std phrase when the promise is settled (accepted or rejected)
    console.log('Successfully tried to get nation of given name')
  }
}

// Gets the last argument passed in the terminal as the name
getNation(process.argv.at(-1))

// Function to log the probabilities
function logProbabilities(data) {
  // Gets the name
  const name = data.name
  console.log(`The name ${name} can be from\n`)

  // Gets the array of objects (country name, probability)
  const countries = data.country
  // Gets the i-th element of countries
  for (const country of countries) {
    console.log(
      `${country.country_id} | probability = ${Math.round(
        country.probability * 100
      )}%\n`
    )
  }
}
