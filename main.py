from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import httpx

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/send")
async def send(number: str = Form(...), message: str = Form(...)):
    url = "http://localhost:21465/api/message/send-text"
    payload = {"phone": number, "message": message}
    async with httpx.AsyncClient() as client:
        try:
            r = await client.post(url, json=payload)
            return {"ok": True, "resposta": r.json()}
        except Exception as e:
            return {"ok": False, "erro": str(e)}
