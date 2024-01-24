sequenceDiagram
    Particepant browser
    Participant server

browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
server -->> browser: HTML document
deactivate server
browser -->> server: GET main.css
server -->> browser: main.css file
deactivate server
browser -->> server: GET spa.js
server -->> browser: spa.js file
deactivate server