## PowerShell Invoke Rest

```ps1
# ========================================
# 1️⃣ GET Request
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$response = Invoke-RestMethod -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method GET -Headers $headers
Write-Output $response

# ========================================
# 2️⃣ POST – JSON (stringified)
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/json"
}

$body = @'{
  "name": "John",
  "age": 30,
  "car": null
}'@

$response = Invoke-RestMethod -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response

# ========================================
# 3️⃣ POST – Text / HTML / XML (raw string)
# ========================================
# Plain text
$headers["Content-Type"] = "text/plain"
$body = "Hello World"
$response = Invoke-RestMethod -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response

# HTML
$headers["Content-Type"] = "text/html"
$body = @"
<h1>Hello</h1>
<p>World</p>
"@
$response = Invoke-RestMethod -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response

# XML
$headers["Content-Type"] = "application/xml"
$body = @"
<note>
  <to>John</to>
  <body>Hello</body>
</note>
"@
$response = Invoke-RestMethod -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response

# ========================================
# 4️⃣ POST – x-www-form-urlencoded
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/x-www-form-urlencoded"
}

$body = @{
    b       = "e"
    c       = "f"
    a       = "d"
    asdsddd = "sdfsafdsd"
}

$response = Invoke-RestMethod -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response

# ========================================
# 5️⃣ POST – Multipart/Form-Data (Multiple files per field)
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$fields = @{
    username = "shakil"
    key      = "value"
}

$files = @{
    avatar = @("C:\path\to\file1.png", "C:\path\to\file2.png")
    cover  = @("C:\path\to\cover1.jpg", "C:\path\to\cover2.jpg")
}

$client = New-Object System.Net.Http.HttpClient

foreach ($k in $headers.Keys) {
    $client.DefaultRequestHeaders.Add($k, $headers[$k])
}

$multipart = New-Object System.Net.Http.MultipartFormDataContent

# Add text fields
foreach ($k in $fields.Keys) {
    $multipart.Add((New-Object System.Net.Http.StringContent($fields[$k])), $k)
}

# Add multiple files per field
foreach ($fieldName in $files.Keys) {
    foreach ($filePath in $files[$fieldName]) {
        $fileStream = [System.IO.File]::OpenRead($filePath)
        $fileContent = New-Object System.Net.Http.StreamContent($fileStream)
        $fileName = [System.IO.Path]::GetFileName($filePath)
        $multipart.Add($fileContent, $fieldName, $fileName)
    }
}

$uri = "http://localhost:3000?asdfsdf=sdfsdadfsf"
$response = $client.PostAsync($uri, $multipart).Result
$result = $response.Content.ReadAsStringAsync().Result
Write-Output $result

# ========================================
# 6️⃣ POST – Binary File Upload
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/octet-stream"
}

$body = [System.IO.File]::ReadAllBytes("C:\path\to\file.jpg")

$response = Invoke-RestMethod -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response

# ========================================
# 7️⃣ POST – Empty Body
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$response = Invoke-RestMethod -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers
Write-Output $response
```

## PowerShell Invoke Web Request

```ps1
# ========================================
# 1️⃣ GET Request
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$response = Invoke-WebRequest -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method GET -Headers $headers
Write-Output $response.Content

# ========================================
# 2️⃣ POST – JSON (stringified)
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/json"
}

$body = @'
{
  "name": "John",
  "age": 30,
  "car": null
}
'@

$response = Invoke-WebRequest -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# ========================================
# 3️⃣ POST – Text / HTML / XML (raw string)
# ========================================

# Plain text
$headers["Content-Type"] = "text/plain"
$body = "Hello World"
$response = Invoke-WebRequest -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# HTML
$headers["Content-Type"] = "text/html"
$body = @'
<h1>Hello</h1>
<p>World</p>
'@
$response = Invoke-WebRequest -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# XML
$headers["Content-Type"] = "application/xml"
$body = @'
<note>
  <to>John</to>
  <body>Hello</body>
</note>
'@
$response = Invoke-WebRequest -Uri "http://localhost:3000" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# ========================================
# 4️⃣ POST – x-www-form-urlencoded
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/x-www-form-urlencoded"
}

$body = @{
    b       = "e"
    c       = "f"
    a       = "d"
    asdsddd = "sdfsafdsd"
}

$response = Invoke-WebRequest -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# ========================================
# 5️⃣ POST – Multipart/Form-Data (Files + Fields)
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$fields = @{
    username = "shakil"
}

$files = @{
    avatar = @("C:\path\to\file.png")
    cover  = @("C:\path\to\cover.jpg", "C:\path\to\cover2.jpg")
}

$multipart = New-Object System.Net.Http.MultipartFormDataContent

# Add text fields
foreach ($k in $fields.Keys) {
    $multipart.Add((New-Object System.Net.Http.StringContent($fields[$k])), $k)
}

# Add multiple files per field
foreach ($fieldName in $files.Keys) {
    foreach ($filePath in $files[$fieldName]) {
        $fileStream = [System.IO.File]::OpenRead($filePath)
        $fileContent = New-Object System.Net.Http.StreamContent($fileStream)
        $fileName = [System.IO.Path]::GetFileName($filePath)
        $multipart.Add($fileContent, $fieldName, $fileName)
    }
}

$client = New-Object System.Net.Http.HttpClient
foreach ($k in $headers.Keys) {
    $client.DefaultRequestHeaders.Add($k, $headers[$k])
}

$uri = "http://localhost:3000?asdfsdf=sdfsdadfsf"
$response = $client.PostAsync($uri, $multipart).Result
$result = $response.Content.ReadAsStringAsync().Result
Write-Output $result

# ========================================
# 6️⃣ POST – Binary File Upload
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
    "Content-Type"  = "application/octet-stream"
}

$body = [System.IO.File]::ReadAllBytes("C:\path\to\file.jpg")
$response = Invoke-WebRequest -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers -Body $body
Write-Output $response.Content

# ========================================
# 7️⃣ POST – Empty Body
# ========================================
$headers = @{
    "asfsdfsdf"    = "addsd"
    "Authorization" = "Bearer sdfsdfsdfds"
}

$response = Invoke-WebRequest -Uri "http://localhost:3000?asdfsdf=sdfsdadfsf" -Method POST -Headers $headers
Write-Output $response.Content

```
