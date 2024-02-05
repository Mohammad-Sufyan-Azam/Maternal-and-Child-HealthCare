import re
from datetime import datetime, timedelta


def vtt_to_transcript(vtt_file):

    transcript = []
    with open(vtt_file, 'r',encoding='utf-8') as file:
        lines = file.readlines()
        # print(lines)
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        # Check if it's a timestamp line
        if re.match(r'\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}', line):
            start_time, end_time = line.split(' --> ')
            # print(start_time, end_time)
            start_time = datetime.strptime(start_time, '%H:%M:%S.%f')
            end_time = datetime.strptime(end_time, '%H:%M:%S.%f')

            # Round off to the nearest second
            rounded_time_start = start_time + timedelta(seconds=0.5)
            rounded_time_end = end_time + timedelta(seconds=0.5)

            # Extract hours, minutes, and seconds
            start_hours = rounded_time_start.hour
            start_minutes = rounded_time_start.minute
            start_seconds = rounded_time_start.second
            start_24_time = f"{start_hours:02d}:{start_minutes:02d}:{start_seconds:02d}"

            # Extract hours, minutes, and seconds
            end_hours = rounded_time_end.hour
            end_minutes = rounded_time_end.minute
            end_seconds = rounded_time_end.second
            end_24_time = f"{end_hours:02d}:{end_minutes:02d}:{end_seconds:02d}"

            # Parse speaker and message
            speaker_line = lines[index + 1].strip()
            if ':' not in speaker_line:
                message = speaker_line
            else:
                sender, message = speaker_line.split(': ', 1)

            # Parse tags (if any)
            tags = re.findall(r'\[\"(.*?)\"\]', message)
            # message = re.sub(r'\[.*?\]', '', message).strip()

            # Create dictionary and append to transcript
            entry = {
                'start_time': start_24_time,
                'end_time': end_24_time,
                'sender': sender,
                'message': message,
                'tags': tags
            }
            transcript.append(entry)

            # Move to the next entry
            index += 2
        else:
            index += 1

    return transcript




# Example usage:
vtt_file_path = "Zoom/Data/thesis.vtt"
transcript_data = vtt_to_transcript(vtt_file_path)
# print(transcript_data)

import json
file = open("Zoom/Output/transcript.json", "w", encoding='utf-8')
file.write(json.dumps(transcript_data, ensure_ascii=False, indent=4))
file.close()
