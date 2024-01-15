from typing import Optional,List
from fastapi import Body, FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.templating import Jinja2Templates

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
database = client.students
collection = database.get_collection("whatsapp")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class groupMessages(BaseModel):
    group_number : int
    messages : List[str] # type: ignore

class updateGroupMessages(BaseModel):
    messages : Optional[List[str]] = None # type: ignore

def message_decoder(message):
    return {
        "id": message["id"],
        "time" : message["time"],
        "content" : message["content"]
    }

# Retrieve all messages with some logic
async def get_messages(grp_number):
    messages = []
    data =  collection.find_one({"group_number": grp_number})
    for msg in data["messages"]: # type: ignore
        messages.append(msg)
    return messages


@app.get("/messages/{group_number}")
async def showMessage(group_number:int):
    data = await get_messages(group_number)
    print(data)
    return await get_messages(group_number)

@app.get("/")
async def root():
    return "Hello,Wopird"  

@app.get("/html", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})  


@app.post("/")
async def addMessage(grpmsg : groupMessages):
    data =  collection.insert_one(grpmsg.model_dump())
    return "Message added to the database"

@app.put("/update/{group_number}")
async def updateMessage(group_number:int,new_messages:updateGroupMessages):
    print(new_messages.model_dump()['messages'])
    data =  collection.find_one({"group_number": group_number})
    if data!= None:
        print("inside")
        print(data['messages'])
        data["messages"].extend(new_messages.model_dump()['messages'])
        print(data['messages'])
        # new messages will be in form of list say [m1,m2,m3......]
        update_data = collection.find_one_and_update(
                {"group_number": group_number},
                {"$set": {"messages":data["messages"]} }
            )

    return "Message updated to the database"
    


# schema example 
# {
#   "_id": {
#     "$oid": "654005999477c954ba744cff"
#   },
#   "group_number": 1,
#   "messages_1": [
#     {
#       "id": 1,
#       "content": "hi sir"
#     },
#     {
#       "id": 2,
#       "content": "hi sir1"
#     }
#   ]
# }

