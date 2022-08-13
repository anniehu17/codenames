import builtins

from scipy import spatial

embeddings = builtins.embeddings

def distance(word, reference):
    return spatial.distance.cosine(embeddings[word], embeddings[reference])

def closest_words(reference):
    return sorted(embeddings.keys(), key=lambda w: distance(w, reference))

def goodness(word, answers, bad):
    if word in answers + bad: return -999
    return sum([distance(word, b) for b in bad]) - 4.0 * sum([distance(word, a) for a in answers])

def minimax(word, answers, bad):
    if word in answers + bad: return -999
    return min([distance(word, b) for b in bad]) - max([distance(word, a) for a in answers])

def candidates(answers, bad, candidates=100, batch_size=250, reverse=False):
    best = sorted(embeddings.keys(), key=lambda w: -1 * goodness(w, answers, bad))
    res = [(str(i + 1), "{0:.2f}".format(minimax(w, answers, bad)), w) for i, w in enumerate(sorted(best[:batch_size], key=lambda w: -1 * minimax(w, answers, bad))[:candidates])]
    if reverse: res.reverse()
    return res

