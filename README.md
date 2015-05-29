# melinda-api-mock

A mock of melinda api. This module can be used to test things that depend on melinda api.

## Installation

```

npm install melinda-api-mock

```

## Usage

```

var MockAPI = require('melinda-api-mock');

var api = new MockAPI({
	recordsDir: "records/" // a directory where to read the requested marcxml records from
});

// api is an instance of [http.Server](https://nodejs.org/api/http.html#http_class_http_server)

// to start the api:
api.listen(port, cb);


```

