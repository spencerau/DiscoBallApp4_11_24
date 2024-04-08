import random
import os
import pandas as pd

df = pd.read_csv('DiscoBall_Questions_Dummy.csv')

# Drop the first row since it contains non-numeric column headers
df = df.drop(df.index[0])

# Create a list to store the data
data = []

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    # Extract the last 31 values from the row (excluding the timestamp)
    user_data = row.iloc[1:-1].tolist()  # Exclude the first and last columns
    # Append the participant ID as the last value
    user_data.append(row.iloc[-1])  # Last column is the participant ID
    # Append the user data to the main list
    data.append(user_data)

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
# Define a function to calculate the match score between two users
def calculate_match_score(user1_responses, user2_responses):
    match_score = sum(1 for x, y in zip(user1_responses, user2_responses) if x == y)
    return match_score

# Dictionary to store match scores for each user
match_scores = {}
top_matches_2 = {}

# Iterate over each user
for user_data in data:
    user_id = user_data[-1]  # Last element is the user ID
    user_responses = user_data[:-1]  # Exclude the user ID
    match_scores[user_id] = {}  # Initialize dictionary for current user
    
    # Calculate match scores with other users
    for other_user_data in data:
        other_user_id = other_user_data[-1]
        other_user_responses = other_user_data[:-1]
        
        # Exclude self-comparison
        if user_id != other_user_id:
            match_score = calculate_match_score(user_responses, other_user_responses)
            match_scores[user_id][other_user_id] = match_score

# Dictionary to store top 5 least common users for each user
top_least_common = {}

# Iterate over each user's match scores
for user_id, scores in match_scores.items():
    # Sort the scores by match score in ascending order
    sorted_scores = sorted(scores.items(), key=lambda x: x[1])
    # Select the top 5 least common users
    top_least_common[user_id] = [user for user, score in sorted_scores[:5]]

top_matches_2 = top_least_common.copy()

frequencies_2 = {}
for value in top_least_common.values():
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

def calculate_match_score(user1_responses, user2_responses):
    match_score = sum(1 for x, y in zip(user1_responses, user2_responses) if x == y)
    return match_score

# Dictionary to store match scores for each user
match_scores = {}

# Iterate over each user
for user_data in data:
    user_id = user_data[-1]  # Last element is the user ID
    user_responses = user_data[:-1]  # Exclude the user ID
    match_scores[user_id] = {}  # Initialize dictionary for current user
    
    # Calculate match scores with other users
    for other_user_data in data:
        other_user_id = other_user_data[-1]
        other_user_responses = other_user_data[:-1]
        
        # Exclude self-comparison
        if user_id != other_user_id:
            match_score = calculate_match_score(user_responses, other_user_responses)
            match_scores[user_id][other_user_id] = match_score

# Dictionary to store top 5 most common users for each user
top_most_common = {}

# Iterate over each user's match scores
for user_id, scores in match_scores.items():
    # Sort the scores by match score in descending order
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    # Select the top 5 most common users
    top_most_common[user_id] = [user for user, score in sorted_scores[:5]]

top_matches = top_most_common.copy()

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
    