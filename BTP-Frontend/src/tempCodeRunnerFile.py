    updated_lines = []
        current_message = None

        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Check if the line starts with a timestamp pattern
            if re.match(r"\d{2}/\d{2}/\d{4}, \d{2}:\d{2}", line):
                if current_message:
                    # Add the completed message to the list
                    updated_lines.append(current_message)

                timestamp = msg.get_timestamp(line)
                user = msg.get_user(line)
                message = msg.get_message(line, user)
                message_id = msg.get_message_id(file_name, timestamp, grp, current_message['message_id'] if current_message else '')

                # Start a new message dictionary
                current_message = {
                    "message_id": message_id,
                    "timestamp": timestamp,
                    "sender": user,
                    "message": message
                }
            else:
                # If there's no timestamp, this line is part of the current message
                if current_message:
                    current_message["message"] += ' ' + line
                else:
                    # If no current message exists, this might be an isolated line or error in formatting
                    print(f"Isolated line or format error, skipped: {line}")

        # Don't forget to add the last message if it exists
        if current_message:
            updated_lines.append(current_message)

        return updated_lines