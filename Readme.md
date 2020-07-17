# Codeuino Task

## Time complexity

- O(1)

- Data Structure: Bi-directional Multi Map
  - Allows lookup by both key and value in O(1) time
  - Implementation file: `./api/model/biMultiMap.js`

## Routes

/generate-key       -   GET
/get-key            -   POST
/unblock/:key       -   PUT
/delete/:key        -   DELETE
/keep-alive/:key    -   PUT
/blocked            -   GET
/available          -   GET

## Approach and asumptions

To provide all the functionality in the problem statement in a clear and logical way. We will provide user object in the body of all routes except GET.

- A user gets an API key through the /get-key endpoint
- The API key is blocked for him for 60s only during which no other user can get that key
- After that it is unblocked and other users may get access to the same key
- When some other user gets access to the key the previous user will loose access.
- If no other user has aquired the key since it got unblocked (after the one minute mark or through the `/unblock` endpoint), The previous user may renew his key upto 5 mins and block it for himself for 60s more.
- If no other user aquires the key and the original user does not renew it within 5 mins then the API key gets deleted.

Here is what the user object might look like
    {
        "user": "2356465211561"
    }

## Workflow and Steps for testing

**Step 1 :** Send a GET request to `/generate-key` to generate an API key

**Step 2 :** Send a GET request to `/available` to see the newly created API key in available state

**Step 3 :** Send a POST request to `/get-key` with the user string in the body in the following format

    {
        "user": "saurabh"
    }

This would block the an API key for 60 secs.

**Step 4 :** Send a GET request to `/blocked` we will now be able to see our API key in blocked state.

**Step 5 :** Wait for a minute, and repeat **Step 4** we could see our API key has become active again.

**Step 6 :** Send a POST request to `/get-key` with details of a different user in the body. The API we will again move to a the blocked state.

**Step 7 :** Send a PUT request to `/keep-alive/:key` with details of the original user in the body. We would get a 403 Forbidden error with a message asying that this user no longer has access to the api key. If we send the request with details of the user currently assosiated to the key then the request would go thorugh, 5 minutes timer to delete the key would reset and the key would be blocked for 60s for the current user.

**Step 8 :** Wait for 5 minutes and check available and blocked endpoints, the key would be deleted now as we did not send a keep alive request in 5 minutes or some other user did not acquire the key after one minute.
