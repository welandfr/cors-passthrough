# cors-passthrough

Deploy somewhere, use to make CORS requests to APIs not allowing CORS.

- Create a `.env` file by copying `.env-example`, replace the example key with a good one.
- Deploy the api somewhere
- Use with any request method, include the following headers:
```
Authorization: my-secret-key
X-Url: https://cors-blocking-api.com/
```

