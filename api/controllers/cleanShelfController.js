'use strict';

const Story = require('../models/story');
const puppeteer = require('puppeteer');

var HTMLParser = require('node-html-parser');
exports.stories = function(req, res) {
    
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.cnet.com/');
        const hrefs = await page.evaluate(
          () => Array.from(document.body.querySelector('.latestScrollItems').querySelectorAll('a'), ({ href }) => href)
        );

        var linki = [];

        var stories = new Array();

        for (const url of hrefs) {
            try{  
                if(!linki.includes(url) && linki.length < 5 ){
                    linki.push(url);
                    await page.goto(url);
                    const header = await page.evaluate(() => document.querySelector('.speakableText').innerText);
                    const summary = await page.evaluate(() => document.querySelector('.article-dek').innerText);
                    const category = await page.evaluate(() => document.querySelector('.bc-2').innerText);
                    const author = await page.evaluate(() => document.querySelector('.author').innerText);
                    const published = await page.evaluate(() => document.querySelector('.timeStamp').innerText);
                    const tagList = await page.evaluate(() => document.querySelector('.tagList').outerHTML);

                    var imgUrl = null;
                    try {
                        imgUrl = await page.evaluate(() => document.querySelector('.shortcode').querySelector('img').src);
                    }
                    catch (err) {
                        console.log(err.meassage);
                    }

                    imgUrl = imgUrl == null ? 'No img' : imgUrl;
                    
                    var root = HTMLParser.parse(tagList.toString());
                    var tags = []
                    for(let i = 1; i< root.childNodes[0].childNodes.length; i+=2){
                        tags.push(root.childNodes[0].childNodes[i].text);
                    }
        
                    stories.push(new Story(header,summary,category, tags, author, url, published, imgUrl))
                    
                }   
              }
            catch (err){
                console.log(err.meassage);
            }
          
        }
    
        await browser.close();
    
        res.json(stories);
      })();

  };




