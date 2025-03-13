a@a:~/logistics-backend$ curl -X GET \
  http://localhost:5000/api/admin/consumers/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"total":4,"active":1,"inactive":3,"newToday":0,"newThisWeek":0,"newThisMonth":1}}a@a:~/logistics-backend$ 



a@a:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/consumers?page=1&limit=10&status=active&search=john" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"consumers":[],"pagination":{"total":0,"page":1,"limit":10,"pages":0}}}a@a:~/logistia@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/admin/consumers" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"consumers":[{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67c525e861b78cccd0c0de69","email":"ejovwogfreeman007@gmail.com","password":"$2b$10$6PurI33thQEXL9uwQ.x/J.s8T0UCXKFxGp35ftW.dMX8NQZGX2tkW","firstName":"GB","lastName":"Freeman","phone":"08164471007","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-03-03T03:49:06.132Z","status":"active","createdAt":"2025-03-03T03:45:44.935Z","updatedAt":"2025-03-10T06:49:46.400Z","__v":0,"lastLoginAt":"2025-03-10T06:49:46.399Z"},{"preferences":{"favoriteStores":["67b7410f256d7687d08935fd"],"preferredCategories":[]},"_id":"67bdba50fcb27218d15deab7","email":"anavheobawisdom@gmail.com","password":"$2b$10$65XAQBscgQGyiWF.6pMRuuTToKGgFPcleAcjrUy4TgkUsYmCBkoTC","firstName":"Updated Name","lastName":"Anavheoba","phone":"1234567890","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-02-25T12:42:24.238Z","status":"inactive","createdAt":"2025-02-25T12:40:48.683Z","updatedAt":"2025-03-10T12:34:23.000Z","__v":0,"lastLoginAt":"2025-03-10T12:34:22.997Z"},{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdac4b8596f8febbf86300","email":"momoduabraham413@gmail.com","password":"$2b$10$Ft/qXP7iM1LvnaQJY4Xn7.zqlvZgybHISoDOkiUrxarufLA1gHSCu","firstName":"Abraham","lastName":"Momodu","phone":"+1234567890","isEmailVerified":false,"verificationCode":"681544","verificationCodeExpiry":"2025-02-25T11:50:59.395Z","status":"inactive","createdAt":"2025-02-25T11:40:59.398Z","updatedAt":"2025-02-25T11:40:59.398Z","__v":0},{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67bdabd68596f8febbf862fd","email":"consumer@example.com","password":"$2b$10$7LSd9mjW56yinyF1wePbV.H6ybSDcQrR4w2Q8ls7RmYbBTWZERqm2","firstName":"John","lastName":"Doe","phone":"+1234567890","isEmailVerified":false,"verificationCode":"732465","verificationCodeExpiry":"2025-02-25T11:49:02.330Z","status":"inactive","createdAt":"2025-02-25T11:39:02.350Z","updatedAt":"2025-02-25T11:39:02.350Z","__v":0}],"pagination":{"total":4,"page":1,"limit":10,"pages":1}}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ curl -X GET \
  http://localhost:5000/api/admin/consumers/67c525e861b78cccd0c0de69 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67c525e861b78cccd0c0de69","email":"ejovwogfreeman007@gmail.com","password":"$2b$10$6PurI33thQEXL9uwQ.x/J.s8T0UCXKFxGp35ftW.dMX8NQZGX2tkW","firstName":"GB","lastName":"Freeman","phone":"08164471007","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-03-03T03:49:06.132Z","status":"active","createdAt":"2025-03-03T03:45:44.935Z","updatedAt":"2025-03-10T06:49:46.400Z","__v":0,"lastLoginAt":"2025-03-10T06:49:46.399Z"}}a@a:~/logistics-backend$ 




a@a:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/consumers/67c525e861b78cccd0c0de69/orders" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"orders":[],"pagination":{"total":0,"page":1,"limit":10,"pages":0}}}a@a:~/logistics-backend$ 





a@a:~/logistics-backend$ curl -X GET \
  "http://localhost:5000/api/admin/consumers/67c525e861b78cccd0c0de69/orders" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4"
{"success":true,"data":{"orders":[],"pagination":{"total":0,"page":1,"limit":10,"pages":0}}}a@a:~/logistics-a@a:~/logistics-backend$ curl -X PATCH \
  http://localhost:5000/api/admin/consumers/67c525e861b78cccd0c0de69/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdiNWQwMzA3OWM3NTlhZGJiNzRhOTAyIiwiZW1haWwiOiJhZG1pbkBsb2dpc3RpY3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxNzE2NDM3LCJleHAiOjE3NDE4MDI4Mzd9.xLm4t7hmLiq-ySpabiXwVTUmELbGVuISBPONSbp2RQ4" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive",
    "reason": "Testing status update"
  }'
{"success":true,"data":{"preferences":{"favoriteStores":[],"preferredCategories":[]},"_id":"67c525e861b78cccd0c0de69","email":"ejovwogfreeman007@gmail.com","password":"$2b$10$6PurI33thQEXL9uwQ.x/J.s8T0UCXKFxGp35ftW.dMX8NQZGX2tkW","firstName":"GB","lastName":"Freeman","phone":"08164471007","isEmailVerified":true,"verificationCode":"","verificationCodeExpiry":"2025-03-03T03:49:06.132Z","status":"inactive","createdAt":"2025-03-03T03:45:44.935Z","updatedAt":"2025-03-11T18:12:19.823Z","__v":0,"lastLoginAt":"2025-03-10T06:49:46.399Z"}}a@a:~/logistics-backend$ 