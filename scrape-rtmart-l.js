avar fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var pageNum = 1;
var parsedResults = [];

var func = function(pageNum){
  var linkUrl ="http://www.rt-mart.com.tw/direct/index.php?action=product_sort&prod_sort_uid=3748&prod_size=&p_data_num=72&usort=auto_date%2CDESC&page=" + pageNum.toString();
  request(linkUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      console.log(linkUrl);
      $('.for_imgbox').each(function(i, element){
        // Select the previous element
        var data = $(this);
        var url = data.children().first().attr('href');
        var metadata = url;
        // Push meta-data into parsedResults array
        parsedResults.push(metadata);
      });
      }
      // Log our finished parse results in the terminal
          var output = 'output' + pageNum.toString() + '.json'
          fs.writeFile(output, JSON.stringify(parsedResults, null, 4), function(err){
      console.log(output);
      console.log('File successfully written! - Check your project directory for the output.json file');

      })
    
  });
}
for(pageNum ; pageNum < 20 ; pageNum++){
  func(pageNum);
}