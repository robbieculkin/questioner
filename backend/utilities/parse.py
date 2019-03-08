from bs4 import BeautifulSoup
import urllib.request
import os.path
import pandas as pd
import re

final = pd.DataFrame()
plays = ['antony-and-cleopatra', 'asyoulikeit', 'errors', 'coriolanus', 'hamlet', 'henry4pt1', 'henry4pt2','henryv',
         'juliuscaesar', 'lear', 'macbeth', 'measure-for-measure', 'merchant', 'msnd',
         'muchado', 'othello', 'richardii', 'richardiii', 'romeojuliet', 'shrew', 'tempest', 'twelfthnight',
         'twogentlemen', 'winterstale']

#not included in nfs:   All's Well That Ends Well, Cymbeline, Henry VI1-3, Henry VIII,
#                       Love's Labours Lost, Merchant of Venice, Merry Wives of Windsor,
#                       Pericles, Timon of Athens, Titus Andronicus, Troilus & Cressida

for play in plays:
    print(play)
    play_lines = pd.DataFrame()
    for ii in range(0,500,2):
        if os.path.isfile(play+str(ii)) :

            fname = play+str(ii)
            file = open(fname)
            soup = BeautifulSoup(file.read(), 'html.parser')

            lines = pd.DataFrame()
            lines_m = pd.DataFrame()
            lines_o = pd.DataFrame()

            for translation in ['original', 'modern']:
                if translation == 'original':
                    quotes = soup.find_all('td', attrs={'class':'noFear-left'})
                else:
                    quotes = soup.find_all('td', attrs={'class':'noFear-right'})

                for q in quotes:
                    if translation == 'original':
                        player = q.find('b').text if q.find('b') else None
                        originals = q.find_all('div', attrs={'class':translation+'-line'})
                        originals = [orig.text for orig in originals if orig]

                        original = ' '.join(originals)

                        lines_o = lines_o.append(pd.DataFrame({'player':player, translation: original}, index=[0]), ignore_index=True)
                    else:
                        player = q.find('b').text if q.find('b') else None
                        modern = q.find('div', attrs={'class':translation+'-line'}).text if q.find('div', attrs={'class':translation+'-line'}) else None

                        lines_m = lines_m.append(pd.DataFrame({'player':player, translation: modern}, index=[0]), ignore_index=True)

            lines = lines.append(pd.DataFrame({'player':lines_o['player'], 'original':lines_o['original'], 'modern':lines_m['modern']}), ignore_index=True)

            lines = lines.dropna(subset=['modern']).reset_index(drop=True)
            lines['modern'] = lines['modern'].apply(lambda x: re.sub(r'\s+|[0-9]',' ', x))
            lines['original'] = lines['original'].apply(lambda x: re.sub(r'\s+|[0-9]',' ', x))
            lines['play'] = play

            play_lines = play_lines.append(lines)
    play_lines = play_lines.reset_index(drop=True)
    for idx, l in play_lines.iterrows():
        if l.player == None:
            play_lines.loc[idx].player = play_lines.loc[idx-1].player

    final = final.append(play_lines)

final.to_csv('translation.csv')
