sequenceDiagram
    Particepant browser
    Participant server

browse -->> server: POST https://studies.cs.helsinki.fi/exampleapp/spa/new_note_spa
server -->> browser: 201 status code
deactivate server

note: The browser posts a JSON file containing the contents and timestamp to the server. The server is prevented from redirecting the browser and the updating of the notes content is done on the browser