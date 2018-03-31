
"""
Basic random Person Generator
"""

from numpy.random import randn, uniform, normal, randint
import random
import numpy as np
import os
import matplotlib.pyplot as plt
import pandas as pd
import calendar
from datetime import date, timedelta
import json
import uuid

class PersonGenerator:

    def __init__(self):
        # 2010 is the last available year right now
   
        years = range(1881, 2017)

        pieces = []
        columns = ['name', 'sex', 'births']

        for year in years:
            path = 'names/yob%d.txt' % year
            frame = pd.read_csv(path, names=columns)

            frame['year'] = year
            pieces.append(frame)

        # Concatenate everything into a single DataFrame
        names = pd.concat(pieces, ignore_index=True)
        
        pieces = []
        for year, group in names.groupby(['year', 'sex']):
            pieces.append(group.sort_values(by='births', ascending=False)[:1000])
        self.top1000 = pd.concat(pieces, ignore_index=True)
        
        path = 'surnames/1990.txt'
        lastName = pd.read_csv(path,  delim_whitespace=True , names = ["uName","freq","c","Rank"])
        lastName["name"] = lastName.uName.apply(lambda x: str(x).title())
        total = float(np.sum(lastName.freq))
        lastName["freqReal"] = lastName.freq.apply(lambda x: float(x)/total)
        lastName["bound"] = lastName.freqReal.cumsum()
        self.lastName = lastName
        
        
        path = 'surnames/places.txt'
        locations = pd.read_csv(path, sep='\t', thousands=',',header=0)
        
        total = float(np.sum(locations.Pop))
        locations["freqReal"] = locations.Pop.apply(lambda x: float(x)/total)
        locations["bound"] = locations.freqReal.cumsum()
        
        self.locations = locations
    
    def rowName(self,df,prob):
        i = df.bound.searchsorted(prob)[0]
        row = df.iloc[i]
        return row["name"]
    
    def firstName(self,year,sex):
        df = self.top1000[self.top1000.year == year]
        df = df[df.sex == sex]
        total = float(np.sum(df.births))

        df = df.sort_values(by=['births'], ascending=False)
        df["freq"] = df.births.apply(lambda x: float(x)/total)
        df["bound"] = df.freq.cumsum()
        return df
    

    
    def makeFirstList(self,year,sex,count):
        bar = self.firstName(year,sex)
        ret = []
        for x in range(count):
            prob = uniform()
            name = self.rowName(bar,prob)
            ret.append(name)

        return ret
    
    def randomFullName(self,year,gender,count):
        aval = self.makeFirstList(year,gender,count)
        midList = self.makeFirstList(year,gender,count)
        ret = []
        for i in range(len(aval)):
            first = aval[i]
            middle = midList[i]
            prob = uniform()
            last = self.rowName(self.lastName,prob)
            name = first + " " + middle[0] + ". " + last
            ret.append( {"first":first,"middle":middle,"gender":gender,"last":last, "name":name})
    
        
        return ret
    
    def randomDate(self,year):
        firstJan = date(year,1,1)
        d = firstJan + timedelta(days = random.randint(0, 365 if calendar.isleap(firstJan.year) else 364))
        return {"year":year,"month":d.month,"day":d.day}
    
    
    
    def getGroupAround(self,yearMean,std,count,gender):
        (years,yearcounts) = np.unique(normal(yearMean,std,count).astype(np.int32),return_counts=True)

        ret = []

        for i in range(len(years)):
            year = int(years[i])
            ycount =  yearcounts[i]
            names = self.randomFullName(year,gender,ycount)

            for j in range(len(names)):
                pep = names[j]
                pep["birth"] = self.randomDate(year)
                ret.append(pep)

        arr = np.arange(len(ret)).astype(np.int32)
        np.random.shuffle(arr)

        i = 0
        for pep in ret:
            pep["imageID"] = int(arr[i])
            pep["id"] = str(uuid.uuid4())
            prob = uniform()
            pep["location"] = self.rowName(self.locations,prob)
            i += 1
       
        return ret
    

class WorldGenerator:
    
    def loadCompanies(self,count):
        path = 'surnames/sp500.csv'
        companylist = pd.read_csv(path,  header=0)

        arr = np.arange(len(companylist)).astype(np.int32)
        np.random.shuffle(arr)
        companylist.head()
        ret = []
        for x in range(count):
            i = arr[x]
            row = companylist.iloc[i]
            fields = ["Symbol","Name","Sector"]
            addMe = {}
            for field in fields:
                addMe[field] = row[field]
            ret.append(addMe)
        return ret
    
    def employmentHistory(self,years,switchprob):
        
        arr = np.arange(len(self.companies)).astype(np.int32)
        np.random.shuffle(arr)
        
        last = int(arr[0])
        ret = [last]
        while len(ret) < years:
            if uniform() < switchprob:
                last = int(arr[len(ret)])
            ret.append(last)
        return ret
    
    def friendsOf(self,i):
        hist = self.people[i]["employment"]
        friends = {}
        for j in range(len(self.people)):
            if i != j:
                other = self.people[j]
                count = 0
                for k in range(len(hist)):
                    if (hist[k] == other["employment"][k]):
                        count += 1

                if count > 0:
                    friends[other["id"]] = count

        return friends

    def __init__(self,mcount=50,mmean=1968,mstd=9,fcount=50,fmean=1973,fstd=9):
        peopleGen = PersonGenerator()
        people = peopleGen.getGroupAround(mmean,mstd,mcount,"M")
        people.extend( peopleGen.getGroupAround(fmean,fstd,fcount,"F"))
        self.people = []
        
        for x in people:
            if (x["birth"]["year"] <2018-23):
                self.people.append(x)
       
        self.companies = self.loadCompanies(int(len(people)/3))
       
            
        self.properties = {
    "occupation":["Marketing","Finance","IT","Accounting","Legal","Sales"],
    "wealth":["not much","some","average","quite a bit","vast sums"],
    "generosity":["stingy","poor","average","generous","fantastic"],
    "enthusiam":["Not much","Some","Average","Great","Hero"],
    "communication":["Silent","Some","Average","A Lot"] }

        for pep in self.people:
            pep["employment"] = self.employmentHistory(8,0.25)
            for key, value in self.properties.items():
                pep[key] = value[randint(0, len(value))]
            
        for i in range(len(self.people)):
            pep = self.people[i]
            pep["friends"] = self.friendsOf(i)
           
                
    def asDict(self):
        lookup = {}


        for pep in self.people:
            lookup[pep["id"]] = pep
    
        host = self.people[randint(0, len(self.people))]["id"]
        return {"properties":self.properties,"people":lookup,"founder":host,"companies":self.companies}
        
    def export(self,filename):
        with open(filename, 'w') as outfile:
            json.dump(self.asDict(),outfile,indent=4, sort_keys=True)



def main():
    world = WorldGenerator(mcount=50,fcount=50)
    print(world.people[1])
    world.export("../server/model/world.json")
  
if __name__== "__main__":
  main()

