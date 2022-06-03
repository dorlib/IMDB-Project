# Skeleton file for HW6 - Spring 2022 - extended intro to CS

# Add your implementation to this file

# You may add other utility functions to this file,
# but you may NOT change the signature of the existing ones.

# Change the name of the file to include your ID number (hw6_ID.py).
from PIL import Image  # need to install PIL/PILLOW
import math


# Q1b
def sets_concat(s1, s2):
    s = set()
    for x in s1:
        for y in s2:
            s.add(x + y)
    return s


def generate_language(rule_dict, start_var, k):
    mem = dict()
    return generate_language_rec(rule_dict, start_var, k, mem)


def generate_language_rec(rule_dict, var, k, mem):
    if (var, k) in mem:
        return mem[(var, k)]

    s = set()
    if k == 0:
        # Add your code here #
        mem[(var, k)] = s
        return s

    if k == 1:
        # Add your code here #
        mem[(var, k)] = s
        return s

    for var_rule in rule_dict[var]:
        if len(var_rule) == 2:
            X, Y = var_rule[0], var_rule[1]
            for j in range(1, k):
                # Add your code here #
                x = generate_language_rec(rule_dict, var, j, mem)
                y = generate_language_rec(rule, dict, var, k - j, mem)
                s.add(x + y)
    mem[(var, k)] = s
    return s


# Q1c
def what(rule_dict, start_var, k):
    mem = dict()
    return what_rec(rule_dict, start_var, k, mem)


def what_rec(rule_dict, var, k, mem):
    if (var, k) in mem:
        return mem[(var, k)]

    cnt = 0
    if k == 0:
        if "" in rule_dict[var]:
            cnt += 1
        mem[(var, k)] = cnt
        return cnt

    if k == 1:
        for x in rule_dict[var]:
            if len(x) == 1:
                cnt += 1
        mem[(var, k)] = cnt
        return cnt

    for var_rule in rule_dict[var]:
        if len(var_rule) == 2:
            X, Y = var_rule[0], var_rule[1]
            for j in range(1, k):
                cnt += what_rec(rule_dict, X, j, mem) * what_rec(rule_dict, Y, k - j, mem)
    mem[(var, k)] = cnt
    return cnt


# Q2a
def gen1():
    pass  # replace this with your code (or don't, if there does not exist such generator with finite delay)


# Q2b
def gen2(g):
    sum = 0
    while True:
        sum += next(g)
        yield sum


# Q2c
def gen3(g):
    while True:
        n = next(g)
        if n > 0:
            yield n


# Q2d
def gen4(rules_dict, start_var):
    pass  # replace this with your code (or don't, if there does not exist such generator with finite delay)


# Q2e
def gen5(g1, g2):
    pass  # replace this with your code (or don't, if there does not exist such generator with finite delay)


# Q3b
def repetition_threshold(W, L):
    x = math.ceil(math.log(W,2))
    y = math.ceil(math.log(L,2))
    total_for_rep = x + y + 1
    k = total_for_rep // 8
    return k + 1
    


# Q3c

def maxmatch(T, p, W=2 ** 12 - 1, L=2 ** 5 - 1):
    assert isinstance(T, str)
    n = len(T)
    m = 0
    k = 0
    for offset in range(1, 1 + min(p, W)):
        match_len = 0
        j = p - offset
        while match_len < min(n - p, L) and T[j + match_len] == T[p + match_len]:
            match_len += 1
        if match_len > k:
            k = match_len
            m = offset
    return m, k


# Modify this code #
def LZW_compress_v2(text, c, W=2 ** 12 - 1, L=2 ** 5 - 1):
    intermediate = []
    n = len(text)
    p = 0
    while p < n:
        m, k = maxmatch(text, p, W, L)
        x = math.ceil(math.log(W,2))
        y = math.ceil(math.log(L,2))
        total_for_rep = x + y + 1
        total_for_huffman = 0
        for i in range(k):
            total_for_huffman += (1+int(len(c[text[p]])))
        if total_for_rep >= total_for_huffman:
            intermediate.append(text[p])
            p += 1
        else:
            intermediate.append([m, k])
            p += k
    return intermediate


# Modify this code #
def inter_to_bin_v2(intermediate, c, W=2 ** 12 - 1, L=2 ** 5 - 1):
    W_width = math.floor(math.log(W, 2)) + 1
    L_width = math.floor(math.log(L, 2)) + 1
    bits = []
    for elem in intermediate:
        if type(elem) == str:
            bits.append("0")
            bits.append(c[elem])
        else:
            bits.append("1")
            m, k = elem
            bits.append((bin(m)[2:]).zfill(W_width))
            bits.append((bin(k)[2:]).zfill(L_width))
    return "".join(ch for ch in bits)


# Modify this code #
def bin_to_inter_v2(bits, htree, W=2 ** 12 - 1, L=2 ** 5 - 1):
    W_width = math.floor(math.log(W, 2)) + 1
    L_width = math.floor(math.log(L, 2)) + 1
    inter = []
    n = len(bits)
    p = 0
    while p < n:
        if bits[p] == "0":
            l = 1
            chars = [int(bits[p+1])]
            while True:
                res = htree
                for i in range(len(chars)):
                    res = res[chars[i]]
                if len(res) == 1:
                    inter.append(res)
                    p += l +1
                    chars = []
                    l = 1
                    break
                l += 1
                chars.append(int(bits[p+l]))
        elif bits[p] == "1":
            p += 1
            m = int(bits[p:p + W_width], 2)
            p += W_width
            k = int(bits[p:p + L_width], 2)
            p += L_width
            inter.append([m, k])
    return inter


# This does not require any changes #
def LZW_decompress(intermediate):
    text_lst = []
    for i in range(len(intermediate)):
        if type(intermediate[i]) == str:
            text_lst.append(intermediate[i])
        else:
            m, k = intermediate[i]
            for j in range(k):
                text_lst.append(text_lst[-m])
    return "".join(text_lst)


# Q5a
def right_left(img):
    w, h = img.size
    mat = img.load()
    new_img = img.copy()
    new_mat = new_img.load()

    # Add your code here #
    for x in range(w):
        for y in range(h):
            new_mat[x, y] = mat[-x, y]

    return new_img


# Q5b
def what2(img):
    w, h = img.size
    mat = img.load()
    new_img = img.copy()
    new_mat = new_img.load()

    # Add your code here #
    for x in range(h):
        lst = []
        for i in range(w):
            lst.append(mat[i,x])
        lst.sort()
        for i in range(len(lst)):
            new_mat[i,x] = lst[i]

    return new_img


############
#  TESTER  #
############
def test():
    # Q1b
    rule_dict = {"S": {"AB", "BC"}, "A": {"BA", "a"}, "B": {"CC", "b"}, "C": {"AB", "a"}}
    res = generate_language(rule_dict, "S", 5)
    if ("baaba" not in res) or ("baab" in res) or ("babab" in res):
        print("Error in Q1b - generate_language")

    # Q3b
    if repetition_threshold(2 ** 12 - 1, 2 ** 5 - 1) != 3:
        print("Error in Q3b - repetition_threshold")

    # Q3c
    c = {'a': '0', 'b': '10', 'c': '110', 'd': '1110', 'e': '1111'}
    if LZW_compress_v2("abcdeabccde", c, 2 ** 5 - 1, 2 ** 3 - 1) != ['a', 'b', 'c', 'd', 'e', 'a', 'b', 'c', [6, 3]] or \
            LZW_compress_v2("ededaaaaa", c, 2 ** 5 - 1, 2 ** 3 - 1) != ['e', 'd', [2, 2], 'a', 'a', 'a', 'a', 'a']:
        print("Error in Q3c - LZW_compress_v2")
    if inter_to_bin_v2(['e', 'd', [2, 2]], c, 2 ** 5 - 1, 2 ** 3 - 1) != "0111101110100010010":
        print("Error in Q3c - inter_to_bin_v2")
    htree = ('a', ('b', ('c', ('d', 'e'))))  # This is the huffman tree corresponding to the c defined previously
    if bin_to_inter_v2("0111101110100010010", htree, 2 ** 5 - 1, 2 ** 3 - 1) != ['e', 'd', [2, 2]]:
        print("Error in Q3c - bin_to_inter_v2")
