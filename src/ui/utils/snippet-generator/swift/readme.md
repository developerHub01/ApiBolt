# =========================
# Swift - Alamofire
# =========================

```swift
import Alamofire

// 1️⃣ GET
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .get,
           headers: ["asfsdfsdf": "addsd", "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Bearer sdfsdfsdfds"]
).response { response in
    print(response.data)
}

// 2️⃣ POST JSON
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .post,
           parameters: ["name": "John", "age": 30, "car": NSNull()],
           encoding: JSONEncoding.default,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
).response { response in
    print(response.data)
}

// 3️⃣ POST Raw Text
AF.request("http://localhost:3000",
           method: .post,
           parameters: nil,
           encoding: StringEncoding(),
           headers: ["Content-Type": "text/plain", "Authorization": "Bearer sdfsdfsdfds"]
)

// 4️⃣ POST x-www-form-urlencoded
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .post,
           parameters: ["b": "e", "c": "f", "a": "d", "asdsddd": "sdfsafdsd"],
           encoding: URLEncoding.default,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
)

// 5️⃣ POST multipart/form-data
AF.upload(
    multipartFormData: { multipartFormData in
        multipartFormData.append(URL(fileURLWithPath: "/path/to/file1.png"), withName: "avatar1")
        multipartFormData.append(URL(fileURLWithPath: "/path/to/file2.jpg"), withName: "avatar2")
        multipartFormData.append(URL(fileURLWithPath: "/path/to/resume.pdf"), withName: "documents")
        multipartFormData.append("shakil".data(using: .utf8)!, withName: "username")
        multipartFormData.append("value".data(using: .utf8)!, withName: "key")
    },
    to: "http://localhost:3000?asdfsdf=sdfsdadfsf",
    headers: ["Authorization": "Bearer sdfsdfsdfds"]
)

// 6️⃣ DELETE
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .delete,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
)

// 7️⃣ PUT
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .put,
           parameters: ["update": "value"],
           encoding: JSONEncoding.default,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
)

// 8️⃣ PATCH
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .patch,
           parameters: ["patch": "value"],
           encoding: JSONEncoding.default,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
)

// 9️⃣ OPTIONS
AF.request("http://localhost:3000?asdfsdf=sdfsdadfsf",
           method: .options,
           headers: ["Authorization": "Bearer sdfsdfsdfds"]
)
```

# =========================
# Swift - URLSession
# =========================

```swift
import Foundation

func sendRequest(urlStr: String, method: String, body: Data?, contentType: String?, auth: String?) {
    var request = URLRequest(url: URL(string: urlStr)!)
    request.httpMethod = method
    request.httpBody = body
    if let ct = contentType { request.setValue(ct, forHTTPHeaderField: "Content-Type") }
    if let token = auth { request.setValue(token, forHTTPHeaderField: "Authorization") }

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let data = data { print(String(data: data, encoding: .utf8) ?? "") }
    }
    task.resume()
}

// Example usage
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "GET",
            body: nil,
            contentType: "application/x-www-form-urlencoded",
            auth: "Bearer sdfsdfsdfds")

// POST JSON
let jsonData = try! JSONSerialization.data(withJSONObject: ["name": "John", "age": 30, "car": NSNull()])
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "POST",
            body: jsonData,
            contentType: "application/json",
            auth: "Bearer sdfsdfsdfds")

// POST Raw Text
sendRequest(urlStr: "http://localhost:3000",
            method: "POST",
            body: "This is a plain text body for the request.".data(using: .utf8),
            contentType: "text/plain",
            auth: "Bearer sdfsdfsdfds")

// PUT JSON
let putData = try! JSONSerialization.data(withJSONObject: ["update": "value"])
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "PUT",
            body: putData,
            contentType: "application/json",
            auth: "Bearer sdfsdfsdfds")

// PATCH JSON
let patchData = try! JSONSerialization.data(withJSONObject: ["patch": "value"])
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "PATCH",
            body: patchData,
            contentType: "application/json",
            auth: "Bearer sdfsdfsdfds")

// DELETE
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "DELETE",
            body: nil,
            contentType: nil,
            auth: "Bearer sdfsdfsdfds")

// OPTIONS
sendRequest(urlStr: "http://localhost:3000?asdfsdf=sdfsdadfsf",
            method: "OPTIONS",
            body: nil,
            contentType: nil,
            auth: "Bearer sdfsdfsdfds")
```
