## DartHttp

```dart
import 'package:http/http.dart' as http;

void main() async {
  var response = await http.get(
    Uri.parse('https://example.com/api/items'),
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Accept': 'application/json',
    },
  );
  print(response.body);
}


import 'dart:convert';
import 'package:http/http.dart' as http;

void main() async {
  var jsonBody = jsonEncode({'name': 'Shakil', 'role': 'developer'});

  var response = await http.post(
    Uri.parse('https://example.com/api/create'),
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Content-Type': 'application/json',
    },
    body: jsonBody,
  );

  print(response.body);
}


import 'package:http/http.dart' as http;

void main() async {
  var response = await http.post(
    Uri.parse('https://example.com/api/login'),
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      'username': 'shakil',
      'password': '12345',
    },
  );
  print(response.body);
}



import 'package:http/http.dart' as http;
import 'dart:io';

void main() async {
  var request = http.MultipartRequest(
    'POST',
    Uri.parse('https://example.com/api/upload'),
  );

  request.headers['Authorization'] = 'Bearer TOKEN';
  request.fields['username'] = 'shakil';
  request.files.add(await http.MultipartFile.fromPath(
    'avatar',
    '/path/to/file.png',
  ));

  var streamedResponse = await request.send();
  var response = await http.Response.fromStream(streamedResponse);
  print(response.body);
}


import 'package:http/http.dart' as http;

void main() async {
  var xml = '<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>';

  var response = await http.post(
    Uri.parse('https://example.com/api/xml'),
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Content-Type': 'application/xml',
    },
    body: xml,
  );

  print(response.body);
}


import 'package:http/http.dart' as http;
import 'dart:io';

void main() async {
  var file = File('/path/to/data.bin');
  var bytes = await file.readAsBytes();

  var response = await http.put(
    Uri.parse('https://example.com/api/upload-binary'),
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Content-Type': 'application/octet-stream',
    },
    body: bytes,
  );

  print(response.body);
}


import 'package:http/http.dart' as http;

void main() async {
  var response = await http.post(
    Uri.parse('https://example.com/api/reset'),
    headers: {
      'Authorization': 'Bearer TOKEN',
    },
    body: '', // empty body is safe
  );

  print(response.body);
}
```

##
