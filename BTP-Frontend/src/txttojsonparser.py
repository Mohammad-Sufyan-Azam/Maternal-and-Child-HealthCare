import json, pymongo
import random, string, os


# def store_json(json_key, name="new_schema.json"):
#     try:
#         # Create the "json output" directory if it does not exist
#         if not os.path.exists("json output"):
#             os.makedirs("json output")
        
#         # "w" file mode will create a new file if it does not exist
#         with open("json output/" + name, "w", encoding='utf-8') as file:
#             file.write(json.dumps(json_key, ensure_ascii=False, indent=4))
#     except Exception as e:
#         print(f"Error in storing {name} JSON file: {e}")



# # def push_to_mongo(json_key):
# #     try:
# #         myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# #         mydb = myclient["Test"]
# #         mycol = mydb["data"]

# #         # Searching for document with group name 'grp'
# #         myquery = {"group_name": json_key["group_name"]}
# #         mydoc = mycol.find(myquery)
# #         # If document with group name 'grp' exists, then update it
# #         if mydoc.count() > 0: # type: ignore
# #             mycol.update_one(myquery, {"$set": json_key})
# #             print("Successfully updated MongoDB.")
# #             return
# #         # Else insert a new document
# #         mycol.insert_one(json_key)

# #         print("Successfully pushed to MongoDB.")
# #     except:
# #         print("Error in pushing to MongoDB. (Make sure MongoDB is running)")
# #         exit(1)


# class User:
#     def get_user_id(self):
#         try:
#             # _id: will be a random string of length 24
#             # generating a random string of length 24 and storing it in id variable
#             id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 24))
#             return id
#         except:
#             print("Error in generating id (get_user_id() function).")
#             exit(1)


# def fill_details(path, user_messages, user_schema):
#     try:
#         pass
#     except:
#         print("Error in filling details (fill_details() function).")
#         exit(1)


# def update_user_structure(path, user_messages, user_schema):
#     try:
#         # For each user, there will be a seperate schema;
#         schema_list = []
#         user_messages.sort(key=lambda x: x["sender"])
#         pass
#         return schema_list
#     except:
#         print("Error in updating user structure (update_user_structure() function).")
#         exit(1)


# class Group:
#     def get_group_id(self):
#         try:
#             # _id: will be a random string of length 48
#             # generating a random string of length 48 and storing it in id variable
#             id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 48))
#             return id
#         except:
#             print("Error in generating id (get_group_id() function).")
#             exit(1)


#     def get_start_date(self, lines):
#         try:
#             start_date = ''
#             for i in range(len(lines)):
#                 if 'created group' in lines[i]["message"]:
#                     start_date = lines[i]["timestamp"].split(',')[0]
#             return start_date
#         except:
#             print("Error in getting start date (get_start_date() function).")
#             exit(1)


#     def get_end_date(self, lines):
#         try:
#             # TODO: Add the expected end date of a group according to the information provided beforehand by experts
#             return 'NA'
#         except:
#             print("Error in getting end date (get_end_date() function).")
#             exit(1)


#     def get_group_name(self, file_name):
        
#         try:
#             # Print the filename received to check its format
#             print("Received filename:", file_name)

#             # Assuming the file name starts after the last backslash and ends before ".txt"
#             base_name = file_name.rsplit('\\', 1)[-1]  # Extract filename from path
#             print("Base name extracted:", base_name)

#             # Adjust regex pattern to include optional numeric suffixes
#             pattern = r'WhatsApp_Chat_with_(.+?)(?:_\d+)*\.txt'
#             match = re.search(pattern, base_name)
#             if match:
#                 return match.group(1)
#             else:
#                 raise ValueError("File name does not match expected pattern")
#         except Exception as e:
#             print(f"Error in getting group name (get_group_name() function): {e}")
#             raise  # Reraise the exception to provide feedback in the calling function




#     def get_group_admins(self, lines):
#         try:
#             admins = {}
#             # Admins information not present in any system generated messages
#             for line in lines:
#                 message = line["message"]
#                 if "added" in message:
#                     name = message.split(' added ')[0].strip()
#                     if 'You' in name:
#                         admins['You'] = True
#                     else:
#                         admins[name] = True
#                 elif "removed" in message:
#                     name = message.split(' removed ')[0].strip()
#                     if 'You' in name:
#                         admins['You'] = True
#                     else:
#                         admins[name] = True
#             return admins
#         except:
#             print("Error in getting group admins.")
#             exit(1)


#     def get_group_members(self, lines):
#         try:
#             # Case 1 Removed by admin - 'You removed Ishit (CSAM)'
#             # Case 2 Removed herself/himself - 'Ishit (CSAM) left'
#             # Case 3 Added by admin - 'You added Ishit (CSAM)'
#             # Case 4 Initially the group was created with these members - No system generated messages
#             # Case 5 Neha Singh added Sid, Kal, Tuk and Roe
#             members = {}
#             # Assumption: name does not contain 'removed', 'left', or 'added' in it
#             # Assumption: admin names will also be there in group members
#             for line in lines:
#                 message = line["message"]

#                 if "removed" in message:
#                     name = message.split(' removed ')[1].strip()
#                     if ',' in name:         # multiple names > 2
#                         names = name.split(', ')
#                         for n in names:
#                             if 'and' not in n:
#                                 if 'You' not in n.capitalize():
#                                     members[n] = False
#                             else:
#                                 n = n.split(' and ')
#                                 if 'You' not in n[0].capitalize():
#                                     members[n[0]] = False
#                                 if 'You' not in n[1].capitalize():
#                                     members[n[1]] = False
#                     elif 'and' in name:     # multiple names = 2
#                         n = name.split(' and ')
#                         if 'You' not in n[0].capitalize():
#                             members[n[0]] = False
#                         if 'You' not in n[1].capitalize():
#                             members[n[1]] = False
#                     else:                   # single name = 1
#                         if 'You' not in name:
#                             members[name] = False

#                 elif "added" in message:
#                     name = message.split(' added ')[1].strip()
#                     if ',' in name:
#                         names = name.split(', ')
#                         for n in names:
#                             if 'and' not in n:
#                                 if 'You' not in n.capitalize():
#                                     members[n] = True
#                             else:
#                                 n = n.split(' and ')

#                                 members[n[0]] = True
#                                 members[n[1]] = True
#                     elif 'and' in name:
#                         n = name.split(' and ')
#                         members[n[0]] = True
#                         members[n[1]] = True
#                     else:
#                         if 'You' not in name.capitalize():
#                             members[name] = True
                
#                 elif "left" in message:
#                     name = message.split(' left')[0].strip()
#                     if 'You' not in name.capitalize():
#                         members[name] = False

#             return members
#         except:
#             print("Error in getting members.")
#             exit(1)


#     def get_group_data(self, lines):
#         try:
#             data = {}
#             for line in lines:
#                 date = line["timestamp"].split(',')[0]
#                 if date not in data:
#                     data[date] = []
#                 data[date].append(line)
#             return data
#         except:
#             print("Error in getting group messsages.")
#             exit(1)

#     def check_valid_user(self, name):
#         if name[0] == 'M' and name[1:].isdigit():
#             return True
#         return False
#     def update_group_structure(self, file_name, system_messages, updated_lines, user_info):
#         try:
#             json_key = {}
#             json_key["_id"] = self.get_group_id()
#             json_key["group_name"] = self.get_group_name(file_name)
#             json_key["group_admins"] = self.get_group_admins(system_messages)
#             json_key['members'] = self.get_group_members(system_messages)
#             json_key["start_date"] = self.get_start_date(system_messages)
#             json_key["end_date"] = self.get_end_date(system_messages)
#             json_key["content"] = self.get_group_data(updated_lines)
#             print("-------------------")
#             print(user_info)
            
#             json_key['unknown_user_count'], json_key["known_users"], json_key["unknown_users"] = user_info[0], user_info[1], user_info[2]

#             for i in json_key['members']:
#                 print(i)
#                 if not self.check_valid_user(i):
#                     json_key['unknown_user_count'] += 1
#                     json_key["unknown_users"].append(i)
#                 else:
#                     json_key["known_users"].append(i)


#             # {member_ids : [phone_number1, phone_number2, ...]}  

#             #  if member_id is given by moderator : {M1 : [phonenumber1,...]} phone number has to be manually added by moderator 
#             #  if member_id not given             
#                 # 1. phone number or String name
#                             # saved as N_i
#                                 # person already in group -> add number/name to list and delete N_i
#                                 # person not in group -> add to member_ids, add to memebr_mapping

#             # json_key["known_member_mappings"] = {} # {M_i/N_i : [phone_number1|String|id]}
#             # json_key["unknown_member_mapping"] = {} # [string name/phone number] : N_i

#             # for i in json_key['members']:
#             #     print(i)
#             #     if i[0] == 'M' and i[1:].isdigit(): # satisfies convention add them to member_ids list
#             #         json_key["known_member_mappings"][i] = [i]
#             #     else: # doesnot satisfies convention
#             #         id = 'N' + str(len(json_key["unknown_member_mapping"])+1)
#             #         json_key["unknown_member_mapping"][i] = 'N' + id
#             #         json_key["known_member_mappings"][id] = [i] 

#             #     # else: # doesnot satisfies convention
#             #     #     id = 'N' + str(len(json_key["member_mapping"])+1)
#             #     #     json_key["member_mapping"][i] = 'N' + id



#             return json_key
#         except:
#             print("Error in updating group structure (update_group_structure() function).")
#             exit(1)


# import re

# class Message:
#     def get_timestamp(self, line):
#         try:
#             # Extract the timestamp ensuring spaces within timestamps are handled
#             timestamp = re.search(r"\d{2}/\d{2}/\d{4}, \d{2}:\d{2}", line).group()
#             return timestamp
#         except:
#             print("Error in getting date and time (get_timestamp() function).")
#             raise

#     def get_user(self, line):
#         try:
#             # System messages won't have a user after '-' or might start with "System"
#             if '-' in line:
#                 user_info = line.split('-', 1)[1].strip()
#                 if ':' in user_info:
#                     return user_info.split(':', 1)[0].strip()
#                 return "System"
#             return "System"
#         except:
#             print("Error in getting user.")
#             raise

#     def get_message(self, line, user):
#         try:
#             # Message content starts after user and ':'
#             if user != "System":
#                 return line.split(':', 2)[-1].strip()
#             return line.split('-', 1)[1].strip()
#         except:
#             print("Error in getting message.")
#             raise

#     def get_message_id(self, file_name, timestamp, grp, prev_id=''):
#         try:
#             # Ensure group name extraction is correct
#             group_name = grp.get_group_name(file_name)
#             # Increment the counter based on the previous ID
#             if prev_id and timestamp in prev_id:
#                 count = int(prev_id.rsplit('_', 1)[-1]) + 1
#             else:
#                 count = 0
#             return f"{group_name}_{timestamp}_{count}"
#         except Exception as e:
#             print(f"Error in getting message id (get_message_id function): {e}")
#             raise

# def update_message_structure(lines, file_name, msg, grp):
#     updated_lines = []
#     previous_message_id = None

#     for line in lines:
#         line = line.strip()
#         if not line:
#             continue

#         if re.match(r"\d{2}/\d{2}/\d{4}, \d{2}:\d{2}", line):  # Check if line starts with a timestamp
#             timestamp = msg.get_timestamp(line)
#             user = msg.get_user(line)
#             message = msg.get_message(line, user)
#             message_id = msg.get_message_id(file_name, timestamp, grp, previous_message_id)
#             updated_lines.append({
#                 "message_id": message_id,
#                 "timestamp": timestamp,
#                 "sender": user,
#                 "message": message,
#             })
#             previous_message_id = message_id
#         else:
#             # Continuation of the previous message
#             if updated_lines:
#                 updated_lines[-1]["message"] += ' ' + line

#     return updated_lines




# def mainJSONParser(content, file_name, user_info, store=True):
#     try:
#         message = Message()
#         group_schema = Group()
#         user_schema = User()

#         updated_lines = update_message_structure(content, file_name, message, group_schema)
#         # if store:
#         #     store_json(updated_lines, "message_structure_2.json")
#         system_messages, user_messages = message.get_user_and_system_messages(updated_lines) # type: ignore

#         group_json = group_schema.update_group_structure(file_name, system_messages, updated_lines,user_info)
#         if store:
#             # print(group_json)
#             return group_json
        
        
#         # user_json = update_user_structure(path, user_messages, user_schema)
#         # print(user_json)
#         # if store:
#         #     store_json(user_json, "user wise schema.json")
        
#         # push_to_mongo(group_json)
#     except:
#         print("Error in converting the data to json (main() function).")
#         exit(1)


# def mainJSON(path, store=True):
#     try:
#         file = open(path, encoding="utf8")
#         lines = file.readlines()
#         file.close()
        
#         message = Message()
#         group_schema = Group()
#         user_schema = User()

#         updated_lines = update_message_structure(lines, path, message, group_schema)
#         if store:
#             store_json(updated_lines, "message_structure_3.json")
#         system_messages, user_messages = message.get_user_and_system_messages(updated_lines)

#         group_json = group_schema.update_group_structure(path, system_messages, updated_lines)
#         if store:
#             store_json(group_json, "group wise schema_3.json")

#         # user_json = update_user_structure(path, user_messages, user_schema)
#         # print(user_json)
#         # if store:
#         #     store_json(user_json, "user wise schema.json")
        
#         # push_to_mongo(group_json)
    
#     except Exception as e:  # Catch any exception and print it out
#         print(f"Error in converting the data to json (main() function): {e}")


# def check_all_files():
#     dir = "uploads"
#     files = os.listdir(dir)
#     for file in files:
#         path = "uploads/" + file
#         mainJSON(path)
    
#     return True



'''
Sample JSON Output for user wise schema -

    {
        "_id": "6QJXKJXKJXKJXKJXKJXKJXKJ",
        "name": "Sid",
        "affiliated_groups": [
            {"group_name": "AI Monsoon 22-23", "start_date": "9/7/22", "end_date": "9/7/22"},
            {"group_name": "CN Monsoon 22-23", "start_date": "9/7/22", "end_date": "9/7/22"}
        ],
        "content": {
            "group1": [message1, message2, ...],
            "group2": [message1, message2, ...]
        }
    }
        
'''



'''
Sample JSON Output for group wise schema - 
    
    {
        "group_name": "AI Monsoon 22-23",
        "group_admins": [
            "Siddharth",
            "Anshul"
        ],
        "members": {
            "Sid": True,
            "Anshul": True,
            "Siddharth": False
        },
        "start_date": "9/7/22",
        "end_date": "9/7/22",
        "content": {
            "9/7/22": [
                {
                    "date": "9/7/22 7:57",
                    "user": "System",
                    "message": "+91 98187 58133 joined using this group's invite link"
                },
                {
                    "date": "9/7/22 7:57",
                    "user": "System",
                    "message": "+91 98187 58133 joined using this group's invite link"
                }
            ]
        }
    }
'''
import json, re, os

def store_json(json_key, name="new_schema.json"):
    output_dir = "json output"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    with open(os.path.join(output_dir, name), "w", encoding='utf-8') as file:
        json.dump(json_key, file, ensure_ascii=False, indent=4)

class Message:
    def __init__(self):
        self.current_message = None

    def get_timestamp(self, line):
        match = re.search(r"(\d{2}/\d{2}/\d{4}, \d{2}:\d{2})", line)
        if not match:
            return None
        return match.group(1)

    def process_line(self, line, file_name, grp):
        timestamp = self.get_timestamp(line)
        if timestamp:
            if self.current_message:
                # Append the complete current message to the messages list
                grp.messages.append(self.current_message)
            # Reset current_message with the new message info
            user = self.get_user(line)
            message_content = self.get_message(line, user)
            self.current_message = {
                "timestamp": timestamp,
                "user": user,
                "message": message_content
            }
        elif self.current_message:
            # Continuation of the previous message, append line
            self.current_message["message"] += " " + line.strip()
        else:
            print(f"Skipping line due to lack of context: {line}")

    def get_user(self, line):
        parts = line.split('-', 1)
        if len(parts) > 1 and ':' in parts[1]:
            return parts[1].split(':', 1)[0].strip()
        return "System"

    def get_message(self, line, user):
        if user != "System":
            return line.split(':', 2)[-1].strip()
        return line.split('-', 1)[-1].strip()

class Chat:
    def __init__(self):
        self.messages = []

    def parse_messages(self, lines, file_name, msg):
        for line in lines:
            line = line.strip()
            if line:
                msg.process_line(line, file_name, self)

        # Append the last message if it exists
        if msg.current_message:
            self.messages.append(msg.current_message)

def main():
    path = "src/uploads"
    files = os.listdir(path)
    for file_name in files:
        full_path = os.path.join(path, file_name)
        try:
            with open(full_path, "r", encoding="utf-8") as file:
                lines = file.readlines()
            chat = Chat()
            msg_processor = Message()
            chat.parse_messages(lines, file_name, msg_processor)
            store_json(chat.messages, f"parsed_{file_name}.json")
        except Exception as e:
            print(f"Failed to process {file_name}: {e}")

if __name__ == "__main__":
    main()
