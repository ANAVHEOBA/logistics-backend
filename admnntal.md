a@a:~/Downloads/logistics-backend$ curl -X GET   http://localhost:5000/api/admin/orders   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1NjkxMDExLCJleHAiOjE3NDU3Nzc0MTF9.6pxwkIrfNwvw91PNi6GuFhxA24wveg-T6PETmaqVwwk"   -H "Content-Type: application/json"
{"success":true,"data":{"orders":[{"_id":"6806accc3b834fd7b9fdebdc","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"uniben","city":"Benin","state":"Edo","country":"Nigeria","postalCode":"+234","recipientName":"Freedom ","recipientPhone":"09032227067","recipientEmail":"Uselefreedom1@gmail.com"},"packageSize":"SMALL","status":"PENDING","price":1210.99,"isFragile":false,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T20:38:36.946Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":1,"price":111,"variantData":[],"_id":"6806accc3b834fd7b9fdebdd"},{"productId":"67ed5f237ff2af31bc43783a","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":1,"price":99.99,"variantData":[],"_id":"6806accc3b834fd7b9fdebde"}],"specialInstructions":"","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":1000,"trackingNumber":"LG-20250421-6793C","estimatedWeight":5,"createdAt":"2025-04-21T20:38:36.947Z","updatedAt":"2025-04-21T20:38:36.947Z","__v":0,"priceBreakdown":{"productTotal":210.99,"deliveryFee":1000,"total":1210.99}},{"_id":"6806accc3b834fd7b9fdebd9","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"uniben","city":"Benin","state":"Edo","country":"Nigeria","postalCode":"+234","recipientName":"Freedom ","recipientPhone":"09032227067","recipientEmail":"Uselefreedom1@gmail.com"},"packageSize":"SMALL","status":"PENDING","price":5000,"isFragile":false,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T20:38:36.942Z","items":[{"productId":"67f09d35597ca10f05ac2a21","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":1,"price":4000,"variantData":[],"_id":"6806accc3b834fd7b9fdebda"}],"specialInstructions":"","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":1000,"trackingNumber":"LG-20250421-DC51E","estimatedWeight":5,"createdAt":"2025-04-21T20:38:36.943Z","updatedAt":"2025-04-21T20:38:36.943Z","__v":0,"priceBreakdown":{"productTotal":4000,"deliveryFee":1000,"total":5000}},{"_id":"68060d2a11be616f1b37d287","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":5750,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:17:30.938Z","items":[{"productId":"67f09cf9597ca10f05ac2a07","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":1,"price":5000,"variantData":[],"_id":"68060d2a11be616f1b37d288"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-57DC9","estimatedWeight":5,"createdAt":"2025-04-21T09:17:30.938Z","updatedAt":"2025-04-21T09:17:59.081Z","__v":0,"priceBreakdown":{"productTotal":5000,"deliveryFee":750,"total":5750}},{"_id":"68060d2a11be616f1b37d284","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":849.99,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:17:30.935Z","items":[{"productId":"67ed5f237ff2af31bc43783a","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":1,"price":99.99,"variantData":[],"_id":"68060d2a11be616f1b37d285"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-27AE3","estimatedWeight":5,"createdAt":"2025-04-21T09:17:30.935Z","updatedAt":"2025-04-21T09:17:30.935Z","__v":0,"priceBreakdown":{"productTotal":99.99,"deliveryFee":750,"total":849.99}},{"_id":"68060bd811be616f1b37d201","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":4750,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:11:52.247Z","items":[{"productId":"67f09d35597ca10f05ac2a21","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":1,"price":4000,"variantData":[],"_id":"68060bd811be616f1b37d202"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-CE515","estimatedWeight":5,"createdAt":"2025-04-21T09:11:52.247Z","updatedAt":"2025-04-21T09:11:52.247Z","__v":0,"priceBreakdown":{"productTotal":4000,"deliveryFee":750,"total":4750}},{"_id":"68060bd811be616f1b37d1fe","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":861,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:11:52.245Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":1,"price":111,"variantData":[],"_id":"68060bd811be616f1b37d1ff"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-7EC58","estimatedWeight":5,"createdAt":"2025-04-21T09:11:52.245Z","updatedAt":"2025-04-21T09:11:52.245Z","__v":0,"priceBreakdown":{"productTotal":111,"deliveryFee":750,"total":861}},{"_id":"68060bd811be616f1b37d1fb","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":4750,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:11:52.240Z","items":[{"productId":"67f09d35597ca10f05ac2a21","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":1,"price":4000,"variantData":[],"_id":"68060bd811be616f1b37d1fc"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-D1E21","estimatedWeight":5,"createdAt":"2025-04-21T09:11:52.241Z","updatedAt":"2025-04-21T09:11:52.241Z","__v":0,"priceBreakdown":{"productTotal":4000,"deliveryFee":750,"total":4750}},{"_id":"68060bd811be616f1b37d1f8","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"Ugbowo","city":"Edo","state":"edd","country":"Nigeria","postalCode":"10001","recipientName":"Abraham","recipientPhone":"07160656745","recipientEmail":"wsdomvolt@gmal.com"},"packageSize":"SMALL","status":"PENDING","price":861,"isFragile":true,"isExpressDelivery":true,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-22T09:11:52.236Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":1,"price":111,"variantData":[],"_id":"68060bd811be616f1b37d1f9"}],"specialInstructions":"","deliveryZone":"67cd929ad31909ae8b14404a","zonePrice":750,"trackingNumber":"LG-20250421-09D42","estimatedWeight":5,"createdAt":"2025-04-21T09:11:52.237Z","updatedAt":"2025-04-21T09:11:52.237Z","__v":0,"priceBreakdown":{"productTotal":111,"deliveryFee":750,"total":861}},{"_id":"6805508ce06d50947416d51c","pickupAddress":{"type":"manual","manualAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"GB Media","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"}},"deliveryAddress":{"street":"No 16 Ogude (Ifaka) street.","city":"Warri","state":"Delta State","country":"Nigeria","postalCode":"330103","recipientName":"Freeman","recipientPhone":"08164471007","recipientEmail":"ejovwogfreeman007@gmail.com"},"packageSize":"SMALL","status":"PENDING","price":27000,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-23T19:52:44.508Z","items":[{"productId":"67f09cf9597ca10f05ac2a07","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":3,"price":5000,"variantData":[],"_id":"6805508ce06d50947416d51d"},{"productId":"67f09d35597ca10f05ac2a21","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":1,"price":4000,"variantData":[],"_id":"6805508ce06d50947416d51e"},{"productId":"67f09c65597ca10f05ac29de","storeId":{"_id":"67c5796cba1061b59ab7fb1b","storeName":"GB Media"},"quantity":2,"price":3000,"variantData":[],"_id":"6805508ce06d50947416d51f"}],"specialInstructions":"tested order","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":2000,"trackingNumber":"LG-20250420-E75C2","estimatedWeight":5,"createdAt":"2025-04-20T19:52:44.510Z","updatedAt":"2025-04-20T19:52:44.510Z","__v":0,"priceBreakdown":{"productTotal":25000,"deliveryFee":2000,"total":27000}},{"_id":"6804be960a557b49851e081c","pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"123 Test Street","city":"Test City","state":"Test State","country":"Nigeria","postalCode":"12345","recipientName":"Test User","recipientPhone":"08012345678","recipientEmail":"test@example.com"},"packageSize":"MEDIUM","status":"PENDING","price":1221.6666666666665,"isFragile":false,"isExpressDelivery":false,"requiresSpecialHandling":false,"estimatedDeliveryDate":"2025-04-23T09:29:58.749Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":{"_id":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub"},"quantity":5,"price":111,"variantData":[],"_id":"6804be960a557b49851e081d"}],"specialInstructions":"Please handle with care","deliveryZone":"67cd79b5909d2026ccbca928","zonePrice":666.6666666666666,"trackingNumber":"LG-20250420-864FF","estimatedWeight":20,"createdAt":"2025-04-20T09:29:58.751Z","updatedAt":"2025-04-20T09:29:58.751Z","__v":0,"priceBreakdown":{"productTotal":555,"deliveryFee":666.6666666666666,"total":1221.6666666666665}}],"pagination":{"total":82,"page":1,"limit":10,"pages":9}}}a@a:~/Downloads/logistics-backend$ 








a@a:~/Downloads/logistics-backend$ curl -X GET \
  http://localhost:5000/api/admin/orders/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1NjkxMDExLCJleHAiOjE3NDU3Nzc0MTF9.6pxwkIrfNwvw91PNi6GuFhxA24wveg-T6PETmaqVwwk" \
  -H "Content-Type: application/json"
{"success":true,"data":{"total":82,"totalDelivered":8,"totalPending":66,"totalInTransit":3,"totalCancelled":0,"totalFailedDelivery":0,"todayOrders":0,"todayDelivered":0,"revenue":{"total":20000,"today":0}}}a@a:~/Downloads/logistics-backend$ 










a@a:~/Downloads/logistics-backend$ curl -X GET   http://localhost:5000/api/admin/orders/6806accc3b834fd7b9fdebdc/receipts   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1NjkxMDExLCJleHAiOjE3NDU3Nzc0MTF9.6pxwkIrfNwvw91PNi6GuFhxA24wveg-T6PETmaqVwwk"   -H "Content-Type: application/json"
{"success":true,"data":{"orderId":"6806accc3b834fd7b9fdebdc","trackingNumber":"LG-20250421-6793C","status":"PENDING","createdAt":"2025-04-21T20:38:36.947Z","items":[{"productId":"67ed71ce455be049fb4ef4ef","storeId":{"_id":"67b7410f256d7687d08935fd"},"quantity":1,"price":111,"variantData":[],"_id":"6806accc3b834fd7b9fdebdd","store":{"storeName":"Jessica Fashion Hub","storeId":"67b7410f256d7687d08935fd","contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"}}},{"productId":"67ed5f237ff2af31bc43783a","storeId":{"_id":"67b7410f256d7687d08935fd"},"quantity":1,"price":99.99,"variantData":[],"_id":"6806accc3b834fd7b9fdebde","store":{"storeName":"Jessica Fashion Hub","storeId":"67b7410f256d7687d08935fd","contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"}}}],"deliveryDetails":{"pickupAddress":{"type":"manual","manualAddress":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001","recipientName":"Jessica Fashion Hub","recipientPhone":"+2341234567890","recipientEmail":"jessicaanavheoba@gmail.com"}},"deliveryAddress":{"street":"uniben","city":"Benin","state":"Edo","country":"Nigeria","postalCode":"+234","recipientName":"Freedom ","recipientPhone":"09032227067","recipientEmail":"Uselefreedom1@gmail.com"},"packageSize":"SMALL","isExpressDelivery":true,"estimatedDeliveryDate":"2025-04-22T20:38:36.946Z"},"paymentDetails":{"receipts":[],"priceBreakdown":{"productTotal":210.99,"deliveryFee":1000,"total":1210.99}}}}a@a:~/Downloads/logistics-backend$ 





























a@a:~/Downloads/logistics-backend$ curl -X GET http://localhost:5000/api/admin/stores/67b7410f256d7687d08935fd/payment-details -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2NDM3NzQ3LCJleHAiOjE3NDY1MjQxNDd9.1DJwjmkZKVyftWu3npqAqLUJP0qrgXvA-eX22QoOgss" -H "Content-Type: application/json"

{"success":true,"data":{"storeId":"67b7410f256d7687d08935fd","storeName":"Jessica Fashion Hub","paymentDetails":{"accountName":"Jessica Anavhe","accountNumber":"9876543210","bankName":"Zenith Bank"},"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"}}}a@a:~/Downloads/logistics-backend$ 
a@a:~/Downloads/logistics-backend$ 














a@a:~/Downloads/logistics-backend$ curl -X PATCH http://localhost:5000/api/admin/stores/6819543a60a0fc6b94ff97f8/order \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2NTM0NzI0LCJleHAiOjE3NDY2MjExMjR9.UoFHbmzV5kGO5jGKH070knX8PU1EITuYcoJSPtDAR_0" \
  -H "Content-Type: application/json" \
  -d '{
    "displayOrder": 1,
    "isFeatured": true,
    "featuredUntil": "2024-12-31T23:59:59Z",
    "adminNotes": "Featured store for holiday season"
  }'
{"success":true,"data":{"contactInfo":{"email":"preciousugoso22@gmail.com","phone":"09032227067","whatsapp":""},"address":{"street":"uniben","city":"Benin","state":"Edo","country":"Nigeria","postalCode":"+234"},"image":{"url":"https://res.cloudinary.com/duk2hhkns/image/upload/v1746490510/stores/v80yti9douzprdrziu5m.jpg","publicId":"stores/v80yti9douzprdrziu5m"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalProducts":0,"totalRevenue":0},"_id":"6819543a60a0fc6b94ff97f8","userId":"6819535a60a0fc6b94ff97ee","storeName":"peeBaby","description":"baby wears ","category":"FASHION","status":"ACTIVE","createdAt":"2025-05-06T00:13:46.027Z","updatedAt":"2025-05-06T12:33:35.146Z","slug":"peebaby","__v":0,"adminNotes":"Featured store for holiday season","displayOrder":1,"featuredUntil":"2024-12-31T23:59:59.000Z","isFeatured":true,"storeUrl":"http://localhost:5000/store/peebaby"}}a@a:~/Downloads/logistics-backend$ 













a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/admin/stores/bulk-order \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2NTM0NzI0LCJleHAiOjE3NDY2MjExMjR9.UoFHbmzV5kGO5jGKH070knX8PU1EITuYcoJSPtDAR_0" \
  -H "Content-Type: application/json" \
  -d '{
    "stores": [
      { "storeId": "6819543a60a0fc6b94ff97f8", "displayOrder": 1 },
      { "storeId": "68122f5edbc0b7ccadf1a956", "displayOrder": 2 },
      { "storeId": "68122dabdbc0b7ccadf1a90e", "displayOrder": 3 }
    ]
  }'
{"success":true,"message":"Store order updated successfully"}a@a:~/Downloads/logistics-backend$ 