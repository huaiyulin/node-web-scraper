var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

request('http://www.rt-mart.com.tw/direct/index.php?action=product_sort&prod_sort_uid=3748&prod_size=&p_data_num=18&usort=auto_date%2CDESC&page=1', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    $('.for_imgbox').each(function(i, element){
      // Select the previous element
      var data = $(this);
      // Get the rank by parsing the element two levels above the "a" element
      var title = data.children().first().children().first().attr('title');
      // Parse the link title
      var image = data.children().first().children().first().attr('src');
      // Parse the href attribute from the "a" element
      var url = data.children().first().attr('href');
      // Our parsed meta data object
      var metadata = {
        title: title,
        url: url,
        image: image,
      };
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });
    // Log our finished parse results in the terminal
        fs.writeFile('output.json', JSON.stringify(parsedResults, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

    })
  }
});
