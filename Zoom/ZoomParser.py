from datetime import datetime, timedelta
import json

def ModifyFile(lines):
    # file = open(path, encoding="utf8")
    # lines = file.readlines()
    # print(lines)
    # file.close()

    # number,time,msg,\n
    total_messages = int((len(lines)-2)/4)
    # messages are in the format - 4,8,
    transcripts = []
    # print(total_messages)

    new_lines = []
    start = 4
    # ignoring sender-less messages
    
    prev_start_time = lines[3][:12]
    prev_end_time = lines[3][17:29]
    idx = lines[4].find(":")
    if idx == -1:
        prev_sender = "Unknown Speaker"
        prev_message = lines[4]
    else:   
        prev_sender = lines[4][:idx]
        prev_message = lines[4][idx+1:]
    
    # print(start_time,end_time,prev_sender,prev_message)
    for i in range(8,4*(total_messages-1)+8,4):
            # print(i)
            idx = lines[i].find(":")
            if idx == -1:
                curr_sender = prev_sender
                curr_message = ". "+ lines[i]
            else:
                curr_sender = lines[i][:idx]
                curr_message = lines[i][idx+1:]

            curr_start_time = lines[i-1][:12]
            curr_end_time = lines[i-1][17:29]

            if prev_sender == curr_sender:
                prev_end_time = curr_end_time
                prev_message = prev_message[:-1] + curr_message
            
            else:
                # new_lines.append(roundTOSec(prev_start_time))
                # new_lines.append(roundTOSec(prev_end_time))
                # new_lines.append(prev_sender)
                # new_lines.append(prev_message)

                transcripts.append({
                    "start_time": roundTOSec(prev_start_time),
                    "end_time": roundTOSec(prev_end_time),
                    "sender":prev_sender,
                    "message": prev_message[:-1]
                })

                prev_start_time = curr_start_time
                prev_end_time = curr_end_time
                prev_sender = curr_sender
                prev_message = curr_message
    

    # new_lines.append(roundTOSec(prev_start_time))  
    # new_lines.append(roundTOSec(prev_end_time))          
    # new_lines.append(prev_sender)                
    # new_lines.append(prev_message)
    transcripts.append({
            "start_time": roundTOSec(prev_start_time),
            "end_time": roundTOSec(prev_end_time), 
            "sender":prev_sender,
            "message": prev_message[:-1]
            })
    return transcripts

# def convertTranscripts(new_lines):
#     transcripts = []
#     for i in range(0,int(len(new_lines)/4)):
#         transcripts.append({
#             "start_time": new_lines[i],
#             "end_time": new_lines[i+1],
#             "sender": new_lines[i+2],
#             "message": new_lines[i+3],

#         })
    
         
     
def roundTOSec(time_str): # take "00:09:04.570" as input and converts to nearest
    # Parse the string into a timedelta object
    time_delta = datetime.strptime(time_str, "%H:%M:%S.%f") - datetime(1900, 1, 1)
    rounded_time_delta = timedelta(seconds=round(time_delta.total_seconds()))
    rounded_time_str = str(datetime(1900, 1, 1) + rounded_time_delta)[11:]
    return rounded_time_str



if __name__ == "__main__":
    path = "desinno.vtt"
    transcripts = ModifyFile(path)
    
    file = open("Zoom/Output/transcript.json", "w", encoding='utf-8')
    file.write(json.dumps(transcripts, ensure_ascii=False, indent=4))
    file.close()
    