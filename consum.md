a@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/consumers/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anavheobawisdom@gmail.com",
    "password": "securepassword",
    "firstName": "Wisdom",
    "lastName": "Anavheoba",
    "phone": "+1234567890"
  }'
{"success":true,"message":"Registration successful. Please check your email for verification code.","consumerId":"67bdba50fcb27218d15deab7"}a@a:~/logistics-backend$ touch consum.md
a@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/consumers/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "consumerId": "67bdba50fcb27218d15deab7",
    "otp": "939230"
  }'
{"success":true,"message":"Email verified successfully"}a@a:~/logistics-backend$ curl -X POST http://localhoa@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/consumers/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anavheobawisdom@gmail.com",
    "password": "securepassword"
  }'
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNDg3MzYwLCJleHAiOjE3NDA1NzM3NjB9.s7JgQM3hlC8Fbx5BYBi7FFRGW9h6XfGUTCf-gPBYIgA","consumer":{"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","firstName":"Wisdom","lastName":"Anavheoba","isEmailVerified":true}}}a@a:~/logistics-backend$ 








a@a:~/logistics-backend$ curl http://localhost:5000/api/stores/list?category=FOOD&page=1&limit=10
[1] 10455
[2] 10456
[2]+  Done                    page=1
a@a:~/logistics-backend$ {"success":true,"data":{"stores":[],"pagination":{"total":0,"page":1,"totalPages":0,"hasMore":false}}}cururl http://localhost:5000/api/stores/list
[1]+  Done                    curl http://localhost:5000/api/stores/list?category=FOOD
{"success":true,"data":{"stores":[{"contactInfo":{"email":"michealanavheoba@gmail.com","phone":"07023904633","whatsapp":""},"address":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":false},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":1},"_id":"67b857e9c62a9612a91952ed","storeName":"Micheal store","description":"my store","category":"OTHER","status":"ACTIVE","createdAt":"2025-02-21T10:39:37.277Z","updatedAt":"2025-02-21T19:15:40.444Z","slug":"micheal-store","__v":0,"storeUrl":"http://localhost:5000/store/micheal-store"},{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":2,"page":1,"totalPages":1,"hasMore":false}}}a@a:~/logistics-backend$ 










a@a:~/logistics-backend$ # Search by name
curl "http://localhost:5000/api/stores/list?search=jessica"

# Filter by category
curl "http://localhost:5000/api/stores/list?category=FASHION"

# Sort by newest
curl "http://localhost:5000/api/stores/list?sortBy=createdAt&sortOrder=desc"

# Sort by name
curl "http://localhost:5000/api/stores/list?page=1&limit=5"e&sortOrder=asc"
{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":1,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":1,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"michealanavheoba@gmail.com","phone":"07023904633","whatsapp":""},"address":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":false},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":1},"_id":"67b857e9c62a9612a91952ed","storeName":"Micheal store","description":"my store","category":"OTHER","status":"ACTIVE","createdAt":"2025-02-21T10:39:37.277Z","updatedAt":"2025-02-21T19:15:40.444Z","slug":"micheal-store","__v":0,"storeUrl":"http://localhost:5000/store/micheal-store"},{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":2,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"},{"contactInfo":{"email":"michealanavheoba@gmail.com","phone":"07023904633","whatsapp":""},"address":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":false},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":1},"_id":"67b857e9c62a9612a91952ed","storeName":"Micheal store","description":"my store","category":"OTHER","status":"ACTIVE","createdAt":"2025-02-21T10:39:37.277Z","updatedAt":"2025-02-21T19:15:40.444Z","slug":"micheal-store","__v":0,"storeUrl":"http://localhost:5000/store/micheal-store"}],"pagination":{"total":2,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"michealanavheoba@gmail.com","phone":"07023904633","whatsapp":""},"address":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":false},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":1},"_id":"67b857e9c62a9612a91952ed","storeName":"Micheal store","description":"my store","category":"OTHER","status":"ACTIVE","createdAt":"2025-02-21T10:39:37.277Z","updatedAt":"2025-02-21T19:15:40.444Z","slug":"micheal-store","__v":0,"storeUrl":"http://localhost:5000/store/micheal-store"},{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":2,"page":1,"totalPages":1,"hasMore":false}}}a@a:~/logistics-backend$ 







a@a:~/logistics-backend$ # Filter by location
curl "http://localhost:5000/api/stores/list?city=Lagos"
curl "http://localhost:5000/api/stores/list?state=Lagos%20State"
curl "http://localhost:5000/api/stores/list?country=Nigeria"

# Combine filters
curl "http://localhost:5000/api/stores/list?category=FASHION&city=Lagos&minRating=4"

# Search in specific location
curl "http://localhost:5000/api/stores/list?search=fashion&city=Lagos"
{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":1,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":1,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"michealanavheoba@gmail.com","phone":"07023904633","whatsapp":""},"address":{"street":"eosodn","city":"edo","state":"benn ","country":"Nigeria","postalCode":"34567"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":false},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":1},"_id":"67b857e9c62a9612a91952ed","storeName":"Micheal store","description":"my store","category":"OTHER","status":"ACTIVE","createdAt":"2025-02-21T10:39:37.277Z","updatedAt":"2025-02-21T19:15:40.444Z","slug":"micheal-store","__v":0,"storeUrl":"http://localhost:5000/store/micheal-store"},{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":2,"page":1,"totalPages":1,"hasMore":false}}}{"success":true,"data":{"stores":[],"pagination":{"total":0,"page":1,"totalPages":0,"hasMore":false}}}{"success":true,"data":{"stores":[{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":3},"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-02-21T19:04:42.021Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}],"pagination":{"total":1,"page":1,"totalPages":1,"hasMore":false}}}a@a:~/logistics-backend$ 











a@a:~/logistics-backend$ curl -X POST http://localhost:5000/api/orders/consumer/place-order -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNDk0MjY5LCJleHAiOjE3NDA1ODA2Njl9.ku19M9A9FRevMtXDiuwkOfibp-qVlQWvV4SOafAdjm0" -H "Content-Type: application/json" -d '{"storeId":"67b7410f256d7687d08935fd","items":[{"productId":"67b70692de8de32b32ce938e","quantity":2}],"deliveryAddress":{"type":"manual","manualAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"}},"pickupAddress":{"type":"manual","manualAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"}},"packageSize":"MEDIUM","isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"specialInstructions":"Please handle with care"}'
{"success":true,"data":{"userId":"67bdba50fcb27218d15deab7","guestInfo":{"email":"placeholder@example.com","firstName":"placeholder","lastName":"placeholder","phone":"placeholder"},"pickupAddress":{"street":"456 Store Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001"},"deliveryAddress":{"street":"123 Main Street","city":"Lagos","state":"Lagos","country":"Nigeria","postalCode":"100001","recipientName":"John Doe","recipientPhone":"+2341234567890"},"packageSize":"MEDIUM","status":"PENDING","price":2000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"items":[{"productId":"67b70692de8de32b32ce938e","storeId":"67b7410f256d7687d08935fd","quantity":2,"price":99.98,"variantData":[],"_id":"67bde7e65646839d00bf2f7f"}],"specialInstructions":"Please handle with care","_id":"67bde7e65646839d00bf2f7e","trackingNumber":"LG-20250225-CBA26","estimatedWeight":20,"estimatedDeliveryDate":"2025-02-28T15:55:18.191Z","createdAt":"2025-02-25T15:55:18.206Z","updatedAt":"2025-02-25T15:55:18.206Z","__v":0}}a@a:~/logistics-backend$ 
















a@a:~/logistics-backend$ curl http://localhost:5000/api/consumers/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":{"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","firstName":"Wisdom","lastName":"Anavheoba","phone":"+1234567890","preferences":{"favoriteStores":[],"preferredCategories":[]}}}a@a:~/logistics-backend$ 







a@a:~/logistics-backend$ curl -X PUT http://localhost:5000/api/consumers/profile \ile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Updated Name",
    "phone": "1234567890"
  }'
{"success":true,"data":{"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","firstName":"Updated Name","lastName":"Anavheoba","phone":"1234567890"}}a@a:~/logistics-backend$ 









a@a:~/logistics-backend$ # Rate store using consumer token and correct store ID
curl -X POST http://localhost:5000/api/consumers/rate-store \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "67b7410f256d7687d08935fd",
    "rating": 5,
    "review": "Great fashion store with amazing products!"
  }'
{"success":true,"data":{"_id":"67bf638ba353d052dfc0e087","consumerId":"67bdba50fcb27218d15deab7","storeId":"67b7410f256d7687d08935fd","__v":0,"createdAt":"2025-02-26T18:55:06.892Z","rating":5,"review":"Great fashion store with amazing products!","updatedAt":"2025-02-26T18:55:06.892Z"}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ # Get Store Ratings
curl http://localhost:5000/api/consumers/store-ratings/67b7410f256d7687d08935fd \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":{"ratings":[{"_id":"67bf638ba353d052dfc0e087","consumerId":{"_id":"67bdba50fcb27218d15deab7","firstName":"Updated Name","lastName":"Anavheoba"},"storeId":"67b7410f256d7687d08935fd","__v":0,"createdAt":"2025-02-26T18:55:06.892Z","rating":5,"review":"Great fashion store with amazing products!","updatedAt":"2025-02-26T18:55:06.892Z"}],"pagination":{"total":1,"page":1,"totalPages":1}}}a@a:~/logistics-backend$ 








a@a:~/logistics-backend$ # Get Store Ratings
curl http://localhost:5000/api/consumers/store-ratings/67b7410f256d7687d08935fd \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":{"ratings":[{"_id":"67bf638ba353d052dfc0e087","consumerId":{"_id":"67bdba50fcb27218d15deab7","firstName":"Updated Name","lastName":"Anavheoba"},"storeId":"67b7410f256d7687d08935fd","__v":0,"createdAt":"2025-02-26T18:55:06.892Z","rating":5,"review":"Great fashion store with amazing products!","updatedAt":"2025-02-26T18:55:06.curl -X POST http://localhost:5000/api/consumers/favorite-store/67b7410f256d7687d08935fd \ POST http://localhost:5000/api/consumers/favorite-store/67b7410f256d7687d08935fd \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":["67b7410f256d7687d08935fd"]}a@a:~/logistics-backend$ 




a@a:~/logistics-backend$ curl http://localhost:5000/api/consumers/profile \      curl http://localhost:5000/api/consumers/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":{"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","firstName":"Updated Name","lastName":"Anavheoba","phone":"1234567890","preferences":{"favoriteStores":["67b7410f256d7687d08935fd"],"preferredCategories":[]}}}a@a:~/logistics-backend$ 







a@a:~/logistics-backend$ # Add Store to Favorites
curl -X POST http://localhost:5000/api/consumers/favorite-store/67b7410f256d7687d08935fd \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"

# Then check your profile to see the updated favorites
curl http://localhost:5000/api/consumers/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjdiZGJhNTBmY2IyNzIxOGQxNWRlYWI3IiwiZW1haWwiOiJhbmF2aGVvYmF3aXNkb21AZ21haWwuY29tIiwidHlwZSI6ImNvbnN1bWVyIiwiaWF0IjoxNzQwNTk0OTk2LCJleHAiOjE3NDA2ODEzOTZ9.jmPzDrtxaGM2iN82B5sRqzJBOuDvJIkFggXC6rkN5n4"
{"success":true,"data":["67b7410f256d7687d08935fd"]}{"success":true,"data":{"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","firstName":"Updated Name","lastName":"Anavheoba","phone":"1234567890","preferences":{"favoriteStores":["67b7410f256d7687d08935fd"],"preferredCategories":[]}}}a@a:~/logistics-backend$ 


