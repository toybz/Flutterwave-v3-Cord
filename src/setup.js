var copyFile = (file, dir2)=>{

    var fs = require('fs');
    var path = require('path');
    var f = path.basename(file);
    var source = fs.createReadStream(file);
    var dest = fs.createWriteStream(path.resolve(dir2, f));

    source.pipe(dest);
    source.on('end', function() { console.log('Successfully created flutterwave.js in the www/js folder'); console.log('You can now add the created flutterwave.js script to the payment page');  });
    source.on('error', function(err) { console.log(err); });
};

//example, copy file1.htm from 'test/dir_1/' to 'test/'
copyFile('dist/flutterwave.js', './www/js');
