"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inlineScript = "https://checkout.flutterwave.com/v3.js";

function initFlutterwave() {
  return new Promise(function (resolve, reject) {
    if (!document.querySelector("[src=\"".concat(inlineScript, "\"]"))) {
      var script = document.createElement('script');
      script.src = inlineScript;
      document.body.appendChild(script);
      fetch("https://checkout.flutterwave.com/v3.js", {
        mode: 'no-cors'
      }).then(function (res) {
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });
}

function payWithFlutterwaveAsync(paymentData) {
  return initFlutterwave().then(function () {
    return new Promise(function (resolve, reject) {
      var payData = _objectSpread(_objectSpread({}, paymentData), {}, {
        callback: function callback($event) {
          resolve($event);
        },
        onclose: function onclose() {
          return resolve('closed');
        }
      });

      window.FlutterwaveCheckout(payData);
    });
  });
}

function payWithFlutterwave(paymentData) {
  initFlutterwave().then(function () {
    window.FlutterwaveCheckout(paymentData);
  });
}

function closePaymentModal() {
  var waitDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  setTimeout(function () {
    document.getElementsByName('checkout')[0].setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
    document.body.style.overflow = ''; // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
  }, waitDuration * 1000);
}
