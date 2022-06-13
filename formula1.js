const axios = require('axios')
const cheerio = require('cheerio')

const sources = [
    {
        name: 'Formula1.com',
        address: 'https://www.formula1.com/en/latest/all.html',
        base: 'https://www.formula1.com',
    },
]

const formula1 = []

sources.forEach(source => {
    axios.get(source.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $(("#article-list>.container>.row>.f1-latest-listing--grid-item>a[data-tracking*='News']"), html).each(function() {
            let title, level
            if ($(this).text().trim().startsWith('Breaking News')){
                title = ">>> BREAKING! " + $(this).text().trim().substring(13,($(this).text().length)-1).trim()
                level = "Breaking News"
            }
            else if ($(this).text().trim().startsWith('News')){
                title = $(this).text().trim().substring(4,($(this).text().length)-1).trim()
                level = 'News'
            }
            const url = $(this).attr('href')

            formula1.push({
                title,
                url: source.base + url,
                // level
            })
            if(formula1.length===5) return false
        })
    })
})

module.exports = formula1