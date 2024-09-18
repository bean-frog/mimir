const axios = require('axios');
const config = require('./config.json');

async function searchSage(query) {
    try {
        const response = await axios.get(`https://api.crossref.org/journals/2158-2440/works?query=${query}`, {
            headers: {
                'User-Agent': config['crossref-ua']
            }
        });
        let responseArray = []

        response.data.message.items.forEach(item => {
         let author;
         let author1 = item.author[0]
 
             if (item.author.length > 2 ) {
                 author = `${author1.given} ${author1.family} et al.`
             } else if (item.author.length = 2) {
                 let author2 = item.author[1]
                 author = `${author1.given} ${author1.family}, ${author2.given} ${author2.family}`
             } else if (item.author.length = 1) {
                 author = `${author1.given} ${author1.family}`
             } else {
                 console.log("if youre seeing this something went VERY wrong")
             }
             let temp = {
                 title: item.title[0],
                 author: author,
                 doi: item.DOI,
                 year: item.published["date-parts"][0][0],
                 source: item.publisher
             }
             responseArray.push(temp)
        });
        return responseArray;
    } catch (error) {
        console.error('Error searching Sage:', error);
    }
}

async function searchPlos(query) {
    try {
        const response = await axios.get(`https://api.crossref.org/journals/1932-6203/works?query=${query}`, {
            headers: {
                'User-Agent': config['crossref-ua']
            }
        });
        let responseArray = []

        response.data.message.items.forEach(item => {
         let author;
         let author1 = item.author[0]
 
             if (item.author.length > 2 ) {
                 author = `${author1.given} ${author1.family} et al.`
             } else if (item.author.length = 2) {
                 let author2 = item.author[1]
                 author = `${author1.given} ${author1.family}, ${author2.given} ${author2.family}`
             } else if (item.author.length = 1) {
                 author = `${author1.given} ${author1.family}`
             } else {
                 console.log("if youre seeing this something went VERY wrong")
             }
         //console.log(item.author[0].given) //correctly outputs the authors name
             let temp = {
                 title: item.title[0],
                 author: author,
                 doi: item.DOI,
                 year: item.published["date-parts"][0][0],
                 source: item.publisher
             }
             responseArray.push(temp)
        });
        return responseArray;
    } catch (error) {
        console.error('Error searching PLOS One:', error);
    }
}

async function searchArxiv(query) {
    try {
        const response = await axios.get(`https://api.crossref.org/journals/2331-8422/works?query=${query}`, {
            headers: {
                'User-Agent': config['crossref-ua']
            }
        });
        let responseArray = []

        response.data.message.items.forEach(item => {
         let author;
         let author1 = item.author[0]
 
             if (item.author.length > 2 ) {
                 author = `${author1.given} ${author1.family} et al.`
             } else if (item.author.length = 2) {
                 let author2 = item.author[1]
                 author = `${author1.given} ${author1.family}, ${author2.given} ${author2.family}`
             } else if (item.author.length = 1) {
                 author = `${author1.given} ${author1.family}`
             } else {
                 console.log("if youre seeing this something went VERY wrong")
             }
         //console.log(item.author[0].given) //correctly outputs the authors name
             let temp = {
                 title: item.title[0],
                 author: author,
                 doi: item.DOI,
                 year: item.published["date-parts"][0][0],
                 source: item.publisher
             }
             responseArray.push(temp)
        });
        return responseArray;
    } catch (error) {
        console.error('Error searching ArXiv.org:', error);
    }
}

async function searchRsf(query) {
    try {
        const response = await axios.get(`https://api.crossref.org/journals/2377-8261/works?query=${query}`, {
            headers: {
                'User-Agent': config['crossref-ua']
            }
        });
        let responseArray = []

        response.data.message.items.forEach(item => {
         let author;
         let author1 = item.author[0]
 
             if (item.author.length > 2 ) {
                 author = `${author1.given} ${author1.family} et al.`
             } else if (item.author.length = 2) {
                 let author2 = item.author[1]
                 author = `${author1.given} ${author1.family}, ${author2.given} ${author2.family}`
             } else if (item.author.length = 1) {
                 author = `${author1.given} ${author1.family}`
             } else {
                 console.log("if youre seeing this something went VERY wrong")
             }
         //console.log(item.author[0].given) //correctly outputs the authors name
             let temp = {
                 title: item.title[0],
                 author: author,
                 doi: item.DOI,
                 year: item.published["date-parts"][0][0],
                 source: item.publisher
             }
             responseArray.push(temp)
        });
        return responseArray;
    } catch (error) {
        console.error('Error searching RSF:', error);
    }
}

module.exports = {searchSage, searchPlos, searchArxiv, searchRsf}