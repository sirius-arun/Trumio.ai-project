# Importing all the Required Libraries
import spacy

nlp = spacy.load("en_core_web_md")


def normalize(input_list):
    max_val = max(input_list)
    input_list = [x/max_val for x in input_list]
    print(input_list)
    return input_list


# Bid Acceptance Probability
def score(avg_score, corr_score_proposal, corr_score_key, amount_score):
    final_score = (avg_score + amount_score) * (corr_score_proposal + corr_score_key + 1e-6)
    return final_score


def calcProbability(scores):
    scores_sum = sum(scores)
    return [score/scores_sum for score in scores]


def predict(prob_stat, avg_scores, proposals, project_key, team_keys, amounts):
    prob_stat = nlp(prob_stat)
    proposals = [nlp(proposal) for proposal in proposals]
    project_key = nlp(" ".join(project_key))
    team_keys = [nlp(team_key) for team_key in team_keys]
    corr_score_proposals = [proposal.similarity(
        prob_stat) for proposal in proposals]
    corr_score_keys = [team_key.similarity(
        project_key) for team_key in team_keys]

    avg_scores = normalize(avg_scores)
    corr_score_proposals = normalize(corr_score_proposals)
    corr_score_keys = normalize(corr_score_keys)
    amount_scores = [(1./(amount+1e-6)) for amount in amounts]
    amount_scores = normalize(amount_scores)
    scores = [score(avg_scores[i], corr_score_proposals[i],
                    corr_score_keys[i], amount_scores[i]) for i in range(len(proposals))]
    return calcProbability(scores)


# Recommendation Engine
def recommendScore(word, prompt):
    s1 = nlp(prompt)
    s1_nouns = " ".join([token.lemma_ for token in s1 if token.pos_ == "NOUN"])
    s1_nouns = nlp(s1_nouns)
    word = nlp(word)
    # score = (word.similarity(s1) * word.similarity(s1_nouns)) ** 0.5
    score = word.similarity(s1) + 0.1 * word.similarity(s1_nouns)
    return score


def recommend(key_words, prompt):
    key_words = sorted(
        key_words,  key=lambda x: recommendScore(x, prompt), reverse=True)
    return [key_words[i] for i in range(min(len(key_words), 3))]
