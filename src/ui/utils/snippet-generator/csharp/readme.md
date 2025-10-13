## HttpClient

```cs
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.IO;

class Program
{
    static async Task Main()
    {
        // ===== URL =====
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        using HttpClient client = new HttpClient();

        // ===== Headers =====
        client.DefaultRequestHeaders.Add("asfsdfsdf", "addsd");
        client.DefaultRequestHeaders.Add("Authorization", "***************"); // replace with your value

        // ===== GET Request =====
        HttpResponseMessage getResponse = await client.GetAsync(url);
        Console.WriteLine(await getResponse.Content.ReadAsStringAsync());

        // ===== POST x-www-form-urlencoded =====
        var formData = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("b", "e"),
            new KeyValuePair<string, string>("c", "f"),
            new KeyValuePair<string, string>("a", "d"),
            new KeyValuePair<string, string>("asdsddd", "sdfsafdsd")
        });
        HttpResponseMessage postFormResponse = await client.PostAsync(url, formData);
        Console.WriteLine(await postFormResponse.Content.ReadAsStringAsync());

        // ===== POST Raw JSON =====
        string json = "{ \"forge\": { \"packagerConfig\": {}, \"makers\": [{\"name\": \"@electron-forge/maker-zip\"}] } }";
        var jsonContent = new StringContent(json, Encoding.UTF8, "application/json");
        HttpResponseMessage postJsonResponse = await client.PostAsync(url, jsonContent);
        Console.WriteLine(await postJsonResponse.Content.ReadAsStringAsync());

        // ===== POST Binary File =====
        byte[] fileBytes = File.ReadAllBytes("michael-krahn-eGD69I3ODC4-unsplash.jpg");
        var byteContent = new ByteArrayContent(fileBytes);
        byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        HttpResponseMessage postBinaryResponse = await client.PostAsync(url, byteContent);
        Console.WriteLine(await postBinaryResponse.Content.ReadAsStringAsync());

        // ===== POST Multipart/Form-Data =====
        using var multipartContent = new MultipartFormDataContent();
        multipartContent.Add(new StringContent("value"), "key");
        multipartContent.Add(new StringContent("asdfsdf"), "asdfsd");
        multipartContent.Add(new ByteArrayContent(File.ReadAllBytes("michael-krahn-eGD69I3ODC4-unsplash.jpg")), "sdfsdfsf", "michael-krahn-eGD69I3ODC4-unsplash.jpg");
        multipartContent.Add(new ByteArrayContent(File.ReadAllBytes("sergei-a--heLWtuAN3c-unsplash.jpg")), "sdfsdfsf", "sergei-a--heLWtuAN3c-unsplash.jpg");

        HttpResponseMessage postMultipartResponse = await client.PostAsync(url, multipartContent);
        Console.WriteLine(await postMultipartResponse.Content.ReadAsStringAsync());
    }
}
```

## RestSharp

```cs
using System;
using System.Threading.Tasks;
using RestSharp;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Get);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Put);

        request.AddHeader("Authorization", "***************");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");

        request.AddParameter("asdfsd", "asdfsdf");
        request.AddFile("sdfsdfsf", "michael-krahn-eGD69I3ODC4-unsplash.jpg");
        request.AddFile("sdfsdfsf", "sergei-a--heLWtuAN3c-unsplash.jpg");
        request.AddParameter("key", "value");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}



using System;
using System.Threading.Tasks;
using RestSharp;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "application/x-www-form-urlencoded");

        request.AddParameter("b", "e");
        request.AddParameter("c", "f");
        request.AddParameter("a", "d");
        request.AddParameter("asdsddd", "sdfsafdsd");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;
using System.IO;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "application/octet-stream");

        byte[] fileBytes = await File.ReadAllBytesAsync("/media/Development/api-bolt-backgrounds/pine-watt-2Hzmz15wGik-unsplash.jpg");
        request.AddParameter("application/octet-stream", fileBytes, ParameterType.RequestBody);

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;
using System.Text;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "application/json");

        string json = "{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"car\": null\n}";
        request.AddStringBody(json, DataFormat.Json);

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}

using System;
using System.Threading.Tasks;
using RestSharp;
using System.Text;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "application/javascript");

        string raw = "let x = {\n  name: \"John\",\n  age: 30,\n  car: null\n};";
        request.AddStringBody(raw, "application/javascript");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;
using System.Text;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "application/xml");

        string raw = "<person><name>John</name><age>30</age></person>";
        request.AddStringBody(raw, "application/xml");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;
using System.Text;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "text/html");

        string raw = "<html><body><h1>Hello World</h1></body></html>";
        request.AddStringBody(raw, "text/html");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}


using System;
using System.Threading.Tasks;
using RestSharp;
using System.Text;

class Program
{
    static async Task Main()
    {
        string url = "http://localhost:3000?asdfsdf=sdfsdadfsf";

        var client = new RestClient(url);
        var request = new RestRequest(Method.Post);

        request.AddHeader("asfsdfsdf", "addsd");
        request.AddHeader("Authorization", "***************");
        request.AddHeader("Content-Type", "text/plain");

        string raw = "Just some plain text content here...";
        request.AddStringBody(raw, "text/plain");

        var response = await client.ExecuteAsync(request);
        Console.WriteLine(response.Content);
    }
}
```