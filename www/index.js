

const Flutterwave = require('./flutterwave');


function pay(){
    const flutterwave = new Flutterwave()
    flutterwave.makePayment({})
}
