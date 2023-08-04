#pragma once

#include "jarmu.h"
#include "onkormanyzat.h"
#include "fajta.h"

#include <vector>

class Jarmu;

struct out
{
    bool b;
    int maxertek;
    Jarmu* jarmu;
};


class Onkormanyzat
{
public:
    std::exception MarLetezoJarmu;
    std::exception NincsBusz;

    Onkormanyzat() {}
    
    std::vector<Jarmu*> jarmuvek;

    void Beszerez(Jarmu* j);
    
    double Oregbuszok();
    out Legdragabb();
};