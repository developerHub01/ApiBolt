## elixir-httpoison

```elixir
# =========================
# Elixir - HTTPoison
# =========================

# 1️⃣ GET Request
HTTPoison.get!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  [
    {"Authorization", "Bearer sdfsdfsdfds"},
    {"asfsdfsdf", "addsd"}
  ]
)

# 2️⃣ POST JSON
HTTPoison.post!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  Jason.encode!(%{name: "John", age: 30, car: nil}),
  [
    {"Content-Type", "application/json"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 3️⃣ POST Raw Text
HTTPoison.post!(
  "http://localhost:3000",
  "This is a plain text body for the request.",
  [
    {"Content-Type", "text/plain"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 4️⃣ POST HTML
HTTPoison.post!(
  "http://localhost:3000",
  "<html><body><h1>Hello World</h1></body></html>",
  [
    {"Content-Type", "text/html"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 5️⃣ POST XML
HTTPoison.post!(
  "http://localhost:3000",
  "<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>",
  [
    {"Content-Type", "application/xml"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 6️⃣ POST x-www-form-urlencoded
HTTPoison.post!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  URI.encode_query(%{b: "e", c: "f", a: "d", asdsddd: "sdfsafdsd"}),
  [
    {"Content-Type", "application/x-www-form-urlencoded"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 7️⃣ POST multipart/form-data (files + fields)
HTTPoison.post!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  {:multipart, [
    {"username", "shakil"},
    {:file, "/path/to/file1.png", {"form-data", [name: "avatar[]", filename: "file1.png"]}, [{"Content-Type", "image/jpeg"}]},
    {:file, "/path/to/file2.jpg", {"form-data", [name: "avatar[]", filename: "file2.jpg"]}, [{"Content-Type", "image/jpeg"}]},
    {:file, "/path/to/resume.pdf", {"form-data", [name: "documents[]", filename: "resume.pdf"]}, [{"Content-Type", "image/jpeg"}]}
  ]},
  [
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 8️⃣ POST binary / octet-stream
HTTPoison.post!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  File.read!("/path/to/file.bin"),
  [
    {"Content-Type", "application/octet-stream"},
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

# 9️⃣ POST empty body
HTTPoison.post!(
  "http://localhost:3000?asdfsdf=sdfsdadfsf",
  "",
  [
    {"Authorization", "Bearer sdfsdfsdfds"}
  ]
)

```

## elixir-tesla

```elixir
# =========================
# Elixir - Tesla
# =========================

# 1️⃣ GET Request
Tesla.get("http://localhost:3000?asdfsdf=sdfsdadfsf", headers: [
  {"Authorization", "Bearer sdfsdfsdfds"},
  {"asfsdfsdf", "addsd"}
])

# 2️⃣ POST JSON
Tesla.post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  %{name: "John", age: 30, car: nil},
  headers: [{"Content-Type", "application/json"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 3️⃣ POST Raw Text
Tesla.post("http://localhost:3000",
  "This is a plain text body for the request.",
  headers: [{"Content-Type", "text/plain"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 4️⃣ POST HTML
Tesla.post("http://localhost:3000",
  "<html><body><h1>Hello World</h1></body></html>",
  headers: [{"Content-Type", "text/html"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 5️⃣ POST XML
Tesla.post("http://localhost:3000",
  "<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>",
  headers: [{"Content-Type", "application/xml"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 6️⃣ POST x-www-form-urlencoded
Tesla.post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  URI.encode_query(%{b: "e", c: "f", a: "d", asdsddd: "sdfsafdsd"}),
  headers: [{"Content-Type", "application/x-www-form-urlencoded"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 7️⃣ POST multipart/form-data (files + fields)
Tesla.post("http://localhost:3000?asdfsdf=sdfsdadfsf",
{:multipart, [
    {"username", "shakil"},
    {:file, "/path/your_path_here", {"form-data", [name: "avatar[]", filename: "file1.png"]}, [{"Content-Type", "image/jpeg"}]},
    {:file, "/path/your_path_here", {"form-data", [name: "avatar[]", filename: "file2.jpg"]}, [{"Content-Type", "image/jpeg"}]},
    {:file, "/path/your_path_here", {"form-data", [name: "documents[]", filename: "resume.pdf"]}, [{"Content-Type", "image/jpeg"}]},
    {"key", "value"}
  ]},
  headers: [{"Authorization", "Bearer sdfsdfsdfds"}]
)

# 8️⃣ POST binary / octet-stream
Tesla.post("http://localhost:3000?asdfsdf=sdfsdadfsf",
  {:body, File.read!("/path/to/file.bin")},
  headers: [{"Content-Type", "application/octet-stream"}, {"Authorization", "Bearer sdfsdfsdfds"}]
)

# 9️⃣ POST empty body
Tesla.post("http://localhost:3000?asdfsdf=sdfsdadfsf", "", headers: [{"Authorization", "Bearer sdfsdfsdfds"}])

```
