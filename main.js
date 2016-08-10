$(document).ready(function () {
    var quoteObj;

    fetchQuote();

    $("#get-quote-btn").click(fetchQuote);
    $("#share-quote-twitter-btn").click(generateTweet);
    $("#share-quote-tumblr-btn").click(generateTumblr);

    function fetchQuote() {
        $.ajax({
            dataType: "jsonp",
            contentType: "application/json; charset=utf-8;",
            jsonpCallback: "parseQuote",
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&lang=en&format=jsonp&jsonp=parseQuote"
        })
            .done(function (data) {
                quoteObj = data;
                $("#quote-text").text(data.quoteText);
                $("#quote-author").text(data.quoteAuthor);
                updateThemeColor();
            });
    }

    function updateThemeColor() {
        var color = pastelColors();
        $("html body").animate({
            backgroundColor: color,
            color: color
        }, 1000);
        $("#quote-author").animate({ color: color }, 1000);
        $(".btn-theme").animate({ backgroundColor: color }, 1000);
    }

    function generateTweet() {
        if (quoteObj) {
            var tweetUrl = "https://twitter.com/intent/tweet";
            var tweet = {
                text: quoteObj.quoteText + " " + quoteObj.quoteAuthor,
                hashtags: "quotes",
                via: "forismatic",
                url: quoteObj.quoteLink
            };
            window.open(tweetUrl + "?" + $.param(tweet), "popup", "width=540, height=600");
        }

    }

    function generateTumblr() {
        if (quoteObj) {
            var tumblrUrl = "https://www.tumblr.com/widgets/share/tool";
            var tumblr = {
                canonicalUrl: quoteObj.quoteLink,
                posttype: "quote",
                content: quoteObj.quoteText,
                tags: "quotes,forismatic",
                caption: quoteObj.quoteAuthor
            };
            window.open(tumblrUrl + "?" + $.param(tumblr), "popup", "width=540, height=600");
        }
    }

    function pastelColors() {
        var r = (Math.round(Math.random() * 127) + 127).toString(16);
        var g = (Math.round(Math.random() * 127) + 127).toString(16);
        var b = (Math.round(Math.random() * 127) + 127).toString(16);
        return '#' + r + g + b;
    }
});