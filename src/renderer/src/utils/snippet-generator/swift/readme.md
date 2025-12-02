## Swift - URLSession

```swift
############################
# form-data
############################

let parameters = [
  [
    "key": "safsdf",
    "src": "/run/user/1000/doc/56df99ad/michael-krahn-eGD69I3ODC4-unsplash.jpg",
    "type": "file"
  ],
  [
    "key": "safsdf",
    "src": "/run/user/1000/doc/91cc0cdb/nathan-anderson-roZgc7SXXmI-unsplash.jpg",
    "type": "file"
  ]] as [[String: Any]]

let boundary = "Boundary-\(UUID().uuidString)"
var body = Data()
var error: Error? = nil
for param in parameters {
  if param["disabled"] != nil { continue }
  let paramName = param["key"]!
  body += Data("--\(boundary)\r\n".utf8)
  body += Data("Content-Disposition:form-data; name=\"\(paramName)\"".utf8)
  if param["contentType"] != nil {
    body += Data("\r\nContent-Type: \(param["contentType"] as! String)".utf8)
  }
  let paramType = param["type"] as! String
  if paramType == "text" {
    let paramValue = param["value"] as! String
    body += Data("\r\n\r\n\(paramValue)\r\n".utf8)
  } else {
    let paramSrc = param["src"] as! String
    let fileURL = URL(fileURLWithPath: paramSrc)
    if let fileContent = try? Data(contentsOf: fileURL) {
      body += Data("; filename=\"\(paramSrc)\"\r\n".utf8)
      body += Data("Content-Type: \"content-type header\"\r\n".utf8)
      body += Data("\r\n".utf8)
      body += fileContent
      body += Data("\r\n".utf8)
    }
  }
}
body += Data("--\(boundary)--\r\n".utf8);
let postData = body

var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")
request.addValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

request.httpMethod = "GET"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()


############################
# none
############################
var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()


############################
# x-www-form-urlencoded
############################
let parameters = "key1=value1&key2=value2&key3=value3"
let postData =  parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()

############################
# binary-data
############################
let parameters = "<file contents here>"
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("image/jpeg", forHTTPHeaderField: "Content-Type")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()

############################
# raw json
############################
let parameters = "{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"car\": null\n}"
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()


############################
# raw text
############################
let parameters = "{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"car\": null\n}"
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "https://jsonplaceholder.typicode.com/todos/1")!,timeoutInterval: Double.infinity)
request.addValue("b", forHTTPHeaderField: "a")
request.addValue("text/plain", forHTTPHeaderField: "Content-Type")
request.addValue("Basic Og==", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()

```
