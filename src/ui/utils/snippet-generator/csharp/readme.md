## HttpClient

```c#
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
