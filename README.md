To zip to upload to lambda, run:
`npm run zip`

Needs to be a POST request with a body of the following format:\_

```json
{
  "page": 1,
  "sort": "ranking",
  "positiveWords": [],
  "negativeWords": [],
  "expertise": [],
  "location": []
}
```

Params can be found https://www.freelance.nl/opdrachten?page=1
