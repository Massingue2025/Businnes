from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import httpx
import os

app = FastAPI()
templates = Jinja2Templates(directory="templates")

API_PORT = os.getenv("API_PORT", "21465")
API_URL = f"http://localhost:{API_PORT}/api/message/send-text"

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/send")
async def send(number: str = Form(...), message: str = Form(...)):
    payload = {"phone": number, "message": message}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(API_URL, json=payload)
            return {"ok": True, "resposta": response.json()}
        except Exception as e:
            return {"ok": False, "erro": str(e)}
