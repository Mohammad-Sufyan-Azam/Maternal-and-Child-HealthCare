import asyncio
import codecs
import csv
from datetime import datetime
import json
from typing import Optional,List
from click import File
from fastapi import Body, FastAPI, Request, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pandas as pd
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.templating import Jinja2Templates
import uvicorn
import txttojsonparser as parser

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
database = client.students
collection = database.get_collection("whatsapp1")
zoom_collection = database.get_collection("zoom")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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

def compareTimeStamps(timestamp1_str,timestamp2_str):
    timestamp_format = "%m/%d/%y, %I:%M %p"
    timestamp1 = datetime.strptime(timestamp1_str, timestamp_format)
    timestamp2 = datetime.strptime(timestamp2_str, timestamp_format)

    if timestamp1 < timestamp2:
        return -1
    elif timestamp1 > timestamp2:
        return 1
    else:
        return 0

# Retrieve Group Inforamtion
@app.post("/GroupInfo/")
async def fetchGroupInfo(group_name):
    data =  collection.find_one({"group_name": group_name})
    if data != None:   # no such group number
        return data
    return None

async def updateGroupMessage(group_name:str,new_messages):
    # print(group_name,new_messages)
    newGroupInformation = new_messages
    print("--------------------")
    print(newGroupInformation)
    data =  await fetchGroupInfo(group_name)
    
    if data!= None:
        # adding new messages to content and updating it in database
        if "content" in newGroupInformation:
            for date in newGroupInformation["content"]:
                if date in data["content"]:
                    # if timestamp same i.e new walle ka naaya and old walle ka last toh id update krni h
                    oldTimestamps = data["content"][date] # [{},{},..........]
                    newTimestamps = newGroupInformation["content"][date] # [{},{},..........]
                    
                    lastMessageOldTimestamp = oldTimestamps[-1]["timestamp"]
                    firstMessageNewTimestamp = newTimestamps[0]["timestamp"]

                    # [1,2,3] [4,5,6,7,8]
                    if compareTimeStamps(lastMessageOldTimestamp,firstMessageNewTimestamp) < 0:
                        data["content"][date].extend(newGroupInformation["content"][date])

                    # [1,2,3a,3b,4,5]  [3a,3b,4,5,6,7]
                    elif compareTimeStamps(lastMessageOldTimestamp,firstMessageNewTimestamp) > 0:
                        sameMessageidx = oldTimestamps.index(newTimestamps[0])
                        print(newTimestamps[0])
                        print(oldTimestamps[sameMessageidx])
                        offset = len(oldTimestamps) - sameMessageidx # 6 - 2 = 4
                        print("offset",offset)
                        data["content"][date].extend(newGroupInformation["content"][date][offset:])

                    
                    # [1,2,3a,3b,3c,3d] [3b,3c,3d] or [3e,3f,3g] # doesnot takes into account same messages sent by same user at the same timestamp
                    else:
                        sameMessageidx = oldTimestamps.index(newTimestamps[0])
                        print("sameMessageidx",sameMessageidx)
                        if sameMessageidx == -1:
                            data["content"][date].extend(newGroupInformation["content"][date])
                        else:
                            offset = len(oldTimestamps) - sameMessageidx 
                            print("offset",offset)
                            data["content"][date].extend(newGroupInformation["content"][date][offset:])
                   
                    # data["content"][date].extend(newGroupInformation["content"][date])
                        
                else: # no messages iss date ki in purana database
                    data["content"][date] = newGroupInformation["content"][date]
                    

                    
            update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"content" : data["content"]}}
                )
            
            # last date - if new file contains start date >= last date then update
            # if last date = start date : data[][last_date].append(messages of first)
            # then update all others after removing 

        # print(data['content'])

        # if End Date is provided update itAccess-Control-Allow-Origin:*
        if "end_date" in newGroupInformation:
            if newGroupInformation["end_date"] != "NA":
                data["end_date"] = newGroupInformation["end_date"]
                update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"end_date" : data["end_date"]}}
                )
        
        # change in group members
        if "members" in newGroupInformation:
            print(data['members'])
            newGroupMembers = newGroupInformation["members"]
            for member in newGroupMembers:
                data["members"][member] = newGroupInformation["members"][member]

            update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {
                        "members" : data["members"],
                        "unknown_user_count" : newGroupInformation["unknown_user_count"],
                        "known_users" : newGroupInformation["known_users"],
                        "unknown_users" : newGroupInformation["unknown_users"]

                        }
                    }
            )
            
        return "Message updated to the database"
    
    else:
        return "Data is NULL"

#  modification
class FormData(BaseModel):
        currentGroupName: str
        groupMember : str
        newGroupName : str
        adminName : str

# add admin
@app.post("/addGroupAdmin")
async def addGroupAdmin(form : FormData):

    group_name = form.currentGroupName
    admin = form.adminName

    data =  await fetchGroupInfo(group_name)
    if data!= None:
        data["group_admins"].append(admin)
        update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"group_admins" : data["group_admins"]}}
                )
        return "Admin added to the group"
    else:
        return "No such group number"
    
# remove admin
@app.post("/removeGroupAdmin")
async def removeGroupAdmin(form : FormData):
    group_name = form.currentGroupName
    admin = form.adminName
    data =  await fetchGroupInfo(group_name)
    if data!= None:
        try:
            data["group_admins"].remove(admin)
            update_data = collection.find_one_and_update(
                        {"group_name": group_name},
                        {"$set": {"group_admins" : data["group_admins"]}}
                    )
            return "Admin removed from the group"
        
        except:
            return "Admin not found in the group"
    else:
        return "No such group number"



# add member
@app.post("/addGroupMember")
async def addGroupMember(form : FormData):

    group_name = form.currentGroupName
    member = form.groupMember
    print("here"+form.newGroupName)
    data =  await fetchGroupInfo(group_name)
    if data!= None:
        data["members"][member] = True
        update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"members" : data["members"]}}
                )
        return "Member added to the group"
    else:
        return "No such group number"

# remove member
@app.post("/removeGroupMember")
async def removeGroupMember(form : FormData):
    group_name = form.currentGroupName
    member = form.groupMember
    data =  await fetchGroupInfo(group_name)
    if data!= None:
        try:
            data["members"][member] = False
            update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"members" : data["members"]}}
                )
            return "Member removed from the group"
        except:
            return "Member not found in the group"
    else:
        return "No such group number"


# change group name
@app.post("/changeGroupName")
async def changeGroupName(formdata : FormData):
    group_name = formdata.currentGroupName
    new_group_name = formdata.newGroupName
    print("changing groupieeeee")
    data =  await fetchGroupInfo(group_name)
    if data!= None:
        data["group_name"] = new_group_name
        update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"group_name" : data["group_name"]}}
                )
        return "Group name changed"
    else:
        return "No such group number"

@app.get("/fetchUnknownUsers")
def fetchUnknownUsers(group_name:str):
    data =  collection.find_one({"group_name": group_name})
    # print(data['unknown_user_count'])
    unknown_user_count = 0
    known_users = []
    unknown_users = []
    try :
        unknown_user_count = data['unknown_user_count']
    except:
        unknown_user_count = 0

    try:
        known_users = data['known_users']
    except:
        known_users = []

    try:
        unknown_users = data['unknown_users']
    except:
        unknown_users = []

    try:
        phone_dict = data["phone_dict"]
    except:
        phone_dict = {} # name : {numbers}

    return [unknown_user_count,known_users,unknown_users,phone_dict]
    
@app.post("/addPhoneNumbers")
async def addPhoneNumbers(group_name:str,name : str, phone_number : int):
    data =  await fetchGroupInfo(group_name)
    if data!= None:
        try:
            data["phone_dict"][name].append(phone_number)
        except:
            data["phone_dict"][name] = [phone_number]
        update_data = collection.find_one_and_update(
                    {"group_name": group_name},
                    {"$set": {"phone_dict" : data["phone_dict"]}}
                )
        return "Phone number added to the group"
    else:
        return "No such group number"



@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):

    content = await file.read()
    utf8_content = content.decode('utf-8')
    content = utf8_content.split('\n')
    file_name = file.filename
    group_name = file_name[19:-4]
    print(group_name)
    user_info = fetchUnknownUsers(group_name)
    print(user_info)
    data = parser.mainJSONParser(content, file_name,user_info)
    groupNames = fetchGroupNames()
    print(data)
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

@app.get("/fetchGroupNamesZoom/")
def fetchZoomGroupNumber(group_name:int):
    # documents = zoom_collection.find({}, {'group_name': group_name}) 
    # for doc in documents:
    #     print(doc.get("_id")) # type: ignore
    # print(doc)
    # # print(type(groupNames))
    data =  zoom_collection.find_one({"group_name" : group_name})
    if data == None:
        return None
    return data["transcripts"]
    

import Zoom.ZoomParser as zoom
@app.post("/uploadZoomTranscript/")
async def create_upload_zoom_file(file: UploadFile):


    content = await file.read()
    utf8_content = content.decode('utf-8')
    content = utf8_content.split('\n')
    print("content", content)

    file_name = file.filename
    group_name = 1

    transcripts = zoom.ModifyFile(content)
    data = {"group_name": group_name, "transcripts" : transcripts }
    # print(data)
    # flag = zoom_collection.insert_one(data)
    
    group_name = 1

    if fetchZoomGroupNumber(group_name) == None:
        add_data = zoom_collection.insert_one(data)
    else:
        update_data = zoom_collection.find_one_and_update(
                        {"group_name": group_name},
                        {"$set": { "transcripts" : transcripts}}
                    )

    return "Transcripts added to the db"


import Zoom.Chat as chat
@app.post("/uploadZoomChats/")
async def create_upload_zoom_chats(file: UploadFile):

    content = await file.read()
    utf8_content = content.decode('utf-8')
    content = utf8_content.split('\n')
    print("content", content)
    file_name = file.filename


    chats = chat.txt_to_chat(content)
    data = { "chats" : chats }
    # print(data)
    # flag = zoom_collection.insert_one(data)

    group_name = 1
    if fetchZoomGroupNumber(group_name) == None:
        add_data = zoom_collection.insert_one(data)
    else:
        update_data = zoom_collection.find_one_and_update(
                        {"group_name": group_name},
                        {"$set": { "chats" : chats }}
                    )


    return "Chats added to the db"

import Zoom.Attendance as attendance
@app.post("/uploadZoomAttendance/")
async def create_upload_zoom_attendance(file: UploadFile):
    # print(codecs.iterdecode(file.file, 'utf-8'))
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    df = pd.DataFrame(csvReader)
    # print(df.columns.values)
    # print(df["\ufeffMeeting ID"])
    admins, attendance_dict, otherInfo = attendance.csv_to_attendance_pandas(df)
    data = { "attendance" : attendance_dict }
    # flag = zoom_collection.insert_one(data)

    group_name = 1
    if fetchZoomGroupNumber(group_name) == None:
        add_data = zoom_collection.insert_one(data)
    else:
        update_data = zoom_collection.find_one_and_update(
                        {"group_name": group_name},
                        {"$set": { "attendance" : attendance_dict }}
                    )

    return "Attendance added to the db"


# modification requests


# if __name__ == "__main__":
#    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
