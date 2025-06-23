a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/products/search" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7560  100  7560    0     0  25649      0 --:--:-- --:--:-- --:--:-- 25714
{
   "data" : {
      "page" : 1,
      "products" : [
         {
            "__v" : 0,
            "_id" : "684c10257cc916d8643a2ad7",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:48:53.346Z",
            "description" : "a paint of garri",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c10257cc916d8643a2ad8",
                  "publicId" : "products/mmhqoonuxqzv3lzzqkez",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749815332/products/mmhqoonuxqzv3lzzqkez.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GARRI",
            "price" : 3000,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:48:53.346Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c0f8d7cc916d8643a2ab4",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:46:21.812Z",
            "description" : "half paint of garri",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0f8d7cc916d8643a2ab5",
                  "publicId" : "products/ecee4icku9q5xoajbng0",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749815181/products/ecee4icku9q5xoajbng0.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GARRI",
            "price" : 1500,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:46:21.812Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c0e8f7cc916d8643a2a91",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:42:07.433Z",
            "description" : "1 bottle of palm oil",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0e8f7cc916d8643a2a92",
                  "publicId" : "products/gzw8ec5olr720wygpqvw",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749814925/products/gzw8ec5olr720wygpqvw.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "PALM OIL",
            "price" : 1800,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:42:07.433Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c0df37cc916d8643a2a6e",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:39:31.650Z",
            "description" : "a bottle of groundnut oil",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0df37cc916d8643a2a6f",
                  "publicId" : "products/sd5j2irupklxmiror6fv",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749814771/products/sd5j2irupklxmiror6fv.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT OIL",
            "price" : 2400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:39:31.650Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c0bf17cc916d8643a2a4b",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:30:57.863Z",
            "description" : "rubber of rice ",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0bf17cc916d8643a2a4c",
                  "publicId" : "products/dpzect51eoigchnjvl10",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749814257/products/dpzect51eoigchnjvl10.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "RICE",
            "price" : 5200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:30:57.863Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c05037cc916d8643a2a28",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:01:23.390Z",
            "description" : "a sachet of small salt",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c05037cc916d8643a2a29",
                  "publicId" : "products/ukkdooupr4bot3qn0wqe",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749812482/products/ukkdooupr4bot3qn0wqe.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SMALL SALT",
            "price" : 200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:01:23.390Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c03797cc916d8643a29ef",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T10:54:49.874Z",
            "description" : "1 sachet or big salt",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c03797cc916d8643a29f0",
                  "publicId" : "products/aot0byjqiphv2qncdu9g",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749812089/products/aot0byjqiphv2qncdu9g.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SALT",
            "price" : 500,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T10:54:49.874Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684bfd397cc916d8643a29c7",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T10:28:09.949Z",
            "description" : "a cup of grounded melon",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684bfd397cc916d8643a29c8",
                  "publicId" : "products/bepyf0ahmnuugewbwgpj",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749810489/products/bepyf0ahmnuugewbwgpj.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDED MELON",
            "price" : 550,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T10:28:09.949Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684af8c223b694774d22ddea",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T15:56:50.344Z",
            "description" : "small bottle of groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684af8c223b694774d22ddeb",
                  "publicId" : "products/dxzrhvck0vxedafsofgm",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749743809/products/dxzrhvck0vxedafsofgm.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 800,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T15:56:50.344Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684af87323b694774d22ddc7",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T15:55:31.636Z",
            "description" : "big bottle of groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684af87323b694774d22ddc8",
                  "publicId" : "products/wksxmtkcf9ha67qylxj0",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749743731/products/wksxmtkcf9ha67qylxj0.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 2200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T15:55:31.636Z",
            "variants" : []
         }
      ],
      "total" : 150,
      "totalPages" : 15
   },
   "success" : true
}
a@a:~/logistics-backend$ 






















///Search for "GARRI" products:




a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/products/search?query=GARRI" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2301  100  2301    0     0  11290      0 --:--:-- --:--:-- --:--:-- 11334
{
   "data" : {
      "page" : 1,
      "products" : [
         {
            "__v" : 0,
            "_id" : "684c10257cc916d8643a2ad7",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:48:53.346Z",
            "description" : "a paint of garri",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c10257cc916d8643a2ad8",
                  "publicId" : "products/mmhqoonuxqzv3lzzqkez",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749815332/products/mmhqoonuxqzv3lzzqkez.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GARRI",
            "price" : 3000,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:48:53.346Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c0f8d7cc916d8643a2ab4",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:46:21.812Z",
            "description" : "half paint of garri",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0f8d7cc916d8643a2ab5",
                  "publicId" : "products/ecee4icku9q5xoajbng0",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749815181/products/ecee4icku9q5xoajbng0.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GARRI",
            "price" : 1500,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:46:21.812Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "68497998e60533208efbe0ad",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T12:42:00.107Z",
            "description" : "3 in 1 garri mix",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "68497998e60533208efbe0ae",
                  "publicId" : "products/v4nhqifpoarquvkbfiji",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749645719/products/v4nhqifpoarquvkbfiji.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GARRI MIX",
            "price" : 350,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T12:42:00.107Z",
            "variants" : []
         }
      ],
      "total" : 3,
      "totalPages" : 1
   },
   "success" : true
}
a@a:~/logistics-backend$ 











Search products with price less than 1000:





      a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/products/search?maxPrice=1000" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7571  100  7571    0     0  38558      0 --:--:-- --:--:-- --:--:-- 38825
{
   "data" : {
      "page" : 1,
      "products" : [
         {
            "__v" : 0,
            "_id" : "684c05037cc916d8643a2a28",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:01:23.390Z",
            "description" : "a sachet of small salt",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c05037cc916d8643a2a29",
                  "publicId" : "products/ukkdooupr4bot3qn0wqe",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749812482/products/ukkdooupr4bot3qn0wqe.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SMALL SALT",
            "price" : 200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:01:23.390Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684c03797cc916d8643a29ef",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T10:54:49.874Z",
            "description" : "1 sachet or big salt",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c03797cc916d8643a29f0",
                  "publicId" : "products/aot0byjqiphv2qncdu9g",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749812089/products/aot0byjqiphv2qncdu9g.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SALT",
            "price" : 500,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T10:54:49.874Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684bfd397cc916d8643a29c7",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T10:28:09.949Z",
            "description" : "a cup of grounded melon",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684bfd397cc916d8643a29c8",
                  "publicId" : "products/bepyf0ahmnuugewbwgpj",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749810489/products/bepyf0ahmnuugewbwgpj.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDED MELON",
            "price" : 550,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T10:28:09.949Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684af8c223b694774d22ddea",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T15:56:50.344Z",
            "description" : "small bottle of groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684af8c223b694774d22ddeb",
                  "publicId" : "products/dxzrhvck0vxedafsofgm",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749743809/products/dxzrhvck0vxedafsofgm.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 800,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T15:56:50.344Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8c7df38276d5675d35c2",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:14:53.015Z",
            "description" : "small pack of star maggi ",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8c7df38276d5675d35c3",
                  "publicId" : "products/bjo6bj9luugvf0pr6d89",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749716092/products/bjo6bj9luugvf0pr6d89.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "STAR MAGGI",
            "price" : 400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:14:53.015Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8baaf38276d5675d359f",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:11:22.741Z",
            "description" : "small pack of chicken flavour",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8baaf38276d5675d35a0",
                  "publicId" : "products/h5j43rrmcczji7wnqgr9",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749715882/products/h5j43rrmcczji7wnqgr9.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "CHICKEN FLAVOUR",
            "price" : 400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:11:22.741Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8902f38276d5675d357c",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:00:02.457Z",
            "description" : "small pack of gino max",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8902f38276d5675d357d",
                  "publicId" : "products/wop1mhsbqacpzsn6cjk6",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749715201/products/wop1mhsbqacpzsn6cjk6.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GINO MAX",
            "price" : 300,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:00:02.457Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a675c112d75fcf96077b",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:53:25.309Z",
            "description" : "tied sugar",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a675c112d75fcf96077c",
                  "publicId" : "products/es0v6ctmnxdeh4gfhkqm",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749657204/products/es0v6ctmnxdeh4gfhkqm.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SUGAR",
            "price" : 100,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:53:25.309Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a498c112d75fcf960758",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:45:28.136Z",
            "description" : "small dangote sugar",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a498c112d75fcf960759",
                  "publicId" : "products/ofz4ypfkomwys2exrjsi",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749656727/products/ofz4ypfkomwys2exrjsi.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "DANGOTE SUGAR",
            "price" : 700,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:45:28.136Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a40fc112d75fcf960735",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:43:11.854Z",
            "description" : "1 tied groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a40fc112d75fcf960736",
                  "publicId" : "products/f9zzq3073uc1asnm6jfz",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749656591/products/f9zzq3073uc1asnm6jfz.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 100,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:43:11.854Z",
            "variants" : []
         }
      ],
      "total" : 75,
      "totalPages" : 8
   },
   "success" : true
}
a@a:~/logistics-backend$ 














Search for "GROUNDNUT" products with price filtering:



       
     a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/products/search?query=GROUNDNUT&minPrice=1000&maxPrice=3000" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1582  100  1582    0     0   8091      0 --:--:-- --:--:-- --:--:--  8112
{
   "data" : {
      "page" : 1,
      "products" : [
         {
            "__v" : 0,
            "_id" : "684c0df37cc916d8643a2a6e",
            "category" : "FASHION",
            "createdAt" : "2025-06-13T11:39:31.650Z",
            "description" : "a bottle of groundnut oil",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684c0df37cc916d8643a2a6f",
                  "publicId" : "products/sd5j2irupklxmiror6fv",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749814771/products/sd5j2irupklxmiror6fv.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT OIL",
            "price" : 2400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-13T11:39:31.650Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684af87323b694774d22ddc7",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T15:55:31.636Z",
            "description" : "big bottle of groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684af87323b694774d22ddc8",
                  "publicId" : "products/wksxmtkcf9ha67qylxj0",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749743731/products/wksxmtkcf9ha67qylxj0.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 2200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T15:55:31.636Z",
            "variants" : []
         }
      ],
      "total" : 2,
      "totalPages" : 1
   },
   "success" : true
}
a@a:~/logistics-backend$ 




Get second page of results (since we see there are 15 total pages):

        a@a:~/logistics-backend$ curl -X GET "http://localhost:5000/api/products/search?page=2&limit=10" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7609  100  7609    0     0  23024      0 --:--:-- --:--:-- --:--:-- 23057
{
   "data" : {
      "page" : 2,
      "products" : [
         {
            "__v" : 0,
            "_id" : "684a8c7df38276d5675d35c2",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:14:53.015Z",
            "description" : "small pack of star maggi ",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8c7df38276d5675d35c3",
                  "publicId" : "products/bjo6bj9luugvf0pr6d89",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749716092/products/bjo6bj9luugvf0pr6d89.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "STAR MAGGI",
            "price" : 400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:14:53.015Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8baaf38276d5675d359f",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:11:22.741Z",
            "description" : "small pack of chicken flavour",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8baaf38276d5675d35a0",
                  "publicId" : "products/h5j43rrmcczji7wnqgr9",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749715882/products/h5j43rrmcczji7wnqgr9.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "CHICKEN FLAVOUR",
            "price" : 400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:11:22.741Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8902f38276d5675d357c",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T08:00:02.457Z",
            "description" : "small pack of gino max",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8902f38276d5675d357d",
                  "publicId" : "products/wop1mhsbqacpzsn6cjk6",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749715201/products/wop1mhsbqacpzsn6cjk6.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GINO MAX",
            "price" : 300,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T08:00:02.457Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8889f38276d5675d3559",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T07:58:01.310Z",
            "description" : "a crate of egg",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8889f38276d5675d355a",
                  "publicId" : "products/sf7nicpmnvo3ehdpjraq",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749715080/products/sf7nicpmnvo3ehdpjraq.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "CRATE OF EGGS",
            "price" : 6500,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T07:58:01.310Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "684a8671f38276d5675d3536",
            "category" : "FASHION",
            "createdAt" : "2025-06-12T07:49:05.332Z",
            "description" : "big pack of knorr maggi",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "684a8671f38276d5675d3537",
                  "publicId" : "products/kgrq9aq7tf6uimjpl9il",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749714544/products/kgrq9aq7tf6uimjpl9il.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "KNORR MAGGI",
            "price" : 2400,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-12T07:49:05.332Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a675c112d75fcf96077b",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:53:25.309Z",
            "description" : "tied sugar",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a675c112d75fcf96077c",
                  "publicId" : "products/es0v6ctmnxdeh4gfhkqm",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749657204/products/es0v6ctmnxdeh4gfhkqm.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "SUGAR",
            "price" : 100,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:53:25.309Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a498c112d75fcf960758",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:45:28.136Z",
            "description" : "small dangote sugar",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a498c112d75fcf960759",
                  "publicId" : "products/ofz4ypfkomwys2exrjsi",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749656727/products/ofz4ypfkomwys2exrjsi.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "DANGOTE SUGAR",
            "price" : 700,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:45:28.136Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a40fc112d75fcf960735",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:43:11.854Z",
            "description" : "1 tied groundnut",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a40fc112d75fcf960736",
                  "publicId" : "products/f9zzq3073uc1asnm6jfz",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749656591/products/f9zzq3073uc1asnm6jfz.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GROUNDNUT",
            "price" : 100,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:43:11.854Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a1a4c112d75fcf960712",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:32:52.140Z",
            "description" : "a sachet of crown spaghetti",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a1a4c112d75fcf960713",
                  "publicId" : "products/yvr8ufkoklxzemdtxm4c",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749655971/products/yvr8ufkoklxzemdtxm4c.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "CROWN SPAGHETTI",
            "price" : 1000,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:32:52.140Z",
            "variants" : []
         },
         {
            "__v" : 0,
            "_id" : "6849a020c112d75fcf9606ef",
            "category" : "FASHION",
            "createdAt" : "2025-06-11T15:26:24.120Z",
            "description" : "a sachet of golden penny spaghetti",
            "guestOrderEnabled" : true,
            "images" : [
               {
                  "_id" : "6849a020c112d75fcf9606f0",
                  "publicId" : "products/cc7zf508j3j5xhsjfhu3",
                  "url" : "https://res.cloudinary.com/duk2hhkns/image/upload/v1749655583/products/cc7zf508j3j5xhsjfhu3.jpg"
               }
            ],
            "isPublished" : true,
            "maxOrderQuantity" : 999,
            "minOrderQuantity" : 1,
            "name" : "GOLDEN PENNY SPAGHETTI",
            "price" : 1200,
            "shippingInfo" : {
               "dimensions" : {
                  "height" : 0,
                  "length" : 0,
                  "width" : 0
               },
               "requiresSpecialHandling" : false,
               "weight" : 0
            },
            "specifications" : {
               "color" : "Black",
               "material" : "Cotton",
               "size" : "S,M,L"
            },
            "status" : "ACTIVE",
            "stock" : 30,
            "storeId" : "684939d61fda7fb99554588c",
            "updatedAt" : "2025-06-11T15:26:24.120Z",
            "variants" : []
         }
      ],
      "total" : 150,
      "totalPages" : 15
   },
   "success" : true
}
a@a:~/logistics-backend$ 