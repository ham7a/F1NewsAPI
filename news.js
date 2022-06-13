const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

const sources = [
    {
        name: 'Motorsport',
        address: 'https://www.motorsport.com/f1/news/',
        base: 'https://www.motorsport.com',
    },
    {
        name: 'Formula1',
        address: 'https://www.formula1.com/en/latest/all.html',
        base: 'https://www.formula1.com',
    },
    {
        name: 'SkySportsF1',
        address: 'https://www.skysports.com/f1/news',
        base: '',
    },
]

const news = []

sources.forEach(source => {
    axios.get(source.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        switch(source.name){
            case "Motorsport": {
                $((".ms-grid-hor-items-1-2-3-4-5 a.ms-item_link--text"), html).each(function() {
                    const title = $(this).text().trim()
                    const url = $(this).attr('href')

                    news.push({
                        title,
                        url: source.base + url,
                        source: source.name,
                    })
                    // if(news.length===15) return false
                })
            }
            break
            case "Formula1":{
                $(("#article-list>.container>.row>.f1-latest-listing--grid-item>a[data-tracking*='News']"), html).each(function() {
                    const title = $(this).text().trim().substring(4,($(this).text().length)-1).trim()
                    const url = $(this).attr('href')

                    news.push({
                        title,
                        url: source.base + url,
                        source: source.name,
                    })
                    // if(news.length===15) return false
                })
            }
            break
            case "SkySportsF1":{
                $((".news-list a.news-list__headline-link"), html).each(function() {
                    const title = $(this).text().trim()
                    const url = $(this).attr('href')

                    news.push({
                        title,
                        url: source.base + url,
                        source: source.name,
                    })
                    // if(news.length===15) return false
                })
            }
            break
            default: null
        }
    })
})

module.exports = news