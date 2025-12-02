## Go net/http

```go

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
)

func main() {
	urlStr := "https://dummyjson.com/comments"

	// ================= GET with headers =================
	req, _ := http.NewRequest("GET", urlStr, nil)
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")
	req.Header.Set("Custom-Key", "Custom-Value")

	resp, _ := http.DefaultClient.Do(req)
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()

	// ================= x-www-form-urlencoded =================
	data := url.Values{}
	data.Set("a", "b")
	data.Set("c", "d")

	req, _ = http.NewRequest("POST", urlStr, bytes.NewBufferString(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")

	resp, _ = http.DefaultClient.Do(req)
	body, _ = io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()

	// ================= raw JSON =================
	jsonData := map[string]interface{}{
		"name":    "api_bolt",
		"private": true,
		"version": "0.0.0",
	}
	jsonBytes, _ := json.Marshal(jsonData)
	req, _ = http.NewRequest("POST", urlStr, bytes.NewBuffer(jsonBytes))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")

	resp, _ = http.DefaultClient.Do(req)
	body, _ = io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()

	// ================= text =================
	textData := "Some plain text"
	req, _ = http.NewRequest("POST", urlStr, bytes.NewBufferString(textData))
	req.Header.Set("Content-Type", "text/plain")
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")

	resp, _ = http.DefaultClient.Do(req)
	body, _ = io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()

	// ================= binary =================
	binData, _ := os.ReadFile("file.jpeg")
	req, _ = http.NewRequest("POST", urlStr, bytes.NewBuffer(binData))
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")

	resp, _ = http.DefaultClient.Do(req)
	body, _ = io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()

	// ================= form-data with files =================
	var b bytes.Buffer
	writer := multipart.NewWriter(&b)
	writer.WriteField("a", "b")
	writer.WriteField("c", "d")

	file1, _ := os.Open("file.jpeg")
	defer file1.Close()
	part1, _ := writer.CreateFormFile("file1", "file.jpeg")
	io.Copy(part1, file1)

	file2, _ := os.Open("image.png")
	defer file2.Close()
	part2, _ := writer.CreateFormFile("file2", "image.png")
	io.Copy(part2, file2)

	writer.Close()

	req, _ = http.NewRequest("POST", urlStr, &b)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")

	resp, _ := http.DefaultClient.Do(req)
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()
}
```

## fasthttp

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"os"

	"github.com/valyala/fasthttp"
)

func main() {
	url := "https://dummyjson.com/comments"

	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()
	defer fasthttp.ReleaseRequest(req)
	defer fasthttp.ReleaseResponse(resp)

	req.Header.SetMethod("POST")
	req.SetRequestURI(url)
	req.Header.Set("Authorization", "Bearer sdfdsfsdf")
	req.Header.Set("asdfsdf", "ssddd")

	// ========= Example body types =========

	// ----- 1. form-data -----
	/*
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	writer.WriteField("key1", "value1")

	file, _ := os.Open("file.jpeg")
	defer file.Close()
	part, _ := writer.CreateFormFile("upload", "file.jpeg")
	io.Copy(part, file)
	writer.Close()

	req.SetBody(body.Bytes())
	req.Header.Set("Content-Type", writer.FormDataContentType())
	*/

	// ----- 2. x-www-form-urlencoded -----
	/*
	form := []byte("a=b&c=d")
	req.SetBody(form)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	*/

	// ----- 3. binary -----
	/*
	binData, _ := os.ReadFile("file.jpeg")
	req.SetBody(binData)
	req.Header.Set("Content-Type", "application/octet-stream")
	*/

	// ----- 4. raw text / xml / js -----
	/*
	raw := `let x = { "a": 1, "b": 2 }`
	req.SetBody([]byte(raw))
	req.Header.Set("Content-Type", "application/javascript")
	*/

	// ----- 5. json -----
	/*
	jsonBody := map[string]interface{}{
		"config": map[string]interface{}{
			"forge": map[string]interface{}{
				"makers": []interface{}{
					map[string]interface{}{"name": "@electron-forge/maker-zip"},
				},
			},
		},
	}
	jsonBytes, _ := json.Marshal(jsonBody)
	req.SetBody(jsonBytes)
	req.Header.Set("Content-Type", "application/json")
	*/

	// ========= Send =========
	if err := fasthttp.Do(req, resp); err != nil {
		fmt.Println("Request failed:", err)
		return
	}

	fmt.Println(string(resp.Body()))
}

```
