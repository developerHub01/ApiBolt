## Ruby - net/http

```ruby
require "net/http"
require "uri"
require "json"
require "net/http/post/multipart"

uri = URI.parse("http://localhost:3000?asdfsdf=sdfsdadfsf")

# 1️⃣ GET Request
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Get.new(uri)
  req["asfsdfsdf"] = "addsd"
  req["Content-Type"] = "application/x-www-form-urlencoded"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 2️⃣ POST JSON
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Post.new(uri)
  req.body = {name: "John", age: 30, car: nil}.to_json
  req["Content-Type"] = "application/json"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 3️⃣ POST Raw Text
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Post.new(uri)
  req.body = "This is a plain text body for the request."
  req["Content-Type"] = "text/plain"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 4️⃣ POST x-www-form-urlencoded
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Post.new(uri)
  req.set_form_data({b: "e", c: "f", a: "d", asdsddd: "sdfsafdsd"})
  req["Content-Type"] = "application/x-www-form-urlencoded"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 5️⃣ POST multipart/form-data (supports multiple files per key)
file1 = UploadIO.new("/path/to/file1.png", "image/png", "file1.png")
file2 = UploadIO.new("/path/to/file2.jpg", "image/jpeg", "file2.jpg")
file3 = UploadIO.new("/path/to/file3.jpg", "image/jpeg", "file3.jpg")

Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Post::Multipart.new(uri.path,
    "username" => "shakil",
    "key" => "value",
    "avatars[]" => [file1, file2, file3] # array for multiple files under same key
  )
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 6️⃣ POST binary/octet-stream
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Post.new(uri)
  req.body = File.read("/path/to/file.bin")
  req["Content-Type"] = "application/octet-stream"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 7️⃣ DELETE Request
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Delete.new(uri)
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 8️⃣ PUT Request (JSON)
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Put.new(uri)
  req.body = {update: "value"}.to_json
  req["Content-Type"] = "application/json"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 9️⃣ PATCH Request (JSON)
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Patch.new(uri)
  req.body = {patch: "value"}.to_json
  req["Content-Type"] = "application/json"
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

# 10️⃣ OPTIONS Request
Net::HTTP.start(uri.host, uri.port) do |http|
  req = Net::HTTP::Options.new(uri)
  req["Authorization"] = "Bearer sdfsdfsdfds"
  response = http.request(req)
  puts response.body
end

```

## Ruby - rest-client

```ruby
require "rest-client"

# 0️⃣ GET
RestClient.get "http://localhost:3000?asdfsdf=sdfsdadfsf",
  {
    "asfsdfsdf" => "addsd",
    "Content-Type" => "application/x-www-form-urlencoded",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 1️⃣ POST binary/octet-stream
RestClient.post "http://localhost:3000?asdfsdf=sdfsdadfsf",
  File.read("/path/to/file.bin"),
  {
    "Content-Type" => "application/octet-stream",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 2️⃣ POST JSON (raw string)
RestClient.post "http://localhost:3000?asdfsdf=sdfsdadfsf",
  '{ "name": "John", "age": 30, "car": null }',
  {
    "Content-Type" => "application/json",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 3️⃣ POST Raw Text
RestClient.post "http://localhost:3000?asdfsdf=sdfsdadfsf",
  "This is a plain text body for the request.",
  {
    "Content-Type" => "text/plain",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 4️⃣ POST x-www-form-urlencoded
RestClient.post "http://localhost:3000?asdfsdf=sdfsdadfsf",
  {
    "b" => "e",
    "c" => "f",
    "a" => "d",
    "asdsddd" => "sdfsafdsd"
  },
  {
    "Content-Type" => "application/x-www-form-urlencoded",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 5️⃣ POST multipart/form-data
RestClient.post "http://localhost:3000?asdfsdf=sdfsdadfsf",
  {
    "username" => "shakil",
    "avatar1" => [File.new("/path/to/file1.png"), File.new("/path/to/file2.png")],
    "documents" => [File.new("/path/to/resume.pdf")],
    "key" => "value"
  },
  {
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 6️⃣ DELETE
RestClient.delete "http://localhost:3000?asdfsdf=sdfsdadfsf",
  {
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 7️⃣ PUT (JSON raw string)
RestClient.put "http://localhost:3000?asdfsdf=sdfsdadfsf",
  '{ "update": "value" }',
  {
    "Content-Type" => "application/json",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 8️⃣ PATCH (JSON raw string)
RestClient.patch "http://localhost:3000?asdfsdf=sdfsdadfsf",
  '{ "patch": "value" }',
  {
    "Content-Type" => "application/json",
    "Authorization" => "Bearer sdfsdfsdfds"
  }

# 9️⃣ OPTIONS
RestClient::Request.execute(
  method: :options,
  url: "http://localhost:3000?asdfsdf=sdfsdadfsf",
  headers: {
    "Authorization" => "Bearer sdfsdfsdfds"
  }
)

```

## Ruby - http.rb

```ruby
# HTTP.rb examples
require 'http'

# ===============================
# 1️⃣ GET Request
# ===============================
response = HTTP.headers(
  "asfsdfsdf" => "addsd",
  "Content-Type" => "application/x-www-form-urlencoded",
  "Authorization" => "Bearer sdfsdfsdfds"
).get("http://localhost:3000?asdfsdf=sdfsdadfsf")
puts response.to_s

# ===============================
# 2️⃣ POST JSON (inline JSON)
# ===============================
response = HTTP.headers(
  "Content-Type" => "application/json",
  "Authorization" => "Bearer sdfsdfsdfds"
).post("http://localhost:3000?asdfsdf=sdfsdadfsf", body: '{
  "name": "John",
  "age": 30,
  "car": null
}')
puts response.to_s

# ===============================
# 3️⃣ POST Raw Text
# ===============================
response = HTTP.headers(
  "Content-Type" => "text/plain",
  "Authorization" => "Bearer sdfsdfsdfds"
).post("http://localhost:3000",
  body: "This is a plain text body for the request.")
puts response.to_s

# ===============================
# 4️⃣ POST x-www-form-urlencoded
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds"
).post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  form: {"b" => "e", "c" => "f", "a" => "d", "asdsddd" => "sdfsafdsd"})
puts response.to_s

# ===============================
# 5️⃣ POST multipart/form-data (single file per key)
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds"
).post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  form: {
    "username" => "shakil",
    "avatar1" => HTTP::FormData::File.new("/path/to/file1.png"),
    "avatar2" => HTTP::FormData::File.new("/path/to/file2.jpg"),
    "documents" => HTTP::FormData::File.new("/path/to/resume.pdf"),
    "key" => "value"
  })
puts response.to_s

# ===============================
# 5️⃣a POST multipart/form-data (multiple files for one key)
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds"
).post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  form: {
    "username" => "shakil",
    "attachments[]" => [
      HTTP::FormData::File.new("/path/to/file1.png"),
      HTTP::FormData::File.new("/path/to/file2.jpg"),
      HTTP::FormData::File.new("/path/to/file3.pdf")
    ],
    "key" => "value"
  })
puts response.to_s

# ===============================
# 6️⃣ POST binary/octet-stream
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds",
  "Content-Type" => "application/octet-stream"
).post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  body: File.binread("/path/to/file.bin"))
puts response.to_s

# ===============================
# 7️⃣ DELETE Request
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds"
).delete("http://localhost:3000?asdfsdf=sdfsdadfsf")
puts response.to_s

# ===============================
# 8️⃣ PUT Request (inline JSON)
# ===============================
response = HTTP.headers(
  "Content-Type" => "application/json",
  "Authorization" => "Bearer sdfsdfsdfds"
).put("http://localhost:3000?asdfsdf=sdfsdadfsf", body: '{
  "update": "value"
}')
puts response.to_s

# ===============================
# 9️⃣ PATCH Request (inline JSON)
# ===============================
response = HTTP.headers(
  "Content-Type" => "application/json",
  "Authorization" => "Bearer sdfsdfsdfds"
).patch("http://localhost:3000?asdfsdf=sdfsdadfsf", body: '{
  "patch": "value"
}')
puts response.to_s

# ===============================
# 🔟 OPTIONS Request
# ===============================
response = HTTP.headers(
  "Authorization" => "Bearer sdfsdfsdfds"
).request(:options, "http://localhost:3000?asdfsdf=sdfsdadfsf")
puts response.to_s

# ===============================
# 1️⃣1️⃣ GET Request with NO headers
# ===============================
response = HTTP.get("http://localhost:3000?asdfsdf=sdfsdadfsf")
puts response.to_s

```
