# powerdns-manager

It's a simple backend for manage PowerDNS with user credentials.

## Requirements

- PowerDNS (Enabled API feature in pdns.conf)
- Docker

Tested in Ubuntu 22.04

## Installations

```bash
docker run -d --network host --name powerdns-manager kerimkaan/powerdns-manager:latest
```

## Services

### Users

#### POST /users: Create a new user account

Example Body:

```json
{
    "username": "power",
    "password": "dns"
}
```

Responses:

- 200: Success
- 409: Conflict, the user is already created
- 500: Internal Server Error, probably given body is malformed or invalid.

#### GET /users: Get all users

No body required.
Headers: username, password

Responses:

- 200: Success
- 404: Not Found, no user account exists.
- 500: Internal Server Error, probably Redis fault

### Zones

#### POST /zones: Create a new zone

Required body:

- zoneName, nameServers

Headers: username, password

Example Body:

```json
{
    "zoneName": "youtube.com",
    "nameServers": ["ns1.youtube.com", "ns2.youtube.com"]
}
```

Responses:

- 200: Success, returns result
- 500: Internal Server Error, malformed body or PowerDNS fails.

#### GET /zones: Get all zones

No body required.
Headers: username, password

Responses:

- 200: Success, returns result
- 500: Internal Server Error, malformed body or PowerDNS fails.

#### GET /zones/detail/:zoneName: Get a zone detail from

No body required.
Headers: username, password

Responses:

- 200: Success, returns result
- 500: Internal Server Error, malformed body or PowerDNS fails.

#### DELETE /zones/:zoneName: Delete a zone

No body required.
Headers: username, password
Only zone owners can be deleted.

Responses:

- 200: Success, returns result
- 500: Internal Server Error, PowerDNS fails.

#### PATCH /zones/:zoneName: Create a new resource record (RR) in the zone

Required body fields: records (array) (name, type, changetype, records)
Headers: username, password
Only zone owners can be created.

Example Body:

```json
{
 "records": [
  {
   "name": "test.youtube.com",
   "type": "A",
   "ttl": 3600,
   "changetype": "REPLACE",
   "records": [
    {
     "content": "192.168.0.5",
     "disabled": false
    }
   ]
  }
 ]
}
```

Responses:

- 200: Success, returns result
- 500: Internal Server Error, PowerDNS fails.

#### DELETE /zones/:zoneName/record: Delete a resource record (RR) in the zone

Required body fields: records (array) (name, type)
Headers: username, password
Only zone owners can be deleted.

Example Body:

```json
{
 "records": [
  {
   "name": "test2.youtube.com",
   "type": "A"
  }
 ]
}
```

## Development

Requires NodeJS (v18+):

```bash
npm i
```

## Tech Stack

- NodeJS v20
- Express Framework
- PM2 Runtime Manager
- Redis
- Docker
