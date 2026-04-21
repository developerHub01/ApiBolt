# 🚀 ApiBolt Test Engine (ABTestEngine)

A powerful, lightweight API testing engine built into ApiBolt for validating responses like a mini Jest for APIs.

It supports:

- 🔥 `expect()` → full unified API (recommended)
- 🧪 `status()` → HTTP status assertions
- 📦 `body()` → response body assertions
- 📡 `headers()` → header validation
- 🍪 `cookies()` → cookie validation
- 🧱 `group()` → test grouping
- 🖨️ `print()` → debugging logs
- 💻 `code()` → structured debug output
- 📊 `summary()` → final test report

---

# ⚡ CORE PHILOSOPHY

> One API = full control  
> Less thinking, more testing

Every assertion pushes a **test result object internally**, and `.not` simply flips the last recorded test result.

---

# 🚀 EXPECT API (FULL POWER MODE)

```ts
ab.expect("test name", value);
```

---

## 🔥 VALUE ASSERTIONS (BASE LAYER)

```ts
ab.expect("Equal check", 10).toBe(10);
ab.expect("Not equal", 10).not.toBe(5);

ab.expect("One of check", "apple").toBeOneOf(["apple", "banana"]);
ab.expect("Not one of", "mango").not.toBeOneOf(["apple", "banana"]);

ab.expect("Exists").toExist();
ab.expect("Not exists").not.toExist();

ab.expect("Type check").toBeType("string");
ab.expect("Wrong type").not.toBeType("number");

ab.expect("Contains string", "hello world").toContain("hello");
ab.expect("Array contains", [1, 2, 3]).toContain(2);
ab.expect("Negative contain").not.toContain("xyz");

ab.expect("Property check", {
  user: {
    id: 1,
  },
}).toHaveProperty("user.id");
ab.expect("Missing property").not.toHaveProperty("user.password");

ab.expect("Length check", [1, 2, 3]).toHaveLength(3);
ab.expect("Wrong length").not.toHaveLength(5);
```

---

## 🔢 NUMBER ASSERTIONS

```ts
ab.expect("Greater than").toBeGreaterThan(5);
ab.expect("Less than").toBeLessThan(10);
ab.expect("Between").toBeBetween(5, 15);

ab.expect("Greater number strict").toBeGreaterThanNumber(10);
ab.expect("Less number strict").toBeLessThanNumber(20);
ab.expect("Range strict").toBeBetweenNumber(10, 20);
```

---

## 🧠 DEEP EQUALITY

```ts
ab.expect("Deep match").toEqual({
  a: 1,
});
ab.expect("Deep mismatch").not.toEqual({
  a: 2,
});
```

---

# 📡 STATUS ASSERTIONS (FULL COVERAGE)

```ts
ab.expect("Status OK").toBe(200);
ab.expect("Status not OK").not.toBe(200);

ab.expect("One of status").toBeOneOf([200, 201, 204]);
ab.expect("Not allowed").not.toBeOneOf([400, 401, 403]);

ab.expect("Greater than").toBeGreaterThan(199);
ab.expect("Less than").toBeLessThan(300);
ab.expect("Between").toBeBetween(200, 299);

ab.expect("Success range").toBeSuccess();
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

ab.expect("500 error").toBeInternalServerError();
ab.expect("502 error").toBeBadGateway();
ab.expect("503 error").toBeServiceUnavailable();
```

---

# 📦 BODY ASSERTIONS (FULL COVERAGE)

```ts
ab.expect("Body equals").toEqual({
  success: true,
});
ab.expect("Body not equals").not.toEqual({
  success: false,
});

ab.expect("Body exists").toExist();
ab.expect("Body missing").not.toExist();

ab.expect("Type object").toBeType("object");
ab.expect("Type array").toBeType("array");
ab.expect("Wrong type").not.toBeType("string");

ab.expect("Contains string").toContain("apple");
ab.expect("Contains array item").toContain(10);
ab.expect("Negative contain").not.toContain("banana");

ab.expect("Has property").toHaveProperty("user.id");
ab.expect("Nested property").toHaveProperty("data.user.profile.name");
ab.expect("Missing property").not.toHaveProperty("user.password");

ab.expect("Length match").toHaveLength(3);
ab.expect("Wrong length").not.toHaveLength(5);

ab.expect("Greater").toBeGreaterThan(10);
ab.expect("Less").toBeLessThan(50);
ab.expect("Range").toBeBetween(10, 50);

ab.expect("Strict greater").toBeGreaterThanNumber(10);
ab.expect("Strict less").toBeLessThanNumber(50);
ab.expect("Strict range").toBeBetweenNumber(10, 50);
```

---

# 📡 HEADERS ASSERTIONS

```ts
ab.expect("Header exists").toHaveHeader("content-type");
ab.expect("Header missing").not.toHaveHeader("x-powered-by");

ab.expect("Exact header").toHaveHeaderValue("server", "nginx");
ab.expect("Regex header").toHaveHeaderValue("content-type", /json/);

ab.expect("JSON content").toHaveContentType("application/json");
```

---

# 🍪 COOKIES ASSERTIONS

```ts
ab.expect("Cookie exists").toExistCookie("session_id");
ab.expect("Cookie missing").not.toExistCookie("token");

ab.expect("Cookie value").toBeCookie("session_id", "123");
ab.expect("Wrong cookie").not.toBeCookie("session_id", "999");

ab.expect("Contains value").toContain("123");

ab.expect("Has property").toHaveProperty("value");

ab.expect("Length (multi)").toHaveLength(1);

ab.expect("Expiry after").toExpireAfter(3600);
ab.expect("Expiry before").toExpireBefore(7200);

ab.expect("Path match").toHavePath("/");
ab.expect("Wrong path").not.toHavePath("/admin");

ab.expect("Domain match").toHaveDomain("example.com");

ab.expect("Secure cookie").toBeSecure();
ab.expect("HttpOnly cookie").toBeHttpOnly();

ab.expect("SameSite strict").toBeSameSite("strict");
ab.expect("SameSite none").toBeSameSite("none");
```

---

# 🌍 ENV ASSERTIONS (NEW — SIMPLE REAL USAGE)

```ts
ab.expect("NODE_ENV check", ab.env.NODE_ENV).toBe("production");

ab.expect("API key exists", ab.env.API_KEY).toExist();

ab.expect("Not debug mode", ab.env.MODE).not.toBe("debug");

ab.expect("Valid env", ab.env.NODE_ENV).toBeOneOf([
  "development",
  "staging",
  "production",
]);

ab.expect("Port valid", ab.env.PORT).toBeGreaterThanNumber(1000);

ab.expect("Port range", ab.env.PORT).toBeBetweenNumber(1000, 9999);
```

---

# 🧱 CLASSIC MODE

(SAME AS BEFORE — unchanged)

---

# 🧪 GROUPING

```ts
ab.group("Auth Tests", () => {
  ab.expect("Login success").toBeOK();
});
```

---

# 🖨️ PRINT

```ts
ab.print("Status", ab.response.status);
```

---

# 💻 CODE

```ts
ab.code("Response", ab.response, "json");
```

---

# 📊 SUMMARY

```ts
ab.summary();
ab.printSummary();
```

---

# 🚀 FINAL PHILOSOPHY

- expect = main brain
- status/body/headers/cookies = low-level tools
- env = runtime config layer
- not = flips last test result
- group = structure
- print/code = debug

> build fast. test faster.

```

```
