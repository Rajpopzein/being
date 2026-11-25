import os
from asyncio import timeout
from typing import TypedDict

import httpx
from google import genai
from google.genai import errors, types
from langgraph.graph import END, START, StateGraph


class ZeroConfigurationError(Exception):
    pass


class ZeroModelError(Exception):
    pass


class ZeroInput(TypedDict):
    message: str


class ZeroOutput(TypedDict):
    reply: str


class ZeroState(ZeroInput, ZeroOutput):
    pass


async def reply_to_message(state: ZeroState) -> ZeroOutput:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ZeroConfigurationError

    model = os.getenv("GEMINI_MODEL") or "gemini-3.1-pro-preview"
    try:
        async with timeout(30):
            async with genai.Client(api_key=api_key, vertexai=False).aio as client:
                response = await client.models.generate_content(
                    model=model,
                    contents=state["message"],
                    config=types.GenerateContentConfig(
                        system_instruction="You are Zero, a helpful assistant.",
                    ),
                )
    except (errors.APIError, httpx.TransportError, TimeoutError) as exc:
        raise ZeroModelError from exc

    if not response.text:
        raise ZeroModelError
    return {"reply": response.text}


builder = StateGraph(ZeroState, input_schema=ZeroInput, output_schema=ZeroOutput)
builder.add_node("reply", reply_to_message)
builder.add_edge(START, "reply")
builder.add_edge("reply", END)
zero_agent = builder.compile()
