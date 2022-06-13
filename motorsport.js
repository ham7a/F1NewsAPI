const axios = require('axios')
const cheerio = require('cheerio')

const sources = [
    {
        name: 'Motorsport',
        address: 'https://www.motorsport.com/f1/news/',
        base: 'https://www.motorsport.com',
    },
]

const motorsport = []

sources.forEach(source => {
    axios.get(source.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $((".ms-grid-hor-items-1-2-3-4-5 a.ms-item_link--text"), html).each(function() {
            const title = $(this).text().trim()
            const url = $(this).attr('href')

            motorsport.push({
                title,
                url: source.base + url,
                source: source.name,
            })
            if(motorsport.length===5) return false
        })
    })
})

module.exports = motorsport