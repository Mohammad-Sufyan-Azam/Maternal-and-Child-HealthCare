from typing import Optional,List
from click import File
from fastapi import Body, FastAPI, Request, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.templating import Jinja2Templates
import txttojsonparser as parser

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
database = client.students
collection = database.get_collection("whatsapp1")

# app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# declaring schema of the classes
class groupMessages(BaseModel):
    _id : str
    group_number : int
    group_admins : List[str]
    members : dict
    start_date : str
    end_date : str
    content : dict 

class updateGroupMessages(BaseModel):
    group_admins : Optional[List[str]] = None
    members : Optional[dict] = None
    end_date : Optional[str] = None
    content : Optional[dict] = None 


# Retrieve Group Inforamtion
async def fetchGroupInfo(grp_number):
    data =  collection.find_one({"group_number": grp_number})
    if data != None:   # no such group number
        return data
    return None

# GET REQUESTS
@app.get("/admins/{group_number}")
async def getAdmins(group_number : int):
    data =  await fetchGroupInfo(group_number)
    if data == None:
        return None
    return data["group_admins"] 


@app.get("/messages/{group_number}")
async def getMessages(group_number:int):
    data =  await fetchGroupInfo(group_number)
    if data == None:
        return None
    return data["content"]

@app.get("/")
async def root():
    return "Hello,World"  

@app.get("/html", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})  

# POST REQUESTS
@app.post("/")
async def addMessage(grpmsg : groupMessages):
    data =  collection.insert_one(grpmsg.model_dump())
    return "Message added to the database"


# UPDATE REQUESTS
@app.put("/update/{group_number}")
async def updateMessage(group_number:int,new_messages:updateGroupMessages):
    print(new_messages.model_dump())
    newGroupInformation = new_messages.model_dump()
    data =  await fetchGroupInfo(group_number)

    if data!= None:
        # adding new messages to content and updating it in database
        if "content" in newGroupInformation:
            data["content"].update(newGroupInformation["content"])
            update_data = collection.find_one_and_update(
                    {"group_number": group_number},
                    {"$set": {"content" : data["content"]}}
                )
        # print(data['content'])

        # if End Date is provided update it
        if "end_date" in newGroupInformation:
            if newGroupInformation["end_date"] != "NA":
                data["end_date"] = newGroupInformation["end_date"]
                update_data = collection.find_one_and_update(
                    {"group_number": group_number},
                    {"$set": {"end_date" : data["end_date"]}}
                )
        
        # change in group members
        if "members" in newGroupInformation:
            newGroupMembers = newGroupInformation["members"]
            for member in newGroupMembers:
                data["members"][member] = newGroupInformation["members"][member]

            update_data = collection.find_one_and_update(
                    {"group_number": group_number},
                    {"$set": {"members" : data["members"]}}
            )
            
                    
        # update_data = collection.find_one_and_update(
        #         {"group_number": group_number},
        #         {"$set": {
        #                 "members" : data["members"],
        #                 "end_date": data["end_date"],
        #                 "content" : data["content"]
        #                 } 
        #         }
        # )

    return "Message updated to the database"
    
import shutil

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    content = await file.read()
    content = content.decode('utf-8').split('\n')
    file_name = file.filename
    # content = [i+'\n' for i in content]

    # print(content)
    print("File Name: ",file_name)
    parser.mainJSONParser(content, file_name)

    # print(utf8_content)

    return {"filename": file.filename}
