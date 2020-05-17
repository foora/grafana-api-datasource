# grafana-api-datasource
[![Build Status](https://travis-ci.org/foora/grafana-api-datasource.svg?branch=master)](https://travis-ci.org/foora/grafana-api-datasource)
[![codecov](https://codecov.io/gh/foora/grafana-api-datasource/branch/master/graph/badge.svg)](https://codecov.io/gh/foora/grafana-api-datasource)

the grafana plugin which can get json data from your backend server api and parse data to provide for penals

## Installation
#### **use grafana-cli**
> grafana-cli --pluginUrl https://github.com/foora/grafana-api-datasource/archive/v1.0.3.zip plugins install grafana-api-datasource

## Documentation

### **testConnect**
> you must support a GET method api which path is "/test" for grafana to test connecting. the api just need response status 200.

### **use table penal**
```
// query-editor example
{
    "path": "/api",
    "method": "GET",
    "query": {},
    "format": "table",
    "columns": [
        {"key": "time", "label": "column name 1"},
        {"key": "name", "label": "column name 2"}
    ]
}

// the response data example
{
    "data": [
        {"time":1, "name": "test1"},
        {"time":2, "name": "test2"}
    ]
}
```
- path: the api path
- method: the api method
- query: the post body ("startTime" and "endTime" always support by default .if method is "GET", query will be ignore.)
- format: how to format the respone data (now just support "table" and "series")
- columns: the table columns("label" is the column header name, "key" is a porp of each data on the data Array)

the example table looks like:

column name 1 | column name 2
--- | ----
1   | test1
2   | test2

### **use series penal**
```
// query-editor example
{
    "path": "/api",
    "method": "GET",
    "query": {},
    "format": "series",
    "lines": {
        "timeKey": "time",
        "line": [
            {"key": "pv", "label": "pv"},
            {"key": "uv", "label": "uv"}
        ]
    }
}

// the response data example(the data must sort by time(timestamp))
{
    "data": [
        {"pv": 200, "uv": 200, time: 1510200000000},
        {"pv": 100, "uv": 100, time: 1510300000000},
        {"pv": 300, "uv": 300, time: 1510400000000}
    ]
}
```

- path: the api path
- method: the api method
- query: the post body ("startTime" and "endTime" always support by default .if method is "GET", query will be ignore.)
- format: how to format the respone data (now just support "table" and "series")
- lines: 
    1. timeKey: each data need support a timestamp(ms), it is the timestamp's key (timestamp is the X-Axis).
    2. line: each data on the data Array will render one line ("key" is the prop name of each data which use for Y-axis, "label" is the line name)

## Run tests
- npm run test
- npm run test-cover