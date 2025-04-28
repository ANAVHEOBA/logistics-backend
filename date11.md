ths create a zone as an admn : a@a:~/logistics-backend$ a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/zones -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1ODU0NDcwLCJleHAiOjE3NDU5NDA4NzB9.lFIk2YGsIE4OxaxYR0blm0tjwtOXQAzQxe2yCaDwVLQ" -H "Content-Type: application/json" -d '{
  "name": "Lagoss",
  "deliveryPrice": 2000,
  "isActive": true
}'
{"success":true,"data":{"name":"Lagoss","deliveryPrice":2000,"isActive":true,"_id":"680fa0ed91e0e80ab6fddc49","createdAt":"2025-04-28T15:38:21.407Z","updatedAt":"2025-04-28T15:38:21.407Z","__v":0}}a@a:~/Downloads/logistics-backend$ 


2. ths verfy that the zone was created : a@a:~/logistics-backend$ curl -X GET http://localhost:5000/api/zones
{"success":true,"data":[{"_id":"67cd79b5909d2026ccbca928","name":"Lagos","deliveryPrice":2000,"isActive":true,"createdAt":"2025-03-09T11:21:25.315Z","updatedAt":"2025-03-09T11:21:25.315Z","__v":0}]}a@a:~/logistics-backend$ 



3. ths places an order for a consumer : a@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/orders/consumer/place-order \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQxNTE4NTQ1LCJleHAiOjE3NDE2MDQ5NDV9.UAgFG5K6ItwdWcaXwKYPggR_YfoFNhG6alA75aFU9vw" \
-H "Content-Type: application/json" \
-d '{
  "storeId": "67b7410f256d7687d08935fd",
  "items": [
    {
      "productId": "67b70692de8de32b32ce938e",
      "quantity": 2
}'"specialInstructions": "Please handle with care"
{"success":true,"data":{"userId":"67bdba50fcb27218d15deab7","guestInfo":{"email":"placeholder@example.com","firstName":"placeholder","lastName":"placeholder","phone":"placeholder"},"pickupAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"},"deliveryAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"MEDIUM","status":"PENDING","price":4000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":99.98,"variantData":[],"_id":"67cd7a04909d2026ccbca934"}],"specialInstructions":"Please handle with care","_id":"67cd7a04909d2026ccbca933","trackingNumber":"LG-20250309-ED713","estimatedWeight":20,"estimatedDeliveryDate":"2025-03-12T11:22:45.449Z","createdAt":"2025-03-09T11:22:45.460Z","updatedAt":"2025-03-09T11:22:45.460Z","__v":0}}a@a:~/logistics-backend$ 






4. paystac ntalzaton ln or endpont : a@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/payments/initialize \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQxNTE4NTQ1LCJleHAiOjE3NDE2MDQ5NDV9.UAgFG5K6ItwdWcaXwKYPggR_YfoFNhG6alA75aFU9vw" \
-H "Content-Type: application/json" \
-d '{
  "orderId": "67cd7a04909d2026ccbca933",
  "email": "anavheobawisdom@gmail.com"
}'
{"success":true,"data":{"authorization_url":"https://checkout.paystack.com/z0urbm1pksrzgci","access_code":"z0urbm1pksrzgci","reference":"ORDER_67cd7a04909d2026ccbca933_1741520970142"}}a@a:~/logistics-backend$ 



5. to get the status of a transacton after payment : a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/orders/consumer/orders/67cd7a04909d2026ccbca933" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQxNTE4NTQ1LCJleHAiOjE3NDE2MDQ5NDV9.UAgFG5K6ItwdWcaXwKYPggR_YfoFNhG6alA75aFU9vw"
{"success":true,"data":{"guestInfo":{"email":"placeholder@example.com","firstName":"placeholder","lastName":"placeholder","phone":"placeholder"},"_id":"67cd7a04909d2026ccbca933","userId":"67bdba50fcb27218d15deab7","pickupAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"},"deliveryAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"MEDIUM","status":"PENDING","price":4000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":99.98,"variantData":[],"_id":"67cd7a04909d2026ccbca934"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250309-ED713","estimatedWeight":20,"estimatedDeliveryDate":"2025-03-12T11:22:45.449Z","createdAt":"2025-03-09T11:22:45.460Z","updatedAt":"2025-03-09T11:22:45.460Z","__v":0}}a@a:~/logistics-backend$ 





6. to verfy payment :    a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/payments/verify/ORDER_67cd7a04909d2026ccbca933_1741520970142" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQxNTE4NTQ1LCJleHAiOjE3NDE2MDQ5NDV9.UAgFG5K6ItwdWcaXwKYPggR_YfoFNhG6alA75aFU9vw"
{"success":true,"data":{"id":4763658089,"domain":"test","status":"success","reference":"ORDER_67cd7a04909d2026ccbca933_1741520970142","receipt_number":null,"amount":400000,"message":null,"gateway_response":"Successful","paid_at":"2025-03-09T11:54:16.000Z","created_at":"2025-03-09T11:49:31.000Z","channel":"card","currency":"NGN","ip_address":"102.89.85.4","metadata":{"order_id":"67cd7a04909d2026ccbca933","cancel_url":"http://localhost:5000/api/payments/cancel/67cd7a04909d2026ccbca933","referrer":"https://checkout.paystack.com/z0urbm1pksrzgci?__cf_chl_tk=r9gk8AfEdCCKH_9oiaCREgiCR_tgMGQpUNx6qKrXfek-1741521187-1.0.1.1-JVeVmi7EdHz8eGsyOXHq6oQfvRdUXAQV7XSHxxbekd8"},"log":{"start_time":1741521229,"time_spent":28,"attempts":1,"errors":0,"success":true,"mobile":false,"input":[],"history":[{"type":"action","message":"Set payment method to: bank_transfer","time":11},{"type":"action","message":"Set payment method to: card","time":25},{"type":"action","message":"Attempted to pay with card","time":27},{"type":"success","message":"Successfully paid with card","time":28}]},"fees":16000,"fees_split":null,"authorization":{"authorization_code":"AUTH_h5gsuk4crv","bin":"408408","last4":"4081","exp_month":"12","exp_year":"2030","channel":"card","card_type":"visa ","bank":"TEST BANK","country_code":"NG","brand":"visa","reusable":true,"signature":"SIG_lOWCUKOCzqchcgN8HtFG","account_name":null,"receiver_bank_account_number":null,"receiver_bank":null},"customer":{"id":249346751,"first_name":null,"last_name":null,"email":"anavheobawisdom@gmail.com","customer_code":"CUS_tyyrfa2yevchn0d","phone":null,"metadata":null,"risk_action":"default","international_format_phone":null},"plan":null,"split":{},"order_id":null,"paidAt":"2025-03-09T11:54:16.000Z","createdAt":"2025-03-09T11:49:31.000Z","requested_amount":400000,"pos_transaction_data":null,"source":null,"fees_breakdown":null,"connect":null,"transaction_date":"2025-03-09T11:49:31.000Z","plan_object":{},"subaccount":{}}}a@a:~/logistics-backend$ 