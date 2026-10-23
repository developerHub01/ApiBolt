# 🚀 ApiBolt ABTestEngine — COMPLETE USER DOCUMENTATION

A full-featured API testing DSL inside ApiBolt.

Every line executes immediately and stores a test result.

---

# 🌐 GLOBAL ACCESS

```ts id="global1"
ab;
```

---

# 📦 RESPONSE OBJECT

Read-only snapshot of the API response.

```ts id="resp1"
ab.response;
```

```ts id="resp2"
export interface ResponseInterface {
  body: unknown;
  headers: Record<string, unknown>;
  cookies?: Array<CookieInterface>;
  status: number;
  statusText: string;
  statusDescription?: string;
  requestSize: RequestResponseSizeInterface;
  responseSize: RequestResponseSizeInterface;
}

export interface CookieInterface {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  hostOnly?: boolean;
  maxAge?: number | null;
  expires?: string | null;
  sameSite?: "lax" | "strict" | "none";
  creation?: string;
  lastAccessed?: string;
}

export interface RequestResponseSizeInterface {
  header: number;
  body: number;
}
```

---

# 🌍 ENVIRONMENT ACCESS

```ts id="env1"
ab.env;

Record<string, string>;
```

---

## ✔ Real-world usage examples

```ts id="env_ex1"
ab.expect("env production", ab.env.NODE_ENV).toBe("production");
ab.expect("env not debug", ab.env.MODE).not.toBe("debug");
ab.expect("env exists", ab.env.API_KEY).toExist();
ab.expect("env valid mode", ab.env.NODE_ENV).toBeOneOf([
  "development",
  "staging",
  "production",
]);
ab.expect("env port range", ab.env.PORT).toBeBetweenNumber(1000, 9999);
```

---

# 🚀 STATUS ASSERTIONS

```ts id="status1"
ab.status("name");
```

---

## ✔ Exact HTTP validation (real-world usage)

```ts id="status_ex1"
ab.status("login success").toBe(200);
ab.status("user created").toBe(201);
ab.status("accepted async").toBe(202);
ab.status("no content delete").toBe(204);
ab.status("bad request validation").toBe(400);
ab.status("auth required").toBe(401);
ab.status("access denied").toBe(403);
ab.status("missing resource").toBe(404);
ab.status("server crash").toBe(500);
ab.status("gateway issue").toBe(502);
ab.status("service down").toBe(503);
```

---

## ✔ Multi-match scenarios

```ts id="status_ex2"
ab.status("auth endpoints").toBeOneOf([200, 201, 204]);
ab.status("error group").toBeOneOf([400, 401, 403, 404]);
```

---

## ✔ Range checks (real API patterns)

```ts id="status_ex3"
ab.status("success range").toBeBetween(200, 299);
ab.status("client error range").toBeBetween(400, 499);
ab.status("server error range").toBeBetween(500, 599);
ab.status("above check").toBeGreaterThan(199);
ab.status("below check").toBeLessThan(300);
```

---

## ✔ Semantic helpers

```ts id="status_ex4"
ab.status("success shortcut").toBeSuccess();
ab.status("client shortcut").toBeClientError();
ab.status("server shortcut").toBeServerError();
ab.status("redirect shortcut").toBeRedirect();
ab.status("ok exact").toBeOK();
ab.status("created exact").toBeCreated();
ab.status("accepted exact").toBeAccepted();
ab.status("no content exact").toBeNoContent();
```

---

# 📦 BODY ASSERTIONS (FULL POWER)

```ts id="body1"
ab.body("name");
```

---

## ✔ Exact matching (API response validation)

```ts id="body_ex1"
ab.body("success response").toBe({
  success: true,
});
ab.body("deep object").toEqual({
  user: {
    id: 1,
    profile: {
      name: "John",
    },
  },
});
```

---

## ✔ Existence testing

```ts id="body_ex2"
ab.body("exists check").toExist();
ab.body("missing check").not.toExist();
```

---

## ✔ Type validation

```ts id="body_ex3"
ab.body("string type").toBeType("string");
ab.body("number type").toBeType("number");
ab.body("boolean type").toBeType("boolean");
ab.body("object type").toBeType("object");
ab.body("array type").toBeType("array");
```

---

## ✔ Contains (real API usage)

```ts id="body_ex4"
ab.body("string contains").toContain("success");
ab.body("array contains").toContain(10);
ab.body("negative string").not.toContain("error");
ab.body("negative array").not.toContain("deleted");
```

---

## ✔ Property validation (deep API responses)

```ts id="body_ex5"
ab.body("simple property").toHaveProperty("user");
ab.body("nested property").toHaveProperty("user.id");
ab.body("deep property").toHaveProperty("data.user.profile.name");
ab.body("missing property").not.toHaveProperty("user.password");
```

---

## ✔ Array length validation

```ts id="body_ex6"
ab.body("exact length").toHaveLength(3);
ab.body("wrong length").not.toHaveLength(10);
```

---

## ✔ Number validation (real API stats)

```ts id="body_ex7"
ab.body("gt simple").toBeGreaterThan(10);
ab.body("lt simple").toBeLessThan(100);
ab.body("between simple").toBeBetween(10, 100);
```

---

## ✔ Strict number validation (safer APIs)

```ts id="body_ex8"
ab.body("strict gt").toBeGreaterThanNumber(10);
ab.body("strict lt").toBeLessThanNumber(100);
ab.body("strict range").toBeBetweenNumber(10, 100);
```

---

# 📡 HEADERS ASSERTIONS

```ts id="headers1"
ab.headers("name");
```

---

## ✔ Real API header tests

```ts id="headers_ex1"
ab.headers("content type").toHaveHeader("content-type");
ab.headers("server header").toHaveHeaderValue("server", "nginx");
ab.headers("json check").toHaveHeaderValue("content-type", /json/);
ab.headers("json type").toHaveContentType("application/json");
```

---

## ✔ Negative tests

```ts id="headers_ex2"
ab.headers("missing header").not.toHaveHeader("x-powered-by");
ab.headers("wrong server").not.toHaveHeaderValue("server", "apache");
```

---

# 🍪 COOKIES ASSERTIONS (FULL COVERAGE)

```ts id="cookies1"
ab.cookies("name");
```

---

## ✔ Existence

```ts id="cookie_ex1"
ab.cookies("session").toExist();
ab.cookies("token").not.toExist();
```

---

## ✔ Value validation

```ts id="cookie_ex2"
ab.cookies("session").toBe("abc123");
ab.cookies("session").not.toBe("wrong-value");
```

---

## ✔ Partial match

```ts id="cookie_ex3"
ab.cookies("session").toContain("abc");
```

---

## ✔ Structure validation

```ts id="cookie_ex4"
ab.cookies("session").toHaveProperty("value");
ab.cookies("session").toHaveProperty("domain");
ab.cookies("session").toHaveProperty("path");
```

---

## ✔ Multiple cookies

```ts id="cookie_ex5"
ab.cookies().toHaveLength(2);
```

---

## ✔ Expiry logic

```ts id="cookie_ex6"
ab.cookies("session").toExpireAfter(3600);
ab.cookies("session").toExpireBefore(7200);
```

---

## ✔ Path + domain

```ts id="cookie_ex7"
ab.cookies("session").toHavePath("/");
ab.cookies("session").toHaveDomain("example.com");
```

---

## ✔ Security flags

```ts id="cookie_ex8"
ab.cookies("session").toBeSecure();
ab.cookies("session").toBeHttpOnly();
```

---

## ✔ SameSite policies

```ts id="cookie_ex9"
ab.cookies("session").toBeSameSite("strict");
ab.cookies("session").toBeSameSite("lax");
ab.cookies("session").toBeSameSite("none");
```

---

# 🧠 EXPECT API (MOST IMPORTANT)

---

## ✔ VALUE MODE (when second param exists)

```ts id="expect1"
ab.expect("name", value);
```

### FULL REAL WORLD USAGE

```ts id="expect_val1"
ab.expect("user id", user.id).toBe(1);
ab.expect("username", user.name).toBe("john");
ab.expect("array check", [1, 2, 3]).toContain(2);
ab.expect("object check", user).toHaveProperty("id");
ab.expect("length check", [1, 2, 3]).toHaveLength(3);
ab.expect("type check", user.id).toBeType("number");
ab.expect("exists check", user.id).toExist();
ab.expect("gt check", 20).toBeGreaterThan(10);
ab.expect("lt check", 10).toBeLessThan(50);
ab.expect("range check", 15).toBeBetween(10, 20);
```

---

## ✔ RESPONSE MODE (NO VALUE PASSED)

```ts id="expect2"
ab.expect("name");
```

---

### STATUS

```ts id="expect_status"
ab.expect("status check").status.toBe(200);
ab.expect("status ok").status.toBeOK();
ab.expect("status success").status.toBeSuccess();
ab.expect("status client").status.toBeClientError();
ab.expect("status server").status.toBeServerError();
ab.expect("status redirect").status.toBeRedirect();
```

---

### BODY

```ts id="expect_body"
ab.expect("body exact").body.toBe({ success: true });
ab.expect("body deep").body.toEqual({
  user: { id: 1 },
});
ab.expect("body prop").body.toHaveProperty("user.id");
ab.expect("body contains").body.toContain("success");
ab.expect("body exists").body.toExist();
```

---

### HEADERS

```ts id="expect_headers"
ab.expect("headers exists").headers.toHaveHeader("content-type");
ab.expect("headers value").headers.toHaveHeaderValue("server", "nginx");
ab.expect("headers type").headers.toHaveContentType("application/json");
```

---

### COOKIES

```ts id="expect_cookies"
ab.expect("cookie exists").cookies.toExistCookie("session");
ab.expect("cookie value").cookies.toBeCookie("session", "abc123");
ab.expect("cookie length").cookies.toHaveLength(1);
ab.expect("cookie secure").cookies.toBeSecure();
ab.expect("cookie httponly").cookies.toBeHttpOnly();
ab.expect("cookie sameSite").cookies.toBeSameSite("strict");
```

---

# ⚡ NOT OPERATOR (FULL SUPPORT)

```ts id="not1"
ab.status("check").not.toBe(200);
ab.body("check").not.toContain("error");
ab.headers("check").not.toHaveHeader("x-powered-by");
ab.cookies("session").not.toBe("invalid");
```

---

# 🧱 GROUPING

```ts id="group1"
ab.group("Auth Flow", () => {
  ab.status("login").toBeOK();
  ab.body("login").toHaveProperty("token");
  ab.cookies("session").toExist();
});
```

---

# 🖨️ DEBUG PRINT

```ts id="print1"
ab.print("status", ab.response.status);
ab.print("body", ab.response.body);
```

---

# 💻 CODE OUTPUT

```ts id="code1"
ab.code("response", ab.response, "json");
```

---

# 📊 SUMMARY

```ts id="summary1"
ab.summary();
ab.printSummary();
```

---

# 🧪 DEMO MODE

```ts id="demo1"
ab.addDemoResults();
```

---

# ⚡ FINAL RULES

- every call immediately creates a test
- expect = dual mode (value or response)
- no chaining like Jest
- headers = case-insensitive
- cookies = optional lookup or full list
- `.not` flips only last executed test
- grouping isolates test blocks

---
