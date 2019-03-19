export const getPaymentDesc = code => {
  switch (code) {
    case '200':
      return 'Request is successful, and transaction is authorize, capture, settlement, cancel, approve challenge transactions, accepted by Midtrans and bank.'
    case '201':
      return 'Transaction successfully sent to bank but the process has not been completed, need manual action from merchant to complete the transaction process.'
    case '202':
      return "Transaction has been processed but is denied by payment provider or Midtrans' fraud detection system."
    case '300':
      return 'Move Permanently, current and all future requests should be directed to the new URL'
    case '400':
      return 'Validation Error, merchant sent bad request data example; validation error, invalid transaction type, invalid credit card format, etc.'
    case '401':
      return 'Access denied due to unauthorized transaction, please check client key or server key'
    case '402':
      return "Merchant doesn't have access for this payment type"
    case '403':
      return 'The requested resource is only capable of generating content not acceptable according to the accepting headers that sent in the request'
    case '404':
      return 'The requested resource/transaction is not found'
    case '405':
      return 'Http method is not allowed'
    case '406':
      return 'Duplicate order ID. Order ID has already been utilized previously'
    case '407':
      return 'Expired transaction'
    case '408':
      return 'Merchant sent the wrong data type'
    case '409':
      return 'Merchant has sent too many transactions for the same card number'
    case '410':
      return 'Merchant account is deactivated. Please contact Midtrans support'
    case '411':
      return 'Token id is missing, invalid, or timed out'
    case '412':
      return 'Merchant cannot modify status of the transaction'
    case '413':
      return 'The request cannot be processed due to malformed syntax in the request body'
    case '414':
      return 'Refund request is rejected due to invalid amount'
    case '500':
      return 'Internal Server Error.'
    case '501':
      return 'The feature has not available.'
    case '502':
      return 'Internal Server Error: Bank Connection Problem.'
    case '503':
      return 'Bank/partner is experiencing connection issue.'
    case '504':
      return 'Internal Server Error: Fraud detection is unavailable.'
    case '505':
      return 'The requested payment reference is not available. Either try again to use different one.'
    default:
      return 'Error occured during transaction'
  }
}
