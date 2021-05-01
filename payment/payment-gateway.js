const GenerateResponse = intent => {
    if (intent.status === 'succeeded') {
      return {
        success: true
      };
    } else {
      // Invalid status
      return {
        error: 'Invalid PaymentIntent status'
      };
    }
  };

  module.exports = GenerateResponse;