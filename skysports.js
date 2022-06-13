const axios = require('axios')
const cheerio = require('cheerio')

const sources = [
    {
        name: 'SkySportsF1',
        address: 'https://www.skysports.com/f1/news',
        base: '',
    },
]

const skysports = []

sources.forEach(source => {
    axios.get(source.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $((".news-list a.news-list__headline-link"), html).each(function() {
            const title = $(this).text().trim()
            const url = $(this).attr('href')

            skysports.push({
                title,
                url: source.base + url,
                source: source.name,
            })
            if(skysports.length===5) return false
        })
    })
})

module.exports = skysports