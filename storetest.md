a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/stores/upload-image   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQ0NjE4NjE3LCJleHAiOjE3NDQ3MDUwMTd9.QVfZGIAI54mHObrAo5d8OrCZkj_mKTpHvbo7Ublw-UA"   -F "image=@/home/a/Pictures/Screenshots/Screenshot from 2025-04-11 07-47-51.png"
{"success":true,"data":{"image":{"url":"https://res.cloudinary.com/duk2hhkns/image/upload/v1744618840/stores/elbbuyfz2nnnzdsjdeg2.png","publicId":"stores/elbbuyfz2nnnzdsjdeg2"}}}a@a:~/Downloads/logistics-backend$ 













a@a:~/Downloads/logistics-backend$ curl -X GET http://localhost:5curl -X GET http://localhost:5000/api/stores/my-store \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQ0NjE4NjE3LCJleHAiOjE3NDQ3MDUwMTd9.QVfZGIAI54mHObrAo5d8OrCZkj_mKTpHvbo7Ublw-UA"
{"success":true,"data":{"contactInfo":{"email":"jessicaanavheoba@gmail.com","phone":"+2341234567890","whatsapp":"+2341234567890"},"address":{"street":"15 Victoria Island Road","city":"Lagos","state":"Lagos State","country":"Nigeria","postalCode":"101001"},"image":{"url":"https://res.cloudinary.com/duk2hhkns/image/upload/v1744618840/stores/elbbuyfz2nnnzdsjdeg2.png","publicId":"stores/elbbuyfz2nnnzdsjdeg2"},"socialLinks":{"instagram":"https://instagram.com/jessicafashionhub","facebook":"https://facebook.com/jessicafashionhub"},"businessInfo":{"registrationNumber":"RC123456"},"settings":{"isVerified":false,"isFeaturedStore":false,"allowRatings":true},"metrics":{"totalOrders":0,"totalRevenue":0,"totalProducts":4},"_id":"67b7410f256d7687d08935fd","userId":"67b5b5af7dbb3db7e457d7d8","storeName":"Jessica Fashion Hub","description":"Updated description - Your premier fashion destination in Lagos","category":"FASHION","status":"ACTIVE","createdAt":"2025-02-20T14:49:51.447Z","updatedAt":"2025-04-14T08:20:41.805Z","slug":"jessica-fashion-hub","__v":0,"storeUrl":"http://localhost:5000/store/jessica-fashion-hub"}}a@a:~/Downloads/logistics-backend$ 















a@a:~/Downloads/logistics-backend$ curl -X POST http://localhost:5000/api/stores/payment-details -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQ1MjI4MTk0LCJleHAiOjE3NDUzMTQ1OTR9.seWXD6z4lxg0NLB3fKJE4Hc9Wo_9UZm9aUzIo4q5M4U" -d '{"accountName": "Jessica Anavhe", "accountNumber": "1234567890", "bankName": "First Bank"}'
{"success":true,"data":{"paymentDetails":{"accountName":"Jessica Anavhe","accountNumber":"1234567890","bankName":"First Bank"}}}a@a:~/Downloads/logistics-backend$ 



a@a:~/Downloads/logistics-ba@a:~/Downloads/logistics-backend$ curl -X PUT http://localhost:5000/api/stores/payment-details -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQ1MjI4MTk0LCJleHAiOjE3NDUzMTQ1OTR9.seWXD6z4lxg0NLB3fKJE4Hc9Wo_9UZm9aUzIo4q5M4U" -d '{"accountNumber": "9876543210", "bankName": "Zenith Bank"}'
{"success":true,"data":{"paymentDetails":{"accountName":"Jessica Anavhe","accountNumber":"9876543210","b
a@a:~/Downloads/logistics-backend$ 













a@a:~/Downloads/logistics-backend$ curl -X GET http://localhost:5000/api/stores/payment-details -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQ1MjI4MTk0LCJleHAiOjE3NDUzMTQ1OTR9.seWXD6z4lxg0NLB3fKJE4Hc9Wo_9UZm9aUzIo4q5M4U"
{"success":true,"data":{"paymentDetails":{"accountName":"Jessica Anavhe","accountNumber":"9876543210","bankName":"Zenith Bank"}}}a@a:~/Downloads/logistics-backend$ 

