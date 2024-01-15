# Converting the whatsapp chats from txt to JSON format and storing it in output.json file.
import json
import pymongo


def get_date_and_time(temp):            
    # Example: "11/18/22, 12:00 PM -"
    date_ends_at = temp.index(',')
    date = temp[: date_ends_at]

    time = temp[date_ends_at + 2 : temp.index('-', date_ends_at)-1]
    if time[-2:] == 'AM':
        time_in_24_hour = time[:-3]
    else:
        time_in_24_hour = str(int(time[:time.index(':')])+12) + time[time.index(':'):-3]
    
    return date, time_in_24_hour 


def get_user(temp):
    try:
        message_start_index = temp.index('-')
        user = temp[message_start_index+2 : temp.index(':', message_start_index)]
        return user
    except:
        return "System"


def get_message(temp):
    try:
        return temp[temp.index(':', temp.index(':')+1)+2 :]
    except:
        return temp[temp.index('-')+2 :]


def get_file_content(path):
    try:
        lines = []
        with open(path, encoding="utf8") as f:
            lines = f.readlines()
        
        return lines
    except:
        print("Error in reading the file. (File path might be wrong)")
        exit(1)


def store_json(json_key):
    with open('output.json', 'w') as file:
        json.dump(json_key, file, indent=4)


def push_to_mongo(json_key):
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["Test"]
        collection = db["whatsapp_chat"]
        id = collection.insert_one(json_key).inserted_id
        print("Successfully pushed to MongoDB with ID:", id)
    except:
        print("Error in pushing to MongoDB. (Make sure MongoDB is running)")
        exit(1)


def conversion(path):
    # path = "WhatsApp Chat with (SUPPORT PREGNANACY) 4.txt"

    lines = get_file_content(path)

    json_key = {}
    json_value = []

    for i in range(len(lines)):
        dic = {}
        temp = lines[i].strip()
        if temp == '':
            continue

        
        
        try:
            date, time = get_date_and_time(temp)
            dic["date"] = date+" "+time

            user = get_user(temp)
            dic["user"] = user

            message = get_message(temp)
            if message == "<Media omitted>":
                continue
            dic["message"] = message

            json_value.append(dic)
            # print(dic)
        except:
            # This line is a continuation of the previous line's message.
            json_value[-1]["message"] += " " + temp


    json_key["messages"] = json_value
    json_key["group_id"] = path
    


    # store_json(json_key)
    return json_key

    # push_to_mongo(json_key)


# jsonfiles = conversion()
# print(jsonfiles)

# Sample JSON output:
'''
{
  "":[
    {data
        "date": "9/7/22 7:57",
        "user": "System",
        "message": "+91 98187 58133 joined using this group's invite link"
    },
    {
        "date": "12/2/22 10:03",
        "user": "+91 88264 34905",
        "message": "Sheet circulate karvai hai sir ne 2"
    },
    {
        "date": "12/2/22 10:04",
        "user": "+91 79822 98326",
        "message": "Okay"
    }
  ]
}
'''
