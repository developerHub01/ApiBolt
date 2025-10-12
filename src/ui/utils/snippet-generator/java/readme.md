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
