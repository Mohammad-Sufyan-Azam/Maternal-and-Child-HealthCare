import asyncio
import json
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




# GET REQUESTS
@app.get("/")
async def root():
    return "Hello,World"  

@app.get("/html", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})  


# UPDATE REQUESTS
async def addMessage(grpmsg : groupMessages):
    print(grpmsg.model_dump())
    data =  collection.insert_one(grpmsg.model_dump())
    return "Message added to the database"
    
def fetchGroupNames():
    documents = collection.find({}, {'group_name': 1}) 
    groupNames = {document['group_name'] for document in documents}
    print(type(groupNames))
    return groupNames

# Retrieve Group Inforamtion
@app.post("/GroupInfo/")
async def fetchGroupInfo(group_name):
    data =  collection.find_one({"group_name": group_name})
    if data != None:   # no such group number
        return data
    return None

async def updateGroupMessage(group_name:str,new_messages):
    print(group_name,new_messages)
    newGroupInformation = new_messages
    data =  await fetchGroupInfo(group_name)
    print(data)
    if data!= None:
        # adding new messages to content and updating it in database
        if "content" in newGroupInformation:
            data["content"].update(newGroupInformation["content"])
            update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"content" : data["content"]}}
                )
        # print(data['content'])

        # if End Date is provided update it
        if "end_date" in newGroupInformation:
            if newGroupInformation["end_date"] != "NA":
                data["end_date"] = newGroupInformation["end_date"]
                update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"end_date" : data["end_date"]}}
                )
        
        # change in group members
        if "members" in newGroupInformation:
            newGroupMembers = newGroupInformation["members"]
            for member in newGroupMembers:
                data["members"][member] = newGroupInformation["members"][member]

            update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"members" : data["members"]}}
            )
            
        return "Message updated to the database"
    
    else:
        return "Data is NULL"

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):

    content = await file.read()
    utf8_content = content.decode('utf-8')
    content = utf8_content.split('\n')
    data = parser.mainJSONParser(content)
    groupNames = fetchGroupNames()

    if data != None:
        if data['group_name'] in groupNames:
            # then update
            flag = await updateGroupMessage(data["group_name"],data)
            print("Done")
            return "Message added for x2"
        else:
            flag = collection.insert_one(data)
            return "Message added to the db for the first time"
    else:
        return "Error in Data"










   
    # IGNORE ----------------------------

    # name = str(file.filename)[:-4]
    # instead of making a json file, this returns a json
    # await asyncio.sleep(2)
    # f =  open('json output\group wise schema_2.json')  # to be replaced with name
    # f =  open('example.json')
    # data =  json.load(f)
    # # print(data)
    # flag = collection.insert_one(data)
    # f.close()

   


# ROUGH

# POST REQUESTS
# @app.post("/")
# async def addMessage(grpmsg : groupMessages):
#     print(grpmsg.model_dump())
#     data =  collection.insert_one(grpmsg.model_dump())
#     return "Message added to the database"


# @app.put("/update/{group_number}")
# async def updateMessage(group_number:int,new_messages:updateGroupMessages):
#     print(new_messages.model_dump())
#     newGroupInformation = new_messages.model_dump()
#     data =  await fetchGroupInfo(group_number)

#     if data!= None:
#         # adding new messages to content and updating it in database
#         if "content" in newGroupInformation:
#             data["content"].update(newGroupInformation["content"])
#             update_data = collection.find_one_and_update(
#                     {"group_number": group_number},
#                     {"$set": {"content" : data["content"]}}
#                 )
#         # print(data['content'])

#         # if End Date is provided update it
#         if "end_date" in newGroupInformation:
#             if newGroupInformation["end_date"] != "NA":
#                 data["end_date"] = newGroupInformation["end_date"]
#                 update_data = collection.find_one_and_update(
#                     {"group_number": group_number},
#                     {"$set": {"end_date" : data["end_date"]}}
#                 )
        
#         # change in group members
#         if "members" in newGroupInformation:
#             newGroupMembers = newGroupInformation["members"]
#             for member in newGroupMembers:
#                 data["members"][member] = newGroupInformation["members"][member]

#             update_data = collection.find_one_and_update(
#                     {"group_number": group_number},
#                     {"$set": {"members" : data["members"]}}
#             )
            
                    
#         # update_data = collection.find_one_and_update(
#         #         {"group_number": group_number},
#         #         {"$set": {
#         #                 "members" : data["members"],
#         #                 "end_date": data["end_date"],
#         #                 "content" : data["content"]
#         #                 } 
#         #         }
#         # )

#     return "Message updated to the database"
    

# @app.get("/admins/{group_number}")
# async def getAdmins(group_number : int):
#     data =  await fetchGroupInfo(group_number)
#     if data == None:
#         return None
#     return data["group_admins"] 


# @app.get("/messages/{group_number}")
# async def getMessages(group_number:int):
#     data =  await fetchGroupInfo(group_number)
#     if data == None:
#         return None
#     return data["content"]