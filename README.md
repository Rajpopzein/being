# Being API

A FastAPI service with Zero, a one-node LangGraph agent that replies using Gemini.

```text
app/
├── __init__.py
├── agents/
│   ├── __init__.py
│   └── zero.py
└── main.py
requirements.txt
```

## Run locally

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` for interactive API documentation or request `GET /health` to check the server.

## Invoke Zero

Provide `GEMINI_API_KEY` or `GOOGLE_API_KEY` in the server environment before
starting Uvicorn. Zero defaults to `gemini-3.1-pro-preview`. Set `GEMINI_MODEL`
to use a different model available to your key.

```sh
curl --fail-with-body http://127.0.0.1:8000/agents/zero/invoke \
  -H 'Content-Type: application/json' \
  -d '{"message":"Hello Zero"}'
```

```json
{"reply":"Hello! I'm Zero. How can I help?"}
```

The endpoint accepts one message per request. It returns HTTP 422 for missing
or blank messages or messages longer than 10,000 characters after trimming.
It returns HTTP 503 when the key is missing and HTTP 502 when Gemini fails to
return a reply. The reply text varies with the model.
