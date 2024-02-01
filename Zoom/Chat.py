import re
from datetime import datetime

def txt_to_chat(txt_file):
    chat = []

    with open(txt_file, 'r') as file:
        lines = file.readlines()

    current_entry = {'timestamp': None, 'sender': None, 'message': [], 'tags': []}

    for line in lines:
        parts = line.strip().split('\t')
        timestamp_str, sender, message = parts[0], parts[1], parts[2]

        # Parse timestamp
        timestamp = datetime.strptime(timestamp_str, '%H:%M:%S').strftime('%I:%M %p')

        if current_entry['timestamp'] is None:
            current_entry['timestamp'] = timestamp
            current_entry['sender'] = sender
            current_entry['message'].append(message)
        elif current_entry['timestamp'] == timestamp and current_entry['sender'] == sender:
            current_entry['message'].append(message)
        else:
            chat.append(current_entry.copy())
            current_entry['timestamp'] = timestamp
            current_entry['sender'] = sender
            current_entry['message'] = [message]

    chat.append(current_entry)

    # Convert to the desired format
    formatted_chat = []
    for entry in chat:
        formatted_entry = {
            'timestamp': entry['timestamp'],
            'sender': entry['sender'],
            'message': entry['message'],
            'tags': ['moderator/user']
        }
        formatted_chat.append(formatted_entry)

    return formatted_chat

# Example usage:
txt_file_path = 'Zoom/Data/thesisChat.txt'
chat_data = txt_to_chat(txt_file_path)
# print(chat_data)

import json
file = open("Zoom/Output/chat.json", "w", encoding='utf-8')
file.write(json.dumps(chat_data, ensure_ascii=False, indent=4))
file.close()

