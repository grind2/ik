#include <iostream>
#include <fstream>

#include "onkormanyzat.h"
#include "jarmu.h"
#include "fajta.h"

using namespace std;

int main()
{
    ifstream f("input.txt");
    if(f.fail()) {
        cout << "Hibas fajlnev!\n";
        return 1;
    }

    Onkormanyzat* onk = new Onkormanyzat();

    int dbJarmu;
    f >> dbJarmu;

    for(int i=0; i<dbJarmu; ++i){
        string azon, fajta;
        int ertek, ev;
        f >> azon >> fajta >> ertek >> ev;
        try {
            Fajta* f;
            if      (fajta=="vill")  { f = Villamos::instance(); }
            else if (fajta=="busz")  { f = Autobusz::instance(); }
            else if (fajta=="troli") { f = Trolibusz::instance();}

            onk->Beszerez(new Jarmu(azon, ev, ertek, f));
        } catch(std::exception ex) {
            cout << "mar letezo jarmu\n";
        }
    }

    try{
        cout.setf(ios::fixed);
        cout.precision(2);

        cout << onk->Oregbuszok();
    } catch (std::exception ex){
        cout << "nincs busz";
    }
/*
    int maxertek;
    Jarmu * jarmu;
*/


	//std::cout << 100000000 * ((double)(100-10)/(double)(100*1)) << endl;

    if(onk->Legdragabb().b) cout << " " << onk->Legdragabb().jarmu->azon << " " << onk->Legdragabb().jarmu->Ertek();
    else cout << " nincs jarmu";

    Villamos::destroy();
    Autobusz::destroy();
    Trolibusz::destroy();

    return 0;
}
