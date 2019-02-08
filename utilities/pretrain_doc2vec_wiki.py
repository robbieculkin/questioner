import multiprocessing
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from gensim.corpora.wikicorpus import WikiCorpus

def fprint(msg):
    with open('log/log.txt', 'w+') as fp:
        fp.write(str(msg) + '\n')

fprint('START SCRIPT')
cores = multiprocessing.cpu_count() - 1
fprint(f'USING CORES: {cores}')
wikipedia = WikiCorpus('/local/weka/enwiki-latest-pages-articles.xml.bz2')
fprint('CORPUS FORMED')

#build iterator
class TaggedWikiDocument(object):
    def __init__(self, wiki):
        self.wiki = wiki
        self.wiki.metadata = True
    def __iter__(self):
        for content, (_, title) in self.wiki.get_texts():
            yield TaggedDocument(content, [title])

documents = TaggedWikiDocument(wikipedia)
fprint('TAGGED DOCUMENT')

models = [
    # PV-DBOW
    Doc2Vec(dm=0, dbow_words=1, vector_size=200, window=8, min_count=19, epochs=10, workers=cores),
    # PV-DM w/average
    Doc2Vec(dm=1, dm_mean=1, vector_size=200, window=8, min_count=19, epochs=10, workers=cores),
]
fprint('CREATED MODELS')

models[0].build_vocab(documents)
fprint(str(models[0]))
models[1].reset_from(models[0])
fprint(str(models[1]))

for i, model in enumerate(models[1:]):
    fprint(f'TRAINING MODEL #{i}')
    model.train(documents, total_examples=model.corpus_count, epochs=model.iter)
    fprint(f'SAVING MODEL #{i}')
    model.save(str(model))
