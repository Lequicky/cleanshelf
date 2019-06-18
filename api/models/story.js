class Story {
    constructor(header, summary, category, tags, author, url, published, imgUrl){
        this.header= header;
        this.summary = summary;
        this.category = category;
        this.tags = tags;
        this.author = author;
        this.url = url;
        this.published = published;
        this.imgUrl = imgUrl;
    }
}

module.exports = Story;