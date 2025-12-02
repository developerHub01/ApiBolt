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

## DartDio

```dart
import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Accept': 'application/json',
  };

  Dio dio = Dio();

  Response response = await dio.get(
    'https://example.com/api/items',
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/json',
  };

  Map<String, dynamic> bodyData = {
    'name': 'Shakil',
    'role': 'developer',
  };

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/create',
    data: bodyData,
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  Map<String, dynamic> bodyData = {
    'username': 'shakil',
    'password': '12345',
  };

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/login',
    data: FormData.fromMap(bodyData),
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'package:dio/dio.dart';
import 'dart:io';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
  };

  Map<String, dynamic> fields = {
    'username': 'shakil',
  };

  Map<String, List<File>> files = {
    'avatar': File('/path/to/file.png'),
  };

  FormData formData = FormData();

  fields.forEach((key, value) {
    formData.fields.add(MapEntry(key, value.toString()));
  });

  for (var entry in files.entries) {
    for (var file in entry.value) {
      formData.files.add(MapEntry(
        entry.key,
        await MultipartFile.fromFile(file.path),
      ));
    }
  }

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/upload',
    data: formData,
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/xml',
  };

  String bodyData = '<note><to>Shakil</to><from>ApiBolt</from><body>Hello</body></note>';

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/xml',
    data: bodyData,
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'dart:convert';
import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/json',
  };

  // JSON body explicitly encoded as string
  String bodyData = jsonEncode({
    'name': 'Shakil',
    'role': 'developer',
  });

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/create',
    data: bodyData,
    options: Options(headers: headers),
  );

  print(response.data);
}



import 'package:dio/dio.dart';
import 'dart:io';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/octet-stream',
  };

  File file = File('/path/to/data.bin');
  List<int> bodyData = file.readAsBytesSync();

  Dio dio = Dio();

  Response response = await dio.put(
    'https://example.com/api/upload-binary',
    data: bodyData,
    options: Options(headers: headers),
  );

  print(response.data);
}


import 'package:dio/dio.dart';

void main() async {
  Map<String, String>? headers = {
    'Authorization': 'Bearer TOKEN',
  };

  Dio dio = Dio();

  Response response = await dio.post(
    'https://example.com/api/reset',
    data: '', // empty body
    options: Options(headers: headers),
  );

  print(response.data);
}
```
