# =========================
# Node.js - http
# =========================

```js
const http = require("http");

// 1️⃣ GET
const getOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/?asdfsdf=sdfsdadfsf",
  method: "GET",
  headers: {
    "asfsdfsdf": "addsd",
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer sdfsdfsdfds"
  }
};

const getReq = http.request(getOptions, res => {
  let data = "";
  res.on("data", chunk => { data += chunk; });
  res.on("end", () => { console.log(data); });
});
getReq.end();

// 2️⃣ POST JSON
const postData = JSON.stringify({name:"John", age:30, car:null});
const postOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/?asdfsdf=sdfsdadfsf",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer sdfsdfsdfds"
  }
};
const postReq = http.request(postOptions, res => {
  let data = "";
  res.on("data", chunk => { data += chunk; });
  res.on("end", () => { console.log(data); });
});
postReq.write(postData);
postReq.end();

// 3️⃣ POST Raw Text
const rawTextOptions = {...postOptions, body: "This is a plain text body for the request.", method: "POST"};
// Node http does not allow body in options; must use write()
const rawReq = http.request({...postOptions}, res => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => console.log(data));
});
rawReq.write("This is a plain text body for the request.");
rawReq.end();

// 4️⃣ DELETE
const deleteOptions = {...getOptions, method: "DELETE"};
const deleteReq = http.request(deleteOptions, res => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => console.log(data));
});
deleteReq.end();

// 5️⃣ PUT JSON
const putData = JSON.stringify({update:"value"});
const putOptions = {...postOptions, method:"PUT"};
const putReq = http.request(putOptions, res => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => console.log(data));
});
putReq.write(putData);
putReq.end();

// 6️⃣ PATCH JSON
const patchData = JSON.stringify({patch:"value"});
const patchOptions = {...postOptions, method:"PATCH"};
const patchReq = http.request(patchOptions, res => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => console.log(data));
});
patchReq.write(patchData);
patchReq.end();

// 7️⃣ OPTIONS
const optionsOptions = {...getOptions, method:"OPTIONS"};
const optionsReq = http.request(optionsOptions, res => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => console.log(data));
});
optionsReq.end();
```