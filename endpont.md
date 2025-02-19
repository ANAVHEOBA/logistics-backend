aaa@aaa:~/logistics-backend$ curl -X POST \tics-backend$ curl -X POST \
  http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jessicaanavheoba@gmail.com",
    "password": "yourpassword123",
    "name": "Jessica Anavhe",
    "phone": "+1234567890"
  }'
{"success":true,"message":"Registration successful. Please check your email for verification code.","userId":"67b5b5af7dbb3db7e457d7d8"}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/users/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "67b5b5af7dbb3db7e457d7d8",
    "otp": "942823"
  }'
{"success":true,"message":"Email verified successfully"}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ # Login with verified email
curl -X POST \
  http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jessicaanavheoba@gmail.com",
    "password": "yourpassword123"
  }'
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M","user":{"_id":"67b5b5af7dbb3db7e457d7d8","email":"jessicaanavheoba@gmail.com","name":"Jessica Anavhe","isEmailVerified":true}}}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/addresses \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M" \
  -H "Content-Type: application/json" \
  -d '{
    "street": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos State",
    "country": "Nigeria",
    "postalCode": "100001",
    "label": "Home",
    "isDefault": true
  }'
{"success":true,"data":{"userId":"67b5b5af7dbb3db7e457d7d8","street":"123 Main Street","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100001","isDefault":true,"label":"Home","_id":"67b5ba0af6fbd5420ab073d0","createdAt":"2025-02-19T11:01:30.694Z","updatedAt":"2025-02-19T11:01:30.694Z","__v":0}}aaa@aaa:~/logistics-backend$ 




aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/addresses \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M" \
  -H "Content-Type: application/json" \
  -d '{
    "street": "45 Park Avenue",
    "city": "Lagos",
    "state": "Lagos State",
    "country": "Nigeria",
    "postalCode": "100002",
    "label": "Office",
    "isDefault": true
  }'
{"success":true,"data":{"userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","_id":"67b5ba23f6fbd5420ab073d3","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0}}aaa@aaa:~/logistics-backend$ 




aa:~/logistics-backend$ curl curl -X GET \
  http://localhost:5000/api/addresses \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"
{"success":true,"data":[{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},{"_id":"67b5ba0af6fbd5420ab073d0","userId":"67b5b5af7dbb3db7e457d7d8","street":"123 Main Street","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100001","isDefault":false,"label":"Home","createdAt":"2025-02-19T11:01:30.694Z","updatedAt":"2025-02-19T11:01:55.274Z","__v":0}]}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X PUT \
  http://localhost:5000/api/addresses/67b5ba0af6fbd5420ab073d0 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M" \
  -H "Content-Type: application/json" \
  -d '{
    "street": "124 Main Street Updated",
    "isDefault": true
  }'
{"success":true,"data":{"_id":"67b5ba0af6fbd5420ab073d0","userId":"67b5b5af7dbb3db7e457d7d8","street":"124 Main Street Updated","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100001","isDefault":true,"label":"Home","createdAt":"2025-02-19T11:01:30.694Z","updatedAt":"2025-02-19T11:03:28.011Z","__v":0}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backendcurl -X GET \ \
  http://localhost:5000/api/addresses/67b5ba0af6fbd5420ab073d0 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"
{"success":true,"data":{"_id":"67b5ba0af6fbd5420ab073d0","userId":"67b5b5af7dbb3db7e457d7d8","street":"124 Main Street Updated","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100001","isDefault":true,"label":"Home","createdAt":"2025-02-19T11:01:30.694Z","updatedAt":"2025-02-19T11:03:28.011Z","__v":0}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupAddress": "67b5ba23f6fbd5420ab073d3",
    "deliveryAddress": "67b5ba23f6fbd5420ab073d3",
    "packageSize": "MEDIUM",
    "isFragile": true,
    "isExpressDelivery": true,
    "requiresSpecialHandling": false,
    "items": [
      {
  }'"specialInstructions": "Please handle with care, fragile electronics"
{"success":true,"data":{"userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":"67b5ba23f6fbd5420ab073d3","deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","_id":"67b5c1e6d7e37520d0e0532c","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupAddress": "67b5ba23f6fbd5420ab073d3",
    "deliveryAddress": {
      "type": "manual",
      "manualAddress": {
        "street": "15 Victoria Island Road",
        "city": "Lagos",
        "state": "Lagos State",
        "country": "Nigeria",
  }'"specialInstructions": "Please call recipient before delivery"
{"success":true,"data":{"userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","_id":"67b5c5a5df08c1447b73fa6d","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:51:01.422Z","__v":0,"pickupAddressDetails":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddressDetails":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}}}aaa@aaa:~/logistics-backend$ 






aaa@aaa:~/logistics-backend$ curl -X GET \
  http://localhost:5000/api/orders/track/LG-20250219-C0D04 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"
{"success":true,"data":{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:51:01.422Z","__v":0}}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ curl -X GET \
  http://localhost:5000/api/orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"
{"success":true,"data":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:51:01.422Z","__v":0},{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}]}aaa@aaa:~/logistics-backend$ 






aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/orders/67b5c5a5df08c1447b73fa6d/cancel \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"
{"success":true,"data":{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"CANCELLED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:53:22.508Z","__v":0}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X PATCH   http://localhost:5000/api/orders/67b5c5a5df08c1447b73fa6d/status   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"   -H "Content-Type: application/json"   -d '{
    "status": "CONFIRMED"
  }'
{"success":true,"data":{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"CONFIRMED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:55:08.775Z","__v":0}}aaa@aaa:~/logistics-backend$ 






aa@aaa:~/logistics-backend$ curl -X POST   http://localhost:5000/api/orders   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzM5OTYyMDc0LCJleHAiOjE3NDAwNDg0NzR9.38-9GZTRaVemvTWs_JNYfrosyyxJcVFi0lwV0owFj6M"   -H "Content-Type: application/json"   -d '{
    "pickupAddress": "67b5ba23f6fbd5420ab073d3",
    "deliveryAddress": {
      "type": "manual",
      "manualAddress": {
        "street": "15 Victoria Island Road",
        "city": "Lagos",
        "state": "Lagos State",
        "country": "Nigeria",
        "postalCode": "101001",
        "recipientName": "Michael Johnson",
        "recipientPhone": "+2341234567890"
  }'"specialInstructions": "Please call recipient before delivery"
{"success":true,"data":{"userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5e334cdcac4c3a496ea1c"}],"specialInstructions":"Please call recipient before delivery","_id":"67b5e334cdcac4c3a496ea1b","trackingNumber":"LG-20250219-0A7F2","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T13:57:08.207Z","createdAt":"2025-02-19T13:57:08.221Z","updatedAt":"2025-02-19T13:57:08.221Z","__v":0,"pickupAddressDetails":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddressDetails":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}}}aaa@aaa:~/logistics-backend$ 