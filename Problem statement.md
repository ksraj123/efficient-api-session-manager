# PROBLEM:

Write a server that can generate random API keys, assign them for usage, and release them after some time. The following endpoints should be available on the server to interact with it.

## REQUIREMENTS:

- Requirement 1 (R1): There should be one endpoint to generate keys.

- Requirement 2 (R2): There should be an endpoint to get an available key. On hitting this endpoint server should serve a random key that is not already being used. This key should be blocked and should not be served again by R2 until it is in this state. If no eligible key is available then it should serve 404.

- Requirement 3 (R3): There should be an endpoint to unblock a key. Unblocked keys can be served via R2 again.

- Requirement 4 (R4): There should be an endpoint to delete a key. Deleted keys should be purged.

- Requirement 5 (R5): All keys are to be kept alive by clients calling this endpoint every 5 minutes. If a particular key has not received a keep alive in the last five minutes then it should be deleted and never used again.
Apart from these endpoints, the following rules should be enforced:

- Rule 1: All blocked keys should get released automatically within 60 secs if E3 is not called.

- Rule 2: No endpoint call should result in an iteration of a whole set of keys i.e. no endpoint request should be O(n). They should either be O(lg n) or O(1).

Write Test cases for your code. Use OOPS, Threading, etc whatever fits best for the better approach.

Good Luck!

## Routes

R1 - generate keys

R2 - get a available key that is not already being used, the given key is blocked to be served again until one minute

R3 - unblock keys, useful to unblock keys before 1 min mark

R4 - end point to delete keys

## Replies from vaibhav

Keys are in memory and live the lifetime of the server, dont use database

Key are always unique

No authentication for any route, all accessible by client

- setup nodeomn

- find how to use threads or oops

- we need some test routes

- Complexity of Object.keys is O(n)

- write middlewares for validating requests

- Look into handling errors using middleware and res.error

- res.status(HttpStatus.OK).json({ success: 'ok' }) - look into the codebase for more coding styles