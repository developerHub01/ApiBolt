## JavaOkhttp

```java
import okhttp3.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("asfsdfsdf", "addsd")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(RequestBody.create(new byte[0], null))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}




import okhttp3.*;
import java.io.File;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("asfsdfsdf", "addsd")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();




        MultipartBody.Builder form = new MultipartBody.Builder().setType(MultipartBody.FORM);
        form.addFormDataPart("key", "value");
        form.addFormDataPart("sdfsdfsf", "michael-krahn-eGD69I3ODC4-unsplash.jpg",
            RequestBody.create(new File("michael-krahn-eGD69I3ODC4-unsplash.jpg"), MediaType.parse("image/jpeg")));
        form.addFormDataPart("sdfsdfsf", "sergei-a--heLWtuAN3c-unsplash.jpg",
            RequestBody.create(new File("sergei-a--heLWtuAN3c-unsplash.jpg"), MediaType.parse("image/jpeg")));

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(form.build())
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}




import okhttp3.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("Content-Type", "application/x-www-form-urlencoded")
            .add("asfsdfsdf", "addsd")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        String data = "a=b&c=d";

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(RequestBody.create(data, MediaType.parse("application/x-www-form-urlencoded")))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}




import okhttp3.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("asfsdfsdf", "addsd")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        byte[] fileBytes = Files.readAllBytes(new File("pine-watt-2Hzmz15wGik-unsplash.jpg").toPath());

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(RequestBody.create(fileBytes, MediaType.parse("application/octet-stream")))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}




import okhttp3.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("Content-Type", "application/javascript")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        String data = "const x = { forge: { makers: [{ name: '@electron-forge/maker-zip' }] } };";

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(RequestBody.create(data, MediaType.parse("application/javascript")))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}



import okhttp3.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("Content-Type", "application/json")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        String jsonData = "{ \"forge\": { \"makers\": [{ \"name\": \"@electron-forge/maker-zip\" }] } }";

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .post(RequestBody.create(jsonData, MediaType.parse("application/json")))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}



import okhttp3.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";

        Headers headers = new Headers.Builder()
            .add("Content-Type", "application/json")
            .add("Authorization", "Bearer sdfsdfsdfds")
            .build();

        String jsonData = "{ \"delete\": true }";

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
            .url(url)
            .headers(headers)
            .delete(RequestBody.create(jsonData, MediaType.parse("application/json")))
            .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
        response.close();
    }
}
```

## Unirest

```java
import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";

        HttpResponse<String> response = Unirest.get(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";

        HttpResponse<String> response = Unirest.post(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body("b=e&c=f&a=d&asdsddd=sdfsafdsd")
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";
        String json = "{ \"name\": \"Shakil\", \"age\": 21 }";

        HttpResponse<String> response = Unirest.post(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/json")
            .body(json)
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";

        HttpResponse<String> response = Unirest.post(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .field("key", "value")
            .field("file1", new java.io.File("file1.jpg"))
            .field("file2", new java.io.File("file2.jpg"))
            .field("file3", new java.io.File("file3.jpg"))
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        String url = "http://localhost:3000";
        byte[] bytes = Files.readAllBytes(Paths.get("file1.jpg"));

        HttpResponse<String> response = Unirest.post(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/octet-stream")
            .body(bytes)
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";
        String raw = "let x = { \"forge\": { \"packagerConfig\": {}, \"makers\": [{\"name\": \"@electron-forge/maker-zip\"}] } }";

        HttpResponse<String> response = Unirest.post(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/javascript")
            .body(raw)
            .asString();

        System.out.println(response.getBody());
    }
}


import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";
        String json = "{ \"name\": \"Shakil\", \"age\": 21 }";

        HttpResponse<String> response = Unirest.put(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/json")
            .body(json)
            .asString();

        System.out.println(response.getBody());
    }
}
import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";
        String json = "{ \"age\": 22 }";

        HttpResponse<String> response = Unirest.patch(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .header("Content-Type", "application/json")
            .body(json)
            .asString();

        System.out.println(response.getBody());
    }
}

import kong.unirest.*;

public class Main {
    public static void main(String[] args) {
        String url = "http://localhost:3000";

        HttpResponse<String> response = Unirest.delete(url)
            .header("Authorization", "Bearer sdfsdfsdfds")
            .asString();

        System.out.println(response.getBody());
    }
}
```

## HttpURLConnection

```java
import java.io.*;
import java.net.*;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // Set method and headers
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization", "Bearer sdfsdfsdfds");

        // Get response
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }
}



import java.io.*;
import java.net.*;
import java.nio.file.Files;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";
        String boundary = "===" + System.currentTimeMillis() + "===";
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

        try (OutputStream os = con.getOutputStream()) {

            // ===== Text Field 1 =====
            String key1 = "username";
            String value1 = "shakil";
            os.write(("--" + boundary + "\r\n").getBytes());
            os.write(("Content-Disposition: form-data; name=\"" + key1 + "\"\r\n\r\n").getBytes());
            os.write((value1 + "\r\n").getBytes());

            // ===== Text Field 2 =====
            String key2 = "email";
            String value2 = "shakil@example.com";
            os.write(("--" + boundary + "\r\n").getBytes());
            os.write(("Content-Disposition: form-data; name=\"" + key2 + "\"\r\n\r\n").getBytes());
            os.write((value2 + "\r\n").getBytes());

            // ===== File 1 =====
            File file1 = new File("file1.jpg");
            os.write(("--" + boundary + "\r\n").getBytes());
            os.write(("Content-Disposition: form-data; name=\"avatar\"; filename=\"" + file1.getName() + "\"\r\n").getBytes());
            os.write(("Content-Type: " + Files.probeContentType(file1.toPath()) + "\r\n\r\n").getBytes());
            Files.copy(file1.toPath(), os);
            os.write("\r\n".getBytes());

            // ===== File 2 =====
            File file2 = new File("file2.jpg");
            os.write(("--" + boundary + "\r\n").getBytes());
            os.write(("Content-Disposition: form-data; name=\"background\"; filename=\"" + file2.getName() + "\"\r\n").getBytes());
            os.write(("Content-Type: " + Files.probeContentType(file2.toPath()) + "\r\n\r\n").getBytes());
            Files.copy(file2.toPath(), os);
            os.write("\r\n".getBytes());

            // ===== End Boundary =====
            os.write(("--" + boundary + "--\r\n").getBytes());
        }

}


import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        con.setRequestProperty("Authorization", "Bearer sdfsdfsdfds");

        String data = "b=e&c=f&a=d&asdsddd=sdfsafdsd";

        try (OutputStream os = con.getOutputStream()) {
            byte[] input = data.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }
}


import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer sdfsdfsdfds");

        String jsonData = "{ \"forge\": { \"packagerConfig\": {}, \"makers\": [{\"name\": \"@electron-forge/maker-zip\"}] } }";

        try (OutputStream os = con.getOutputStream()) {
            byte[] input = jsonData.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }
}


import java.io.*;
import java.net.*;
import java.nio.file.Files;

public class Main {
    public static void main(String[] args) throws IOException {
        String url = "http://localhost:3000";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/octet-stream");
        con.setRequestProperty("Authorization", "Bearer sdfsdfsdfds");

        byte[] fileBytes = Files.readAllBytes(new File("matthew-smith-Rfflri94rs8-unsplash.jpg").toPath());

        try (OutputStream os = con.getOutputStream()) {
            os.write(fileBytes);
        }

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }
}
```

## JavaApacheHttpClient

```java
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class Main {
	public static void main(String[] args) throws Exception {
		String url = "http://localhost:3000";

		CloseableHttpClient client = HttpClients.createDefault();
		HttpGet request = new HttpGet(url);
		request.setHeader("Authorization", "Bearer sdfsdfsdfds");

		HttpResponse response = client.execute(request);
		String result = EntityUtils.toString(response.getEntity());
		System.out.println(result);

		client.close();
	}
}


import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class Main {
	public static void main(String[] args) throws Exception {
		String url = "http://localhost:3000";
		String json = "{ \"name\": \"Shakil\", \"age\": 21 }";

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost request = new HttpPost(url);
		request.setHeader("Content-Type", "application/json");
		request.setEntity(new StringEntity(json));

		HttpResponse response = client.execute(request);
		String result = EntityUtils.toString(response.getEntity());
		System.out.println(result);

		client.close();
	}
}


import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import java.io.File;

public class Main {
	public static void main(String[] args) throws Exception {
		String url = "http://localhost:3000";

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost request = new HttpPost(url);

		MultipartEntityBuilder builder = MultipartEntityBuilder.create();
		builder.addPart("name", new StringBody("Shakil"));
		builder.addPart("profile", new FileBody(new File("photo.jpg")));
		request.setEntity(builder.build());

		HttpResponse response = client.execute(request);
		String result = EntityUtils.toString(response.getEntity());
		System.out.println(result);

		client.close();
	}
}


import org.apache.http.HttpResponse;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import java.util.*;

public class Main {
	public static void main(String[] args) throws Exception {
		String url = "http://localhost:3000";

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost request = new HttpPost(url);

		List<BasicNameValuePair> params = new ArrayList<>();
		params.add(new BasicNameValuePair("b", "e"));
		params.add(new BasicNameValuePair("c", "f"));
		params.add(new BasicNameValuePair("a", "d"));
		request.setEntity(new UrlEncodedFormEntity(params));

		HttpResponse response = client.execute(request);
		String result = EntityUtils.toString(response.getEntity());
		System.out.println(result);

		client.close();
	}
}


import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {
	public static void main(String[] args) throws Exception {
		String url = "http://localhost:3000";

		byte[] fileBytes = Files.readAllBytes(Paths.get("photo.jpg"));

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost request = new HttpPost(url);
		request.setHeader("Content-Type", "application/octet-stream");
		request.setEntity(new ByteArrayEntity(fileBytes));

		HttpResponse response = client.execute(request);
		String result = EntityUtils.toString(response.getEntity());
		System.out.println(result);

		client.close();
	}
}
```
