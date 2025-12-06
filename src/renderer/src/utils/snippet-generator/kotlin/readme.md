## Kotlin OkHttp

```kt
## 1️⃣ GET / DELETE (no body)
val client = OkHttpClient()

val request = Request.Builder()
    .url("https://example.com/api/items")
    .get() // or .delete() if needed
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Accept", "application/json")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())


2️⃣ POST / PUT with JSON
val client = OkHttpClient()
val body = """{"name":"Shakil","role":"developer"}""".toRequestBody("application/json".toMediaType())

val request = Request.Builder()
    .url("https://example.com/api/create")
    .post(body) // or .put(body)
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Content-Type", "application/json")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())


3️⃣ POST x-www-form-urlencoded
val client = OkHttpClient()
val formBody = FormBody.Builder()
    .add("username","shakil")
    .add("password","12345")
    .build()

val request = Request.Builder()
    .url("https://example.com/api/login")
    .post(formBody)
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Content-Type", "application/x-www-form-urlencoded")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())


4️⃣ Multipart / File Upload
val client = OkHttpClient()
val file = File("/path/to/file.png")
val fileBody = file.asRequestBody("image/png".toMediaType())

val body = MultipartBody.Builder().setType(MultipartBody.FORM)
    .addFormDataPart("username","shakil")
    .addFormDataPart("avatar", file.name, fileBody)
    .build()

val request = Request.Builder()
    .url("https://example.com/api/upload")
    .post(body)
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Accept", "application/json")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())


5️⃣ Raw Text / XML
val client = OkHttpClient()
val xml = """<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>"""
val body = xml.toRequestBody("application/xml".toMediaType())

val request = Request.Builder()
    .url("https://example.com/api/xml")
    .post(body)
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Content-Type", "application/xml")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())


6️⃣ Binary Upload
val client = OkHttpClient()
val file = File("/path/to/data.bin")
val body = file.asRequestBody("application/octet-stream".toMediaType())

val request = Request.Builder()
    .url("https://example.com/api/upload-binary")
    .put(body)
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("Content-Type", "application/octet-stream")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())



7️⃣ POST / PUT / PATCH with NO BODY
val client = OkHttpClient()
val emptyBody = ByteArray(0).toRequestBody(null)

val request = Request.Builder()
    .url("https://example.com/api/reset")
    .post(emptyBody) // .put(emptyBody) if needed
    .addHeader("Authorization", "Bearer TOKEN")
    .addHeader("X-Action", "reset")
    .build()

val response = client.newCall(request).execute()
println(response.body?.string())
```

## Kotlin Retrofit

```kt

```
