## PythonRequests

```py
import requests

url = "https://dummyjson.com/comments"

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd"
}

response = requests.post(url, headers=headers)
print(response.text)



import requests

url = "https://dummyjson.com/comments"

files = {
    "asdfsfsfds": open("file.jpeg", "rb"),
    "asdfsfsfds": open("pine-watt-2Hzmz15wGik-unsplash.jpg", "rb"),
    "c": open("d", "rb"),
    "a": open("b", "rb"),
}

data = {
    "asdfsfsfds": "file.jpeg",
    "asdfsfsfds": "pine-watt-2Hzmz15wGik-unsplash.jpg",
    "c": "d",
    "a": "b",
}

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd"
}

response = requests.post(url, headers=headers, data=data, files=files)
print(response.text)



""" ⚠️ Note: Duplicate field names in Python dicts ("asdfsfsfds") will overwrite each other. To support multiple files with the same key, use a list of tuples: """
files = [
    ("asdfsfsfds", open("file.jpeg", "rb")),
    ("asdfsfsfds", open("pine-watt-2Hzmz15wGik-unsplash.jpg", "rb")),
    ("c", open("d", "rb")),
    ("a", open("b", "rb")),
]




import requests

url = "https://dummyjson.com/comments"

data = {
    "c": "d",
    "a": "b"
}

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd",
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, headers=headers, data=data)
print(response.text)




import requests

url = "https://dummyjson.com/comments"

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd"
}

with open("/media/Development/api-bolt-backgrounds/file.jpeg", "rb") as f:
    response = requests.post(url, headers=headers, data=f)

print(response.text)




import requests
import json

url = "https://dummyjson.com/comments"

json_data = {
    "config": {
        "forge": {
            "packagerConfig": {},
            "makers": [
                {"name": "@electron-forge/maker-zip"}
            ]
        }
    }
}

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, data=json.dumps(json_data))
print(response.text)



import requests

url = "https://dummyjson.com/comments"

data = """let x = {
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        { "name": "@electron-forge/maker-zip" }
      ]
    }
  }
}"""

headers = {
    "Authorization": "Bearer sdfdsfsdf",
    "asdfsdf": "ssddd",
    "Content-Type": "application/javascript"
}

response = requests.post(url, headers=headers, data=data)
print(response.text)
```

## PythonHttpClient

```py
import http.client
from urllib.parse import urlparse

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds"
}

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()





import http.client
from urllib.parse import urlparse
import mimetypes

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds"
}

# ========== Form-data body ==========
boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
body_lines = []

# text fields
fields = {"key": "value"}
for name, value in fields.items():
    body_lines.extend([
        f"--{boundary}",
        f'Content-Disposition: form-data; name="{name}"',
        "",
        value,
    ])

# files
files = [
    ("file1", "matthew-smith-Rfflri94rs8-unsplash.jpg"),
    ("file2", "michael-krahn-eGD69I3ODC4-unsplash.jpg"),
    ("file3", "sergei-a--heLWtuAN3c-unsplash.jpg")
]

for fieldname, filename in files:
    mimetype = mimetypes.guess_type(filename)[0] or "application/octet-stream"
    with open(filename, "rb") as f:
        file_content = f.read()
    body_lines.extend([
        f"--{boundary}",
        f'Content-Disposition: form-data; name="{fieldname}"; filename="{filename}"',
        f"Content-Type: {mimetype}",
        "",
        file_content.decode("latin1")  # binary-safe
    ])

body_lines.append(f"--{boundary}--")
body_lines.append("")

body = "\\r\\n".join(body_lines)
headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()





import http.client
from urllib.parse import urlparse, urlencode

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds",
    "Content-Type": "application/x-www-form-urlencoded"
}

data = {"c": "d", "a": "b"}
body = urlencode(data)

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()




import http.client
from urllib.parse import urlparse

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds"
}

with open("/media/Development/api-bolt-backgrounds/pine-watt-2Hzmz15wGik-unsplash.jpg", "rb") as f:
    body = f.read()

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()




import http.client
from urllib.parse import urlparse

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds",
    "Content-Type": "application/javascript"
}

body = """const x = {
  forge: {
    packagerConfig: {},
    makers: [
      {
        name: "@electron-forge/maker-zip",
      },
    ],
  },
};
"""

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()




import http.client
from urllib.parse import urlparse
import json

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds",
    "Content-Type": "application/json"
}

json_data = {
  "forge": {
    "packagerConfig": {},
    "makers": [
      {"name": "@electron-forge/maker-zip"}
    ]
  }
}

body = json.dumps(json_data)

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("POST", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()



import http.client
from urllib.parse import urlparse
import json

url = "http://localhost:3000"
headers = {
    "asfsdfsdf": "addsd",
    "Authorization": "Bearer sdfsdfsdfds",
    "Content-Type": "application/json"
}

json_data = {
  "forge": {
    "packagerConfig": {},
    "makers": [
      {"name": "@electron-forge/maker-zip"}
    ]
  }
}

body = json.dumps(json_data)

parsed = urlparse(url)
conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80)
conn.request("DELETE", parsed.path, body=body, headers=headers)
res = conn.getresponse()
print(res.read().decode())
conn.close()




```