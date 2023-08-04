from locale import currency
import sys
import json

input = str(sys.argv[1])

with open(input, 'r') as f:
    data = json.load(f)


circuits = data.get('possible-circuits')
demands = data.get('simulation').get('demands')

igeny = 1
index = 0

lefoglalt = [[],[],[],[]]
a_k = {'A': 0, 'B': 0, 'C': 0,'D': 0 }

sikertelen_foglalasok = []

for i in range(1,data.get('simulation').get('duration')+1):
    index = 0
    for d in demands:
        to_remove_cir = []
        to_add_cir = []
        for c in circuits:
            if i == d.get('start-time'):
                if d.get('end-points')[0] in c and d.get('end-points')[1] in c:
                        lefoglalt[index].append(c)
                        to_remove_cir.append(c)
                    

            if i == d.get('end-time'):
                if len(lefoglalt[index]) != 0:
                    to_add_cir = lefoglalt[index]
                    lefoglalt[index] = []


        if len(to_remove_cir) != 0:
            a_k[d.get('end-points')[0]] += 1
            a_k[d.get('end-points')[1]] += 1

            if a_k['A'] <= 1 and a_k['B'] <= 1 and a_k['C'] <= 2 and a_k['D'] <= 1:
                print(igeny,". igény foglalás: ",d.get('end-points')[0],"<->",d.get('end-points')[1]," st:",i," - sikeres",sep="")
                #print(a_k['A'], a_k['B'], a_k['C'], a_k['D'])
                for trc in to_remove_cir:
                    if trc in circuits:
                        circuits.remove(trc)
            else:
                print(igeny,". igény foglalás: ",d.get('end-points')[0],"<->",d.get('end-points')[1]," st:",i," - sikertelen",sep="")
                #print(a_k['A'], a_k['B'], a_k['C'], a_k['D'])
                a_k[d.get('end-points')[0]] -= 1
                a_k[d.get('end-points')[1]] -= 1
                sikertelen_foglalasok.append(index)
            
            igeny += 1

        if len(to_add_cir) != 0 and index not in sikertelen_foglalasok:
            a_k[d.get('end-points')[0]] -= 1
            a_k[d.get('end-points')[1]] -= 1

            print(igeny,". igény felszabadítás: ",d.get('end-points')[0],"<->",d.get('end-points')[1]," st:",i,sep="")
            #print(a_k['A'], a_k['B'], a_k['C'], a_k['D'])
            for tac in to_add_cir:
                circuits.append(tac)
            
            igeny += 1

        
        
        index += 1

 