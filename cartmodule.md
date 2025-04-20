curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp


  curl -X POST http://localhost:5000/api/cart/items \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "67b70692de8de32b32ce938e",
    "quantity": 2,
    "variantData": []
  }' | json_pp




  curl -X PATCH http://localhost:5000/api/cart/items/67bde7e65646839d00bf2f7f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }' | json_pp


  curl -X DELETE http://localhost:5000/api/cart/items/67bde7e65646839d00bf2f7f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp



  curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp


















  a@a:~/Downloads/logistics-backend$ curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    51  100    51    0     0    225      0 --:--:-- --:--:-- --:--:--   225
{
   "data" : {
      "items" : [],
      "totalPrice" : 0
   },
   "success" : true
}
a@a:~/Downloads/logistics-backend$ 











a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/cart/items \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"67b70692de8de32b32ce938e\",\"quantity\":2,\"variantData\":[]}" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   500  100   430  100    70    528     85 --:--:-- --:--:-- --:--:--   618
{
   "data" : {
      "__v" : 0,
      "_id" : "67f66f80a0a1982fa474b61e",
      "createdAt" : "2025-04-09T13:00:48.288Z",
      "items" : [
         {
            "_id" : "67f66f80a0a1982fa474b61f",
            "addedAt" : "2025-04-09T13:00:48.290Z",
            "name" : "Floral Summer Dress",
            "price" : 49.99,
            "productId" : "67b70692de8de32b32ce938e",
            "quantity" : 2,
            "storeId" : "67b701f6c60e41de8b307d9e",
            "variantData" : []
         }
      ],
      "totalPrice" : 99.98,
      "updatedAt" : "2025-04-09T13:00:48.321Z",
      "userId" : "67bdba50fcb27218d15deab7"
   },
   "success" : true
}
a@a:~/Downloads/logistics-backend$ 










a@a:~/Downloads/logistics-backend$ curl -X PATCH http://localhost:5000/api/cart/items/67f66f80a0a1982fa474b61f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}' | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   446  100   431  100    15    329     11  0:00:01  0:00:01 --:--:--   341
{
   "data" : {
      "__v" : 0,
      "_id" : "67f66f80a0a1982fa474b61e",
      "createdAt" : "2025-04-09T13:00:48.288Z",
      "items" : [
         {
            "_id" : "67f66f80a0a1982fa474b61f",
            "addedAt" : "2025-04-09T13:00:48.290Z",
            "name" : "Floral Summer Dress",
            "price" : 49.99,
            "productId" : "67b70692de8de32b32ce938e",
            "quantity" : 3,
            "storeId" : "67b701f6c60e41de8b307d9e",
            "variantData" : []
         }
      ],
      "totalPrice" : 149.97,
      "updatedAt" : "2025-04-09T13:02:30.933Z",
      "userId" : "67bdba50fcb27218d15deab7"
   },
   "success" : true
}
a@a:~/Downloads/logistics-backend$ 










a@a:~/Downloads/logistics-backend$ curl -X DELETE http://localhost:5000/api/cart/items/67f66f80a0a1982fa474b61f \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   206  100   206    0     0    145      0  0:00:01  0:00:01 --:--:--   145
{
   "data" : {
      "__v" : 1,
      "_id" : "67f66f80a0a1982fa474b61e",
      "createdAt" : "2025-04-09T13:00:48.288Z",
      "items" : [],
      "totalPrice" : 0,
      "updatedAt" : "2025-04-09T13:03:12.532Z",
      "userId" : "67bdba50fcb27218d15deab7"
   },
   "success" : true
}
a@a:~/Downloads/logistics-backend$ 















a@a:~/Downloads/logistics-backend$ curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0MjAyNTk5LCJleHAiOjE3NDQyODg5OTl9.Hehx5xiphN2_GZhpBXdnD7oX2GWbf-QrCkNoGshxGnk" \
  -H "Content-Type: application/json" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   206  100   206    0     0     76      0  0:00:02  0:00:02 --:--:--    76
{
   "data" : {
      "__v" : 1,
      "_id" : "67f66f80a0a1982fa474b61e",
      "createdAt" : "2025-04-09T13:00:48.288Z",
      "items" : [],
      "totalPrice" : 0,
      "updatedAt" : "2025-04-09T13:03:47.449Z",
      "userId" : "67bdba50fcb27218d15deab7"
   },
   "success" : true
}
a@a:~/Downloads/logistics-backend$ 



















a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/cart/checkout -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0NTY1Nzc3LCJleHAiOjE3NDQ2NTIxNzd9.VBJROu90XI_-516UtoaMDKNqovEQk4LTmhT8ddfWvJ4" -H "Content-Type: application/json" -d '{"deliveryAddress":{"type":"manual","manualAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"}},"packageSize":"MEDIUM","isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"specialInstructions":"Please handle with care","zoneId":"67cd79b5909d2026ccbca928","paymentMethod":"BANK_TRANSFER"}'
{"success":true,"data":[{"userId":"67bdba50fcb27218d15deab7","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"},"packageSize":"MEDIUM","status":"PENDING","price":2444,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-17T04:57:45.528Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":4,"price":111,"variantData":[],"_id":"67fc95c9fdf1cbde5bfef14b"}],"specialInstructions":"Please handle with care","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":2000,"_id":"67fc95c9fdf1cbde5bfef14a","trackingNumber":"LG-20250414-A3786","estimatedWeight":20,"createdAt":"2025-04-14T04:57:45.533Z","updatedAt":"2025-04-14T04:57:45.533Z","__v":0,"paymentInstructions":{"bankDetails":{"accountName":"Default Account","accountNumber":"0123456789","bankName":"Default Bank"},"amount":2444,"deliveryFee":2000,"subtotal":444,"currency":"NGN","instructions":"Please transfer the exact amount in Naira and use your payment reference as the transaction description."}}]}a@a:~/Downloads/logistics-backend$ 













a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ0NjM2NjE0LCJleHAiOjE3NDQ3MjMwMTR9.3NqIAesR8lsWAzsf2G4iHUH7XCqw5cOtpbVxt4RAS28" \
  -d '{
    "productId": "67b70692de8de32b32ce938e",
    "quantity": 2
  }'
{"success":true,"data":{"_id":"67f66f80a0a1982fa474b61e","userId":"67bdba50fcb27218d15deab7","totalPrice":321.98,"items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":111,"name":"aaaa","variantData":[],"addedAt":"2025-04-14T13:12:19.431Z","_id":"67fd09b38a52f88de593e492"},{"productId":"67b70692de8de32b32ce938e","storeId":"67b701f6c60e41de8b307d9e","quantity":2,"price":49.99,"name":"Floral Summer Dress","variantData":[],"addedAt":"2025-04-14T13:18:54.829Z","_id":"67fd0b3ee72e954527968b1e"}],"createdAt":"2025-04-09T13:00:48.288Z","updatedAt":"2025-04-14T13:18:54.864Z","__v":36}}a@a:~/Downloads/logistics-backend$ 













































a@a:~/Downloads/logistics-backend$ curl -X POST "http://localhost:5000/api/cart/items" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ1MTQwNzM1LCJleHAiOjE3NDUyMjcxMzV9.7yQpPS7attZQ_vCDqH4SLme9rno1-ea5usmbr87eIpM" \
  -d '{
    "productId": "67ed71ce455be049fb4ef4ef",
    "quantity": 1
  }'
{"success":true,"data":{"_id":"67f66f80a0a1982fa474b61e","userId":"67bdba50fcb27218d15deab7","totalPrice":654.98,"items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":5,"price":111,"name":"aaaa","variantData":[],"addedAt":"2025-04-14T13:12:19.431Z","_id":"67fd09b38a52f88de593e492"},{"productId":"67b70692de8de32b32ce938e","storeId":"67b701f6c60e41de8b307d9e","quantity":2,"price":49.99,"name":"Floral Summer Dress","variantData":[],"addedAt":"2025-04-14T13:18:54.829Z","_id":"67fd0b3ee72e954527968b1e"}],"createdAt":"2025-04-09T13:00:48.288Z","updatedAt":"2025-04-20T09:24:00.311Za@a:~/Downloads/logistics-backend$ curl -X POST "http://localhost:5000/api/cart/items" \art/items" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ1MTQwNzM1LCJleHAiOjE3NDUyMjcxMzV9.7yQpPS7attZQ_vCDqH4SLme9rno1-ea5usmbr87eIpM" \
  -d '{
    "productId": "67f09d35597ca10f05ac2a21",
    "quantity": 1
  }'
{"success":true,"data":{"_id":"67f66f80a0a1982fa474b61e","userId":"67bdba50fcb27218d15deab7","totalPrice":4654.98,"items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":5,"price":111,"name":"aaaa","variantData":[],"addedAt":"2025-04-14T13:12:19.431Z","_id":"67fd09b38a52f88de593e492"},{"productId":"67b70692de8de32b32ce938e","storeId":"67b701f6c60e41de8b307d9e","quantity":2,"price":49.99,"name":"Floral Summer Dress","variantData":[],"addedAt":"2025-04-14T13:18:54.829Z","_id":"67fd0b3ee72e954527968b1e"},{"productId":"67f09d35597ca10f05ac2a21","storeId":"67c5796cba1061b59ab7fb1b","quantity":1,"price":4000,"name":"tested","variantData":[],"addedAt":"2025-04-20T09:24:10.297Z","_id":"6804bd3a0a557b49851e07ef"}],"createdAt":"2025-04-09T13:00:48.288Z","updatedAt":"2025-04-20T09:24:10.314Za@a:~/Downloads/logistics-backend$ curl -X POST "http://localhost:5000/api/cart/items" \art/items" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ1MTQwNzM1LCJleHAiOjE3NDUyMjcxMzV9.7yQpPS7attZQ_vCDqH4SLme9rno1-ea5usmbr87eIpM" \
  -d '{
    "productId": "67b8d0dba3244942fab43942",
    "quantity": 1
  }'
{"success":true,"data":{"_id":"67f66f80a0a1982fa474b61e","userId":"67bdba50fcb27218d15deab7","totalPrice":4666.98,"items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":5,"price":111,"name":"aaaa","variantData":[],"addedAt":"2025-04-14T13:12:19.431Z","_id":"67fd09b38a52f88de593e492"},{"productId":"67b70692de8de32b32ce938e","storeId":"67b701f6c60e41de8b307d9e","quantity":2,"price":49.99,"name":"Floral Summer Dress","variantData":[],"addedAt":"2025-04-14T13:18:54.829Z","_id":"67fd0b3ee72e954527968b1e"},{"productId":"67f09d35597ca10f05ac2a21","storeId":"67c5796cba1061b59ab7fb1b","quantity":1,"price":4000,"name":"tested","variantData":[],"addedAt":"2025-04-20T09:24:10.297Z","_id":"6804bd3a0a557b49851e07ef"},{"productId":"67b8d0dba3244942fab43942","storeId":"67b857e9c62a9612a91952ed","quantity":1,"price":12,"name":"tttttttttttttttttttttttttttttttttttttttttttt","variantData":[],"addedAt":"2025-04-20T09:24:22.056Z","_id":"6804bd460a557b49851e07f6"}],"createdAt":"2025-04-09T13:00:48.288Z","updatedAt":"2025-04-20T09:24:22.064Z","__v":38}}a@a:~/Downloads/logistics-backend$ 































a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/cart/checkout -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQ1MTQwNzM1LCJleHAiOjE3NDUyMjcxMzV9.7yQpPS7attZQ_vCDqH4SLme9rno1-ea5usmbr87eIpM" -H "Content-Type: application/json" -d '{"deliveryAddress":{"type":"manual","manualAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"}},"packageSize":"MEDIUM","isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"specialInstructions":"Please handle with care","zoneId":"67cd79b5909d2026ccbca928","paymentMethod":"BANK_TRANSFER","consolidateDelivery":true}'
{"success":true,"data":{"orders":[{"userId":"67bdba50fcb27218d15deab7","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"},"packageSize":"MEDIUM","status":"PENDING","price":1221.6666666666665,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-23T09:29:58.749Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":"67b7410f256d7687d08935fd","quantity":5,"price":111,"variantData":[],"_id":"6804be960a557b49851e081d"}],"specialInstructions":"Please handle with care","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":666.6666666666666,"_id":"6804be960a557b49851e081c","trackingNumber":"LG-20250420-864FF","estimatedWeight":20,"createdAt":"2025-04-20T09:29:58.751Z","updatedAt":"2025-04-20T09:29:58.751Z","__v":0,"paymentInstructions":{"bankDetails":{"accountName":"Default Account","accountNumber":"0123456789","bankName":"Default Bank"},"amount":1221.6666666666665,"deliveryFee":666.6666666666666,"subtotal":554.9999999999999,"currency":"NGN","instructions":"Please transfer the exact amount in Naira and use your payment reference as the transaction description."}},{"userId":"67bdba50fcb27218d15deab7","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"},"packageSize":"MEDIUM","status":"PENDING","price":4666.666666666667,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-23T09:29:58.737Z","items":[{"productId":"67f09d35597ca10f05ac2a21","storeId":"67c5796cba1061b59ab7fb1b","quantity":1,"price":4000,"variantData":[],"_id":"6804be960a557b49851e081a"}],"specialInstructions":"Please handle with care","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":666.6666666666666,"_id":"6804be960a557b49851e0819","trackingNumber":"LG-20250420-5A544","estimatedWeight":20,"createdAt":"2025-04-20T09:29:58.739Z","updatedAt":"2025-04-20T09:29:58.739Z","__v":0,"paymentInstructions":{"bankDetails":{"accountName":"Default Account","accountNumber":"0123456789","bankName":"Default Bank"},"amount":4666.666666666667,"deliveryFee":666.6666666666666,"subtotal":4000.0000000000005,"currency":"NGN","instructions":"Please transfer the exact amount in Naira and use your payment reference as the transaction description."}},{"userId":"67bdba50fcb27218d15deab7","pickupAddress":{"type":"manual","manualAddress":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567","recipientName":"Micheal store","recipientPhone":"07023904633","recipientEmail":"michealanavheoba@gmail.com"}},"deliveryAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"},"packageSize":"MEDIUM","status":"PENDING","price":678.6666666666666,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-23T09:29:58.715Z","items":[{"productId":"67b8d0dba3244942fab43942","storeId":"67b857e9c62a9612a91952ed","quantity":1,"price":12,"variantData":[],"_id":"6804be960a557b49851e0817"}],"specialInstructions":"Please handle with care","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":666.6666666666666,"_id":"6804be960a557b49851e0816","trackingNumber":"LG-20250420-5D80B","estimatedWeight":20,"createdAt":"2025-04-20T09:29:58.719Z","updatedAt":"2025-04-20T09:29:58.719Z","__v":0,"paymentInstructions":{"bankDetails":{"accountName":"Default Account","accountNumber":"0123456789","bankName":"Default Bank"},"amount":678.6666666666666,"deliveryFee":666.6666666666666,"subtotal":12,"currency":"NGN","instructions":"Please transfer the exact amount in Naira and use your payment reference as the transaction description."}}],"totalAmount":6567,"totalDeliveryFee":2000,"totalProductPrice":4567,"currency":"NGN"}}a@a:~/Downloads/logistics-backend$ 