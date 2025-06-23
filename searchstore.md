a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/stores/list" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 10065  100 10065    0     0  24356      0 --:--:-- --:--:-- --:--:-- 24370
{
   "data" : {
      "pagination" : {
         "hasMore" : true,
         "page" : 1,
         "total" : 13,
         "totalPages" : 2
      },
      "stores" : [
         {
            "__v" : 0,
            "_id" : "67eb8a17afc55768b17d9be0",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "00003",
               "state" : "Edo",
               "street" : "2 jb street"
            },
            "adminNotes" : "HOME BASED",
            "category" : "FASHION",
            "contactInfo" : {
               "email" : "Uselefreedom1@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-04-01T06:39:19.453Z",
            "description" : "we sell everything gadgets ",
            "displayOrder" : 1,
            "featuredUntil" : "2025-12-25T12:24:00.000Z",
            "image" : {
               "publicId" : "stores/yna0nqxkdasym0hoawyb",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1746592891/stores/yna0nqxkdasym0hoawyb.jpg"
            },
            "isFeatured" : true,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 8,
               "totalRevenue" : 0
            },
            "paymentDetails" : {
               "accountName" : "Usele freedom oghenekeno",
               "accountNumber" : "9032227067",
               "bankName" : "Opay"
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "ai-tech-computers",
            "status" : "ACTIVE",
            "storeName" : "Ai-Tech Computers",
            "storeUrl" : "http://localhost:5000/store/ai-tech-computers",
            "updatedAt" : "2025-06-02T07:15:32.583Z",
            "userId" : "67eb8890afc55768b17d9bd6"
         },
         {
            "__v" : 0,
            "_id" : "68493ed41fda7fb9955458ba",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "+234",
               "state" : "Edo",
               "street" : "uniben"
            },
            "adminNotes" : "student market place",
            "category" : "OTHER",
            "contactInfo" : {
               "email" : "unibenstudentmarket@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T08:31:16.824Z",
            "description" : "uniben online vendors collective products well verified and available at the warehouse ready for delivery.",
            "displayOrder" : 2,
            "featuredUntil" : null,
            "image" : {
               "publicId" : "stores/v8facaneoeu2a4oex1wc",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749630746/stores/v8facaneoeu2a4oex1wc.png"
            },
            "isFeatured" : true,
            "isOpen" : false,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "uniben-student-market",
            "status" : "ACTIVE",
            "storeName" : "Uniben Student Market",
            "storeUrl" : "http://localhost:5000/store/uniben-student-market",
            "updatedAt" : "2025-06-11T08:44:44.404Z",
            "userId" : "68493dbb1fda7fb9955458b0"
         },
         {
            "__v" : 0,
            "_id" : "684939d61fda7fb99554588c",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "edo street close to eats and more restaurant."
            },
            "category" : "FASHION",
            "contactInfo" : {
               "email" : "esesuperstore@gmail.com",
               "phone" : "08052140018",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T08:09:58.330Z",
            "description" : "9am-9pm daily. edo street close to eats and more. ",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/xuqfqafc57noyr1uh9fy",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749629651/stores/xuqfqafc57noyr1uh9fy.png"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 60,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "ese-supermarket",
            "status" : "ACTIVE",
            "storeName" : "Ese SuperMarket",
            "storeUrl" : "http://localhost:5000/store/ese-supermarket",
            "updatedAt" : "2025-06-13T11:48:53.501Z",
            "userId" : "684938e11fda7fb995545881"
         },
         {
            "__v" : 0,
            "_id" : "684934d61fda7fb995545863",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "+234",
               "state" : "Edo",
               "street" : "uniben"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "meatstandekosodin@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:48:38.342Z",
            "description" : "10am-4pm Daily. Edo street beside the church. buy cow meat at different prices ranging from 1k minimum.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/qmdgdgvo1x87swmbtuco",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749628207/stores/qmdgdgvo1x87swmbtuco.png"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "meatstand",
            "status" : "ACTIVE",
            "storeName" : "MeatStand",
            "storeUrl" : "http://localhost:5000/store/meatstand",
            "updatedAt" : "2025-06-11T07:50:47.066Z",
            "userId" : "684932a41fda7fb995545853"
         },
         {
            "__v" : 0,
            "_id" : "68492d181fda7fb995545809",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Boundary Junction ekosodin, close to winner Chapel"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "valhillseer@gmail.com",
               "phone" : "08088946514",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:15:36.548Z",
            "description" : "10am-10pm daily. Located at Boundary Junction Ekosodin. Tasty meals round the clock.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/nbjn0ckq8gee3wnexyhp",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749626648/stores/nbjn0ckq8gee3wnexyhp.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "majebite",
            "status" : "ACTIVE",
            "storeName" : "MajeBite",
            "storeUrl" : "http://localhost:5000/store/majebite",
            "updatedAt" : "2025-06-11T07:24:32.450Z",
            "userId" : "683c84cf5de443e66b6bbd90"
         },
         {
            "__v" : 0,
            "_id" : "683d611e3065bdc14b786de1",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "09033301338",
               "state" : "Ondo",
               "street" : "Barrack Obama "
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "debbierichardsyes@gmail.com",
               "phone" : "07041586747",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-02T08:30:22.130Z",
            "description" : "\nWe serve tasty, affordable dishes with fast, friendly service. Perfect for a quick bite or a hearty meal.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/vqepbe01hkvssdtdtenf",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748853174/stores/vqepbe01hkvssdtdtenf.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "dee-schow-n-grills",
            "status" : "ACTIVE",
            "storeName" : "Dee'sChow'N'Grills",
            "storeUrl" : "http://localhost:5000/store/dee-schow-n-grills",
            "updatedAt" : "2025-06-11T07:24:44.055Z",
            "userId" : "681bbf24f032f5890a923a3d"
         },
         {
            "__v" : 0,
            "_id" : "683ac032741b31e048f59a51",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "edo street, opposite glad heart restaurant ekosodin."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "davispipe79@gmail.com",
               "phone" : "09026925645",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-31T08:39:14.170Z",
            "description" : "7-10PM. Edo street opposite glad heart restaurant. spaghetti special.\n",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/eg98tojqjrhybhnn7z4a",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748680839/stores/eg98tojqjrhybhnn7z4a.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 3,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "candy-spaghetti",
            "status" : "ACTIVE",
            "storeName" : "CANDY SPAGHETTI",
            "storeUrl" : "http://localhost:5000/store/candy-spaghetti",
            "updatedAt" : "2025-06-01T12:40:21.620Z",
            "userId" : "6834c2b899eb7d4faffe7489"
         },
         {
            "__v" : 0,
            "_id" : "6834ad17628f3925a0a6c45e",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Along Ekosodin Backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "absolutejollof@gmail.com",
               "phone" : "07045152872",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T18:04:07.914Z",
            "description" : "9am-5pm. ekosodin backgate. Welcome to Absolute Jollof Kitchen, your go-to destination for mouthwatering delights.Indulge In Our Signature Dishes:\nJollof Rice, Fried Rice, Breakfast menu & other favorites!\nEnjoy convenience at its best. Order now and get It delivered anywhere in Benin City",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/bobd3gvrurji0knycusd",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748282721/stores/bobd3gvrurji0knycusd.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 18,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "absolute-jollof",
            "status" : "ACTIVE",
            "storeName" : "Absolute Jollof",
            "storeUrl" : "http://localhost:5000/store/absolute-jollof",
            "updatedAt" : "2025-06-01T14:21:30.479Z",
            "userId" : "681c7258718fa7e65ad807a6"
         },
         {
            "__v" : 0,
            "_id" : "68348ec8307c63b77d343050",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Edo Street behind the town hall."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "godwynsplace@gmail.com",
               "phone" : "07037252665",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:54:48.604Z",
            "description" : "9am-8pm. Cold Room and Food stuff. Edo Street, behind the town hall",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/fuoabq8zrrkthnzmgy91",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748752604/stores/fuoabq8zrrkthnzmgy91.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 36,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "godwyns-place",
            "status" : "ACTIVE",
            "storeName" : "Godwyns place",
            "storeUrl" : "http://localhost:5000/store/godwyns-place",
            "updatedAt" : "2025-06-04T17:18:26.879Z",
            "userId" : "68348db7307c63b77d343044"
         },
         {
            "__v" : 0,
            "_id" : "683488e256662749f7e049e6",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "2 Edo street, Ekosodin Road, close uniben backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "iyioladorcas3@gmail.com",
               "phone" : "07089083258",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:29:38.804Z",
            "description" : "Enjoy delicious EwaAgoyin And Ofada Rice. 2 Edo street, Ekosodin Road, close to backdate.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/f4asob8kzkweoemvnm6c",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748273434/stores/f4asob8kzkweoemvnm6c.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 9,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "sisi-agoyin",
            "status" : "ACTIVE",
            "storeName" : "Sisi Agoyin",
            "storeUrl" : "http://localhost:5000/store/sisi-agoyin",
            "updatedAt" : "2025-06-06T09:45:39.272Z",
            "userId" : "683486d056662749f7e049db"
         }
      ]
   },
   "success" : true
}
a@a:~/logistics-backend$ 






Search for stores by name (e.g., searching for "Agoyin"):



a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/stores/list?search=Agoyin" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1073  100  1073    0     0   3170      0 --:--:-- --:--:-- --:--:--  3222
{
   "data" : {
      "pagination" : {
         "hasMore" : false,
         "page" : 1,
         "total" : 1,
         "totalPages" : 1
      },
      "stores" : [
         {
            "__v" : 0,
            "_id" : "683488e256662749f7e049e6",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "2 Edo street, Ekosodin Road, close uniben backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "iyioladorcas3@gmail.com",
               "phone" : "07089083258",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:29:38.804Z",
            "description" : "Enjoy delicious EwaAgoyin And Ofada Rice. 2 Edo street, Ekosodin Road, close to backdate.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/f4asob8kzkweoemvnm6c",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748273434/stores/f4asob8kzkweoemvnm6c.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 9,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "sisi-agoyin",
            "status" : "ACTIVE",
            "storeName" : "Sisi Agoyin",
            "storeUrl" : "http://localhost:5000/store/sisi-agoyin",
            "updatedAt" : "2025-06-06T09:45:39.272Z",
            "userId" : "683486d056662749f7e049db"
         }
      ]
   },
   "success" : true
}
a@a:~/logistics-backend$ 



Filter stores by category (e.g., FOOD stores):

     
        a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/stores/list?category=FOOD" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  8120  100  8120    0     0   8998      0 --:--:-- --:--:-- --:--:--  9002
{
   "data" : {
      "pagination" : {
         "hasMore" : false,
         "page" : 1,
         "total" : 8,
         "totalPages" : 1
      },
      "stores" : [
         {
            "__v" : 0,
            "_id" : "684934d61fda7fb995545863",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "+234",
               "state" : "Edo",
               "street" : "uniben"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "meatstandekosodin@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:48:38.342Z",
            "description" : "10am-4pm Daily. Edo street beside the church. buy cow meat at different prices ranging from 1k minimum.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/qmdgdgvo1x87swmbtuco",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749628207/stores/qmdgdgvo1x87swmbtuco.png"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "meatstand",
            "status" : "ACTIVE",
            "storeName" : "MeatStand",
            "storeUrl" : "http://localhost:5000/store/meatstand",
            "updatedAt" : "2025-06-11T07:50:47.066Z",
            "userId" : "684932a41fda7fb995545853"
         },
         {
            "__v" : 0,
            "_id" : "68492d181fda7fb995545809",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Boundary Junction ekosodin, close to winner Chapel"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "valhillseer@gmail.com",
               "phone" : "08088946514",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:15:36.548Z",
            "description" : "10am-10pm daily. Located at Boundary Junction Ekosodin. Tasty meals round the clock.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/nbjn0ckq8gee3wnexyhp",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749626648/stores/nbjn0ckq8gee3wnexyhp.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "majebite",
            "status" : "ACTIVE",
            "storeName" : "MajeBite",
            "storeUrl" : "http://localhost:5000/store/majebite",
            "updatedAt" : "2025-06-11T07:24:32.450Z",
            "userId" : "683c84cf5de443e66b6bbd90"
         },
         {
            "__v" : 0,
            "_id" : "683d611e3065bdc14b786de1",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "09033301338",
               "state" : "Ondo",
               "street" : "Barrack Obama "
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "debbierichardsyes@gmail.com",
               "phone" : "07041586747",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-02T08:30:22.130Z",
            "description" : "\nWe serve tasty, affordable dishes with fast, friendly service. Perfect for a quick bite or a hearty meal.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/vqepbe01hkvssdtdtenf",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748853174/stores/vqepbe01hkvssdtdtenf.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "dee-schow-n-grills",
            "status" : "ACTIVE",
            "storeName" : "Dee'sChow'N'Grills",
            "storeUrl" : "http://localhost:5000/store/dee-schow-n-grills",
            "updatedAt" : "2025-06-11T07:24:44.055Z",
            "userId" : "681bbf24f032f5890a923a3d"
         },
         {
            "__v" : 0,
            "_id" : "683ac032741b31e048f59a51",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "edo street, opposite glad heart restaurant ekosodin."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "davispipe79@gmail.com",
               "phone" : "09026925645",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-31T08:39:14.170Z",
            "description" : "7-10PM. Edo street opposite glad heart restaurant. spaghetti special.\n",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/eg98tojqjrhybhnn7z4a",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748680839/stores/eg98tojqjrhybhnn7z4a.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 3,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "candy-spaghetti",
            "status" : "ACTIVE",
            "storeName" : "CANDY SPAGHETTI",
            "storeUrl" : "http://localhost:5000/store/candy-spaghetti",
            "updatedAt" : "2025-06-01T12:40:21.620Z",
            "userId" : "6834c2b899eb7d4faffe7489"
         },
         {
            "__v" : 0,
            "_id" : "6834ad17628f3925a0a6c45e",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Along Ekosodin Backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "absolutejollof@gmail.com",
               "phone" : "07045152872",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T18:04:07.914Z",
            "description" : "9am-5pm. ekosodin backgate. Welcome to Absolute Jollof Kitchen, your go-to destination for mouthwatering delights.Indulge In Our Signature Dishes:\nJollof Rice, Fried Rice, Breakfast menu & other favorites!\nEnjoy convenience at its best. Order now and get It delivered anywhere in Benin City",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/bobd3gvrurji0knycusd",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748282721/stores/bobd3gvrurji0knycusd.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 18,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "absolute-jollof",
            "status" : "ACTIVE",
            "storeName" : "Absolute Jollof",
            "storeUrl" : "http://localhost:5000/store/absolute-jollof",
            "updatedAt" : "2025-06-01T14:21:30.479Z",
            "userId" : "681c7258718fa7e65ad807a6"
         },
         {
            "__v" : 0,
            "_id" : "68348ec8307c63b77d343050",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Edo Street behind the town hall."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "godwynsplace@gmail.com",
               "phone" : "07037252665",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:54:48.604Z",
            "description" : "9am-8pm. Cold Room and Food stuff. Edo Street, behind the town hall",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/fuoabq8zrrkthnzmgy91",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748752604/stores/fuoabq8zrrkthnzmgy91.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 36,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "godwyns-place",
            "status" : "ACTIVE",
            "storeName" : "Godwyns place",
            "storeUrl" : "http://localhost:5000/store/godwyns-place",
            "updatedAt" : "2025-06-04T17:18:26.879Z",
            "userId" : "68348db7307c63b77d343044"
         },
         {
            "__v" : 0,
            "_id" : "683488e256662749f7e049e6",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "2 Edo street, Ekosodin Road, close uniben backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "iyioladorcas3@gmail.com",
               "phone" : "07089083258",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:29:38.804Z",
            "description" : "Enjoy delicious EwaAgoyin And Ofada Rice. 2 Edo street, Ekosodin Road, close to backdate.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/f4asob8kzkweoemvnm6c",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748273434/stores/f4asob8kzkweoemvnm6c.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 9,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "sisi-agoyin",
            "status" : "ACTIVE",
            "storeName" : "Sisi Agoyin",
            "storeUrl" : "http://localhost:5000/store/sisi-agoyin",
            "updatedAt" : "2025-06-06T09:45:39.272Z",
            "userId" : "683486d056662749f7e049db"
         },
         {
            "__v" : 0,
            "_id" : "681c6f28718fa7e65ad80739",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Ekosodin primary school, Ekosodin, Benin city, Edo state"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "vicevbogbai1@gmail.com",
               "phone" : "09060680141",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-08T08:45:28.519Z",
            "description" : "I sell homemade local dishes ranging from Egusi soup, ogbono soup, Edikang ikong, Afang, black soup, okra, banga, stew.\nThen I also offer services for indoor and outdoor events for any kind of dish",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/k992kwhcvjz78fzffyls",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1746694104/stores/k992kwhcvjz78fzffyls.jpg"
            },
            "isFeatured" : false,
            "isOpen" : false,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 5,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "justsoup-kitchen",
            "status" : "ACTIVE",
            "storeName" : "Justsoup kitchen",
            "storeUrl" : "http://localhost:5000/store/justsoup-kitchen",
            "updatedAt" : "2025-06-01T04:40:35.236Z",
            "userId" : "681c6c9d718fa7e65ad8070d"
         }
      ]
   },
   "success" : true
}
a@a:~/logistics-backend$ 





Search stores in a specific location (e.g., Benin city):
   


       a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/stores/list?city=Benin" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 10065  100 10065    0     0  14182      0 --:--:-- --:--:-- --:--:-- 14196
{
   "data" : {
      "pagination" : {
         "hasMore" : true,
         "page" : 1,
         "total" : 13,
         "totalPages" : 2
      },
      "stores" : [
         {
            "__v" : 0,
            "_id" : "67eb8a17afc55768b17d9be0",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "00003",
               "state" : "Edo",
               "street" : "2 jb street"
            },
            "adminNotes" : "HOME BASED",
            "category" : "FASHION",
            "contactInfo" : {
               "email" : "Uselefreedom1@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-04-01T06:39:19.453Z",
            "description" : "we sell everything gadgets ",
            "displayOrder" : 1,
            "featuredUntil" : "2025-12-25T12:24:00.000Z",
            "image" : {
               "publicId" : "stores/yna0nqxkdasym0hoawyb",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1746592891/stores/yna0nqxkdasym0hoawyb.jpg"
            },
            "isFeatured" : true,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 8,
               "totalRevenue" : 0
            },
            "paymentDetails" : {
               "accountName" : "Usele freedom oghenekeno",
               "accountNumber" : "9032227067",
               "bankName" : "Opay"
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "ai-tech-computers",
            "status" : "ACTIVE",
            "storeName" : "Ai-Tech Computers",
            "storeUrl" : "http://localhost:5000/store/ai-tech-computers",
            "updatedAt" : "2025-06-02T07:15:32.583Z",
            "userId" : "67eb8890afc55768b17d9bd6"
         },
         {
            "__v" : 0,
            "_id" : "68493ed41fda7fb9955458ba",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "+234",
               "state" : "Edo",
               "street" : "uniben"
            },
            "adminNotes" : "student market place",
            "category" : "OTHER",
            "contactInfo" : {
               "email" : "unibenstudentmarket@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T08:31:16.824Z",
            "description" : "uniben online vendors collective products well verified and available at the warehouse ready for delivery.",
            "displayOrder" : 2,
            "featuredUntil" : null,
            "image" : {
               "publicId" : "stores/v8facaneoeu2a4oex1wc",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749630746/stores/v8facaneoeu2a4oex1wc.png"
            },
            "isFeatured" : true,
            "isOpen" : false,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "uniben-student-market",
            "status" : "ACTIVE",
            "storeName" : "Uniben Student Market",
            "storeUrl" : "http://localhost:5000/store/uniben-student-market",
            "updatedAt" : "2025-06-11T08:44:44.404Z",
            "userId" : "68493dbb1fda7fb9955458b0"
         },
         {
            "__v" : 0,
            "_id" : "684939d61fda7fb99554588c",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "edo street close to eats and more restaurant."
            },
            "category" : "FASHION",
            "contactInfo" : {
               "email" : "esesuperstore@gmail.com",
               "phone" : "08052140018",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T08:09:58.330Z",
            "description" : "9am-9pm daily. edo street close to eats and more. ",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/xuqfqafc57noyr1uh9fy",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749629651/stores/xuqfqafc57noyr1uh9fy.png"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 60,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "ese-supermarket",
            "status" : "ACTIVE",
            "storeName" : "Ese SuperMarket",
            "storeUrl" : "http://localhost:5000/store/ese-supermarket",
            "updatedAt" : "2025-06-13T11:48:53.501Z",
            "userId" : "684938e11fda7fb995545881"
         },
         {
            "__v" : 0,
            "_id" : "684934d61fda7fb995545863",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "+234",
               "state" : "Edo",
               "street" : "uniben"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "meatstandekosodin@gmail.com",
               "phone" : "09032227067",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:48:38.342Z",
            "description" : "10am-4pm Daily. Edo street beside the church. buy cow meat at different prices ranging from 1k minimum.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/qmdgdgvo1x87swmbtuco",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749628207/stores/qmdgdgvo1x87swmbtuco.png"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "meatstand",
            "status" : "ACTIVE",
            "storeName" : "MeatStand",
            "storeUrl" : "http://localhost:5000/store/meatstand",
            "updatedAt" : "2025-06-11T07:50:47.066Z",
            "userId" : "684932a41fda7fb995545853"
         },
         {
            "__v" : 0,
            "_id" : "68492d181fda7fb995545809",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Boundary Junction ekosodin, close to winner Chapel"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "valhillseer@gmail.com",
               "phone" : "08088946514",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-11T07:15:36.548Z",
            "description" : "10am-10pm daily. Located at Boundary Junction Ekosodin. Tasty meals round the clock.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/nbjn0ckq8gee3wnexyhp",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749626648/stores/nbjn0ckq8gee3wnexyhp.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "majebite",
            "status" : "ACTIVE",
            "storeName" : "MajeBite",
            "storeUrl" : "http://localhost:5000/store/majebite",
            "updatedAt" : "2025-06-11T07:24:32.450Z",
            "userId" : "683c84cf5de443e66b6bbd90"
         },
         {
            "__v" : 0,
            "_id" : "683d611e3065bdc14b786de1",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "09033301338",
               "state" : "Ondo",
               "street" : "Barrack Obama "
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "debbierichardsyes@gmail.com",
               "phone" : "07041586747",
               "whatsapp" : ""
            },
            "createdAt" : "2025-06-02T08:30:22.130Z",
            "description" : "\nWe serve tasty, affordable dishes with fast, friendly service. Perfect for a quick bite or a hearty meal.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/vqepbe01hkvssdtdtenf",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748853174/stores/vqepbe01hkvssdtdtenf.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 0,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "dee-schow-n-grills",
            "status" : "ACTIVE",
            "storeName" : "Dee'sChow'N'Grills",
            "storeUrl" : "http://localhost:5000/store/dee-schow-n-grills",
            "updatedAt" : "2025-06-11T07:24:44.055Z",
            "userId" : "681bbf24f032f5890a923a3d"
         },
         {
            "__v" : 0,
            "_id" : "683ac032741b31e048f59a51",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "edo street, opposite glad heart restaurant ekosodin."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "davispipe79@gmail.com",
               "phone" : "09026925645",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-31T08:39:14.170Z",
            "description" : "7-10PM. Edo street opposite glad heart restaurant. spaghetti special.\n",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/eg98tojqjrhybhnn7z4a",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748680839/stores/eg98tojqjrhybhnn7z4a.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 3,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "candy-spaghetti",
            "status" : "ACTIVE",
            "storeName" : "CANDY SPAGHETTI",
            "storeUrl" : "http://localhost:5000/store/candy-spaghetti",
            "updatedAt" : "2025-06-01T12:40:21.620Z",
            "userId" : "6834c2b899eb7d4faffe7489"
         },
         {
            "__v" : 0,
            "_id" : "6834ad17628f3925a0a6c45e",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Along Ekosodin Backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "absolutejollof@gmail.com",
               "phone" : "07045152872",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T18:04:07.914Z",
            "description" : "9am-5pm. ekosodin backgate. Welcome to Absolute Jollof Kitchen, your go-to destination for mouthwatering delights.Indulge In Our Signature Dishes:\nJollof Rice, Fried Rice, Breakfast menu & other favorites!\nEnjoy convenience at its best. Order now and get It delivered anywhere in Benin City",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/bobd3gvrurji0knycusd",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748282721/stores/bobd3gvrurji0knycusd.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 18,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "absolute-jollof",
            "status" : "ACTIVE",
            "storeName" : "Absolute Jollof",
            "storeUrl" : "http://localhost:5000/store/absolute-jollof",
            "updatedAt" : "2025-06-01T14:21:30.479Z",
            "userId" : "681c7258718fa7e65ad807a6"
         },
         {
            "__v" : 0,
            "_id" : "68348ec8307c63b77d343050",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "Edo Street behind the town hall."
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "godwynsplace@gmail.com",
               "phone" : "07037252665",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:54:48.604Z",
            "description" : "9am-8pm. Cold Room and Food stuff. Edo Street, behind the town hall",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/fuoabq8zrrkthnzmgy91",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748752604/stores/fuoabq8zrrkthnzmgy91.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 36,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "godwyns-place",
            "status" : "ACTIVE",
            "storeName" : "Godwyns place",
            "storeUrl" : "http://localhost:5000/store/godwyns-place",
            "updatedAt" : "2025-06-04T17:18:26.879Z",
            "userId" : "68348db7307c63b77d343044"
         },
         {
            "__v" : 0,
            "_id" : "683488e256662749f7e049e6",
            "address" : {
               "city" : "Benin",
               "country" : "Nigeria",
               "postalCode" : "300001",
               "state" : "Edo",
               "street" : "2 Edo street, Ekosodin Road, close uniben backgate"
            },
            "category" : "FOOD",
            "contactInfo" : {
               "email" : "iyioladorcas3@gmail.com",
               "phone" : "07089083258",
               "whatsapp" : ""
            },
            "createdAt" : "2025-05-26T15:29:38.804Z",
            "description" : "Enjoy delicious EwaAgoyin And Ofada Rice. 2 Edo street, Ekosodin Road, close to backdate.",
            "displayOrder" : 0,
            "image" : {
               "publicId" : "stores/f4asob8kzkweoemvnm6c",
               "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1748273434/stores/f4asob8kzkweoemvnm6c.jpg"
            },
            "isFeatured" : false,
            "isOpen" : true,
            "metrics" : {
               "totalOrders" : 0,
               "totalProducts" : 9,
               "totalRevenue" : 0
            },
            "settings" : {
               "allowRatings" : true,
               "isFeaturedStore" : false,
               "isVerified" : false
            },
            "slug" : "sisi-agoyin",
            "status" : "ACTIVE",
            "storeName" : "Sisi Agoyin",
            "storeUrl" : "http://localhost:5000/store/sisi-agoyin",
            "updatedAt" : "2025-06-06T09:45:39.272Z",
            "userId" : "683486d056662749f7e049db"
         }
      ]
   },
   "success" : true
}
a@a:~/logistics-backend$ 
