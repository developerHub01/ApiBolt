# 🚀 ApiBolt Test Engine (ABTestEngine)

A lightweight, powerful testing utility for validating API responses inside **ApiBolt**.

# 🔥 Core Idea

`ABTestEngine` provides multiple assertion layers:

- `status()` → HTTP status testing
- `body()` → response body validation
- `headers()` → headers validation
- `cookies()` → cookies validation

* `group()` → organize tests into blocks
* `print()` → log values to the test console
* `code()` → log values to the test with code block
* `summary()` → generate a visual test summary

- **`expect()` → 🔥 ALL-IN-ONE (recommended)**

# ⭐ Why `expect()`?

> `expect()` is the **most powerful API**

It combines:

- ✅ Status assertions
- ✅ Body assertions
- ✅ Headers assertions
- ✅ Cookies assertions
- ✅ Properties response & env

👉 You can test everything from a single interface.

---

# 📦 Basic Usage

```ts
// simple test
ab.expect("Status OK").toBe(200);

// get results
const results = ab.getResults();
```

---

# 🧠 EXPECT API (FULL DOCUMENTATION)

---

## ✅ STATUS ASSERTIONS

```ts
ab.expect("Status is 200").toBe(200);
ab.expect("Status is not 500").not.toBe(500);

ab.expect("Valid success").toBeOneOf([200, 201, 204]);
ab.expect("Invalid status").not.toBeOneOf([400, 401, 403]);

ab.expect("Greater than 199").toBeGreaterThan(199);
ab.expect("Less than 300").toBeLessThan(300);

ab.expect("2xx range").toBeBetween(200, 299);
ab.expect("Not in 4xx").not.toBeBetween(400, 499);

ab.expect("Success response").toBeSuccess();
ab.expect("Client error").toBeClientError();
ab.expect("Server error").toBeServerError();
ab.expect("Redirect").toBeRedirect();

ab.expect("OK").toBeOK();
ab.expect("Created").toBeCreated();
ab.expect("Accepted").toBeAccepted();
ab.expect("No Content").toBeNoContent();
ab.expect("Bad Request").toBeBadRequest();
ab.expect("Unauthorized").toBeUnauthorized();
ab.expect("Forbidden").toBeForbidden();
ab.expect("Not Found").toBeNotFound();
ab.expect("Internal Server Error").toBeInternalServerError();
ab.expect("Bad Gateway").toBeBadGateway();
ab.expect("Service Unavailable").toBeServiceUnavailable();
```

---

## 📦 BODY ASSERTIONS

```ts
ab.expect("Body equals").toEqual({ success: true });
ab.expect("Body not equal").not.toEqual({ success: false });

ab.expect("Body exists").toExist();
ab.expect("Body does not exist").not.toExist();

ab.expect("Is object").toBeType("object");
ab.expect("Is array").toBeType("array");
ab.expect("Not string").not.toBeType("string");

ab.expect("Contains item").toContain("apple");
ab.expect("Does not contain").not.toContain("banana");

ab.expect("Has property").toHaveProperty("user.name");
ab.expect("Nested exists").toHaveProperty("data.user.id");
ab.expect("Missing property").not.toHaveProperty("user.age");

ab.expect("Length 3").toHaveLength(3);
ab.expect("Not length 5").not.toHaveLength(5);

ab.expect("Greater than 10").toBeGreaterThanNumber(10);
ab.expect("Less than 50").toBeLessThanNumber(50);
ab.expect("Between 10-20").toBeBetweenNumber(10, 20);
```

---

## 📡 HEADERS ASSERTIONS

```ts
ab.expect("Header exists").toHaveHeader("content-type");
ab.expect("Header missing").not.toHaveHeader("x-custom");

ab.expect("Header exact").toHaveHeaderValue("content-type", "application/json");

ab.expect("Header regex").toHaveHeaderValue("content-type", /json/);

ab.expect("JSON response").toHaveContentType("application/json");
```

---

## 🍪 COOKIES ASSERTIONS

```ts
ab.expect("Session exists").toExistCookie("session_id");
ab.expect("Session value").toBeCookie("session_id", "123456");
```

---

# 🧱 CLASSIC API (status, body, headers, cookies)

> Full low-level control if you don't want `expect()`

---

## STATUS (status())

```ts
ab.status("Status is 200").toBe(200);
ab.status("Status is not 500").not.toBe(500);

ab.status("Valid success").toBeOneOf([200, 201, 204]);
ab.status("Not allowed").not.toBeOneOf([400, 401, 403]);

ab.status("Greater than 199").toBeGreaterThan(199);
ab.status("Less than 300").toBeLessThan(300);

ab.status("2xx range").toBeBetween(200, 299);
ab.status("Not in 4xx range").not.toBeBetween(400, 499);

ab.status("Success response").toBeSuccess();
ab.status("Client error").toBeClientError();
ab.status("Server error").toBeServerError();
ab.status("Redirect").toBeRedirect();

ab.status("OK").toBeOK();
ab.status("Created").toBeCreated();
ab.status("Bad Request").toBeBadRequest();
ab.status("Internal Server Error").toBeInternalServerError();
```

---

## BODY (body())

```ts
ab.body("Primitive match").toBe("OK");
ab.body("Value is 10").toBe(10);
ab.body("Deep equality").toEqual({ key: "value" });

ab.body("Value exists").toExist();

ab.body("Check string").toBeType("string");
ab.body("Check array").toBeType("array");

ab.body("Array contains item").toContain("apple");

ab.body("Has property").toHaveProperty("user.name");

ab.body("Array has length 3").toHaveLength(3);

ab.body("Greater than 10").toBeGreaterThan(10);
ab.body("Between 10 and 20").toBeBetween(10, 20);
```

---

## HEADERS (headers())

```ts
ab.headers("Headers exist").toExist();
ab.headers("Is Empty").toBeEmpty();

ab.headers("Header 'content-type' exists").toHaveProperty("content-type");
ab.headers("Header missing").not.toHaveProperty("x-custom-header");

ab.headers("Value check").toHaveHeaderValue("server", "nginx");
ab.headers("JSON check").toHaveContentType("application/json");
```

---

## COOKIES (cookies())

```ts
ab.cookies("session_id").toExist();

ab.cookies("session_id").toBe("123456");

ab.cookies("session_id").toContain("123");

ab.cookies("session_id").toHaveProperty("path");

ab.cookies("session_id").toHavePath("/");
ab.cookies("session_id").toBeSecure();
ab.cookies("session_id").toBeHttpOnly();

ab.cookies("session_id").toBeSameSite("strict");

ab.cookies("session_id").toExpireAfter(1800);
ab.cookies("session_id").toExpireBefore(3600);
ab.cookies("session_id").toHaveDomain("example.com");

ab.cookies().toExist();
```

---

# ⚡ Negation (`not`)

Every assertion supports `.not`

```ts
ab.expect("Not 500").not.toBe(500);
ab.expect("No error").not.toBeServerError();
ab.expect("No password field").not.toHaveProperty("password");
```

---

# 🧩 Summary

| Feature  | Method     |
| -------- | ---------- |
| Status   | `expect()` |
| Body     | `expect()` |
| Headers  | `expect()` |
| Cookies  | `expect()` |
| Negation | `.not`     |

---

# 🧠 Final Note

If you are using:

```ts
ab.status();
ab.body();
ab.headers();
ab.cookies();
```

👉 You are doing **more work than needed**

✅ Just use:

```ts
ab.expect();
```

---

# 🚀 Philosophy

> One method. Full control. Zero confusion.

`expect()` is designed to behave like a **mini Jest for API testing inside ApiBolt**.

---

# 📂 ORGANIZING TESTS (group())

Use `group()` to create logical boundaries for your tests. This is essential for large API suites.

```ts
// 1. Basic Grouping
ab.group("Profile Module", () => {
  ab.expect("Status is 200").toBeOK();
  ab.expect("Valid JSON Body").toBeType("object");
});

// 2. Functional Segregation
ab.group("Authentication Security", () => {
  ab.expect("HSTS Header").toHaveHeader("strict-transport-security");
  ab.expect("XSS Protection").toHaveHeaderValue(
    "x-xss-protection",
    "1; mode=block",
  );
  ab.expect("No sensitive data in body").not.toHaveProperty("user.password");
});
```

---

# 📝 DEBUGGING & LOGGING (print())

Use `print()` to inspect the state of your response or environment variables during test execution.

```ts
// Log raw values
ab.print("Status Code", ab.response.status);
ab.print("Envs", ab.env);

// Log objects (auto-stringified)
ab.print("Response Payload", ab.response.body);

// Log specific parts of the response
const user = ab.response.body.user;
if (user) {
  ab.print("User ID detected", user.id);
  ab.print("User ID from env", ab.env.user_id);
}
```

---

# 📊 TEST SUMMARY (summary())

The summary methods allow you to generate a final report at the end of your script.

```ts
ab.group("Final Audit", () => {
  // Perform some tests
  ab.expect("Final check").toBeOK();

  // Push summary into results
  ab.summary();

  // Print summary to debug console
  ab.printSummary();
});
```

---

# 🔥 PRO EXAMPLES (EVERYTHING POSSIBLE)

### 1. Complex Pagination Check

```ts
ab.group("Pagination Tests", () => {
  ab.expect("Is Array").toBeType("array");
  ab.expect("Has 10 items").toHaveLength(10);

  const firstItem = ab.response.body[0];
  ab.print("First Item ID", firstItem.id);
  ab.code("First Item ID", response.body, "javascript");
  ab.code("First Item ID", response, "json");

  ab.expect("Has ID").toHaveProperty("0.id");
  ab.expect("Has Metadata").toHaveHeader("x-total-count");
});
```

### 2. Deep Cookie & Security Audit

```ts
ab.group("Strict Security Check", () => {
  const sid = ab.cookies("session_id");

  sid.toExist();
  sid.toBeSecure();
  sid.toBeHttpOnly();
  sid.toBeSameSite("strict");
  sid.toExpireAfter(3600); // 1 hour
  sid.toHavePath("/api");
  sid.toHaveDomain("api.production.com");
});
```

### 3. Conditional Custom Logic (using response)

```ts
const res = ab.response;

if (res.status === 201) {
  ab.group("Resource Created Verification", () => {
    ab.expect("Has Location Header").toHaveHeader("location");
    ab.expect("Body has ID").toHaveProperty("id");
  });
} else {
  ab.print("Warning", "Resource was not created, skipping deep checks.");
  ab.expect("Fallback Status").toBeOK();
}
```
