
<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo-colored.svg" width="50%"/>
</p>


# Flutterwave v3 Cordova Library

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [References](#references)

<a id="about"></a>
## About

Flutterwave official Cordova library to accept payment via  card , USSD, QrCode, Mobile Money etc in your hybrid apps builds.

<a id="getting-started"></a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.
See [references](#references) for links to dashboard and API documentation.


### Prerequisites

```
Node version >= 6.9.x and npm >= 3.x.x
Cordova  
Flutterwave version 3 API keys

```

Cordova doesn't allow navigation to external urls inside the app by default hence you may need to:

Add the code below in your config.xml (Important)
```html
<allow-navigation href="*">
 ```

Replace the meta tag that sets your Content-Security-Policy with the code below (Important) :
```html
<meta http-equiv="Content-Security-Policy" content="font-src 'self' data:; img-src * data:; default-src gap://ready file://* *; script-src 'self' 'unsafe-inline' 'unsafe-eval' * ; style-src 'self' 'unsafe-inline' *">
 ```

### Installing


Install the SDK

```bash
$ npm install flutterwave-v3-cordova-sdk
# or
$ yarn add flutterwave-v3-cordova-sdk
```

Then run the following code in your terminal when the installation completes:

```bash
$ cd node_modules/flutterwave-v3-cordova-sdk && npm start
```

**NOTE:** This will create a ***flutterwave.js*** file in the www/js folder

<a id="usage"></a>

## Usage

Link the flutterwave.js file to the index.html (or any other page) in www directory using the following script tag after the closing ***body*** tag
   
```html
<script type="text/javascript" src="js/flutterwave.js"></script>
```

> With flutterwave.js now linked, you can call any of these methods to open the payment page "payWithFlutterwaveAsync()" and "payWithFlutterwave()" (explanations below).
> 

 **1:- payWithFlutterwaveAsync(paymentObject):**
This allows you to asynchronously open the payment page and perform any operations after the payment is completed. See sample below:

   ```javascript
    payWithFlutterwaveAsync({
        public_key: "FLWPUBK_TEST-4550165677fdcf951548729e3ff6b950-X",
        tx_ref: "Ref-4550165677fdcf951548729e3ff6b950",
        amount: 100,
        currency: "NGN",
        country: "NG",
        payment_options: "",
        meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
            email: "test@gmail.com",
            phone_number: "08100000000",
            name: "Flutterwave Developers",
        },
        customizations: {
            title: "My store",
            description: "Payment for items in cart",
            logo: "https://assets.piedpiper.com/logo.png",
        } ,
    }).then(function(response){
        console.log(response)
      closePaymentModal() // use this to close the payment modal
            }
    )
  
```
    

    
**2:- payWithFlutterwave(paymentObjectIncludingCallbackFunction) :**
This allows you to open the payment page passing the payment object and callback function

  ```javascript
    payWithFlutterwave({
 public_key: "FLWPUBK_TEST-4550165677fdcf951548729e3ff6b950-X",
 tx_ref: "susysvdus"+Math.random(),
 amount: 100,
 currency: "NGN",
 country: "NG",
 payment_options: "",
 meta: {
  consumer_id: 23,
  consumer_mac: "92a3-912ba-1192a",
 },
 customer: {
  email: "test@gmail.com",
  phone_number: "081000000",
  name: "Flutterwave Developers",
 },
 customizations: {
  title: "My store",
  description: "Payment for items in cart",
  logo: "https://assets.piedpiper.com/logo.png",
 } ,
 callback: function(response){
     //handle response here
     console.log(response)
     closePaymentModal()
  
 }
})

   ```


**3:- closePaymentModal():**
 Use this to close the payment page.



**Payment option parameters and descriptions:**

| Parameter  | Always Required ? | Description |
| ------------- | ------------- | ------------- |
| public_key  | True  | Your API public key |
| tx_ref  | True  | Your transaction reference. This MUST be unique for every transaction |
| amount  | True  | Amount to charge the customer. |
| currency  | False  | currency to charge in. Defaults to NGN|
| integrity_hash  | False  | This is a sha256 hash of your FlutterwaveCheckout values, it is used for passing secured values to the payment gateway. |
| payment_options  | True  | This specifies the payment options to be displayed e.g - card, mobilemoney, ussd and so on.  |
| payment_plan  | False  | This is the payment plan ID used for Recurring billing|
| redirect_url  | False  | URL to redirect to when a transaction is completed. This is useful for 3DSecure payments so we can redirect your customer back to a custom page you want to show them.  |
| customer  | True  | This is an object that can contains your customer details: e.g - 'customer': {'email': 'example@example.com','phonenumber': '08012345678','name': 'Takeshi Kovacs' } |
| subaccounts  | False  | This is an array of objects containing the subaccount IDs to split the payment into. Check our Split Payment page for more info |
| meta  | False  | This is an object that helps you include additional payment information to your request e.g {'consumer_id': 23,'consumer_mac': '92a3-912ba-1192a' } |
|  customizations | True  | This is an object that contains title, logo, and description you want to display on the modal e.g{'title': 'Pied Piper Payments','description': 'Middleout isn't free. Pay the price','logo': 'https://assets.piedpiper.com/logo.png'  } |
| callback (function)  | False  | This is the function that runs after payment is completed  |
| close (function)  | False  | This is the function that runs after payment modal is closed  |


**Provided functions and their descriptions:**

| Method Name  | Parameters  | Returns |Description |
| ------------- | ------------- | ------------- | ------------- |
| payWithFlutterwave  |  InlinePaymentOptions : Object  | Null | This methods allows you to setup and open the payment modal  |
| payWithFlutterwaveAsync  |  AsyncPaymentOptions : Object  | Promise | This methods allows you to setup and open the payment modal via code and returns a promise containing the payment response |
| closePaymentModal  |  waitDuration : number (Optional, default = 0)  | Null | This methods allows you to close the payment modal via code. You can setup the wait time before modal close |


<a id="deployment"></a>
## Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key from the API tab

<a id="references"></a>
## Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/login)  


