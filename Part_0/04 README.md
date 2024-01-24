sequenceDiagram
    Particepant browser
    Participant server

browse -->> server: POST https://studies.cs.helsinki.fi/exampleapp/notes/new_note
server -->> browser: Redirection to https://studies.cs.helsinki.fi/exampleapp/notes
deactivate server
browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server -->> browser: HTML document
deactivate server
browser -->> server: GET main.css
server -->> browser: main.css document
deactivate server
browser -->> server: GET main.js
server -->> browser: main.js document
deactivate server