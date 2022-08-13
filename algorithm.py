import random

import nltk
import numpy as np
import pandas as pd
from scipy import spatial
import codecs
from itertools import zip_longest
from IPython.display import HTML
import builtins

embeddings = {}
builtins.embeddings = embeddings
words = []

import algorithm_original as original

with codecs.open("./nouns_5000.txt", 'r', "utf-8") as f:
    i = 0
    for line in f:
        if line == "\n": continue
        values = line.split()
        w = values[0]
        if len(w) <= 2: continue
        vector = np.asarray(values[1:], "float32")
        embeddings[w] = vector
        words.append(w)
        i += 1
        if i >= 2500: break

builtins.embeddings = embeddings


def distance(word, reference):
    if len(embeddings[word]) < 300: print(word)
    return spatial.distance.cosine(embeddings[word], embeddings[reference])


def closest_words(reference):
    return sorted(embeddings.keys(), key=lambda w: distance(w, reference))


def goodness(word, answers, bad, bombs):
    if word in answers + bad + bombs: return -999
    return 1.5 * sum([distance(word, bomb) for bomb in bombs]) + sum([distance(word, b) for b in bad]) - 4.0 * sum(
        [distance(word, a) for a in answers])


def minimax(word, answers, bad, bombs):
    if word in answers + bad + bombs: return -999
    return min([distance(word, bomb) for bomb in bombs]) + min([distance(word, b) for b in bad]) - max(
        [distance(word, a) for a in answers])


def candidates(answers, bad, bombs, candidates=100, batch_size=250, reverse=False, raw=False):
    best = sorted(embeddings.keys(), key=lambda w: -1 * goodness(w, answers, bad, bombs))
    res = [(str(i + 1), "{0:.2f}".format(minimax(w, answers, bad, bombs)), w) for i, w in
           enumerate(sorted(best[:batch_size], key=lambda w: -1 * minimax(w, answers, bad, bombs))[:candidates])]
    if raw: return res
    if reverse: res.reverse()
    return [(". ".join([c[0], c[2]]) + " (" + c[1] + ")") for c in res]


def grouper(n, iterable, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)


def tabulate(data):
    data = list(grouper(10, data))
    return HTML(pd.DataFrame(data).to_html(index=False, header=False))


def closest_answers(word, answers):
    results = []
    for word2 in answers:
        results.append(distance(word, word2))
    return sum(results)


def closest_result(result_list):
    return result_list[1]


def random_word(word_list):
    r_word = word_list.pop(random.randint(0, len(word_list) - 1))
    return r_word


def generate_board_and_clues():
    layouts = [["Red", 5], ["Blue", 3], ["Black", 1]]
    cat_board = {"Red": [], "Blue": [], "Black": []}
    random_words = []
    word_list = list(words)
    board = []
    for layout in layouts:
        for _ in range(layout[1]):
            r_word = random_word(word_list)
            random_words.append({"color": layout[0], "word": r_word.upper()})
            cat_board[layout[0]].append(r_word)
    for _ in range(3):
        row = []
        for __ in range(3):
            row.append(random_words.pop(random.randint(0, len(random_words) - 1)))
        board.append(row)

    good_words = cat_board["Blue"]
    neutral_words = cat_board["Red"]
    bomb_words = cat_board["Black"]
    grouped_answers = sorted(good_words, key=lambda w: closest_answers(w, good_words))
    grouped_results = original.candidates(grouped_answers, neutral_words, candidates=500)

    results = sorted(grouped_results, key=lambda r: closest_result(r), reverse=True)
    clues = [c[2] for c in results]

    print(clues)


    return {"board": board, "clues": clues[0:100]}
