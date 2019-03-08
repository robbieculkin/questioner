from bs4 import BeautifulSoup
import urllib.request
from urllib.error import HTTPError
import os.path
import random
import time

user_agent_list = [
   #Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    #Firefox
    'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)'
]

plays = ['antony-and-cleopatra', 'asyoulikeit', 'errors', 'coriolanus', 'hamlet', 'henry4pt1', 'henry4pt2','henryv',
         'juliuscaesar', 'lear', 'macbeth', 'measure-for-measure', 'merchant', 'msnd',
         'muchado', 'othello', 'richardii', 'richardiii', 'romeojuliet', 'shrew', 'tempest', 'twelfthnight',
         'twogentlemen', 'winterstale']

#not included in nfs:   All's Well That Ends Well, Cymbeline, Henry VI1-3, Henry VIII,
#                       Love's Labours Lost, Merchant of Venice, Merry Wives of Windsor,
#                       Pericles, Timon of Athens, Titus Andronicus, Troilus & Cressida
for play in plays:
    try:
        for ii in range(0, 500, 2):
            if not os.path.isfile(play+str(ii)) :

                url = 'https://www.sparknotes.com/nofear/shakespeare/'+play+'/page_'+str(ii)

                if ii == 0:
                    url = 'https://www.sparknotes.com/nofear/shakespeare/'+play+'/'
                if ii == 2: #no pg 2 exists
                    continue

                if play == 'henry4pt1' and ii != 0: #2nd page is pg 5, stays odd
                    url = 'https://www.sparknotes.com/nofear/shakespeare/'+play+'/page_'+str(ii+1)
                if play == 'henry4pt2' and ii != 0: #2nd pages is pg 271, stays odd
                    url = 'https://www.sparknotes.com/nofear/shakespeare/'+play+'/page_'+str(ii+267)

                print(url)
                ## Get webpage
                user_agent = random.choice(user_agent_list)
                print(user_agent)
                request = urllib.request.Request(url,headers={'User-Agent': user_agent})
                page = urllib.request.urlopen(request)

                soup = BeautifulSoup(page, 'html.parser')


                with open(play+str(ii),'w') as out:
                    out.write(str(soup))
                time.sleep(1)
    except HTTPError:
        continue