aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/admin/setup \
  -H "Content-Type: application/json"
{"success":true,"data":{"_id":"67b5d03079c759adbb74a902","email":"admin@logistics.com","name":"System Admin","role":"admin"}}aaa@aaa:~/logistics-backend$ 




aaa@aaa:~/logistics-backend$ curl -X POST \
  http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@logistics.com",
    "password": "admin123"
  }'
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw","admin":{"_id":"67b5d03079c759adbb74a902","email":"admin@logistics.com","name":"System Admin","role":"admin"}}}aaa@aaa:~/logistics-backend$ 




aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/users?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"users":[{"_id":"67b5b5af7dbb3db7e457d7d8","email":"jessicaanavheoba@gmail.com","name":"Jessica Anavhe","phone":"+1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-19T10:52:55.055Z","status":"active","createdAt":"2025-02-19T10:42:55.058Z","updatedAt":"2025-02-19T10:44:50.632Z","__v":0},{"_id":"67b5b5417dbb3db7e457d7d5","email":"jessicaanavheoa@gmail.com","name":"Jessica Ana","phone":"+1234567890","isEmailVerified":false,"verificationCode":"481126","verificationCodeExpiry":"2025-02-19T10:51:05.055Z","status":"inactive","createdAt":"2025-02-19T10:41:05.060Z","updatedAt":"2025-02-19T10:41:05.060Z","__v":0},{"_id":"67b5b4997dbb3db7e457d7d2","email":"anavheoabraham@gmail.com","name":"Anavhe Abraham","phone":"+1234567890","isEmailVerified":false,"verificationCode":"719960","verificationCodeExpiry":"2025-02-19T10:48:17.486Z","status":"inactive","createdAt":"2025-02-19T10:38:17.513Z","updatedAt":"2025-02-19T10:38:17.513Z","__v":0},{"_id":"67b5b31638e7858c1dc942c0","email":"wisdomabraham92@gmail.com","name":"Wisdom Abraham","phone":"+1234567890","isEmailVerified":false,"verificationCode":"749858","verificationCodeExpiry":"2025-02-19T10:41:50.887Z","status":"inactive","createdAt":"2025-02-19T10:31:50.917Z","updatedAt":"2025-02-19T10:31:50.917Z","__v":0}],"pagination":{"total":4,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ curl -X GET \     curl -X GET \
  "http://localhost:5000/api/admin/users/67b5b5af7dbb3db7e457d7d8" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"user":{"_id":"67b5b5af7dbb3db7e457d7d8","email":"jessicaanavheoba@gmail.com","name":"Jessica Anavhe","phone":"+1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-19T10:52:55.055Z","status":"active","createdAt":"2025-02-19T10:42:55.058Z","updatedAt":"2025-02-19T10:44:50.632Z","__v":0},"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"CONFIRMED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:55:08.775Z","__v":0},{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}]}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"CONFIRMED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T11:55:08.775Z","__v":0},{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}],"pagination":{"total":2,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 



aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?status=DELIVERED&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"DELIVERED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T13:22:04.180Z","__v":0,"deliveryDate":"2025-02-19T13:22:04.176Z"}],"pagination":{"total":1,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 




aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?status=DELIVERED&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"DELIVERED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T13:22:04.180Z","__v":0,"deliveryDate":"2025-02-19T13:22:04.176Z"}],"pagination":{"totacurl -X GET \,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?status=PENDING&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}],"pagination":{"total":1,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?tracking=LG-20250219&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"DELIVERED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T13:22:04.180Z","__v":0,"deliveryDate":"2025-02-19T13:22:04.176Z"},{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}],"pagination":{"total":2,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 




istics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?startDate=2025-02-19&endDate=2025-02-20&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"DELIVERED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T13:22:04.180Z","__v":0,"deliveryDate":"2025-02-19T13:22:04.176Z"},{"_id":"67b5c1e6d7e37520d0e0532c","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":"67b5ba23f6fbd5420ab073d3","packageSize":"MEDIUM","status":"PENDING","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c1e6d7e37520d0e0532d"}],"specialInstructions":"Please handle with care, fragile electronics","trackingNumber":"LG-20250219-5CB7A","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:35:02.152Z","createdAt":"2025-02-19T11:35:02.165Z","updatedAt":"2025-02-19T11:35:02.165Z","__v":0}],"pagination":{"total":2,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 



istics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders?status=DELIVERED&tracking=LG&startDate=2025-02-19&endDate=2025-02-20&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"orders":[{"_id":"67b5c5a5df08c1447b73fa6d","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"DELIVERED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5c5a5df08c1447b73fa6e"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-C0D04","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T11:51:01.411Z","createdAt":"2025-02-19T11:51:01.422Z","updatedAt":"2025-02-19T13:22:04.180Z","__v":0,"deliveryDate":"2025-02-19T13:22:04.176Z"}],"pagination":{"total":1,"page":1,"limit":10,"pages":1}}}aaa@aaa:~/logistics-backend$ 




aaa@aaa:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/orders/stats" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw"
{"success":true,"data":{"total":2,"totalDelivered":1,"totalPending":1,"totalInTransit":0,"totalCancelled":0,"totalFailedDelivery":0,"todayOrders":2,"todayDelivered":1,"revenue":{"total":4500,"today":4500}}}aaa@aaa:~/logistics-backend$ 





aaa@aaa:~/logistics-backend$ curl -X PATCH \
  "http://localhost:5000/api/admin/orders/67b5e334cdcac4c3a496ea1b/status" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5OTY4NjE4LCJleHAiOjE3NDAwNTUwMTh9.rg6cdmuLapktdYZZcrAjL03dm9Cg9cX_RPTKveStRIw" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONFIRMED",
    "notes": "Order has been confirmed and will be picked up shortly"
  }'
{"success":true,"data":{"order":{"_id":"67b5e334cdcac4c3a496ea1b","userId":"67b5b5af7dbb3db7e457d7d8","pickupAddress":{"_id":"67b5ba23f6fbd5420ab073d3","userId":"67b5b5af7dbb3db7e457d7d8","street":"45 Park Avenue","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"100002","isDefault":true,"label":"Office","createdAt":"2025-02-19T11:01:55.273Z","updatedAt":"2025-02-19T11:01:55.273Z","__v":0},"deliveryAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Michael Johnson","recipientPhone":"+2341234567890"}},"packageSize":"MEDIUM","status":"CONFIRMED","isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"items":[{"name":"iPhone 15 Pro","quantity":1,"description":"New sealed phone","_id":"67b5e334cdcac4c3a496ea1c"}],"specialInstructions":"Please call recipient before delivery","trackingNumber":"LG-20250219-0A7F2","estimatedWeight":20,"price":4500,"estimatedDeliveryDate":"2025-02-20T13:57:08.207Z","createdAt":"2025-02-19T13:57:08.221Z","updatedAt":"2025-02-19T14:04:27.407Z","__v":0},"emailSent":true}}aaa@aaa:~/logistics-backend$ 







a@a:~/logistics-backend$ curl -X PATCH "http://localhost:5000/api/admin/orders/67b7616b20507d372067b2f2/status" \d372067b2f2/status" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMDczNTQ2LCJleHAiOjE3NDAxNTk5NDZ9.fIwujVWsxlmseh2HUayYgsWyemLwdCoNsfQK9xHqQW0" \
-H "Content-Type: application/json" \
-d '{
  "status": "CONFIRMED",
  "notes": "Order confirmed and ready for pickup"
}'
{"success":true,"data":{"order":{"guestInfo":{"email":"guest@example.com","firstName":"John","lastName":"Doe","phone":"+2341234567890"},"_id":"67b7616b20507d372067b2f2","pickupAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890"},"deliveryAddress":{"street":"123 Guest Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"SMALL","status":"CONFIRMED","isFragile":true,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-02-23T17:07:55.335Z","items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":1,"price":49.99,"variantData":[{"name":"Size","value":"M","price":59.99,"_id":"67b7616b20507d372067b2f7"}],"_id":"67b7616b20507d372067b2f9"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250220-219D6","estimatedWeight":5,"price":1500,"createdAt":"2025-02-20T17:07:55.357Z","updatedAt":"2025-02-20T17:49:07.138Z","__v":1},"emailSent":true}}a@a:~/logistics-backend$ 





@a:~/logistics-backend$ curl -X PATCH "http://localhost:5000/api/admin/orders/67b7616b20507d372067b2f2/status" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMDczNTQ2LCJleHAiOjE3NDAxNTk5NDZ9.fIwujVWsxlmseh2HUayYgsWyemLwdCoNsfQK9xHqQW0" \
-H "Content-Type: application/json" \
-d '{
  "status": "PICKED_UP",
  "notes": "Package picked up from store"
}'
{"success":true,"data":{"order":{"guestInfo":{"email":"guest@example.com","firstName":"John","lastName":"Doe","phone":"+2341234567890"},"_id":"67b7616b20507d372067b2f2","pickupAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890"},"deliveryAddress":{"street":"123 Guest Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"SMALL","status":"PICKED_UP","isFragile":true,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-02-23T17:07:55.335Z","items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":1,"price":49.99,"variantData":[{"name":"Size","value":"M","price":59.99,"_id":"67b7616b20507d372067b2f7"}],"_id":"67b7616b20507d372067b2f9"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250220-219D6","estimatedWeight":5,"price":1500,"createdAt":"2025-02-20T17:07:55.357Z","updatedAt":"2025-02-20T17:49:43.853Z","__v":1},"emailSent":true}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ curl -X PATCH "http://localhost:5000/api/admin/orders/67b7616b20507d372067b2f2/status" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMDczNTQ2LCJleHAiOjE3NDAxNTk5NDZ9.fIwujVWsxlmseh2HUayYgsWyemLwdCoNsfQK9xHqQW0" \
-H "Content-Type: application/json" \
-d '{
  "status": "IN_TRANSIT",
  "notes": "Package in transit to delivery location"
}'
{"success":true,"data":{"order":{"guestInfo":{"email":"guest@example.com","firstName":"John","lastName":"Doe","phone":"+2341234567890"},"_id":"67b7616b20507d372067b2f2","pickupAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890"},"deliveryAddress":{"street":"123 Guest Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"SMALL","status":"IN_TRANSIT","isFragile":true,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-02-23T17:07:55.335Z","items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":1,"price":49.99,"variantData":[{"name":"Size","value":"M","price":59.99,"_id":"67b7616b20507d372067b2f7"}],"_id":"67b7616b20507d372067b2f9"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250220-219D6","estimatedWeight":5,"price":1500,"createdAt":"2025-02-20T17:07:55.357Z","updatedAt":"2025-02-20T17:50:05.839Z","__v":1},"emailSent":true}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ curl -X PATCH "http://localhost:5000/api/admin/orders/67b7616b20507d372067b2f2/status" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMDczNTQ2LCJleHAiOjE3NDAxNTk5NDZ9.fIwujVWsxlmseh2HUayYgsWyemLwdCoNsfQK9xHqQW0" \
-H "Content-Type: application/json" \
-d '{
  "status": "DELIVERED",
  "notes": "Package successfully delivered to recipient"
}'
{"success":true,"data":{"order":{"guestInfo":{"email":"guest@example.com","firstName":"John","lastName":"Doe","phone":"+2341234567890"},"_id":"67b7616b20507d372067b2f2","pickupAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890"},"deliveryAddress":{"street":"123 Guest Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"SMALL","status":"DELIVERED","isFragile":true,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-02-23T17:07:55.335Z","items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":1,"price":49.99,"variantData":[{"name":"Size","value":"M","price":59.99,"_id":"67b7616b20507d372067b2f7"}],"_id":"67b7616b20507d372067b2f9"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250220-219D6","estimatedWeight":5,"price":1500,"createdAt":"2025-02-20T17:07:55.357Z","updatedAt":"2025-02-20T17:50:49.360Z","__v":1},"emailSent":true}}a@a:~/logistics-backend$ 






a@a:~/logistics-backend$ curl -X GET \
  http://localhost:5000/api/admin/consumers \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc"
{"success":true,"data":{"consumers":[{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","password":"$2b$10$65XAQBscgQGyiWF.6pMRuuTToKGgFPcleAcjrUy4TgkUsYmCBkoTC","firstName":"Wisdom","lastName":"Anavheoba","phone":"+1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-25T12:42:24.238Z","status":"active","createdAt":"2025-02-25T12:40:48.683Z","updatedAt":"2025-02-25T14:37:49.417Z","__v":0,"lastLoginAt":"2025-02-25T14:37:49.413Z"},{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdac4b8596f8febbf86300","email":"momoduabraham413@gmail.com","password":"$2b$10$Ft/qXP7iM1LvnaQJY4Xn7.zqlvZgybHISoDOkiUrxarufLA1gHSCu","firstName":"Abraham","lastName":"Momodu","phone":"+1234567890","isEmailVerified":false,"verificationCode":"681544","verificationCodeExpiry":"2025-02-25T11:50:59.395Z","status":"inactive","createdAt":"2025-02-25T11:40:59.398Z","updatedAt":"2025-02-25T11:40:59.398Z","__v":0},{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdabd68596f8febbf862fd","email":"consumer@example.com","password":"$2b$10$7LSd9mjW56yinyF1wePbV.H6ybSDcQrR4w2Q8ls7RmYbBTWZERqm2","firstName":"John","lastName":"Doe","phone":"+1234567890","isEmailVerified":false,"verificationCode":"732465","verificationCodeExpiry":"2025-02-25T11:49:02.330Z","status":"inactive","createdAt":"2025-02-25T11:39:02.350Z","updatedAt":"2025-02-25T11:39:02.350Z","__v":0}],"pagination":{"total":3,"page":1,"limit":10,"pages":1}}}a@a:~/logistcurl -X GET \curl -X GET \
  http://localhost:5000/api/admin/consumers/67bdba50fcb27218d15deab7 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc"
{"success":true,"data":{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","password":"$2b$10$65XAQBscgQGyiWF.6pMRuuTToKGgFPcleAcjrUy4TgkUsYmCBkoTC","firstName":"Wisdom","lastName":"Anavheoba","phone":"+1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-25T12:42:24.238Z","status":"active","createdAt":"2025-02-25T12:40:48.683Z","updatedAt":"2025-02-25T14:37:49.417Z","__v":0,"lastLoginAt":"2025-02-25T14:37:49.413Z"}}a@acurl -X GET \backend$ curl -X GET \
  http://localhost:5000/api/admin/consumers/67bdba50fcb27218d15deab7/orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc"
{"success":true,"data":{"orders":[{"guestInfo":{"email":"placeholder@example.com","firstName":"placeholder","lastName":"placeholder","phone":"placeholder"},"_id":"67bde7e65646839d00bf2f7e","userId":"67bdba50fcb27218d15deab7","pickupAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"},"deliveryAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"MEDIUM","status":"PENDING","price":2000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":99.98,"variantData":[],"_id":"67bde7e65646839d00bf2f7f"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250225-CBA26","estimatedWeight":20,"estimatedDeliveryDate":"2025-02-28T15:55:18.191Z","createdAt":"2025-02-25T15:55:18.206Z","updatedAt":"2025-02-25T15:55:18.206Z","__v":0}],"pagination":{"total":1,"page":1,"limit":10,"pages":1}}}a@a:~/logisa@a:~/logistics-backend$ curl -X PATCH \
  http://localhost:5000/api/admin/consumers/67bdba50fcb27218d15deab7/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive"
  }'
{"success":true,"data":{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","password":"$2b$10$65XAQBscgQGyiWF.6pMRuuTToKGgFPcleAcjrUy4TgkUsYmCBkoTC","firstName":"Wisdom","lastName":"Anavheoba","phone":"+1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-25T12:42:24.238Z","status":"inactive","createdAt":"2025-02-25T12:40:48.683Z","updatedAt":"2025-02-25T16:55:21.286Z","__v":0,"lastLoginAt":"2025-02-25T14:37:49.413Z"}}acurl -X GET \s-backend$ curl -X GET \
  http://localhost:5000/api/admin/consumers/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc"







  a@a:~/logistics-backend$ curl -X GET   http://localhost:5000/api/admin/consumers/stats   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc"
{"success":true,"data":{"total":3,"active":0,"inactive":3,"newToday":3,"newThisWeek":3,"newThisMonth":3}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ curl -X PATCH \ \
  http://localhost:5000/api/admin/orders/67bde7e65646839d00bf2f7e/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNTAyMzAyLCJleHAiOjE3NDA1ODg3MDJ9.O1URRKiM-ggKKXF8ugZpGpDrd3VSRHoFcAaPUNJkztc" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_TRANSIT",
    "notes": "Package is now in transit to delivery location"
  }'
{"success":true,"data":{"order":{"guestInfo":{"email":"placeholder@example.com","firstName":"placeholder","lastName":"placeholder","phone":"placeholder"},"_id":"67bde7e65646839d00bf2f7e","userId":"67bdba50fcb27218d15deab7","pickupAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"},"deliveryAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"MEDIUM","status":"IN_TRANSIT","price":2000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":99.98,"variantData":[],"_id":"67bde7e65646839d00bf2f7f"}],"specialInstructions":"Please handle with care","trackingNumber":"LG-20250225-CBA26","estimatedWeight":20,"estimatedDeliveryDate":"2025-02-28T15:55:18.191Z","createdAt":"2025-02-25T15:55:18.206Z","updatedAt":"2025-02-25T17:26:58.816Z","__v":0},"emailSent":true}}a@a:~/logistics-backend$