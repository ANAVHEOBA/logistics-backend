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