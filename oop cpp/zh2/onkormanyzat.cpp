#include "onkormanyzat.h"

#include <iostream>

void Onkormanyzat::Beszerez(Jarmu* j){
    for (Jarmu* c : jarmuvek){
        if (j == c){ throw Onkormanyzat::MarLetezoJarmu; }
    }
    jarmuvek.push_back(j);
}

double Onkormanyzat::Oregbuszok(){
    double regi = 0;
    double ossz = 0;
    for (Jarmu* e : jarmuvek){
        if(e->fajta->Is_Busz()){
            ossz++;
            if(e->ev>15){
                regi++;
            }
        }
    }
    if (ossz==0) { throw Onkormanyzat::NincsBusz; } 
    return regi/ossz;
}

out Onkormanyzat::Legdragabb(){
    out o;
    int max = 0;
    for (Jarmu* e : jarmuvek){
        if(e->Ertek()>max){
            max = e->Ertek();
            o.maxertek = e->Ertek();
            o.jarmu = e;
        }
    }
    o.b = max!=0;

    return o;
}

