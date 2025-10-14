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

```

## ShellWget

```sh

```