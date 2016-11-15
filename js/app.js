// Generated by CoffeeScript 1.11.1
(function() {
  var getGiftPriceAmount,
    hasProp = {}.hasOwnProperty;

  window.PagSeguro = {
    sessionId: '0a89a3cb287444e59066e4053f6a83f9',
    imageHost: 'https://stc.pagseguro.uol.com.br',
    image: {}
  };

  getGiftPriceAmount = function() {
    return parseFloat($('input[name=giftPrice]:checked', '#quota').val());
  };

  PagSeguro.startPaymentFlow = function() {
    this.senderHash = PagSeguroDirectPayment.getSenderHash();
    PagSeguroDirectPayment.getPaymentMethods({
      amount: getGiftPriceAmount(),
      complete: this.displayPaymentMethods
    });
  };

  PagSeguro.displayPaymentMethods = function(response) {
    if (response.error) {
      console.log('1. displayPaymentMethods -> error');
    } else {
      console.log('1. displayPaymentMethods -> ok');
      PagSeguro.paymentMethods = response.paymentMethods;
      PagSeguro.setImagePaths();
    }
  };

  PagSeguro.setImagePaths = function() {
    var base, imageObject, imageSize, methodParams, paymentMethod, ref, results, specificMethod, specificOptions;
    ref = this.paymentMethods;
    results = [];
    for (paymentMethod in ref) {
      if (!hasProp.call(ref, paymentMethod)) continue;
      methodParams = ref[paymentMethod];
      (base = this.image)[paymentMethod] || (base[paymentMethod] = {});
      results.push((function() {
        var base1, ref1, results1;
        ref1 = methodParams.options;
        results1 = [];
        for (specificMethod in ref1) {
          if (!hasProp.call(ref1, specificMethod)) continue;
          specificOptions = ref1[specificMethod];
          (base1 = this.image[paymentMethod])[specificMethod] || (base1[specificMethod] = {});
          results1.push((function() {
            var ref2, results2;
            ref2 = specificOptions.images;
            results2 = [];
            for (imageSize in ref2) {
              if (!hasProp.call(ref2, imageSize)) continue;
              imageObject = ref2[imageSize];
              results2.push(this.image[paymentMethod][specificMethod][imageSize] = this.imageHost + imageObject.path);
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  $(document).ready(function() {
    PagSeguroDirectPayment.setSessionId(PagSeguro.sessionId);
    $('#quota input').on('change', function() {
      return console.log('valor', getGiftPriceAmount());
    });
  });

}).call(this);
