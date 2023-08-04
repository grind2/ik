#pragma once

#include "onkormanyzat.h"
#include "fajta.h"

#include <string>

class Fajta;

class Jarmu
{
private:
    int ujertek;

public:
    Fajta* fajta;
    std::string azon;
    int ev;
    
    Jarmu(std::string azon, int ev, int ertek, Fajta* f) : azon(azon), ev(ev), ujertek(ertek), fajta(f) {}
    int Ertek();
};