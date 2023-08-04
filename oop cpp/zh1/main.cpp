#include <fstream>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

enum Status{ norm, abnorm };

struct Rendeles {
    std::string nev;
    bool hagyma;
    bool csipos;
};

struct Nap {
    std::string datum;
    int bevetel;
    std::vector<Rendeles> rendelesek;
};

class readerClass
{
    std::ifstream f;

public:
    readerClass(const char *path) : f(path)
    {
        if (!f) { throw std::invalid_argument("a fajl nem talalhato"); }
    }

    void read(Status &st, Nap &nap)
    {
        std::string sor;
        std::getline(f, sor);
        std::stringstream ss(sor);

        ss >> nap.datum;
        ss >> nap.bevetel;

        std::string kajanev;
        bool h = false;
        bool cs = false;


        while (ss >> kajanev >> h >> cs)
        {
            nap.rendelesek.push_back({kajanev, h, cs});
        }

        st = f ? norm : abnorm;
    }
};

int main()
{
    bool meghaladta = false;
    int hagymacsipos = 0;
    int legtobbr = 0;

    Status st = abnorm;
    Nap n;
    readerClass x("inp.txt");

    x.read(st, n);

    while (st == norm)
    {

        if (meghaladta)
        {
            int localrend = 0;
            for (int i = 0; i < n.rendelesek.size(); ++i) {
                localrend++;
                if (n.rendelesek.at(i).csipos && n.rendelesek.at(i).hagyma){
                    hagymacsipos++;
                }
            }

            if (localrend>legtobbr){
                legtobbr = localrend;
            }
        }

        meghaladta = meghaladta || n.bevetel > 70000;

        n.rendelesek.clear();
        x.read(st, n);
    }

    std::cout << hagymacsipos << " " << legtobbr << "\n";

    return 0;
}