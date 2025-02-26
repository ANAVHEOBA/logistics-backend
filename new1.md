a@a:~/logistics-backend$ touch new1.md
a@a:~/logistics-backend$ aaa@aaa:~/logistics-backend$ # Login with verified email
curl -X POST \
  http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jessicaanavheoba@gmail.com",
    "password": "yourpassword123"
  }'
bash: aaa@aaa:~/logistics-backend$: No such file or directory
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1YjVhZjdkYmIzZGI3ZTQ1N2Q3ZDgiLCJlbWFpbCI6Implc3NpY2FhbmF2aGVvYmFAZ21haWwuY29tIiwiaWF0IjoxNzQwNDc3MzEzLCJleHAiOjE3NDA1NjM3MTN9.UngbPpD_D65OiNBEIC6sukdI9MwwVtBeX86wScj8Yh0","user":{"_id":"67b5b5af7dbb3db7e457d7d8","email":"jessicaanavheoba@gmail.com","name":"Jessica Anavhe","isEmailVerified":true}}}a@a:~/logistics-backend$ 





