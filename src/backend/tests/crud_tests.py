"""
CRUD test file.

This tests the api calls and also performs a few macros.

Developer: lvlonEmperor
Date: 2022/05/28
"""
import sys
import requests
import json

url = "http://localhost:5000/tiles" # replace this with the server url. for now though, the server is hosted locally

def getTile(position:list[int]):
    """
    GETs a tile.

    In production, tiles we get tiles upon page load. we also get tiles repeatedly. every 5 seconds or so.

    When getting a tile, we only need the position, the position is specified in the URL. therefore, data and params are
    empty.
    position be integers and have a length of 2. they are essentially immutable.
    Ex: [x,y] -> [1,1]

    TODO:
        move params to an array. this way it is not incorporated into the url
    """
    global url

    # details about the request
    type = "GET"
    url += f"/{position[0]}/{position[1]}" # position
    headers = {"Content-Type": "application/json"}
    params = {} # the params
    body = {} # the data

    res = requests.request(type, url=url, params=params, data=body, headers=headers) # makes the request
    data = json.loads(res.text) # the response

    print(json.dumps(data, indent=4, sort_keys=False)) # pretty-prints the response

    return

def createTile(position:list[int], colour:list[int]):
    """
    Creates a tile.

    In production, we will not be creating tiles. Tiles are only to be created in development.
    In production, all tiles will be premade in the database.

    When creating a tile, we must specify the position of the tile( [1,2] ) and the colour in RGB format( [2,2,3] ).
    Both are specified in data.

    Example:
        >>>position=[5,5];  colour=[0,0,0]
        >>>createTile(position)
        creates a tile at position 5,5 and coloured black
    """
    global url

    # details about the request
    type = "POST"
    url += f"/create"  # the url
    headers = {}
    params = {}  # the params
    body = { # the data used.
        "position": position,
        "colour": colour
    }

    res = requests.request(type, url=url, params=params, data=body, headers=headers)  # makes the request
    data = json.loads(res.text)  # the response

    print(json.dumps(data, indent=4, sort_keys=False))  # pretty-prints the response

    return

def updateTile(position:list[int], colour:list[int], last_modifier:str):
    """
    Updates a tile.

    This will be used in production. Everytime the user changes the colour of a tile, this method will be called.

    We pass in position to determine which tile to update, colour and last_modifier to determine what we update the tile
    with.
    colour will be the new colour of the tile, in RGB(0,0,0)
    last_modifier is a string value. this will be the username given by the user.
    all arguments are in body.

    TODO:
        position is in params.
    """
    global url

    # details about the request
    type = "PUT"
    url += f"/update"  # the url
    headers = {}
    params = {
        "position": position
    }  # the params
    body = {  # the data used.
        "position": position,
        "colour": colour,
        "last_modifier": last_modifier
    }

    res = requests.request(type, url=url, params=params, data=body, headers=headers)  # makes the request
    data = json.loads(res.text)  # the response

    print(json.dumps(data, indent=4, sort_keys=False))  # pretty-prints the response

    return

def deleteTile(position:list[int]):
    """
    DELETEs a tile.

    This will not be used in production. This will just be used in development.

    We search for the tile by postion.
    position is given in body.
    the server looks for the tile with that position and deletes it.

    Example:
        >>>position=[0,0]
        >>>deleteTile(position)
        deletes the tile at position [0,0]

    TODO:
        position is in params.
    """
    global url

    # details about the request
    type = "DELETE"
    url += f"/delete"  # the url
    headers = {}
    params = {
        "position": position
    }  # the params
    body = {  # the data used.
        "position": position
    }

    res = requests.request(type, url=url, params=params, data=body, headers=headers)  # makes the request
    data = json.loads(res.text)  # the response

    print(json.dumps(data, indent=4, sort_keys=False))  # pretty-prints the response
    return

def resetTile(position:list[int]):
    """
    resets a tile.

    Probably wont be used in production. not sure

    Takes in a tile's positon, then simply changes the colour to 0 and clears the last_modifier.

    Example:
        >>>position=[0,0]
        >>>resetTile(position)
        sets tile [0,0]'s colour to white.

    TODO:
        position is in params
    """
    global url

    # details about the request
    type = "PUT"
    url += f"/reset"  # the url
    headers = {}
    params = {
        "position": position
    }  # the params
    body = {  # the data used.
        "position": position
    }

    res = requests.request(type, url=url, params=params, data=body, headers=headers)  # makes the request
    data = json.loads(res.text)  # the response

    print(json.dumps(data, indent=4, sort_keys=False))  # pretty-prints the response

    return

def createAll(): pass

def deleteAll(): pass

def getAll(): pass



if __name__ == '__main__':
    #getTile([2,1])
    #createTile([0,10], [0,0,0])
    #updateTile([0,10], [255,255,254], last_modifier="you")
    #deleteTile([0,10])
    #resetTile([0,10])
    sys.exit()
