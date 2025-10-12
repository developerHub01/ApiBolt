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