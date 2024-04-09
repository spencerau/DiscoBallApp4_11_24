import random
import os
import mysql.connector

# Connect to MySQL database
connection = mysql.connector.connect(
    host="35.185.219.33",
    user="root",
    password="myname",
    database="celebratory-tech"
)

# Create a cursor object
cursor = connection.cursor()

# matching algorithm for iterations of participant kahoot testing
participants = [i for i in range(1, 21)]

# round 1: random
# 20 participants, sectioned into 5 groups of 4
generated = [0,0,0,0,0]
groups_round1_random = [[],[],[],[],[]]

# loop through all participants
for j in range(20):
    # generate a random number between 0 and 4
    rand_num = random.randint(0, 4)

    # check if the group corresponding to the random number has less than 4 elements
    if len(groups_round1_random[rand_num]) < 4:
        # if yes, append the current index to that group
        groups_round1_random[rand_num].append(j)
        generated[rand_num] += 1

    # if the group has already been filled with 4 elements, pick a different random number
    else:
        while len(groups_round1_random[rand_num]) >= 4:
            rand_num = random.randint(0, 4)
        groups_round1_random[rand_num].append(j)
        generated[rand_num] += 1

print("Groups Round 1:", groups_round1_random)

# import the data from the database 

# Round 2
# based on MIXED communication styles (across the spectrum of different answers)

# Construct the SQL query to fetch user response
users_2 = {}
top_matches_2 = {}

for i in range(1, 21):
    user_id = '{:03d}'.format(i)
    user_response = '''
        SELECT * FROM Responses WHERE UserID = '{}'
        '''.format(user_id)
    cursor.execute(user_response)
    user_answer = cursor.fetchone()
    # print(user_answer)
#  Add in last 6 questions
    query = '''
    SELECT UserID,
        (CASE WHEN Question1 = '{0}' THEN 1 ELSE 0 END +
            CASE WHEN Question8 = '{1}' THEN 1 ELSE 0 END +
            CASE WHEN Question11 = '{2}' THEN 1 ELSE 0 END +
            CASE WHEN Question21 = '{3}' THEN 1 ELSE 0 END +
            CASE WHEN Question25 = '{4}' THEN 1 ELSE 0 END +
            CASE WHEN Question26 = '{5}' THEN 1 ELSE 0 END +
            CASE WHEN Question27 = '{6}' THEN 1 ELSE 0 END +
            CASE WHEN Question28 = '{7}' THEN 1 ELSE 0 END +
            CASE WHEN Question29 = '{8}' THEN 1 ELSE 0 END +
            CASE WHEN Question30 = '{9}' THEN 1 ELSE 0 END) AS match_score
    FROM Responses
    WHERE UserID != '{10}'
    ORDER BY match_score ASC
    LIMIT 5;
    '''.format(user_answer[1], user_answer[8], user_answer[11], user_answer[21], user_answer[25], user_answer[26], user_answer[27], user_answer[28], user_answer[29], user_answer[30], user_answer[31] )

    cursor.execute(query)
    user_match = cursor.fetchall()

    matched_user_ids = [match[0] for match in user_match]
    users_2[i] = matched_user_ids
    
cursor.close()
connection.close()

for user_id in users_2:
    top_matches_2[user_id] = users_2[user_id]

frequencies_2 = {}
for value in top_matches_2.values():
    # loop through all indices in array 
    for element in value:
        # increment value if already in dictionary
        if element in frequencies_2.keys():
            frequencies_2[element] += 1
        # add value if not already found in ductionary 
        else:
            frequencies_2[element] = 1

# print("FREQ", frequencies)

# find the top 4 MOST present nodes
sorted_dict_2 = dict(sorted(frequencies_2.items(), key=lambda item: item[1], reverse=True))

# Convert the sorted dictionary to a list of tuples
sorted_list_2 = list(sorted_dict_2.keys())
# find the top 5 nodes
sorted_list_2 = sorted_list_2[:5]

# print("SORTED", sorted_list)

top_five_2 = {}

# Extract the keys of the top 5 entries
for key,value in sorted_dict_2.items():
    if key in sorted_list_2:
        top_five_2[key] = value

# print("TOP 5",top_five)
# assign all top nodes to different groups

groups_2 = []

# find unique nodes in each of their lists and assign them to their own groups

# group all the nodes by their connection to the central nodes 
top_connections_2 = {}

for key in top_five_2.keys():
    top_connections_2[key] = []

# check if one of the central nodes is in the top 3 of any of the nodes 
for key,value_list in top_matches_2.items():
    for top_key in top_five_2.keys():
        if top_key in value_list:
            # add the key of the values list in which the central node appears 
            top_connections_2[top_key].append(key)

# assign to groups! 
# Initialize groups_round3_best
groups_round2_communications = [[], [], [], [], []]

sorted_keys_2 = sorted(top_connections_2.keys())

for idx, key in enumerate(sorted(sorted_keys_2)):
    # Add key itself (central node)
    groups_round2_communications[idx].append(int(key))

# Get keys sorted in reverse order
sorted_keys_2 = sorted(top_connections_2.keys(), reverse=True)

# Get keys sorted in reverse order
# Initialize dictionary to store the frequency of appearance of each participant in other teams' connection lists
participant_frequency_2 = {}

# Iterate through all connections in top_connections to calculate participant frequency
for key, connections in top_connections_2.items():
    for connection in connections:
        # Increment frequency count for each participant
        participant_frequency_2[connection] = participant_frequency_2.get(connection, 0) + 1

# Sort the participant frequency dictionary based on frequency in ascending order
sorted_participants_2 = sorted(participant_frequency_2.items(), key=lambda x: x[1])

# Iterate over sorted keys
for idx, key in enumerate(sorted_keys_2):
    # Draft-style selection of additional connections
    for _ in range(3):  # Each group picks 3 additional connections
        for person, frequency in sorted_participants_2:
            # Check if person is not already assigned to the current group
            # and not assigned to the next group
            if person not in groups_round2_communications[idx] and person not in groups_round2_communications[(idx + 1) % len(groups_round2_communications)] and person not in top_connections_2.keys():
                already_picked = False
                # Check if person is already picked by another team
                for group in groups_round2_communications:
                    if person in group:
                        already_picked = True
                        break
                if not already_picked:
                    groups_round2_communications[idx].append(person)
                    break

# Define the range of participant numbers from 1 to 20
numbers = range(1, 21)

# Initialize a list to store missing participant numbers
missing_values_2 = []

# Iterate through participant numbers
for num in numbers:
    # Check if the participant is not in any group list
    if not any(num in group for group in groups_round2_communications):
        missing_values_2.append(num)

# Print the result
# for idx, group in enumerate(groups_round3_best):
#     print(f"Group {idx+1}: {group}")

print("ROUND 2 STRAGGLERS: ", missing_values_2)

print("Group 2 (Communication): ", groups_round2_communications)

# Round 3
# based on CLOSEST matches (participants who are the most similar in their answers)

# EXAMPLE OF DATA: {"001": ["002","004","007"], "002": ["003","006","019"] }
# top_matches = {}

# example of data

# group the three closest nodes to each node in arrays
# for user_id in queries:
#     top_matches[user_id] = QUERY

# find the frequencies of all nodes (how often they appear in top 3 groupings)
users = {}
top_matches = {}

# Connect to MySQL database
connection = mysql.connector.connect(
    host="35.185.219.33",
    user="root",
    password="myname",
    database="celebratory-tech"
)

# Create a cursor object
cursor = connection.cursor()

for i in range(1, 21):
    user_id = '{:03d}'.format(i)

    if not connection.is_connected():
        connection.reconnect()

    user_response = '''
        SELECT * FROM Responses WHERE UserID = '{}'
        '''.format(user_id)
    cursor.execute(user_response)
    user_answer = cursor.fetchone()

    query = '''
        SELECT UserID,
            (CASE WHEN Question1 = '{0}' THEN 1 ELSE 0 END +
                CASE WHEN Question2 = '{1}' THEN 1 ELSE 0 END +
                CASE WHEN Question3 = '{2}' THEN 1 ELSE 0 END +
                CASE WHEN Question4 = '{3}' THEN 1 ELSE 0 END +
                CASE WHEN Question5 = '{4}' THEN 1 ELSE 0 END +
                CASE WHEN Question6 = '{5}' THEN 1 ELSE 0 END +
                CASE WHEN Question7 = '{6}' THEN 1 ELSE 0 END +
                CASE WHEN Question8 = '{7}' THEN 1 ELSE 0 END +
                CASE WHEN Question9 = '{8}' THEN 1 ELSE 0 END +
                CASE WHEN Question10 = '{9}' THEN 1 ELSE 0 END +
                CASE WHEN Question11 = '{10}' THEN 1 ELSE 0 END +
                CASE WHEN Question12 = '{11}' THEN 1 ELSE 0 END +
                CASE WHEN Question13 = '{12}' THEN 1 ELSE 0 END +
                CASE WHEN Question14 = '{13}' THEN 1 ELSE 0 END +
                CASE WHEN Question15 = '{14}' THEN 1 ELSE 0 END +
                CASE WHEN Question16 = '{15}' THEN 1 ELSE 0 END +
                CASE WHEN Question17 = '{16}' THEN 1 ELSE 0 END +
                CASE WHEN Question18 = '{17}' THEN 1 ELSE 0 END +
                CASE WHEN Question19 = '{18}' THEN 1 ELSE 0 END +
                CASE WHEN Question20 = '{19}' THEN 1 ELSE 0 END +
                CASE WHEN Question21 = '{20}' THEN 1 ELSE 0 END +
                CASE WHEN Question22 = '{21}' THEN 1 ELSE 0 END +
                CASE WHEN Question23 = '{22}' THEN 1 ELSE 0 END +
                CASE WHEN Question24 = '{23}' THEN 1 ELSE 0 END +
                CASE WHEN Question25 = '{24}' THEN 1 ELSE 0 END +
                CASE WHEN Question26 = '{25}' THEN 1 ELSE 0 END +
                CASE WHEN Question27 = '{26}' THEN 1 ELSE 0 END +
                CASE WHEN Question28 = '{27}' THEN 1 ELSE 0 END +
                CASE WHEN Question29 = '{28}' THEN 1 ELSE 0 END +
                CASE WHEN Question30 = '{29}' THEN 1 ELSE 0 END) AS match_score
        FROM Responses
        WHERE UserID != '{30}'
        ORDER BY match_score DESC
        LIMIT 5;
        '''.format(user_answer[1], user_answer[2], user_answer[3], user_answer[4], user_answer[5], user_answer[6], user_answer[7], user_answer[8], user_answer[9], user_answer[10], user_answer[11], user_answer[12], user_answer[13], user_answer[14], user_answer[15], user_answer[16], user_answer[17], user_answer[18], user_answer[19], user_answer[20], user_answer[21], user_answer[22], user_answer[23], user_answer[24], user_answer[25], user_answer[26], user_answer[27],user_answer[28],user_answer[29],user_answer[30], user_id )

    cursor.execute(query)
    user_match = cursor.fetchall()
    
    matched_user_ids = [match[0] for match in user_match]
    users[i] = matched_user_ids

cursor.close()
connection.close()

# key = ID, value = hits in the top matches dictionary 
# EXAMPLE OF DATA: {"004": 4}

# Prints out the users results from query
# print("USERS", users) 

for user_id in users:
    top_matches[user_id] = users[user_id]

frequencies = {}
for value in top_matches.values():
    # loop through all indices in array 
    for element in value:
        # increment value if already in dictionary
        if element in frequencies.keys():
            frequencies[element] += 1
        # add value if not already found in ductionary 
        else:
            frequencies[element] = 1

# print("FREQ", frequencies)

# find the top 4 MOST present nodes
sorted_dict = dict(sorted(frequencies.items(), key=lambda item: item[1], reverse=True))

# Convert the sorted dictionary to a list of tuples
sorted_list = list(sorted_dict.keys())
# find the top 5 nodes
sorted_list = sorted_list[:5]

# print("SORTED", sorted_list)

top_five = {}

# Extract the keys of the top 5 entries
for key,value in sorted_dict.items():
    if key in sorted_list:
        top_five[key] = value

# print("TOP 5",top_five)
# assign all top nodes to different groups

groups = []

# find unique nodes in each of their lists and assign them to their own groups

# group all the nodes by their connection to the central nodes 
top_connections = {}

for key in top_five.keys():
    top_connections[key] = []

# check if one of the central nodes is in the top 3 of any of the nodes 
for key,value_list in top_matches.items():
    for top_key in top_five.keys():
        if top_key in value_list:
            # add the key of the values list in which the central node appears 
            top_connections[top_key].append(key)

# assign to groups! 
# Initialize groups_round3_best
groups_round3_best = [[], [], [], [], []]

sorted_keys = sorted(top_connections.keys())

for idx, key in enumerate(sorted(sorted_keys)):
    # Add key itself (central node)
    groups_round3_best[idx].append(int(key))

# Get keys sorted in reverse order
sorted_keys = sorted(top_connections.keys(), reverse=True)

# Get keys sorted in reverse order
# Initialize dictionary to store the frequency of appearance of each participant in other teams' connection lists
participant_frequency = {}

# Iterate through all connections in top_connections to calculate participant frequency
for key, connections in top_connections.items():
    for connection in connections:
        # Increment frequency count for each participant
        participant_frequency[connection] = participant_frequency.get(connection, 0) + 1

# Sort the participant frequency dictionary based on frequency in ascending order
sorted_participants = sorted(participant_frequency.items(), key=lambda x: x[1])

# Iterate over sorted keys
for idx, key in enumerate(sorted_keys):
    # Draft-style selection of additional connections
    for _ in range(3):  # Each group picks 3 additional connections
        for person, frequency in sorted_participants:
            # Check if person is not already assigned to the current group
            # and not assigned to the next group
            if person not in groups_round3_best[idx] and person not in groups_round3_best[(idx + 1) % len(groups_round3_best)] and person not in top_connections.keys():
                already_picked = False
                # Check if person is already picked by another team
                for group in groups_round3_best:
                    if person in group:
                        already_picked = True
                        break
                if not already_picked:
                    groups_round3_best[idx].append(person)
                    break

# Define the range of participant numbers from 1 to 20
numbers = range(1, 21)

# Initialize a list to store missing participant numbers
missing_values = []

# Iterate through participant numbers
for num in numbers:
    # Check if the participant is not in any group list
    if not any(num in group for group in groups_round3_best):
        missing_values.append(num)

# Print the result
# for idx, group in enumerate(groups_round3_best):
#     print(f"Group {idx+1}: {group}")

print("ROUND 3 STRAGGLERS: ", missing_values)

print("Group 3 (Best Matches): ", groups_round3_best)