const inlineScript = "https://checkout.flutterwave.com/v3.js"

function initFlutterwave(){
    return  new Promise((resolve, reject)=>{

        if (!document.querySelector(`[src="${inlineScript}"]`)) {
            const script = document.createElement('script')
            script.src = inlineScript;
            document.body.appendChild(script)
            fetch("https://checkout.flutterwave.com/v3.js",{ mode: 'no-cors'})
                .then(res => {
                    resolve(true)
                })
        }
        else{
            resolve(true)
        }
    } )

}

function payWithFlutterwaveAsync(paymentData) {
  return  initFlutterwave().then(
        () => { return new Promise(function (resolve, reject) {
            let payData = {
                ...paymentData,
                callback: ($event) => {
                    resolve($event)
                },
                onclose: () => resolve('closed'),

            };
            window.FlutterwaveCheckout(payData)

        })}
    )
}

function payWithFlutterwave(paymentData) {
      initFlutterwave().then(
        () => {
            window.FlutterwaveCheckout(paymentData)
        }
    )
}

function closePaymentModal(waitDuration = 0) {
    setTimeout(() => {
        document.getElementsByName('checkout')[0].setAttribute('style',
            'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
        document.body.style.overflow = '';
        // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
    }, waitDuration * 1000)
}
