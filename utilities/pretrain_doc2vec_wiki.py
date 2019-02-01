import multiprocessing
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from gensim.corpora.wikicorpus import WikiCorpus

cores = multiprocessing.cpu_count()
wikipedia = WikiCorpus('../data/enwiki-latest-pages-articles.xml.bz2')

#build iterator
class TaggedWikiDocument(object):
    def __init__(self, wiki):
        self.wiki = wiki
        self.wiki.metadata = True
    def __iter__(self):
        for content, (_, title) in self.wiki.get_texts():
            yield TaggedDocument(content, [title])

documents = TaggedWikiDocument(wikipedia)
models = [
    # PV-DBOW
    Doc2Vec(dm=0, dbow_words=1, vector_size=200, window=8, min_count=19, epochs=10, workers=cores),
    # PV-DM w/average
    Doc2Vec(dm=1, dm_mean=1, vector_size=200, window=8, min_count=19, epochs=10, workers=cores),
]

models[0].build_vocab(documents)
print(str(models[0]))
models[1].reset_from(models[0])
print(str(models[1]))

for model in models:
    model.train(documents, total_examples=model.corpus_count, epochs=model.iter)
    model.save(str(model))
