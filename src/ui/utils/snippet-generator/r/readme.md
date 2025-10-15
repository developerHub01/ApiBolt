# =========================
# R - httr (Inline JSON style, all headers with backticks)
# =========================

```r
library(httr)

# 1️⃣ GET Request
GET("http://localhost:3000?asdfsdf=sdfsdadfsf",
    add_headers(
      `asfsdfsdf` = "addsd",
      `Authorization` = "Bearer sdfsdfsdfds"
    )
)

# 2️⃣ POST JSON (inline JSON string)
POST("http://localhost:3000?asdfsdf=sdfsdadfsf",
     body = '{"name":"John","age":30,"car":null}',
     encode = "raw",
     add_headers(
       `Content-Type` = "application/json",
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 3️⃣ POST Raw Text
POST("http://localhost:3000",
     body = "This is a plain text body for the request.",
     add_headers(
       `Content-Type` = "text/plain",
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 4️⃣ POST HTML
POST("http://localhost:3000",
     body = "<html><body><h1>Hello World</h1></body></html>",
     add_headers(
       `Content-Type` = "text/html",
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 5️⃣ POST XML
POST("http://localhost:3000",
     body = "<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>",
     add_headers(
       `Content-Type` = "application/xml",
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 6️⃣ POST x-www-form-urlencoded
POST("http://localhost:3000?asdfsdf=sdfsdadfsf",
     body = list(b="e", c="f", a="d", asdsddd="sdfsafdsd"),
     encode = "form",
     add_headers(
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 7️⃣ POST multipart/form-data (files + fields)
POST("http://localhost:3000?asdfsdf=sdfsdadfsf",
     body = list(
       username = "shakil",
       avatar1 = upload_file("/path/to/file1.png"),
       avatar2 = upload_file("/path/to/file2.jpg"),
       documents = upload_file("/path/to/resume.pdf"),
       key = "value"
     ),
     encode = "multipart",
     add_headers(
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 8️⃣ POST binary / octet-stream
POST("http://localhost:3000?asdfsdf=sdfsdadfsf",
     body = upload_file("/path/to/file.bin"),
     add_headers(
       `Content-Type` = "application/octet-stream",
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)

# 9️⃣ POST empty body
POST("http://localhost:3000?asdfsdf=sdfsdadfsf",
     body = "",
     add_headers(
       `asfsdfsdf` = "addsd",
       `Authorization` = "Bearer sdfsdfsdfds"
     )
)
```


# =========================
# R - RCurl (Inline JSON style, all headers with backticks)
# =========================

```r
library(RCurl)

# 1️⃣ GET Request
getURL("http://localhost:3000?asdfsdf=sdfsdadfsf",
       httpheader = c(
         `asfsdfsdf` = "addsd",
         `Authorization` = "Bearer sdfsdfsdfds"
       )
)

# 2️⃣ POST JSON (inline JSON string)
postForm("http://localhost:3000?asdfsdf=sdfsdadfsf",
         .opts = list(
           postfields = '{"name":"John","age":30,"car":null}',
           httpheader = c(
             `Content-Type` = "application/json",
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 3️⃣ POST Raw Text
postForm("http://localhost:3000",
         .opts = list(
           postfields = "This is a plain text body for the request.",
           httpheader = c(
             `Content-Type` = "text/plain",
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 4️⃣ POST HTML
postForm("http://localhost:3000",
         .opts = list(
           postfields = "<html><body><h1>Hello World</h1></body></html>",
           httpheader = c(
             `Content-Type` = "text/html",
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 5️⃣ POST XML
postForm("http://localhost:3000",
         .opts = list(
           postfields = "<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>",
           httpheader = c(
             `Content-Type` = "application/xml",
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 6️⃣ POST x-www-form-urlencoded
postForm("http://localhost:3000?asdfsdf=sdfsdadfsf",
         b = "e", c = "f", a = "d", asdsddd = "sdfsafdsd",
         .opts = list(
           httpheader = c(
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 7️⃣ POST multipart/form-data (files + fields)
postForm("http://localhost:3000?asdfsdf=sdfsdadfsf",
         username = "shakil",
         avatar1 = fileUpload("/path/to/file1.png"),
         avatar2 = fileUpload("/path/to/file2.jpg"),
         documents = fileUpload("/path/to/resume.pdf"),
         key = "value",
         .opts = list(
           httpheader = c(
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 8️⃣ POST binary / octet-stream
postForm("http://localhost:3000?asdfsdf=sdfsdadfsf",
         .opts = list(
           postfields = readBin("/path/to/file.bin", "raw", n = file.info("/path/to/file.bin")$size),
           httpheader = c(
             `Content-Type` = "application/octet-stream",
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)

# 9️⃣ POST empty body
postForm("http://localhost:3000?asdfsdf=sdfsdadfsf",
         .opts = list(
           postfields = "",
           httpheader = c(
             `asfsdfsdf` = "addsd",
             `Authorization` = "Bearer sdfsdfsdfds"
           )
         )
)
```