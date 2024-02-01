import pandas as pd
from datetime import datetime, timedelta

def csv_to_attendance_pandas(csv_file):
    df = pd.read_csv(csv_file)
    # print(df['Meeting ID'])
    # Assuming the columns are named as 'Name', 'Email', 'Duration', and others
    # Adjust column names accordingly if needed
    # df = df[['Name', 'Duration']]
    meetingId = df['Meeting ID'].tolist()
    participants = []
    indexofId = 0
    for i in range(len(meetingId)):
        if meetingId[i] == 'Name (Original Name)' or i>indexofId:
            if i>indexofId:
                participants.append(meetingId[i])
            if meetingId[i] == 'Name (Original Name)':
                indexofId = i
        else:
            indexofId = i+1
    # store total duration of meeting

    duration = []
    isGuest = []
    for i in range(indexofId+1,len(meetingId)):
        duration.append(df['Start Time'][i])
        isGuest.append(df['End Time'][i])
    attendance_dict = {}
    nonGuest = []
    admins = []
    for i in range(len(participants)):
        attendance_dict[participants[i]] = duration[i]  + " min"
        if isGuest[i] != 'Yes':
            nonGuest.append(i)
            admins.append(participants[i])

    otherInfo = {}
    totalDuration = df['Duration (Minutes)'][0]
    otherInfo['Total Duration'] = totalDuration
    otherInfo['Meeting ID'] = df['Meeting ID'][0]
    otherInfo['Participants'] = df['Participants'][0]
    otherInfo['Start Time'] = df['Start Time'][0] 
    otherInfo['End Time'] = df['End Time'][0]

    
    return admins, attendance_dict,otherInfo


# Example usage:
csv_file_path = 'Zoom/data/thesis.csv'
# csv_to_attendance_pandas(csv_file_path)
admins, attendance_data,otherinfo = csv_to_attendance_pandas(csv_file_path)
# print(attendance_data)
# print(admins)
# print(otherinfo)
# for user, time_dict in attendance_data.items():
#     print(f"{user}: {time_dict['Total']} min {time_dict['Seconds']} sec")

import json
file = open("Zoom/Output/attendance.json", "w", encoding='utf-8')
file.write(json.dumps(attendance_data, ensure_ascii=False, indent=4))
file.close()
