from fastapi import FastAPI
from app.routes import router
from app.core.config import settings

app = FastAPI(title="Mi Backend")
app.include_router(router)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
async def item_details(item_id: int):
    return {
        "item": {
            "id": item_id,
            "nombre": f"Item {item_id}",
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)