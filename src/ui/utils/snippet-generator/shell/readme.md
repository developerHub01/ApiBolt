## ShellCURL

```sh
# 1️⃣ GET Request
curl -X GET "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -H "asfsdfsdf: addsd"


# 2️⃣ POST JSON
curl -X POST "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d '{
    "name": "John",
    "age": 30,
    "car": null
  }'

# Raw Text
curl -X POST "http://localhost:3000" \
  -H "Content-Type: text/plain" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d "This is a plain text body for the request."

# 2️⃣ HTML
curl -X POST "http://localhost:3000" \
  -H "Content-Type: text/html" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d "<html><body><h1>Hello World</h1></body></html>"

# 3️⃣ XML
curl -X POST "http://localhost:3000" \
  -H "Content-Type: application/xml" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d "<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>"


# 3️⃣ POST x-www-form-urlencoded
curl -X POST "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d "b=e&c=f&a=d&asdsddd=sdfsafdsd"


# 4️⃣ POST multipart/form-data (files + fields)
curl -X POST "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -F "username=shakil" \
  -F "avatar[]=@/path/to/file1.png" \
  -F "avatar[]=@/path/to/file2.jpg" \
  -F "documents[]=@/path/to/resume.pdf"


# 5️⃣ POST binary / octet-stream
curl -X POST "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Content-Type: application/octet-stream" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  --data-binary "@/path/to/file.bin"


# 6️⃣ POST empty body
curl -X POST "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  -H "Authorization: Bearer sdfsdfsdfds" \
  -d ""

```

## ShellHTTPie

```sh
# 🟢 1. GET Request
http GET \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds"


# 🟢 2. POST – Raw JSON
http POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds" \
  "Content-Type:application/json" <<< \
  '{"name":"John","age":30,"car":null}'


# 🟢 3. POST – Text / HTML / XML
http POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds" \
  "Content-Type:text/plain" <<< \
  "Hello World"

http POST \
  "http://localhost:3000" \
  "Authorization:Bearer sdfsdfsdfds" \
  "Content-Type:text/html" <<< \
  "<h1>Hello</h1><p>World</p>"

http POST \
  "http://localhost:3000" \
  "Authorization:Bearer sdfsdfsdfds" \
  "Content-Type:application/xml" <<< \
  "<note><to>John</to><body>Hello</body></note>"


# 🟢 4. POST – x-www-form-urlencoded
http --form POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds" \
  "b=e" \
  "c=f" \
  "a=d" \
  "asdsddd=sdfsafdsd"


# 🟢 5. POST – multipart/form-data
http --form POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds" \
  "username=shakil" \
  "avatar@/path/to/file.png" \
  "cover@/path/to/cover.jpg"


# 🟢 6. POST – Binary file upload
http POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds" \
  "Content-Type:application/octet-stream" < \
  "/path/to/file.jpg"


# 🟢 7. POST – Empty body
http POST \
  "http://localhost:3000?asdfsdf=sdfsdadfsf" \
  "asfsdfsdf:addsd" \
  "Authorization:Bearer sdfsdfsdfds"

```

## ShellWget

```sh

```