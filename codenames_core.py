import random

global words
words = ["Shark", "Bottle", "Blanket", "Balloon", "Plumber", "Lamp", "Clown", "Teacher", "Library", "Museum", "Garden", "Train", "Fork", "Glasses", "Bat", "Animatronic"]

'''
    List of lists
    [
    Row 1
    Row 2 ( 3 words)
    Row 3
    ]
    
    Each word:
    { color: [Red/Blue/Black], word: Word }
    

    Bomb - always avoid, Red (5) - bad, Blue (3) - words to guess
'''

def make_board():
    global words
    w = list(words)

    board = []

    board_words = []
    for i in range(3):
        board_words.append(get_word(w, "blue"))

    for i in range(5):
        board_words.append(get_word(w, "red"))

    board_words.append(get_word(w, "black"))

    for i in range(3):
        row = []
        for i in range(3):
            row.append(get_value(board_words))
        board.append(row)

    return board


def get_value(words):
    return words.pop(random.randint(0, len(words)-1))

def get_word(words, color):
    return {'color': color, "word": words.pop(random.randint(0, len(words)-1))}
