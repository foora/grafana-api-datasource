# grafana-api-datasource
the grafana plugin which can get json data from api and parse data to provide for penals

## query-editor
#### table
```
// example
{
    "path": "/api",
    "method": "GET",
    "format": "table",
    "columns": [
        {"key": "time", "label": "时间"},
        {"key": "name", "label": "名称"}
    ]
}
```
#### series
```
// example
{
    "path": "/api",
    "method": "GET",
    "format": "series",
    "lines": {
        "timeKey": 'time',
        "line": [
            {"key": "pv", "label": "pv数"},
            {"key": "uv", "label": "uv数"}
        ]
    }
}
```